'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from '@/components/CTASection';
import { ComparisonSection, ObjectionHandlerSection, PricingGuideSection } from "@/components/SearchIntentSections";
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema";
import { ItemListSchema } from "@/components/schemas/ItemListSchema";
import { WebPageSchema } from "@/components/schemas/WebPageSchema";
import { buildFAQPageSchema } from '@/lib/seo/schema-factory';
import { AmbientParticles } from "@/components/AmbientParticles";
import { ScrollReveal } from '@/components/ScrollReveal';
import { GlassCard } from '@/components/GlassCard';
import { TrustStrip } from '@/components/TrustStrip';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { cn } from '@/lib/utils';
import {
  Building2,
  Store,
  Home,
  Factory,
  CheckCircle2,
  Clock,
  Shield,
  Award,
  Phone,
  ArrowRight,
  Scissors,
  Trees,
  Sparkles,
  Wind,
  Snowflake,
  Sprout,
  CircleDot,
  MapPin,
  Star,
  Users
} from "lucide-react";
import heroImage from "@/assets/hero-lawn.jpg";
import { sortServicesBySeason } from "@/lib/seasonalServices";

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

const seasonalLocationHover = {
  summer: 'hover:border-emerald-500/50 hover:bg-emerald-500/5',
  fall: 'hover:border-amber-500/50 hover:bg-amber-500/5',
  winter: 'hover:border-cyan-500/50 hover:bg-cyan-500/5',
} as const;

const commercialServices = [
  {
    icon: Building2,
    title: "Office Buildings & Corporate Parks",
    description: "Maintain a professional appearance for your business with regular lawn maintenance, seasonal cleanups, and landscaping services that impress clients and employees."
  },
  {
    icon: Store,
    title: "Retail Properties & Shopping Centers",
    description: "Drive customer traffic with attractive, well-maintained outdoor spaces. We provide comprehensive lawn care that enhances curb appeal and creates inviting entrances."
  },
  {
    icon: Home,
    title: "Multi-Family Properties & HOAs",
    description: "Keep your residential community looking its best year-round. From apartment complexes to homeowner associations, we deliver consistent, reliable service."
  },
  {
    icon: Factory,
    title: "Industrial & Warehouse Facilities",
    description: "Maintain safety and professionalism around your facility with regular mowing, trimming, and seasonal maintenance that keeps your property compliant and presentable."
  }
];

const whyChooseUs = [
  {
    icon: CheckCircle2,
    title: "Commercial-Grade Equipment",
    description: "Zero-turn mowers, backpack blowers, and fleet trucks sized for 10+ acre properties."
  },
  {
    icon: Clock,
    title: "Off-Hours Scheduling",
    description: "Early morning or weekend service available—work completed before your tenants arrive."
  },
  {
    icon: Shield,
    title: "$1M Liability Coverage",
    description: "Certificate of Insurance provided same-day for your property management records."
  },
  {
    icon: Award,
    title: "Assigned Crew Consistency",
    description: "Same 2-3 person team every visit. They know your property, your preferences, your standards."
  }
];

const comparisonPoints = [
  { label: "Response to Quote Request", us: "Within 24 hours", them: "Days or no response" },
  { label: "Insurance Certificate", us: "Same-day delivery", them: "Chase for weeks" },
  { label: "Crew Consistency", us: "Same team every visit", them: "Rotating strangers" },
  { label: "Weather Communication", us: "Text by 8am if delayed", them: "Just don't show up" },
  { label: "Issue Resolution", us: "Acknowledged in 4 hours", them: "Ignored or excuses" },
  { label: "Contract Flexibility", us: "Monthly or seasonal options", them: "Locked into annual" }
];

