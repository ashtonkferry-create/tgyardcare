# Admin SEO Command Center — Design Document

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:writing-plans to create the implementation plan.

**Goal:** Replace 13 fragmented admin pages with a unified dark-glass command center featuring a live on-site SEO audit engine, 20 automated SEO workflows, and auto-season switching.

**Architecture:** Hub + drill-down. `/admin` is the bento-grid command center showing critical widgets from every section. Each widget links to a dedicated sub-page for deep work. No external API keys required — all intelligence is on-site.

**Tech Stack:** Next.js 15 App Router, Supabase (DB + Edge Functions), Vercel Cron Jobs, n8n workflows, Claude Haiku/Sonnet (AI automations), Slack (notifications), Tailwind CSS 3.4, shadcn/ui

---

## 1. Layout & Navigation Shell

### `AdminLayout` component
- **Background:** `#050505` base, `#0a0a0f` sidebar
- **Accent color:** `#22c55e` (green, TotalGuard brand)
- **Fixed left sidebar:** 240px wide
- **Sticky top header:** 56px
- **Main content area:** scrollable, `calc(100vw - 240px)`

### Sidebar Nav (with Lucide icons)
```
⊞  Command Center       /admin
◎  SEO Intelligence     /admin/seo
⚡  Automations          /admin/automations
🔍  Site Health          /admin/site-health
◈  Schema & GEO         /admin/schema
📬  Leads                /admin/leads
🌿  Seasons & Promos     /admin/seasons
🖼  Gallery              /admin/gallery
⚙  Tools                /admin/tools
```

### Top Header Bar
- Left: current page breadcrumb title
- Center: **Season pill** (clickable) — shows `❄️ Winter (Auto)` or `☀️ Summer (Override)` etc.
- Right: "View Site →" external link, admin avatar/logout

### Route Map (consolidates 13 → 9 pages)
| New Route | Replaces |
|-----------|---------|
| `/admin` | current overview |
| `/admin/seo` | `/admin/seo` + `/admin/seo-manager` |
| `/admin/automations` | new |
| `/admin/site-health` | `/admin/performance` |
| `/admin/schema` | new |
| `/admin/leads` | `/admin/leads` |
| `/admin/seasons` | `/admin/seasons` + `/admin/promos` |
| `/admin/gallery` | `/admin/gallery` (wrapped in new layout) |
| `/admin/tools` | `/admin/tools` + `/admin/image-converter` + `/admin/image-optimizer` |

---

## 2. Command Center (`/admin`)

Bento-grid layout. Every widget loads data on-demand from Supabase or the on-site audit cache.

### Row 1 — 4 Stat Tiles
| Tile | Data Source | Shows |
|------|------------|-------|
| Site Health Score | `page_seo` audit cache | Overall score /100, delta vs last week |
| Leads (30d) | `contact_submissions` | Count, delta vs prior 30d |
| Active Season | `season_settings` | Current season + auto/override badge |
| Pages Indexed | sitemap.ts count | Total pages, 0 errors badge |

### Row 2 — 2 Columns
- **Left: Top SEO Issues** — top 5 issues from latest audit, grouped by type (missing H1, no alt text, duplicate meta). "View All →" → `/admin/seo`
- **Right: Recent Leads** — last 5 `contact_submissions` rows (name, service, time ago). "View All →" → `/admin/leads`

### Row 3 — 2 Columns
- **Left: Season Control** — auto-detected season, next switch countdown, manual override toggle. "Configure →" → `/admin/seasons`
- **Right: Schema Health** — count of valid/invalid schemas across all pages. "Fix Issues →" → `/admin/schema`

### Row 4 — Full Width
- **Page SEO Score Table** — top 10 pages, score bar, pass/fail icons for title/desc/H1/schema. "View All 76 Pages →" → `/admin/seo`

### Widget data flow
All hub widgets read from Supabase tables, never re-crawl on load. Audit runs on schedule and caches results. Hub is always fast.

---

## 3. SEO Intelligence Engine (`/admin/seo`)

### Audit API Route: `GET /api/admin/seo-audit`
- Reads sitemap.ts to get all 76 page paths
- For each page: fetches `/api/admin/page-meta?path=/services/mowing` (server-side metadata extraction)
- Scores page 0–100 using rubric below
- Saves results to `page_seo` table (`seo_score`, `audit_issues`, `audited_at` columns)
- Returns summary: overall score, issue counts by severity

