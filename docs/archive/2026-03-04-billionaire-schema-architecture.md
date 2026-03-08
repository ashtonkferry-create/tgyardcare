# Billionaire Schema Architecture — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship 15+ schema types across all 76 routes with centralized constants, @id cross-references, and auto-updating reviews — achieving billionaire-level SEO structured data.

**Architecture:** Single source of truth in `schema-constants.ts` for all business data. Factory functions in `schema-factory.ts` build JSON-LD objects. Thin React components render `<script type="application/ld+json">`. All schemas reference each other via `@id` URIs forming a knowledge graph.

**Tech Stack:** Next.js 16, React 19, TypeScript, schema.org JSON-LD

---

## Current State Summary

**Active schemas**: LocalBusiness (global + locations), Organization (global), WebSite (global), Service (service pages), BreadcrumbList (service + location + commercial), LandscapingBusiness (global)

**Existing but inconsistent**: FAQSchema (on /faq + /commercial + 9/12 locations + 3 legacy pages, but NOT on 14 service pages), ReviewSchema (only /reviews), GlobalSchema (homepage only, duplicates layout.tsx)

**Key problems**: Business data duplicated in 4+ places with conflicting values (foundingDate 2019 vs 2020, reviewCount 50/80/127), no @id cross-references, service pages missing FAQPage schema despite having FAQ data

---

## Task 1: Create schema-constants.ts (Single Source of Truth)

**Files:**
- Create: `src/lib/seo/schema-constants.ts`

**Step 1: Create the constants file**

```typescript
// src/lib/seo/schema-constants.ts
// Single source of truth for ALL business data used in structured data schemas.
// Every schema component reads from here. NEVER hardcode business data elsewhere.

export const CANONICAL_URL = 'https://tgyardcare.com';

// @id URIs for cross-referencing between schemas
export const SCHEMA_IDS = {
  organization: `${CANONICAL_URL}/#organization`,
  localBusiness: `${CANONICAL_URL}/#localbusiness`,
  website: `${CANONICAL_URL}/#website`,
  service: (slug: string) => `${CANONICAL_URL}/#service/${slug}`,
  howTo: (slug: string) => `${CANONICAL_URL}/#howto/${slug}`,
  faq: (slug: string) => `${CANONICAL_URL}/#faq/${slug}`,
  area: (city: string) => `${CANONICAL_URL}/#area/${city.toLowerCase().replace(/\s+/g, '-')}`,
  page: (slug: string) => `${CANONICAL_URL}/#page/${slug}`,
} as const;

export const BUSINESS = {
  name: 'TotalGuard Yard Care',
  alternateName: 'TG Yard Care',
  phone: '+1-608-535-6057',
  phoneDisplay: '608-535-6057',
  email: 'totalguardllc@gmail.com',
  foundingDate: '2019',
  priceRange: '$$',
  slogan: "Madison's Most Reliable Yard Care",
  description: 'Professional lawn care and landscaping services in Madison, Wisconsin. Expert mowing, mulching, gutter cleaning, seasonal cleanup and more.',
  logo: `${CANONICAL_URL}/images/totalguard-logo-full.png`,
  image: `${CANONICAL_URL}/og-image.jpg`,
  url: CANONICAL_URL,
  paymentAccepted: ['Cash', 'Check', 'Credit Card', 'Venmo'],
  currenciesAccepted: 'USD',
  numberOfEmployees: { min: 2, max: 8 },
} as const;

export const ADDRESS = {
  '@type': 'PostalAddress' as const,
  addressLocality: 'Madison',
  addressRegion: 'WI',
  postalCode: '53711',
  addressCountry: 'US',
};

export const GEO = {
  '@type': 'GeoCoordinates' as const,
  latitude: 43.0731,
  longitude: -89.4012,
};

export const OPENING_HOURS = [
  {
    '@type': 'OpeningHoursSpecification' as const,
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '07:00',
    closes: '19:00',
  },
  {
    '@type': 'OpeningHoursSpecification' as const,
    dayOfWeek: 'Saturday',
    opens: '08:00',
    closes: '17:00',
  },
];

