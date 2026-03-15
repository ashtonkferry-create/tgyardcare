# Phase 1: Revenue Engine - Research

**Researched:** 2026-03-14
**Domain:** n8n workflow automation (Twilio SMS, Brevo email, Supabase, Jobber IMAP integration)
**Confidence:** HIGH (verified against existing codebase, official docs, and live workflow JSON)

## Summary

Phase 1 builds 9 n8n workflows (TG-83 through TG-91) that automate revenue-generating customer communication: quote follow-ups, invoice collections, missed call capture, plan enrollment/renewal, on-my-way SMS, invoice delivery, fertilizer schedule reminders, and abandoned quote recovery.

The existing codebase is mature. 82 n8n workflows already exist with established patterns for Supabase REST API calls, Twilio SMS via both native n8n node and HTTP Request, Brevo transactional email, and IMAP-based Jobber email parsing (TG-05). The database schema already has tables for `leads`, `invoices`, `estimates`, `customer_subscriptions`, `subscription_plans`, `sms_consent`, `sms_sends`, `jobber_email_events`, and `quote_followup_log`. Most of the schema needed for Phase 1 already exists.

The primary technical challenge is workflow architecture: TG-05 currently handles only `new_request` and `job_completed` event types via a Switch node. It needs to be extended to route `quote_sent`, `invoice_sent`, and `visit_confirmed` events to new sub-workflows. The Wait node is the core mechanism for time-delayed sequences (quote follow-ups, invoice collections).

**Primary recommendation:** Extend TG-05's Switch node with 3 new routes, build each revenue workflow as a standalone sub-workflow callable via n8n's Execute Sub-workflow node, and use the existing table schema wherever possible (only new table needed: `fertilizer_schedule`).

## Standard Stack

The stack is fully locked by existing infrastructure. No choices to make.

### Core
| Component | Version/Instance | Purpose | Why Standard |
|-----------|-----------------|---------|--------------|
| n8n Cloud | Starter plan, tgyardcare.app.n8n.cloud | Workflow orchestration | Already running 82 workflows |
| Supabase | lwtmvzhwekgdxkaisfra.supabase.co | Database + REST API | Already has 69+ migrations applied |
| Twilio | +1 608-995-3554 | Outbound automated SMS | Already configured in TG-02, TG-76 |
| Brevo | xkeysib-a6aa... | Marketing/transactional email | Already configured in TG-05, TG-08-17 |

### n8n Node Types Used
| Node | Purpose | Existing Pattern |
|------|---------|-----------------|
| `n8n-nodes-base.emailReadImap` | Poll Jobber emails from totalguardllc@gmail.com | TG-05 (every 5 minutes) |
| `n8n-nodes-base.switch` | Route by event_type after parsing | TG-05 Route Event Type node |
| `n8n-nodes-base.wait` | Time delays (hours/days) in sequences | TG-05 Wait 24 Hours node |
| `n8n-nodes-base.httpRequest` | Supabase REST, Brevo API, Twilio API | Every workflow |
| `n8n-nodes-base.code` | Data parsing/transformation (JavaScript) | TG-05 Parse Jobber Email |
| `n8n-nodes-base.twilio` | Send SMS via native Twilio node | TG-02 Send SMS Reply |
| `n8n-nodes-base.executeWorkflow` | Call sub-workflow by ID | Not yet used but available |
| `n8n-nodes-base.executeWorkflowTrigger` | Receive call from parent workflow | TG-02 uses this as its trigger |
| `n8n-nodes-base.scheduleTrigger` | Cron-based workflow start | Multiple existing workflows |

### API Endpoints
| Service | Endpoint | Method | Auth |
|---------|----------|--------|------|
| Supabase REST | `https://lwtmvzhwekgdxkaisfra.supabase.co/rest/v1/{table}` | GET/POST/PATCH | `apikey` header + `Authorization: Bearer {service_key}` |
| Brevo Send Email | `https://api.brevo.com/v3/smtp/email` | POST | `api-key` header |
| Twilio Send SMS | `https://api.twilio.com/2010-04-01/Accounts/{SID}/Messages` | POST | Basic Auth (SID:AuthToken) |
| Twilio Voice Webhook | Configured on Twilio number | POST (incoming) | n8n webhook URL |

