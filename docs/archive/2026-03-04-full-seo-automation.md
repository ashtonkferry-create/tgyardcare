# Full SEO Automation Suite Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a fully automated SEO system for TotalGuard Yard Care that monitors, audits, generates, and improves SEO signals 24/7 with zero manual intervention.

**Architecture:** All automations run as Vercel Cron routes in `tgyardcare-next/src/app/api/cron/`. Each route: validates CRON_SECRET, does its work, logs to `automation_runs`, updates `automation_config`, sends Slack alerts on issues. New routes also update vercel.json schedule.

**Tech Stack:** Next.js 15 App Router, Supabase, Anthropic Claude (Haiku for cost efficiency), Slack webhooks, Google PageSpeed Insights API (free), fetch for HTML crawling.

**CRITICAL:** ALL files go in `tgyardcare-next/src/` — NOT in root `src/`. Vercel builds from `tgyardcare-next/`.

---

## Automation Inventory

### Already Exists (in WRONG directory — old src/, not deployed)
These 10 routes must be PORTED to `tgyardcare-next/src/app/api/cron/`:
1. `season-switcher` — daily 6am, auto-switches seasonal theme
2. `seo-audit` — Monday 12pm, audits all pages
3. `sitemap-check` — Monday 2pm, checks sitemap URLs
4. `robots-guard` — daily 6am, validates robots.txt
5. `meta-gen` — Tuesday 10am, AI generates meta descriptions → DB (loop NOT closed)
6. `faq-builder` — Tuesday 11am, AI generates FAQ schema → DB (loop NOT closed)
7. `content-freshness` — monthly 1st 8am, flags stale pages → DB (loop NOT closed)
8. `gbp-post` — Monday 2pm, generates GBP post → DB (no posting yet)
9. `lead-response-timer` — daily 9am, alerts if leads unresponded >2h
10. `weekly-digest` — Monday 1pm, sends weekly Slack summary

### Already in tgyardcare-next/
- `nap-checker` — Tuesday 9am ✅
- `local-gap-finder` — monthly 1st 8am ✅
- `geo-signal-auditor` — Tuesday 10am ✅

### NEW — Wave 1 (Monitoring)
11. `image-alt-checker` — Tuesday 8am, crawls pages for `<img>` missing alt text
12. `heading-auditor` — Tuesday 9am (after nap-checker), checks H1/H2/H3 hierarchy
13. `schema-validator` — Monday 3pm, validates JSON-LD on all key pages
14. `internal-link-optimizer` — monthly 1st 10am, counts internal links per page
15. `page-speed-monitor` — Wednesday 8am, PageSpeed Insights API for key pages

### NEW — Wave 2 (Growth / Workflow)
16. `content-refresher` — monthly 1st 9am, Claude rewrites stale content → stores to DB
17. `rank-tracker` — Wednesday 10am, checks keyword coverage + rankability signals
18. `competitor-monitor` — monthly 5th 9am, tracks competitor page additions
19. `review-request` — daily 10am, flags service completions needing review request
20. `review-response-drafter` — Wednesday 9am, generates draft review responses → DB
21. `social-auto-post` — Thursday 9am, generates seasonal social content → Slack
22. `citation-sync` — monthly 10th 9am, checks NAP on Yelp/GMB/YP

---

## Wave 0: Port Existing Cron Routes

**Files to create (copy from src/ to tgyardcare-next/src/):**
```
tgyardcare-next/src/app/api/cron/season-switcher/route.ts
tgyardcare-next/src/app/api/cron/seo-audit/route.ts
tgyardcare-next/src/app/api/cron/sitemap-check/route.ts
tgyardcare-next/src/app/api/cron/robots-guard/route.ts
tgyardcare-next/src/app/api/cron/meta-gen/route.ts
tgyardcare-next/src/app/api/cron/faq-builder/route.ts
tgyardcare-next/src/app/api/cron/content-freshness/route.ts
tgyardcare-next/src/app/api/cron/gbp-post/route.ts
tgyardcare-next/src/app/api/cron/lead-response-timer/route.ts
tgyardcare-next/src/app/api/cron/weekly-digest/route.ts
```
Source files are at `/c/Users/vance/OneDrive/Desktop/claude-workspace/tgyardcare/src/app/api/cron/`

---

## Wave 1: New Monitoring Crons

### Task W1-A: image-alt-checker

**File:** `tgyardcare-next/src/app/api/cron/image-alt-checker/route.ts`

