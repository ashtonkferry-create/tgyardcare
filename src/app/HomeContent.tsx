'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import LatestBlogPosts from "@/components/blog/LatestBlogPosts";
import ServiceCard from "@/components/ServiceCard";
import { GoogleReviewsSection } from "@/components/GoogleReviewsSection";
import { ComparisonTable } from "@/components/ComparisonTable";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SectionDivider } from "@/components/SectionTransition";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ServiceGuarantees } from "@/components/ServiceGuarantees";

import { WebPageSchema } from "@/components/schemas/WebPageSchema";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Scissors, Leaf, Trees, Trash2, Sparkles, CloudRain, Home, Shield, Flower2, Sprout, Phone, CheckCircle2, Clock, Users, ArrowRight, Package, SprayCan, ChevronLeft, ChevronRight, Snowflake, CircleDot } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { CarouselApi } from "@/components/ui/carousel";
import { sortServicesBySeason } from "@/lib/seasonalServices";
import { WinterHero } from "@/components/WinterHero";
import { SummerHero } from "@/components/SummerHero";
import { FallHero } from "@/components/FallHero";
import { WinterPriorityServices } from "@/components/WinterPriorityServices";
import { WinterValueProposition } from "@/components/WinterValueProposition";
import { WhyMadisonTrust } from "@/components/WhyMadisonTrust";
import { SeasonalPriorityServices } from "@/components/SeasonalPriorityServices";
import { FullSeasonContract } from "@/components/FullSeasonContract";
import { useSeasonalTheme } from "@/contexts/SeasonalThemeContext";
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
import nextdoorBadge from "@/assets/nextdoor-fave-badge.png";
import satisfactionBadge from "@/assets/satisfaction-badge.png";

// Helper to get image src from static imports (Next.js returns objects, not strings)
function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

const baseServices = [{
  icon: Scissors,
  title: "Lawn Mowing",
  description: "Same crew, same day, every week. Mowing, edging, blowing—done in under 45 minutes.",
  path: "/services/mowing",
  image: imgSrc(mowingImage)
}, {
  icon: SprayCan,
  title: "Herbicide Services",
  description: "Targeted treatment with visible results in 7-14 days. We document what was sprayed.",
  path: "/services/herbicide",
  image: imgSrc(herbicideImage)
}, {
  icon: Leaf,
  title: "Weeding",
  description: "Hand-pulled, roots removed. Chemical-free option for beds near edibles.",
  path: "/services/weeding",
  image: imgSrc(weedingImage)
}, {
  icon: Trees,
  title: "Mulching",
  description: "2-3\" depth, edges defined. Old mulch removed if needed. One-visit install.",
  path: "/services/mulching",
  image: imgSrc(mulchingImage)
}, {
  icon: Trash2,
  title: "Leaf Removal",
  description: "Full property cleared and hauled. Zero leaves left behind.",
  path: "/services/leaf-removal",
  image: imgSrc(leafRemovalImage)
}, {
  icon: Sparkles,
  title: "Spring Cleanup",
  description: "Debris removal, bed prep, first mow. Completed in one 2-4 hour visit.",
  path: "/services/spring-cleanup",
  image: imgSrc(springCleanupImage)
}, {
  icon: CloudRain,
  title: "Fall Cleanup",
  description: "Leaves cleared, gutters cleaned, lawn winterized. Done before first frost.",
  path: "/services/fall-cleanup",
  image: imgSrc(fallCleanupImage)
}, {
  icon: Home,
  title: "Gutter Cleaning",
  description: "Full cleanout, downspout flush, inspection. Completion photos sent.",
  path: "/services/gutter-cleaning",
  image: imgSrc(gutterImage)
}, {
  icon: Shield,
  title: "Gutter Guards",
  description: "Micro-mesh guards installed. Warranty documentation included.",
  path: "/services/gutter-guards",
  image: imgSrc(gutterGuardsImage)
}, {
  icon: Flower2,
  title: "Garden Beds",
  description: "Edging, weeding, seasonal planting. Monthly or per-visit plans.",
  path: "/services/garden-beds",
  image: imgSrc(mulchingImage)
}, {
  icon: Sprout,
  title: "Fertilization",
  description: "4-6 applications per season. Timed to Wisconsin growing cycles.",
  path: "/services/fertilization",
  image: imgSrc(fertilizationImage)
}, {
  icon: CircleDot,
  title: "Aeration",
  description: "2-3\" core plugs. Reduces compaction, improves water absorption.",
  path: "/services/aeration",
  image: imgSrc(aerationImage)
}, {
  icon: Scissors,
  title: "Bush Trimming",
  description: "Shrubs shaped and cleaned. Debris removed. Photos provided.",
  path: "/services/pruning",
  image: imgSrc(pruningImage)
}];