## Architecture Patterns

### Pattern 1: TG-05 Event Router (Existing - Must Extend)
**What:** TG-05 polls IMAP every 5 minutes, parses Jobber notification emails, inserts into `jobber_email_events`, then routes via Switch node.
**Current routes:** `new_request` -> upsert lead, `job_completed` -> wait 24h -> review request email
**New routes needed:**
- `quote_sent` -> Execute Sub-workflow -> TG-83 (Quote Follow-up)
- `invoice_sent` -> Execute Sub-workflow -> TG-84 (Invoice Collections) AND TG-89 (Invoice Delivery)
- `job_completed` -> Execute Sub-workflow -> TG-89 (Invoice Delivery, if not already triggered by invoice_sent)
- `visit_confirmed` -> Execute Sub-workflow -> TG-88 (On My Way SMS)

**Pattern for extending TG-05:**
```
Switch "Route Event Type" node:
  Output 0: new_request -> existing lead upsert
  Output 1: job_completed -> existing review request + NEW: call TG-89
  Output 2: quote_sent -> NEW: call TG-83 (via Execute Sub-workflow)
  Output 3: invoice_sent -> NEW: call TG-84 + TG-89 (via Execute Sub-workflow)
  Output 4: visit_confirmed -> NEW: call TG-88 (via Execute Sub-workflow)
```

### Pattern 2: Sub-workflow Calling (n8n Execute Workflow)
**What:** Parent workflow calls child workflow by ID, passing data through.
**Parent node:** `n8n-nodes-base.executeWorkflow` - set workflow ID, pass JSON data
**Child trigger:** `n8n-nodes-base.executeWorkflowTrigger` (titled "When Executed by Another Workflow") - must be first node in sub-workflow
**Data passing:** Parent sends JSON object, child receives it in trigger node output
**Existing example:** TG-02 already uses `executeWorkflowTrigger` as its trigger node
**Key detail:** Sub-workflow executions do NOT count against the 5 concurrent execution limit on Starter plan.

### Pattern 3: Time-Delayed Sequence (Wait Node)
**What:** Multi-step follow-up sequences with days/hours between steps
**How it works:** Wait node pauses execution, offloads data to database, resumes when time elapses
**Existing example:** TG-05 uses `Wait 24 Hours` node (amount: 1, unit: days) before sending review request
**For quote follow-up (TG-83):**
```
Trigger -> Log quote -> Wait 48hr -> Check status -> SMS if pending -> Wait 5d -> Email social proof -> Wait 7d -> Final SMS -> Mark expired
```
**Critical detail:** Between each Wait, you MUST re-check the quote status from Supabase. If the customer accepted the quote during the wait period, the sequence should stop.

### Pattern 4: Cron-Triggered Batch Processor
**What:** Scheduled workflow that queries Supabase for records matching criteria, then processes each
**For TG-87 (Plan Renewal):** Daily cron -> query `customer_subscriptions` WHERE end_date in 30/14/3 days -> send reminders
**For TG-90 (Fertilizer Schedule):** Daily cron -> check if any treatment date is 7 days away -> query active fertilizer customers -> send reminders
**For TG-91 (Abandoned Quote):** Daily cron -> query `estimates` WHERE status='sent' AND sent_at < NOW() - 48hr -> run 3-touch sequence
**n8n node:** `n8n-nodes-base.scheduleTrigger` with cron expression

### Pattern 5: SMS Consent Check Before Send
**What:** Before any SMS send, check `sms_consent` table to verify customer has opted in
**Existing infrastructure:** `can_send_sms(phone)` Postgres function already exists in migration 027
**Pattern:** HTTP GET to Supabase RPC -> if true, send SMS -> log to `sms_sends` table

### Anti-Patterns to Avoid
- **Hardcoding customer data in workflows:** Always look up from Supabase by phone/email/lead_id
- **Skipping SMS consent check:** TCPA violation risk. Always call `can_send_sms()` before Twilio send
- **Not checking status between Wait nodes:** Customer may have responded during wait period
- **Using $vars references:** n8n Starter plan does NOT support Variables. All API keys must be hardcoded directly in HTTP Request nodes. The existing TG-05 JSON uses `$vars` references which is a bug/incompatibility from migration.

