import {
  buildLocationSchema,
  buildFAQPageSchema,
} from '@/lib/seo/schema-factory';

interface FAQ {
  question: string;
  answer: string;
}

interface LocationPageSchemasProps {
  citySlug: string;
  faqs: FAQ[];
}

export function LocationPageSchemas({ citySlug, faqs }: LocationPageSchemasProps) {
  const locationSchema = buildLocationSchema(citySlug);
  const faqSchema = faqs.length > 0 ? buildFAQPageSchema(faqs) : null;

  return (
    <>
      {locationSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
