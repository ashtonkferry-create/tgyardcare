# Mobile Optimization — Billionaire Brand Tier Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Elevate TotalGuard mobile UX to billionaire-tier — fixing conversion funnel, shared component gaps, animation performance, and typography across all 76 routes.

**Architecture:** Foundation-first CSS order system. Shared component fixes propagate to all 76 routes via inheritance. New mobile primitives enable SSR-safe section reordering via `order-{n} md:order-none` Tailwind classes — no JS, no hydration risk.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 3.4, Framer Motion, lucide-react, `useSeasonalTheme()` context

---

## Phase 1 — Shared Component Fixes

### Task 1: Create `useMobilePerf.ts` hook

**Files:**
- Create: `src/hooks/useMobilePerf.ts`

**Context:** `ScrollReveal.tsx` (Task 2) needs this hook. Must exist before ScrollReveal is updated. Hook detects `< 768px` viewport and returns a reduced animation config to prevent jank on mid-range Android.

**Step 1: Create the file**

```ts
'use client';

import { useEffect, useState } from 'react';

interface MobilePerfConfig {
  isMobile: boolean;
  blurAmount: string;
  duration: number;
  maxStaggerDelay: number;
}

export function useMobilePerf(): MobilePerfConfig {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return {
    isMobile,
    blurAmount: isMobile ? '0px' : '6px',
    duration: isMobile ? 0.35 : 0.65,
    maxStaggerDelay: 0.3,
  };
}
```

**Step 2: Verify TypeScript**

Run: `cd tgyardcare && npx tsc --noEmit 2>&1 | head -20`
Expected: No errors on this file

**Step 3: Commit**

```bash
cd /c/Users/vance/OneDrive/Desktop/claude-workspace/tgyardcare
git add src/hooks/useMobilePerf.ts
git commit -m "feat: add useMobilePerf hook for mobile animation optimization

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 2: ScrollReveal — Eliminate Mobile Blur Jank

**Files:**
- Modify: `src/components/ScrollReveal.tsx`

**Context:** Current code uses `filter: blur(6px)` at 0.65s duration — causes GPU jank on mid-range Android. On mobile: skip blur entirely, cut duration to 0.35s, cap any stagger delay at 0.3s. Desktop unchanged.

**Step 1: Replace the file**

```tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useMobilePerf } from '@/hooks/useMobilePerf';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  once?: boolean;
  amount?: number;
}

const directionOffsets = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
};

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  once = true,
  amount = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-60px', amount });
  const { blurAmount, duration, maxStaggerDelay } = useMobilePerf();

  const cappedDelay = Math.min(delay, maxStaggerDelay);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: `blur(${blurAmount})`, ...directionOffsets[direction] }}
      animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0, x: 0 } : {}}
      transition={{ duration, delay: cappedDelay, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container — wraps children and applies incremental delays */
export function ScrollRevealGroup({
  children,
  staggerDelay = 0.08,
  className,
}: {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  return (
    <div className={cn(className)}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <ScrollReveal key={i} delay={i * staggerDelay}>
              {child}
            </ScrollReveal>
          ))
        : <ScrollReveal>{children}</ScrollReveal>
      }
    </div>
  );
}
```

**Step 2: Type check**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/ScrollReveal.tsx
git commit -m "perf: eliminate mobile blur jank in ScrollReveal, cap stagger delay at 0.3s

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 3: GlassCard — Responsive Padding

**Files:**
- Modify: `src/components/GlassCard.tsx:52`

**Context:** GlassCard has `rounded-xl p-6` hardcoded (line 52). On 375px screens, 24px padding eats 12.8% of the width. Change to `p-4 sm:p-6` — 16px on mobile, 24px on sm+. One-line change, propagates to every GlassCard across all 76 routes.

**Step 1: Edit the className line**

Find (line 52):
```tsx
        'rounded-xl p-6',
```

Replace with:
```tsx
        'rounded-xl p-4 sm:p-6',
