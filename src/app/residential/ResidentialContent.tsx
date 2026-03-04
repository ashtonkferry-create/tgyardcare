'use client';

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from '@/components/CTASection';
import { ItemListSchema } from "@/components/schemas/ItemListSchema";
import { WebPageSchema } from "@/components/schemas/WebPageSchema";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AmbientParticles } from "@/components/AmbientParticles";
import { GlassCard } from '@/components/GlassCard';
import { ScrollReveal } from '@/components/ScrollReveal';
import { TrustStrip } from '@/components/TrustStrip';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import {
  Home, CheckCircle2, Clock, Shield, Award, Phone, ArrowRight,
  Scissors, Trees, Sparkles, Leaf, Trash2, CloudRain, Flower2,
  Sprout, CircleDot, SprayCan, Snowflake, MapPin, Star, ChevronRight
} from "lucide-react";
import heroImage from "@/assets/hero-lawn.jpg";
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
import gardenBedsImage from "@/assets/service-mulching.jpg";
import aerationImage from "@/assets/hero-aeration.jpg";
import { sortServicesBySeason } from "@/lib/seasonalServices";

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
    hero:    'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.15) 0%, transparent 70%), linear-gradient(to bottom, #050d07, #0a1a0e, #060e08)',
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

const allServices = [
  { icon: Scissors, title: "Lawn Mowing", description: "Weekly service, same crew assigned. Mowing, edging, and blowing—completed in under 45 minutes.", path: "/services/mowing", image: mowingImage, category: "lawn" },
  { icon: SprayCan, title: "Herbicide Treatment", description: "Targeted weed elimination with visible results in 7-14 days. We document what was treated.", path: "/services/herbicide", image: herbicideImage, category: "lawn" },
  { icon: Leaf, title: "Weeding", description: "Hand-pulled weeds, roots removed. Chemical-free option available for beds near edibles.", path: "/services/weeding", image: weedingImage, category: "beds" },
  { icon: Trees, title: "Mulching", description: "2-3\" depth, edges defined, old mulch removed if needed. One-visit installation.", path: "/services/mulching", image: mulchingImage, category: "beds" },
  { icon: Flower2, title: "Garden Beds", description: "Edging, weeding, and seasonal planting. Maintenance plans available monthly or per-visit.", path: "/services/garden-beds", image: gardenBedsImage, category: "beds" },
  { icon: Scissors, title: "Bush Trimming & Pruning", description: "Shape and trim shrubs. Debris removed, property left clean. Photos before and after.", path: "/services/pruning", image: pruningImage, category: "beds" },
  { icon: Sprout, title: "Fertilization", description: "4-6 applications per season based on soil needs. Timing aligned with Wisconsin growing cycles.", path: "/services/fertilization", image: fertilizationImage, category: "lawn" },
  { icon: CircleDot, title: "Aeration", description: "Core aeration with 2-3\" plugs. Reduces compaction, improves water absorption. Done in fall or spring.", path: "/services/aeration", image: aerationImage, category: "lawn" },
  { icon: Home, title: "Gutter Cleaning", description: "Full cleanout, downspout flush, and roof-line inspection. Photos sent after completion.", path: "/services/gutter-cleaning", image: gutterImage, category: "gutters" },
  { icon: Shield, title: "Gutter Guards", description: "LeafFilter-style micro-mesh guards. Includes installation and warranty documentation.", path: "/services/gutter-guards", image: gutterGuardsImage, category: "gutters" },
  { icon: Sparkles, title: "Spring Cleanup", description: "Debris removal, bed edging, first mow, and gutter check. One-visit service, typically 2-4 hours.", path: "/services/spring-cleanup", image: springCleanupImage, category: "seasonal" },
  { icon: CloudRain, title: "Fall Cleanup", description: "Leaf removal, final mow, gutter cleanout, and winterization. Completed before first frost.", path: "/services/fall-cleanup", image: fallCleanupImage, category: "seasonal" },
  { icon: Trash2, title: "Leaf Removal", description: "Full property cleared. Leaves bagged and hauled or mulched in place. Zero left behind.", path: "/services/leaf-removal", image: leafRemovalImage, category: "seasonal" },
];

const services = sortServicesBySeason([...allServices, {
  icon: Snowflake, title: "Snow Removal", description: "Triggered by 2\"+ snowfall. Driveway, walkways, and porch cleared. Salt included.", path: "/services/snow-removal", image: snowRemovalImage, category: "seasonal"
}]);

