'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { ServiceSchema } from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Phone, ArrowRight, Shield, Leaf, Target, Calendar, Clock, AlertTriangle } from "lucide-react";
import heroImage from "@/assets/service-herbicide.jpg";
import herbicideCombined from "@/assets/before-after/herbicide-combined.png";
import ServiceFAQ from "@/components/ServiceFAQ";
import { herbicideFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function HerbicideContent() {
  const beforeAfterItems = [
    { combinedImage: herbicideCombined }
  ];

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Herbicide', url: 'https://tgyardcare.com/services/herbicide' }
      ]} />
      <ServiceSchema
        serviceName="Professional Weed Control & Herbicide Services"
        description="Safe, effective herbicide treatments for weed elimination and prevention across Madison, Middleton, Waunakee, Sun Prairie, and all Dane County."
        serviceType="Herbicide Application"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Monona', 'Fitchburg', 'Verona', 'McFarland', 'DeForest', 'Cottage Grove', 'Oregon', 'Stoughton']}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides weed control and herbicide treatments in Madison and Dane County, Wisconsin. Licensed applicators use safe pre-emergent and post-emergent options. Call (608) 535-6057 for a free quote.</p>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-20 md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional herbicide application service showing lawn care technician spraying weed control treatment on residential lawn"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Weed Control in <span className="text-accent">Madison & Dane County</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
              Wisconsin's short summers mean weeds compete hard for your lawn. Professional herbicide treatments target weeds at the root while keeping your grass, family, and pets safe.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" variant="accent" className="text-base md:text-lg font-bold" asChild>
                <Link href="/contact?service=herbicide">
                  Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
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
      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-foreground">
              <strong>Ideal for:</strong> Homeowners battling persistent weeds like dandelions, crabgrass, and clover. Perfect for lawns that need both elimination of existing weeds and prevention of new ones.
            </p>
          </div>
        </div>
      </section>

      <ResidentialProblemSection
        serviceName="Herbicide Treatment"
        problemPoints={[
          "Weeds spreading rapidly and taking over your lawn and garden beds",
          "Store-bought weed killers that don't work or burn your grass",
          "Dandelions, crabgrass, and clover ruining your lawn's appearance",
          "Weed regrowth every season despite your best DIY efforts",
          "Improper herbicide timing that wastes money and misses the problem"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Herbicide Treatment"
        solutionPoints={[
          "Professional-grade herbicides more effective than consumer products",
          "Pre-emergent treatments preventing weeds before they start",
          "Selective herbicides that target weeds while keeping grass healthy",
          "Expert timing for maximum effectiveness based on weed type",
          "Safe application protecting your family, pets, and environment"
        ]}
      />

      {/* What's Included */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            What's Included in Our Weed Control Service
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Complete weed management tailored to your lawn's specific needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Lawn Assessment", desc: "We identify your specific weed types and develop a targeted treatment plan" },
              { title: "Targeted Application", desc: "Professional sprayers ensure even coverage without waste or overspray" },
              { title: "Selective Herbicides", desc: "Products that kill weeds without harming your grass" },
              { title: "Pet & Family Safety", desc: "We advise on re-entry times and use products with strong safety profiles" },
              { title: "Follow-Up Check", desc: "We monitor results and retreat stubborn areas if needed" },
              { title: "Season-Long Program", desc: "Multiple applications timed to Wisconsin's weed cycles" }
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

      {/* Treatment Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Types of Herbicide Treatments
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Different weeds require different approaches. We use the right treatment at the right time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-muted/30 p-8 rounded-xl border border-border">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Pre-Emergent Treatments</h3>
              <p className="text-muted-foreground mb-6">
                Prevent weeds before they germinate. Applied in early spring before soil temperatures reach 55°F in Madison—typically late March to mid-April.
              </p>
              <ul className="space-y-3">
                {["Crabgrass prevention", "Annual weed control", "Spring application timing", "Fall application for winter annuals"].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-muted/30 p-8 rounded-xl border border-border">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Post-Emergent Treatments</h3>
              <p className="text-muted-foreground mb-6">
                Eliminate weeds that are actively growing. Best applied when weeds are young and actively growing—typically May through September in Wisconsin.
              </p>
              <ul className="space-y-3">
                {["Broadleaf weed control", "Dandelion elimination", "Clover treatment", "Thistle and plantain removal"].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-muted/30 p-8 rounded-xl border border-border">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Selective Herbicides</h3>
              <p className="text-muted-foreground mb-6">
                Target only weeds while leaving your grass unharmed. Professional-grade products work better and are safer than store-bought alternatives.
              </p>
              <ul className="space-y-3">
                {["Grass-safe formulas", "Targeted application", "Minimal lawn impact", "Fast visible results"].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timing Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            When to Apply Herbicide in Wisconsin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-background p-6 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Treatment Calendar</h3>
              </div>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-foreground min-w-[80px]">March-April:</span>
                  <span>Pre-emergent for crabgrass prevention</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-foreground min-w-[80px]">May-June:</span>
                  <span>Post-emergent for spring broadleaf weeds</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-foreground min-w-[80px]">July-Aug:</span>
                  <span>Spot treatments for persistent weeds</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-foreground min-w-[80px]">Sept-Oct:</span>
                  <span>Fall broadleaf control (most effective!)</span>
                </li>
              </ul>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Why Timing Matters</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Herbicide effectiveness depends heavily on timing. Apply too early or too late and you waste money with poor results.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  Pre-emergents must go down before weeds germinate
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  Post-emergents work best on actively growing weeds
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  Fall treatments target perennial weed roots
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <BeforeAfterGallery items={beforeAfterItems} />

      {/* Common Weeds Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Common Wisconsin Weeds We Eliminate
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Dane County's climate creates perfect conditions for these lawn invaders:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              "Dandelions",
              "Crabgrass",
              "Clover",
              "Creeping Charlie",
              "Thistle",
              "Plantain",
              "Chickweed",
              "Henbit",
              "Spurge"
            ].map((weed, index) => (
              <div key={index} className="bg-muted/30 p-4 rounded-lg border border-border flex items-center">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span className="text-foreground font-medium">{weed}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Safe for Your Family & Pets
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            We take safety seriously. Here's how we protect what matters most:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Licensed Application</h3>
              <p className="text-muted-foreground">
                Our technicians are certified and trained in proper herbicide handling and application techniques.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Clear Re-Entry Times</h3>
              <p className="text-muted-foreground">
                We advise on exactly when it's safe for kids and pets to return to treated areas—typically 2-4 hours after application dries.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Targeted Products</h3>
              <p className="text-muted-foreground">
                We use the minimum effective amount and target only problem areas rather than blanket spraying entire lawns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Weed Control Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Pricing depends on lawn size, weed severity, and treatment type. Most Madison residential lawns range from <strong>$75-$150 per application</strong>. Season-long programs (3-4 treatments) offer better results and value at <strong>$250-$400</strong> for the full season.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact?service=herbicide">Get Your Free Quote</Link>
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
            Weed control works best as part of a comprehensive lawn care approach:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/services/fertilization"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Fertilization</h3>
              <p className="text-sm text-muted-foreground">Thick grass naturally crowds out weeds</p>
            </Link>
            <Link
              href="/services/aeration"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Aeration</h3>
              <p className="text-sm text-muted-foreground">Healthier roots mean a stronger lawn</p>
            </Link>
            <Link
              href="/services/mowing"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Weekly Mowing</h3>
              <p className="text-sm text-muted-foreground">Proper mowing height suppresses weed growth</p>
            </Link>
          </div>
        </div>
      </section>

      <ResidentialHomeownerTypesSection serviceName="herbicide" />
      <ResidentialExpectationsSection serviceName="herbicide" />

      <ServiceFAQ faqs={herbicideFAQs} />

      <CTASection />
      <Footer />
    </div>
  );
}
