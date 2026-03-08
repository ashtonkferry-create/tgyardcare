# Winter Wonderland 10x Homepage Enhancement — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Enhance all 14 homepage sections with winter wonderland frost design language, scroll-triggered Framer Motion animations, micro-interactions, and dark/light rhythm — without changing section structure or content.

**Architecture:** Each section gets targeted CSS/JSX upgrades. A shared `useScrollReveal` hook provides consistent Framer Motion scroll-triggered animations. New CSS keyframes in `globals.css` power aurora shimmer and frost glow effects. All existing component hierarchies and content stay unchanged.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 3.4, Framer Motion 12, Lucide React icons, existing shadcn/ui components

---

## Task 1: Add Shared Animation Utilities

**Files:**
- Create: `src/hooks/useScrollReveal.ts`
- Modify: `src/app/globals.css` (add new keyframes after line 266)

**Step 1: Create the useScrollReveal hook**

```tsx
// src/hooks/useScrollReveal.ts
'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

export function useScrollReveal(options?: { once?: boolean; margin?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    margin: options?.margin ?? '-80px',
    amount: options?.amount ?? 0.2,
  });
  return { ref, isInView };
}
```

**Step 2: Add new CSS keyframes to globals.css**

Add after the `.animate-pulse-subtle` block (after line 268):

```css
/* Winter Wonderland Enhancements */
@keyframes aurora-shimmer {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes frost-glow {
  0%, 100% {
    box-shadow: 0 0 15px 0 rgba(56, 189, 248, 0);
  }
  50% {
    box-shadow: 0 0 15px 2px rgba(56, 189, 248, 0.15);
  }
}

@keyframes frost-text-glow {
  0%, 100% {
    text-shadow: 0 0 20px rgba(56, 189, 248, 0);
  }
  50% {
    text-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
  }
}

@keyframes shimmer-btn {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

@keyframes draw-line {
  from {
    stroke-dashoffset: 1;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.animate-aurora-shimmer {
  background-size: 200% 200%;
  animation: aurora-shimmer 8s ease-in-out infinite;
}

.animate-frost-glow {
  animation: frost-glow 3s ease-in-out infinite;
}

.animate-frost-text-glow {
  animation: frost-text-glow 3s ease-in-out infinite;
}

.animate-shimmer-btn {
  background-size: 200% auto;
  animation: shimmer-btn 3s linear infinite;
}
```

**Step 3: Verify build**

Run: `cd c:/Users/vance/OneDrive/Desktop/claude-workspace/tgyardcare-next && npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/hooks/useScrollReveal.ts src/app/globals.css
git commit -m "feat: add shared scroll reveal hook and winter animation keyframes"
```

---

## Task 2: Upgrade PromoBanner (Dark Winter)

**Files:**
- Modify: `src/components/PromoBanner.tsx` (lines 80-106)

**Step 1: Update the banner background and snow particles**

Replace the banner container class (line 81-86) with:
```tsx
<div className={cn(
  "text-white py-2.5 px-4 border-b relative overflow-hidden",
  isWinter
    ? "bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 border-cyan-500/20"
    : "bg-primary border-primary-foreground/10"
)}>
```

In the snow particles section (lines 87-106), update the particle rendering:
- Increase count from 8 to 12
- Add varied sizes: `width: ${1.5 + Math.random() * 3}px`
- Add glow filter: `filter: 'blur(0.5px) drop-shadow(0 0 2px rgba(147, 197, 253, 0.5))'`
- Add subtle sway with `animationName: 'snow-fall'`

Also add `animate-frost-text-glow` to the main CTA text span for a subtle frost shimmer.

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/components/PromoBanner.tsx
git commit -m "feat: upgrade PromoBanner with deep winter gradient and frost particles"
```

---

## Task 3: Upgrade Trust Stats Strip (White Section)

**Files:**
- Modify: `src/app/HomeContent.tsx` (lines 180-201)

**Step 1: Add Framer Motion import to HomeContent.tsx**

Add at top of file:
```tsx
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
```

**Step 2: Replace the Trust Stats section (lines 180-201)**

Replace inline stats with animated version:
- Keep `bg-primary text-primary-foreground` (stays green/primary, not dark)
- Add Framer Motion `motion.div` wrappers on each stat with staggered fade-in-up
- Add ice-blue accent line above each stat: `<div className="w-8 h-0.5 bg-white/30 mx-auto mb-3" />`
- Use `useScrollReveal()` on the section
- Stagger: each stat gets `transition={{ delay: index * 0.1, duration: 0.5 }}`
- Initial: `{{ opacity: 0, y: 20 }}` → Animate when in view: `{{ opacity: 1, y: 0 }}`

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/app/HomeContent.tsx
git commit -m "feat: add staggered scroll reveal animations to trust stats strip"
```

