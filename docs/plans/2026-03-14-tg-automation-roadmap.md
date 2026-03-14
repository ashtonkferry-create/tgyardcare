# TotalGuard Automation Roadmap — TG vs TTW Gap Map + Build Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan phase-by-phase.

**Goal:** Close every gap between TotalGuard (TG) and TotalWash (TTW), fix broken credentials, and build the ~45 missing workflows to reach ~127 fully-operational automations.

**Reference:** TTW = TotalWash (competitor reference system with 250 workflows, 67 active)
**Current reality:** TG has 82 workflows defined, ~35 actually functional today due to missing API keys.

---

## SCOREBOARD

| | TotalGuard (TG) | TotalWash (TTW) |
|--|---|---|
| Total workflows | 82 | 250 |
| Active in n8n | 78 | 67 |
| Actually functional | ~35 | ~67 |
| Missing credentials | ~20 | Unknown |
| Jobber plan | **Core ($39/mo annual)** — no Zapier, no API, no auto-charge | — |
| CRM integration depth | Email parsing only (no Zapier/API on Core) | Full API (webhooks, sync, proxy) |
| Communication layer | Scattered | Unified CRM layer (250–254) |
| Financial automation | None | Plan enrollment, payment plans, invoice delivery |
| Programmatic SEO | None | City pages, GSC sync, rank alerts, content gaps |
| Crew operations | Basic briefings | Territory assignment, auto-dispatch, bonus calc |

**Honest headline:** TG built 82 workflows but ~43 are silently failing from missing credentials. Fix those first — you jump from ~35 to ~55+ functional automations at zero build cost. Then build the ~45 missing workflows to reach ~127 total.

---

## JOBBER CORE — WHAT IT ALREADY DOES (DO NOT DUPLICATE IN N8N)

**Plan confirmed:** You are on **Core at $39/month** (annual commitment).

**What Core includes:**
- ✅ Book and schedule jobs online
- ✅ Send professional quotes
- ✅ Send invoices + receive online payments (clients pay through Jobber Client Hub)
- ✅ App marketplace access
- ❌ NO Zapier
- ❌ NO Automatic Payments (auto-charge saved card — Connect+ only)
- ❌ NO pre-visit reminders (Connect+ only)
- ❌ NO invoice follow-up reminders (Connect+ only)
- ❌ NO API access (Grow only)

**Critical:** Before building any workflow, check this table. Building n8n automation for something Jobber already handles = double messages to customers.

### What Jobber Core Sends AUTOMATICALLY (no setup needed)

| Event | Jobber Does It? | Method | Notes |
|---|---|---|---|
| Online booking request confirmation | ✅ AUTO | Email | Fires when client submits your booking form |
| Quote delivery to client | Manual send → auto delivery | Email (+ optional SMS) | You click Send; Jobber delivers |
| Quote approval confirmation to client | ✅ AUTO | Email | Fires the instant client approves in Client Hub |
| Post-job follow-up / thank you | ✅ AUTO (toggle) | Email or SMS | **Toggle in Settings → Job Follow-ups. CHECK IF THIS IS ON.** If on, do NOT build a duplicate in n8n. |
| Payment receipt | ✅ AUTO (Jobber Payments) | Email | Fires when client pays online through Client Hub |
| Signed document confirmation | ✅ AUTO | Email | Fires when a document is signed |

### Online Payments vs. Automatic Payments — Important Distinction

| Feature | Core Has It? | What It Does |
|---|---|---|
| **Jobber Payments** (online payments) | ✅ YES | Client clicks link in their invoice, pays manually. Jobber auto-sends receipt. |
| **Automatic Payments** (auto-charge) | ❌ NO — Connect+ only | Jobber auto-charges a saved card on recurring jobs without client action. |

**"Automated billing"** on Core = Jobber creates the invoice and the client pays online. Jobber does NOT auto-charge anyone's card on Core. TG-84 and TG-89 fire for all customers — no auto-payment filter needed.

### What Jobber Core Does NOT Do (Build These in N8N)

