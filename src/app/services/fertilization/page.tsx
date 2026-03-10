import type { Metadata } from 'next';
import FertilizationContent from './FertilizationContent';

export const metadata: Metadata = {
  title: 'Lawn Fertilization Madison WI — 4.9★ | TotalGuard',
  description: 'Professional fertilization & overseeding in Madison & Dane County. Timed to WI growing cycles. Free quote: (608) 535-6057.',
  keywords: 'lawn fertilization Madison WI, overseeding Middleton, lawn treatment Waunakee, fertilizer program Sun Prairie, Dane County lawn care, Fitchburg fertilization',
  alternates: { canonical: 'https://tgyardcare.com/services/fertilization' },
  openGraph: {
    title: 'Lawn Fertilization Madison WI — 4.9★ | TotalGuard',
    description: 'Professional fertilization & overseeding in Madison & Dane County. Timed to WI growing cycles. Free quote: (608) 535-6057.',
    url: 'https://tgyardcare.com/services/fertilization',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function FertilizationPage() {
  return <FertilizationContent />;
}
