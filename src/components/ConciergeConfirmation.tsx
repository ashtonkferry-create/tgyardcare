'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Clock,
  Phone,
  Sparkles,
  Flower2,
  Scissors,
  Sprout,
  Layers,
  Flower,
  Wind,
  ShieldCheck,
  Leaf,
  TreePine,
  Droplets,
  Shield,
  TreeDeciduous,
  Snowflake,
  Check,
  ArrowRight,
  Star,
  type LucideIcon,
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useSeasonalTheme, type Season } from '@/contexts/SeasonalThemeContext';
import { SITE_STATS } from '@/lib/seasonalConfig';
import { supabase } from '@/integrations/supabase/client';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ConciergeConfirmationProps {
  open: boolean;
  onClose: () => void;
  mode: 'dialog' | 'inline';
  submittedMessage?: string;
}

interface ServiceUpsellEntry {
  icon: LucideIcon;
  hook: string;
  slug: string;
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const SERVICE_UPSELL_DATA: Record<string, ServiceUpsellEntry> = {
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

const SEASONAL_PRIORITY: Record<string, string[]> = {
  spring: ['Spring Cleanup', 'Lawn Mowing', 'Fertilization', 'Mulching', 'Garden Beds', 'Aeration'],
  summer: ['Lawn Mowing', 'Fertilization', 'Herbicide Services', 'Weeding', 'Garden Beds', 'Bush Trimming'],
  fall: ['Fall Cleanup', 'Leaf Removal', 'Gutter Cleaning', 'Gutter Guards', 'Lawn Mowing', 'Aeration'],
  winter: ['Snow Removal', 'Gutter Guards', 'Gutter Cleaning', 'Lawn Mowing', 'Spring Cleanup', 'Fertilization'],
};

const BADGE_LABELS = (season: Season): string[] => {
  if (season === 'winter') return ['24/7 Response', 'Limited Spots', 'Early Bird'];
  return ['Peak Demand', 'Limited Spots', 'Early Bird'];
};

// ---------------------------------------------------------------------------
// Seasonal theme tokens
// ---------------------------------------------------------------------------

interface SeasonTokens {
  dialogBg: string;
  accentSolid: string;
  checkGradient: string;
  ctaGradient: string;
  ctaGradientCss: string;
  accentRgb: string;
  borderClass: string;
}

const SEASON_TOKENS: Record<Season, SeasonTokens> = {
  summer: {
    dialogBg: '#0a0f0a',
    accentSolid: '#10b981',
    checkGradient: 'from-emerald-400 to-green-600',
    ctaGradient: 'from-green-600 to-emerald-500',
    ctaGradientCss: 'linear-gradient(135deg, #16a34a, #10b981)',
    accentRgb: '16, 185, 129',
    borderClass: 'border-emerald-500/10',
  },
  fall: {
    dialogBg: '#0d0900',
    accentSolid: '#f59e0b',
    checkGradient: 'from-amber-400 to-orange-600',
    ctaGradient: 'from-amber-600 to-orange-500',
    ctaGradientCss: 'linear-gradient(135deg, #d97706, #f97316)',
    accentRgb: '245, 158, 11',
    borderClass: 'border-amber-500/10',
  },
  winter: {
    dialogBg: '#020810',
    accentSolid: '#06b6d4',
    checkGradient: 'from-cyan-300 to-blue-500',
    ctaGradient: 'from-blue-600 to-cyan-500',
    ctaGradientCss: 'linear-gradient(135deg, #2563eb, #06b6d4)',
    accentRgb: '6, 182, 212',
    borderClass: 'border-cyan-500/10',
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function messageContainsService(message: string, serviceName: string): boolean {
  const lower = message.toLowerCase();
  const terms = serviceName.toLowerCase().split(/\s+/);
  return terms.every((t) => lower.includes(t));
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ParticleBurst({ accentRgb }: { accentRgb: string }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const distance = 60 + Math.random() * 40;
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          size: 3 + Math.random() * 3,
          delay: Math.random() * 0.2,
        };
      }),
    [],
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: '50%',
            top: '50%',
            backgroundColor: `rgba(${accentRgb}, 0.8)`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 + p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

function AnimatedCheckmark({ tokens }: { tokens: SeasonTokens }) {
  return (
    <motion.div
      className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
    >
      <div
        className={`w-full h-full rounded-full bg-gradient-to-br ${tokens.checkGradient} flex items-center justify-center shadow-lg`}
        style={{ boxShadow: `0 0 40px rgba(${tokens.accentRgb}, 0.35)` }}
      >
        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Check className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={3} />
        </motion.div>
      </div>
      <ParticleBurst accentRgb={tokens.accentRgb} />
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Timeline step data
// ---------------------------------------------------------------------------

const TIMELINE_STEPS = [
  { icon: Clock, label: 'Within 2 Hours', desc: 'Our team reviews your property details' },
  { icon: Phone, label: 'Same Day', desc: 'We call to confirm scope and schedule' },
  { icon: Sparkles, label: 'Your Quote', desc: 'Custom pricing sent to your inbox' },
];

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ConciergeConfirmation({
  open,
  onClose,
  mode,
  submittedMessage = '',
}: ConciergeConfirmationProps) {
  const { activeSeason } = useSeasonalTheme();
  const tokens = SEASON_TOKENS[activeSeason];
  const badges = BADGE_LABELS(activeSeason);

  // Phase progression
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!open) {
      setPhase(0);
      return;
    }
    setPhase(1);
    const t2 = setTimeout(() => setPhase(2), 1500);
    const t3 = setTimeout(() => setPhase(3), 3000);
    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [open]);

  // Seasonal upsell services — top 3 not mentioned in submitted message
  const upsellServices = useMemo(() => {
    // Map the display season to the priority key (summer covers spring too)
    const priorityKey = activeSeason === 'summer' ? 'summer' : activeSeason;
    const priority = SEASONAL_PRIORITY[priorityKey] ?? SEASONAL_PRIORITY['summer'];
    const filtered = priority.filter(
      (name) => !messageContainsService(submittedMessage, name),
    );
    return filtered.slice(0, 3).map((name) => ({
      name,
      ...SERVICE_UPSELL_DATA[name],
    }));
  }, [activeSeason, submittedMessage]);

  // Track upsell click
  const trackUpsellClick = useCallback(
    async (serviceName: string, slug: string) => {
      try {
        await supabase.from('upsell_clicks').insert({
          service_name: serviceName,
          service_slug: slug,
          season: activeSeason,
          source: 'concierge_confirmation',
          clicked_at: new Date().toISOString(),
        });
      } catch {
        // Non-critical — silently fail
      }
    },
    [activeSeason],
  );

  // Radial glow pulse animation
  const glowKeyframes = {
    boxShadow: [
      `0 0 80px 20px rgba(${tokens.accentRgb}, 0.08)`,
      `0 0 120px 40px rgba(${tokens.accentRgb}, 0.15)`,
      `0 0 80px 20px rgba(${tokens.accentRgb}, 0.08)`,
    ],
  };

  // The inner content, used in both dialog and inline modes
  const content = (
    <div
      className="relative overflow-y-auto overflow-x-hidden max-h-[90vh] sm:max-h-[85vh]"
      style={{ background: tokens.dialogBg }}
    >
      {/* Radial gradient background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={glowKeyframes}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: `radial-gradient(ellipse at center, rgba(${tokens.accentRgb}, 0.06) 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 px-5 py-8 sm:px-8 sm:py-10 space-y-8">
        {/* ---------------------------------------------------------- */}
        {/* Phase 1 — The Moment */}
        {/* ---------------------------------------------------------- */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              className="text-center space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatedCheckmark tokens={tokens} />

              <motion.h2
                className="text-2xl sm:text-3xl font-black text-white tracking-tight"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                You&rsquo;re In Good Hands
              </motion.h2>

              <motion.p
                className="text-white/50 text-sm sm:text-base max-w-md mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                We&rsquo;ll have your personalized quote ready within 24 hours
                &mdash; usually same day.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------------------------------------------------------- */}
        {/* Phase 2 — The Promise */}
        {/* ---------------------------------------------------------- */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[11px] uppercase tracking-widest text-white/30 text-center font-medium">
                What Happens Next
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TIMELINE_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.label}
                      className={`bg-white/[0.06] border ${tokens.borderClass} backdrop-blur-sm rounded-xl p-4 text-center space-y-2`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.12, duration: 0.4 }}
                    >
                      <div
                        className="mx-auto w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `rgba(${tokens.accentRgb}, 0.12)` }}
                      >
                        <Icon
                          className="w-4.5 h-4.5"
                          style={{ color: tokens.accentSolid }}
                        />
                      </div>
                      <p className="text-white font-semibold text-sm">
                        {step.label}
                      </p>
                      <p className="text-white/40 text-xs leading-relaxed">
                        {step.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------------------------------------------------------- */}
        {/* Phase 3 — The Upsell */}
        {/* ---------------------------------------------------------- */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[11px] uppercase tracking-widest text-white/30 text-center font-medium">
                Popular With Your Neighbors
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {upsellServices.map((svc, idx) => {
                  const Icon = svc.icon;
                  const badge = badges[idx];
                  return (
                    <motion.div
                      key={svc.slug}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.12, duration: 0.4 }}
                    >
                      <Link
                        href={`/services/${svc.slug}`}
                        onClick={() => trackUpsellClick(svc.name, svc.slug)}
                        className={`group block bg-white/[0.06] border ${tokens.borderClass} backdrop-blur-sm rounded-xl p-4 space-y-3 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.09] hover:shadow-lg`}
                        style={{
                          '--hover-shadow': `0 8px 24px rgba(${tokens.accentRgb}, 0.12)`,
                        } as React.CSSProperties}
                      >
                        <div className="flex items-start justify-between">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `rgba(${tokens.accentRgb}, 0.12)` }}
                          >
                            <Icon
                              className="w-4.5 h-4.5"
                              style={{ color: tokens.accentSolid }}
                            />
                          </div>
                          {badge && (
                            <span
                              className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: `rgba(${tokens.accentRgb}, 0.15)`,
                                color: tokens.accentSolid,
                              }}
                            >
                              {badge}
                            </span>
                          )}
                        </div>
                        <p className="text-white font-semibold text-sm">
                          {svc.name}
                        </p>
                        <p className="text-white/40 text-xs leading-relaxed">
                          {svc.hook}
                        </p>
                        <span
                          className="inline-flex items-center gap-1 text-xs font-medium transition-colors duration-200"
                          style={{ color: tokens.accentSolid }}
                        >
                          Learn More
                          <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social proof */}
              <motion.div
                className="flex items-center justify-center gap-1.5 pt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-white/30 text-xs">
                  {SITE_STATS.reviewCount} five-star reviews &middot;{' '}
                  {SITE_STATS.totalClients}+ Madison homes served
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------------------------------------------------------- */}
        {/* Bottom Bar */}
        {/* ---------------------------------------------------------- */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-3 pt-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <a
                href="tel:+16085356057"
                className="flex-1 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
                style={{
                  background: tokens.ctaGradientCss,
                  boxShadow: `0 0 20px rgba(${tokens.accentRgb}, 0.3)`,
                }}
              >
                <Phone className="w-4 h-4" />
                Call (608) 535-6057
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-medium text-white/50 transition-colors duration-200 hover:text-white/80 hover:bg-white/[0.04]"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  // -----------------------------------------------------------------------
  // Render: dialog vs inline
  // -----------------------------------------------------------------------

  if (mode === 'inline') {
    if (!open) return null;
    return (
      <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
        {content}
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        className="sm:max-w-2xl p-0 border-0 bg-transparent shadow-2xl rounded-2xl overflow-hidden"
        style={{ background: tokens.dialogBg }}
      >
        {/* Accessible title — visually hidden */}
        <DialogTitle className="sr-only">Quote Submitted</DialogTitle>
        {content}
      </DialogContent>
    </Dialog>
  );
}
