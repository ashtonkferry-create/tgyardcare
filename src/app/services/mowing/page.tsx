import type { Metadata } from 'next';
import MowingContent from './MowingContent';

export const metadata: Metadata = {
  title: 'Lawn Mowing Madison WI — 4.9★ Weekly | TotalGuard',
  description: 'Top-rated lawn mowing in Madison & Dane County. Same crew weekly, clean edges, professional stripes. Free quote: (608) 535-6057.',
  keywords: 'lawn mowing Madison WI, grass cutting Middleton, weekly mowing Waunakee, Sun Prairie lawn care, Fitchburg lawn service, Verona mowing, Dane County lawn mowing',
  alternates: { canonical: 'https://tgyardcare.com/services/mowing' },
  openGraph: {
    title: 'Lawn Mowing Madison WI — 4.9★ Weekly | TotalGuard',
    description: 'Top-rated lawn mowing in Madison & Dane County. Same crew weekly, clean edges, professional stripes. Free quote: (608) 535-6057.',
    url: 'https://tgyardcare.com/services/mowing',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function MowingPage() {
  return <MowingContent />;
}