---

## Task 4: Upgrade Trust Badges Section (White Section)

**Files:**
- Modify: `src/app/HomeContent.tsx` (lines 217-270)

**Step 1: Upgrade trust badge cards**

Replace badge card wrappers (lines 220-266) with Framer Motion versions:
- Wrap each badge group in `motion.div` with stagger delay (0, 0.15, 0.3)
- Add frost-glass styling: `className="flex items-center gap-3 group bg-white/80 backdrop-blur-sm border border-blue-100/40 rounded-xl px-4 py-3 shadow-sm hover:shadow-blue-200/30 hover:border-blue-200/60 transition-all duration-300"`
- Add scale hover: `whileHover={{ scale: 1.03 }}`
- Icons get `group-hover:animate-pulse-subtle`
- Initial: `{{ opacity: 0, y: 15 }}` → `{{ opacity: 1, y: 0 }}`

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/HomeContent.tsx
git commit -m "feat: frost-glass trust badges with staggered scroll animations"
```

---

## Task 5: Upgrade WinterHero Snowfall & Typography

**Files:**
- Modify: `src/components/WinterHero.tsx`

**Step 1: Upgrade snowfall particles**

In the snow particle rendering:
- Increase variety: mix of 3 sizes (small 2px, medium 4px, large 6px with glow halo)
- Add `drop-shadow(0 0 4px rgba(147, 197, 253, 0.6))` to larger particles
- Add gentle rotation: include `rotate` in transform animation
- Add frost-crystal shapes for some particles (hexagonal via clip-path or simple diamond rotate-45)

**Step 2: Upgrade hero typography**

- Main headline: add `tracking-tight` and bump to `text-5xl md:text-6xl lg:text-7xl font-extrabold`
- Add `animate-frost-text-glow` to the gradient text span
- Stagger words with increasing delay if not already doing so

**Step 3: Upgrade CTA buttons**

- Primary CTA: add `animate-shimmer-btn` with `bg-gradient-to-r from-primary via-cyan-400 to-primary bg-[length:200%_auto]`
- Secondary CTA: add `border-white/30 hover:border-cyan-400/50 hover:shadow-cyan-400/20 hover:shadow-lg transition-all`
- Add frost edge vignette: `<div className="absolute inset-0 pointer-events-none border border-white/5 rounded-none" style={{ boxShadow: 'inset 0 0 80px rgba(0,0,0,0.3)' }} />`

**Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/components/WinterHero.tsx
git commit -m "feat: premium snowfall, frost typography, and shimmer CTAs in WinterHero"
```

---

## Task 6: Upgrade WhyMadisonTrust (Already Dark — Add Scroll Animations)

**Files:**
- Modify: `src/components/WhyMadisonTrust.tsx`

**Step 1: Add Framer Motion scroll reveals**

Import `motion` and `useScrollReveal` at top.

Wrap the 3 trust cards in `motion.div` with stagger:
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
>
```

**Step 2: Add frost glow to hover states**

On card hover, add `animate-frost-glow` class via Tailwind group-hover or inline:
- Non-featured cards: `hover:shadow-blue-400/20 hover:shadow-xl`
- Featured card: `hover:shadow-amber-500/40 hover:shadow-2xl`

**Step 3: Add blur-fade to section header**

Wrap the header badge + title in `motion.div`:
```tsx
<motion.div
  initial={{ opacity: 0, filter: 'blur(10px)' }}
  animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
  transition={{ duration: 0.8 }}
>
```

**Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/components/WhyMadisonTrust.tsx
git commit -m "feat: scroll-triggered blur-fade and frost glow on WhyMadisonTrust"
```

---

## Task 7: Upgrade WinterPriorityServices (Light Section — Add Animations)

