'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from '@/components/CTASection';
import { CommercialServiceSchema } from "@/components/schemas/CommercialServiceSchema";
import { WebPageSchema } from "@/components/schemas/WebPageSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Phone, ArrowRight, Flower2, Trees, Sparkles, Building2, Calendar, FileText, ClipboardCheck, Users } from "lucide-react";
import heroImage from "@/assets/service-mulching.jpg";
import ServiceFAQ from "@/components/ServiceFAQ";
import { commercialPropertyEnhancementFAQs } from "@/data/serviceFAQs";
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

const services = [
  {
    icon: Flower2,
    title: "Garden bed installation and maintenance",
    description: "Professional landscape bed design, installation, and ongoing maintenance for commercial curb appeal.",
    items: ["Custom bed layouts for commercial properties", "Commercial-scale plant selection", "Seasonal color rotations", "Ongoing bed maintenance programs"]
  },
  {
    icon: Trees,
    title: "Commercial mulching services",
    description: "Large-scale mulch installation to maintain professional appearance and reduce long-term maintenance costs.",
    items: ["Bulk mulch installation", "Professional bed edging", "Weed barrier installation", "Annual mulch refresh programs"]
  },
  {
    icon: Sparkles,
    title: "Property beautification programs",
    description: "Comprehensive enhancement programs for entrance areas, common spaces, and high-visibility zones.",
    items: ["Entrance and signage area focus", "Perimeter bed maintenance", "Seasonal plantings and displays", "Year-round maintenance contracts"]
  }
];

const propertyTypes = [
  { name: "HOA Communities", description: "Common areas, entrances, and amenity landscaping" },
  { name: "Apartment Complexes", description: "Leasing office areas, courtyards, and resident common spaces" },
  { name: "Office Parks", description: "Corporate entrances and executive building landscaping" },
  { name: "Retail Centers", description: "Customer-facing storefronts and parking lot landscaping" },
  { name: "Medical Facilities", description: "Healing gardens, patient areas, and accessible landscaping" },
  { name: "Corporate Campuses", description: "Employee outdoor spaces and visitor reception areas" }
];

const annualProgram = [
  {
    season: "Spring (March to May)",
    services: "Bed cleanup, dead plant removal, soil amendment, spring mulch application, annual flower installation"
  },
  {
    season: "Summer (June to August)",
    services: "Ongoing weeding, irrigation monitoring, deadheading, pest monitoring, mid-season color refresh if needed"
  },
  {
    season: "Fall (September to November)",
    services: "Perennial cutback, fall mulch touch-up, fall color installation, bed preparation for winter"
  },
  {
    season: "Winter (December to February)",
    services: "Dormant pruning, evergreen maintenance, winter interest plantings, spring planning"
  }
];

const pricingStructure = [
  {
    title: "Project-based",
    description: "One-time enhancement projects priced by scope. Ideal for new installations or major renovations."
  },
  {
    title: "Annual maintenance contract",
    description: "Monthly billing for ongoing bed maintenance, weeding, and seasonal updates. Most common for commercial properties."
  },
  {
    title: "Full-scope landscape management",
    description: "Integrated contract covering beds, turf, and seasonal services. Best rates for comprehensive property care."
  }
];

const qualityStandards = [
  "Consistent bed appearance across entire property",
  "Same crew for familiarity with your property's needs",
  "Commercial-grade plants with supplier warranties",
  "Professional mulch depths maintained (2-3 inches)",
  "Clean edging on all hardscape borders",
  "Photo documentation for board reports"
];

const differentiators = [
  {
    title: "Board-ready documentation",
    description: "Before/after photos and service logs for HOA board meetings, owner communications, and property management reports."
  },
  {
    title: "Consistent crew assignment",
    description: "The same team services your property every visit, ensuring familiarity with your standards and problem areas."
  },
  {
    title: "Proactive issue reporting",
    description: "We identify and report plant health issues, irrigation problems, and maintenance needs before they become complaints."
  },
  {
    title: "Inclusive pricing structure",
    description: "No surprise charges for standard maintenance items. Weeding, edging, and debris removal included in maintenance contracts."
  }
];

