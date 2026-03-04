import type { Metadata } from 'next';
import CommercialAerationContent from './CommercialAerationContent';

export const metadata: Metadata = {
  title: 'Commercial Aeration Madison WI | Core Aeration | TG Yard Care',
  description: 'Commercial lawn aeration for HOAs & property managers in Madison, WI. Core aeration, overseeding & documented service. $1M insured. Free quote!',
  keywords: 'commercial aeration Madison, HOA lawn aeration Wisconsin, commercial core aeration, property management turf care',
  alternates: {
    canonical: 'https://tgyardcare.com/commercial/aeration',
  },
};

export default function CommercialAerationPage() {
  return <CommercialAerationContent />;
}
