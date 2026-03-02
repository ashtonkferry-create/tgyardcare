'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { ServiceSchema } from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Phone, ArrowRight, Leaf, Shield, Sprout, FileText, Calendar, Building2, ClipboardCheck, AlertTriangle } from "lucide-react";
import heroImage from "@/assets/service-fertilization.jpg";
import ServiceFAQ from "@/components/ServiceFAQ";
import { commercialFertilizationWeedControlFAQs } from "@/data/serviceFAQs";
import { CommercialInsuranceBanner } from "@/components/CommercialInsuranceBanner";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { AmbientParticles } from "@/components/AmbientParticles";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

const services = [
  {
    icon: Sprout,
    title: "Commercial fertilization programs",
    description: "Custom fertilization schedules designed for high-traffic commercial turf that needs to look good under constant use.",
    items: ["4-6 applications per growing season", "Slow-release commercial-grade products", "Soil testing and nutrient optimization", "Coverage verified per application"]
  },
  {
    icon: Shield,
    title: "Weed control programs",
    description: "Pre-emergent and post-emergent treatments to maintain weed-free grounds that reflect professional standards.",
    items: ["Pre-emergent spring applications", "Post-emergent targeted treatments", "Broadleaf and grassy weed control", "Crabgrass prevention"]
  },
  {
    icon: Leaf,
    title: "Integrated turf management",
    description: "Complete turf health programs that combine fertilization, weed control, and disease prevention.",
    items: ["Disease prevention treatments", "Insect control as needed", "Overseeding recommendations", "Annual turf health assessments"]
  }
];

const propertyTypes = [
  { name: "HOA Communities", description: "Common areas, entrances, and community turf" },
  { name: "Apartment Complexes", description: "High-visibility grounds requiring consistent appearance" },
  { name: "Office Parks", description: "Corporate lawns that reflect business standards" },
  { name: "Retail Centers", description: "Customer-facing grounds and signage areas" },
  { name: "Industrial Properties", description: "Perimeter turf and facility entrances" },
  { name: "Educational Campuses", description: "Athletic fields and campus grounds" }
];

const complianceStandards = [
  {
    title: "Licensed applicators",
    description: "All treatments performed by Wisconsin-licensed commercial applicators with documented training and certifications."
  },
  {
    title: "Application documentation",
    description: "Every treatment logged with product name, rate, coverage area, applicator ID, and weather conditions."
  },
  {
    title: "Re-entry notifications",
    description: "Property managers receive application notices and re-entry guidelines for tenant and visitor safety."
  },
  {
    title: "EPA compliance",
    description: "All products EPA-registered and applied according to label requirements and commercial use guidelines."
  }
];

const pricingStructure = [
  {
    title: "Seasonal program",
    description: "Fixed pricing for 4-6 applications during growing season. Predictable budgeting with comprehensive coverage."
  },
  {
    title: "Per-application billing",
    description: "Billed per treatment for properties with variable needs or budget constraints."
  },
  {
    title: "Annual contract",
    description: "12-month agreement integrating fertilization with lawn care and seasonal services. Best rates for full-scope properties."
  }
];

const differentiators = [
  "Licensed applicators with commercial certifications",
  "Application records for compliance and auditing",
  "Proactive turf health monitoring—not reactive spot treatments",
  "Consistent coverage across entire property—no thin areas",
  "Direct communication with your account manager",
  "Integrated with mowing schedules for optimal timing"
];

export default function CommercialFertilizationWeedControlContent() {
  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Commercial', url: 'https://tgyardcare.com/commercial' },
        { name: 'Fertilization & Weed Control', url: 'https://tgyardcare.com/commercial/fertilization-weed-control' }
      ]} />
      <ServiceSchema
        serviceName="Commercial Fertilization & Weed Control Services"
        description="Professional commercial lawn fertilization and weed control programs for property managers, HOAs, and commercial facilities in Madison, Wisconsin."
        serviceType="Commercial Fertilization & Weed Control"
        areaServed={["Madison", "Middleton", "Sun Prairie", "Fitchburg", "Verona", "Waunakee"]}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides commercial fertilization and weed control for HOAs, property managers, and businesses in Madison, Wisconsin. Licensed applicators, 4-6 seasonal applications, and full documentation for compliance. $1M liability coverage. Call (608) 535-6057.</p>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-20 md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional commercial lawn fertilization and weed control for property managers in Madison, Wisconsin"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/50 to-[#0a1f14]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
        </div>
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <p className="text-accent font-semibold mb-3 text-sm md:text-base tracking-wide uppercase">Commercial Turf Management</p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Commercial Fertilization & <span className="text-accent">Weed Control</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
              Licensed applicators, documented treatments, and proactive turf management—not reactive spot spraying. Compliance-ready records for every application.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" variant="accent" className="text-base md:text-lg font-bold" asChild>
                <Link href="/contact?service=commercial-fertilization">
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
              Commercial turf treatment for property operations
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Designed for property managers and facility directors who need professional turf appearance with compliance documentation—not just occasional weed spraying.
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

      {/* Compliance Standards */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <ClipboardCheck className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Compliance and documentation standards
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Commercial turf treatment requires more than just results—it requires records. We provide documentation for audits, board reports, and regulatory compliance.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {complianceStandards.map((standard, index) => (
                <div key={index} className="bg-card p-6 rounded-xl border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-3">{standard.title}</h3>
                  <p className="text-muted-foreground">{standard.description}</p>
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
              Commercial turf treatment programs
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive fertilization and weed control designed to maintain professional turf appearance under heavy commercial use.
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

      {/* Annual Treatment Calendar */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Annual treatment calendar
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Commercial turf programs follow a seasonal calendar designed for Wisconsin's climate and growing conditions.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4 items-start bg-card p-6 rounded-xl border border-border">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-primary">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Early spring (April)</h3>
                  <p className="text-muted-foreground">Pre-emergent crabgrass control + early-season fertilization to establish strong root growth before summer stress.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-card p-6 rounded-xl border border-border">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-primary">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Late spring (May–June)</h3>
                  <p className="text-muted-foreground">Broadleaf weed control + balanced fertilization during peak growing season.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-card p-6 rounded-xl border border-border">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-primary">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Summer (July–August)</h3>
                  <p className="text-muted-foreground">Targeted weed treatment + summer stress management. Light fertilization to maintain color without forcing growth.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-card p-6 rounded-xl border border-border">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-primary">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Fall (September–October)</h3>
                  <p className="text-muted-foreground">Fall fertilization for root development + broadleaf weed control. This is the most important treatment for spring recovery.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-card p-6 rounded-xl border border-border">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-primary">5</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Late fall (November)</h3>
                  <p className="text-muted-foreground">Winterizer fertilization to strengthen roots and improve cold tolerance for Wisconsin winters.</p>
                </div>
              </div>
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
                Transparent contract options for commercial property budgeting and annual planning.
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
                Commercial fertilization programs typically range from <strong className="text-foreground">$80–$200</strong> per application depending on property size. Full-season programs (5-6 applications) offer contract discounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                What separates us from low-bid applicators
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {differentiators.map((item, index) => (
                <div key={index} className="flex items-start bg-card p-4 rounded-lg border border-border">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
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
              Most commercial properties bundle fertilization with lawn care and aeration for comprehensive turf management.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/commercial/lawn-care">Lawn Care Contracts</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/commercial/aeration">Commercial Aeration</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/commercial/seasonal">Seasonal Cleanups</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ServiceFAQ faqs={commercialFertilizationWeedControlFAQs} />
      <CTASection />
      <Footer />
    </div>
  );
}
