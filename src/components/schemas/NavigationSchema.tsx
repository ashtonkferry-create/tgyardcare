import { buildNavigationSchema } from '@/lib/seo/schema-factory';

export function NavigationSchema() {
  const schema = buildNavigationSchema();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
