# Auto Skill Factory — Design Document

**Date:** 2026-02-16
**Status:** Approved
**Approach:** C (Hybrid — Skill + Validation Script)

## Problem

When Claude identifies a repeatable automation need and no suitable skill exists, there is no systematic way to create, validate, and register a new skill. Skills are created ad-hoc, inconsistently, and without safety gates.

## Solution

A "Skill-First" system with an Auto Skill Factory that:
1. Detects when a new skill is needed (vs reusing/extending existing)
2. Classifies risk level and enforces approval gates
3. Generates skill files following the existing convention
4. Validates schema, safety, and policy compliance
5. Registers the skill for immediate discovery

## File Layout

```
.claude/
├── skill-policy.md                          # Top-level Skill-First rules
├── skills/
│   ├── auto-skill-factory/
│   │   └── SKILL.md                         # Factory skill (pipeline logic)
│   ├── generated/
│   │   └── <skill-name>/
│   │       ├── SKILL.md                     # Generated skill
│   │       ├── skill.meta.json              # Structured metadata
│   │       ├── tests/
│   │       │   └── golden.md                # 2+ test examples
│   │       └── versions/                    # Version history
│   ├── generated/_failed/                   # Quarantine for validation failures
│   └── (existing handcrafted skills untouched)
├── commands/
│   └── create-skill.md                      # /create-skill command
└── scripts/
    └── validate-skills.js                   # Validation script
```

## Pipeline

```
Request → Need Assessment → Risk Classify → Generate Spec → Scaffold → Validate → Register
```

### Step 1: Need Assessment
- Search existing skills by keyword + description
- Match >= 0.70 → USE existing (stop)
- Match 0.45-0.69 → EXTEND existing (stop)
- Match < 0.45 → Evaluate 2-of-5 criteria
- /create-skill with --force-new bypasses dedup (but still runs risk check)

### Step 2: Risk Classification
- Enum: `low | medium | high`
- High-risk categories (require approval): payments, billing, subscriptions, database-mutation, data-deletion, authentication, authorization, security, deployment, infrastructure, secrets, credentials, tokens, external-api-write, email-sending, webhook-handlers, notifications
- requiresApproval only escalates, never downgrades
- Validator content-scans SKILL.md for high-risk keywords; fails if labeled low incorrectly

### Step 3: Generate Spec
- Define MVP scope + explicit non-goals
- Name, description, triggers, category
- Inputs/outputs, constraints, safety level
- 2+ golden test examples
- If --portable: omit project-specific references

### Step 4: Scaffold Files
- Write to .claude/skills/generated/<name>/
- SKILL.md, skill.meta.json, tests/golden.md, versions/

### Step 5: Validate
- Run validate-skills.js
- On failure: rollback to generated/_failed/ + report errors
- On pass: skill is live

### Step 6: Register
- Claude Code auto-discovers via directory convention
- Log creation event to skill.meta.json
- Report: skill id + how to call + limitations

## 2-of-5 Criteria (need >= 2 to create)

1. Task will be reused 3+ times
2. Task touches multiple files/systems
3. Task has non-trivial edge cases / failure modes
4. Task benefits from test coverage
5. Task is a standard capability across future projects

## Session Caps

- Max 2 auto-created skills per session
- Max 1 pending high-risk proposal at a time

## Composition Rule

Only create a "composer" skill if the composition itself meets 2-of-5. Otherwise compose ad-hoc.

## skill.meta.json Schema

```json
{
  "id": "<kebab-name>--<shortHash(repo+name+major)>",
  "version": 1,
  "versionTag": "v1",
  "name": "Human-Readable Name",
  "description": "What it does + when to use",
  "category": "category-name",
  "riskLevel": "low|medium|high",
  "portable": false,
  "status": "active|deprecated|superseded",
  "supersedes": null,
  "supersededBy": null,
  "deprecatedAt": null,
  "createdAt": "ISO-8601",
  "createdBy": "auto-skill-factory",
  "creationReason": {
    "trigger": "auto|manual",
    "request": "Original user request",
    "criteriaMatched": ["criteria-id", "..."],
    "matchScore": 0.32,
    "decision": "create-new|use-existing|extend-existing",
    "explanation": "Why this decision"
  },
  "scope": {
    "mvp": ["Feature 1", "Feature 2"],
    "nonGoals": ["Explicitly excluded 1", "Excluded 2"]
  },
  "safety": {
    "allowedTools": ["Read", "Write", "Glob", "Grep"],
    "deniedCategories": [],
    "requiresApproval": false
  },
  "validation": {
    "lastValidated": "ISO-8601",
    "policyVersion": "1.0",
    "status": "passed|failed",
    "errors": []
  }
}
```

## Validation Script (validate-skills.js)

Standalone Node script, no dependencies.

Checks:
1. YAML frontmatter: `name` and `description` present
2. Safety audit: no hardcoded secrets (sk-, Bearer, API key patterns)
3. Content-scan: SKILL.md body checked for high-risk keywords; fail if riskLevel is low but content contains high-risk actions
4. Denylist: category not in high-risk list without requiresApproval: true
5. Meta schema: required fields present (id, version, name, riskLevel, status, createdAt)
6. File structure: generated skills have SKILL.md + skill.meta.json + tests/golden.md
7. Body size: SKILL.md < 500 lines
8. Policy reference: reads/prints policyVersion from skill-policy.md header

Usage:
```bash
node .claude/scripts/validate-skills.js              # all skills
node .claude/scripts/validate-skills.js --skill foo   # one skill
node .claude/scripts/validate-skills.js --generated   # generated only
```

Exit codes: 0 = pass, 1 = failures

## /create-skill Command

Manual invocation with dedup check (bypass with --force-new):
```
/create-skill --name "skill-name" --from "description"
/create-skill --name "skill-name" --from "description" --force-new
/create-skill --name "skill-name" --from "description" --portable
```

## CLAUDE.md Changes

Add to Skill Routing:
```
- Repeatable automation need with no existing skill → auto-skill-factory skill + see skill-policy.md
```

## Files Changed

| # | File | Type | Purpose |
|---|------|------|---------|
| 1 | .claude/skill-policy.md | NEW | Skill-First rules, thresholds, caps, denylist |
| 2 | .claude/skills/auto-skill-factory/SKILL.md | NEW | Factory skill (pipeline logic + templates) |
| 3 | .claude/commands/create-skill.md | NEW | /create-skill slash command |
| 4 | .claude/scripts/validate-skills.js | NEW | Validation script |
| 5 | CLAUDE.md | MODIFY | Add routing rule |

Total: 4 new files + 1 modification. No app code touched.
