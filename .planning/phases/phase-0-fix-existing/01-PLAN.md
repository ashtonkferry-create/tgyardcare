# Phase 0: Fix Existing — Execution Plan

**Objective**: Take TG from ~35 functional automations to ~55+ by fixing every broken integration, deploying undeployed workflows, and verifying every channel. Zero new code — pure configuration and verification.

**Philosophy**: A billionaire doesn't build new things on broken foundations. We fix every crack first.

---

## Plan 1: Critical Infrastructure Fixes (Claude Can Do Now)

### Task 1.1: Fix CRON_SECRET on Vercel
**What**: The `CRON_SECRET` env var on Vercel has a trailing `\n` that breaks HMAC validation for all 41 Vercel cron jobs
**Action**: Use Vercel MCP to delete and re-create `CRON_SECRET` with clean value
**Clean value**: `4b1f7377969b74a270dcbb23e1c8e53f444f9e30fa7a3e378097feb5c7875287`
**Verification**: Hit any cron endpoint and confirm 200 response instead of auth failure
**Impact**: Unblocks ALL 41 Vercel cron jobs
**Who**: Claude

### Task 1.2: Add ANTHROPIC_API_KEY to Vercel Production
**What**: Claude API key exists in `.env.local` but is missing from Vercel production env vars
**Action**: Use Vercel MCP to add `ANTHROPIC_API_KEY` to production environment
**Verification**: Trigger seo-heal cron in production → confirm Claude generates fix suggestions
**Impact**: Unblocks: seo-heal, blog-generator, content-refresher, gbp-post, review-response-drafter, meta-gen, faq-builder, aeo-optimizer
**Who**: Claude

### Task 1.3: Add GOOGLE_SERVICE_ACCOUNT_JSON to Vercel Production
**What**: GBP service account JSON is in `.env.local` but missing from Vercel
**Action**: Use Vercel MCP to add base64-encoded service account JSON to production
**Verification**: Check env var exists (GBP API still blocked on quota, but env var should be ready)
**Impact**: Pre-stages GBP automation — instant activation once Google approves quota
**Who**: Claude

### Task 1.4: Add GBP_LOCATION_NAME to Vercel Production
**What**: Placeholder location name needs to be on Vercel for when API access is granted
**Action**: Use Vercel MCP to add `GBP_LOCATION_NAME` with current placeholder value
**Verification**: Env var exists on Vercel
**Impact**: Pre-stages GBP — no deploy needed once location name is resolved
**Who**: Claude