### Recommended Project Structure (n8n Workflows)
```
TG-05  Jobber Email Parser (EXTEND - add quote_sent, invoice_sent, visit_confirmed routes)
TG-83  Quote Follow-up Sequence (sub-workflow, triggered by TG-05)
TG-84  Invoice Collections Sequence (sub-workflow, triggered by TG-05)
TG-85  Missed Call AI Capture (standalone, Twilio voice webhook trigger)
TG-86  Plan Enrollment Processor (sub-workflow, triggered by TG-05 on quote accepted for plan)
TG-87  Plan Renewal Reminder (standalone, cron trigger daily)
TG-88  On My Way SMS (sub-workflow, triggered by TG-05 or manual)
TG-89  Invoice Delivery SMS+Email (sub-workflow, triggered by TG-05)
TG-90  Fertilizer Schedule Engine (standalone, cron trigger daily)
TG-91  Abandoned Quote SMS (standalone, cron trigger daily)
```

## Database Schema Analysis

### Existing Tables (DO NOT recreate)
| Table | Migration | Usable For |
|-------|-----------|-----------|
| `leads` | 001 | Customer lookup by phone/email, lead scoring |
| `jobber_email_events` | 001 | Logging parsed Jobber emails, dedup |
| `invoices` | 026 | Invoice tracking with collections sequence columns |
| `estimates` | 026 | Quote tracking with follow-up sequence columns |
| `customer_subscriptions` | 033 | Plan enrollment/renewal tracking |
| `subscription_plans` | 033 | Available plan definitions (6 seeded) |
| `sms_consent` | 027 | SMS opt-in/opt-out tracking (TCPA) |
| `sms_sends` | 027 | SMS send log |
| `quote_followup_log` | 046 | AI-powered follow-up tracking |

### Tables Needing Modification
| Table | Change Needed | Reason |
|-------|--------------|--------|
| `jobber_email_events` | Add `quote_sent` to `parsed_event_type` CHECK constraint | TG-05 only allows: new_request, job_scheduled, job_completed, invoice_sent, payment_received |
| `estimates` | None -- already has follow-up columns | followup_status, followup_enrolled_at, etc. all exist |
| `invoices` | None -- already has collections columns | collections_status, collections_enrolled_at, etc. all exist |
| `customer_subscriptions` | Add `renewal_reminder_30d_sent`, `renewal_reminder_14d_sent`, `renewal_reminder_3d_sent` columns | Track which renewal reminders have been sent |

### New Table Needed: `fertilizer_schedule`
```sql
CREATE TABLE IF NOT EXISTS fertilizer_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  customer_name TEXT,
  customer_phone TEXT,
  customer_email TEXT,
  plan_year INTEGER NOT NULL DEFAULT 2026,
  step_number INTEGER NOT NULL CHECK (step_number BETWEEN 1 AND 5),
  step_name TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  reminder_sent_at TIMESTAMPTZ,
  service_completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(lead_id, plan_year, step_number)
);
```

### 2026 Fertilizer Schedule (from memory file)
| Step | Application | Date | Reminder Date (7 days before) |
|------|------------|------|-------------------------------|
| 1 | Early Spring Wake-Up Fertilizer | April 15, 2026 | April 8, 2026 |
| 2 | Late Spring Weed Defense Fertilizer | June 1, 2026 | May 25, 2026 |
| 3 | Early Summer Stress Support Fertilizer | June 7, 2026 | May 31, 2026 |
| 4 | Late Summer Recovery Fertilizer | September 7, 2026 | August 31, 2026 |
| 5 | Fall Winterizer Fertilizer | October 20, 2026 | October 13, 2026 |

**Current fertilizer customers:** Mike Flint, Dennis Lahay, Zach McClelland, William Simpson

