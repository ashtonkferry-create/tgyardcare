import type { Metadata } from 'next';
import WeedingContent from './WeedingContent';
import FAQSchemaBlock from '@/components/FAQSchemaBlock';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';
import ServiceSchema from '@/components/schemas/ServiceSchema';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/services/weeding', {
    title: 'Weeding Service Madison WI | Garden Beds | TG Yard Care',
    description: 'Professional hand weeding in Madison & Dane County. Thorough root removal for pristine beds. Free quotes!',
    keywords: 'weeding Madison WI, garden weeding Middleton, weed removal Waunakee, Sun Prairie weed control, Dane County garden maintenance, Fitchburg bed weeding',
    canonical: 'https://tgyardcare.com/services/weeding',
  });
}

export default async function WeedingPage() {
  return (
    <>
      <BreadcrumbSchema path="/services/weeding" />
      <ServiceSchema slug="weeding" />
      <WeedingContent />
      <FAQSchemaBlock path="/services/weeding" />
    </>
  );
}