### Scoring Rubric (per page, 100 pts)
| Check | Points | Pass Condition |
|-------|--------|----------------|
| Title tag | 20 | Present, 30–60 chars, contains primary keyword |
| Meta description | 20 | Present, 70–160 chars |
| H1 tag | 15 | Exactly one H1, contains keyword |
| Schema markup | 15 | Appropriate type present and parseable |
| Image alt text | 10 | All `<img>` tags have non-empty alt |
| Internal links | 10 | 3+ internal links on page |
| Canonical tag | 5 | Present, matches page URL |
| GEO signals | 5 | `geo.region`, `geo.placename` meta present (location pages) |

### Severity Classification
- **Critical (🔴):** Score 0–49, or missing title/H1
- **Warning (🟡):** Score 50–74, or weak meta desc
- **Good (✅):** Score 75–100

### Page UI
```
Header: Overall Score 82/100 | Last run: 2h ago | [Re-run Audit]
Issue Summary: 🔴 3 Critical  🟡 14 Warnings  🔵 8 Info
Filters: [All] [Services] [Locations] [Blog] [Commercial]
Table: Page | Score | Title | Desc | H1 | Schema | Issues | [Edit in Supabase →]
```
Click any row → expanded drawer showing all issue details for that page.

### GEO Signals Tab (within `/admin/seo`)
- Checks every location page for: `<meta name="geo.region" content="US-WI">`, `<meta name="geo.placename">`, `<meta name="geo.position">`
- Verifies city name appears in title, H1, and body text
- Confirms LocalBusiness schema `areaServed` covers all 12 cities
- Coverage matrix: 12 cities × 14 services = 168 potential local landing pages — shows which exist vs. missing (gap opportunities)

### Schema Tab (within `/admin/seo`)
- Live JSON-LD validator for all pages
- Flags: missing `priceRange`, `telephone`, `address`, `openingHours`
- Shows pages with no schema at all (76 pages, highlights gaps)

---

## 4. Automations Engine (`/admin/automations`)

### New Supabase Tables

**`automation_config`**
```sql
id uuid primary key
slug text unique not null          -- 'auto-season-switcher'
name text not null
description text
tier text                          -- 'foundation' | 'content' | 'local' | 'ai' | 'monitoring'
is_active boolean default true
schedule text                      -- cron expression or 'trigger'
last_run_at timestamptz
next_run_at timestamptz
```

**`automation_runs`**
```sql
id uuid primary key
automation_slug text references automation_config(slug)
started_at timestamptz
completed_at timestamptz
status text                        -- 'success' | 'warning' | 'error' | 'skipped'
result_summary text
error_message text
pages_affected int
```

### The 20 Automations

#### Tier 1 — Foundation
| # | Slug | Trigger | What It Does |
|---|------|---------|-------------|
| 1 | `auto-season-switcher` | Vercel cron: `0 6 * * *` (midnight CT) | Checks date, sets season in `season_settings`, skips if manual override, logs to `automation_runs`, Slack notify on switch |
| 2 | `full-seo-audit` | Vercel cron: `0 12 * * 1` (Monday 6am CT) | Crawls all 76 pages, scores each, saves to `page_seo`, sends Slack summary |
| 3 | `sitemap-integrity-check` | Vercel cron: `0 14 * * 1` | Fetches every URL in sitemap, verifies 200 response, logs 404s/redirects |
| 4 | `indexnow-submitter` | Supabase trigger: on `page_seo` or `blog_posts` update | POSTs updated URLs to `https://api.indexnow.org/indexnow` (Bing) |
| 5 | `schema-validator` | Vercel cron: `0 15 * * 1` | Parses JSON-LD on all pages, checks required fields, Slack alert if critical issues found |

#### Tier 2 — Content & Signals
| # | Slug | Trigger | What It Does |
|---|------|---------|-------------|
| 6 | `meta-description-generator` | On-demand + weekly sweep | Calls Claude Haiku for pages where `meta_description` is null or <70 chars, saves suggestions to `page_seo.suggested_meta_description` |
| 7 | `faq-schema-builder` | Vercel cron: weekly | Generates 5 voice-search Q&A pairs per service page using Claude Haiku, appends FAQ JSON-LD to `page_seo.schema_data` |
| 8 | `content-freshness-monitor` | Vercel cron: 1st of month | Queries `page_seo.updated_at`, flags pages >90 days old with `needs_refresh: true` |
| 9 | `internal-link-suggester` | Supabase trigger: on new `blog_posts` row | Claude Haiku reads new post content + existing page list, returns 3–5 relevant internal link suggestions, saves to `blog_posts.suggested_links` |
| 10 | `gbp-post-generator` | Vercel cron: `0 14 * * 1` | Claude Sonnet generates seasonal Google Business Profile post (180 chars), saves to `automation_runs.result_summary` for copy-paste |

