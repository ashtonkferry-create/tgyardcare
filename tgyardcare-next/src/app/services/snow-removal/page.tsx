import type { Metadata } from 'next';
import SnowRemovalContent from './SnowRemovalContent';
import FAQSchemaBlock from '@/components/FAQSchemaBlock';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';
import ServiceSchema from '@/components/schemas/ServiceSchema';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/services/snow-removal', {
    title: 'Snow Removal Madison WI | 24/7 Storm Response | TG Yard Care',
    description: 'Fast snow plowing in Madison & Dane County with 24/7 storm response. Driveways, walkways & ice management included. Seasonal contracts available. Call today!',
    keywords: 'snow removal Madison WI, snow plowing Middleton, driveway clearing Waunakee, Sun Prairie snow service, Fitchburg plowing, Verona snow removal, Dane County winter maintenance',
    canonical: 'https://tgyardcare.com/services/snow-removal',
  });
}

export default async function SnowRemovalPage() {
  return (
    <>
      <BreadcrumbSchema path="/services/snow-removal" />
      <ServiceSchema slug="snow-removal" />
      <SnowRemovalContent />
      <FAQSchemaBlock path="/services/snow-removal" />
    </>
  );
}
