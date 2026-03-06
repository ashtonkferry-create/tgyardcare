import type { Metadata } from 'next';
import HerbicideContent from './HerbicideContent';

export const metadata: Metadata = {
  title: 'Weed Control Madison WI | Safe Herbicide | TG Yard Care',
  description: 'Eliminate weeds with professional herbicide treatments in Madison & Dane County. Pre-emergent & post-emergent options. Safe for lawns & pets. Get a free quote!',
  keywords: 'weed control Madison WI, herbicide services Middleton, lawn weed killer Waunakee, Sun Prairie weed treatment, pre-emergent Dane County, Fitchburg weed removal',
  alternates: { canonical: 'https://tgyardcare.com/services/herbicide' },
  openGraph: {
    title: 'Weed Control Madison WI | Safe Herbicide | TG Yard Care',
    description: 'Eliminate weeds with professional herbicide treatments in Madison & Dane County. Pre-emergent & post-emergent options. Safe for lawns & pets. Get a free quote!',
    url: 'https://tgyardcare.com/services/herbicide',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function HerbicidePage() {
  return <HerbicideContent />;
}
