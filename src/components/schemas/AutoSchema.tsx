'use client';

import { usePathname } from 'next/navigation';
import { buildWebPageSchema, buildBreadcrumbSchema } from '@/lib/seo/schema-factory';

/**
 * AutoSchema — automatically generates WebPage + BreadcrumbList structured data
 * for every page based on the current pathname.
 *
 * Included once in layout.tsx. Pages that manually include their own
 * WebPageSchema or BreadcrumbSchema will have both (Google merges duplicates
 * gracefully — the more-specific manual one wins).
 *
 * This ensures NEW pages always have baseline schema coverage with zero effort.
 */

const CANONICAL = 'https://tgyardcare.com';

/** Convert a URL segment to a readable title */
function segmentToTitle(segment: string): string {
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Build breadcrumb items from pathname */
function buildBreadcrumbs(pathname: string): Array<{ name: string; url: string }> {
  if (pathname === '/') {
    return [{ name: 'Home', url: CANONICAL }];
  }

  const segments = pathname.split('/').filter(Boolean);
  const items: Array<{ name: string; url: string }> = [
    { name: 'Home', url: CANONICAL },
  ];

  let path = '';
  for (const segment of segments) {
    path += `/${segment}`;
    items.push({
      name: segmentToTitle(segment),
      url: `${CANONICAL}${path}`,
    });
  }

  return items;
}

/** Derive a page title from the pathname */
function deriveTitle(pathname: string): string {
  if (pathname === '/') return 'Home';
  const segments = pathname.split('/').filter(Boolean);
  const last = segments[segments.length - 1];
  return segmentToTitle(last);
}

/** Derive a page description from the pathname */
function deriveDescription(pathname: string): string {
  const title = deriveTitle(pathname);
  if (pathname === '/') {
    return 'Professional lawn care and landscaping services in Madison, WI';
  }
  return `${title} — TotalGuard Yard Care, Madison WI`;
}

export function AutoSchema() {
  const pathname = usePathname();

  // Skip admin pages — no public schema needed
  if (pathname.startsWith('/admin')) return null;

  const breadcrumbs = buildBreadcrumbs(pathname);
  const webPage = buildWebPageSchema({
    name: deriveTitle(pathname),
    description: deriveDescription(pathname),
    url: `${CANONICAL}${pathname === '/' ? '' : pathname}`,
  });
  const breadcrumb = buildBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
