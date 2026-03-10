import type { Metadata } from 'next';
import VeronaContent from './VeronaContent';

export const metadata: Metadata = {
  title: 'Lawn Care Verona WI — 4.9★ Rated | TotalGuard',
  description: 'Top-rated lawn care in Verona, WI. Mowing, mulching, aeration, gutter cleaning & seasonal cleanups. Same crew weekly. Free quote: (608) 535-6057.',
  keywords: 'Verona lawn care, Verona landscaping, lawn mowing Verona WI, gutter cleaning Verona, mulching Verona',
  alternates: { canonical: 'https://tgyardcare.com/locations/verona' },
  openGraph: {
    title: 'Lawn Care Verona WI — 4.9★ Rated | TotalGuard',
    description: 'Top-rated lawn care in Verona, WI. Mowing, mulching, aeration, gutter cleaning & seasonal cleanups. Same crew weekly. Free quote: (608) 535-6057.',
    url: 'https://tgyardcare.com/locations/verona',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function VeronaPage() {
  return <VeronaContent />;
}
