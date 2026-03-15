---
phase: 01-revenue-engine
plan: 02
subsystem: automation-routing
tags: [n8n, TG-05, event-router, jobber]
dependency-graph:
  requires: []
  provides: [TG-05-event-router-extended]
  affects: [01-03, 01-04, 01-05, 01-06, 01-07, 01-08]
tech-stack:
  added: []
  patterns: [execute-sub-workflow, fan-out-routing]
key-files:
  created: []
  modified:
    - tgyardcare/automation/n8n-workflows/TG-05-jobber-email-parser.json
decisions:
  - id: D-0102-1
    decision: "Workflow remains inactive until sub-workflow IDs are populated"
    reason: "n8n cannot activate workflows with empty executeWorkflow references"
    impact: "TG-05 will be activated after TG-83/84/86/88/89 are created and IDs backfilled"
metrics:
  duration: "8 minutes"
  completed: "2026-03-15"
---

# Phase 1 Plan 02: TG-05 Extension Summary

**One-liner:** Extended TG-05 Jobber Email Parser with 15min polling, 4 new event routes (quote_sent, invoice_sent, visit_confirmed, plan_accepted), and 5 Execute Sub-workflow stubs for TG-83/84/86/88/89.

## Critical Reference Data

**TG-05 Workflow ID:** `Jf5VYdWpDs3VgRzd`

This ID is needed by later plans to backfill the Execute Sub-workflow `workflowId` fields once TG-83/84/86/88/89 are created.

## What Was Done

### Change 1: Poll Frequency (5min -> 15min)
- IMAP trigger `pollTimes.item[0].value` changed from 5 to 15
- Reduces monthly executions from ~8,640 to ~2,880
- Stays within n8n execution budget

### Change 2: $vars References
- Already hardcoded in a previous fix (0 references found)
- No changes needed

### Change 3: Parser Code Extended
Added 3 new event type detections to Parse Jobber Email JavaScript:
- `quote_sent` - matches "quote" or "estimate" in subject
- `visit_confirmed` - matches "on my/the way", "visit confirmed", "appointment confirmed", "en route"
- `plan_accepted` - matches "accepted", "approved", "plan confirmed"

### Change 4: Switch Node Extended
Route Event Type Switch node now has 6 rules:
1. `new_request` (existing)
2. `job_completed` (existing)
3. `quote_sent` (new)
4. `invoice_sent` (new)
5. `visit_confirmed` (new)
6. `plan_accepted` (new)

### Change 5: Execute Sub-workflow Nodes
Added 5 placeholder nodes (empty workflowId):
- `Call TG-83 Quote Follow-up`
- `Call TG-84 Invoice Collections`
- `Call TG-86 Plan Enrollment`
- `Call TG-88 On My Way`
- `Call TG-89 Invoice Delivery`

### Change 6: Wiring
- quote_sent -> TG-83
- invoice_sent -> TG-84 AND TG-89 (fan-out)
- visit_confirmed -> TG-88
- plan_accepted -> TG-86
- All sub-workflow nodes connect to Mark Event Processed

## Existing Routes Preserved
- new_request -> Upsert Lead (New Request) (unchanged)
- job_completed -> Wait 24 Hours -> Send Review Request (unchanged)

## Deviations from Plan

### [Rule 3 - Blocking] Workflow cannot be activated with empty sub-workflow IDs
- **Found during:** Task 1 activation step
- **Issue:** n8n API returns "Could not find property option" when trying to activate a workflow with executeWorkflow nodes that have empty workflowId
- **Resolution:** Left workflow inactive (it was already inactive). Will be activated after sub-workflow IDs are backfilled in later waves
- **Impact:** No regression -- workflow was inactive before this plan

## Commits

| Hash | Message | Files |
|------|---------|-------|
| 57e4817 | feat(01-02): TG-05 -- 15min poll, 4 new event routes + sub-workflow stubs | TG-05-jobber-email-parser.json |

## Next Phase Readiness

Plans 01-03 through 01-08 can now create their respective sub-workflows (TG-83/84/86/88/89). After creation, they must backfill the workflowId in TG-05's Execute Sub-workflow nodes using:
- TG-05 Workflow ID: `Jf5VYdWpDs3VgRzd`
- Node IDs: `call-tg83`, `call-tg84`, `call-tg86`, `call-tg88`, `call-tg89`

Once all 5 sub-workflow IDs are populated, TG-05 can be activated.
