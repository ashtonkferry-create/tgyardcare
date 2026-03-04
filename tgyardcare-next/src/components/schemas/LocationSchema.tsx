import { BASE_URL, ORG_ID, LOCATION_CONFIGS } from '@/lib/seo/schema-config';

// Server Component — renders LocalBusiness + ServiceArea + WebPage JSON-LD for a location page.
// Pure static from config — no DB calls needed. Immediately geo-targets each city.
export default function LocationSchema({ slug }: { slug: string }) {
  const config = LOCATION_CONFIGS[slug];
  if (!config) return null;

  const pageUrl = `${BASE_URL}/locations/${slug}`;

  // Localized LocalBusiness schema — geo-targets the specific city
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${pageUrl}#business`,
    name: `TG Yard Care - ${config.city}, WI`,
    description: `Professional lawn care and landscaping in ${config.city}, Wisconsin. Mowing, mulching, gutter cleaning, seasonal cleanup, and more. 4.9★ rated, locally trusted since 2019.`,
    url: pageUrl,
    telephone: '+1-608-535-6057',
    email: 'totalguardllc@gmail.com',
    image: `${BASE_URL}/images/totalguard-logo-full.png`,
    logo: `${BASE_URL}/images/totalguard-logo-full.png`,
    parentOrganization: { '@id': ORG_ID },
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
      geoRadius: `${config.radius * 1609}`, // convert miles to meters
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '16:00',
      },
    ],
    priceRange: '$$',
    sameAs: [
      'https://facebook.com/totalguardyardcare',
      'https://instagram.com/tgyardcare',
    ],
  };

  // ServiceArea schema — explicitly declares city served
  const serviceAreaSchema = {
    '@context': 'https://schema.org',
    '@type': 'ServiceArea',
    name: `${config.city}, ${config.state} Lawn Care Service Area`,
    description: `TG Yard Care serves ${config.city} and surrounding ${config.county} County neighborhoods with professional lawn care, landscaping, and seasonal services.`,
    provider: { '@id': ORG_ID },
    areaServed: {
      '@type': 'City',
      name: config.city,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: `${config.county} County`,
        containedInPlace: { '@type': 'State', name: 'Wisconsin' },
      },
    },
  };

  // WebPage schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: `Lawn Care ${config.city} WI | TG Yard Care`,
    description: `Top-rated lawn care in ${config.city}, WI. Professional mowing, mulching, gutter cleaning & seasonal services. 4.9★ rating.`,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${pageUrl}#business` },
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.speakable'],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceAreaSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </>
  );
}
