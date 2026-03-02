import type { Metadata } from 'next';
import FallCleanupContent from './FallCleanupContent';

export const metadata: Metadata = {
  title: 'Fall Cleanup Madison WI | Leaf Removal | TG Yard Care',
  description: 'Protect your lawn from winter damage. Complete fall cleanup in Madison & Dane County. Leaves, gutters & bed prep. Book now!',
  keywords: 'fall cleanup Madison WI, leaf removal Middleton, autumn cleanup Waunakee, Sun Prairie fall yard service, Fitchburg winterization, Dane County fall maintenance',
  alternates: { canonical: 'https://tgyardcare.com/services/fall-cleanup' },
};

export default function FallCleanupPage() {
  return <FallCleanupContent />;
}
