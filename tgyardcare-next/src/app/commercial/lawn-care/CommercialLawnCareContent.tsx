'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { ServiceSchema } from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Phone, ArrowRight, Building2, Scissors, Clock, FileText, Users, Shield, Calendar, ClipboardCheck } from "lucide-react";
import heroImage from "@/assets/service-mowing.jpg";
import ServiceFAQ from "@/components/ServiceFAQ";
import { commercialLawnCareFAQs } from "@/data/serviceFAQs";
import { CommercialInsuranceBanner } from "@/components/CommercialInsuranceBanner";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

const serviceScope = [
  {
    icon: Scissors,
    title: "Weekly mowing and edging",
    description: "Consistent cut schedules maintained across your entire property—no variation between crews or visits."
  },
  {
    icon: Clock,
    title: "Flexible scheduling",
    description: "Service windows scheduled outside peak business hours. Early morning, late afternoon, or weekend options available."
  },
  {
    icon: FileText,
    title: "Service documentation",
    description: "Every visit logged with timestamp, crew ID, and completion status. Monthly reports available for property management."
  },
  {
    icon: Users,
    title: "Dedicated crew assignment",
    description: "Same crew every visit. Consistent standards, familiar faces, and accountability you can track."
  }
];

const propertyTypes = [
  { name: "HOA Communities", description: "Common areas, entrances, and individual unit grounds" },
  { name: "Apartment Complexes", description: "Multi-building properties with high-traffic turf areas" },
  { name: "Office Parks", description: "Professional grounds that reflect corporate standards" },
  { name: "Retail Centers", description: "Parking lot perimeters, entrances, and signage areas" },
  { name: "Industrial Properties", description: "Perimeter maintenance and facility grounds" },
  { name: "Medical & Educational", description: "Campuses requiring ADA compliance and safety standards" }
];

const pricingStructure = [
  {
    title: "Seasonal contract",
    description: "Fixed monthly billing for the growing season (April–October). Predictable budgeting with no per-visit invoicing."
  },
  {
    title: "Per-visit billing",
    description: "Billed per service for properties preferring variable scheduling. Minimum commitment required."
  },
  {
    title: "Annual agreement",
    description: "12-month contract integrating lawn care with seasonal services. Best rates for full-scope properties."
  }
];

const qualityStandards = [
  "Same crew, same schedule, same standards—every visit",
  "3-3.5 inch cut height maintained per industry best practices",
  "Edging along all hardscapes, curbs, and bed borders",
  "Clippings mulched or removed based on contract specification",
  "Debris removal from walkways, parking areas, and common zones",
  "Post-service property walkthrough before departure"
];

export default function CommercialLawnCareContent() {
  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Commercial', url: 'https://tgyardcare.com/commercial' },
        { name: 'Lawn Care', url: 'https://tgyardcare.com/commercial/lawn-care' }
      ]} />
      <ServiceSchema
        serviceName="Commercial Lawn Care Services"
        description="Professional commercial lawn maintenance for property managers, HOAs, and commercial facilities in Madison, Wisconsin."
        serviceType="Commercial Lawn Care"
        areaServed={["Madison", "Middleton", "Sun Prairie", "Fitchburg", "Verona", "Waunakee"]}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides commercial lawn mowing for HOAs, property managers, and businesses in Madison, Wisconsin. Dedicated crews, documented visits, and flexible contracts. $1M liability coverage. Call (608) 535-6057 for a property assessment.</p>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-20 md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional commercial lawn mowing and property maintenance for businesses in Madison, Wisconsin"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <p className="text-accent font-semibold mb-3 text-sm md:text-base tracking-wide uppercase">Commercial Property Maintenance</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Commercial Lawn Care <span className="text-accent">Contracts</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
              Predictable, documented lawn maintenance for property managers who need reliability—not excuses. Same crew, same schedule, zero missed visits.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" variant="accent" className="w-full sm:w-auto tap-target text-base md:text-lg font-bold" asChild>
                <Link href="/contact?service=commercial-lawn-care">
                  Request Commercial Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900 tap-target text-base md:text-lg" asChild>
                <a href="tel:608-535-6057">
                  <Phone className="mr-2 h-5 w-5" />
                  (608) 535-6057
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CommercialInsuranceBanner />

      {/* Who This Is For */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for commercial property operations
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              This service is designed for property managers, facility directors, and HOA boards who need grounds maintenance that operates like a system—not a favor from a local contractor.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {propertyTypes.map((type, index) => (
              <div key={index} className="bg-background p-6 rounded-lg border border-border">
                <Building2 className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">{type.name}</h3>
                <p className="text-muted-foreground text-sm">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included at Scale */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Commercial-scale service scope
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Every element of grounds maintenance documented, scheduled, and executed with commercial-grade consistency.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {serviceScope.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Service quality standards
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                What you can expect from every visit—documented and verifiable.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {qualityStandards.map((standard, index) => (
                <div key={index} className="flex items-start bg-background p-4 rounded-lg border border-border">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{standard}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Structure */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Commercial pricing structure
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Transparent contract options designed for commercial budgeting and property management accounting.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingStructure.map((option, index) => (
                <div key={index} className="bg-card p-6 rounded-xl border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-3">{option.title}</h3>
                  <p className="text-muted-foreground">{option.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                Commercial quotes are based on property size, service frequency, and contract term. Most HOAs and apartment complexes see monthly rates between <strong className="text-foreground">$400–$1,500</strong> depending on scope.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                What separates us from low-bid contractors
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <Shield className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Accountability systems</h3>
                <p className="text-muted-foreground">
                  Every visit logged with crew ID, timestamp, and completion status. No wondering if service happened—you'll have records.
                </p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <Calendar className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Consistent scheduling</h3>
                <p className="text-muted-foreground">
                  Same day, same crew, same standards. Your property won't be pushed down the priority list during busy weeks.
                </p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <ClipboardCheck className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Documentation for boards</h3>
                <p className="text-muted-foreground">
                  Monthly service reports, issue tracking, and compliance records ready for board meetings and owner communications.
                </p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <Users className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Direct communication</h3>
                <p className="text-muted-foreground">
                  Dedicated point of contact for scheduling changes, concerns, or urgent requests. No call centers or dispatch runaround.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                How commercial contracts work
              </h2>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Property walkthrough</h3>
                  <p className="text-muted-foreground">We assess your property in person—measuring turf areas, identifying access points, and documenting any special requirements or problem areas.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Custom scope and bid</h3>
                  <p className="text-muted-foreground">You receive a detailed proposal outlining service scope, schedule, pricing structure, and contract terms. No vague line items or hidden fees.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Contract execution</h3>
                  <p className="text-muted-foreground">Once approved, we assign your dedicated crew, confirm your service day, and begin operations on your agreed start date.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Ongoing accountability</h3>
                  <p className="text-muted-foreground">Service logs, monthly reports, and direct communication ensure you always know what's happening on your property.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Commercial Services */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Integrate with other commercial services
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8">
              Most commercial properties bundle lawn care with seasonal and specialty services for comprehensive grounds management.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/commercial/fertilization-weed-control">Fertilization & Weed Control</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/commercial/seasonal">Seasonal Cleanups</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/commercial/snow-removal">Snow Removal</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/commercial/property-enhancement">Property Enhancement</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ServiceFAQ faqs={commercialLawnCareFAQs} />
      <CTASection />
      <Footer />
    </div>
  );
}