```

**Step 2: Type check**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/GlassCard.tsx
git commit -m "fix: GlassCard responsive padding p-4 sm:p-6 (was fixed p-6)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 4: MobileStickyCTA — Seasonal Color Theming

**Files:**
- Modify: `src/components/MobileStickyCTA.tsx`

**Context:** Current bg is hardcoded `bg-[#0a1f14]/95` (dark green = summer only). Must match active season. Also: add haptic feedback on CTA tap (Android only). The `useSeasonalTheme` context is already available — see `TrustStrip.tsx` for the import pattern.

**Step 1: Replace the file**

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Phone, FileText } from 'lucide-react';
import Link from 'next/link';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';

const seasonalCtaBg: Record<string, string> = {
  summer: '#0a1f14',
  fall:   '#1a0d00',
  winter: '#020810',
};

const seasonalBtnGradient: Record<string, string> = {
  summer: 'from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-emerald-900/30',
  fall:   'from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 shadow-amber-900/30',
  winter: 'from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 shadow-cyan-900/30',
};

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const { activeSeason } = useSeasonalTheme();

  const ctaBg = seasonalCtaBg[activeSeason] ?? seasonalCtaBg.summer;
  const btnGradient = seasonalBtnGradient[activeSeason] ?? seasonalBtnGradient.summer;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      setVisible(scrollY > 500);
      setAtFooter(scrollY + winHeight > docHeight - 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const show = visible && !atFooter;

  const handleCTATap = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-300 ease-out ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div
        className="backdrop-blur-xl border-t border-white/10 px-4 py-3 safe-area-bottom"
        style={{ backgroundColor: `${ctaBg}f2` }}
      >
        <div className="flex gap-3 max-w-lg mx-auto">
          <Link
            href="/get-quote"
            onClick={handleCTATap}
            className={`flex-1 flex items-center justify-center gap-2 bg-gradient-to-r ${btnGradient} text-white font-semibold text-sm rounded-lg py-3 px-4 shadow-lg transition-all duration-200`}
          >
            <FileText className="w-4 h-4" />
            Get Free Quote
          </Link>

          <a
            href="tel:+16085356057"
            onClick={handleCTATap}
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-medium text-sm rounded-lg py-3 px-4 border border-white/10 transition-all duration-200 sm:min-w-[100px]"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Call Now</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Type check**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/MobileStickyCTA.tsx
git commit -m "feat: MobileStickyCTA seasonal color theming + haptic feedback

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 5: TrustStrip — Always-Visible Labels + Tighter Gap

**Files:**
- Modify: `src/components/TrustStrip.tsx`

**Context:** Labels are `hidden sm:inline` — invisible on 375px. Change to always visible. Also tighten gap on small screens: `gap-6 md:gap-14` → `gap-3 sm:gap-6 md:gap-14`. Value text `text-lg` → `text-base md:text-lg`. Both the `dark` and default variant have identical markup — fix both.

**Step 1: In the `dark` variant (line 51), change the flex wrapper**

Find (appears twice — dark variant ~line 51, default variant ~line 82):
```tsx
            <div className="flex flex-wrap justify-center gap-6 md:gap-14">
```
Replace both (use replace_all):
```tsx
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-14">
```

**Step 2: Change label visibility (appears twice)**

Find (line 64 and ~line 95):
```tsx
                    <span className="text-white/50 text-sm hidden sm:inline">{stat.label}</span>
```
Replace both (use replace_all):
```tsx
                    <span className="text-white/50 text-xs sm:text-sm">{stat.label}</span>
```

**Step 3: Change value text size (appears twice)**

Find (line 57 and ~line 88):
```tsx
                    <span className="text-white font-bold text-lg">
```
Replace both (use replace_all):
```tsx
                    <span className="text-white font-bold text-base md:text-lg">
```

**Step 4: Type check**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

**Step 5: Commit**

```bash
git add src/components/TrustStrip.tsx
git commit -m "fix: TrustStrip always-visible labels and tighter mobile gap

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 6: Footer — Touch Targets

**Files:**
- Modify: `src/components/Footer.tsx`

**Context:** Social icon anchors are `h-10 w-10` (40px) — below Apple HIG 44px minimum. Trust micro-strip has `gap-x-6` fixed which overflows on 375px. Nav links need `py-1` for tap height.

**Step 1: Social icons — resize to 48px**

Find (appears 3× in footer — Facebook, Instagram, Google social links):
```tsx
                  className={`group relative flex items-center justify-center h-10 w-10 rounded-lg border ${t.seasonBorder} ${t.seasonBg} hover:border-white/20 transition-all duration-300`}
```
Replace all (replace_all=true):
```tsx
                  className={`group relative flex items-center justify-center h-12 w-12 rounded-lg border ${t.seasonBorder} ${t.seasonBg} hover:border-white/20 transition-all duration-300`}
```

**Step 2: Trust micro-strip gap**

Find:
```tsx
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
```
Replace with:
```tsx
            <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2">
```

**Step 3: Nav links — tap height for service/company columns**

Find (appears in all nav lists — the Link className):
```tsx
                    className={`text-[13px] ${t.textColor} ${t.linkHover} transition-colors duration-200 inline-block`}
```
Replace all (replace_all=true):
```tsx
                    className={`text-[13px] ${t.textColor} ${t.linkHover} transition-colors duration-200 inline-block py-1`}
```

**Step 4: Type check**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

**Step 5: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "fix: Footer touch targets 48px social icons, py-1 nav links, tighter trust gap

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 7: CTASection — Mobile Button Improvements

**Files:**
- Modify: `src/components/CTASection.tsx`

**Context:** Main CTA button row uses `flex flex-col sm:flex-row gap-4 justify-center items-center` (correct). Issues: outline button uses fixed `text-lg` (too large on 375px). Both buttons need `w-full sm:w-auto`. Compact variant buttons also need `w-full sm:w-auto`.

**Step 1: Fix main CTA primary button — add w-full sm:w-auto**

Find (line 132):
```tsx
              <Button
                size="lg"
                className="text-base md:text-lg font-bold px-6 md:px-8 py-3 md:py-4 h-auto animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black"
                asChild
              >
```
Replace with:
```tsx
              <Button
                size="lg"
                className="w-full sm:w-auto text-base md:text-lg font-bold px-6 md:px-8 py-3 md:py-4 h-auto animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black"
                asChild
              >
```

**Step 2: Fix main CTA outline button — add w-full sm:w-auto, fix text size**

Find (line 141):
```tsx
              <Button
                size="lg"
                variant="outline"
                className={`text-lg font-bold border-white/30 text-white hover:bg-white/10 ${ct.phoneBorderHover}`}
                asChild
              >
```
Replace with:
```tsx
              <Button
                size="lg"
                variant="outline"
                className={`w-full sm:w-auto text-base md:text-lg font-bold border-white/30 text-white hover:bg-white/10 ${ct.phoneBorderHover}`}
                asChild
              >
```

**Step 3: Fix compact variant CTA button — add w-full sm:w-auto**

Find (line 73):
```tsx
              <Button size="lg" className="font-bold bg-amber-500 hover:bg-amber-400 text-black" asChild>
```
Replace with:
```tsx
              <Button size="lg" className="w-full sm:w-auto font-bold bg-amber-500 hover:bg-amber-400 text-black" asChild>
```

Find (line 78):
```tsx
              <Button size="lg" variant="outline" className="font-bold" asChild>
```
Replace with:
```tsx
              <Button size="lg" variant="outline" className="w-full sm:w-auto font-bold" asChild>
```

**Step 4: Type check**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

**Step 5: Commit**

```bash
git add src/components/CTASection.tsx
git commit -m "fix: CTASection full-width mobile buttons, responsive text size

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 8: MobileNavMenu — Active Page Indicator

**Files:**
- Modify: `src/components/MobileNavMenu.tsx`

**Context:** No active state on current page links. Add `usePathname()` from `next/navigation` to detect current route. Apply `text-primary font-bold border-l-2 border-primary pl-2` to active items. Only service detail links need this (the top-level categories are accordions, not direct links).

**Step 1: Add `usePathname` import**

Find (line 31):
```tsx
import { useEffect, useState, useCallback, memo } from "react";
```
Replace with:
```tsx
import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
```

**Step 2: Add pathname to component body**

Find (line 127 — after the interface destructuring):
```tsx
  const { activeSeason } = useSeasonalTheme();
```
Replace with:
```tsx
  const { activeSeason } = useSeasonalTheme();
  const pathname = usePathname();
```

**Step 3: Apply active state to service detail links**

Find the service link inside the accordion (line 267):
```tsx
                            <Link
                              key={service.path}
                              href={service.path}
                              onClick={onClose}
                              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm ${
                                service.winterOnly ? 'text-sky-400' : 'text-white/70'
                              }`}
                            >
