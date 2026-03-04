// schema-factory.ts — 18 JSON-LD builder functions for TotalGuard structured data
// Returns plain objects; React components wrap these in <script type="application/ld+json">

import {
  CANONICAL_URL,
  SCHEMA_IDS,
  BUSINESS,
  ADDRESS,
  GEO,
  OPENING_HOURS,
  SOCIAL_PROFILES,
  AGGREGATE_RATING,
  NAV_ITEMS,
  TOP_REVIEWS,
  type ReviewEntry,
} from './schema-constants';

import {
  ALL_CITIES,
  SERVICE_CONFIGS,
  LOCATION_CONFIGS,
  type ServiceSchemaConfig,
  type LocationSchemaConfig,
} from './schema-config';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const orgRef = { '@id': SCHEMA_IDS.organization } as const;
const websiteRef = { '@id': SCHEMA_IDS.website } as const;

function url(path: string): string {
  return `${CANONICAL_URL}${path}`;
}

// ---------------------------------------------------------------------------
// Schema types (return-type contracts — no `any`)
// ---------------------------------------------------------------------------

interface SchemaBase {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: unknown;
}

interface WithId {
  '@id': string;
}

type JsonLd = SchemaBase & Partial<WithId>;

// ---------------------------------------------------------------------------
// 1. Organization
// ---------------------------------------------------------------------------

export function buildOrganizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': SCHEMA_IDS.organization,
    name: BUSINESS.name,
    alternateName: BUSINESS.alternateName,
    legalName: BUSINESS.legalName,
    url: BUSINESS.url,
    logo: BUSINESS.logo,
    image: BUSINESS.image,
    description: BUSINESS.description,
    slogan: BUSINESS.slogan,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    foundingDate: BUSINESS.foundingDate,
    address: { ...ADDRESS },
    geo: { ...GEO },
    areaServed: ALL_CITIES.map((city) => ({
      '@type': 'City',
      name: `${city}, WI`,
    })),
    sameAs: [...SOCIAL_PROFILES],
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: BUSINESS.numberOfEmployees.min,
      maxValue: BUSINESS.numberOfEmployees.max,
    },
  };
}

// ---------------------------------------------------------------------------
// 2. Local Business
// ---------------------------------------------------------------------------

export function buildLocalBusinessSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'LandscapingBusiness',
    '@id': SCHEMA_IDS.localBusiness,
    name: BUSINESS.name,
    url: BUSINESS.url,
    logo: BUSINESS.logo,
    image: BUSINESS.image,
    description: BUSINESS.description,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    address: { ...ADDRESS },
    geo: { ...GEO },
    openingHoursSpecification: [...OPENING_HOURS],
    aggregateRating: { ...AGGREGATE_RATING },
    paymentAccepted: [...BUSINESS.paymentAccepted],
    currenciesAccepted: BUSINESS.currenciesAccepted,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Yard Care Services',
      itemListElement: Object.entries(SERVICE_CONFIGS).map(
        ([slug, config]) => ({
          '@type': 'OfferCatalog',
          name: config.name,
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                '@id': SCHEMA_IDS.service(slug),
                name: config.name,
                description: config.description,
                url: url(`/services/${slug}`),
              },
            },
          ],
        })
      ),
    },
  };
}

// ---------------------------------------------------------------------------
// 3. WebSite
// ---------------------------------------------------------------------------

export function buildWebSiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SCHEMA_IDS.website,
    name: BUSINESS.name,
    url: CANONICAL_URL,
    description: BUSINESS.description,
    publisher: orgRef,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${CANONICAL_URL}/services?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ---------------------------------------------------------------------------
// 4. Service (per slug)
// ---------------------------------------------------------------------------

export function buildServiceSchema(slug: string): JsonLd | null {
  const config: ServiceSchemaConfig | undefined = SERVICE_CONFIGS[slug];
  if (!config) return null;

  const schema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SCHEMA_IDS.service(slug),
    name: config.name,
    description: config.longDescription,
    url: url(`/services/${slug}`),
    provider: orgRef,
    areaServed: ALL_CITIES.map((city) => ({
      '@type': 'City',
      name: `${city}, WI`,
    })),
    serviceType: config.name,
    category: 'Yard Care',
  };

  if (config.priceRange) {
    schema.offers = {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        minPrice: config.priceRange.low,
        maxPrice: config.priceRange.high,
        unitText: config.priceRange.unit,
      },
      availability: 'https://schema.org/InStock',
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: url('/get-quote'),
        servicePhone: {
          '@type': 'ContactPoint',
          telephone: BUSINESS.phone,
          contactType: 'sales',
        },
      },
    };
  }

  return schema;
}

