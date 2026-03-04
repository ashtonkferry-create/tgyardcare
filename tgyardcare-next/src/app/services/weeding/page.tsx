import type { Metadata } from 'next';
import WeedingContent from './WeedingContent';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/services/weeding', {
    title: 'Weeding Service Madison WI | Garden Beds | TG Yard Care',
    description: 'Professional hand weeding in Madison & Dane County. Thorough root removal for pristine beds. Free quotes!',
    keywords: 'weeding Madison WI, garden weeding Middleton, weed removal Waunakee, Sun Prairie weed control, Dane County garden maintenance, Fitchburg bed weeding',
    canonical: 'https://tgyardcare.com/services/weeding',
  });
}

export default function WeedingPage() {
  return <WeedingContent />;
}
