import type { Metadata } from 'next';
import SunPrairieContent from './SunPrairieContent';

export const metadata: Metadata = {
  title: 'Lawn Care Sun Prairie WI | Same Crew Weekly | TG Yard Care',
  description: 'Top-rated lawn care services in Sun Prairie, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
  keywords: 'Sun Prairie lawn care, Sun Prairie landscaping, lawn mowing Sun Prairie WI, gutter cleaning Sun Prairie, mulching Sun Prairie',
  alternates: { canonical: 'https://tgyardcare.com/locations/sun-prairie' },
  openGraph: {
    title: 'Lawn Care Sun Prairie WI | Same Crew Weekly | TG Yard Care',
    description: 'Top-rated lawn care services in Sun Prairie, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
    url: 'https://tgyardcare.com/locations/sun-prairie',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function SunPrairiePage() {
  return <SunPrairieContent />;
}
