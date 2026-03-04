import { buildWebPageSchema } from '@/lib/seo/schema-factory';

interface WebPageSchemaProps {
  name: string;
  description: string;
  url: string;
  type?: string;
}

export function WebPageSchema(props: WebPageSchemaProps) {
  const schema = buildWebPageSchema(props);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
