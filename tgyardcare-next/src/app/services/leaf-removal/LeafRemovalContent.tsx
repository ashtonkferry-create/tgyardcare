'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { ServiceSchema } from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Phone, Users, Calendar, Shield, Clock, Leaf, TreeDeciduous } from "lucide-react";
import heroImage from "@/assets/service-leaf-removal.jpg";
import leafImage1 from "@/assets/before-after/leaf-removal-combined-1.png";
import leafImage2 from "@/assets/before-after/leaf-removal-combined-2.png";
import ServiceFAQ from "@/components/ServiceFAQ";
import { leafRemovalFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { AmbientParticles } from "@/components/AmbientParticles";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function LeafRemovalContent() {
  const beforeAfterItems = [
    {
      combinedImage: leafImage1
    },
    {
      combinedImage: leafImage2
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Leaf Removal', url: 'https://tgyardcare.com/services/leaf-removal' }
      ]} />
      <ServiceSchema
        serviceName="Professional Leaf Removal in Madison & Dane County"
        description="Efficient fall leaf removal service across Madison, Middleton, Waunakee, Sun Prairie, and all Dane County communities. Keep your lawn healthy through Wisconsin winters."
        serviceType="Leaf Removal"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Monona', 'Fitchburg', 'Verona', 'McFarland', 'DeForest', 'Cottage Grove', 'Oregon', 'Stoughton']}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides professional leaf removal services in Madison, Middleton, Waunakee, and Dane County, Wisconsin. Full property leaf clearing with hauling included. Zero leaves left behind. Protect your lawn from smothering. Call (608) 535-6057 for a free estimate.</p>
      </section>

      {/* Hero */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-20 md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional leaf removal service showing leaf blower clearing colorful autumn leaves from residential lawn in Madison Wisconsin"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/50 to-[#0a1f14]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
        </div>
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Leaf Removal in <span className="text-accent">Madison & Dane County</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
              Wisconsin's oak and maple trees drop heavy leaf loads every fall. Keep your Madison, Middleton, Waunakee, or Sun Prairie property clear and your lawn protected with efficient removal and hauling.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" variant="accent" className="text-base md:text-lg font-bold" asChild>
                <Link href="/contact?service=leaf-removal">Get My Free Quote →</Link>
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Who Leaf Removal Is For</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              This service is designed for Dane County homeowners with heavy leaf loads who want to protect their lawn investment.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                <TreeDeciduous className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Properties With Mature Trees</h3>
                  <p className="text-sm text-muted-foreground">Oak, maple, and walnut trees that dump thousands of leaves every fall</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Busy Homeowners</h3>
                  <p className="text-sm text-muted-foreground">No time for endless weekend raking before Wisconsin's first snow</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Lawn Investors</h3>
                  <p className="text-sm text-muted-foreground">Those who understand leaving leaves = dead grass in spring</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Seniors & Physical Limitations</h3>
                  <p className="text-sm text-muted-foreground">Anyone who shouldn't be hauling heavy, wet leaves</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ResidentialProblemSection
        serviceName="Leaf Removal"
        problemPoints={[
          "Thick leaf layers suffocating grass and creating dead patches",
          "Breeding grounds for pests, mold, and fungal diseases under wet leaves",
          "Exhausting, time-consuming raking with mountains of bags to haul",
          "Wet, matted leaves becoming even harder to remove if you wait",
          "Unsightly leaf-covered property dragging down curb appeal"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Leaf Removal"
        solutionPoints={[
          "Professional equipment including powerful blowers and vacuums for fast clearing",
          "Complete property coverage—lawn, beds, patios, and driveways",
          "Bagging or mulching options depending on your preference",
          "All leaves hauled away leaving you with a clean property",
          "Lawn primed for healthy spring growth after thorough fall clearing"
        ]}
      />

      {/* What's Included */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            What's Included in Leaf Removal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Full Property Clearing</h3>
                <p className="text-sm text-muted-foreground">Remove leaves from lawn, beds, hardscapes, and gutters</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Professional Equipment</h3>
                <p className="text-sm text-muted-foreground">Commercial blowers and vacuums for efficient removal</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Mulching Option</h3>
                <p className="text-sm text-muted-foreground">Shred and mulch leaves back into lawn if desired</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Bagging & Removal</h3>
                <p className="text-sm text-muted-foreground">All leaves bagged and hauled to disposal site</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Repeat Service Available</h3>
                <p className="text-sm text-muted-foreground">Multiple visits during fall season as needed</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Gutter Check</h3>
                <p className="text-sm text-muted-foreground">Basic gutter clearing included with service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How Leaf Removal Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-semibold mb-2">Schedule</h3>
                <p className="text-sm text-muted-foreground">Book single visits or recurring fall service. We'll confirm timing based on leaf drop in your area.</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-semibold mb-2">Clear</h3>
                <p className="text-sm text-muted-foreground">Our crew arrives with commercial equipment—blowers, vacuums, and tarps for efficient clearing.</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-semibold mb-2">Haul</h3>
                <p className="text-sm text-muted-foreground">All leaves are removed from your property—no piles at the curb waiting for city pickup.</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                <h3 className="font-semibold mb-2">Repeat</h3>
                <p className="text-sm text-muted-foreground">For heavy leaf properties, we return as needed until trees are bare and your lawn is clear.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BeforeAfterGallery items={beforeAfterItems} />

      {/* Benefits - Wisconsin Context */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Why Remove Leaves Before Winter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-background rounded-lg border border-border">
              <Leaf className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Protect Your Lawn</h3>
              <p className="text-muted-foreground">
                Leaves left on grass block sunlight and trap moisture, causing fungal diseases like snow mold. This creates dead patches that take all spring to recover—if they recover at all.
              </p>
            </div>
            <div className="text-center p-6 bg-background rounded-lg border border-border">
              <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Save Your Back</h3>
              <p className="text-muted-foreground">
                Skip the hours of bending, raking, and bagging. We have the commercial equipment and crew to handle even the heaviest leaf fall in a fraction of the time.
              </p>
            </div>
            <div className="text-center p-6 bg-background rounded-lg border border-border">
              <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Pest Prevention</h3>
              <p className="text-muted-foreground">
                Leaf piles attract rodents, insects, and create breeding grounds for pests that can damage your lawn and home. Prompt removal keeps your property clean and pest-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* When & How Often */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">When & How Often</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-muted/30 p-6 rounded-lg">
                <Calendar className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Timing</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>&#8226; <strong>Peak season:</strong> Mid-October through late November</li>
                  <li>&#8226; <strong>First visit:</strong> After initial heavy leaf drop (usually late October)</li>
                  <li>&#8226; <strong>Final visit:</strong> After oaks finish dropping (mid-late November)</li>
                  <li>&#8226; <strong>Before:</strong> First snow covers the ground</li>
                </ul>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg">
                <Clock className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Frequency</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>&#8226; <strong>Light coverage:</strong> 1-2 visits typically sufficient</li>
                  <li>&#8226; <strong>Heavy oak/maple:</strong> 2-4 visits as trees drop continuously</li>
                  <li>&#8226; <strong>Neighbor's trees:</strong> May need extra visits if leaves blow in</li>
                  <li>&#8226; <strong>Wet conditions:</strong> More difficult—schedule before rain if possible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Madison-Area Leaf Removal Pricing</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Most Madison, Middleton, Waunakee, and Sun Prairie homes require 2-4 visits during fall season. Single visits typically range from <strong>$150-$400</strong> depending on property size and leaf volume.
            </p>
            <div className="bg-background border border-border rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4">What Affects Price:</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div>
                  <strong className="text-foreground">Property Size</strong>
                  <p>Larger lots = more ground to cover</p>
                </div>
                <div>
                  <strong className="text-foreground">Leaf Volume</strong>
                  <p>Heavy oak/maple vs. light coverage</p>
                </div>
                <div>
                  <strong className="text-foreground">Visit Frequency</strong>
                  <p>Single visit vs. recurring service</p>
                </div>
              </div>
            </div>
            <Button size="lg" asChild>
              <Link href="/contact?service=leaf-removal">Get a Free Quote</Link>
            </Button>
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
                <h3 className="font-semibold text-lg mb-3">We Haul Everything Away</h3>
                <p className="text-muted-foreground">No leaf mountains at the curb waiting for city pickup that may not come before snow. We remove all leaves from your property.</p>
              </div>
              <div className="border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Complete Property Coverage</h3>
                <p className="text-muted-foreground">We don't just blow leaves to one corner. Lawn, beds, driveways, patios, and gutters—we clear everything.</p>
              </div>
              <div className="border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Commercial Equipment</h3>
                <p className="text-muted-foreground">Professional backpack blowers and vacuums clear in hours what takes homeowners entire weekends with consumer equipment.</p>
              </div>
              <div className="border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Flexible Scheduling</h3>
                <p className="text-muted-foreground">We return as needed during fall season. Oak-heavy properties get extra visits automatically as trees continue dropping.</p>
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
              Many Madison homeowners combine leaf removal with these related fall services:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/services/fall-cleanup">Full Fall Cleanup</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/services/gutter-cleaning">Gutter Cleaning</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/services/aeration">Fall Aeration</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/services/fertilization">Winterizer Fertilizer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ResidentialHomeownerTypesSection serviceName="leaf removal" />
      <ResidentialExpectationsSection serviceName="leaf removal" />

      <ServiceFAQ faqs={leafRemovalFAQs} />

      <CTASection />
      <Footer />
    </div>
  );
}