```
Replace with:
```tsx
                            <Link
                              key={service.path}
                              href={service.path}
                              onClick={onClose}
                              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                                pathname === service.path
                                  ? 'text-primary font-bold border-l-2 border-primary pl-2'
                                  : service.winterOnly ? 'text-sky-400' : 'text-white/70'
                              }`}
                            >
```

**Step 4: Apply active state to commercial links**

Find (line 300):
```tsx
                    <Link
                      key={service.path}
                      href={service.path}
                      onClick={onClose}
                      className={`block px-3 py-2.5 rounded-lg text-sm ${
                        service.winterOnly ? 'text-sky-400' : 'text-white/70'
                      }`}
                    >
```
Replace with:
```tsx
                    <Link
                      key={service.path}
                      href={service.path}
                      onClick={onClose}
                      className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        pathname === service.path
                          ? 'text-primary font-bold border-l-2 border-primary pl-2'
                          : service.winterOnly ? 'text-sky-400' : 'text-white/70'
                      }`}
                    >
```

**Step 5: Apply active state to about/company links**

Find (line 328):
```tsx
                    <Link
                      key={page.path}
                      href={page.path}
                      onClick={onClose}
                      className="block px-3 py-2.5 rounded-lg text-sm text-white/70"
                    >
```
Replace with:
```tsx
                    <Link
                      key={page.path}
                      href={page.path}
                      onClick={onClose}
                      className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        pathname === page.path
                          ? 'text-primary font-bold border-l-2 border-primary pl-2'
                          : 'text-white/70'
                      }`}
                    >
```

