import type { Metadata } from 'next';
import MiddletonContent from './MiddletonContent';

export const metadata: Metadata = {
  title: 'Lawn Care Middleton WI | Same Crew Weekly | TG Yard Care',
  description: 'Top-rated lawn care in Middleton, WI. Professional mowing, mulching, gutter cleaning & seasonal services. 4.9★ Google rating. Get your free quote today!',
  keywords: 'Middleton lawn care, Middleton landscaping, lawn mowing Middleton WI, gutter cleaning Middleton, mulching Middleton',
  alternates: { canonical: 'https://tgyardcare.com/locations/middleton' },
  openGraph: {
    title: 'Lawn Care Middleton WI | Same Crew Weekly | TG Yard Care',
    description: 'Top-rated lawn care in Middleton, WI. Professional mowing, mulching, gutter cleaning & seasonal services. 4.9★ Google rating. Get your free quote today!',
    url: 'https://tgyardcare.com/locations/middleton',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function MiddletonPage() {
  return <MiddletonContent />;
}
