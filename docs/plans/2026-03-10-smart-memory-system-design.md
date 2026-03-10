# Smart Memory + Compaction System — Design Document
**Date**: 2026-03-10
**Status**: Approved
**Scope**: Claude Code hooks + memory file architecture

---

## Problem Statement

1. New sessions start blank — Claude has zero context from prior sessions
2. Auto-compaction loses mid-session state (decisions, files in flight, next steps)
3. Memory files (MEMORY.md, topic files) are inconsistent, grow unbounded, and are never reliably referenced because Claude must choose to pull them
4. No structured schema → files become write magnets → truncation destroys older context

---

## Solution: Neural Memory System

A **push-based**, **schema-enforced**, **hook-driven** memory system where:
- Hooks inject context automatically — Claude never needs to remember to read files
- `BRIEFING.md` is the single always-current source of truth, rebuilt programmatically
- `PreCompact` + `SessionStart(compact)` pair creates a lossless compaction sandwich
- Every file has a hard line budget enforced at write time — corruption is structurally impossible

---

## Architecture

### Memory File Layout

```
~/.claude/projects/<workspace>/memory/
│
├── BRIEFING.md               ← Master briefing. Rebuilt by hooks. Always injected.
│                                50 lines max. Military-style situation report.
├── MEMORY.md                 ← Index only. 40 lines max. Pointers to domain files.
│
├── core/
│   ├── projects.md           ← Stack, repos, routes, env vars. 150 lines max.
│   ├── preferences.md        ← Hard rules, workflow prefs. 80 lines max.
│   └── patterns.md           ← Architectural decisions, conventions. 150 lines, FIFO.
│
├── sessions/
│   ├── handoff.md            ← Last PreCompact output. 80 lines max.
│   ├── history.md            ← Last 10 session summaries. 200 lines, FIFO.
│   └── archive/              ← Old handoffs. Auto-pruned to last 30.
│
├── tasks/
│   └── active.md             ← Current task snapshot. 50 lines max.
│
└── system/
    ├── hooks.log             ← Every hook run: timestamp, event, result, duration.
    └── health.json           ← Schema versions, last-write timestamps, file sizes.
```

### BRIEFING.md Schema (fixed, always this format)

```md
<!-- briefing-schema: 1.0 | generated: <ISO timestamp> -->
# Situation Briefing

## Identity
<User name + Vercel handle> | Workspace: <workspace name>
Projects: <comma-separated project names>

## Active Task
[<one-sentence task description>]
Branch: <branch> | Last commit: <short hash> — "<message>"
Files in flight: <comma-separated file paths>

## Last Session (<date> <time>)
<2-3 sentence summary of what was accomplished>
Decisions: <key choices made>
Do NOT try: <approaches tested and rejected>

## Next Step
<exact next action in one sentence>

## Standing Rules (always active)
- <rule 1>
- <rule 2>
- <rule N>
```

---

## Hook Chain

### Hook 1: `SessionStart` (always)
**File**: `~/.claude/hooks/session-init.js` (enhanced)
**Trigger**: Every session start
**Action**:
1. Read + validate `BRIEFING.md` — if corrupt, restore from `.bak`
2. Read + validate `core/preferences.md`
3. Inject both into Claude's context via stdout
4. Log to `system/hooks.log`

