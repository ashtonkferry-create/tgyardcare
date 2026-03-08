'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { WebPageSchema } from "@/components/schemas/WebPageSchema";
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AmbientParticles } from "@/components/AmbientParticles";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { useRef } from 'react';
import {
  Phone, ArrowRight, CheckCircle2, Star, Quote,
  Layers, Landmark, Flame, Footprints, Blocks, Fence, Mountain,
  MapPin, Clock, Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
interface HardscapingService {
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  feature: string;
}

const services: HardscapingService[] = [
  { name: 'Paver Patios', tagline: 'The Outdoor Room', description: 'Custom-designed paver patios built on a proper base system — engineered to withstand Wisconsin\'s brutal freeze-thaw cycles for decades.', icon: Layers, feature: 'Most Popular' },
  { name: 'Flagstone', tagline: 'Natural Elegance', description: 'Visually striking natural stone surfaces for patios, walkways, and outdoor features that age beautifully with time.', icon: Landmark, feature: 'Premium' },
  { name: 'Retaining Walls', tagline: 'Structure & Beauty', description: 'Structural and decorative walls for slopes, terracing, and landscape definition — functional engineering meets design.', icon: Mountain, feature: 'Structural' },
  { name: 'Stone Edging', tagline: 'Clean Lines', description: 'Premium cobblestone, granite, and Belgian edger borders with geotextile base preparation that won\'t shift or heave.', icon: Fence, feature: 'Detail Work' },
  { name: 'Custom Firepits', tagline: 'Gather Around', description: 'Warm, inviting outdoor gathering spots crafted from durable stone and block — the centerpiece your backyard deserves.', icon: Flame, feature: 'Lifestyle' },
  { name: 'Stone Walkways', tagline: 'The Path Forward', description: 'Safe, attractive walkways blending natural beauty with practical design — every step on solid ground.', icon: Footprints, feature: 'Functional' },
  { name: 'Block Work', tagline: 'Solid Foundation', description: 'Durable block construction for driveways, borders, and decorative features that stand the test of time.', icon: Blocks, feature: 'Versatile' },
];

const processSteps = [
  { num: '01', title: 'Excavation', detail: 'Full dig to undisturbed subgrade, adjusted for Dane County clay-heavy soil.' },
  { num: '02', title: 'Geotextile', detail: 'Fabric layer for soil separation and long-term structural stability.' },
  { num: '03', title: 'Gravel Base', detail: '6-8" compacted Class V gravel, installed in lifts for maximum density.' },
  { num: '04', title: 'Bedding Sand', detail: '1-inch screeded bedding sand for precise leveling and support.' },
  { num: '05', title: 'Placement', detail: 'Paver placement with soldier course borders and edge restraint.' },
  { num: '06', title: 'Polymeric Sand', detail: 'Joint fill for weed prevention, erosion control, and a clean finish.' },
];

const testimonials = [
  { name: 'Ray', text: 'I had them put in a paver patio for me and love the final product. Exactly what I envisioned.' },
  { name: 'Morgan R.', text: 'These guys did a great job with my new paver patio. Professional from start to finish.' },
  { name: 'Ed B.', text: 'The team was kind enough to work around the weather and completed work efficiently.' },
  { name: 'Charlie D.', text: 'They did a wonderful job and were very communicative throughout the entire project.' },
  { name: 'Chaz V.', text: 'Made sure I had the exact design I wanted. Couldn\'t be happier with the results.' },
];

// Seasonal accent mapping
const seasonAccent = {
  summer: {
    text: 'text-emerald-400', dim: 'text-emerald-400/60', bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20', glow: 'rgba(34,197,94,0.08)',
    gradient: 'from-emerald-500/20 via-transparent to-transparent',
    line: 'bg-emerald-500', lineDim: 'bg-emerald-500/20',
  },
  fall: {
    text: 'text-amber-400', dim: 'text-amber-400/60', bg: 'bg-amber-500/10',
    border: 'border-amber-500/20', glow: 'rgba(245,158,11,0.08)',
    gradient: 'from-amber-500/20 via-transparent to-transparent',
    line: 'bg-amber-500', lineDim: 'bg-amber-500/20',
  },
  winter: {
    text: 'text-cyan-400', dim: 'text-cyan-400/60', bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20', glow: 'rgba(56,189,248,0.08)',
    gradient: 'from-cyan-500/20 via-transparent to-transparent',
    line: 'bg-cyan-500', lineDim: 'bg-cyan-500/20',
  },
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function HardscapingContent() {
  const { activeSeason } = useSeasonalTheme();
  const acc = seasonAccent[activeSeason] ?? seasonAccent.summer;
  const { ref: ctaRef, isInView: ctaInView } = useScrollReveal();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#040806' }}>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Hardscaping', url: 'https://tgyardcare.com/services/hardscaping' },
      ]} />
      <ScrollProgress variant="minimal" />
      <WebPageSchema
        name="Professional Hardscaping Services"
        description="Professional hardscaping services in Madison and Dane County WI — paver patios, retaining walls, firepits, stone walkways and more."
        url="/services/hardscaping"
        type="Service"
      />

      {/* Service schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Hardscaping Services',
          description: 'Professional hardscaping including paver patios, retaining walls, firepits, stone walkways, flagstone installation, and block work in Madison and Dane County, Wisconsin.',
          provider: {
            '@type': 'LocalBusiness',
            name: 'TotalGuard Yard Care',
            telephone: '608-535-6057',
            url: 'https://tgyardcare.com',
          },
          areaServed: {
            '@type': 'State',
            name: 'Wisconsin',
            containsPlace: [
              { '@type': 'City', name: 'Madison' },
              { '@type': 'City', name: 'Middleton' },
              { '@type': 'City', name: 'Verona' },
              { '@type': 'City', name: 'Fitchburg' },
              { '@type': 'City', name: 'Monticello' },
              { '@type': 'City', name: 'Sun Prairie' },
            ],
          },
          serviceType: 'Hardscaping',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Hardscaping Services',
            itemListElement: services.map((svc, i) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: svc.name, description: svc.description },
              position: i + 1,
            })),
          },
        }) }}
      />

      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care offers professional hardscaping services in Madison, Middleton, Verona, and Dane County, Wisconsin. Services include paver patios, flagstone installations, retaining walls, custom firepits, stone walkways, garden edging, and block work. All hardscaping is built on a proper base system designed to withstand Wisconsin&apos;s freeze-thaw cycles. Request a free hardscape estimate at (608) 576-4220.</p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Full viewport, parallax, dramatic typography
      ════════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-end pb-12 md:pb-20 overflow-hidden">
        {/* Parallax background layers */}
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#080c0a] via-[#0a1210] to-[#060a08]" />
          {/* Stone-like texture grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.03) 60px, rgba(255,255,255,0.03) 61px),
                                repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.03) 60px, rgba(255,255,255,0.03) 61px)`,
            }}
          />
          {/* Diagonal accent line */}
          <div className={`absolute top-0 right-0 w-[1px] h-[200%] ${acc.lineDim} rotate-[25deg] origin-top-right`} />
          <div className={`absolute top-20 right-20 w-[1px] h-[200%] ${acc.lineDim} opacity-50 rotate-[25deg] origin-top-right`} />
        </motion.div>

        {/* Floating ambient glow */}
        <div
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-40"
          style={{ background: `radial-gradient(circle, ${acc.glow}, transparent 60%)` }}
        />
        <AmbientParticles density="sparse" />

        <motion.div
          className="container mx-auto px-4 relative z-10"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-5xl">
            {/* Overline */}
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <div className={`h-[1px] w-10 ${acc.line}`} />
                <span className={`text-[11px] font-semibold ${acc.text} tracking-[0.25em] uppercase`}>
                  Hardscaping in Madison, WI
                </span>
              </div>
            </ScrollReveal>

            {/* Main headline — scaled down for balance */}
            <ScrollReveal delay={0.1}>
              <h1 className="text-[clamp(2rem,5.5vw,4.5rem)] font-bold text-white leading-[0.95] tracking-tight mb-6">
                Stone that
                <br />
                <span className="relative inline-block">
                  <span className={`${acc.text}`}>outlasts</span>
                  <motion.div
                    className={`absolute -bottom-1 left-0 h-[2px] ${acc.line} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </span>
                {' '}winter.
              </h1>
            </ScrollReveal>

            {/* Subheadline */}
            <ScrollReveal delay={0.25}>
              <p className="text-sm md:text-base text-white/50 max-w-lg leading-relaxed mb-8 font-light">
                Paver patios, retaining walls, firepits, and walkways — engineered for
                Dane County clay and Wisconsin freeze-thaw. Built once, built right.
              </p>
            </ScrollReveal>

            {/* CTA row — compact */}
            <ScrollReveal delay={0.35}>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <Button
                  className="text-sm font-bold px-6 py-2.5 h-auto animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black rounded-lg shadow-lg shadow-amber-500/15 hover:shadow-xl hover:shadow-amber-500/25 hover:scale-[1.02] transition-all"
                  asChild
                >
                  <a href="tel:608-576-4220">
                    <Phone className="mr-2 h-4 w-4" />
                    (608) 576-4220
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="text-sm font-semibold border-white/20 text-white/80 hover:bg-white/5 hover:border-white/30 px-6 py-2.5 h-auto rounded-lg transition-all"
                  asChild
                >
                  <a href="mailto:ydexteriorvisions@gmail.com">
                    Request Estimate <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </ScrollReveal>

            {/* Stat strip */}
            <ScrollReveal delay={0.5}>
              <div className="flex items-center gap-6 mt-10 pt-6 border-t border-white/[0.06]">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl md:text-2xl font-bold text-white"><AnimatedCounter end={5} decimals={1} /></span>
                    <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  </div>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">Google Rating</span>
                </div>
                <div className={`w-px h-8 ${acc.lineDim}`} />
                <div>
                  <div className="text-xl md:text-2xl font-bold text-white">6</div>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">Step Process</span>
                </div>
                <div className={`w-px h-8 ${acc.lineDim}`} />
                <div className="hidden sm:block">
                  <div className="flex items-center gap-1.5">
                    <MapPin className={`h-3.5 w-3.5 ${acc.dim}`} />
                    <span className="text-xs text-white/60">Dane County, WI</span>
                  </div>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">Service Area</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SERVICES — Editorial alternating layout, not a grid
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 relative">
        <div className="container mx-auto px-4 relative z-10">
          {/* Section header — left-aligned, editorial */}
          <ScrollReveal>
            <div className="max-w-2xl mb-20 md:mb-28">
              <div className="flex items-center gap-3 mb-6">
                <div className={`h-[1px] w-12 ${acc.line}`} />
                <span className={`text-xs font-semibold ${acc.text} tracking-[0.3em] uppercase`}>What We Build</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight">
                Seven ways to transform your{' '}
                <span className="text-white/40">outdoor space.</span>
              </h2>
            </div>
          </ScrollReveal>

          {/* Service items — editorial alternating layout */}
          <div className="space-y-2 md:space-y-0">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              const isEven = i % 2 === 0;
              return (
                <ScrollReveal key={svc.name} delay={i * 0.05}>
                  <div className={`group relative py-8 md:py-10 border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-500 ${i === services.length - 1 ? 'border-b' : ''}`}>
                    <div className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-0 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                      {/* Number + Icon */}
                      <div className={`flex items-center gap-4 md:w-1/6 ${isEven ? '' : 'md:justify-end'}`}>
                        <span className="text-5xl md:text-6xl font-extralight text-white/[0.08] tabular-nums leading-none">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className={`p-3 ${acc.bg} rounded-xl border ${acc.border} group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`h-5 w-5 ${acc.text}`} />
                        </div>
                      </div>

                      {/* Name + tagline */}
                      <div className={`md:w-2/6 ${isEven ? 'md:pl-6' : 'md:pr-6 md:text-right'}`}>
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:translate-x-1 transition-transform duration-300">
                          {svc.name}
                        </h3>
                        <span className={`text-sm ${acc.dim} font-medium`}>{svc.tagline}</span>
                      </div>

                      {/* Description */}
                      <div className={`md:w-2/6 ${isEven ? 'md:pl-4' : 'md:pr-4 md:text-right'}`}>
                        <p className="text-sm text-white/50 leading-relaxed">{svc.description}</p>
                      </div>

                      {/* Badge */}
                      <div className={`md:w-1/6 ${isEven ? 'md:text-right' : ''}`}>
                        <span className={`inline-block text-[10px] font-bold uppercase tracking-[0.15em] ${acc.text} ${acc.bg} px-3 py-1.5 rounded-full border ${acc.border}`}>
                          {svc.feature}
                        </span>
                      </div>
                    </div>

                    {/* Hover glow line */}
                    <div className={`absolute bottom-0 left-0 h-[1px] ${acc.line} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} style={{ width: '100%' }} />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROCESS — Horizontal timeline with connecting line
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`h-[1px] w-12 ${acc.line}`} />
                  <span className={`text-xs font-semibold ${acc.text} tracking-[0.3em] uppercase`}>The Process</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                  Six layers between you{' '}
                  <span className="text-white/30">and the ground.</span>
                </h2>
              </div>
              <p className="text-sm text-white/40 max-w-xs leading-relaxed">
                Every project follows our proven installation method — no shortcuts, no compromises.
              </p>
            </div>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className={`hidden md:block absolute top-[28px] left-0 right-0 h-[1px] ${acc.lineDim}`} />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4">
              {processSteps.map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 0.1}>
                  <div className="group relative">
                    {/* Step dot */}
                    <div className="relative mb-6 flex items-center">
                      <div className={`w-14 h-14 rounded-full ${acc.bg} border-2 ${acc.border} flex items-center justify-center relative z-10 bg-[#040806] group-hover:scale-110 transition-transform duration-300`}>
                        <span className={`text-sm font-bold ${acc.text}`}>{step.num}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-base font-bold text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">
                      {step.title}
                    </h3>
                    <p className="text-xs text-white/40 leading-relaxed">{step.detail}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SOCIAL PROOF — Large rotating quote with supporting details
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${acc.gradient}`} style={{ opacity: 0.3 }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              {/* Giant quote mark */}
              <Quote className={`h-16 w-16 md:h-24 md:w-24 ${acc.text} opacity-20 mb-8`} />

              {/* Featured testimonial — dramatically large */}
              <blockquote className="text-2xl md:text-4xl lg:text-5xl font-light text-white leading-[1.3] tracking-tight mb-12">
                &ldquo;{testimonials[0].text}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4 mb-20">
                <div className={`w-12 h-12 rounded-full ${acc.bg} border ${acc.border} flex items-center justify-center`}>
                  <span className={`text-lg font-bold ${acc.text}`}>{testimonials[0].name[0]}</span>
                </div>
                <div>
                  <p className="text-base font-semibold text-white">{testimonials[0].name}</p>
                  <div className="flex gap-1 mt-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Supporting reviews — compact strip */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {testimonials.slice(1).map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.1}>
                <div className="group p-5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.05] transition-all duration-300">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3 w-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed mb-3 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <p className="text-xs font-semibold text-white/80">{t.name}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHY US — Horizontal split layout
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 relative">
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 max-w-6xl mx-auto">
            {/* Left — large statement */}
            <div className="lg:w-1/2 lg:sticky lg:top-32 lg:self-start">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`h-[1px] w-12 ${acc.line}`} />
                  <span className={`text-xs font-semibold ${acc.text} tracking-[0.3em] uppercase`}>Why Us</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                  Not all hardscaping is{' '}
                  <span className="text-white/30">created equal.</span>
                </h2>
                <p className="text-base text-white/50 leading-relaxed mb-8">
                  Wisconsin weather destroys shortcuts. Our partner builds every project
                  with the base system and materials to handle decades of freeze-thaw cycles.
                </p>
                <div className="flex items-center gap-3">
                  <Shield className={`h-5 w-5 ${acc.text}`} />
                  <span className="text-sm text-white/60">5.0 stars &middot; Nextdoor Favorite &middot; 100% Organic</span>
                </div>
              </ScrollReveal>
            </div>

            {/* Right — benefit items */}
            <div className="lg:w-1/2 space-y-4">
              {[
                { title: 'Wisconsin Climate Knowledge', desc: 'Deep understanding of Dane County clay soils, frost lines, and seasonal expansion that destroys inferior work.' },
                { title: 'Proper Base Engineering', desc: 'Full excavation, geotextile fabric, 6-8" compacted gravel — the layers you don\'t see are the ones that matter most.' },
                { title: '5.0-Star Track Record', desc: 'Every project completed to spec, on time, with clear communication from start to finish.' },
                { title: '100% Organic Practices', desc: 'Environmentally responsible methods and materials — better for your yard, your family, and the community.' },
                { title: 'Custom Design Collaboration', desc: 'Your vision, our expertise. Every project starts with understanding exactly what you want.' },
                { title: 'Free, No-Obligation Estimates', desc: 'Transparent quoting with no pressure. We earn your business on merit, not sales tactics.' },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.08}>
                  <div className="group p-5 md:p-6 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className={`h-5 w-5 ${acc.text} flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform`} />
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PARTNER ATTRIBUTION — Subtle, editorial
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-white/[0.06]" />
              <p className="text-sm text-white/30 text-center">
                Hardscaping by{' '}
                <a
                  href="https://ydexteriorvisions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${acc.dim} hover:${acc.text} hover:underline transition-colors font-medium`}
                >
                  YD Exterior Visions
                </a>
                {' '}&middot; Monticello, WI
              </p>
              <div className="h-px w-16 bg-white/[0.06]" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA — Full-bleed immersive
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#040806] via-[#0a1210] to-[#040806]" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[160px] pointer-events-none"
          style={{ background: `radial-gradient(circle, ${acc.glow}, transparent 50%)` }}
        />
        <AmbientParticles density="dense" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className={`h-[1px] w-12 ${acc.line}`} />
              <span className={`text-xs font-semibold ${acc.text} tracking-[0.3em] uppercase`}>Get Started</span>
              <div className={`h-[1px] w-12 ${acc.line}`} />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6">
              Your outdoor space,{' '}
              <span className="text-white/30">reimagined.</span>
            </h2>

            <p className="text-lg text-white/50 max-w-xl mx-auto leading-relaxed mb-10 font-light">
              Free estimates, custom designs, and craftsmanship that lasts.
              One call is all it takes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base md:text-lg font-bold px-10 py-6 h-auto animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black rounded-xl shadow-xl shadow-amber-500/20 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-[1.02] transition-all"
                asChild
              >
                <a href="tel:608-576-4220">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (608) 576-4220
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base md:text-lg font-semibold border-white/20 text-white/80 hover:bg-white/5 hover:border-white/30 px-10 py-6 h-auto rounded-xl transition-all"
                asChild
              >
                <a href="mailto:ydexteriorvisions@gmail.com">
                  Email for Estimate <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* Trust micro-strip */}
            <div className="flex flex-wrap justify-center gap-6 text-xs text-white/30">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className={`h-3.5 w-3.5 ${acc.dim}`} />
                Free estimates
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className={`h-3.5 w-3.5 ${acc.dim}`} />
                Mon-Fri 8am-6pm
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className={`h-3.5 w-3.5 ${acc.dim}`} />
                Madison & Dane County
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer showCloser={false} />
    </div>
  );
}
