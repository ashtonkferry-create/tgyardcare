'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ServiceSchema } from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Phone, ArrowRight, Shield, Droplets, FileText, Calendar, AlertTriangle, Building2, ClipboardCheck } from "lucide-react";
import heroImage from "@/assets/service-gutter.jpg";
import ServiceFAQ from "@/components/ServiceFAQ";
import { commercialGutterServicesFAQs } from "@/data/serviceFAQs";
import { CommercialInsuranceBanner } from "@/components/CommercialInsuranceBanner";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { AmbientParticles } from "@/components/AmbientParticles";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

const services = [
  {
    icon: Droplets,
    title: "Commercial gutter cleaning",
    description: "Complete debris removal, downspout flushing, and drainage verification for multi-story and large-footprint commercial buildings.",
    items: ["Full debris extraction", "Downspout clearing and testing", "Drainage flow verification", "Photo documentation per service"]
  },
  {
    icon: Shield,
    title: "Gutter guard installation",
    description: "Commercial-grade guard systems designed for high-debris environments and extended service intervals.",
    items: ["Heavy-duty mesh systems", "Professional installation", "Multi-year warranty", "Reduced long-term maintenance costs"]
  }
];

const propertyTypes = [
  { name: "HOA Communities", description: "Multi-unit buildings with shared gutter systems" },
  { name: "Apartment Complexes", description: "High-density properties requiring scheduled maintenance" },
  { name: "Office Buildings", description: "Multi-story commercial structures" },
  { name: "Retail Centers", description: "Strip malls and shopping plazas" },
  { name: "Industrial Properties", description: "Warehouses and manufacturing facilities" },
  { name: "Medical & Educational", description: "Campuses with compliance requirements" }
];

const liabilityBenefits = [
  {
    title: "Water damage prevention",
    description: "Clogged gutters cause foundation damage, basement flooding, and landscape erosion—all preventable liability exposures."
  },
  {
    title: "Ice dam prevention",
    description: "Proper drainage reduces ice dam formation that creates slip hazards and roof damage during Wisconsin winters."
  },
  {
    title: "Documentation for claims",
    description: "Photo records and service logs provide evidence of proactive maintenance if damage claims arise."
  },
  {
    title: "Compliance maintenance",
    description: "Regular gutter service supports property maintenance standards required by many commercial leases and HOA covenants."
  }
];

const pricingStructure = [
  {
    title: "Per-service billing",
    description: "Billed per cleaning visit. Ideal for properties with predictable, light debris accumulation."
  },
  {
    title: "Seasonal contract",
    description: "Two scheduled cleanings (spring and fall) at fixed pricing. Most common for commercial properties."
  },
  {
    title: "Annual maintenance agreement",
    description: "Quarterly inspections with cleanings as needed. Best for properties with heavy tree coverage or critical drainage requirements."
  }
];

const qualityStandards = [
  "Complete debris removal from all gutter runs",
  "Downspout flushing with water flow verification",
  "Ground-level cleanup of any fallen debris",
  "Visual inspection for damage or deterioration",
  "Photo documentation before and after service",
  "Service completion report within 24 hours"
];

export default function CommercialGutterServicesContent() {
  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Commercial', url: 'https://tgyardcare.com/commercial' },
        { name: 'Gutter Services', url: 'https://tgyardcare.com/commercial/gutters' }
      ]} />
      <ServiceSchema
        serviceName="Commercial Gutter Services"
        description="Professional commercial gutter cleaning and guard installation for property managers, HOAs, and commercial facilities in Madison, Wisconsin."
        serviceType="Commercial Gutter Services"
        areaServed={["Madison", "Middleton", "Sun Prairie", "Fitchburg", "Verona", "Waunakee"]}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides commercial gutter cleaning and guard installation for HOAs, property managers, and businesses in Madison, Wisconsin. Photo documentation, seasonal contracts, and ice dam prevention. $1M liability coverage. Call (608) 535-6057.</p>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-20 md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional commercial gutter cleaning and maintenance for property managers in Madison, Wisconsin"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/50 to-[#0a1f14]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
        </div>
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <p className="text-accent font-semibold mb-3 text-sm md:text-base tracking-wide uppercase">Commercial Property Maintenance</p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Commercial Gutter <span className="text-accent">Maintenance</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
              Documented gutter maintenance that reduces liability exposure and protects your property investment. Photo records with every service.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" variant="accent" className="text-base md:text-lg font-bold" asChild>
                <Link href="/contact?service=commercial-gutter">
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
              Commercial gutter maintenance for property operations
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Designed for property managers and facility directors who need documented, scheduled gutter maintenance—not reactive service calls after damage occurs.
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

      {/* Liability and Risk Reduction */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <AlertTriangle className="h-12 w-12 text-accent mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Liability reduction through proactive maintenance
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Neglected gutters create liability exposure. Documented maintenance protects your property and your organization.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {liabilityBenefits.map((benefit, index) => (
                <div key={index} className="bg-card p-6 rounded-xl border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Commercial gutter service scope
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Complete gutter maintenance solutions designed for commercial-scale properties with documentation and accountability.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="bg-background p-8 rounded-xl border border-border">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
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

      {/* Quality Standards */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Service quality standards
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                What you can expect from every commercial gutter service visit.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {qualityStandards.map((standard, index) => (
                <div key={index} className="flex items-start bg-card p-4 rounded-lg border border-border">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{standard}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Structure */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Commercial pricing structure
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Flexible contract options for commercial property budgeting and maintenance planning.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingStructure.map((option, index) => (
                <div key={index} className="bg-background p-6 rounded-xl border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-3">{option.title}</h3>
                  <p className="text-muted-foreground">{option.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Commercial gutter cleaning typically ranges from <strong className="text-foreground">$200–$800</strong> per service depending on building size and accessibility. Guard installation quoted per linear foot.
              </p>
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
                Commercial service process
              </h2>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Property assessment</h3>
                  <p className="text-muted-foreground">We evaluate gutter length, building height, accessibility, and debris accumulation patterns to determine service scope.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Maintenance plan proposal</h3>
                  <p className="text-muted-foreground">You receive a detailed maintenance proposal with recommended frequency, service scope, and pricing options.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Scheduled service execution</h3>
                  <p className="text-muted-foreground">Services performed on schedule with photo documentation and completion confirmation.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Documentation and reporting</h3>
                  <p className="text-muted-foreground">Service reports with before/after photos provided for your records and board communications.</p>
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
              Many commercial properties bundle gutter maintenance with seasonal services for comprehensive property care.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/commercial/seasonal">Seasonal Cleanups</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/commercial/lawn-care">Lawn Care Contracts</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/commercial/snow-removal">Snow Removal</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ServiceFAQ faqs={commercialGutterServicesFAQs} />
      <Footer />
    </div>
  );
}
