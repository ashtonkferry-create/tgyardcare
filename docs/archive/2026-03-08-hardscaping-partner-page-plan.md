# Hardscaping Partner Page — Implementation Plan

**Date**: 2026-03-08
**Design Doc**: `2026-03-08-hardscaping-partner-page-design.md`

---

## Tasks

### Task 1: Create `/services/hardscaping/page.tsx`
- Server component with Metadata + OpenGraph
- Title: "Hardscaping Services Madison WI | Patios, Walls & Firepits | TG Yard Care"
- Canonical: `https://tgyardcare.com/services/hardscaping`
- Renders `<HardscapingContent />`

### Task 2: Create `/services/hardscaping/HardscapingContent.tsx`
- Client component following MowingContent pattern
- Sections: Hero, Services Grid, Process, Trust, Testimonials, Partner Attribution, CTA
- Uses: Navigation, Footer, ScrollReveal, GlassCard, AmbientParticles, BreadcrumbSchema, WebPageSchema
- All CTAs → YD phone/email directly
- Dark cinematic seasonal theme

### Task 3: Add mega menu "Looking for Hardscaping?" link
- Edit `Navigation.tsx` — add accent link below columns in both residential and commercial MegaMenu
- Uses Layers icon from lucide-react
- Links to `/services/hardscaping`

### Task 4: Add hardscaping to mobile nav
- Edit `MobileNavMenu.tsx` — add hardscaping link in services section

### Task 5: Add hardscaping to footer
- Edit `Footer.tsx` — add `{ label: 'Hardscaping', href: '/services/hardscaping' }` to services list

### Task 6: Add to sitemap
- Edit `sitemap.ts` — add `'hardscaping'` to service pages array

### Task 7: Commit all changes
