'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { ServiceSchema } from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Shield, Phone, Calendar, DollarSign, Clock, ArrowRight } from "lucide-react";
import heroImage from "@/assets/service-gutter-guards.jpg";
import gutterGuardsImage from "@/assets/before-after/gutter-guards-combined.png";
import CTASection from '@/components/CTASection';
import ServiceFAQ from "@/components/ServiceFAQ";
import { gutterGuardsFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { AmbientParticles } from "@/components/AmbientParticles";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GlassCard } from "@/components/GlassCard";
import { TrustStrip } from "@/components/TrustStrip";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function GutterGuardsContent() {
  const beforeAfterItems = [
    { combinedImage: imgSrc(gutterGuardsImage) }
  ];

  return (
    <div className="min-h-screen" style={{ background: '#050d07' }}>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Gutter Guards', url: 'https://tgyardcare.com/services/gutter-guards' }
      ]} />
      <ServiceSchema
        serviceName="Gutter Guard Installation in Madison & Dane County"
        description="Professional gutter guard installation across Madison, Middleton, Waunakee, Sun Prairie, and all Dane County. Prevent clogs, ice dams, and eliminate gutter cleaning."
        serviceType="Gutter Guards"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Monona', 'Fitchburg', 'Verona', 'McFarland', 'DeForest', 'Cottage Grove', 'Oregon', 'Stoughton']}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides professional gutter guard installation in Madison, Middleton, Waunakee, and Dane County, Wisconsin. Micro-mesh guards prevent clogs and ice dams. Eliminate gutter cleaning. Warranty documentation included. Call (608) 535-6057 for a free quote.</p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Cinematic dark with particles
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center py-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional gutter guard installation showing close-up of mesh gutter protection system on residential home"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/50 to-[#0a1f14]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
        </div>
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                Starting at $300
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
                Gutter Guards in <span className="text-accent">Madison & Dane County</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
                Stop climbing ladders twice a year. Professional gutter guard installation keeps leaves and debris out permanently&mdash;protecting your home through Wisconsin&apos;s harshest weather.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button size="lg" className="text-base md:text-lg font-bold animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black" asChild>
                  <Link href="/contact?service=gutter-guards">Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
        <section className="py-6 border-b border-border" style={{ background: '#0a1a0e' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-base md:text-lg text-white/60">
                <strong className="text-white">Ideal for:</strong> Homeowners tired of semi-annual gutter cleaning, properties surrounded by mature trees, anyone concerned about ladder safety, and those who want permanent protection from ice dams and water damage.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════
          PROBLEM / SOLUTION — Build understanding
      ════════════════════════════════════════════════════════════════════ */}
      <ResidentialProblemSection
        serviceName="Gutter Guard Installation"
        problemPoints={[
          "Multiple expensive gutter cleanings required every year ($200-$400+ annually)",
          "Dangerous ladder climbing putting you at risk of injury",
          "Gutters clogging between service visits and overflowing during storms",
          "Madison's mature oak and maple trees dropping constant debris",
          "One heavy storm with clogged gutters causing thousands in water damage"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Gutter Guard Installation"
        solutionPoints={[
          "High-quality micro-mesh guards that block leaves, pine needles, and debris",
          "Water flows freely while handling Wisconsin's heaviest rainfall",
          "Professional installation ensuring perfect fit with your existing gutters",
          "Reduce cleaning frequency by 90% or more\u2014virtually maintenance-free",
          "One-time investment that pays for itself in 3-5 years of skipped cleanings"
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT'S INCLUDED — Visual checklist
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              What&apos;s Included in Our Installation
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              Complete installation from start to finish&mdash;including the cleaning your gutters need first.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
            {[
              { title: "Pre-Installation Cleaning", desc: "Complete gutter cleaning before guards go on\u2014ensures a clean start" },
              { title: "Premium Micro-Mesh Guards", desc: "Durable, weather-resistant guards that handle Wisconsin's climate" },
              { title: "Custom Fitting", desc: "Precisely measured and cut to fit your specific gutter system perfectly" },
              { title: "Secure Mounting", desc: "Professional attachment that withstands wind, snow loads, and ice" },
              { title: "Flow Testing", desc: "Water test after installation to verify proper drainage performance" },
              { title: "Workmanship Warranty", desc: "Our installation work is backed by warranty coverage" }
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
      <section className="py-14 md:py-20" style={{ background: '#050d07' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              How Gutter Guard Installation Works
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

            {[
              { step: "1", title: "Measure & Quote", desc: "We measure your gutters and provide exact pricing\u2014no surprises" },
              { step: "2", title: "Clean Gutters", desc: "Complete cleaning before installation for optimal performance" },
              { step: "3", title: "Install Guards", desc: "Custom fit and secure mounting on all gutter sections" },
              { step: "4", title: "Test & Verify", desc: "Water testing confirms proper flow before we leave" },
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
          BEFORE & AFTER — Dark cinematic gallery
      ════════════════════════════════════════════════════════════════════ */}
      <BeforeAfterGallery items={beforeAfterItems} />

      {/* Mid-page CTA */}
      <CTASection
        title="Ready to eliminate gutter cleaning forever?"
        description="Get a free, no-obligation quote. We'll have pricing to you within 24 hours."
        variant="compact"
      />

      {/* ═══════════════════════════════════════════════════════════════════
          ROI CALCULATOR — The Math
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#050d07' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              The Math: Why Gutter Guards Pay for Themselves
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              Compare the cost of ongoing cleaning vs. a one-time gutter guard investment:
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <ScrollReveal delay={0.1}>
              <GlassCard hover="glow" className="h-full">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-red-500" />
                  Without Gutter Guards
                </h3>
                <ul className="space-y-3 text-white/60 mb-6">
                  <li className="flex justify-between">
                    <span>Spring cleaning:</span>
                    <span className="font-semibold">$150-$250</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Fall cleaning:</span>
                    <span className="font-semibold">$150-$250</span>
                  </li>
                  <li className="flex justify-between border-t border-border pt-3 mt-3">
                    <span>Annual cost:</span>
                    <span className="font-semibold text-red-600">$300-$500/year</span>
                  </li>
                  <li className="flex justify-between">
                    <span>5-year cost:</span>
                    <span className="font-semibold text-red-600">$1,500-$2,500</span>
                  </li>
                </ul>
                <p className="text-sm text-white/60 italic">
                  Plus: Risk of ladder injury, property damage from clogs, stress of scheduling
                </p>
              </GlassCard>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <GlassCard variant="accent" hover="glow" className="h-full">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  With Gutter Guards
                </h3>
                <ul className="space-y-3 text-white/60 mb-6">
                  <li className="flex justify-between">
                    <span>One-time installation:</span>
                    <span className="font-semibold">$800-$2,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Occasional maintenance:</span>
                    <span className="font-semibold">$50-$75/year</span>
                  </li>
                  <li className="flex justify-between border-t border-border pt-3 mt-3">
                    <span>5-year total cost:</span>
                    <span className="font-semibold text-primary">$1,000-$2,400</span>
                  </li>
                  <li className="flex justify-between">
                    <span>10-year savings:</span>
                    <span className="font-semibold text-primary">$1,500-$3,000+</span>
                  </li>
                </ul>
                <p className="text-sm text-white/60 italic">
                  Plus: No ladder climbing, no water damage risk, peace of mind
                </p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BENEFITS — Wisconsin Context
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Benefits of Gutter Guards in Wisconsin
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "Prevent Ice Dams", desc: "Guards allow gutters to drain even in cold weather, preventing the standing water that creates destructive ice dams during Dane County winters." },
              { icon: Calendar, title: "End Seasonal Cleaning", desc: "No more scheduling twice-yearly cleanings or worrying about finding time before winter. Guards reduce maintenance by 90%+." },
              { icon: Clock, title: "Protect Your Safety", desc: "Ladder falls cause thousands of injuries every year. With gutter guards, you never have to climb up there again." },
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

      {/* ═══════════════════════════════════════════════════════════════════
          WHY CHOOSE US — Final trust
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#050d07' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Why Choose TotalGuard for Gutter Guards
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              Not all gutter guard installations are equal. Here&apos;s what sets us apart:
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { title: "Quality Products", desc: "We use micro-mesh guards proven to handle heavy rain, pine needles, and oak leaf debris common in Madison neighborhoods." },
              { title: "Proper Installation", desc: "Guards are only as good as their installation. We ensure proper angle, secure mounting, and seamless integration with your roofline." },
              { title: "Local Expertise", desc: "We understand Wisconsin's specific challenges\u2014heavy snow loads, ice, and the particular debris from Dane County's trees." },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <GlassCard hover="lift" className="text-center h-full">
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PRICING — Cinematic pricing card
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto">
              <GlassCard variant="accent" hover="glow" className="text-center p-8 md:p-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Gutter Guard Installation Pricing</h2>
                <p className="text-lg text-white/60 max-w-2xl mx-auto mb-6 leading-relaxed">
                  Gutter guard installation is priced per linear foot based on gutter length and home height. Most Madison-area homes range from <strong className="text-white">$800-$2,000</strong> for complete installation. This one-time investment typically pays for itself in 3-5 years compared to ongoing cleaning costs.
                </p>
                <GlassCard className="mb-8 text-left">
                  <p className="font-semibold text-white mb-2">Bundle & Save</p>
                  <p className="text-sm text-white/60">
                    Book installation with a gutter cleaning service and save 10% on your gutter guard installation!
                  </p>
                </GlassCard>
                <Button size="lg" className="font-bold text-lg" asChild>
                  <Link href="/contact?service=gutter-guards">Get Free Installation Estimate <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
      <section className="py-14 md:py-20" style={{ background: '#050d07' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Complete Home Protection
            </h2>
            <p className="text-center text-white/60 mb-10 max-w-2xl mx-auto">
              Gutter guards are one part of protecting your home from water damage:
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {[
              { href: "/services/gutter-cleaning", title: "Gutter Cleaning", desc: "One-time cleaning before guard installation or if you're not ready for guards yet" },
              { href: "/services/fall-cleanup", title: "Fall Cleanup", desc: "Comprehensive fall property prep including leaf removal" },
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

      <ResidentialHomeownerTypesSection serviceName="gutter guard installation" />
      <ResidentialExpectationsSection serviceName="gutter guard installation" />

      <ServiceFAQ faqs={gutterGuardsFAQs} />

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
