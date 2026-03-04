import { buildContactPageSchema } from '@/lib/seo/schema-factory';

export function ContactPageSchema() {
  const schema = buildContactPageSchema();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