### New Table Needed: `missed_calls`
```sql
CREATE TABLE IF NOT EXISTS missed_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_sid TEXT UNIQUE NOT NULL,
  from_phone TEXT NOT NULL,
  to_phone TEXT NOT NULL,
  caller_name TEXT,
  call_status TEXT,
  sms_sent_at TIMESTAMPTZ,
  sms_response TEXT,
  lead_created BOOLEAN DEFAULT FALSE,
  lead_id UUID REFERENCES leads(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SMS consent checking | Custom phone lookup logic | `can_send_sms(phone)` Postgres function | Already exists in migration 027, handles all edge cases |
| Quote status tracking | New quote status table | `estimates` table (migration 026) | Already has followup_status, all tracking columns |
| Invoice collections tracking | New collections table | `invoices` table (migration 026) | Already has collections_status, all day-tracking columns |
| Subscription plan management | New plans system | `subscription_plans` + `customer_subscriptions` (migration 033) | Already seeded with 6 TG-specific plans |
| Lead/customer lookup | New customers table | `leads` table | This IS the customer table. All customer data lives here |
| SMS send logging | Custom tracking | `sms_sends` table (migration 027) | Already has workflow_name, status, delivery tracking |
| Follow-up logging | Custom tracking | `quote_followup_log` table (migration 046) | Already has bracket, AI model, conversion tracking |
| Email sending | Custom SMTP | Brevo API `POST /v3/smtp/email` | Already configured in multiple workflows |
| Jobber event parsing | New webhook system | TG-05 IMAP parser | Already running, parsing subjects, extracting data |

**Key insight:** The previous development phases built extensive infrastructure. Phase 1's job is to WIRE UP existing tables and APIs into automated sequences, not build new infrastructure. The biggest risk is duplicating tables that already exist.

## Common Pitfalls

### Pitfall 1: $vars References on Starter Plan
**What goes wrong:** Workflow JSON uses `$vars.TG_SUPABASE_URL` etc. but n8n Starter plan does NOT support the Variables feature.
**Why it happens:** Workflows were likely authored on a different plan or instance.
**How to avoid:** Replace ALL `$vars` references with hardcoded values before deploying. Search each workflow JSON for `$vars` before import.
**Warning signs:** Workflow executions fail with "undefined" or empty variable errors.
**Existing impact:** TG-05 JSON has 10+ `$vars` references that must be resolved.

### Pitfall 2: SMS Won't Deliver During A2P 10DLC Registration
**What goes wrong:** All SMS sends silently fail or get filtered because the Twilio number hasn't completed A2P 10DLC registration.
**Why it happens:** US carriers require A2P 10DLC campaign registration for business SMS from local numbers. Registration is pending.
**How to avoid:** Build and test all SMS workflows, but mark them as "SMS delivery pending A2P approval." Test with Twilio console sends first. Consider using Twilio's test credentials for workflow testing.
**Warning signs:** SMS shows as "sent" in Twilio but never arrives on phone.
**Workaround options:** (a) Wait for 10DLC approval (could be days to weeks), (b) Use a Toll-Free number as interim (not subject to 10DLC), (c) Use Twilio Verify for verification-type messages only.

### Pitfall 3: Wait Node Loses Context If Workflow Is Redeployed
**What goes wrong:** If you redeploy/update a workflow while executions are in a Wait state, those executions may fail when they resume.
**Why it happens:** Wait node serializes execution data to database. If the workflow structure changes, resumed execution may reference nodes that no longer exist.
**How to avoid:** Deploy workflows in inactive state first, test, then activate. Avoid modifying active workflows mid-sequence.
**Warning signs:** Resumed executions error with "node not found" or produce unexpected data.

### Pitfall 4: Not Checking Quote/Invoice Status After Wait
**What goes wrong:** Customer already accepted the quote or paid the invoice, but the follow-up sequence keeps sending nagging reminders.
**Why it happens:** Wait node pauses for days. During that time, customer may have taken action.
**How to avoid:** After EVERY Wait node, add a Supabase query to check current status. If status changed (approved, paid), exit the sequence immediately.
**Warning signs:** Customers complain about receiving follow-up after already responding.

### Pitfall 5: Duplicate SMS/Email on Retry
**What goes wrong:** If a workflow partially fails and retries, SMS or emails get sent twice.
**Why it happens:** SMS/email sends are not idempotent. Retry sends another message.
**How to avoid:** Log sends to `sms_sends` table BEFORE sending. Check for existing send before each SMS. Use `quote_followup_log` to track email sends.
**Warning signs:** Customers report duplicate messages.

### Pitfall 6: Jobber Email Subject Line Parsing Brittleness
**What goes wrong:** TG-05 regex parsing of email subjects breaks when Jobber changes email formats.
**Why it happens:** Jobber email notifications are the ONLY integration method (Core plan has no API/webhooks).
**How to avoid:** Make regex patterns generous, log all unmatched emails for review, add fallback routing for unknown event types. Test with actual Jobber emails.
**Warning signs:** `event_type = 'unknown'` rows piling up in `jobber_email_events`.

### Pitfall 7: Execution Count Limits
**What goes wrong:** Hit the 2,500 monthly execution limit on n8n Starter plan.
**Why it happens:** TG-05 polls every 5 minutes = 8,640 executions/month just from TG-05 alone. Plus cron workflows.
**How to avoid:** Each IMAP poll counts as one execution whether or not it finds emails. Consider reducing poll frequency to 10-15 minutes. Cron workflows also count. Budget execution counts carefully.
**Warning signs:** Workflows stop executing mid-month with "execution limit reached" error.
**CRITICAL NOTE:** This may already be a problem. 5-minute polling = 288 executions/day = 8,640/month. With a 2,500 limit, TG-05 alone would exhaust it in 8-9 days. This needs investigation and likely a poll frequency reduction.

## Code Examples

### Example 1: Supabase REST API Query (GET with filter)
```json
// In n8n HTTP Request node
{
  "method": "GET",
  "url": "https://lwtmvzhwekgdxkaisfra.supabase.co/rest/v1/estimates?status=eq.sent&sent_at=lt.{{$now.minus(48, 'hours').toISO()}}",
  "headers": {
    "apikey": "SUPABASE_ANON_KEY_HERE",
    "Authorization": "Bearer SUPABASE_SERVICE_KEY_HERE"
  }
}
```

### Example 2: Supabase REST API Update (PATCH)
```json
// In n8n HTTP Request node
{
  "method": "PATCH",
  "url": "https://lwtmvzhwekgdxkaisfra.supabase.co/rest/v1/estimates?id=eq.{{$json.id}}",
  "headers": {
    "apikey": "SUPABASE_ANON_KEY_HERE",
    "Authorization": "Bearer SUPABASE_SERVICE_KEY_HERE",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
  },
  "body": {
    "followup_status": "day1_sent",
    "followup_email_day1_sent_at": "{{$now.toISO()}}"
  }
}
```

### Example 3: Brevo Send Email (HTTP Request)
```json
// In n8n HTTP Request node
{
  "method": "POST",
  "url": "https://api.brevo.com/v3/smtp/email",
  "headers": {
    "api-key": "BREVO_API_KEY_HERE",
    "Content-Type": "application/json"
  },
  "body": {
    "sender": { "name": "TotalGuard Yard Care", "email": "workelyhelp@gmail.com" },
    "to": [{ "email": "{{$json.customer_email}}", "name": "{{$json.customer_name}}" }],
    "subject": "Quick reminder about your estimate",
    "htmlContent": "<p>Hi {{$json.customer_name}},</p><p>...</p>"
  }
}
```

### Example 4: Twilio Send SMS (Native Node)
```json
// In n8n Twilio node (preferred, already configured in TG-02)
{
  "from": "+16089953554",
  "to": "={{$json.customer_phone}}",
  "message": "Hi {{$json.customer_name}}! TotalGuard crew is on the way to {{$json.address}}. ETA ~15 min. Questions? Call 608-535-6057"
}
```

### Example 5: Twilio Send SMS (HTTP Request alternative)
```json
// In n8n HTTP Request node (if native node has issues)
{
  "method": "POST",
  "url": "https://api.twilio.com/2010-04-01/Accounts/ACCOUNT_SID/Messages",
  "authentication": "basicAuth",
  "credentials": { "user": "ACCOUNT_SID", "password": "AUTH_TOKEN" },
  "body": {
    "From": "+16089953554",
    "To": "{{$json.customer_phone}}",
    "Body": "Message text here"
  },
  "contentType": "form-urlencoded"
}
```

### Example 6: Wait Node Configuration
```json
// Wait 48 hours
{
  "type": "n8n-nodes-base.wait",
  "parameters": {
    "amount": 48,
    "unit": "hours"
  }
}

