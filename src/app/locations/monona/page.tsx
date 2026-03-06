import type { Metadata } from 'next';
import MononaContent from './MononaContent';

export const metadata: Metadata = {
  title: 'Lawn Care Monona WI | Same Crew Weekly | TG Yard Care',
  description: 'Top-rated lawn care services in Monona, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
  keywords: 'Monona lawn care, Monona landscaping, lawn mowing Monona WI, gutter cleaning Monona, mulching Monona',
  alternates: { canonical: 'https://tgyardcare.com/locations/monona' },
  openGraph: {
    title: 'Lawn Care Monona WI | Same Crew Weekly | TG Yard Care',
    description: 'Top-rated lawn care services in Monona, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
    url: 'https://tgyardcare.com/locations/monona',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function MononaPage() {
  return <MononaContent />;
}
