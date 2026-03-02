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
  Snowflake,
  Clock,
  Shield,
  AlertTriangle
} from "lucide-react";
import heroImage from "@/assets/service-snow-removal.jpg";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

const faqs = [
  {
    question: "How much does snow removal cost in Madison, WI?",
    answer: "Madison residential snow removal typically runs $50-$100 per visit for driveways and walkways, or $200-$400/month for seasonal contracts (unlimited visits). Pricing depends on driveway size, number of walkways, and service level."
  },
  {
    question: "When do you remove snow?",
    answer: "We monitor weather 24/7 and deploy once snowfall reaches 2 inches. Standard service clears snow before 7am so you can get to work. Priority contracts can be cleared even earlier."
  },
  {
    question: "Is salt/ice melt included?",
    answer: "Yes, basic ice melt application on walkways and driveway entrances is included with every visit at no extra charge. Heavy ice events may require additional treatment."
  },
  {
    question: "Do you offer seasonal contracts?",
    answer: "Yes, seasonal contracts provide unlimited snow removal visits November through March for a fixed monthly rate. This protects you from unpredictable Wisconsin winters and guarantees priority service."
  },
  {
    question: "What areas do you clear?",
    answer: "Standard service includes driveway, front walkway, and porch/entry area. We can add side walkways, back entrances, or mailbox access for additional coverage."
  }
];

const whyChooseUs = [
  {
    icon: Clock,
    title: "Cleared by 7am",
    description: "Early morning service ensures you can get to work on time. Priority contracts cleared even earlier."
  },
  {
    icon: Snowflake,
    title: "2\" Trigger",
    description: "We automatically deploy at 2\" of accumulation. No need to call—we're already on our way."
  },
  {
    icon: Shield,
    title: "Salt Included",
    description: "Ice melt on walkways and driveway entrances at no extra charge with every visit."
  },
  {
    icon: AlertTriangle,
    title: "Weather Updates",
    description: "Storm alerts and service confirmations sent via text so you always know the status."
  }
];

export default function SnowRemovalMadisonContent() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress variant="minimal" />

      <ServiceSchema
        serviceName="Professional Snow Removal in Madison, WI"
        description="Residential snow removal service for Madison, Wisconsin. Driveways, walkways, and porches cleared by 7am. Salt included with every visit."
        serviceType="Snow Removal"
        areaServed={['Madison', 'Nakoma', 'Maple Bluff', 'Shorewood Hills', 'Westmorland']}
      />

      <LocalBusinessSchema cityName="Madison" />

      <BreadcrumbSchema items={[
        { name: "Home", url: "https://tgyardcare.com" },
        { name: "Services", url: "https://tgyardcare.com/services" },
        { name: "Snow Removal", url: "https://tgyardcare.com/services/snow-removal" },
        { name: "Madison, WI", url: "https://tgyardcare.com/snow-removal-madison-wi" }
      ]} />

      <FAQSchema faqs={faqs} />

      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-16 pt-20 md:py-24 md:pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional snow removal service in Madison Wisconsin"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>

        <AmbientParticles density="sparse" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Snowflake className="h-4 w-4" />
              Winter Service
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Snow Removal in <span className="text-blue-400">Madison, WI</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-6">
              Driveways and walkways cleared by 7am. Automatic 2&quot; trigger. Salt included.
              Don&apos;t let Wisconsin winters slow you down.
            </p>

            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <div className="flex items-center gap-2 text-white">
                <Star className="h-5 w-5 text-accent fill-accent" />
                <span className="font-bold">4.9&#9733; Google Rating</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="h-5 w-5 text-blue-400" />
                <span>Salt Included</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg" asChild>
                <Link href="/contact?service=snow-removal&location=madison">
                  Get Winter Quote <ArrowRight className="ml-2 h-5 w-5" />
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
      <section className="py-8 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">$50-100</div>
              <div className="text-sm opacity-90">Per Visit</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">$200-400</div>
              <div className="text-sm opacity-90">Monthly Contract</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">By 7am</div>
              <div className="text-sm opacity-90">Service Completion</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">2&quot;</div>
              <div className="text-sm opacity-90">Auto Trigger</div>
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
              Madison Snow Removal Service Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-card border-2 border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-500/10 rounded-full p-2">
                    <item.icon className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Options */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Service Level
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card border-2 border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Per-Visit Service</h3>
              <div className="text-3xl font-bold text-primary mb-4">$50-100<span className="text-lg font-normal text-muted-foreground">/visit</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Driveway cleared</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Front walkway & porch</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Salt application included</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Pay only when it snows</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">Best for: Light winters or occasional needs</p>
            </div>

            <div className="bg-card border-2 border-primary rounded-xl p-8 relative">
              <div className="absolute -top-3 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Seasonal Contract</h3>
              <div className="text-3xl font-bold text-primary mb-4">$200-400<span className="text-lg font-normal text-muted-foreground">/month</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Unlimited visits Nov-Mar</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Priority service timing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Fixed monthly rate</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Peace of mind coverage</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">Best for: Predictable budgeting & guaranteed service</p>
            </div>
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
                Madison Snow Removal FAQs
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
            Related Winter Services
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services/gutter-cleaning" className="text-primary hover:underline font-medium">
              Gutter Cleaning &rarr;
            </Link>
            <Link href="/services/fall-cleanup" className="text-primary hover:underline font-medium">
              Fall Cleanup &rarr;
            </Link>
            <Link href="/locations/madison" className="text-primary hover:underline font-medium">
              All Madison Services &rarr;
            </Link>
          </div>
        </div>
      </section>

      <Footer
        closerTitle="Secure Your Madison Snow Removal Spot"
        closerDescription="Winter contracts fill fast. Lock in your seasonal rate before the first snowfall."
      />
    </div>
  );
}
