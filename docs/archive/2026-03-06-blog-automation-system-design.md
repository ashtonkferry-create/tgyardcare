# TotalGuard Blog Automation System — Design Doc

**Date**: 2026-03-06
**Goal**: Fully automated blog post system with AI generation, SEO optimization, and the Lovable dark-theme article format

---

## 1. Database: `blog_posts` Table

```sql
CREATE TABLE blog_posts (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  slug            text unique not null,
  excerpt         text not null,
  content         text not null,
  category        text not null,
  keywords        text[] default '{}',
  published_at    timestamptz,
  status          text default 'draft' check (status in ('draft','scheduled','published')),
  reading_time    int default 5,
  meta_title      text,
  meta_description text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);
```

## 2. Dynamic `[slug]` Route

- Server component `page.tsx` with `generateMetadata` fetching from Supabase
- Client component `DynamicBlogContent.tsx` matching existing Lovable format
- Hardcoded posts (spring/fall) continue working via their static routes
- ArticleSchema + WebPageSchema structured data on every post

## 3. AI Blog Generator Cron

- Weekly cron (Fridays) using Claude Sonnet
- Topic selection based on season, service gaps, keyword opportunities
- 1200-1500 word articles with Madison-specific content
- Auto-publish with IndexNow ping
- 5 rotating categories: seasonal-tips, service-guides, local-guides, how-to, faq-answers

## 4. Sitemap Integration

- `sitemap.ts` updated to fetch published blog_posts dynamically

## 5. Seed Posts

- Migrate the 2 existing hardcoded posts into the DB
- Generate 8 initial seed posts covering key topics

## 6. vercel.json Cron Entry

- Add `/api/cron/blog-generator` schedule: `0 10 * * 5` (Fridays 10am UTC)
