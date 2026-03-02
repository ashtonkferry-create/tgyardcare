import type { Metadata } from 'next';
import GardenBedsContent from './GardenBedsContent';

export const metadata: Metadata = {
  title: 'Garden Bed Services Madison WI | Design | TG Yard Care',
  description: 'Transform your garden beds in Madison & Dane County. Professional design, planting & mulching. Free consultation!',
  keywords: 'garden beds Madison WI, landscaping Middleton, garden design Waunakee, Sun Prairie garden beds, Dane County landscaping, flower bed installation',
  alternates: { canonical: 'https://tgyardcare.com/services/garden-beds' },
};

export default function GardenBedsPage() {
  return <GardenBedsContent />;
}
