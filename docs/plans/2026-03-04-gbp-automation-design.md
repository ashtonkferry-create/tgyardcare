# Billionaire-Level GBP Full Automation System — Design Doc

**Date**: 2026-03-04
**Goal**: Fully automated Google Business Profile management — auto review responding, auto posting (2x/week), and review-to-FAQ pipeline — with 5-layer content safety to prevent takedowns.

---

## Problem

Current state:
- `gbp-post/route.ts` generates text via Claude but requires manual copy-paste to business.google.com
- `reviews` table exists but is empty — no ingestion pipeline
- No Google API connection at all — no OAuth, no service account, no env vars
- Admin `LocalGBPPanel.tsx` is a skeleton with all values hardcoded to "—"
- Google killed Q&A feature (Dec 2025) — old FAQ-on-GBP strategy is dead
- User has had posts taken down for including contact info in descriptions

## Architecture

### 3 Automation Pillars

| Pillar | Trigger | Action |
|--------|---------|--------|
| **Review Responder** | Every 6 hours | Polls GBP API for new reviews → Claude drafts reply → auto-publishes (4-5 star) or holds (1-3 star) |
| **Post Publisher** | Tue + Fri 14:00 UTC | Claude generates seasonal/service post → selects real photo → validates → publishes via API |
| **Review-to-FAQ Miner** | Weekly (Sunday) | Extracts themes from reviews → generates FAQ schema → feeds into website structured data |

### GBP API Setup

- **API**: Google Business Profile API v4 (`mybusiness.googleapis.com/v4`)
- **Auth**: OAuth2 service account (JSON key stored as `GOOGLE_SERVICE_ACCOUNT_JSON` env var)
- **Location**: `GBP_LOCATION_ID` env var
- **Rate limit**: 60 req/min (built into client)

## 5-Layer Content Safety Architecture

### Layer 1: Hardcoded Rules (pre-AI)

**Posts — BLOCKED content** (Google removes these):
- Phone numbers, emails, URLs in body text (use CTA buttons instead)
- Pricing claims or specific dollar amounts
- Competitor mentions
- ALL CAPS sentences
- Emoji spam (>3 per post)
- Text >1500 characters

**Review replies — BLOCKED content**:
- Promotional language ("book now!", "10% off", "visit our website")
- Asking for review edits/removals
- Disputing the customer's experience
- Sharing private customer details
- Contact info (phone, email, URL)

