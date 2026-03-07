'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from '@/components/CTASection';
import { CommercialServiceSchema } from "@/components/schemas/CommercialServiceSchema";
import { WebPageSchema } from "@/components/schemas/WebPageSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Phone, ArrowRight, Building2, Scissors, Clock, FileText, Users, Shield, Calendar, ClipboardCheck } from "lucide-react";
import heroImage from "@/assets/service-mowing.jpg";
import ServiceFAQ from "@/components/ServiceFAQ";
import { commercialLawnCareFAQs } from "@/data/serviceFAQs";
import { CommercialInsuranceBanner } from "@/components/CommercialInsuranceBanner";
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema";
import { AmbientParticles } from "@/components/AmbientParticles";
import { ScrollReveal } from '@/components/ScrollReveal';
import { GlassCard } from '@/components/GlassCard';
import { TrustStrip } from '@/components/TrustStrip';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { cn } from '@/lib/utils';

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

const seasonalAccent = {
  summer: 'text-emerald-400',
  fall: 'text-amber-400',
  winter: 'text-cyan-400',
} as const;

const seasonalCheck = {
  summer: 'text-emerald-400',
  fall: 'text-amber-400',
  winter: 'text-cyan-400',
} as const;

const seasonalBg = {
  summer: {
    page:    '#050d07',
    section: '#0a1a0e',
  },
  fall: {
    page:    '#0d0900',
    section: '#1a1000',
  },
  winter: {
    page:    '#020810',
    section: '#060f1a',
  },
} as const;

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

const processSteps = [
  {
    title: "Property walkthrough",
    description: "We assess your property in person—measuring turf areas, identifying access points, and documenting any special requirements or problem areas."
  },
  {
    title: "Custom scope and bid",
    description: "You receive a detailed proposal outlining service scope, schedule, pricing structure, and contract terms. No vague line items or hidden fees."
  },
  {
    title: "Contract execution",
    description: "Once approved, we assign your dedicated crew, confirm your service day, and begin operations on your agreed start date."
  },
  {
    title: "Ongoing accountability",
    description: "Service logs, monthly reports, and direct communication ensure you always know what's happening on your property."
  }
];