// Wait 5 days
{
  "type": "n8n-nodes-base.wait",
  "parameters": {
    "amount": 5,
    "unit": "days"
  }
}
```

### Example 7: Execute Sub-workflow Call
```json
// Parent workflow node (in TG-05)
{
  "type": "n8n-nodes-base.executeWorkflow",
  "parameters": {
    "workflowId": "TG-83-WORKFLOW-ID-HERE",
    "options": {}
  }
}

// Child workflow trigger (first node in TG-83)
{
  "type": "n8n-nodes-base.executeWorkflowTrigger",
  "parameters": {
    "inputSource": "passthrough"
  }
}
```

### Example 8: SMS Consent Check (Supabase RPC)
```json
// In n8n HTTP Request node
{
  "method": "POST",
  "url": "https://lwtmvzhwekgdxkaisfra.supabase.co/rest/v1/rpc/can_send_sms",
  "headers": {
    "apikey": "SUPABASE_ANON_KEY_HERE",
    "Authorization": "Bearer SUPABASE_SERVICE_KEY_HERE",
    "Content-Type": "application/json"
  },
  "body": {
    "p_phone": "{{$json.customer_phone}}"
  }
}
```

## Twilio Missed Call Webhook (TG-85)

### How It Works
When a call comes into the Twilio number (+1 608-995-3554), Twilio sends an HTTP POST to the configured webhook URL with these key parameters:

| Parameter | Description | Example |
|-----------|-------------|---------|
| `CallSid` | Unique call identifier | `CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `AccountSid` | Twilio account ID | `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `From` | Caller's phone number | `+16085551234` |
| `To` | Called number | `+16089953554` |
| `CallStatus` | Current call status | `ringing`, `no-answer`, `busy`, `completed` |
| `Direction` | Call direction | `inbound` |
| `CallerName` | CNAM lookup result (if available) | `JOHN SMITH` |
| `ApiVersion` | Twilio API version | `2010-04-01` |

### Detecting Missed Calls
A "missed call" is detected when `CallStatus` = `no-answer` or `busy` in the StatusCallback. Configure the Twilio number's StatusCallback URL to point to an n8n webhook that triggers TG-85.

**Two webhook configurations needed on the Twilio number:**
1. **Voice URL:** Returns TwiML (e.g., `<Response><Say>` or `<Response><Dial>` to ring the business)
2. **StatusCallback URL:** Points to TG-85 n8n webhook. Receives POST when call completes with status.

**Implementation in n8n:**
- TG-85 uses `n8n-nodes-base.webhook` as trigger (NOT executeWorkflowTrigger)
- Webhook receives Twilio POST with form-urlencoded data
- Code node checks if `CallStatus` is `no-answer` or `busy`
- If missed: log to `missed_calls` table, check SMS consent, send auto-reply SMS

### Confidence: MEDIUM
The exact parameters depend on Twilio number configuration. The webhook fields listed above are from Twilio's documented TwiML request parameters. The `no-answer` detection via StatusCallback is confirmed by multiple Twilio support articles.

## A2P 10DLC Blocker Analysis

### Current Status
Twilio A2P 10DLC registration is **pending**. All SMS from +1 608-995-3554 may be filtered or blocked by carriers until registration is complete.

### Impact on Phase 1
ALL 9 workflows use SMS in some capacity. This is a hard blocker for production SMS delivery.

### Timeline
Registration typically takes under 1 week but can take several weeks for Standard Campaigns that require multi-layer vetting (carriers, Twilio, external partners).

### Mitigation Options (ranked by preference)
1. **Build everything, test with Twilio logs** -- Build all workflows, deploy them, but verify via Twilio Message Logs (not phone delivery). Once 10DLC is approved, SMS starts flowing automatically. **RECOMMENDED.**
2. **Toll-Free number as interim** -- Register a Toll-Free number (not subject to 10DLC). Use it for automated SMS until 10DLC approved, then switch. Costs ~$2/month. Adds complexity of number management.
3. **Contact Twilio Support** -- If registration has been pending for more than 1 week, reach out to Twilio support to expedite.
4. **Skip SMS, email only** -- Temporarily run sequences with email-only touches, add SMS steps after 10DLC approval. Loses the high open rate advantage of SMS.

### Recommendation
Option 1. Build all workflows with SMS. The workflows themselves are correct; only delivery is blocked. When 10DLC approves, everything works immediately with zero code changes.

## Recommended Build Order

### Phase 1a: Foundation (build first, everything depends on it)
1. **Database migration** -- Add `fertilizer_schedule` table, `missed_calls` table, extend `jobber_email_events` CHECK constraint
2. **Extend TG-05** -- Add `quote_sent`, `invoice_sent`, `visit_confirmed` to Switch routes
3. **Seed fertilizer_schedule** -- Insert 2026 schedule for 4 active customers

### Phase 1b: Simple Sub-workflows (low complexity, high testability)
4. **TG-88: On My Way SMS** -- Simplest workflow (1 lookup + 1 SMS). Good for validating sub-workflow pattern.
5. **TG-85: Missed Call AI Capture** -- Standalone (webhook trigger, no TG-05 dependency). Can test immediately.
6. **TG-89: Invoice Delivery** -- Simple (1 lookup + 1 SMS + 1 email). Tests Brevo + Twilio together.

### Phase 1c: Time-Delayed Sequences (Wait node patterns)
7. **TG-83: Quote Follow-up Sequence** -- Multi-step with Wait nodes. Most complex sequence.
8. **TG-84: Invoice Collections Sequence** -- Similar pattern to TG-83 but for invoices.
9. **TG-91: Abandoned Quote SMS** -- Cron-triggered, similar logic to TG-83 but batch.

### Phase 1d: Plan & Fertilizer (cron + lookup patterns)
10. **TG-86: Plan Enrollment Processor** -- Triggered by TG-05 on accepted plan quote.
11. **TG-87: Plan Renewal Reminder** -- Daily cron, batch query + send.
12. **TG-90: Fertilizer Schedule Engine** -- Daily cron, date-based trigger + batch send.

### Rationale
- Foundation first because everything depends on the schema and TG-05 routing
- Simple workflows first to validate patterns (sub-workflow calling, SMS, email)
- Complex sequences next (they reuse patterns proven in Phase 1b)
- Cron-based workflows last (they're standalone and can be tested independently)

## Technical Risks

### Risk 1: n8n Execution Limit (CRITICAL)
**Risk:** 2,500 executions/month on Starter plan. TG-05 alone at 5-min polling = 8,640/month.
**Impact:** All workflows stop mid-month.
**Mitigation:** Reduce TG-05 polling to 15-30 minutes (960-1,440/month). Budget remaining executions across cron workflows. Or upgrade n8n plan.
**Confidence:** HIGH -- this is a math problem, not speculation.

### Risk 2: Jobber Email Format Changes
**Risk:** Jobber updates their notification email format, breaking TG-05 regex parsing.
**Impact:** All Jobber-triggered workflows stop receiving events.
**Mitigation:** Log all unmatched emails. Build monitoring (TG-70 system health already exists). Keep regex patterns loose. Add manual override triggers for each sub-workflow.
**Confidence:** MEDIUM -- Jobber email formats have been stable but could change anytime.

### Risk 3: Wait Node Long-Duration Reliability
**Risk:** Wait nodes spanning 7-14 days may have reliability issues on n8n Cloud.
**Impact:** Follow-up sequences silently die mid-sequence.
**Mitigation:** Instead of chaining multiple Wait nodes in one execution, consider a "checkpoint" pattern: each step logs progress to Supabase, and a daily cron checks for sequences that need their next step. This is more reliable than depending on a single execution surviving 14+ days.
**Confidence:** MEDIUM -- n8n docs confirm Wait works with days, but community reports suggest occasional issues with very long waits on cloud.

### Risk 4: $vars References in Deployed Workflows
**Risk:** Workflows using `$vars` will fail on Starter plan.
**Impact:** Workflows that reference `$vars` return empty/undefined values.
**Mitigation:** Audit ALL workflow JSON for `$vars` references and replace with hardcoded values. This is a known issue -- TG-05 currently has 10+ such references.
**Confidence:** HIGH -- confirmed by n8n Starter plan documentation and existing project notes.

## Open Questions

1. **What is the actual n8n execution count right now?**
   - What we know: 2,500/month limit, TG-05 polls every 5 min (288/day)
   - What's unclear: How many other active workflows are consuming executions
   - Recommendation: Check n8n dashboard for current execution usage before deploying new workflows

2. **Are the $vars references in existing deployed workflows already causing failures?**
   - What we know: TG-05 JSON uses `$vars`, Starter plan doesn't support variables
   - What's unclear: Whether the deployed version on n8n cloud has hardcoded values (JSON may differ from deployed)
   - Recommendation: Check actual deployed workflow in n8n dashboard

3. **Exact Twilio A2P 10DLC registration status?**
   - What we know: Registration is pending
   - What's unclear: When it was submitted, which step it's at, estimated completion
   - Recommendation: Vance checks Twilio console -> Messaging -> Compliance

4. **Brevo sender domain verification status?**
   - What we know: Phase 0 Task 2.7 identified this as needing DNS verification
   - What's unclear: Whether it's been completed
   - Recommendation: Check Brevo dashboard -> Senders & Domains before deploying email workflows

5. **How does Jobber format "quote sent" vs "invoice sent" email subjects?**
   - What we know: TG-05 parses `new_request`, `job_completed` via regex on subject
   - What's unclear: Exact subject line format for quote/invoice emails
   - Recommendation: Check totalguardllc@gmail.com inbox for actual Jobber notification emails to get exact subject patterns

## Sources

### Primary (HIGH confidence)
- Existing codebase: `tgyardcare/automation/n8n-workflows/TG-05-jobber-email-parser.json` -- verified Switch routing pattern, Wait node usage, Supabase REST pattern, Brevo API pattern
- Existing codebase: `tgyardcare/automation/n8n-workflows/TG-02-phone-lead-capture.json` -- verified Execute Workflow Trigger pattern, Twilio node usage
- Existing codebase: `tgyardcare/automation/migrations/026_collections_and_estimates.sql` -- verified invoices and estimates table schema
- Existing codebase: `tgyardcare/automation/migrations/033_subscription_plans.sql` -- verified subscription plans and customer subscriptions schema
- Existing codebase: `tgyardcare/automation/migrations/027_sms_consent_tracking.sql` -- verified SMS consent and sends tables
- Existing codebase: `tgyardcare/automation/migrations/046_competitive_intel_and_quote_followup.sql` -- verified quote_followup_log table
- Memory file: `project_tg_fertilizer_schedule.md` -- verified 2026 fertilizer dates and customer list

### Secondary (MEDIUM confidence)
- [n8n Sub-workflows docs](https://docs.n8n.io/flow-logic/subworkflows/) -- Execute Workflow and Trigger patterns
- [n8n Wait node docs](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.wait/) -- Wait node resume conditions
- [Brevo Send Email API](https://developers.brevo.com/docs/send-a-transactional-email) -- POST /v3/smtp/email specification
- [Twilio Send SMS](https://www.twilio.com/docs/messaging/tutorials/how-to-send-sms-messages) -- Messages REST API
- [Twilio Voice Webhooks](https://www.twilio.com/docs/usage/webhooks/voice-webhooks) -- Incoming call parameters
- [Twilio No-Answer Handling](https://www.twilio.com/en-us/blog/handle-no-answer-scenarios-voicemail-callback) -- Missed call detection via StatusCallback
- [Twilio A2P 10DLC](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc) -- Registration process and alternatives

### Tertiary (LOW confidence)
- [n8n pricing page](https://n8n.io/pricing/) -- Starter plan limits (2,500 executions, 5 concurrent, no Variables)
- n8n community posts on Wait node long-duration reliability -- anecdotal reports

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- locked by existing infrastructure, no choices to make
- Architecture: HIGH -- patterns verified from existing workflow JSON files
- Database schema: HIGH -- verified from existing migration SQL files
- API integrations: HIGH for Brevo/Supabase, MEDIUM for Twilio webhooks
- Pitfalls: HIGH -- several verified from codebase ($vars, execution limits)
- Build order: MEDIUM -- logical ordering but could adjust based on Vance priorities

**Research date:** 2026-03-14
**Valid until:** 2026-04-14 (stable infrastructure, no fast-moving dependencies)
