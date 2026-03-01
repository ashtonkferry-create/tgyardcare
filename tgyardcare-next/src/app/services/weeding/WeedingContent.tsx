'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { ServiceSchema } from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Leaf, Phone, Calendar, Shield, Clock } from "lucide-react";
import heroImage from "@/assets/service-weeding.jpg";
import weedingImage1 from "@/assets/before-after/weeding-combined.png";
import weedingImage2 from "@/assets/before-after/weeding-combined-2.png";
import ServiceFAQ from "@/components/ServiceFAQ";
import { weedingFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function WeedingContent() {
  const beforeAfterItems = [
    { combinedImage: weedingImage1 },
    { combinedImage: weedingImage2 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ServiceSchema
        serviceName="Professional Weeding Services in Madison & Dane County"
        description="Thorough weed removal for garden beds across Madison, Middleton, Waunakee, Sun Prairie, and all Dane County."
        serviceType="Weed Removal"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Monona', 'Fitchburg', 'Verona', 'McFarland', 'DeForest', 'Cottage Grove', 'Oregon', 'Stoughton']}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides professional hand weeding services in Madison, Middleton, Waunakee, and Dane County, Wisconsin. Thorough root removal for pristine garden beds. Chemical-free option available for beds near edibles. Call (608) 535-6057 for a free quote.</p>
      </section>

      {/* Hero */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-20 md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional weeding service showing landscaper removing weeds from garden beds with fresh mulch and healthy plants"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Garden Bed Weeding in <span className="text-accent">Madison & Dane County</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
              Wisconsin's warm, humid summers create perfect weed-growing conditions. Hand weeding from our crew keeps your beds pristine—and saves your weekends and your back.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" variant="accent" className="text-base md:text-lg font-bold" asChild>
                <Link href="/contact?service=weeding">Get My Free Quote →</Link>
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
              <strong>Ideal for:</strong> Homeowners who want weed-free garden beds without the back-breaking labor. Perfect for busy professionals, those with physical limitations, or anyone who'd rather enjoy their landscape than work in it.
            </p>
          </div>
        </div>
      </section>

      <ResidentialProblemSection
        serviceName="Weeding"
        problemPoints={[
          "Weeds competing with your plants for water, nutrients, and sunlight",
          "Rapid weed spread taking over garden beds and ruining your property's appearance",
          "Time-consuming, exhausting manual weeding that eats your weekends",
          "Weeds regrowing from roots when not removed properly",
          "Overgrown beds that make even a well-maintained lawn look shabby"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Weeding"
        solutionPoints={[
          "Thorough hand weeding that removes the entire root system",
          "Complete coverage of all garden beds, borders, and landscape areas",
          "Regular service that keeps weed pressure down all season",
          "Expert identification of problem weeds requiring special attention",
          "All debris removed—you just enjoy the clean results"
        ]}
      />

      {/* What's Included */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            What's Included in Our Weeding Service
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Complete weed removal from start to finish—no extra charges.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Hand Weeding in Beds", desc: "Complete removal of all weeds from garden beds and planted areas" },
              { title: "Root Extraction", desc: "Thorough removal including entire root systems to prevent regrowth" },
              { title: "Edge & Border Weeding", desc: "Weed removal along driveways, sidewalks, and bed edges" },
              { title: "Gravel & Patio Areas", desc: "Clear weeds from rock beds, patios, and hardscape areas" },
              { title: "Debris Removal", desc: "All pulled weeds bagged and hauled away from your property" },
              { title: "Prevention Tips", desc: "Recommendations to reduce future weed growth between visits" }
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
            How Our Weeding Service Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Assess Your Beds</h3>
              <p className="text-sm text-muted-foreground">
                We survey all garden areas and identify weed types and severity
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Hand-Pull Everything</h3>
              <p className="text-sm text-muted-foreground">
                Complete removal including roots—not just surface clearing
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Clean Up</h3>
              <p className="text-sm text-muted-foreground">
                All debris bagged and removed—property left spotless
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Schedule Next Visit</h3>
              <p className="text-sm text-muted-foreground">
                Regular service keeps weed pressure low all season
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timing & Frequency */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            When & How Often to Weed in Wisconsin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-background p-6 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Weeding Season</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                In Dane County, weeds grow aggressively from <strong>May through September</strong>. The warm, humid conditions that make Madison summers pleasant also make them ideal for weed growth.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  Early spring cleanup catches winter annuals
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  Summer is peak weed season
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  Fall cleanup prevents winter seeding
                </li>
              </ul>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Service Frequency</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                For most Madison-area properties, <strong>bi-weekly or monthly</strong> weeding during the growing season keeps beds looking clean without letting weeds get out of control.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  <strong>Bi-weekly:</strong> Best for weed-prone beds
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  <strong>Monthly:</strong> Good for well-mulched areas
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  <strong>One-time:</strong> Catch-up service available
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <BeforeAfterGallery items={beforeAfterItems} />

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Benefits of Professional Weeding
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Healthier Plants</h3>
              <p className="text-muted-foreground">
                Without weed competition, your flowers, shrubs, and perennials get more water, nutrients, and sunlight—leading to more vigorous, beautiful growth.
              </p>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Instant Curb Appeal</h3>
              <p className="text-muted-foreground">
                Clean, weed-free beds create an immediate polished look that elevates your entire property—and makes your home stand out on the block.
              </p>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Save Your Back</h3>
              <p className="text-muted-foreground">
                Skip the hours of bending, kneeling, and pulling. We handle this tedious, physically demanding work so you can enjoy your landscape instead of laboring in it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Why Choose TotalGuard for Weeding
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            We don't just clear the surface—we remove the problem at the root:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Thorough Root Removal</h3>
              <p className="text-muted-foreground">
                We extract the entire root system—not just the visible leaves. This means weeds don't grow back in days like they do with surface clearing.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Reliable Scheduling</h3>
              <p className="text-muted-foreground">
                We show up on your scheduled day, every time. No chasing contractors or wondering when your beds will get attention.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Complete Property Service</h3>
              <p className="text-muted-foreground">
                We handle all beds, borders, gravel areas, and hardscape edges—not just the easy-to-reach spots.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Madison-Area Weeding Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            We price weeding based on the size of the area and severity of weed growth. Most Madison-area properties range from <strong>$100-$300 per visit</strong> for complete bed weeding. Regular monthly or bi-weekly service reduces per-visit costs and keeps beds consistently clean.
          </p>
          <div className="bg-muted/30 rounded-lg p-6 max-w-md mx-auto mb-8 border border-border">
            <p className="font-semibold text-foreground mb-2">Maintenance Plans Available</p>
            <p className="text-sm text-muted-foreground">
              Schedule recurring service and save. Consistent attention prevents weeds from ever taking over.
            </p>
          </div>
          <Button size="lg" asChild>
            <Link href="/contact?service=weeding">Get Your Free Quote</Link>
          </Button>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
            Complete Your Bed Maintenance
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Weeding pairs well with these services for pristine landscape beds:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/services/mulching"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Mulching</h3>
              <p className="text-sm text-muted-foreground">Fresh mulch suppresses weeds and completes the look</p>
            </Link>
            <Link
              href="/services/pruning"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Pruning</h3>
              <p className="text-sm text-muted-foreground">Shape shrubs while we're working in your beds</p>
            </Link>
            <Link
              href="/services/garden-beds"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Garden Beds</h3>
              <p className="text-sm text-muted-foreground">Full bed renovation for a complete transformation</p>
            </Link>
          </div>
        </div>
      </section>

      <ResidentialHomeownerTypesSection serviceName="weeding" />
      <ResidentialExpectationsSection serviceName="weeding" />

      <ServiceFAQ faqs={weedingFAQs} />

      <CTASection />
      <Footer />
    </div>
  );
}
