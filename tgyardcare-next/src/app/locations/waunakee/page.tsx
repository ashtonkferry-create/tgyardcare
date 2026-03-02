import type { Metadata } from 'next';
import WaunakeeContent from './WaunakeeContent';

export const metadata: Metadata = {
  title: 'Lawn Care Waunakee WI | Same Crew Weekly | TG Yard Care',
  description: 'Expert lawn care in Waunakee WI. Professional mowing, mulching & gutter cleaning. 4.9★ rated. Free quote!',
  keywords: 'Waunakee lawn care, Waunakee landscaping, lawn mowing Waunakee WI, gutter cleaning Waunakee',
  alternates: { canonical: 'https://tgyardcare.com/locations/waunakee' },
};

export default function WaunakeePage() {
  return <WaunakeeContent />;
}
