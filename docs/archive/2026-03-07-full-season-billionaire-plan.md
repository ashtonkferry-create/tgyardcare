# Full Season Property Care - Billionaire Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite `FullSeasonContract.tsx` from a weak green-themed section into a billionaire-brand gold/amber luxury section with a seasonal timeline arc, jewel-tone season cards, animated counter benefits, and a gold shimmer CTA.

**Architecture:** Single component rewrite. Keep `'use client'`, Framer Motion, existing `AnimatedCounter` component. Remove `AmbientParticles` import, replace with inline dot-grid. No new files needed — everything stays in `FullSeasonContract.tsx`.

**Tech Stack:** React 19, Framer Motion, Tailwind CSS 3.4, Lucide Icons, existing `AnimatedCounter` component.

**Design Doc:** `docs/plans/2026-03-07-full-season-billionaire-redesign.md`

---

### Task 1: Rewrite data layer and types

**Files:**
- Modify: `src/components/FullSeasonContract.tsx`

**Step 1: Replace the entire `SeasonData` interface and `seasons` array**

Replace the existing interface and data with jewel-tone colors:

```tsx
interface SeasonData {
  icon: LucideIcon;
  label: string;
  tagline: string;
  jewel: string;      // tailwind text color
  jewelHex: string;   // raw hex for inline styles (glow, border)
  bg: string;         // tailwind bg with opacity
  services: string[];
}

const seasons: SeasonData[] = [
  {
    icon: Leaf,
    label: "Spring",
    tagline: "Revival & Renewal",
    jewel: "text-emerald-400",
    jewelHex: "#34D399",
    bg: "bg-emerald-500/10",
    services: ["Spring Cleanup", "Lawn Recovery", "Edging & Trimming", "Mulching", "Garden Bed Prep", "Early Fertilization"],
  },
  {
    icon: Sun,
    label: "Summer",
    tagline: "Peak Performance",
    jewel: "text-blue-400",
    jewelHex: "#60A5FA",
    bg: "bg-blue-500/10",
    services: ["Weekly Mowing", "Weed Control", "Herbicide Treatments", "Bush Trimming", "Garden Maintenance", "Property Upkeep"],
  },
  {
    icon: Sparkles,
    label: "Fall",
    tagline: "Protect & Prepare",
    jewel: "text-amber-600",
    jewelHex: "#C87533",
    bg: "bg-amber-700/10",
    services: ["Leaf Removal", "Fall Cleanup", "Aeration", "Overseeding", "Gutter Cleaning", "Winterization"],
  },
  {
    icon: Snowflake,
    label: "Winter",
    tagline: "Safe & Secure",
    jewel: "text-slate-300",
    jewelHex: "#94A3B8",
    bg: "bg-slate-400/10",
    services: ["Snow Removal", "Ice Management", "Salting", "Gutter Guards", "Property Monitoring", "Emergency Response"],
  },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
```

**Step 2: Update imports**

Remove: `AmbientParticles` import, `DollarSign` icon.
Add: `Calendar` icon (for benefits row).
Keep: `Shield, CheckCircle2, ArrowRight, Sparkles, Leaf, Sun, Snowflake, Crown, X, type LucideIcon`.
Keep: `motion, AnimatePresence` from framer-motion.
Keep: `useState` from react.
Add: `AnimatedCounter` import from `@/components/AnimatedCounter`.
Add: `Link` from `next/link`, `Button` from `@/components/ui/button`.

**Step 3: Verify file compiles**

Run: `cd tgyardcare && npx tsc --noEmit src/components/FullSeasonContract.tsx 2>&1 | head -20`
Expected: No errors (or only pre-existing project-wide errors).

---

### Task 2: Build the section wrapper + Tier 1 (Hero Header)

**Files:**
- Modify: `src/components/FullSeasonContract.tsx`

**Step 1: Replace the entire return JSX**

Start fresh with the new section wrapper and Tier 1:

