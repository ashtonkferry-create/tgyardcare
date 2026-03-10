# Neural Memory System — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a bulletproof push-based memory + compaction system so Claude never starts a session blind, never loses context to compaction, and never corrupts memory files.

**Architecture:** 5 hooks (SessionStart, SessionStart+compact, PreCompact, Stop, SessionEnd) drive a tiered memory file system. A single `BRIEFING.md` is always injected fresh. Shared `memory-utils.js` library handles all atomic writes, schema validation, budget enforcement, and FIFO rotation — used by every hook.

**Tech Stack:** Node.js built-ins only (`fs`, `path`, `os`, `child_process`). Zero npm dependencies.

---

## Paths Reference

```
HOOKS_DIR  = C:/Users/vance/.claude/hooks/
MEMORY_DIR = C:/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/
SETTINGS   = C:/Users/vance/.claude/settings.json
WORKSPACE  = C:/Users/vance/OneDrive/Desktop/claude-workspace/
```

---

## Task 1: Create memory directory structure

**Files:**
- Create dirs: `memory/core/`, `memory/sessions/`, `memory/sessions/archive/`, `memory/tasks/`, `memory/system/`

**Step 1: Create all subdirectories**

```bash
node -e "
const fs = require('fs');
const path = require('path');
const base = path.join(process.env.USERPROFILE || require('os').homedir(), '.claude', 'projects', 'c--Users-vance-OneDrive-Desktop-claude-workspace', 'memory');
const dirs = ['core', 'sessions', 'sessions/archive', 'tasks', 'system'];
dirs.forEach(d => fs.mkdirSync(path.join(base, d), { recursive: true }));
console.log('Created:', dirs.map(d => path.join(base, d)));
"
```

**Step 2: Verify directories exist**

```bash
ls /c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/
```

Expected output: `core/  sessions/  tasks/  system/`

**Step 3: Commit**

```bash
cd /c/Users/vance/.claude
git add -A
git commit -m "chore: create neural memory directory structure"
```

---

## Task 2: Create `memory-utils.js` — shared library

**Files:**
- Create: `C:/Users/vance/.claude/hooks/memory-utils.js`

This is the foundation. Every other hook imports this. Zero npm deps.

**Step 1: Write the file**

