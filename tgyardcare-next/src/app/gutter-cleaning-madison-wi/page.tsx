import type { Metadata } from 'next';
import GutterCleaningMadisonContent from './GutterCleaningMadisonContent';

export const metadata: Metadata = {
  title: 'Gutter Cleaning Service Madison WI | Photos | TG Yard Care',
  description: 'Professional gutter cleaning in Madison, WI. Complete debris removal, downspout flushing & before/after photos included. Prevent ice dams & water damage. Free quote!',
  keywords: 'gutter cleaning Madison WI, gutter service Madison Wisconsin, gutter cleanout Madison, downspout cleaning Madison, Madison gutter company',
  alternates: {
    canonical: 'https://tgyardcare.com/gutter-cleaning-madison-wi',
  },
  openGraph: {
    title: 'Gutter Cleaning Service Madison WI | Photos | TG Yard Care',
    description: 'Professional gutter cleaning in Madison, WI. Complete debris removal, downspout flushing & before/after photos included. Prevent ice dams & water damage.',
    url: '/gutter-cleaning-madison-wi',
  },
};

export default function GutterCleaningMadisonPage() {
  return <GutterCleaningMadisonContent />;
}
