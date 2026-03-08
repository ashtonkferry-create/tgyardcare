# Careers Nav Pill Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a pulsing "We're Hiring" pill to the right side of the desktop navbar and remove Careers from the About Us dropdown.

**Architecture:** Single file change in `Navigation.tsx` — remove Careers from `aboutPages` array, insert a pulse pill `<Link>` between the phone link and Get Free Quote button in the desktop right-side div. Pill uses `activeSeason` from the existing `useSeasonalTheme()` hook for dot color.

**Tech Stack:** Next.js, Tailwind CSS, Framer Motion (already imported), `useSeasonalTheme` context

---

### Task 1: Remove Careers from About Us dropdown + add pulse pill to desktop right nav

**Files:**
- Modify: `src/components/Navigation.tsx:292-299` (aboutPages array)
- Modify: `src/components/Navigation.tsx:901-930` (desktop right-side div)

**Step 1: Remove Careers from aboutPages**

In `src/components/Navigation.tsx`, find the `aboutPages` array (~line 292):

```ts
const aboutPages = [
  { name: "About Us", path: "/about" },
  { name: "Meet Our Team", path: "/team" },
  { name: "Service Areas", path: "/service-areas" },
  { name: "FAQ", path: "/faq" },
  { name: "Blog", path: "/blog" },
  { name: "Careers", path: "/careers" },  // ← DELETE this line
];
```

Remove the Careers entry so it reads:

```ts
const aboutPages = [
  { name: "About Us", path: "/about" },
  { name: "Meet Our Team", path: "/team" },
  { name: "Service Areas", path: "/service-areas" },
  { name: "FAQ", path: "/faq" },
  { name: "Blog", path: "/blog" },
];
```

**Step 2: Build the seasonal dot color map**

Near the top of the component function body (right after the existing seasonal theme maps like `seasonalCtaBg`, etc. — or just inline in JSX), add:

```ts
const hiringDotColor: Record<string, string> = {
  summer: '#22c55e',
  fall:   '#f59e0b',
  winter: '#22d3ee',
};
const dotColor = hiringDotColor[activeSeason] ?? '#22c55e';
```

**Step 3: Insert the "We're Hiring" pill in the desktop right nav**

Find the desktop right-side div (~line 901):

```tsx
{/* ---- Desktop Right Side (Phone + CTA) ---- */}
<div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
  <a href="tel:608-535-6057" ...>
    ...phone...
  </a>
  <Link href="/contact" ...>
    Get Free Quote ...
  </Link>
</div>
```

Insert the pill **between** the phone `<a>` and the Get Free Quote `<Link>`:

```tsx
{/* We're Hiring pulse pill */}
<Link
  href="/careers"
  className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/40 hover:scale-[1.02] transition-all duration-200"
>
  {/* Pulsing dot */}
  <span className="relative flex h-2 w-2">
    <span
      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
      style={{ backgroundColor: dotColor }}
    />
    <span
      className="relative inline-flex rounded-full h-2 w-2"
      style={{ backgroundColor: dotColor }}
    />
  </span>
  <span className="text-xs font-semibold tracking-wide text-white/80">
    We&apos;re Hiring
  </span>
</Link>
```

Note: `hidden xl:flex` hides it at `lg` breakpoint (where the nav is already tight) and shows it at `xl+` where there's enough room. If the nav feels tight at xl, change to `hidden 2xl:flex`.

**Step 4: Verify visually**

Run dev server:
```bash
cd c:\Users\vance\OneDrive\Desktop\claude-workspace\tgyardcare
npm run dev
```

Check at `localhost:3000`:
- At `xl` width (1280px+): pill visible between phone and Get Free Quote button, dot pulses
- At `lg` width (1024–1279px): pill hidden, nav not crowded
- Mobile: pill not visible, Careers accessible via hamburger menu
- Hover: pill brightens, scales up slightly
- Click: navigates to `/careers`
- About Us dropdown: no longer contains "Careers"
- Switch seasons (via admin or override): dot color changes

**Step 5: Commit**

```bash
git add src/components/Navigation.tsx
git commit -m "feat: careers we're hiring pulse pill in desktop nav"
git push
```

---
