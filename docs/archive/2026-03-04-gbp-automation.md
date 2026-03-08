# GBP Full Automation System — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fully automated Google Business Profile management — auto review responding, 2x/week post publishing, review-to-FAQ pipeline — with 5-layer content safety to prevent takedowns.

**Architecture:** GBP API v4 client with OAuth2 service account auth. Content validator enforces Google's post/review policies via regex + blocked words + empathy checks. Claude Haiku generates all content with brand-voice prompts. Tiered auto-publish: 4-5 star auto, 1-3 star held for manual review. Review themes feed back into website FAQ schema.

**Tech Stack:** Next.js 16 API routes, @anthropic-ai/sdk, @supabase/supabase-js, Google Business Profile API v4 (googleapis), TypeScript strict

---

## Task 1: Supabase Migration — GBP Tables

**Files:**
- Create: `supabase/migrations/20260304_gbp_automation.sql`

**Context:** The `reviews` table already exists (from `20260304_seo_automation_tables.sql`) with columns: id, reviewer_name, rating, review_text, source, response_draft, responded_at, created_at. We need to add columns and create new tables.

**Step 1: Write the migration**

```sql
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
```

**Step 2: Apply migration**

This migration must be applied manually in Supabase Dashboard SQL Editor for project `lwtmvzhwekgdxkaisfra`. Copy the full SQL and run it.

**Step 3: Commit**

```bash
git add supabase/migrations/20260304_gbp_automation.sql
git commit -m "feat(db): add GBP automation tables — gbp_posts, gbp_content_rules, reviews extensions"
```

---

## Task 2: TypeScript Types — `src/lib/gbp/types.ts`

**Files:**
- Create: `src/lib/gbp/types.ts`

**Step 1: Write the types**

```typescript
// GBP automation type definitions

/** Google Business Profile review from API */
export interface GBPReview {
  name: string; // API resource name: accounts/xxx/locations/yyy/reviews/zzz
  reviewId: string;
  reviewer: {
    displayName: string;
    profilePhotoUrl?: string;
  };
  starRating: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE';
  comment?: string;
  createTime: string; // ISO timestamp
  updateTime: string;
  reviewReply?: {
    comment: string;
    updateTime: string;
  };
}

/** Star rating string to number */
export const STAR_MAP: Record<string, number> = {
  ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5,
};

/** Review stored in Supabase */
export interface ReviewRow {
  id: string;
  reviewer_name: string;
  rating: number;
  review_text: string;
  source: string;
  response_draft: string | null;
  responded_at: string | null;
  google_review_id: string | null;
  auto_responded: boolean;
  response_status: 'pending' | 'auto_published' | 'needs_review' | 'manually_published' | 'rejected';
  response_published_at: string | null;
  service_slug: string | null;
  review_url: string | null;
  created_at: string;
}

/** GBP post stored in Supabase */
export interface GBPPostRow {
  id: string;
  content: string;
  post_type: 'seasonal_tip' | 'service_spotlight' | 'community' | 'offer';
  service_slug: string | null;
  image_path: string | null;
  cta_url: string | null;
  google_post_id: string | null;
  status: 'draft' | 'published' | 'removed' | 'rejected';
  published_at: string | null;
  removed_at: string | null;
  removal_reason: string | null;
  created_at: string;
}

/** Content rule from Supabase */
export interface ContentRule {
  id: string;
  rule_type: 'blocked_word' | 'blocked_pattern' | 'required_keyword' | 'cta_url';
  value: string;
  reason: string | null;
  active: boolean;
}

/** Validation result */
export interface ValidationResult {
  valid: boolean;
  violations: string[];
}

/** Post type rotation */
export const POST_TYPES = ['seasonal_tip', 'service_spotlight', 'community', 'offer'] as const;

/** Service slug to image mapping */
export const SERVICE_IMAGES: Record<string, string[]> = {
  mowing: ['/gallery/mulching-combined.png'],
  mulching: ['/gallery/mulching-combined.png', '/gallery/mulching-combined-2.png'],
  'garden-beds': ['/gallery/garden-beds-combined.png'],
  weeding: ['/gallery/weeding-combined.png', '/gallery/weeding-cleanup-combined.png'],
  pruning: ['/gallery/pruning-combined.png', '/gallery/pruning-combined-2.png'],
  fertilization: ['/gallery/fertilization-combined.png'],
  herbicide: ['/gallery/herbicide-combined.png'],
  aeration: ['/gallery/fertilization-combined.png'],
  'gutter-cleaning': ['/gallery/gutter-cleaning-combined.png', '/gallery/gutter-cleaning-combined-1.png'],
  'gutter-guards': ['/gallery/gutter-guards-combined.png'],
  'leaf-removal': ['/gallery/leaf-removal-combined.png', '/gallery/leaf-removal-combined-1.png'],
  'spring-cleanup': ['/gallery/weeding-cleanup-combined.png'],
  'fall-cleanup': ['/gallery/leaf-removal-combined.png'],
  'snow-removal': ['/gallery/gutter-cleaning-combined.png'],
};

/** 12 service area cities for community posts */
export const SERVICE_CITIES = [
  'Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Fitchburg',
  'Verona', 'Monona', 'McFarland', 'DeForest', 'Cottage Grove',
  'Oregon', 'Stoughton',
] as const;
```

**Step 2: Commit**

```bash
git add src/lib/gbp/types.ts
git commit -m "feat(gbp): add TypeScript types for GBP automation"
```

---

## Task 3: Content Validator — `src/lib/gbp/validator.ts`

**Files:**
- Create: `src/lib/gbp/validator.ts`

**Context:** This is Layer 3 of the 5-layer safety system. It runs AFTER Claude generates content but BEFORE publishing. It also loads dynamic rules from the `gbp_content_rules` Supabase table so admins can add new blocked patterns without code deploys.

**Step 1: Write the validator**

