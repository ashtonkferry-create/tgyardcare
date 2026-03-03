'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { ServiceSchema } from "@/components/ServiceSchema";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ProblemResolution } from "@/components/ProblemResolution";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Clock, Phone, Calendar, Shield, Users, Zap, ArrowRight } from "lucide-react";
import heroImage from "@/assets/service-mowing.jpg";
import mowingImage1 from "@/assets/before-after/mowing-combined.png";
import fertilizationImage from "@/assets/before-after/fertilization-combined.png";
import CTASection from '@/components/CTASection';
import ServiceFAQ from "@/components/ServiceFAQ";
import { mowingFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { AmbientParticles } from "@/components/AmbientParticles";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GlassCard } from "@/components/GlassCard";
import { TrustStrip } from "@/components/TrustStrip";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function MowingContent() {
  const beforeAfterItems = [
    { combinedImage: mowingImage1 },
    { combinedImage: fertilizationImage }
  ];

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Lawn Mowing', url: 'https://tgyardcare.com/services/mowing' }
      ]} />
      <ScrollProgress variant="minimal" />
      <ServiceSchema
        serviceName="Professional Lawn Mowing Services in Madison WI"
        description="Expert weekly lawn mowing for Madison, Middleton, Waunakee, Sun Prairie, Monona, Fitchburg, and Verona. Same crew consistency, perfect stripes, and clean edges."
        serviceType="Lawn Mowing"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Monona', 'Fitchburg', 'Verona', 'McFarland', 'DeForest', 'Cottage Grove', 'Oregon', 'Stoughton']}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides professional weekly lawn mowing services in Madison, Middleton, Waunakee, and Dane County, Wisconsin. We assign the same crew to your property every visit, ensuring consistent quality and reliable scheduling. Get a free quote at (608) 535-6057.</p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Cinematic dark with particles
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center py-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional lawn mowing service showing freshly mowed residential lawn with perfect stripes and clean edges in Madison Wisconsin"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/50 to-[#0a1f14]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
        </div>
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                Starting at $35/visit
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
                Lawn Mowing in <span className="text-accent">Madison & Dane County</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
                Wisconsin summers are short&mdash;don&apos;t spend them behind a mower. We handle weekly mowing for homeowners across Madison, Middleton, Waunakee, and Sun Prairie with the same crew every visit.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button size="lg" className="text-base md:text-lg font-bold animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black" asChild>
                  <Link href="/contact?service=mowing">Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
                <strong className="text-foreground">Ideal for:</strong> Busy Madison-area homeowners who want a pristine lawn without spending weekends mowing. Perfect for professionals, families, and anyone who values their time.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════
          PROBLEM / SOLUTION — Build understanding
      ════════════════════════════════════════════════════════════════════ */}
      <ResidentialProblemSection
        serviceName="Lawn Mowing"
        problemPoints={[
          "Overgrown, unevenly cut lawn that creates brown patches and harms your grass",
          "Inconsistent mowing heights that stress your lawn and invite pests",
          "DIY mowing that eats your weekends with equipment hassles and poor results",
          "Neglected appearance that damages curb appeal and property value",
          "Improper technique that leads to costly repairs and reseeding"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Lawn Mowing"
        solutionPoints={[
          "Professional mowing that creates golf-course-quality stripes using commercial-grade equipment",
          "Optimal mowing height for your grass type ensuring healthy growth and lush appearance",
          "Precise edging along sidewalks and driveways included with every visit",
          "Thorough cleanup\u2014you're left with nothing but a beautiful lawn",
          "Reliable weekly or bi-weekly service you can actually count on"
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT'S INCLUDED — Visual checklist
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              What&apos;s Included in Every Mowing Visit
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Every service includes the complete package&mdash;no hidden fees or &ldquo;extras&rdquo; to add on.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {[
              { title: "Precision Mowing", desc: "Consistent height with professional striping patterns that make your lawn look like a golf course" },
              { title: "Clean Edging", desc: "Crisp lines along all sidewalks, driveways, and landscape borders" },
              { title: "String Trimming", desc: "Detail work around fences, trees, mailboxes, and hard-to-reach areas" },
              { title: "Surface Blowing", desc: "All clippings blown off driveways, sidewalks, and patios\u2014no mess left behind" },
              { title: "Height Adjustment", desc: "We raise or lower cutting height based on season and weather conditions" },
              { title: "Pattern Variation", desc: "We rotate mowing direction to prevent ruts and promote upright growth" },
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
              How Our Mowing Service Works
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

            {[
              { step: "1", title: "Get Your Quote", desc: "Tell us about your property. We'll respond within 24 hours with clear, honest pricing." },
              { step: "2", title: "Choose Your Schedule", desc: "Pick weekly or bi-weekly service. We'll assign your dedicated crew and route day." },
              { step: "3", title: "We Show Up", desc: "Same crew, same day each week. No need to be home\u2014we handle everything." },
              { step: "4", title: "Enjoy Your Lawn", desc: "Come home to a perfectly maintained lawn without lifting a finger." },
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
        title="Ready to stop mowing your own lawn?"
        description="Get a free, no-obligation quote. We'll have pricing to you within 24 hours."
        variant="compact"
      />

      {/* ═══════════════════════════════════════════════════════════════════
          TIMING & FREQUENCY — Seasonal knowledge
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              When & How Often to Mow in Wisconsin
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <ScrollReveal delay={0.1}>
              <GlassCard hover="glow" className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Mowing Season</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  In Dane County, the mowing season typically runs <strong className="text-foreground">mid-April through early November</strong>&mdash;about 28 weeks.
                </p>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Spring: Faster growth requires weekly service
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Summer: Heat slows growth; we adjust timing
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Fall: Final cuts prepare lawn for winter
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
                  <h3 className="text-xl font-semibold text-foreground">Service Frequency</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">Weekly mowing</strong> is ideal for most Madison lawns during peak season.
                </p>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Weekly:</strong> Best for lawn health and appearance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Bi-weekly:</strong> Budget option during slow growth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Custom:</strong> Flexible schedules available</span>
                  </li>
                </ul>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BENEFITS — Why professional mowing in Madison
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Why Madison Homeowners Choose Professional Mowing
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              {
                title: "Wisconsin-Tuned Cutting Heights",
                desc: "Our cool-season grass here in Dane County (Kentucky bluegrass, fescue) needs different care than southern lawns. We adjust cutting height through the season\u2014typically 3-3.5\" during summer heat."
              },
              {
                title: "Enjoy Your Short Summer",
                desc: "Madison summers average just 14 weeks of prime outdoor weather. Spend yours at the lakes, farmers markets, and Badger games\u2014not pushing a mower every Saturday morning."
              },
              {
                title: "Neighborhood Curb Appeal",
                desc: "From Nakoma and Maple Bluff to newer developments in Waunakee and Sun Prairie, a professionally striped lawn stands out on any block."
              },
              {
                title: "Same Crew, Same Day",
                desc: "Your TotalGuard crew knows your property, your preferences, and exactly what \u201cdone right\u201d looks like\u2014because it's the same team every single week."
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <GlassCard hover="lift" accentBorder className="h-full">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT MAKES US DIFFERENT — Final trust
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              What Makes TotalGuard Different
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We know you&apos;ve been burned by lawn guys who don&apos;t show up or deliver inconsistent results. Here&apos;s how we&apos;re different:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Users, title: "Same Crew Guarantee", desc: "No revolving door of random workers. Your dedicated crew learns your property and preferences\u2014and shows up consistently." },
              { icon: Shield, title: "Satisfaction Promise", desc: "Not happy with any visit? We'll come back and fix it\u2014no questions asked, no extra charge." },
              { icon: Zap, title: "Rain-Day Flexibility", desc: "When Wisconsin weather doesn't cooperate, we adjust. We'll mow within a day of your scheduled visit." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.12}>
                  <GlassCard hover="lift" className="text-center h-full">
                    <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
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
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto">
              <GlassCard variant="accent" hover="glow" className="text-center p-8 md:p-10">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Madison-Area Mowing Pricing</h2>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-5xl md:text-6xl font-bold text-primary">$35</span>
                  <span className="text-2xl text-muted-foreground">&ndash;</span>
                  <span className="text-5xl md:text-6xl font-bold text-primary">$65</span>
                  <span className="text-muted-foreground text-lg ml-1">/visit</span>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Pricing depends on lot size, obstacles, and terrain. We&apos;ll provide an exact quote after a quick property assessment&mdash;no surprises, no hidden fees.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    April through November (28 weeks)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    20-45 min per visit
                  </span>
                </div>
                <Button size="lg" className="font-bold text-lg" asChild>
                  <Link href="/contact?service=mowing">Get Your Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
              Enhance Your Lawn Care
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Mowing is the foundation&mdash;but these services take your lawn to the next level:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { href: "/services/fertilization", title: "Fertilization", desc: "Feed your lawn for thick, green growth" },
              { href: "/services/aeration", title: "Aeration", desc: "Break up compacted soil for deeper roots" },
              { href: "/services/weeding", title: "Weeding", desc: "Keep your beds weed-free" },
              { href: "/services/mulching", title: "Mulching", desc: "Complete the polished look" },
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

      <ResidentialHomeownerTypesSection serviceName="lawn mowing" />
      <ResidentialExpectationsSection serviceName="lawn mowing" />

      <ServiceFAQ faqs={mowingFAQs} />

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
