import type { Metadata } from 'next';
import GutterCleaningContent from './GutterCleaningContent';
import FAQSchemaBlock from '@/components/FAQSchemaBlock';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';
import ServiceSchema from '@/components/schemas/ServiceSchema';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/services/gutter-cleaning', {
    title: 'Gutter Cleaning Madison WI | Photos | TG Yard Care',
    description: 'Prevent ice dams & water damage with professional gutter cleaning in Madison & Dane County. Downspout flushing, before/after photos included. Free estimate!',
    keywords: 'gutter cleaning Madison WI, gutter service Middleton, downspout cleaning Waunakee, Sun Prairie gutters, Fitchburg gutter maintenance, Dane County gutter cleaning',
    canonical: 'https://tgyardcare.com/services/gutter-cleaning',
  });
}

export default async function GutterCleaningPage() {
  return (
    <>
      <BreadcrumbSchema path="/services/gutter-cleaning" />
      <ServiceSchema slug="gutter-cleaning" />
      <GutterCleaningContent />
      <FAQSchemaBlock path="/services/gutter-cleaning" />
    </>
  );
}
