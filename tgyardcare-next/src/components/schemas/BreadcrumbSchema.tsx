import { BASE_URL, BREADCRUMB_NAMES } from '@/lib/seo/schema-config';

// Pure Server Component — derives BreadcrumbList schema from URL path.
// No DB calls. Works for any page. Instantly improves SEO trust signals.
export default function BreadcrumbSchema({ path }: { path: string }) {
  const segments = path.split('/').filter(Boolean);

  const items = [
    { name: 'Home', item: BASE_URL },
    ...segments.map((seg, i) => ({
      name:
        BREADCRUMB_NAMES[seg] ??
        seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      item: `${BASE_URL}/${segments.slice(0, i + 1).join('/')}`,
    })),
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.item,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
