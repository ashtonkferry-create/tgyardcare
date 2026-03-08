# Hardscaping Partner Page — Design Doc

**Date**: 2026-03-08
**Status**: Approved
**Partner**: YD Exterior Visions (Monticello, WI)

---

## Overview

Add a hardscaping services page to TotalGuard Yard Care's site at `/services/hardscaping`. All hardscaping work is fulfilled by YD Exterior Visions — all CTAs route directly to YD's phone `(608) 576-4220` and email `ydexteriorvisions@gmail.com`. The page is branded as TotalGuard, SEO-optimized for "hardscaping Madison WI", and does NOT feature YD's name in the title/URL/meta.

## Partner: YD Exterior Visions

- **Owner**: Jonah Linfield
- **Phone**: (608) 576-4220
- **Email**: ydexteriorvisions@gmail.com
- **Address**: W5883 Loveland Rd, Monticello, WI 53570
- **Hours**: Monday-Friday, 8:00 AM - 6:00 PM
- **Service Areas**: Madison, Dane County, Green County, New Glarus, Monticello, Monroe, Verona, Middleton
- **Rating**: 5.0 stars, Nextdoor Neighborhood Favorite 2024
- **Practices**: 100% organic

## Hardscaping Services (ONLY these — no landscaping/snow/seasonal)

1. **Paver Patios & Pathways** — Custom-designed, proper base system, withstands freeze-thaw
2. **Flagstone Patios & Pathways** — Strong, visually striking natural stone surfaces
3. **Retaining Walls** — Structural and decorative wall construction
4. **Stone Garden Edging** — Cobblestone, granite, Belgian edger with geotextile base
5. **Custom Firepits** — Warm outdoor gathering spots, durable materials
6. **Stone Paths & Walkways** — Natural beauty with practical design
7. **Block Work** — Driveways and decorative garden features

## Installation Process (from YD's paver patios page)

1. Full excavation to undisturbed subgrade (adjusted for Dane County clay soil)
2. Geotextile fabric layer installation
3. 6-8 inches of compacted Class V gravel base (installed in lifts)
4. 1-inch screeded bedding sand layer
5. Paver placement with soldier course borders and edge restraint
6. Polymeric sand joints for weed prevention and erosion control

## Testimonials (real Google reviews)

1. **Ray**: "I had them put in a paver patio for me and love the final product."
2. **Morgan Ramsey**: "These guys did a great job with my new paver patio."
3. **Ed Batchelor**: "The team was kind enough to work around the weather"
4. **Charlie Duguanno**: "they did a wonderful job and were very communicative."
5. **Chaz Vanwormer**: "made sure I had the exact design I wanted."

---

## Page Architecture

### Route: `/services/hardscaping`

**Files to create**:
- `src/app/services/hardscaping/page.tsx` — Server Component with Metadata + OpenGraph
- `src/app/services/hardscaping/HardscapingContent.tsx` — Client Component with full page

**Files to modify**:
- `src/components/Navigation.tsx` — Add "Looking for Hardscaping?" link to both mega menus
- `src/components/MobileNavMenu.tsx` — Add hardscaping link to mobile nav
- `src/components/Footer.tsx` — Add "Hardscaping" to services column
- `src/app/sitemap.ts` — Add `/services/hardscaping` to service pages array

### Page Sections

1. **Hero** — Dark seasonal bg, headline "Professional Hardscaping in Madison & Dane County", subheadline, CTA → YD phone
2. **Services Grid** — 7 hardscaping services as glass cards with icons and descriptions
3. **Process Section** — 6-step installation process with numbered steps
4. **Trust/Benefits** — Wisconsin weather expertise, proper base prep, 5.0 rating, organic practices
5. **Testimonials** — 5 real reviews in marquee or grid
6. **Partner Attribution** — "Hardscaping services provided by our trusted partner, YD Exterior Visions" — small, tasteful
7. **CTA Section** — "Request a Hardscape Estimate" → YD phone + email directly

### Mega Menu Changes

Both residential and commercial mega menus get a bottom-left accent link:
- Text: **"Looking for Hardscaping?"**
- Icon: Brick/stone icon (Layers or Blocks from lucide)
- Links to: `/services/hardscaping`
- Position: Below the 3 columns, left-aligned, before the sidebar
- Styling: Accent-colored text with arrow, subtle but visible

### Footer Changes

Add `{ label: 'Hardscaping', href: '/services/hardscaping' }` to the `lawnCareServices` array (or create a separate entry at the bottom of column 1).

### SEO/Schema

- **Title**: "Hardscaping Services Madison WI | Patios, Walls & Firepits | TG Yard Care"
- **Description**: "Professional hardscaping in Madison & Dane County. Paver patios, retaining walls, firepits, stone walkways & more. Built to last through Wisconsin winters. Free estimates!"
- **Canonical**: `https://tgyardcare.com/services/hardscaping`
- **Schema**: WebPageSchema + custom Service schema for hardscaping
- **Sitemap**: Added to `servicePages` array in `sitemap.ts`
- **No YD name** in title, URL, description, or schema `name` field

### CTA Routing (ALL go to YD directly)

- Phone: `tel:608-576-4220` → "(608) 576-4220"
- Email: `mailto:ydexteriorvisions@gmail.com`
- No TotalGuard contact form involvement

### Design System Compliance

- Dark cinematic seasonal theme (useSeasonalTheme)
- GlassCard components for service cards
- ScrollReveal for staggered animations
- Framer Motion for all interactive elements
- Seasonal accent colors throughout
- AmbientParticles in background sections
- CTASection component or custom CTA matching footer closer style
