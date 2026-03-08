# Concierge Confirmation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the generic ServiceUpsellDialog and QuickQuoteDialog success state with a cinematic, seasonally-themed "Concierge Confirmation" experience that reveals content in timed animation phases.

**Architecture:** Single new component `ConciergeConfirmation.tsx` with two render modes (`dialog` for /contact, `inline` for QuickQuoteDialog). Uses Framer Motion for staged reveals, existing `useSeasonalTheme()` for theming, and `seasonalPriority` from `seasonalServices.ts` for dynamic service recommendations. Tracks upsell clicks to the existing `upsell_clicks` Supabase table.

**Tech Stack:** React 19, Framer Motion, Lucide icons, shadcn Dialog, Supabase client, existing seasonal theme system

---

## Task 1: Create ConciergeConfirmation Component

**Files:**
- Create: `src/components/ConciergeConfirmation.tsx`

**Step 1: Create the component file**

```tsx
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  CheckCircle2, Clock, Phone, Sparkles, ArrowRight,
  Scissors, Sprout, Layers, Flower2, Wind, ShieldCheck,
  Leaf, TreePine, Droplets, Shield, TreeDeciduous, Snowflake, Flower,
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { getCurrentServiceSeason, type ServiceSeason } from '@/lib/seasonalServices';
import { SITE_STATS } from '@/lib/seasonalConfig';
import { supabase } from '@/integrations/supabase/client';
import type { LucideIcon } from 'lucide-react';

/* ─── Seasonal Theme Tokens ─── */
const seasonThemes = {
  summer: {
    dialogBg: '#0a0f0a',
    accent: 'emerald',
    accentSolid: '#10b981',
    accentRgb: '16, 185, 129',
    checkGradient: 'from-emerald-400 to-green-600',
    ctaGradient: 'from-green-600 to-emerald-500',
    particleColor: 'bg-emerald-400',
    glowColor: 'rgba(16, 185, 129, 0.2)',
    timelineBorder: 'border-emerald-500/20',
    timelineIcon: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    cardBorder: 'border-emerald-500/10',
    cardHoverBorder: 'hover:border-emerald-500/30',
  },
  fall: {
    dialogBg: '#0d0900',
    accent: 'amber',
    accentSolid: '#f59e0b',
    accentRgb: '245, 158, 11',
    checkGradient: 'from-amber-400 to-orange-600',
    ctaGradient: 'from-amber-600 to-orange-500',
    particleColor: 'bg-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.2)',
    timelineBorder: 'border-amber-500/20',
    timelineIcon: 'text-amber-400',
    badgeBg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    cardBorder: 'border-amber-500/10',
    cardHoverBorder: 'hover:border-amber-500/30',
  },
  winter: {
    dialogBg: '#020810',
    accent: 'cyan',
    accentSolid: '#06b6d4',
    accentRgb: '6, 182, 212',
    checkGradient: 'from-cyan-300 to-blue-500',
    ctaGradient: 'from-blue-600 to-cyan-500',
    particleColor: 'bg-cyan-300',
    glowColor: 'rgba(6, 182, 212, 0.2)',
    timelineBorder: 'border-cyan-400/20',
    timelineIcon: 'text-cyan-400',
    badgeBg: 'bg-cyan-400/10 border-cyan-400/20 text-cyan-400',
    cardBorder: 'border-cyan-400/10',
    cardHoverBorder: 'hover:border-cyan-400/30',
  },
} as const;

/* ─── Service Data Map ─── */
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
  'Gutter Guards': { icon: Shield, hook: 'Never clean gutters again', slug: 'gutter-guards' },
  'Leaf Removal': { icon: Leaf, hook: 'Complete leaf extraction, curb to fence line', slug: 'leaf-removal' },
  'Fall Cleanup': { icon: TreeDeciduous, hook: 'Full-property prep before the freeze', slug: 'fall-cleanup' },
  'Snow Removal': { icon: Snowflake, hook: 'Cleared before you wake up, 24/7', slug: 'snow-removal' },
};

const seasonalPriority: Record<ServiceSeason, string[]> = {
  spring: ['Spring Cleanup', 'Lawn Mowing', 'Fertilization', 'Mulching', 'Garden Beds', 'Aeration'],
  summer: ['Lawn Mowing', 'Fertilization', 'Herbicide Services', 'Weeding', 'Garden Beds', 'Bush Trimming'],
  fall: ['Fall Cleanup', 'Leaf Removal', 'Gutter Cleaning', 'Gutter Guards', 'Lawn Mowing', 'Aeration'],
  winter: ['Snow Removal', 'Gutter Guards', 'Gutter Cleaning', 'Lawn Mowing', 'Spring Cleanup', 'Fertilization'],
};

function getSeasonalBadge(index: number, season: ServiceSeason): string {
  if (index === 0) return season === 'winter' ? '24/7 Response' : 'Peak Demand';
  if (index === 1) return 'Limited Spots';
  return 'Early Bird';
}

function getRecommendedServices(season: ServiceSeason, submittedMessage?: string) {
  const priority = seasonalPriority[season];
  const messageLower = (submittedMessage || '').toLowerCase();

  return priority
    .filter(name => {
      const data = SERVICE_UPSELL_DATA[name];
      if (!data) return false;
      // Skip services mentioned in the user's message
      if (messageLower && (
        messageLower.includes(name.toLowerCase()) ||
        messageLower.includes(data.slug.replace(/-/g, ' '))
      )) return false;
      return true;
    })
    .slice(0, 3)
    .map((name, index) => ({
      ...SERVICE_UPSELL_DATA[name],
      name,
      badge: getSeasonalBadge(index, season),
    }));
}

/* ─── Particle Burst ─── */
function ParticleBurst({ color }: { color: string }) {
  const particles = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      angle: (i / 10) * 360,
      distance: 40 + Math.random() * 30,
      size: 2 + Math.random() * 2,
      delay: Math.random() * 0.2,
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: color,
            left: '50%',
            top: '50%',
          }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
            y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.3 + p.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Timeline Step ─── */
function TimelineStep({
  icon: Icon,
  time,
  description,
  theme,
  index,
}: {
  icon: LucideIcon;
  time: string;
  description: string;
  theme: typeof seasonThemes.summer;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 1.5 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex-1 bg-white/[0.06] border ${theme.cardBorder} backdrop-blur-sm rounded-xl p-4 text-center`}
    >
      <div className={`inline-flex p-2 rounded-lg bg-white/[0.06] mb-3`}>
        <Icon className={`h-5 w-5 ${theme.timelineIcon}`} />
      </div>
      <p className="text-white font-bold text-sm mb-1">{time}</p>
      <p className="text-white/45 text-xs leading-relaxed">{description}</p>
    </motion.div>
  );
}

