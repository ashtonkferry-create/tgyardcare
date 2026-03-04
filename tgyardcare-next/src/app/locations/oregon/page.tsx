import type { Metadata } from 'next';
import OregonContent from './OregonContent';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/locations/oregon', {
    title: 'Lawn Care Oregon WI | Same Crew Weekly | TG Yard Care',
    description: 'Top-rated lawn care services in Oregon, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
    keywords: 'Oregon lawn care, Oregon WI landscaping, lawn mowing Oregon Wisconsin, gutter cleaning Oregon, mulching Oregon',
    canonical: 'https://tgyardcare.com/locations/oregon',
  });
}

export default function OregonPage() {
  return <OregonContent />;
}