**Logic:**
- Fetch key pages (home, services, locations, about, contact)
- Parse HTML: find all `<img` tags
- Check: has `alt=""` or `alt="..."` attribute?
- Report: pages with images missing alt text, count of offending images
- Slack alert: list pages + image src snippets (first 60 chars)
- Log to automation_runs, update automation_config

**Schedule:** `"0 8 * * 2"` (Tuesday 8am)

```typescript
// Pages to check
const PAGES = ["/", "/about", "/contact", "/service-areas",
  "/services/lawn-care", "/services/snow-removal", "/services/gutter-cleaning",
  "/locations/madison", "/locations/middleton", "/locations/verona"];

// Image regex
const imgRegex = /<img[^>]+>/gi;
const altRegex = /alt=["'][^"']*["']/i;
// For each page: find all <img>, check each has alt attribute
// Missing alt = issues list entry
```

---

### Task W1-B: heading-auditor

**File:** `tgyardcare-next/src/app/api/cron/heading-auditor/route.ts`

**Logic:**
- Fetch service + location pages
- Check: exactly 1 `<h1>`, at least 2 `<h2>`, no `<h3>` before any `<h2>`
- Check: H1 contains city name (for location pages) or service keyword (for service pages)
- Report: pages with heading structure issues
- Slack alert with page + specific issue

**Schedule:** `"0 9 * * 2"` (Tuesday 9am)

```typescript
interface HeadingIssue {
  path: string;
  issues: string[];
}

// Count H1, H2, H3 occurrences
// Check H1 count !== 1
// Check H2 count < 2
// Check H1 text includes target keyword
```

---

### Task W1-C: schema-validator

**File:** `tgyardcare-next/src/app/api/cron/schema-validator/route.ts`

**Logic:**
- Fetch key pages
- Extract all `<script type="application/ld+json">` blocks
- Parse JSON-LD
- Validate: required fields present (name, address, telephone for LocalBusiness)
- Check for @type, @context, name, telephone, address, url
- For service pages: check for Service or LawnCareService type
- Report missing/malformed schema

**Schedule:** `"0 15 * * 1"` (Monday 3pm)

```typescript
const ldJsonRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;

// Required LocalBusiness fields
const REQUIRED_FIELDS = ["@type", "@context", "name", "telephone", "address", "url"];
```

---

### Task W1-D: internal-link-optimizer

**File:** `tgyardcare-next/src/app/api/cron/internal-link-optimizer/route.ts`

**Logic:**
- Fetch all service + location pages
- Count `<a href="/"` and `<a href="/...` internal links (same domain)
- Flag pages with < 3 internal links
- Identify "orphan" patterns (pages not linked from anywhere in the crawled set)
- Report via Slack

**Schedule:** `"0 10 1 * *"` (monthly 1st 10am)

```typescript
// Count internal links per page
// href starts with "/" or contains "tgyardcare.com"
const internalLinkRegex = /href=["'](?:https?:\/\/(?:www\.)?tgyardcare\.com)?\/[^"']*["']/gi;
const MIN_INTERNAL_LINKS = 3;
```

---

### Task W1-E: page-speed-monitor

**File:** `tgyardcare-next/src/app/api/cron/page-speed-monitor/route.ts`

**Logic:**
- Call Google PageSpeed Insights API for key pages (FREE, no API key required for basic use)
- URL: `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=URL&strategy=mobile`
- Extract: Performance score, LCP, CLS, FID/INP, TBT
- Flag: performance score < 50 = critical, < 70 = warning
- Flag: LCP > 4s = critical, CLS > 0.25 = critical
- Log scores to DB (new table: `page_speed_results`)
- Slack alert if any critical pages

**Schedule:** `"0 8 * * 3"` (Wednesday 8am)

**Note:** Free tier has rate limits. Check 3-4 most important pages only.

```typescript
const KEY_PAGES_FOR_SPEED = ["/", "/services/lawn-care", "/locations/madison", "/contact"];

interface SpeedResult {
  path: string;
  score: number;
  lcp: number; // ms
  cls: number;
  tbt: number; // ms
}
```

---

## Wave 2: New Growth Crons

### Task W2-A: content-refresher

**File:** `tgyardcare-next/src/app/api/cron/content-refresher/route.ts`

