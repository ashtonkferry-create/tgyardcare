import type { Metadata } from 'next';
import ResidentialContent from './ResidentialContent';

export const metadata: Metadata = {
  title: 'Residential Lawn Care Madison WI — 4.9★ | TotalGuard',
  description: 'Residential lawn care in Madison & Dane County. Mowing, mulching, gutters & cleanups. Same crew weekly. Free quote: (608) 535-6057.',
  keywords: 'residential lawn care Madison WI, home lawn service Middleton, mowing Waunakee, mulching Sun Prairie, gutter cleaning Fitchburg, Verona yard care, Dane County lawn service',
  alternates: {
    canonical: 'https://tgyardcare.com/residential',
  },
  openGraph: {
    title: 'Residential Lawn Care Madison WI — 4.9★ | TotalGuard',
    description: 'Residential lawn care in Madison & Dane County. Mowing, mulching, gutters & cleanups. Same crew weekly. Free quote: (608) 535-6057.',
    url: 'https://tgyardcare.com/residential',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function ResidentialPage() {
  return <ResidentialContent />;
}
