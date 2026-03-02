'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { ServiceSchema } from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Phone, ArrowRight, Snowflake, Clock, Shield, Building2, FileText, AlertTriangle, MessageSquare, Camera } from "lucide-react";
import heroImage from "@/assets/hero-snow-plow.png";
import ServiceFAQ from "@/components/ServiceFAQ";
import { commercialSnowRemovalFAQs } from "@/data/serviceFAQs";
import { WinterPriorityServices } from "@/components/WinterPriorityServices";
import { CommercialInsuranceBanner } from "@/components/CommercialInsuranceBanner";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

const services = [
  {
    icon: Snowflake,
    title: "Commercial snow plowing",
    description: "Large-scale snow removal for parking lots, access roads, and loading areas with commercial-grade equipment.",
    items: ["Parking lot clearing", "Drive lane and access roads", "Loading dock access", "Fire lane compliance", "Handicap space priority"]
  },
  {
    icon: Shield,
    title: "De-icing and salt application",
    description: "Preventive and reactive ice management to maintain safe surfaces and reduce slip-and-fall liability.",
    items: ["Pre-treatment applications", "Post-storm salt spreading", "Sidewalk and entrance treatment", "Ice melt for walkways"]
  },
  {
    icon: Clock,
    title: "24/7 storm response",
    description: "Round-the-clock monitoring and response during active storm events with priority routing for contracted properties.",
    items: ["Automatic trigger response", "Continuous monitoring", "Multiple passes during long storms", "Post-storm cleanup"]
  }
];

const propertyTypes = [
  { name: "HOA Communities", description: "Parking areas, common drives, and community sidewalks" },
  { name: "Apartment Complexes", description: "Resident parking, access roads, and walkways" },
  { name: "Office Parks", description: "Employee and visitor parking, building entrances" },
  { name: "Retail Centers", description: "Customer parking, storefronts, and cart areas" },
  { name: "Industrial Properties", description: "Loading docks, truck access, and employee areas" },
  { name: "Medical Facilities", description: "Emergency access, patient drop-off, and ADA compliance" }
];

const triggerThresholds = [
  {
    amount: "1-2 inches",
    response: "Salt/de-icing application only. Plowing not triggered unless drifting occurs."
  },
  {
    amount: "2-4 inches",
    response: "Full plowing and salting. Service initiated when accumulation reaches trigger level."
  },
  {
    amount: "4-8 inches",
    response: "Multiple passes during storm. Priority areas cleared first, full property completed post-storm."
  },
  {
    amount: "8+ inches",
    response: "Continuous operations. Crews cycle through contracted properties throughout storm event."
  }
];

const liabilityProtection = [
  {
    title: "Timestamped documentation",
    description: "Every service visit logged with arrival time, departure time, conditions encountered, and actions taken."
  },
  {
    title: "Photo verification",
    description: "Before and after photos of cleared areas provide evidence of service completion for liability defense."
  },
  {
    title: "Weather correlation",
    description: "Service records cross-referenced with official weather data to verify appropriate response timing."
  },
  {
    title: "Incident reporting",
    description: "Any observed hazards, damage, or unusual conditions documented and reported immediately."
  }
];

const pricingStructure = [
  {
    title: "Seasonal contract",
    description: "Fixed monthly rate November–March regardless of snowfall. Predictable budgeting with unlimited service."
  },
  {
    title: "Per-push billing",
    description: "Billed per service event based on accumulation. Lower commitment, variable monthly costs."
  },
  {
    title: "Hybrid contract",
    description: "Base monthly rate with per-push fees above threshold. Balance of predictability and cost control."
  }
];

const qualityStandards = [
  "Response initiated within 2 hours of trigger threshold",
  "Priority areas (entrances, handicap, fire lanes) cleared first",
  "Full property completion within 4 hours of storm end",
  "Salt application within 1 hour of plowing completion",
  "Service confirmation sent upon completion",
  "24/7 emergency contact during active storms"
];

