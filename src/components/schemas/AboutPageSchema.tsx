import { buildAboutPageSchema } from '@/lib/seo/schema-factory';

export function AboutPageSchema() {
  const schema = buildAboutPageSchema();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
