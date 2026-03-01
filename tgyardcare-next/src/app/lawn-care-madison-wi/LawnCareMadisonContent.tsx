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
  Calendar,
} from "lucide-react";
import heroImage from "@/assets/service-mowing.jpg";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

const neighborhoods = [
  "Nakoma", "Maple Bluff", "Shorewood Hills", "Westmorland", "Dudgeon-Monroe",
  "Vilas", "Tenney-Lapham", "Atwood", "Schenk-Atwood", "Willy Street",
  "East Side", "West Side", "Near East", "Near West", "Middleton Junction"
];

const faqs = [
  {
    question: "How much does lawn mowing cost in Madison, WI?",
    answer: "Most Madison residential properties pay $40-$80 per weekly mowing visit depending on lot size, obstacles, and terrain. Quarter-acre lots typically run $45-$55, while half-acre properties are $60-$75. We provide exact quotes after assessing your specific property."
  },
  {
    question: "How often should I mow my lawn in Madison?",
    answer: "During peak growing season (May-June and September), weekly mowing is ideal for Madison lawns. In the hotter summer months (July-August), bi-weekly may be sufficient as growth slows. We adjust our schedule based on your lawn's actual needs."
  },
  {
    question: "When does lawn mowing season start and end in Madison?",
    answer: "Madison's mowing season typically runs from mid-April through early November—about 28 weeks. We monitor conditions and communicate the exact start/end dates each year. Late season includes final cuts at lower heights to prepare for winter."
  },
  {
    question: "What's included in your Madison lawn mowing service?",
    answer: "Every visit includes precision mowing with professional stripes, edging along all sidewalks and driveways, string trimming around obstacles, and blowing clippings off all hard surfaces. We also rotate mowing patterns to prevent ruts."
  },
  {
    question: "Do you offer one-time mowing or only contracts?",
    answer: "We offer both. One-time mowing is available for property prep, vacation coverage, or trying our service. However, most clients choose weekly service for consistent results and better lawn health. No long-term contracts required—cancel anytime."
  }
];

const whyChooseUs = [
  {
    icon: Users,
    title: "Same Crew Every Visit",
    description: "Your dedicated 2-person team knows your property, your preferences, and your standards. No random contractors showing up."
  },
  {
    icon: Clock,
    title: "Scheduled Service Day",
    description: "Your mowing day is locked. Same crew, same time window, every week. No wondering when we'll show up."
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description: "$1M liability coverage. Certificate of Insurance available on request. Your property is protected."
  },
  {
    icon: Calendar,
    title: "Weather Communication",
    description: "Rain delay? You're notified by 8am with the reschedule date. No guessing, no missed visits without notice."
  }
];

export default function LawnCareMadisonContent() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress variant="minimal" />

      <ServiceSchema
        serviceName="Professional Lawn Mowing in Madison, WI"
        description="Expert weekly lawn mowing service for Madison, Wisconsin homeowners. Includes mowing, edging, trimming, and cleanup. Same crew consistency with professional results."
        serviceType="Lawn Mowing"
        areaServed={['Madison', 'Nakoma', 'Maple Bluff', 'Shorewood Hills', 'Westmorland']}
      />

      <LocalBusinessSchema cityName="Madison" />

      <BreadcrumbSchema items={[
        { name: "Home", url: "https://tgyardcare.com" },
        { name: "Services", url: "https://tgyardcare.com/services" },
        { name: "Lawn Mowing", url: "https://tgyardcare.com/services/mowing" },
        { name: "Madison, WI", url: "https://tgyardcare.com/lawn-care-madison-wi" }
      ]} />

      <FAQSchema faqs={faqs} />

      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-16 pt-20 md:py-24 md:pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional lawn mowing service in Madison Wisconsin showing freshly cut residential lawn"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
              <MapPin className="h-4 w-4" />
              Madison, Wisconsin
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Lawn Mowing in <span className="text-primary">Madison, WI</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-6">
              Professional weekly lawn care for Madison homeowners. Same crew every visit,
              professional stripes, clean edges—all in under 45 minutes.
            </p>

            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <div className="flex items-center gap-2 text-white">
                <Star className="h-5 w-5 text-accent fill-accent" />
                <span className="font-bold">4.9&#9733; Google Rating</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>500+ Madison Properties</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="accent" className="font-bold text-lg" asChild>
                <Link href="/contact?service=lawn-mowing&location=madison">
                  Get Free Madison Quote <ArrowRight className="ml-2 h-5 w-5" />
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

      {/* Madison-Specific Value Props */}
      <section className="py-8 bg-gradient-to-r from-[#0f2a1a] via-[#1a3a2a] to-[#0f2a1a] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">$45-75</div>
              <div className="text-sm opacity-90">Typical Madison Visit</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">28</div>
              <div className="text-sm opacity-90">Week Mowing Season</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">24hr</div>
              <div className="text-sm opacity-90">Quote Response</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">45min</div>
              <div className="text-sm opacity-90">Average Service Time</div>
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
              What&apos;s Included in Every Madison Mowing Visit
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete service, no hidden fees. Everything your lawn needs in one visit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Precision Mowing", desc: "Consistent height with professional striping patterns" },
              { title: "Clean Edging", desc: "Crisp lines along all sidewalks and driveways" },
              { title: "String Trimming", desc: "Detail work around fences, trees, and obstacles" },
              { title: "Surface Blowing", desc: "All clippings removed from hard surfaces" },
              { title: "Height Adjustment", desc: "Seasonal adjustments for optimal lawn health" },
              { title: "Pattern Rotation", desc: "Alternating directions to prevent ruts" }
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

      {/* Why Madison Homeowners Choose Us */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Madison Homeowners Choose TotalGuard
            </h2>
            <p className="text-lg text-muted-foreground">
              Systems that ensure consistent results—not just promises
            </p>
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

      {/* Madison Neighborhoods */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Serving All Madison Neighborhoods
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From Nakoma to Maple Bluff, we provide consistent lawn care across every Madison neighborhood.
            </p>
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

          <p className="text-center text-muted-foreground">
            Don&apos;t see your neighborhood? We likely serve it.{" "}
            <Link href="/contact" className="text-primary hover:underline font-semibold">
              Contact us to confirm
            </Link>
            .
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* What Happens Next */}
      <WhatHappensNextSection />

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Madison Lawn Mowing FAQs
              </h2>
              <p className="text-lg text-muted-foreground">
                Common questions from Madison homeowners about our lawn care service.
              </p>
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
            <Link href="/services/fertilization" className="text-primary hover:underline font-medium">
              Fertilization &rarr;
            </Link>
            <Link href="/services/aeration" className="text-primary hover:underline font-medium">
              Aeration &rarr;
            </Link>
            <Link href="/services/herbicide" className="text-primary hover:underline font-medium">
              Weed Control &rarr;
            </Link>
            <Link href="/gutter-cleaning-madison-wi" className="text-primary hover:underline font-medium">
              Gutter Cleaning &rarr;
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Get Your Madison Lawn Quote Today"
        description="Join hundreds of Madison homeowners who trust TotalGuard for reliable, professional lawn care. Free quotes within 24 hours."
      />

      <Footer />
    </div>
  );
}