```typescript
import { createClient } from '@supabase/supabase-js';
import type { ContentRule, ValidationResult } from './types';

// Hardcoded baseline rules (always enforced, even if DB is empty)
const PHONE_REGEX = /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/;
const URL_REGEX = /https?:\/\/|www\.|\.com\/|\.net\/|\.org\//i;
const EMAIL_REGEX = /\S+@\S+\.\S+/;
const ALL_CAPS_REGEX = /\b[A-Z]{4,}\b/; // 4+ letter words in ALL CAPS
const MAX_POST_LENGTH = 1500;
const MAX_REPLY_LENGTH = 500;
const IDEAL_POST_RANGE = { min: 80, max: 400 };
const IDEAL_REPLY_RANGE = { min: 30, max: 200 };

const HARDCODED_BLOCKED_WORDS = [
  'book now', 'call us at', 'visit our website', 'check out our',
  'use code', 'promo code', 'limited time', 'act now', 'don\'t miss',
];

const EMPATHY_WORDS = ['understand', 'sorry', 'appreciate', 'hear', 'thank', 'feedback', 'concern'];

/** Load dynamic rules from Supabase */
async function loadDynamicRules(): Promise<ContentRule[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from('gbp_content_rules')
    .select('*')
    .eq('active', true);

  return (data as ContentRule[]) || [];
}

/** Validate GBP post content */
export async function validatePostContent(text: string): Promise<ValidationResult> {
  const violations: string[] = [];

  // Length checks
  if (text.length > MAX_POST_LENGTH) {
    violations.push(`Post exceeds ${MAX_POST_LENGTH} char limit (${text.length} chars)`);
  }
  if (text.length < IDEAL_POST_RANGE.min) {
    violations.push(`Post too short (${text.length} chars, min ${IDEAL_POST_RANGE.min})`);
  }

  // Hardcoded pattern checks
  if (PHONE_REGEX.test(text)) violations.push('Contains phone number — use CTA button instead');
  if (URL_REGEX.test(text)) violations.push('Contains URL — use CTA button instead');
  if (EMAIL_REGEX.test(text)) violations.push('Contains email address');
  if (ALL_CAPS_REGEX.test(text)) violations.push('Contains ALL CAPS words (looks spammy)');

  // Count emojis
  const emojiCount = (text.match(/[\u{1F300}-\u{1FAFF}]/gu) || []).length;
  if (emojiCount > 3) violations.push(`Too many emojis (${emojiCount}, max 3)`);

  // Hardcoded blocked words
  const lower = text.toLowerCase();
  for (const word of HARDCODED_BLOCKED_WORDS) {
    if (lower.includes(word)) {
      violations.push(`Contains blocked phrase: "${word}"`);
    }
  }

  // Dynamic rules from DB
  const rules = await loadDynamicRules();
  for (const rule of rules) {
    if (rule.rule_type === 'blocked_pattern') {
      const regex = new RegExp(rule.value, 'i');
      if (regex.test(text)) {
        violations.push(rule.reason || `Matched blocked pattern: ${rule.value}`);
      }
    }
    if (rule.rule_type === 'blocked_word' && lower.includes(rule.value.toLowerCase())) {
      violations.push(rule.reason || `Contains blocked word: "${rule.value}"`);
    }
  }

  return { valid: violations.length === 0, violations };
}

/** Validate review reply content */
export async function validateReviewReply(
  text: string,
  starRating: number
): Promise<ValidationResult> {
  const violations: string[] = [];

  // Length checks
  if (text.length > MAX_REPLY_LENGTH) {
    violations.push(`Reply exceeds ${MAX_REPLY_LENGTH} char limit (${text.length} chars)`);
  }
  if (text.length < IDEAL_REPLY_RANGE.min) {
    violations.push(`Reply too short (${text.length} chars, min ${IDEAL_REPLY_RANGE.min})`);
  }

  // Same pattern checks as posts
  if (PHONE_REGEX.test(text)) violations.push('Contains phone number');
  if (URL_REGEX.test(text)) violations.push('Contains URL');
  if (EMAIL_REGEX.test(text)) violations.push('Contains email address');

  // Blocked words
  const lower = text.toLowerCase();
  for (const word of HARDCODED_BLOCKED_WORDS) {
    if (lower.includes(word)) {
      violations.push(`Contains blocked phrase: "${word}"`);
    }
  }

  // Empathy check for negative reviews (1-3 stars)
  if (starRating <= 3) {
    const hasEmpathy = EMPATHY_WORDS.some((w) => lower.includes(w));
    if (!hasEmpathy) {
      violations.push('Negative review reply must contain empathy language (sorry, understand, appreciate, etc.)');
    }
  }

  // Dynamic rules
  const rules = await loadDynamicRules();
  for (const rule of rules) {
    if (rule.rule_type === 'blocked_pattern') {
      const regex = new RegExp(rule.value, 'i');
      if (regex.test(text)) {
        violations.push(rule.reason || `Matched blocked pattern: ${rule.value}`);
      }
    }
    if (rule.rule_type === 'blocked_word' && lower.includes(rule.value.toLowerCase())) {
      violations.push(rule.reason || `Contains blocked word: "${rule.value}"`);
    }
    // Required keywords for negative reviews
    if (rule.rule_type === 'required_keyword' && starRating <= 3) {
      const keywords = rule.value.split('|');
      const hasRequired = keywords.some((kw) => lower.includes(kw.trim()));
      if (!hasRequired) {
        violations.push(rule.reason || `Missing required keyword from: ${rule.value}`);
      }
    }
  }

  return { valid: violations.length === 0, violations };
}
```

**Step 2: Commit**

```bash
git add src/lib/gbp/validator.ts
git commit -m "feat(gbp): add 5-layer content validator with dynamic rules from Supabase"
```

---

## Task 4: Prompt Templates — `src/lib/gbp/prompts.ts`

**Files:**
- Create: `src/lib/gbp/prompts.ts`

**Context:** These are the Claude system prompts and few-shot examples that enforce brand voice and Google compliance. Layer 2 of the safety system.

**Step 1: Write the prompts**

```typescript
import { BUSINESS } from '@/lib/seo/schema-constants';

// ---------------------------------------------------------------------------
// Review Reply Prompt
// ---------------------------------------------------------------------------

export function buildReviewReplyPrompt(review: {
  reviewerName: string;
  rating: number;
  text: string;
  serviceMention?: string;
}): string {
  const ratingContext =
    review.rating >= 4
      ? 'This is a POSITIVE review. Be warm, grateful, and personal.'
      : review.rating === 3
        ? 'This is a NEUTRAL review. Be appreciative but address any concerns mentioned.'
        : 'This is a NEGATIVE review. Be empathetic, take ownership, and offer to make it right.';

  return `You are the voice of ${BUSINESS.name}, a locally owned lawn care company in Madison, WI (since ${BUSINESS.foundingDate}).