**Step 6: Type check**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

**Step 7: Commit**

```bash
git add src/components/MobileNavMenu.tsx
git commit -m "feat: MobileNavMenu active page indicator with left accent border

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Phase 2 — Typography & Spacing System

### Task 9: globals.css — Fluid Type Scale

**Files:**
- Modify: `src/app/globals.css`

**Context:** Add 4 fluid type utilities using CSS `clamp()`. These utilities will be used by ResidentialSections (Task 10) and any service/location page body text. Also add `.section-padding` and `.container-mobile` utilities for spacing standardization. Add after the closing `}` of the `@layer base` block (after line ~175).

**Step 1: Find the end of `@layer base` and append utilities**

Find (line 176 — the comment after the closing brace):
```css
/* Premium Animations */
```
Replace with:
```css
/* ── Mobile-first fluid typography ──────────────────────────────── */
@layer utilities {
  .mobile-display  { font-size: clamp(1.75rem, 6vw, 3rem);    line-height: 1.15; }
  .mobile-heading  { font-size: clamp(1.375rem, 4vw, 2rem);   line-height: 1.25; }
  .mobile-subhead  { font-size: clamp(1rem, 3vw, 1.25rem);    line-height: 1.35; }
  .mobile-body     { font-size: clamp(0.875rem, 2.5vw, 1rem); line-height: 1.65; }

  /* Spacing standards */
  .section-padding   { padding-top: 2.5rem; padding-bottom: 2.5rem; }
  .container-mobile  { padding-left: 1rem; padding-right: 1rem; }

  @media (min-width: 768px) {
    .section-padding  { padding-top: 4rem; padding-bottom: 4rem; }
    .container-mobile { padding-left: 1.5rem; padding-right: 1.5rem; }
  }
}