```tsx
const contactLink = "/contact?service=full-season";
const [expandedSeason, setExpandedSeason] = useState<number | null>(null);

return (
  <section className="relative py-20 md:py-32 overflow-hidden" style={{ background: '#0A0A0F' }}>
    {/* Subtle dot grid background */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: 'radial-gradient(circle, #D4A855 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    />
    {/* Warm gold radial glow behind timeline area */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(ellipse, rgba(212,168,85,0.08) 0%, transparent 70%)' }}
    />

    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      <div className="max-w-5xl mx-auto">

        {/* TIER 1: Hero Header */}
        {/* Badge */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold tracking-wide border"
            style={{
              background: 'linear-gradient(135deg, rgba(212,168,85,0.2), rgba(245,200,66,0.1))',
              borderColor: 'rgba(212,168,85,0.4)',
              color: '#D4A855',
            }}
          >
            <Crown className="h-4 w-4" />
            FLAGSHIP PROPERTY CARE
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight tracking-tight">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #D4A855, #F5C842)' }}
            >
              Full Season
            </span>
            <br />
            Property Care
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            One contract. Twelve months. Zero gaps.
            <span className="text-white font-semibold"> Stop scheduling — start enjoying your property.</span>
          </p>
        </motion.div>

        {/* ...Tier 2 and 3 go here in subsequent tasks... */}

      </div>
    </div>
  </section>
);
```

**Step 2: Verify renders**

Run: `cd tgyardcare && npx next build 2>&1 | tail -5`
Expected: Build succeeds (or pre-existing warnings only).

**Step 3: Commit**

```bash
git add src/components/FullSeasonContract.tsx
git commit -m "feat: Full Season section — new data layer + gold hero header"
```

---

### Task 3: Build Tier 2 — Season Cards + Timeline Arc

**Files:**
- Modify: `src/components/FullSeasonContract.tsx`

**Step 1: Add the 4 season cards (between headline and Tier 3)**

Insert after the headline `motion.div` closing tag:

```tsx
{/* TIER 2: Season Cards */}
<motion.div
  className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.3 }}
>
  {seasons.map((season, index) => {
    const Icon = season.icon;
    const isExpanded = expandedSeason === index;
    return (
      <motion.button
        key={season.label}
        onClick={() => setExpandedSeason(isExpanded ? null : index)}
        className="relative text-left rounded-2xl p-5 backdrop-blur-sm border border-white/10 transition-all duration-300 cursor-pointer group"
        style={{
          background: 'rgba(255,255,255,0.03)',
          borderTop: `2px solid ${season.jewelHex}`,
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
        whileHover={{
          y: -6,
          boxShadow: `0 20px 40px -12px ${season.jewelHex}30`,
          borderColor: `${season.jewelHex}60`,
        }}
      >
        {/* Card header */}
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            className={`p-2 rounded-lg ${season.bg}`}
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Icon className={`h-5 w-5 ${season.jewel}`} />
          </motion.div>
          <div>
            <h3 className="text-white font-bold text-base">{season.label}</h3>
            <p className={`text-xs font-medium ${season.jewel}`}>{season.tagline}</p>
          </div>
        </div>
        <p className="text-slate-400 text-xs">{season.services.length} services included</p>

        {/* Expanded services list */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                {season.services.map((service, i) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className={`h-3.5 w-3.5 flex-shrink-0 ${season.jewel}`} />
                    <span className="text-white/80 text-xs font-medium">{service}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    );
  })}
</motion.div>
```

**Step 2: Add the timeline bar with coverage beam**

Insert after the season cards grid:

```tsx
{/* Timeline Arc */}
<motion.div
  className="mb-12"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.6 }}
>
  {/* Timeline bar */}
  <div className="relative h-2 rounded-full overflow-hidden mb-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
    {/* Season segments */}
    <div className="absolute inset-0 flex">
      {seasons.map((season, i) => (
        <motion.div
          key={season.label}
          className="h-full"
          style={{
            width: '25%',
            background: season.jewelHex,
            opacity: 0.6,
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.7 + i * 0.15, ease: "easeOut" }}
        />
      ))}
    </div>
    {/* Golden coverage beam */}
    <motion.div
      className="absolute top-0 h-full w-[15%] rounded-full"
      style={{
        background: 'linear-gradient(90deg, transparent, #F5C842, transparent)',
        opacity: 0.8,
      }}
      animate={{ left: ['-15%', '100%'] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
    />
  </div>

  {/* Month labels */}
  <div className="flex justify-between px-1">
    {months.map((month, i) => (
      <motion.span
        key={month}
        className="text-[10px] md:text-xs text-slate-500 font-medium"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 + i * 0.04 }}
      >
        {month}
      </motion.span>
    ))}
  </div>
</motion.div>
```

**Step 3: Commit**

```bash
git add src/components/FullSeasonContract.tsx
git commit -m "feat: Full Season section — season cards + timeline arc with coverage beam"
```

---

### Task 4: Build Tier 3 — Benefits, CTA, and Trust

**Files:**
- Modify: `src/components/FullSeasonContract.tsx`