#### Tier 3 — Local Dominance
| # | Slug | Trigger | What It Does |
|---|------|---------|-------------|
| 11 | `nap-consistency-checker` | Vercel cron: weekly | Scrapes name/address/phone from all 76 pages, compares against `business_info` table canonical values, flags mismatches |
| 12 | `local-coverage-gap-finder` | Vercel cron: 1st of month | Builds 12×14 city-service matrix, checks which combinations have a dedicated landing page, logs missing ones as opportunities |
| 13 | `review-schema-updater` | Supabase trigger: on new `curated_reviews` row | Recalculates `ratingValue` and `reviewCount`, updates LocalBusiness schema in `site_config.schema_override` |
| 14 | `geo-signal-auditor` | Vercel cron: weekly | Checks geo meta tags on all location pages, flags missing `geo.region`/`geo.placename`/`geo.position` |

#### Tier 4 — AI Answer Engine Optimization
| # | Slug | Trigger | What It Does |
|---|------|---------|-------------|
| 15 | `answer-engine-optimizer` | Vercel cron: 1st of month | Claude Sonnet rewrites the first 2 paragraphs of each service page into direct-answer format that AI engines (ChatGPT, Perplexity) cite — saves suggestions to `page_seo` |
| 16 | `voice-search-expander` | Vercel cron: weekly | Generates "near me" + conversational FAQ schema for voice queries (e.g., "Who does snow removal near Madison WI?") |

#### Tier 5 — Monitoring & Alerts
| # | Slug | Trigger | What It Does |
|---|------|---------|-------------|
| 17 | `seo-score-drop-alert` | Supabase trigger: on `page_seo.seo_score` update | If score drops >10pts vs previous value → Slack notification with page URL and old/new score |
| 18 | `lead-response-timer` | Supabase Edge Function: scheduled every 30min | Checks `contact_submissions` where `responded_at IS NULL` and `created_at < NOW() - INTERVAL '2 hours'` → Slack reminder |
| 19 | `weekly-performance-digest` | n8n workflow: Monday 8am | Aggregates: leads count, top SEO issues, automation run statuses, season status → formats Slack summary card |
| 20 | `robots-guard` | Vercel cron: `0 6 * * *` | Fetches `/robots.txt`, verifies `Disallow: /admin` present and sitemap URL is correct |

### Season Auto-Switch Logic (Automation #1)
```
Winter: Nov 15 → Mar 14  (activates Nov 15, deactivates Mar 15)
Summer: May 15 → Sep 14  (activates May 15, deactivates Sep 15)
Spring: Mar 15 → May 14  (implied gap — auto-sets 'spring')
Fall:   Sep 15 → Nov 14  (implied gap — auto-sets 'fall')

If season_settings.manual_override = true:
  → log 'skipped (manual override active)'
  → do NOT change season
  → override clears automatically when NEXT season boundary hits
```

### Automation Control Panel UI
```
/admin/automations

Header: "Automation Engine"  |  System Health: 18/20 Running  |  [Run All]

Filter tabs: [All] [Cron] [AI-Powered] [Triggers] [Alerts]

Card per automation:
┌─ ❄️ Auto Season Switcher ── Tier: Foundation ── ✅ Running ─────┐
│  Switches site season based on calendar dates automatically      │
│  Last: Today 12:00am — ✅ Success — "Winter active (47 days)"   │
│  Next: May 15, 2026 12:00am CT → Summer                         │
│  [⏸ Pause]  [▶ Run Now]  [📋 View Logs]                         │
└──────────────────────────────────────────────────────────────────┘
```

---

## 5. Site Health (`/admin/site-health`)

Replaces the old performance page.

### Checks (auto-run weekly, manually triggerable)
- **Page speed:** Fetch Vercel Speed Insights data via `@vercel/speed-insights` API
- **404 errors:** Detect pages returning non-200 from sitemap
- **Broken internal links:** Crawl all pages, find href links that return 404
- **Image optimization:** Flag `<img>` tags not using `next/image`
- **Core Web Vitals:** Pull from Vercel Analytics API (LCP, CLS, FID)
- **Redirect chains:** Detect multi-hop redirects (A → B → C) that should be A → C

