-- Schema Automation Columns Migration
-- Apply in Supabase Dashboard for project: lwtmvzhwekgdxkaisfra
-- Date: 2026-03-04

-- Add howto_schema column to page_seo (populated by schema-generator cron)
ALTER TABLE page_seo ADD COLUMN IF NOT EXISTS howto_schema jsonb;

-- Add schema-generator to automation_config
INSERT INTO automation_config (slug, name, description, tier, is_active, schedule)
VALUES (
  'schema-generator',
  'Schema Generator',
  'AI-generates HowTo JSON-LD schemas for all service pages using Claude Haiku, stored in page_seo.howto_schema',
  'ai',
  true,
  '0 8 * * 5'
)
ON CONFLICT (slug) DO NOTHING;
