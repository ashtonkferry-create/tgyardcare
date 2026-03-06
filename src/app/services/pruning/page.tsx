import type { Metadata } from 'next';
import PruningContent from './PruningContent';

export const metadata: Metadata = {
  title: 'Bush Trimming Madison WI | Shrub Pruning | TG Yard Care',
  description: 'Professional bush trimming and shrub pruning in Madison & Dane County. Restore overgrown landscaping. Free quotes!',
  keywords: 'bush trimming Madison WI, shrub pruning Middleton, hedge trimming Waunakee, Sun Prairie bush service, Dane County landscaping, shrub shaping Fitchburg',
  alternates: { canonical: 'https://tgyardcare.com/services/pruning' },
  openGraph: {
    title: 'Bush Trimming Madison WI | Shrub Pruning | TG Yard Care',
    description: 'Professional bush trimming and shrub pruning in Madison & Dane County. Restore overgrown landscaping. Free quotes!',
    url: 'https://tgyardcare.com/services/pruning',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function PruningPage() {
  return <PruningContent />;
}
