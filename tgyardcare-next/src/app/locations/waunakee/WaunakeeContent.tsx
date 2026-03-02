'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, MapPin, CheckCircle2, Star, Leaf, Home, Droplets } from "lucide-react";
import Navigation from "@/components/Navigation";
import { PromoBanner } from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import heroImage from "@/assets/hero-lawn.jpg";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function WaunakeeContent() {
  const services = [
    { name: "Lawn Mowing & Edging", icon: Leaf },
    { name: "Fertilization & Weed Control", icon: Leaf },
    { name: "Mulching & Garden Beds", icon: Leaf },
    { name: "Spring & Fall Cleanup", icon: Leaf },
    { name: "Gutter Cleaning & Guards", icon: Home },
    { name: "Leaf Removal", icon: Leaf },
    { name: "Snow Removal (Winter)", icon: Droplets }
  ];

  return (
    <div className="min-h-screen bg-background">
      <LocalBusinessSchema cityName="Waunakee" />
      <PromoBanner />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Location Summary">
        <p>TotalGuard Yard Care provides professional lawn care services in Waunakee, Wisconsin. We serve homeowners and businesses throughout Waunakee with weekly mowing, fertilization, gutter cleaning, mulching, and seasonal cleanups. Same crew assigned every visit. Locally owned, fully insured. Call (608) 535-6057 for a free quote.</p>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[auto] md:min-h-[70vh] flex items-center py-20 pt-24 md:py-28 md:pt-28 bg-foreground/95">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional lawn care services in Waunakee, Wisconsin"
>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.25)_100%)]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
              <MapPin className="h-4 w-4 mr-2" />
              Waunakee, Wisconsin
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight">
              Waunakee&apos;s <span className="text-primary">Premier Lawn Care</span> Service
            </h1>
            <p className="text-xl md:text-2xl text-background/90 mb-8 font-medium">
              Professional lawn care and landscaping for Waunakee homes and businesses. Quality you can count on, service you can trust.
            </p>
            <div className="flex items-center gap-6 mb-10 flex-wrap">
              <div className="flex items-center gap-2 text-background">
                <Star className="h-5 w-5 text-accent fill-accent" />
                <span className="font-bold">Top Rated in Waunakee</span>
              </div>
              <div className="flex items-center gap-2 text-background">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-bold">Fast Response</span>
              </div>
              <div className="flex items-center gap-2 text-background">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-bold">Satisfaction Guaranteed</span>
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

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Lawn Care for Waunakee Properties
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From weekly mowing to seasonal cleanups, we keep your Waunakee property looking its absolute best.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-card border-2 border-border rounded-xl p-6 hover:shadow-xl hover:border-primary transition-all hover:-translate-y-1"
              >
                <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all">
                  <service.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{service.name}</h3>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-6 text-lg">
              Need something specific? We offer <Link href="/" className="text-primary hover:underline font-semibold">12+ specialized services</Link> for residential and <Link href="/commercial" className="text-primary hover:underline font-semibold">commercial properties</Link>.
            </p>
            <Link href="/contact">
              <Button size="lg" className="font-bold">
                Get a Free Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Waunakee Chooses TotalGuard
              </h2>
            </div>

            <div className="space-y-6 mb-12">
              <div className="bg-card border-2 border-primary/20 rounded-xl p-6 flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Your Neighbors in Waunakee</h3>
                  <p className="text-muted-foreground">
                    We&apos;re not a faceless corporation - we&apos;re Alex and Vance, local business owners who live and work in this community. Your lawn&apos;s success is our success.
                  </p>
                </div>
              </div>

              <div className="bg-card border-2 border-primary/20 rounded-xl p-6 flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Proven Track Record</h3>
                  <p className="text-muted-foreground">
                    4.9-star rating with hundreds of satisfied customers across Waunakee and surrounding areas. Check out our <Link href="/reviews" className="text-primary hover:underline font-semibold">customer reviews</Link> and <Link href="/gallery" className="text-primary hover:underline font-semibold">before/after gallery</Link>.
                  </p>
                </div>
              </div>

              <div className="bg-card border-2 border-primary/20 rounded-xl p-6 flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">No-Risk Guarantee</h3>
                  <p className="text-muted-foreground">
                    Every job comes with our 100% satisfaction guarantee. If you&apos;re not completely happy with our work, we&apos;ll make it right - it&apos;s that simple.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-foreground to-foreground/90 text-background rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Get Started in 3 Easy Steps</h3>
                <p className="text-lg opacity-90">Transform your Waunakee lawn today</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    1
                  </div>
                  <h4 className="font-bold mb-2">Get Free Quote</h4>
                  <p className="text-sm opacity-90">Quick response, no obligation</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    2
                  </div>
                  <h4 className="font-bold mb-2">Schedule Service</h4>
                  <p className="text-sm opacity-90">Flexible times that work for you</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    3
                  </div>
                  <h4 className="font-bold mb-2">Enjoy Results</h4>
                  <p className="text-sm opacity-90">Beautiful lawn, guaranteed</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
                    Get a Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="tel:608-535-6057">
                  <Button size="lg" variant="outline" className="border-background text-background hover:bg-background hover:text-foreground font-bold">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (608) 535-6057
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Links */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Serving Greater Madison Area</h3>
          <p className="text-lg text-muted-foreground mb-6">
            Also proudly serving <Link href="/locations/madison" className="text-primary hover:underline font-semibold">Madison</Link>, <Link href="/locations/middleton" className="text-primary hover:underline font-semibold">Middleton</Link>, and surrounding communities
          </p>
          <Link href="/service-areas">
            <Button variant="outline" className="font-semibold">
              View Complete Service Area Map
            </Button>
          </Link>
        </div>
      </section>

      <Footer
        closerTitle="Ready for a Beautiful Waunakee Lawn?"
        closerDescription="Join your neighbors who trust TotalGuard for professional lawn care. Same-day quotes available."
      />
    </div>
  );
}
