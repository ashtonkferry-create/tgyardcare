import { buildEventSchema } from '@/lib/seo/schema-factory';

interface EventSchemaProps {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  url?: string;
}

export function EventSchema(props: EventSchemaProps) {
  const schema = buildEventSchema(props);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
