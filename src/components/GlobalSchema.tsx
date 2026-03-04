import {
  buildOrganizationSchema,
  buildLocalBusinessSchema,
  buildWebSiteSchema,
} from '@/lib/seo/schema-factory';

/**
 * GlobalSchema — sitewide Organization, LocalBusiness, and WebSite structured data.
 * Included once in layout.tsx <head>. All data comes from the centralized schema factory.
 */
export function GlobalSchema() {
  const organization = buildOrganizationSchema();
  const localBusiness = buildLocalBusinessSchema();
  const website = buildWebSiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
