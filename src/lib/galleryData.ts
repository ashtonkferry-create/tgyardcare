// src/lib/galleryData.ts

// Portfolio images (static imports for Next.js optimization)
import mowing1 from '@/assets/portfolio/mowing-1.png';
import lawnCare1 from '@/assets/portfolio/lawn-care-1.png';
import edging1 from '@/assets/portfolio/edging-1.png';
import fertilization1 from '@/assets/portfolio/fertilization-1.png';
import herbicide1 from '@/assets/portfolio/herbicide-1.png';
import gardenBed1 from '@/assets/portfolio/garden-bed-1.png';
import mulching1 from '@/assets/portfolio/mulching-1.png';
import pruning1 from '@/assets/portfolio/pruning-1.png';
import pruning2 from '@/assets/portfolio/pruning-2.png';
import weeding1 from '@/assets/portfolio/weeding-1.png';
import weeding2 from '@/assets/portfolio/weeding-2.png';
import weeding3 from '@/assets/portfolio/weeding-3.png';
import landscape1 from '@/assets/portfolio/landscape-1.png';
import gutterCleaning1 from '@/assets/portfolio/gutter-cleaning-1.png';
import gutterGuards1 from '@/assets/portfolio/gutter-guards-1.png';
import fallCleanup1 from '@/assets/portfolio/fall-cleanup-1.png';
import springCleanup1 from '@/assets/portfolio/spring-cleanup-1.png';
import snowRemoval1 from '@/assets/portfolio/snow-removal-1.png';
import leafRemoval1 from '@/assets/portfolio/leaf-removal-1.png';

export type GalleryCategory = 'all' | 'lawn-care' | 'garden-landscape' | 'gutters' | 'seasonal' | 'before-after';

export interface GalleryImage {
  id: string;
  src: string | { src: string };
  title: string;
  service: string;
  category: GalleryCategory;
}

export const categories: { key: GalleryCategory; label: string }[] = [
  { key: 'all', label: 'All Projects' },
  { key: 'lawn-care', label: 'Lawn Care' },
  { key: 'garden-landscape', label: 'Garden & Landscape' },
  { key: 'gutters', label: 'Gutters' },
  { key: 'seasonal', label: 'Seasonal' },
  { key: 'before-after', label: 'Before & After' },
];

export const galleryImages: GalleryImage[] = [
  // Lawn Care (5)
  { id: 'lc-1', src: mowing1, title: 'Professional Mowing', service: 'Lawn Mowing', category: 'lawn-care' },
  { id: 'lc-2', src: lawnCare1, title: 'Full Lawn Care', service: 'Lawn Maintenance', category: 'lawn-care' },
  { id: 'lc-3', src: edging1, title: 'Precision Edging', service: 'Edging', category: 'lawn-care' },
  { id: 'lc-4', src: fertilization1, title: 'Fertilization Treatment', service: 'Fertilization', category: 'lawn-care' },
  { id: 'lc-5', src: herbicide1, title: 'Weed Control Application', service: 'Herbicide', category: 'lawn-care' },

  // Garden & Landscape (8)
  { id: 'gl-1', src: gardenBed1, title: 'Garden Bed Makeover', service: 'Garden Beds', category: 'garden-landscape' },
  { id: 'gl-2', src: mulching1, title: 'Fresh Mulch Install', service: 'Mulching', category: 'garden-landscape' },
  { id: 'gl-3', src: pruning1, title: 'Expert Pruning', service: 'Pruning', category: 'garden-landscape' },
  { id: 'gl-4', src: pruning2, title: 'Shrub Shaping', service: 'Pruning', category: 'garden-landscape' },
  { id: 'gl-5', src: weeding1, title: 'Complete Weeding', service: 'Weeding', category: 'garden-landscape' },
  { id: 'gl-6', src: weeding2, title: 'Bed Restoration', service: 'Weeding', category: 'garden-landscape' },
  { id: 'gl-7', src: weeding3, title: 'Deep Clean Weeding', service: 'Weeding', category: 'garden-landscape' },
  { id: 'gl-8', src: landscape1, title: 'Landscape Design', service: 'Landscaping', category: 'garden-landscape' },

  // Gutters (2)
  { id: 'gt-1', src: gutterCleaning1, title: 'Gutter Cleaning', service: 'Gutter Cleaning', category: 'gutters' },
  { id: 'gt-2', src: gutterGuards1, title: 'Gutter Guard Install', service: 'Gutter Guards', category: 'gutters' },

  // Seasonal (4)
  { id: 'ss-1', src: fallCleanup1, title: 'Fall Cleanup', service: 'Fall Cleanup', category: 'seasonal' },
  { id: 'ss-2', src: springCleanup1, title: 'Spring Cleanup', service: 'Spring Cleanup', category: 'seasonal' },
  { id: 'ss-3', src: snowRemoval1, title: 'Snow Removal', service: 'Snow Removal', category: 'seasonal' },
  { id: 'ss-4', src: leafRemoval1, title: 'Leaf Removal', service: 'Leaf Removal', category: 'seasonal' },

  // Before & After (14) — public paths
  { id: 'ba-1', src: '/gallery/fertilization-combined.png', title: 'Fertilization Transformation', service: 'Fertilization', category: 'before-after' },
  { id: 'ba-2', src: '/gallery/garden-beds-combined.png', title: 'Garden Bed Transformation', service: 'Garden Beds', category: 'before-after' },
  { id: 'ba-3', src: '/gallery/gutter-cleaning-combined.png', title: 'Gutter Cleaning Results', service: 'Gutter Cleaning', category: 'before-after' },
  { id: 'ba-4', src: '/gallery/gutter-cleaning-combined-1.png', title: 'Gutter Cleaning Before & After', service: 'Gutter Cleaning', category: 'before-after' },
  { id: 'ba-5', src: '/gallery/gutter-guards-combined.png', title: 'Gutter Guard Installation', service: 'Gutter Guards', category: 'before-after' },
  { id: 'ba-6', src: '/gallery/herbicide-combined.png', title: 'Herbicide Treatment Results', service: 'Herbicide', category: 'before-after' },
  { id: 'ba-7', src: '/gallery/leaf-removal-combined.png', title: 'Leaf Removal Before & After', service: 'Leaf Removal', category: 'before-after' },
  { id: 'ba-8', src: '/gallery/leaf-removal-combined-1.png', title: 'Leaf Cleanup Transformation', service: 'Leaf Removal', category: 'before-after' },
  { id: 'ba-9', src: '/gallery/mulching-combined.png', title: 'Mulching Transformation', service: 'Mulching', category: 'before-after' },
  { id: 'ba-10', src: '/gallery/mulching-combined-2.png', title: 'Fresh Mulch Before & After', service: 'Mulching', category: 'before-after' },
  { id: 'ba-11', src: '/gallery/pruning-combined.png', title: 'Pruning Results', service: 'Pruning', category: 'before-after' },
  { id: 'ba-12', src: '/gallery/pruning-combined-2.png', title: 'Expert Pruning Before & After', service: 'Pruning', category: 'before-after' },
  { id: 'ba-13', src: '/gallery/weeding-cleanup-combined.png', title: 'Weeding Cleanup Results', service: 'Weeding', category: 'before-after' },
  { id: 'ba-14', src: '/gallery/weeding-combined.png', title: 'Weeding Before & After', service: 'Weeding', category: 'before-after' },
];

// Helper to resolve image src (static import vs string path)
export function resolveImageSrc(src: string | { src: string }): string {
  return typeof src === 'string' ? src : src.src;
}
