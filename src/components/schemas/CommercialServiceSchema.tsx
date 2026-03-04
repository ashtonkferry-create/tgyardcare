import {
  buildServiceSchema,
  buildFAQPageSchema,
} from '@/lib/seo/schema-factory';

interface FAQ {
  question: string;
  answer: string;
}

interface CommercialServiceSchemaProps {
  slug: string;
  faqs: FAQ[];
}

export function CommercialServiceSchema({ slug, faqs }: CommercialServiceSchemaProps) {
  const serviceSchema = buildServiceSchema(slug);
  const faqSchema = faqs.length > 0 ? buildFAQPageSchema(faqs) : null;

  return (
    <>
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