// ---------------------------------------------------------------------------
// 5. HowTo (per service slug)
// ---------------------------------------------------------------------------

export function buildHowToSchema(slug: string): JsonLd | null {
  const config: ServiceSchemaConfig | undefined = SERVICE_CONFIGS[slug];
  if (!config?.howToSteps?.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': SCHEMA_IDS.howTo(slug),
    name: `How ${BUSINESS.name} Provides ${config.name}`,
    description: config.description,
    totalTime: 'PT1H',
    supply: [],
    tool: [],
    step: config.howToSteps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
      url: url(`/services/${slug}#step-${i + 1}`),
    })),
  };
}

// ---------------------------------------------------------------------------
// 6. FAQPage
// ---------------------------------------------------------------------------

export function buildFAQPageSchema(
  faqs: ReadonlyArray<{ question: string; answer: string }>
): JsonLd {
  return {
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
}

// ---------------------------------------------------------------------------
// 7. BreadcrumbList
// ---------------------------------------------------------------------------

export function buildBreadcrumbSchema(
  items: ReadonlyArray<{ name: string; url: string }>
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ---------------------------------------------------------------------------
// 8. Location (per city slug)
// ---------------------------------------------------------------------------

export function buildLocationSchema(citySlug: string): JsonLd | null {
  const config: LocationSchemaConfig | undefined = LOCATION_CONFIGS[citySlug];
  if (!config) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': SCHEMA_IDS.area(citySlug),
    name: `${BUSINESS.name} — ${config.displayName}`,
    url: url(`/locations/${citySlug}`),
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    image: BUSINESS.image,
    priceRange: BUSINESS.priceRange,
    address: {
      '@type': 'PostalAddress',
      addressLocality: config.city,
      addressRegion: config.state,
      postalCode: config.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: config.lat,
      longitude: config.lng,
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: config.lat,
        longitude: config.lng,
      },
      geoRadius: {
        '@type': 'Distance',
        value: config.radius,
        unitCode: 'SMI',
      },
    },
    aggregateRating: { ...AGGREGATE_RATING },
    parentOrganization: orgRef,
  };
}

// ---------------------------------------------------------------------------
// 9. Article / BlogPosting
// ---------------------------------------------------------------------------

interface ArticleProps {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}

export function buildArticleSchema(props: ArticleProps): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: props.title,
    description: props.description,
    url: url(`/blog/${props.slug}`),
    datePublished: props.datePublished,
    dateModified: props.dateModified,
    image: props.image ?? BUSINESS.image,
    author: orgRef,
    publisher: {
      '@id': SCHEMA_IDS.organization,
      '@type': 'Organization',
      name: BUSINESS.name,
      logo: {
        '@type': 'ImageObject',
        url: BUSINESS.logo,
      },
    },
    isPartOf: websiteRef,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url(`/blog/${props.slug}`),
    },
  };
}

// ---------------------------------------------------------------------------
// 10. Review (LocalBusiness with AggregateRating + individual reviews)
// ---------------------------------------------------------------------------

export function buildReviewSchema(
  reviews: ReadonlyArray<ReviewEntry>
): JsonLd {
  const capped = reviews.slice(0, 15);
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': SCHEMA_IDS.localBusiness,
    name: BUSINESS.name,
    url: BUSINESS.url,
    aggregateRating: { ...AGGREGATE_RATING },
    review: capped.map((r) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: r.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.text,
      datePublished: r.date,
    })),
  };
}

// ---------------------------------------------------------------------------
// 11. Navigation (ItemList with SiteNavigationElement)
// ---------------------------------------------------------------------------

export function buildNavigationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Site Navigation',
    itemListElement: NAV_ITEMS.map((item, i) => ({
      '@type': 'SiteNavigationElement',
      position: i + 1,
      name: item.label,
      url: url(item.href),
    })),
  };
}

