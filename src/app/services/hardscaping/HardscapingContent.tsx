'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { WebPageSchema } from "@/components/schemas/WebPageSchema";
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GlassCard } from "@/components/GlassCard";
import { TrustStrip } from "@/components/TrustStrip";
import { AmbientParticles } from "@/components/AmbientParticles";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import {
  Phone, ArrowRight, CheckCircle2, Star, Quote,
  Layers, Landmark, Flame, Footprints, Blocks, Fence, Mountain,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
interface HardscapingService {
  name: string;
  description: string;
  icon: LucideIcon;
}

const services: HardscapingService[] = [
  { name: 'Paver Patios & Pathways', description: 'Custom-designed paver patios built on a proper base system to withstand Wisconsin freeze-thaw cycles.', icon: Layers },
  { name: 'Flagstone Patios & Pathways', description: 'Strong, visually striking natural stone surfaces for patios, walkways, and outdoor features.', icon: Landmark },
  { name: 'Retaining Walls', description: 'Structural and decorative wall construction for slopes, terracing, and landscape definition.', icon: Mountain },
  { name: 'Stone Garden Edging', description: 'Premium cobblestone, granite, and Belgian edger borders with geotextile base preparation.', icon: Fence },
  { name: 'Custom Firepits', description: 'Warm, inviting outdoor gathering spots crafted from durable stone and block materials.', icon: Flame },
  { name: 'Stone Paths & Walkways', description: 'Natural beauty with practical design — safe, attractive walkways for any property.', icon: Footprints },
  { name: 'Block Work', description: 'Durable block construction for driveways, borders, and decorative garden features.', icon: Blocks },
];

const processSteps = [
  { step: 1, title: 'Full Excavation', description: 'Excavation to undisturbed subgrade, adjusted for Dane County clay-heavy soil conditions.' },
  { step: 2, title: 'Geotextile Fabric', description: 'Geotextile fabric layer installation for soil separation and long-term stability.' },
  { step: 3, title: 'Gravel Base', description: '6-8 inches of compacted Class V gravel base, installed in lifts for maximum density.' },
  { step: 4, title: 'Bedding Sand', description: '1-inch screeded bedding sand layer for precise leveling and paver support.' },
  { step: 5, title: 'Paver Placement', description: 'Professional paver placement with soldier course borders and edge restraint systems.' },
  { step: 6, title: 'Polymeric Sand', description: 'Polymeric sand joints for weed prevention, erosion control, and a clean finished look.' },
];

interface Testimonial {
  name: string;
  text: string;
}

const testimonials: Testimonial[] = [
  { name: 'Ray', text: 'I had them put in a paver patio for me and love the final product.' },
  { name: 'Morgan Ramsey', text: 'These guys did a great job with my new paver patio.' },
  { name: 'Ed Batchelor', text: 'The team was kind enough to work around the weather and completed work efficiently.' },
  { name: 'Charlie Duguanno', text: 'They did a wonderful job and were very communicative throughout the entire project.' },
  { name: 'Chaz Vanwormer', text: 'Made sure I had the exact design I wanted. Couldn\'t be happier with the results.' },
];

const trustBenefits = [
  'Deep knowledge of Wisconsin climate & soil',
  'Proper base prep for freeze-thaw durability',
  '5.0-star rated on Google',
  '100% organic practices',
  'Nextdoor Neighborhood Favorite',
  'Free estimates — no obligation',
];

// Seasonal accent mapping
const seasonAccent = {
  summer: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', glow: 'rgba(34,197,94,0.08)' },
  fall: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', glow: 'rgba(245,158,11,0.08)' },
  winter: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', glow: 'rgba(56,189,248,0.08)' },
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function HardscapingContent() {
  const { activeSeason } = useSeasonalTheme();
  const acc = seasonAccent[activeSeason] ?? seasonAccent.summer;
  const { ref: ctaRef, isInView: ctaInView } = useScrollReveal();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#050d07' }}>
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
              itemOffered: {
                '@type': 'Service',
                name: svc.name,
                description: svc.description,
              },
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
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f14] via-[#0d1a1f] to-[#0a1510]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,15,20,0.6)_100%)]" />
        </div>
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className={`inline-flex items-center ${acc.bg} backdrop-blur-sm border ${acc.border} ${acc.text} px-4 py-1.5 rounded-full text-sm font-medium mb-6`}>
                <Star className="h-3.5 w-3.5 mr-1.5" /> 5.0 Rated &middot; Free Estimates
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
                Professional Hardscaping in{' '}
                <span className={acc.text}>Madison & Dane County</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl leading-relaxed">
                Paver patios, retaining walls, firepits, and stone walkways — expertly built
                to last through Wisconsin&apos;s toughest winters.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-base md:text-lg font-bold px-6 md:px-8 py-3 md:py-4 h-auto animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black"
                  asChild
                >
                  <a href="tel:608-576-4220">
                    <Phone className="mr-2 h-5 w-5" />
                    (608) 576-4220
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base md:text-lg font-bold border-white/30 text-white hover:bg-white/10"
                  asChild
                >
                  <a href="mailto:ydexteriorvisions@gmail.com">
                    Request Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <TrustStrip variant="dark" />

      {/* ═══════════════════════════════════════════════════════════════════
          SERVICES GRID
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 relative">
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className={`text-sm font-medium ${acc.text} mb-3 tracking-wide uppercase`}>Our Hardscaping Services</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Built to Last Through Wisconsin Winters
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                From custom patios to retaining walls, every project is engineered with a proper base system
                designed for Dane County&apos;s clay-heavy soils and freeze-thaw cycles.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <ScrollReveal key={svc.name} delay={i * 0.08}>
                  <GlassCard hover="lift" className="h-full">
                    <div className={`p-2 ${acc.bg} rounded-lg w-fit mb-3`}>
                      <Icon className={`h-5 w-5 ${acc.text}`} />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{svc.name}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{svc.description}</p>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          INSTALLATION PROCESS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white/[0.02] relative">
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className={`text-sm font-medium ${acc.text} mb-3 tracking-wide uppercase`}>Our Process</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Professional Installation, Start to Finish
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Every hardscaping project follows a proven 6-step process that ensures structural
                integrity, proper drainage, and decades of durability.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.08}>
                <GlassCard variant="dark" hover="glow" className="h-full">
                  <div className="flex items-start gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${acc.bg} border ${acc.border} flex-shrink-0`}>
                      <span className={`text-sm font-bold ${acc.text}`}>{step.step}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">{step.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TRUST / BENEFITS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 relative">
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-10">
                <p className={`text-sm font-medium ${acc.text} mb-3 tracking-wide uppercase`}>Why Choose Us</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Wisconsin Hardscaping Experts
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {trustBenefits.map((benefit, i) => (
                <ScrollReveal key={benefit} delay={i * 0.06}>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.07] transition-colors">
                    <CheckCircle2 className={`h-5 w-5 ${acc.text} flex-shrink-0`} />
                    <span className="text-sm text-white/80 font-medium">{benefit}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white/[0.02] relative">
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className={`text-sm font-medium ${acc.text} mb-3 tracking-wide uppercase`}>What Customers Say</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                5.0-Star Rated Hardscaping
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.08}>
                <GlassCard hover="glow" className="h-full">
                  <Quote className={`h-5 w-5 ${acc.text} mb-3 opacity-60`} />
                  <p className="text-sm text-white/70 leading-relaxed mb-4 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full ${acc.bg} flex items-center justify-center`}>
                      <span className={`text-xs font-bold ${acc.text}`}>{t.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="h-3 w-3 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PARTNER ATTRIBUTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-sm text-white/40 leading-relaxed">
                Hardscaping services are provided by our trusted partner,{' '}
                <a
                  href="https://ydexteriorvisions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${acc.text} hover:underline font-medium`}
                >
                  YD Exterior Visions
                </a>
                {' '}— a locally-owned hardscaping specialist based in Monticello, WI,
                serving Madison and all of Dane County.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-[#080e0b]">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={ctaInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0f1a18] via-[#142420] to-[#0d1a15] border-2 border-white/[0.06] rounded-2xl p-8 md:p-12 text-center shadow-2xl max-w-4xl mx-auto">
              <AmbientParticles density="dense" />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                style={{ background: `radial-gradient(circle, ${acc.glow}, transparent 70%)` }}
              />

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 relative z-10">
                Ready to Transform Your Outdoor Space?
              </h2>
              <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto text-white/70 leading-relaxed relative z-10">
                Get a free hardscape estimate. Whether it&apos;s a paver patio, retaining wall, or custom firepit —
                we&apos;ll design and build it to last.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-white/60 relative z-10">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className={`h-4 w-4 ${acc.text}`} />
                  Free estimates
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className={`h-4 w-4 ${acc.text}`} />
                  Custom designs
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className={`h-4 w-4 ${acc.text}`} />
                  Built for Wisconsin weather
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base md:text-lg font-bold px-6 md:px-8 py-3 md:py-4 h-auto animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black"
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
                  className="w-full sm:w-auto text-base md:text-lg font-bold border-white/30 text-white hover:bg-white/10"
                  asChild
                >
                  <a href="mailto:ydexteriorvisions@gmail.com">
                    Email for Estimate <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer
        showCloser={false}
      />
    </div>
  );
}