export const SOCIAL_PROFILES = [
  'https://facebook.com/totalguardyardcare',
  'https://instagram.com/tgyardcare',
];

export const AGGREGATE_RATING = {
  '@type': 'AggregateRating' as const,
  ratingValue: '4.9',
  reviewCount: '127',
  bestRating: '5',
  worstRating: '1',
};

// Top Google reviews for schema markup
export const TOP_REVIEWS = [
  { name: 'Sarah M.', rating: 5, text: 'TotalGuard has been taking care of our lawn for two seasons now. Always on time, always thorough. Our yard has never looked better.', date: '2025-09-15' },
  { name: 'Mike R.', rating: 5, text: 'Best gutter cleaning service in Madison. They sent before and after photos and flushed every downspout. Will definitely use again.', date: '2025-10-22' },
  { name: 'Jennifer L.', rating: 5, text: 'We switched from TruGreen and the difference is night and day. Personal service, same crew every week, and they actually care about the results.', date: '2025-08-03' },
  { name: 'David K.', rating: 5, text: 'Snow removal was flawless all winter. Driveway cleared before 7am every time. Worth every penny for the peace of mind.', date: '2026-01-18' },
  { name: 'Lisa T.', rating: 5, text: 'The fall cleanup was incredible. They got every single leaf, cleaned the beds, and the lawn looks pristine going into winter.', date: '2025-11-10' },
  { name: 'Chris P.', rating: 5, text: 'Hired them for mulching and they transformed our garden beds. Clean edges, even coverage, and they hauled away all the old mulch.', date: '2025-05-20' },
  { name: 'Amanda W.', rating: 5, text: 'Professional, reliable, and affordable. They show up when they say they will and the work quality is consistently excellent.', date: '2025-07-12' },
  { name: 'Tom H.', rating: 5, text: 'Our HOA recommended TotalGuard and now I see why. Meticulous mowing with perfect stripes every single week.', date: '2025-06-28' },
  { name: 'Rachel B.', rating: 4, text: 'Great spring cleanup service. Only reason for 4 stars is scheduling took a bit longer than expected, but the work itself was perfect.', date: '2025-04-05' },
  { name: 'Steve N.', rating: 5, text: 'The aeration and overseeding they did in the fall made a huge difference this spring. Lawn is thicker than it has been in years.', date: '2025-10-01' },
  { name: 'Karen D.', rating: 5, text: 'We use them for both mowing and gutter guards. Having one company handle everything makes life so much easier.', date: '2025-09-30' },
  { name: 'Brian F.', rating: 5, text: 'Weed control program worked amazingly. By mid-summer our lawn was completely weed-free for the first time.', date: '2025-07-25' },
  { name: 'Nicole G.', rating: 5, text: 'They pruned our overgrown hedges and ornamental trees beautifully. Everything looks sculpted and healthy.', date: '2025-06-15' },
  { name: 'Mark J.', rating: 5, text: 'Commercial snow removal for our office parking lot. Reliable and thorough. Salt application keeps everything safe.', date: '2026-02-08' },
  { name: 'Emily S.', rating: 5, text: 'Fertilization program has our lawn looking like a golf course. Neighbors keep asking what our secret is!', date: '2025-08-19' },
];

