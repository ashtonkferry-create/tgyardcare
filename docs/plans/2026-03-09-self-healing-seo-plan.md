# Self-Healing SEO System — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a fully automated self-healing SEO pipeline that crawls the site, detects issues, auto-fixes them, and pings Google to recrawl — zero manual work.

**Architecture:** 3 cron routes in pipeline (crawl → heal → ping), 3 new Supabase tables, middleware enhancement for dynamic redirects. All logged to Supabase for admin dashboard.

**Tech Stack:** Next.js API routes, Supabase (postgres), Anthropic Claude API (content expansion), IndexNow API, Vercel Crons.

**Design doc:** `docs/plans/2026-03-09-self-healing-seo-design.md`

---

### Task 1: Create Supabase Tables

**Files:**
- Create: `supabase/migrations/20260309_seo_heal_tables.sql`

**Step 1: Write the migration SQL**

```sql
-- Self-Healing SEO System tables
-- Design: docs/plans/2026-03-09-self-healing-seo-design.md

-- Queue of detected issues awaiting auto-fix
create table if not exists seo_heal_queue (
  id uuid default gen_random_uuid() primary key,
  url text not null,
  issue_type text not null,
  severity text not null default 'standard',
  details jsonb default '{}',
  status text not null default 'pending',
  fixed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(url, issue_type)
);

-- Permanent audit trail of all auto-fix actions
create table if not exists seo_heal_log (
  id uuid default gen_random_uuid() primary key,
  action text not null,
  url text not null,
  issue_type text,
  before_state jsonb default '{}',
  after_state jsonb default '{}',
  created_at timestamptz default now()
);

-- Dynamic redirects created by the heal system
create table if not exists seo_redirects (
  id uuid default gen_random_uuid() primary key,
  source_path text not null unique,
  destination_path text not null,
  status_code int default 301,
  created_by text default 'seo-heal',
  hit_count int default 0,
  created_at timestamptz default now()
);

-- Indexes for performance
create index if not exists idx_seo_heal_queue_status on seo_heal_queue(status);
create index if not exists idx_seo_heal_queue_url on seo_heal_queue(url);
create index if not exists idx_seo_heal_log_created on seo_heal_log(created_at desc);
create index if not exists idx_seo_redirects_source on seo_redirects(source_path);

-- RLS: service role only (cron routes use service role key)
alter table seo_heal_queue enable row level security;
alter table seo_heal_log enable row level security;
alter table seo_redirects enable row level security;

-- Allow service role full access (no public access)
create policy "Service role full access" on seo_heal_queue for all using (true) with check (true);
create policy "Service role full access" on seo_heal_log for all using (true) with check (true);
create policy "Service role full access" on seo_redirects for all using (true) with check (true);
```

**Step 2: Apply migration via Supabase MCP**

Run the SQL above against the TotalGuard Supabase project (ref: `lwtmvzhwekgdxkaisfra`).

**Step 3: Commit**

```bash
git add supabase/migrations/20260309_seo_heal_tables.sql
git commit -m "feat: add seo_heal_queue, seo_heal_log, seo_redirects tables"
```

---

### Task 2: Build `seo-crawl` Cron Route

**Files:**
- Create: `src/app/api/cron/seo-crawl/route.ts`

**Step 1: Write the crawler**

The cron must:
1. Auth check (`Bearer ${CRON_SECRET}`)
2. Fetch `https://tgyardcare.com/sitemap.xml`, parse all `<loc>` URLs
3. For each URL (with concurrency limit of 5):
   - `fetch()` the page, record response time and status
   - Parse HTML to check: `<title>`, `<meta name="description">`, `og:title`, `og:description`, `<link rel="canonical">`, `<script type="application/ld+json">`
   - For `/blog/*` URLs: count visible text words (strip HTML tags)
   - Extract all internal `<a href>` links, HEAD-check each for 404
4. Upsert issues into `seo_heal_queue` (ON CONFLICT url,issue_type DO UPDATE)
5. Auto-close stale queue items (issue no longer detected → set status='resolved')
6. Log summary to `automation_runs`

**Key patterns to follow:**
- Import: `import { NextRequest, NextResponse } from "next/server";`
- Supabase client: `createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)` inside handler
- Auth: `if (process.env.CRON_SECRET && auth !== \`Bearer ${process.env.CRON_SECRET}\`) return 401`
- Log: `await supabase.from("automation_runs").insert({ automation_slug: "seo-crawl", ... })`

**Concurrency**: Use a simple pool — process URLs 5 at a time to stay within Vercel timeout.

**Timeout concern**: Vercel serverless has 60s limit. With 72 URLs at 5 concurrent, ~15 batches × ~2s each = ~30s. Safe.

**Step 2: Commit**

```bash
git add src/app/api/cron/seo-crawl/route.ts
git commit -m "feat: add seo-crawl cron — self-crawling SEO issue detector"
```

---

### Task 3: Build `seo-heal` Cron Route

**Files:**
- Create: `src/app/api/cron/seo-heal/route.ts`

**Step 1: Write the healer**

The cron must:
1. Auth check
2. Fetch all `pending` items from `seo_heal_queue`
3. For each item, apply fix strategy based on `issue_type`:

**`thin_content` fix:**
```
- Fetch blog post from `blog_posts` table by matching URL slug
- Send content to Claude Haiku: "Expand this blog post to 1200+ words..."
- Parse response, validate word count >= 1000
- Update `blog_posts.content` and `blog_posts.reading_time`
- Log to seo_heal_log with before (old word count) and after (new word count)
```

