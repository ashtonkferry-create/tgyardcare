import type { Metadata } from 'next';
import McFarlandContent from './McFarlandContent';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';
import LocationSchema from '@/components/schemas/LocationSchema';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/locations/mcfarland', {
    title: 'Lawn Care McFarland WI | Same Crew Weekly | TG Yard Care',
    description: 'Top-rated lawn care services in McFarland, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
    keywords: 'McFarland lawn care, McFarland landscaping, lawn mowing McFarland WI, gutter cleaning McFarland, mulching McFarland',
    canonical: 'https://tgyardcare.com/locations/mcfarland',
  });
}

export default function McFarlandPage() {
  return (
    <>
      <BreadcrumbSchema path="/locations/mcfarland" />
      <LocationSchema slug="mcfarland" />
      <McFarlandContent />
    </>
  );
}