**Step 1: Add the 3-column animated benefits row**

Insert after the timeline:

```tsx
{/* TIER 3: Benefits + CTA */}
{/* Benefits row */}
<motion.div
  className="grid grid-cols-3 gap-4 md:gap-6 mb-10"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.8 }}
>
  {[
    { value: 20, prefix: "", suffix: "%", label: "Bundle savings vs. booking separately", icon: DollarSign },
    { value: 365, prefix: "", suffix: "", label: "Days of continuous coverage", icon: Calendar },
    { value: 1, prefix: "", suffix: "", label: "Dedicated team, year-round", icon: Shield },
  ].map((stat, i) => (
    <div
      key={stat.label}
      className="text-center p-4 md:p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <div
        className="inline-flex p-2.5 rounded-xl mb-3"
        style={{ background: 'rgba(212,168,85,0.15)' }}
      >
        <stat.icon className="h-5 w-5" style={{ color: '#D4A855' }} />
      </div>
      <div className="text-2xl md:text-4xl font-bold mb-1" style={{ color: '#F5C842' }}>
        <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
      </div>
      <p className="text-slate-400 text-xs md:text-sm leading-snug">{stat.label}</p>
    </div>
  ))}
</motion.div>
```

**Step 2: Add the gold CTA and trust line**

```tsx
{/* CTA */}
<motion.div
  className="text-center"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 1.0 }}
>
  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        size="lg"
        className="font-bold text-sm md:text-lg px-8 md:px-10 py-5 md:py-6 rounded-full shadow-xl transition-all duration-500 group text-[#0A0A0F]"
        style={{
          background: 'linear-gradient(135deg, #D4A855, #F5C842)',
          boxShadow: '0 10px 40px -10px rgba(212,168,85,0.4)',
        }}
        asChild
      >
        <Link href={contactLink}>
          <Shield className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
          Lock In Full Season Coverage
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </motion.div>

    <motion.a
      href="tel:608-535-6057"
      className="text-slate-400 hover:text-white font-semibold transition-colors flex items-center gap-2"
      whileHover={{ x: 3 }}
    >
      Or call (608) 535-6057
      <ArrowRight className="h-4 w-4" />
    </motion.a>
  </div>

  {/* Trust line */}
  <motion.p
    className="mt-8 text-slate-500 text-sm"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 1.2 }}
  >
    Trusted by 127 Madison families year-round &bull; 4.9&#9733; Google Rating &bull; Fully Insured
  </motion.p>
</motion.div>
```

**Step 3: Re-add DollarSign and add Calendar to imports**

Update the lucide-react import line:
```tsx
import {
  Shield, CheckCircle2, ArrowRight, Sparkles, Leaf, Sun, Snowflake, Crown, X,
  DollarSign, Calendar,
  type LucideIcon
} from "lucide-react";
```

Remove the `AmbientParticles` import line. Remove unused `benefits` array.

**Step 4: Verify build**

Run: `cd tgyardcare && npx next build 2>&1 | tail -10`
Expected: Build succeeds.

**Step 5: Commit**

```bash
git add src/components/FullSeasonContract.tsx
git commit -m "feat: Full Season section — benefits counters, gold CTA, trust line"
```

---

### Task 5: Visual QA with Playwright

**Files:** None (verification only)

**Step 1: Start dev server**

Run: `cd tgyardcare && npm run dev`

**Step 2: Screenshot at 3 breakpoints**

Use Playwright MCP to navigate to `http://localhost:3000` and scroll to the Full Season section. Take screenshots at:
- 375px (mobile)
- 768px (tablet)
- 1440px (desktop)

**Step 3: Verify checklist**
- [ ] Gold badge visible, not green
- [ ] "Full Season" text is gold gradient
- [ ] 4 season cards display with distinct jewel-tone top borders
- [ ] Timeline bar shows 4 colored segments
- [ ] Golden beam animates across timeline
- [ ] Month labels (Jan-Dec) visible below timeline
- [ ] Season card expands on click showing services
- [ ] Benefits show animated counters (20%, 365, 1)
- [ ] CTA button is gold with dark text
- [ ] Trust line at bottom
- [ ] Mobile: 2x2 card grid, no horizontal overflow
- [ ] No green `text-primary` anywhere in the section

**Step 4: Final commit with any fixes**

```bash
git add src/components/FullSeasonContract.tsx
git commit -m "fix: Full Season visual QA polish"
```

**Step 5: Push**

```bash
git push origin main
```
