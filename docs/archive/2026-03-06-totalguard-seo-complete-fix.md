# TotalGuard SEO Complete Fix — Design & Implementation Plan

**Date**: 2026-03-06
**Goal**: Fix all SEO issues identified in audit to maximize search ranking potential

---

## Phase 1: Critical Fixes (Immediate Impact)

### 1.1 Delete static sitemap override
- DELETE `public/sitemap.xml` — it overrides the dynamic `sitemap.ts`
- Google is currently seeing stale data missing 4 city-service pages

### 1.2 Fix sitemap.ts
- Remove `/get-quote` entry (it's a redirect page)
- Verify all 76 public routes are represented

### 1.3 Fix AutoSchema URL bug
- `AutoSchema.tsx` passes raw pathname (`/services/mowing`) to `buildWebPageSchema`
- Must pass full canonical URL (`https://tgyardcare.com/services/mowing`)

### 1.4 Fix review count mismatch
- `schema-constants.ts` says `ratingCount: 127`
- `llms.txt` says "60+ Google reviews"
- Reconcile to accurate number (127 if that's real, otherwise correct both)

### 1.5 Fix blog post year
- `spring-lawn-care-checklist/page.tsx` title says "2024" → "2026"
- Same in openGraph title

---

## Phase 2: next/image Migration (Core Web Vitals)

### Files to migrate:
1. `Navigation.tsx` — logo
2. `Footer.tsx` — logo
3. `SummerHero.tsx` — hero LCP image
4. `FallHero.tsx` — hero LCP image
5. `WinterHero.tsx` — hero LCP image
6. `SeasonalHeroCarousel.tsx` — carousel images
7. `ServiceCard.tsx` — service listing images
8. `BeforeAfterGallery.tsx` — gallery images
9. `HomeContent.tsx` — homepage images
10. `GalleryContent.tsx` — gallery page images
11. `ServicesContent.tsx` — services hub images
12. `ResidentialContent.tsx` — residential images
13. `TeamContent.tsx` — team photos

### Strategy:
- Hero/LCP images: `priority={true}`, explicit width/height, no lazy loading
- Below-fold images: default lazy loading via next/image
- All images get `sizes` prop for responsive srcset
- Logo: small fixed dimensions

---

## Phase 3: Build 20 Missing Cron Routes

### High-value (daily/weekly):
1. `indexnow` — Submit new/updated URLs to Bing/Yandex instantly
2. `review-schema-updater` — Keep review schema current with real reviews
3. `schema-validator` — Validate all JSON-LD schemas weekly
4. `image-alt-checker` — Audit missing/poor alt text
5. `heading-auditor` — Check H1/H2 hierarchy
6. `nap-checker` — Verify Name/Address/Phone consistency
7. `review-request` — Automated review solicitation
8. `review-response-drafter` — AI draft responses to reviews
9. `social-auto-post` — Auto-post to social channels
10. `schema-generator` — Generate schemas for new pages

### Medium-value (weekly):
11. `geo-signal-auditor` — Check local SEO signals
12. `page-speed-monitor` — Track Core Web Vitals over time
13. `rank-tracker` — Monitor keyword rankings
14. `aeo-optimizer` — Answer Engine Optimization for AI search

### Monthly:
15. `content-refresher` — AI-refresh stale content
16. `local-gap-finder` — Find local SEO gaps
17. `internal-link-optimizer` — Improve internal linking
18. `competitor-monitor` — Track competitor SEO changes
19. `citation-sync` — Sync business citations across directories
20. `backlink-monitor` — Track backlink profile

### Pattern for all crons:
```typescript
import { NextResponse } from 'next/server';
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // ... implementation
  return NextResponse.json({ success: true, ... });
}
```

---

## Phase 4: Metadata & OG Improvements

### 4.1 Per-page OpenGraph for all service/location/commercial pages
- Add `openGraph: { title, description, url }` to every page.tsx metadata export
- Use each page's existing title/description

### 4.2 Fall cleanup blog year fix
- Check `fall-cleanup-importance/page.tsx` for stale year references

---

## Execution Order

1. Phase 1 (critical fixes) — commit & push
2. Phase 2 (next/image) — commit & push
3. Phase 3 (20 cron routes) — commit & push
4. Phase 4 (OG metadata) — commit & push
