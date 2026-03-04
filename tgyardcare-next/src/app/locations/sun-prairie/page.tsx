import type { Metadata } from 'next';
import SunPrairieContent from './SunPrairieContent';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';
import LocationSchema from '@/components/schemas/LocationSchema';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/locations/sun-prairie', {
    title: 'Lawn Care Sun Prairie WI | Same Crew Weekly | TG Yard Care',
    description: 'Top-rated lawn care services in Sun Prairie, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
    keywords: 'Sun Prairie lawn care, Sun Prairie landscaping, lawn mowing Sun Prairie WI, gutter cleaning Sun Prairie, mulching Sun Prairie',
    canonical: 'https://tgyardcare.com/locations/sun-prairie',
  });
}

export default function SunPrairiePage() {
  return (
    <>
      <BreadcrumbSchema path="/locations/sun-prairie" />
      <LocationSchema slug="sun-prairie" />
      <SunPrairieContent />
    </>
  );
}
