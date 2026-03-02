import type { Metadata } from 'next';
import McFarlandContent from './McFarlandContent';

export const metadata: Metadata = {
  title: 'Lawn Care McFarland WI | Same Crew Weekly | TG Yard Care',
  description: 'Top-rated lawn care services in McFarland, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
  keywords: 'McFarland lawn care, McFarland landscaping, lawn mowing McFarland WI, gutter cleaning McFarland, mulching McFarland',
  alternates: { canonical: 'https://tgyardcare.com/locations/mcfarland' },
};

export default function McFarlandPage() {
  return <McFarlandContent />;
}
