'use client';

import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema";
import { ItemListSchema } from "@/components/schemas/ItemListSchema";
import { WebPageSchema } from "@/components/schemas/WebPageSchema";
import { ScrollProgress } from "@/components/ScrollProgress";
import CTASection from '@/components/CTASection';
import { AmbientParticles } from '@/components/AmbientParticles';
import { GlassCard } from '@/components/GlassCard';
import { ScrollReveal } from '@/components/ScrollReveal';
import { TrustStrip } from '@/components/TrustStrip';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import {
  ArrowRight, Scissors, Trees, Sparkles, Leaf, Trash2, CloudRain,
  Flower2, Sprout, CircleDot, SprayCan, Snowflake, MapPin, Phone,
  CheckCircle2, Home, Shield, Building2, ChevronRight
} from "lucide-react";
import mowingImage from "@/assets/service-mowing.jpg";
import herbicideImage from "@/assets/service-herbicide.jpg";
import weedingImage from "@/assets/service-weeding.jpg";
import mulchingImage from "@/assets/service-mulching.jpg";
import leafRemovalImage from "@/assets/service-leaf-removal.jpg";
import springCleanupImage from "@/assets/service-spring-cleanup.jpg";
import fallCleanupImage from "@/assets/service-fall-cleanup.jpg";
import gutterImage from "@/assets/service-gutter.jpg";
import gutterGuardsImage from "@/assets/service-gutter-guards.jpg";
import fertilizationImage from "@/assets/service-fertilization.jpg";
import snowRemovalImage from "@/assets/service-snow-removal.jpg";
import pruningImage from "@/assets/service-pruning.jpg";
import aerationImage from "@/assets/hero-aeration.jpg";
import gardenBedsImage from "@/assets/service-mulching.jpg";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

