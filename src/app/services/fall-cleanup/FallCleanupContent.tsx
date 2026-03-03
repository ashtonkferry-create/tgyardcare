'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { ServiceSchema } from "@/components/ServiceSchema";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ProblemResolution } from "@/components/ProblemResolution";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, CloudRain, Phone, Users, Calendar, Shield, Clock, Leaf, ArrowRight } from "lucide-react";
import heroImage from "@/assets/service-fall-cleanup.jpg";
import CTASection from '@/components/CTASection';
import ServiceFAQ from "@/components/ServiceFAQ";
import { fallCleanupFAQs } from "@/data/serviceFAQs";
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

export default function FallCleanupContent() {
  const beforeAfterItems: { combinedImage: string }[] = [];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#050d07' }}>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Fall Cleanup', url: 'https://tgyardcare.com/services/fall-cleanup' }
      ]} />
      <ScrollProgress variant="minimal" />
      <ServiceSchema
        serviceName="Fall Cleanup Services in Madison & Dane County"
        description="Professional fall cleanup and winter preparation for Madison, Middleton, Waunakee, Sun Prairie, and surrounding Dane County properties. Protect your lawn from Wisconsin's harsh winters."
        serviceType="Fall Cleanup"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Monona', 'Fitchburg', 'Verona', 'McFarland', 'DeForest', 'Cottage Grove', 'Oregon', 'Stoughton']}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides professional fall cleanup services in Madison, Middleton, Waunakee, and Dane County, Wisconsin. We clear leaves, clean gutters, and winterize your lawn before first frost. Protect your property from Wisconsin winter damage. Call (608) 535-6057.</p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Cinematic dark with particles
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center py-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional fall cleanup service showing autumn yard maintenance with worker raking colorful leaves in golden sunlight"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/50 to-[#0a1f14]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
        </div>
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                Starting at $125/visit
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
                Fall Cleanup in <span className="text-accent">Madison & Dane County</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
                Wisconsin winters are brutal&mdash;but your lawn doesn&apos;t have to suffer. Complete fall cleanup across Madison, Middleton, Waunakee, and Sun Prairie to protect your property before the first freeze.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button size="lg" className="text-base md:text-lg font-bold animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black" asChild>
                  <Link href="/contact?service=fall-cleanup">Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
      <ScrollReveal>
        <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">Who Fall Cleanup Is For</h2>
                <p className="text-lg text-white/60 text-center mb-12">
                  This service is designed for Dane County homeowners who want to protect their investment and avoid expensive spring repairs.
                </p>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { icon: Users, title: "Busy Professionals", desc: "No time to spend weekends raking before Wisconsin's first snow" },
                  { icon: Leaf, title: "Oak-Heavy Properties", desc: "Properties in Nakoma, Maple Bluff, and Shorewood Hills with mature trees" },
                  { icon: Shield, title: "Homeowners Who Protect Investments", desc: "Those who understand proper fall prep saves money on spring repairs" },
                  { icon: Clock, title: "Seniors & Physical Limitations", desc: "Anyone who shouldn't be hauling heavy, wet leaves in cold weather" },
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
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════
          PROBLEM / SOLUTION — Build understanding
      ════════════════════════════════════════════════════════════════════ */}
      <ResidentialProblemSection
        serviceName="Fall Cleanup"
        problemPoints={[
          "Fall leaves and debris smothering your lawn and creating disease conditions",
          "Neglected cleanup leading to dead grass and damaged plants over winter",
          "Much harder spring cleanup job if fall is skipped",
          "Wisconsin's harsh winters causing preventable landscape damage",
          "Pests and disease overwintering in leaf piles and debris"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Fall Cleanup"
        solutionPoints={[
          "Complete removal of all leaves and debris from your entire property",
          "Perennial cutback and protection for sensitive plants",
          "Gutter cleaning included to prevent ice dams",
          "Final mowing at optimal winter height for lawn health",
          "Emerge from winter ready to grow, not repair expensive damage"
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT'S INCLUDED — Visual checklist
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              What&apos;s Included in Fall Cleanup
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              Every service includes the complete package&mdash;no hidden fees or &ldquo;extras&rdquo; to add on.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {[
              { title: "Complete Leaf Removal", desc: "Multiple visits if needed to clear all fallen leaves from lawn, beds, and hardscapes" },
              { title: "Perennial Cutback", desc: "Trim dead growth from flower beds and borders to prevent disease" },
              { title: "Gutter Cleaning", desc: "Remove leaves and debris to prevent ice dams and water damage" },
              { title: "Final Mowing", desc: "Last cut at optimal winter height (2.5-3 inches) for lawn health" },
              { title: "Bed Mulching", desc: "Top-dress beds for winter insulation (optional add-on)" },
              { title: "Debris Haul-Away", desc: "All leaves and waste removed from property\—nothing left behind" },
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
              How Fall Cleanup Works
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

            {[
              { step: "1", title: "Schedule Early", desc: "Book in September-October before the rush. We'll confirm your spot on our fall rotation." },
              { step: "2", title: "First Visit", desc: "We clear early-falling leaves, clean gutters, and prep beds\—typically late October." },
              { step: "3", title: "Final Visit", desc: "After peak leaf drop (usually November), we do final cleanup, last mow, and haul everything away." },
              { step: "4", title: "Winter Ready", desc: "Your property is protected and clean before the first snow blankets Dane County." },
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
        title="Ready to protect your lawn this winter?"
        description="Get a free, no-obligation quote. We'll have pricing to you within 24 hours."
        variant="compact"
      />

      {/* ═══════════════════════════════════════════════════════════════════
          WHY IT MATTERS — Wisconsin context
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Why Fall Cleanup Matters in Wisconsin
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: CloudRain, title: "Prevent Snow Mold", desc: "Dane County's heavy snowfall traps moisture under matted leaves. This creates perfect conditions for snow mold\—a fungus that kills grass crowns and leaves brown patches all spring." },
              { icon: CloudRain, title: "Stop Ice Dam Damage", desc: "Clogged gutters in Wisconsin winters create ice dams that tear gutters off homes and cause basement flooding. Fall cleanup includes gutter clearing before freezing temperatures arrive." },
              { icon: CloudRain, title: "Faster Spring Green-Up", desc: "Properties that skip fall cleanup spend April recovering instead of growing. Clean lawns green up 2-3 weeks faster once Madison's spring warmth arrives." },
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
          TIMING & FREQUENCY — Seasonal knowledge
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              When & How Often
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <ScrollReveal delay={0.1}>
              <GlassCard hover="glow" className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Timing</h3>
                </div>
                <ul className="space-y-2.5 text-sm text-white/60">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Book:</strong> September-October for best availability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">First visit:</strong> Late October after initial leaf drop</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Final visit:</strong> Mid-November before first major snow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Window:</strong> About 4-6 weeks from first to final cleanup</span>
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
                  <h3 className="text-xl font-semibold text-white">Frequency</h3>
                </div>
                <ul className="space-y-2.5 text-sm text-white/60">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Standard:</strong> 1-2 visits for most properties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Oak-heavy:</strong> 2-3 visits as oaks drop late into November</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Gutter cleaning:</strong> Included with first or final visit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Annual service:</strong> Every fall for optimal lawn health</span>
                  </li>
                </ul>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT MAKES US DIFFERENT — Final trust
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              What Makes TotalGuard Different
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              We know you&apos;ve been burned by lawn guys who don&apos;t show up or deliver inconsistent results. Here&apos;s how we&apos;re different:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              { title: "We Actually Show Up", desc: "Many fall cleanup companies overbook and leave customers waiting until December. We schedule conservatively and communicate proactively if weather causes delays." },
              { title: "Complete Property Coverage", desc: "We don't just blow leaves to the curb. Every leaf, every bed, every gutter\—we leave your property truly winter-ready, not just \"good enough.\"" },
              { title: "Haul-Away Included", desc: "All debris is removed from your property. No leaf mountains at the curb waiting for city pickup that may not come before snow." },
              { title: "Multi-Visit Option", desc: "For oak-heavy properties, we return for a second cleanup after late leaf drop\—so you're not stuck with a layer of leaves under the first snow." },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <GlassCard hover="lift" accentBorder className="h-full">
                  <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
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
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Madison-Area Fall Cleanup Pricing</h2>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-5xl md:text-6xl font-bold text-primary">$250</span>
                  <span className="text-2xl text-white/60">&ndash;</span>
                  <span className="text-5xl md:text-6xl font-bold text-primary">$600</span>
                  <span className="text-white/60 text-lg ml-1">/visit</span>
                </div>
                <p className="text-white/60 mb-6 leading-relaxed">
                  Most Madison, Middleton, Waunakee, and Sun Prairie homes get complete fall cleanup. Oak-heavy properties in neighborhoods like Nakoma and Maple Bluff may need multiple visits as leaves drop through November.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-white/60">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    October through November
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    1-3 visits typical
                  </span>
                </div>
                <Button size="lg" className="font-bold text-lg" asChild>
                  <Link href="/contact?service=fall-cleanup">Get Your Free Estimate <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
              Pair With These Services
            </h2>
            <p className="text-center text-white/60 mb-10 max-w-2xl mx-auto">
              Many Madison homeowners combine fall cleanup with these related services for complete winter preparation:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { href: "/services/gutter-cleaning", title: "Gutter Cleaning", desc: "Prevent ice dams and water damage" },
              { href: "/services/aeration", title: "Fall Aeration", desc: "Break up compacted soil for deeper roots" },
              { href: "/services/fertilization", title: "Winterizer Fertilizer", desc: "Feed your lawn for spring green-up" },
              { href: "/services/snow-removal", title: "Snow Removal", desc: "Seamless winter coverage" },
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

      <ResidentialHomeownerTypesSection serviceName="fall cleanup" />
      <ResidentialExpectationsSection serviceName="fall cleanup" />

      <ServiceFAQ faqs={fallCleanupFAQs} />

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