/* ─── Service Card ─── */
function ServiceCard({
  name,
  icon: Icon,
  hook,
  slug,
  badge,
  theme,
  index,
  onClose,
}: {
  name: string;
  icon: LucideIcon;
  hook: string;
  slug: string;
  badge: string;
  theme: typeof seasonThemes.summer;
  index: number;
  onClose: () => void;
}) {
  const trackClick = useCallback(async () => {
    try {
      await supabase.from('upsell_clicks').insert({
        service_name: name,
        service_path: `/services/${slug}`,
        referrer_page: typeof window !== 'undefined' ? window.location.pathname : '/contact',
        session_id: typeof window !== 'undefined'
          ? localStorage.getItem('chat_session_id') || 'unknown'
          : 'unknown',
      });
    } catch {
      // Silent fail — tracking is non-critical
    }
  }, [name, slug]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 3 + index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        href={`/services/${slug}`}
        onClick={() => { trackClick(); onClose(); }}
        className={`block bg-white/[0.06] border ${theme.cardBorder} ${theme.cardHoverBorder} backdrop-blur-sm rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08] group`}
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-white/[0.06] flex-shrink-0">
            <Icon className={`h-5 w-5 ${theme.timelineIcon}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-white font-bold text-sm">{name}</h4>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${theme.badgeBg}`}>
                {badge}
              </span>
            </div>
            <p className="text-white/40 text-xs leading-relaxed">{hook}</p>
          </div>
          <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Main Component ─── */
interface ConciergeConfirmationProps {
  open: boolean;
  onClose: () => void;
  mode: 'dialog' | 'inline';
  submittedMessage?: string;
}

function ConciergeConfirmationContent({ onClose, submittedMessage }: Omit<ConciergeConfirmationProps, 'open' | 'mode'>) {
  const { activeSeason } = useSeasonalTheme();
  const theme = seasonThemes[activeSeason] ?? seasonThemes.summer;
  const season = getCurrentServiceSeason();
  const services = useMemo(() => getRecommendedServices(season, submittedMessage), [season, submittedMessage]);

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Phase 1 is immediate (checkmark animation)
    const t1 = setTimeout(() => setPhase(1), 100);
    // Phase 2: timeline
    const t2 = setTimeout(() => setPhase(2), 1500);
    // Phase 3: upsell
    const t3 = setTimeout(() => setPhase(3), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="relative overflow-hidden" style={{ background: theme.dialogBg }}>
      {/* Radial glow backdrop */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${theme.glowColor}, transparent)` }}
      />

      <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10">
        {/* ── Phase 1: The Moment ── */}
        <div className="text-center mb-8">
          {/* Checkmark */}
          <div className="relative mx-auto w-20 h-20 mb-5">
            {/* Glow orb */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full blur-2xl"
              style={{ background: `radial-gradient(circle, rgba(${theme.accentRgb}, 0.5), transparent)` }}
            />
            {/* Checkmark circle */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.1 }}
              className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${theme.checkGradient} flex items-center justify-center shadow-lg`}
              style={{ boxShadow: `0 0 40px ${theme.glowColor}` }}
            >
              <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={2.5} />
            </motion.div>
            <ParticleBurst color={theme.accentSolid} />
          </div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight"
          >
            You&apos;re In Good Hands
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="text-white/50 text-sm sm:text-base max-w-md mx-auto leading-relaxed"
          >
            We&apos;ll have your personalized quote ready within 24 hours — usually same day.
          </motion.p>
        </div>

        {/* ── Phase 2: The Promise ── */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-8"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/30 text-center mb-4">
                What Happens Next
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <TimelineStep
                  icon={Clock}
                  time="Within 2 Hours"
                  description="Our team reviews your property details"
                  theme={theme}
                  index={0}
                />
                <TimelineStep
                  icon={Phone}
                  time="Same Day"
                  description="We call to confirm scope and schedule"
                  theme={theme}
                  index={1}
                />
                <TimelineStep
                  icon={Sparkles}
                  time="Your Quote"
                  description="Custom pricing sent to your inbox"
                  theme={theme}
                  index={2}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Phase 3: The Upsell ── */}
        <AnimatePresence>
          {phase >= 3 && services.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/30 text-center mb-4">
                Popular With Your Neighbors
              </p>
              <div className="space-y-2.5">
                {services.map((service, i) => (
                  <ServiceCard
                    key={service.slug}
                    {...service}
                    theme={theme}
                    index={i}
                    onClose={onClose}
                  />
                ))}
              </div>
              {/* Social proof */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
                className="text-center text-white/25 text-xs mt-4"
              >
                {SITE_STATS.reviewCount} five-star reviews · {SITE_STATS.totalClients}+ Madison homes served
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/5"
        >
          <a
            href="tel:608-535-6057"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm bg-gradient-to-r ${theme.ctaGradient} transition-all duration-300 hover:scale-[1.02] shadow-lg`}
            style={{ boxShadow: `0 4px 20px ${theme.glowColor}` }}
          >
            <Phone className="h-4 w-4" />
            Call Now: (608) 535-6057
          </a>
          <button
            onClick={onClose}
            className="text-sm text-white/40 hover:text-white/70 transition-colors py-2 px-4"
          >
            Close
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export function ConciergeConfirmation({ open, onClose, mode, submittedMessage }: ConciergeConfirmationProps) {
  if (mode === 'inline') {
    if (!open) return null;
    return <ConciergeConfirmationContent onClose={onClose} submittedMessage={submittedMessage} />;
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden border-0 bg-transparent">
        <ConciergeConfirmationContent onClose={onClose} submittedMessage={submittedMessage} />
      </DialogContent>
    </Dialog>
  );
}
```

**Step 2: Verify the file was created correctly**

Run: `cd tgyardcare && npx tsc --noEmit src/components/ConciergeConfirmation.tsx 2>&1 | head -20`

**Step 3: Commit**

```bash
cd tgyardcare && git add src/components/ConciergeConfirmation.tsx && git commit -m "feat: add ConciergeConfirmation component with staged animation phases"
```

---

## Task 2: Wire ConciergeConfirmation into ContactContent

**Files:**
- Modify: `src/app/contact/ContactContent.tsx`

**Step 1: Replace ServiceUpsellDialog import and usage**

In `ContactContent.tsx`:
- Remove line 24: `import { ServiceUpsellDialog } from "@/components/ServiceUpsellDialog";`
- Add: `import { ConciergeConfirmation } from "@/components/ConciergeConfirmation";`
- Replace line 613: `<ServiceUpsellDialog open={showUpsell} onOpenChange={setShowUpsell} selectedService={selectedService} />`
- With: `<ConciergeConfirmation open={showUpsell} onClose={() => setShowUpsell(false)} mode="dialog" submittedMessage={formData.message || selectedService?.message} />`

Note: We pass `formData.message` but since it's cleared on submit, also pass `selectedService?.message` as fallback for service-specific filtering.

Actually — the form clears `formData` before showing upsell. We need to capture the message before clearing. Modify the `handleSubmit` in `ContactContent.tsx`:

Change lines 196-197 from:
```typescript
setFormData({ name: "", email: "", phone: "", address: "", message: "" });
setShowUpsell(true);
```
To:
```typescript
setSubmittedMessage(formData.message || selectedService?.message || '');
setFormData({ name: "", email: "", phone: "", address: "", message: "" });
setShowUpsell(true);
```

Add state variable near line 159:
```typescript
const [submittedMessage, setSubmittedMessage] = useState('');
```

Update the ConciergeConfirmation usage to:
```tsx
<ConciergeConfirmation open={showUpsell} onClose={() => setShowUpsell(false)} mode="dialog" submittedMessage={submittedMessage} />
```

**Step 2: Run type check**

Run: `cd tgyardcare && npx tsc --noEmit 2>&1 | head -20`

**Step 3: Commit**

```bash
cd tgyardcare && git add src/app/contact/ContactContent.tsx && git commit -m "feat: wire ConciergeConfirmation into contact page"
```

---

## Task 3: Wire ConciergeConfirmation into QuickQuoteDialog

**Files:**
- Modify: `src/components/QuickQuoteDialog.tsx`

**Step 1: Replace inline success state with ConciergeConfirmation**

In `QuickQuoteDialog.tsx`:
- Add import: `import { ConciergeConfirmation } from '@/components/ConciergeConfirmation';`
- Replace the entire success state block (lines 261-332, the `<motion.div key="success" ...>` block) with:

```tsx
<motion.div
  key="success"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  <ConciergeConfirmation
    open={true}
    onClose={handleClose}
    mode="inline"
    submittedMessage={formData.message}
  />
</motion.div>
```

This replaces the simple checkmark + "You're All Set!" with the full cinematic concierge experience, rendered inline within the dialog.

**Step 2: Run type check**

Run: `cd tgyardcare && npx tsc --noEmit 2>&1 | head -20`

**Step 3: Commit**

```bash
cd tgyardcare && git add src/components/QuickQuoteDialog.tsx && git commit -m "feat: wire ConciergeConfirmation into QuickQuoteDialog"
```

---

## Task 4: Delete ServiceUpsellDialog

**Files:**
- Delete: `src/components/ServiceUpsellDialog.tsx`

**Step 1: Verify no other imports of ServiceUpsellDialog exist**

Run: `grep -r "ServiceUpsellDialog" tgyardcare/src/ --include="*.tsx" --include="*.ts" -l`

Expected: Only `ContactContent.tsx` (which we already updated in Task 2). If any other files reference it, update them first.

**Step 2: Delete the file**

Run: `rm tgyardcare/src/components/ServiceUpsellDialog.tsx`

**Step 3: Run type check to confirm no broken references**

Run: `cd tgyardcare && npx tsc --noEmit 2>&1 | head -20`

**Step 4: Commit**

```bash
cd tgyardcare && git add -u src/components/ServiceUpsellDialog.tsx && git commit -m "chore: remove ServiceUpsellDialog (replaced by ConciergeConfirmation)"
```

---

## Task 5: Build Verification

**Step 1: Run full build**

Run: `cd tgyardcare && npm run build 2>&1 | tail -30`

Expected: Build succeeds. Fix any errors before proceeding.

**Step 2: Commit any fixes**

If build fixes were needed, commit them.

---

## Task 6: Visual QA with Playwright

**Step 1: Start dev server**

Run: `cd tgyardcare && npm run dev` (background)

**Step 2: Screenshot the /contact page at 375px, 768px, 1440px**

Use Playwright MCP to:
1. Navigate to `http://localhost:3000/contact`
2. Fill in the form (name: "Test User", email: "test@test.com", phone: "608-555-1234", address: "123 Main St", message: "I need lawn mowing service")
3. Submit the form (or trigger `setShowUpsell(true)` via console if Edge Function is needed)
4. Screenshot the ConciergeConfirmation dialog at 375px, 768px, 1440px widths
5. Verify: checkmark animation renders, timeline shows 3 steps, upsell cards show seasonal services (not mowing since it was mentioned), social proof line visible, phone CTA visible

**Step 3: Push to remote**

```bash
cd tgyardcare && git push origin main
```
