'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Scissors, Phone, Calendar, Shield, Clock, ArrowRight } from "lucide-react";
import { ServiceSchema } from "@/components/ServiceSchema";
import CTASection from '@/components/CTASection';
import ServiceFAQ from "@/components/ServiceFAQ";
import { pruningFAQs } from "@/data/serviceFAQs";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import pruningCombined from "@/assets/before-after/pruning-combined.png";
import pruningCombined2 from "@/assets/before-after/pruning-combined-2.png";
import heroImage from "@/assets/service-pruning.jpg";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { AmbientParticles } from "@/components/AmbientParticles";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GlassCard } from "@/components/GlassCard";
import { TrustStrip } from "@/components/TrustStrip";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function PruningContent() {
  const beforeAfterItems = [
    { combinedImage: imgSrc(pruningCombined) },
    { combinedImage: imgSrc(pruningCombined2) }
  ];

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Pruning', url: 'https://tgyardcare.com/services/pruning' }
      ]} />
      <ServiceSchema
        serviceName="Bush Trimming & Shrub Pruning Services"
        description="Professional bush trimming and shrub pruning to maintain healthy, attractive landscaping across Madison and Dane County."
        serviceType="Bush Trimming and Shrub Pruning"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Verona', 'Fitchburg', 'McFarland', 'Monona', 'Sun Prairie', 'DeForest', 'Oregon', 'Stoughton', 'Cottage Grove']}
      />
      <div className="min-h-screen bg-background">
        <Navigation />

        {/* TL;DR for AI/Answer Engines */}
        <section className="sr-only" aria-label="Service Summary">
          <p>TotalGuard Yard Care provides professional bush trimming and shrub pruning services in Madison, Middleton, Waunakee, and Dane County, Wisconsin. We shape and restore overgrown landscaping with debris removed. Before and after photos provided. Call (608) 535-6057 for a free quote.</p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            HERO — Cinematic dark with particles
        ════════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden py-16 md:py-24">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
            role="img"
            aria-label="Professional bush trimming and pruning service showing well-maintained shrubs in Madison Wisconsin"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/50 to-[#0a1f14]/85" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
          </div>
          <AmbientParticles density="sparse" />
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                Starting at $75
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6">
                Bush Trimming & Shrub Pruning in Madison
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl mb-6 md:mb-8 text-gray-200 leading-relaxed">
                Overgrown shrubs make even the nicest home look neglected. We restore your landscaping with expert trimming and shaping across Madison, Middleton, Waunakee, and Sun Prairie.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Button size="lg" asChild className="text-base md:text-lg font-bold animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black">
                  <Link href="/contact?service=pruning">Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base md:text-lg border-white/30 text-white hover:bg-white/10">
                  <a href="tel:608-535-6057">
                    <Phone className="mr-2 h-5 w-5" />
                    (608) 535-6057
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            TRUST STRIP — Immediate credibility
        ════════════════════════════════════════════════════════════════════ */}
        <TrustStrip variant="dark" />

        {/* Who This Is For — Quick qualifier */}
        <ScrollReveal>
          <section className="py-6 bg-muted/30 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-base md:text-lg text-muted-foreground">
                  <strong className="text-foreground">Ideal for:</strong> Homeowners with overgrown foundation plantings, out-of-control hedges, or shrubs that haven&apos;t been trimmed in years. Perfect for pre-sale property prep or seasonal maintenance.
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ═══════════════════════════════════════════════════════════════════
            PROBLEM / SOLUTION — Build understanding
        ════════════════════════════════════════════════════════════════════ */}
        <ResidentialProblemSection
          serviceName="Bush Trimming & Pruning"
          problemPoints={[
            "Overgrown bushes and shrubs hurting your home's curb appeal",
            "Untrimmed plants blocking windows, walkways, and natural light",
            "Pest and disease problems from neglected, dense landscaping",
            "Dead branches and weak growth making plants look shabby",
            "Foundation obscured by out-of-control shrub growth"
          ]}
        />
        <ResidentialSolutionSection
          serviceName="Bush Trimming & Pruning"
          solutionPoints={[
            "Expert shaping and sizing that restores your landscape's polished look",
            "Promotion of healthy growth, more flowering, and fuller plants",
            "Prevention of disease and pest issues through proper pruning",
            "Complete cleanup with all debris removed from your property",
            "Timing recommendations for optimal plant health year-round"
          ]}
        />

        {/* ═══════════════════════════════════════════════════════════════════
            WHAT'S INCLUDED — Visual checklist
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
                What&apos;s Included in Our Pruning Service
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Complete service from assessment to cleanup&mdash;no extra charges for debris removal.
              </p>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-4 md:gap-5">
              {[
                { title: "Professional Assessment", desc: "We evaluate each shrub's species, health, and optimal timing before cutting" },
                { title: "Precision Trimming", desc: "Sharp, sanitized tools for clean cuts that heal quickly and prevent disease" },
                { title: "Shape Restoration", desc: "Return overgrown shrubs to their natural or desired form" },
                { title: "Dead Wood Removal", desc: "Remove all dead, diseased, or damaged branches to promote health" },
                { title: "Size Control", desc: "Keep plants at appropriate heights for your landscape design" },
                { title: "Complete Cleanup", desc: "All trimmings bagged and removed\u2014property left spotless" }
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <GlassCard hover="lift" className="h-full">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            WHEN TO PRUNE — Seasonal knowledge
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
                When to Prune in Wisconsin
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              <ScrollReveal delay={0.1}>
                <GlassCard variant="accent" hover="glow" className="h-full relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Best Time
                  </div>
                  <div className="flex items-center gap-3 mb-4 mt-2">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Late Winter / Early Spring</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    February through early April&mdash;before new growth begins&mdash;is ideal for most shrubs in Dane County.
                    Plants are dormant, making it easier to see structure and shape.
                  </p>
                  <ul className="space-y-2.5 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Best for: Most deciduous shrubs
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Promotes vigorous spring growth
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Less stress on plants
                    </li>
                  </ul>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <GlassCard hover="glow" className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">After Flowering</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Spring-blooming shrubs (lilacs, forsythia, rhododendrons) should be pruned immediately after
                    flowering to avoid cutting off next year&apos;s buds.
                  </p>
                  <ul className="space-y-2.5 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Best for: Flowering shrubs
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Preserves next year&apos;s blooms
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Shapes without sacrificing flowers
                    </li>
                  </ul>
                </GlassCard>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.3}>
              <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
                <strong className="text-foreground">Not sure when your shrubs should be pruned?</strong> We&apos;ll assess your specific plants and recommend the optimal timing for each species in your landscape.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            BENEFITS — Professional pruning
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
                Benefits of Professional Pruning
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: "Enhanced Curb Appeal", desc: "Well-maintained shrubs instantly elevate your property's appearance and value" },
                { title: "Healthier Plants", desc: "Proper pruning improves air circulation and reduces disease and pest problems" },
                { title: "Better Flowering", desc: "Correct timing and technique leads to more blooms and fuller growth" },
                { title: "Controlled Growth", desc: "Keep plants at appropriate sizes without constant maintenance battles" },
                { title: "Safety & Access", desc: "Clear walkways, windows, and sight lines for safety and functionality" },
                { title: "Long-Term Savings", desc: "Regular maintenance prevents costly replacements and major restorations" }
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <GlassCard hover="lift" accentBorder className="h-full">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Before/After Gallery */}
        <BeforeAfterGallery items={beforeAfterItems} />

        {/* Mid-page CTA */}
        <CTASection
          title="Ready for professional pruning help?"
          description="Get a free, no-obligation quote. We'll have pricing to you within 24 hours."
          variant="compact"
        />

        {/* ═══════════════════════════════════════════════════════════════════
            WHY CHOOSE US — Final trust
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
                Why Madison Homeowners Trust TotalGuard
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                We&apos;re not the cheapest, but we&apos;re the most reliable. Here&apos;s what you can expect:
              </p>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { icon: Scissors, title: "Species Knowledge", desc: "We know which shrubs thrive in Wisconsin and how each species should be pruned for optimal health." },
                { icon: Shield, title: "Fully Insured", desc: "Complete liability coverage protects your property. You'll never worry about damage or accidents." },
                { icon: Clock, title: "On-Time Service", desc: "We show up when we say we will\u2014and finish the job completely before we leave." },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.12}>
                    <GlassCard hover="lift" className="text-center h-full">
                      <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </GlassCard>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PRICING — Cinematic pricing card
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <ScrollReveal>
              <div className="max-w-2xl mx-auto">
                <GlassCard variant="accent" hover="glow" className="text-center p-8 md:p-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                    Pruning Service Pricing
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                    Pricing depends on the number of shrubs, their size, current condition, and accessibility. Most Madison-area homes with 10-20 shrubs range from <strong className="text-foreground">$200-$500</strong> for complete pruning. We provide detailed, upfront estimates with no hidden fees.
                  </p>
                  <GlassCard className="mb-8 text-left">
                    <p className="font-semibold text-foreground mb-2">Maintenance Plans Available</p>
                    <p className="text-sm text-muted-foreground">
                      Book annual or semi-annual pruning and save. Consistent maintenance keeps shrubs healthy and costs predictable.
                    </p>
                  </GlassCard>
                  <Button size="lg" className="font-bold text-lg" asChild>
                    <Link href="/contact?service=pruning">Get Your Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                </GlassCard>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Trust Strip — Repeated for reinforcement */}
        <TrustStrip variant="light" />

        {/* ═══════════════════════════════════════════════════════════════════
            RELATED SERVICES — Cross-sell
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
                Complete Your Landscape Care
              </h2>
              <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
                Pruning pairs well with these services for a fully polished property:
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {[
                { href: "/services/mulching", title: "Mulching", desc: "Fresh mulch completes the polished look after pruning" },
                { href: "/services/weeding", title: "Weeding", desc: "Clear beds for a clean, professional appearance" },
                { href: "/services/garden-beds", title: "Garden Beds", desc: "Full bed renovation for a complete transformation" },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <Link href={item.href} className="block group">
                    <GlassCard hover="lift" className="text-center h-full">
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
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

        <ResidentialHomeownerTypesSection serviceName="bush trimming and pruning" />
        <ResidentialExpectationsSection serviceName="bush trimming and pruning" />

        <ServiceFAQ faqs={pruningFAQs} />
        <CTASection />

        <Footer showCloser={false} />
      </div>
    </>
  );
}
