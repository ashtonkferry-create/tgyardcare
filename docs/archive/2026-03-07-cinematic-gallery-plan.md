# Cinematic Portfolio Gallery — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the TotalGuard gallery page into a cinematic, dark-themed portfolio showcase with 33 hardcoded images, category filtering, upgraded lightbox, seasonal theming, and animations.

**Architecture:** Complete rewrite of `GalleryContent.tsx` using the exact same dark theme pattern as ReviewsContent/AboutContent (seasonalAccent + seasonalBg objects, `useSeasonalTheme()`, GlassCard, ScrollReveal, AmbientParticles). Upgrade existing `ImageLightbox.tsx` with backdrop blur and animations. All 33 images hardcoded as static imports (19 portfolio) + public paths (14 before/after combined).

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 3.4, Framer Motion, next/image, existing seasonal theme system

---

### Task 1: Create Gallery Data Module

**Files:**
- Create: `src/lib/galleryData.ts`

**Step 1: Create the data file with all 33 images organized by category**

```typescript
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
  // ── Lawn Care (5) ──
  { id: 'lc-1', src: mowing1, title: 'Professional Mowing', service: 'Lawn Mowing', category: 'lawn-care' },
  { id: 'lc-2', src: lawnCare1, title: 'Full Lawn Care', service: 'Lawn Maintenance', category: 'lawn-care' },
  { id: 'lc-3', src: edging1, title: 'Precision Edging', service: 'Edging', category: 'lawn-care' },
  { id: 'lc-4', src: fertilization1, title: 'Fertilization Treatment', service: 'Fertilization', category: 'lawn-care' },
  { id: 'lc-5', src: herbicide1, title: 'Weed Control Application', service: 'Herbicide', category: 'lawn-care' },

  // ── Garden & Landscape (8) ──
  { id: 'gl-1', src: gardenBed1, title: 'Garden Bed Makeover', service: 'Garden Beds', category: 'garden-landscape' },
  { id: 'gl-2', src: mulching1, title: 'Fresh Mulch Install', service: 'Mulching', category: 'garden-landscape' },
  { id: 'gl-3', src: pruning1, title: 'Expert Pruning', service: 'Pruning', category: 'garden-landscape' },
  { id: 'gl-4', src: pruning2, title: 'Shrub Shaping', service: 'Pruning', category: 'garden-landscape' },
  { id: 'gl-5', src: weeding1, title: 'Complete Weeding', service: 'Weeding', category: 'garden-landscape' },
  { id: 'gl-6', src: weeding2, title: 'Bed Restoration', service: 'Weeding', category: 'garden-landscape' },
  { id: 'gl-7', src: weeding3, title: 'Deep Clean Weeding', service: 'Weeding', category: 'garden-landscape' },
  { id: 'gl-8', src: landscape1, title: 'Landscape Design', service: 'Landscaping', category: 'garden-landscape' },

  // ── Gutters (2) ──
  { id: 'gt-1', src: gutterCleaning1, title: 'Gutter Cleaning', service: 'Gutter Cleaning', category: 'gutters' },
  { id: 'gt-2', src: gutterGuards1, title: 'Gutter Guard Install', service: 'Gutter Guards', category: 'gutters' },

  // ── Seasonal (4) ──
  { id: 'ss-1', src: fallCleanup1, title: 'Fall Cleanup', service: 'Fall Cleanup', category: 'seasonal' },
  { id: 'ss-2', src: springCleanup1, title: 'Spring Cleanup', service: 'Spring Cleanup', category: 'seasonal' },
  { id: 'ss-3', src: snowRemoval1, title: 'Snow Removal', service: 'Snow Removal', category: 'seasonal' },
  { id: 'ss-4', src: leafRemoval1, title: 'Leaf Removal', service: 'Leaf Removal', category: 'seasonal' },

  // ── Before & After (14) — public paths ──
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
```

**Step 2: Commit**

```bash
cd tgyardcare && git add src/lib/galleryData.ts && git commit -m "feat: add hardcoded gallery data module with 33 images"
```

---

### Task 2: Upgrade ImageLightbox with Backdrop Blur and Animations

**Files:**
- Modify: `src/components/ImageLightbox.tsx`

**Step 1: Rewrite ImageLightbox with Framer Motion, backdrop blur, swipe support, and next/image**

Key changes:
- Replace `<img>` with `next/image` (unoptimized for public paths, optimized for imports)
- Add Framer Motion `AnimatePresence` + `motion.div` for smooth open/close
- Backdrop: `bg-black/90 backdrop-blur-xl` instead of `bg-black/95`
- Scale-in animation: `initial={{ opacity: 0, scale: 0.9 }}` → `animate={{ opacity: 1, scale: 1 }}`
- Add title + service label below the image
- Add touch swipe support via `onTouchStart`/`onTouchEnd` handlers (50px threshold)
- Keep existing keyboard nav (arrow keys + escape)

