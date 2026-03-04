import {
  buildServiceSchema,
  buildHowToSchema,
  buildFAQPageSchema,
} from '@/lib/seo/schema-factory';

interface FAQ {
  question: string;
  answer: string;
}

interface ServicePageSchemasProps {
  slug: string;
  faqs: FAQ[];
}

export function ServicePageSchemas({ slug, faqs }: ServicePageSchemasProps) {
  const serviceSchema = buildServiceSchema(slug);
  const howToSchema = buildHowToSchema(slug);
  const faqSchema = faqs.length > 0 ? buildFAQPageSchema(faqs) : null;

  return (
    <>
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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
