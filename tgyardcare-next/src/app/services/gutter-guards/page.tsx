import type { Metadata } from 'next';
import GutterGuardsContent from './GutterGuardsContent';
import FAQSchemaBlock from '@/components/FAQSchemaBlock';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';
import ServiceSchema from '@/components/schemas/ServiceSchema';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/services/gutter-guards', {
    title: 'Gutter Guards Madison WI | Installation | TG Yard Care',
    description: 'Never clean gutters again. Professional gutter guard installation in Madison & Dane County. Prevent ice dams. Free quote!',
    keywords: 'gutter guards Madison WI, gutter protection Middleton, leaf guards Waunakee, Sun Prairie gutter installation, Dane County gutter guards, Fitchburg gutter screens',
    canonical: 'https://tgyardcare.com/services/gutter-guards',
  });
}

export default async function GutterGuardsPage() {
  return (
    <>
      <BreadcrumbSchema path="/services/gutter-guards" />
      <ServiceSchema slug="gutter-guards" />
      <GutterGuardsContent />
      <FAQSchemaBlock path="/services/gutter-guards" />
    </>
  );
}