**Output format** (stdout → injected into Claude's window):
```
[memory] SITUATION BRIEFING — always read this first:
<BRIEFING.md contents>

[memory] PREFERENCES — always active:
<core/preferences.md contents>
```

### Hook 2: `SessionStart` with `compact` matcher
**File**: `~/.claude/hooks/post-compact-reinject.js` (new)
**Trigger**: After every auto-compaction
**Action**: Same as Hook 1 — reinjects BRIEFING.md + preferences into the new compact window
**Why separate**: The `compact` matcher ensures this fires specifically after compaction, even mid-session

### Hook 3: `PreCompact` (async)
**File**: `~/.claude/hooks/pre-compact.js` (new)
**Trigger**: Immediately before context compaction
**Async**: true (doesn't block Claude)
**Action**:
1. Read git status: `git diff --name-only HEAD`
2. Read active todos from `tasks/todo.md` + GSD state
3. Read current branch + last commit hash + message
4. Write `sessions/handoff.md` with structured handoff (schema below)
5. Rebuild `BRIEFING.md` from handoff + core files
6. Log to `system/hooks.log`

### Hook 4: `Stop` (async)
**File**: `~/.claude/hooks/stop-checkpoint.js` (new)
**Trigger**: After every Claude response
**Async**: true (zero latency impact)
**Action**:
1. Read git status (if changed since last run)
2. Update `tasks/active.md` with current branch + last commit
3. Rebuild `BRIEFING.md` if active.md changed
4. Log to `system/hooks.log`

**Guard**: Compares last-run timestamp — skips if < 30 seconds since last run (debounce)

### Hook 5: `SessionEnd`
**File**: `~/.claude/hooks/session-end.js` (new)
**Trigger**: Session terminates
**Action**:
1. Append 3-line summary to `sessions/history.md`
2. FIFO rotate history — drop oldest if > 10 entries
3. Move current `handoff.md` to `sessions/archive/YYYY-MM-DD-HH-MM.md`
4. Prune archive to last 30 files
5. Write final `health.json`
6. Log to `system/hooks.log`

---

## settings.json Hook Registration

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          { "type": "command", "command": "node \"C:/Users/vance/.claude/hooks/session-init.js\"" },
          { "type": "command", "command": "node \"C:/Users/vance/.claude/hooks/cleanup-md.js\"" },
          { "type": "command", "command": "node \"C:/Users/vance/.claude/hooks/gsd-check-update.js\"" }
        ]
      },
      {
        "matcher": "compact",
        "hooks": [
          { "type": "command", "command": "node \"C:/Users/vance/.claude/hooks/post-compact-reinject.js\"" }
        ]
      }
    ],
    "PreCompact": [
      {
        "hooks": [
          { "type": "command", "command": "node \"C:/Users/vance/.claude/hooks/pre-compact.js\"", "async": true }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          { "type": "command", "command": "node \"C:/Users/vance/.claude/hooks/stop-checkpoint.js\"", "async": true }
        ]
      }
    ],
    "SessionEnd": [
      {
        "hooks": [
          { "type": "command", "command": "node \"C:/Users/vance/.claude/hooks/session-end.js\"" }
        ]
      }
    ]
  }
}
```

---

## Corruption Prevention (7 Layers)

| Layer | Mechanism |
|---|---|
| Atomic writes | Write to `.tmp` → validate schema → rename. Half-written files impossible. |
| Schema validation | Every file has a `<!-- schema: X.X -->` header. Validated before inject and after write. |
| Auto-restore from backup | Before any write, copy current to `.bak`. If main file corrupted on read, auto-restore `.bak`. |
| Budget enforced at write time | If a write would push a file over its line limit, FIFO-drop oldest entry first, then write. |
| Read-validate before inject | SessionStart validates schema header before injecting. Injects `.bak` if main is invalid. |
| Zero npm dependencies | All hooks use only Node.js built-ins (`fs`, `path`, `os`, `child_process`). Never fails due to missing packages. |
| Graceful degradation | Every hook wrapped in try/catch. Hook failure logs to `hooks.log` and exits 0 — session continues. |

---

## Windows Hardening

- All paths use `os.homedir()` — no hardcoded `C:\Users\vance`
- Internal path separator: forward slash. Converted at OS boundary with `path.normalize()`
- All file I/O via Node.js `fs` — never shell commands that differ between bash/cmd/PowerShell
- No `chmod`/`chown` (invalid on Windows)
- All hook commands use `node script.js` — cross-platform, no `.sh` dependency
- Git commands wrapped in try/catch — if git unavailable, fall back to file-state-only mode

---

## File Budget Reference

| File | Max Lines | Rotation |
|---|---|---|
| `BRIEFING.md` | 50 | Rebuilt from scratch each time |
| `MEMORY.md` | 40 | Manual (index only, rarely changes) |
| `core/projects.md` | 150 | Manual append, FIFO on overflow |
| `core/preferences.md` | 80 | Manual edit only |
| `core/patterns.md` | 150 | FIFO — oldest decision dropped |
| `sessions/handoff.md` | 80 | Rebuilt each PreCompact |
| `sessions/history.md` | 200 | FIFO — max 10 sessions |
| `sessions/archive/` | 30 files | Auto-pruned oldest on SessionEnd |
| `tasks/active.md` | 50 | Rebuilt each Stop checkpoint |
| `system/hooks.log` | 500 lines | FIFO — oldest entries dropped |

---

## Migration Plan (from current system)

1. Existing `MEMORY.md` content → split into `core/projects.md`, `core/preferences.md`, `core/patterns.md`
2. Existing `session-init.js` → replaced with enhanced version that reads BRIEFING.md
3. Existing `cleanup-md.js` → kept as-is (still useful for MEMORY.md index)
4. Existing topic files (`gsd-system.md`, `working-philosophy.md`, etc.) → content absorbed into `core/` files, originals kept as reference
5. `tasks/lessons.md` → merged into `core/patterns.md`
6. `tasks/todo.md` → kept as-is, referenced by `tasks/active.md`

---

## Success Criteria

- [ ] New session injects BRIEFING.md automatically — no blank slate
- [ ] After auto-compaction, BRIEFING.md re-injected within 2 seconds
- [ ] PreCompact hook writes handoff.md before any context is lost
- [ ] No memory file exceeds its line budget (enforced at write time)
- [ ] All hook failures logged to hooks.log, none crash the session
- [ ] BRIEFING.md always has valid schema header (validated on read)
- [ ] Atomic writes — no half-written files even if process killed mid-write
- [ ] Git unavailability handled gracefully (file-state-only fallback)
- [ ] Zero npm dependencies across all hooks
