'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from '@/components/CTASection';
import { CommercialServiceSchema } from "@/components/schemas/CommercialServiceSchema";
import { WebPageSchema } from "@/components/schemas/WebPageSchema";
import Link from "next/link";
import { CheckCircle2, Phone, ArrowRight, Shield, Droplets, AlertTriangle, Building2 } from "lucide-react";
import heroImage from "@/assets/service-gutter.jpg";
import ServiceFAQ from "@/components/ServiceFAQ";
import { commercialGutterServicesFAQs } from "@/data/serviceFAQs";
import { CommercialInsuranceBanner } from "@/components/CommercialInsuranceBanner";
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema";
import { AmbientParticles } from "@/components/AmbientParticles";
import { ScrollReveal } from '@/components/ScrollReveal';
import { GlassCard } from '@/components/GlassCard';
import { TrustStrip } from '@/components/TrustStrip';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";

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

const processSteps = [
  { num: "1", title: "Property assessment", desc: "We evaluate gutter length, building height, accessibility, and debris accumulation patterns to determine service scope." },
  { num: "2", title: "Maintenance plan proposal", desc: "You receive a detailed maintenance proposal with recommended frequency, service scope, and pricing options." },
  { num: "3", title: "Scheduled service execution", desc: "Services performed on schedule with photo documentation and completion confirmation." },
  { num: "4", title: "Documentation and reporting", desc: "Service reports with before/after photos provided for your records and board communications." },
];

export default function CommercialGutterServicesContent() {
  const { activeSeason } = useSeasonalTheme();
  const bg = seasonalBg[activeSeason];

  return (
    <div className="min-h-screen text-white" style={{ background: bg.page }}>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Commercial', url: 'https://tgyardcare.com/commercial' },
        { name: 'Gutter Services', url: 'https://tgyardcare.com/commercial/gutters' }
      ]} />
      <CommercialServiceSchema slug="gutter-cleaning" faqs={commercialGutterServicesFAQs} />
      <WebPageSchema
        name="Commercial Gutter Services"
        description="Professional commercial gutter cleaning and guard installation for property managers, HOAs, and commercial facilities in Madison, Wisconsin."
        url="/commercial/gutters"
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
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              Starting at $200
            </div>
            <p className="text-accent font-semibold mb-3 text-sm md:text-base tracking-wide uppercase">Commercial Property Maintenance</p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Commercial Gutter <span className="text-accent">Maintenance</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
              Documented gutter maintenance that reduces liability exposure and protects your property investment. Photo records with every service.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link href="/contact?service=commercial-gutter" className="inline-flex items-center justify-center h-12 px-8 text-base md:text-lg font-bold rounded-lg animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black shadow-lg hover:shadow-amber-500/25 transition-shadow">
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
                Commercial gutter maintenance for property operations
              </h2>
              <p className="text-base md:text-lg text-white/60">
                Designed for property managers and facility directors who need documented, scheduled gutter maintenance—not reactive service calls after damage occurs.
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

      {/* Liability and Risk Reduction */}
      <section className="py-16 md:py-20" style={{ background: bg.section }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <AlertTriangle className={cn('h-12 w-12 mx-auto mb-4', seasonalAccent[activeSeason])} />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  Liability reduction through proactive maintenance
                </h2>
                <p className="text-base md:text-lg text-white/60">
                  Neglected gutters create liability exposure. Documented maintenance protects your property and your organization.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {liabilityBenefits.map((benefit, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <GlassCard variant="dark" hover="glow">
                    <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                    <p className="text-white/60">{benefit.description}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-20" style={{ background: bg.section }}>
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Commercial gutter service scope
              </h2>
              <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto">
                Complete gutter maintenance solutions designed for commercial-scale properties with documentation and accountability.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <GlassCard hover="lift" className="p-8">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
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

      {/* Quality Standards */}
      <section className="py-16 md:py-20" style={{ background: bg.page }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  Service quality standards
                </h2>
                <p className="text-base md:text-lg text-white/60">
                  What you can expect from every commercial gutter service visit.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {qualityStandards.map((standard, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <GlassCard variant="dark" hover="glow" className="flex items-start p-4">
                    <CheckCircle2 className={cn('h-5 w-5 mr-3 mt-0.5 flex-shrink-0', seasonalCheck[activeSeason])} />
                    <span className="text-white">{standard}</span>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Structure */}
      <section className="py-16 md:py-20" style={{ background: bg.section }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  Commercial pricing structure
                </h2>
                <p className="text-base md:text-lg text-white/60">
                  Flexible contract options for commercial property budgeting and maintenance planning.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingStructure.map((option, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <GlassCard hover="lift">
                    <h3 className="text-xl font-bold text-white mb-3">{option.title}</h3>
                    <p className="text-white/60">{option.description}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={0.3}>
              <div className="mt-8 text-center">
                <p className="text-white/60">
                  Commercial gutter cleaning typically ranges from <strong className="text-white">$200–$800</strong> per service depending on building size and accessibility. Guard installation quoted per linear foot.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20" style={{ background: bg.section }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  Commercial service process
                </h2>
              </div>
            </ScrollReveal>
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <GlassCard variant="dark" hover="glow">
                    <div className="flex gap-4 items-start">
                      <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-white text-sm">
                        {step.num}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                        <p className="text-white/60">{step.desc}</p>
                      </div>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              ))}
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
                Many commercial properties bundle gutter maintenance with seasonal services for comprehensive property care.
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { href: "/commercial/seasonal", label: "Seasonal Cleanups" },
                { href: "/commercial/lawn-care", label: "Lawn Care Contracts" },
                { href: "/commercial/snow-removal", label: "Snow Removal" },
              ].map((link, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Link href={link.href}>
                    <GlassCard hover="lift" className="text-center cursor-pointer">
                      <span className="font-semibold text-white">{link.label}</span>
                      <ArrowRight className={cn('h-4 w-4 mx-auto mt-2', seasonalAccent[activeSeason])} />
                    </GlassCard>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ServiceFAQ faqs={commercialGutterServicesFAQs} />

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
