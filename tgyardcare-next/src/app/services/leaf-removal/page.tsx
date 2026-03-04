import type { Metadata } from 'next';
import LeafRemovalContent from './LeafRemovalContent';
import FAQSchemaBlock from '@/components/FAQSchemaBlock';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';
import ServiceSchema from '@/components/schemas/ServiceSchema';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/services/leaf-removal', {
    title: 'Leaf Removal Madison WI | Hauling Included | TG Yard Care',
    description: 'Fast leaf removal across Dane County. Protect your lawn from fall leaves. Hauling included. Free estimate!',
    keywords: 'leaf removal Madison WI, fall leaf cleanup Middleton, autumn yard cleanup Waunakee, Sun Prairie leaf service, Dane County fall cleanup, leaf hauling',
    canonical: 'https://tgyardcare.com/services/leaf-removal',
  });
}

export default async function LeafRemovalPage() {
  return (
    <>
      <BreadcrumbSchema path="/services/leaf-removal" />
      <ServiceSchema slug="leaf-removal" />
      <LeafRemovalContent />
      <FAQSchemaBlock path="/services/leaf-removal" />
    </>
  );
}
