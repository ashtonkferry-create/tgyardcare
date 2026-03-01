'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Scissors, Phone, Calendar, Shield, Clock } from "lucide-react";
import { ServiceSchema } from "@/components/ServiceSchema";
import ServiceFAQ from "@/components/ServiceFAQ";
import { pruningFAQs } from "@/data/serviceFAQs";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import pruningCombined from "@/assets/before-after/pruning-combined.png";
import pruningCombined2 from "@/assets/before-after/pruning-combined-2.png";
import heroImage from "@/assets/service-pruning.jpg";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function PruningContent() {
  const beforeAfterItems = [
    { combinedImage: imgSrc(pruningCombined) },
    { combinedImage: imgSrc(pruningCombined2) }
  ];

  return (
    <>
      <ServiceSchema
        serviceName="Bush Trimming & Shrub Pruning Services"
        description="Professional bush trimming and shrub pruning to maintain healthy, attractive landscaping across Madison and Dane County."
        serviceType="Bush Trimming and Shrub Pruning"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Verona', 'Fitchburg', 'McFarland', 'Monona', 'Sun Prairie', 'DeForest', 'Oregon', 'Stoughton', 'Cottage Grove']}
      />
      <div className="min-h-screen bg-background">
        <Navigation />

        {/* TL;DR for AI/Answer Engines */}
        <section className="sr-only" aria-label="Service Summary">
          <p>TotalGuard Yard Care provides professional bush trimming and shrub pruning services in Madison, Middleton, Waunakee, and Dane County, Wisconsin. We shape and restore overgrown landscaping with debris removed. Before and after photos provided. Call (608) 535-6057 for a free quote.</p>
        </section>

        {/* Hero Section */}
        <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden py-20 md:py-28">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
            role="img"
            aria-label="Professional bush trimming and pruning service showing well-maintained shrubs in Madison Wisconsin"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
          </div>
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6">
              Bush Trimming & Shrub Pruning in Madison
            </h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-gray-200">
              Overgrown shrubs make even the nicest home look neglected. We restore your landscaping with expert trimming and shaping across Madison, Middleton, Waunakee, and Sun Prairie.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button size="lg" asChild className="text-base md:text-lg font-bold">
                <Link href="/contact?service=pruning">Get My Free Quote →</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base md:text-lg bg-white/10 text-white border-white hover:bg-white hover:text-primary">
                <a href="tel:608-535-6057">
                  <Phone className="mr-2 h-5 w-5" />
                  (608) 535-6057
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-12 bg-primary/5 border-y border-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-foreground">
                <strong>Ideal for:</strong> Homeowners with overgrown foundation plantings, out-of-control hedges, or shrubs that haven't been trimmed in years. Perfect for pre-sale property prep or seasonal maintenance.
              </p>
            </div>
          </div>
        </section>

        <ResidentialProblemSection
          serviceName="Bush Trimming & Pruning"
          problemPoints={[
            "Overgrown bushes and shrubs hurting your home's curb appeal",
            "Untrimmed plants blocking windows, walkways, and natural light",
            "Pest and disease problems from neglected, dense landscaping",
            "Dead branches and weak growth making plants look shabby",
            "Foundation obscured by out-of-control shrub growth"
          ]}
        />
        <ResidentialSolutionSection
          serviceName="Bush Trimming & Pruning"
          solutionPoints={[
            "Expert shaping and sizing that restores your landscape's polished look",
            "Promotion of healthy growth, more flowering, and fuller plants",
            "Prevention of disease and pest issues through proper pruning",
            "Complete cleanup with all debris removed from your property",
            "Timing recommendations for optimal plant health year-round"
          ]}
        />

        {/* What's Included Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              What's Included in Our Pruning Service
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Complete service from assessment to cleanup—no extra charges for debris removal.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Professional Assessment", desc: "We evaluate each shrub's species, health, and optimal timing before cutting" },
                { title: "Precision Trimming", desc: "Sharp, sanitized tools for clean cuts that heal quickly and prevent disease" },
                { title: "Shape Restoration", desc: "Return overgrown shrubs to their natural or desired form" },
                { title: "Dead Wood Removal", desc: "Remove all dead, diseased, or damaged branches to promote health" },
                { title: "Size Control", desc: "Keep plants at appropriate heights for your landscape design" },
                { title: "Complete Cleanup", desc: "All trimmings bagged and removed—property left spotless" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* When to Prune - Timing Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              When to Prune in Wisconsin
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-2 border-primary rounded-lg p-8 shadow-md relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Best Time
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">Late Winter / Early Spring</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  February through early April—before new growth begins—is ideal for most shrubs in Dane County.
                  Plants are dormant, making it easier to see structure and shape.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    Best for: Most deciduous shrubs
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    Promotes vigorous spring growth
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    Less stress on plants
                  </li>
                </ul>
              </div>

              <div className="border border-border rounded-lg p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">After Flowering</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Spring-blooming shrubs (lilacs, forsythia, rhododendrons) should be pruned immediately after
                  flowering to avoid cutting off next year's buds.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    Best for: Flowering shrubs
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    Preserves next year's blooms
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    Shapes without sacrificing flowers
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
              <strong>Not sure when your shrubs should be pruned?</strong> We'll assess your specific plants and recommend the optimal timing for each species in your landscape.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Benefits of Professional Pruning
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Enhanced Curb Appeal", desc: "Well-maintained shrubs instantly elevate your property's appearance and value" },
                { title: "Healthier Plants", desc: "Proper pruning improves air circulation and reduces disease and pest problems" },
                { title: "Better Flowering", desc: "Correct timing and technique leads to more blooms and fuller growth" },
                { title: "Controlled Growth", desc: "Keep plants at appropriate sizes without constant maintenance battles" },
                { title: "Safety & Access", desc: "Clear walkways, windows, and sight lines for safety and functionality" },
                { title: "Long-Term Savings", desc: "Regular maintenance prevents costly replacements and major restorations" }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Before/After Gallery */}
        <BeforeAfterGallery items={beforeAfterItems} />

        {/* Why Choose Us */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              Why Madison Homeowners Trust TotalGuard
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We're not the cheapest, but we're the most reliable. Here's what you can expect:
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-muted/30 rounded-lg">
                <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Scissors className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Species Knowledge</h3>
                <p className="text-sm text-muted-foreground">
                  We know which shrubs thrive in Wisconsin and how each species should be pruned for optimal health.
                </p>
              </div>
              <div className="text-center p-6 bg-muted/30 rounded-lg">
                <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Fully Insured</h3>
                <p className="text-sm text-muted-foreground">
                  Complete liability coverage protects your property. You'll never worry about damage or accidents.
                </p>
              </div>
              <div className="text-center p-6 bg-muted/30 rounded-lg">
                <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">On-Time Service</h3>
                <p className="text-sm text-muted-foreground">
                  We show up when we say we will—and finish the job completely before we leave.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Pruning Service Pricing
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Pricing depends on the number of shrubs, their size, current condition, and accessibility. Most Madison-area homes with 10-20 shrubs range from <strong>$200-$500</strong> for complete pruning. We provide detailed, upfront estimates with no hidden fees.
            </p>
            <div className="bg-background rounded-lg p-6 max-w-md mx-auto mb-8 border border-border">
              <p className="font-semibold text-foreground mb-2">Maintenance Plans Available</p>
              <p className="text-sm text-muted-foreground">
                Book annual or semi-annual pruning and save. Consistent maintenance keeps shrubs healthy and costs predictable.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href="/contact?service=pruning">Get Your Free Quote</Link>
            </Button>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              Complete Your Landscape Care
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Pruning pairs well with these services for a fully polished property:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link
                href="/services/mulching"
                className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Mulching</h3>
                <p className="text-sm text-muted-foreground">Fresh mulch completes the polished look after pruning</p>
              </Link>
              <Link
                href="/services/weeding"
                className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Weeding</h3>
                <p className="text-sm text-muted-foreground">Clear beds for a clean, professional appearance</p>
              </Link>
              <Link
                href="/services/garden-beds"
                className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Garden Beds</h3>
                <p className="text-sm text-muted-foreground">Full bed renovation for a complete transformation</p>
              </Link>
            </div>
          </div>
        </section>

        <ResidentialHomeownerTypesSection serviceName="bush trimming and pruning" />
        <ResidentialExpectationsSection serviceName="bush trimming and pruning" />

        <ServiceFAQ faqs={pruningFAQs} />
        <CTASection
          title="Ready for Beautifully Trimmed Landscaping?"
          description="Transform overgrown bushes into polished, healthy shrubs. Professional pruning services across Madison, Middleton, Waunakee, and all of Dane County."
        />
        <Footer />
      </div>
    </>
  );
}
