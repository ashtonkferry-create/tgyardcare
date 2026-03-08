# Cinematic Portfolio Gallery — Design Document

**Date**: 2026-03-07
**Status**: Approved
**Approach**: Cinematic Portfolio Showcase (Approach A)

## Problem

The gallery page currently:
- Fetches from an empty Supabase `gallery_items` table — shows nothing
- Uses light/white backgrounds inconsistent with the rest of the billionaire-upgraded site
- Has no lightbox integration despite `ImageLightbox.tsx` existing
- References "19+ stunning photos" in copy but displays zero
- No seasonal theming, no animations, no hover effects

## Solution

Hardcode all 33 images directly into the component. Dark cinematic theme matching every other upgraded page. Category filtering, masonry grid, upgraded lightbox, seasonal theming.

## Photo Inventory

### Portfolio Images (19) — `src/assets/portfolio/`

| File | Category |
|------|----------|
| mowing-1.png | Lawn Care |
| lawn-care-1.png | Lawn Care |
| edging-1.png | Lawn Care |
| fertilization-1.png | Lawn Care |
| herbicide-1.png | Lawn Care |
| garden-bed-1.png | Garden & Landscape |
| mulching-1.png | Garden & Landscape |
| pruning-1.png | Garden & Landscape |
| pruning-2.png | Garden & Landscape |
| weeding-1.png | Garden & Landscape |
| weeding-2.png | Garden & Landscape |
| weeding-3.png | Garden & Landscape |
| landscape-1.png | Garden & Landscape |
| gutter-cleaning-1.png | Gutters |
| gutter-guards-1.png | Gutters |
| fall-cleanup-1.png | Seasonal |
| spring-cleanup-1.png | Seasonal |
| snow-removal-1.png | Seasonal |
| leaf-removal-1.png | Seasonal |

### Before & After Combined Images (14) — `public/gallery/`

| File | Category |
|------|----------|
| fertilization-combined.png | Before & After |
| garden-beds-combined.png | Before & After |
| gutter-cleaning-combined.png | Before & After |
| gutter-cleaning-combined-1.png | Before & After |
| gutter-guards-combined.png | Before & After |
| herbicide-combined.png | Before & After |
| leaf-removal-combined.png | Before & After |
| leaf-removal-combined-1.png | Before & After |
| mulching-combined.png | Before & After |
| mulching-combined-2.png | Before & After |
| pruning-combined.png | Before & After |
| pruning-combined-2.png | Before & After |
| weeding-cleanup-combined.png | Before & After |
| weeding-combined.png | Before & After |

**Total: 33 images**

## Page Architecture

### Section 1: Cinematic Hero
- Dark gradient background with seasonal theming
- `AmbientParticles` overlay
- Heading: "Our Work Speaks for Itself"
- Subtitle: real Madison-area transformations, no stock photos
- Staggered blur-fade entrance animation

### Section 2: Category Filter Bar
- Horizontal pill navigation
- Categories: All | Lawn Care | Garden & Landscape | Gutters | Seasonal | Before & After
- Active pill: seasonal accent color + glow shadow
- Smooth animated transitions on category switch
- Items stagger-animate in on filter change

### Section 3: Portfolio Masonry Grid
- Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop
- Each card: rounded corners, seasonal border glow on hover
- Hover: translateY(-4px) + scale(1.02) + shadow increase
- Bottom gradient overlay with service name + "View Full Size"
- Click opens fullscreen lightbox

### Section 4: Upgraded Lightbox
- Backdrop blur (not solid black)
- Smooth scale-in animation on open
- Swipe gestures on mobile
- Image title + category label below image
- Arrow key + escape keyboard navigation (existing)
- Image counter (existing)

### Section 5: Stats & Trust Strip
- Dark background, glass-morphism cards
- Animated counters: 100+ Properties, 4.9 Rating, 127 Reviews, 24hr Response
- Seasonal border accents

### Section 6: CTA
- Existing `CTASection` component

## Technical Decisions
- **No Supabase dependency** — all images hardcoded as static imports
- **Next.js Image optimization** — portfolio images imported from `src/assets/`, public images via `/gallery/` paths
- **Seasonal theming** via `useSeasonalTheme()` context (existing)
- **Reuse existing components**: ScrollReveal, AmbientParticles, CTASection, GlassCard patterns
- **Upgrade ImageLightbox** in-place (backward compatible)

## Files to Create/Modify
- `src/app/gallery/GalleryContent.tsx` — complete rewrite
- `src/components/ImageLightbox.tsx` — upgrade with backdrop blur, animations, swipe
- `src/app/gallery/page.tsx` — may need metadata updates
