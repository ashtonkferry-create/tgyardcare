import type { Metadata } from 'next';
import LeafRemovalContent from './LeafRemovalContent';

export const metadata: Metadata = {
  title: 'Leaf Removal Madison WI — 4.9★ Rated | TotalGuard',
  description: 'Fast leaf removal in Madison & Dane County. Hauling included. Residential & commercial. Free quote: (608) 535-6057.',
  keywords: 'leaf removal Madison WI, fall leaf cleanup Middleton, autumn yard cleanup Waunakee, Sun Prairie leaf service, Dane County fall cleanup, leaf hauling',
  alternates: { canonical: 'https://tgyardcare.com/services/leaf-removal' },
  openGraph: {
    title: 'Leaf Removal Madison WI — 4.9★ Rated | TotalGuard',
    description: 'Fast leaf removal in Madison & Dane County. Hauling included. Residential & commercial. Free quote: (608) 535-6057.',
    url: 'https://tgyardcare.com/services/leaf-removal',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function LeafRemovalPage() {
  return <LeafRemovalContent />;
}
