import type { Metadata } from 'next';
import GutterCleaningContent from './GutterCleaningContent';

export const metadata: Metadata = {
  title: 'Gutter Cleaning Madison WI — Top Rated | TotalGuard',
  description: 'Professional gutter cleaning in Madison & Dane County. Downspout flush, before/after photos. Free quote: (608) 535-6057.',
  keywords: 'gutter cleaning Madison WI, gutter service Middleton, downspout cleaning Waunakee, Sun Prairie gutters, Fitchburg gutter maintenance, Dane County gutter cleaning',
  alternates: { canonical: 'https://tgyardcare.com/services/gutter-cleaning' },
  openGraph: {
    title: 'Gutter Cleaning Madison WI — Top Rated | TotalGuard',
    description: 'Professional gutter cleaning in Madison & Dane County. Downspout flush, before/after photos. Free quote: (608) 535-6057.',
    url: 'https://tgyardcare.com/services/gutter-cleaning',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function GutterCleaningPage() {
  return <GutterCleaningContent />;
}