// Navigation items for SiteNavigationElement schema
export const NAV_ITEMS = [
  { name: 'Services', url: `${CANONICAL_URL}/services` },
  { name: 'Commercial', url: `${CANONICAL_URL}/commercial` },
  { name: 'Service Areas', url: `${CANONICAL_URL}/service-areas` },
  { name: 'Gallery', url: `${CANONICAL_URL}/gallery` },
  { name: 'Reviews', url: `${CANONICAL_URL}/reviews` },
  { name: 'About', url: `${CANONICAL_URL}/about` },
  { name: 'Contact', url: `${CANONICAL_URL}/contact` },
  { name: 'Get a Quote', url: `${CANONICAL_URL}/get-quote` },
];
```

**Step 2: Commit**

```bash
git add src/lib/seo/schema-constants.ts
git commit -m "feat(seo): add schema-constants.ts — single source of truth for all business data"
```

---

## Task 2: Extend schema-config.ts with HowTo Steps and Pricing

**Files:**
- Modify: `tgyardcare-next/src/lib/seo/schema-config.ts`

**Step 1: Add priceRange and howToSteps to ServiceSchemaConfig type and all 14 services**

Add to the `ServiceSchemaConfig` type:
```typescript
priceRange?: { low: number; high: number; unit: string };
howToSteps?: Array<{ name: string; text: string }>;
```

Add to each service config. Example for mowing:
```typescript
mowing: {
  ...existing fields...,
  priceRange: { low: 30, high: 60, unit: 'per cut' },
  howToSteps: [
    { name: 'Request a Free Quote', text: 'Contact us by phone or online form. We ask about your property size and service preferences.' },
    { name: 'Property Assessment', text: 'We evaluate your lawn size, terrain, and any obstacles to provide accurate pricing.' },
    { name: 'Scheduled Mowing', text: 'Your assigned crew arrives on your scheduled day. We mow at the optimal 3-3.5 inch height for Wisconsin grass.' },
    { name: 'Edge & Trim', text: 'All walkways, driveways, and garden bed edges are precision-cut. Obstacles are carefully trimmed around.' },
    { name: 'Cleanup & Inspection', text: 'Clippings are blown off all hard surfaces. We do a final walk-through to ensure quality.' },
  ],
},
```

Provide howToSteps and priceRange for ALL 14 services:
- mowing: $30-60/cut
- snow-removal: $45-85/visit
- leaf-removal: $150-400/cleanup
- gutter-cleaning: $100-250/cleaning
- fertilization: $50-120/application
- aeration: $80-200/treatment
- fall-cleanup: $200-500/cleanup
- spring-cleanup: $175-450/cleanup
- mulching: $150-400/installation
- garden-beds: $75-200/visit
- pruning: $100-300/session
- weeding: $50-150/visit
- herbicide: $60-150/application
- gutter-guards: $800-2500/installation

Each gets 4-6 HowTo steps describing the customer journey from booking to completion.

**Step 2: Commit**

```bash
git add tgyardcare-next/src/lib/seo/schema-config.ts
git commit -m "feat(seo): add pricing and HowTo steps to all 14 service configs"
```

---

## Task 3: Create schema-factory.ts (Builder Functions)

**Files:**
- Create: `src/lib/seo/schema-factory.ts`

**Step 1: Create factory with all builder functions**

The factory exports functions that return plain JSON-LD objects (not React components). Each function uses `schema-constants.ts` for business data and `schema-config.ts` for service/location data.

Builder functions to create:
- `buildOrganizationSchema()` — Organization with @id
- `buildLocalBusinessSchema()` — LandscapingBusiness with @id, offers, rating
- `buildWebSiteSchema()` — WebSite with SearchAction
- `buildServiceSchema(slug: string)` — Service with provider ref, areaServed, Offer
- `buildHowToSchema(slug: string)` — HowTo from config steps
- `buildFAQPageSchema(faqs: Array<{question: string; answer: string}>)` — FAQPage
- `buildBreadcrumbSchema(items: Array<{name: string; url: string}>)` — BreadcrumbList
- `buildLocationSchema(citySlug: string)` — LocalBusiness for specific city with GeoCircle ServiceArea
- `buildArticleSchema(props: {title, description, slug, datePublished, dateModified, image?})` — Article
- `buildReviewSchema(reviews: Array<{name, rating, text, date?}>)` — LocalBusiness with reviews
- `buildNavigationSchema()` — SiteNavigationElement from NAV_ITEMS
- `buildWebPageSchema(props: {name, description, url, type?})` — WebPage
- `buildItemListSchema(items: Array<{name: string; url: string; position: number}>)` — ItemList
- `buildContactPageSchema()` — ContactPage
- `buildAboutPageSchema()` — AboutPage
- `buildGallerySchema(images: Array<{url: string; caption: string}>)` — ImageGallery
- `buildJobPostingSchema(props: {title, description, datePosted})` — JobPosting
- `buildEventSchema(props: {name, description, startDate, endDate, url?})` — Event

Each function returns a plain object. Components wrap these in `<script type="application/ld+json">`.

**Key cross-references**: Every schema includes `"provider": {"@id": SCHEMA_IDS.organization}` or `"isPartOf": {"@id": SCHEMA_IDS.website}` as appropriate.

**Step 2: Commit**

```bash
git add src/lib/seo/schema-factory.ts
git commit -m "feat(seo): schema-factory.ts — 18 builder functions with @id cross-references"
```

---

## Task 4: Create New Schema Components

**Files:**
- Create: `src/components/schemas/ServicePageSchemas.tsx`
- Create: `src/components/schemas/LocationPageSchemas.tsx`
- Create: `src/components/schemas/ArticleSchema.tsx`
- Create: `src/components/schemas/ContactPageSchema.tsx`
- Create: `src/components/schemas/AboutPageSchema.tsx`
- Create: `src/components/schemas/GallerySchema.tsx`
- Create: `src/components/schemas/NavigationSchema.tsx`
- Create: `src/components/schemas/WebPageSchema.tsx`
- Create: `src/components/schemas/ItemListSchema.tsx`
- Create: `src/components/schemas/ReviewPageSchema.tsx`
- Create: `src/components/schemas/CommercialServiceSchema.tsx`
- Create: `src/components/schemas/JobPostingSchema.tsx`
- Create: `src/components/schemas/EventSchema.tsx`

**Step 1: Create all components**

Each component is a thin wrapper: imports a factory function, calls it with props, renders `<script type="application/ld+json">`.

**ServicePageSchemas** — combines Service + HowTo + FAQPage + Offer for a service page. Takes `slug` and `faqs` props. Renders 3-4 JSON-LD scripts.

```tsx
// src/components/schemas/ServicePageSchemas.tsx
import { buildServiceSchema, buildHowToSchema, buildFAQPageSchema } from '@/lib/seo/schema-factory';

