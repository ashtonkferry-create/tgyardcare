import type { Metadata } from 'next';
import CommercialLawnCareContent from './CommercialLawnCareContent';

export const metadata: Metadata = {
  title: 'Commercial Lawn Mowing Madison WI | HOAs | TG Yard Care',
  description: 'Commercial lawn care for HOAs, property managers & facilities in Madison, WI. Documented visits, dedicated crews & flexible contracts. $1M insured. Get your quote!',
  keywords: 'commercial lawn mowing Madison, HOA lawn care Wisconsin, property management grounds maintenance, commercial mowing contract Madison',
  alternates: {
    canonical: 'https://tgyardcare.com/commercial/lawn-care',
  },
  openGraph: {
    title: 'Commercial Lawn Mowing Madison WI | HOAs | TG Yard Care',
    description: 'Commercial lawn care for HOAs, property managers & facilities in Madison, WI. Documented visits, dedicated crews & flexible contracts. $1M insured. Get your quote!',
    url: 'https://tgyardcare.com/commercial/lawn-care',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function CommercialLawnCarePage() {
  return <CommercialLawnCareContent />;
}
