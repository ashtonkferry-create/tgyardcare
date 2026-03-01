'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { ServiceSchema } from "@/components/ServiceSchema";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SectionConnector, SectionDivider } from "@/components/SectionTransition";
import { WhatHappensNextSection } from "@/components/SearchIntentSections";
import {
  CheckCircle2,
  Phone,
  ArrowRight,
  MapPin,
  Star,
  Clock,
  Shield,
  Users,
  Calendar
} from "lucide-react";
import heroImage from "@/assets/service-mowing.jpg";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

const neighborhoods = [
  "Downtown Middleton", "Pheasant Branch", "Middleton Hills", "Greenway Station",
  "Stonefield", "Cardinal Glenn", "Bishops Bay", "Tiedeman Pond", "Parmenter",
  "Sauk Creek", "Pheasant Branch Conservancy"
];

const faqs = [
  {
    question: "How much does lawn mowing cost in Middleton, WI?",
    answer: "Middleton residential properties typically pay $45-$85 per weekly mowing visit. Pricing depends on lot size, terrain, and obstacles. Middleton Hills and larger properties may be on the higher end due to lot sizes and landscaping complexity."
  },
  {
    question: "Do you service all of Middleton?",
    answer: "Yes, we service all Middleton neighborhoods including Downtown, Pheasant Branch, Middleton Hills, Greenway Station, Stonefield, and areas near the conservancy. We have dedicated crews familiar with Middleton properties."
  },
  {
    question: "What day will my lawn be mowed?",
    answer: "We assign Middleton properties to specific route days based on geography. Once scheduled, your service day remains consistent. You'll know exactly when to expect us each week—no guessing."
  },
  {
    question: "How do I get started with lawn mowing service?",
    answer: "Submit a quote request online or call (608) 535-6057. We'll assess your property, provide a written quote within 24 hours, and can typically start service within 3-5 business days."
  }
];

const whyChooseUs = [
  {
    icon: Users,
    title: "Same Crew Every Visit",
    description: "Your dedicated team knows your Middleton property and preferences. Consistent quality every time."
  },
  {
    icon: Clock,
    title: "Reliable Scheduling",
    description: "Same day, same time window every week. We show up when we say we will."
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description: "$1M liability coverage protects your property. COI available on request."
  },
  {
    icon: Calendar,
    title: "Proactive Communication",
    description: "Weather delays? You're notified by 8am. No surprises, no missed visits without notice."
  }
];

export default function LawnCareMiddletonContent() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress variant="minimal" />

      <ServiceSchema
        serviceName="Professional Lawn Mowing in Middleton, WI"
        description="Expert weekly lawn mowing service for Middleton, Wisconsin homeowners. Includes mowing, edging, trimming, and cleanup with same crew consistency."
        serviceType="Lawn Mowing"
        areaServed={['Middleton', 'Pheasant Branch', 'Middleton Hills', 'Greenway Station']}
      />

      <LocalBusinessSchema cityName="Middleton" />

      <BreadcrumbSchema items={[
        { name: "Home", url: "https://tgyardcare.com" },
        { name: "Services", url: "https://tgyardcare.com/services" },
        { name: "Lawn Mowing", url: "https://tgyardcare.com/services/mowing" },
        { name: "Middleton, WI", url: "https://tgyardcare.com/lawn-care-middleton-wi" }
      ]} />

      <FAQSchema faqs={faqs} />

      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-16 pt-20 md:py-24 md:pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional lawn mowing service in Middleton Wisconsin"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
              <MapPin className="h-4 w-4" />
              Middleton, Wisconsin
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Lawn Mowing in <span className="text-primary">Middleton, WI</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-6">
              Professional lawn care for Middleton homeowners. From Pheasant Branch to Middleton Hills,
              we deliver consistent quality with the same crew every visit.
            </p>

            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <div className="flex items-center gap-2 text-white">
                <Star className="h-5 w-5 text-accent fill-accent" />
                <span className="font-bold">4.9&#9733; Google Rating</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Serving All Middleton Neighborhoods</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="accent" className="font-bold text-lg" asChild>
                <Link href="/contact?service=lawn-mowing&location=middleton">
                  Get Free Middleton Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 font-bold text-lg" asChild>
                <a href="tel:608-535-6057">
                  <Phone className="mr-2 h-5 w-5" />
                  (608) 535-6057
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-gradient-to-r from-[#0f2a1a] via-[#1a3a2a] to-[#0f2a1a] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">$45-85</div>
              <div className="text-sm opacity-90">Typical Middleton Visit</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">Same</div>
              <div className="text-sm opacity-90">Crew Every Week</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">24hr</div>
              <div className="text-sm opacity-90">Quote Response</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">3-5</div>
              <div className="text-sm opacity-90">Days to Start</div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <SectionConnector className="mb-8" />

          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Middleton Lawn Mowing Service
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything included in one visit—no hidden fees or surprise charges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Professional Mowing", desc: "Consistent cut height with striping patterns" },
              { title: "Edge Trimming", desc: "Clean lines along sidewalks, driveways, beds" },
              { title: "String Trimming", desc: "Around trees, fences, and obstacles" },
              { title: "Hard Surface Cleanup", desc: "All clippings blown off walkways" },
              { title: "Seasonal Height Adjustment", desc: "Optimized for Wisconsin conditions" },
              { title: "Direction Rotation", desc: "Prevent ruts and promote even growth" }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-card border border-border rounded-lg p-5">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Middleton Homeowners Choose TotalGuard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-card border-2 border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Middleton Neighborhoods */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Serving All Middleton Neighborhoods
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-8">
            {neighborhoods.map((neighborhood) => (
              <span
                key={neighborhood}
                className="bg-primary/5 border border-primary/20 text-foreground px-4 py-2 rounded-full text-sm font-medium"
              >
                {neighborhood}
              </span>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <WhatHappensNextSection />

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Middleton Lawn Mowing FAQs
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Related Services in Middleton
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services/fertilization" className="text-primary hover:underline font-medium">
              Fertilization &rarr;
            </Link>
            <Link href="/services/mulching" className="text-primary hover:underline font-medium">
              Mulching &rarr;
            </Link>
            <Link href="/services/gutter-cleaning" className="text-primary hover:underline font-medium">
              Gutter Cleaning &rarr;
            </Link>
            <Link href="/locations/middleton" className="text-primary hover:underline font-medium">
              All Middleton Services &rarr;
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Get Your Middleton Lawn Quote Today"
        description="Professional lawn care for Middleton homeowners. Free quotes within 24 hours."
      />

      <Footer />
    </div>
  );
}