**Logic:**
- Query `page_seo` for pages where `needs_refresh = true` (set by content-freshness cron)
- For each stale page (max 3 per run): fetch current page HTML
- Extract main content (between `<main>` tags or body)
- Use Claude Haiku to generate a "freshness update" — new seasonal intro paragraph, updated value props
- Store to `page_seo.refreshed_content` and `page_seo.refreshed_at` columns
- Clear `needs_refresh = false`
- Alert Slack: "Content refresh ready for review at /admin/seo"

**Schedule:** `"0 9 1 * *"` (monthly 1st 9am)

**Note:** Stores to DB for human review — does NOT auto-publish. Human-in-the-loop.

```typescript
export const maxDuration = 300; // 5 min for multiple Claude calls
const MAX_PAGES_PER_RUN = 3;
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
```

---

### Task W2-B: rank-tracker

**File:** `tgyardcare-next/src/app/api/cron/rank-tracker/route.ts`

**Logic:**
- Define target keyword → page mappings
- For each keyword: check our page exists and is indexable
- Check meta title contains keyword, H1 contains keyword, body mentions keyword multiple times
- Generate "rankability score" (0-100) based on on-page signals
- Compare to previous run's scores in DB
- Track trend: improving / declining / stable
- Alert Slack: declining pages + score

**Schedule:** `"0 10 * * 3"` (Wednesday 10am)

```typescript
const KEYWORD_TARGETS = [
  { keyword: "lawn care madison wi", path: "/locations/madison", minMentions: 3 },
  { keyword: "snow removal madison wi", path: "/services/snow-removal", minMentions: 3 },
  { keyword: "lawn mowing middleton wi", path: "/locations/middleton", minMentions: 2 },
  { keyword: "gutter cleaning madison", path: "/services/gutter-cleaning", minMentions: 2 },
  { keyword: "lawn fertilization madison", path: "/services/fertilization", minMentions: 2 },
  { keyword: "yard cleanup madison wi", path: "/services/spring-cleanup", minMentions: 2 },
];
```

---

### Task W2-C: competitor-monitor

**File:** `tgyardcare-next/src/app/api/cron/competitor-monitor/route.ts`

**Logic:**
- Define competitor URLs to monitor
- Fetch each competitor's service/location pages
- Extract page titles, H1s, service list
- Compare to last month's snapshot (stored in DB table `competitor_snapshots`)
- Report: new pages added, removed, title changes
- Slack alert: "Competitor X added 3 new pages this month"

**Schedule:** `"0 9 5 * *"` (monthly 5th 9am)

```typescript
const COMPETITORS = [
  { name: "Madison Lawn Pro", url: "https://madisonlawnpro.com" },
  { name: "Green Thumb Madison", url: "https://greenthumbmadison.com" },
];
// NOTE: Competitors may block crawlers. Handle gracefully with try/catch.
// If blocked (403), log as "blocked" and skip diff.
```

---

### Task W2-D: review-request

**File:** `tgyardcare-next/src/app/api/cron/review-request/route.ts`

**Logic:**
- Query `contact_submissions` for entries where:
  - `service_completed_at` is set (within last 48h)
  - `review_requested_at` is NULL
- For each: generate a review request message using Claude Haiku (personalized with name + service)
- Store message to `contact_submissions.review_request_draft`
- Mark `review_requested_at = now()`
- Send to Slack: "📧 Review request ready for [Name] — [service]. View at /admin"
- Does NOT auto-send email — human approval in admin

**Schedule:** `"0 10 * * *"` (daily 10am)

```typescript
// This generates drafts for human approval, not auto-sends
// Real email sending can be added later with Resend API
const MAX_REQUESTS_PER_RUN = 5;
```

---

### Task W2-E: review-response-drafter

**File:** `tgyardcare-next/src/app/api/cron/review-response-drafter/route.ts`

**Logic:**
- Query `reviews` table (or `page_seo` if no reviews table) for reviews with `response_draft IS NULL`
- For each: use Claude Haiku to draft a professional, personalized response
- Reference: business name, service mentioned, reviewer sentiment
- Store to `reviews.response_draft`
- Slack: "✍️ Draft responses ready for X new reviews at /admin/reviews"

**Schedule:** `"0 9 * * 3"` (Wednesday 9am)

**Note:** Creates `reviews` table if it doesn't exist in the Supabase migration.

```typescript
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
// Draft template includes: thank reviewer, mention specific service, invite back
// Tone: professional, warm, genuine — NOT generic
```

---

### Task W2-F: social-auto-post

**File:** `tgyardcare-next/src/app/api/cron/social-auto-post/route.ts`