TASK: Write a reply to this Google review.

REVIEWER: ${review.reviewerName}
RATING: ${review.rating}/5 stars
REVIEW: "${review.text}"
${review.serviceMention ? `SERVICE MENTIONED: ${review.serviceMention}` : ''}

${ratingContext}

BRAND VOICE RULES:
- Use the reviewer's first name naturally
- Reference their specific service or experience if mentioned
- Keep it 2-4 sentences (50-150 words)
- Sign off as "— The TotalGuard Team"
- Sound like a real human, not corporate boilerplate

STRICT GOOGLE POLICY — YOU MUST NOT:
- Include any phone number, email, or URL
- Include promotional language ("book now", "check out our", "visit our website")
- Ask them to edit or remove their review
- Share any private details about their service/account
- Mention pricing, discounts, or promo codes
- Mention competitor businesses

FOR NEGATIVE REVIEWS (1-3 stars), YOU MUST:
- Express genuine empathy ("We're sorry to hear...", "We understand your frustration...")
- Take ownership without making excuses
- Invite them to reach out so you can make it right (but do NOT include contact info — they already have it from the listing)

EXAMPLES OF GREAT REPLIES:

5-star example:
"Sarah, thank you so much for the kind words! We're glad the spring cleanup exceeded expectations — your yard really did transform beautifully. It's customers like you that make early mornings worth it. We look forward to keeping things pristine all season! — The TotalGuard Team"

1-star example:
"Mike, we're truly sorry your experience didn't meet our standards. That's not the level of service we hold ourselves to, and we appreciate you sharing this feedback. We'd love the opportunity to make this right — please reach out to us directly so we can address this personally. — The TotalGuard Team"

Reply ONLY with the response text. No quotes, no labels, no explanation.`;
}

// ---------------------------------------------------------------------------
// GBP Post Prompt
// ---------------------------------------------------------------------------

const SEASON_CONTEXT: Record<string, string> = {
  winter: 'Winter in Madison means snow, ice, and frozen walkways. Focus on snow removal, ice prevention, gutter protection, and winter property prep.',
  spring: 'Spring in Madison means thawing ground, new growth, and cleanup season. Focus on spring cleanup, dethatching, first mows, mulching, garden bed prep.',
  summer: 'Summer in Madison means peak growing season. Focus on weekly mowing, fertilization, weed control, garden maintenance, gutter cleaning.',
  fall: 'Fall in Madison means leaves, cooling temps, and winterization. Focus on leaf removal, fall cleanup, gutter cleaning, aeration, final mows.',
};

export function buildPostPrompt(opts: {
  postType: string;
  season: string;
  serviceSlug?: string;
  serviceName?: string;
  cityName?: string;
}): string {
  const seasonInfo = SEASON_CONTEXT[opts.season] || SEASON_CONTEXT.summer;

  const typeInstructions: Record<string, string> = {
    seasonal_tip: `Write a helpful seasonal lawn care tip for Madison homeowners. Share practical advice they can use. Position ${BUSINESS.name} as the knowledgeable local expert without being salesy.`,
    service_spotlight: `Highlight the "${opts.serviceName || 'lawn care'}" service. Explain what's included, why it matters this season, and what homeowners should know. Be informative, not pushy.`,
    community: `Write a community-focused post about serving ${opts.cityName || 'Madison'}, WI. Show local pride, mention something specific about the area, and express gratitude for the community's trust.`,
    offer: `Write a seasonal offer post for ${opts.season} services. Mention the value of bundling services this season. Do NOT include specific prices, dollar amounts, promo codes, or "limited time" urgency language.`,
  };

  return `You are writing a Google Business Profile post for ${BUSINESS.name}, a locally owned lawn care company in Madison, WI.

POST TYPE: ${opts.postType}
SEASON: ${opts.season}
${seasonInfo}

${typeInstructions[opts.postType] || typeInstructions.seasonal_tip}

WRITING RULES:
- 100-250 words (sweet spot for GBP engagement)
- Write in a warm, professional, knowledgeable tone
- Use short paragraphs (2-3 sentences each)
- Include one clear call-to-action at the end (e.g., "Ready to get started? Request your free quote today.")
- The CTA should NOT include a URL, phone number, or email — those go in the post's CTA button

STRICT GOOGLE POLICY — YOU MUST NOT INCLUDE:
- Phone numbers (e.g., 608-535-6057)
- Email addresses
- URLs or website links (not even tgyardcare.com)
- Specific dollar amounts or pricing ("$40/cut", "starting at $99")
- Promo codes or coupon codes
- "Limited time" or "Act now" urgency language
- ALL CAPS words or sentences
- More than 2 emojis total
- Competitor business names
- Medical, legal, or guarantee claims

GOOD POST EXAMPLE:
"Spring is finally here in Madison, and your lawn is ready to wake up! After a long Wisconsin winter, the first step to a beautiful yard is a thorough spring cleanup — removing debris, dethatching, and prepping garden beds for the growing season.

Our crew handles the heavy lifting so you can enjoy the results. We clear out winter damage, edge along walkways, and get your property looking sharp from day one.

If your yard could use some post-winter TLC, we'd love to help. Request your free quote and let's get your lawn season started right."

Write ONLY the post text. No title, no hashtags, no labels.`;
}

// ---------------------------------------------------------------------------
// FAQ Miner Prompt
// ---------------------------------------------------------------------------

