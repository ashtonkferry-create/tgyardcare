import type { Metadata } from 'next';
import CommercialFertilizationWeedControlContent from './CommercialFertilizationWeedControlContent';

export const metadata: Metadata = {
  title: 'Commercial Fertilization Madison WI | Licensed | TG Yard Care',
  description: 'Commercial fertilization & weed control for HOAs & properties in Madison, WI. Licensed applicators, documented treatment. $1M insured. Free quote!',
  keywords: 'commercial fertilization Madison, HOA weed control Wisconsin, commercial lawn treatment, property management turf care',
  alternates: {
    canonical: 'https://tgyardcare.com/commercial/fertilization-weed-control',
  },
};

export default function CommercialFertilizationWeedControlPage() {
  return <CommercialFertilizationWeedControlContent />;
}
