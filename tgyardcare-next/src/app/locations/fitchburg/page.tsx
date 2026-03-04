import type { Metadata } from 'next';
import FitchburgContent from './FitchburgContent';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/locations/fitchburg', {
    title: 'Lawn Care Fitchburg WI | Same Crew Weekly | TG Yard Care',
    description: 'Top-rated lawn care services in Fitchburg, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
    keywords: 'Fitchburg lawn care, Fitchburg landscaping, lawn mowing Fitchburg WI, gutter cleaning Fitchburg, mulching Fitchburg',
    canonical: 'https://tgyardcare.com/locations/fitchburg',
  });
}

export default function FitchburgPage() {
  return <FitchburgContent />;
}