| Automation | Jobber Core Does It? | Build in N8N? |
|---|---|---|
| Pre-visit reminders (day before) | ❌ NO — Connect+ only | ✅ BUILD (add to TG-88) |
| Overdue invoice follow-up | ❌ NO — Connect+ only | ✅ BUILD TG-84 |
| Quote follow-up (unanswered quotes) | ❌ NO — Grow only | ✅ BUILD TG-83 |
| Google review request | ❌ NO — $39/mo add-on | ✅ HAVE TG-18 |
| On My Way SMS | ❌ NO | ✅ BUILD TG-88 |
| Two-way SMS inbox | ❌ NO — Grow only | ✅ HAVE TG-76 |
| Invoice delivery (branded Brevo email) | Jobber sends plain invoice link only | ✅ BUILD TG-89 |
| Upsell / cross-sell emails | ❌ NO | ✅ HAVE TG-10 |
| Loyalty / NPS / review sequences | ❌ NO | ✅ HAVE TG-60, TG-61 |
| Missed call AI fallback | ❌ NO | ✅ BUILD TG-85 |

### TG-05 — The Only Jobber Integration Path (No Zapier, No API)

Core has no Zapier and no API. **IMAP email parsing is the only way to get Jobber events into n8n.**

TG-05 must watch `notification@txn.getjobber.com` emails at the correct TotalGuard inbox (Phase 0 fix: swap `workelyhelp@gmail.com` for the right email).

| Jobber Event | Email Subject Pattern | N8N Action |
|---|---|---|
| Client submits booking form | "New request from [name]" | → TG-01 (lead capture) |
| Quote approved by client | "Quote #[N] approved" or "[name] approved" | → TG-08 (welcome) + TG-77 (booking) |
| Job closed / complete | "Work completed for [name]" or "Job #[N] complete" | → TG-18 (review) + TG-61 (loyalty) + TG-89 (invoice) |
| Invoice paid online | "Payment received from [name]" | → TG-65 (upsell) + TG-34 (referral check) |
| Receipt sent | "Receipt for [name]" | Log only — Jobber already sent receipt |

### Critical Action Before Building

**Check right now:** Jobber → Settings → Emails and Text Messages → Job Follow-ups.

- If **ON**: Jobber sends post-job message. TG-18 (review request) waits 24hr — safe. Any "job complete thank you" workflow in n8n would duplicate. Leave it to Jobber.
- If **OFF**: Jobber sends nothing after job completion. N8N owns entire post-job flow.

### What Upgrading Would Unlock

| Plan | Monthly Cost | Key Unlocks | Worth It When |
|---|---|---|---|
| Connect ($119/mo) | +$80/mo | Zapier (structured Jobber events → n8n, replaces fragile email parsing), Automatic Payments, pre-visit reminders, invoice reminders, QuickBooks | TG-05 breaks repeatedly OR want auto-charge on recurring jobs |
| Grow ($199/mo) | +$160/mo | Full GraphQL API + real-time webhooks, custom automations builder | Revenue >$15k/mo |

**Recommendation:** Stay Core. Email parsing works when pointed at the right inbox. Re-evaluate Connect at $8k MRR.

---

## PART 1 — SIDE-BY-SIDE COMPARISON

### Lead Capture & CRM

| TTW Workflow | Nodes | TG Equivalent | Status |
|---|---|---|---|
| TWC - Lead Capture v2 | 33 | TG-01 lead-capture | ✅ Have (simpler version) |
| TWC - Phone Lead Capture | 20 | TG-02 phone-lead-capture | ✅ Have |
| TWC - Manual Lead Entry | 26 | TG-04 manual-lead-entry | ✅ Have |
| TWC - LSA Lead Capture | 25 | — | ❌ **MISSING** |
| TWC - Universal Webhook Router | 7 | TG-79 universal-router | ✅ Have |
| TWC 250 - CRM Webhook Router | 13 | — | ❌ **MISSING** |
| 06 - HCP Customer Sync | 23 | TG-05 jobber-email-parser | ⚠️ Broken (wrong email) |
| 07 - HCP Webhook Receiver | 34 | — | ❌ **MISSING** (Jobber-adapted version needed) |
| TWC 200 - HCP API Proxy | 12 | — | ❌ **MISSING** (Jobber-adapted version needed) |
| 64 - HCP Invoice & Estimate Sync | 11 | — | ❌ **MISSING** |
| 34 - Missed Call AI Fallback | 11 | — | ❌ **MISSING** |

### Email Marketing

