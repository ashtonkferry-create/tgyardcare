import type { Metadata } from 'next';
import LawnCareMadisonContent from './LawnCareMadisonContent';

export const metadata: Metadata = {
  title: 'Professional Lawn Care Madison WI | Weekly | TG Yard Care',
  description: 'Professional lawn mowing in Madison, WI with weekly service and same crew every visit. Edging, trimming & blowing included. 500+ Madison properties. Free quote!',
  keywords: 'lawn mowing Madison WI, lawn care Madison Wisconsin, grass cutting Madison, weekly mowing Madison, lawn service near me Madison',
  alternates: {
    canonical: 'https://tgyardcare.com/lawn-care-madison-wi',
  },
  openGraph: {
    title: 'Professional Lawn Care Madison WI | Weekly | TG Yard Care',
    description: 'Professional lawn mowing in Madison, WI with weekly service and same crew every visit. Edging, trimming & blowing included. 500+ Madison properties.',
    url: '/lawn-care-madison-wi',
  },
};

export default function LawnCareMadisonPage() {
  return <LawnCareMadisonContent />;
}
