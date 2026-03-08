# Snow Removal Section Fix Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix two visually weak sections in SnowRemovalContent.tsx — the Pricing section (nested GlassCards, no hierarchy) and "What Makes TotalGuard Different" (no icons, no accent borders).

**Architecture:** Surgical edit to one file only. No new components, no new imports beyond `MessageSquare`, `Thermometer`, `Repeat2` from lucide-react (already installed). The GlassCard `accentBorder` prop and all icons needed are already in the codebase.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS, lucide-react, existing `GlassCard` component

---

### Task 1: Update lucide-react imports

**Files:**
- Modify: `src/app/services/snow-removal/SnowRemovalContent.tsx:4`

**Step 1: Replace the import line**

Current (line 4):
```tsx
import { Phone, CheckCircle2, Snowflake, Users, Calendar, Shield, Clock, AlertTriangle, ArrowRight } from "lucide-react";
```

Replace with:
```tsx
import { Phone, CheckCircle2, Snowflake, Users, Calendar, Shield, Clock, AlertTriangle, ArrowRight, MessageSquare, Thermometer, Repeat2, Zap } from "lucide-react";
```

**Step 2: Verify no type errors**

Run: `cd tgyardcare && npx tsc --noEmit 2>&1 | head -20`
Expected: No new errors on this file

---

### Task 2: Fix "What Makes TotalGuard Different" section

**Files:**
- Modify: `src/app/services/snow-removal/SnowRemovalContent.tsx:370-393`

**Step 1: Replace the section JSX**

Find this block (lines 370–393):
```tsx
        {/* ═══════════════════════════════════════════════════════════════════
            WHAT MAKES US DIFFERENT — Final trust
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Makes TotalGuard Different</h2>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { title: "We Actually Show Up", desc: "Many snow removal companies overbook and leave customers waiting until noon. We schedule conservatively and prioritize reliability over revenue." },
                  { title: "Proactive Communication", desc: "You'll know our plan before the storm hits. No wondering if we forgot you\u2014we communicate proactively about timing and any delays." },
                  { title: "Complete Ice Treatment", desc: "We don't just plow and leave. De-icing treatment is included to prevent dangerous ice buildup on walkways and driveways." },
                  { title: "Year-Round Relationship", desc: "We're not a winter-only company. We handle your lawn all summer too\u2014so we know your property and you know our reliability." },
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <GlassCard hover="lift" className="h-full">
                      <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                      <p className="text-white/60 leading-relaxed">{item.desc}</p>
                    </GlassCard>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
```

Replace with:
```tsx
        {/* ═══════════════════════════════════════════════════════════════════
            WHAT MAKES US DIFFERENT — Final trust
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Makes TotalGuard Different</h2>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { icon: CheckCircle2, title: "We Actually Show Up", desc: "Many snow removal companies overbook and leave customers waiting until noon. We schedule conservatively and prioritize reliability over revenue." },
                  { icon: MessageSquare, title: "Proactive Communication", desc: "You'll know our plan before the storm hits. No wondering if we forgot you\u2014we communicate proactively about timing and any delays." },
                  { icon: Thermometer, title: "Complete Ice Treatment", desc: "We don't just plow and leave. De-icing treatment is included to prevent dangerous ice buildup on walkways and driveways." },
                  { icon: Repeat2, title: "Year-Round Relationship", desc: "We're not a winter-only company. We handle your lawn all summer too\u2014so we know your property and you know our reliability." },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <ScrollReveal key={i} delay={i * 0.1}>
                      <GlassCard hover="lift" accentBorder className="h-full">
                        <div className="flex items-center gap-2 mb-3">
                          <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                          <h3 className="font-bold text-lg text-white">{item.title}</h3>
                        </div>
                        <p className="text-white/70 leading-relaxed">{item.desc}</p>
                      </GlassCard>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
```

**Step 2: Verify no type errors**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

---

### Task 3: Fix "Madison-Area Snow Removal Pricing" section

**Files:**
- Modify: `src/app/services/snow-removal/SnowRemovalContent.tsx:328-365`

**Step 1: Replace the pricing section JSX**

