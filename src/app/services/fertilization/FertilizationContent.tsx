'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ServiceSchema } from "@/components/ServiceSchema";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ProblemResolution } from "@/components/ProblemResolution";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Sprout, Phone, Calendar, Shield, Clock, ArrowRight } from "lucide-react";
import heroImage from "@/assets/service-fertilization.jpg";
import CTASection from '@/components/CTASection';
import ServiceFAQ from "@/components/ServiceFAQ";
import { fertilizationFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { AmbientParticles } from "@/components/AmbientParticles";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GlassCard } from "@/components/GlassCard";
import { TrustStrip } from "@/components/TrustStrip";
import { MOBILE_ORDER } from '@/components/mobile/MobileSectionOrder';
import { cn } from '@/lib/utils';

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function FertilizationContent() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#050d07' }}>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Fertilization', url: 'https://tgyardcare.com/services/fertilization' }
      ]} />
      <ScrollProgress variant="minimal" />
      <ServiceSchema
        serviceName="Fertilization & Overseeding Services in Madison & Dane County"
        description="Professional fertilization and overseeding to build thick, healthy lawns across Madison, Middleton, Waunakee, Sun Prairie, and all Dane County."
        serviceType="Fertilization"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Monona', 'Fitchburg', 'Verona', 'McFarland', 'DeForest', 'Cottage Grove', 'Oregon', 'Stoughton']}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides lawn fertilization and overseeding in Madison and Dane County, Wisconsin. Our 4-6 application programs follow Wisconsin growing cycles. Call (608) 535-6057 for a free lawn analysis.</p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Cinematic dark with particles
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center py-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional lawn fertilization service showing specialist applying fertilizer with spreader equipment to lush green grass"
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
                Lawn Fertilization in <span className="text-accent">Madison & Dane County</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
                Wisconsin&apos;s cool-season grasses need proper nutrition to thrive. Build a thick, healthy lawn that naturally crowds out weeds with professional fertilization across Madison, Middleton, Waunakee, and Sun Prairie.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button size="lg" className="text-base md:text-lg font-bold animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black" asChild>
                  <Link href="/contact?service=fertilization">Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
                <strong className="text-white">Ideal for:</strong> Homeowners with thin, pale, or struggling lawns. Perfect for those who want deep green color, thick turf that crowds out weeds, and a lawn that impresses the neighbors.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════
          PROBLEM / SOLUTION — Build understanding
      ════════════════════════════════════════════════════════════════════ */}
      <ResidentialProblemSection
        serviceName="Fertilization"
        problemPoints={[
          "Thin, pale grass signaling nutrient deficiency in your lawn",
          "Wisconsin's clay soils and harsh climate leaching nutrients fast",
          "Bare patches, weak roots, and susceptibility to disease from poor nutrition",
          "Store-bought fertilizers that burn lawns or deliver wrong nutrients at wrong times",
          "Weed invasion in thin lawns that can't crowd them out naturally"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Fertilization"
        solutionPoints={[
          "Professional-grade, slow-release fertilizers timed to Wisconsin's growing seasons",
          "Custom feeding program that gives your lawn exactly what it needs, when it needs it",
          "Overseeding service that fills bare spots and thickens thin turf",
          "Minimal environmental impact with maximum results through precise application",
          "Dramatic improvements in color, thickness, and overall lawn health"
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT'S INCLUDED — Visual checklist
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              What&apos;s Included in Our Fertilization Program
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              A complete nutrition program timed to Wisconsin&apos;s growing season&mdash;not a generic schedule.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
            {[
              { title: "Spring Fertilization", desc: "High-nitrogen formula for rapid green-up after Wisconsin's long winter" },
              { title: "Early Summer Feeding", desc: "Balanced nutrients to maintain color and strength through heat" },
              { title: "Fall Fertilization", desc: "Root-building formula that prepares your lawn for winter and drives spring green-up" },
              { title: "Overseeding (Optional)", desc: "Premium grass seed applied in optimal fall conditions for maximum germination" },
              { title: "Precise Application", desc: "Even coverage with professional spreader equipment\—no burns or missed spots" },
              { title: "Custom Recommendations", desc: "Watering, mowing, and care advice tailored to your specific lawn" }
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
          WHEN TO FERTILIZE — Seasonal timeline
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              When to Fertilize in Wisconsin
            </h2>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              <ScrollReveal delay={0.0}>
                <GlassCard hover="glow" className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Spring (April-May)</h3>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">
                    First application when grass starts growing. High-nitrogen formula promotes rapid green-up and early-season growth.
                  </p>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <GlassCard hover="glow" className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Summer (June-July)</h3>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Light feeding maintains color through heat stress. Lower nitrogen to avoid forcing growth during hot, dry periods.
                  </p>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <GlassCard variant="accent" hover="glow" className="h-full relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    Most Important
                  </div>
                  <div className="flex items-center gap-3 mb-4 mt-2">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Fall (Sept-Oct)</h3>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Root-building formula is the most important application. Builds root mass for winter survival and drives strong spring green-up.
                  </p>
                </GlassCard>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.3}>
              <p className="text-center text-white/60 max-w-2xl mx-auto">
                <strong className="text-white">Why fall matters most:</strong> Cool-season grasses like Kentucky bluegrass and fescue grow roots aggressively in fall. Proper nutrition now builds the foundation for a thick, healthy lawn next spring.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <CTASection
        title="Ready for a greener, thicker lawn?"
        description="Get a free, no-obligation quote. We'll have pricing to you within 24 hours."
        variant="compact"
      />

      {/* ═══════════════════════════════════════════════════════════════════
          PROGRAM OPTIONS — Choose your plan
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Choose Your Fertilization Program
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              Pick the program that matches your lawn&apos;s needs and your goals:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <ScrollReveal delay={0.0}>
              <GlassCard hover="lift" className="h-full">
                <h3 className="text-2xl font-bold text-white mb-4">Fertilization Only</h3>
                <p className="text-white/60 mb-6">
                  3-4 applications per year to maintain healthy, green grass. Best for established lawns that just need consistent nutrition.
                </p>
                <ul className="space-y-3 text-white/60 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Early spring high-nitrogen feeding</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Summer maintenance application</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Fall root-building fertilization</span>
                  </li>
                </ul>
                <p className="text-sm text-white/60 italic">Best for: Established, healthy lawns that need to stay that way</p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <GlassCard variant="accent" hover="glow" className="h-full relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Recommended
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 mt-2">Full Program</h3>
                <p className="text-white/60 mb-6">
                  Complete fertilization plus fall overseeding for maximum thickness, color, and weed resistance.
                </p>
                <ul className="space-y-3 text-white/60 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>All fertilization applications</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Professional overseeding</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Premium grass seed blend</span>
                  </li>
                </ul>
                <p className="text-sm text-white/60 italic">Best for: Thin or patchy lawns that need thickening</p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BENEFITS — Why professional fertilization
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              The Benefits of Professional Fertilization
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: Sprout,
                title: "Thick, Lush Growth",
                desc: "Proper nutrients create dense turf that naturally crowds out weeds and looks professionally maintained year-round."
              },
              {
                icon: Sprout,
                title: "Deep Green Color",
                desc: "Rich, consistent color that stays vibrant through the growing season\—without the burning and yellowing of DIY applications."
              },
              {
                icon: Shield,
                title: "Disease Resistance",
                desc: "Well-fed grass develops deep roots that resist drought, summer heat, winter stress, and common Wisconsin lawn diseases."
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <GlassCard hover="lift" accentBorder className="h-full text-center">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
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

      {/* ═══════════════════════════════════════════════════════════════════
          WHY CHOOSE US — Final trust
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Why Choose TotalGuard for Fertilization
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              Professional products and local timing knowledge make all the difference:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "Professional Products", desc: "Commercial-grade, slow-release fertilizers that feed your lawn over weeks\—not the quick-burn products from big box stores." },
              { icon: Calendar, title: "Wisconsin Timing", desc: "We schedule based on Dane County's actual growing conditions\—not a generic national calendar. Your lawn gets fed when it's actually growing." },
              { icon: Clock, title: "Reliable Service", desc: "We show up when scheduled and apply precisely. No missed applications, no burnt spots, no guesswork." },
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
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Fertilization Program Pricing</h2>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-5xl md:text-6xl font-bold text-primary">$300</span>
                  <span className="text-2xl text-white/60">&ndash;</span>
                  <span className="text-5xl md:text-6xl font-bold text-primary">$600</span>
                  <span className="text-white/60 text-lg ml-1">/season</span>
                </div>
                <p className="text-white/60 mb-6 leading-relaxed">
                  Programs are priced based on lawn size. Most Madison residential lawns (5,000-10,000 sq ft) include 3-4 applications. Add overseeding for $150-$300 depending on lawn condition. We measure and provide exact pricing before any work begins.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-white/60">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-primary" />
                    3-4 applications per season
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Overseeding available
                  </span>
                </div>
                <Button size="lg" className="font-bold text-lg" asChild>
                  <Link href="/contact?service=fertilization-program">Get Your Program Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
              Fertilization works best with these complementary services:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { href: "/services/aeration", title: "Aeration", desc: "Nutrients reach roots faster after aeration" },
              { href: "/services/herbicide", title: "Weed Control", desc: "Clear weeds so fertilizer feeds your grass, not weeds" },
              { href: "/services/mowing", title: "Weekly Mowing", desc: "Proper mowing height maximizes fertilizer benefits" },
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

      <ResidentialHomeownerTypesSection serviceName="fertilization" />
      <ResidentialExpectationsSection serviceName="fertilization" />

      <ServiceFAQ faqs={fertilizationFAQs} />

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
