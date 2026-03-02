'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ServiceSchema } from "@/components/ServiceSchema";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SectionConnector, SectionDivider } from "@/components/SectionTransition";
import { AmbientParticles } from "@/components/AmbientParticles";
import { WhatHappensNextSection } from "@/components/SearchIntentSections";
import {
  CheckCircle2,
  Phone,
  ArrowRight,
  MapPin,
  Star,
  Home,
  Shield,
  Camera,
  Droplets
} from "lucide-react";
import heroImage from "@/assets/service-gutter.jpg";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

const faqs = [
  {
    question: "How much does gutter cleaning cost in Madison, WI?",
    answer: "Madison gutter cleaning typically costs $150-$300 for a standard single-story home. Two-story homes run $200-$400. Pricing depends on linear feet of gutters, roof pitch, and debris level. We provide exact quotes after property assessment."
  },
  {
    question: "How often should gutters be cleaned in Madison?",
    answer: "Most Madison homes need gutter cleaning twice per year—once in late spring after seed pods and pollen, and once in late fall after leaves drop. Homes near mature trees may need a third mid-summer cleaning."
  },
  {
    question: "What's included in your gutter cleaning service?",
    answer: "Every service includes complete debris removal from all gutters, downspout flushing to ensure proper flow, roof-line inspection for damage, and before/after photos sent upon completion."
  },
  {
    question: "Do you offer gutter guard installation?",
    answer: "Yes, we install LeafFilter-style micro-mesh gutter guards. These prevent debris from entering while allowing water flow. Installation includes warranty documentation. See our gutter guards page for details."
  },
  {
    question: "How do I know if my gutters need cleaning?",
    answer: "Warning signs include water overflowing during rain, visible plant growth in gutters, sagging gutter sections, or water stains on your home's siding. If it's been over 6 months since your last cleaning, it's time."
  }
];

const whyChooseUs = [
  {
    icon: Camera,
    title: "Photo Documentation",
    description: "Before and after photos sent upon completion so you can see exactly what was done."
  },
  {
    icon: Droplets,
    title: "Downspout Flushing",
    description: "We don't just clean gutters—we flush every downspout to ensure proper drainage."
  },
  {
    icon: Shield,
    title: "Roof-Line Inspection",
    description: "We inspect for damage or issues while we're up there and report findings."
  },
  {
    icon: Home,
    title: "Full Debris Removal",
    description: "All debris is removed from your property. Nothing left in your yard."
  }
];

export default function GutterCleaningMadisonContent() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress variant="minimal" />

      <ServiceSchema
        serviceName="Professional Gutter Cleaning in Madison, WI"
        description="Complete gutter cleaning service for Madison, Wisconsin homeowners. Includes debris removal, downspout flushing, inspection, and photo documentation."
        serviceType="Gutter Cleaning"
        areaServed={['Madison', 'Nakoma', 'Maple Bluff', 'Shorewood Hills', 'Westmorland']}
      />

      <LocalBusinessSchema cityName="Madison" />

      <BreadcrumbSchema items={[
        { name: "Home", url: "https://tgyardcare.com" },
        { name: "Services", url: "https://tgyardcare.com/services" },
        { name: "Gutter Cleaning", url: "https://tgyardcare.com/services/gutter-cleaning" },
        { name: "Madison, WI", url: "https://tgyardcare.com/gutter-cleaning-madison-wi" }
      ]} />

      <FAQSchema faqs={faqs} />

      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-16 pt-20 md:py-24 md:pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional gutter cleaning service in Madison Wisconsin"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>

        <AmbientParticles density="sparse" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
              <MapPin className="h-4 w-4" />
              Madison, Wisconsin
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Gutter Cleaning in <span className="text-primary">Madison, WI</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-6">
              Complete gutter cleanout with downspout flushing, inspection, and photo documentation.
              Protect your Madison home from water damage.
            </p>

            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <div className="flex items-center gap-2 text-white">
                <Star className="h-5 w-5 text-accent fill-accent" />
                <span className="font-bold">4.9&#9733; Google Rating</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Photo Documentation Included</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="accent" className="font-bold text-lg" asChild>
                <Link href="/contact?service=gutter-cleaning&location=madison">
                  Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
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

      {/* Pricing Stats */}
      <section className="py-8 bg-gradient-to-r from-[#0f2a1a] via-[#1a3a2a] to-[#0f2a1a] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">$150-300</div>
              <div className="text-sm opacity-90">Single-Story Homes</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">$200-400</div>
              <div className="text-sm opacity-90">Two-Story Homes</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">2x/Year</div>
              <div className="text-sm opacity-90">Recommended Frequency</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">Photos</div>
              <div className="text-sm opacity-90">Before & After Included</div>
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
              What&apos;s Included in Every Gutter Cleaning
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

      <SectionDivider />

      <WhatHappensNextSection />

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Madison Gutter Cleaning FAQs
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
            Related Services in Madison
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services/gutter-guards" className="text-primary hover:underline font-medium">
              Gutter Guards &rarr;
            </Link>
            <Link href="/services/fall-cleanup" className="text-primary hover:underline font-medium">
              Fall Cleanup &rarr;
            </Link>
            <Link href="/lawn-care-madison-wi" className="text-primary hover:underline font-medium">
              Lawn Mowing &rarr;
            </Link>
            <Link href="/locations/madison" className="text-primary hover:underline font-medium">
              All Madison Services &rarr;
            </Link>
          </div>
        </div>
      </section>

      <Footer
        closerTitle="Schedule Your Madison Gutter Cleaning"
        closerDescription="Protect your home from water damage. Free quotes within 24 hours."
      />
    </div>
  );
}
