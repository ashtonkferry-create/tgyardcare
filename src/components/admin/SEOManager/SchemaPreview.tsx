'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PageSEO } from '@/hooks/useSEOData';
import { Code } from 'lucide-react';

interface SchemaPreviewProps {
  page: PageSEO | null;
}

const CANONICAL_DOMAIN = 'https://tgyardcare.com';

export function SchemaPreview({ page }: SchemaPreviewProps) {
  const schema = useMemo(() => {
    if (!page) return null;

    const baseSchema = {
      "@context": "https://schema.org",
      "@type": page.schema_type,
      "name": page.seo_title || page.page_name,
      "url": `${CANONICAL_DOMAIN}${page.page_path}`,
      "description": page.meta_description || '',
    };

    switch (page.schema_type) {
      case 'LocalBusiness':
        return {
          ...baseSchema,
          "@type": "LocalBusiness",
          "image": page.og_image || `${CANONICAL_DOMAIN}/og-image.png`,
          "telephone": "+1-608-535-6057",
          "email": "totalguardllc@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Madison",
            "addressRegion": "WI",
            "addressCountry": "US"
          },
          "priceRange": "$$",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "127"
          }
        };

      case 'Service':
        return {
          ...baseSchema,
          "@type": "Service",
          "provider": {
            "@type": "LocalBusiness",
            "@id": `${CANONICAL_DOMAIN}/#organization`,
            "name": "TotalGuard Yard Care"
          },
          "areaServed": {
            "@type": "City",
            "name": "Madison",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "WI"
            }
          }
        };

      case 'FAQPage':
        return {
          ...baseSchema,
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Example FAQ question",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Example answer text"
              }
            }
          ]
        };

      case 'Article':
        return {
          ...baseSchema,
          "@type": "Article",
          "author": {
            "@type": "Organization",
            "name": "TotalGuard Yard Care"
          },
          "publisher": {
            "@type": "Organization",
            "name": "TotalGuard Yard Care",
            "logo": {
              "@type": "ImageObject",
              "url": `${CANONICAL_DOMAIN}/lovable-uploads/785f87d1-0deb-4f52-bb55-562cc863177a.webp`
            }
          },
          "datePublished": page.created_at,
          "dateModified": page.updated_at
        };

      case 'Organization':
        return {
          ...baseSchema,
          "@type": "Organization",
          "logo": `${CANONICAL_DOMAIN}/lovable-uploads/785f87d1-0deb-4f52-bb55-562cc863177a.webp`,
          "sameAs": [
            "https://facebook.com/totalguardyardcare",
            "https://www.instagram.com/totalguardyardcare"
          ]
        };

      default:
        return baseSchema;
    }
  }, [page]);

  if (!page) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Code className="h-4 w-4" />
            Schema Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Expand a row to see schema preview
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Code className="h-4 w-4" />
          Schema Preview: {page.page_name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto">
            {JSON.stringify(schema, null, 2)}
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
