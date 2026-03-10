import type { Metadata } from 'next';
import ServiceAreasContent from './ServiceAreasContent';

export const metadata: Metadata = {
  title: 'Lawn Care Service Areas Dane County WI | TotalGuard',
  description: 'Serving 12+ communities across Dane County. Mowing, gutters, cleanups & more. 4.9★ rated. Free quote: (608) 535-6057.',
  keywords: 'lawn care near me Madison WI, landscaping service areas Wisconsin, yard maintenance Middleton, lawn mowing Waunakee, gutter cleaning Madison area',
  alternates: {
    canonical: 'https://tgyardcare.com/service-areas',
  },
  openGraph: {
    title: 'Lawn Care Service Areas Dane County WI | TotalGuard',
    description: 'Serving 12+ communities across Dane County. Mowing, gutters, cleanups & more. 4.9★ rated. Free quote: (608) 535-6057.',
    url: 'https://tgyardcare.com/service-areas',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function ServiceAreasPage() {
  return <ServiceAreasContent />;
}