```javascript
// memory-utils.js — Shared utilities for Neural Memory System
// Zero npm dependencies. Node.js built-ins only.

'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

// ── Paths ────────────────────────────────────────────────────────────────────

const MEMORY_DIR = path.join(
  os.homedir(),
  '.claude', 'projects',
  'c--Users-vance-OneDrive-Desktop-claude-workspace',
  'memory'
);

const PATHS = {
  briefing:    path.join(MEMORY_DIR, 'BRIEFING.md'),
  memoryIndex: path.join(MEMORY_DIR, 'MEMORY.md'),
  projects:    path.join(MEMORY_DIR, 'core', 'projects.md'),
  preferences: path.join(MEMORY_DIR, 'core', 'preferences.md'),
  patterns:    path.join(MEMORY_DIR, 'core', 'patterns.md'),
  handoff:     path.join(MEMORY_DIR, 'sessions', 'handoff.md'),
  history:     path.join(MEMORY_DIR, 'sessions', 'history.md'),
  archive:     path.join(MEMORY_DIR, 'sessions', 'archive'),
  active:      path.join(MEMORY_DIR, 'tasks', 'active.md'),
  hooksLog:    path.join(MEMORY_DIR, 'system', 'hooks.log'),
  health:      path.join(MEMORY_DIR, 'system', 'health.json'),
};

// ── File budgets (max lines per file) ────────────────────────────────────────

const BUDGETS = {
  'BRIEFING.md':    50,
  'MEMORY.md':      40,
  'projects.md':   150,
  'preferences.md': 80,
  'patterns.md':   150,
  'handoff.md':     80,
  'history.md':    200,
  'active.md':      50,
  'hooks.log':     500,
};

// ── Atomic write ─────────────────────────────────────────────────────────────
// Write to .tmp → validate → rename. Prevents half-written files.

function atomicWrite(filePath, content) {
  const tmp = filePath + '.tmp';
  const bak = filePath + '.bak';

  try {
    // Backup existing file
    if (fs.existsSync(filePath)) {
      fs.copyFileSync(filePath, bak);
    }

    // Write to temp
    fs.writeFileSync(tmp, content, 'utf8');

    // Validate temp is readable
    fs.readFileSync(tmp, 'utf8');

    // Atomic rename
    fs.renameSync(tmp, filePath);

    return true;
  } catch (err) {
    // Clean up temp if it exists
    try { fs.unlinkSync(tmp); } catch {}
    throw err;
  }
}

// ── Validate + restore ───────────────────────────────────────────────────────
// Read a file; if corrupt/missing, restore from .bak. Returns content or null.

function safeRead(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content && content.trim().length > 0) return content;
  } catch {}

  // Try backup
  const bak = filePath + '.bak';
  try {
    const bakContent = fs.readFileSync(bak, 'utf8');
    if (bakContent && bakContent.trim().length > 0) {
      log('WARN', `Restored ${path.basename(filePath)} from backup`);
      atomicWrite(filePath, bakContent);
      return bakContent;
    }
  } catch {}

  return null;
}

// ── Budget enforcement ───────────────────────────────────────────────────────
// Trim content to budget before writing. FIFO: removes from top (oldest first).

function enforceBudget(content, fileName) {
  const budget = BUDGETS[fileName];
  if (!budget) return content;

  const lines = content.split('\n');
  if (lines.length <= budget) return content;

  // Drop oldest lines from the top (after any header comment)
  // Preserve the first line if it's a schema comment
  const firstLine = lines[0];
  const isSchemaHeader = firstLine.startsWith('<!--');

  if (isSchemaHeader) {
    const body = lines.slice(1);
    const trimmed = body.slice(body.length - (budget - 1));
    return [firstLine, ...trimmed].join('\n');
  }

  return lines.slice(lines.length - budget).join('\n');
}

// ── FIFO append ──────────────────────────────────────────────────────────────
// Append new content to a file, enforcing budget via FIFO.

function fifoAppend(filePath, newContent, fileName) {
  const existing = safeRead(filePath) || '';
  const combined = existing.trimEnd() + '\n\n' + newContent.trim();
  const budgeted = enforceBudget(combined, fileName || path.basename(filePath));
  atomicWrite(filePath, budgeted + '\n');
}

// ── Git helpers ──────────────────────────────────────────────────────────────

function getGitState(cwd) {
  const state = {
    branch: 'unknown',
    lastCommit: 'unknown',
    lastMessage: 'unknown',
    modifiedFiles: [],
    available: false,
  };

  try {
    state.branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd, timeout: 5000 })
      .toString().trim();
    state.lastCommit = execSync('git rev-parse --short HEAD', { cwd, timeout: 5000 })
      .toString().trim();
    state.lastMessage = execSync('git log -1 --pretty=%s', { cwd, timeout: 5000 })
      .toString().trim();
    state.modifiedFiles = execSync('git diff --name-only HEAD', { cwd, timeout: 5000 })
      .toString().trim().split('\n').filter(Boolean);
    state.available = true;
  } catch {
    // Git unavailable — continue with file-state-only mode
  }

  return state;
}

// ── Logging ──────────────────────────────────────────────────────────────────

function log(level, message, hookName = '') {
  try {
    const ts = new Date().toISOString();
    const entry = `${ts} [${level}] ${hookName ? `[${hookName}] ` : ''}${message}\n`;
    fifoAppend(PATHS.hooksLog, entry.trim(), 'hooks.log');
  } catch {
    // Never let logging crash a hook
  }
}

// ── Schema header ─────────────────────────────────────────────────────────────

function makeSchemaHeader(schemaName, version = '1.0') {
  return `<!-- schema:${schemaName} v${version} | generated:${new Date().toISOString()} -->`;
}

function hasValidSchema(content, schemaName) {
  return content && content.includes(`schema:${schemaName}`);
}

// ── Exports ──────────────────────────────────────────────────────────────────

module.exports = {
  MEMORY_DIR,
  PATHS,
  BUDGETS,
  atomicWrite,
  safeRead,
  enforceBudget,
  fifoAppend,
  getGitState,
  log,
  makeSchemaHeader,
  hasValidSchema,
};
```

**Step 2: Verify it loads without error**

```bash
node -e "const u = require('C:/Users/vance/.claude/hooks/memory-utils.js'); console.log('PATHS OK:', Object.keys(u.PATHS).length, 'paths defined');"
```

Expected: `PATHS OK: 12 paths defined`

**Step 3: Commit**

```bash
cd /c/Users/vance/.claude
git add hooks/memory-utils.js
git commit -m "feat: add memory-utils.js shared library for neural memory system"
```

---

## Task 3: Create `build-briefing.js` — BRIEFING.md builder

**Files:**
- Create: `C:/Users/vance/.claude/hooks/build-briefing.js`

This script rebuilds `BRIEFING.md` from current state. Called by multiple hooks.

**Step 1: Write the file**

