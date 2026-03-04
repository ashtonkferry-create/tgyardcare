# Billionaire Schema Architecture — Design Doc

**Date**: 2026-03-04
**Goal**: Ship 15 schema types across all 76 routes with centralized factory, @id cross-references, and auto-updating review/event data.

---

## Problem

Current state: 7 schema components with duplicated, inconsistent business data.
- `foundingDate` is "2020" in GlobalSchema, "2019" in layout.tsx
- `reviewCount` is 80 / 127 / 50 depending on which file
- FAQSchema component exists but is wired to ZERO pages
- ReviewSchema exists but only used on /reviews (no location pages)
- Blog pages have ZERO structured data
- No HowTo, ContactPage, AboutPage, ImageGallery, Event, or Navigation schemas
- No @id cross-references — Google sees disconnected fragments

## Architecture

### Single Source of Truth

```
src/lib/seo/
├── schema-constants.ts     # Business name, phone, email, rating, founding date — ONE place
├── schema-config.ts        # Service + location configs (EXISTS — extend with pricing, HowTo steps)
├── schema-factory.ts       # Builder functions that produce JSON-LD objects
└── schema-types.ts         # TypeScript interfaces for all schema shapes
```

### Schema Components (render JSON-LD scripts)

```
src/components/schemas/
├── BreadcrumbSchema.tsx    # EXISTS — keep as-is
├── ServicePageSchemas.tsx  # NEW — combines Service + FAQ + HowTo + Offer for service pages
├── LocationPageSchemas.tsx # NEW — combines LocalBusiness + ServiceArea + GeoCircle + FAQ
├── ArticleSchema.tsx       # NEW — blog posts
├── ContactPageSchema.tsx   # NEW — /contact
├── AboutPageSchema.tsx     # NEW — /about
├── GallerySchema.tsx       # NEW — /gallery
├── EventSchema.tsx         # NEW — seasonal promos
├── NavigationSchema.tsx    # NEW — global sitelinks
├── WebPageSchema.tsx       # NEW — generic per-page type annotation
├── ItemListSchema.tsx      # NEW — hub pages (/services, /service-areas)
├── ReviewPageSchema.tsx    # NEW — /reviews with AggregateRating + Review[]
├── CommercialServiceSchema.tsx # NEW — ProfessionalService for commercial pages
├── JobPostingSchema.tsx    # NEW — /careers
└── GlobalSchema.tsx        # REWRITE — use schema-constants, fix inconsistencies
```

Old standalone files (FAQSchema.tsx, ReviewSchema.tsx, ServiceSchema.tsx, LocalBusinessSchema.tsx, WebsiteSchema.tsx) will be replaced/removed.

### @id Cross-Reference Graph

```
Organization (tgyardcare.com/#organization)
  ├── publishes → WebSite (tgyardcare.com/#website)
  ├── operates → LandscapingBusiness (tgyardcare.com/#localbusiness)
  │     ├── makesOffer → Service (tgyardcare.com/#service/{slug})
  │     │     ├── has → HowTo (tgyardcare.com/#howto/{slug})
  │     │     ├── subjectOf → FAQPage (tgyardcare.com/#faq/{slug})
  │     │     └── offers → Offer (price range)
  │     ├── areaServed → ServiceArea (tgyardcare.com/#area/{city})
  │     │     └── geo → GeoCircle (lat/lng/radius)
  │     ├── review → Review[]
  │     └── aggregateRating → AggregateRating
  └── hasPart → WebPage (tgyardcare.com/#page/{slug})
```

## 15 Schema Types

