'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SectionDivider, SectionConnector } from "@/components/SectionTransition";
import { SectionHeader } from "@/components/SectionHeader";
import {
  ArrowRight,
  Scissors,
  Trees,
  Sparkles,
  Leaf,
  Trash2,
  CloudRain,
  Flower2,
  Sprout,
  CircleDot,
  SprayCan,
  Snowflake,
  MapPin,
  Phone,
  CheckCircle2,
  Home,
  Shield,
  Building2
} from "lucide-react";

// Import service images
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

// Service categories for SEO-optimized structure
const serviceCategories = [
  {
    id: "lawn-care",
    title: "Lawn Care & Maintenance",
    description: "Keep your Madison lawn healthy, green, and professionally maintained all season long.",
    services: [
      {
        icon: Scissors,
        title: "Lawn Mowing",
        slug: "mowing",
        description: "Weekly mowing with edging and blowing. Same crew every visit, consistent quality.",
        image: mowingImage,
        keywords: ["lawn mowing Madison WI", "grass cutting Middleton", "weekly mowing service"]
      },
      {
        icon: SprayCan,
        title: "Herbicide Treatment",
        slug: "herbicide",
        description: "Targeted weed control with visible results in 7-14 days. Documentation provided.",
        image: herbicideImage,
        keywords: ["weed control Madison", "herbicide treatment Dane County"]
      },
      {
        icon: Sprout,
        title: "Fertilization",
        slug: "fertilization",
        description: "4-6 seasonal applications timed to Wisconsin growing cycles for optimal lawn health.",
        image: fertilizationImage,
        keywords: ["lawn fertilization Madison WI", "fertilizer service Middleton"]
      },
      {
        icon: CircleDot,
        title: "Aeration",
        slug: "aeration",
        description: "Core aeration reduces compaction and improves water absorption. Fall or spring service.",
        image: aerationImage,
        keywords: ["lawn aeration Madison", "core aeration Dane County"]
      }
    ]
  },
  {
    id: "garden-beds",
    title: "Garden & Bed Maintenance",
    description: "Transform and maintain your garden beds with professional mulching, weeding, and seasonal care.",
    services: [
      {
        icon: Trees,
        title: "Mulching",
        slug: "mulching",
        description: "Premium mulch installation at 2-3\" depth. Old mulch removed, edges defined.",
        image: mulchingImage,
        keywords: ["mulching Madison WI", "mulch installation Middleton"]
      },
      {
        icon: Leaf,
        title: "Weeding",
        slug: "weeding",
        description: "Hand-pulled weeds with roots removed. Chemical-free option available.",
        image: weedingImage,
        keywords: ["weeding service Madison", "garden bed maintenance"]
      },
      {
        icon: Flower2,
        title: "Garden Beds",
        slug: "garden-beds",
        description: "Edging, weeding, and seasonal planting. Monthly or per-visit maintenance plans.",
        image: gardenBedsImage,
        keywords: ["garden bed service Madison WI", "flower bed maintenance"]
      },
      {
        icon: Scissors,
        title: "Bush Trimming & Pruning",
        slug: "pruning",
        description: "Shape and trim shrubs professionally. Debris removed, before/after photos provided.",
        image: pruningImage,
        keywords: ["bush trimming Madison", "shrub pruning Middleton WI"]
      }
    ]
  },
  {
    id: "seasonal",
    title: "Seasonal Cleanup Services",
    description: "Prepare your property for each Wisconsin season with comprehensive cleanup and maintenance.",
    services: [
      {
        icon: Sparkles,
        title: "Spring Cleanup",
        slug: "spring-cleanup",
        description: "Debris removal, bed edging, first mow, and gutter check. One visit, 2-4 hours.",
        image: springCleanupImage,
        keywords: ["spring cleanup Madison WI", "spring yard cleanup Dane County"]
      },
      {
        icon: CloudRain,
        title: "Fall Cleanup",
        slug: "fall-cleanup",
        description: "Leaf removal, final mow, gutter cleanout, winterization. Done before first frost.",
        image: fallCleanupImage,
        keywords: ["fall cleanup Madison", "fall yard service Middleton"]
      },
      {
        icon: Trash2,
        title: "Leaf Removal",
        slug: "leaf-removal",
        description: "Full property cleared. Leaves bagged and hauled or mulched. Zero left behind.",
        image: leafRemovalImage,
        keywords: ["leaf removal Madison WI", "leaf cleanup Dane County"]
      },
      {
        icon: Snowflake,
        title: "Snow Removal",
        slug: "snow-removal",
        description: "Triggered at 2\"+ snowfall. Driveway, walkways, porch cleared. Salt included.",
        image: snowRemovalImage,
        keywords: ["snow removal Madison WI", "snow plowing Middleton"]
      }
    ]
  },
  {
    id: "gutters",
    title: "Gutter Services",
    description: "Protect your home with professional gutter cleaning and guard installation.",
    services: [
      {
        icon: Home,
        title: "Gutter Cleaning",
        slug: "gutter-cleaning",
        description: "Full cleanout, downspout flush, roof-line inspection. Photos sent after completion.",
        image: gutterImage,
        keywords: ["gutter cleaning Madison WI", "gutter service Middleton"]
      },
      {
        icon: Shield,
        title: "Gutter Guards",
        slug: "gutter-guards",
        description: "LeafFilter-style micro-mesh guards. Professional installation with warranty.",
        image: gutterGuardsImage,
        keywords: ["gutter guards Madison", "gutter guard installation Dane County"]
      }
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
  { name: "Stoughton", path: "/locations/stoughton" }
];

export default function ServicesContent() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress variant="minimal" />

      <BreadcrumbSchema items={[
        { name: "Home", url: "https://tgyardcare.com" },
        { name: "Services", url: "https://tgyardcare.com/services" }
      ]} />

      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Services Summary">
        <p>TotalGuard Yard Care offers 14 professional lawn and yard services in Madison, Wisconsin. Our service categories include lawn care (mowing, fertilization, aeration, herbicide), garden bed maintenance (mulching, weeding, pruning), seasonal cleanups (spring, fall, leaf removal), and home exterior (gutter cleaning, gutter guards, snow removal). Same crew every visit. Call (608) 535-6057.</p>
      </section>

      {/* Hero Section - Premium Dark with Layered Depth */}
      <section className="relative py-20 pt-24 md:py-28 md:pt-28 lg:py-32 lg:pt-32 bg-gradient-to-br from-stone-950 via-slate-900 to-stone-900 overflow-hidden">
        {/* Sophisticated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/6 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[80px]" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Floating badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-900/40 via-emerald-800/30 to-teal-900/40 backdrop-blur-xl text-white px-5 py-2.5 rounded-full text-sm font-semibold border border-emerald-500/20 shadow-lg shadow-emerald-900/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-300">14+ Services</span>
                </div>
                <div className="w-px h-4 bg-emerald-600/40" />
                <span className="text-white/90">One Trusted Team</span>
              </div>
            </div>

            {/* Main headline with animated gradient */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center mb-6 leading-[1.05] tracking-tight">
              <span className="text-white">Complete Property Care</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
                Madison & Dane County
              </span>
            </h1>

            {/* Value proposition */}
            <p className="text-lg md:text-xl text-slate-300/90 text-center mb-10 max-w-3xl mx-auto leading-relaxed">
              From weekly lawn care to seasonal cleanups, gutter maintenance to snow removal—
              <span className="text-white font-medium"> one reliable team handles everything.</span>
            </p>

            {/* CTAs with premium styling */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-lg px-8 h-14 shadow-xl shadow-emerald-900/30 hover:shadow-2xl hover:shadow-emerald-800/40 transition-all duration-300 hover:scale-[1.02]"
                asChild
              >
                <Link href="/contact">
                  <span className="relative z-10 flex items-center">
                    Get Your Free Quote
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-slate-600 bg-slate-800/50 text-white hover:bg-slate-700/60 hover:border-slate-500 font-bold text-lg px-8 h-14 backdrop-blur-md transition-all duration-300"
                asChild
              >
                <a href="tel:608-535-6057">
                  <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  (608) 535-6057
                </a>
              </Button>
            </div>

            {/* Trust indicators with sophisticated styling */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {[
                { icon: CheckCircle2, text: "Same Crew Every Visit" },
                { icon: CheckCircle2, text: "24-Hour Quote Response" },
                { icon: Shield, text: "100% Satisfaction Guarantee" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-slate-400 hover:text-slate-300 transition-colors">
                  <item.icon className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-900 to-transparent" />
      </section>

      {/* Quick Links - Premium Split Design */}
      <section className="relative py-12 md:py-16 bg-gradient-to-b from-stone-900 via-stone-900 to-background overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'
        }} />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Residential Card */}
            <Link
              href="/residential"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950/80 via-emerald-900/60 to-teal-950/80 border border-emerald-700/30 hover:border-emerald-500/50 p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/30 hover:-translate-y-1"
            >
              {/* Card glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl mb-5 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                  <Home className="h-7 w-7 text-emerald-400" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  Residential Services
                </h3>
                <p className="text-slate-400 mb-4 leading-relaxed">
                  Homeowner packages from weekly mowing to full-season property care. Your lawn, our priority.
                </p>

                <div className="flex items-center text-emerald-400 font-semibold">
                  <span>View Services</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>

            {/* Commercial Card */}
            <Link
              href="/commercial"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-stone-900/80 border border-slate-700/30 hover:border-amber-500/50 p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-900/20 hover:-translate-y-1"
            >
              {/* Card glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl mb-5 border border-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="h-7 w-7 text-amber-400" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  Commercial Services
                </h3>
                <p className="text-slate-400 mb-4 leading-relaxed">
                  Office parks, retail centers, HOAs & multi-family. Reliable crews, professional results.
                </p>

                <div className="flex items-center text-amber-400 font-semibold">
                  <span>View Services</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      {serviceCategories.map((category, categoryIndex) => (
        <section
          key={category.id}
          id={category.id}
          className={`py-12 md:py-16 ${categoryIndex % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}
        >
          <div className="container mx-auto px-4">
            {categoryIndex === 0 && <SectionConnector className="mb-8" />}

            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {category.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {category.services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={imgSrc(service.image)}
                      alt={`${service.title} service in Madison WI - TotalGuard Yard Care`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {service.description}
                    </p>
                    <div className="text-primary text-sm font-semibold flex items-center">
                      Learn More <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <SectionDivider />

      {/* Service Areas */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Service Areas"
            badgeIcon={MapPin}
            title="Serving"
            titleHighlight="All of Dane County"
            description="Professional lawn care throughout the Madison metro area and surrounding communities."
            size="lg"
          />

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-w-4xl mx-auto mb-8">
            {locations.map((location) => (
              <Link
                key={location.name}
                href={location.path}
                className="bg-card border border-border rounded-lg px-3 py-2 text-center hover:border-primary hover:bg-primary/5 transition-all group text-sm"
              >
                <span className="font-medium text-foreground">{location.name}</span>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" asChild>
              <Link href="/service-areas">
                View All Service Areas <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* The TotalGuard Standard */}
      <section className="py-12 md:py-16 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
              The TotalGuard Standard
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Every service we provide comes with these guarantees—no exceptions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 bg-card border border-border rounded-xl p-6">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Same Crew Consistency</h3>
                  <p className="text-sm text-muted-foreground">Your dedicated 2-person team knows your property and preferences. No random contractors.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-card border border-border rounded-xl p-6">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">24-Hour Quote Response</h3>
                  <p className="text-sm text-muted-foreground">Request a quote today, receive a detailed written estimate by tomorrow.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-card border border-border rounded-xl p-6">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">No Surprise Pricing</h3>
                  <p className="text-sm text-muted-foreground">Your quote lists exactly what's included. The price quoted is the price paid.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-card border border-border rounded-xl p-6">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">48-Hour Issue Resolution</h3>
                  <p className="text-sm text-muted-foreground">Problem? Text a photo. We acknowledge same-day and resolve within 48 hours.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer
        closerTitle="Ready to Get Started?"
        closerDescription="Join 500+ Dane County homeowners who trust TotalGuard for all their lawn care needs. Free quotes within 24 hours."
      />
    </div>
  );
}
