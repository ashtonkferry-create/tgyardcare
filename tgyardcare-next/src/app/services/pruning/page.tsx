import type { Metadata } from 'next';
import PruningContent from './PruningContent';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/services/pruning', {
    title: 'Bush Trimming Madison WI | Shrub Pruning | TG Yard Care',
    description: 'Professional bush trimming and shrub pruning in Madison & Dane County. Restore overgrown landscaping. Free quotes!',
    keywords: 'bush trimming Madison WI, shrub pruning Middleton, hedge trimming Waunakee, Sun Prairie bush service, Dane County landscaping, shrub shaping Fitchburg',
    canonical: 'https://tgyardcare.com/services/pruning',
  });
}

export default function PruningPage() {
  return <PruningContent />;
}
