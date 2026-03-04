# Careers Nav Pill — Design Doc

**Goal:** Surface "Careers" as a standalone, elevated nav item on the right side of the desktop navbar using a pulsing "We're Hiring" pill — without cluttering the existing service navigation.

---

## Problem

"Careers" is currently buried as the last item inside the "About Us" dropdown. For a company actively hiring, this under-signals credibility and makes it hard for candidates to find. A billion-dollar brand treats its careers destination as a first-class link.

## Solution

A right-side pulse pill, positioned between the phone number and "Get Free Quote" CTA:

```
[Phone]  [● We're Hiring]  [Get Free Quote →]
```

## Visual Design

**Pill anatomy:**
- Container: `rounded-full px-3 py-1.5 border border-white/20 bg-white/[0.04]`
- Left: pulsing dot — solid center + `animate-ping` ring (seasonal color)
- Text: `"We're Hiring"` — `text-xs font-semibold tracking-wide text-white/80`
- Hover: `bg-white/[0.08]`, border → `border-white/40`, `scale(1.02)`, 200ms ease

**Seasonal dot color (adapts to `activeSeason`):**
| Season | Color | Hex |
|--------|-------|-----|
| summer | emerald | `#22c55e` |
| fall | amber | `#f59e0b` |
| winter | cyan | `#22d3ee` |

## Behavior

- **Desktop (lg+):** Visible as pulse pill between phone and CTA
- **Mobile:** Hidden — Careers remains accessible via the hamburger mobile menu
- **About Us dropdown:** Remove "Careers" from `aboutPages` array — it lives at top level now
- **Navigation:** Clicking pill goes to `/careers`

## Files to Change

1. `src/components/Navigation.tsx`
   - Remove `{ name: "Careers", path: "/careers" }` from `aboutPages` array
   - Add "We're Hiring" pulse pill in the desktop right-side `div` (between phone link and Get Free Quote button)

That's it — one file, two edits.
