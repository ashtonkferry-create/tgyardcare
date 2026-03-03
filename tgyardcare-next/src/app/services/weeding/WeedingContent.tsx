'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { ServiceSchema } from "@/components/ServiceSchema";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ProblemResolution } from "@/components/ProblemResolution";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Leaf, Phone, Calendar, Shield, Clock, ArrowRight } from "lucide-react";
import heroImage from "@/assets/service-weeding.jpg";
import weedingImage1 from "@/assets/before-after/weeding-combined.png";
import weedingImage2 from "@/assets/before-after/weeding-combined-2.png";
import CTASection from '@/components/CTASection';
import ServiceFAQ from "@/components/ServiceFAQ";
import { weedingFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { AmbientParticles } from "@/components/AmbientParticles";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GlassCard } from "@/components/GlassCard";
import { TrustStrip } from "@/components/TrustStrip";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function WeedingContent() {
  const beforeAfterItems = [
    { combinedImage: weedingImage1 },
    { combinedImage: weedingImage2 }
  ];

  return (
    <div className="min-h-screen" style={{ background: '#050d07' }}>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Weeding', url: 'https://tgyardcare.com/services/weeding' }
      ]} />
      <ScrollProgress variant="minimal" />
      <ServiceSchema
        serviceName="Professional Weeding Services in Madison & Dane County"
        description="Thorough weed removal for garden beds across Madison, Middleton, Waunakee, Sun Prairie, and all Dane County."
        serviceType="Weed Removal"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Monona', 'Fitchburg', 'Verona', 'McFarland', 'DeForest', 'Cottage Grove', 'Oregon', 'Stoughton']}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides professional hand weeding services in Madison, Middleton, Waunakee, and Dane County, Wisconsin. Thorough root removal for pristine garden beds. Chemical-free option available for beds near edibles. Call (608) 535-6057 for a free quote.</p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Cinematic dark with particles
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center py-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional weeding service showing landscaper removing weeds from garden beds with fresh mulch and healthy plants"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/50 to-[#0a1f14]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
        </div>
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                Starting at $75/visit
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
                Garden Bed Weeding in <span className="text-accent">Madison & Dane County</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
                Wisconsin&apos;s warm, humid summers create perfect weed-growing conditions. Hand weeding from our crew keeps your beds pristine&mdash;and saves your weekends and your back.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button size="lg" className="text-base md:text-lg font-bold animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black" asChild>
                  <Link href="/contact?service=weeding">Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
                <strong className="text-white">Ideal for:</strong> Homeowners who want weed-free garden beds without the back-breaking labor. Perfect for busy professionals, those with physical limitations, or anyone who&apos;d rather enjoy their landscape than work in it.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════
          PROBLEM / SOLUTION — Build understanding
      ════════════════════════════════════════════════════════════════════ */}
      <ResidentialProblemSection
        serviceName="Weeding"
        problemPoints={[
          "Weeds competing with your plants for water, nutrients, and sunlight",
          "Rapid weed spread taking over garden beds and ruining your property's appearance",
          "Time-consuming, exhausting manual weeding that eats your weekends",
          "Weeds regrowing from roots when not removed properly",
          "Overgrown beds that make even a well-maintained lawn look shabby"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Weeding"
        solutionPoints={[
          "Thorough hand weeding that removes the entire root system",
          "Complete coverage of all garden beds, borders, and landscape areas",
          "Regular service that keeps weed pressure down all season",
          "Expert identification of problem weeds requiring special attention",
          "All debris removed—you just enjoy the clean results"
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT'S INCLUDED — Visual checklist
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              What&apos;s Included in Our Weeding Service
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              Complete weed removal from start to finish&mdash;no extra charges.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
            {[
              { title: "Hand Weeding in Beds", desc: "Complete removal of all weeds from garden beds and planted areas" },
              { title: "Root Extraction", desc: "Thorough removal including entire root systems to prevent regrowth" },
              { title: "Edge & Border Weeding", desc: "Weed removal along driveways, sidewalks, and bed edges" },
              { title: "Gravel & Patio Areas", desc: "Clear weeds from rock beds, patios, and hardscape areas" },
              { title: "Debris Removal", desc: "All pulled weeds bagged and hauled away from your property" },
              { title: "Prevention Tips", desc: "Recommendations to reduce future weed growth between visits" }
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
              How Our Weeding Service Works
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

            {[
              { step: "1", title: "Assess Your Beds", desc: "We survey all garden areas and identify weed types and severity" },
              { step: "2", title: "Hand-Pull Everything", desc: "Complete removal including roots\u2014not just surface clearing" },
              { step: "3", title: "Clean Up", desc: "All debris bagged and removed\u2014property left spotless" },
              { step: "4", title: "Schedule Next Visit", desc: "Regular service keeps weed pressure low all season" },
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
          TIMING & FREQUENCY — Seasonal knowledge
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#050d07' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              When & How Often to Weed in Wisconsin
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <ScrollReveal delay={0.1}>
              <GlassCard hover="glow" className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Weeding Season</h3>
                </div>
                <p className="text-white/60 mb-4">
                  In Dane County, weeds grow aggressively from <strong className="text-white">May through September</strong>. The warm, humid conditions that make Madison summers pleasant also make them ideal for weed growth.
                </p>
                <ul className="space-y-2.5 text-sm text-white/60">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Early spring cleanup catches winter annuals
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Summer is peak weed season
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Fall cleanup prevents winter seeding
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
                  <h3 className="text-xl font-semibold text-white">Service Frequency</h3>
                </div>
                <p className="text-white/60 mb-4">
                  For most Madison-area properties, <strong className="text-white">bi-weekly or monthly</strong> weeding during the growing season keeps beds looking clean without letting weeds get out of control.
                </p>
                <ul className="space-y-2.5 text-sm text-white/60">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Bi-weekly:</strong> Best for weed-prone beds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Monthly:</strong> Good for well-mulched areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">One-time:</strong> Catch-up service available</span>
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
        title="Ready for weed-free garden beds?"
        description="Get a free, no-obligation quote. We'll have pricing to you within 24 hours."
        variant="compact"
      />

      {/* ═══════════════════════════════════════════════════════════════════
          BENEFITS — Why professional weeding
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Benefits of Professional Weeding
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: Leaf,
                title: "Healthier Plants",
                desc: "Without weed competition, your flowers, shrubs, and perennials get more water, nutrients, and sunlight\u2014leading to more vigorous, beautiful growth."
              },
              {
                icon: Leaf,
                title: "Instant Curb Appeal",
                desc: "Clean, weed-free beds create an immediate polished look that elevates your entire property\u2014and makes your home stand out on the block."
              },
              {
                icon: Leaf,
                title: "Save Your Back",
                desc: "Skip the hours of bending, kneeling, and pulling. We handle this tedious, physically demanding work so you can enjoy your landscape instead of laboring in it."
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <GlassCard hover="lift" accentBorder className="h-full">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 text-center">{item.title}</h3>
                    <p className="text-white/60 leading-relaxed text-center">{item.desc}</p>
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
              Why Choose TotalGuard for Weeding
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              We don&apos;t just clear the surface&mdash;we remove the problem at the root:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "Thorough Root Removal", desc: "We extract the entire root system\u2014not just the visible leaves. This means weeds don't grow back in days like they do with surface clearing." },
              { icon: Clock, title: "Reliable Scheduling", desc: "We show up on your scheduled day, every time. No chasing contractors or wondering when your beds will get attention." },
              { icon: Leaf, title: "Complete Property Service", desc: "We handle all beds, borders, gravel areas, and hardscape edges\u2014not just the easy-to-reach spots." },
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
      <section className="py-14 md:py-20" style={{ background: '#050d07' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto">
              <GlassCard variant="accent" hover="glow" className="text-center p-8 md:p-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Madison-Area Weeding Pricing</h2>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-5xl md:text-6xl font-bold text-primary">$100</span>
                  <span className="text-2xl text-white/60">&ndash;</span>
                  <span className="text-5xl md:text-6xl font-bold text-primary">$300</span>
                  <span className="text-white/60 text-lg ml-1">/visit</span>
                </div>
                <p className="text-white/60 mb-6 leading-relaxed">
                  We price weeding based on the size of the area and severity of weed growth. Regular monthly or bi-weekly service reduces per-visit costs and keeps beds consistently clean.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-white/60">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    Maintenance plans available
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Schedule recurring &amp; save
                  </span>
                </div>
                <Button size="lg" className="font-bold text-lg" asChild>
                  <Link href="/contact?service=weeding">Get Your Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
              Complete Your Bed Maintenance
            </h2>
            <p className="text-center text-white/60 mb-10 max-w-2xl mx-auto">
              Weeding pairs well with these services for pristine landscape beds:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { href: "/services/mulching", title: "Mulching", desc: "Fresh mulch suppresses weeds and completes the look" },
              { href: "/services/pruning", title: "Pruning", desc: "Shape shrubs while we're working in your beds" },
              { href: "/services/garden-beds", title: "Garden Beds", desc: "Full bed renovation for a complete transformation" },
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

      <ResidentialHomeownerTypesSection serviceName="weeding" />
      <ResidentialExpectationsSection serviceName="weeding" />

      <ServiceFAQ faqs={weedingFAQs} />

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
