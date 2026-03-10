import type { Metadata } from 'next';
import DeForestContent from './DeForestContent';

export const metadata: Metadata = {
  title: 'Lawn Care DeForest WI — 4.9★ Rated | TotalGuard',
  description: 'Top-rated lawn care in DeForest, WI. Mowing, mulching, aeration, gutter cleaning & seasonal cleanups. Same crew weekly. Free quote: (608) 535-6057.',
  keywords: 'DeForest lawn care, DeForest landscaping, lawn mowing DeForest WI, gutter cleaning DeForest, mulching DeForest',
  alternates: { canonical: 'https://tgyardcare.com/locations/deforest' },
  openGraph: {
    title: 'Lawn Care DeForest WI — 4.9★ Rated | TotalGuard',
    description: 'Top-rated lawn care in DeForest, WI. Mowing, mulching, aeration, gutter cleaning & seasonal cleanups. Same crew weekly. Free quote: (608) 535-6057.',
    url: 'https://tgyardcare.com/locations/deforest',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function DeForestPage() {
  return <DeForestContent />;
}