interface ServicePageSchemasProps {
  slug: string;
  faqs: Array<{ question: string; answer: string }>;
}

export function ServicePageSchemas({ slug, faqs }: ServicePageSchemasProps) {
  const serviceSchema = buildServiceSchema(slug);
  const howToSchema = buildHowToSchema(slug);
  const faqSchema = buildFAQPageSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {howToSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
```

**LocationPageSchemas** — combines LocalBusiness (with GeoCircle ServiceArea) + FAQPage. Takes `citySlug` and `faqs`.

**CommercialServiceSchema** — ProfessionalService type with commercial-specific props. Takes `slug` and `faqs`.

All other components follow the same thin-wrapper pattern.

**Step 2: Commit**

```bash
git add src/components/schemas/
git commit -m "feat(seo): 13 new schema components — service, location, article, contact, about, gallery, navigation, webpage, itemlist, reviews, commercial, jobposting, event"
```

---

## Task 5: Rewrite GlobalSchema and layout.tsx

**Files:**
- Modify: `src/components/GlobalSchema.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Rewrite GlobalSchema to use factory**

Replace the entire GlobalSchema component to use `buildOrganizationSchema()`, `buildLocalBusinessSchema()`, `buildWebSiteSchema()` from the factory. Remove all hardcoded business data.

**Step 2: Update layout.tsx**

- Remove the inline `GlobalJsonLd()` function entirely (lines 72-189)
- Import and render `GlobalSchema` from the rewritten component
- Add `NavigationSchema` (SiteNavigationElement) to the `<head>`
- The `<head>` section becomes:
```tsx
<head>
  <GlobalSchema />
  <NavigationSchema />
</head>
```

**Step 3: Commit**

```bash
git add src/components/GlobalSchema.tsx src/app/layout.tsx
git commit -m "refactor(seo): GlobalSchema uses factory, layout.tsx uses centralized schema + navigation"
```

---

## Task 6: Wire Schemas to 14 Residential Service Pages

**Files (14 files to modify):**
- `src/app/services/mowing/MowingContent.tsx`
- `src/app/services/snow-removal/SnowRemovalContent.tsx`
- `src/app/services/leaf-removal/LeafRemovalContent.tsx`
- `src/app/services/gutter-cleaning/GutterCleaningContent.tsx`
- `src/app/services/fertilization/FertilizationContent.tsx`
- `src/app/services/aeration/AerationContent.tsx`
- `src/app/services/fall-cleanup/FallCleanupContent.tsx`
- `src/app/services/spring-cleanup/SpringCleanupContent.tsx`
- `src/app/services/mulching/MulchingContent.tsx`
- `src/app/services/garden-beds/GardenBedsContent.tsx`
- `src/app/services/pruning/PruningContent.tsx`
- `src/app/services/weeding/WeedingContent.tsx`
- `src/app/services/herbicide/HerbicideContent.tsx`
- `src/app/services/gutter-guards/GutterGuardsContent.tsx`

**Step 1: For each service page**

Replace the existing schema imports:
```tsx
// OLD
import { ServiceSchema } from "@/components/ServiceSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

// NEW
import { ServicePageSchemas } from "@/components/schemas/ServicePageSchemas";
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema";
import { WebPageSchema } from "@/components/schemas/WebPageSchema";
```

Replace the old `<ServiceSchema ... />` with:
```tsx
<ServicePageSchemas slug="mowing" faqs={mowingFAQs} />
<WebPageSchema name="Lawn Mowing Service" description="..." url="/services/mowing" />
```

Keep existing `<BreadcrumbSchema>` as-is (just update import path).

Note: Each page already imports its FAQ data (e.g., `mowingFAQs`) for the visual `<ServiceFAQ>` component. We just pass the same data to `ServicePageSchemas` for the JSON-LD.

**Step 2: Commit**

```bash
git add src/app/services/
git commit -m "feat(seo): wire ServicePageSchemas (Service+HowTo+FAQ+Offer) to all 14 service pages"
```

---

## Task 7: Wire Schemas to 12 Location Pages

**Files (12 files to modify):**
- `src/app/locations/madison/MadisonContent.tsx`
- `src/app/locations/middleton/MiddletonContent.tsx`
- `src/app/locations/waunakee/WaunakeeContent.tsx`
- `src/app/locations/monona/MononaContent.tsx`
- `src/app/locations/sun-prairie/SunPrairieContent.tsx`
- `src/app/locations/fitchburg/FitchburgContent.tsx`
- `src/app/locations/verona/VeronaContent.tsx`
- `src/app/locations/mcfarland/McFarlandContent.tsx`
- `src/app/locations/cottage-grove/CottageGroveContent.tsx`
- `src/app/locations/deforest/DeForestContent.tsx`
- `src/app/locations/oregon/OregonContent.tsx`
- `src/app/locations/stoughton/StoughtonContent.tsx`

**Step 1: For each location page**

Replace old schema imports:
```tsx
// OLD
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema } from "@/components/FAQSchema";

// NEW
import { LocationPageSchemas } from "@/components/schemas/LocationPageSchemas";
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema";
import { WebPageSchema } from "@/components/schemas/WebPageSchema";
```

Replace `<LocalBusinessSchema cityName="Madison" />` + `<FAQSchema faqs={[...]} />` with:
```tsx
<LocationPageSchemas citySlug="madison" faqs={[...existing inline faqs...]} />
<WebPageSchema name="Lawn Care in Madison, WI" description="..." url="/locations/madison" />
```

For Madison (which is missing BreadcrumbSchema and FAQSchema), also add:
```tsx
<BreadcrumbSchema items={[
  { name: 'Home', url: 'https://tgyardcare.com' },
  { name: 'Service Areas', url: 'https://tgyardcare.com/service-areas' },
  { name: 'Madison, WI', url: 'https://tgyardcare.com/locations/madison' },
]} />
```

**Step 2: Commit**

```bash
git add src/app/locations/
git commit -m "feat(seo): wire LocationPageSchemas (LocalBusiness+GeoCircle+FAQ) to all 12 location pages"
```

---

## Task 8: Wire Schemas to 8 Commercial Pages

**Files (8 files to modify):**
- `src/app/commercial/CommercialContent.tsx` (hub)
- `src/app/commercial/lawn-care/CommercialLawnCareContent.tsx`
- `src/app/commercial/aeration/CommercialAerationContent.tsx`
- `src/app/commercial/fertilization-weed-control/CommercialFertilizationWeedControlContent.tsx`
- `src/app/commercial/gutters/CommercialGutterServicesContent.tsx`
- `src/app/commercial/property-enhancement/CommercialPropertyEnhancementContent.tsx`
- `src/app/commercial/seasonal/CommercialSeasonalContent.tsx`
- `src/app/commercial/snow-removal/CommercialSnowRemovalContent.tsx`

**Step 1: For each commercial page**

Replace `<ServiceSchema>` with `<CommercialServiceSchema>` + `<WebPageSchema>`. The commercial hub page gets `<ItemListSchema>` listing all 7 sub-services.

**Step 2: Commit**

```bash
git add src/app/commercial/
git commit -m "feat(seo): wire CommercialServiceSchema to all 8 commercial pages"
```

---

## Task 9: Wire Schemas to Standalone Pages

**Files:**
- Modify: `src/app/about/AboutContent.tsx` — add AboutPageSchema + WebPageSchema
- Modify: `src/app/contact/ContactContent.tsx` — replace LocalBusinessSchema with ContactPageSchema + WebPageSchema
- Modify: `src/app/gallery/GalleryContent.tsx` — replace LocalBusinessSchema with GallerySchema + WebPageSchema
- Modify: `src/app/reviews/ReviewsContent.tsx` — replace ReviewSchema with ReviewPageSchema + WebPageSchema
- Modify: `src/app/faq/FAQContent.tsx` — already has FAQSchema, add WebPageSchema
- Modify: `src/app/careers/CareersContent.tsx` — add JobPostingSchema + WebPageSchema
- Modify: `src/app/services/ServicesContent.tsx` — add ItemListSchema + WebPageSchema
- Modify: `src/app/service-areas/ServiceAreasContent.tsx` — replace ServiceSchema with ItemListSchema + WebPageSchema
- Modify: `src/app/HomeContent.tsx` — replace GlobalSchema + WebsiteSchema with WebPageSchema (global schemas now in layout)

**Step 1: Update each page**

Each page gets its specific schema + WebPageSchema. Import from `@/components/schemas/`.

For /about:
```tsx
import { AboutPageSchema } from '@/components/schemas/AboutPageSchema';
import { WebPageSchema } from '@/components/schemas/WebPageSchema';
// In render:
<AboutPageSchema />
<WebPageSchema name="About TotalGuard Yard Care" description="..." url="/about" type="AboutPage" />
```

For /contact:
```tsx
import { ContactPageSchema } from '@/components/schemas/ContactPageSchema';
import { WebPageSchema } from '@/components/schemas/WebPageSchema';
// Replace <LocalBusinessSchema cityName="Madison" /> with:
<ContactPageSchema />
<WebPageSchema name="Contact TotalGuard Yard Care" description="..." url="/contact" type="ContactPage" />
```

For /gallery — build an images array from the existing gallery data and pass to GallerySchema.

For /reviews — ReviewPageSchema uses TOP_REVIEWS from constants + AGGREGATE_RATING.

For /services hub — ItemListSchema listing all 14 services with position numbers.

For /service-areas hub — ItemListSchema listing all 12 cities.

For /careers — JobPostingSchema with general "Lawn Care Technician" and "Crew Leader" postings.

For homepage — Remove GlobalSchema + WebsiteSchema imports (now in layout.tsx). Add only WebPageSchema.

**Step 2: Commit**

```bash
git add src/app/about/ src/app/contact/ src/app/gallery/ src/app/reviews/ src/app/faq/ src/app/careers/ src/app/services/ServicesContent.tsx src/app/service-areas/ src/app/HomeContent.tsx
git commit -m "feat(seo): wire schemas to 9 standalone pages — about, contact, gallery, reviews, faq, careers, services hub, service-areas hub, homepage"
```

---

## Task 10: Wire Schemas to Blog Pages

**Files:**
- Modify: `src/app/blog/BlogContent.tsx` — add ItemListSchema + WebPageSchema
- Modify: `src/app/blog/spring-lawn-care-checklist/SpringLawnCareContent.tsx` — add ArticleSchema + WebPageSchema
- Modify: `src/app/blog/fall-cleanup-importance/FallCleanupImportanceContent.tsx` — add ArticleSchema + WebPageSchema
- Modify: `src/app/blog/[slug]/BlogPostContent.tsx` — add ArticleSchema + WebPageSchema (dynamic)

**Step 1: Add ArticleSchema to each blog post**

```tsx
import { ArticleSchema } from '@/components/schemas/ArticleSchema';
import { WebPageSchema } from '@/components/schemas/WebPageSchema';

// In render:
<ArticleSchema
  title="Spring Lawn Care Checklist for Madison Homeowners"
  description="Complete guide to spring lawn preparation..."
  slug="spring-lawn-care-checklist"
  datePublished="2025-03-15"
  dateModified="2026-03-01"
/>
<WebPageSchema name="Spring Lawn Care Checklist" description="..." url="/blog/spring-lawn-care-checklist" type="Article" />
```

Blog hub gets ItemListSchema listing all posts.

**Step 2: Commit**

```bash
git add src/app/blog/
git commit -m "feat(seo): wire ArticleSchema to all blog pages + ItemList on blog hub"
```

---

## Task 11: Wire Schemas to 3 Legacy Landing Pages

**Files:**
- Modify: `src/app/lawn-care-madison-wi/LawnCareMadisonContent.tsx`
- Modify: `src/app/lawn-care-middleton-wi/LawnCareMiddletonContent.tsx`
- Modify: `src/app/gutter-cleaning-madison-wi/GutterCleaningMadisonContent.tsx`

**Step 1: Update imports to new schema components**

These pages already have ServiceSchema + LocalBusinessSchema + BreadcrumbSchema + FAQSchema. Replace with new factory-based components.

**Step 2: Commit**

```bash
git add src/app/lawn-care-madison-wi/ src/app/lawn-care-middleton-wi/ src/app/gutter-cleaning-madison-wi/
git commit -m "feat(seo): update 3 legacy landing pages to factory-based schemas"
```

---

## Task 12: Move BreadcrumbSchema to schemas/ directory

**Files:**
- Move: `src/components/BreadcrumbSchema.tsx` → `src/components/schemas/BreadcrumbSchema.tsx`

**Step 1: Move file and update to use factory**

The component stays the same but uses `buildBreadcrumbSchema()` from the factory. Keep the same props interface.

**Step 2: Update all imports**

All pages already modified in Tasks 6-11 use the new path. For any remaining pages that import from the old path, update them.

**Step 3: Commit**

```bash
git add src/components/schemas/BreadcrumbSchema.tsx src/components/BreadcrumbSchema.tsx
git commit -m "refactor(seo): move BreadcrumbSchema to schemas/ directory, use factory"
```

---

## Task 13: Delete Old Schema Components

**Files:**
- Delete: `src/components/FAQSchema.tsx`
- Delete: `src/components/ReviewSchema.tsx`
- Delete: `src/components/ServiceSchema.tsx`
- Delete: `src/components/LocalBusinessSchema.tsx`
- Delete: `src/components/WebsiteSchema.tsx`

**Step 1: Verify no imports reference old paths**

```bash
grep -rn "from.*@/components/FAQSchema\|from.*@/components/ReviewSchema\|from.*@/components/ServiceSchema\|from.*@/components/LocalBusinessSchema\|from.*@/components/WebsiteSchema" src/app/ src/components/
```

Should return zero results. If any remain, fix them first.

**Step 2: Delete old files**

```bash
git rm src/components/FAQSchema.tsx src/components/ReviewSchema.tsx src/components/ServiceSchema.tsx src/components/LocalBusinessSchema.tsx src/components/WebsiteSchema.tsx
```

**Step 3: Commit**

```bash
git commit -m "chore(seo): remove old standalone schema components — replaced by schemas/ directory"
```

---

## Task 14: Build Verification

**Step 1: Run TypeScript check**

```bash
cd tgyardcare && npm run build
```

Expected: Build succeeds with zero errors related to schema imports.

**Step 2: Spot-check JSON-LD output**

After build, check a few pages in the `.next` output to verify JSON-LD scripts are present and valid.

**Step 3: Fix any build errors**

Common issues:
- Import paths not updated (grep for old paths)
- TypeScript strict — ensure all props are typed
- `'use client'` may be needed on components that receive dynamic props

**Step 4: Commit any fixes**

```bash
git add -A && git commit -m "fix(seo): resolve build errors from schema migration"
```

---

## Task 15: Push and Deploy

**Step 1: Push to remote**

```bash
git push
```

**Step 2: Verify Vercel deployment succeeds**

Check Vercel dashboard for build success.

**Step 3: Validate with Google Rich Results Test**

Test key pages:
- Homepage: Organization + WebSite + WebPage + Navigation
- /services/mowing: Service + HowTo + FAQPage + BreadcrumbList + WebPage
- /locations/madison: LocalBusiness + ServiceArea + GeoCircle + FAQPage + BreadcrumbList + WebPage
- /reviews: LocalBusiness + AggregateRating + Review[]
- /blog/spring-lawn-care-checklist: Article + WebPage
- /contact: ContactPage + WebPage
- /about: AboutPage + WebPage

---

## Summary

| Task | What | Files | Commit |
|------|------|-------|--------|
| 1 | schema-constants.ts | 1 new | `feat(seo): schema-constants` |
| 2 | Extend schema-config.ts | 1 modified | `feat(seo): pricing + HowTo steps` |
| 3 | schema-factory.ts | 1 new | `feat(seo): 18 builder functions` |
| 4 | 13 new schema components | 13 new | `feat(seo): 13 schema components` |
| 5 | Rewrite GlobalSchema + layout | 2 modified | `refactor(seo): centralized global schema` |
| 6 | 14 service pages | 14 modified | `feat(seo): service page schemas` |
| 7 | 12 location pages | 12 modified | `feat(seo): location page schemas` |
| 8 | 8 commercial pages | 8 modified | `feat(seo): commercial page schemas` |
| 9 | 9 standalone pages | 9 modified | `feat(seo): standalone page schemas` |
| 10 | Blog pages | 4 modified | `feat(seo): blog article schemas` |
| 11 | 3 legacy pages | 3 modified | `feat(seo): legacy page schemas` |
| 12 | Move BreadcrumbSchema | 1 moved | `refactor(seo): move breadcrumb` |
| 13 | Delete old components | 5 deleted | `chore(seo): remove old schemas` |
| 14 | Build verification | 0 | `fix(seo): build fixes` |
| 15 | Push + deploy + validate | 0 | — |

**Total: ~68 files touched, 15 schema types, 15 commits**
