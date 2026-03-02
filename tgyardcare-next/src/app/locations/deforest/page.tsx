import type { Metadata } from 'next';
import DeForestContent from './DeForestContent';

export const metadata: Metadata = {
  title: 'Lawn Care DeForest WI | Same Crew Weekly | TG Yard Care',
  description: 'Top-rated lawn care services in DeForest, Wisconsin. Expert mowing, mulching, gutter cleaning & seasonal services. 4.9★ rated. Same-day quotes. Call today!',
  keywords: 'DeForest lawn care, DeForest landscaping, lawn mowing DeForest WI, gutter cleaning DeForest, mulching DeForest',
  alternates: { canonical: 'https://tgyardcare.com/locations/deforest' },
};

export default function DeForestPage() {
  return <DeForestContent />;
}
