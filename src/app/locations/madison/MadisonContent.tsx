'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, MapPin, CheckCircle2, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { LocationPageSchemas } from "@/components/schemas/LocationPageSchemas";
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema";
import { WebPageSchema } from "@/components/schemas/WebPageSchema";
import CTASection from '@/components/CTASection';
import heroImage from "@/assets/hero-lawn.jpg";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function MadisonContent() {
  const services = [
    "Lawn Mowing & Maintenance",
    "Herbicide Treatments",
    "Fertilization & Overseeding",
    "Weeding & Garden Bed Care",
    "Mulching Services",
    "Spring & Fall Cleanup",
    "Leaf Removal",
    "Gutter Cleaning & Guards",
    "Snow Removal (Seasonal)"
  ];

  const neighborhoods = [
    "Downtown Madison",
    "East Side",
    "West Side",
    "North Side",
    "South Side",
    "Shorewood Hills",
    "Maple Bluff",
    "Monona",
    "Fitchburg",
    "McFarland"
  ];

  return (
    <div className="min-h-screen" style={{ background: '#050d07' }}>
      <LocationPageSchemas citySlug="madison" faqs={[]} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://totalguardyardcare.com" },
        { name: "Service Areas", url: "https://totalguardyardcare.com/service-areas" },
        { name: "Madison, WI", url: "https://totalguardyardcare.com/locations/madison" }
      ]} />
      <WebPageSchema name="Lawn Care in Madison, WI" description="Professional lawn care services in Madison, WI" url="/locations/madison" />
      <Navigation showPromoBanner />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Location Summary">
        <p>TotalGuard Yard Care provides professional lawn care services in Madison, Wisconsin. We serve homeowners and businesses throughout Madison with weekly mowing, fertilization, gutter cleaning, mulching, and seasonal cleanups. Same crew assigned every visit. Locally owned, fully insured. Call (608) 535-6057 for a free quote.</p>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[auto] md:min-h-[70vh] flex items-center py-20 pt-24 md:py-28 md:pt-28 bg-foreground/95">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional lawn care services in Madison, Wisconsin"
>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.25)_100%)]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
              <MapPin className="h-4 w-4 mr-2" />
              Madison, Wisconsin
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Madison&apos;s Premier <span className="text-primary">Lawn Care Service</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium">
              Professional lawn care and landscaping services for Madison homeowners and businesses. Serving all Madison neighborhoods with excellence since 2023.
            </p>
            <div className="flex items-center gap-6 mb-10 flex-wrap">
              <div className="flex items-center gap-2 text-white">
                <Star className="h-5 w-5 text-accent fill-accent" />
                <span className="font-bold">4.9 Stars</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-bold">500+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-bold">Same-Day Quotes</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg font-bold bg-primary hover:bg-primary/90" asChild>
                <Link href="/contact">
                  Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-foreground text-lg font-bold" asChild>
                <a href="tel:608-535-6057">
                  <Phone className="mr-2 h-5 w-5" />
                  (608) 535-6057
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20" style={{ background: '#050d07' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Complete Lawn Care Services in Madison
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              From routine mowing to seasonal cleanups, we provide everything your Madison property needs to look its best year-round.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/[0.06] border border-white/10 rounded-xl p-6 hover:shadow-lg hover:border-primary transition-all"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{service}</h3>
                    <Link
                      href={`/services/${service.toLowerCase().split(' ')[0]}`}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services/mowing">
              <Button size="lg" variant="outline" className="font-bold">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Neighborhoods Section */}
      <section className="py-20" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Serving All Madison Neighborhoods
            </h2>
            <p className="text-xl text-white/60">
              Reliable lawn care service throughout the Madison area
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {neighborhoods.map((neighborhood, index) => (
              <div
                key={index}
                className="bg-white/[0.06] border border-white/10 rounded-lg p-4 text-center hover:border-primary hover:shadow-md transition-all"
              >
                <p className="font-semibold text-white">{neighborhood}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 max-w-3xl mx-auto">
            <p className="text-white/60 mb-6">
              Don&apos;t see your neighborhood listed? We service all of Madison and surrounding areas.
              <Link href="/service-areas" className="text-primary hover:underline ml-1">
                View our complete service area
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Why Madison Chooses TotalGuard */}
      <section className="py-20" style={{ background: '#050d07' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Madison Relies on TotalGuard
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Consistent service. Clear communication. No surprises.
              </p>
            </div>

            {/* Trust Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {/* Card 1 - Responsiveness */}
              <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-6 shadow-md hover:shadow-lg hover:border-primary/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 shadow-sm">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">We Answer. We Show Up.</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Same-day callbacks. No chasing. No ghosting. Your time is respected from the first call.
                </p>
              </div>

              {/* Card 2 - Reliability */}
              <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-6 shadow-md hover:shadow-lg hover:border-primary/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 shadow-sm">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">Same Crew. Same Standards.</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  We show up when promised with the same team every time. No strangers, no inconsistency.
                </p>
              </div>

              {/* Card 3 - Pricing */}
              <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-6 shadow-md hover:shadow-lg hover:border-primary/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 shadow-sm">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">No Surprises. No Upsells.</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Clear pricing upfront. What we quote is what you pay. You stay in control.
                </p>
              </div>
            </div>

            {/* Micro-Trust Line */}
            <p className="text-center text-white/60 text-sm mb-10">
              Built on consistency, communication, and follow-through, every visit.
            </p>

            {/* CTA */}
            <div className="text-center">
              <Link href="/about">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold px-8">
                  See How We Work <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
