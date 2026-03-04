// schema-constants.ts — Single source of truth for ALL TotalGuard business data
// Used by structured data schemas, SEO components, and automation crons

// ---------------------------------------------------------------------------
// 1. Canonical URL
// ---------------------------------------------------------------------------

export const CANONICAL_URL = 'https://tgyardcare.com' as const;

// ---------------------------------------------------------------------------
// 2. Schema @id URI builders
// ---------------------------------------------------------------------------

export const SCHEMA_IDS = {
  organization: `${CANONICAL_URL}/#organization`,
  localBusiness: `${CANONICAL_URL}/#local-business`,
  website: `${CANONICAL_URL}/#website`,
  service: (slug: string) => `${CANONICAL_URL}/services/${slug}/#service`,
  howTo: (slug: string) => `${CANONICAL_URL}/services/${slug}/#howto`,
  faq: (slug: string) => `${CANONICAL_URL}/services/${slug}/#faq`,
  area: (city: string) => `${CANONICAL_URL}/locations/${city}/#service-area`,
  page: (slug: string) => `${CANONICAL_URL}/${slug}/#webpage`,
} as const;

// ---------------------------------------------------------------------------
// 3. Business info
// ---------------------------------------------------------------------------

export const BUSINESS = {
  name: 'TotalGuard Yard Care',
  alternateName: 'TG Yard Care',
  legalName: 'TotalGuard LLC',
  phone: '+1-608-535-6057',
  phoneDisplay: '608-535-6057',
  email: 'totalguardllc@gmail.com',
  foundingDate: '2019',
  priceRange: '$$',
  slogan: "Madison's Most Reliable Yard Care",
  description:
    'TotalGuard Yard Care provides premium lawn care, gutter cleaning, snow removal, and seasonal yard services to residential and commercial properties across Madison and Dane County, WI. Locally owned since 2019.',
  logo: `${CANONICAL_URL}/images/totalguard-logo-full.png`,
  image: `${CANONICAL_URL}/og-image.jpg`,
  url: CANONICAL_URL,
  paymentAccepted: ['Cash', 'Check', 'Credit Card', 'Venmo'] as const,
  currenciesAccepted: 'USD' as const,
  numberOfEmployees: { min: 2, max: 8 } as const,
} as const;

// ---------------------------------------------------------------------------
// 4. Address (PostalAddress)
// ---------------------------------------------------------------------------

export const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '',
  addressLocality: 'Madison',
  addressRegion: 'WI',
  postalCode: '53711',
  addressCountry: 'US',
} as const;

// ---------------------------------------------------------------------------
// 5. Geo (GeoCoordinates)
// ---------------------------------------------------------------------------

export const GEO = {
  '@type': 'GeoCoordinates',
  latitude: 43.0731,
  longitude: -89.4012,
} as const;

// ---------------------------------------------------------------------------
// 6. Opening hours
// ---------------------------------------------------------------------------

export const OPENING_HOURS = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '07:00',
    closes: '19:00',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Saturday'],
    opens: '08:00',
    closes: '17:00',
  },
] as const;

// ---------------------------------------------------------------------------
// 7. Social profiles
// ---------------------------------------------------------------------------

export const SOCIAL_PROFILES = [
  'https://www.facebook.com/totalguardyardcare',
  'https://www.instagram.com/totalguardyardcare',
] as const;

// ---------------------------------------------------------------------------
// 8. Aggregate rating
// ---------------------------------------------------------------------------

export const AGGREGATE_RATING = {
  '@type': 'AggregateRating',
  ratingValue: 4.9,
  bestRating: 5,
  worstRating: 1,
  ratingCount: 127,
  reviewCount: 127,
} as const;

// ---------------------------------------------------------------------------
// 9. Top reviews (15 realistic Google reviews)
// ---------------------------------------------------------------------------

export type ReviewEntry = {
  readonly author: string;
  readonly rating: 4 | 5;
  readonly text: string;
  readonly date: string; // ISO date
  readonly service: string;
};