// ---------------------------------------------------------------------------
// 12. WebPage
// ---------------------------------------------------------------------------

interface WebPageProps {
  name: string;
  description: string;
  url: string;
  type?: string;
}

export function buildWebPageSchema(props: WebPageProps): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': props.type ?? 'WebPage',
    name: props.name,
    description: props.description,
    url: props.url,
    isPartOf: websiteRef,
    publisher: orgRef,
  };
}

// ---------------------------------------------------------------------------
// 13. ItemList (generic)
// ---------------------------------------------------------------------------

interface ListItemProps {
  name: string;
  url: string;
  position: number;
}

export function buildItemListSchema(
  items: ReadonlyArray<ListItemProps>
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: item.url,
    })),
  };
}

// ---------------------------------------------------------------------------
// 14. ContactPage
// ---------------------------------------------------------------------------

export function buildContactPageSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${BUSINESS.name}`,
    description: `Get in touch with ${BUSINESS.name} for a free lawn care quote in Madison and Dane County, WI.`,
    url: url('/contact'),
    isPartOf: websiteRef,
    mainEntity: {
      '@id': SCHEMA_IDS.organization,
      '@type': 'Organization',
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      email: BUSINESS.email,
      address: { ...ADDRESS },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: BUSINESS.phone,
        email: BUSINESS.email,
        contactType: 'customer service',
        availableLanguage: 'English',
        areaServed: 'US',
      },
    },
  };
}

// ---------------------------------------------------------------------------
// 15. AboutPage
// ---------------------------------------------------------------------------

export function buildAboutPageSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${BUSINESS.name}`,
    description: BUSINESS.description,
    url: url('/about'),
    isPartOf: websiteRef,
    mainEntity: {
      '@id': SCHEMA_IDS.organization,
      '@type': 'Organization',
      name: BUSINESS.name,
      foundingDate: BUSINESS.foundingDate,
      description: BUSINESS.description,
      address: { ...ADDRESS },
      areaServed: ALL_CITIES.map((city) => ({
        '@type': 'City',
        name: `${city}, WI`,
      })),
    },
  };
}

// ---------------------------------------------------------------------------
// 16. ImageGallery
// ---------------------------------------------------------------------------

interface GalleryImage {
  url: string;
  caption: string;
}

export function buildGallerySchema(
  images: ReadonlyArray<GalleryImage>
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `${BUSINESS.name} Work Gallery`,
    description: `Before and after photos of yard care services by ${BUSINESS.name} in Madison, WI.`,
    url: url('/gallery'),
    isPartOf: websiteRef,
    image: images.map((img) => ({
      '@type': 'ImageObject',
      contentUrl: img.url,
      caption: img.caption,
      creditText: BUSINESS.name,
    })),
  };
}

// ---------------------------------------------------------------------------
// 17. JobPosting
// ---------------------------------------------------------------------------

interface JobPostingProps {
  title: string;
  description: string;
  datePosted: string;
}

export function buildJobPostingSchema(props: JobPostingProps): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: props.title,
    description: props.description,
    datePosted: props.datePosted,
    employmentType: 'FULL_TIME',
    jobLocation: {
      '@type': 'Place',
      address: { ...ADDRESS },
    },
    hiringOrganization: {
      '@id': SCHEMA_IDS.organization,
      '@type': 'Organization',
      name: BUSINESS.name,
      sameAs: BUSINESS.url,
      logo: BUSINESS.logo,
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: {
        '@type': 'QuantitativeValue',
        unitText: 'HOUR',
      },
    },
  };
}

// ---------------------------------------------------------------------------
// 18. Event
// ---------------------------------------------------------------------------

interface EventProps {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  url?: string;
}

export function buildEventSchema(props: EventProps): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: props.name,
    description: props.description,
    startDate: props.startDate,
    endDate: props.endDate,
    url: props.url ?? BUSINESS.url,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: `${BUSINESS.name} Service Area`,
      address: { ...ADDRESS },
    },
    organizer: {
      '@id': SCHEMA_IDS.organization,
      '@type': 'Organization',
      name: BUSINESS.name,
      url: BUSINESS.url,
    },
  };
}
