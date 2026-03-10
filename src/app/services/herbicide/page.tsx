import type { Metadata } from 'next';
import HerbicideContent from './HerbicideContent';

export const metadata: Metadata = {
  title: 'Weed Control Madison WI — 4.9★ Rated | TotalGuard',
  description: 'Professional weed control in Madison & Dane County. Pre- & post-emergent, safe for pets. Free quote: (608) 535-6057.',
  keywords: 'weed control Madison WI, herbicide services Middleton, lawn weed killer Waunakee, Sun Prairie weed treatment, pre-emergent Dane County, Fitchburg weed removal',
  alternates: { canonical: 'https://tgyardcare.com/services/herbicide' },
  openGraph: {
    title: 'Weed Control Madison WI — 4.9★ Rated | TotalGuard',
    description: 'Professional weed control in Madison & Dane County. Pre- & post-emergent, safe for pets. Free quote: (608) 535-6057.',
    url: 'https://tgyardcare.com/services/herbicide',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function HerbicidePage() {
  return <HerbicideContent />;
}