export default function CommercialPropertyEnhancementContent() {
  const { activeSeason } = useSeasonalTheme();
  const bg = seasonalBg[activeSeason];

  return (
    <div className="min-h-screen text-white" style={{ background: bg.page }}>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Commercial', url: 'https://tgyardcare.com/commercial' },
        { name: 'Property Enhancement', url: 'https://tgyardcare.com/commercial/property-enhancement' }
      ]} />
      <CommercialServiceSchema slug="garden-beds" faqs={commercialPropertyEnhancementFAQs} />
      <WebPageSchema
        name="Commercial Property Enhancement Services"
        description="Professional commercial landscaping and property beautification for property managers, HOAs, and commercial facilities in Madison, Wisconsin."
        url="/commercial/property-enhancement"
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides commercial landscaping and garden bed services for HOAs, property managers, and businesses in Madison, Wisconsin. Professional bed design, mulching, and annual maintenance programs. $1M liability coverage. Call (608) 535-6057.</p>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-20 md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional commercial landscape design and maintenance for property managers in Madison, Wisconsin"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/50 to-[#0a1f14]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
        </div>
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <p className="text-accent font-semibold mb-3 text-sm md:text-base tracking-wide uppercase">Commercial Landscape Management</p>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              Starting at $200/mo
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Commercial Property <span className="text-accent">Enhancement</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
              Consistent landscape standards that protect property value, reduce complaints, and maintain professional appearance year-round.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link href="/contact?service=commercial-property-enhancement" className="inline-flex items-center justify-center h-12 px-8 text-base md:text-lg font-bold rounded-lg animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black shadow-lg hover:shadow-amber-500/25 transition-shadow">
                Request Commercial Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
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

      <TrustStrip variant="dark" />

      {/* Who This Is For */}
      <section className="py-16 md:py-20" style={{ background: bg.section }}>
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Commercial landscape management for property operations
              </h2>
              <p className="text-base md:text-lg text-white/60">
                Designed for property managers, HOA boards, and facility directors who need landscape beds that look professional from April through November—not just during spring installation.
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

      {/* What Makes Us Different */}
      <section className="py-16 md:py-20" style={{ background: bg.section }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  What separates us from install-and-forget contractors
                </h2>
                <p className="text-base md:text-lg text-white/60">
                  Most contractors make beds look great in May and disappear by July. We maintain consistent standards all season.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {differentiators.map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <GlassCard variant="dark" hover="glow">
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-white/60">{item.description}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-20" style={{ background: bg.section }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Commercial enhancement service scope
              </h2>
              <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto">
                Complete landscape enhancement solutions designed for commercial properties requiring consistent, professional appearance.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <GlassCard hover="lift" className="p-8">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6" aria-hidden="true">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-white/60 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className={cn('h-5 w-5 mr-2 mt-0.5 flex-shrink-0', seasonalCheck[activeSeason])} />
                        <span className="text-white">{item}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection variant="compact" />

      {/* Annual Program Calendar */}
      <section className="py-16 md:py-20" style={{ background: bg.section }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <Calendar className={cn('h-12 w-12 mx-auto mb-4', seasonalAccent[activeSeason])} />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  Annual maintenance program
                </h2>
                <p className="text-base md:text-lg text-white/60">
                  Commercial landscape beds require year-round attention. Our programs maintain consistent standards through all four seasons.
                </p>
              </div>
            </ScrollReveal>
            <div className="space-y-6">
              {annualProgram.map((period, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <GlassCard variant="dark" hover="glow">
                    <h3 className="text-lg font-bold text-white mb-2">{period.season}</h3>
                    <p className="text-white/60">{period.services}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
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
                  Commercial service standards
                </h2>
                <p className="text-base md:text-lg text-white/60">
                  What you can expect from every enhancement and maintenance visit.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {qualityStandards.map((standard, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <GlassCard hover="lift" className="p-4">
                    <div className="flex items-start">
                      <CheckCircle2 className={cn('h-5 w-5 mr-3 mt-0.5 flex-shrink-0', seasonalCheck[activeSeason])} />
                      <span className="text-white">{standard}</span>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

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
                  Flexible contract options for commercial property budgeting and annual planning.
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
                <p className="text-white/60">
                  Annual bed maintenance programs typically range from <strong className="text-white">$200 to $800/month</strong> depending on property size and scope. Enhancement projects quoted individually.
                </p>
              </div>
            </ScrollReveal>
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
                Most commercial properties bundle landscape enhancement with lawn care and seasonal services for complete grounds management.
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <ScrollReveal delay={0}>
                <Link href="/commercial/lawn-care" className="group block">
                  <GlassCard hover="lift" className="text-center py-5">
                    <span className="text-white font-semibold group-hover:text-primary transition-colors">Lawn Care Contracts</span>
                    <ArrowRight className="h-4 w-4 mx-auto mt-2 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </GlassCard>
                </Link>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <Link href="/commercial/seasonal" className="group block">
                  <GlassCard hover="lift" className="text-center py-5">
                    <span className="text-white font-semibold group-hover:text-primary transition-colors">Seasonal Cleanups</span>
                    <ArrowRight className="h-4 w-4 mx-auto mt-2 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </GlassCard>
                </Link>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <Link href="/commercial/gutters" className="group block">
                  <GlassCard hover="lift" className="text-center py-5">
                    <span className="text-white font-semibold group-hover:text-primary transition-colors">Gutter Maintenance</span>
                    <ArrowRight className="h-4 w-4 mx-auto mt-2 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </GlassCard>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <ServiceFAQ faqs={commercialPropertyEnhancementFAQs} />

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