```javascript
// build-briefing.js — Rebuild BRIEFING.md from current system state
// Called by: pre-compact.js, stop-checkpoint.js, session-end.js

'use strict';

const path = require('path');
const os = require('os');
const {
  PATHS, atomicWrite, safeRead, enforceBudget,
  getGitState, makeSchemaHeader, log
} = require('./memory-utils.js');

const WORKSPACE = path.join(
  os.homedir(), 'OneDrive', 'Desktop', 'claude-workspace'
);

const HOOK = 'build-briefing';

function buildBriefing() {
  try {
    // Read component files
    const handoff    = safeRead(PATHS.handoff)    || '';
    const active     = safeRead(PATHS.active)     || '';
    const prefs      = safeRead(PATHS.preferences) || '';
    const git        = getGitState(WORKSPACE);

    // Extract active task from active.md (first non-comment, non-blank line after ## Active Task)
    let activeTask = 'No active task';
    const activeMatch = active.match(/## Active Task\n([^\n]+)/);
    if (activeMatch) activeTask = activeMatch[1].trim();

    // Extract last session summary from handoff.md
    let lastSession = '';
    const handoffMatch = handoff.match(/## Handoff[^\n]*\n([\s\S]*?)(?=\n##|$)/);
    if (handoffMatch) lastSession = handoffMatch[1].trim().slice(0, 300);

    // Extract next step from handoff.md
    let nextStep = 'Check tasks/active.md for next action';
    const nextMatch = handoff.match(/\*\*Next Step\*\*:?\s*([^\n]+)/);
    if (nextMatch) nextStep = nextMatch[1].trim();

    // Extract files in flight from active.md
    let filesInFlight = 'None tracked yet';
    const filesMatch = active.match(/\*\*Files in flight\*\*:?\s*([^\n]+)/);
    if (filesMatch) filesInFlight = filesMatch[1].trim();

    // Extract key standing rules from preferences (first 8 bullet points)
    const prefLines = prefs.split('\n')
      .filter(l => l.startsWith('- ') || l.startsWith('* '))
      .slice(0, 8)
      .map(l => l.trim());

    // Build git line
    const gitLine = git.available
      ? `Branch: ${git.branch} | Last commit: ${git.lastCommit} — "${git.lastMessage}"`
      : 'Git: unavailable (file-state mode)';

    // Compose BRIEFING.md
    const lines = [
      makeSchemaHeader('briefing'),
      '# Situation Briefing',
      '',
      '## Identity',
      'Vance (ashtonkferry-create) | Workspace: claude-workspace',
      'Projects: workely.ai (monorepo at workely.ai/), TotalGuard (tgyardcare/)',
      '',
      '## Active Task',
      `[${activeTask}]`,
      gitLine,
      `Files in flight: ${filesInFlight}`,
      '',
    ];

    if (lastSession) {
      lines.push('## Last Session Context');
      lastSession.split('\n').forEach(l => lines.push(l));
      lines.push('');
    }

    lines.push('## Next Step');
    lines.push(nextStep);
    lines.push('');

    if (prefLines.length > 0) {
      lines.push('## Standing Rules (always active)');
      prefLines.forEach(l => lines.push(l));
      lines.push('');
    }

    const content = enforceBudget(lines.join('\n'), 'BRIEFING.md');
    atomicWrite(PATHS.briefing, content);
    log('INFO', 'BRIEFING.md rebuilt successfully', HOOK);
    return true;
  } catch (err) {
    log('ERROR', `Failed to build BRIEFING.md: ${err.message}`, HOOK);
    return false;
  }
}

// Run directly or export
if (require.main === module) {
  const ok = buildBriefing();
  process.exit(ok ? 0 : 1);
}

module.exports = { buildBriefing };
```

**Step 2: Test it runs (even with empty files)**

```bash
node "C:/Users/vance/.claude/hooks/build-briefing.js"
cat "/c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/BRIEFING.md"
```

Expected: BRIEFING.md created with schema header and sections.

**Step 3: Commit**

```bash
cd /c/Users/vance/.claude
git add hooks/build-briefing.js
git commit -m "feat: add build-briefing.js — BRIEFING.md generator"
```

---

## Task 4: Initialize core memory files

**Files:**
- Create: `memory/core/preferences.md`
- Create: `memory/core/projects.md`
- Create: `memory/core/patterns.md`
- Create: `memory/tasks/active.md`
- Create: `memory/sessions/handoff.md`
- Create: `memory/sessions/history.md`

**Step 1: Create `core/preferences.md`** (distilled from MEMORY.md hard rules)

```markdown
<!-- schema:preferences v1.0 | generated:2026-03-10T00:00:00Z -->
# User Preferences & Hard Rules

## Workflow
- SESSION START = GSD FIRST: every session begins with /gsd:progress
- Auto-commit AND push automatically — never ask, never wait
- NEVER build/modify ANY UI without activating frontend-design skill first
- ALWAYS follow CLAUDE.md routing rules (10-agent team, skill routing)
- THE SHORTEST PATH RULE: never suggest paid/multi-step solutions without researching free/direct path first

## Communication
- Support email: workelyhelp@gmail.com (ALL email refs — never support@workely.ai)
- All mailto links: ?subject=Workely%20Support%20Request
- Never ask to re-authenticate — check auth status first

## Code Standards
- Never use Inter/Roboto/Arial — use Clash Display, Satoshi, Geist, Plus Jakarta Sans
- Never flat solid backgrounds — use animated-grid-pattern, dot-pattern, gradients
- Server Components by default — only 'use client' when needed
- TypeScript types always — no `any`, no `as unknown`
- Check Magic UI MCP before building animation components from scratch

## Services (persistent auth — never re-login)
- Vercel CLI: ashtonkferry-create (credentials on disk)
- Vercel MCP: connected and authenticated
- Supabase MCP: project ref fvjeweajwwktipiifxua
- GitHub MCP: connected
```

**Step 2: Create `core/projects.md`** (distilled from MEMORY.md projects section)

