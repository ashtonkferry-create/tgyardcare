# Concierge Confirmation — Billionaire-Tier Post-Quote Follow-Up

**Date:** 2026-03-06
**Status:** Approved
**Scope:** Replace `ServiceUpsellDialog` + `QuickQuoteDialog` success state with a single cinematic `ConciergeConfirmation` component

---

## Problem

Current post-submission experience is generic: green gradient header, "Thank You!", 3 hardcoded service cards (Mowing, Gutter Cleaning, Spring Cleanup). No animation staging, no seasonal awareness, no personalization, no social proof. Feels like a template, not a luxury service.

## Solution: The Concierge Confirmation

A cinematic, multi-phase dialog that reveals content in timed stages — creating ceremony and perceived premium quality. Seasonally themed, dynamically recommends services, and uses social proof to drive conversions.

---

## Animation Phases

### Phase 1 — The Moment (0–1.5s)
- Radial gradient pulse in seasonal accent color (low opacity backdrop)
- Animated checkmark circle scales in with spring physics (Framer Motion `spring`, `damping: 12`)
- 8-12 particle dots radiate outward from checkmark center, fade out
- Headline fades in 0.5s after checkmark: **"You're In Good Hands"** — Clash Display, text-2xl
- Subtext 0.3s later: **"We'll have your personalized quote ready within 24 hours — usually same day."**

### Phase 2 — The Promise (1.5–3s)
- Slides up: `opacity: 0 → 1`, `y: 20 → 0`
- **"What Happens Next"** — 3-step timeline (horizontal desktop, vertical mobile):
  1. Clock icon → **"Within 2 Hours"** → "Our team reviews your property details"
  2. Phone icon → **"Same Day"** → "We call to confirm scope and schedule"
  3. Sparkles icon → **"Your Quote"** → "Custom pricing sent to your inbox"
- Thin connecting line between steps
- Glass-morphism cards: `bg-white/[0.06] border border-white/10 backdrop-blur`

### Phase 3 — The Upsell (3s+)
- Label: **"Popular With Your Neighbors"** — uppercase, tracking-widest, text-white/40
- 3 seasonal service cards from `seasonalPriority[currentSeason]` (top 3, skipping mentioned services)
- Each card: glass card, Lucide icon, service name, one-line value prop, seasonal badge, "Learn More →"
- Social proof: **"127 five-star reviews · 500+ Madison homes served"** — from `SITE_STATS`

### Bottom Bar
- Left: Phone CTA with seasonal gradient + pulse glow — "Call Now: (608) 535-6057"
- Right: Ghost "Close" button

---

## Seasonal Theming

Uses `useSeasonalTheme()`. Three schemes:

| Token | Summer | Fall | Winter |
|-------|--------|------|--------|
| Dialog bg | `#0a0f0a` | `#0d0900` | `#020810` |
| Accent | `emerald-500` | `amber-500` | `cyan-400` |
| Checkmark gradient | `from-emerald-400 to-green-600` | `from-amber-400 to-orange-600` | `from-cyan-300 to-blue-500` |
| CTA gradient | `from-green-600 to-emerald-500` | `from-amber-600 to-orange-500` | `from-blue-600 to-cyan-500` |
| Particle color | `emerald-400` | `amber-400` | `cyan-300` |
| Glow | `emerald-500/20` | `amber-500/20` | `cyan-400/20` |

---

## Smart Service Recommendations

Dynamic selection from `seasonalPriority[currentSeason]`:
- Takes top 3 services that don't match keywords in the user's submitted message
- Each card has:
  - Lucide icon (mapped from service slug)
  - Service name + one-line action-oriented hook
  - Seasonal badge: "Peak Demand" / "Limited Spots" / "Early Bird"
  - "Learn More →" link to `/services/{slug}`
  - Click tracked to `upsell_clicks` table

---

## Component Architecture

### New: `ConciergeConfirmation.tsx`

```typescript
interface ConciergeConfirmationProps {
  open: boolean;
  onClose: () => void;
  mode: 'dialog' | 'inline'; // dialog = /contact, inline = QuickQuoteDialog
  submittedMessage?: string;  // for smart service filtering
}
```

- `dialog` mode: wraps in shadcn `Dialog`
- `inline` mode: renders in-place (replaces QuickQuoteDialog success state)

### Modified Files
- `ContactContent.tsx` — swap `ServiceUpsellDialog` for `ConciergeConfirmation` (dialog mode)
- `QuickQuoteDialog.tsx` — swap inline success state for `ConciergeConfirmation` (inline mode)
- `ServiceUpsellDialog.tsx` — DELETE (replaced entirely)

---

## Copy Principles

- **Certainty over hope** — "We WILL call you" not "We'll try to reach out"
- **Specific over vague** — "Within 2 hours" not "Shortly"
- **Neighbor proof** — "Popular with your neighbors" not "You might also like"
- **Scarcity where real** — "Weekly routes filling fast" only during peak
- **No exclamation marks in headlines** — Confidence is quiet

---

## Service Data Map

```typescript
const SERVICE_UPSELL_DATA: Record<string, { icon: LucideIcon; hook: string; slug: string }> = {
  'Spring Cleanup': { icon: Flower2, hook: 'Start the season with a pristine property', slug: 'spring-cleanup' },
  'Lawn Mowing': { icon: Scissors, hook: 'Lock in weekly routes before they fill', slug: 'mowing' },
  'Fertilization': { icon: Sprout, hook: 'Thicker, greener lawn in 4 treatments', slug: 'fertilization' },
  'Mulching': { icon: Layers, hook: 'Transform your beds with fresh premium mulch', slug: 'mulching' },
  'Garden Beds': { icon: Flower, hook: 'Clean beds that make the whole yard pop', slug: 'garden-beds' },
  'Aeration': { icon: Wind, hook: 'Let your lawn breathe and grow deeper roots', slug: 'aeration' },
  'Herbicide Services': { icon: ShieldCheck, hook: 'Eliminate weeds before they take over', slug: 'herbicide' },
  'Weeding': { icon: Leaf, hook: 'Beds and borders kept immaculate weekly', slug: 'weeding' },
  'Bush Trimming': { icon: TreePine, hook: 'Crisp lines and shaped hedges year-round', slug: 'pruning' },
  'Gutter Cleaning': { icon: Droplets, hook: 'Prevent water damage with clean gutters', slug: 'gutter-cleaning' },
  'Gutter Guards': { icon: Shield, hook: 'Never clean gutters again — permanent solution', slug: 'gutter-guards' },
  'Leaf Removal': { icon: Leaf, hook: 'Complete leaf extraction, curb to fence line', slug: 'leaf-removal' },
  'Fall Cleanup': { icon: TreeDeciduous, hook: 'Full-property prep before the freeze', slug: 'fall-cleanup' },
  'Snow Removal': { icon: Snowflake, hook: '24/7 plowing — cleared before you wake up', slug: 'snow-removal' },
};
```

---

## Seasonal Badge Logic

```typescript
function getSeasonalBadge(index: number, season: ServiceSeason): string {
  if (index === 0) return season === 'winter' ? '24/7 Response' : 'Peak Demand';
  if (index === 1) return 'Limited Spots';
  return 'Early Bird';
}
```
