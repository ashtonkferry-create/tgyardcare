import type { Metadata } from 'next';
import VeronaContent from './VeronaContent';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';
import LocationSchema from '@/components/schemas/LocationSchema';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/locations/verona', {
    title: 'Lawn Care Verona WI | Same Crew Weekly | TG Yard Care',
    description: 'Top-rated lawn care services in Verona, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
    keywords: 'Verona lawn care, Verona landscaping, lawn mowing Verona WI, gutter cleaning Verona, mulching Verona',
    canonical: 'https://tgyardcare.com/locations/verona',
  });
}

export default function VeronaPage() {
  return (
    <>
      <BreadcrumbSchema path="/locations/verona" />
      <LocationSchema slug="verona" />
      <VeronaContent />
    </>
  );
}
