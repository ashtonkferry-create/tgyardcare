# Full Season Property Care - Billionaire Brand Redesign

**Date**: 2026-03-07
**Component**: `src/components/FullSeasonContract.tsx`
**Used in**: `src/app/HomeContent.tsx` (line 384)

## Problem

The current Full Season section is functional but weak. It uses the same green/emerald palette as the rest of the site, has a linear stacked layout with no visual drama, and doesn't communicate "flagship premium offering" — it looks like just another section.

## Design Direction: Seasonal Timeline Arc

A horizontal timeline showing 4 seasons as a continuous journey with an animated golden "coverage beam" sweeping across all 12 months. Premium luxury feel with gold/amber accents.

## Color Palette

**Section-specific (NOT site-wide green):**
- Background: #0A0A0F (rich black, deeper than current slate)
- Gold primary accent: #D4A855 -> #F5C842 (gradient)
- Gold glow: rgba(212, 168, 85, 0.15)

**Season jewel tones:**
| Season | Color | Hex |
|--------|-------|-----|
| Spring | Emerald | #10B981 |
| Summer | Sapphire | #3B82F6 |
| Fall | Copper | #C87533 |
| Winter | Platinum | #94A3B8 |

## Layout Architecture (3 tiers)

### Tier 1: Hero Header
- "FLAGSHIP PROPERTY CARE" badge — gold shimmer, gold border, gold text
- "Full Season" in gold gradient (#D4A855 -> #F5C842), "Property Care" in white
- Subheadline: "One contract. Twelve months. Zero gaps."

### Tier 2: Timeline Arc (centerpiece)
- Horizontal timeline bar spanning full width (max-w-5xl)
- Divided into 4 season segments, each in its jewel color
- Animated golden pulse "beam" sweeps left-to-right every 4 seconds
- Month labels (Jan-Dec) below the timeline
- 4 large season cards above the timeline (horizontal on desktop, 2x2 on mobile)
  - Each card: glass-morphism bg, top border in jewel color, season icon, name, tagline, service count
  - Hover/click: card lifts, border glows, service list expands with staggered reveals
  - Mobile: accordion behavior (click to expand, others collapse)

### Tier 3: Value Proposition + CTA
- 3-column benefits with animated counters:
  1. "15-20%" — Bundle savings vs. booking separately
  2. "365 Days" — Continuous coverage, no seasonal gaps
  3. "1 Team" — Same crew, same standards, year-round
- Gold gradient CTA button: "Lock In Full Season Coverage"
  - Continuous shimmer sweep, hover: scale(1.03) + gold glow shadow
  - Dark text on gold for contrast
- Secondary: "Or call (608) 535-6057"
- Trust line: "Trusted by 127 Madison families year-round | 4.9 Google Rating"

## Animation Spec

### On scroll-into-view:
1. Badge fades in (0ms)
2. Headline fades in (100ms)
3. Timeline bar draws left-to-right (300ms, duration 1.5s)
4. Each season segment lights up in sequence during the draw
5. Month labels fade in staggered (50ms apart) as timeline draws
6. Season cards stagger in (200ms apart) after timeline completes
7. Benefits row fades in (after cards)
8. CTA fades in last

### Continuous animations:
- Golden pulse beam sweeps across timeline every 4s
- Subtle dot-grid background at 5% opacity
- Single large radial gradient in deep gold/amber at 8% behind timeline
- CTA button shimmer sweep

### Interactions:
- Season cards: hover = translateY(-6px) + jewel-color border glow + shadow bloom
- Season cards: click = service list expands with staggered item reveals
- Season icon: gentle rotate on hover only (not constant wobble)
- CTA: scale(1.03) + gold glow on hover

## Content

### Season Cards
| Season | Icon | Tagline | Services |
|--------|------|---------|----------|
| Spring | Leaf | Revival & Renewal | Spring Cleanup, Lawn Recovery, Edging & Trimming, Mulching, Garden Bed Prep, Early Fertilization |
| Summer | Sun | Peak Performance | Weekly Mowing, Weed Control, Herbicide Treatments, Bush Trimming, Garden Maintenance, Property Upkeep |
| Fall | Sparkles | Protect & Prepare | Leaf Removal, Fall Cleanup, Aeration, Overseeding, Gutter Cleaning, Winterization |
| Winter | Snowflake | Safe & Secure | Snow Removal, Ice Management, Salting, Gutter Guards, Property Monitoring, Emergency Response |

### Benefits (3 items with counter animation)
1. **15-20%** — "Bundle savings vs. booking separately"
2. **365 Days** — "Continuous coverage, no seasonal gaps"
3. **1 Team** — "Same crew, same standards, year-round"

## What's Being Removed
- Floating green particles (replaced with subtle dot grid)
- All-green color scheme (replaced with gold + jewel tones)
- Small pill-style season buttons (replaced with large interactive cards)
- Click-to-expand popup panel (replaced with inline card expansion)
- 4-item text-only benefits strip (replaced with 3-item animated counter row)
- Generic trust badges (replaced with specific full-season social proof)
- Current savings callout pill (integrated into benefits counter)

## Technical Notes
- Keep 'use client' — component requires useState + Framer Motion
- Keep AmbientParticles import but switch density or replace with dot grid
- Reuse existing AnimatedCounter from `src/components/AnimatedCounter.tsx`
- Keep contact link: `/contact?service=full-season`
- Phone: (608) 535-6057
