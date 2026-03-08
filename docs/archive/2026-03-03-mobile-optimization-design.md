# Mobile Optimization — Billionaire Brand Tier Design

**Date:** 2026-03-03
**Scope:** All 76 routes — service pages, location pages, commercial, blog, home
**Approach:** Foundation First + CSS Order System (Approach A)

---

## Problem Statement

The TotalGuard site scores 7.5/10 for mobile. Foundation is solid but three categories fail billionaire-tier:

1. **Conversion funnel broken on mobile** — pricing buried at scroll position ~5000px; mobile users bounce before seeing cost
2. **Shared component gaps** — GlassCard padding, MobileStickyCTA season color, touch targets, animation jank on mid-range Android
3. **Typography/spacing inconsistency** — mix of `gap-4/5/6/8`, body text fixed `text-lg` (18px too large on 375px), no fluid scale

---

## Architecture

### Core Principle
One `flex flex-col` wrapper on every page. Sections get explicit `order-{n}` classes. Desktop: natural DOM order. Mobile: `order-{n} md:order-none` overrides. **No JS, no hydration risk, SSR-safe.**

### New Shared Primitives (3 files)

```
src/components/mobile/
  MobileSection.tsx       — section wrapper with order prop + padding normalization
  MobileSectionOrder.ts   — canonical order constants (single source of truth)
  useMobilePerf.ts        — detects mobile viewport, returns reduced animation config
```

### MobileSectionOrder Constants
Applied to ALL service pages and location pages (single import):

```ts
export const MOBILE_ORDER = {
  HERO:           'order-1',
  TRUST_STRIP:    'order-2',
  PRICING:        'order-3',   // ← moved from position ~13 to position 3
  WHATS_INCLUDED: 'order-4',
  WHY_CHOOSE:     'order-5',
  HOW_IT_WORKS:   'order-6',
  GALLERY:        'order-7',
  MID_CTA:        'order-8',
  WHO_ITS_FOR:    'order-9',
  PROBLEM:        'order-9',
  SOLUTION:       'order-9',
  SEASONAL:       'order-10',
  FAQ:            'order-11',
  RELATED:        'order-12',
  BOTTOM_CTA:     'order-13',
} as const;
```

### MobileSection Component
```tsx
// Usage: <MobileSection order="order-3 md:order-none" className="...">
// Adds: flex flex-col (page wrapper must be flex flex-col)
// Normalizes: py-10 md:py-16 padding unless overridden
// Wraps children in ScrollReveal by default
```

---

## Phase 1: Shared Component Fixes
*Applies instantly to all 76 routes via component inheritance*

### 1.1 GlassCard — Responsive Padding
**File:** `src/components/GlassCard.tsx`
- `p-6` → `p-4 sm:p-6`
- No other changes

### 1.2 ScrollReveal — Mobile Performance
**File:** `src/components/ScrollReveal.tsx`
- Import `useMobilePerf` hook
- On mobile (`< 768px`): `filter: blur(0px)` (skip), `duration: 0.35s` (was 0.65s)
- On desktop: unchanged
- Stagger delay cap: `Math.min(delay, 0.3)` — prevents 20-item cascades taking 2.4s

### 1.3 MobileStickyCTA — Seasonal Color
**File:** `src/components/MobileStickyCTA.tsx`
- Import `useSeasonalTheme` from `contexts/SeasonalThemeContext`
- Background uses `seasonalCtaBg[activeSeason]` map:
  ```ts
  const seasonalCtaBg = {
    summer: '#0a1f14',
    fall:   '#1a0d00',
    winter: '#020810',
  }
  ```
- Button gradient also adapts to seasonal accent

### 1.4 TrustStrip — Always Visible Labels
**File:** `src/components/TrustStrip.tsx`
- Remove `hidden sm:inline` from label spans → labels always visible
- `gap-6 md:gap-14` → `gap-3 sm:gap-6 md:gap-14` (tighter on 375px)
- Values: `text-base md:text-lg` (was fixed `text-lg`)

### 1.5 Footer — Touch Targets
**File:** `src/components/Footer.tsx`
- Social icons: `h-10 w-10` → `h-12 w-12 tap-target` (48px, meets Apple HIG)
- Nav link rows: add `py-1` for extra tap height
- Trust micro-strip: `flex-wrap gap-2 sm:gap-4` (was `gap-4` fixed)

### 1.6 CTASection — Mobile Buttons
**File:** `src/components/CTASection.tsx`
- Buttons: `w-full sm:w-auto` (full-width on mobile)
- Padding: `py-3.5 md:py-4` (was `py-3 md:py-4`)
- Text: `text-base` on mobile (was `text-lg` fixed)

### 1.7 Navigation — Active Page Indicator
**File:** `src/components/MobileNavMenu.tsx`
- Use `usePathname()` to compare current route
- Active item: `text-primary font-bold` + left accent bar `border-l-2 border-primary pl-2`
- No structural changes to menu

### 1.8 ResidentialSections — Fluid Body Text
**File:** `src/components/ResidentialSections.tsx`
- All `text-lg` body copy → `mobile-body-text` Tailwind utility (already defined in globals.css)
- Section padding: use `.section-padding` utility (already defined)

---

## Phase 2: Typography & Spacing System
*Applied globally via globals.css + standardized across all 76 pages*

### 2.1 Fluid Type Scale — globals.css additions
```css
/* Mobile display (hero H1) */
.mobile-display  { font-size: clamp(1.75rem, 6vw, 3rem);   line-height: 1.15; }
/* Section H2 */
.mobile-heading  { font-size: clamp(1.375rem, 4vw, 2rem);  line-height: 1.25; }
/* Card H3 */
.mobile-subhead  { font-size: clamp(1rem, 3vw, 1.25rem);   line-height: 1.35; }
/* Body / descriptions */
.mobile-body     { font-size: clamp(0.875rem, 2.5vw, 1rem); line-height: 1.65; }
```

