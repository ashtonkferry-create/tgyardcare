-- Self-Healing SEO v2 — health scores + weekly reports
-- Design: docs/plans/2026-03-10-self-healing-seo-v2-design.md

-- Daily SEO health score snapshots
create table if not exists seo_health_scores (
  id uuid default gen_random_uuid() primary key,
  score_date date not null unique,
  overall_score numeric(5,2) not null,
  total_pages int not null,
  pages_passing int not null,
  issues_by_type jsonb default '{}',
  component_scores jsonb default '{}',
  created_at timestamptz default now()
);

-- Weekly SEO report aggregations
create table if not exists seo_weekly_reports (
  id uuid default gen_random_uuid() primary key,
  week_start date not null unique,
  summary jsonb not null,
  issues_found int default 0,
  issues_fixed int default 0,
  score_start numeric(5,2),
  score_end numeric(5,2),
  top_issues jsonb default '[]',
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_seo_health_scores_date on seo_health_scores(score_date desc);
create index if not exists idx_seo_weekly_reports_week on seo_weekly_reports(week_start desc);

-- RLS: service role only
alter table seo_health_scores enable row level security;
alter table seo_weekly_reports enable row level security;

create policy "Service role full access" on seo_health_scores for all using (true) with check (true);
create policy "Service role full access" on seo_weekly_reports for all using (true) with check (true);
