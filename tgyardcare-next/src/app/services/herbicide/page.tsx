import type { Metadata } from 'next';
import HerbicideContent from './HerbicideContent';
import FAQSchemaBlock from '@/components/FAQSchemaBlock';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';
import ServiceSchema from '@/components/schemas/ServiceSchema';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/services/herbicide', {
    title: 'Weed Control Madison WI | Safe Herbicide | TG Yard Care',
    description: 'Eliminate weeds with professional herbicide treatments in Madison & Dane County. Pre-emergent & post-emergent options. Safe for lawns & pets. Get a free quote!',
    keywords: 'weed control Madison WI, herbicide services Middleton, lawn weed killer Waunakee, Sun Prairie weed treatment, pre-emergent Dane County, Fitchburg weed removal',
    canonical: 'https://tgyardcare.com/services/herbicide',
  });
}

export default async function HerbicidePage() {
  return (
    <>
      <BreadcrumbSchema path="/services/herbicide" />
      <ServiceSchema slug="herbicide" />
      <HerbicideContent />
      <FAQSchemaBlock path="/services/herbicide" />
    </>
  );
}
