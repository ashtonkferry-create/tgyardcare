import type { Metadata } from 'next';
import VeronaContent from './VeronaContent';

export const metadata: Metadata = {
  title: 'Lawn Care Verona WI | Same Crew Weekly | TG Yard Care',
  description: 'Top-rated lawn care services in Verona, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
  keywords: 'Verona lawn care, Verona landscaping, lawn mowing Verona WI, gutter cleaning Verona, mulching Verona',
  alternates: { canonical: 'https://tgyardcare.com/locations/verona' },
  openGraph: {
    title: 'Lawn Care Verona WI | Same Crew Weekly | TG Yard Care',
    description: 'Top-rated lawn care services in Verona, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
    url: 'https://tgyardcare.com/locations/verona',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function VeronaPage() {
  return <VeronaContent />;
}