export default function CommercialSnowRemovalContent() {
  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Commercial', url: 'https://tgyardcare.com/commercial' },
        { name: 'Snow Removal', url: 'https://tgyardcare.com/commercial/snow-removal' }
      ]} />
      <ServiceSchema
        serviceName="Commercial Snow Removal Services"
        description="Professional commercial snow removal and de-icing for property managers, HOAs, and commercial facilities in Madison, Wisconsin."
        serviceType="Commercial Snow Removal"
        areaServed={["Madison", "Middleton", "Sun Prairie", "Fitchburg", "Verona", "Waunakee"]}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides commercial snow removal for HOAs, property managers, and businesses in Madison, Wisconsin. 24/7 storm response, documented service with photo verification, and liability protection. Seasonal contracts available. Call (608) 535-6057.</p>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-20 md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional commercial snow removal and plowing for property managers in Madison, Wisconsin"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <p className="text-accent font-semibold mb-3 text-sm md:text-base tracking-wide uppercase">Commercial Winter Operations</p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Commercial Snow Removal <span className="text-accent">Contracts</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
              Documented storm response with real-time communication. Know when we arrive, when we finish, and what was done—every storm, every time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" variant="accent" className="text-base md:text-lg font-bold" asChild>
                <Link href="/contact?service=commercial-snow-removal">
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
              Commercial snow removal for property operations
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Designed for property managers and facility directors who need reliable winter operations with liability documentation—not contractors who disappear during major storms.
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

      {/* Liability Protection */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <AlertTriangle className="h-12 w-12 text-accent mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Liability protection through documentation
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Slip-and-fall claims are the primary winter liability for commercial properties. Documented snow response is your best defense.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {liabilityProtection.map((item, index) => (
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
              Commercial winter service scope
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Complete winter operations designed for commercial properties requiring reliable response and documented service.
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

      {/* Trigger Thresholds */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Snowflake className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Response trigger thresholds
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Pre-defined accumulation thresholds eliminate guesswork. Service initiates automatically—no phone calls needed.
              </p>
            </div>
            <div className="space-y-4">
              {triggerThresholds.map((threshold, index) => (
                <div key={index} className="bg-card p-6 rounded-xl border border-border">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold flex-shrink-0">
                      {threshold.amount}
                    </div>
                    <p className="text-muted-foreground">{threshold.response}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-accent/10 rounded-xl border border-accent/20">
              <p className="text-foreground text-center">
                <strong>Custom triggers available.</strong> Medical facilities, 24-hour operations, and critical access properties can negotiate lower thresholds or priority routing.
              </p>
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
                What you can expect from every storm response.
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
                Flexible contract options for different budgeting preferences and risk tolerance.
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
                Commercial snow removal contracts typically range from <strong className="text-foreground">$500–$2,500/month</strong> for seasonal contracts depending on property size and scope. Per-push pricing available upon request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Communication System */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Real-time storm communication
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                You'll never wonder if service happened. Our communication system keeps you informed throughout every storm event.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-background p-6 rounded-xl border border-border">
                <h3 className="text-xl font-bold text-foreground mb-3">Before the storm</h3>
                <p className="text-muted-foreground">Weather alert notifications when significant accumulation is forecast. Pre-storm preparation details.</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <h3 className="text-xl font-bold text-foreground mb-3">During the storm</h3>
                <p className="text-muted-foreground">Arrival notifications when crews reach your property. Status updates during extended storm events.</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <h3 className="text-xl font-bold text-foreground mb-3">After the storm</h3>
                <p className="text-muted-foreground">Completion confirmation with service summary. Photo documentation available upon request.</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <h3 className="text-xl font-bold text-foreground mb-3">Emergency contact</h3>
                <p className="text-muted-foreground">Direct line to operations during active storms. Issues addressed immediately, not next business day.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WinterPriorityServices />

      {/* Related Commercial Services */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Year-round commercial services
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8">
              Snow removal clients receive priority scheduling for seasonal transitions and grounds maintenance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/commercial/lawn-care">Lawn Care Contracts</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/commercial/seasonal">Seasonal Cleanups</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/commercial/gutters">Gutter Maintenance</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ServiceFAQ faqs={commercialSnowRemovalFAQs} />
      <CTASection />
      <Footer />
    </div>
  );
}
