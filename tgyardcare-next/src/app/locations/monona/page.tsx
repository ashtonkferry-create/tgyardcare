import type { Metadata } from 'next';
import MononaContent from './MononaContent';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';
import LocationSchema from '@/components/schemas/LocationSchema';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/locations/monona', {
    title: 'Lawn Care Monona WI | Same Crew Weekly | TG Yard Care',
    description: 'Top-rated lawn care services in Monona, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
    keywords: 'Monona lawn care, Monona landscaping, lawn mowing Monona WI, gutter cleaning Monona, mulching Monona',
    canonical: 'https://tgyardcare.com/locations/monona',
  });
}

export default function MononaPage() {
  return (
    <>
      <BreadcrumbSchema path="/locations/monona" />
      <LocationSchema slug="monona" />
      <MononaContent />
    </>
  );
}