const commercialObjections = [
  {
    objection: "How do I know you'll actually show up consistently?",
    response: "We assign the same crew to your property every visit—they know your site, your preferences, and your standards. You'll have a direct line to your crew lead. If weather delays a visit, you're notified by 8am with the reschedule date."
  },
  {
    objection: "What if there's damage or an issue?",
    response: "Our $1M liability policy covers any damage. More importantly, issues are acknowledged within 4 hours and resolved within 48 hours. You'll receive a text confirmation when the fix is complete. We document everything with photos."
  },
  {
    objection: "Can you handle the size of our property?",
    response: "We service properties from small retail lots to 15+ acre corporate campuses. Our commercial equipment fleet includes zero-turn mowers, stand-on blowers, and box trucks for large debris removal. We'll walk your property and provide a custom maintenance schedule."
  },
  {
    objection: "We've been burned by contractors before.",
    response: "That's exactly why we operate differently: written scope of work, flat monthly billing, no surprise charges, and a 30-day out clause if we're not meeting expectations. You're not locked in—we have to earn your business every month."
  }
];

const baseServices = [
  {
    icon: Scissors,
    title: "Commercial Lawn Care",
    items: ["Weekly Mowing & Edging", "Line Trimming", "Blowing & Cleanup", "Property Inspections"],
    path: "/commercial/lawn-care"
  },
  {
    icon: Trees,
    title: "Seasonal Services",
    items: ["Spring Cleanup", "Fall Cleanup", "Leaf Removal", "Winterization"],
    path: "/commercial/seasonal"
  },
  {
    icon: Sparkles,
    title: "Gutter Services",
    items: ["Gutter Cleaning", "Gutter Guard Installation", "Inspection Reports", "Maintenance Plans"],
    path: "/commercial/gutters"
  },
  {
    icon: CircleDot,
    title: "Aeration Services",
    items: ["Core Aeration", "Overseeding", "Soil Health", "Compaction Relief"],
    path: "/commercial/aeration"
  },
  {
    icon: Sprout,
    title: "Fertilization & Weed Control",
    items: ["Custom Programs", "Herbicide Treatments", "Lawn Health", "Weed Prevention"],
    path: "/commercial/fertilization-weed-control"
  },
  {
    icon: Wind,
    title: "Property Enhancement",
    items: ["Mulching", "Garden Beds", "Bush Trimming", "Curb Appeal"],
    path: "/commercial/property-enhancement"
  }
];

const services = sortServicesBySeason([...baseServices, {
  icon: Snowflake,
  title: "Snow Removal",
  items: ["24/7 Response", "Driveways & Lots", "Ice Management", "Seasonal Contracts"],
  path: "/commercial/snow-removal"
}]);

const locations = [
  { name: "Madison", path: "/locations/madison" },
  { name: "Middleton", path: "/locations/middleton" },
  { name: "Waunakee", path: "/locations/waunakee" },
  { name: "Verona", path: "/locations/verona" },
  { name: "Fitchburg", path: "/locations/fitchburg" },
  { name: "Sun Prairie", path: "/locations/sun-prairie" },
  { name: "Monona", path: "/locations/monona" },
  { name: "McFarland", path: "/locations/mcfarland" },
  { name: "Cottage Grove", path: "/locations/cottage-grove" },
  { name: "DeForest", path: "/locations/deforest" },
  { name: "Oregon", path: "/locations/oregon" },
  { name: "Stoughton", path: "/locations/stoughton" }
];

