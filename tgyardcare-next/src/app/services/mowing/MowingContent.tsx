'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { ServiceSchema } from "@/components/ServiceSchema";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SectionDivider, SectionConnector } from "@/components/SectionTransition";
import { ProblemResolution } from "@/components/ProblemResolution";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Clock, Phone, Calendar, Shield, Users, Zap } from "lucide-react";
import heroImage from "@/assets/service-mowing.jpg";
import mowingImage1 from "@/assets/before-after/mowing-combined.png";
import fertilizationImage from "@/assets/before-after/fertilization-combined.png";
import ServiceFAQ from "@/components/ServiceFAQ";
import { mowingFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { AmbientParticles } from "@/components/AmbientParticles";

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
      {/* Scroll Progress - Engagement signal */}
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

      {/* Hero */}
      <section className="relative min-h-[50vh] md:min-h-[55vh] flex items-center py-16 md:py-24">
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
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Lawn Mowing in <span className="text-accent">Madison & Dane County</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
              Wisconsin summers are short—don't spend them behind a mower. We handle weekly mowing for homeowners across Madison, Middleton, Waunakee, and Sun Prairie with the same crew every visit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" variant="accent" className="text-base md:text-lg font-bold" asChild>
                <Link href="/contact?service=mowing">Get My Free Quote →</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 text-base md:text-lg" asChild>
                <a href="tel:608-535-6057">
                  <Phone className="mr-2 h-5 w-5" />
                  (608) 535-6057
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-12 bg-gradient-to-r from-[#0f2a1a] via-[#1a3a2a] to-[#0f2a1a] border-y border-emerald-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-white/90">
              <strong>Ideal for:</strong> Busy Madison-area homeowners who want a pristine lawn without spending weekends mowing. Perfect for professionals, families, and anyone who values their time.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PHASE 2: INTEREST - Build understanding through problem/solution
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
          "Thorough cleanup—you're left with nothing but a beautiful lawn",
          "Reliable weekly or bi-weekly service you can actually count on"
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          PHASE 3: DESIRE - Deepen engagement with specifics
      ════════════════════════════════════════════════════════════════════ */}

      {/* What's Included - Expanded */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            What's Included in Every Mowing Visit
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Every service includes the complete package—no hidden fees or "extras" to add on.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="flex items-start space-x-3 bg-background p-4 rounded-lg border border-border">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Precision Mowing</h3>
                <p className="text-sm text-muted-foreground">
                  Consistent height with professional striping patterns that make your lawn look like a golf course
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-background p-4 rounded-lg border border-border">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Clean Edging</h3>
                <p className="text-sm text-muted-foreground">
                  Crisp lines along all sidewalks, driveways, and landscape borders
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-background p-4 rounded-lg border border-border">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">String Trimming</h3>
                <p className="text-sm text-muted-foreground">
                  Detail work around fences, trees, mailboxes, and hard-to-reach areas
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-background p-4 rounded-lg border border-border">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Surface Blowing</h3>
                <p className="text-sm text-muted-foreground">
                  All clippings blown off driveways, sidewalks, and patios—no mess left behind
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-background p-4 rounded-lg border border-border">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Height Adjustment</h3>
                <p className="text-sm text-muted-foreground">
                  We raise or lower cutting height based on season and weather conditions
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-background p-4 rounded-lg border border-border">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Pattern Variation</h3>
                <p className="text-sm text-muted-foreground">
                  We rotate mowing direction to prevent ruts and promote upright growth
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual transition */}
      <SectionConnector />

      {/* How It Works - Process Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            How Our Mowing Service Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Get Your Quote</h3>
              <p className="text-sm text-muted-foreground">
                Tell us about your property. We'll respond within 24 hours with clear, honest pricing.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Choose Your Schedule</h3>
              <p className="text-sm text-muted-foreground">
                Pick weekly or bi-weekly service. We'll assign your dedicated crew and route day.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">We Show Up</h3>
              <p className="text-sm text-muted-foreground">
                Same crew, same day each week. No need to be home—we handle everything.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Enjoy Your Lawn</h3>
              <p className="text-sm text-muted-foreground">
                Come home to a perfectly maintained lawn without lifting a finger.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Proof */}
      <BeforeAfterGallery items={beforeAfterItems} />

      {/* ═══════════════════════════════════════════════════════════════════
          PHASE 4: ACTION - Build final confidence and drive commitment
      ════════════════════════════════════════════════════════════════════ */}

      {/* Timing & Frequency */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            When & How Often to Mow in Wisconsin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-background p-6 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Mowing Season</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                In Dane County, the mowing season typically runs <strong>mid-April through early November</strong>—about 28 weeks.
                We start when grass begins active growth and continue until it goes dormant.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
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
            </div>
            <div className="bg-background p-6 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Service Frequency</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                <strong>Weekly mowing</strong> is ideal for most Madison lawns during peak season. It keeps grass at the proper height
                and prevents the "shock" of cutting too much at once.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <strong>Weekly:</strong> Best for lawn health and appearance
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <strong>Bi-weekly:</strong> Budget option during slow growth
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <strong>Custom:</strong> Flexible schedules available
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visual transition */}
      <SectionDivider />

      {/* Benefits - Local Context */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Why Madison Homeowners Choose Professional Mowing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-muted/50 rounded-lg border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-3">Wisconsin-Tuned Cutting Heights</h3>
              <p className="text-muted-foreground">
                Our cool-season grass here in Dane County (Kentucky bluegrass, fescue) needs different care than southern lawns. We adjust cutting height through the season to handle Wisconsin's humidity and temperature swings—typically 3-3.5" during summer heat.
              </p>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-3">Enjoy Your Short Summer</h3>
              <p className="text-muted-foreground">
                Madison summers average just 14 weeks of prime outdoor weather. Spend yours at the lakes, farmers markets, and Badger games—not pushing a mower every Saturday morning.
              </p>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-3">Neighborhood Curb Appeal</h3>
              <p className="text-muted-foreground">
                From the established neighborhoods of Nakoma and Maple Bluff to newer developments in Waunakee and Sun Prairie, a professionally striped lawn stands out on any block.
              </p>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-3">Same Crew, Same Day</h3>
              <p className="text-muted-foreground">
                Your TotalGuard crew knows your property, your preferences, and exactly what "done right" looks like—because it's the same team every single week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Final trust building */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            What Makes TotalGuard Different
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            We know you've been burned by lawn guys who don't show up or deliver inconsistent results. Here's how we're different:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Same Crew Guarantee</h3>
              <p className="text-muted-foreground">
                No revolving door of random workers. Your dedicated crew learns your property and preferences—and shows up consistently.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Satisfaction Promise</h3>
              <p className="text-muted-foreground">
                Not happy with any visit? We'll come back and fix it—no questions asked, no extra charge. Your lawn should look perfect every time.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Rain-Day Flexibility</h3>
              <p className="text-muted-foreground">
                When Wisconsin weather doesn't cooperate, we adjust. We'll mow within a day of your scheduled visit—never skip you entirely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Resolution - What if something goes wrong? */}
      <ProblemResolution variant="full" />

      {/* Pricing - Clear Expectations */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Madison-Area Mowing Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Most residential properties in Madison, Middleton, Waunakee, and surrounding Dane County communities range from <strong>$35-$65 per visit</strong> for weekly mowing. Pricing depends on lot size, obstacles, and terrain. We'll provide an exact quote after a quick property assessment—no surprises, no hidden fees.
          </p>
          <div className="bg-muted/30 rounded-lg p-6 max-w-lg mx-auto mb-8 border border-border">
            <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-4">
              <Clock className="h-5 w-5" />
              <span>Season runs April through November (28 weeks)</span>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong>Typical visit time:</strong> 20-45 minutes depending on property size
            </p>
          </div>
          <Button size="lg" asChild>
            <Link href="/contact?service=mowing">Get Your Free Quote</Link>
          </Button>
        </div>
      </section>

      {/* Related Services - Internal Linking */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
            Enhance Your Lawn Care
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Mowing is the foundation—but these services take your lawn to the next level:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Link
              href="/services/fertilization"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Fertilization</h3>
              <p className="text-sm text-muted-foreground">Feed your lawn for thick, green growth</p>
            </Link>
            <Link
              href="/services/aeration"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Aeration</h3>
              <p className="text-sm text-muted-foreground">Break up compacted soil for deeper roots</p>
            </Link>
            <Link
              href="/services/weeding"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Weeding</h3>
              <p className="text-sm text-muted-foreground">Keep your beds weed-free</p>
            </Link>
            <Link
              href="/services/mulching"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Mulching</h3>
              <p className="text-sm text-muted-foreground">Complete the polished look</p>
            </Link>
          </div>
        </div>
      </section>

      <ResidentialHomeownerTypesSection serviceName="lawn mowing" />
      <ResidentialExpectationsSection serviceName="lawn mowing" />

      <ServiceFAQ faqs={mowingFAQs} />

      <Footer />
    </div>
  );
}