/* Premium Animations */
```

**Step 2: Type check + lint**

Run: `npx tsc --noEmit 2>&1 | head -20`
Run: `npx next lint 2>&1 | head -20`
Expected: No errors

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add fluid type scale and spacing utilities to globals.css

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 10: ResidentialSections — Fluid Body Text

**Files:**
- Modify: `src/components/ResidentialSections.tsx`

**Context:** All `text-lg` body copy on residential section components renders at 18px — too large on 375px. Replace with `.mobile-body` class (defined in Task 9). Find all instances of `text-lg` on paragraph/description elements (NOT on headings or buttons).

**Step 1: Read the file first**

Run: `head -80 src/components/ResidentialSections.tsx` to understand the structure.

**Step 2: Replace body text sizing**

Use targeted edits. For each paragraph element with `text-lg` (body copy only — skip headings, badges, prices), change:
```tsx
className="text-lg text-white/60 ..."
```
to:
```tsx
className="mobile-body text-white/60 ..."
```

Pattern to search: `className=".*text-lg.*text-white/[0-9]`
Command to count occurrences:
```bash
grep -n 'text-lg.*text-white/' src/components/ResidentialSections.tsx | head -20
```
Edit each matching line individually using Edit tool.

**Step 3: Type check**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

**Step 4: Commit**

```bash
git add src/components/ResidentialSections.tsx
git commit -m "fix: ResidentialSections fluid body text using mobile-body utility

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Phase 3 — Mobile Section Order System

### Task 11: Create `MobileSectionOrder.ts` Constants

**Files:**
- Create: `src/components/mobile/MobileSectionOrder.ts`

**Context:** Single source of truth for section ordering. Pricing moves to `order-3` on mobile (from position ~13 in DOM). The `md:order-none` resets to natural DOM order on desktop. Page wrappers must be `flex flex-col` for `order-*` to work.

**Step 1: Create the file**

```ts
/**
 * Mobile section order constants.
 * Usage: className={cn(existingClasses, MOBILE_ORDER.PRICING)}
 * Page wrapper must have `flex flex-col` for order to work.
 * Desktop resets via `md:order-none`.
 */
export const MOBILE_ORDER = {
  HERO:           'order-1  md:order-none',
  TRUST_STRIP:    'order-2  md:order-none',
  PRICING:        'order-3  md:order-none',
  WHATS_INCLUDED: 'order-4  md:order-none',
  WHY_CHOOSE:     'order-5  md:order-none',
  HOW_IT_WORKS:   'order-6  md:order-none',
  GALLERY:        'order-7  md:order-none',
  MID_CTA:        'order-8  md:order-none',
  WHO_ITS_FOR:    'order-9  md:order-none',
  PROBLEM:        'order-9  md:order-none',
  SOLUTION:       'order-9  md:order-none',
  SEASONAL:       'order-10 md:order-none',
  FAQ:            'order-11 md:order-none',
  RELATED:        'order-12 md:order-none',
  BOTTOM_CTA:     'order-13 md:order-none',
} as const;
```

**Step 2: Type check**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/mobile/MobileSectionOrder.ts
git commit -m "feat: MobileSectionOrder constants for CSS order-based section reordering

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 12: Create `MobileSection.tsx` Wrapper

**Files:**
- Create: `src/components/mobile/MobileSection.tsx`

**Context:** Optional wrapper component that applies the order class and normalizes padding. Used for new sections added in Phase 4. Existing sections can use `MOBILE_ORDER` constants directly without this wrapper.

**Step 1: Create the file**

```tsx
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface MobileSectionProps {
  order: string;
  className?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}

/**
 * Section wrapper with mobile order support.
 * Usage: <MobileSection order={MOBILE_ORDER.PRICING} className="py-14 md:py-20">
 * Parent page root div must have className="... flex flex-col".
 */
