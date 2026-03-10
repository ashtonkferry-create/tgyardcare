# GSC Billionaire Cleanse — Design Doc

**Date**: 2026-03-10
**Goal**: Fix all Google Search Console issues, perfect the sitemap, force-index all pages, optimize for CTR

## Current State (from audit)
- **Score**: 60/100 on WooRank (old Lovable site still live)
- **Indexed**: 15 of 34 key pages
- **Not indexed**: 19 pages (all 12 location pages, /residential, /service-areas, 5 service pages)
- **Sitemaps**: 2 submitted (tgyardcare.com + www.tgyardcare.com), 0 indexed from either
- **Top query**: "lawn care madison wi" — 578 impressions, 4 clicks (0.7% CTR, position 8.8)
- **Traffic split**: http vs https, www vs non-www diluting authority

## Phases

### Phase 1: Force-Index Unindexed Pages
- Use Google Indexing API to submit URL_UPDATED for all 19 unindexed pages
- Ping IndexNow as backup signal

### Phase 2: Sitemap Perfection
- Remove duplicate www sitemap from GSC
- Audit sitemap.ts — ensure ALL routes are included
- Add lastmod dates, priority weights, changefreq

### Phase 3: Redirect Completeness
- Add redirects for any old URLs still getting GSC impressions
- Eliminate redirect chains

### Phase 4: Meta Title/Description Optimization
- Improve titles for low-CTR high-impression pages
- Ensure all pages have unique, keyword-rich descriptions under 160 chars
- Fix any duplicate title/description issues

### Phase 5: Final Verification
- Re-inspect all URLs via GSC API
- Generate before/after report
