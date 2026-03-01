'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { ServiceSchema } from "@/components/ServiceSchema";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SectionDivider, SectionConnector } from "@/components/SectionTransition";
import { SectionHeader } from "@/components/SectionHeader";
import {
  Home,
  CheckCircle2,
  Clock,
  Shield,
  Award,
  Phone,
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
  Star,
  Users
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
import { isSnowRemovalSeason } from "@/lib/seasonalServices";

// Helper to get image src from static imports (Next.js returns objects, not strings)
function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

// All residential services
const allServices = [
  {
    icon: Scissors,
    title: "Lawn Mowing",
    description: "Weekly service, same crew assigned. Includes mowing, edging, and blowing—completed in under 45 minutes.",
    path: "/services/mowing",
    image: mowingImage,
    category: "lawn"
  },
  {
    icon: SprayCan,
    title: "Herbicide Treatment",
    description: "Targeted weed elimination with visible results in 7-14 days. We document what was treated.",
    path: "/services/herbicide",
    image: herbicideImage,
    category: "lawn"
  },
  {
    icon: Leaf,
    title: "Weeding",
    description: "Hand-pulled weeds, roots removed. Chemical-free option available for beds near edibles.",
    path: "/services/weeding",
    image: weedingImage,
    category: "beds"
  },
  {
    icon: Trees,
    title: "Mulching",
    description: "2-3\" depth, edges defined, old mulch removed if needed. One-visit installation.",
    path: "/services/mulching",
    image: mulchingImage,
    category: "beds"
  },
  {
    icon: Flower2,
    title: "Garden Beds",
    description: "Edging, weeding, and seasonal planting. Maintenance plans available monthly or per-visit.",
    path: "/services/garden-beds",
    image: gardenBedsImage,
    category: "beds"
  },
  {
    icon: Scissors,
    title: "Bush Trimming & Pruning",
    description: "Shape and trim shrubs. Debris removed, property left clean. Photos before and after.",
    path: "/services/pruning",
    image: pruningImage,
    category: "beds"
  },
  {
    icon: Sprout,
    title: "Fertilization",
    description: "4-6 applications per season based on soil needs. Timing aligned with Wisconsin growing cycles.",
    path: "/services/fertilization",
    image: fertilizationImage,
    category: "lawn"
  },
  {
    icon: CircleDot,
    title: "Aeration",
    description: "Core aeration with 2-3\" plugs. Reduces compaction, improves water absorption. Done in fall or spring.",
    path: "/services/aeration",
    image: aerationImage,
    category: "lawn"
  },
  {
    icon: Home,
    title: "Gutter Cleaning",
    description: "Full cleanout, downspout flush, and roof-line inspection. Photos sent after completion.",
    path: "/services/gutter-cleaning",
    image: gutterImage,
    category: "gutters"
  },
  {
    icon: Shield,
    title: "Gutter Guards",
    description: "LeafFilter-style micro-mesh guards. Includes installation and warranty documentation.",
    path: "/services/gutter-guards",
    image: gutterGuardsImage,
    category: "gutters"
  },
  {
    icon: Sparkles,
    title: "Spring Cleanup",
    description: "Debris removal, bed edging, first mow, and gutter check. One-visit service, typically 2-4 hours.",
    path: "/services/spring-cleanup",
    image: springCleanupImage,
    category: "seasonal"
  },
  {
    icon: CloudRain,
    title: "Fall Cleanup",
    description: "Leaf removal, final mow, gutter cleanout, and winterization. Completed before first frost.",
    path: "/services/fall-cleanup",
    image: fallCleanupImage,
    category: "seasonal"
  },
  {
    icon: Trash2,
    title: "Leaf Removal",
    description: "Full property cleared. Leaves bagged and hauled or mulched in place. Zero left behind.",
    path: "/services/leaf-removal",
    image: leafRemovalImage,
    category: "seasonal"
  }
];

// Add snow removal during winter season
const snowRemovalService = {
  icon: Snowflake,
  title: "Snow Removal",
  description: "Triggered by 2\"+ snowfall. Driveway, walkways, and porch cleared. Salt included.",
  path: "/services/snow-removal",
  image: snowRemovalImage,
  category: "seasonal"
};

const services = isSnowRemovalSeason() ? [...allServices, snowRemovalService] : allServices;

const whyChooseUs = [
  {
    icon: CheckCircle2,
    title: "Scheduled Day, Every Week",
    description: "Your service day is locked. Same 2-person crew arrives at the same time window. No wondering."
  },
  {
    icon: Clock,
    title: "Quotes Within 24 Hours",
    description: "Request \u2192 Assessment \u2192 Written quote. All within one business day. Average response: 2 hours."
  },
  {
    icon: Shield,
    title: "Insured with Documentation",
    description: "$1M liability coverage. Certificate of Insurance available on request for any job."
  },
  {
    icon: Award,
    title: "Issue Resolution in 48 Hours",
    description: "Text a photo of any problem. We acknowledge same day, return to fix within 48 hours. No charge."
  }
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
  { name: "Stoughton", path: "/locations/stoughton" }
];

const categories = [
  { id: "all", label: "All Services" },
  { id: "lawn", label: "Lawn Care" },
  { id: "beds", label: "Garden & Beds" },
  { id: "gutters", label: "Gutters" },
  { id: "seasonal", label: "Seasonal" }
];

export default function ResidentialContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Scroll Progress - Engagement signal */}
      <ScrollProgress variant="minimal" />

      <ServiceSchema
        serviceName="Residential Lawn Care Services"
        description="Professional residential lawn care for Madison, Middleton, Waunakee, and Dane County homeowners. 14 services including mowing, mulching, gutter cleaning, and seasonal cleanups."
        serviceType="Residential Lawn Care"
        areaServed={["Madison", "Middleton", "Waunakee", "Sun Prairie", "Fitchburg", "Verona", "Monona", "McFarland", "DeForest"]}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Residential Services Summary">
        <p>TotalGuard Yard Care provides residential lawn care services for homeowners in Madison, Middleton, Waunakee, and Dane County, Wisconsin. We offer 14 services including weekly mowing, fertilization, gutter cleaning, mulching, and seasonal cleanups. Same crew assigned to your property every visit. Free quotes within 24 hours at (608) 535-6057.</p>
      </section>

      {/* Hero Section - Problem-First Conversion-Focused */}
      <section className="relative min-h-[auto] md:min-h-[70vh] flex items-center py-20 pt-24 md:py-28 md:pt-28 bg-gradient-to-br from-primary/95 via-primary to-primary/90 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional residential lawn care services for Madison homeowners"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]" />
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span>4.9&#9733; from 60+ Google Reviews</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Lawn Care Across <span className="text-accent">Madison &amp; Dane County</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto">
              One team. 14+ services. Serving Madison, Middleton, Waunakee, Sun Prairie, and 8 more Dane County cities. Same crew, same standards, every visit.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="w-full sm:w-auto tap-target text-base md:text-lg font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105 bg-amber-500 hover:bg-amber-400 text-black" asChild>
                <Link href="/contact">
                  Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary tap-target text-base md:text-lg" asChild>
                <a href="tel:608-535-6057">
                  <Phone className="mr-2 h-5 w-5" />
                  (608) 535-6057
                </a>
              </Button>
            </div>

            {/* Micro-proof points */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>Same Crew Every Visit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>Quotes in 24 Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>No Surprise Fees</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="py-6 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">500+</div>
              <div className="text-sm text-background/70">Dane County Homes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">14+</div>
              <div className="text-sm text-background/70">Services Offered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">4.9&#9733;</div>
              <div className="text-sm text-background/70">Google Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">12</div>
              <div className="text-sm text-background/70">Cities Served</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">24hr</div>
              <div className="text-sm text-background/70">Quote Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual transition */}
      <SectionConnector />

      {/* All Services Grid - Discovery phase */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="One Team Handles Everything"
            badgeIcon={Sparkles}
            title="14+ Services."
            titleHighlight="Zero Headaches."
            description="Stop juggling contractors. We handle lawn, beds, gutters, and seasonal work—all with the same reliable crew."
            size="lg"
          />

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.path}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={imgSrc(service.image)}
                    alt={`${service.title} service in Madison WI`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
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

      {/* Visual transition */}
      <SectionDivider />

      {/* Why Choose Us - Trust building phase */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Why Homeowners"
            titleHighlight="Switch to Us"
            description="The bar in this industry is low. We just do what we say we'll do."
            size="lg"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg hover:border-primary/50 transition-all"
              >
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual transition */}
      <SectionConnector />

      {/* Service Areas - Location commitment phase */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Service Areas"
            badgeIcon={MapPin}
            title="Serving"
            titleHighlight="Greater Madison"
            description="Professional lawn care throughout Dane County. Find your location below."
            size="lg"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 max-w-5xl mx-auto mb-10">
            {locations.map((location, index) => (
              <Link
                key={index}
                href={location.path}
                className="bg-card border border-border rounded-lg px-4 py-3 text-center hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4 text-primary opacity-70 group-hover:opacity-100" />
                  <span className="font-medium text-foreground text-sm">{location.name}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/service-areas">
                View All Service Areas <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="py-12 bg-gradient-to-r from-[#0f2a1a] via-[#1a3a2a] to-[#0f2a1a] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Ready to Transform Your Yard?
              </h3>
              <p className="text-primary-foreground/90">
                Join 500+ Madison homeowners who trust TotalGuard with their property.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="accent" className="font-bold shadow-xl" asChild>
                <Link href="/contact">
                  Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <a href="tel:608-535-6057">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Getting Started is <span className="text-primary">Easy</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to a beautiful, stress-free yard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Request a Quote</h3>
              <p className="text-muted-foreground">
                Fill out our simple form or give us a call. We respond within 24 hours.
              </p>
            </div>

            <div className="relative text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Get Your Plan</h3>
              <p className="text-muted-foreground">
                We&apos;ll assess your property and provide a detailed, transparent quote.
              </p>
            </div>

            <div className="relative text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Enjoy Your Yard</h3>
              <p className="text-muted-foreground">
                Sit back and relax while we transform your property into the envy of the neighborhood.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
