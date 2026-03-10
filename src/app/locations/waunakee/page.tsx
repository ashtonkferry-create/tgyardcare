import type { Metadata } from 'next';
import WaunakeeContent from './WaunakeeContent';

export const metadata: Metadata = {
  title: 'Lawn Care Waunakee WI — 4.9★ Rated | TotalGuard',
  description: 'Top-rated lawn care in Waunakee, WI. Mowing, mulching, aeration, gutter cleaning & seasonal cleanups. Same crew weekly. Free quote: (608) 535-6057.',
  keywords: 'Waunakee lawn care, Waunakee landscaping, lawn mowing Waunakee WI, gutter cleaning Waunakee',
  alternates: { canonical: 'https://tgyardcare.com/locations/waunakee' },
  openGraph: {
    title: 'Lawn Care Waunakee WI — 4.9★ Rated | TotalGuard',
    description: 'Top-rated lawn care in Waunakee, WI. Mowing, mulching, aeration, gutter cleaning & seasonal cleanups. Same crew weekly. Free quote: (608) 535-6057.',
    url: 'https://tgyardcare.com/locations/waunakee',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function WaunakeePage() {
  return <WaunakeeContent />;
}