| TTW Workflow | TG Equivalent | Status |
|---|---|---|
| TWC - Welcome Series (5 emails/30d) | TG-08 welcome-series | ✅ Have |
| TWC - Follow-Up Sequences | TG-09 followup-sequences | ✅ Have |
| TWC - Re-Engagement Ladder | TG-11 reengagement-ladder | ✅ Have |
| TWC - Spring/Fall Nurture | TG-14, TG-15 | ✅ Have |
| TWC - VIP Upgrade Path | TG-12 vip-upgrade | ✅ Have |
| TWC - Commercial Nurture (5 emails/60d) | — | ❌ **MISSING** |
| TWC 218 - Email Classifier + Auto-Responder | — | ❌ **MISSING** |
| TWC 219 - Email Feedback Handler | — | ❌ **MISSING** |
| 89 - Email Send Time Optimizer | — | ❌ **MISSING** |
| 90 - Email Subject Line A/B Tester | — | ❌ **MISSING** |
| TWC 222 - Gmail Watch Renewal | — | ⚠️ Infrastructure need if using email classifier |

### Review Management

| TTW Workflow | TG Equivalent | Status |
|---|---|---|
| 28 - Post-Job Review Request | TG-18 post-job-review-request | ✅ Have |
| 29 - Google Review Sync | TG-19 google-review-sync | ⚠️ Broken (placeholder Google key) |
| 117 - Review Response AI Drafter | TG-20 ai-review-response | ✅ Have |
| 30 - Review Re-engagement | TG-21 review-reengagement | ✅ Have |
| 65 - Review to Referral Pipeline | TG-22 review-to-referral | ✅ Have |
| 186 - Review Request Link & QR Generator | — | ❌ **MISSING** |

### Field Operations

| TTW Workflow | TG Equivalent | Status |
|---|---|---|
| 57 - Daily Briefing | TG-25 crew-daily-briefing | ✅ Have |
| 51 - Post-Job Field Marketing | TG-24 post-job-field-marketing | ✅ Have |
| 52 - Field Marketing Reminder | TG-26 field-marketing-reminder | ✅ Have |
| 53 - Daily Compliance Check | TG-27 compliance-check | ✅ Have |
| 55 - Missed Task Escalation | TG-28 missed-task-escalation | ✅ Have |
| 152 - Technician Photo Upload | TG-29 technician-photo-upload | ✅ Have |
| 59 - Inventory Alert | TG-30 inventory-alert | ✅ Have |
| 60 - Yard Sign Collection | TG-31 yard-sign-collection | ✅ Have |
| 153 - Media Asset AI Tagger | — | ❌ **MISSING** |
| 262 - Daily Territory Assignment | — | ❌ **MISSING** |
| 263 - Weekly Bonus Calculator | — | ❌ **MISSING** |
| 202 - Auto-Dispatch Monitor | — | ❌ **MISSING** |

### Communications Infrastructure

| TTW Workflow | TG Equivalent | Status |
|---|---|---|
| TWC 251 - CRM Send SMS (unified) | TG-76 two-way-sms | ⚠️ Twilio unverified; not CRM-integrated |
| TWC 252 - CRM Send Email (unified) | — | ❌ **MISSING** |
| TWC 253 - CRM On My Way SMS | — | ❌ **MISSING** |
| TWC 254 - Invoice Delivery SMS+Email | — | ❌ **MISSING** |

### Membership & Payments

| TTW Workflow | TG Equivalent | Status |
|---|---|---|
| TWC 205 - Plan Renewal Reminder | — | ❌ **MISSING** |
| TWC 206 - Plan Enrollment Processor | — | ❌ **MISSING** |
| TWC 255 - Payment Plan Installment Cron | — | ❌ **MISSING** |

### Sales & Quoting

