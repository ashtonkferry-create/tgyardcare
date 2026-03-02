'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { ServiceSchema } from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Phone, ArrowRight, Wind, Droplets, Sprout, Building2, Calendar, FileText, ClipboardCheck } from "lucide-react";
import heroImage from "@/assets/hero-aeration.jpg";
import ServiceFAQ from "@/components/ServiceFAQ";
import { commercialAerationFAQs } from "@/data/serviceFAQs";
import { CommercialInsuranceBanner } from "@/components/CommercialInsuranceBanner";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

const services = [
  {
    icon: Wind,
    title: "Core aeration",
    description: "Commercial-grade core aeration to reduce soil compaction on high-traffic turf areas.",
    items: ["3-4 inch core depth", "Optimal plug spacing for commercial turf", "High-traffic area priority", "Complete property coverage"]
  },
  {
    icon: Droplets,
    title: "Water and nutrient penetration",
    description: "Improved irrigation efficiency and fertilizer uptake across large commercial properties.",
    items: ["Enhanced irrigation efficiency", "Better fertilizer absorption", "Reduced water runoff", "Deeper root development"]
  },
  {
    icon: Sprout,
    title: "Turf recovery programs",
    description: "Complete aeration packages with overseeding and fertilization for damaged or thin commercial turf.",
    items: ["Commercial seed blends", "Starter fertilization", "Thatch reduction", "Long-term turf density improvement"]
  }
];

const propertyTypes = [
  { name: "HOA Communities", description: "Common areas, entrances, and high-traffic lawn zones" },
  { name: "Apartment Complexes", description: "Compacted turf from resident foot traffic and pet areas" },
  { name: "Office Parks", description: "Corporate lawns requiring professional appearance" },
  { name: "Athletic Fields", description: "Sports turf requiring compaction relief and recovery" },
  { name: "Educational Campuses", description: "High-traffic lawns and common areas" },
  { name: "Retail Properties", description: "Customer-facing grounds and signage areas" }
];

const timingSchedule = [
  {
    season: "Fall (September–October)",
    priority: "Primary",
    description: "Best timing for cool-season grasses. Aeration before winter dormancy promotes spring recovery and root development."
  },
  {
    season: "Spring (April–May)",
    priority: "Secondary",
    description: "Good option for properties that missed fall service. Schedule before summer stress to maximize root growth."
  },
  {
    season: "Summer",
    priority: "Not recommended",
    description: "Aeration during summer heat stress can damage turf. We do not perform summer aeration on cool-season grasses."
  }
];

const pricingStructure = [
  {
    title: "Per-service billing",
    description: "Single aeration visit priced by property size. Ideal for annual scheduling."
  },
  {
    title: "Annual turf program",
    description: "Aeration bundled with fertilization and weed control. Best value for comprehensive turf management."
  },
  {
    title: "Multi-property discount",
    description: "Volume pricing for property managers with multiple locations. Same crew, same standards across sites."
  }
];

const qualityStandards = [
  "Commercial-grade aerators designed for large properties",
  "Minimum 10-12 cores per square foot",
  "Cores left on surface to decompose naturally",
  "High-traffic areas receive double-pass treatment",
  "Service documentation with coverage verification",
  "Scheduling coordinated with irrigation systems"
];

export default function CommercialAerationContent() {
  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Commercial', url: 'https://tgyardcare.com/commercial' },
        { name: 'Aeration', url: 'https://tgyardcare.com/commercial/aeration' }
      ]} />
      <ServiceSchema
        serviceName="Commercial Aeration Services"
        description="Professional commercial lawn aeration services for property managers, HOAs, and commercial facilities in Madison, Wisconsin."
        serviceType="Commercial Aeration"
        areaServed={["Madison", "Middleton", "Sun Prairie", "Fitchburg", "Verona", "Waunakee"]}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides commercial lawn aeration for HOAs, property managers, and businesses in Madison, Wisconsin. Core aeration reduces soil compaction on high-traffic turf. $1M liability coverage. Service documentation provided. Call (608) 535-6057 for a property assessment.</p>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-20 md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional commercial lawn aeration for property managers in Madison, Wisconsin"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <p className="text-accent font-semibold mb-3 text-sm md:text-base tracking-wide uppercase">Commercial Turf Management</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Commercial Lawn <span className="text-accent">Aeration</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
              Reduce soil compaction, improve drainage, and restore turf health across your commercial property. Scheduled around business operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" variant="accent" className="w-full sm:w-auto tap-target text-base md:text-lg font-bold" asChild>
                <Link href="/contact?service=commercial-aeration">
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
              Commercial aeration for property operations
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Designed for property managers and facility directors managing high-traffic turf that shows compaction stress, thin growth, or poor drainage.
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

      {/* Why Commercial Properties Need Aeration */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why commercial turf needs aeration
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Commercial properties face higher compaction stress than residential lawns. Foot traffic, vehicle access, and dense clay soils create conditions that standard maintenance cannot address.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="text-xl font-bold text-foreground mb-3">High-traffic compaction</h3>
                <p className="text-muted-foreground">Commercial properties see 10x more foot traffic than residential lawns. This compacts soil, restricts root growth, and creates thin, stressed turf.</p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="text-xl font-bold text-foreground mb-3">Poor drainage issues</h3>
                <p className="text-muted-foreground">Compacted soil prevents water absorption, causing puddling, runoff, and dry spots. Aeration restores drainage and improves irrigation efficiency.</p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="text-xl font-bold text-foreground mb-3">Fertilizer waste</h3>
                <p className="text-muted-foreground">Without aeration, fertilizer sits on the surface and runs off. Aeration ensures nutrients reach the root zone where they're actually used.</p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="text-xl font-bold text-foreground mb-3">Thatch buildup</h3>
                <p className="text-muted-foreground">Commercial turf develops thatch layers that block water and nutrients. Aeration breaks up thatch and accelerates decomposition.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6">
              Commercial aeration service scope
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Complete aeration solutions for commercial properties including core aeration, overseeding, and turf recovery programs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="bg-background p-6 md:p-8 rounded-xl border border-border">
                <div className="bg-primary/10 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-5 md:mb-6" aria-hidden="true">
                  <service.icon className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">{service.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground mb-5 md:mb-6">{service.description}</p>
                <ul className="space-y-2 md:space-y-3">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timing Schedule */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Commercial aeration timing
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Timing is critical for aeration effectiveness. Wisconsin's climate dictates specific windows for optimal results.
              </p>
            </div>
            <div className="space-y-6">
              {timingSchedule.map((period, index) => (
                <div key={index} className="bg-card p-6 rounded-xl border border-border">
                  <div className="flex items-start gap-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      period.priority === "Primary" ? "bg-primary text-primary-foreground" :
                      period.priority === "Secondary" ? "bg-accent text-accent-foreground" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {period.priority}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{period.season}</h3>
                      <p className="text-muted-foreground">{period.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Commercial service standards
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                What you can expect from every commercial aeration service.
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
                Transparent pricing options for commercial property budgeting.
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
                Commercial aeration typically ranges from <strong className="text-foreground">$150–$600</strong> depending on property size. Multi-property and annual program discounts available.
              </p>
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
              Aeration works best when combined with fertilization and overseeding for comprehensive turf recovery.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/commercial/fertilization-weed-control">Fertilization & Weed Control</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/commercial/lawn-care">Lawn Care Contracts</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/commercial/seasonal">Seasonal Cleanups</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ServiceFAQ faqs={commercialAerationFAQs} />
      <CTASection />
      <Footer />
    </div>
  );
}
