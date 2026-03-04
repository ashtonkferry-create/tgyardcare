-- Add SEO audit columns to page_seo table
alter table page_seo
  add column if not exists seo_score int default 0,
  add column if not exists audit_issues jsonb default '[]',
  add column if not exists audited_at timestamptz,
  add column if not exists suggested_meta_description text,
  add column if not exists schema_data jsonb,
  add column if not exists needs_refresh boolean default false;

-- Performance indexes
create index if not exists page_seo_score_idx on page_seo(seo_score);
create index if not exists page_seo_audited_idx on page_seo(audited_at);
