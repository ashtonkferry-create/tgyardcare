'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { ServiceSchema } from "@/components/ServiceSchema";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ProblemResolution } from "@/components/ProblemResolution";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Phone, Users, Calendar, Shield, Clock, Leaf, TreeDeciduous, ArrowRight } from "lucide-react";
import heroImage from "@/assets/service-leaf-removal.jpg";
import leafImage1 from "@/assets/before-after/leaf-removal-combined-1.png";
import leafImage2 from "@/assets/before-after/leaf-removal-combined-2.png";
import CTASection from '@/components/CTASection';
import ServiceFAQ from "@/components/ServiceFAQ";
import { leafRemovalFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { AmbientParticles } from "@/components/AmbientParticles";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GlassCard } from "@/components/GlassCard";
import { TrustStrip } from "@/components/TrustStrip";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function LeafRemovalContent() {
  const beforeAfterItems = [
    {
      combinedImage: leafImage1
    },
    {
      combinedImage: leafImage2
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: '#050d07' }}>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Leaf Removal', url: 'https://tgyardcare.com/services/leaf-removal' }
      ]} />
      <ScrollProgress variant="minimal" />
      <ServiceSchema
        serviceName="Professional Leaf Removal in Madison & Dane County"
        description="Efficient fall leaf removal service across Madison, Middleton, Waunakee, Sun Prairie, and all Dane County communities. Keep your lawn healthy through Wisconsin winters."
        serviceType="Leaf Removal"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Monona', 'Fitchburg', 'Verona', 'McFarland', 'DeForest', 'Cottage Grove', 'Oregon', 'Stoughton']}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides professional leaf removal services in Madison, Middleton, Waunakee, and Dane County, Wisconsin. Full property leaf clearing with hauling included. Zero leaves left behind. Protect your lawn from smothering. Call (608) 535-6057 for a free estimate.</p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Cinematic dark with particles
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center py-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional leaf removal service showing leaf blower clearing colorful autumn leaves from residential lawn in Madison Wisconsin"
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
                Leaf Removal in <span className="text-accent">Madison & Dane County</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
                Wisconsin&apos;s oak and maple trees drop heavy leaf loads every fall. Keep your Madison, Middleton, Waunakee, or Sun Prairie property clear and your lawn protected with efficient removal and hauling.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button size="lg" className="text-base md:text-lg font-bold animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black" asChild>
                  <Link href="/contact?service=leaf-removal">Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Who Leaf Removal Is For</h2>
                <p className="text-lg text-white/60 text-center mb-12">
                  This service is designed for Dane County homeowners with heavy leaf loads who want to protect their lawn investment.
                </p>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { icon: TreeDeciduous, title: "Properties With Mature Trees", desc: "Oak, maple, and walnut trees that dump thousands of leaves every fall" },
                  { icon: Users, title: "Busy Homeowners", desc: "No time for endless weekend raking before Wisconsin's first snow" },
                  { icon: Shield, title: "Lawn Investors", desc: "Those who understand leaving leaves = dead grass in spring" },
                  { icon: Clock, title: "Seniors & Physical Limitations", desc: "Anyone who shouldn't be hauling heavy, wet leaves" },
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
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════
          PROBLEM / SOLUTION — Build understanding
      ════════════════════════════════════════════════════════════════════ */}
      <ResidentialProblemSection
        serviceName="Leaf Removal"
        problemPoints={[
          "Thick leaf layers suffocating grass and creating dead patches",
          "Breeding grounds for pests, mold, and fungal diseases under wet leaves",
          "Exhausting, time-consuming raking with mountains of bags to haul",
          "Wet, matted leaves becoming even harder to remove if you wait",
          "Unsightly leaf-covered property dragging down curb appeal"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Leaf Removal"
        solutionPoints={[
          "Professional equipment including powerful blowers and vacuums for fast clearing",
          "Complete property coverage\u2014lawn, beds, patios, and driveways",
          "Bagging or mulching options depending on your preference",
          "All leaves hauled away leaving you with a clean property",
          "Lawn primed for healthy spring growth after thorough fall clearing"
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT'S INCLUDED — Visual checklist
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              What&apos;s Included in Leaf Removal
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              Every service includes the complete package&mdash;no hidden fees or &ldquo;extras&rdquo; to add on.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {[
              { title: "Full Property Clearing", desc: "Remove leaves from lawn, beds, hardscapes, and gutters" },
              { title: "Professional Equipment", desc: "Commercial blowers and vacuums for efficient removal" },
              { title: "Mulching Option", desc: "Shred and mulch leaves back into lawn if desired" },
              { title: "Bagging & Removal", desc: "All leaves bagged and hauled to disposal site" },
              { title: "Repeat Service Available", desc: "Multiple visits during fall season as needed" },
              { title: "Gutter Check", desc: "Basic gutter clearing included with service" },
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
              How Leaf Removal Works
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

            {[
              { step: "1", title: "Schedule", desc: "Book single visits or recurring fall service. We'll confirm timing based on leaf drop in your area." },
              { step: "2", title: "Clear", desc: "Our crew arrives with commercial equipment\u2014blowers, vacuums, and tarps for efficient clearing." },
              { step: "3", title: "Haul", desc: "All leaves are removed from your property\u2014no piles at the curb waiting for city pickup." },
              { step: "4", title: "Repeat", desc: "For heavy leaf properties, we return as needed until trees are bare and your lawn is clear." },
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
        title="Ready for leaf-free results?"
        description="Get a free, no-obligation quote. We'll have pricing to you within 24 hours."
        variant="compact"
      />

      {/* ═══════════════════════════════════════════════════════════════════
          BENEFITS — Why remove leaves before winter
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Why Remove Leaves Before Winter
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Leaf, title: "Protect Your Lawn", desc: "Leaves left on grass block sunlight and trap moisture, causing fungal diseases like snow mold. This creates dead patches that take all spring to recover\u2014if they recover at all." },
              { icon: Shield, title: "Save Your Back", desc: "Skip the hours of bending, raking, and bagging. We have the commercial equipment and crew to handle even the heaviest leaf fall in a fraction of the time." },
              { icon: Clock, title: "Pest Prevention", desc: "Leaf piles attract rodents, insects, and create breeding grounds for pests that can damage your lawn and home. Prompt removal keeps your property clean and pest-free." },
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
      <section className="py-14 md:py-20" style={{ background: '#050d07' }}>
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
                    <span><strong className="text-white">Peak season:</strong> Mid-October through late November</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">First visit:</strong> After initial heavy leaf drop (usually late October)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Final visit:</strong> After oaks finish dropping (mid-late November)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Before:</strong> First snow covers the ground</span>
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
                    <span><strong className="text-white">Light coverage:</strong> 1-2 visits typically sufficient</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Heavy oak/maple:</strong> 2-4 visits as trees drop continuously</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Neighbor&apos;s trees:</strong> May need extra visits if leaves blow in</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Wet conditions:</strong> More difficult&mdash;schedule before rain if possible</span>
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
      <section className="py-14 md:py-20" style={{ background: '#050d07' }}>
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
              { title: "We Haul Everything Away", desc: "No leaf mountains at the curb waiting for city pickup that may not come before snow. We remove all leaves from your property." },
              { title: "Complete Property Coverage", desc: "We don't just blow leaves to one corner. Lawn, beds, driveways, patios, and gutters\u2014we clear everything." },
              { title: "Commercial Equipment", desc: "Professional backpack blowers and vacuums clear in hours what takes homeowners entire weekends with consumer equipment." },
              { title: "Flexible Scheduling", desc: "We return as needed during fall season. Oak-heavy properties get extra visits automatically as trees continue dropping." },
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
      <section className="py-14 md:py-20" style={{ background: '#050d07' }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto">
              <GlassCard variant="accent" hover="glow" className="text-center p-8 md:p-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Madison-Area Leaf Removal Pricing</h2>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-5xl md:text-6xl font-bold text-primary">$150</span>
                  <span className="text-2xl text-white/60">&ndash;</span>
                  <span className="text-5xl md:text-6xl font-bold text-primary">$400</span>
                  <span className="text-white/60 text-lg ml-1">/visit</span>
                </div>
                <p className="text-white/60 mb-6 leading-relaxed">
                  Most Madison, Middleton, Waunakee, and Sun Prairie homes require 2-4 visits during fall season. Pricing depends on property size and leaf volume&mdash;no surprises, no hidden fees.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-white/60">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    October through November
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    2-4 visits typical
                  </span>
                </div>
                <Button size="lg" className="font-bold text-lg" asChild>
                  <Link href="/contact?service=leaf-removal">Get Your Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
              Pair With These Services
            </h2>
            <p className="text-center text-white/60 mb-10 max-w-2xl mx-auto">
              Many Madison homeowners combine leaf removal with these related fall services:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { href: "/services/fall-cleanup", title: "Full Fall Cleanup", desc: "Complete property winterization" },
              { href: "/services/gutter-cleaning", title: "Gutter Cleaning", desc: "Prevent ice dams and water damage" },
              { href: "/services/aeration", title: "Fall Aeration", desc: "Break up compacted soil for deeper roots" },
              { href: "/services/fertilization", title: "Winterizer Fertilizer", desc: "Feed your lawn for spring green-up" },
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

      <ResidentialHomeownerTypesSection serviceName="leaf removal" />
      <ResidentialExpectationsSection serviceName="leaf removal" />

      <ServiceFAQ faqs={leafRemovalFAQs} />

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