**Logic:**
- Detect current season (same mmdd logic used elsewhere)
- Generate 3 social posts using Claude Haiku:
  1. Educational tip (e.g., "When to aerate your lawn")
  2. Service highlight (e.g., "Spring cleanup special")
  3. Community/local post (e.g., "Proud to serve Middleton!")
- Format for: Facebook (200 words), Instagram (150 words + hashtags)
- Store to `social_posts` table with `status = 'draft'`
- Slack: "📱 3 social posts drafted for this week — approve at /admin/social"

**Schedule:** `"0 9 * * 4"` (Thursday 9am)

```typescript
export const maxDuration = 120;
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
// 3 posts generated, stored in DB, Slacked for approval
// Does NOT auto-post — requires human approval or social API integration
```

---

### Task W2-G: citation-sync

**File:** `tgyardcare-next/src/app/api/cron/citation-sync/route.ts`

**Logic:**
- Attempt to fetch known citation pages for TotalGuard
- Check if NAP (Name, Address, Phone) appears correctly on:
  - Yelp business page (if public URL known)
  - Yellow Pages listing
  - BBB profile (if exists)
  - Local chamber of commerce pages
- Parse HTML for canonical NAP strings
- Report: "Yelp shows wrong phone number" or "Not found on YP"
- Slack alert for any discrepancies

**Schedule:** `"0 9 10 * *"` (monthly 10th 9am)

```typescript
const CANONICAL_NAP = {
  name: "TotalGuard Yard Care",
  phone: "608-535-6057",
  phoneAlt: "(608) 535-6057",
};

const CITATION_SOURCES = [
  { name: "Yelp", url: "https://www.yelp.com/biz/totalguard-yard-care-madison" },
  // Add real URLs once found
];
// Many will be blocked — handle gracefully, report what we can
```

---

## Wave 3: Update vercel.json

Add all new cron entries to `tgyardcare/vercel.json`:

```json
{ "path": "/api/cron/image-alt-checker",        "schedule": "0 8 * * 2"   },
{ "path": "/api/cron/heading-auditor",           "schedule": "0 9 * * 2"   },
{ "path": "/api/cron/schema-validator",          "schedule": "0 15 * * 1"  },
{ "path": "/api/cron/internal-link-optimizer",   "schedule": "0 10 1 * *"  },
{ "path": "/api/cron/page-speed-monitor",        "schedule": "0 8 * * 3"   },
{ "path": "/api/cron/content-refresher",         "schedule": "0 9 1 * *"   },
{ "path": "/api/cron/rank-tracker",              "schedule": "0 10 * * 3"  },
{ "path": "/api/cron/competitor-monitor",        "schedule": "0 9 5 * *"   },
{ "path": "/api/cron/review-request",            "schedule": "0 10 * * *"  },
{ "path": "/api/cron/review-response-drafter",   "schedule": "0 9 * * 3"   },
{ "path": "/api/cron/social-auto-post",          "schedule": "0 9 * * 4"   },
{ "path": "/api/cron/citation-sync",             "schedule": "0 9 10 * *"  }
```

---

## DB Migrations Needed

```sql
-- page_speed_results table
CREATE TABLE IF NOT EXISTS page_speed_results (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  path text NOT NULL,
  score integer,
  lcp_ms integer,
  cls numeric,
  tbt_ms integer,
  strategy text DEFAULT 'mobile',
  checked_at timestamptz DEFAULT now()
);

-- competitor_snapshots table
CREATE TABLE IF NOT EXISTS competitor_snapshots (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  competitor_name text NOT NULL,
  pages jsonb,
  snapshot_at timestamptz DEFAULT now()
);

-- reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  reviewer_name text,
  rating integer,
  review_text text,
  source text DEFAULT 'google',
  response_draft text,
  responded_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- social_posts table
CREATE TABLE IF NOT EXISTS social_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  content_fb text,
  content_ig text,
  hashtags text,
  season text,
  status text DEFAULT 'draft',
  posted_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- page_seo additional columns (if not exists)
ALTER TABLE page_seo ADD COLUMN IF NOT EXISTS refreshed_content text;
ALTER TABLE page_seo ADD COLUMN IF NOT EXISTS refreshed_at timestamptz;
ALTER TABLE page_seo ADD COLUMN IF NOT EXISTS rankability_score integer;
ALTER TABLE page_seo ADD COLUMN IF NOT EXISTS speed_score integer;
```
