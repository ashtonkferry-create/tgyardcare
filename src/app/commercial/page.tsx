import type { Metadata } from 'next';
import CommercialContent from './CommercialContent';

export const metadata: Metadata = {
  title: 'Commercial Lawn Care Madison WI | $1M Insured | TG Yard Care',
  description: 'Commercial lawn care for offices, retail centers, HOAs & facilities in Madison & Dane County. Fully insured with $1M coverage. Flexible scheduling. Free quote!',
  keywords: 'commercial lawn care Madison WI, business property maintenance Middleton, HOA lawn service Waunakee, commercial landscaping Sun Prairie, Dane County business grounds care',
  alternates: {
    canonical: 'https://tgyardcare.com/commercial',
  },
  openGraph: {
    title: 'Commercial Lawn Care Madison WI | $1M Insured | TG Yard Care',
    description: 'Commercial lawn care for offices, retail centers, HOAs & facilities in Madison & Dane County. Fully insured with $1M coverage. Flexible scheduling. Free quote!',
    url: 'https://tgyardcare.com/commercial',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function CommercialPage() {
  return <CommercialContent />;
}
