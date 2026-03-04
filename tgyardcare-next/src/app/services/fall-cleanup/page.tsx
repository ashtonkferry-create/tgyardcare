import type { Metadata } from 'next';
import FallCleanupContent from './FallCleanupContent';
import FAQSchemaBlock from '@/components/FAQSchemaBlock';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';
import ServiceSchema from '@/components/schemas/ServiceSchema';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/services/fall-cleanup', {
    title: 'Fall Cleanup Madison WI | Leaf Removal | TG Yard Care',
    description: 'Protect your lawn from winter damage. Complete fall cleanup in Madison & Dane County. Leaves, gutters & bed prep. Book now!',
    keywords: 'fall cleanup Madison WI, leaf removal Middleton, autumn cleanup Waunakee, Sun Prairie fall yard service, Fitchburg winterization, Dane County fall maintenance',
    canonical: 'https://tgyardcare.com/services/fall-cleanup',
  });
}

export default async function FallCleanupPage() {
  return (
    <>
      <BreadcrumbSchema path="/services/fall-cleanup" />
      <ServiceSchema slug="fall-cleanup" />
      <FallCleanupContent />
      <FAQSchemaBlock path="/services/fall-cleanup" />
    </>
  );
}
