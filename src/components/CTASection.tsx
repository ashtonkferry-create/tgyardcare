'use client';

import Link from "next/link";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { AmbientParticles } from '@/components/AmbientParticles';

const ctaTheme = {
  winter: {
    bg: 'from-slate-900 via-blue-950 to-indigo-950',
    border: 'border-cyan-500/10',
    glow: 'bg-cyan-500/5',
    headingClass: 'animate-frost-text-glow',
    checkColor: 'text-cyan-400',
    phoneBorderHover: 'hover:border-cyan-400/50',
    particleColors: ['bg-white/15'],
    particleAnim: 'animate-snow-fall',
    particleFilter: 'blur(0.5px) drop-shadow(0 0 3px rgba(147, 197, 253, 0.4))',
  },
  summer: {
    bg: 'from-[#0f2818] via-[#1a3a2a] to-[#0d3320]',
    border: 'border-green-500/15',
    glow: 'bg-green-500/5',
    headingClass: '',
    checkColor: 'text-green-400',
    phoneBorderHover: 'hover:border-green-400/50',
    particleColors: ['bg-green-400/20', 'bg-emerald-400/15', 'bg-green-300/25', 'bg-lime-400/10'],
    particleAnim: 'animate-float-particle',
    particleFilter: 'blur(0.5px) drop-shadow(0 0 3px rgba(34, 197, 94, 0.3))',
  },
  fall: {
    bg: 'from-stone-900 via-amber-950 to-stone-900',
    border: 'border-amber-500/10',
    glow: 'bg-amber-500/5',
    headingClass: '',
    checkColor: 'text-amber-400',
    phoneBorderHover: 'hover:border-amber-400/50',
    particleColors: ['bg-amber-400/20', 'bg-orange-400/15', 'bg-yellow-300/20'],
    particleAnim: 'animate-float-particle',
    particleFilter: 'blur(0.5px) drop-shadow(0 0 3px rgba(245, 158, 11, 0.3))',
  },
} as const;

interface CTASectionProps {
  title?: string;
  description?: string;
  variant?: "default" | "compact" | "final";
}

export default function CTASection({
  title = "Get Your Quote Today. We'll Respond by Tomorrow.",
  description = "Tell us what you need. We'll send a clear, no-obligation quote within 24 hours—usually faster.",
  variant = "default"
}: CTASectionProps) {
  const { ref: ctaRef, isInView } = useScrollReveal();
  const { activeSeason } = useSeasonalTheme();
  const ct = ctaTheme[activeSeason] ?? ctaTheme.summer;

  // Compact variant for mid-page CTAs
  if (variant === "compact") {
    return (
      <section className="py-10 md:py-12 bg-white/[0.04]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{title}</h3>
              <p className="text-white/70">{description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="w-full sm:w-auto font-bold bg-amber-500 hover:bg-amber-400 text-black" asChild>
                <Link href="/contact">
                  Get Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto font-bold" asChild>
                <a href="tel:608-535-6057">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Final CTA - season-adaptive with immersive styling
  return (
    <section className="py-14 md:py-20 bg-[#080e0b]">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className={`relative overflow-hidden bg-gradient-to-br ${ct.bg} border-2 ${ct.border} rounded-2xl p-8 md:p-12 text-center shadow-2xl max-w-4xl mx-auto`}>
            {/* Floating particles */}
            <AmbientParticles density="dense" />
            {/* Center glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 ${ct.glow} rounded-full blur-3xl pointer-events-none`} />

            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 ${ct.headingClass}`}>{title}</h2>
            <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto text-white/70 leading-relaxed">
              {description}
            </p>

            {/* Operational proof strip */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className={`h-4 w-4 ${ct.checkColor}`} />
                Quote within 24 hours
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className={`h-4 w-4 ${ct.checkColor}`} />
                Written scope, flat pricing
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className={`h-4 w-4 ${ct.checkColor}`} />
                Same crew assigned
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base md:text-lg font-bold px-6 md:px-8 py-3 md:py-4 h-auto animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black"
                asChild
              >
                <Link href="/contact">
                  Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`w-full sm:w-auto text-base md:text-lg font-bold border-white/30 text-white hover:bg-white/10 ${ct.phoneBorderHover}`}
                asChild
              >
                <a href="tel:608-535-6057">
                  <Phone className="mr-2 h-5 w-5" />
                  (608) 535-6057
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
