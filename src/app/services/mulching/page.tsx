import type { Metadata } from 'next';
import MulchingContent from './MulchingContent';

export const metadata: Metadata = {
  title: 'Mulching Service Madison WI — 4.9★ | TotalGuard',
  description: 'Premium mulch installation in Madison & Dane County. Weed suppression & plant protection. Free quote: (608) 535-6057.',
  keywords: 'mulching Madison WI, mulch installation Middleton, garden bed mulch Waunakee, Sun Prairie mulching, Fitchburg landscape mulch, Dane County mulch delivery',
  alternates: { canonical: 'https://tgyardcare.com/services/mulching' },
  openGraph: {
    title: 'Mulching Service Madison WI — 4.9★ | TotalGuard',
    description: 'Premium mulch installation in Madison & Dane County. Weed suppression & plant protection. Free quote: (608) 535-6057.',
    url: 'https://tgyardcare.com/services/mulching',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function MulchingPage() {
  return <MulchingContent />;
}
