'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { ServicePageSchemas } from "@/components/schemas/ServicePageSchemas";
import { WebPageSchema } from "@/components/schemas/WebPageSchema";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ProblemResolution } from "@/components/ProblemResolution";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Flower2, Phone, Users, Calendar, Shield, Clock, Home, ArrowRight } from "lucide-react";
import heroImage from "@/assets/service-mulching.jpg";
import gardenBedsImage from "@/assets/before-after/mulching-combined-2.png";
import CTASection from '@/components/CTASection';
import ServiceFAQ from "@/components/ServiceFAQ";
import { gardenBedsFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema";
import { AmbientParticles } from "@/components/AmbientParticles";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GlassCard } from "@/components/GlassCard";
import { TrustStrip } from "@/components/TrustStrip";
import { MOBILE_ORDER } from '@/components/mobile/MobileSectionOrder';
import { cn } from '@/lib/utils';

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function GardenBedsContent() {
  const beforeAfterItems = [
    {
      combinedImage: imgSrc(gardenBedsImage)
    }
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#050d07' }}>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Garden Beds', url: 'https://tgyardcare.com/services/garden-beds' }
      ]} />
      <ScrollProgress variant="minimal" />
      <ServicePageSchemas slug="garden-beds" faqs={gardenBedsFAQs} />
      <WebPageSchema name="Garden Bed Services" description="Professional garden bed services in Madison and Dane County WI" url="/services/garden-beds" />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides professional garden bed services in Madison, Middleton, Waunakee, and Dane County, Wisconsin. We offer design, edging, weeding, planting, and mulching for complete bed transformations. Maintenance plans available. Call (608) 535-6057 for a free consultation.</p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Cinematic dark with particles
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center py-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional garden bed makeover showing beautiful flower beds with colorful perennials, fresh mulch and decorative edging"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/50 to-[#0a1f14]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
        </div>
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                Starting at $100/visit
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
                Garden Bed Makeovers in <span className="text-accent">Madison & Dane County</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
                Transform tired, overgrown beds into stunning focal points that boost your home&apos;s curb appeal. Professional garden bed services across Madison, Middleton, Waunakee, and Sun Prairie.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button size="lg" className="text-base md:text-lg font-bold animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black" asChild>
                  <Link href="/contact?service=garden-beds">Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-base md:text-lg" asChild>
                  <a href="tel:608-535-6057">
                    <Phone className="mr-2 h-5 w-5" />
                    (608) 535-6057
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TRUST STRIP — Immediate credibility
      ════════════════════════════════════════════════════════════════════ */}
      <TrustStrip variant="dark" />

      {/* Who This Is For */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">Who Garden Bed Services Are For</h2>
              <p className="text-lg text-white/60 text-center mb-12">
                This service is designed for Dane County homeowners who want maximum curb appeal with minimal ongoing effort.
              </p>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { icon: Home, title: "Homeowners Selling Their Property", desc: "Fresh beds dramatically improve first impressions and listing photos" },
                { icon: Flower2, title: "Those With Neglected Landscaping", desc: "Overgrown, weedy beds dragging down an otherwise nice property" },
                { icon: Users, title: "New Homeowners", desc: "Inherited someone else's garden design and want a fresh start" },
                { icon: Shield, title: "Low-Maintenance Seekers", desc: "Want beautiful beds without constant weeding and upkeep" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.08}>
                    <GlassCard hover="lift" className="h-full">
                      <div className="flex items-start gap-4">
                        <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1 text-white">{item.title}</h3>
                          <p className="text-sm text-white/60">{item.desc}</p>
                        </div>
                      </div>
                    </GlassCard>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROBLEM / SOLUTION — Build understanding
      ════════════════════════════════════════════════════════════════════ */}
      <ResidentialProblemSection
        serviceName="Garden Bed Makeovers"
        problemPoints={[
          "Neglected garden beds dragging down your property's appearance",
          "Weedy, sparse beds with faded mulch making your home look shabby",
          "Dead plants and unclear borders ruining even a well-maintained lawn",
          "Overgrown shrubs obscuring your home's foundation",
          "Overwhelming DIY garden makeovers\—where do you even start?"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Garden Bed Makeovers"
        solutionPoints={[
          "Complete cleanup removing weeds, dead plants, and old mulch",
          "Redefined borders with fresh mulch for a polished base",
          "Soil amendment for healthier plant growth",
          "Low-maintenance perennial and shrub recommendations for your site",
          "Immediate impact and lasting beauty with minimal future maintenance"
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT'S INCLUDED — Visual checklist
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              What&apos;s Included in Garden Bed Makeovers
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
            {[
              { title: "Complete Weed Removal", desc: "Clear all weeds and unwanted vegetation down to the roots" },
              { title: "Bed Edging", desc: "Create or restore clean, defined bed lines that last" },
              { title: "Soil Preparation", desc: "Amend Dane County's clay soil for healthy plant growth" },
              { title: "Premium Mulch", desc: "Fresh mulch layer in your choice of color (brown, black, natural)" },
              { title: "Plant Trimming", desc: "Prune existing shrubs and perennials for healthy regrowth" },
              { title: "New Plantings (Optional)", desc: "Add flowers, shrubs, or decorative elements as needed" },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <GlassCard hover="lift" className="h-full">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HOW IT WORKS — Animated process timeline
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">How Garden Bed Makeovers Work</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

            {[
              { step: "1", title: "Free Consultation", desc: "We walk your property, assess bed conditions, and discuss your goals and budget." },
              { step: "2", title: "Custom Plan", desc: "We recommend the right approach\—basic refresh, complete makeover, or full redesign." },
              { step: "3", title: "Transformation", desc: "Our crew executes the plan\—clearing, edging, amending soil, mulching, and planting." },
              { step: "4", title: "Instant Impact", desc: "Walk out to beds that look professionally designed and boost your home's curb appeal." },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div className="text-center relative">
                  <div className="relative z-10 bg-white/[0.06] backdrop-blur-sm border-2 border-primary/20 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg hover:border-primary/50 hover:shadow-primary/10 hover:shadow-xl transition-all duration-300">
                    <span className="text-2xl font-bold text-primary">{item.step}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SERVICE OPTIONS — Choose your level
      ════════════════════════════════════════════════════════════════════ */}
      <section className={cn("py-14 md:py-20", MOBILE_ORDER.PRICING)} style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Choose Your Makeover Level
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            <ScrollReveal delay={0.0}>
              <GlassCard hover="lift" className="h-full">
                <h3 className="text-2xl font-bold text-white mb-3">Basic Refresh</h3>
                <p className="text-white/60 mb-6">
                  Perfect for beds that just need cleaning up and fresh mulch.
                </p>
                <ul className="space-y-2 text-white/60 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Weed removal</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Edge refreshing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Fresh mulch</span>
                  </li>
                </ul>
                <p className="text-sm text-white/60">Starting at $200/bed</p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <GlassCard variant="accent" hover="glow" className="h-full relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 mt-2">Complete Makeover</h3>
                <p className="text-white/60 mb-6">
                  Full renovation including soil prep and design improvements.
                </p>
                <ul className="space-y-2 text-white/60 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Everything in Basic</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Soil amendment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Redesign consultation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Plant trimming/removal</span>
                  </li>
                </ul>
                <p className="text-sm text-white/60">$400-$800/bed typical</p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <GlassCard hover="lift" className="h-full">
                <h3 className="text-2xl font-bold text-white mb-3">Full Redesign</h3>
                <p className="text-white/60 mb-6">
                  Complete transformation with new plants and features.
                </p>
                <ul className="space-y-2 text-white/60 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Everything in Complete</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">New plant installation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Decorative elements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Custom design</span>
                  </li>
                </ul>
                <p className="text-sm text-white/60">$800-$2,000+ depending on scope</p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BEFORE & AFTER — Dark cinematic gallery
      ════════════════════════════════════════════════════════════════════ */}
      <BeforeAfterGallery items={beforeAfterItems} />

      {/* Mid-page CTA */}
      <CTASection
        title="Ready for a garden bed transformation?"
        description="Get a free, no-obligation quote. We'll have pricing to you within 24 hours."
        variant="compact"
      />

      {/* ═══════════════════════════════════════════════════════════════════
          WISCONSIN CONTEXT — Local expertise
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Garden Beds Built for Wisconsin
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                title: "Zone 5a Plant Selection",
                desc: "We recommend perennials and shrubs proven to survive Dane County's harsh winters\—hostas, daylilies, hydrangeas, and ornamental grasses that thrive here."
              },
              {
                title: "Clay Soil Solutions",
                desc: "Madison's heavy clay drains poorly and compacts easily. We amend beds with organic matter to improve drainage and root development."
              },
              {
                title: "4-Season Interest",
                desc: "With only 150 growing days, we design beds for maximum seasonal impact\—spring bulbs, summer blooms, fall color, and winter structure."
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <GlassCard hover="lift" accentBorder className="text-center h-full">
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TIMING — When & How Often
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">When & How Often</h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6">
              <ScrollReveal delay={0.1}>
                <GlassCard hover="glow" className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Best Timing</h3>
                  </div>
                  <ul className="space-y-2.5 text-white/60">
                    <li>&bull; <strong className="text-white">Spring (April-May):</strong> Ideal for major makeovers and planting</li>
                    <li>&bull; <strong className="text-white">Early Summer (June):</strong> Good for refreshes before July heat</li>
                    <li>&bull; <strong className="text-white">Fall (Sept-Oct):</strong> Perfect for planting perennials and prep for winter</li>
                    <li>&bull; <strong className="text-white">Avoid:</strong> Mid-summer heat stress on new plants</li>
                  </ul>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <GlassCard hover="glow" className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Maintenance Frequency</h3>
                  </div>
                  <ul className="space-y-2.5 text-white/60">
                    <li>&bull; <strong className="text-white">Mulch refresh:</strong> Every 1-2 years</li>
                    <li>&bull; <strong className="text-white">Edge maintenance:</strong> Annually in spring</li>
                    <li>&bull; <strong className="text-white">Weed control:</strong> Monthly during growing season (or hire us!)</li>
                    <li>&bull; <strong className="text-white">Full makeover:</strong> Every 5-7 years as plants mature</li>
                  </ul>
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT MAKES US DIFFERENT — Final trust
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">What Makes TotalGuard Different</h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: "We Focus on Low Maintenance", desc: "Beautiful beds that don't require constant attention. We recommend plants that thrive with minimal care in Wisconsin conditions." },
                { title: "Honest Recommendations", desc: "We won't oversell. If your beds just need a refresh, we'll say so. If they need a complete overhaul, we'll explain why." },
                { title: "Complete Property Thinking", desc: "We consider how beds fit with your lawn, hardscapes, and home style. Not just isolated bed work\—cohesive property design." },
                { title: "Ongoing Care Available", desc: "Don't want to maintain your new beds? We offer weeding, mulch refreshes, and seasonal care to keep them looking great." },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <GlassCard hover="lift" accentBorder className="h-full">
                    <h3 className="font-semibold text-lg mb-3 text-white">{item.title}</h3>
                    <p className="text-white/60 leading-relaxed">{item.desc}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Resolution */}
      <ProblemResolution variant="full" />

      {/* Trust Strip — Repeated for reinforcement */}
      <TrustStrip variant="light" />

      {/* ═══════════════════════════════════════════════════════════════════
          RELATED SERVICES — Cross-sell
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">Pair With These Services</h2>
              <p className="text-white/60 mb-10">
                Complete your property transformation with these related services:
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { href: "/services/mulching", title: "Mulching", desc: "Complete the polished look" },
              { href: "/services/weeding", title: "Regular Weeding", desc: "Keep beds weed-free all season" },
              { href: "/services/pruning", title: "Shrub Pruning", desc: "Shape and maintain plants" },
              { href: "/services/mowing", title: "Lawn Mowing", desc: "Full property care" },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <Link href={item.href} className="block group">
                  <GlassCard hover="lift" className="text-center h-full">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-white/60">{item.desc}</p>
                    <span className="inline-flex items-center text-primary text-sm font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn More <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </span>
                  </GlassCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ResidentialHomeownerTypesSection serviceName="garden bed" />
      <ResidentialExpectationsSection serviceName="garden bed" />

      <ServiceFAQ faqs={gardenBedsFAQs} />

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
