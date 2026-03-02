'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { ServiceSchema } from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Trees, Phone, Calendar, Shield, Droplets } from "lucide-react";
import heroImage from "@/assets/service-mulching.jpg";
import mulchingImage1 from "@/assets/before-after/mulching-combined.png";
import mulchingImage3 from "@/assets/before-after/mulching-combined-3.png";
import ServiceFAQ from "@/components/ServiceFAQ";
import { mulchingFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function MulchingContent() {
  const beforeAfterItems = [
    { combinedImage: mulchingImage1 },
    { combinedImage: mulchingImage3 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Mulching', url: 'https://tgyardcare.com/services/mulching' }
      ]} />
      <ServiceSchema
        serviceName="Professional Mulching Services in Madison & Dane County"
        description="Premium hardwood mulch installation for garden beds across Madison, Middleton, Waunakee, Sun Prairie, and all Dane County."
        serviceType="Mulching"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Monona', 'Fitchburg', 'Verona', 'McFarland', 'DeForest', 'Cottage Grove', 'Oregon', 'Stoughton']}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides professional mulching services in Madison, Middleton, Waunakee, and Dane County, Wisconsin. Premium hardwood mulch installed at 2-3" depth with defined edges. Old mulch removed if needed. One-visit installation. Call (608) 535-6057 for a free quote.</p>
      </section>

      {/* Hero */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-20 md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional mulching service showing fresh dark brown mulch being spread in garden beds"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Mulching in <span className="text-accent">Madison & Dane County</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
              Wisconsin's freeze-thaw cycles are brutal on plant roots. Fresh hardwood mulch insulates your beds through Dane County's temperature swings while giving your landscape instant curb appeal.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" variant="accent" className="text-base md:text-lg font-bold" asChild>
                <Link href="/contact?service=mulching">Get My Free Quote →</Link>
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
              <strong>Ideal for:</strong> Homeowners with garden beds that need refreshing, faded or washed-out mulch, or landscaping that lacks the polished look. Also perfect for new plantings that need protection through their first Wisconsin winter.
            </p>
          </div>
        </div>
      </section>

      <ResidentialProblemSection
        serviceName="Mulching"
        problemPoints={[
          "Old, faded mulch making your entire property look neglected",
          "Bare spots and washed-out mulch detracting from beautiful landscaping",
          "Soil drying out faster and weeds taking over without proper coverage",
          "Plant roots suffering from extreme Wisconsin temperature swings",
          "DIY mulching requiring heavy hauling and back-breaking spreading"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Mulching"
        solutionPoints={[
          "Premium hardwood mulch delivery and installation that instantly revitalizes beds",
          "Crisp edging for clean lines before mulch application",
          "Consistent 2-3 inch layer that looks uniform and professional",
          "Moisture retention, weed suppression, and soil temperature regulation",
          "A polished landscape that looks expensive but fits your budget"
        ]}
      />

      {/* What's Included */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            What's Included in Our Mulching Service
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Complete service from delivery to cleanup—no extra charges or surprises.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Premium Mulch", desc: "High-quality hardwood mulch in your choice of color (brown, black, or natural)" },
              { title: "Bed Preparation", desc: "Weeding and debris removal before mulch application" },
              { title: "Professional Edging", desc: "Crisp, defined borders for a clean, finished look" },
              { title: "Even Application", desc: "Uniform 2-3 inch depth for optimal benefits and appearance" },
              { title: "Complete Cleanup", desc: "All excess mulch and debris removed from walkways and lawn" },
              { title: "Free Delivery", desc: "Mulch delivery included in service price—no surprise hauling fees" }
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
            How Our Mulching Service Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Measure & Quote</h3>
              <p className="text-sm text-muted-foreground">
                We assess your beds and calculate exactly how much mulch you need
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Prep Your Beds</h3>
              <p className="text-sm text-muted-foreground">
                Weed removal, debris clearing, and edge definition
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Install Mulch</h3>
              <p className="text-sm text-muted-foreground">
                Even 2-3" application throughout all beds
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Clean & Finish</h3>
              <p className="text-sm text-muted-foreground">
                All surfaces cleared, property left spotless
              </p>
            </div>
          </div>
        </div>
      </section>

      <BeforeAfterGallery items={beforeAfterItems} />

      {/* Timing & Maintenance */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            When to Mulch in Wisconsin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border-2 border-primary rounded-lg p-8 relative bg-background">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Best Time
              </div>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Spring (April-May)</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                After spring cleanup and before summer heat arrives is the ideal window. Fresh mulch protects roots from temperature swings and locks in spring moisture.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  Refresh faded winter-worn beds
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  Suppress weed growth before it starts
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  Retain moisture during dry summers
                </li>
              </ul>
            </div>

            <div className="border border-border rounded-lg p-8 bg-background">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Fall (September-October)</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                A fall refresh before Wisconsin's harsh winter provides crucial root insulation and sets your beds up for a head start in spring.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  Insulate roots from freeze-thaw cycles
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  Protect perennials through winter
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  Reduce spring weed emergence
                </li>
              </ul>
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
            <strong>How often?</strong> Most Madison-area beds benefit from annual mulching. Heavily sun-exposed or steep beds may need topping off twice yearly.
          </p>
        </div>
      </section>

      {/* Benefits - Wisconsin Context */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Why Mulching Matters in Wisconsin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Temperature Insulation</h3>
              </div>
              <p className="text-muted-foreground">
                Madison temperatures can swing 50+ degrees in a single week during spring and fall. Mulch insulates roots from these extremes, reducing plant stress and winter die-off.
              </p>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Droplets className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Summer Moisture Retention</h3>
              </div>
              <p className="text-muted-foreground">
                Wisconsin summers bring dry stretches that stress plants. A proper mulch layer reduces watering needs by up to 50%—saving time and keeping beds healthy during Dane County heat waves.
              </p>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Trees className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Weed Prevention</h3>
              </div>
              <p className="text-muted-foreground">
                Block aggressive weeds like creeping charlie and crabgrass that thrive in Wisconsin's climate. A thick mulch layer suppresses weed seeds and reduces maintenance all season.
              </p>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Trees className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Instant Curb Appeal</h3>
              </div>
              <p className="text-muted-foreground">
                Whether you're in Nakoma, Middleton Hills, or a newer Waunakee subdivision, fresh dark mulch transforms tired beds and makes your property stand out on the block.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mulch Types */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Mulch Options
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            We use premium double-shredded hardwood mulch in your choice of color:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-amber-800 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Brown Mulch</h3>
              <p className="text-muted-foreground text-sm">
                Classic choice that complements most landscaping. Fades naturally to a warm tone.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-gray-900 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Black Mulch</h3>
              <p className="text-muted-foreground text-sm">
                Bold, modern look that makes plants pop. Holds color longer than natural tones.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-amber-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Natural Mulch</h3>
              <p className="text-muted-foreground text-sm">
                Undyed option for an organic look. Weathers to a natural gray over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Madison-Area Mulching Prices</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Mulching is priced per cubic yard, with most Madison, Middleton, Waunakee, and Sun Prairie residential properties requiring 3-8 cubic yards.
            Typical installations range from <strong>$250-$600</strong> depending on bed size and mulch type. Free delivery included for all Dane County properties.
          </p>
          <div className="bg-muted/30 rounded-lg p-6 max-w-md mx-auto mb-8 border border-border">
            <p className="font-semibold text-foreground mb-2">Best Timing: April-May</p>
            <p className="text-sm text-muted-foreground">
              Schedule after spring cleanup and before summer heat for maximum benefit. Fall refresh available September-October.
            </p>
          </div>
          <Button size="lg" asChild>
            <Link href="/contact?service=mulching">Schedule Your Mulch Installation</Link>
          </Button>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
            Complete Your Bed Renovation
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Mulching pairs well with these services for maximum impact:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/services/weeding"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Weeding</h3>
              <p className="text-sm text-muted-foreground">Clear beds before mulch for best results</p>
            </Link>
            <Link
              href="/services/pruning"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Pruning</h3>
              <p className="text-sm text-muted-foreground">Shape shrubs while we're in your beds</p>
            </Link>
            <Link
              href="/services/garden-beds"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Garden Beds</h3>
              <p className="text-sm text-muted-foreground">Full bed renovation including mulch</p>
            </Link>
          </div>
        </div>
      </section>

      <ResidentialHomeownerTypesSection serviceName="mulching" />
      <ResidentialExpectationsSection serviceName="mulching" />

      <ServiceFAQ faqs={mulchingFAQs} />

      <CTASection />
      <Footer />
    </div>
  );
}
