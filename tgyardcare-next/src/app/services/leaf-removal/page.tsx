import type { Metadata } from 'next';
import LeafRemovalContent from './LeafRemovalContent';

export const metadata: Metadata = {
  title: 'Leaf Removal Madison WI | Hauling Included | TG Yard Care',
  description: 'Fast leaf removal across Dane County. Protect your lawn from fall leaves. Hauling included. Free estimate!',
  keywords: 'leaf removal Madison WI, fall leaf cleanup Middleton, autumn yard cleanup Waunakee, Sun Prairie leaf service, Dane County fall cleanup, leaf hauling',
  alternates: { canonical: 'https://tgyardcare.com/services/leaf-removal' },
};

export default function LeafRemovalPage() {
  return <LeafRemovalContent />;
}
