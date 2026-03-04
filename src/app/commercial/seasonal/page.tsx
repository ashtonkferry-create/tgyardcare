import type { Metadata } from 'next';
import CommercialSeasonalContent from './CommercialSeasonalContent';

export const metadata: Metadata = {
  title: 'Commercial Seasonal Cleanup Madison WI | HOAs | TG Yard Care',
  description: 'Commercial spring & fall cleanup for HOAs & property managers in Madison, WI. Priority scheduling, documented service. $1M insured. Free quote!',
  keywords: 'commercial spring cleanup Madison, commercial fall cleanup Wisconsin, HOA leaf removal, property management seasonal services',
  alternates: {
    canonical: 'https://tgyardcare.com/commercial/seasonal',
  },
};

export default function CommercialSeasonalPage() {
  return <CommercialSeasonalContent />;
}