### Task 1.5: Deploy TG-81 and TG-82 to n8n
**What**: Newsletter Yard Report (TG-81) and Flash Sales (TG-82) exist as local JSON but were never pushed to n8n
**Action**: Use n8n API to import both workflow definitions
**Verification**: Both workflows visible in n8n dashboard with "TotalGuard Yard Care" tag
**Impact**: +2 functional workflows (both are TG-unique capabilities TTW doesn't have)
**Who**: Claude

---

## Plan 2: API Keys That Need Vance (Account Creation Required)

### Task 2.1: Facebook Graph API Token
**What**: No Facebook API credentials configured
**Steps for Vance**:
1. Go to developers.facebook.com → create app (Business type)
2. Add "Pages" and "Instagram Graph API" products
3. Connect TotalGuard Facebook page
4. Generate long-lived page access token
5. Provide token to Claude for env var setup
**Env vars needed**: `FACEBOOK_PAGE_ACCESS_TOKEN`, `FACEBOOK_PAGE_ID`
**Unblocks**: TG-03 (Facebook lead capture), TG-35-38 (social auto-posting)
**Impact**: +5 workflows

### Task 2.2: Google Search Console API
**What**: No GSC credentials — blocks keyword tracking and rank data
**Steps for Vance**:
1. Go to search.google.com/search-console → verify tgyardcare.com ownership (if not already)
2. In Google Cloud Console (project: tg-yard-care-gbp-api) → enable Search Console API
3. Grant the existing service account (`tg-gbp-automation@...`) read access to GSC property
4. OR: Create OAuth2 credentials for GSC access
5. Provide credentials to Claude
**Env vars needed**: `GOOGLE_GSC_PROPERTY` (= `https://tgyardcare.com`), GSC access via existing service account
**Unblocks**: TG-45 (keyword rank tracking), TG-51 (local SEO report enrichment)
**Impact**: +2 workflows + feeds data into existing rank-tracker cron

### Task 2.3: IndexNow API Key
**What**: IndexNow key not configured — seo-ping cron and TG-47 can't notify search engines
**Steps for Vance**:
1. Go to bing.com/webmasters → sign in with Microsoft account
2. Add tgyardcare.com site (if not already)
3. Go to Settings → API access → generate IndexNow key
4. Provide key to Claude
**Env vars needed**: `INDEXNOW_KEY`
**Unblocks**: TG-47 (IndexNow submitter), enhances seo-ping cron
**Impact**: +1 workflow + better index speed

### Task 2.4: OpenWeatherMap API Key
**What**: No weather API — blocks weather-triggered campaigns and crew briefings
**Steps for Vance**:
1. Go to openweathermap.org → create free account
2. Go to API Keys → copy default key (free tier: 1000 calls/day, more than enough)
3. Provide key to Claude
**Env vars needed**: `OPENWEATHER_API_KEY`
**Unblocks**: TG-25 (crew daily briefing weather data), TG-56 (snow event auto-creator)
**Impact**: +2 workflows

### Task 2.5: Google Places API Key
**What**: No Places API key — some field marketing workflows reference location data
**Steps for Vance**:
1. In Google Cloud Console (project: tg-yard-care-gbp-api) → enable Places API
2. Create API key restricted to Places API
3. Provide key to Claude
**Env vars needed**: `GOOGLE_PLACES_API_KEY`
**Unblocks**: TG-19 (Google review sync enrichment), field marketing location lookups
**Impact**: +1-2 workflows

### Task 2.6: Complete Jobber OAuth Handshake
**What**: OAuth callback routes exist (`/api/integrations/connect/jobber` + `/api/integrations/callback/jobber`) but handshake was never completed
**Steps for Vance**:
1. Log into Jobber developer portal
2. Navigate to OAuth app settings
3. Set redirect URI to `https://tgyardcare.com/api/integrations/callback/jobber`
4. Click "Connect" flow from TG admin panel or hit the connect endpoint directly
5. Complete OAuth consent in browser
6. Verify refresh token is stored
**Env vars needed**: `JOBBER_CLIENT_ID`, `JOBBER_CLIENT_SECRET` (may already exist), refresh token stored in DB
**Unblocks**: TG-05 (Jobber webhook receiver with real processing), deeper CRM integration
**Impact**: +1 workflow now, unlocks Phase 2 CRM capabilities

### Task 2.7: Verify Brevo DNS Records
**What**: Brevo API key is configured but domain authentication requires DNS records
**Steps for Vance**:
1. Log into app.brevo.com → Settings → Senders & Domains
2. Check if tgyardcare.com is verified
3. If not: copy the DKIM and SPF records Brevo provides
4. Add them to tgyardcare.com DNS (wherever domain is managed — likely Vercel or registrar)
5. Wait for propagation (usually <1 hour)
6. Verify in Brevo dashboard
**Verification**: Send test email from Brevo → check it doesn't hit spam
**Unblocks**: TG-08-17 (email marketing), TG-81 (newsletter), TG-82 (flash sales) — emails will actually deliver instead of hitting spam
**Impact**: Improves deliverability for 12 email workflows

### Task 2.8: Verify Twilio SMS Campaign
**What**: Twilio credentials configured but SMS campaign registration may not be complete
**Steps for Vance**:
1. Log into twilio.com → Messaging → Services
2. Check if a Messaging Service exists for +16089953554
3. If using A2P 10DLC: verify campaign is registered and approved
4. Send test SMS from Twilio console to your personal phone
5. Confirm receipt
**Verification**: TG-02 sends a test SMS → arrives on phone
**Unblocks**: TG-02 (phone lead capture SMS), TG-76 (two-way SMS)
**Impact**: +2 workflows fully verified

---

## Plan 3: Monitoring & Waiting (Track External Approvals)

### Task 3.1: Monitor GBP API Quota Approval
**What**: Google Business Profile API access application submitted 2026-03-08. Expected 5 business days.
**Status**: Should be approved by now (~6 days). May need follow-up.
**Steps**:
1. Check Google Cloud Console → APIs & Services → My Business API → Quotas
2. If quota still 0: re-submit application or contact Google support
3. Once approved: run `/api/admin/gbp-health` diagnostic
4. Discover correct `accounts/X/locations/Y` format
5. Update `GBP_LOCATION_NAME` on Vercel
**Unblocks**: TG-20, TG-46, TG-55, 8 cron routes (review-responder, gbp-post-publisher, gbp-audit, etc.)
**Impact**: +3 n8n workflows + 8 cron routes = entire review/post automation system goes live

### Task 3.2: Optional — Slack Webhook
**What**: Slack notifications commented out in .env.local
**Steps for Vance** (if desired):
1. Create Slack workspace (or use existing)
2. Create incoming webhook at api.slack.com/apps
3. Provide webhook URL to Claude
**Env var**: `SLACK_WEBHOOK_URL`
**Impact**: Enables digest delivery and alert notifications via Slack

---

## Execution Order

```
IMMEDIATE (Claude does now):
  1.1 Fix CRON_SECRET ─────────────┐
  1.2 Add ANTHROPIC_API_KEY ───────┤
  1.3 Add GBP service account ─────┤── All parallel, no dependencies
  1.4 Add GBP location name ───────┤
  1.5 Deploy TG-81 + TG-82 ────────┘

VANCE ACTIONS (account creation):
  2.3 IndexNow key ────────┐
  2.4 OpenWeatherMap key ──┤── Quick wins (free, <5 min each)
  2.5 Google Places key ───┘

  2.1 Facebook token ──────┐── Medium effort (~15 min each)
  2.2 GSC access ──────────┘

  2.6 Jobber OAuth ────────┐── Requires browser flow
  2.7 Brevo DNS ───────────┤── Requires DNS access
  2.8 Twilio verify ───────┘── Requires Twilio console

MONITORING:
  3.1 GBP API approval ───── Check daily until approved
  3.2 Slack webhook ───────── Optional, do anytime
```

## Success Criteria
- [ ] All 41 Vercel cron jobs respond 200 (CRON_SECRET fixed)
- [ ] Claude-powered crons work in production (ANTHROPIC_API_KEY on Vercel)
- [ ] TG-81 and TG-82 visible and active in n8n
- [ ] Facebook social posting works (TG-35-38)
- [ ] Keyword rank tracking has GSC data (TG-45)
- [ ] IndexNow pings succeed (TG-47)
- [ ] Weather data flows into crew briefings (TG-25)
- [ ] Brevo emails don't hit spam
- [ ] Twilio SMS delivers
- [ ] GBP API quota > 0 QPM
- [ ] Functional workflow count: 55+ (up from ~35)
