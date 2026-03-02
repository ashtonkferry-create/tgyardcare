import type { Metadata } from 'next';
import CommercialPropertyEnhancementContent from './CommercialPropertyEnhancementContent';

export const metadata: Metadata = {
  title: 'Commercial Landscaping Madison WI | Garden Beds | TG Yard Care',
  description: 'Commercial landscaping & garden beds for HOAs & facilities in Madison, WI. Consistent standards, annual programs. $1M insured. Free quote!',
  keywords: 'commercial landscaping Madison, HOA landscape maintenance Wisconsin, commercial garden beds, property management landscaping',
  alternates: {
    canonical: 'https://tgyardcare.com/commercial/property-enhancement',
  },
};

export default function CommercialPropertyEnhancementPage() {
  return <CommercialPropertyEnhancementContent />;
}
