import type { Metadata } from 'next';
import GardenBedsContent from './GardenBedsContent';
import { getPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/services/garden-beds', {
    title: 'Garden Bed Services Madison WI | Design | TG Yard Care',
    description: 'Transform your garden beds in Madison & Dane County. Professional design, planting & mulching. Free consultation!',
    keywords: 'garden beds Madison WI, landscaping Middleton, garden design Waunakee, Sun Prairie garden beds, Dane County landscaping, flower bed installation',
    canonical: 'https://tgyardcare.com/services/garden-beds',
  });
}

export default function GardenBedsPage() {
  return <GardenBedsContent />;
}
