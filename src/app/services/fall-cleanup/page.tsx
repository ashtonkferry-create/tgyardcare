import type { Metadata } from 'next';
import FallCleanupContent from './FallCleanupContent';

export const metadata: Metadata = {
  title: 'Fall Cleanup Madison WI | Leaf Removal | TG Yard Care',
  description: 'Protect your lawn from winter damage. Complete fall cleanup in Madison & Dane County. Leaves, gutters & bed prep. Book now!',
  keywords: 'fall cleanup Madison WI, leaf removal Middleton, autumn cleanup Waunakee, Sun Prairie fall yard service, Fitchburg winterization, Dane County fall maintenance',
  alternates: { canonical: 'https://tgyardcare.com/services/fall-cleanup' },
  openGraph: {
    title: 'Fall Cleanup Madison WI | Leaf Removal | TG Yard Care',
    description: 'Protect your lawn from winter damage. Complete fall cleanup in Madison & Dane County. Leaves, gutters & bed prep. Book now!',
    url: 'https://tgyardcare.com/services/fall-cleanup',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function FallCleanupPage() {
  return <FallCleanupContent />;
}
