import type { Metadata } from 'next';
import GalleryContent from './GalleryContent';

export const metadata: Metadata = {
  title: 'Before & After Gallery | TotalGuard Madison',
  description: "See 50+ lawn transformations in Madison WI. Real before/after photos of mowing, mulching & gutter cleaning. Get inspired!",
  keywords: 'before after lawn care Madison, lawn transformation photos, landscaping portfolio Madison WI, yard makeover gallery, professional lawn results',
  alternates: {
    canonical: 'https://tgyardcare.com/gallery',
  },
  openGraph: {
    title: 'Before & After Gallery | TotalGuard Madison',
    description: 'See 50+ lawn transformations in Madison WI. Real before/after photos of mowing, mulching & gutter cleaning. Get inspired!',
    url: 'https://tgyardcare.com/gallery',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function GalleryPage() {
  return <GalleryContent />;
}
