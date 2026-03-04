import type { Metadata } from 'next';
import StoughtonContent from './StoughtonContent';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';
import LocationSchema from '@/components/schemas/LocationSchema';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/locations/stoughton', {
    title: 'Lawn Care Stoughton WI | Same Crew Weekly | TG Yard Care',
    description: 'Top-rated lawn care services in Stoughton, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
    keywords: 'Stoughton lawn care, Stoughton landscaping, lawn mowing Stoughton WI, gutter cleaning Stoughton, mulching Stoughton',
    canonical: 'https://tgyardcare.com/locations/stoughton',
  });
}

export default function StoughtonPage() {
  return (
    <>
      <BreadcrumbSchema path="/locations/stoughton" />
      <LocationSchema slug="stoughton" />
      <StoughtonContent />
    </>
  );
}