**Files:**
- Modify: `src/components/WinterPriorityServices.tsx`

**Step 1: Add Framer Motion imports and scroll reveal**

Import `motion` from `framer-motion` and `useScrollReveal` from hook.

**Step 2: Add staggered card reveals**

Wrap each pricing card in `motion.div`:
- Initial: `{{ opacity: 0, y: 25, scale: 0.97 }}`
- In view: `{{ opacity: 1, y: 0, scale: 1 }}`
- Stagger: `delay: index * 0.12`

**Step 3: Add ice-blue accent to section header**

- Under the main headline, add a decorative frost line:
  ```tsx
  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mt-4" />
  ```

**Step 4: Add hover lift to cards**

On cards that don't already have hover effects:
- `whileHover={{ y: -4, transition: { duration: 0.2 } }}`

**Step 5: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 6: Commit**

```bash
git add src/components/WinterPriorityServices.tsx
git commit -m "feat: staggered scroll reveals and frost accents on WinterPriorityServices"
```

---

## Task 8: Upgrade Services Carousel (White Section)

**Files:**
- Modify: `src/app/HomeContent.tsx` (lines 273-367)

**Step 1: Add scroll reveal to services section**

Wrap the services section (line 273) content in `useScrollReveal`:
- Section header gets blur-fade: `initial={{ opacity: 0, filter: 'blur(8px)' }}` → `{{ opacity: 1, filter: 'blur(0px)' }}`
- Badge gets `animate-frost-glow` when in view

**Step 2: Upgrade carousel navigation**

- Prev/next buttons: add `bg-primary/5 hover:bg-primary/15 border border-border/50 hover:border-primary/30` (frosted pill style)
- Active dot: add subtle glow `shadow-sm shadow-primary/30`

**Step 3: Add hover lift to Residential/Commercial quick links**

- Add `hover:scale-[1.02] hover:shadow-md transition-all` to both Link elements (lines 328-344)

**Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/app/HomeContent.tsx
git commit -m "feat: frost animations and hover polish on services carousel section"
```

---

## Task 9: Upgrade FullSeasonContract (Already Dark — Polish)

**Files:**
- Modify: `src/components/FullSeasonContract.tsx`

**Step 1: Add aurora shimmer to background**

Add an extra gradient layer with `animate-aurora-shimmer`:
```tsx
<div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-cyan-900/10 to-blue-900/10 animate-aurora-shimmer pointer-events-none" />
```

**Step 2: Add frost glow to season buttons on hover**

On the season button cards, add:
- `hover:shadow-lg hover:shadow-cyan-500/10`
- Active season button: `animate-frost-glow`

**Step 3: Upgrade the primary CTA**

Add shimmer effect to the main CTA button:
- Add `animate-shimmer-btn` class
- `bg-gradient-to-r from-primary via-emerald-400 to-primary bg-[length:200%_auto]`

**Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/components/FullSeasonContract.tsx
git commit -m "feat: aurora shimmer and frost glow polish on FullSeasonContract"
```

---

## Task 10: Upgrade Before/After Gallery (White Section)

**Files:**
- Modify: `src/app/HomeContent.tsx` (lines 375-433)

**Step 1: Add scroll reveal animations**

Wrap the section content in `useScrollReveal`:
- Image gets `initial={{ opacity: 0, x: -30 }}` → `{{ opacity: 1, x: 0 }}`
- Text panel gets `initial={{ opacity: 0, x: 30 }}` → `{{ opacity: 1, x: 0 }}`
- Both trigger when section scrolls into view

**Step 2: Add frost border glow to image**

- Image container: add `border border-blue-100/30 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-blue-100/20 transition-all duration-500`
- Location badge: add `backdrop-blur-md` and `border-blue-100/30`

**Step 3: Add stagger to benefit cards**

The 3 benefit items (lines 410-422) get staggered reveals:
- Each `motion.div` with `delay: 0.1 * index`
- Add `hover:bg-blue-50/50 hover:border-blue-200/50` for frost hover

**Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/app/HomeContent.tsx
git commit -m "feat: scroll reveals and frost hover on before/after gallery"
```

---

## Task 11: Upgrade Google Reviews Section (White Section)

**Files:**
- Modify: `src/components/GoogleReviewsSection.tsx`

**Step 1: Add Framer Motion scroll reveals**

Import `motion` and `useScrollReveal`.

Wrap review cards with staggered scroll animations:
- `initial={{ opacity: 0, y: 20 }}` → `{{ opacity: 1, y: 0 }}`
- Stagger `delay: index * 0.1`

**Step 2: Add frost-glass styling to review cards**

Update card classes:
- Add `backdrop-blur-sm hover:shadow-blue-100/20` to card hover
- Star icons: keep gold `#FBBC04`
- Avatar initials: add `hover:ring-2 hover:ring-blue-200/50 transition-all`

**Step 3: Add rating counter animation**

The large "4.9" text: wrap in `motion.span` with:
- `initial={{ opacity: 0, scale: 0.8 }}`
- `animate={isInView ? { opacity: 1, scale: 1 } : {}}`
- `transition={{ type: 'spring', bounce: 0.4 }}`

**Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/components/GoogleReviewsSection.tsx
git commit -m "feat: staggered scroll reveals and frost polish on Google reviews"
```

---

## Task 12: Upgrade TotalGuard Standard (Light Section)

**Files:**
- Modify: `src/app/HomeContent.tsx` (lines 441-491)

**Step 1: Add scroll reveal to the section**

Wrap the 4 standard items in `motion.div` elements with stagger:
- Each item: `initial={{ opacity: 0, x: -10 }}` → `{{ opacity: 1, x: 0 }}`
- Stagger: `delay: index * 0.1`

**Step 2: Add frost accent to icons**

- Icon wrappers: add `p-1.5 rounded-lg bg-primary/5` wrapper around each icon
- On hover (group-hover): `bg-primary/15 transition-colors`

**Step 3: Add subtle frost border**

- Section border-top: change from `border-t border-border/50` to `border-t border-blue-100/40`
- Add decorative frost line before header: `<div className="w-10 h-0.5 bg-gradient-to-r from-blue-300/50 to-transparent mb-4" />`

**Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/app/HomeContent.tsx
git commit -m "feat: scroll reveals and frost accents on TotalGuard Standard section"
```

---

## Task 13: Upgrade Process Timeline (Light Frost Section)

**Files:**
- Modify: `src/components/ProcessTimeline.tsx`
- Modify: `src/app/HomeContent.tsx` (lines 494-508)

**Step 1: Update section background in HomeContent.tsx**

Change line 494 from `bg-muted/30` to `bg-blue-50/30` for light frost tint.

**Step 2: Add scroll animations to ProcessTimeline**

Import `motion` and `useScrollReveal` in ProcessTimeline.tsx.

For the horizontal variant (used on homepage):
- Each step card: `motion.div` with `initial={{ opacity: 0, y: 20 }}` → `{{ opacity: 1, y: 0 }}`
- Stagger: `delay: index * 0.15`
- Step number circles: add `hover:shadow-blue-300/30 hover:shadow-lg hover:border-blue-400 transition-all`

**Step 3: Style the connector lines with frost**

Change connector line from `bg-border` to `bg-gradient-to-r from-blue-200/50 via-blue-300/30 to-blue-200/50`.

**Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/components/ProcessTimeline.tsx src/app/HomeContent.tsx
git commit -m "feat: frost-tinted process timeline with staggered scroll reveals"
```

---

## Task 14: Upgrade CTA Section (Dark Winter)

**Files:**
- Modify: `src/components/CTASection.tsx`

**Step 1: Update default variant background**

For the default (full) variant, change the card to dark winter styling:
- Container: `bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 border-2 border-cyan-500/10 rounded-2xl p-8 md:p-12 text-center shadow-2xl`
- Text: `text-white` for heading, `text-white/70` for description
- Proof strip items: `text-white/60` with `text-cyan-400` icons

**Step 2: Add snowfall particles to CTA**

Add a small animated snowfall (6 particles) as absolute positioned elements within the card:
```tsx
<div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
  {[...Array(6)].map((_, i) => (
    <div
      key={i}
      className="absolute bg-white/15 rounded-full animate-snow-fall"
      style={{
        width: `${2 + Math.random() * 3}px`,
        height: `${2 + Math.random() * 3}px`,
        left: `${10 + Math.random() * 80}%`,
        animationDelay: `${-(Math.random() * 10)}s`,
        animationDuration: `${6 + Math.random() * 4}s`,
        filter: 'blur(0.5px) drop-shadow(0 0 3px rgba(147, 197, 253, 0.4))',
      }}
    />
  ))}
