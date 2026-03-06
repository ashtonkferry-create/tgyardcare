import type { Metadata } from 'next';
import SpringCleanupContent from './SpringCleanupContent';

export const metadata: Metadata = {
  title: 'Spring Cleanup Madison WI | Yard Prep Service | TG Yard Care',
  description: 'Wake your lawn from winter. Professional spring cleanup in Madison & Dane County. Debris removal & bed prep. Book now!',
  keywords: 'spring cleanup Madison WI, spring yard cleanup Middleton, Waunakee spring maintenance, Sun Prairie lawn prep, Fitchburg spring service, Dane County spring landscaping',
  alternates: { canonical: 'https://tgyardcare.com/services/spring-cleanup' },
  openGraph: {
    title: 'Spring Cleanup Madison WI | Yard Prep Service | TG Yard Care',
    description: 'Wake your lawn from winter. Professional spring cleanup in Madison & Dane County. Debris removal & bed prep. Book now!',
    url: 'https://tgyardcare.com/services/spring-cleanup',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function SpringCleanupPage() {
  return <SpringCleanupContent />;
}