export default function CommercialLawnCareContent() {
  const { activeSeason } = useSeasonalTheme();
  const bg = seasonalBg[activeSeason];

  return (
    <div className="min-h-screen text-white" style={{ background: bg.page }}>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Commercial', url: 'https://tgyardcare.com/commercial' },
        { name: 'Lawn Care', url: 'https://tgyardcare.com/commercial/lawn-care' }
      ]} />
      <CommercialServiceSchema slug="mowing" faqs={commercialLawnCareFAQs} />
      <WebPageSchema
        name="Commercial Lawn Care Services"
        description="Professional commercial lawn maintenance for property managers, HOAs, and commercial facilities in Madison, Wisconsin."
        url="/commercial/lawn-care"
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/50 to-[#0a1f14]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
        </div>
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <p className="text-accent font-semibold mb-3 text-sm md:text-base tracking-wide uppercase">Commercial Property Maintenance</p>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              Starting at $400/mo
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Commercial Lawn Care <span className="text-accent">Contracts</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
              Predictable, documented lawn maintenance for property managers who need reliability—not excuses. Same crew, same schedule, zero missed visits.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/contact?service=commercial-lawn-care" className="inline-flex items-center justify-center h-12 px-8 text-base md:text-lg font-bold rounded-lg animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black shadow-lg hover:shadow-amber-500/25 transition-shadow">
                Request Commercial Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
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
      <TrustStrip variant="dark" />

      {/* Who This Is For */}
      <section className="py-16 md:py-20" style={{ background: bg.section }}>
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Built for commercial property operations
              </h2>
              <p className="text-base md:text-lg text-white/60">
                This service is designed for property managers, facility directors, and HOA boards who need grounds maintenance that operates like a system—not a favor from a local contractor.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {propertyTypes.map((type, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <GlassCard hover="lift">
                  <Building2 className={cn('h-8 w-8 mb-4', seasonalAccent[activeSeason])} />
                  <h3 className="text-lg font-bold text-white mb-2">{type.name}</h3>
                  <p className="text-white/60 text-sm">{type.description}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included at Scale */}
      <section className="py-16 md:py-20" style={{ background: bg.page }}>
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Commercial-scale service scope
              </h2>
              <p className="text-base md:text-lg text-white/60">
                Every element of grounds maintenance documented, scheduled, and executed with commercial-grade consistency.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {serviceScope.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="flex gap-4">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <item.icon className={cn('h-6 w-6', seasonalAccent[activeSeason])} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/60">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-16 md:py-20" style={{ background: bg.section }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  Service quality standards
                </h2>
                <p className="text-base md:text-lg text-white/60">
                  What you can expect from every visit—documented and verifiable.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {qualityStandards.map((standard, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <GlassCard hover="glow" variant="dark" className="flex items-start p-4">
                    <CheckCircle2 className={cn('h-5 w-5 mr-3 mt-0.5 flex-shrink-0', seasonalCheck[activeSeason])} />
                    <span className="text-white">{standard}</span>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection variant="compact" />

      {/* Pricing Structure */}
      <section className="py-16 md:py-20" style={{ background: bg.page }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  Commercial pricing structure
                </h2>
                <p className="text-base md:text-lg text-white/60">
                  Transparent contract options designed for commercial budgeting and property management accounting.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingStructure.map((option, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <GlassCard variant="dark" hover="glow">
                    <h3 className="text-xl font-bold text-white mb-3">{option.title}</h3>
                    <p className="text-white/60">{option.description}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={0.3}>
              <div className="mt-8 text-center">
                <p className="text-white/60 mb-4">
                  Commercial quotes are based on property size, service frequency, and contract term. Most HOAs and apartment complexes see monthly rates between <strong className="text-white">$400–$1,500</strong> depending on scope.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-16 md:py-20 border-y border-white/10" style={{ background: bg.section }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/90 mb-4">
                  What separates us from low-bid contractors
                </h2>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal delay={0}>
                <GlassCard hover="lift" className="p-8">
                  <Shield className={cn('h-8 w-8 mb-4', seasonalAccent[activeSeason])} />
                  <h3 className="text-xl font-bold text-white mb-3">Accountability systems</h3>
                  <p className="text-white/60">
                    Every visit logged with crew ID, timestamp, and completion status. No wondering if service happened—you'll have records.
                  </p>
                </GlassCard>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <GlassCard hover="lift" className="p-8">
                  <Calendar className={cn('h-8 w-8 mb-4', seasonalAccent[activeSeason])} />
                  <h3 className="text-xl font-bold text-white mb-3">Consistent scheduling</h3>
                  <p className="text-white/60">
                    Same day, same crew, same standards. Your property won't be pushed down the priority list during busy weeks.
                  </p>
                </GlassCard>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <GlassCard hover="lift" className="p-8">
                  <ClipboardCheck className={cn('h-8 w-8 mb-4', seasonalAccent[activeSeason])} />
                  <h3 className="text-xl font-bold text-white mb-3">Documentation for boards</h3>
                  <p className="text-white/60">
                    Monthly service reports, issue tracking, and compliance records ready for board meetings and owner communications.
                  </p>
                </GlassCard>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <GlassCard hover="lift" className="p-8">
                  <Users className={cn('h-8 w-8 mb-4', seasonalAccent[activeSeason])} />
                  <h3 className="text-xl font-bold text-white mb-3">Direct communication</h3>
                  <p className="text-white/60">
                    Dedicated point of contact for scheduling changes, concerns, or urgent requests. No call centers or dispatch runaround.
                  </p>
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20" style={{ background: bg.page }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  How commercial contracts work
                </h2>
              </div>
            </ScrollReveal>
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <ScrollReveal key={index} delay={index * 0.12}>
                    <div className="flex gap-4 items-start relative">
                      <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-white text-sm z-10">
                        {index + 1}
                      </div>
                      <GlassCard variant="dark" hover="glow" className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                        <p className="text-white/60">{step.description}</p>
                      </GlassCard>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip variant="light" />

      {/* Related Commercial Services */}
      <section className="py-16 md:py-20" style={{ background: bg.section }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Integrate with other commercial services
              </h2>
              <p className="text-base md:text-lg text-white/60 mb-8">
                Most commercial properties bundle lawn care with seasonal and specialty services for comprehensive grounds management.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/commercial/fertilization-weed-control" className="group">
                  <GlassCard variant="dark" hover="glow" className="inline-flex items-center gap-2 px-5 py-3">
                    <span className="text-white font-medium">Fertilization & Weed Control</span>
                    <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </GlassCard>
                </Link>
                <Link href="/commercial/seasonal" className="group">
                  <GlassCard variant="dark" hover="glow" className="inline-flex items-center gap-2 px-5 py-3">
                    <span className="text-white font-medium">Seasonal Cleanups</span>
                    <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </GlassCard>
                </Link>
                <Link href="/commercial/snow-removal" className="group">
                  <GlassCard variant="dark" hover="glow" className="inline-flex items-center gap-2 px-5 py-3">
                    <span className="text-white font-medium">Snow Removal</span>
                    <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </GlassCard>
                </Link>
                <Link href="/commercial/property-enhancement" className="group">
                  <GlassCard variant="dark" hover="glow" className="inline-flex items-center gap-2 px-5 py-3">
                    <span className="text-white font-medium">Property Enhancement</span>
                    <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </GlassCard>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ServiceFAQ faqs={commercialLawnCareFAQs} />

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
