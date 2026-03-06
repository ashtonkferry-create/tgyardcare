import type { Metadata } from 'next';
import AerationContent from './AerationContent';

export const metadata: Metadata = {
  title: 'Lawn Aeration Madison WI | Core Aeration | TG Yard Care',
  description: 'Professional core aeration in Madison & Dane County. Reduce compaction, improve root growth. Best in fall! Free quote!',
  keywords: 'lawn aeration Madison WI, core aeration Middleton, soil compaction Waunakee, Sun Prairie lawn aeration, fall aeration Dane County, Fitchburg lawn care',
  alternates: { canonical: 'https://tgyardcare.com/services/aeration' },
  openGraph: {
    title: 'Lawn Aeration Madison WI | Core Aeration | TG Yard Care',
    description: 'Professional core aeration in Madison & Dane County. Reduce compaction, improve root growth. Best in fall! Free quote!',
    url: 'https://tgyardcare.com/services/aeration',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function AerationPage() {
  return <AerationContent />;
}
