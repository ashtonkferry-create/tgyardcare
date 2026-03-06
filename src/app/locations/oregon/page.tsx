import type { Metadata } from 'next';
import OregonContent from './OregonContent';

export const metadata: Metadata = {
  title: 'Lawn Care Oregon WI | Same Crew Weekly | TG Yard Care',
  description: 'Top-rated lawn care services in Oregon, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
  keywords: 'Oregon lawn care, Oregon WI landscaping, lawn mowing Oregon Wisconsin, gutter cleaning Oregon, mulching Oregon',
  alternates: { canonical: 'https://tgyardcare.com/locations/oregon' },
  openGraph: {
    title: 'Lawn Care Oregon WI | Same Crew Weekly | TG Yard Care',
    description: 'Top-rated lawn care services in Oregon, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
    url: 'https://tgyardcare.com/locations/oregon',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function OregonPage() {
  return <OregonContent />;
}
