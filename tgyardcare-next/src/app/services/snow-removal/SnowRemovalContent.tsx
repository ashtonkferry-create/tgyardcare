'use client';

import Link from "next/link";
import { Phone, CheckCircle2, Snowflake, Users, Calendar, Shield, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ServiceSchema } from "@/components/ServiceSchema";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { WinterPriorityServices } from "@/components/WinterPriorityServices";

import heroImage from "@/assets/hero-snow-plow.png";
import combinedImage from "@/assets/before-after/snow-removal-combined.webp";
import CTASection from '@/components/CTASection';
import ServiceFAQ from "@/components/ServiceFAQ";
import { snowRemovalFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { AmbientParticles } from "@/components/AmbientParticles";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GlassCard } from "@/components/GlassCard";
import { TrustStrip } from "@/components/TrustStrip";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function SnowRemovalContent() {
  const beforeAfterItems = [
    {
      combinedImage: imgSrc(combinedImage),
      title: "Complete Snow Removal",
      description: "Professional clearing of driveways and walkways with thorough ice management for safe winter access."
    }
  ];

  const services = [
    "Driveway Snow Clearing",
    "Walkway & Sidewalk Clearing",
    "Ice Management & Salting",
    "Emergency Storm Response",
    "Residential & Commercial Properties",
    "24/7 Availability During Storms"
  ];

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Snow Removal', url: 'https://tgyardcare.com/services/snow-removal' }
      ]} />
      <ServiceSchema
        serviceName="Snow Removal Services in Madison & Dane County"
        description="Professional snow and ice removal for residential and commercial properties across Madison, Middleton, Waunakee, Sun Prairie, Fitchburg, and Verona. Fast response during Wisconsin winter storms."
        serviceType="Snow Removal"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Monona', 'Fitchburg', 'Verona', 'McFarland', 'DeForest', 'Cottage Grove', 'Oregon', 'Stoughton']}
      />

      <div className="min-h-screen" style={{ background: '#050d07' }}>
        <Navigation />

        {/* TL;DR for AI/Answer Engines */}
        <section className="sr-only" aria-label="Service Summary">
          <p>TotalGuard Yard Care provides snow removal in Madison and Dane County, Wisconsin. We deploy at 2 inches snowfall with driveways cleared by 7am and salt included. Call (608) 535-6057.</p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            HERO — Cinematic dark with particles
        ════════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden py-16 md:py-24">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
            role="img"
            aria-label="Professional snow removal service showing snow plow truck clearing driveway of Wisconsin residential home in winter"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/50 to-[#0a1f14]/85" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
          </div>
          <AmbientParticles density="sparse" />

          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <ScrollReveal>
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                Starting at $50/visit
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <Snowflake className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4 md:mb-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                Snow Removal in Madison & Dane County
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed">
                Wisconsin winters don&apos;t wait&mdash;and neither do we. Fast snow plowing and ice management for homes across Madison, Middleton, Waunakee, Sun Prairie, and surrounding communities.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Button asChild size="lg" className="text-base md:text-lg font-bold animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black">
                  <Link href="/contact?service=snow-removal">Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-base md:text-lg border-white/30 text-white hover:bg-white/10">
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

        {/* Who This Is For */}
        <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Who Snow Removal Is For</h2>
                <p className="text-lg text-white/60 text-center mb-12">
                  This service is designed for Dane County residents who need reliable winter property access without the physical strain or unreliable contractors.
                </p>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { icon: Users, title: "Working Professionals", desc: "Need to get to work on time regardless of overnight snowfall" },
                  { icon: Shield, title: "Seniors & Those With Mobility Concerns", desc: "Anyone who shouldn't be shoveling heavy Wisconsin snow" },
                  { icon: Clock, title: "Properties With Long Driveways", desc: "Too much driveway to clear with a snowblower in reasonable time" },
                  { icon: AlertTriangle, title: "Landlords & Property Managers", desc: "Need reliable service for rental properties and liability protection" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <ScrollReveal key={i} delay={i * 0.08}>
                      <GlassCard hover="lift" className="h-full">
                        <div className="flex items-start gap-4">
                          <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="font-semibold mb-1">{item.title}</h3>
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
          serviceName="Snow Removal"
          problemPoints={[
            "Heavy snowfall making driveways and walkways impassable",
            "Safety hazards preventing you from getting to work or running errands",
            "Exhausting, time-consuming shoveling that can lead to injuries",
            "Icy surfaces creating slip-and-fall risks for your family and visitors",
            "Equipment breakdowns and back pain from DIY snow removal"
          ]}
        />
        <ResidentialSolutionSection
          serviceName="Snow Removal"
          solutionPoints={[
            "Fast, professional snow removal that clears your entire property quickly",
            "Commercial equipment for thorough clearing and ice management",
            "Prompt response during storms to keep you accessible and safe",
            "Complete ice treatment with de-icing materials for walkways and driveways",
            "Flexible options from per-storm pricing to seasonal contracts"
          ]}
        />

        {/* ═══════════════════════════════════════════════════════════════════
            WHAT'S INCLUDED — Visual checklist
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                  What&apos;s Included in Snow Removal
                </h2>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service, i) => (
                  <ScrollReveal key={i} delay={i * 0.08}>
                    <GlassCard hover="lift" className="h-full">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-lg">{service}</span>
                      </div>
                    </GlassCard>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            HOW IT WORKS — Animated process timeline
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How Snow Removal Works</h2>
            </ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 relative">
                {/* Connecting line (desktop) */}
                <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

                {[
                  { step: "1", title: "Sign Up", desc: "Choose per-storm or seasonal contract. We add you to our route before winter begins." },
                  { step: "2", title: "Storm Watch", desc: "We monitor Dane County forecasts closely and mobilize crews before storms hit." },
                  { step: "3", title: "Clear & Treat", desc: "We clear your driveway and walkways, then apply de-icing treatment for safe footing." },
                  { step: "4", title: "Done Before Work", desc: "You wake up to a clear driveway\u2014ready to start your day without shoveling." },
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.12}>
                    <div className="text-center relative">
                      <div className="relative z-10 bg-white/[0.06] backdrop-blur-sm border-2 border-primary/20 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg hover:border-primary/50 hover:shadow-primary/10 hover:shadow-xl transition-all duration-300">
                        <span className="text-2xl font-bold text-primary">{item.step}</span>
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            BENEFITS — Why Choose TotalGuard
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                  Why Choose TotalGuard for Snow Removal
                </h2>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { title: "Fast Response Times", desc: "Quick mobilization during and after storms to keep your property accessible and safe. We monitor forecasts and begin clearing before you wake up." },
                  { title: "Professional Equipment", desc: "Commercial-grade plows and de-icing materials for thorough, efficient clearing. We don't rely on residential-grade equipment that breaks down." },
                  { title: "Safety First", desc: "Prevent slips, falls, and accidents with prompt snow and ice removal from all walkways. Reduce liability risk for your property." },
                  { title: "Flexible Options", desc: "Per-storm pricing or seasonal contracts available. Choose what works for your budget and winter needs." },
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <GlassCard hover="lift" accentBorder className="h-full">
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-white/60 leading-relaxed">{item.desc}</p>
                    </GlassCard>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Before/After Gallery */}
        <BeforeAfterGallery items={beforeAfterItems} />

        {/* Mid-page CTA */}
        <CTASection
          title="Ready for reliable snow removal?"
          description="Get a free, no-obligation quote. We'll have pricing to you within 24 hours."
          variant="compact"
        />

        {/* Snow Removal Bundles */}
        <WinterPriorityServices />

        {/* ═══════════════════════════════════════════════════════════════════
            WHEN & HOW OFTEN — Seasonal knowledge
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">When & How Often</h2>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 gap-6">
                <ScrollReveal delay={0.1}>
                  <GlassCard hover="glow" className="h-full">
                    <Calendar className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">Timing</h3>
                    <ul className="space-y-2 text-white/60">
                      <li>&bull; <strong className="text-white">Season:</strong> November through March (or April in heavy years)</li>
                      <li>&bull; <strong className="text-white">Trigger:</strong> Service begins at 2+ inches of accumulation</li>
                      <li>&bull; <strong className="text-white">Timing:</strong> Cleared before you need to leave for work</li>
                      <li>&bull; <strong className="text-white">Multi-day storms:</strong> Multiple passes as needed</li>
                    </ul>
                  </GlassCard>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <GlassCard hover="glow" className="h-full">
                    <Clock className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">Frequency</h3>
                    <ul className="space-y-2 text-white/60">
                      <li>&bull; <strong className="text-white">Average season:</strong> 40+ inches of snow in Dane County</li>
                      <li>&bull; <strong className="text-white">Per-storm:</strong> Pay only when we plow</li>
                      <li>&bull; <strong className="text-white">Seasonal contract:</strong> Fixed price for entire winter</li>
                      <li>&bull; <strong className="text-white">Ice-only:</strong> De-icing service available separately</li>
                    </ul>
                  </GlassCard>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PRICING — Cinematic pricing section
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto">
                <GlassCard variant="accent" hover="glow" className="text-center p-8 md:p-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Madison-Area Snow Removal Pricing
                  </h2>
                  <p className="text-lg text-white/60 leading-relaxed mb-8">
                    Dane County averages 40+ inches of snow annually&mdash;so we offer both per-storm pricing and seasonal contracts that make sense for Wisconsin winters. Pricing depends on driveway length, property size, and service frequency.
                  </p>
                  <GlassCard className="mb-8 text-left">
                    <h3 className="font-semibold mb-4">Pricing Options:</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-white/60">
                      <div>
                        <strong className="text-white">Per-Storm</strong>
                        <p>Pay only when we plow. Good for light winters or budget flexibility.</p>
                      </div>
                      <div>
                        <strong className="text-white">Seasonal Contract</strong>
                        <p>Fixed price for entire season. Best value for typical Dane County winters.</p>
                      </div>
                    </div>
                  </GlassCard>
                  <GlassCard variant="accent" className="mb-8">
                    <p className="text-lg font-semibold mb-2">Wisconsin Winter Season</p>
                    <p className="text-white/60">
                      Snow removal available November through March. We monitor Dane County forecasts closely and mobilize before storms hit&mdash;so you wake up to cleared driveways, not snow piles.
                    </p>
                  </GlassCard>
                  <Button size="lg" className="font-bold text-lg" asChild>
                    <Link href="/contact?service=snow-removal">Get Your Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                </GlassCard>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            WHAT MAKES US DIFFERENT — Final trust
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Makes TotalGuard Different</h2>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { title: "We Actually Show Up", desc: "Many snow removal companies overbook and leave customers waiting until noon. We schedule conservatively and prioritize reliability over revenue." },
                  { title: "Proactive Communication", desc: "You'll know our plan before the storm hits. No wondering if we forgot you\u2014we communicate proactively about timing and any delays." },
                  { title: "Complete Ice Treatment", desc: "We don't just plow and leave. De-icing treatment is included to prevent dangerous ice buildup on walkways and driveways." },
                  { title: "Year-Round Relationship", desc: "We're not a winter-only company. We handle your lawn all summer too\u2014so we know your property and you know our reliability." },
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <GlassCard hover="lift" className="h-full">
                      <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                      <p className="text-white/60 leading-relaxed">{item.desc}</p>
                    </GlassCard>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Strip — Repeated for reinforcement */}
        <TrustStrip variant="light" />

        {/* ═══════════════════════════════════════════════════════════════════
            RELATED SERVICES — Cross-sell
        ════════════════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal>
                <h2 className="text-2xl font-bold mb-6">Year-Round Property Care</h2>
                <p className="text-white/60 mb-8">
                  Snow removal clients get priority scheduling for our summer services. Keep your property maintained all year:
                </p>
              </ScrollReveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { href: "/services/mowing", title: "Lawn Mowing" },
                  { href: "/services/fall-cleanup", title: "Fall Cleanup" },
                  { href: "/services/gutter-cleaning", title: "Gutter Cleaning" },
                  { href: "/residential", title: "All Services" },
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.08}>
                    <Link href={item.href} className="block group">
                      <GlassCard hover="lift" className="text-center">
                        <h3 className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{item.title}</h3>
                        <span className="inline-flex items-center text-primary text-xs font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          View <ArrowRight className="ml-1 h-3 w-3" />
                        </span>
                      </GlassCard>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ResidentialHomeownerTypesSection serviceName="snow removal" />
        <ResidentialExpectationsSection serviceName="snow removal" />

        <ServiceFAQ faqs={snowRemovalFAQs} />

        <CTASection />

        <Footer showCloser={false} />
      </div>
    </>
  );
}
