'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { ServiceSchema } from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Flower2, Phone, Users, Calendar, Shield, Clock, Home } from "lucide-react";
import heroImage from "@/assets/service-mulching.jpg";
import gardenBedsImage from "@/assets/before-after/mulching-combined-2.png";
import ServiceFAQ from "@/components/ServiceFAQ";
import { gardenBedsFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { AmbientParticles } from "@/components/AmbientParticles";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function GardenBedsContent() {
  const beforeAfterItems = [
    {
      combinedImage: imgSrc(gardenBedsImage)
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Garden Beds', url: 'https://tgyardcare.com/services/garden-beds' }
      ]} />
      <ServiceSchema
        serviceName="Garden Bed Services in Madison & Dane County"
        description="Professional garden bed transformation across Madison, Middleton, Waunakee, Sun Prairie, and all Dane County communities. Complete makeovers from cleanup to planting."
        serviceType="Garden Beds"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Monona', 'Fitchburg', 'Verona', 'McFarland', 'DeForest', 'Cottage Grove', 'Oregon', 'Stoughton']}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides professional garden bed services in Madison, Middleton, Waunakee, and Dane County, Wisconsin. We offer design, edging, weeding, planting, and mulching for complete bed transformations. Maintenance plans available. Call (608) 535-6057 for a free consultation.</p>
      </section>

      {/* Hero */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-20 md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional garden bed makeover showing beautiful flower beds with colorful perennials, fresh mulch and decorative edging"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/50 to-[#0a1f14]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
        </div>
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Garden Bed Makeovers in <span className="text-accent">Madison & Dane County</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
              Transform tired, overgrown beds into stunning focal points that boost your home's curb appeal. Professional garden bed services across Madison, Middleton, Waunakee, and Sun Prairie.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" variant="accent" className="text-base md:text-lg font-bold" asChild>
                <Link href="/contact?service=garden-beds">Get My Free Quote →</Link>
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
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Who Garden Bed Services Are For</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              This service is designed for Dane County homeowners who want maximum curb appeal with minimal ongoing effort.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                <Home className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Homeowners Selling Their Property</h3>
                  <p className="text-sm text-muted-foreground">Fresh beds dramatically improve first impressions and listing photos</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                <Flower2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Those With Neglected Landscaping</h3>
                  <p className="text-sm text-muted-foreground">Overgrown, weedy beds dragging down an otherwise nice property</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">New Homeowners</h3>
                  <p className="text-sm text-muted-foreground">Inherited someone else's garden design and want a fresh start</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Low-Maintenance Seekers</h3>
                  <p className="text-sm text-muted-foreground">Want beautiful beds without constant weeding and upkeep</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ResidentialProblemSection
        serviceName="Garden Bed Makeovers"
        problemPoints={[
          "Neglected garden beds dragging down your property's appearance",
          "Weedy, sparse beds with faded mulch making your home look shabby",
          "Dead plants and unclear borders ruining even a well-maintained lawn",
          "Overgrown shrubs obscuring your home's foundation",
          "Overwhelming DIY garden makeovers—where do you even start?"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Garden Bed Makeovers"
        solutionPoints={[
          "Complete cleanup removing weeds, dead plants, and old mulch",
          "Redefined borders with fresh mulch for a polished base",
          "Soil amendment for healthier plant growth",
          "Low-maintenance perennial and shrub recommendations for your site",
          "Immediate impact and lasting beauty with minimal future maintenance"
        ]}
      />

      {/* What's Included */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            What's Included in Garden Bed Makeovers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Complete Weed Removal</h3>
                <p className="text-sm text-muted-foreground">Clear all weeds and unwanted vegetation down to the roots</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Bed Edging</h3>
                <p className="text-sm text-muted-foreground">Create or restore clean, defined bed lines that last</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Soil Preparation</h3>
                <p className="text-sm text-muted-foreground">Amend Dane County's clay soil for healthy plant growth</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Premium Mulch</h3>
                <p className="text-sm text-muted-foreground">Fresh mulch layer in your choice of color (brown, black, natural)</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Plant Trimming</h3>
                <p className="text-sm text-muted-foreground">Prune existing shrubs and perennials for healthy regrowth</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">New Plantings (Optional)</h3>
                <p className="text-sm text-muted-foreground">Add flowers, shrubs, or decorative elements as needed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How Garden Bed Makeovers Work</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-semibold mb-2">Free Consultation</h3>
                <p className="text-sm text-muted-foreground">We walk your property, assess bed conditions, and discuss your goals and budget.</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-semibold mb-2">Custom Plan</h3>
                <p className="text-sm text-muted-foreground">We recommend the right approach—basic refresh, complete makeover, or full redesign.</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-semibold mb-2">Transformation</h3>
                <p className="text-sm text-muted-foreground">Our crew executes the plan—clearing, edging, amending soil, mulching, and planting.</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                <h3 className="font-semibold mb-2">Instant Impact</h3>
                <p className="text-sm text-muted-foreground">Walk out to beds that look professionally designed and boost your home's curb appeal.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Options */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Choose Your Makeover Level
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow bg-background">
              <h3 className="text-2xl font-bold text-foreground mb-3">Basic Refresh</h3>
              <p className="text-muted-foreground mb-6">
                Perfect for beds that just need cleaning up and fresh mulch.
              </p>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Weed removal</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Edge refreshing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Fresh mulch</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">Starting at $200/bed</p>
            </div>

            <div className="border-2 border-primary rounded-lg p-6 shadow-md relative bg-background">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Complete Makeover</h3>
              <p className="text-muted-foreground mb-6">
                Full renovation including soil prep and design improvements.
              </p>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Everything in Basic</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Soil amendment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Redesign consultation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Plant trimming/removal</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">$400-$800/bed typical</p>
            </div>

            <div className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow bg-background">
              <h3 className="text-2xl font-bold text-foreground mb-3">Full Redesign</h3>
              <p className="text-muted-foreground mb-6">
                Complete transformation with new plants and features.
              </p>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Everything in Complete</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">New plant installation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Decorative elements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Custom design</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">$800-$2,000+ depending on scope</p>
            </div>
          </div>
        </div>
      </section>

      <BeforeAfterGallery items={beforeAfterItems} />

      {/* Wisconsin Context */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Garden Beds Built for Wisconsin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-3">Zone 5a Plant Selection</h3>
              <p className="text-muted-foreground">
                We recommend perennials and shrubs proven to survive Dane County's harsh winters—hostas, daylilies, hydrangeas, and ornamental grasses that thrive here.
              </p>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-3">Clay Soil Solutions</h3>
              <p className="text-muted-foreground">
                Madison's heavy clay drains poorly and compacts easily. We amend beds with organic matter to improve drainage and root development.
              </p>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-3">4-Season Interest</h3>
              <p className="text-muted-foreground">
                With only 150 growing days, we design beds for maximum seasonal impact—spring bulbs, summer blooms, fall color, and winter structure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* When & How Often */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">When & How Often</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background p-6 rounded-lg border border-border">
                <Calendar className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Best Timing</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Spring (April-May):</strong> Ideal for major makeovers and planting</li>
                  <li>• <strong>Early Summer (June):</strong> Good for refreshes before July heat</li>
                  <li>• <strong>Fall (Sept-Oct):</strong> Perfect for planting perennials and prep for winter</li>
                  <li>• <strong>Avoid:</strong> Mid-summer heat stress on new plants</li>
                </ul>
              </div>
              <div className="bg-background p-6 rounded-lg border border-border">
                <Clock className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Maintenance Frequency</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Mulch refresh:</strong> Every 1-2 years</li>
                  <li>• <strong>Edge maintenance:</strong> Annually in spring</li>
                  <li>• <strong>Weed control:</strong> Monthly during growing season (or hire us!)</li>
                  <li>• <strong>Full makeover:</strong> Every 5-7 years as plants mature</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Makes TotalGuard Different</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">We Focus on Low Maintenance</h3>
                <p className="text-muted-foreground">Beautiful beds that don't require constant attention. We recommend plants that thrive with minimal care in Wisconsin conditions.</p>
              </div>
              <div className="border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Honest Recommendations</h3>
                <p className="text-muted-foreground">We won't oversell. If your beds just need a refresh, we'll say so. If they need a complete overhaul, we'll explain why.</p>
              </div>
              <div className="border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Complete Property Thinking</h3>
                <p className="text-muted-foreground">We consider how beds fit with your lawn, hardscapes, and home style. Not just isolated bed work—cohesive property design.</p>
              </div>
              <div className="border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Ongoing Care Available</h3>
                <p className="text-muted-foreground">Don't want to maintain your new beds? We offer weeding, mulch refreshes, and seasonal care to keep them looking great.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Pair With These Services</h2>
            <p className="text-muted-foreground mb-8">
              Complete your property transformation with these related services:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/services/mulching">Mulching</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/services/weeding">Regular Weeding</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/services/pruning">Shrub Pruning</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/services/mowing">Lawn Mowing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ResidentialHomeownerTypesSection serviceName="garden bed" />
      <ResidentialExpectationsSection serviceName="garden bed" />

      <ServiceFAQ faqs={gardenBedsFAQs} />

      <Footer />
    </div>
  );
}