```markdown
<!-- schema:projects v1.0 | generated:2026-03-10T00:00:00Z -->
# Projects Reference

## workely.ai
- Monorepo (pnpm workspaces): github.com/ashtonkferry-create/workelyai
- apps/web/ — Next.js 16, App Router (apps/web/src/app/). Zustand, Stripe, Inngest, Anthropic SDK
- apps/hubspot-app/ — HubSpot CLI, Marketplace distribution
- packages/core/ — Shared types + API client (@workely/core)
- Run: pnpm dev (root), pnpm hubspot:dev
- Vercel: rootDirectory=apps/web, nodeVersion=20.x

## TotalGuard Yard Care (always call it "TotalGuard")
- Repo: github.com/ashtonkferry-create/tgyardcare-next
- Local: C:/Users/vance/OneDrive/Desktop/claude-workspace/tgyardcare/
- Preview: https://tgyardcare-next.vercel.app
- Stack: Next.js 16.1.6, React 19, Tailwind 3.4, shadcn/ui, Supabase (lwtmvzhwekgdxkaisfra)
- Routes: 76 (services, commercial, locations, blog, admin)
- Key: typescript.ignoreBuildErrors=true, legacy-peer-deps=true

## Authenticated Services
- Supabase workely: fvjeweajwwktipiifxua
- Supabase TotalGuard: lwtmvzhwekgdxkaisfra
- Vercel token: (stored in memory/core/credentials.md — not in plan docs)
```

**Step 3: Create `core/patterns.md`** (key architectural decisions)

```markdown
<!-- schema:patterns v1.0 | generated:2026-03-10T00:00:00Z -->
# Architectural Decisions & Patterns

## workely.ai
- organization_id vs workspace_id bridged by resolveOrgId() in src/lib/revenue/resolve-org.ts
- Supabase query chains: .order() must be LAST call (after all filters)
- Inngest step.run returns Jsonify-wrapped values — return plain values from inside step
- Parent-level roles override workspace-level in RBAC
- Copilot endpoint: POST /api/copilot/chat — messages[], pathname, search
- Copilot route registry: lib/copilot/knowledge/route-registry.ts (35 routes, ONLY emit validated hrefs)

## TotalGuard
- createClient MUST be inside handler body (not module level) — build fails otherwise
- Tailwind v3: order-13+ needs order-[13] arbitrary syntax (not order-13)
- ALL direct flex children of flex-col need explicit order class (implicit order:0 breaks layout)
- 3-season model: winter (mmdd>=1115 || <=314), fall (915-1114), summer (rest)
- Schema architecture: schema-constants.ts → schema-factory.ts → schemas/*.tsx

## General
- Hooks that need cross-platform compat: use Node.js fs, not shell commands
- All memory writes: atomic (write .tmp → rename)
```

**Step 4: Create `tasks/active.md`**

```markdown
<!-- schema:active v1.0 | generated:2026-03-10T00:00:00Z -->
# Active Task

## Active Task
No active task — new session

**Branch**: main
**Files in flight**: None
**Last updated**: 2026-03-10
```

**Step 5: Create `sessions/handoff.md`**

```markdown
<!-- schema:handoff v1.0 | generated:2026-03-10T00:00:00Z -->
# Session Handoff

## Handoff — 2026-03-10 (bootstrap)
Neural Memory System initialized. No prior session to hand off from.
**Next Step**: Check /gsd:progress for current project state.
```

**Step 6: Create `sessions/history.md`**

```markdown
<!-- schema:history v1.0 | generated:2026-03-10T00:00:00Z -->
# Session History (last 10, FIFO)

## 2026-03-10
Neural Memory System bootstrapped. Core files initialized.
```

**Step 7: Verify all files exist**

```bash
ls /c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/core/
ls /c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/sessions/
ls /c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/tasks/
```

**Step 8: Run build-briefing to generate initial BRIEFING.md**

```bash
node "C:/Users/vance/.claude/hooks/build-briefing.js"
cat "/c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/BRIEFING.md"
```

**Step 9: Commit**

```bash
cd /c/Users/vance/.claude
git add -A
git commit -m "feat: initialize neural memory core files and BRIEFING.md"
```

---

## Task 5: Rewrite `session-init.js` — inject BRIEFING.md

**Files:**
- Modify: `C:/Users/vance/.claude/hooks/session-init.js`

**Step 1: Replace the file**

```javascript
/**
 * SESSION INIT HOOK — Neural Memory System v2
 *
 * Runs at SessionStart (normal + compact).
 * Injects BRIEFING.md + core/preferences.md into Claude's context.
 * Falls back gracefully if files are missing.
 */

'use strict';

const { PATHS, safeRead, log, hasValidSchema } = require('./memory-utils.js');

const HOOK = 'session-init';
const output = [];

// ── 1. Inject BRIEFING.md ─────────────────────────────────────────────────

const briefing = safeRead(PATHS.briefing);
if (briefing && hasValidSchema(briefing, 'briefing')) {
  output.push('[memory] SITUATION BRIEFING — read this first:');
  output.push(briefing.trim());
  output.push('');
} else {
  output.push('[memory] No BRIEFING.md found — starting cold. Run /gsd:progress to orient.');
  output.push('');
}

// ── 2. Inject active task (if different from briefing) ────────────────────

const active = safeRead(PATHS.active);
if (active && active.includes('## Active Task')) {
  output.push('[memory] ACTIVE TASK:');
  const taskLine = active.split('\n').find(l => l.startsWith('[') || l.startsWith('**Active'));
  if (taskLine) output.push(taskLine.trim());
  output.push('');
}

// ── 3. Workflow reminder ──────────────────────────────────────────────────

output.push('[memory] WORKFLOW REMINDER:');
output.push('  1. THINK  — /brainstorm first for any new feature');
output.push('  2. PLAN   — docs/plans/YYYY-MM-DD-<topic>-design.md → approval');
output.push('  3. BUILD  — docs/plans/YYYY-MM-DD-<topic>-plan.md → execute');
output.push('  4. VERIFY — Screenshot 375/768/1440px, type-check, lint');
output.push('');

// ── Output ────────────────────────────────────────────────────────────────

if (output.length > 0) {
  console.log(output.join('\n'));
}

log('INFO', 'session-init completed', HOOK);
```

