import type { Metadata } from 'next';
import FitchburgContent from './FitchburgContent';

export const metadata: Metadata = {
  title: 'Lawn Care Fitchburg WI — 4.9★ Rated | TotalGuard',
  description: 'Top-rated lawn care in Fitchburg, WI. Mowing, mulching, aeration, gutter cleaning & seasonal cleanups. Same crew weekly. Free quote: (608) 535-6057.',
  keywords: 'Fitchburg lawn care, Fitchburg landscaping, lawn mowing Fitchburg WI, gutter cleaning Fitchburg, mulching Fitchburg',
  alternates: { canonical: 'https://tgyardcare.com/locations/fitchburg' },
  openGraph: {
    title: 'Lawn Care Fitchburg WI — 4.9★ Rated | TotalGuard',
    description: 'Top-rated lawn care in Fitchburg, WI. Mowing, mulching, aeration, gutter cleaning & seasonal cleanups. Same crew weekly. Free quote: (608) 535-6057.',
    url: 'https://tgyardcare.com/locations/fitchburg',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function FitchburgPage() {
  return <FitchburgContent />;
}
