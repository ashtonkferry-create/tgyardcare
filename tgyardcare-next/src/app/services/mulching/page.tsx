import type { Metadata } from 'next';
import MulchingContent from './MulchingContent';
import FAQSchemaBlock from '@/components/FAQSchemaBlock';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';
import ServiceSchema from '@/components/schemas/ServiceSchema';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/services/mulching', {
    title: 'Mulching Service Madison WI | Hardwood Mulch | TG Yard Care',
    description: 'Premium hardwood mulch installation in Madison & Dane County. Weed suppression & plant protection. Free delivery!',
    keywords: 'mulching Madison WI, mulch installation Middleton, garden bed mulch Waunakee, Sun Prairie mulching, Fitchburg landscape mulch, Dane County mulch delivery',
    canonical: 'https://tgyardcare.com/services/mulching',
  });
}

export default async function MulchingPage() {
  return (
    <>
      <BreadcrumbSchema path="/services/mulching" />
      <ServiceSchema slug="mulching" />
      <MulchingContent />
      <FAQSchemaBlock path="/services/mulching" />
    </>
  );
}
