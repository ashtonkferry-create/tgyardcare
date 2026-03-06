import type { Metadata } from 'next';
import CommercialGutterServicesContent from './CommercialGutterServicesContent';

export const metadata: Metadata = {
  title: 'Commercial Gutter Cleaning Madison WI | HOAs | TG Yard Care',
  description: 'Commercial gutter cleaning & guards for HOAs & property managers in Madison, WI. Photo documentation, seasonal contracts. $1M insured. Free quote!',
  keywords: 'commercial gutter cleaning Madison, HOA gutter maintenance Wisconsin, commercial gutter guards, property management gutter service',
  alternates: {
    canonical: 'https://tgyardcare.com/commercial/gutters',
  },
  openGraph: {
    title: 'Commercial Gutter Cleaning Madison WI | HOAs | TG Yard Care',
    description: 'Commercial gutter cleaning & guards for HOAs & property managers in Madison, WI. Photo documentation, seasonal contracts. $1M insured. Free quote!',
    url: 'https://tgyardcare.com/commercial/gutters',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function CommercialGutterServicesPage() {
  return <CommercialGutterServicesContent />;
}