export function MobileSection({ order, className, children, style }: MobileSectionProps) {
  return (
    <section
      className={cn('py-10 md:py-16', order, className)}
      style={style}
    >
      {children}
    </section>
  );
}
```

**Step 2: Type check**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/mobile/MobileSection.tsx
git commit -m "feat: MobileSection wrapper component for order-system pages

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 13: Apply Order System to Snow Removal Page (Reference Implementation)

**Files:**
- Modify: `src/app/services/snow-removal/SnowRemovalContent.tsx`

**Context:** Snow removal is the highest-traffic winter service page. Apply as the reference implementation — same pattern repeats for all other service pages. Two changes: (1) root wrapper gets `flex flex-col`, (2) each section gets `MOBILE_ORDER.X` class. Pricing section is critical — must move to order-3 on mobile.

**Step 1: Import MOBILE_ORDER**

Find (line 1 — the top import block):
```tsx
'use client';
```
Add after line 3 (after the lucide import line), before the first component:
```tsx
import { MOBILE_ORDER } from '@/components/mobile/MobileSectionOrder';
import { cn } from '@/lib/utils';
```

**Step 2: Add `flex flex-col` to the root wrapper**

Find the outermost div (search for `min-h-screen` in SnowRemovalContent.tsx):
```tsx
<div className="min-h-screen" style={{ background: '#020810' }}>
```
Replace with:
```tsx
<div className="min-h-screen flex flex-col" style={{ background: '#020810' }}>
```

**Step 3: Add order to Hero section**

Find the hero section opening tag (first `<section` in the file):
```tsx
        <section className="relative min-h-[70vh]
```
Replace with:
```tsx
        <section className={cn("relative min-h-[70vh]", MOBILE_ORDER.HERO)}
```

**Step 4: Add order to TrustStrip**

Find the TrustStrip usage:
```tsx
        <TrustStrip />
```
Replace with:
```tsx
        <div className={MOBILE_ORDER.TRUST_STRIP}><TrustStrip /></div>
```

**Step 5: Add order to Pricing section**

Find the pricing section (identified by `background: '#060f1a'`):
```tsx
        <section className="py-14 md:py-20" style={{ background: '#060f1a' }}>
```
Replace with:
```tsx
        <section className={cn("py-14 md:py-20", MOBILE_ORDER.PRICING)} style={{ background: '#060f1a' }}>
```

**Step 6: Add order to remaining sections**

Identify each remaining section in DOM order and add the appropriate `MOBILE_ORDER` constant. Search for each `<section className=` in the file. Key mappings:
- What's Included → `MOBILE_ORDER.WHATS_INCLUDED`
- Why Choose / How It Works → `MOBILE_ORDER.HOW_IT_WORKS`
- Who It's For / Problem/Solution → `MOBILE_ORDER.WHO_ITS_FOR`
- What Makes TotalGuard Different → `MOBILE_ORDER.WHY_CHOOSE`
- FAQ → `MOBILE_ORDER.FAQ`
- Related Services → `MOBILE_ORDER.RELATED`

Pattern for each:
```tsx
// Before:
<section className="py-14 md:py-20">
// After:
<section className={cn("py-14 md:py-20", MOBILE_ORDER.WHATS_INCLUDED)}>
```

**Step 7: Type check**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

**Step 8: Visual QA — Playwright screenshot at 375px**

Run dev server: `npm run dev` (in background)
Playwright: screenshot `http://localhost:3000/services/snow-removal` at 375px
Verify pricing section appears within 2 scrolls from top (< 1200px from viewport top on 375px)

**Step 9: Commit**

```bash
git add src/app/services/snow-removal/SnowRemovalContent.tsx
git commit -m "feat: apply mobile order system to snow removal page (pricing to order-3)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 14: Apply Order System to LocationPageTemplate

**Files:**
- Modify: `src/components/LocationPageTemplate.tsx`

**Context:** Single file change propagates to all 12 location pages automatically. LocationPageTemplate renders sections in a defined order — add `flex flex-col` to root, add `MOBILE_ORDER` classes to pricing and key sections.

**Step 1: Read the file first**

Run: `head -60 src/components/LocationPageTemplate.tsx` to understand the structure.

**Step 2: Add import**

Add at the top of imports:
```tsx
import { MOBILE_ORDER } from '@/components/mobile/MobileSectionOrder';
import { cn } from '@/lib/utils';
```

**Step 3: Add `flex flex-col` to root**

Find the root wrapper div and add `flex flex-col` to its className.

**Step 4: Add order to pricing section**

Find the pricing section and add `className={cn(existingClasses, MOBILE_ORDER.PRICING)}`.

**Step 5: Apply same pattern to other major sections** following the same `MOBILE_ORDER` constants.

**Step 6: Type check + commit**

```bash
npx tsc --noEmit 2>&1 | head -20
git add src/components/LocationPageTemplate.tsx
git commit -m "feat: apply mobile order system to LocationPageTemplate (12 location pages)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 15: Apply Order System to Remaining Service Pages