### UI: Traffic light grid
```
✅ Sitemap integrity       76/76 pages returning 200
✅ No 404 errors           0 broken pages found
⚠️  3 broken internal links  /blog/old-post → 404
✅ Core Web Vitals         LCP 1.8s | CLS 0.02 | FID 12ms
⚠️  4 images not optimized  Missing next/image on /gallery
```

---

## 6. Schema & GEO Editor (`/admin/schema`)

### Schema Viewer
- Lists all JSON-LD schemas in the site (parsed from `layout.tsx` + `LocalBusinessSchema.tsx` etc.)
- Shows validation status for each: LocalBusiness, WebSite, Service (×14), FAQ (per page)
- Highlights missing required fields per Google's spec

### GEO Coverage Panel
- Map-like grid: 12 service areas × 14 services
- Green = landing page exists, Red = missing opportunity
- "Create Page" button for each gap (links to Supabase `location_service_content` insert)

### LocalBusiness Schema Editor
- Form-based editor for core fields: name, address, phone, hours, geo, price range, area served
- Saves to `site_config` table
- Preview panel shows rendered JSON-LD
- One-click deploy: revalidates cache

---

## 7. Seasons & Promos (`/admin/seasons`)

### Season Control Card
- Active season badge (auto-detected or manual override)
- Countdown to next auto-switch
- Toggle: "Manual Override" — when ON, shows season selector (Winter/Spring/Summer/Fall)
- Override expiry: shown as "Override expires May 15 when Summer auto-activates"

### Season Date Range Config
| Season | Start | End | Edit |
|--------|-------|-----|------|
| Winter | Nov 15 | Mar 14 | [Edit dates] |
| Spring | Mar 15 | May 14 | [Edit dates] |
| Summer | May 15 | Sep 14 | [Edit dates] |
| Fall   | Sep 15 | Nov 14 | [Edit dates] |

### Promo Banner Control
- Reads from `promo_settings` table
- Toggle promo on/off, edit message, set expiry date
- Preview shows how banner looks on site

---

## 8. Auth & Security

- Existing `/admin/login` + `user_roles` Supabase table kept
- All admin routes protected by middleware checking session
- Automation API routes require `x-admin-token` header (set in Vercel env vars)
- All cron endpoints check `Authorization: Bearer ${CRON_SECRET}`

---

## 9. New Environment Variables Required
```
CRON_SECRET=              # Vercel cron auth token
ANTHROPIC_API_KEY=        # Claude API for AI automations (tiers 2 + 4)
SLACK_WEBHOOK_URL=        # Slack notifications channel
INDEXNOW_API_KEY=         # Bing IndexNow submission
```

---

## 10. Implementation Phases

**Phase 1 — Shell & Layout (foundation)**
- `AdminLayout` with sidebar + top header
- Season pill in header
- All existing pages wrapped in new layout
- `/admin` command center hub with stat tiles + widgets

**Phase 2 — SEO Intelligence Engine**
- `/api/admin/page-meta` extraction endpoint
- `/api/admin/seo-audit` scoring engine
- `/admin/seo` full page UI with table, filters, GEO tab, Schema tab
- Score caching to `page_seo` table

**Phase 3 — Automations Engine**
- `automation_config` + `automation_runs` Supabase tables
- Vercel cron routes for Tier 1 automations (season-switcher, SEO audit, sitemap check, robots guard)
- Supabase Edge Functions for triggers (IndexNow, review schema updater, score drop alert)
- `/admin/automations` control panel UI

**Phase 4 — AI Automations**
- Claude Haiku: meta description generator, FAQ schema builder, internal link suggester
- Claude Sonnet: answer engine optimizer, GBP post generator
- n8n workflow: weekly performance digest → Slack

**Phase 5 — Remaining Sub-pages**
- `/admin/site-health` — technical audit
- `/admin/schema` — JSON-LD editor + GEO coverage matrix
- `/admin/seasons` — full season control + promo management
- `/admin/leads` — upgraded lead tracker

---

## Success Criteria
- Site health score >85/100 across all 76 pages
- Zero critical SEO issues (missing H1, missing schema, duplicate titles)
- All 12 location pages have correct GEO meta tags
- Season switches automatically on Nov 15 (Winter) and May 15 (Summer) without manual action
- All 20 automations running green in the control panel
- Weekly Slack digest arriving every Monday with actionable insights
