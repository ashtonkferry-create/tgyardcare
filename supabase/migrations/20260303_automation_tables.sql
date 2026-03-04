-- Automation config: one row per automation
create table if not exists automation_config (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  tier text not null check (tier in ('foundation','content','local','ai','monitoring')),
  is_active boolean default true,
  schedule text,
  last_run_at timestamptz,
  next_run_at timestamptz,
  created_at timestamptz default now()
);

-- Automation run history
create table if not exists automation_runs (
  id uuid primary key default gen_random_uuid(),
  automation_slug text not null references automation_config(slug) on delete cascade,
  started_at timestamptz default now(),
  completed_at timestamptz,
  status text not null check (status in ('success','warning','error','skipped')),
  result_summary text,
  error_message text,
  pages_affected int not null default 0
);

create index if not exists automation_runs_slug_idx on automation_runs(automation_slug);
create index if not exists automation_runs_started_idx on automation_runs(started_at desc);
create index if not exists automation_runs_status_idx on automation_runs(status);

-- Seed all 20 automations
insert into automation_config (slug, name, description, tier, schedule) values
('auto-season-switcher','Auto Season Switcher','Switches site season based on calendar dates','foundation','0 6 * * *'),
('full-seo-audit','Full SEO Audit','Crawls all 76 pages and scores each on 8 factors','foundation','0 12 * * 1'),
('sitemap-integrity-check','Sitemap Integrity Check','Verifies all sitemap URLs return 200','foundation','0 14 * * 1'),
('indexnow-submitter','IndexNow Submitter','POSTs updated URLs to Bing IndexNow API','foundation','trigger'),
('schema-validator','Schema Validator','Validates JSON-LD on all pages','foundation','0 15 * * 1'),
('meta-description-generator','Meta Description Generator','Generates meta descriptions using Claude Haiku','content','0 10 * * 2'),
('faq-schema-builder','FAQ Schema Builder','Generates FAQ JSON-LD for service pages','content','0 11 * * 2'),
('content-freshness-monitor','Content Freshness Monitor','Flags pages not updated in 90+ days','content','0 8 1 * *'),
('internal-link-suggester','Internal Link Suggester','Suggests internal links for new blog posts','content','trigger'),
('gbp-post-generator','GBP Post Generator','Generates Google Business Profile post copy','content','0 14 * * 1'),
('nap-consistency-checker','NAP Consistency Checker','Verifies name/address/phone across all pages','local','0 9 * * 2'),
('local-coverage-gap-finder','Local Coverage Gap Finder','Finds missing city+service landing page combos','local','0 8 1 * *'),
('review-schema-updater','Review Schema Updater','Updates LocalBusiness review count and rating','local','trigger'),
('geo-signal-auditor','GEO Signal Auditor','Checks geo meta tags on all location pages','local','0 10 * * 2'),
('answer-engine-optimizer','Answer Engine Optimizer','Rewrites service pages for AI engine citations','ai','0 9 1 * *'),
('voice-search-expander','Voice Search Expander','Generates near-me FAQ schema for voice queries','ai','0 11 * * 2'),
('seo-score-drop-alert','SEO Score Drop Alert','Alerts on Slack when page score drops 10+ pts','monitoring','trigger'),
('lead-response-timer','Lead Response Timer','Slack reminder for unresponded leads after 2hrs','monitoring','*/30 * * * *'),
('weekly-performance-digest','Weekly Performance Digest','Monday Slack summary: leads, SEO, automation status','monitoring','0 13 * * 1'),
('robots-guard','Robots.txt Guard','Verifies robots.txt blocks /admin and has sitemap URL','monitoring','0 6 * * *')
on conflict (slug) do nothing;

-- RLS: admin only
alter table automation_config enable row level security;
alter table automation_runs enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename='automation_config' and policyname='Admin read automation_config') then
    create policy "Admin read automation_config" on automation_config
      for select using (exists (select 1 from user_roles where user_id = auth.uid() and role = 'admin'));
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_policies where tablename='automation_config' and policyname='Admin write automation_config') then
    create policy "Admin write automation_config" on automation_config
      for all
      using (exists (select 1 from user_roles where user_id = auth.uid() and role = 'admin'))
      with check (exists (select 1 from user_roles where user_id = auth.uid() and role = 'admin'));
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_policies where tablename='automation_runs' and policyname='Admin read automation_runs') then
    create policy "Admin read automation_runs" on automation_runs
      for select using (exists (select 1 from user_roles where user_id = auth.uid() and role = 'admin'));
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_policies where tablename='automation_config' and policyname='Service role full access automation_config') then
    create policy "Service role full access automation_config" on automation_config
      for all
      using ((select auth.jwt() ->> 'role') = 'service_role')
      with check ((select auth.jwt() ->> 'role') = 'service_role');
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_policies where tablename='automation_runs' and policyname='Service role full access automation_runs') then
    create policy "Service role full access automation_runs" on automation_runs
      for all
      using ((select auth.jwt() ->> 'role') = 'service_role')
      with check ((select auth.jwt() ->> 'role') = 'service_role');
  end if;
end $$;