**Files:**
- Modify (apply same pattern as Task 13 to each):
  - `src/app/services/mowing/MowingContent.tsx`
  - `src/app/services/fertilization/FertilizationContent.tsx`
  - `src/app/services/aeration/AerationContent.tsx`
  - `src/app/services/fall-cleanup/FallCleanupContent.tsx`
  - `src/app/services/spring-cleanup/SpringCleanupContent.tsx`
  - `src/app/services/leaf-removal/LeafRemovalContent.tsx`
  - `src/app/services/gutter-cleaning/GutterCleaningContent.tsx`
  - `src/app/services/gutter-guards/GutterGuardsContent.tsx`
  - `src/app/services/mulching/MulchingContent.tsx`
  - `src/app/services/pruning/PruningContent.tsx`
  - `src/app/services/weeding/WeedingContent.tsx`
  - `src/app/services/herbicide/HerbicideContent.tsx`
  - `src/app/services/garden-beds/GardenBedsContent.tsx`
  - `src/app/services/spring-cleanup/SpringCleanupContent.tsx`

**Context:** Same 3-step pattern per file: (1) add import, (2) `flex flex-col` on root, (3) `MOBILE_ORDER.PRICING` on pricing section. The pricing section in each file is identified by a distinctive background color or heading containing "Pricing".

**Per file steps:**
1. Add `import { MOBILE_ORDER } from '@/components/mobile/MobileSectionOrder';` and `import { cn } from '@/lib/utils';` (check if cn already imported)
2. Add `flex flex-col` to root `<div className="min-h-screen`
3. Find pricing section: `className="py-14 md:py-20"` with pricing heading → add `cn(existingClasses, MOBILE_ORDER.PRICING)`

**After all 14 files:**

```bash
npx tsc --noEmit 2>&1 | head -30
git add src/app/services/
git commit -m "feat: apply mobile pricing order-3 to all 14 remaining service pages

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Phase 4 — Mobile Conversion Components

### Task 16: Create `MobilePricingPreview.tsx`

**Files:**
- Create: `src/components/mobile/MobilePricingPreview.tsx`

**Context:** An 80px mobile-only pricing snapshot that appears between TrustStrip and What's Included (order-3 slot). Renders `md:hidden`. Seasonal accent color on the CTA. Accepts `priceFrom`, `unit`, `ctaHref`, `ctaLabel` props. Maximum conversion density.

**Step 1: Create the file**

```tsx
'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { cn } from '@/lib/utils';

const seasonalAccent: Record<string, string> = {
  summer: 'from-emerald-600 to-emerald-500 shadow-emerald-900/20',
  fall:   'from-amber-600 to-amber-500 shadow-amber-900/20',
  winter: 'from-cyan-600 to-cyan-500 shadow-cyan-900/20',
};

interface MobilePricingPreviewProps {
  priceFrom: string;
  unit?: string;
  ctaHref: string;
  ctaLabel?: string;
  className?: string;
}

/**
 * Mobile-only pricing snapshot. Renders between TrustStrip and Whats Included.
 * Add to service pages in MOBILE_ORDER.PRICING slot.
 * Usage: <MobilePricingPreview priceFrom="$149" unit="/ visit" ctaHref="/contact?service=snow-removal" />
 */