**Step 2: Test it**

```bash
node "C:/Users/vance/.claude/hooks/session-init.js"
```

Expected: Prints BRIEFING.md content + workflow reminder. No errors.

**Step 3: Commit**

```bash
cd /c/Users/vance/.claude
git add hooks/session-init.js
git commit -m "feat: rewrite session-init.js to inject BRIEFING.md"
```

---

## Task 6: Create `post-compact-reinject.js` — compact hook

**Files:**
- Create: `C:/Users/vance/.claude/hooks/post-compact-reinject.js`

This fires specifically after auto-compaction via the `compact` matcher on SessionStart.

**Step 1: Write the file**

```javascript
/**
 * POST-COMPACT REINJECT HOOK
 *
 * Fires: SessionStart with compact matcher (after auto-compaction)
 * Purpose: Reinject BRIEFING.md into the new compact context window.
 *
 * This is the second half of the compaction sandwich:
 *   PreCompact → writes handoff → compaction happens → this fires → reinjects
 */

'use strict';

const { PATHS, safeRead, log, hasValidSchema, buildBriefing } = require('./memory-utils.js');

// Rebuild briefing from latest handoff (PreCompact may have just updated it)
let { buildBriefing: rebuild } = {};
try {
  rebuild = require('./build-briefing.js').buildBriefing;
  rebuild();
} catch (err) {
  log('WARN', `Could not rebuild BRIEFING.md: ${err.message}`, 'post-compact-reinject');
}

const HOOK = 'post-compact-reinject';
const output = [];

output.push('[memory:compact] Context was compacted. Reinjecting situation briefing:');
output.push('');

const briefing = safeRead(PATHS.briefing);
if (briefing && hasValidSchema(briefing, 'briefing')) {
  output.push(briefing.trim());
} else {
  output.push('[memory:compact] BRIEFING.md unavailable — check memory/BRIEFING.md');
}

output.push('');
output.push('[memory:compact] Resume from "Next Step" above. All prior context was compacted.');

console.log(output.join('\n'));
log('INFO', 'Post-compact reinject completed', HOOK);
```

**Step 2: Test**

```bash
node "C:/Users/vance/.claude/hooks/post-compact-reinject.js"
```

Expected: Prints BRIEFING.md with compact prefix header.

**Step 3: Commit**

```bash
cd /c/Users/vance/.claude
git add hooks/post-compact-reinject.js
git commit -m "feat: add post-compact-reinject.js for seamless compaction recovery"
```

---

## Task 7: Create `pre-compact.js` — PreCompact hook

**Files:**
- Create: `C:/Users/vance/.claude/hooks/pre-compact.js`

Fires RIGHT BEFORE compaction. Writes structured handoff.md capturing full session state.

**Step 1: Write the file**

```javascript
/**
 * PRE-COMPACT HOOK
 *
 * Fires: PreCompact (before context auto-compaction)
 * Async: true (doesn't block Claude)
 * Purpose: Write structured handoff.md before context is lost.
 *          Rebuilds BRIEFING.md so post-compact reinject has fresh data.
 */

'use strict';

const path = require('path');
const os   = require('os');
const fs   = require('fs');
const {
  PATHS, atomicWrite, safeRead, fifoAppend,
  getGitState, makeSchemaHeader, log
} = require('./memory-utils.js');
const { buildBriefing } = require('./build-briefing.js');

const WORKSPACE = path.join(os.homedir(), 'OneDrive', 'Desktop', 'claude-workspace');
const HOOK = 'pre-compact';

function readTodos() {
  const todoPath = path.join(WORKSPACE, 'tasks', 'todo.md');
  try {
    const content = fs.readFileSync(todoPath, 'utf8');
    // Extract unchecked items
    const items = content.split('\n')
      .filter(l => l.includes('[ ]') || l.includes('- [ ]'))
      .slice(0, 5)
      .map(l => l.trim());
    return items.length > 0 ? items.join('\n') : 'No pending todos';
  } catch {
    return 'tasks/todo.md not found';
  }
}

function readActiveGSDPhase() {
  // Try to read GSD state if it exists
  const gsdState = path.join(WORKSPACE, '.planning', 'state.json');
  try {
    const state = JSON.parse(fs.readFileSync(gsdState, 'utf8'));
    return `Phase ${state.currentPhase || '?'}: ${state.phaseName || 'unknown'}`;
  } catch {
    return 'No GSD phase state found';
  }
}

function run() {
  try {
    const git = getGitState(WORKSPACE);
    const todos = readTodos();
    const gsdPhase = readActiveGSDPhase();
    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').slice(0, 16);

    // Read current active.md for task context
    const active = safeRead(PATHS.active) || '';
    let activeTask = 'Unknown — check tasks/active.md';
    const taskMatch = active.match(/\[([^\]]+)\]/);
    if (taskMatch) activeTask = taskMatch[1];

    // Read current handoff for decisions (don't lose prior decisions)
    const prevHandoff = safeRead(PATHS.handoff) || '';
    let prevDecisions = '';
    const decMatch = prevHandoff.match(/\*\*Decisions Made\*\*:([\s\S]*?)(?=\n\*\*|$)/);
    if (decMatch) prevDecisions = decMatch[1].trim();

    const handoffContent = [
      makeSchemaHeader('handoff'),
      '# Session Handoff',
      '',
      `## Handoff — ${dateStr}`,
      `**Active Task**: ${activeTask}`,
      `**GSD Phase**: ${gsdPhase}`,
      git.available
        ? `**Branch**: ${git.branch} | Last commit: ${git.lastCommit} — "${git.lastMessage}"`
        : '**Branch**: git unavailable',
      git.modifiedFiles.length > 0
        ? `**Files Modified This Session**:\n${git.modifiedFiles.map(f => `  - ${f}`).join('\n')}`
        : '**Files Modified**: None (clean working tree)',
      `**Decisions Made**: ${prevDecisions || 'None recorded this session'}`,
      `**Next Step**: ${readNextStep(active)}`,
      `**Pending Todos**:\n${todos.split('\n').map(t => `  ${t}`).join('\n')}`,
    ].join('\n');

    atomicWrite(PATHS.handoff, handoffContent + '\n');
    log('INFO', `Handoff written. Task: ${activeTask}`, HOOK);

    // Rebuild BRIEFING.md immediately so post-compact reinject has fresh data
    buildBriefing();
    log('INFO', 'BRIEFING.md rebuilt pre-compaction', HOOK);

  } catch (err) {
    log('ERROR', `pre-compact failed: ${err.message}`, HOOK);
    process.exit(0); // Never block compaction
  }
}

