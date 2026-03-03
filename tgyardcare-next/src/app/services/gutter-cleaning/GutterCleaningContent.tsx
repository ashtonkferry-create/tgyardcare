'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { ServiceSchema } from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Home, Phone, Calendar, Shield, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import heroImage from "@/assets/service-gutter.jpg";
import gutterCombined from "@/assets/before-after/gutter-cleaning-combined.png";
import gutterCombined1 from "@/assets/before-after/gutter-cleaning-combined-1.png";
import CTASection from '@/components/CTASection';
import ServiceFAQ from "@/components/ServiceFAQ";
import { gutterCleaningFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { AmbientParticles } from "@/components/AmbientParticles";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GlassCard } from "@/components/GlassCard";
import { TrustStrip } from "@/components/TrustStrip";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function GutterCleaningContent() {
  const beforeAfterItems = [
    { combinedImage: imgSrc(gutterCombined) },
    { combinedImage: imgSrc(gutterCombined1) }
  ];

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Gutter Cleaning', url: 'https://tgyardcare.com/services/gutter-cleaning' }
      ]} />
      <ServiceSchema
        serviceName="Professional Gutter Cleaning in Madison & Dane County"
        description="Safe, thorough gutter cleaning and maintenance to protect your home from water damage across Madison, Middleton, Waunakee, Sun Prairie, and all Dane County."
        serviceType="Gutter Cleaning"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Monona', 'Fitchburg', 'Verona', 'McFarland', 'DeForest', 'Cottage Grove', 'Oregon', 'Stoughton']}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides professional gutter cleaning in Madison, Middleton, and Dane County, Wisconsin. Every service includes debris removal, downspout flushing, and before/after photos. Call (608) 535-6057 for a free quote.</p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Cinematic dark with particles
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center py-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional gutter cleaning service showing technician safely cleaning gutters on residential home"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/50 to-[#0a1f14]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
        </div>
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                Starting at $75
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
                Gutter Cleaning in <span className="text-accent">Madison & Dane County</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
                Wisconsin winters create ice dams that destroy gutters and cause basement flooding&mdash;but only if they&apos;re clogged. Professional cleaning protects your home from expensive water damage.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button size="lg" className="text-base md:text-lg font-bold animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black" asChild>
                  <Link href="/contact?service=gutter-cleaning">Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
        <section className="py-6 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-base md:text-lg text-muted-foreground">
                <strong className="text-foreground">Ideal for:</strong> Homeowners who don&apos;t want to risk ladder falls, properties with mature trees, or anyone who values their safety and time. Essential before Wisconsin&apos;s winter freeze.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════
          PROBLEM / SOLUTION — Build understanding
      ════════════════════════════════════════════════════════════════════ */}
      <ResidentialProblemSection
        serviceName="Gutter Cleaning"
        problemPoints={[
          "Clogged gutters causing basement flooding, foundation cracks, and landscape erosion",
          "Overflowing water cascading down your foundation causing thousands in damage",
          "Winter ice dams forming in clogged gutters and tearing them off your home",
          "Dangerous ladder climbing that sends thousands to the ER annually",
          "Siding damage and roof shingle problems from neglected gutters"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Gutter Cleaning"
        solutionPoints={[
          "Safe, professional gutter cleaning using proper equipment and safety protocols",
          "Complete removal of all leaves, debris, and buildup from your gutter system",
          "Downspout flushing to ensure proper drainage away from your foundation",
          "Damage inspection with alerts about issues before they become expensive repairs",
          "Photo documentation for your records showing before/after results"
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT'S INCLUDED — Visual checklist
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              What&apos;s Included in Our Gutter Cleaning
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Complete service with no hidden charges&mdash;exactly what you need to protect your home.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {[
              { title: "Complete Debris Removal", desc: "Remove all leaves, twigs, shingle grit, and organic buildup from gutters" },
              { title: "Downspout Flushing", desc: "Water test all downspouts to ensure they flow freely and drain properly" },
              { title: "Professional Safety", desc: "Proper ladders, harnesses, and equipment\u2014no unnecessary risks" },
              { title: "Gutter Inspection", desc: "Check for leaks, sagging, loose hangers, and damage that needs attention" },
              { title: "Ground Cleanup", desc: "All debris bagged and removed from your property\u2014not dumped in your beds" },
              { title: "Photo Documentation", desc: "Before/after photos showing exactly what we found and fixed" }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <GlassCard hover="lift" className="h-full">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
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
          HOW IT WORKS — Animated process timeline
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              How Our Gutter Cleaning Works
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

            {[
              { step: "1", title: "Setup & Safety", desc: "We set up professional equipment and protect your landscaping" },
              { step: "2", title: "Clear All Debris", desc: "Hand-remove all leaves, muck, and buildup from every section" },
              { step: "3", title: "Flush Downspouts", desc: "Water test every downspout to confirm clear drainage" },
              { step: "4", title: "Inspect & Report", desc: "Check for damage and provide photos of completed work" },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div className="text-center relative">
                  <div className="relative z-10 bg-card/80 backdrop-blur-sm border-2 border-primary/20 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg hover:border-primary/50 hover:shadow-primary/10 hover:shadow-xl transition-all duration-300">
                    <span className="text-2xl font-bold text-primary">{item.step}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BEFORE & AFTER — Dark cinematic gallery
      ════════════════════════════════════════════════════════════════════ */}
      <BeforeAfterGallery items={beforeAfterItems} />

      {/* Mid-page CTA */}
      <CTASection
        title="Ready for professional gutter cleaning?"
        description="Get a free, no-obligation quote. We'll have pricing to you within 24 hours."
        variant="compact"
      />

      {/* ═══════════════════════════════════════════════════════════════════
          WHEN TO CLEAN — Seasonal knowledge
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              When to Clean Gutters in Wisconsin
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <ScrollReveal delay={0.1}>
              <GlassCard variant="accent" hover="glow" className="h-full relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Critical
                </div>
                <div className="flex items-center gap-3 mb-4 mt-2">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Fall (Late October-November)</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  After Madison&apos;s oak and maple trees finish dropping leaves but before the first freeze. This is the most important cleaning of the year&mdash;clogged gutters in winter lead to ice dams.
                </p>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Prevents ice dam formation
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Clears heavy leaf accumulation
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Protects foundation from snowmelt overflow
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
                  <h3 className="text-xl font-semibold text-foreground">Spring (April-May)</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  After pollen season and tree seeds (helicopters) finish falling. Clears winter debris and prepares for spring storms and heavy summer rain.
                </p>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Removes winter accumulation
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Clears pollen and seed pods
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Ready for spring storms
                  </li>
                </ul>
              </GlassCard>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.3}>
            <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
              <strong className="text-foreground">How often?</strong> Twice yearly (spring and fall) is standard. Properties with many trees may benefit from three cleanings.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BENEFITS — Wisconsin Context
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Why Gutter Cleaning Matters in Wisconsin
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              { icon: AlertTriangle, title: "Prevent Ice Dams", desc: "Dane County's freeze-thaw cycles create ice dams when clogged gutters trap water. These ice dams can tear gutters right off your home, damage shingles, and cause interior leaks that cost thousands to repair." },
              { icon: Home, title: "Foundation Protection", desc: "Wisconsin's heavy spring rains and snowmelt need somewhere to go. Clogged gutters overflow and dump water directly against your foundation, causing basement flooding, cracks, and structural damage." },
              { icon: Clock, title: "Extend Gutter Lifespan", desc: "Wet debris and standing water in Madison's humid summers cause rust and corrosion. Heavy debris loads make gutters sag and pull away from fascia. Regular cleaning extends gutter life by years." },
              { icon: Shield, title: "Skip the Ladder Risk", desc: "Wisconsin homeowners get hurt every year climbing ladders to clean gutters. We handle the dangerous work safely so you don't have to risk a fall on wet or icy rungs." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <GlassCard hover="lift" accentBorder className="h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
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
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto">
              <GlassCard variant="accent" hover="glow" className="text-center p-8 md:p-10">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Madison-Area Gutter Cleaning Prices</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
                  Most single-story homes in Madison, Middleton, Waunakee, and Sun Prairie range from <strong className="text-foreground">$100-$200</strong>. Two-story homes typically run <strong className="text-foreground">$150-$300</strong>. Price depends on linear feet of gutter, height, and debris level. We recommend cleaning twice yearly: spring (after pollen) and fall (after leaves).
                </p>
                <GlassCard className="mb-8 text-left">
                  <p className="font-semibold text-foreground mb-2">Seasonal Package Discount</p>
                  <p className="text-sm text-muted-foreground">
                    Schedule both spring and fall cleanings together and save 10% on your annual gutter maintenance.
                  </p>
                </GlassCard>
                <Button size="lg" className="font-bold text-lg" asChild>
                  <Link href="/contact?service=gutter-cleaning">Get Your Quote Today <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </GlassCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Trust Strip — Repeated for reinforcement */}
      <TrustStrip variant="light" />

      {/* ═══════════════════════════════════════════════════════════════════
          RELATED SERVICE — Cross-sell
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              Tired of Cleaning Gutters Twice a Year?
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Consider gutter guards&mdash;they reduce cleaning frequency by up to 90%:
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="max-w-md mx-auto">
              <Link href="/services/gutter-guards" className="block group">
                <GlassCard hover="lift" className="text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Gutter Guard Installation</h3>
                  <p className="text-muted-foreground">One-time investment that pays for itself in 3-5 years. Never climb a ladder again.</p>
                  <span className="inline-flex items-center text-primary text-sm font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn About Gutter Guards <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </GlassCard>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ResidentialHomeownerTypesSection serviceName="gutter cleaning" />
      <ResidentialExpectationsSection serviceName="gutter cleaning" />

      <ServiceFAQ faqs={gutterCleaningFAQs} />

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