const whyChooseUs = [
  { icon: CheckCircle2, title: "Scheduled Day, Every Week", description: "Your service day is locked. Same 2-person crew arrives at the same time window. No wondering." },
  { icon: Clock, title: "Quotes Within 24 Hours", description: "Request → Assessment → Written quote. All within one business day. Average response: 2 hours." },
  { icon: Shield, title: "Insured with Documentation", description: "$1M liability coverage. Certificate of Insurance available on request for any job." },
  { icon: Award, title: "Issue Resolution in 48 Hours", description: "Text a photo of any problem. We acknowledge same day, return to fix within 48 hours. No charge." },
];

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
  { name: "Stoughton", path: "/locations/stoughton" },
];

const processSteps = [
  { step: "01", title: "Request a Quote", body: "Fill out our simple form or give us a call. We respond within 24 hours—often in 2." },
  { step: "02", title: "Get Your Plan", body: "We assess your property and provide a detailed, transparent quote. No surprises." },
  { step: "03", title: "Enjoy Your Yard", body: "Sit back while we transform your property. Same crew every visit, every season." },
];

export default function ResidentialContent() {
  const { activeSeason } = useSeasonalTheme();
  const acc = seasonalAccent[activeSeason];
  const bg = seasonalBg[activeSeason];

  return (
    <div className="min-h-screen text-white" style={{ background: bg.page }}>
      <ScrollProgress variant="minimal" />

      <ItemListSchema items={[
        { name: "Lawn Mowing", url: "/services/mowing", position: 1 },
        { name: "Mulching", url: "/services/mulching", position: 2 },
        { name: "Garden Beds", url: "/services/garden-beds", position: 3 },
        { name: "Weeding", url: "/services/weeding", position: 4 },
        { name: "Pruning", url: "/services/pruning", position: 5 },
        { name: "Fertilization", url: "/services/fertilization", position: 6 },
        { name: "Herbicide", url: "/services/herbicide", position: 7 },
        { name: "Aeration", url: "/services/aeration", position: 8 },
        { name: "Gutter Cleaning", url: "/services/gutter-cleaning", position: 9 },
        { name: "Gutter Guards", url: "/services/gutter-guards", position: 10 },
        { name: "Leaf Removal", url: "/services/leaf-removal", position: 11 },
        { name: "Spring Cleanup", url: "/services/spring-cleanup", position: 12 },
        { name: "Fall Cleanup", url: "/services/fall-cleanup", position: 13 },
        { name: "Snow Removal", url: "/services/snow-removal", position: 14 },
      ]} />
      <WebPageSchema name="Residential Lawn Care Services" description="Professional residential lawn care for Madison and Dane County homeowners" url="/residential" />
      <Navigation />

      {/* SEO */}
      <section className="sr-only" aria-label="Residential Services Summary">
        <p>TotalGuard Yard Care provides residential lawn care for homeowners in Madison, Middleton, Waunakee, and Dane County, Wisconsin. 14 services including weekly mowing, fertilization, gutter cleaning, mulching, and seasonal cleanups. Same crew every visit. Free quotes within 24 hours.</p>
      </section>

      {/* ── HERO ── */}
      <section
        className="relative min-h-[80vh] flex items-center py-28 md:py-36 overflow-hidden"
        style={{ background: bg.hero }}
      >
        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
        />
        <AmbientParticles density="sparse" className="absolute inset-0" />
        <div className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 ${acc.bg}`} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border mb-8 ${acc.bg} ${acc.border} ${acc.text}`}>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                4.9★ from 80+ Google Reviews
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-6">
                Lawn Care Across{' '}
                <br />
                <span className={acc.text}>Madison &amp; Dane County</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-xl md:text-2xl text-white/60 mb-10 leading-relaxed max-w-3xl mx-auto">
                One team. 14+ services. Same crew, same standards, every visit. Serving Madison, Middleton, Waunakee, Sun Prairie, and 8 more Dane County cities.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-black text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
                  style={{ background: acc.solid }}
                >
                  Get My Free Quote <ArrowRight className="h-5 w-5" />
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
              <div className="flex flex-wrap justify-center gap-6 text-white/55 text-sm">
                {['Same Crew Every Visit', 'Quotes in 24 Hours', 'No Surprise Fees'].map((point, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className={`h-4 w-4 ${acc.text}`} />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <TrustStrip variant="dark" />

      {/* ── SERVICES GRID ── */}
      <section className="py-20 md:py-28" style={{ background: bg.section }}>
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-14">
            <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 ${acc.text}`}>
              <Sparkles className="h-3 w-3" />
              One Team Handles Everything
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              14+ Services.{' '}
              <span className={acc.text}>Zero Headaches.</span>
            </h2>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">
              Stop juggling contractors. We handle lawn, beds, gutters, and seasonal work—all with the same reliable crew.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={(index % 8) * 0.05}>
                <Link
                  href={service.path}
                  className={`group block bg-black/30 backdrop-blur-xl border border-white/[0.06] rounded-xl overflow-hidden hover:-translate-y-1.5 hover:shadow-2xl hover:${acc.border.replace('border-', 'border-')} transition-all duration-300`}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={imgSrc(service.image)}
                      alt={`${service.title} service in Madison WI`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
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
                    <p className="text-white/45 text-sm mb-3 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
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

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 md:py-28" style={{ background: bg.hero }}>
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-14">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-4 ${acc.text}`}>Why Homeowners Switch</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              The Bar in This Industry Is Low.
            </h2>
            <p className="text-white/50 text-xl max-w-2xl mx-auto">
              We just do what we say we&apos;ll do.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.08}>
                  <GlassCard variant="dark" hover="lift" accentBorder className="text-center h-full">
                    <div className={`inline-flex p-4 rounded-2xl ${acc.bg} border ${acc.border} mb-5`}>
                      <Icon className={`h-7 w-7 ${acc.text}`} />
                    </div>
                    <h3 className="text-lg font-black text-white mb-3">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Testimonial quote */}
          <ScrollReveal delay={0.3} className="mt-10 max-w-3xl mx-auto">
            <GlassCard variant="dark" hover="none" className={`border-l-4 ${acc.border.replace('border-', 'border-l-')} text-center`}>
              <p className="text-white/70 text-lg italic leading-relaxed mb-3">
                &ldquo;We&apos;ve tried several lawn care companies in Madison and TotalGuard is by far the best. They&apos;re responsive to texts, show up when they say they will, and the quality of work is outstanding.&rdquo;
              </p>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className={`text-sm font-semibold ${acc.text}`}>— Amanda S. · Lawn Maintenance</div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-20 md:py-28" style={{ background: bg.page }}>
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-14">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-4 ${acc.text}`}>Getting Started</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Easy as{' '}<span className={acc.text}>1-2-3</span>
            </h2>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">
              Three simple steps to a beautiful, stress-free yard.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {processSteps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <GlassCard variant="dark" hover="lift" className="text-center relative">
                  <div className={`text-6xl font-black mb-4 ${acc.text} opacity-20`}>{step.step}</div>
                  <h3 className="text-xl font-black text-white mb-3">{step.title}</h3>
                  <p className="text-white/55 leading-relaxed">{step.body}</p>
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
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Serving Greater Madison
            </h2>
            <p className="text-white/50 text-xl max-w-2xl mx-auto">
              Professional lawn care throughout Dane County. Find your location below.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-5xl mx-auto mb-10">
            {locations.map((location, index) => (
              <ScrollReveal key={index} delay={(index % 6) * 0.04}>
                <Link
                  href={location.path}
                  className={`group flex items-center justify-center gap-2 px-4 py-3 rounded-lg border ${acc.border} ${acc.bg} ${acc.text} text-sm font-medium hover:border-opacity-80 transition-all duration-300 hover:-translate-y-0.5`}
                >
                  <MapPin className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100" />
                  {location.name}
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center">
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white font-semibold transition-colors"
            >
              View All Service Areas <ChevronRight className="h-5 w-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── METRICS STRIP ── */}
      <section className="py-12 border-t border-white/5" style={{ background: bg.page }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-10 md:gap-20">
            {[
              { value: 500, suffix: '+', label: 'Dane County Homes' },
              { value: 14, suffix: '+', label: 'Services Offered' },
              { value: 4.9, suffix: '★', decimals: 1, label: 'Google Rating' },
              { value: 12, suffix: '', label: 'Cities Served' },
            ].map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="text-center">
                  <div className={`text-3xl font-black ${acc.text}`}>
                    <AnimatedCounter end={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                  </div>
                  <div className="text-white/50 text-sm mt-1">{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer showCloser={false} />
    </div>
  );
}