**`http_error` fix (404 redirect):**
```
- Extract path from URL
- Fetch all sitemap URLs
- Levenshtein distance match against all paths
- If best match score > 0.6 → redirect to that path
- Else → redirect to parent section (/services/*, /blog/*, /commercial/*, /locations/*)
- Insert into seo_redirects table
- Log to seo_heal_log
```

**All other types** (`missing_title`, `missing_schema`, `slow_response`, etc.):
```
- Mark as status='unfixable' with reason in details
- These are code-level issues visible in admin dashboard
```

4. After each fix: ping IndexNow for the fixed URL
5. Update queue item status to `fixed` or `unfixable`
6. Log run summary to `automation_runs`

**Levenshtein helper**: Implement inline (small function, ~15 lines). No npm dependency.

**Claude API call pattern** (from existing blog-generator):
```typescript
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.ANTHROPIC_API_KEY!,
    "anthropic-version": "2023-06-01",
  },
  body: JSON.stringify({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  }),
});
```

**Step 2: Commit**

```bash
git add src/app/api/cron/seo-heal/route.ts
git commit -m "feat: add seo-heal cron — auto-fixes thin content, creates redirects"
```

---

### Task 4: Build `seo-ping` Cron Route

**Files:**
- Create: `src/app/api/cron/seo-ping/route.ts`

**Step 1: Write the batch pinger**

The cron must:
1. Auth check
2. Fetch sitemap, extract all URLs
3. Also fetch recently-fixed URLs from `seo_heal_log` (last 24h)
4. Deduplicate into one list
5. POST to IndexNow API:
```typescript
await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    host: "tgyardcare.com",
    key: process.env.INDEXNOW_KEY || "tgyardcare-indexnow-key",
    keyLocation: `https://tgyardcare.com/${key}.txt`,
    urlList,
  }),
});
```
6. Log to `automation_runs`

**Step 2: Commit**

```bash
git add src/app/api/cron/seo-ping/route.ts
git commit -m "feat: add seo-ping cron — daily IndexNow batch for full site recrawl"
```

---

### Task 5: Enhance Middleware with Dynamic Redirects

**Files:**
- Modify: `src/middleware.ts`

**Step 1: Add dynamic redirect lookup**

After the existing 410 Gone check and www→non-www redirect, before `NextResponse.next()`:

1. Import `createClient` from `@supabase/supabase-js`
2. Add an in-memory redirect cache with 5-minute TTL
3. On cache miss: query `seo_redirects` table for `source_path = pathname`
4. If match: return `NextResponse.redirect(destination, 301)` and increment `hit_count`
5. Update the matcher config to include `'/((?!_next|api|admin).*)' ` to catch all public paths

**Important**: The middleware runs on the edge. Supabase client works fine in edge runtime. Cache is per-instance (resets on cold start, which is fine for a 5-min TTL).

**Step 2: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: add dynamic redirect lookup from seo_redirects table in middleware"
```

---

### Task 6: Update vercel.json with New Cron Schedules

**Files:**
- Modify: `vercel.json`

**Step 1: Add 3 new cron entries**

Add to the existing `crons` array:
```json
{ "path": "/api/cron/seo-crawl", "schedule": "0 */6 * * *" },
{ "path": "/api/cron/seo-heal", "schedule": "30 */6 * * *" },
{ "path": "/api/cron/seo-ping", "schedule": "0 6 * * *" }
```

**Step 2: Commit**

```bash
git add vercel.json
git commit -m "chore: add seo-crawl, seo-heal, seo-ping cron schedules"
```

---

### Task 7: Verify Build and Push

**Step 1: Run build**

```bash
cd tgyardcare && npm run build
```

Expected: Build succeeds with no errors related to the new files.

**Step 2: Push all commits**

```bash
git push
```

**Step 3: Verify Vercel deployment**

Check that the deployment succeeds on Vercel.

---

### Task 8: Apply Supabase Migration

**Step 1: Run migration SQL**

Use the Supabase MCP to execute the migration SQL from Task 1 against project `lwtmvzhwekgdxkaisfra`.

**Step 2: Verify tables exist**

Query: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'seo_%';`

Expected: `seo_heal_queue`, `seo_heal_log`, `seo_redirects`

---

### Task 9: Smoke Test the Pipeline

**Step 1: Trigger seo-crawl manually**

```bash
curl -H "Authorization: Bearer $CRON_SECRET" https://tgyardcare.com/api/cron/seo-crawl
```

Expected: JSON response with `{ success: true, issues_found: N, urls_crawled: 72 }`

**Step 2: Check seo_heal_queue**

Query the table — should have entries for any detected issues.

**Step 3: Trigger seo-heal manually**

```bash
curl -H "Authorization: Bearer $CRON_SECRET" https://tgyardcare.com/api/cron/seo-heal
```

Expected: JSON response with `{ success: true, fixed: N, unfixable: M }`

**Step 4: Trigger seo-ping manually**

```bash
curl -H "Authorization: Bearer $CRON_SECRET" https://tgyardcare.com/api/cron/seo-ping
```

Expected: JSON response with `{ success: true, urls_pinged: 72 }`

---

## Execution Order Summary

| # | Task | Depends On | Commit |
|---|------|-----------|--------|
| 1 | Supabase tables (migration file) | — | Yes |
| 2 | seo-crawl cron | — | Yes |
| 3 | seo-heal cron | — | Yes |
| 4 | seo-ping cron | — | Yes |
| 5 | Middleware dynamic redirects | — | Yes |
| 6 | vercel.json schedules | — | Yes |
| 7 | Build + Push | 1-6 | — |
| 8 | Apply Supabase migration | 7 (deployed) | — |
| 9 | Smoke test pipeline | 7, 8 | — |

Tasks 1-6 are independent and can be parallelized. Task 7 depends on all of them. Tasks 8-9 are post-deploy.
