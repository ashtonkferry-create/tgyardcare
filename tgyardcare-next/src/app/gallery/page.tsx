import type { Metadata } from 'next';
import GalleryContent from './GalleryContent';

export const metadata: Metadata = {
  title: 'Before & After Gallery | TotalGuard Madison',
  description: "See 50+ lawn transformations in Madison WI. Real before/after photos of mowing, mulching & gutter cleaning. Get inspired!",
  keywords: 'before after lawn care Madison, lawn transformation photos, landscaping portfolio Madison WI, yard makeover gallery, professional lawn results',
  alternates: {
    canonical: 'https://tgyardcare.com/gallery',
  },
};

export default function GalleryPage() {
  return <GalleryContent />;
}
