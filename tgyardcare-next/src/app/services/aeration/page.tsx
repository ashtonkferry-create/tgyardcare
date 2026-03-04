import type { Metadata } from 'next';
import AerationContent from './AerationContent';
import FAQSchemaBlock from '@/components/FAQSchemaBlock';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';
import ServiceSchema from '@/components/schemas/ServiceSchema';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/services/aeration', {
    title: 'Lawn Aeration Madison WI | Core Aeration | TG Yard Care',
    description: 'Professional core aeration in Madison & Dane County. Reduce compaction, improve root growth. Best in fall! Free quote!',
    keywords: 'lawn aeration Madison WI, core aeration Middleton, soil compaction Waunakee, Sun Prairie lawn aeration, fall aeration Dane County, Fitchburg lawn care',
    canonical: 'https://tgyardcare.com/services/aeration',
  });
}

export default async function AerationPage() {
  return (
    <>
      <BreadcrumbSchema path="/services/aeration" />
      <ServiceSchema slug="aeration" />
      <AerationContent />
      <FAQSchemaBlock path="/services/aeration" />
    </>
  );
}