const seasonalAccent = {
  summer: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', solid: '#10b981' },
  fall:   { text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/30',   solid: '#f59e0b' },
  winter: { text: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/30',    solid: '#06b6d4' },
} as const;

const seasonalBg = {
  summer: {
    hero:    'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.15) 0%, transparent 70%), linear-gradient(to bottom, #050d07, #0a1a0e, #050d07)',
    page:    '#050d07',
    section: '#0a1a0e',
  },
  fall: {
    hero:    'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,158,11,0.15) 0%, transparent 70%), linear-gradient(to bottom, #0d0900, #1a1000, #0d0900)',
    page:    '#0d0900',
    section: '#1a1000',
  },
  winter: {
    hero:    'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,182,212,0.15) 0%, transparent 70%), linear-gradient(to bottom, #020810, #060f1a, #020810)',
    page:    '#020810',
    section: '#060f1a',
  },
} as const;

const serviceCategories = [
  {
    id: "lawn-care",
    title: "Lawn Care & Maintenance",
    description: "Keep your Madison lawn healthy, green, and professionally maintained all season long.",
    services: [
      { icon: Scissors, title: "Lawn Mowing", slug: "mowing", description: "Weekly mowing with edging and blowing. Same crew every visit, consistent quality.", image: mowingImage },
      { icon: SprayCan, title: "Herbicide Treatment", slug: "herbicide", description: "Targeted weed control with visible results in 7-14 days. Documentation provided.", image: herbicideImage },
      { icon: Sprout, title: "Fertilization", slug: "fertilization", description: "4-6 seasonal applications timed to Wisconsin growing cycles for optimal lawn health.", image: fertilizationImage },
      { icon: CircleDot, title: "Aeration", slug: "aeration", description: "Core aeration reduces compaction and improves water absorption. Fall or spring service.", image: aerationImage },
    ]
  },
  {
    id: "garden-beds",
    title: "Garden & Bed Maintenance",
    description: "Transform and maintain your garden beds with professional mulching, weeding, and seasonal care.",
    services: [
      { icon: Trees, title: "Mulching", slug: "mulching", description: "Premium mulch installation at 2-3\" depth. Old mulch removed, edges defined.", image: mulchingImage },
      { icon: Leaf, title: "Weeding", slug: "weeding", description: "Hand-pulled weeds with roots removed. Chemical-free option available.", image: weedingImage },
      { icon: Flower2, title: "Garden Beds", slug: "garden-beds", description: "Edging, weeding, and seasonal planting. Monthly or per-visit maintenance plans.", image: gardenBedsImage },
      { icon: Scissors, title: "Bush Trimming & Pruning", slug: "pruning", description: "Shape and trim shrubs professionally. Debris removed, before/after photos provided.", image: pruningImage },
    ]
  },
  {
    id: "seasonal",
    title: "Seasonal Cleanup Services",
    description: "Prepare your property for each Wisconsin season with comprehensive cleanup and maintenance.",
    services: [
      { icon: Sparkles, title: "Spring Cleanup", slug: "spring-cleanup", description: "Debris removal, bed edging, first mow, and gutter check. One visit, 2-4 hours.", image: springCleanupImage },
      { icon: CloudRain, title: "Fall Cleanup", slug: "fall-cleanup", description: "Leaf removal, final mow, gutter cleanout, winterization. Done before first frost.", image: fallCleanupImage },
      { icon: Trash2, title: "Leaf Removal", slug: "leaf-removal", description: "Full property cleared. Leaves bagged and hauled or mulched. Zero left behind.", image: leafRemovalImage },
      { icon: Snowflake, title: "Snow Removal", slug: "snow-removal", description: "Triggered at 2\"+ snowfall. Driveway, walkways, porch cleared. Salt included.", image: snowRemovalImage },
    ]
  },
  {
    id: "gutters",
    title: "Gutter Services",
    description: "Protect your home with professional gutter cleaning and guard installation.",
    services: [
      { icon: Home, title: "Gutter Cleaning", slug: "gutter-cleaning", description: "Full cleanout, downspout flush, roof-line inspection. Photos sent after completion.", image: gutterImage },
      { icon: Shield, title: "Gutter Guards", slug: "gutter-guards", description: "LeafFilter-style micro-mesh guards. Professional installation with warranty.", image: gutterGuardsImage },
    ]
  }
];

const locations = [
  { name: "Madison", path: "/locations/madison" },
  { name: "Middleton", path: "/locations/middleton" },
  { name: "Waunakee", path: "/locations/waunakee" },
  { name: "Sun Prairie", path: "/locations/sun-prairie" },
  { name: "Verona", path: "/locations/verona" },
  { name: "Fitchburg", path: "/locations/fitchburg" },
  { name: "Monona", path: "/locations/monona" },
  { name: "McFarland", path: "/locations/mcfarland" },
  { name: "DeForest", path: "/locations/deforest" },
  { name: "Cottage Grove", path: "/locations/cottage-grove" },
  { name: "Oregon", path: "/locations/oregon" },
  { name: "Stoughton", path: "/locations/stoughton" },
];

const standards = [
  { title: "Same Crew Consistency", body: "Your dedicated 2-person team knows your property and preferences. No random contractors." },
  { title: "24-Hour Quote Response", body: "Request a quote today, receive a detailed written estimate by tomorrow." },
  { title: "No Surprise Pricing", body: "Your quote lists exactly what's included. The price quoted is the price paid." },
  { title: "48-Hour Issue Resolution", body: "Problem? Text a photo. We acknowledge same-day and resolve within 48 hours." },
];

export default function ServicesContent() {
  const { activeSeason } = useSeasonalTheme();
  const acc = seasonalAccent[activeSeason];
  const bg = seasonalBg[activeSeason];

  return (
    <div className="min-h-screen text-white" style={{ background: bg.page }}>
      <ScrollProgress variant="minimal" />

      <BreadcrumbSchema items={[
        { name: "Home", url: "https://tgyardcare.com" },
        { name: "Services", url: "https://tgyardcare.com/services" }
      ]} />
      <ItemListSchema items={[
        { name: 'Lawn Mowing', url: 'https://tgyardcare.com/services/mowing', position: 1 },
        { name: 'Mulching', url: 'https://tgyardcare.com/services/mulching', position: 2 },
        { name: 'Leaf Removal', url: 'https://tgyardcare.com/services/leaf-removal', position: 3 },
        { name: 'Gutter Cleaning', url: 'https://tgyardcare.com/services/gutter-cleaning', position: 4 },
        { name: 'Spring Cleanup', url: 'https://tgyardcare.com/services/spring-cleanup', position: 5 },
        { name: 'Fall Cleanup', url: 'https://tgyardcare.com/services/fall-cleanup', position: 6 },
        { name: 'Fertilization', url: 'https://tgyardcare.com/services/fertilization', position: 7 },
        { name: 'Lawn Aeration', url: 'https://tgyardcare.com/services/aeration', position: 8 },
        { name: 'Weed Control', url: 'https://tgyardcare.com/services/weeding', position: 9 },
        { name: 'Herbicide Service', url: 'https://tgyardcare.com/services/herbicide', position: 10 },
        { name: 'Garden Bed Care', url: 'https://tgyardcare.com/services/garden-beds', position: 11 },
        { name: 'Tree & Shrub Pruning', url: 'https://tgyardcare.com/services/pruning', position: 12 },
        { name: 'Gutter Guards', url: 'https://tgyardcare.com/services/gutter-guards', position: 13 },
        { name: 'Snow Removal', url: 'https://tgyardcare.com/services/snow-removal', position: 14 },
      ]} />
      <WebPageSchema name="Our Services" description="Professional lawn care and landscaping services in Madison, WI" url="/services" />
      <Navigation />

      {/* SEO */}
      <section className="sr-only" aria-label="Services Summary">
        <p>TotalGuard Yard Care offers 14 professional lawn and yard services in Madison, Wisconsin. Services include lawn care (mowing, fertilization, aeration, herbicide), garden bed maintenance (mulching, weeding, pruning), seasonal cleanups (spring, fall, leaf removal), and home exterior (gutter cleaning, gutter guards, snow removal). Same crew every visit.</p>
      </section>

      {/* ── HERO ── */}
      <section
        className="relative py-28 md:py-36 overflow-hidden"
        style={{ background: bg.hero }}
      >
        <AmbientParticles density="sparse" className="absolute inset-0" />
        <div className={`absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full blur-3xl opacity-10 ${acc.bg}`} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full blur-3xl opacity-8 bg-white/5" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <ScrollReveal>
              <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-semibold border mb-8 ${acc.bg} ${acc.border} ${acc.text}`}>
                <div className={`w-2 h-2 rounded-full animate-pulse`} style={{ background: acc.solid }} />
                14+ Services · One Trusted Team
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-6">
                Complete Property Care
                <br />
                <span className={acc.text}>Madison &amp; Dane County</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.14}>
              <p className="text-xl md:text-2xl text-white/55 mb-10 max-w-3xl mx-auto leading-relaxed">
                From weekly lawn care to seasonal cleanups, gutter maintenance to snow removal—{' '}
                <span className="text-white/80 font-medium">one reliable team handles everything.</span>
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-black text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
                  style={{ background: acc.solid }}
                >
                  Get Your Free Quote <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="tel:608-535-6057"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white/80 border border-white/10 backdrop-blur-sm hover:border-white/20 hover:text-white transition-all duration-300"
                >
                  <Phone className="h-5 w-5" />
                  (608) 535-6057
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="flex flex-wrap justify-center gap-6 text-white/45 text-sm">
                {['Same Crew Every Visit', '24-Hour Quote Response', '100% Satisfaction Guarantee'].map((p, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className={`h-4 w-4 ${acc.text}`} />
                    {p}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: `linear-gradient(to top, ${bg.section}, transparent)` }} />
      </section>

      <TrustStrip variant="dark" />

      {/* ── RESIDENTIAL / COMMERCIAL SPLIT ── */}
      <section className="py-16" style={{ background: bg.section }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <ScrollReveal direction="left">
              <Link
                href="/residential"
                className={`group block relative overflow-hidden rounded-2xl bg-black/30 backdrop-blur-xl border ${acc.border} p-8 hover:border-opacity-60 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1`}
              >
                <div className={`absolute inset-0 ${acc.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${acc.bg} border ${acc.border} rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Home className={`h-7 w-7 ${acc.text}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Residential Services</h3>
                  <p className="text-white/50 mb-5 leading-relaxed">Homeowner packages from weekly mowing to full-season property care. Your lawn, our priority.</p>
                  <div className={`flex items-center font-semibold ${acc.text}`}>
                    View Services <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.08}>
              <Link
                href="/commercial"
                className="group block relative overflow-hidden rounded-2xl bg-black/30 backdrop-blur-xl border border-amber-500/20 p-8 hover:border-amber-500/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-500/10 border border-amber-500/30 rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="h-7 w-7 text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Commercial Services</h3>
                  <p className="text-white/50 mb-5 leading-relaxed">Office parks, retail centers, HOAs & multi-family. Reliable crews, professional results.</p>
                  <div className="flex items-center font-semibold text-amber-400">
                    View Services <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SERVICE CATEGORIES ── */}
      {serviceCategories.map((category, categoryIndex) => {
        const isDark = categoryIndex % 2 === 1;
        return (
          <section
            key={category.id}
            id={category.id}
            className="py-20 md:py-28"
            style={{ background: isDark ? bg.section : bg.page }}
          >
            <div className="container mx-auto px-4">
              <ScrollReveal className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                  {category.title}
                </h2>
                <p className="text-xl max-w-2xl mx-auto text-white/60">
                  {category.description}
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {category.services.map((service, i) => (
                  <ScrollReveal key={service.slug} delay={i * 0.07}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group block bg-black/30 backdrop-blur-xl border border-white/[0.06] rounded-xl overflow-hidden hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={imgSrc(service.image)}
                          alt={`${service.title} service in Madison WI - TotalGuard Yard Care`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          width={400}
                          height={160}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className={`absolute bottom-3 left-3 p-2 rounded-lg ${acc.bg} border ${acc.border}`}>
                          <service.icon className={`h-4 w-4 ${acc.text}`} />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className={`font-bold text-white mb-1.5 group-hover:${acc.text} transition-colors`}>
                          {service.title}
                        </h3>
                        <p className="text-white/40 text-sm mb-3 line-clamp-2 leading-relaxed">{service.description}</p>
                        <div className={`${acc.text} text-sm font-semibold flex items-center gap-1`}>
                          Learn More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── TOTALGUARD STANDARD ── */}
      <section className="py-20 md:py-28" style={{ background: bg.hero }}>
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-4 ${acc.text}`}>Every Service. No Exceptions.</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">The TotalGuard Standard</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {standards.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <GlassCard variant="dark" hover="lift" accentBorder className="flex gap-4 h-full">
                  <CheckCircle2 className={`h-6 w-6 flex-shrink-0 mt-0.5 ${acc.text}`} />
                  <div>
                    <h3 className="font-bold text-white mb-1">{s.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{s.body}</p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS ── */}
      <section className="py-20 md:py-28" style={{ background: bg.section }}>
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 ${acc.text}`}>
              <MapPin className="h-3 w-3" />
              Service Areas
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Serving All of Dane County</h2>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">Professional lawn care throughout the Madison metro area and surrounding communities.</p>
          </ScrollReveal>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-w-4xl mx-auto mb-8">
            {locations.map((location, index) => (
              <ScrollReveal key={location.name} delay={(index % 6) * 0.03}>
                <Link
                  href={location.path}
                  className={`group flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border ${acc.border} ${acc.bg} ${acc.text} text-sm font-medium hover:border-opacity-80 transition-all duration-300 hover:-translate-y-0.5`}
                >
                  {location.name}
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center">
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white font-semibold transition-colors"
            >
              View All Service Areas <ChevronRight className="h-5 w-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
      <Footer showCloser={false} />
    </div>
  );
}
