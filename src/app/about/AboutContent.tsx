'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from '@/components/CTASection';
import { TrustStrip } from '@/components/TrustStrip';
import { GlassCard } from '@/components/GlassCard';
import { ScrollReveal } from '@/components/ScrollReveal';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { AmbientParticles } from '@/components/AmbientParticles';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import {
  Clock, CheckCircle2, Shield, Users, ArrowRight,
  Star, MapPin, CalendarDays, Home, Building2,
  Zap, Award, Phone, ChevronRight
} from "lucide-react";
import { AboutPageSchema } from '@/components/schemas/AboutPageSchema';
import { WebPageSchema } from '@/components/schemas/WebPageSchema';
import Link from "next/link";

// Seasonal color tokens
const seasonalAccent = {
  summer: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
  fall:   { text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/30',   glow: 'shadow-amber-500/20'   },
  winter: { text: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/30',    glow: 'shadow-cyan-500/20'    },
} as const;

const seasonalBg = {
  summer: {
    hero:    'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(16,185,129,0.15) 0%, transparent 70%), linear-gradient(to bottom, #050d07, #0a1a0e, #050d07)',
    page:    '#050d07',
    section: '#0a1a0e',
  },
  fall: {
    hero:    'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,158,11,0.15) 0%, transparent 70%), linear-gradient(to bottom, #0d0900, #1a1000, #0d0900)',
    page:    '#0d0900',
    section: '#1a1000',
  },
  winter: {
    hero:    'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6,182,212,0.15) 0%, transparent 70%), linear-gradient(to bottom, #020810, #060f1a, #020810)',
    page:    '#020810',
    section: '#060f1a',
  },
} as const;

// Company metrics
const metrics = [
  { value: 500, suffix: '+', label: 'Properties Served', icon: Home },
  { value: 4.9, suffix: '★', label: 'Google Rating', decimals: 1, icon: Star },
  { value: 12, suffix: '', label: 'Cities Covered', icon: MapPin },
  { value: 2023, suffix: '', label: 'Est.', icon: CalendarDays },
];

// TotalGuard Standard cards
const standards = [
  {
    icon: Clock,
    title: 'Response Time Commitment',
    body: 'Quote requests answered within 24 hours. Phone calls and texts returned the same business day. No exceptions, no excuses.',
  },
  {
    icon: Users,
    title: 'Crew Consistency',
    body: 'The same crew handles your property visit after visit. They know your preferences, your layout, and what "done right" looks like.',
  },
  {
    icon: CheckCircle2,
    title: 'Quality Control Protocol',
    body: 'Every job is walked before the crew leaves. Edges clean, beds clear, nothing missed. The standard: "Would we be proud to show this to anyone?"',
  },
  {
    icon: Shield,
    title: 'Make-It-Right Policy',
    body: 'If something is missed, send us a photo. We return within 48 hours to correct it. No charge, no friction, no defensiveness.',
  },
];

// Timeline milestones
const milestones = [
  { year: '2023', event: 'Founded in Madison', detail: 'Alex & Vance launch TotalGuard with a commitment to systems-first service.' },
  { year: '2024', event: 'Rapid growth', detail: 'Word-of-mouth drives rapid client growth. 4.9★ Google rating established early on.' },
  { year: '2024', event: 'Commercial expansion', detail: 'Added HOA, office park, and retail property maintenance to our service portfolio.' },
  { year: '2025', event: 'Dane County coverage', detail: 'Expanded to 12 cities — Madison, Middleton, Waunakee, Sun Prairie, and more.' },
  { year: '2025', event: '500+ properties', detail: 'Serving 500+ residential and commercial properties across the greater Madison area.' },
  { year: '2026+', event: 'The TotalGuard Standard', detail: 'Continuing to raise the bar for what reliable, systems-driven lawn care looks like in Wisconsin.' },
];

// Who we serve cards
const clientTypes = [
  {
    icon: Home,
    title: 'Residential Homeowners',
    description: 'Homeowners who value their time and want consistent, professional maintenance — without managing the process themselves.',
    link: '/residential',
    cta: 'Residential Services',
  },
  {
    icon: Building2,
    title: 'Commercial Properties',
    description: 'Property managers, HOAs, and business owners who need reliable, documented service across one or many properties.',
    link: '/commercial',
    cta: 'Commercial Services',
  },
];

export default function AboutContent() {
  const { activeSeason } = useSeasonalTheme();
  const acc = seasonalAccent[activeSeason];
  const bg = seasonalBg[activeSeason];

  return (
    <div className="min-h-screen text-white" style={{ background: bg.page }}>
      <AboutPageSchema />
      <WebPageSchema name="About TotalGuard Yard Care" description="Learn about Madison's most reliable yard care company" url="/about" type="AboutPage" />
      <Navigation showPromoBanner />

      {/* SEO hidden text */}
      <section className="sr-only">
        <h2>About TotalGuard Yard Care</h2>
        <p>TotalGuard Yard Care is a locally owned lawn care company serving Madison, Wisconsin and Dane County since 2023. We provide professional mowing, mulching, gutter cleaning, seasonal cleanups, fertilization, and snow removal with a 4.9-star Google rating and 100% satisfaction guarantee.</p>
      </section>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden py-28 md:py-40"
        style={{ background: bg.hero }}
      >
        <AmbientParticles density="sparse" className="absolute inset-0" />

        {/* Glow orbs */}
        <div className={`absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-10 ${acc.bg}`} />
        <div className={`absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-8 ${acc.bg}`} />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <ScrollReveal>
            <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-8 ${acc.bg} ${acc.border} border ${acc.text}`}>
              <Award className="h-4 w-4" />
              Madison&apos;s Reliability-First Lawn Care
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight mb-6">
              Built Different.{' '}
              <br />
              <span className={acc.text}>On Purpose.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-10">
              TotalGuard exists because most lawn care companies operate without systems—and Madison homeowners pay the price. We built a different kind of operation for Dane County.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-black text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${acc.text.replace('text-', 'bg-')} ${acc.glow} shadow-lg`}
                style={{ background: activeSeason === 'summer' ? '#10b981' : activeSeason === 'fall' ? '#f59e0b' : '#06b6d4' }}
              >
                Get a Free Quote <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white/80 border border-white/10 backdrop-blur-sm hover:border-white/20 hover:text-white transition-all duration-300"
              >
                View Services <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <TrustStrip variant="dark" />

      {/* ── METRICS ── */}
      <section className="py-20 md:py-28" style={{ background: bg.section }}>
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              By the Numbers
            </h2>
            <p className="text-white/60 text-lg">Three years of showing up, doing the work, and earning the rating.</p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((m, i) => {
              const Icon = m.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <GlassCard variant="dark" hover="glow" className="text-center p-8">
                    <Icon className={`h-8 w-8 mx-auto mb-4 ${acc.text}`} />
                    <div className={`text-4xl md:text-5xl font-black mb-1 ${acc.text}`}>
                      <AnimatedCounter
                        end={m.value}
                        suffix={m.suffix}
                        decimals={m.decimals ?? 0}
                        duration={2200}
                      />
                    </div>
                    <div className="text-white/50 text-sm font-medium uppercase tracking-wide">{m.label}</div>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY TOTALGUARD EXISTS ── */}
      <section className="py-20 md:py-28" style={{ background: bg.hero }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-4 ${acc.text}`}>
                Origin Story
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Why TotalGuard Exists
              </h2>
              <div className="space-y-5 text-white/60 text-lg leading-relaxed">
                <p>
                  Before starting TotalGuard, we worked with dozens of lawn care operations across Wisconsin. The pattern was consistent: crews running behind, owners unreachable, quotes taking weeks, customers left wondering if service would even show up.
                </p>
                <p>
                  These aren&apos;t bad companies. They&apos;re companies without systems. When demand increases, quality decreases. When the owner gets busy, communication stops.
                </p>
                <p>
                  TotalGuard was built to solve this. Reliability by design, not by luck.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <div className="space-y-4">
                {[
                  { icon: Zap, label: 'Crews running on schedule', desc: 'Route-optimized, time-committed' },
                  { icon: Phone, label: 'Owner reachable by phone', desc: 'Direct line, same-day response' },
                  { icon: CheckCircle2, label: 'Quotes within 24 hours', desc: 'No waiting, no chasing' },
                  { icon: Shield, label: 'Guaranteed to show up', desc: '100% satisfaction, make-it-right policy' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-4 p-4 rounded-xl ${acc.bg} border ${acc.border} transition-all duration-300 hover:border-opacity-60`}
                    >
                      <div className={`p-2 rounded-lg ${acc.bg}`}>
                        <Icon className={`h-5 w-5 ${acc.text}`} />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">{item.label}</div>
                        <div className="text-white/40 text-sm">{item.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── THE TOTALGUARD STANDARD ── */}
      <section className="py-20 md:py-28" style={{ background: bg.page }}>
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-14">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-4 ${acc.text}`}>
              Our Operating Philosophy
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              The TotalGuard Standard
            </h2>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">
              Not a marketing phrase. A documented set of commitments that govern every interaction.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {standards.map((s, i) => {
              const Icon = s.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <GlassCard variant="dark" hover="lift" accentBorder className="h-full">
                    <div className={`inline-flex p-3 rounded-xl ${acc.bg} mb-5`}>
                      <Icon className={`h-6 w-6 ${acc.text}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                    <p className="text-white/55 leading-relaxed">{s.body}</p>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-20 md:py-28" style={{ background: bg.section }}>
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-16">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-4 ${acc.text}`}>
              Company History
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Our Journey
            </h2>
            <p className="text-white/50 text-xl max-w-2xl mx-auto">
              Three years of building something Madison could depend on.
            </p>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto relative">
            {/* Vertical line */}
            <div className={`absolute left-8 top-0 bottom-0 w-px ${acc.border} border-l`} />

            <div className="space-y-8">
              {milestones.map((m, i) => (
                <ScrollReveal key={i} delay={i * 0.07}>
                  <div className="flex gap-8 items-start">
                    {/* Year badge */}
                    <div className={`relative flex-shrink-0 w-16 h-16 rounded-xl ${acc.bg} border ${acc.border} flex items-center justify-center z-10`}>
                      <span className={`text-xs font-black ${acc.text} text-center leading-tight`}>{m.year}</span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <h3 className="text-white font-bold text-lg mb-1">{m.event}</h3>
                      <p className="text-white/45 text-sm leading-relaxed">{m.detail}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section className="py-20 md:py-28" style={{ background: bg.hero }}>
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-14">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-4 ${acc.text}`}>
              Our Clients
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Who We Serve
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {clientTypes.map((c, i) => {
              const Icon = c.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <GlassCard variant="dark" hover="lift" className="h-full">
                    <div className={`inline-flex p-4 rounded-2xl ${acc.bg} border ${acc.border} mb-6`}>
                      <Icon className={`h-8 w-8 ${acc.text}`} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4">{c.title}</h3>
                    <p className="text-white/55 leading-relaxed mb-6">{c.description}</p>
                    <Link
                      href={c.link}
                      className={`inline-flex items-center gap-2 font-semibold ${acc.text} hover:underline transition-all`}
                    >
                      {c.cta} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW WE OPERATE ── */}
      <section className="py-20 md:py-28" style={{ background: bg.page }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-4 ${acc.text}`}>
                Operations
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                How We Operate Across Dane County
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { title: 'Owner-Operated', body: 'Alex and Vance are directly involved in quoting, scheduling, and quality oversight, not managing from a distance.' },
                { title: 'Focused Service Area', body: 'Madison and surrounding Dane County communities. Tighter geography = faster response, more predictable scheduling.' },
                { title: 'Transparent Pricing', body: 'You\'ll know exactly what a service costs before we begin. The invoice will match the quote. No surprises.' },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <GlassCard variant="dark" hover="glow" className="h-full">
                    <h3 className={`font-black text-lg mb-3 ${acc.text}`}>{item.title}</h3>
                    <p className="text-white/55 leading-relaxed text-sm">{item.body}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.2}>
              <GlassCard variant="dark" hover="none" className={`border-l-4 ${acc.border.replace('border-', 'border-l-')}`}>
                <blockquote className="text-white/70 text-lg leading-relaxed italic">
                  &ldquo;When you work with TotalGuard, you&apos;re not hiring a vendor. You&apos;re establishing a property care partner who operates with the same standards whether you&apos;re watching or not.&rdquo;
                </blockquote>
                <div className={`mt-4 font-bold ${acc.text}`}>- Alex & Vance, Founders</div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer showCloser={false} />
    </div>
  );
}
