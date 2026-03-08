'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { WebPageSchema } from "@/components/schemas/WebPageSchema";
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GlassCard } from "@/components/GlassCard";
import { TrustStrip } from "@/components/TrustStrip";
import CTASection from "@/components/CTASection";
import { AmbientParticles } from "@/components/AmbientParticles";
import { ResidentialProblemSection, ResidentialSolutionSection } from "@/components/ResidentialSections";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import {
  Phone, ArrowRight, CheckCircle2, Star, Shield, Users, Zap,
  Layers, Landmark, Flame, Footprints, Blocks, Fence, Mountain,
  MapPin, Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const services: { name: string; tagline: string; desc: string; icon: LucideIcon }[] = [
  { name: 'Paver Patios', tagline: 'Most Popular', desc: 'Custom-designed paver patios built on a proper base system — engineered to withstand Wisconsin\'s brutal freeze-thaw cycles for decades.', icon: Layers },
  { name: 'Flagstone', tagline: 'Premium', desc: 'Visually striking natural stone surfaces for patios, walkways, and outdoor features that age beautifully with time.', icon: Landmark },
  { name: 'Retaining Walls', tagline: 'Structural', desc: 'Structural and decorative walls for slopes, terracing, and landscape definition — functional engineering meets design.', icon: Mountain },
  { name: 'Stone Edging', tagline: 'Detail Work', desc: 'Premium cobblestone, granite, and Belgian edger borders with geotextile base preparation that won\'t shift or heave.', icon: Fence },
  { name: 'Custom Firepits', tagline: 'Lifestyle', desc: 'Warm, inviting outdoor gathering spots crafted from durable stone and block — the centerpiece your backyard deserves.', icon: Flame },
  { name: 'Stone Walkways', tagline: 'Functional', desc: 'Safe, attractive walkways blending natural beauty with practical design — every step on solid ground.', icon: Footprints },
  { name: 'Block Work', tagline: 'Versatile', desc: 'Durable block construction for driveways, borders, and decorative features that stand the test of time.', icon: Blocks },
];

const processSteps = [
  { step: '1', title: 'Excavation', desc: 'Full dig to undisturbed subgrade, adjusted for Dane County clay-heavy soil.' },
  { step: '2', title: 'Geotextile Fabric', desc: 'Fabric layer for soil separation and long-term structural stability.' },
  { step: '3', title: 'Gravel Base', desc: '6-8" compacted Class V gravel, installed in lifts for maximum density.' },
  { step: '4', title: 'Bedding Sand', desc: '1-inch screeded bedding sand for precise leveling and support.' },
  { step: '5', title: 'Placement', desc: 'Paver placement with soldier course borders and edge restraint.' },
  { step: '6', title: 'Polymeric Sand', desc: 'Joint fill for weed prevention, erosion control, and a clean finish.' },
];

const testimonials = [
  { name: 'Ray', text: 'I had them put in a paver patio for me and love the final product. Exactly what I envisioned.' },
  { name: 'Morgan R.', text: 'These guys did a great job with my new paver patio. Professional from start to finish.' },
  { name: 'Ed B.', text: 'The team was kind enough to work around the weather and completed work efficiently.' },
  { name: 'Charlie D.', text: 'They did a wonderful job and were very communicative throughout the entire project.' },
  { name: 'Chaz V.', text: 'Made sure I had the exact design I wanted. Couldn\'t be happier with the results.' },
];

const faqs = [
  { q: 'How long does a paver patio installation take?', a: 'Most patio projects take 3-5 days from excavation to final polymeric sand depending on size and complexity.' },
  { q: 'Will my patio shift in Wisconsin winters?', a: 'Not with our 6-step base system. Proper excavation, geotextile, and 6-8" of compacted gravel prevents frost heave in Dane County clay soils.' },
  { q: 'Do you offer free estimates?', a: 'Yes — every project starts with a free, no-obligation consultation and written estimate. Call (608) 576-4220 or email to schedule.' },
  { q: 'What areas do you serve?', a: 'We serve Madison, Middleton, Verona, Fitchburg, Sun Prairie, Monticello, and surrounding Dane County communities.' },
];

function imgSrc(path: string) { return path; }

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function HardscapingContent() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#050d07' }}>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Hardscaping', url: 'https://tgyardcare.com/services/hardscaping' },
      ]} />
      <ScrollProgress variant="minimal" />
      <WebPageSchema
        name="Hardscaping Services in Madison WI"
        description="Professional hardscaping in Madison & Dane County — paver patios, retaining walls, firepits, stone walkways and more."
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
              itemOffered: { '@type': 'Service', name: svc.name, description: svc.desc },
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
          HERO — Matches standard service page pattern
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center py-16 md:py-24">
        {/* Background layers */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imgSrc('/images/gallery/paver-patio-1.jpg')})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/60 to-[#050d07]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
        <AmbientParticles density="sparse" />

        <div className="container mx-auto px-6 md:px-8 relative z-10 max-w-6xl">
          {/* Price-style badge */}
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-sm text-white/80 mb-6">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              5.0 Google Rating &middot; Free Estimates
            </div>
          </ScrollReveal>

          {/* H1 */}
          <ScrollReveal delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Hardscaping in{' '}
              <span className="text-primary">Madison &amp; Dane County</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed max-w-2xl">
              Paver patios, retaining walls, firepits, and walkways — engineered for
              Dane County clay and Wisconsin freeze-thaw. Built once, built right.
            </p>
          </ScrollReveal>

          {/* CTA row */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Button
                size="lg"
                className="font-bold text-lg px-8 py-4 h-auto animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black rounded-xl shadow-xl shadow-amber-500/20 hover:shadow-2xl hover:shadow-amber-500/30 transition-shadow"
                asChild
              >
                <a href="tel:608-576-4220">
                  Get Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-semibold text-base border-white/30 text-white hover:bg-white/10 px-6 py-4 h-auto rounded-xl transition-all"
                asChild
              >
                <a href="tel:608-576-4220">
                  <Phone className="mr-2 h-5 w-5" />
                  (608) 576-4220
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Trust Strip */}
      <TrustStrip variant="dark" />

      {/* Who This Is For */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <ScrollReveal>
            <p className="text-center text-white/70 text-base md:text-lg leading-relaxed">
              <strong className="text-white">Ideal for:</strong> Homeowners in Madison, Middleton, Verona, and Dane County who want
              durable, professionally installed hardscaping — patios, walls, walkways, and firepits —
              built to handle Wisconsin&apos;s extreme seasons.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Problem / Solution */}
      <ResidentialProblemSection
        serviceName="Hardscaping"
        problemPoints={[
          "DIY paver projects that shift, sink, or crack after the first winter freeze",
          "Contractors who skip the gravel base and lay pavers directly on dirt or sand",
          "Retaining walls that lean or collapse within a few years due to poor drainage",
          "Generic designs that don't account for Dane County's clay-heavy soil conditions",
          "Surprise costs mid-project because the initial quote didn't include proper base work"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Hardscaping"
        solutionPoints={[
          "6-step engineered base system: excavation, geotextile, gravel, bedding sand, pavers, polymeric sand",
          "Every project built for Wisconsin freeze-thaw with 6-8\" compacted Class V gravel",
          "Custom designs tailored to your property — patios, walls, walkways, firepits, edging, and block work",
          "Transparent, all-inclusive estimates with no hidden fees or mid-project surprises",
          "5.0-star track record with clear communication from consultation through completion"
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT'S INCLUDED — Service grid
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-6 md:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Our Hardscaping Services
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              Seven ways to transform your outdoor space — each built on a proper foundation.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <ScrollReveal key={svc.name} delay={i * 0.08}>
                  <GlassCard hover="lift" className="h-full">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full p-2 flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white">{svc.name}</h3>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary/70">{svc.tagline}</span>
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed">{svc.desc}</p>
                      </div>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HOW IT WORKS — 6-step process timeline
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6 md:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              The 6-Step Base System
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              Every project follows our proven installation method — no shortcuts, no compromises.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-5xl mx-auto relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-8 left-[8%] right-[8%] h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

            {processSteps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.1}>
                <div className="text-center relative">
                  <div className="relative z-10 bg-white/[0.06] backdrop-blur-sm border-2 border-primary/20 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg hover:border-primary/50 hover:shadow-primary/10 hover:shadow-xl transition-all duration-300">
                    <span className="text-2xl font-bold text-primary">{step.step}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2 text-sm">{step.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <CTASection
        title="Ready to transform your outdoor space?"
        description="Get a free, no-obligation hardscape estimate. Call or email — we respond within 24 hours."
        variant="compact"
      />

      {/* ═══════════════════════════════════════════════════════════════════
          REVIEWS — Social proof
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-6 md:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              What Customers Are Saying
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              5.0 stars across the board — real reviews from real hardscaping projects.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.08}>
                <GlassCard hover="lift" className="h-full">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed mb-4 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHY CHOOSE US — Differentiators
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6 md:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Why Choose Our Hardscaping Partner
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              Wisconsin weather destroys shortcuts. Every project is built with the base
              system and materials to handle decades of freeze-thaw cycles.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: 'Wisconsin Climate Experts', desc: 'Deep knowledge of Dane County clay soils, frost lines, and seasonal expansion. Every project is designed for our harsh conditions — not some generic template.' },
              { icon: Users, title: '5.0-Star Track Record', desc: 'Every project completed to spec, on time, with clear communication from consultation through final walkthrough. 100% organic practices.' },
              { icon: Zap, title: 'Proper Base Engineering', desc: 'Full excavation, geotextile fabric, 6-8" compacted gravel — the layers you don\'t see are the ones that matter most. No shortcuts, ever.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} delay={i * 0.12}>
                  <GlassCard hover="lift" className="text-center h-full">
                    <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-white/60 leading-relaxed">{item.desc}</p>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Strip — repeated */}
      <TrustStrip variant="light" />

      {/* ═══════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-6 md:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Hardscaping FAQ
            </h2>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <GlassCard hover="glow" className="h-full">
                  <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{faq.a}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PARTNER CONTACT — Direct to YD
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6 md:px-8">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Get Your Free Hardscape Estimate
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                Hardscaping services provided by our trusted partner,{' '}
                <a
                  href="https://ydexteriorvisions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  YD Exterior Visions
                </a>
                {' '}in Monticello, WI. Contact them directly for consultations and estimates.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button
                  size="lg"
                  className="w-full sm:w-auto font-bold text-lg px-8 py-4 h-auto animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black rounded-xl shadow-xl shadow-amber-500/20 hover:shadow-2xl hover:shadow-amber-500/30 transition-shadow"
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
                  className="w-full sm:w-auto font-semibold text-base border-white/20 text-white/80 hover:bg-white/5 hover:border-white/30 px-8 py-4 h-auto rounded-xl transition-all"
                  asChild
                >
                  <a href="mailto:ydexteriorvisions@gmail.com">
                    Email for Estimate <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Free estimates
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-primary" />
                  Mon–Fri 8am–6pm
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary" />
                  Madison &amp; Dane County
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer showCloser={false} />
    </div>
  );
}