export function MobilePricingPreview({
  priceFrom,
  unit = '/ visit',
  ctaHref,
  ctaLabel = 'Get Free Quote',
  className,
}: MobilePricingPreviewProps) {
  const { activeSeason } = useSeasonalTheme();
  const accent = seasonalAccent[activeSeason] ?? seasonalAccent.summer;

  return (
    <div className={cn('md:hidden px-4 py-3', className)}>
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3">
        <div>
          <p className="text-xs text-white/50 leading-none mb-0.5">Starting at</p>
          <p className="text-xl font-bold text-white leading-none">
            {priceFrom}
            <span className="text-sm font-normal text-white/50 ml-1">{unit}</span>
          </p>
        </div>
        <Link
          href={ctaHref}
          className={`flex items-center gap-1.5 bg-gradient-to-r ${accent} text-white font-semibold text-sm rounded-lg py-2.5 px-4 shadow-lg transition-all duration-200 whitespace-nowrap`}
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
```

**Step 2: Add to snow removal page as reference**

In `SnowRemovalContent.tsx`, after the TrustStrip div (Task 13):
```tsx
import { MobilePricingPreview } from '@/components/mobile/MobilePricingPreview';

// After the trust strip div:
<MobilePricingPreview
  priceFrom="Contact for pricing"
  unit="seasonal or per-storm"
  ctaHref="/contact?service=snow-removal"
  ctaLabel="Get Free Quote"
/>
```

**Step 3: Type check**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

**Step 4: Commit**

```bash
git add src/components/mobile/MobilePricingPreview.tsx src/app/services/snow-removal/SnowRemovalContent.tsx
git commit -m "feat: MobilePricingPreview component + add to snow removal page

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 17: Playwright Visual QA — Full Regression Check

**Files:** No code changes. Verification only.

**Context:** After all 16 tasks, run Playwright screenshots at all 4 breakpoints across key pages to confirm no visual regressions and success criteria pass.

**Step 1: Ensure dev server is running**

```bash
cd tgyardcare
npm run dev
```

**Step 2: Playwright screenshots — 375px (iPhone SE)**

Use Playwright MCP browser to screenshot at 375px viewport:
- `http://localhost:3000/services/snow-removal`
- `http://localhost:3000/locations/madison`
- `http://localhost:3000/`
- `http://localhost:3000/services/mowing`

Check:
- [ ] Pricing section visible within 2 scrolls (< ~1200px from top at 375px)
- [ ] GlassCard has 16px padding (not 24px)
- [ ] TrustStrip labels visible
- [ ] No blur jank on scroll (smooth animation)
- [ ] MobileStickyCTA background matches current season

**Step 3: Playwright screenshots — 768px (iPad)**

Same 4 pages. Check no layout breaks at iPad width.

**Step 4: Playwright screenshots — 1440px (Desktop)**

Same 4 pages. Verify desktop is unchanged (order system resets via `md:order-none`).

**Step 5: TypeScript + lint final check**

```bash
npx tsc --noEmit 2>&1 | head -30
npx next lint 2>&1 | head -30
```
Expected: No new errors

**Step 6: Commit any final fixes found during QA**

---

## Success Criteria Checklist

- [ ] Pricing section appears within 2 scrolls on 375px (< 1200px from top)
- [ ] GlassCard has minimum 16px padding on 375px
- [ ] MobileStickyCTA background matches active season (green/amber/cyan)
- [ ] All social icon touch targets ≥ 48×48px
- [ ] No blur animation jank on mobile (ScrollReveal skips blur on < 768px)
- [ ] TrustStrip labels visible on 375px (not hidden)
- [ ] All service page root divs have `flex flex-col`
- [ ] `mobile-body`, `mobile-heading`, `mobile-display` utilities defined in globals.css
- [ ] MobilePricingPreview visible on mobile, hidden on md+
- [ ] Active nav items show left accent border in mobile menu
- [ ] Playwright screenshots pass at 375/768/1440px with no visual regressions
- [ ] TypeScript + lint pass with zero new errors

---

## File Summary

| Phase | Files | Count |
|-------|-------|-------|
| Phase 1 | GlassCard, ScrollReveal, MobileStickyCTA, TrustStrip, Footer, CTASection, MobileNavMenu, ResidentialSections | 8 |
| Phase 2 | globals.css, ResidentialSections | 1+1 |
| Phase 3 | MobileSectionOrder.ts, MobileSection.tsx, useMobilePerf.ts (Task 1), SnowRemovalContent, LocationPageTemplate, 14 service pages | 19 |
| Phase 4 | MobilePricingPreview.tsx | 1 |
| **Total** | | **~29 files** |
