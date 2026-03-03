'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ServiceSchema } from "@/components/ServiceSchema";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ProblemResolution } from "@/components/ProblemResolution";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Sprout, Phone, Wind, Droplets, TreeDeciduous, Calendar, Shield, Clock, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-aeration.jpg";
import CTASection from '@/components/CTASection';
import ServiceFAQ from "@/components/ServiceFAQ";
import { aerationFAQs } from "@/data/serviceFAQs";
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

export default function AerationContent() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#050d07' }}>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Aeration', url: 'https://tgyardcare.com/services/aeration' }
      ]} />
      <ScrollProgress variant="minimal" />
      <ServiceSchema
        serviceName="Core Aeration Services in Madison & Dane County"
        description="Professional core aeration to reduce soil compaction and promote healthy root growth across Madison, Middleton, Waunakee, Sun Prairie, and all Dane County."
        serviceType="Lawn Aeration"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Monona', 'Fitchburg', 'Verona', 'McFarland', 'DeForest', 'Cottage Grove', 'Oregon', 'Stoughton']}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides professional core aeration services in Madison, Middleton, Waunakee, and Dane County, Wisconsin. Aeration reduces soil compaction and improves root growth, best done in fall. We service residential and commercial properties. Call (608) 535-6057 for a free quote.</p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Cinematic dark with particles
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center py-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional lawn aeration service showing core aerator machine creating plugs on lush green lawn"
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
                Core Aeration in <span className="text-accent">Madison & Dane County</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
                Wisconsin&apos;s clay-heavy soil compacts under foot traffic and mower wheels. Core aeration breaks through that barrier, letting roots breathe and grow deep for a thicker, healthier lawn.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button size="lg" className="text-base md:text-lg font-bold animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black" asChild>
                  <Link href="/contact?service=aeration">Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
                <strong className="text-white">Ideal for:</strong> Homeowners with compacted soil, high-traffic lawns, heavy clay, or thin grass that won&apos;t thicken despite fertilizing. Essential for established lawns that haven&apos;t been aerated in 2+ years.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════
          PROBLEM / SOLUTION — Build understanding
      ════════════════════════════════════════════════════════════════════ */}
      <ResidentialProblemSection
        serviceName="Aeration"
        problemPoints={[
          "Compacted soil from foot traffic, mowers, and Wisconsin's clay-heavy ground",
          "Water runs off instead of soaking in, leaving grass thirsty and stressed",
          "Shallow root systems that can't access nutrients deep in the soil",
          "Thatch buildup creating a barrier between your lawn and what it needs",
          "Thin, weak grass that struggles to compete with weeds and disease"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Aeration"
        solutionPoints={[
          "Core aeration pulls thousands of soil plugs, breaking up compaction instantly",
          "Improved water infiltration delivers moisture directly to root zones",
          "Enhanced oxygen and nutrient flow to roots for stronger, deeper growth",
          "Natural thatch breakdown as cores decompose and break up the layer",
          "Perfect prep for overseeding\—seeds fall into holes for ideal germination"
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT'S INCLUDED — Visual checklist
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              What&apos;s Included in Our Aeration Service
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              Complete professional service from start to finish&mdash;no hidden steps or extra charges.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {[
              { title: "Core Aeration", desc: "Professional aerator pulls 2-3\" soil cores across your entire lawn" },
              { title: "Multiple Passes", desc: "2-3 overlapping passes for thorough coverage and maximum benefit" },
              { title: "Obstacle Navigation", desc: "Careful work around sprinkler heads, trees, landscape beds, and utilities" },
              { title: "Irrigation Protection", desc: "Flag and avoid sprinkler heads (if you mark them or we identify them)" },
              { title: "Cores Left in Place", desc: "Plugs decompose naturally within 2-3 weeks and feed your lawn" },
              { title: "Aftercare Guidance", desc: "Watering and care instructions for best results over the following weeks" },
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
              How Core Aeration Works
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

            {[
              { step: "1", title: "Mark Obstacles", desc: "We identify sprinkler heads, utilities, and obstacles to avoid" },
              { step: "2", title: "Pull Cores", desc: "Machine removes 2-3\" plugs every few inches across the lawn" },
              { step: "3", title: "Cores Decompose", desc: "Plugs break down in 2-3 weeks, adding nutrients back to soil" },
              { step: "4", title: "Lawn Thrives", desc: "Roots grow deeper, grass thickens, and your lawn transforms" },
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

      {/* Mid-page CTA */}
      <CTASection
        title="Ready for a thicker, healthier lawn?"
        description="Get a free, no-obligation quote. We'll have pricing to you within 24 hours."
        variant="compact"
      />

      {/* ═══════════════════════════════════════════════════════════════════
          WHEN TO AERATE — Seasonal timing
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              When to Aerate Your Lawn in Wisconsin
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <ScrollReveal delay={0.1}>
              <GlassCard variant="accent" hover="glow" className="h-full relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Best Time
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 mt-2">
                  <TreeDeciduous className="h-6 w-6 text-primary" />
                  Fall Aeration
                </h3>
                <p className="text-white/60 mb-6">
                  <strong className="text-white">September through mid-October</strong> is the ideal window in Wisconsin. Cool temperatures and
                  fall rains help grass recover quickly and fill in before winter dormancy.
                </p>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Perfect for overseeding&mdash;seeds germinate in ideal conditions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Cool-season grass recovery is fastest in fall</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Less weed competition than spring aeration</span>
                  </li>
                </ul>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <GlassCard hover="glow" className="h-full">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Sprout className="h-6 w-6 text-primary" />
                  Spring Aeration
                </h3>
                <p className="text-white/60 mb-6">
                  <strong className="text-white">Late April through May</strong> works if fall wasn&apos;t possible. Spring aeration helps
                  lawns recover from winter compaction and prepares for summer stress.
                </p>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Wait until ground fully thaws and dries</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Complete before summer heat arrives</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Pairs well with spring fertilization</span>
                  </li>
                </ul>
              </GlassCard>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.3}>
            <p className="text-center text-white/60 mt-8 max-w-2xl mx-auto">
              <strong className="text-white">How often?</strong> Most Dane County lawns benefit from annual aeration. High-traffic areas or clay-heavy soils may need it twice yearly.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BENEFITS — Why professional aeration
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              The Benefits of Core Aeration
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Wind, title: "Deeper Root Growth", desc: "Loosened soil lets roots grow 4-6 inches deeper, building a stronger lawn that resists drought, heat, and foot traffic stress." },
              { icon: Droplets, title: "Better Water Uptake", desc: "Water penetrates instead of running off, reducing waste and delivering moisture directly where roots need it most." },
              { icon: Sprout, title: "Thicker, Healthier Turf", desc: "Enhanced nutrient absorption and improved growing conditions mean denser grass that naturally crowds out weeds." },
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
          WHAT MAKES US DIFFERENT — Final trust
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Why Choose TotalGuard for Aeration
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              Commercial equipment and local expertise make the difference:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Calendar, title: "Optimal Timing", desc: "We schedule based on Wisconsin's specific climate\—not a generic calendar. Your lawn gets aerated when conditions are perfect." },
              { icon: Shield, title: "Commercial Equipment", desc: "Professional-grade aerators pull deeper cores than rental machines, delivering better results in less time." },
              { icon: Clock, title: "Reliable Scheduling", desc: "Fall aeration slots fill fast. Book early and we'll schedule you at the optimal time for your property." },
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
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Madison-Area Aeration Pricing</h2>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-5xl md:text-6xl font-bold text-primary">$125</span>
                  <span className="text-2xl text-white/60">&ndash;</span>
                  <span className="text-5xl md:text-6xl font-bold text-primary">$225</span>
                  <span className="text-white/60 text-lg ml-1">/visit</span>
                </div>
                <p className="text-white/60 mb-6 leading-relaxed">
                  Most Madison residential lawns (5,000-10,000 sq ft) fall in this range for professional core aeration. Add overseeding for $75-$150 more. We&apos;ll measure and provide exact pricing before any work begins.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-white/60">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    Best in Sept-Oct or Apr-May
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    30-60 min per visit
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" className="font-bold text-lg" asChild>
                    <Link href="/contact?service=aeration">Get Aeration Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/contact?service=aeration-overseeding">Aeration + Overseeding Bundle</Link>
                  </Button>
                </div>
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
              Pair Aeration With These Services
            </h2>
            <p className="text-center text-white/60 mb-10 max-w-2xl mx-auto">
              Maximize your aeration investment with complementary services:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { href: "/services/fertilization", title: "Fertilization", desc: "Nutrients reach roots faster after aeration" },
              { href: "/services/fall-cleanup", title: "Fall Cleanup", desc: "Complete fall lawn prep for winter survival" },
              { href: "/services/mowing", title: "Weekly Mowing", desc: "Consistent care builds on aeration benefits" },
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

      <ResidentialHomeownerTypesSection serviceName="aeration" />
      <ResidentialExpectationsSection serviceName="aeration" />

      <ServiceFAQ faqs={aerationFAQs} />

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
