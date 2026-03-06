import type { Metadata } from 'next';
import ServiceAreasContent from './ServiceAreasContent';

export const metadata: Metadata = {
  title: 'Service Areas Madison WI | 12+ Communities | TG Yard Care',
  description: 'TotalGuard serves 12+ communities in Madison WI metro. Mowing, gutters, cleanups & more. Free quotes!',
  keywords: 'lawn care near me Madison WI, landscaping service areas Wisconsin, yard maintenance Middleton, lawn mowing Waunakee, gutter cleaning Madison area',
  alternates: {
    canonical: 'https://tgyardcare.com/service-areas',
  },
  openGraph: {
    title: 'Service Areas Madison WI | 12+ Communities | TG Yard Care',
    description: 'TotalGuard serves 12+ communities in Madison WI metro. Mowing, gutters, cleanups & more. Free quotes!',
    url: 'https://tgyardcare.com/service-areas',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function ServiceAreasPage() {
  return <ServiceAreasContent />;
}
