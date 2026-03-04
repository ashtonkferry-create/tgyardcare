import type { Metadata } from 'next';
import MadisonContent from './MadisonContent';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';
import LocationSchema from '@/components/schemas/LocationSchema';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/locations/madison', {
    title: 'Lawn Care Madison Wisconsin | Local Pros | TG Yard Care',
    description: 'Professional lawn care in Madison, Wisconsin. Mowing, mulching, gutter cleaning, seasonal cleanups & more. 4.9★ rated with 500+ happy customers. Free same-day quotes!',
    keywords: 'Madison lawn care, Madison landscaping, lawn mowing Madison WI, gutter cleaning Madison, mulching Madison, leaf removal Madison',
    canonical: 'https://tgyardcare.com/locations/madison',
  });
}

export default function MadisonPage() {
  return (
    <>
      <BreadcrumbSchema path="/locations/madison" />
      <LocationSchema slug="madison" />
      <MadisonContent />
    </>
  );
}
