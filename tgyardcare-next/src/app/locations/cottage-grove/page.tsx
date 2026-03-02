import type { Metadata } from 'next';
import CottageGroveContent from './CottageGroveContent';

export const metadata: Metadata = {
  title: 'Lawn Care Cottage Grove WI | Same Crew Weekly | TG Yard Care',
  description: 'Top-rated lawn care services in Cottage Grove, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
  keywords: 'Cottage Grove lawn care, Cottage Grove landscaping, lawn mowing Cottage Grove WI, gutter cleaning Cottage Grove, mulching Cottage Grove',
  alternates: { canonical: 'https://tgyardcare.com/locations/cottage-grove' },
};

export default function CottageGrovePage() {
  return <CottageGroveContent />;
}
