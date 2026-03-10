import type { Metadata } from 'next';
import MiddletonContent from './MiddletonContent';

export const metadata: Metadata = {
  title: 'Lawn Care Middleton WI — 4.9★ Rated | TotalGuard',
  description: 'Top-rated lawn care in Middleton, WI. Mowing, mulching, aeration, gutter cleaning & seasonal cleanups. Same crew weekly. Free quote: (608) 535-6057.',
  keywords: 'Middleton lawn care, Middleton landscaping, lawn mowing Middleton WI, gutter cleaning Middleton, mulching Middleton',
  alternates: { canonical: 'https://tgyardcare.com/locations/middleton' },
  openGraph: {
    title: 'Lawn Care Middleton WI — 4.9★ Rated | TotalGuard',
    description: 'Top-rated lawn care in Middleton, WI. Mowing, mulching, aeration, gutter cleaning & seasonal cleanups. Same crew weekly. Free quote: (608) 535-6057.',
    url: 'https://tgyardcare.com/locations/middleton',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function MiddletonPage() {
  return <MiddletonContent />;
}
