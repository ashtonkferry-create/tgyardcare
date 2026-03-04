import { createClient } from '@supabase/supabase-js';
import { BASE_URL, ORG_ID, ALL_CITIES, SERVICE_CONFIGS } from '@/lib/seo/schema-config';

// Server Component — renders Service + HowTo JSON-LD for a service page.
// Service schema: built from static config (immediate, no DB).
// HowTo schema: fetched from page_seo.howto_schema (populated by schema-generator cron).
export default async function ServiceSchema({ slug }: { slug: string }) {
  const config = SERVICE_CONFIGS[slug];
  if (!config) return null;

  const pageUrl = `${BASE_URL}/services/${slug}`;

  // Service schema (always present)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: `${config.name} - Madison WI`,
    description: config.longDescription,
    url: pageUrl,
    provider: { '@id': ORG_ID },
    areaServed: ALL_CITIES.map((city) => ({
      '@type': 'City',
      name: city,
      containedInPlace: { '@type': 'State', name: 'Wisconsin' },
    })),
    offers: {
      '@type': 'Offer',
      url: pageUrl,
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        description: 'Free estimate. Pricing based on property size.',
      },
      availability: 'https://schema.org/InStock',
      seller: { '@id': ORG_ID },
    },
    termsOfService: `${BASE_URL}/terms`,
    serviceOutput: {
      '@type': 'Thing',
      name: `${config.name} completed to professional standard`,
    },
  };

  // WebPage schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${config.name} | TG Yard Care`,
    description: config.description,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${pageUrl}#service` },
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US',
  };

  // HowTo schema — fetched from DB (populated by schema-generator cron)
  let howtoSchema: unknown = null;
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data } = await supabase
      .from('page_seo')
      .select('howto_schema')
      .eq('path', `/services/${slug}`)
      .single();
    if (data) {
      howtoSchema = (data as { howto_schema: unknown }).howto_schema ?? null;
    }
  } catch {
    // No howto schema yet — cron hasn't run. That's fine.
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {howtoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoSchema) }}
        />
      )}
    </>
  );
}