export function buildFAQMinerPrompt(reviews: Array<{ text: string; rating: number }>): string {
  const reviewTexts = reviews
    .map((r, i) => `Review ${i + 1} (${r.rating}★): "${r.text}"`)
    .join('\n');

  return `You are analyzing customer reviews for ${BUSINESS.name}, a lawn care company in Madison, WI.

Below are ${reviews.length} recent customer reviews. Your job is to extract the TOP 5 questions or concerns that real customers have, then write FAQ pairs that address them.

REVIEWS:
${reviewTexts}

INSTRUCTIONS:
- Identify recurring themes, questions, or concerns across reviews
- Write 5 FAQ pairs in this exact JSON format
- Questions should be phrased as a customer would naturally ask
- Answers should be helpful, specific, and reflect TotalGuard's actual services
- Keep answers 2-3 sentences each
- Do NOT include pricing, phone numbers, or URLs in answers

OUTPUT FORMAT (valid JSON array, nothing else):
[
  { "question": "How quickly can TotalGuard start service?", "answer": "Most new customers are scheduled within 3-5 business days. During peak season, we recommend booking 1-2 weeks ahead to secure your preferred day." },
  ...4 more
]

Return ONLY the JSON array. No markdown, no explanation.`;
}
```

**Step 2: Commit**

```bash
git add src/lib/gbp/prompts.ts
git commit -m "feat(gbp): add Claude prompt templates with brand voice + Google-safe rules"
```

---

## Task 5: GBP API Client — `src/lib/gbp/client.ts`

**Files:**
- Create: `src/lib/gbp/client.ts`

**Context:** This is the shared module that all crons use to interact with Google Business Profile API v4. Uses OAuth2 with a service account. The `GOOGLE_SERVICE_ACCOUNT_JSON` env var holds the base64-encoded service account key JSON. `GBP_LOCATION_NAME` holds the full resource name (e.g., `accounts/123/locations/456`).

**Step 1: Write the client**

```typescript
import type { GBPReview } from './types';

// ---------------------------------------------------------------------------
// Auth — Google Service Account OAuth2
// ---------------------------------------------------------------------------

interface TokenCache {
  token: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

async function getAccessToken(): Promise<string> {
  // Return cached token if still valid (with 60s buffer)
  if (tokenCache && Date.now() < tokenCache.expiresAt - 60_000) {
    return tokenCache.token;
  }

  const saJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!saJson) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON env var not set');

  const sa = JSON.parse(Buffer.from(saJson, 'base64').toString('utf-8'));

  // Build JWT for token exchange
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(
    JSON.stringify({
      iss: sa.client_email,
      scope: 'https://www.googleapis.com/auth/business.manage',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    })
  ).toString('base64url');

  // Sign with RS256 using Node crypto
  const crypto = await import('crypto');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(`${header}.${payload}`);
  const signature = sign.sign(sa.private_key, 'base64url');

  const jwt = `${header}.${payload}.${signature}`;

  // Exchange JWT for access token
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Google token exchange failed: ${res.status} ${err}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return tokenCache.token;
}

// ---------------------------------------------------------------------------
// API Helpers
// ---------------------------------------------------------------------------

const API_BASE = 'https://mybusiness.googleapis.com/v4';

async function gbpFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = await getAccessToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`GBP API error: ${res.status} ${path} — ${errBody}`);
  }

  return res;
}

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

/** Fetch reviews, optionally only those updated since a given date */
export async function listReviews(locationName: string, since?: Date): Promise<GBPReview[]> {
  const allReviews: GBPReview[] = [];
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({ pageSize: '50' });
    if (pageToken) params.set('pageToken', pageToken);

    const res = await gbpFetch(`/${locationName}/reviews?${params}`);
    const data = (await res.json()) as {
      reviews?: GBPReview[];
      nextPageToken?: string;
      totalReviewCount?: number;
    };

    if (data.reviews) {
      if (since) {
        const sinceMs = since.getTime();
        const filtered = data.reviews.filter(
          (r) => new Date(r.updateTime).getTime() > sinceMs
        );
        allReviews.push(...filtered);
        // If we hit reviews older than `since`, stop paginating
        if (filtered.length < (data.reviews?.length || 0)) break;
      } else {
        allReviews.push(...data.reviews);
      }
    }

    pageToken = data.nextPageToken;
  } while (pageToken);

  return allReviews;
}