```typescript
'use client';

import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  service: string;
  onPrevious?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalImages?: number;
}

export function ImageLightbox({
  isOpen, onClose, imageUrl, title, service,
  onPrevious, onNext, currentIndex, totalImages,
}: ImageLightboxProps) {
  const touchStartX = useRef<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrevious) onPrevious();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKey);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose, onPrevious, onNext]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && onNext) onNext();
      if (diff < 0 && onPrevious) onPrevious();
    }
    touchStartX.current = null;
  }, [onNext, onPrevious]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center"
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close */}
          <button onClick={onClose} className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors" aria-label="Close">
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Counter */}
          {currentIndex !== undefined && totalImages && (
            <div className="absolute top-4 left-4 z-50 px-4 py-2 bg-white/10 rounded-full">
              <span className="text-white font-semibold text-sm">{currentIndex + 1} / {totalImages}</span>
            </div>
          )}

          {/* Prev */}
          {onPrevious && (
            <button onClick={(e) => { e.stopPropagation(); onPrevious(); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors" aria-label="Previous">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Next */}
          {onNext && (
            <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors" aria-label="Next">
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Image with scale-in */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative max-w-[90vw] max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imageUrl}
              alt={`${service} — ${title} — TotalGuard Yard Care Madison WI`}
              width={1200}
              height={800}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              unoptimized={imageUrl.startsWith('/')}
            />
          </motion.div>

          {/* Caption */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="mt-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white font-semibold text-lg">{title}</p>
            <p className="text-white/50 text-sm">{service}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ImageLightbox.tsx && git commit -m "feat: upgrade lightbox with backdrop blur, animations, swipe gestures"
```

---

### Task 3: Rewrite GalleryContent — Complete Cinematic Page

**Files:**
- Rewrite: `src/app/gallery/GalleryContent.tsx`

**Step 1: Complete rewrite with all 6 sections**

This is the main deliverable. The component should:

1. Import `galleryImages`, `categories`, `GalleryCategory` from `@/lib/galleryData`
2. Import seasonal theme system (`useSeasonalTheme`, same `seasonalAccent`/`seasonalBg` objects as ReviewsContent)
3. Import `ScrollReveal`, `AmbientParticles`, `AnimatedCounter`, `GlassCard`, `CTASection`, `ImageLightbox`
4. Import `Navigation`, `Footer`, schema components
5. Use `useState` for `activeCategory` (default 'all') and lightbox state (`selectedIndex`, `isLightboxOpen`)
6. Filter images with `useMemo` based on `activeCategory`
7. Resolve image src with helper: `typeof img.src === 'string' ? img.src : img.src.src`

**Sections:**

**Hero** (matches ReviewsContent hero pattern exactly):
- Dark gradient bg with `style={{ background: bg.hero }}`
- AmbientParticles density="sparse"
- ScrollReveal heading: "Our Work Speaks for Itself"
- Subtitle: "33+ real project photos from Madison-area properties. No stock photos, no filters — just professional results."
- Seasonal accent underline bar

**Category Filter Bar:**
- Flex-wrap centered row of pill buttons
- Each pill: `px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300`
- Active: seasonal accent bg + white text + glow shadow
- Inactive: `bg-white/[0.06] text-white/60 hover:text-white hover:bg-white/[0.1]`
- AnimatePresence on grid items when category changes

**Portfolio Grid:**
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6`
- Each card wrapped in ScrollReveal with staggered delay (index * 0.06, capped)
- Card: `group relative rounded-2xl overflow-hidden border border-white/[0.08] cursor-pointer`
- Hover: `hover:-translate-y-1 hover:shadow-2xl` + seasonal border glow
- next/image with `sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"`
- Bottom gradient overlay: `absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`
- Overlay content: title + service + "View Full Size" label
- onClick: opens lightbox at that index

**Lightbox Integration:**
- Track `selectedIndex` in state
- Pass `filteredImages[selectedIndex]` to ImageLightbox
- onPrevious/onNext cycle through filteredImages array
- Close resets selectedIndex to null

**Stats Strip** (matches ReviewsContent pattern):
- Dark section bg with `style={{ background: bg.section }}`
- 4 GlassCard stat boxes: "100+" Properties, "4.9" Rating, "127" Reviews, "24hr" Response
- AnimatedCounter for numbers
- Seasonal accent text color on numbers

**CTA:**
- `<CTASection />`

**Step 2: Commit**

```bash
git add src/app/gallery/GalleryContent.tsx && git commit -m "feat: cinematic gallery with 33 images, categories, lightbox, seasonal theme"
```

---

### Task 4: Update Page Metadata

**Files:**
- Modify: `src/app/gallery/page.tsx`

**Step 1: Update metadata to reflect 33+ images and new page copy**

- Change title to: `"Project Gallery | 33+ Real Transformations | TotalGuard Madison"`
- Update description to match new content
- Update OG metadata to match

**Step 2: Commit**

```bash
git add src/app/gallery/page.tsx && git commit -m "feat: update gallery page metadata for 33+ images"
```

---

### Task 5: Visual QA with Playwright

**Step 1: Screenshot at 375px, 768px, 1440px**

Use Playwright MCP to:
1. Navigate to `/gallery`
2. Screenshot at 375px width (mobile)
3. Screenshot at 768px width (tablet)
4. Screenshot at 1440px width (desktop)

**Step 2: Verify:**
- All 33 images render (in "All" category)
- Category filter pills work
- Dark theme consistent with rest of site
- No white/chrome backgrounds
- Lightbox opens on image click
- Stats counters animate
- Mobile layout is single column

**Step 3: Fix any visual issues found**

**Step 4: Commit fixes if any**

---

### Task 6: Push and Final Verification

**Step 1: Push to remote**

```bash
git push origin main
```

**Step 2: Verify Vercel preview deployment succeeds**