function readNextStep(activeContent) {
  const match = activeContent.match(/\*\*Next Step\*\*:?\s*([^\n]+)/);
  return match ? match[1].trim() : 'Check tasks/active.md and tasks/todo.md';
}

run();
```

**Step 2: Test**

```bash
node "C:/Users/vance/.claude/hooks/pre-compact.js"
cat "/c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/sessions/handoff.md"
```

Expected: `handoff.md` written with current git state and task info. No errors.

**Step 3: Commit**

```bash
cd /c/Users/vance/.claude
git add hooks/pre-compact.js
git commit -m "feat: add pre-compact.js — capture state before context compaction"
```

---

## Task 8: Create `stop-checkpoint.js` — rolling state save

**Files:**
- Create: `C:/Users/vance/.claude/hooks/stop-checkpoint.js`

Fires async after every Claude response. Debounced to 30s. Updates `tasks/active.md` and rebuilds BRIEFING.md when git state changes.

**Step 1: Write the file**

```javascript
/**
 * STOP CHECKPOINT HOOK
 *
 * Fires: Stop (after every Claude response)
 * Async: true (zero latency — runs in background)
 * Debounce: skips if run < 30s ago
 * Purpose: Keep tasks/active.md current. Rebuild BRIEFING.md on git change.
 */

'use strict';

const path = require('path');
const os   = require('os');
const fs   = require('fs');
const {
  PATHS, atomicWrite, safeRead,
  getGitState, makeSchemaHeader, log
} = require('./memory-utils.js');
const { buildBriefing } = require('./build-briefing.js');

const WORKSPACE  = path.join(os.homedir(), 'OneDrive', 'Desktop', 'claude-workspace');
const DEBOUNCE_S = 30;
const HOOK       = 'stop-checkpoint';
const STAMP_FILE = path.join(PATHS.active + '.stamp');

function getLastRun() {
  try { return parseInt(fs.readFileSync(STAMP_FILE, 'utf8').trim(), 10) || 0; }
  catch { return 0; }
}

function setLastRun() {
  try { fs.writeFileSync(STAMP_FILE, String(Date.now()), 'utf8'); }
  catch {}
}

function run() {
  try {
    const now = Date.now();
    const lastRun = getLastRun();

    if ((now - lastRun) < DEBOUNCE_S * 1000) {
      // Too soon — skip
      return;
    }

    const git = getGitState(WORKSPACE);

    // Read previous active to detect changes
    const prevActive = safeRead(PATHS.active) || '';
    const prevCommit = (prevActive.match(/Last commit:\s*([a-f0-9]+)/) || [])[1] || '';

    const now_str = new Date().toISOString().replace('T', ' ').slice(0, 16);

    const activeContent = [
      makeSchemaHeader('active'),
      '# Active Task',
      '',
      '## Active Task',
      '[Check handoff.md for last known task]',
      '',
      git.available
        ? `**Branch**: ${git.branch} | Last commit: ${git.lastCommit} — "${git.lastMessage}"`
        : '**Branch**: git unavailable',
      git.modifiedFiles.length > 0
        ? `**Files in flight**: ${git.modifiedFiles.join(', ')}`
        : '**Files in flight**: None (clean)',
      `**Last updated**: ${now_str}`,
    ].join('\n');

    atomicWrite(PATHS.active, activeContent + '\n');
    setLastRun();

    // Only rebuild BRIEFING.md if git state changed (commit hash differs)
    if (git.available && git.lastCommit !== prevCommit) {
      buildBriefing();
      log('INFO', `State updated. New commit detected: ${git.lastCommit}`, HOOK);
    } else {
      log('INFO', 'State updated (no new commit)', HOOK);
    }

  } catch (err) {
    log('ERROR', `stop-checkpoint failed: ${err.message}`, HOOK);
    // Never throw — async hook, nothing to block
  }
}

