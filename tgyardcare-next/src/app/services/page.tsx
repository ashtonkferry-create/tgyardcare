import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
  title: 'Yard Care Services Madison WI | 14+ Options | TG Yard Care',
  description: 'Complete yard care services in Madison & Dane County. Mowing, mulching, gutter cleaning, seasonal cleanups & snow removal. Same crew every visit. Get your free quote!',
  keywords: 'lawn care services Madison WI, landscaping Middleton, yard maintenance Dane County, lawn mowing, mulching, gutter cleaning, snow removal Wisconsin',
  alternates: { canonical: 'https://tgyardcare.com/services' },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