**Images — BLOCKED**:
- Text overlays with contact info
- Stock photos (Google's AI flags these)
- Before/after showing neighbor properties
- Images with watermarks

### Layer 2: Claude System Prompt

Brand voice baked into the prompt:
- **Tone**: Professional + personal, uses reviewer's name, references their specific service
- **Sign-off**: "— The TotalGuard Team"
- **Google policy constraints**: Explicit rules in system prompt
- **Few-shot examples**: 6 gold-standard review replies + 4 gold-standard posts hardcoded

### Layer 3: Post-Generation Validator

Regex + rule checks after Claude generates:
- Phone pattern: `\d{3}[-.]?\d{3}[-.]?\d{4}`
- URL pattern: `https?://|www\.|\.com|\.net|\.org`
- Email pattern: `\S+@\S+\.\S+`
- Blocked word list (competitor names, profanity, medical/legal claims)
- Length limits: posts 100-300 words, review replies 50-150 words
- Negative review replies must contain empathy keywords ("understand", "sorry", "appreciate", "hear")
- If ANY check fails → status = `needs_review`, not published

### Layer 4: Tiered Auto-Publish

| Content | Condition | Action |
|---------|-----------|--------|
| Review reply | 4-5 stars, passed validation | Auto-publish immediately |
| Review reply | 3 stars, passed validation | Auto-publish + Slack notification |
| Review reply | 1-2 stars | **HOLD for manual review** + Slack alert |
| GBP post | Passed all checks | Auto-publish |
| GBP post | Failed any check | Hold as `draft` + Slack alert |

### Layer 5: Weekly Audit Cron

- Checks if any published posts were removed by Google (API status check)
- If removed → flags the pattern → adds to blocked rules in `gbp_content_rules`
- Tracks: response rate, publish success rate, removal rate
- Logs to `automation_runs`

## Cron Routes

### `review-responder/route.ts` — Every 6 hours

```
Schedule: 0 */6 * * *
Flow:
1. Fetch reviews from GBP API where updateTime > lastCheckedAt
2. Upsert into `reviews` table (dedup by google_review_id)
3. For each unresponded review:
   a. Build Claude prompt (brand voice + rules + review text + service context)
   b. Generate response draft
   c. Run Layer 3 validator
   d. 4-5 stars + passed → replyToReview() via API → status = 'auto_published'
   e. 3 stars + passed → replyToReview() via API → status = 'auto_published' + Slack notify
   f. 1-2 stars OR failed validation → status = 'needs_review' + Slack alert
4. Log to automation_runs
```

### `gbp-post-publisher/route.ts` — Tue + Fri 14:00 UTC

```
Schedule: 0 14 * * 2,5
Flow:
1. Determine post type (rotating: seasonal_tip → service_spotlight → community → offer)
2. Determine current season + pick relevant service
3. Build Claude prompt with post type template + Google-safe rules
4. Generate post body (100-250 words, zero contact info)
5. Select image from /public/gallery/ or /src/assets/ mapped to service slug
6. Run Layer 3 validator
7. If passed → uploadMedia() + createPost() via API → status = 'published'
8. If failed → status = 'draft' + Slack alert
9. Store in gbp_posts table
10. Log to automation_runs
```

**Post types** (4-post rotation cycle):
1. **Seasonal tip**: Lawn care advice for current season (e.g., "Spring is here — time to dethatch your lawn before the first mow")
2. **Service spotlight**: Highlights one of 14 services with what's included + CTA
3. **Community post**: "Proud to serve [city]" — rotates through 12 service areas
4. **Offer post**: Seasonal promotion (spring cleanup bundle, fall prep package, etc.)

**CTA strategy**: Every post gets a "Learn more" button linking to the relevant service/location page on tgyardcare.com

### `review-faq-miner/route.ts` — Weekly (Sunday)

```
Schedule: 0 10 * * 0
Flow:
1. Read all reviews from past 30 days
2. Claude extracts top 5 recurring themes/questions
3. Generate FAQ pairs addressing real customer concerns
4. Upsert into page_seo.schema_data as FAQPage entries
5. Maps FAQs to relevant service pages (mowing reviews → /services/mowing FAQ)
6. Log to automation_runs
```

This feeds the schema system built earlier — Google's "Ask Maps" AI pulls these answers directly.

### `gbp-audit/route.ts` — Weekly (Monday)

```
Schedule: 0 8 * * 1
Flow:
1. List all posts from past 7 days via API
2. Check status — flag any removed/rejected posts
3. If removal detected → extract pattern → add to gbp_content_rules
4. Calculate metrics: response rate, avg response time, post success rate
5. Slack digest with weekly GBP health summary
6. Log to automation_runs
```

## Shared Module: `src/lib/gbp/client.ts`

```typescript
// GBP API v4 client
// Auth: OAuth2 service account
// Rate limiting: 60 req/min
// Methods:
//   listReviews(since?: Date) → Review[]
//   replyToReview(reviewId, text) → void
//   createPost(body, mediaUrl?, ctaUrl?) → Post
//   uploadMedia(imagePath) → mediaUrl
//   listPosts(since?: Date) → Post[]
//   getPostInsights(postId) → Insights
```

## Content Validator: `src/lib/gbp/validator.ts`

```typescript
// validatePostContent(text) → { valid: boolean, violations: string[] }
// validateReviewReply(text, rating) → { valid: boolean, violations: string[] }
// validateImage(path) → { valid: boolean, violations: string[] }
// Checks: phone regex, URL regex, email regex, blocked words, length, empathy keywords
```

## Prompt Templates: `src/lib/gbp/prompts.ts`

```typescript
// buildReviewReplyPrompt(review, brandVoice, rules) → string
// buildPostPrompt(postType, season, service, rules) → string
// buildFAQMinerPrompt(reviews) → string
// Each includes: system constraints, few-shot examples, output format
```

## Database Changes

### New table: `gbp_posts`

```sql
CREATE TABLE gbp_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  post_type text NOT NULL,  -- 'seasonal_tip', 'service_spotlight', 'community', 'offer'
  service_slug text,
  image_path text,
  cta_url text,
  google_post_id text,
  status text DEFAULT 'draft',  -- 'draft', 'published', 'removed', 'rejected'
  published_at timestamptz,
  removed_at timestamptz,
  removal_reason text,
  created_at timestamptz DEFAULT now()
);
```

### Alter table: `reviews`

```sql
ALTER TABLE reviews
  ADD COLUMN google_review_id text UNIQUE,
  ADD COLUMN auto_responded boolean DEFAULT false,
  ADD COLUMN response_status text DEFAULT 'pending',
    -- 'pending', 'auto_published', 'needs_review', 'manually_published', 'rejected'
  ADD COLUMN response_published_at timestamptz,
  ADD COLUMN service_slug text,
  ADD COLUMN review_url text;
```

### New table: `gbp_content_rules`

```sql
CREATE TABLE gbp_content_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_type text NOT NULL,  -- 'blocked_word', 'blocked_pattern', 'required_keyword', 'cta_url'
  value text NOT NULL,
  reason text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Seed with baseline rules
INSERT INTO gbp_content_rules (rule_type, value, reason) VALUES
  ('blocked_pattern', '\d{3}[-.]?\d{3}[-.]?\d{4}', 'Phone numbers in post body violate Google policy'),
  ('blocked_pattern', 'https?://|www\.|\.com|\.net', 'URLs in post body — use CTA button instead'),
  ('blocked_pattern', '\S+@\S+\.\S+', 'Email addresses in post body violate Google policy'),
  ('blocked_word', 'book now', 'Promotional language in review replies'),
  ('blocked_word', 'call us at', 'Contact solicitation in review replies'),
  ('blocked_word', 'visit our website', 'URL solicitation in review replies'),
  ('required_keyword', 'understand|sorry|appreciate|hear', 'Negative review replies must show empathy');
```

## Environment Variables

```
GOOGLE_SERVICE_ACCOUNT_JSON=<base64-encoded service account JSON>
GBP_LOCATION_ID=<accounts/xxx/locations/yyy>
GBP_ACCOUNT_ID=<accounts/xxx>
```

## Admin Dashboard Updates (`LocalGBPPanel.tsx`)

### Review Management Tab
- Live feed of reviews (newest first)
- Each review shows: star rating, text, AI-drafted response, status badge
- Action buttons: Approve & Publish, Edit, Reject (for held reviews)
- Filter: All / Needs Review / Auto-published / Rejected

### Post Calendar Tab
- Timeline view of upcoming + past posts
- Each post shows: type badge, preview text, image thumbnail, status
- Edit/cancel upcoming posts
- Engagement metrics for published posts (views, clicks)

### Content Health Tab
- Posts removed by Google (if any) with reason
- Validation failure rate
- Response rate and avg response time
- Weekly trend charts

### Quick Stats Strip
- Total reviews (count)
- Avg rating (stars)
- Response rate (%)
- Posts this month (count)
- Removal rate (% — should be 0)

## File Structure

```
src/lib/gbp/
├── client.ts           # GBP API v4 client (OAuth2, rate limiting)
├── validator.ts        # Content validation (5 layers)
├── prompts.ts          # Claude prompt templates
└── types.ts            # TypeScript interfaces

src/app/api/cron/
├── review-responder/route.ts     # Every 6 hours — fetch + reply to reviews
├── gbp-post-publisher/route.ts   # Tue + Fri — generate + publish posts
├── review-faq-miner/route.ts     # Sunday — extract FAQs from reviews
└── gbp-audit/route.ts            # Monday — audit published content

src/components/admin/
└── LocalGBPPanel.tsx              # REWRITE — live review feed, post calendar, health

supabase/migrations/
└── 20260304_gbp_automation.sql    # gbp_posts table, reviews alterations, content_rules
```

## Success Criteria

- Reviews responded to within 6 hours (4-5 star auto, 1-2 star within 24h manual)
- 2 posts/week published consistently with zero takedowns
- 0% removal rate on posts (Google-safe content)
- FAQ schema auto-updates from real customer themes
- Admin dashboard shows live GBP health metrics
- All content passes 5-layer validation before publishing
- TypeScript strict — no `any`, no `as unknown`

## Google Content Policy Compliance Checklist

Based on [Google's official post guidelines](https://support.google.com/business/answer/7213077):

- [ ] No phone numbers in post body
- [ ] No URLs in post body (CTA buttons only)
- [ ] No email addresses in post body
- [ ] No pricing/cost claims in post body
- [ ] No stock photos (real work photos only)
- [ ] No text overlays on images with contact info
- [ ] No competitor mentions
- [ ] No misleading claims
- [ ] No profanity or offensive content
- [ ] No ALL CAPS sentences
- [ ] Review replies don't solicit review changes
- [ ] Review replies don't share private customer info
- [ ] All CTA links go to owned domain (tgyardcare.com)

Sources:
- [Google Business Profile Policies](https://support.google.com/business/answer/13762416)
- [Posts Content Policy](https://support.google.com/business/answer/7213077)
- [GBP API Posts Documentation](https://developers.google.com/my-business/content/posts-data)
- [GBP API Reviews Documentation](https://developers.google.com/my-business/content/review-data)
- [Q&A Discontinued — Ask Maps Replacement](https://imegonline.com/blog/google-business-profile-q-and-a-feature-going-away)
