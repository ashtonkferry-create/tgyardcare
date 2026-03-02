'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { ServiceSchema } from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Phone, ArrowRight, Leaf, Sparkles, Wind, Building2, Calendar, FileText, ClipboardCheck } from "lucide-react";
import heroImage from "@/assets/service-spring-cleanup.jpg";
import ServiceFAQ from "@/components/ServiceFAQ";
import { commercialSeasonalServicesFAQs } from "@/data/serviceFAQs";
import { CommercialInsuranceBanner } from "@/components/CommercialInsuranceBanner";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

const services = [
  {
    icon: Sparkles,
    title: "Commercial spring cleanup",
    description: "Comprehensive spring preparation to transition your property from winter dormancy to growing season readiness.",
    items: ["Winter debris removal", "Bed preparation and edging", "Initial mowing and edging", "Property condition assessment", "Drainage inspection"]
  },
  {
    icon: Leaf,
    title: "Commercial fall cleanup",
    description: "End-of-season maintenance to protect your property through winter and ensure spring readiness.",
    items: ["Complete leaf removal", "Final mowing and edging", "Bed cleanup and cutback", "Winterization preparation", "Gutter cleaning integration"]
  },
  {
    icon: Wind,
    title: "Commercial leaf removal",
    description: "Ongoing leaf management throughout fall to maintain professional appearance and prevent turf damage.",
    items: ["Weekly removal during peak drop", "Bed and common area clearing", "Parking lot and walkway cleanup", "Complete debris hauling"]
  }
];

const propertyTypes = [
  { name: "HOA Communities", description: "Common areas, entrances, and multi-unit grounds" },
  { name: "Apartment Complexes", description: "High-visibility areas and resident common spaces" },
  { name: "Office Parks", description: "Corporate campuses and executive building grounds" },
  { name: "Retail Centers", description: "Customer-facing areas and parking lot perimeters" },
  { name: "Industrial Properties", description: "Facility perimeters and entrance areas" },
  { name: "Educational Campuses", description: "Athletic fields, walkways, and common areas" }
];

const springScope = [
  "Remove winter debris, branches, and accumulated leaves",
  "Clear beds of dead plant material and winter mulch",
  "Re-edge all bed borders and hardscape lines",
  "Initial mowing once turf is dry and growing",
  "Assess property for winter damage or needed repairs",
  "Document condition for property management records"
];

const fallScope = [
  "Complete leaf removal from all turf and bed areas",
  "Final mowing at appropriate height for winter",
  "Cut back perennials and ornamental grasses",
  "Clean and inspect gutters (if contracted)",
  "Remove annual plantings and prepare beds for winter",
  "Document end-of-season property condition"
];

const pricingStructure = [
  {
    title: "Per-cleanup pricing",
    description: "Single spring or fall cleanup priced by property size. Best for properties with limited seasonal needs."
  },
  {
    title: "Seasonal contract",
    description: "Fixed pricing for spring cleanup, fall cleanup, and weekly leaf removal during peak season."
  },
  {
    title: "Annual grounds contract",
    description: "Seasonal services bundled with lawn care, fertilization, and snow removal. Best rates for full-scope properties."
  }
];

const differentiators = [
  {
    title: "Scheduled completion windows",
    description: "Spring cleanup completed by specified date. Fall cleanup finished before first snow. No open-ended timelines."
  },
  {
    title: "Written scope definition",
    description: "Detailed scope documents define exactly what's included. No disputes about what constitutes 'cleanup.'"
  },
  {
    title: "Same crew coordination",
    description: "Your seasonal crew is the same team that handles ongoing maintenance. Familiarity with your property's needs."
  },
  {
    title: "Priority scheduling",
    description: "Contracted properties receive priority scheduling during peak demand. No waiting behind one-time customers."
  }
];

