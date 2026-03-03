'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from '@/components/CTASection';
import { ServiceSchema } from "@/components/ServiceSchema";
import Link from "next/link";
import { CheckCircle2, Phone, ArrowRight, Wind, Droplets, Sprout, Building2, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-aeration.jpg";
import ServiceFAQ from "@/components/ServiceFAQ";
import { commercialAerationFAQs } from "@/data/serviceFAQs";
import { CommercialInsuranceBanner } from "@/components/CommercialInsuranceBanner";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
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

const seasonalSectionBg = {
  summer: 'from-[#0a1f14] via-[#0f2818] to-[#0a1f14]',
  fall: 'from-stone-950 via-amber-950/20 to-stone-950',
  winter: 'from-slate-950 via-blue-950/20 to-slate-950',
} as const;

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
  const { activeSeason } = useSeasonalTheme();

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
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/50 to-[#0a1f14]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
        </div>
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              Starting at $150
            </div>
            <p className="text-accent font-semibold mb-3 text-sm md:text-base tracking-wide uppercase">Commercial Turf Management</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Commercial Lawn <span className="text-accent">Aeration</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
              Reduce soil compaction, improve drainage, and restore turf health across your commercial property. Scheduled around business operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/contact?service=commercial-aeration" className="inline-flex items-center justify-center h-12 px-8 text-base md:text-lg font-bold rounded-lg animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black shadow-lg hover:shadow-amber-500/25 transition-shadow">
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
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Commercial aeration for property operations
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Designed for property managers and facility directors managing high-traffic turf that shows compaction stress, thin growth, or poor drainage.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {propertyTypes.map((type, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <GlassCard hover="lift">
                  <Building2 className={cn('h-8 w-8 mb-4', seasonalAccent[activeSeason])} />
                  <h3 className="text-lg font-bold text-foreground mb-2">{type.name}</h3>
                  <p className="text-muted-foreground text-sm">{type.description}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Commercial Properties Need Aeration */}
      <section className={cn('py-16 md:py-20 bg-gradient-to-b', seasonalSectionBg[activeSeason])}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  Why commercial turf needs aeration
                </h2>
                <p className="text-base md:text-lg text-white/60">
                  Commercial properties face higher compaction stress than residential lawns. Foot traffic, vehicle access, and dense clay soils create conditions that standard maintenance cannot address.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "High-traffic compaction", desc: "Commercial properties see 10x more foot traffic than residential lawns. This compacts soil, restricts root growth, and creates thin, stressed turf." },
                { title: "Poor drainage issues", desc: "Compacted soil prevents water absorption, causing puddling, runoff, and dry spots. Aeration restores drainage and improves irrigation efficiency." },
                { title: "Fertilizer waste", desc: "Without aeration, fertilizer sits on the surface and runs off. Aeration ensures nutrients reach the root zone where they're actually used." },
                { title: "Thatch buildup", desc: "Commercial turf develops thatch layers that block water and nutrients. Aeration breaks up thatch and accelerates decomposition." },
              ].map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <GlassCard variant="dark" hover="glow">
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-white/60">{item.desc}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6">
                Commercial aeration service scope
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Complete aeration solutions for commercial properties including core aeration, overseeding, and turf recovery programs.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <GlassCard hover="lift" className="p-8">
                  <div className="bg-primary/10 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-5 md:mb-6" aria-hidden="true">
                    <service.icon className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">{service.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-5 md:mb-6">{service.description}</p>
                  <ul className="space-y-2 md:space-y-3">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className={cn('h-4 w-4 md:h-5 md:w-5 mr-2 mt-0.5 flex-shrink-0', seasonalCheck[activeSeason])} />
                        <span className="text-sm md:text-base text-foreground">{item}</span>
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

      {/* Timing Schedule */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <Calendar className={cn('h-12 w-12 mx-auto mb-4', seasonalAccent[activeSeason])} />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Commercial aeration timing
                </h2>
                <p className="text-base md:text-lg text-muted-foreground">
                  Timing is critical for aeration effectiveness. Wisconsin&apos;s climate dictates specific windows for optimal results.
                </p>
              </div>
            </ScrollReveal>
            <div className="space-y-6">
              {timingSchedule.map((period, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <GlassCard variant="dark" hover="glow">
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
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className={cn('py-16 md:py-20 bg-gradient-to-b', seasonalSectionBg[activeSeason])}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  Commercial service standards
                </h2>
                <p className="text-base md:text-lg text-white/60">
                  What you can expect from every commercial aeration service.
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
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Commercial pricing structure
                </h2>
                <p className="text-base md:text-lg text-muted-foreground">
                  Transparent pricing options for commercial property budgeting.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingStructure.map((option, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <GlassCard hover="lift">
                    <h3 className="text-xl font-bold text-foreground mb-3">{option.title}</h3>
                    <p className="text-muted-foreground">{option.description}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={0.3}>
              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Commercial aeration typically ranges from <strong className="text-foreground">$150–$600</strong> depending on property size. Multi-property and annual program discounts available.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <TrustStrip variant="light" />

      {/* Related Commercial Services */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Integrate with other commercial services
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-8">
                Aeration works best when combined with fertilization and overseeding for comprehensive turf recovery.
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { href: "/commercial/fertilization-weed-control", label: "Fertilization & Weed Control" },
                { href: "/commercial/lawn-care", label: "Lawn Care Contracts" },
                { href: "/commercial/seasonal", label: "Seasonal Cleanups" },
              ].map((link, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Link href={link.href}>
                    <GlassCard hover="lift" className="text-center cursor-pointer">
                      <span className="font-semibold text-foreground">{link.label}</span>
                      <ArrowRight className={cn('h-4 w-4 mx-auto mt-2', seasonalAccent[activeSeason])} />
                    </GlassCard>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ServiceFAQ faqs={commercialAerationFAQs} />

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