export default function CommercialContent() {
  const { activeSeason } = useSeasonalTheme();
  const bg = seasonalBg[activeSeason];

  return (
    <div className="min-h-screen text-white" style={{ background: bg.page }}>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Commercial Services', url: 'https://tgyardcare.com/commercial' }
      ]} />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Commercial Services Summary">
        <p>TotalGuard Yard Care provides commercial lawn care and property maintenance in Madison, Wisconsin. We service office buildings, retail properties, HOAs, and industrial facilities with $1M liability coverage. Services include regular mowing, seasonal cleanups, snow removal, and landscape maintenance. Off-hours scheduling available. Call (608) 535-6057 for a property assessment.</p>
      </section>

      {/* Hero Section - Premium Dark Theme */}
      <section className="relative min-h-[auto] md:min-h-[70vh] flex items-center py-20 pt-24 md:py-28 md:pt-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional commercial lawn care services for businesses in Madison, Wisconsin"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/50 to-[#0a1f14]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
        </div>
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <AmbientParticles density="sparse" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust badge */}
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
                <Shield className="h-4 w-4 text-accent" />
                <span>Fully Insured &bull; Certificate Available on Request</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Commercial Lawn Care <span className="text-accent">Across Dane County</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto">
                Professional property maintenance for businesses, HOAs, and commercial properties across Madison, Middleton, Waunakee, Sun Prairie, and all Dane County. Reliable service your tenants and customers notice.
              </p>
            </ScrollReveal>

            {/* CTA buttons */}
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/contact" className="inline-flex items-center justify-center h-12 px-8 text-base md:text-lg font-bold rounded-lg animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black shadow-lg hover:shadow-amber-500/25 transition-shadow">
                  Get a Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900 tap-target text-base md:text-lg" asChild>
                  <a href="tel:608-535-6057">
                    <Phone className="mr-2 h-5 w-5" />
                    (608) 535-6057
                  </a>
                </Button>
              </div>
            </ScrollReveal>

            {/* Micro-proof points */}
            <ScrollReveal delay={0.4}>
              <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>Flexible Scheduling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>Commercial Equipment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>Custom Contracts</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar — animated counters */}
      <section className="py-6 text-white border-y border-white/5" style={{ background: bg.section }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">
                  <AnimatedCounter end={500} suffix="+" />
                </div>
                <div className="text-sm text-white/50">Properties Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">
                  <AnimatedCounter end={7} suffix="+" />
                </div>
                <div className="text-sm text-white/50">Commercial Services</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">
                  <AnimatedCounter end={4.9} suffix="★" decimals={1} />
                </div>
                <div className="text-sm text-white/50">Google Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">
                  <AnimatedCounter end={24} suffix="hr" />
                </div>
                <div className="text-sm text-white/50">Quote Response</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Commercial Properties We Serve */}
      <section className="py-20" style={{ background: bg.page }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Properties We Serve
              </h2>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                From small retail locations to large corporate campuses, we have the experience and equipment to maintain any commercial property.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commercialServices.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <GlassCard hover="lift" className="p-8 h-full">
                  <div className={cn('bg-white/5 rounded-full w-16 h-16 flex items-center justify-center mb-6')}>
                    <service.icon className={cn('h-8 w-8', seasonalAccent[activeSeason])} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-white/60 leading-relaxed">{service.description}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20" style={{ background: bg.section }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Comprehensive Commercial Services
              </h2>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                Everything you need to maintain a professional, attractive property year-round.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Link
                  href={service.path}
                  className="group block"
                >
                  <GlassCard variant="dark" hover="lift" className="p-8 h-full">
                    <div className={cn('bg-white/5 rounded-full w-16 h-16 flex items-center justify-center mb-6')}>
                      <service.icon className={cn('h-8 w-8', seasonalAccent[activeSeason])} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                    <ul className="space-y-2">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 className={cn('h-5 w-5 mr-2 mt-0.5 flex-shrink-0', seasonalCheck[activeSeason])} />
                          <span className="text-white/60">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={cn('mt-6 font-semibold flex items-center', seasonalAccent[activeSeason])}>
                      Learn more <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </GlassCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20" style={{ background: bg.page }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Commercial Clients Choose TotalGuard
              </h2>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                We understand the unique needs of commercial properties and deliver service that exceeds expectations.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <GlassCard hover="lift" className="text-center h-full">
                  <div className={cn('bg-white/5 rounded-full w-20 h-20 flex items-center justify-center mb-6 mx-auto')}>
                    <item.icon className={cn('h-10 w-10', seasonalAccent[activeSeason])} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed">{item.description}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <TrustStrip variant="dark" />

      {/* Service Areas - Location Links for SEO */}
      <section className="py-16 md:py-24" style={{ background: bg.page }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className={cn('inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-4 bg-white/5 border border-white/10', seasonalAccent[activeSeason])}>
                <MapPin className="h-4 w-4" />
                Commercial Service Areas
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Serving <span className={seasonalAccent[activeSeason]}>Greater Madison</span>
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Professional commercial lawn care throughout Dane County.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 max-w-5xl mx-auto mb-10">
            {locations.map((location, index) => (
              <ScrollReveal key={index} delay={index * 0.03}>
                <Link
                  href={location.path}
                  className={cn(
                    'bg-white/5 backdrop-blur-sm border border-white/[0.08] rounded-lg px-4 py-3 text-center transition-all group block',
                    seasonalLocationHover[activeSeason]
                  )}
                >
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className={cn('h-4 w-4 opacity-70 group-hover:opacity-100', seasonalAccent[activeSeason])} />
                    <span className="font-medium text-white text-sm">{location.name}</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center">
              <Button size="lg" variant="outline" asChild>
                <Link href="/service-areas">
                  View All Service Areas <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection variant="compact" />

      {/* Comparison Section - Address "vs competitors" search intent */}
      <ComparisonSection
        title="TotalGuard vs. Typical Commercial Contractors"
        subtitle="What property managers actually experience"
        points={comparisonPoints}
      />

      {/* Objection Handling - Address hesitation before hiring */}
      <ObjectionHandlerSection
        title="Questions Property Managers Ask"
        objections={commercialObjections}
      />

      {/* Pricing Transparency - Address "how much" search intent */}
      <PricingGuideSection
        serviceName="Commercial Lawn Care"
        lowRange="$200"
        highRange="$800"
        factors={[
          "Property square footage and complexity",
          "Service frequency (weekly, bi-weekly, monthly)",
          "Scope: mowing only vs. full-service package",
          "Seasonal add-ons (snow removal, leaf cleanup)",
          "Multi-property discounts available",
          "Contract length (monthly vs. annual)"
        ]}
        note="Most commercial clients save 15-20% with seasonal contracts. We'll walk your property for an exact quote."
      />

      <TrustStrip variant="light" />

      {/* Custom Maintenance Plans */}
      <section className="py-20" style={{ background: bg.section }}>
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Custom Maintenance Plans Available
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-white/70">
              Every property is unique. We create customized maintenance schedules and service plans tailored to your specific needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center h-12 px-8 text-base md:text-lg font-bold rounded-lg animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black shadow-lg hover:shadow-amber-500/25 transition-shadow">
                Get a Custom Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900" asChild>
                <a href="tel:608-535-6057">
                  <Phone className="mr-2 h-5 w-5" />
                  (608) 535-6057
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQPageSchema([
          { question: "How much does commercial lawn care cost in Madison?", answer: "Most commercial properties pay $200-$800/month depending on property size, service frequency, and scope. Full-service contracts including mowing, edging, seasonal cleanup, and snow removal are available." },
          { question: "Do you provide insurance certificates?", answer: "Yes, we carry $1M liability coverage and can provide a Certificate of Insurance same-day for your property management records." },
          { question: "Can you work around business hours?", answer: "Absolutely. We offer early morning, evening, and weekend scheduling to minimize disruption to your tenants and customers." },
          { question: "What's your response time for issues?", answer: "Issues are acknowledged within 4 hours and resolved within 48 hours. You'll receive photo confirmation when complete." }
        ])) }}
      />
      <ItemListSchema items={[
        { name: 'Commercial Lawn Care', url: 'https://tgyardcare.com/commercial/lawn-care', position: 1 },
        { name: 'Commercial Aeration', url: 'https://tgyardcare.com/commercial/aeration', position: 2 },
        { name: 'Commercial Fertilization & Weed Control', url: 'https://tgyardcare.com/commercial/fertilization-weed-control', position: 3 },
        { name: 'Commercial Gutter Services', url: 'https://tgyardcare.com/commercial/gutters', position: 4 },
        { name: 'Commercial Property Enhancement', url: 'https://tgyardcare.com/commercial/property-enhancement', position: 5 },
        { name: 'Commercial Seasonal Services', url: 'https://tgyardcare.com/commercial/seasonal', position: 6 },
        { name: 'Commercial Snow Removal', url: 'https://tgyardcare.com/commercial/snow-removal', position: 7 },
      ]} />
      <WebPageSchema
        name="Commercial Services"
        description="Professional commercial lawn care and property maintenance for businesses, HOAs, and commercial properties in Madison and Dane County, Wisconsin."
        url="/commercial"
      />

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
