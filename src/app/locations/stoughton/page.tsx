import type { Metadata } from 'next';
import StoughtonContent from './StoughtonContent';

export const metadata: Metadata = {
  title: 'Lawn Care Stoughton WI | Same Crew Weekly | TG Yard Care',
  description: 'Top-rated lawn care services in Stoughton, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
  keywords: 'Stoughton lawn care, Stoughton landscaping, lawn mowing Stoughton WI, gutter cleaning Stoughton, mulching Stoughton',
  alternates: { canonical: 'https://tgyardcare.com/locations/stoughton' },
  openGraph: {
    title: 'Lawn Care Stoughton WI | Same Crew Weekly | TG Yard Care',
    description: 'Top-rated lawn care services in Stoughton, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
    url: 'https://tgyardcare.com/locations/stoughton',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function StoughtonPage() {
  return <StoughtonContent />;
}
