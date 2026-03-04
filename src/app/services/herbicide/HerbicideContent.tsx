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
import { CheckCircle2, Phone, ArrowRight, Shield, Leaf, Target, Calendar, Clock, AlertTriangle } from "lucide-react";
import heroImage from "@/assets/service-herbicide.jpg";
import herbicideCombined from "@/assets/before-after/herbicide-combined.png";
import CTASection from '@/components/CTASection';
import ServiceFAQ from "@/components/ServiceFAQ";
import { herbicideFAQs } from "@/data/serviceFAQs";
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

export default function HerbicideContent() {
  const beforeAfterItems = [
    { combinedImage: herbicideCombined }
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#050d07' }}>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Herbicide', url: 'https://tgyardcare.com/services/herbicide' }
      ]} />
      <ScrollProgress variant="minimal" />
      <ServicePageSchemas slug="herbicide" faqs={herbicideFAQs} />
      <WebPageSchema name="Herbicide Services" description="Professional weed control and herbicide services in Madison and Dane County WI" url="/services/herbicide" />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides weed control and herbicide treatments in Madison and Dane County, Wisconsin. Licensed applicators use safe pre-emergent and post-emergent options. Call (608) 535-6057 for a free quote.</p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Cinematic dark with particles
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center py-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional herbicide application service showing lawn care technician spraying weed control treatment on residential lawn"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/50 to-[#0a1f14]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
        </div>
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                Starting at $50/visit
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
                Weed Control in <span className="text-accent">Madison & Dane County</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
                Wisconsin&apos;s short summers mean weeds compete hard for your lawn. Professional herbicide treatments target weeds at the root while keeping your grass, family, and pets safe.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button size="lg" className="text-base md:text-lg font-bold animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black" asChild>
                  <Link href="/contact?service=herbicide">
                    Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
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

      {/* Who This Is For — Quick qualifier */}
      <ScrollReveal>
        <section className="py-6 border-b border-white/10" style={{ background: '#0a1a0e' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-base md:text-lg text-white/60">
                <strong className="text-white">Ideal for:</strong> Homeowners battling persistent weeds like dandelions, crabgrass, and clover. Perfect for lawns that need both elimination of existing weeds and prevention of new ones.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════
          PROBLEM / SOLUTION — Build understanding
      ════════════════════════════════════════════════════════════════════ */}
      <ResidentialProblemSection
        serviceName="Herbicide Treatment"
        problemPoints={[
          "Weeds spreading rapidly and taking over your lawn and garden beds",
          "Store-bought weed killers that don't work or burn your grass",
          "Dandelions, crabgrass, and clover ruining your lawn's appearance",
          "Weed regrowth every season despite your best DIY efforts",
          "Improper herbicide timing that wastes money and misses the problem"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Herbicide Treatment"
        solutionPoints={[
          "Professional-grade herbicides more effective than consumer products",
          "Pre-emergent treatments preventing weeds before they start",
          "Selective herbicides that target weeds while keeping grass healthy",
          "Expert timing for maximum effectiveness based on weed type",
          "Safe application protecting your family, pets, and environment"
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT'S INCLUDED — Visual checklist
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              What&apos;s Included in Our Weed Control Service
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              Complete weed management tailored to your lawn&apos;s specific needs.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
            {[
              { title: "Lawn Assessment", desc: "We identify your specific weed types and develop a targeted treatment plan" },
              { title: "Targeted Application", desc: "Professional sprayers ensure even coverage without waste or overspray" },
              { title: "Selective Herbicides", desc: "Products that kill weeds without harming your grass" },
              { title: "Pet & Family Safety", desc: "We advise on re-entry times and use products with strong safety profiles" },
              { title: "Follow-Up Check", desc: "We monitor results and retreat stubborn areas if needed" },
              { title: "Season-Long Program", desc: "Multiple applications timed to Wisconsin's weed cycles" }
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
          TREATMENT TYPES — Educational section
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Types of Herbicide Treatments
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              Different weeds require different approaches. We use the right treatment at the right time.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {[
              {
                icon: Target,
                title: "Pre-Emergent Treatments",
                desc: "Prevent weeds before they germinate. Applied in early spring before soil temperatures reach 55\°F in Madison\—typically late March to mid-April.",
                items: ["Crabgrass prevention", "Annual weed control", "Spring application timing", "Fall application for winter annuals"]
              },
              {
                icon: Leaf,
                title: "Post-Emergent Treatments",
                desc: "Eliminate weeds that are actively growing. Best applied when weeds are young and actively growing\—typically May through September in Wisconsin.",
                items: ["Broadleaf weed control", "Dandelion elimination", "Clover treatment", "Thistle and plantain removal"]
              },
              {
                icon: Shield,
                title: "Selective Herbicides",
                desc: "Target only weeds while leaving your grass unharmed. Professional-grade products work better and are safer than store-bought alternatives.",
                items: ["Grass-safe formulas", "Targeted application", "Minimal lawn impact", "Fast visible results"]
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.12}>
                  <GlassCard hover="lift" accentBorder className="h-full">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-white/60 mb-6 leading-relaxed">{item.desc}</p>
                    <ul className="space-y-3">
                      {item.items.map((listItem, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-white">{listItem}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TIMING — When to apply
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              When to Apply Herbicide in Wisconsin
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <ScrollReveal delay={0.1}>
              <GlassCard hover="glow" className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Treatment Calendar</h3>
                </div>
                <ul className="space-y-4 text-white/60">
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-white min-w-[80px]">March-April:</span>
                    <span>Pre-emergent for crabgrass prevention</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-white min-w-[80px]">May-June:</span>
                    <span>Post-emergent for spring broadleaf weeds</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-white min-w-[80px]">July-Aug:</span>
                    <span>Spot treatments for persistent weeds</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-white min-w-[80px]">Sept-Oct:</span>
                    <span>Fall broadleaf control (most effective!)</span>
                  </li>
                </ul>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <GlassCard hover="glow" className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Why Timing Matters</h3>
                </div>
                <p className="text-white/60 mb-4">
                  Herbicide effectiveness depends heavily on timing. Apply too early or too late and you waste money with poor results.
                </p>
                <ul className="space-y-2.5 text-sm text-white/60">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Pre-emergents must go down before weeds germinate
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Post-emergents work best on actively growing weeds
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Fall treatments target perennial weed roots
                  </li>
                </ul>
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
        title="Ready to reclaim your lawn from weeds?"
        description="Get a free, no-obligation quote. We'll have pricing to you within 24 hours."
        variant="compact"
      />

      {/* ═══════════════════════════════════════════════════════════════════
          COMMON WEEDS — Wisconsin-specific
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Common Wisconsin Weeds We Eliminate
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              Dane County&apos;s climate creates perfect conditions for these lawn invaders:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              "Dandelions",
              "Crabgrass",
              "Clover",
              "Creeping Charlie",
              "Thistle",
              "Plantain",
              "Chickweed",
              "Henbit",
              "Spurge"
            ].map((weed, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <GlassCard hover="lift" className="h-full">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span className="text-white font-medium">{weed}</span>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SAFETY — Family & pet focused
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Safe for Your Family & Pets
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              We take safety seriously. Here&apos;s how we protect what matters most:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "Licensed Application", desc: "Our technicians are certified and trained in proper herbicide handling and application techniques." },
              { icon: AlertTriangle, title: "Clear Re-Entry Times", desc: "We advise on exactly when it's safe for kids and pets to return to treated areas\—typically 2-4 hours after application dries." },
              { icon: Leaf, title: "Targeted Products", desc: "We use the minimum effective amount and target only problem areas rather than blanket spraying entire lawns." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.12}>
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

      {/* Problem Resolution */}
      <ProblemResolution variant="full" />

      {/* ═══════════════════════════════════════════════════════════════════
          PRICING — Clear, cinematic pricing card
      ════════════════════════════════════════════════════════════════════ */}
      <section className={cn("py-14 md:py-20", MOBILE_ORDER.PRICING)}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto">
              <GlassCard variant="accent" hover="glow" className="text-center p-8 md:p-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Weed Control Pricing</h2>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-5xl md:text-6xl font-bold text-primary">$75</span>
                  <span className="text-2xl text-white/60">&ndash;</span>
                  <span className="text-5xl md:text-6xl font-bold text-primary">$150</span>
                  <span className="text-white/60 text-lg ml-1">/application</span>
                </div>
                <p className="text-white/60 mb-6 leading-relaxed">
                  Pricing depends on lawn size, weed severity, and treatment type. Season-long programs (3-4 treatments) offer better results and value at $250-$400 for the full season.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-white/60">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-primary" />
                    Season-long programs available
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    $250-$400 full season
                  </span>
                </div>
                <Button size="lg" className="font-bold text-lg" asChild>
                  <Link href="/contact?service=herbicide">Get Your Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Complete Your Lawn Health Program
            </h2>
            <p className="text-center text-white/60 mb-10 max-w-2xl mx-auto">
              Weed control works best as part of a comprehensive lawn care approach:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { href: "/services/fertilization", title: "Fertilization", desc: "Thick grass naturally crowds out weeds" },
              { href: "/services/aeration", title: "Aeration", desc: "Healthier roots mean a stronger lawn" },
              { href: "/services/mowing", title: "Weekly Mowing", desc: "Proper mowing height suppresses weed growth" },
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

      <ResidentialHomeownerTypesSection serviceName="herbicide" />
      <ResidentialExpectationsSection serviceName="herbicide" />

      <ServiceFAQ faqs={herbicideFAQs} />

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
