'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, MapPin, CheckCircle2, Star, Clock, Shield, DollarSign, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { LocationPageSchemas } from "@/components/schemas/LocationPageSchemas";
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema";
import { WebPageSchema } from "@/components/schemas/WebPageSchema";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SectionDivider, SectionConnector } from "@/components/SectionTransition";
import { LocalFAQSection, WhatHappensNextSection } from "@/components/SearchIntentSections";
import CTASection from '@/components/CTASection';
import heroImage from "@/assets/hero-lawn.jpg";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

const cityName = "McFarland";
const cityDescription = "Professional lawn care and landscaping services for McFarland homes and businesses. Quality service with a personal touch from your local lawn care experts.";

export default function McFarlandContent() {
  const services = [
    "Professional Lawn Mowing",
    "Weed Control & Herbicide",
    "Fertilization Programs",
    "Garden Bed Maintenance",
    "Premium Mulching",
    "Seasonal Cleanup Services",
    "Leaf Removal & Disposal",
    "Gutter Cleaning & Protection",
    "Winter Snow Removal"
  ];

  return (
    <div className="min-h-screen" style={{ background: '#050d07' }}>
      {/* Scroll Progress - Engagement signal */}
      <ScrollProgress variant="minimal" />

      <LocationPageSchemas citySlug="mcfarland" faqs={[
        { question: `How much does lawn care cost in ${cityName}?`, answer: `Most ${cityName} residential properties pay $40-$80 per mowing visit depending on lot size. Full-service seasonal packages range from $150-$400/month.` },
        { question: `Do you provide service throughout ${cityName}?`, answer: `Yes, we service all neighborhoods in ${cityName} and surrounding areas with crews familiar with local conditions.` },
        { question: `How quickly can you start service in ${cityName}?`, answer: `Most new customers can be scheduled within 3-5 business days. During peak season, book 1-2 weeks ahead.` },
        { question: `What's included in lawn mowing service?`, answer: `Every visit includes mowing, edging along driveways, trimming around obstacles, and blowing clippings off hard surfaces.` }
      ]} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://totalguardyardcare.com" },
        { name: "Service Areas", url: "https://totalguardyardcare.com/service-areas" },
        { name: `${cityName}, WI`, url: `https://totalguardyardcare.com/locations/mcfarland` }
      ]} />
      <WebPageSchema name={`Lawn Care in ${cityName}, WI`} description={`Professional lawn care services in ${cityName}, WI`} url="/locations/mcfarland" />
      <Navigation showPromoBanner />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Location Summary">
        <p>TotalGuard Yard Care provides professional lawn care services in {cityName}, Wisconsin. We serve homeowners and businesses throughout {cityName} with weekly mowing, fertilization, gutter cleaning, mulching, and seasonal cleanups. Same crew assigned every visit. Locally owned, fully insured. Call (608) 535-6057 for a free quote.</p>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[auto] md:min-h-[60vh] flex items-center py-16 pt-20 md:py-24 md:pt-24 bg-foreground/95">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label={`${cityName} lawn care services - professional landscaping background`}
>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.25)_100%)]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
              <MapPin className="h-4 w-4 mr-2" />
              {cityName}, Wisconsin
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {cityName}&apos;s Trusted <span className="text-primary">Lawn Care Experts</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium">
              {cityDescription}
            </p>
            <div className="flex items-center gap-6 mb-10 flex-wrap">
              <div className="flex items-center gap-2 text-white">
                <Star className="h-5 w-5 text-accent fill-accent" />
                <span className="font-bold">4.9 Star Rating</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-bold">Local Family Business</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-bold">100% Guaranteed</span>
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
      <section className="py-12 md:py-16" style={{ background: '#050d07' }}>
        <div className="container mx-auto px-4">
          <SectionConnector className="mb-8" />

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Full-Service Lawn Care in {cityName}
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              We provide comprehensive lawn care and landscaping solutions tailored to {cityName}&apos;s unique climate and landscape.
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
                  <h3 className="text-lg font-bold text-white">{service}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-white/60 mb-6 text-lg">
              Explore our complete range of <Link href="/" className="text-primary hover:underline font-semibold">residential services</Link> and <Link href="/commercial" className="text-primary hover:underline font-semibold">commercial lawn care</Link> options.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Operational Proof */}
      <section className="py-12 md:py-16" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why {cityName} Residents Choose TotalGuard
              </h2>
              <p className="text-xl text-white/60">
                Systems that ensure consistent results, not just promises
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/[0.06] border-2 border-white/10 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-white">Same Crew Every Visit</h3>
                </div>
                <p className="text-white/60 leading-relaxed">
                  Your assigned 2-person team knows your property, your preferences, and your standards. No random strangers showing up. Consistency you can count on.
                </p>
              </div>

              <div className="bg-white/[0.06] border-2 border-white/10 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-white">24-Hour Quote Response</h3>
                </div>
                <p className="text-white/60 leading-relaxed">
                  Submit a request today, receive a written quote by tomorrow. Weather delays? You&apos;re notified by 8am with the reschedule date. No guessing.
                </p>
              </div>

              <div className="bg-white/[0.06] border-2 border-white/10 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-white">Flat Pricing, Written Scope</h3>
                </div>
                <p className="text-white/60 leading-relaxed">
                  Your quote lists exactly what&apos;s included. No surprise charges, no scope creep. The price you&apos;re quoted is the price you pay.
                </p>
              </div>

              <div className="bg-white/[0.06] border-2 border-white/10 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-white">48-Hour Issue Resolution</h3>
                </div>
                <p className="text-white/60 leading-relaxed">
                  Something not right? Text a photo. We acknowledge within 4 hours, resolve within 48 hours, and send confirmation when complete.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next - Address uncertainty */}
      <WhatHappensNextSection />

      {/* Local FAQ Section - Address common search queries */}
      <LocalFAQSection cityName={cityName} />

      {/* FAQ Schema handled by LocationPageSchemas above */}

      {/* Service Areas Link */}
      <section className="py-10 md:py-12" style={{ background: '#050d07' }}>
        <div className="container mx-auto px-4 text-center">
          <SectionDivider className="mb-6" />
          <p className="text-lg text-white/60 mb-4">
            Also proudly serving <Link href="/service-areas" className="text-primary hover:underline font-semibold">Madison metro area and surrounding communities</Link>
          </p>
          <Link href="/service-areas">
            <Button variant="outline" className="font-semibold">
              View All Service Areas
            </Button>
          </Link>
        </div>
      </section>

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