run();
```

**Step 2: Test**

```bash
node "C:/Users/vance/.claude/hooks/stop-checkpoint.js"
cat "/c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/tasks/active.md"
```

Expected: `active.md` updated with current branch + commit. No errors.

**Step 3: Run twice quickly to verify debounce**

```bash
node "C:/Users/vance/.claude/hooks/stop-checkpoint.js" && node "C:/Users/vance/.claude/hooks/stop-checkpoint.js"
grep "stop-checkpoint" "/c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/system/hooks.log" | tail -3
```

Expected: Only one log entry (second run skipped by debounce).

**Step 4: Commit**

```bash
cd /c/Users/vance/.claude
git add hooks/stop-checkpoint.js
git commit -m "feat: add stop-checkpoint.js — rolling state save after each response"
```

---

## Task 9: Create `session-end.js` — history + archive

**Files:**
- Create: `C:/Users/vance/.claude/hooks/session-end.js`

**Step 1: Write the file**

```javascript
/**
 * SESSION END HOOK
 *
 * Fires: SessionEnd
 * Purpose: Append 3-line session summary to history.md (FIFO max 10).
 *          Archive current handoff.md. Prune archive to 30 files.
 *          Write health.json.
 */

'use strict';

const path = require('path');
const os   = require('os');
const fs   = require('fs');
const {
  PATHS, safeRead, fifoAppend, getGitState, log, BUDGETS
} = require('./memory-utils.js');

const WORKSPACE    = path.join(os.homedir(), 'OneDrive', 'Desktop', 'claude-workspace');
const MAX_ARCHIVE  = 30;
const MAX_HISTORY  = 10;
const HOOK         = 'session-end';

