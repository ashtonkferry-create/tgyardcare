import type { Metadata } from 'next';
import DeForestContent from './DeForestContent';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';
import LocationSchema from '@/components/schemas/LocationSchema';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/locations/deforest', {
    title: 'Lawn Care DeForest WI | Same Crew Weekly | TG Yard Care',
    description: 'Top-rated lawn care services in DeForest, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
    keywords: 'DeForest lawn care, DeForest landscaping, lawn mowing DeForest WI, gutter cleaning DeForest, mulching DeForest',
    canonical: 'https://tgyardcare.com/locations/deforest',
  });
}

export default function DeForestPage() {
  return (
    <>
      <BreadcrumbSchema path="/locations/deforest" />
      <LocationSchema slug="deforest" />
      <DeForestContent />
    </>
  );
}