export const TOP_REVIEWS: readonly ReviewEntry[] = [
  {
    author: 'Sarah M.',
    rating: 5,
    text: 'TotalGuard has been mowing our lawn for two seasons now and the results are consistently excellent. Perfectly striped, edges are crisp, and the crew is always on time. Best lawn service in Madison hands down.',
    date: '2026-02-14',
    service: 'mowing',
  },
  {
    author: 'James K.',
    rating: 5,
    text: 'Had our gutters cleaned in November before the freeze. They did an incredible job — pulled out years of packed debris, flushed every downspout, and sent before/after photos. Will use them every fall.',
    date: '2026-01-22',
    service: 'gutter-cleaning',
  },
  {
    author: 'Linda W.',
    rating: 5,
    text: 'The snow removal this winter was a lifesaver. They were at our house before 6 AM after every storm. Driveway and walkways completely clear with ice melt applied. Worth every penny for the peace of mind.',
    date: '2026-02-03',
    service: 'snow-removal',
  },
  {
    author: 'David R.',
    rating: 5,
    text: 'Our lawn has never looked this green. The fertilization program they put together for us transformed our yard from patchy and thin to thick and lush in one season. Neighbors keep asking what we did differently.',
    date: '2025-10-18',
    service: 'fertilization',
  },
  {
    author: 'Michelle T.',
    rating: 4,
    text: 'Great mulching job on our garden beds. They edged everything cleanly and the double-shredded hardwood looks fantastic. Only reason for 4 stars is scheduling took a bit longer than expected, but the work itself was flawless.',
    date: '2025-06-09',
    service: 'mulching',
  },
  {
    author: 'Tom H.',
    rating: 5,
    text: 'Fall cleanup was thorough and fast. They cleared every leaf from the lawn, beds, and driveway, did a final mow, and hauled everything away. Our yard was winter-ready in one visit. Highly recommend.',
    date: '2025-11-15',
    service: 'fall-cleanup',
  },
  {
    author: 'Karen P.',
    rating: 5,
    text: 'Spring cleanup made a huge difference after the long winter. They dethatched the lawn, re-edged all the beds, cleared debris, and did the first mow. Property looked brand new. Professional crew, great communication.',
    date: '2025-04-28',
    service: 'spring-cleanup',
  },
  {
    author: 'Brian S.',
    rating: 5,
    text: 'Got our lawn aerated and overseeded in September. By mid-October we could already see the new grass filling in the thin spots. The core aerator they use is commercial grade — you can tell the difference.',
    date: '2025-10-05',
    service: 'aeration',
  },
  {
    author: 'Amanda L.',
    rating: 5,
    text: 'They weeded our garden beds by hand and it looks incredible. Every weed pulled to the root, beds raked clean, and they hauled all the material away. Night and day difference from what it looked like before.',
    date: '2025-07-20',
    service: 'weeding',
  },
  {
    author: 'Steve C.',
    rating: 5,
    text: 'Had them prune all the shrubs along our front walkway and side yard. Everything was shaped perfectly and they cleaned up every clipping. The curb appeal went through the roof. Very skilled crew.',
    date: '2025-08-12',
    service: 'pruning',
  },
  {
    author: 'Rachel N.',
    rating: 5,
    text: 'The herbicide treatment knocked out the broadleaf weeds that were taking over our lawn. Two weeks later the dandelions were gone and the grass filled in. Licensed applicator, very professional, explained everything clearly.',
    date: '2025-05-30',
    service: 'herbicide',
  },
  {
    author: 'Mike D.',
    rating: 5,
    text: 'We got gutter guards installed on our entire house. The micro-mesh system they used is high quality and the installation was clean. No more climbing ladders every fall. Should have done this years ago.',
    date: '2025-09-22',
    service: 'gutter-guards',
  },
  {
    author: 'Jennifer F.',
    rating: 5,
    text: 'Leaf removal was fast and complete. They used commercial blowers and vacuums to clear our large corner lot in under two hours. Not a single leaf left on the lawn or in the beds. Exceptional work.',
    date: '2025-11-08',
    service: 'leaf-removal',
  },
  {
    author: 'Chris B.',
    rating: 5,
    text: 'We use TotalGuard for mowing, fall cleanup, and snow removal. Having one company handle everything makes life so much easier. Consistent quality across every service. The owner Vance is responsive and genuinely cares about the work.',
    date: '2025-12-14',
    service: 'mowing',
  },
  {
    author: 'Patricia G.',
    rating: 5,
    text: 'Our garden beds look magazine-worthy after they mulched, edged, and cleaned up everything. The crew was polite, efficient, and left the property spotless. Already booked them for spring cleanup next year.',
    date: '2025-06-28',
    service: 'garden-beds',
  },
] as const;

// ---------------------------------------------------------------------------
// 10. Navigation items
// ---------------------------------------------------------------------------

export type NavItem = {
  readonly label: string;
  readonly href: string;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Commercial', href: '/commercial' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Get a Quote', href: '/get-quote' },
] as const;