/** Reply to a review */
export async function replyToReview(
  reviewName: string,
  comment: string
): Promise<void> {
  await gbpFetch(`/${reviewName}/reply`, {
    method: 'PUT',
    body: JSON.stringify({ comment }),
  });
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

interface CreatePostOptions {
  locationName: string;
  summary: string;
  callToAction?: {
    actionType: 'LEARN_MORE' | 'BOOK' | 'ORDER' | 'SHOP' | 'SIGN_UP' | 'CALL';
    url?: string;
  };
  mediaItems?: Array<{
    mediaFormat: 'PHOTO';
    sourceUrl: string;
  }>;
}

/** Create a local post */
export async function createPost(opts: CreatePostOptions): Promise<{ name: string }> {
  const body: Record<string, unknown> = {
    languageCode: 'en',
    summary: opts.summary,
    topicType: 'STANDARD',
  };

  if (opts.callToAction) {
    body.callToAction = opts.callToAction;
  }

  if (opts.mediaItems && opts.mediaItems.length > 0) {
    body.media = opts.mediaItems;
  }

  const res = await gbpFetch(`/${opts.locationName}/localPosts`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return (await res.json()) as { name: string };
}

/** List recent posts */
export async function listPosts(
  locationName: string,
  pageSize = 20
): Promise<Array<{ name: string; summary: string; state: string; createTime: string }>> {
  const res = await gbpFetch(
    `/${locationName}/localPosts?pageSize=${pageSize}`
  );
  const data = (await res.json()) as { localPosts?: Array<Record<string, unknown>> };
  return (data.localPosts || []) as Array<{
    name: string;
    summary: string;
    state: string;
    createTime: string;
  }>;
}

/** Delete a post (for cleanup) */
export async function deletePost(postName: string): Promise<void> {
  await gbpFetch(`/${postName}`, { method: 'DELETE' });
}
```

**Step 2: Commit**

```bash
git add src/lib/gbp/client.ts
git commit -m "feat(gbp): add GBP API v4 client with OAuth2 service account auth"
```

---

## Task 6: Review Responder Cron — `src/app/api/cron/review-responder/route.ts`

**Files:**
- Create: `src/app/api/cron/review-responder/route.ts`

**Context:** Runs every 6 hours. Fetches new Google reviews, drafts responses via Claude, auto-publishes for 4-5 stars, holds for manual review on 1-3 stars. Follows the existing cron pattern: check CRON_SECRET, do work, log to automation_runs.

**Step 1: Write the cron**

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import { listReviews, replyToReview } from '@/lib/gbp/client';
import { validateReviewReply } from '@/lib/gbp/validator';
import { buildReviewReplyPrompt } from '@/lib/gbp/prompts';
import { STAR_MAP } from '@/lib/gbp/types';

export const maxDuration = 120;

export async function GET(req: Request) {
  // Auth check
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const locationName = process.env.GBP_LOCATION_NAME;
  if (!locationName) {
    return NextResponse.json({ error: 'GBP_LOCATION_NAME not set' }, { status: 500 });
  }

  const startedAt = new Date().toISOString();
  let autoPublished = 0;
  let held = 0;
  let errors = 0;
  let totalNew = 0;

  try {
    // Get last check time from automation_config
    const { data: config } = await supabase
      .from('automation_config')
      .select('last_run_at')
      .eq('slug', 'review-responder')
      .single();

    const since = config?.last_run_at ? new Date(config.last_run_at) : undefined;

    // Fetch new reviews from GBP API
    const reviews = await listReviews(locationName, since);
    totalNew = reviews.length;

    if (reviews.length === 0) {
      // Log skip
      await supabase.from('automation_runs').insert({
        automation_slug: 'review-responder',
        started_at: startedAt,
        completed_at: new Date().toISOString(),
        status: 'skipped',
        result_summary: 'No new reviews found',
        pages_affected: 0,
      });
      await supabase
        .from('automation_config')
        .update({ last_run_at: new Date().toISOString() })
        .eq('slug', 'review-responder');

      return NextResponse.json({ message: 'No new reviews', count: 0 });
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    for (const review of reviews) {
      try {
        const rating = STAR_MAP[review.starRating] || 5;
        const reviewerName = review.reviewer?.displayName || 'Valued Customer';
        const reviewText = review.comment || '';

        // Skip if already responded (has a reply)
        if (review.reviewReply) continue;

        // Upsert review into DB
        await supabase.from('reviews').upsert(
          {
            google_review_id: review.reviewId,
            reviewer_name: reviewerName,
            rating,
            review_text: reviewText,
            source: 'google',
            created_at: review.createTime,
          },
          { onConflict: 'google_review_id' }
        );

        // Generate reply via Claude
        const prompt = buildReviewReplyPrompt({
          reviewerName,
          rating,
          text: reviewText,
        });

        const aiRes = await anthropic.messages.create({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 300,
          messages: [{ role: 'user', content: prompt }],
        });

        const replyText =
          aiRes.content.find((b) => b.type === 'text')?.text?.trim() || '';

        if (!replyText) {
          errors++;
          continue;
        }

        // Validate reply (Layer 3)
        const validation = await validateReviewReply(replyText, rating);

        if (rating >= 4 && validation.valid) {
          // Auto-publish for 4-5 star reviews
          await replyToReview(review.name, replyText);
          await supabase
            .from('reviews')
            .update({
              response_draft: replyText,
              auto_responded: true,
              response_status: 'auto_published',
              response_published_at: new Date().toISOString(),
              responded_at: new Date().toISOString(),
            })
            .eq('google_review_id', review.reviewId);
          autoPublished++;
        } else if (rating === 3 && validation.valid) {
          // Auto-publish 3-star but send Slack alert
          await replyToReview(review.name, replyText);
          await supabase
            .from('reviews')
            .update({
              response_draft: replyText,
              auto_responded: true,
              response_status: 'auto_published',
              response_published_at: new Date().toISOString(),
              responded_at: new Date().toISOString(),
            })
            .eq('google_review_id', review.reviewId);
          autoPublished++;

          // Slack notification for 3-star
          await sendSlackAlert(
            `3-star review from ${reviewerName} auto-responded. Review: "${reviewText.slice(0, 100)}..." Reply: "${replyText.slice(0, 100)}..."`
          );
        } else {
          // Hold for manual review (1-2 stars or validation failed)
          await supabase
            .from('reviews')
            .update({
              response_draft: replyText,
              auto_responded: false,
              response_status: 'needs_review',
            })
            .eq('google_review_id', review.reviewId);
          held++;

          const reason =
            rating <= 2
              ? `${rating}-star review needs manual review`
              : `Validation failed: ${validation.violations.join(', ')}`;

          await sendSlackAlert(
            `Review held for manual review (${reason}). From: ${reviewerName} (${rating}★). Review: "${reviewText.slice(0, 150)}..." Draft reply: "${replyText.slice(0, 150)}..."`
          );
        }
      } catch (err) {
        console.error('Error processing review:', err);
        errors++;
      }
    }

    // Log success
    const summary = `Processed ${totalNew} reviews: ${autoPublished} auto-published, ${held} held, ${errors} errors`;
    await supabase.from('automation_runs').insert({
      automation_slug: 'review-responder',
      started_at: startedAt,
      completed_at: new Date().toISOString(),
      status: errors > 0 ? 'warning' : 'success',
      result_summary: summary,
      pages_affected: autoPublished + held,
    });

    await supabase
      .from('automation_config')
      .update({ last_run_at: new Date().toISOString() })
      .eq('slug', 'review-responder');

    return NextResponse.json({ message: summary, autoPublished, held, errors });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('review-responder error:', msg);

    await supabase.from('automation_runs').insert({
      automation_slug: 'review-responder',
      started_at: startedAt,
      completed_at: new Date().toISOString(),
      status: 'error',
      error_message: msg,
      pages_affected: 0,
    });

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

async function sendSlackAlert(text: string) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: `[GBP Review Alert] ${text}` }),
    });
  } catch {
    console.error('Slack alert failed');
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/cron/review-responder/route.ts
git commit -m "feat(gbp): add review-responder cron — auto-reply 4-5★, hold 1-3★"
```

---

## Task 7: GBP Post Publisher Cron — `src/app/api/cron/gbp-post-publisher/route.ts`

**Files:**
- Create: `src/app/api/cron/gbp-post-publisher/route.ts`
- Modify: `src/app/api/cron/gbp-post/route.ts` (keep as legacy, won't break)

**Context:** Fires Tue + Fri 14:00 UTC. Generates a Google-safe post via Claude, selects a real photo from the gallery, validates content, publishes via GBP API. Rotates through 4 post types.

**Step 1: Write the cron**

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import { createPost } from '@/lib/gbp/client';
import { validatePostContent } from '@/lib/gbp/validator';
import { buildPostPrompt } from '@/lib/gbp/prompts';
import {
  POST_TYPES,
  SERVICE_IMAGES,
  SERVICE_CITIES,
} from '@/lib/gbp/types';

export const maxDuration = 120;

/** Determine current season from date */
function getSeason(date: Date): string {
  const mmdd = (date.getMonth() + 1) * 100 + date.getDate();
  if (mmdd >= 1115 || mmdd <= 314) return 'winter';
  if (mmdd >= 915) return 'fall';
  if (mmdd >= 315 && mmdd <= 531) return 'spring';
  return 'summer';
}

/** Service names for spotlight posts */
const SERVICE_NAMES: Record<string, string> = {
  mowing: 'Lawn Mowing',
  mulching: 'Mulching',
  'garden-beds': 'Garden Bed Maintenance',
  weeding: 'Weeding',
  pruning: 'Pruning & Trimming',
  fertilization: 'Fertilization',
  herbicide: 'Weed Control',
  aeration: 'Core Aeration',
  'gutter-cleaning': 'Gutter Cleaning',
  'gutter-guards': 'Gutter Guard Installation',
  'leaf-removal': 'Leaf Removal',
  'spring-cleanup': 'Spring Cleanup',
  'fall-cleanup': 'Fall Cleanup',
  'snow-removal': 'Snow Removal',
};

/** Seasonal service relevance */
const SEASONAL_SERVICES: Record<string, string[]> = {
  winter: ['snow-removal', 'gutter-guards', 'gutter-cleaning'],
  spring: ['spring-cleanup', 'mulching', 'garden-beds', 'aeration', 'fertilization'],
  summer: ['mowing', 'weeding', 'pruning', 'herbicide', 'fertilization', 'gutter-cleaning'],
  fall: ['fall-cleanup', 'leaf-removal', 'gutter-cleaning', 'aeration'],
};

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const locationName = process.env.GBP_LOCATION_NAME;
  if (!locationName) {
    return NextResponse.json({ error: 'GBP_LOCATION_NAME not set' }, { status: 500 });
  }

  const startedAt = new Date().toISOString();
  const now = new Date();
  const season = getSeason(now);

  try {
    // Determine post type — rotate based on count of existing posts
    const { count } = await supabase
      .from('gbp_posts')
      .select('*', { count: 'exact', head: true });

    const postTypeIndex = (count || 0) % POST_TYPES.length;
    const postType = POST_TYPES[postTypeIndex];

    // Pick service and city based on post type
    const seasonalServices = SEASONAL_SERVICES[season] || SEASONAL_SERVICES.summer;
    const serviceSlug = seasonalServices[Math.floor(Math.random() * seasonalServices.length)];
    const serviceName = SERVICE_NAMES[serviceSlug] || 'Lawn Care';
    const cityName = SERVICE_CITIES[Math.floor(Math.random() * SERVICE_CITIES.length)];

    // Generate post via Claude
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const prompt = buildPostPrompt({
      postType,
      season,
      serviceSlug,
      serviceName,
      cityName,
    });

    const aiRes = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }],
    });

    const postText =
      aiRes.content.find((b) => b.type === 'text')?.text?.trim() || '';

    if (!postText) {
      throw new Error('Claude returned empty post text');
    }

    // Validate content (Layer 3)
    const validation = await validatePostContent(postText);

    // Select image
    const images = SERVICE_IMAGES[serviceSlug] || SERVICE_IMAGES.mowing;
    const imagePath = images[Math.floor(Math.random() * images.length)];
    const imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${imagePath}`;

    // CTA URL — link to relevant service page
    const ctaUrl =
      postType === 'community'
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/locations/${cityName.toLowerCase().replace(/\s+/g, '-')}`
        : `${process.env.NEXT_PUBLIC_SITE_URL}/services/${serviceSlug}`;

    if (validation.valid) {
      // Publish via GBP API
      const result = await createPost({
        locationName,
        summary: postText,
        callToAction: { actionType: 'LEARN_MORE', url: ctaUrl },
        mediaItems: [{ mediaFormat: 'PHOTO', sourceUrl: imageUrl }],
      });

      // Store in DB
      await supabase.from('gbp_posts').insert({
        content: postText,
        post_type: postType,
        service_slug: serviceSlug,
        image_path: imagePath,
        cta_url: ctaUrl,
        google_post_id: result.name,
        status: 'published',
        published_at: new Date().toISOString(),
      });

      // Log success
      await supabase.from('automation_runs').insert({
        automation_slug: 'gbp-post-publisher',
        started_at: startedAt,
        completed_at: new Date().toISOString(),
        status: 'success',
        result_summary: `Published ${postType} post: "${postText.slice(0, 80)}..."`,
        pages_affected: 1,
      });

      await supabase
        .from('automation_config')
        .update({ last_run_at: new Date().toISOString() })
        .eq('slug', 'gbp-post-publisher');

      return NextResponse.json({
        message: 'Post published',
        postType,
        service: serviceSlug,
        googlePostId: result.name,
      });
    } else {
      // Validation failed — hold as draft
      await supabase.from('gbp_posts').insert({
        content: postText,
        post_type: postType,
        service_slug: serviceSlug,
        image_path: imagePath,
        cta_url: ctaUrl,
        status: 'draft',
      });

      await supabase.from('automation_runs').insert({
        automation_slug: 'gbp-post-publisher',
        started_at: startedAt,
        completed_at: new Date().toISOString(),
        status: 'warning',
        result_summary: `Post held — validation failed: ${validation.violations.join(', ')}`,
        pages_affected: 0,
      });

      // Slack alert
      const webhookUrl = process.env.SLACK_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `[GBP Post Alert] Post held for review. Violations: ${validation.violations.join(', ')}. Content: "${postText.slice(0, 200)}..."`,
          }),
        }).catch(() => {});
      }

      return NextResponse.json({
        message: 'Post held for review',
        violations: validation.violations,
      });
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('gbp-post-publisher error:', msg);

    await supabase.from('automation_runs').insert({
      automation_slug: 'gbp-post-publisher',
      started_at: startedAt,
      completed_at: new Date().toISOString(),
      status: 'error',
      error_message: msg,
      pages_affected: 0,
    });

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/cron/gbp-post-publisher/route.ts
git commit -m "feat(gbp): add post publisher cron — 2x/week with content validation"
```

---

## Task 8: Review-to-FAQ Miner Cron — `src/app/api/cron/review-faq-miner/route.ts`

**Files:**
- Create: `src/app/api/cron/review-faq-miner/route.ts`

**Step 1: Write the cron**

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import { buildFAQMinerPrompt } from '@/lib/gbp/prompts';

export const maxDuration = 120;

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const startedAt = new Date().toISOString();

  try {
    // Fetch reviews from past 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { data: reviews } = await supabase
      .from('reviews')
      .select('review_text, rating')
      .gte('created_at', thirtyDaysAgo)
      .not('review_text', 'is', null)
      .order('created_at', { ascending: false })
      .limit(50);

    if (!reviews || reviews.length < 3) {
      await supabase.from('automation_runs').insert({
        automation_slug: 'review-faq-miner',
        started_at: startedAt,
        completed_at: new Date().toISOString(),
        status: 'skipped',
        result_summary: `Only ${reviews?.length || 0} reviews in past 30 days (need 3+)`,
        pages_affected: 0,
      });
      return NextResponse.json({ message: 'Not enough reviews to mine', count: reviews?.length || 0 });
    }

    // Build prompt and generate FAQs
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const prompt = buildFAQMinerPrompt(
      reviews.map((r) => ({ text: r.review_text || '', rating: r.rating || 5 }))
    );

    const aiRes = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    const rawText = aiRes.content.find((b) => b.type === 'text')?.text?.trim() || '[]';

    // Parse JSON array
    let faqs: Array<{ question: string; answer: string }>;
    try {
      faqs = JSON.parse(rawText);
      if (!Array.isArray(faqs)) throw new Error('Not an array');
    } catch {
      throw new Error(`Failed to parse FAQ JSON: ${rawText.slice(0, 200)}`);
    }

    // Build FAQPage schema
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    // Upsert to page_seo for the FAQ page and homepage
    const pagesToUpdate = ['/faq', '/'];
    let updated = 0;

    for (const path of pagesToUpdate) {
      const { error } = await supabase
        .from('page_seo')
        .upsert(
          { path, schema_data: faqSchema, updated_at: new Date().toISOString() },
          { onConflict: 'path' }
        );
      if (!error) updated++;
    }

    // Log
    await supabase.from('automation_runs').insert({
      automation_slug: 'review-faq-miner',
      started_at: startedAt,
      completed_at: new Date().toISOString(),
      status: 'success',
      result_summary: `Mined ${faqs.length} FAQs from ${reviews.length} reviews, updated ${updated} pages`,
      pages_affected: updated,
    });

    await supabase
      .from('automation_config')
      .update({ last_run_at: new Date().toISOString() })
      .eq('slug', 'review-faq-miner');

    return NextResponse.json({ message: 'FAQs generated', count: faqs.length, faqs });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('review-faq-miner error:', msg);

    await supabase.from('automation_runs').insert({
      automation_slug: 'review-faq-miner',
      started_at: startedAt,
      completed_at: new Date().toISOString(),
      status: 'error',
      error_message: msg,
      pages_affected: 0,
    });

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/cron/review-faq-miner/route.ts
git commit -m "feat(gbp): add review-to-FAQ miner cron — extracts themes into website schema"
```

