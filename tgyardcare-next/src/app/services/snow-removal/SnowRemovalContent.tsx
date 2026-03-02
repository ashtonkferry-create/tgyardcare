'use client';

import Link from "next/link";
import { Phone, CheckCircle2, Snowflake, Users, Calendar, Shield, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ServiceSchema } from "@/components/ServiceSchema";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import CTASection from "@/components/CTASection";
import { WinterPriorityServices } from "@/components/WinterPriorityServices";

import heroImage from "@/assets/hero-snow-plow.png";
import combinedImage from "@/assets/before-after/snow-removal-combined.webp";
import ServiceFAQ from "@/components/ServiceFAQ";
import { snowRemovalFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function SnowRemovalContent() {
  const beforeAfterItems = [
    {
      combinedImage: imgSrc(combinedImage),
      title: "Complete Snow Removal",
      description: "Professional clearing of driveways and walkways with thorough ice management for safe winter access."
    }
  ];

  const services = [
    "Driveway Snow Clearing",
    "Walkway & Sidewalk Clearing",
    "Ice Management & Salting",
    "Emergency Storm Response",
    "Residential & Commercial Properties",
    "24/7 Availability During Storms"
  ];

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Snow Removal', url: 'https://tgyardcare.com/services/snow-removal' }
      ]} />
      <ServiceSchema
        serviceName="Snow Removal Services in Madison & Dane County"
        description="Professional snow and ice removal for residential and commercial properties across Madison, Middleton, Waunakee, Sun Prairie, Fitchburg, and Verona. Fast response during Wisconsin winter storms."
        serviceType="Snow Removal"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Monona', 'Fitchburg', 'Verona', 'McFarland', 'DeForest', 'Cottage Grove', 'Oregon', 'Stoughton']}
      />

      <div className="min-h-screen bg-background">
        <Navigation />

        {/* TL;DR for AI/Answer Engines */}
        <section className="sr-only" aria-label="Service Summary">
          <p>TotalGuard Yard Care provides snow removal in Madison and Dane County, Wisconsin. We deploy at 2 inches snowfall with driveways cleared by 7am and salt included. Call (608) 535-6057.</p>
        </section>

        {/* Hero Section */}
        <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden py-20 md:py-28">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
            role="img"
            aria-label="Professional snow removal service showing snow plow truck clearing driveway of Wisconsin residential home in winter"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <Snowflake className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4 md:mb-6 text-primary" />
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Snow Removal in Madison & Dane County
            </h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto">
              Wisconsin winters don't wait—and neither do we. Fast snow plowing and ice management for homes across Madison, Middleton, Waunakee, Sun Prairie, and surrounding communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button asChild size="lg" className="text-base md:text-lg font-bold">
                <Link href="/contact?service=snow-removal">Get My Free Quote →</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base md:text-lg bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white hover:text-primary">
                <a href="tel:608-535-6057">
                  <Phone className="mr-2 h-5 w-5" />
                  (608) 535-6057
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Who Snow Removal Is For</h2>
              <p className="text-lg text-muted-foreground text-center mb-12">
                This service is designed for Dane County residents who need reliable winter property access without the physical strain or unreliable contractors.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                  <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Working Professionals</h3>
                    <p className="text-sm text-muted-foreground">Need to get to work on time regardless of overnight snowfall</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                  <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Seniors & Those With Mobility Concerns</h3>
                    <p className="text-sm text-muted-foreground">Anyone who shouldn't be shoveling heavy Wisconsin snow</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                  <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Properties With Long Driveways</h3>
                    <p className="text-sm text-muted-foreground">Too much driveway to clear with a snowblower in reasonable time</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                  <AlertTriangle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Landlords & Property Managers</h3>
                    <p className="text-sm text-muted-foreground">Need reliable service for rental properties and liability protection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ResidentialProblemSection
          serviceName="Snow Removal"
          problemPoints={[
            "Heavy snowfall making driveways and walkways impassable",
            "Safety hazards preventing you from getting to work or running errands",
            "Exhausting, time-consuming shoveling that can lead to injuries",
            "Icy surfaces creating slip-and-fall risks for your family and visitors",
            "Equipment breakdowns and back pain from DIY snow removal"
          ]}
        />
        <ResidentialSolutionSection
          serviceName="Snow Removal"
          solutionPoints={[
            "Fast, professional snow removal that clears your entire property quickly",
            "Commercial equipment for thorough clearing and ice management",
            "Prompt response during storms to keep you accessible and safe",
            "Complete ice treatment with de-icing materials for walkways and driveways",
            "Flexible options from per-storm pricing to seasonal contracts"
          ]}
        />

        {/* What's Included Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                What's Included in Snow Removal
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <span className="text-lg">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How Snow Removal Works</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                  <h3 className="font-semibold mb-2">Sign Up</h3>
                  <p className="text-sm text-muted-foreground">Choose per-storm or seasonal contract. We add you to our route before winter begins.</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                  <h3 className="font-semibold mb-2">Storm Watch</h3>
                  <p className="text-sm text-muted-foreground">We monitor Dane County forecasts closely and mobilize crews before storms hit.</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                  <h3 className="font-semibold mb-2">Clear & Treat</h3>
                  <p className="text-sm text-muted-foreground">We clear your driveway and walkways, then apply de-icing treatment for safe footing.</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                  <h3 className="font-semibold mb-2">Done Before Work</h3>
                  <p className="text-sm text-muted-foreground">You wake up to a clear driveway—ready to start your day without shoveling.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why Choose TotalGuard for Snow Removal
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-background p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-bold mb-3">Fast Response Times</h3>
                  <p className="text-muted-foreground leading-relaxed">Quick mobilization during and after storms to keep your property accessible and safe. We monitor forecasts and begin clearing before you wake up.</p>
                </div>
                <div className="bg-background p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-bold mb-3">Professional Equipment</h3>
                  <p className="text-muted-foreground leading-relaxed">Commercial-grade plows and de-icing materials for thorough, efficient clearing. We don't rely on residential-grade equipment that breaks down.</p>
                </div>
                <div className="bg-background p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-bold mb-3">Safety First</h3>
                  <p className="text-muted-foreground leading-relaxed">Prevent slips, falls, and accidents with prompt snow and ice removal from all walkways. Reduce liability risk for your property.</p>
                </div>
                <div className="bg-background p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-bold mb-3">Flexible Options</h3>
                  <p className="text-muted-foreground leading-relaxed">Per-storm pricing or seasonal contracts available. Choose what works for your budget and winter needs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Before/After Gallery */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <BeforeAfterGallery items={beforeAfterItems} />
          </div>
        </section>

        {/* Snow Removal Bundles */}
        <WinterPriorityServices />

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
                    <li>• <strong>Season:</strong> November through March (or April in heavy years)</li>
                    <li>• <strong>Trigger:</strong> Service begins at 2+ inches of accumulation</li>
                    <li>• <strong>Timing:</strong> Cleared before you need to leave for work</li>
                    <li>• <strong>Multi-day storms:</strong> Multiple passes as needed</li>
                  </ul>
                </div>
                <div className="bg-muted/30 p-6 rounded-lg">
                  <Clock className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Frequency</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>Average season:</strong> 40+ inches of snow in Dane County</li>
                    <li>• <strong>Per-storm:</strong> Pay only when we plow</li>
                    <li>• <strong>Seasonal contract:</strong> Fixed price for entire winter</li>
                    <li>• <strong>Ice-only:</strong> De-icing service available separately</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Explanation */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Madison-Area Snow Removal Pricing
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Dane County averages 40+ inches of snow annually—so we offer both per-storm pricing and seasonal contracts that make sense for Wisconsin winters. Pricing depends on driveway length, property size, and service frequency.
              </p>
              <div className="bg-background border border-border rounded-lg p-6 mb-8">
                <h3 className="font-semibold mb-4">Pricing Options:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <strong className="text-foreground">Per-Storm</strong>
                    <p>Pay only when we plow. Good for light winters or budget flexibility.</p>
                  </div>
                  <div>
                    <strong className="text-foreground">Seasonal Contract</strong>
                    <p>Fixed price for entire season. Best value for typical Dane County winters.</p>
                  </div>
                </div>
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                <p className="text-lg font-semibold mb-2">Wisconsin Winter Season</p>
                <p className="text-muted-foreground">
                  Snow removal available November through March. We monitor Dane County forecasts closely and mobilize before storms hit—so you wake up to cleared driveways, not snow piles.
                </p>
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
                  <h3 className="font-semibold text-lg mb-3">We Actually Show Up</h3>
                  <p className="text-muted-foreground">Many snow removal companies overbook and leave customers waiting until noon. We schedule conservatively and prioritize reliability over revenue.</p>
                </div>
                <div className="border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-3">Proactive Communication</h3>
                  <p className="text-muted-foreground">You'll know our plan before the storm hits. No wondering if we forgot you—we communicate proactively about timing and any delays.</p>
                </div>
                <div className="border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-3">Complete Ice Treatment</h3>
                  <p className="text-muted-foreground">We don't just plow and leave. De-icing treatment is included to prevent dangerous ice buildup on walkways and driveways.</p>
                </div>
                <div className="border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-3">Year-Round Relationship</h3>
                  <p className="text-muted-foreground">We're not a winter-only company. We handle your lawn all summer too—so we know your property and you know our reliability.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-6">Year-Round Property Care</h2>
              <p className="text-muted-foreground mb-8">
                Snow removal clients get priority scheduling for our summer services. Keep your property maintained all year:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" asChild>
                  <Link href="/services/mowing">Lawn Mowing</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/services/fall-cleanup">Fall Cleanup</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/services/gutter-cleaning">Gutter Cleaning</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/residential">All Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <ResidentialHomeownerTypesSection serviceName="snow removal" />
        <ResidentialExpectationsSection serviceName="snow removal" />

        <ServiceFAQ faqs={snowRemovalFAQs} />

        <CTASection />
        <Footer />
      </div>
    </>
  );
}
