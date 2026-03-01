'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { ServiceSchema } from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Home, Phone, Calendar, Shield, Clock, AlertTriangle } from "lucide-react";
import heroImage from "@/assets/service-gutter.jpg";
import gutterCombined from "@/assets/before-after/gutter-cleaning-combined.png";
import gutterCombined1 from "@/assets/before-after/gutter-cleaning-combined-1.png";
import ServiceFAQ from "@/components/ServiceFAQ";
import { gutterCleaningFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function GutterCleaningContent() {
  const beforeAfterItems = [
    { combinedImage: imgSrc(gutterCombined) },
    { combinedImage: imgSrc(gutterCombined1) }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ServiceSchema
        serviceName="Professional Gutter Cleaning in Madison & Dane County"
        description="Safe, thorough gutter cleaning and maintenance to protect your home from water damage across Madison, Middleton, Waunakee, Sun Prairie, and all Dane County."
        serviceType="Gutter Cleaning"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Monona', 'Fitchburg', 'Verona', 'McFarland', 'DeForest', 'Cottage Grove', 'Oregon', 'Stoughton']}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides professional gutter cleaning in Madison, Middleton, and Dane County, Wisconsin. Every service includes debris removal, downspout flushing, and before/after photos. Call (608) 535-6057 for a free quote.</p>
      </section>

      {/* Hero */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-20 md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional gutter cleaning service showing technician safely cleaning gutters on residential home"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Gutter Cleaning in <span className="text-accent">Madison & Dane County</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
              Wisconsin winters create ice dams that destroy gutters and cause basement flooding—but only if they're clogged. Professional cleaning protects your home from expensive water damage.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" variant="accent" className="text-base md:text-lg font-bold" asChild>
                <Link href="/contact?service=gutter-cleaning">Get My Free Quote →</Link>
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
              <strong>Ideal for:</strong> Homeowners who don't want to risk ladder falls, properties with mature trees, or anyone who values their safety and time. Essential before Wisconsin's winter freeze.
            </p>
          </div>
        </div>
      </section>

      <ResidentialProblemSection
        serviceName="Gutter Cleaning"
        problemPoints={[
          "Clogged gutters causing basement flooding, foundation cracks, and landscape erosion",
          "Overflowing water cascading down your foundation causing thousands in damage",
          "Winter ice dams forming in clogged gutters and tearing them off your home",
          "Dangerous ladder climbing that sends thousands to the ER annually",
          "Siding damage and roof shingle problems from neglected gutters"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Gutter Cleaning"
        solutionPoints={[
          "Safe, professional gutter cleaning using proper equipment and safety protocols",
          "Complete removal of all leaves, debris, and buildup from your gutter system",
          "Downspout flushing to ensure proper drainage away from your foundation",
          "Damage inspection with alerts about issues before they become expensive repairs",
          "Photo documentation for your records showing before/after results"
        ]}
      />

      {/* What's Included */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            What's Included in Our Gutter Cleaning
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Complete service with no hidden charges—exactly what you need to protect your home.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Complete Debris Removal", desc: "Remove all leaves, twigs, shingle grit, and organic buildup from gutters" },
              { title: "Downspout Flushing", desc: "Water test all downspouts to ensure they flow freely and drain properly" },
              { title: "Professional Safety", desc: "Proper ladders, harnesses, and equipment—no unnecessary risks" },
              { title: "Gutter Inspection", desc: "Check for leaks, sagging, loose hangers, and damage that needs attention" },
              { title: "Ground Cleanup", desc: "All debris bagged and removed from your property—not dumped in your beds" },
              { title: "Photo Documentation", desc: "Before/after photos showing exactly what we found and fixed" }
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
            How Our Gutter Cleaning Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Setup & Safety</h3>
              <p className="text-sm text-muted-foreground">
                We set up professional equipment and protect your landscaping
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Clear All Debris</h3>
              <p className="text-sm text-muted-foreground">
                Hand-remove all leaves, muck, and buildup from every section
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Flush Downspouts</h3>
              <p className="text-sm text-muted-foreground">
                Water test every downspout to confirm clear drainage
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Inspect & Report</h3>
              <p className="text-sm text-muted-foreground">
                Check for damage and provide photos of completed work
              </p>
            </div>
          </div>
        </div>
      </section>

      <BeforeAfterGallery items={beforeAfterItems} />

      {/* When to Clean */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            When to Clean Gutters in Wisconsin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border-2 border-primary rounded-lg p-8 relative bg-background">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Critical
              </div>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Fall (Late October-November)</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                After Madison's oak and maple trees finish dropping leaves but before the first freeze. This is the most important cleaning of the year—clogged gutters in winter lead to ice dams.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  Prevents ice dam formation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  Clears heavy leaf accumulation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  Protects foundation from snowmelt overflow
                </li>
              </ul>
            </div>

            <div className="border border-border rounded-lg p-8 bg-background">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Spring (April-May)</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                After pollen season and tree seeds (helicopters) finish falling. Clears winter debris and prepares for spring storms and heavy summer rain.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  Removes winter accumulation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  Clears pollen and seed pods
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  Ready for spring storms
                </li>
              </ul>
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
            <strong>How often?</strong> Twice yearly (spring and fall) is standard. Properties with many trees may benefit from three cleanings.
          </p>
        </div>
      </section>

      {/* Benefits - Wisconsin Context */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Why Gutter Cleaning Matters in Wisconsin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Prevent Ice Dams</h3>
              </div>
              <p className="text-muted-foreground">
                Dane County's freeze-thaw cycles create ice dams when clogged gutters trap water. These ice dams can tear gutters right off your home, damage shingles, and cause interior leaks that cost thousands to repair.
              </p>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Home className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Foundation Protection</h3>
              </div>
              <p className="text-muted-foreground">
                Wisconsin's heavy spring rains and snowmelt need somewhere to go. Clogged gutters overflow and dump water directly against your foundation, causing basement flooding, cracks, and structural damage.
              </p>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Extend Gutter Lifespan</h3>
              </div>
              <p className="text-muted-foreground">
                Wet debris and standing water in Madison's humid summers cause rust and corrosion. Heavy debris loads make gutters sag and pull away from fascia. Regular cleaning extends gutter life by years.
              </p>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Skip the Ladder Risk</h3>
              </div>
              <p className="text-muted-foreground">
                Wisconsin homeowners get hurt every year climbing ladders to clean gutters. We handle the dangerous work safely so you don't have to risk a fall on wet or icy rungs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Madison-Area Gutter Cleaning Prices</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Most single-story homes in Madison, Middleton, Waunakee, and Sun Prairie range from <strong>$100-$200</strong>. Two-story homes typically run <strong>$150-$300</strong>. Price depends on linear feet of gutter, height, and debris level. We recommend cleaning twice yearly: spring (after pollen) and fall (after leaves).
          </p>
          <div className="bg-background rounded-lg p-6 max-w-md mx-auto mb-8 border border-border">
            <p className="font-semibold text-foreground mb-2">Seasonal Package Discount</p>
            <p className="text-sm text-muted-foreground">
              Schedule both spring and fall cleanings together and save 10% on your annual gutter maintenance.
            </p>
          </div>
          <Button size="lg" asChild>
            <Link href="/contact?service=gutter-cleaning">Get Your Quote Today</Link>
          </Button>
        </div>
      </section>

      {/* Related Service */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
            Tired of Cleaning Gutters Twice a Year?
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Consider gutter guards—they reduce cleaning frequency by up to 90%:
          </p>
          <div className="max-w-md mx-auto">
            <Link
              href="/services/gutter-guards"
              className="block p-6 border-2 border-primary rounded-lg hover:shadow-lg transition-all bg-background text-center group"
            >
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Gutter Guard Installation</h3>
              <p className="text-muted-foreground">One-time investment that pays for itself in 3-5 years. Never climb a ladder again.</p>
              <Button className="mt-4">Learn About Gutter Guards →</Button>
            </Link>
          </div>
        </div>
      </section>

      <ResidentialHomeownerTypesSection serviceName="gutter cleaning" />
      <ResidentialExpectationsSection serviceName="gutter cleaning" />

      <ServiceFAQ faqs={gutterCleaningFAQs} />

      <CTASection />
      <Footer />
    </div>
  );
}