</div>
```

**Step 3: Upgrade CTA buttons**

- Primary button: add shimmer — `animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto]`
- Secondary button: `border-white/30 text-white hover:bg-white/10 hover:border-cyan-400/50`

**Step 4: Add scroll reveal**

Import `motion` and `useScrollReveal`:
- Card enters with `initial={{ opacity: 0, y: 30, scale: 0.97 }}` → `{{ opacity: 1, y: 0, scale: 1 }}`
- `transition={{ duration: 0.7, ease: 'easeOut' }}`

**Step 5: Add frost headline glow**

Add `animate-frost-text-glow` to the main heading.

Add radial gradient spotlight behind heading:
```tsx
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
```

**Step 6: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 7: Commit**

```bash
git add src/components/CTASection.tsx
git commit -m "feat: dark winter CTA with snowfall, shimmer buttons, and frost glow"
```

---

## Task 15: Upgrade WinterValueProposition (Dark Section)

**Files:**
- Modify: `src/components/WinterValueProposition.tsx`

**Step 1: Add Framer Motion scroll animations**

Import `motion` and `useScrollReveal`.

Wrap the comparison cards in `motion.div`:
- Left (failures): `initial={{ opacity: 0, x: -30 }}` → `{{ opacity: 1, x: 0 }}`
- Right (solutions): `initial={{ opacity: 0, x: 30 }}` → `{{ opacity: 1, x: 0 }}`
- Both: `transition={{ duration: 0.6, delay: 0.2 }}`

**Step 2: Add frost glow accents**

- Solutions card (right): add `animate-frost-glow` on the border
- Add `hover:border-emerald-400/40 hover:shadow-emerald-500/10 hover:shadow-lg transition-all`

**Step 3: Blur-fade header**

Wrap the header badge in `motion.div`:
- `initial={{ opacity: 0, filter: 'blur(8px)' }}`
- `animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}`

**Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/components/WinterValueProposition.tsx
git commit -m "feat: scroll reveals and frost glow on WinterValueProposition"
```

---

## Task 16: Add Section Divider Frost Styling

**Files:**
- Modify: `src/components/SectionTransition.tsx` (lines 116-122)

**Step 1: Upgrade SectionDivider with frost styling**

Update the `SectionDivider` component (lines 116-122):
```tsx
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div className={cn("py-6 md:py-8", className)}>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-200/40 to-transparent" />
    </div>
  );
}
```

Change the gradient middle color from `via-border` to `via-blue-200/40` for frost effect.

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/components/SectionTransition.tsx
git commit -m "feat: frost-styled section dividers"
```

---

## Task 17: Final Build Verification & Push

**Step 1: Full build check**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 2: Push all commits**

```bash
git push
```

Expected: All commits pushed, Vercel auto-deploys

---

## Implementation Order Summary

| Task | Section | Type | Estimated Changes |
|------|---------|------|-------------------|
| 1 | Shared utilities | New hook + CSS | 2 files |
| 2 | PromoBanner | Modify | 1 file |
| 3 | Trust Stats Strip | Modify | 1 file (HomeContent) |
| 4 | Trust Badges | Modify | 1 file (HomeContent) |
| 5 | WinterHero | Modify | 1 file |
| 6 | WhyMadisonTrust | Modify | 1 file |
| 7 | WinterPriorityServices | Modify | 1 file |
| 8 | Services Carousel | Modify | 1 file (HomeContent) |
| 9 | FullSeasonContract | Modify | 1 file |
| 10 | Before/After Gallery | Modify | 1 file (HomeContent) |
| 11 | Google Reviews | Modify | 1 file |
| 12 | TotalGuard Standard | Modify | 1 file (HomeContent) |
| 13 | Process Timeline | Modify | 2 files |
| 14 | CTA Section | Modify | 1 file |
| 15 | WinterValueProposition | Modify | 1 file |
| 16 | Section Dividers | Modify | 1 file |
| 17 | Final verification | Build + push | 0 files |

**Total: 17 tasks, ~14 files modified, 1 new file created**
