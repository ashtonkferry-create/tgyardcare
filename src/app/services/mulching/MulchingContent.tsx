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
import { CheckCircle2, Trees, Phone, Calendar, Shield, Droplets, ArrowRight } from "lucide-react";
import heroImage from "@/assets/service-mulching.jpg";
import mulchingImage1 from "@/assets/before-after/mulching-combined.png";
import mulchingImage3 from "@/assets/before-after/mulching-combined-3.png";
import CTASection from '@/components/CTASection';
import ServiceFAQ from "@/components/ServiceFAQ";
import { mulchingFAQs } from "@/data/serviceFAQs";
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

export default function MulchingContent() {
  const beforeAfterItems = [
    { combinedImage: mulchingImage1 },
    { combinedImage: mulchingImage3 }
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#050d07' }}>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Mulching', url: 'https://tgyardcare.com/services/mulching' }
      ]} />
      <ScrollProgress variant="minimal" />
      <ServicePageSchemas slug="mulching" faqs={mulchingFAQs} />
      <WebPageSchema name="Mulching Services" description="Professional mulching services in Madison and Dane County WI" url="/services/mulching" />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides professional mulching services in Madison, Middleton, Waunakee, and Dane County, Wisconsin. Premium hardwood mulch installed at 2-3&quot; depth with defined edges. Old mulch removed if needed. One-visit installation. Call (608) 535-6057 for a free quote.</p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Cinematic dark with particles
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center py-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional mulching service showing fresh dark brown mulch being spread in garden beds"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/50 to-[#0a1f14]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
        </div>
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                Starting at $150/visit
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
                Mulching in <span className="text-accent">Madison & Dane County</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
                Wisconsin&apos;s freeze-thaw cycles are brutal on plant roots. Fresh hardwood mulch insulates your beds through Dane County&apos;s temperature swings while giving your landscape instant curb appeal.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button size="lg" className="text-base md:text-lg font-bold animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black" asChild>
                  <Link href="/contact?service=mulching">Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
                <strong className="text-white">Ideal for:</strong> Homeowners with garden beds that need refreshing, faded or washed-out mulch, or landscaping that lacks the polished look. Also perfect for new plantings that need protection through their first Wisconsin winter.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════
          PROBLEM / SOLUTION — Build understanding
      ════════════════════════════════════════════════════════════════════ */}
      <ResidentialProblemSection
        serviceName="Mulching"
        problemPoints={[
          "Old, faded mulch making your entire property look neglected",
          "Bare spots and washed-out mulch detracting from beautiful landscaping",
          "Soil drying out faster and weeds taking over without proper coverage",
          "Plant roots suffering from extreme Wisconsin temperature swings",
          "DIY mulching requiring heavy hauling and back-breaking spreading"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Mulching"
        solutionPoints={[
          "Premium hardwood mulch delivery and installation that instantly revitalizes beds",
          "Crisp edging for clean lines before mulch application",
          "Consistent 2-3 inch layer that looks uniform and professional",
          "Moisture retention, weed suppression, and soil temperature regulation",
          "A polished landscape that looks expensive but fits your budget"
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT'S INCLUDED — Visual checklist
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              What&apos;s Included in Our Mulching Service
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              Complete service from delivery to cleanup&mdash;no extra charges or surprises.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {[
              { title: "Premium Mulch", desc: "High-quality hardwood mulch in your choice of color (brown, black, or natural)" },
              { title: "Bed Preparation", desc: "Weeding and debris removal before mulch application" },
              { title: "Professional Edging", desc: "Crisp, defined borders for a clean, finished look" },
              { title: "Even Application", desc: "Uniform 2-3 inch depth for optimal benefits and appearance" },
              { title: "Complete Cleanup", desc: "All excess mulch and debris removed from walkways and lawn" },
              { title: "Free Delivery", desc: "Mulch delivery included in service price\—no surprise hauling fees" }
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              How Our Mulching Service Works
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

            {[
              { step: "1", title: "Measure & Quote", desc: "We assess your beds and calculate exactly how much mulch you need" },
              { step: "2", title: "Prep Your Beds", desc: "Weed removal, debris clearing, and edge definition" },
              { step: "3", title: "Install Mulch", desc: "Even 2-3\" application throughout all beds" },
              { step: "4", title: "Clean & Finish", desc: "All surfaces cleared, property left spotless" },
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
        title="Ready for a mulch transformation?"
        description="Get a free, no-obligation quote. We'll have pricing to you within 24 hours."
        variant="compact"
      />

      {/* ═══════════════════════════════════════════════════════════════════
          TIMING & MAINTENANCE — Seasonal knowledge
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              When to Mulch in Wisconsin
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <ScrollReveal delay={0.1}>
              <GlassCard variant="accent" hover="glow" className="h-full relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Best Time
                </div>
                <div className="flex items-center gap-3 mb-4 mt-2">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Spring (April-May)</h3>
                </div>
                <p className="text-white/60 mb-4">
                  After spring cleanup and before summer heat arrives is the ideal window. Fresh mulch protects roots from temperature swings and locks in spring moisture.
                </p>
                <ul className="space-y-2.5 text-sm text-white/60">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Refresh faded winter-worn beds
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Suppress weed growth before it starts
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Retain moisture during dry summers
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
                  <h3 className="text-xl font-semibold text-white">Fall (September-October)</h3>
                </div>
                <p className="text-white/60 mb-4">
                  A fall refresh before Wisconsin&apos;s harsh winter provides crucial root insulation and sets your beds up for a head start in spring.
                </p>
                <ul className="space-y-2.5 text-sm text-white/60">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Insulate roots from freeze-thaw cycles
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Protect perennials through winter
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Reduce spring weed emergence
                  </li>
                </ul>
              </GlassCard>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.3}>
            <p className="text-center text-white/60 mt-8 max-w-2xl mx-auto">
              <strong className="text-white">How often?</strong> Most Madison-area beds benefit from annual mulching. Heavily sun-exposed or steep beds may need topping off twice yearly.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BENEFITS — Why mulching matters in Wisconsin
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Why Mulching Matters in Wisconsin
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Temperature Insulation",
                desc: "Madison temperatures can swing 50+ degrees in a single week during spring and fall. Mulch insulates roots from these extremes, reducing plant stress and winter die-off."
              },
              {
                icon: Droplets,
                title: "Summer Moisture Retention",
                desc: "Wisconsin summers bring dry stretches that stress plants. A proper mulch layer reduces watering needs by up to 50%\—saving time and keeping beds healthy during Dane County heat waves."
              },
              {
                icon: Trees,
                title: "Weed Prevention",
                desc: "Block aggressive weeds like creeping charlie and crabgrass that thrive in Wisconsin's climate. A thick mulch layer suppresses weed seeds and reduces maintenance all season."
              },
              {
                icon: Trees,
                title: "Instant Curb Appeal",
                desc: "Whether you're in Nakoma, Middleton Hills, or a newer Waunakee subdivision, fresh dark mulch transforms tired beds and makes your property stand out on the block."
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <GlassCard hover="lift" accentBorder className="h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="text-white/60 leading-relaxed">{item.desc}</p>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          MULCH OPTIONS — Color choices
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Mulch Options
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              We use premium double-shredded hardwood mulch in your choice of color:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { color: "bg-amber-800", title: "Brown Mulch", desc: "Classic choice that complements most landscaping. Fades naturally to a warm tone." },
              { color: "bg-gray-900", title: "Black Mulch", desc: "Bold, modern look that makes plants pop. Holds color longer than natural tones." },
              { color: "bg-amber-600", title: "Natural Mulch", desc: "Undyed option for an organic look. Weathers to a natural gray over time." },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <GlassCard hover="lift" className="text-center h-full">
                  <div className={`w-16 h-16 rounded-full ${item.color} mx-auto mb-4`}></div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
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
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Madison-Area Mulching Prices</h2>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-5xl md:text-6xl font-bold text-primary">$250</span>
                  <span className="text-2xl text-white/60">&ndash;</span>
                  <span className="text-5xl md:text-6xl font-bold text-primary">$600</span>
                </div>
                <p className="text-white/60 mb-6 leading-relaxed">
                  Mulching is priced per cubic yard, with most Madison, Middleton, Waunakee, and Sun Prairie residential properties requiring 3-8 cubic yards. Free delivery included for all Dane County properties.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-white/60">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-primary" />
                    Best timing: April-May
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Fall refresh available Sept-Oct
                  </span>
                </div>
                <Button size="lg" className="font-bold text-lg" asChild>
                  <Link href="/contact?service=mulching">Schedule Your Mulch Installation <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
              Complete Your Bed Renovation
            </h2>
            <p className="text-center text-white/60 mb-10 max-w-2xl mx-auto">
              Mulching pairs well with these services for maximum impact:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { href: "/services/weeding", title: "Weeding", desc: "Clear beds before mulch for best results" },
              { href: "/services/pruning", title: "Pruning", desc: "Shape shrubs while we're in your beds" },
              { href: "/services/garden-beds", title: "Garden Beds", desc: "Full bed renovation including mulch" },
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

      <ResidentialHomeownerTypesSection serviceName="mulching" />
      <ResidentialExpectationsSection serviceName="mulching" />

      <ServiceFAQ faqs={mulchingFAQs} />

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
