import type { Metadata } from 'next';
import AerationContent from './AerationContent';

export const metadata: Metadata = {
  title: 'Lawn Aeration Madison WI — 4.9★ Rated | TotalGuard',
  description: 'Core aeration in Madison & Dane County. Reduce compaction, boost root growth. Residential & commercial. Free quote: (608) 535-6057.',
  keywords: 'lawn aeration Madison WI, core aeration Middleton, soil compaction Waunakee, Sun Prairie lawn aeration, fall aeration Dane County, Fitchburg lawn care',
  alternates: { canonical: 'https://tgyardcare.com/services/aeration' },
  openGraph: {
    title: 'Lawn Aeration Madison WI — 4.9★ Rated | TotalGuard',
    description: 'Core aeration in Madison & Dane County. Reduce compaction, boost root growth. Residential & commercial. Free quote: (608) 535-6057.',
    url: 'https://tgyardcare.com/services/aeration',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function AerationPage() {
  return <AerationContent />;
}