const allServices = [...baseServices, {
  icon: Snowflake,
  title: "Snow Removal",
  description: "Triggered at 2\"+ snowfall. Driveway, walks, porch. Salt included.",
  path: "/services/snow-removal",
  image: imgSrc(snowRemovalImage)
}];

const services = sortServicesBySeason(allServices);

export default function HomeContent() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { activeSeason } = useSeasonalTheme();

  useEffect(() => {
    if (!carouselApi) return;
    setCurrent(carouselApi.selectedScrollSnap());
    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  const scrollSnapList = carouselApi?.scrollSnapList() || [];
  const totalSlides = scrollSnapList.length;

  const trustStats = [
    { value: '500+', label: 'Dane County Properties' },
    { value: '4.9★', label: '80+ Google Reviews' },
    { value: '12', label: 'Madison-Area Cities' },
    { value: '24hr', label: 'Quote Response' },
  ];

  const { ref: statsRef, isInView: statsInView } = useScrollReveal();
  const { ref: badgesRef, isInView: badgesInView } = useScrollReveal();
  const { ref: servicesRef, isInView: servicesInView } = useScrollReveal();
  const { ref: galleryRef, isInView: galleryInView } = useScrollReveal();
  const { ref: standardRef, isInView: standardInView } = useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress variant="minimal" />

      <WebPageSchema name="TotalGuard Yard Care" description="Madison's most reliable lawn care and landscaping" url="/" />
      <Navigation showPromoBanner />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Business Summary">
        <p>TotalGuard Yard Care provides professional lawn care and yard maintenance services in Madison, Middleton, Waunakee, and Dane County, Wisconsin. We assign the same crew to your property every visit for consistent quality. Services include mowing, fertilization, gutter cleaning, snow removal, and seasonal cleanups. Call (608) 535-6057 for a free quote.</p>
      </section>

      {/* HERO: Season-Aware */}
      {activeSeason === 'winter' && <WinterHero />}
      {activeSeason === 'summer' && <SummerHero />}
      {activeSeason === 'fall' && <FallHero />}

      {/* IMMEDIATE TRUST: Stats Strip */}
      <section className="py-6 md:py-8 bg-gradient-to-r from-[#0f2a1a] via-[#1a3a2a] to-[#0f2a1a] text-white" ref={statsRef}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {trustStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
              >
                <div className="w-8 h-0.5 bg-white/30 mx-auto mb-3" />
                <div className="text-4xl md:text-5xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm md:text-base opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIORITY SERVICES: Seasonal */}
      {activeSeason === 'winter' ? (
        <>
          <WinterValueProposition />
          <WinterPriorityServices />
        </>
      ) : (
        <SeasonalPriorityServices />
      )}

      {/* TRUST AUTHORITY */}
      <WhyMadisonTrust />

      {/* PROOF + SERVICES: Unified Dark Cinematic Block */}
      <section id="services" className="relative py-16 md:py-24 overflow-hidden" ref={servicesRef}>
        {/* Dark forest background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14] via-[#0f2a1a] to-[#0a1f14]" />
        {/* Radial depth glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(34,197,94,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(16,185,129,0.06),transparent_60%)]" />
        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Trust Badges — Premium Floating Shelf */}
          <div ref={badgesRef} className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 max-w-5xl mx-auto mb-14 md:mb-20">
            {[
              { type: 'google' as const, alt: '4.9 star Google rating', title: '4.9★ Google', sub: 'Top Rated', accent: 'from-yellow-400/20 to-amber-500/10' },
              { type: 'image' as const, src: imgSrc(nextdoorBadge), alt: '2024 Nextdoor Neighborhood Fave', title: 'Nextdoor Fave', sub: '2024 Winner', accent: 'from-emerald-400/20 to-green-500/10' },
              { type: 'image' as const, src: imgSrc(satisfactionBadge), alt: '100% satisfaction guarantee', title: '100% Guarantee', sub: 'Or We Fix It', accent: 'from-emerald-400/20 to-teal-500/10' },
            ].map((badge, index) => (
              <motion.div
                key={badge.alt}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={badgesInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
                className="group relative"
              >
                {/* Hover glow */}
                <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${badge.accent} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                <div className="relative flex items-center gap-4 bg-[#0d1f15]/80 backdrop-blur-md border border-emerald-500/10 rounded-2xl px-6 py-5 hover:border-emerald-400/25 hover:bg-[#0d1f15] transition-all duration-500">
                  {/* Badge icon */}
                  <div className="relative flex-shrink-0">
                    <div className="h-14 w-14 rounded-full border border-emerald-500/15 overflow-hidden group-hover:border-emerald-400/30 transition-colors duration-500 flex items-center justify-center bg-white">
                      {badge.type === 'google' ? (
                        <svg className="h-8 w-8 group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" aria-label="Google">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 1 12c0 1.94.46 3.77 1.18 5.07l3.66-2.98z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                      ) : (
                        <Image
                          src={badge.src!}
                          alt={badge.alt}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                          width={56}
                          height={56}
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-base font-bold text-white tracking-tight leading-tight">{badge.title}</p>
                    <p className="text-xs text-emerald-300/50 font-medium uppercase tracking-wider mt-0.5">{badge.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Services Header */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={servicesInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold mb-4 border border-emerald-500/20 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              One Call Handles It All
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              14+ Services. <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">One Trusted Team.</span>
            </h2>
            <p className="text-emerald-100/60 text-sm md:text-base max-w-lg mx-auto">
              Stop juggling contractors. We handle your entire property—lawn to gutters.
            </p>
          </motion.div>

          <Carousel opts={{
            align: "start",
            loop: true,
            dragFree: true,
            containScroll: "trimSnaps"
          }} setApi={setCarouselApi} className="w-full max-w-6xl mx-auto">
            <CarouselContent className="-ml-3">
              {services.map((service, index) => (
                <CarouselItem key={index} className="pl-3 basis-[80%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <ServiceCard {...service} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {totalSlides > 0 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <Button variant="ghost" size="icon" onClick={() => carouselApi?.scrollPrev()} className="rounded-full h-8 w-8 border border-emerald-500/20 hover:border-emerald-400/40 hover:bg-emerald-500/10 text-emerald-300/70 hover:text-emerald-200" aria-label="Previous">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex gap-1.5">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => carouselApi?.scrollTo(index)}
                    className={`rounded-full transition-all duration-300 ${index === current ? 'bg-emerald-400 h-2 w-6' : 'bg-emerald-500/30 hover:bg-emerald-400/50 h-2 w-2'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <Button variant="ghost" size="icon" onClick={() => carouselApi?.scrollNext()} className="rounded-full h-8 w-8 border border-emerald-500/20 hover:border-emerald-400/40 hover:bg-emerald-500/10 text-emerald-300/70 hover:text-emerald-200" aria-label="Next">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Residential/Commercial Quick Links */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center max-w-xl mx-auto">
            <Link
              href="/residential"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/20 hover:border-emerald-400/40 hover:bg-emerald-500/10 transition-all text-sm font-medium text-emerald-100/80 hover:text-white hover:scale-[1.02] hover:shadow-md hover:shadow-emerald-500/10"
            >
              <Home className="h-4 w-4 text-emerald-400" />
              Residential Services
              <ArrowRight className="h-3.5 w-3.5 text-emerald-500/50 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/commercial"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-white hover:bg-emerald-500/25 transition-all text-sm font-medium hover:scale-[1.02] hover:shadow-md hover:shadow-emerald-500/10"
            >
              <Package className="h-4 w-4 text-emerald-300" />
              Commercial Services
              <ArrowRight className="h-3.5 w-3.5 text-emerald-400/60 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>

          {/* Micro-trust line */}
          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-4 text-xs text-emerald-300/40">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-500/60" />
                Free Estimates
              </span>
              <span className="w-1 h-1 bg-emerald-500/30 rounded-full" />
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-500/60" />
                Same-Day Response
              </span>
              <span className="w-1 h-1 bg-emerald-500/30 rounded-full" />
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-500/60" />
                Fully Insured
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FLAGSHIP: Full Season Contract */}
      <FullSeasonContract />

      {/* PROOF: Before/After */}
      <section className="py-10 md:py-14 bg-white" ref={galleryRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="w-12 h-px bg-gray-200 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Real Results. <span className="text-primary">Real Properties.</span>
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Actual transformations from Madison-area homes—no stock photos.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={galleryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="relative border border-blue-100/30 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-blue-100/20 transition-all duration-500">
                <Image
                  alt="Before and after lawn transformation showing improved grass quality and curb appeal"
                  className="w-full rounded-xl shadow-lg"
                  src="/lovable-uploads/01f91d74-e152-48d0-961c-a2ebcf1e03bf.webp"
                  width={600}
                  height={400}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-1 text-xs font-bold text-gray-900 shadow-sm">
                  Madison, WI
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                <span><strong className="text-gray-900">4-week result:</strong> Weekly mowing + edging + debris removal</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={galleryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="order-1 lg:order-2 space-y-4"
            >
              <div className="space-y-3">
                {[
                  { label: "Consistent visits", desc: "Same crew, same schedule" },
                  { label: "Visible improvement", desc: "Within 2-4 weeks" },
                  { label: "Documented work", desc: "Before/after photos on request" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200/50 hover:border-primary/30 hover:bg-blue-50/50 hover:border-blue-200/50 transition-colors">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button size="default" variant="accent" asChild className="mt-4">
                <Link href="/gallery">
                  View Full Gallery <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* SOCIAL PROOF: Google Reviews */}
      <GoogleReviewsSection />

      {/* COMPARISON: TotalGuard vs Others */}
      <ComparisonTable />

      {/* SERVICE STANDARD */}
      <section className="py-6 md:py-8 bg-white" ref={standardRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="w-10 h-0.5 bg-gradient-to-r from-blue-300/50 to-transparent mb-4" />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                The TotalGuard Standard
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="text-primary font-bold">4.9★</span> Google Rating
                </span>
                <span className="hidden sm:block w-px h-4 bg-gray-200" />
                <span className="hidden sm:flex items-center gap-1.5">
                  <span className="text-primary font-bold">500+</span> Clients Served
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3 py-4 border-t border-blue-100/40">
              {[
                { icon: Clock, title: '24hr Response', desc: 'Same-day quotes' },
                { icon: CheckCircle2, title: 'Quality Walk', desc: 'Inspected before leaving' },
                { icon: Users, title: 'Same Crew', desc: 'Every single visit' },
                { icon: Shield, title: 'Make-It-Right', desc: 'Free return guarantee' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={standardInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-2.5 group"
                >
                  <div className="p-1.5 rounded-lg bg-primary/5 group-hover:bg-primary/15 transition-colors">
                    <item.icon className="h-4 w-4 text-primary flex-shrink-0" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-900 block leading-tight">{item.title}</span>
                    <span className="text-xs text-gray-500">{item.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-10 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                What Happens When You Contact Us
              </h2>
              <p className="text-sm text-gray-500">
                No mystery. No runaround. Here&apos;s exactly how it works.
              </p>
            </div>
            <ProcessTimeline variant="horizontal" />
          </div>
        </div>
      </section>

      {/* LATEST BLOG POSTS */}
      <section className="py-16 md:py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <LatestBlogPosts />
        </div>
      </section>

      {/* FINAL CTA */}
      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
