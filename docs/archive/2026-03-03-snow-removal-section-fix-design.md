# Design: Snow Removal Section Fix

**Date:** 2026-03-03
**File:** `src/app/services/snow-removal/SnowRemovalContent.tsx`
**Scope:** Surgical — 2 sections only, no other files touched

---

## Problem

Two sections in SnowRemovalContent.tsx render as visually weak:

1. **"Madison-Area Snow Removal Pricing"** — nested GlassCard inside GlassCard creates zero contrast hierarchy. Sub-titles ("Pricing Options:", "Wisconsin Winter Season") are barely readable. No pricing card differentiation.

2. **"What Makes TotalGuard Different"** — 4 GlassCard tiles with no icons and no accent borders. Card headings are visually indistinguishable from body text. Flat, unanchored layout.

Root causes:
- `GlassCard` default = `bg-white/[0.06] border-white/[0.08]` — nearly invisible on `#050d07`/`#060f1a`
- No icons to anchor card identity
- No `accentBorder` on feature cards (cyan left border never applied)
- Nested GlassCards amplify the low-contrast problem

---

## Design

### Section 1: Pricing — Rebuilt as Two Side-by-Side Cards

**Remove:** Outer `GlassCard variant="accent"` wrapper
**Remove:** Nested inner `GlassCard` elements
**Add:** Two flat, properly contrasted pricing cards

**Per-Storm card:**
- `GlassCard accentBorder hover="lift"`
- `Zap` icon (cyan) in header
- Bold title `text-xl font-bold text-white`
- Bullet list of inclusions with `CheckCircle2` icons

**Seasonal Contract card:**
- `GlassCard accentBorder hover="lift"` + subtle `bg-primary/10` tint via className
- `Calendar` icon (cyan) in header
- "Most Popular" badge (cyan pill, top-right)
- Bold title + same bullet structure

**Wisconsin Winter Season strip:**
- Removed from nested card
- Becomes a simple `flex items-start gap-3` strip below the cards
- `Snowflake` icon + plain text — no card wrapper

---

### Section 2: "What Makes TotalGuard Different" — Icons + Accent Borders

**Change on all 4 cards:**
- Add `accentBorder` prop → cyan left border appears
- Add icon per card (imported from lucide-react):
  - "We Actually Show Up" → `CheckCircle2`
  - "Proactive Communication" → `MessageSquare`
  - "Complete Ice Treatment" → `Thermometer`
  - "Year-Round Relationship" → `Repeat2`
- Icon rendered as `h-5 w-5 text-primary` inline beside the `h3` heading
- Title: `text-lg font-bold text-white` (was `font-semibold`)
- Body: `text-white/70` (was `text-white/60`)

---

## Files Changed

| File | Change |
|------|--------|
| `src/app/services/snow-removal/SnowRemovalContent.tsx` | Pricing section rebuilt; "Different" cards get icons + accentBorder |

No component files modified. No other pages touched.

---

## Success Criteria

- Pricing cards are visually distinct and readable at a glance
- No nested GlassCard-inside-GlassCard pattern
- "What Makes TotalGuard Different" cards each have an icon and cyan left border
- Card headings are clearly differentiated from body text
- Page still passes TypeScript and lint checks
