import type { Metadata } from 'next';
import MadisonContent from './MadisonContent';

export const metadata: Metadata = {
  title: 'Lawn Care Madison WI — 4.9★ Top Rated | TotalGuard',
  description: 'Top-rated lawn care in Madison, WI. Mowing, mulching, aeration, gutter cleaning & seasonal cleanups. Same crew weekly. Free quote: (608) 535-6057.',
  keywords: 'Madison lawn care, Madison landscaping, lawn mowing Madison WI, gutter cleaning Madison, mulching Madison, leaf removal Madison',
  alternates: { canonical: 'https://tgyardcare.com/locations/madison' },
  openGraph: {
    title: 'Lawn Care Madison WI — 4.9★ Top Rated | TotalGuard',
    description: 'Top-rated lawn care in Madison, WI. Mowing, mulching, aeration, gutter cleaning & seasonal cleanups. Same crew weekly. Free quote: (608) 535-6057.',
    url: 'https://tgyardcare.com/locations/madison',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function MadisonPage() {
  return <MadisonContent />;
}
