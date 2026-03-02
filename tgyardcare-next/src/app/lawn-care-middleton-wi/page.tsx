import type { Metadata } from 'next';
import LawnCareMiddletonContent from './LawnCareMiddletonContent';

export const metadata: Metadata = {
  title: 'Lawn Mowing Middleton WI | Same Crew Weekly | TG Yard Care',
  description: 'Professional lawn mowing in Middleton, WI with weekly service and same crew consistency. Serving Pheasant Branch, Middleton Hills & all neighborhoods. Free quote!',
  keywords: 'lawn mowing Middleton WI, lawn care Middleton Wisconsin, grass cutting Middleton, weekly mowing Middleton, Middleton Hills lawn service',
  alternates: {
    canonical: 'https://tgyardcare.com/lawn-care-middleton-wi',
  },
  openGraph: {
    title: 'Lawn Mowing Middleton WI | Same Crew Weekly | TG Yard Care',
    description: 'Professional lawn mowing in Middleton, WI with weekly service and same crew consistency. Serving Pheasant Branch, Middleton Hills & all neighborhoods.',
    url: '/lawn-care-middleton-wi',
  },
};

export default function LawnCareMiddletonPage() {
  return <LawnCareMiddletonContent />;
}