function appendHistory(git) {
  const dateStr = new Date().toISOString().slice(0, 10);
  const active  = safeRead(PATHS.active) || '';
  const taskMatch = active.match(/\[([^\]]+)\]/);
  const task = taskMatch ? taskMatch[1] : 'unknown task';

  const summary = [
    `## ${dateStr}`,
    git.available
      ? `Branch: ${git.branch} | Commit: ${git.lastCommit} — ${git.lastMessage}`
      : 'Git unavailable',
    `Task: ${task}`,
    '',
  ].join('\n');

  // FIFO: enforce max 10 sessions in history
  const existing = safeRead(PATHS.history) || '';
  const sections = existing.split(/(?=^## \d{4}-)/m).filter(Boolean);
  if (sections.length >= MAX_HISTORY) {
    sections.shift(); // Drop oldest
  }
  sections.push(summary);

  const header = existing.split('\n')[0].startsWith('<!--')
    ? existing.split('\n')[0] + '\n# Session History (last 10, FIFO)\n'
    : '<!-- schema:history v1.0 -->\n# Session History (last 10, FIFO)\n';

  const newContent = header + '\n' + sections.join('');
  const { atomicWrite } = require('./memory-utils.js');
  atomicWrite(PATHS.history, newContent);
}

function archiveHandoff() {
  const handoff = safeRead(PATHS.handoff);
  if (!handoff) return;

  const timestamp = new Date().toISOString().replace(/:/g, '-').slice(0, 16);
  const archivePath = path.join(PATHS.archive, `${timestamp}.md`);

  try {
    fs.writeFileSync(archivePath, handoff, 'utf8');
  } catch {}

  // Prune archive to MAX_ARCHIVE files (oldest first)
  try {
    const files = fs.readdirSync(PATHS.archive)
      .filter(f => f.endsWith('.md'))
      .sort();
    if (files.length > MAX_ARCHIVE) {
      files.slice(0, files.length - MAX_ARCHIVE).forEach(f => {
        try { fs.unlinkSync(path.join(PATHS.archive, f)); } catch {}
      });
    }
  } catch {}
}

function writeHealth() {
  const health = {
    lastSession: new Date().toISOString(),
    files: {},
  };

  Object.entries(PATHS).forEach(([key, p]) => {
    if (typeof p === 'string' && p.endsWith('.md')) {
      try {
        const stat = fs.statSync(p);
        const lines = fs.readFileSync(p, 'utf8').split('\n').length;
        health.files[key] = { lines, bytes: stat.size, modified: stat.mtime };
      } catch {
        health.files[key] = { error: 'not found' };
      }
    }
  });

  const { atomicWrite } = require('./memory-utils.js');
  try {
    atomicWrite(PATHS.health, JSON.stringify(health, null, 2));
  } catch {}
}

function run() {
  try {
    const git = getGitState(WORKSPACE);
    appendHistory(git);
    archiveHandoff();
    writeHealth();
    log('INFO', 'Session end: history updated, handoff archived, health written', HOOK);
  } catch (err) {
    log('ERROR', `session-end failed: ${err.message}`, HOOK);
  }
}

run();
```

**Step 2: Test**

```bash
node "C:/Users/vance/.claude/hooks/session-end.js"
cat "/c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/sessions/history.md"
ls "/c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/sessions/archive/"
```

Expected: History entry appended. Archive file created. health.json written.

**Step 3: Commit**

```bash
cd /c/Users/vance/.claude
git add hooks/session-end.js
git commit -m "feat: add session-end.js — history rotation and archive"
```

---

## Task 10: Register all hooks in `settings.json`

**Files:**
- Modify: `C:/Users/vance/.claude/settings.json`

**Step 1: Update the `hooks` section** (replace the existing hooks block entirely)

The new hooks block to put in settings.json:

```json
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
```

**Step 2: Validate settings.json is valid JSON**

```bash
node -e "JSON.parse(require('fs').readFileSync('C:/Users/vance/.claude/settings.json','utf8')); console.log('✓ settings.json valid JSON');"
```

Expected: `✓ settings.json valid JSON`

**Step 3: Commit**

```bash
cd /c/Users/vance/.claude
git add settings.json
git commit -m "feat: register all neural memory hooks in settings.json"
```

---

## Task 11: Rewrite `MEMORY.md` as index-only

**Files:**
- Modify: `~/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/MEMORY.md`

**Step 1: Replace with clean index**

```markdown
<!-- schema:index v1.0 | generated:2026-03-10T00:00:00Z -->
# Memory Index

This file is an INDEX ONLY. Data lives in domain files. Never dump content here.

## Quick Reference
- Situation briefing: `BRIEFING.md` ← injected automatically at every session
- User preferences + hard rules: `core/preferences.md`
- Project facts (stacks, repos, env): `core/projects.md`
- Code patterns + decisions: `core/patterns.md`
- Last session handoff: `sessions/handoff.md`
- Session history (last 10): `sessions/history.md`
- Active task: `tasks/active.md`
- Hook run log: `system/hooks.log`
- System health: `system/health.json`

## User
Vance (ashtonkferry-create on Vercel)

## Projects
- workely.ai — monorepo, github.com/ashtonkferry-create/workelyai
- TotalGuard — tgyardcare/, github.com/ashtonkferry-create/tgyardcare-next
```

**Step 2: Verify line count is under 40**

```bash
wc -l "/c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/MEMORY.md"
```

Expected: Under 40 lines.

**Step 3: Commit**

```bash
cd /c/Users/vance/.claude
git add -A
git commit -m "refactor: MEMORY.md to index-only, all data in domain files"
```

---

## Task 12: Smoke test full hook chain

**Step 1: Test session-init (what fires at session start)**

```bash
node "C:/Users/vance/.claude/hooks/session-init.js"
```

Expected: Prints BRIEFING.md with identity, active task, last session, next step, standing rules.

**Step 2: Test pre-compact (what fires before compaction)**

```bash
node "C:/Users/vance/.claude/hooks/pre-compact.js"
cat "/c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/sessions/handoff.md"
```

Expected: handoff.md has correct date, git state, task info.

**Step 3: Test post-compact-reinject (what fires after compaction)**

```bash
node "C:/Users/vance/.claude/hooks/post-compact-reinject.js"
```

Expected: Prints updated BRIEFING.md with `[memory:compact]` prefix.

**Step 4: Test stop-checkpoint (what fires after each response)**

```bash
node "C:/Users/vance/.claude/hooks/stop-checkpoint.js"
cat "/c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/tasks/active.md"
```

Expected: active.md updated with current timestamp and git state.

**Step 5: Test session-end (what fires at session end)**

```bash
node "C:/Users/vance/.claude/hooks/session-end.js"
cat "/c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/sessions/history.md"
cat "/c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/system/health.json"
```

Expected: history.md has new entry. health.json written with file sizes.

**Step 6: Test that all hooks fail gracefully when memory dir is empty**

```bash
# Rename briefing temporarily
mv "/c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/BRIEFING.md" "/c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/BRIEFING.md.test"
node "C:/Users/vance/.claude/hooks/session-init.js"
# Expected: prints "No BRIEFING.md found — starting cold" message, no crash
mv "/c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/BRIEFING.md.test" "/c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/BRIEFING.md"
```

**Step 7: Check hooks.log**

```bash
cat "/c/Users/vance/.claude/projects/c--Users-vance-OneDrive-Desktop-claude-workspace/memory/system/hooks.log"
```

Expected: All 5 hook runs logged with timestamps.

**Step 8: Final commit**

```bash
cd /c/Users/vance/.claude
git add -A
git commit -m "test: neural memory system smoke tests pass"
```

---

## Success Checklist

- [ ] `memory-utils.js` loads with zero errors, exports 12 paths
- [ ] `BRIEFING.md` generated with valid schema header and all 5 sections
- [ ] `session-init.js` injects BRIEFING.md on every run
- [ ] `post-compact-reinject.js` prints compact-prefixed briefing
- [ ] `pre-compact.js` writes handoff.md with git state (or graceful fallback)
- [ ] `stop-checkpoint.js` updates active.md, debounces correctly
- [ ] `session-end.js` appends history, archives handoff, writes health.json
- [ ] All hooks exit 0 even when memory files are missing
- [ ] hooks.log populated with entries from all 5 hooks
- [ ] MEMORY.md is under 40 lines, index-only
- [ ] settings.json is valid JSON with all 5 hooks registered
- [ ] No npm packages required by any hook
