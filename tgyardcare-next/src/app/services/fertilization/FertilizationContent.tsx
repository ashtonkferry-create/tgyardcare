'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { ServiceSchema } from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Sprout, Phone, Calendar, Shield, Clock } from "lucide-react";
import heroImage from "@/assets/service-fertilization.jpg";
import ServiceFAQ from "@/components/ServiceFAQ";
import { fertilizationFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { AmbientParticles } from "@/components/AmbientParticles";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function FertilizationContent() {
  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Fertilization', url: 'https://tgyardcare.com/services/fertilization' }
      ]} />
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

      {/* Hero */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-20 md:py-28">
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
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Lawn Fertilization in <span className="text-accent">Madison & Dane County</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
              Wisconsin's cool-season grasses need proper nutrition to thrive. Build a thick, healthy lawn that naturally crowds out weeds with professional fertilization across Madison, Middleton, Waunakee, and Sun Prairie.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" variant="accent" className="text-base md:text-lg font-bold" asChild>
                <Link href="/contact?service=fertilization">Get My Free Quote →</Link>
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
              <strong>Ideal for:</strong> Homeowners with thin, pale, or struggling lawns. Perfect for those who want deep green color, thick turf that crowds out weeds, and a lawn that impresses the neighbors.
            </p>
          </div>
        </div>
      </section>

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

      {/* What's Included */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            What's Included in Our Fertilization Program
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            A complete nutrition program timed to Wisconsin's growing season—not a generic schedule.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Spring Fertilization", desc: "High-nitrogen formula for rapid green-up after Wisconsin's long winter" },
              { title: "Early Summer Feeding", desc: "Balanced nutrients to maintain color and strength through heat" },
              { title: "Fall Fertilization", desc: "Root-building formula that prepares your lawn for winter and drives spring green-up" },
              { title: "Overseeding (Optional)", desc: "Premium grass seed applied in optimal fall conditions for maximum germination" },
              { title: "Precise Application", desc: "Even coverage with professional spreader equipment—no burns or missed spots" },
              { title: "Custom Recommendations", desc: "Watering, mowing, and care advice tailored to your specific lawn" }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3 bg-background p-4 rounded-lg border border-border">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to Fertilize */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            When to Fertilize in Wisconsin
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-muted/30 p-6 rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Spring (April-May)</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  First application when grass starts growing. High-nitrogen formula promotes rapid green-up and early-season growth.
                </p>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Summer (June-July)</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Light feeding maintains color through heat stress. Lower nitrogen to avoid forcing growth during hot, dry periods.
                </p>
              </div>
              <div className="bg-primary/10 p-6 rounded-lg border-2 border-primary relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  Most Important
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Fall (Sept-Oct)</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Root-building formula is the most important application. Builds root mass for winter survival and drives strong spring green-up.
                </p>
              </div>
            </div>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              <strong>Why fall matters most:</strong> Cool-season grasses like Kentucky bluegrass and fescue grow roots aggressively in fall. Proper nutrition now builds the foundation for a thick, healthy lawn next spring.
            </p>
          </div>
        </div>
      </section>

      {/* Program Options */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Choose Your Fertilization Program
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Pick the program that matches your lawn's needs and your goals:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border border-border rounded-lg p-8 bg-background">
              <h3 className="text-2xl font-bold text-foreground mb-4">Fertilization Only</h3>
              <p className="text-muted-foreground mb-6">
                3-4 applications per year to maintain healthy, green grass. Best for established lawns that just need consistent nutrition.
              </p>
              <ul className="space-y-3 text-muted-foreground mb-6">
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
              <p className="text-sm text-muted-foreground italic">Best for: Established, healthy lawns that need to stay that way</p>
            </div>

            <div className="border-2 border-primary rounded-lg p-8 shadow-md relative bg-background">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Recommended
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Full Program</h3>
              <p className="text-muted-foreground mb-6">
                Complete fertilization plus fall overseeding for maximum thickness, color, and weed resistance.
              </p>
              <ul className="space-y-3 text-muted-foreground mb-6">
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
              <p className="text-sm text-muted-foreground italic">Best for: Thin or patchy lawns that need thickening</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            The Benefits of Professional Fertilization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sprout className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Thick, Lush Growth</h3>
              <p className="text-muted-foreground">
                Proper nutrients create dense turf that naturally crowds out weeds and looks professionally maintained year-round.
              </p>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sprout className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Deep Green Color</h3>
              <p className="text-muted-foreground">
                Rich, consistent color that stays vibrant through the growing season—without the burning and yellowing of DIY applications.
              </p>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Disease Resistance</h3>
              <p className="text-muted-foreground">
                Well-fed grass develops deep roots that resist drought, summer heat, winter stress, and common Wisconsin lawn diseases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Why Choose TotalGuard for Fertilization
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Professional products and local timing knowledge make all the difference:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Professional Products</h3>
              <p className="text-muted-foreground">
                Commercial-grade, slow-release fertilizers that feed your lawn over weeks—not the quick-burn products from big box stores.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Wisconsin Timing</h3>
              <p className="text-muted-foreground">
                We schedule based on Dane County's actual growing conditions—not a generic national calendar. Your lawn gets fed when it's actually growing.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Reliable Service</h3>
              <p className="text-muted-foreground">
                We show up when scheduled and apply precisely. No missed applications, no burnt spots, no guesswork.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Fertilization Program Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Programs are priced based on lawn size. Most Madison residential lawns (5,000-10,000 sq ft) range from <strong>$300-$600</strong> for a full season program (3-4 applications). Add overseeding for $150-$300 depending on lawn condition. We measure and provide exact pricing before any work begins.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact?service=fertilization-program">Get Your Program Quote</Link>
          </Button>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
            Complete Your Lawn Health Program
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Fertilization works best with these complementary services:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/services/aeration"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Aeration</h3>
              <p className="text-sm text-muted-foreground">Nutrients reach roots faster after aeration</p>
            </Link>
            <Link
              href="/services/herbicide"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Weed Control</h3>
              <p className="text-sm text-muted-foreground">Clear weeds so fertilizer feeds your grass, not weeds</p>
            </Link>
            <Link
              href="/services/mowing"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Weekly Mowing</h3>
              <p className="text-sm text-muted-foreground">Proper mowing height maximizes fertilizer benefits</p>
            </Link>
          </div>
        </div>
      </section>

      <ResidentialHomeownerTypesSection serviceName="fertilization" />
      <ResidentialExpectationsSection serviceName="fertilization" />

      <ServiceFAQ faqs={fertilizationFAQs} />

      <CTASection />
      <Footer />
    </div>
  );
}
