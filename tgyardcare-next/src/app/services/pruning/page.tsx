import type { Metadata } from 'next';
import PruningContent from './PruningContent';
import FAQSchemaBlock from '@/components/FAQSchemaBlock';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';
import ServiceSchema from '@/components/schemas/ServiceSchema';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/services/pruning', {
    title: 'Bush Trimming Madison WI | Shrub Pruning | TG Yard Care',
    description: 'Professional bush trimming and shrub pruning in Madison & Dane County. Restore overgrown landscaping. Free quotes!',
    keywords: 'bush trimming Madison WI, shrub pruning Middleton, hedge trimming Waunakee, Sun Prairie bush service, Dane County landscaping, shrub shaping Fitchburg',
    canonical: 'https://tgyardcare.com/services/pruning',
  });
}

export default async function PruningPage() {
  return (
    <>
      <BreadcrumbSchema path="/services/pruning" />
      <ServiceSchema slug="pruning" />
      <PruningContent />
      <FAQSchemaBlock path="/services/pruning" />
    </>
  );
}