Find this block (lines 328–365):
```tsx
        {/* ═══════════════════════════════════════════════════════════════════
            PRICING — Cinematic pricing section
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20" style={{ background: '#060f1a' }}>
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto">
                <GlassCard variant="accent" hover="glow" className="text-center p-8 md:p-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Madison-Area Snow Removal Pricing
                  </h2>
                  <p className="text-lg text-white/60 leading-relaxed mb-8">
                    Dane County averages 40+ inches of snow annually&mdash;so we offer both per-storm pricing and seasonal contracts that make sense for Wisconsin winters. Pricing depends on driveway length, property size, and service frequency.
                  </p>
                  <GlassCard className="mb-8 text-left">
                    <h3 className="font-semibold mb-4">Pricing Options:</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-white/60">
                      <div>
                        <strong className="text-white">Per-Storm</strong>
                        <p>Pay only when we plow. Good for light winters or budget flexibility.</p>
                      </div>
                      <div>
                        <strong className="text-white">Seasonal Contract</strong>
                        <p>Fixed price for entire season. Best value for typical Dane County winters.</p>
                      </div>
                    </div>
                  </GlassCard>
                  <GlassCard variant="accent" className="mb-8">
                    <p className="text-lg font-semibold mb-2">Wisconsin Winter Season</p>
                    <p className="text-white/60">
                      Snow removal available November through March. We monitor Dane County forecasts closely and mobilize before storms hit&mdash;so you wake up to cleared driveways, not snow piles.
                    </p>
                  </GlassCard>
                  <Button size="lg" className="font-bold text-lg" asChild>
                    <Link href="/contact?service=snow-removal">Get Your Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                </GlassCard>
              </div>
            </ScrollReveal>
          </div>
        </section>
```

Replace with:
```tsx
        {/* ═══════════════════════════════════════════════════════════════════
            PRICING — Cinematic pricing section
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20" style={{ background: '#060f1a' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  Madison-Area Snow Removal Pricing
                </h2>
                <p className="text-lg text-white/60 text-center leading-relaxed mb-10">
                  Dane County averages 40+ inches of snow annually&mdash;so we offer both per-storm pricing and seasonal contracts that make sense for Wisconsin winters. Pricing depends on driveway length, property size, and service frequency.
                </p>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Per-Storm */}
                <ScrollReveal delay={0.1}>
                  <GlassCard accentBorder hover="lift" className="h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="h-5 w-5 text-primary flex-shrink-0" />
                      <h3 className="text-xl font-bold text-white">Per-Storm</h3>
                    </div>
                    <ul className="space-y-2 text-white/70 text-sm mb-4">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        Pay only when we plow
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        Good for light winters or budget flexibility
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        No long-term commitment
                      </li>
                    </ul>
                  </GlassCard>
                </ScrollReveal>

                {/* Seasonal Contract */}
                <ScrollReveal delay={0.2}>
                  <GlassCard accentBorder hover="lift" className="h-full relative" style={{ background: 'rgba(var(--primary-rgb, 16 185 129) / 0.08)' }}>
                    <div className="absolute -top-3 right-4 bg-primary text-black px-3 py-0.5 rounded-full text-xs font-bold">
                      Most Popular
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                      <h3 className="text-xl font-bold text-white">Seasonal Contract</h3>
                    </div>
                    <ul className="space-y-2 text-white/70 text-sm mb-4">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        Fixed price for the entire season
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        Best value for typical Dane County winters
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        Priority scheduling guaranteed
                      </li>
                    </ul>
                  </GlassCard>
                </ScrollReveal>
              </div>

              {/* Wisconsin Winter Season strip */}
              <ScrollReveal delay={0.3}>
                <div className="flex items-start gap-3 text-white/60 text-sm max-w-2xl mx-auto text-center justify-center mb-10">
                  <Snowflake className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <p>Snow removal available November through March. We monitor Dane County forecasts closely and mobilize before storms hit&mdash;so you wake up to cleared driveways, not snow piles.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="text-center">
                  <Button size="lg" className="font-bold text-lg" asChild>
                    <Link href="/contact?service=snow-removal">Get Your Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
```

**Step 2: Verify no type errors**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

---

### Task 4: Verify and commit

**Step 1: Run type check**

```bash
cd /c/Users/vance/OneDrive/Desktop/claude-workspace/tgyardcare
npx tsc --noEmit 2>&1 | head -30
```
Expected: No errors (project has `typescript.ignoreBuildErrors = true` in next.config.ts so warnings are OK)

**Step 2: Run lint**

```bash
npx next lint 2>&1 | head -30
```
Expected: No new errors introduced

**Step 3: Visual check**

Start dev server: `npm run dev`
Navigate to: `http://localhost:3000/services/snow-removal`
Verify:
- Pricing section shows two side-by-side cards with icons and cyan left borders
- "Seasonal Contract" card has "Most Popular" badge
- "What Makes TotalGuard Different" shows 4 cards each with a unique icon and cyan left border
- Card headings are clearly readable against card backgrounds

**Step 4: Commit**

```bash
cd /c/Users/vance/OneDrive/Desktop/claude-workspace
git add tgyardcare/src/app/services/snow-removal/SnowRemovalContent.tsx
git commit -m "fix: strengthen pricing and differentiators sections on snow removal page

- Rebuilt pricing as two side-by-side GlassCards with icons and accentBorder
- Removed nested GlassCard-inside-GlassCard anti-pattern
- Added icons + accentBorder to all 4 'What Makes TotalGuard Different' cards
- Card headings now font-bold text-white; body bumped to text-white/70

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```
