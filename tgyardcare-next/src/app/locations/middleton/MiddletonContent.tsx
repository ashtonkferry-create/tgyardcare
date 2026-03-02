'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, MapPin, CheckCircle2, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import { PromoBanner } from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import heroImage from "@/assets/hero-lawn.jpg";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function MiddletonContent() {
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
    <div className="min-h-screen bg-background">
      <LocalBusinessSchema cityName="Middleton" />
      <PromoBanner />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Location Summary">
        <p>TotalGuard Yard Care provides professional lawn care services in Middleton, Wisconsin. We serve homeowners and businesses throughout Middleton with weekly mowing, fertilization, gutter cleaning, mulching, and seasonal cleanups. Same crew assigned every visit. Locally owned, fully insured. Call (608) 535-6057 for a free quote.</p>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[auto] md:min-h-[70vh] flex items-center py-20 pt-24 md:py-28 md:pt-28 bg-foreground/95">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional lawn care services in Middleton, Wisconsin"
>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.25)_100%)]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
              <MapPin className="h-4 w-4 mr-2" />
              Middleton, Wisconsin
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight">
              Middleton&apos;s Trusted <span className="text-primary">Lawn Care Experts</span>
            </h1>
            <p className="text-xl md:text-2xl text-background/90 mb-8 font-medium">
              Professional lawn care and landscaping services for Middleton homes and businesses. Quality service with a personal touch.
            </p>
            <div className="flex items-center gap-6 mb-10 flex-wrap">
              <div className="flex items-center gap-2 text-background">
                <Star className="h-5 w-5 text-accent fill-accent" />
                <span className="font-bold">4.9 Star Rating</span>
              </div>
              <div className="flex items-center gap-2 text-background">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-bold">Local Family Business</span>
              </div>
              <div className="flex items-center gap-2 text-background">
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
              <Button size="lg" variant="outline" className="border-background text-background hover:bg-background hover:text-foreground text-lg font-bold" asChild>
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
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Full-Service Lawn Care in Middleton
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We provide comprehensive lawn care and landscaping solutions tailored to Middleton&apos;s unique climate and landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary transition-all"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <h3 className="text-lg font-bold text-foreground">{service}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6 text-lg">
              Explore our complete range of <Link href="/" className="text-primary hover:underline font-semibold">residential services</Link> and <Link href="/commercial" className="text-primary hover:underline font-semibold">commercial lawn care</Link> options.
            </p>
          </div>
        </div>
      </section>

      {/* Why Middleton Chooses Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Middleton Residents Choose TotalGuard
              </h2>
              <p className="text-xl text-muted-foreground">
                Exceptional service, local expertise, and guaranteed results
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-card border-2 border-border rounded-xl p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Local Knowledge</h3>
                <p className="text-muted-foreground leading-relaxed">
                  As Middleton neighbors, we understand the specific lawn care challenges in our area - from soil conditions to seasonal weather patterns. We tailor our services to help your property thrive.
                </p>
              </div>

              <div className="bg-card border-2 border-border rounded-xl p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Fast &amp; Reliable</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Same-day quotes and flexible scheduling designed around your busy life. We show up on time, every time, and complete the work to your complete satisfaction.
                </p>
              </div>

              <div className="bg-card border-2 border-border rounded-xl p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Fair Pricing</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Competitive rates with no hidden fees. We provide upfront quotes and deliver exceptional value - professional quality without the corporate premium.
                </p>
              </div>

              <div className="bg-card border-2 border-border rounded-xl p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Satisfaction Guaranteed</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We stand behind every job with our 100% satisfaction guarantee. If you&apos;re not completely happy, we&apos;ll make it right - no questions asked.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Middleton Lawn?</h3>
              <p className="text-lg mb-8 opacity-95">Join your neighbors who trust TotalGuard for beautiful, healthy lawns</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-background text-primary hover:bg-background/90 font-bold">
                    Get a Free Quote
                  </Button>
                </Link>
                <a href="tel:608-535-6057">
                  <Button size="lg" variant="outline" className="border-background text-background hover:bg-background hover:text-primary font-bold">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Link */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-muted-foreground mb-4">
            Also proudly serving <Link href="/locations/madison" className="text-primary hover:underline font-semibold">Madison</Link>, <Link href="/locations/waunakee" className="text-primary hover:underline font-semibold">Waunakee</Link>, and surrounding communities
          </p>
          <Link href="/service-areas">
            <Button variant="outline" className="font-semibold">
              View All Service Areas
            </Button>
          </Link>
        </div>
      </section>

      <Footer
        closerTitle="Experience the TotalGuard Difference in Middleton"
        closerDescription="Professional lawn care backed by a satisfaction guarantee. Get your free quote today."
      />
    </div>
  );
}
