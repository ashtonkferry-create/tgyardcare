-- GBP Automation Tables
-- Adds columns to reviews + creates gbp_posts + gbp_content_rules

-- 1. Extend reviews table
ALTER TABLE reviews
  ADD COLUMN IF NOT EXISTS google_review_id text UNIQUE,
  ADD COLUMN IF NOT EXISTS auto_responded boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS response_status text DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS response_published_at timestamptz,
  ADD COLUMN IF NOT EXISTS service_slug text,
  ADD COLUMN IF NOT EXISTS review_url text;

COMMENT ON COLUMN reviews.response_status IS 'pending | auto_published | needs_review | manually_published | rejected';

-- 2. GBP Posts table
CREATE TABLE IF NOT EXISTS gbp_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  post_type text NOT NULL,
  service_slug text,
  image_path text,
  cta_url text,
  google_post_id text,
  status text DEFAULT 'draft',
  published_at timestamptz,
  removed_at timestamptz,
  removal_reason text,
  created_at timestamptz DEFAULT now()
);

COMMENT ON COLUMN gbp_posts.post_type IS 'seasonal_tip | service_spotlight | community | offer';
COMMENT ON COLUMN gbp_posts.status IS 'draft | published | removed | rejected';

-- 3. GBP Content Rules table (admin-editable safety rules)
CREATE TABLE IF NOT EXISTS gbp_content_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_type text NOT NULL,
  value text NOT NULL,
  reason text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

COMMENT ON COLUMN gbp_content_rules.rule_type IS 'blocked_word | blocked_pattern | required_keyword | cta_url';

-- Seed baseline safety rules
INSERT INTO gbp_content_rules (rule_type, value, reason) VALUES
  ('blocked_pattern', '\d{3}[-.]?\d{3}[-.]?\d{4}', 'Phone numbers in post body violate Google policy'),
  ('blocked_pattern', 'https?://|www\.|\.com|\.net|\.org', 'URLs in post body — use CTA button instead'),
  ('blocked_pattern', '\S+@\S+\.\S+', 'Email addresses violate Google post policy'),
  ('blocked_word', 'book now', 'Promotional language banned in review replies'),
  ('blocked_word', 'call us at', 'Contact solicitation banned in review replies'),
  ('blocked_word', 'visit our website', 'URL solicitation banned in review replies'),
  ('blocked_word', 'check out our', 'Promotional solicitation banned in review replies'),
  ('blocked_word', 'use code', 'Promo codes banned in review replies'),
  ('blocked_word', 'discount', 'Pricing language risky in review replies'),
  ('required_keyword', 'understand|sorry|appreciate|hear|thank', 'Negative review replies must show empathy');

-- 4. Add new automations to automation_config
INSERT INTO automation_config (slug, name, description, tier, schedule) VALUES
  ('review-responder', 'Review Auto-Responder', 'Fetches new Google reviews and auto-responds (4-5 star) or holds (1-3 star)', 'local', '0 */6 * * *'),
  ('gbp-post-publisher', 'GBP Post Publisher', 'Generates and publishes GBP posts 2x/week (Tue+Fri)', 'content', '0 14 * * 2,5'),
  ('review-faq-miner', 'Review-to-FAQ Miner', 'Extracts FAQ themes from reviews and updates website schema', 'ai', '0 10 * * 0'),
  ('gbp-audit', 'GBP Content Audit', 'Weekly audit of published posts — flags removals, tracks metrics', 'monitoring', '0 8 * * 1')
ON CONFLICT (slug) DO NOTHING;

-- 5. RLS policies
ALTER TABLE gbp_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gbp_content_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin read gbp_posts" ON gbp_posts FOR SELECT
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

CREATE POLICY "Service role full access gbp_posts" ON gbp_posts FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Admin read gbp_content_rules" ON gbp_content_rules FOR SELECT
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admin write gbp_content_rules" ON gbp_content_rules FOR ALL
  USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

CREATE POLICY "Service role full access gbp_content_rules" ON gbp_content_rules FOR ALL
  USING (auth.role() = 'service_role');