| # | Type | Pages | Source | Rich Result |
|---|------|-------|--------|-------------|
| 1 | FAQPage | 14 service + /faq + 12 location | serviceFAQs.ts | FAQ dropdowns |
| 2 | HowTo | 14 service pages | schema-config.ts (new steps field) | Step cards |
| 3 | AggregateRating | All service + location pages | schema-constants.ts | Stars |
| 4 | Review | /reviews + location pages | Hardcoded top 15 + Supabase | Review snippets |
| 5 | Article/BlogPosting | /blog/* (3 posts) | Page metadata | Article cards |
| 6 | ContactPage | /contact | Static | Contact result |
| 7 | AboutPage | /about | Static | About result |
| 8 | Offer | 14 service + 8 commercial | schema-config.ts (new priceRange) | "From $XX" |
| 9 | SiteNavigationElement | Global (layout.tsx) | Static nav items | Sitelinks |
| 10 | GeoCircle/ServiceArea | 12 location pages | LOCATION_CONFIGS | Map coverage |
| 11 | ImageGallery | /gallery | Static | Image carousel |
| 12 | ProfessionalService | 8 commercial pages | schema-config.ts | B2B cards |
| 13 | Event | Homepage/seasonal | Supabase or static | Event cards |
| 14 | WebPage | All pages | Per-page metadata | Page signals |
| 15 | ItemList | /services, /service-areas | Config arrays | List results |
| bonus | JobPosting | /careers | Static | Job listing |

## Page Wiring

| Page Type | What Gets Added |
|-----------|----------------|
| **layout.tsx** | NavigationSchema (global), fix GlobalJsonLd inconsistencies |
| **Homepage** | WebPageSchema |
| **14 service pages** | FAQPage + HowTo + Offer + WebPageSchema (via ServicePageSchemas) |
| **8 commercial pages** | CommercialServiceSchema + Offer + WebPageSchema |
| **12 location pages** | GeoCircle/ServiceArea + FAQPage + WebPageSchema (via LocationPageSchemas) |
| **/reviews** | ReviewPageSchema (AggregateRating + Review[]) |
| **/about** | AboutPageSchema + WebPageSchema |
| **/contact** | ContactPageSchema + WebPageSchema |
| **/gallery** | GallerySchema + WebPageSchema |
| **/blog/*** | ArticleSchema + WebPageSchema |
| **/faq** | FAQPage + WebPageSchema |
| **/services** | ItemListSchema + WebPageSchema |
| **/service-areas** | ItemListSchema + WebPageSchema |
| **/careers** | JobPostingSchema + WebPageSchema |

## Data: schema-constants.ts

Single source for all business data:
- name: "TotalGuard Yard Care"
- alternateName: "TG Yard Care"
- phone: "+1-608-535-6057"
- email: "totalguardllc@gmail.com"
- foundingDate: "2019"
- ratingValue: "4.9"
- reviewCount: "127"
- priceRange: "$$"
- logo, image, sameAs, address, geo, openingHours

## Data: HowTo Steps (added to schema-config.ts)

Each service gets a `howToSteps` array:
```ts
mowing: {
  ...existing,
  priceRange: { low: 30, high: 60, unit: 'per cut' },
  howToSteps: [
    { name: 'Schedule Service', text: 'Contact us for a free quote...' },
    { name: 'Property Assessment', text: 'We evaluate your lawn size...' },
    { name: 'Professional Mowing', text: 'Our crew mows at optimal height...' },
    { name: 'Edge & Trim', text: 'All edges and obstacles trimmed...' },
    { name: 'Cleanup & Inspection', text: 'Clippings blown, property inspected...' },
  ]
}
```

## Data: Reviews (hardcoded + Supabase)

Top 15 Google reviews hardcoded in `schema-constants.ts`. The `review-schema-updater` cron reads from Supabase `reviews` table and updates `page_seo.schema_data` when new reviews come in.

## Cleanup

- Remove old standalone components: `src/components/FAQSchema.tsx`, `ReviewSchema.tsx`, `ServiceSchema.tsx`, `LocalBusinessSchema.tsx`, `WebsiteSchema.tsx`, `GlobalSchema.tsx`
- Remove duplicate GlobalJsonLd from layout.tsx (replaced by new GlobalSchema from factory)
- Remove `BreadcrumbSchema.tsx` from components root (moved to schemas/)

## Success Criteria

- Google Rich Results Test passes for all schema types on every page
- Zero duplicate/conflicting business data across any schema
- All schemas cross-reference via @id
- ReviewSchema auto-updates from Supabase
- TypeScript strict — no `any`, no `as unknown`
