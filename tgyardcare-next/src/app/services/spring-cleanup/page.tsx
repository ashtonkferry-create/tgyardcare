import type { Metadata } from 'next';
import SpringCleanupContent from './SpringCleanupContent';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/services/spring-cleanup', {
    title: 'Spring Cleanup Madison WI | Yard Prep Service | TG Yard Care',
    description: 'Wake your lawn from winter. Professional spring cleanup in Madison & Dane County. Debris removal & bed prep. Book now!',
    keywords: 'spring cleanup Madison WI, spring yard cleanup Middleton, Waunakee spring maintenance, Sun Prairie lawn prep, Fitchburg spring service, Dane County spring landscaping',
    canonical: 'https://tgyardcare.com/services/spring-cleanup',
  });
}

export default function SpringCleanupPage() {
  return <SpringCleanupContent />;
}