| TTW Workflow | TG Equivalent | Status |
|---|---|---|
| 36 - AI Real-Time Quote | TG-75 ai-quoting | ✅ Have |
| 37 - AI Booking & HCP Sync | TG-77 ai-booking-sync | ✅ Have |
| 201 - ResponsiBid Quote Pipeline | — | ❌ **MISSING** (photo-based quoting) |
| 203 - Quote Follow-up Email Sequence | — | ❌ **MISSING** |
| 204 - HCP Estimate Status Sync | — | ❌ **MISSING** |
| 63 - Estimate Follow-Up Sequence | — | ❌ **MISSING** |
| 111 - Automated Invoice Collections | — | ❌ **MISSING** |
| 78 - AI Quote Follow-Up Agent | — | ❌ **MISSING** |
| 72 - Unscheduled Job Booking Bot | — | ❌ **MISSING** |
| 35 - Commercial Client Outreach | TG-62 commercial-prospector | ⚠️ Partial (1 workflow vs TTW's 5-step pipeline) |

### SEO

| TTW Workflow | TG Equivalent | Status |
|---|---|---|
| TWC 164 - GSC Daily Sync | — | ❌ **MISSING** |
| TWC 208 - Rank Drop Alert | — | ❌ **MISSING** |
| TWC 215 - City Content Generator | — | ❌ **MISSING** |
| TWC 231 - Ranking Opportunity Detector | — | ❌ **MISSING** |
| TWC 232 - Title/Meta Auto-Optimizer | TG-54 ai-meta-generator | ⚠️ Generates only; TTW auto-optimizes from GSC data |
| TWC 234 - Content Gap Detector | — | ❌ **MISSING** |
| TWC 234 - Neighborhood Content Health | — | ❌ **MISSING** |
| TWC 235 - Index Coverage Monitor | — | ❌ **MISSING** |
| TWC 236 - Content Uniqueness Report | — | ❌ **MISSING** |
| TWC 237 - Neighborhood Page Performance | — | ❌ **MISSING** |
| TWC 238 - IndexNow Sitemap Ping | TG-47 indexnow-submitter | ⚠️ Broken (no IndexNow key) |
| 193 - GBP Auto-Applier (auto-fixes) | TG-55 gbp-optimization-scorer | ⚠️ TG audits only; TTW auto-applies fixes |
| TWC 127 - AI Blog Content Pipeline | — | ❌ **MISSING** |
| 29 - Google Review Sync | TG-19 | ⚠️ Broken (no Google Places key) |
| TG-52 Schema Validator | — | ✅ TG UNIQUE — TTW doesn't have this |
| TG-53 Page Speed Monitor | — | ✅ TG UNIQUE — TTW doesn't have this |

### Customer Intelligence & Retention

| TTW Workflow | TG Equivalent | Status |
|---|---|---|
| 74 - Customer Health Score | TG-57 customer-health-scorer | ✅ Have |
| 79 - Churn Intervention Engine | — | ❌ **MISSING** |
| 97 - Loyalty Points Engine | TG-61 loyalty-points | ✅ Have |
| 99 - Multi-Service Progression Tracker | — | ❌ **MISSING** |
| 101 - NPS Survey Engine | TG-60 nps-survey | ✅ Have (no response routing) |
| 146 - Customer Birthday/Anniversary | — | ❌ **MISSING** |

### Reporting & Intelligence

| TTW Workflow | TG Equivalent | Status |
|---|---|---|
| 147 - Daily KPI Digest SMS | TG-66 daily-kpi-digest | ✅ Have |
| 126 - Weekly Owner Report | TG-67 weekly-owner-report | ⚠️ Wrong sender email |
| 143 - Revenue Forecaster | TG-68 revenue-forecaster | ✅ Have |
| 110 - End of Day Reconciliation | TG-69 end-of-day-reconciliation | ✅ Have |
| 150 - System Health Monitor | TG-70 system-health-monitor | ✅ Have |
| 77 - Revenue Attribution Engine | — | ❌ **MISSING** |
| 221 - Weekly AI Learning Report | — | ❌ **MISSING** |
| 149 - GA4 Weekly Reporter | — | ❌ **MISSING** |
| TWC 163 - Weekly Marketing ROI | — | ❌ **MISSING** |

### TG Unique Advantages (TTW Doesn't Have)

| TG Workflow | What It Does | Status |
|---|---|---|
| TG-74 Telegram Bot | Owner queries business data via Telegram | ✅ Live |
| TG-52 Schema Validator | Validates structured data markup | ✅ Live |
| TG-53 Page Speed Monitor | Core Web Vitals monitoring | ✅ Live |
| TG-78 Voice Agent Sync (VAPI) | AI voice for inbound calls | ❌ Not deployed |
| TG-81 Newsletter | Monthly customer newsletter | ❌ Inactive |
| TG-82 Flash Sales | Time-limited promos | ❌ Inactive |

---

## PART 2 — COMPLETE GAP MAP

### Workflows TG is MISSING entirely (46 total)

#### Tier 1 — Revenue-Critical (build first)
| # | New Workflow | Based On | Why |
|---|---|---|---|
| TG-83 | Quote Follow-up Sequence | TTW-203 | Quotes sent but no reply = revenue left on table. 3-touch auto-follow-up. |
| TG-84 | Invoice Collections Sequence | TTW-111/62 | Unpaid invoices auto-chased via SMS + email with escalation |
| TG-85 | Missed Call AI Capture | TTW-34 | Every missed call = lost $200-2000 job. AI captures the lead. |
| TG-86 | Plan Enrollment Processor | TTW-206 | Recurring revenue automation — process new subscription signups |
| TG-87 | Plan Renewal Reminder | TTW-205 | Auto-remind members 30/14/3 days before renewal |
| TG-88 | On My Way SMS | TTW-253 | "Your crew is 15 min away" — single biggest CX improvement |
| TG-89 | Invoice Delivery (SMS + Email) | TTW-254 | Auto-send invoice immediately after job complete |
| TG-90 | Fertilizer Schedule Engine | TG-specific | 5-step program reminders, day-of alerts, completion confirmation |
| TG-91 | Abandoned Quote SMS | TG-specific | Quote sent, no reply in 48hr → 3-touch SMS/email close sequence |

#### Tier 2 — Operational Excellence
| # | New Workflow | Based On | Why |
|---|---|---|---|
| TG-92 | CRM Webhook Router | TTW-250 | Unified routing for all CRM events — foundation for unified comms |
| TG-93 | CRM Send Email (integrated) | TTW-252 | All outbound email logged to CRM, attributable |
| TG-94 | Email Classifier + Auto-Responder | TTW-218 | AI reads and triages inbox — routes quote requests, flags complaints |
| TG-95 | Churn Intervention Engine | TTW-79 | When health score drops → auto-intervene with offer before customer leaves |
| TG-96 | Snow Event Auto-Creator | TTW Snow | Weather ≥2" → auto-create snow removal jobs in Jobber |
| TG-97 | Daily Territory Assignment | TTW-262 | Optimize crew routes every morning — less windshield time, more jobs |
| TG-98 | Weekly Bonus Calculator | TTW-263 | Transparent crew incentives auto-calculated weekly |
| TG-99 | Payment Plan Installment Cron | TTW-255 | Recurring payment processing |
| TG-100 | Annual Contract Renewal | TG-specific | 30/14/3 days before anniversary → renewal offer |
| TG-101 | NPS Response Router | TG-specific | 9-10 → funnel to Google review. 1-6 → alert owner immediately. |
| TG-102 | LSA Lead Capture | TTW LSA | Google Local Service Ads leads auto-captured into pipeline |

#### Tier 3 — SEO Growth Engine
| # | New Workflow | Based On | Why |
|---|---|---|---|
| TG-103 | GSC Daily Sync | TWC-164 | Google Search Console data pipeline — feeds all other SEO workflows |
| TG-104 | Rank Drop Alert | TWC-208 | Instant SMS when keyword ranking drops — act before it compounds |
| TG-105 | AI Blog Content Pipeline | TWC-127 | 3 posts/week auto-generated, optimized, published. SEO flywheel. |
| TG-106 | City Content Generator | TTW-215 | Programmatic local pages for every Madison neighborhood |
| TG-107 | Ranking Opportunity Detector | TTW-231 | Finds keywords in positions 4-20 that could hit page 1 with small push |
| TG-108 | Content Gap Detector | TTW-234 | Topics competitors rank for that TG doesn't — auto-generate content briefs |
| TG-109 | Index Coverage Monitor | TTW-235 | Track what Google has indexed, alert on gaps |
| TG-110 | Content Uniqueness Report | TTW-236 | Detect duplicate content before Google penalizes |
| TG-111 | Neighborhood Page Performance | TTW-237 | Track traffic + rankings per local landing page |

#### Tier 4 — Intelligence & Analytics
| # | New Workflow | Based On | Why |
|---|---|---|---|
| TG-112 | Revenue Attribution Engine | TTW-77 | Know which channel (SEO, ads, referral) drives each job |
| TG-113 | Customer Birthday/Anniversary | TTW-146 | Easy personalization win — builds loyalty |
| TG-114 | Multi-Service Progression Tracker | TTW-99 | Track which services each customer uses → cross-sell roadmap |
| TG-115 | Email Send Time Optimizer | TTW-89 | Per-customer best send time based on open history |
| TG-116 | Email Subject A/B Tester | TTW-90 | Auto-test subject lines, pick winners |
| TG-117 | GA4 Weekly Reporter | TTW-149 | Automated GA4 reporting to owner |
| TG-118 | Weekly Marketing ROI Report | TTW-163 | What did marketing actually produce this week? |
| TG-119 | Commercial Nurture (5 emails/60d) | TTW inactive | Dedicated sequence for commercial/B2B prospects |
| TG-120 | Realtor Partner Outreach | TTW-33 | Referral partnerships with realtors for new homeowner leads |
| TG-121 | Fertilizer Program Upsell | TG-specific | Annual spring campaign: push fertilizer program to non-enrolled customers |

#### Tier 5 — Advanced (when ready to scale)
| # | New Workflow | Based On | Why |
|---|---|---|---|
| TG-122 | Photo-Based Quote Pipeline | TTW-201 | Customer sends photos → instant AI quote. Eliminates site visits. |
| TG-123 | Auto-Dispatch Monitor | TTW-202 | Auto-assigns jobs to crews. Scales from 3 to 10+ crews. |
| TG-124 | Unified Smart Social Poster | TTW-181 | One workflow posts platform-optimized content to FB, IG, GBP, Nextdoor |
| TG-125 | Media Asset AI Tagger | TTW-153 | Auto-tags uploaded job photos for quality, service type, before/after |
| TG-126 | Self-Improvement Loop | TTW-38-50 | Meta-system that auto-tunes all other workflows — builds over time |
| TG-127 | LinkedIn Prospecting Pipeline | TTW-68-70 | Commercial prospect scraping + outreach automation |

---

## PART 3 — EXECUTION ROADMAP

### Phase 0 — Fix What's Broken (Week 1, ~2 hours of credential gathering)
**9 workflows silently failing. Fix these before building anything new.**

| # | Fix | Workflow | Action |
|---|---|---|---|
| F1 | Wrong IMAP account | TG-05 | Set Jobber to forward notifications to `totalguardllc@gmail.com`, update n8n credential, re-enable |
| F2 | Google Places key missing | TG-19, TG-39 | Create Google Cloud project → enable Places API → get key → fill both workflows |
| F3 | Google Places ID missing | TG-19 | Query Places API for TotalGuard place ID → fill in workflow |
| F4 | Fix internal webhook URLs | TG-19 | Replace `https://n8n.instance/...` → `https://tgyardcare.app.n8n.cloud/...` |
| F5 | Facebook token missing | TG-35, TG-40, TG-41 | Meta Business Suite → System User → generate token → fill 3 workflows |
| F6 | GSC OAuth missing | TG-45 | Create Google Search Console OAuth2 credential in n8n → authorize |
| F7 | IndexNow key missing | TG-47 | Generate key → upload to tgyardcare.com/{key}.txt → fill workflow |
| F8 | Wrong sender email | TG-65, TG-67 | Replace `workelyhelp@gmail.com` → `vance@tgyardcare.com` |
| F9 | Lob API key missing | TG-33 | Either get Lob key OR disable the workflow |

**Verification:** After each fix, manually trigger the workflow and confirm execution log shows success, not failure.

---

### Phase 1 — Revenue-Critical Builds (Week 1–2)
**Builds that directly recover or create revenue. Do these before SEO or ops.**

#### TG-83: Quote Follow-up Email Sequence
```
Trigger: Called by TG-05 when Jobber fires "Quote sent" email
→ Log quote to Supabase (status: pending)
→ Wait 48 hours
→ Check still pending? YES:
    → SMS: "Hi [name], any questions about your TotalGuard quote? Happy to adjust anything."
→ Wait 5 days
→ Still pending? YES:
    → Email: social proof email with reviews + before/after photo
→ Wait 7 days
→ Still pending? YES:
    → SMS: "We have a spot open this week — want to lock it in before it fills? [Client hub link]"
→ Mark quote as expired in Supabase
```
Integrations: Supabase, Twilio, Brevo
Verify: Insert test quote with status=pending → confirm SMS/email fires at correct intervals

#### TG-84: Invoice Collections Sequence
```
Trigger: Called by TG-05 when Jobber fires "Invoice sent" email
→ Wait 3 days
→ Check Supabase: invoice still unpaid?
    → YES: SMS reminder with payment link
→ Wait 4 more days (7 total)
→ Still unpaid: Email (firmer) + SMS
→ Wait 14 more days (21 total)
→ Still unpaid: SMS owner "Invoice for [customer] — $[amount] — 21 days overdue"
```
Integrations: Supabase, Twilio, Brevo
Verify: Insert test invoice with paid=false → confirm escalation fires

#### TG-88: On My Way SMS
```
Trigger: Sub-workflow called manually by crew or via Jobber email "Visit confirmed"
→ Lookup customer phone from Supabase by job address
→ SMS: "Hi [name]! Your TotalGuard crew is on the way — arriving in ~[X] minutes. Reply STOP to opt out."
→ Log sent to Supabase
```
Integrations: Supabase, Twilio
Verify: Trigger manually with test customer → SMS received

#### TG-89: Invoice Delivery (SMS + Email)
```
Trigger: Called by TG-05 when Jobber fires "Job completed" email
→ Pull job details from Jobber email parse
→ SMS customer: "Your [service] is complete! Invoice for $[amount] sent to [email]. Pay here: [client hub link]"
→ Email customer: branded invoice notification with payment CTA
→ Log delivery to Supabase
```
Integrations: Supabase, Twilio, Brevo
Verify: Parse test "job completed" email → SMS + email confirmed

#### TG-90: Fertilizer Schedule Engine
```
Trigger: Cron — 7 days before each of the 5 treatment dates (2026 schedule)
→ Fetch all active fertilizer customers from Supabase
→ SMS each: "Heads up: your Step [X] fertilizer treatment is [date]. We'll be there 8am–5pm. No prep needed."
→ Email each: Branded HTML with treatment details + lawn tip

Trigger: Day of each treatment, 7am CT
→ SMS crew: route list with addresses
→ SMS each customer: "We're on our way today for your Step [X]! 🌿"

Trigger: Day after treatment, 9am CT
→ Check treatment logged complete?
    → YES: SMS customer "Your Step [X] is done. Here's what we applied: [product]. Water lightly if possible."
    → NO: SMS owner "[N] Step [X] treatments not logged — follow up needed"
```
Integrations: Supabase, Twilio, Brevo
Database: Needs `fertilizer_schedule` table with customer_id, step_1_date through step_5_date, step_X_complete flags
Verify: Set a test step date to tomorrow → confirm all three trigger groups fire

---

### Phase 2 — Operational Excellence (Week 2–3)

#### TG-92: CRM Webhook Router
Unified router for all CRM events. All customer communication gets logged to one place.
```
Trigger: Webhook
→ Parse event_type from payload
→ Route to correct handler:
    → quote_sent → TG-83
    → job_complete → TG-18 (review) + TG-89 (invoice) + TG-61 (loyalty)
    → invoice_sent → TG-84 (collections)
    → payment_received → TG-65 (upsell)
    → new_customer → TG-08 (welcome)
→ Log all events to Supabase event_log table
```

#### TG-94: Email Classifier + Auto-Responder
```
Trigger: Gmail Trigger — new email to totalguardllc@gmail.com
→ Claude classifies email: quote_request | complaint | scheduling | spam | payment | other
→ quote_request → extract details → TG-04 (manual lead entry) + auto-reply with timeline
→ complaint → SMS owner immediately + auto-reply "We're on it within 24hr"
→ scheduling → auto-reply with booking link
→ spam → archive
→ Log all to Supabase
```

#### TG-95: Churn Intervention Engine
```
Trigger: Cron — daily 3am CT
→ Fetch customers with health score < 40 (from TG-57)
→ Who dropped >10 points in last 7 days?
→ For each at-risk customer:
    → 0-7 days since last job: Email "How'd everything look? We want to make sure you're thrilled."
    → 30-60 days: SMS "Hey [name], haven't seen you in a while — everything okay with your lawn?"
    → 60-90 days: Personal offer email "Come back — 20% off your next service"
→ Log intervention to Supabase
```

#### TG-96: Snow Event Auto-Creator
```
Trigger: TG-56 weather-campaign-trigger detects ≥2" forecast
→ Fetch all customers with snow_removal=true
→ SMS each: "Snow incoming ❄️ — TotalGuard is on it. We'll clear [address] by [time]. Text when done."
→ Create job records in Supabase for crew dispatch
→ SMS crew: "Snow event — [N] addresses on your route tomorrow: [list]"
```

---

### Phase 3 — SEO Growth Engine (Week 3–4)

#### TG-103: GSC Daily Sync (prerequisite for most SEO workflows)
```
Trigger: Cron — daily 5am CT
→ Pull last 3 days of Google Search Console data via OAuth
→ Extract: queries, pages, clicks, impressions, position
→ Upsert to Supabase gsc_data table
→ This feeds: TG-45 (rank tracker), TG-104 (rank drop alert), TG-107 (opportunity detector)
```
*Build this first — it's the data foundation for all other SEO workflows.*

#### TG-104: Rank Drop Alert
```
Trigger: Cron — daily 7am CT (after TG-103 runs)
→ Compare today's GSC data vs 7 days ago
→ Any keyword dropped >5 positions?
→ SMS owner: "⚠️ Rank drop: '[keyword]' fell from #[X] to #[Y] — check tgyardcare.com/[page]"
→ Log to Supabase
```

#### TG-105: AI Blog Content Pipeline
```
Trigger: Cron — Mon/Wed/Fri 6am CT
→ Pull content calendar from Supabase (topics Claude suggested in TG-36)
→ Claude writes full blog post (1200-1500 words) with:
    - Local Madison references
    - Target keyword in title, H2s, meta
    - Internal links to service pages
    - FAQ schema markup
→ Save draft to Supabase blog_posts table with status: "pending_review"
→ SMS owner: "New blog draft ready: '[title]' — review at [CMS link]"
```

#### TG-106: City Content Generator
```
Trigger: Cron — monthly 1st 8am CT
→ Pull list of Madison neighborhoods from Supabase (Madison, Middleton, Fitchburg, Sun Prairie, Verona, etc.)
→ For each without a landing page:
    → Claude generates neighborhood-specific page content:
        - Local service area description
        - Neighborhood-specific lawn care tips
        - Local landmarks referenced naturally
        - LocalBusiness schema markup
    → Save to Supabase neighborhood_pages table
    → Submit URL to IndexNow via TG-47
→ SMS owner: "Generated [N] new city pages — ready for CMS upload"
```

---

### Phase 4 — Intelligence & Analytics (Month 2)

Build in this order:
1. TG-112 Revenue Attribution Engine — know what's actually driving revenue
2. TG-113 Customer Birthday/Anniversary — easy loyalty win
3. TG-115 Email Send Time Optimizer — improves all existing email workflows
4. TG-117 GA4 Weekly Reporter — automated analytics digest
5. TG-114 Multi-Service Progression Tracker — systematic upsell roadmap

---

### Phase 5 — Advanced Scale (Month 2-3)

1. TG-122 Photo-Based Quote Pipeline — requires photo upload UX on website
2. TG-123 Auto-Dispatch Monitor — requires Jobber API (upgrade to Grow plan first)
3. TG-124 Unified Smart Social Poster — requires Facebook token + Instagram Basic Display
4. TG-126 Self-Improvement Loop — build after all base workflows are solid

---

## PART 4 — CREDENTIAL STATUS TRACKER

Every workflow that fails today, and exactly what it needs:

| Integration | Status | Workflows Blocked | What's Needed |
|---|---|---|---|
| Supabase | ✅ LIVE | — | Nothing |
| Brevo | ✅ LIVE | — | Nothing |
| Anthropic/Claude | ✅ LIVE | — | Nothing |
| Twilio SMS | ⚠️ UNVERIFIED | TG-18, TG-25, TG-56, TG-66, TG-76, TG-80 | Complete A2P 10DLC campaign registration |
| Jobber (email) | ⚠️ BROKEN | TG-05 (backbone) | Fix IMAP to totalguardllc@gmail.com + re-enable |
| Google Places API | ❌ MISSING | TG-19, TG-39 | Google Cloud → Places API → key → 2 workflows |
| Facebook | ❌ MISSING | TG-35, TG-40, TG-41 | Meta Business Suite → System User token |
| Google Search Console | ❌ MISSING | TG-45 | n8n GSC OAuth2 credential |
| IndexNow | ❌ MISSING | TG-47 | Generate key + upload verification file |
| Lob (postcards) | ❌ MISSING | TG-33 | Lob account + API key (or disable) |
| VAPI | ❌ MISSING | TG-78 | Deploy actual VAPI voice agent first |
| OpenWeatherMap | ❌ MISSING | TG-25, TG-56 | OpenWeatherMap API key (free tier available) |

---

## SCORECARD AT COMPLETION

| Stage | Functional Workflows | % of TTW Coverage |
|---|---|---|
| Today (broken credentials) | ~35 | ~52% |
| After Phase 0 (credential fixes) | ~55 | ~82% |
| After Phase 1 (revenue builds) | ~64 | ~95% |
| After Phase 2 (ops builds) | ~75 | ~105% — exceeding TTW |
| After Phase 3 (SEO engine) | ~84 | — |
| After Phase 4-5 (intelligence + scale) | ~127 | — |

**At completion: TG has ~127 functional workflows vs TTW's ~67 active. You won't just match TTW — you'll be running at 2x their operational depth.**
