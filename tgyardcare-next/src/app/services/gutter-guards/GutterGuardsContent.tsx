'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { ServiceSchema } from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Shield, Phone, Calendar, DollarSign, Clock } from "lucide-react";
import heroImage from "@/assets/service-gutter-guards.jpg";
import gutterGuardsImage from "@/assets/before-after/gutter-guards-combined.png";
import ServiceFAQ from "@/components/ServiceFAQ";
import { gutterGuardsFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function GutterGuardsContent() {
  const beforeAfterItems = [
    { combinedImage: imgSrc(gutterGuardsImage) }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ServiceSchema
        serviceName="Gutter Guard Installation in Madison & Dane County"
        description="Professional gutter guard installation across Madison, Middleton, Waunakee, Sun Prairie, and all Dane County. Prevent clogs, ice dams, and eliminate gutter cleaning."
        serviceType="Gutter Guards"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Monona', 'Fitchburg', 'Verona', 'McFarland', 'DeForest', 'Cottage Grove', 'Oregon', 'Stoughton']}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides professional gutter guard installation in Madison, Middleton, Waunakee, and Dane County, Wisconsin. Micro-mesh guards prevent clogs and ice dams. Eliminate gutter cleaning. Warranty documentation included. Call (608) 535-6057 for a free quote.</p>
      </section>

      {/* Hero */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-20 md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional gutter guard installation showing close-up of mesh gutter protection system on residential home"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Gutter Guards in <span className="text-accent">Madison & Dane County</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
              Stop climbing ladders twice a year. Professional gutter guard installation keeps leaves and debris out permanently—protecting your home through Wisconsin's harshest weather.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" variant="accent" className="text-base md:text-lg font-bold" asChild>
                <Link href="/contact?service=gutter-guards">Get My Free Quote →</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 text-base md:text-lg" asChild>
                <a href="tel:608-535-6057">
                  <Phone className="mr-2 h-5 w-5" />
                  (608) 535-6057
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-foreground">
              <strong>Ideal for:</strong> Homeowners tired of semi-annual gutter cleaning, properties surrounded by mature trees, anyone concerned about ladder safety, and those who want permanent protection from ice dams and water damage.
            </p>
          </div>
        </div>
      </section>

      <ResidentialProblemSection
        serviceName="Gutter Guard Installation"
        problemPoints={[
          "Multiple expensive gutter cleanings required every year ($200-$400+ annually)",
          "Dangerous ladder climbing putting you at risk of injury",
          "Gutters clogging between service visits and overflowing during storms",
          "Madison's mature oak and maple trees dropping constant debris",
          "One heavy storm with clogged gutters causing thousands in water damage"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Gutter Guard Installation"
        solutionPoints={[
          "High-quality micro-mesh guards that block leaves, pine needles, and debris",
          "Water flows freely while handling Wisconsin's heaviest rainfall",
          "Professional installation ensuring perfect fit with your existing gutters",
          "Reduce cleaning frequency by 90% or more—virtually maintenance-free",
          "One-time investment that pays for itself in 3-5 years of skipped cleanings"
        ]}
      />

      {/* What's Included */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            What's Included in Our Installation
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Complete installation from start to finish—including the cleaning your gutters need first.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Pre-Installation Cleaning", desc: "Complete gutter cleaning before guards go on—ensures a clean start" },
              { title: "Premium Micro-Mesh Guards", desc: "Durable, weather-resistant guards that handle Wisconsin's climate" },
              { title: "Custom Fitting", desc: "Precisely measured and cut to fit your specific gutter system perfectly" },
              { title: "Secure Mounting", desc: "Professional attachment that withstands wind, snow loads, and ice" },
              { title: "Flow Testing", desc: "Water test after installation to verify proper drainage performance" },
              { title: "Workmanship Warranty", desc: "Our installation work is backed by warranty coverage" }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3 bg-background p-4 rounded-lg border border-border">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            How Gutter Guard Installation Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Measure & Quote</h3>
              <p className="text-sm text-muted-foreground">
                We measure your gutters and provide exact pricing—no surprises
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Clean Gutters</h3>
              <p className="text-sm text-muted-foreground">
                Complete cleaning before installation for optimal performance
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Install Guards</h3>
              <p className="text-sm text-muted-foreground">
                Custom fit and secure mounting on all gutter sections
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Test & Verify</h3>
              <p className="text-sm text-muted-foreground">
                Water testing confirms proper flow before we leave
              </p>
            </div>
          </div>
        </div>
      </section>

      <BeforeAfterGallery items={beforeAfterItems} />

      {/* ROI Calculator Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            The Math: Why Gutter Guards Pay for Themselves
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Compare the cost of ongoing cleaning vs. a one-time gutter guard investment:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-background p-8 rounded-lg border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-red-500" />
                Without Gutter Guards
              </h3>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li className="flex justify-between">
                  <span>Spring cleaning:</span>
                  <span className="font-semibold">$150-$250</span>
                </li>
                <li className="flex justify-between">
                  <span>Fall cleaning:</span>
                  <span className="font-semibold">$150-$250</span>
                </li>
                <li className="flex justify-between border-t pt-3 mt-3">
                  <span>Annual cost:</span>
                  <span className="font-semibold text-red-600">$300-$500/year</span>
                </li>
                <li className="flex justify-between">
                  <span>5-year cost:</span>
                  <span className="font-semibold text-red-600">$1,500-$2,500</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground italic">
                Plus: Risk of ladder injury, property damage from clogs, stress of scheduling
              </p>
            </div>
            <div className="bg-background p-8 rounded-lg border-2 border-primary">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                With Gutter Guards
              </h3>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li className="flex justify-between">
                  <span>One-time installation:</span>
                  <span className="font-semibold">$800-$2,000</span>
                </li>
                <li className="flex justify-between">
                  <span>Occasional maintenance:</span>
                  <span className="font-semibold">$50-$75/year</span>
                </li>
                <li className="flex justify-between border-t pt-3 mt-3">
                  <span>5-year total cost:</span>
                  <span className="font-semibold text-primary">$1,000-$2,400</span>
                </li>
                <li className="flex justify-between">
                  <span>10-year savings:</span>
                  <span className="font-semibold text-primary">$1,500-$3,000+</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground italic">
                Plus: No ladder climbing, no water damage risk, peace of mind
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Benefits of Gutter Guards in Wisconsin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Prevent Ice Dams</h3>
              <p className="text-muted-foreground">
                Guards allow gutters to drain even in cold weather, preventing the standing water that creates destructive ice dams during Dane County winters.
              </p>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">End Seasonal Cleaning</h3>
              <p className="text-muted-foreground">
                No more scheduling twice-yearly cleanings or worrying about finding time before winter. Guards reduce maintenance by 90%+.
              </p>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Protect Your Safety</h3>
              <p className="text-muted-foreground">
                Ladder falls cause thousands of injuries every year. With gutter guards, you never have to climb up there again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Why Choose TotalGuard for Gutter Guards
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Not all gutter guard installations are equal. Here's what sets us apart:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <h3 className="text-xl font-semibold text-foreground mb-3">Quality Products</h3>
              <p className="text-muted-foreground">
                We use micro-mesh guards proven to handle heavy rain, pine needles, and oak leaf debris common in Madison neighborhoods.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <h3 className="text-xl font-semibold text-foreground mb-3">Proper Installation</h3>
              <p className="text-muted-foreground">
                Guards are only as good as their installation. We ensure proper angle, secure mounting, and seamless integration with your roofline.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <h3 className="text-xl font-semibold text-foreground mb-3">Local Expertise</h3>
              <p className="text-muted-foreground">
                We understand Wisconsin's specific challenges—heavy snow loads, ice, and the particular debris from Dane County's trees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Gutter Guard Installation Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Gutter guard installation is priced per linear foot based on gutter length and home height. Most Madison-area homes range from <strong>$800-$2,000</strong> for complete installation. This one-time investment typically pays for itself in 3-5 years compared to ongoing cleaning costs.
          </p>
          <div className="bg-muted/30 rounded-lg p-6 max-w-md mx-auto mb-8 border border-border">
            <p className="font-semibold text-foreground mb-2">Bundle & Save</p>
            <p className="text-sm text-muted-foreground">
              Book installation with a gutter cleaning service and save 10% on your gutter guard installation!
            </p>
          </div>
          <Button size="lg" asChild>
            <Link href="/contact?service=gutter-guards">Get Free Installation Estimate</Link>
          </Button>
        </div>
      </section>

      {/* Related */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
            Complete Home Protection
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Gutter guards are one part of protecting your home from water damage:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Link
              href="/services/gutter-cleaning"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Gutter Cleaning</h3>
              <p className="text-sm text-muted-foreground">One-time cleaning before guard installation or if you're not ready for guards yet</p>
            </Link>
            <Link
              href="/services/fall-cleanup"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Fall Cleanup</h3>
              <p className="text-sm text-muted-foreground">Comprehensive fall property prep including leaf removal</p>
            </Link>
          </div>
        </div>
      </section>

      <ResidentialHomeownerTypesSection serviceName="gutter guard installation" />
      <ResidentialExpectationsSection serviceName="gutter guard installation" />

      <ServiceFAQ faqs={gutterGuardsFAQs} />

      <CTASection />
      <Footer />
    </div>
  );
}