export default function CommercialSeasonalContent() {
  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Commercial', url: 'https://tgyardcare.com/commercial' },
        { name: 'Seasonal Services', url: 'https://tgyardcare.com/commercial/seasonal' }
      ]} />
      <ServiceSchema
        serviceName="Commercial Seasonal Services"
        description="Professional commercial seasonal cleanup and maintenance for property managers, HOAs, and commercial facilities in Madison, Wisconsin."
        serviceType="Commercial Seasonal Services"
        areaServed={["Madison", "Middleton", "Sun Prairie", "Fitchburg", "Verona", "Waunakee"]}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides commercial spring and fall cleanup services for HOAs, property managers, and businesses in Madison, Wisconsin. Priority scheduling, documented service, and complete property preparation. $1M liability coverage. Call (608) 535-6057.</p>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-20 md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional commercial seasonal cleanup and maintenance for property managers in Madison, Wisconsin"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <p className="text-accent font-semibold mb-3 text-sm md:text-base tracking-wide uppercase">Commercial Property Maintenance</p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Commercial Seasonal <span className="text-accent">Services</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
              Scheduled seasonal transitions with clear scope, completion dates, and documentation. No surprises at budget time, no open-ended timelines.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" variant="accent" className="text-base md:text-lg font-bold" asChild>
                <Link href="/contact?service=commercial-seasonal">
                  Request Commercial Quote <ArrowRight className="ml-2 h-5 w-5" />
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

      <CommercialInsuranceBanner />

      {/* Who This Is For */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Commercial seasonal maintenance for property operations
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Designed for property managers and facility directors who need seasonal transitions completed on schedule with documented scope—not vague cleanup promises that drag into the next season.
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

      {/* What Makes Us Different */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                What separates us from seasonal-only contractors
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Most cleanup contractors appear in spring, disappear, then reappear in fall with excuses about timing. We operate on documented schedules.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {differentiators.map((item, index) => (
                <div key={index} className="bg-card p-6 rounded-xl border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Commercial seasonal service scope
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Complete seasonal maintenance programs designed for commercial properties requiring predictable scheduling and documented completion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="bg-background p-8 rounded-xl border border-border">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6" aria-hidden="true">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spring Cleanup Details */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Commercial spring cleanup scope
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Spring cleanup typically scheduled March–May depending on ground conditions. Completion guaranteed before Memorial Day.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {springScope.map((item, index) => (
                <div key={index} className="flex items-start bg-card p-4 rounded-lg border border-border">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fall Cleanup Details */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Leaf className="h-12 w-12 text-accent mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Commercial fall cleanup scope
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Fall cleanup scheduled October–November. Completion guaranteed before first significant snowfall.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fallScope.map((item, index) => (
                <div key={index} className="flex items-start bg-background p-4 rounded-lg border border-border">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
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
                Flexible contract options for commercial property budgeting and annual planning.
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
              <p className="text-muted-foreground">
                Commercial spring or fall cleanup typically ranges from <strong className="text-foreground">$400–$1,500</strong> depending on property size and scope. Weekly leaf removal priced separately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Annual Calendar */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Commercial seasonal calendar
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Seasonal services follow Wisconsin's climate with built-in flexibility for weather variations.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-background p-6 rounded-xl border border-border">
                <h3 className="text-lg font-bold text-foreground mb-2">March–April: Spring cleanup window</h3>
                <p className="text-muted-foreground">Ground thaw through active growth. Cleanup scheduled when soil is workable but before peak mowing season.</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <h3 className="text-lg font-bold text-foreground mb-2">May–September: Regular maintenance</h3>
                <p className="text-muted-foreground">Ongoing lawn care, bed maintenance, and property upkeep during growing season.</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <h3 className="text-lg font-bold text-foreground mb-2">October–November: Fall cleanup window</h3>
                <p className="text-muted-foreground">Leaf drop through first freeze. Weekly leaf removal during peak season, final cleanup before snow.</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <h3 className="text-lg font-bold text-foreground mb-2">December–February: Snow removal</h3>
                <p className="text-muted-foreground">Winter operations for contracted properties. Seamless transition from seasonal to snow services.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Commercial Services */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Integrate with other commercial services
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8">
              Most commercial properties bundle seasonal services with lawn care and snow removal for complete grounds management.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/commercial/lawn-care">Lawn Care Contracts</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/commercial/snow-removal">Snow Removal</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/commercial/gutters">Gutter Maintenance</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ServiceFAQ faqs={commercialSeasonalServicesFAQs} />
      <CTASection />
      <Footer />
    </div>
  );
}