### 2.2 Spacing Standardization
Replace all mixed gaps with this system:
```
gap-4 md:gap-6     ← 2-col card grids
gap-4 md:gap-8     ← feature/hero grids
py-10 md:py-16     ← section padding (= .section-padding)
px-4 sm:px-6       ← container (= .container-mobile)
```

### 2.3 Page-Level Changes
All 76 pages: `text-3xl md:text-4xl` H2s → `.mobile-heading` class
Service pages: body text `text-lg` → `.mobile-body` class
Location pages: same pattern via `LocationPageTemplate.tsx` (single change propagates)

---

## Phase 3: Mobile Section Order System
*New primitives + applied to all service pages*

### 3.1 Create Primitives
- `src/components/mobile/MobileSectionOrder.ts` — order constants
- `src/components/mobile/MobileSection.tsx` — wrapper component
- `src/hooks/useMobilePerf.ts` — `useMediaQuery('(max-width: 767px)')` + reduced config

### 3.2 Page Wrapper Change
Every service/location page root div:
```tsx
// Before:
<div className="min-h-screen" style={{ background: '#050d07' }}>

// After:
<div className="min-h-screen flex flex-col" style={{ background: '#050d07' }}>
```

### 3.3 Apply Order to Service Pages (16 pages)
Each `<section>` gets `className={cn(existingClasses, MOBILE_ORDER.PRICING)}` (etc.)
Pricing section gets `order-3 md:order-none` — moves to position 3 on mobile only.

### 3.4 LocationPageTemplate Propagation
`src/components/LocationPageTemplate.tsx` — single file change propagates order logic to all 12 location pages automatically.

---

## Phase 4: Mobile Conversion Components
*New components for billionaire-tier conversion funnel*

### 4.1 MobilePricingPreview
**File:** `src/components/mobile/MobilePricingPreview.tsx`
- `md:hidden` — mobile-only
- Position: between TrustStrip and What's Included (order-3 slot)
- Content: pricing snapshot (`Starting at $X/visit`) + single full-width CTA
- Height: ~80px — maximum conversion density
- Seasonal accent color on CTA
- Accepts `priceFrom`, `unit`, `ctaHref`, `ctaLabel` props

### 4.2 HowItWorksTimeline Mobile Variant
Applied inside existing How It Works sections:
- Desktop: 4-column horizontal grid (unchanged)
- Mobile: vertical numbered list `flex flex-col gap-4`
- Step circles: left-aligned, `h-10 w-10` with accent border
- Connector: vertical line between steps (CSS `::before` pseudo-element on wrapper)

### 4.3 MobileQuoteBar Enhancement
**File:** `src/components/MobileStickyCTA.tsx` (upgrade, not replace)
- Add haptic feedback trigger on CTA tap (`navigator.vibrate(10)` where supported)
- Smooth show/hide animation: `translate-y-full` → `translate-y-0` (was instant toggle)
- Add phone number text next to call icon on `sm` screens

---

## MCP & Skill Routing

| Phase | MCPs | Skills | Agents |
|-------|------|--------|--------|
| Phase 1 — Components | `context7` (Tailwind API) | `frontend-design`, `workely-conventions` | `ui-designer` |
| Phase 2 — Typography | `context7` (CSS clamp syntax) | `workely-conventions` | Direct edit |
| Phase 3 — Order System | `playwright` (visual QA) | `frontend-design`, `webapp-testing` | `ui-designer` |
| Phase 4 — New Components | `playwright` (QA), `magicui` (animation refs) | `frontend-design`, `nebula-design-system` | `ui-designer` |

### Playwright QA Gates (after each phase)
```
375px  — iPhone SE (tightest constraint)
390px  — iPhone 14
768px  — iPad
1440px — Desktop (regression check)
```

Playwright screenshots: `/services/snow-removal`, `/locations/madison`, `/`, `/services/mowing`

---

## Files Changed

### New Files
- `src/components/mobile/MobileSection.tsx`
- `src/components/mobile/MobileSectionOrder.ts`
- `src/components/mobile/MobilePricingPreview.tsx`
- `src/hooks/useMobilePerf.ts`

### Modified — Shared Components (8)
- `src/components/GlassCard.tsx`
- `src/components/ScrollReveal.tsx`
- `src/components/MobileStickyCTA.tsx`
- `src/components/TrustStrip.tsx`
- `src/components/Footer.tsx`
- `src/components/CTASection.tsx`
- `src/components/MobileNavMenu.tsx`
- `src/components/ResidentialSections.tsx`

### Modified — globals.css (1)
- `src/app/globals.css`

### Modified — Service Pages (16)
- All files under `src/app/services/*/`

### Modified — LocationPageTemplate (propagates to 12 locations)
- `src/components/LocationPageTemplate.tsx`

### Modified — Home + Commercial + Other pages (~40)
- Typography class standardization only (mechanical find/replace)

---

## Success Criteria

- [ ] Pricing section appears within 2 scrolls on 375px (< 1200px from top)
- [ ] GlassCard has minimum 16px padding on 375px
- [ ] MobileStickyCTA background matches active season
- [ ] All touch targets ≥ 44×44px
- [ ] No blur animation jank on mid-range Android (ScrollReveal)
- [ ] TrustStrip labels visible on 375px
- [ ] All H2s use fluid `mobile-heading` class
- [ ] Section gap system uses only `gap-4/md:gap-6` or `gap-4/md:gap-8`
- [ ] Playwright screenshots pass at 375/390/768/1440px with no visual regressions
- [ ] TypeScript + lint pass with zero new errors
