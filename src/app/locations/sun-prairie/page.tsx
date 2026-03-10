import type { Metadata } from 'next';
import SunPrairieContent from './SunPrairieContent';

export const metadata: Metadata = {
  title: 'Lawn Care Sun Prairie WI — 4.9★ Rated | TotalGuard',
  description: 'Top-rated lawn care in Sun Prairie, WI. Mowing, mulching, aeration, gutter cleaning & seasonal cleanups. Same crew weekly. Free quote: (608) 535-6057.',
  keywords: 'Sun Prairie lawn care, Sun Prairie landscaping, lawn mowing Sun Prairie WI, gutter cleaning Sun Prairie, mulching Sun Prairie',
  alternates: { canonical: 'https://tgyardcare.com/locations/sun-prairie' },
  openGraph: {
    title: 'Lawn Care Sun Prairie WI — 4.9★ Rated | TotalGuard',
    description: 'Top-rated lawn care in Sun Prairie, WI. Mowing, mulching, aeration, gutter cleaning & seasonal cleanups. Same crew weekly. Free quote: (608) 535-6057.',
    url: 'https://tgyardcare.com/locations/sun-prairie',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function SunPrairiePage() {
  return <SunPrairieContent />;
}
