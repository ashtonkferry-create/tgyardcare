import { buildItemListSchema } from '@/lib/seo/schema-factory';

interface ListItem {
  name: string;
  url: string;
  position: number;
}

interface ItemListSchemaProps {
  items: ListItem[];
}

export function ItemListSchema({ items }: ItemListSchemaProps) {
  const schema = buildItemListSchema(items);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
