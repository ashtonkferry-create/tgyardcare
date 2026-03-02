'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { ServiceSchema } from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Sprout, Phone, Wind, Droplets, TreeDeciduous, Calendar, Shield, Clock } from "lucide-react";
import heroImage from "@/assets/hero-aeration.jpg";
import ServiceFAQ from "@/components/ServiceFAQ";
import { aerationFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function AerationContent() {
  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Aeration', url: 'https://tgyardcare.com/services/aeration' }
      ]} />
      <ServiceSchema
        serviceName="Core Aeration Services in Madison & Dane County"
        description="Professional core aeration to reduce soil compaction and promote healthy root growth across Madison, Middleton, Waunakee, Sun Prairie, and all Dane County."
        serviceType="Lawn Aeration"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Monona', 'Fitchburg', 'Verona', 'McFarland', 'DeForest', 'Cottage Grove', 'Oregon', 'Stoughton']}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides professional core aeration services in Madison, Middleton, Waunakee, and Dane County, Wisconsin. Aeration reduces soil compaction and improves root growth, best done in fall. We service residential and commercial properties. Call (608) 535-6057 for a free quote.</p>
      </section>

      {/* Hero */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-20 md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional lawn aeration service showing core aerator machine creating plugs on lush green lawn"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <TreeDeciduous className="h-4 w-4" />
              Best in Fall & Spring
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Core Aeration in <span className="text-accent">Madison & Dane County</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
              Wisconsin's clay-heavy soil compacts under foot traffic and mower wheels. Core aeration breaks through that barrier, letting roots breathe and grow deep for a thicker, healthier lawn.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" variant="accent" className="text-base md:text-lg font-bold" asChild>
                <Link href="/contact?service=aeration">Get My Free Quote →</Link>
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
              <strong>Ideal for:</strong> Homeowners with compacted soil, high-traffic lawns, heavy clay, or thin grass that won't thicken despite fertilizing. Essential for established lawns that haven't been aerated in 2+ years.
            </p>
          </div>
        </div>
      </section>

      <ResidentialProblemSection
        serviceName="Aeration"
        problemPoints={[
          "Compacted soil from foot traffic, mowers, and Wisconsin's clay-heavy ground",
          "Water runs off instead of soaking in, leaving grass thirsty and stressed",
          "Shallow root systems that can't access nutrients deep in the soil",
          "Thatch buildup creating a barrier between your lawn and what it needs",
          "Thin, weak grass that struggles to compete with weeds and disease"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Aeration"
        solutionPoints={[
          "Core aeration pulls thousands of soil plugs, breaking up compaction instantly",
          "Improved water infiltration delivers moisture directly to root zones",
          "Enhanced oxygen and nutrient flow to roots for stronger, deeper growth",
          "Natural thatch breakdown as cores decompose and break up the layer",
          "Perfect prep for overseeding—seeds fall into holes for ideal germination"
        ]}
      />

      {/* What's Included */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            What's Included in Our Aeration Service
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Complete professional service from start to finish—no hidden steps or extra charges.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Core Aeration", desc: "Professional aerator pulls 2-3\" soil cores across your entire lawn" },
              { title: "Multiple Passes", desc: "2-3 overlapping passes for thorough coverage and maximum benefit" },
              { title: "Obstacle Navigation", desc: "Careful work around sprinkler heads, trees, landscape beds, and utilities" },
              { title: "Irrigation Protection", desc: "Flag and avoid sprinkler heads (if you mark them or we identify them)" },
              { title: "Cores Left in Place", desc: "Plugs decompose naturally within 2-3 weeks and feed your lawn" },
              { title: "Aftercare Guidance", desc: "Watering and care instructions for best results over the following weeks" }
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

      {/* How It Works - Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            How Core Aeration Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Mark Obstacles</h3>
              <p className="text-sm text-muted-foreground">
                We identify sprinkler heads, utilities, and obstacles to avoid
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Pull Cores</h3>
              <p className="text-sm text-muted-foreground">
                Machine removes 2-3" plugs every few inches across the lawn
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Cores Decompose</h3>
              <p className="text-sm text-muted-foreground">
                Plugs break down in 2-3 weeks, adding nutrients back to soil
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Lawn Thrives</h3>
              <p className="text-sm text-muted-foreground">
                Roots grow deeper, grass thickens, and your lawn transforms
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* When to Aerate */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            When to Aerate Your Lawn in Wisconsin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border-2 border-primary rounded-lg p-8 shadow-md relative bg-background">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Best Time
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <TreeDeciduous className="h-6 w-6 text-primary" />
                Fall Aeration
              </h3>
              <p className="text-muted-foreground mb-6">
                <strong>September through mid-October</strong> is the ideal window in Wisconsin. Cool temperatures and
                fall rains help grass recover quickly and fill in before winter dormancy.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Perfect for overseeding—seeds germinate in ideal conditions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Cool-season grass recovery is fastest in fall</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Less weed competition than spring aeration</span>
                </li>
              </ul>
            </div>

            <div className="border border-border rounded-lg p-8 bg-background">
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Sprout className="h-6 w-6 text-primary" />
                Spring Aeration
              </h3>
              <p className="text-muted-foreground mb-6">
                <strong>Late April through May</strong> works if fall wasn't possible. Spring aeration helps
                lawns recover from winter compaction and prepares for summer stress.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Wait until ground fully thaws and dries</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Complete before summer heat arrives</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Pairs well with spring fertilization</span>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
            <strong>How often?</strong> Most Dane County lawns benefit from annual aeration. High-traffic areas or clay-heavy soils may need it twice yearly.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            The Benefits of Core Aeration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Wind className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Deeper Root Growth</h3>
              <p className="text-muted-foreground">
                Loosened soil lets roots grow 4-6 inches deeper, building a stronger lawn that resists drought, heat, and foot traffic stress.
              </p>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Droplets className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Better Water Uptake</h3>
              <p className="text-muted-foreground">
                Water penetrates instead of running off, reducing waste and delivering moisture directly where roots need it most.
              </p>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sprout className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Thicker, Healthier Turf</h3>
              <p className="text-muted-foreground">
                Enhanced nutrient absorption and improved growing conditions mean denser grass that naturally crowds out weeds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Why Choose TotalGuard for Aeration
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Commercial equipment and local expertise make the difference:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Optimal Timing</h3>
              <p className="text-muted-foreground">
                We schedule based on Wisconsin's specific climate—not a generic calendar. Your lawn gets aerated when conditions are perfect.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Commercial Equipment</h3>
              <p className="text-muted-foreground">
                Professional-grade aerators pull deeper cores than rental machines, delivering better results in less time.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border text-center">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Reliable Scheduling</h3>
              <p className="text-muted-foreground">
                Fall aeration slots fill fast. Book early and we'll schedule you at the optimal time for your property.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Madison-Area Aeration Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Aeration is priced based on lawn size. Most Madison residential lawns (5,000-10,000 sq ft)
            range from <strong>$125-$225</strong> for professional core aeration. Add overseeding for $75-$150 more.
            We'll measure and provide exact pricing before any work begins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact?service=aeration">Get Aeration Quote</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact?service=aeration-overseeding">Aeration + Overseeding Bundle</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
            Pair Aeration With These Services
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Maximize your aeration investment with complementary services:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/services/fertilization"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Fertilization</h3>
              <p className="text-sm text-muted-foreground">Nutrients reach roots faster after aeration</p>
            </Link>
            <Link
              href="/services/fall-cleanup"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Fall Cleanup</h3>
              <p className="text-sm text-muted-foreground">Complete fall lawn prep for winter survival</p>
            </Link>
            <Link
              href="/services/mowing"
              className="p-6 border border-border rounded-lg hover:shadow-md hover:border-primary/30 transition-all bg-background text-center group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Weekly Mowing</h3>
              <p className="text-sm text-muted-foreground">Consistent care builds on aeration benefits</p>
            </Link>
          </div>
        </div>
      </section>

      <ResidentialHomeownerTypesSection serviceName="aeration" />
      <ResidentialExpectationsSection serviceName="aeration" />

      <ServiceFAQ faqs={aerationFAQs} />

      <CTASection />
      <Footer />
    </div>
  );
}