---

## Task 9: GBP Audit Cron — `src/app/api/cron/gbp-audit/route.ts`

**Files:**
- Create: `src/app/api/cron/gbp-audit/route.ts`

**Step 1: Write the cron**

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { listPosts } from '@/lib/gbp/client';

export const maxDuration = 60;

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const locationName = process.env.GBP_LOCATION_NAME;
  if (!locationName) {
    return NextResponse.json({ error: 'GBP_LOCATION_NAME not set' }, { status: 500 });
  }

  const startedAt = new Date().toISOString();

  try {
    // Fetch recent posts from GBP API
    const livePosts = await listPosts(locationName, 50);

    // Fetch our published posts from DB
    const { data: dbPosts } = await supabase
      .from('gbp_posts')
      .select('id, google_post_id, status, content')
      .eq('status', 'published')
      .not('google_post_id', 'is', null);

    let removedCount = 0;
    const livePostNames = new Set(livePosts.map((p) => p.name));

    // Check if any of our published posts were removed by Google
    for (const dbPost of dbPosts || []) {
      if (dbPost.google_post_id && !livePostNames.has(dbPost.google_post_id)) {
        // Post was removed by Google
        await supabase
          .from('gbp_posts')
          .update({
            status: 'removed',
            removed_at: new Date().toISOString(),
            removal_reason: 'Removed by Google — content policy violation suspected',
          })
          .eq('id', dbPost.id);
        removedCount++;
      }
    }

    // Calculate metrics
    const { count: totalPosts } = await supabase
      .from('gbp_posts')
      .select('*', { count: 'exact', head: true });

    const { count: totalRemoved } = await supabase
      .from('gbp_posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'removed');

    const { count: totalReviews } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true });

    const { count: respondedReviews } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .not('responded_at', 'is', null);

    const responseRate =
      totalReviews && totalReviews > 0
        ? Math.round(((respondedReviews || 0) / totalReviews) * 100)
        : 0;

    const removalRate =
      totalPosts && totalPosts > 0
        ? Math.round(((totalRemoved || 0) / totalPosts) * 100)
        : 0;

    const summary = `Audit: ${removedCount} new removals detected. Posts: ${totalPosts} total, ${totalRemoved} removed (${removalRate}%). Reviews: ${totalReviews} total, ${responseRate}% responded.`;

    // Slack digest
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `[GBP Weekly Audit]\n${summary}${removedCount > 0 ? '\n⚠️ Posts were removed by Google — review content rules!' : ''}`,
        }),
      }).catch(() => {});
    }

    // Log
    await supabase.from('automation_runs').insert({
      automation_slug: 'gbp-audit',
      started_at: startedAt,
      completed_at: new Date().toISOString(),
      status: removedCount > 0 ? 'warning' : 'success',
      result_summary: summary,
      pages_affected: removedCount,
    });

    await supabase
      .from('automation_config')
      .update({ last_run_at: new Date().toISOString() })
      .eq('slug', 'gbp-audit');

    return NextResponse.json({
      message: summary,
      removedCount,
      responseRate,
      removalRate,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('gbp-audit error:', msg);

    await supabase.from('automation_runs').insert({
      automation_slug: 'gbp-audit',
      started_at: startedAt,
      completed_at: new Date().toISOString(),
      status: 'error',
      error_message: msg,
      pages_affected: 0,
    });

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/cron/gbp-audit/route.ts
git commit -m "feat(gbp): add weekly audit cron — detects removed posts, tracks metrics"
```

---

## Task 10: Update vercel.json + Admin Run-Cron Whitelist

**Files:**
- Modify: `vercel.json` — add/update cron schedules for 4 new routes
- Modify: `src/app/api/admin/run-cron/route.ts` — add new crons to ALLOWED_PATHS

**Step 1: Update vercel.json**

Add these cron entries (replace existing `gbp-post` Monday schedule with new publisher Tue+Fri, and add the 3 new crons):

```json
{ "path": "/api/cron/review-responder", "schedule": "0 */6 * * *" },
{ "path": "/api/cron/gbp-post-publisher", "schedule": "0 14 * * 2,5" },
{ "path": "/api/cron/review-faq-miner", "schedule": "0 10 * * 0" },
{ "path": "/api/cron/gbp-audit", "schedule": "0 8 * * 1" }
```

**Step 2: Add to ALLOWED_PATHS in run-cron**

Add these to the `ALLOWED_PATHS` Set:
```typescript
'/api/cron/review-responder',
'/api/cron/gbp-post-publisher',
'/api/cron/review-faq-miner',
'/api/cron/gbp-audit',
```

**Step 3: Commit**

```bash
git add vercel.json src/app/api/admin/run-cron/route.ts
git commit -m "feat(gbp): add 4 GBP crons to vercel.json + admin whitelist"
```

---

## Task 11: Admin Dashboard — Rewrite LocalGBPPanel.tsx

**Files:**
- Modify: `src/components/admin/LocalGBPPanel.tsx`

**Context:** Replace the skeleton dashboard with live data. This is a `'use client'` component that fetches from Supabase. The admin panel pattern uses `createClient` from `@/integrations/supabase/client` (browser client, not service role).

**Step 1: Rewrite the panel**

The new panel should have 4 sections:

1. **Quick Stats Strip** (top) — 5 metric cards showing: Total Reviews, Avg Rating, Response Rate %, Posts This Month, Removal Rate %
2. **Review Feed** (main) — Table of recent reviews with: star rating, reviewer name, text preview, AI draft, status badge (auto_published / needs_review), and Approve/Reject buttons for held reviews
3. **Post Calendar** (secondary) — List of recent + upcoming posts with: type badge, content preview, status, published date
4. **Run Now Buttons** — Buttons to manually trigger each of the 4 GBP crons via `/api/admin/run-cron`

This is a large component (~300 lines). The implementer should follow the existing admin panel patterns in `OverviewPanel.tsx`, `SEOPanel.tsx`, etc. — using shadcn Card, Table, Badge, Button components with the existing admin layout.

Key data queries:
- `reviews` table: `select('*').order('created_at', { ascending: false }).limit(20)`
- `gbp_posts` table: `select('*').order('created_at', { ascending: false }).limit(20)`
- `automation_runs` table: `select('*').eq('automation_slug', 'review-responder').order('started_at', { ascending: false }).limit(5)` (for status history)

For the "Approve & Publish" button on held reviews:
- POST to a new API route `/api/admin/gbp-review-action` that takes `{ reviewId, action: 'approve' | 'reject' }`
- On approve: calls `replyToReview()` from GBP client + updates DB status
- On reject: updates status to 'rejected'

**Step 2: Create admin review action API**

Create `src/app/api/admin/gbp-review-action/route.ts` — POST handler that:
1. Validates admin JWT
2. Reads `reviewId` and `action` from body
3. If approve: fetches review from DB, calls `replyToReview()`, updates status to 'manually_published'
4. If reject: updates status to 'rejected'

**Step 3: Commit**

```bash
git add src/components/admin/LocalGBPPanel.tsx src/app/api/admin/gbp-review-action/route.ts
git commit -m "feat(gbp): rewrite admin GBP dashboard with live review feed + post calendar"
```

---

## Task 12: Build Verification + Push

**Step 1: Run build**

```bash
cd c:/Users/vance/OneDrive/Desktop/claude-workspace/tgyardcare && npm run build
```

Expected: All 76+ routes compile without errors.

**Step 2: Fix any TypeScript errors**

If build fails, fix import paths, missing types, or Supabase type casting issues (`as unknown as TypeName[]` pattern).

**Step 3: Push**

```bash
git push origin main
```

---

## Environment Variables Needed

After implementation, these env vars must be set in Vercel:

```
GOOGLE_SERVICE_ACCOUNT_JSON=<base64-encoded service account JSON key>
GBP_LOCATION_NAME=accounts/<account_id>/locations/<location_id>
```

To get these:
1. Go to Google Cloud Console → create project → enable "My Business API"
2. Create service account → download JSON key → base64 encode it
3. Grant the service account "Owner" or "Manager" access to the GBP location
4. Find location name via `GET https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations`

---

## Summary

| Task | What | Files |
|------|------|-------|
| 1 | Supabase migration | `supabase/migrations/20260304_gbp_automation.sql` |
| 2 | TypeScript types | `src/lib/gbp/types.ts` |
| 3 | Content validator | `src/lib/gbp/validator.ts` |
| 4 | Prompt templates | `src/lib/gbp/prompts.ts` |
| 5 | GBP API client | `src/lib/gbp/client.ts` |
| 6 | Review responder cron | `src/app/api/cron/review-responder/route.ts` |
| 7 | Post publisher cron | `src/app/api/cron/gbp-post-publisher/route.ts` |
| 8 | FAQ miner cron | `src/app/api/cron/review-faq-miner/route.ts` |
| 9 | Audit cron | `src/app/api/cron/gbp-audit/route.ts` |
| 10 | vercel.json + admin whitelist | `vercel.json`, `run-cron/route.ts` |
| 11 | Admin dashboard + review action API | `LocalGBPPanel.tsx`, `gbp-review-action/route.ts` |
| 12 | Build verification + push | — |
