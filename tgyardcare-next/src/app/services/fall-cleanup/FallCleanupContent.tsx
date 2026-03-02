'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { ServiceSchema } from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, CloudRain, Phone, Users, Calendar, Shield, Clock, Leaf } from "lucide-react";
import heroImage from "@/assets/service-fall-cleanup.jpg";
import ServiceFAQ from "@/components/ServiceFAQ";
import { fallCleanupFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { AmbientParticles } from "@/components/AmbientParticles";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function FallCleanupContent() {
  const beforeAfterItems: { combinedImage: string }[] = [];

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Fall Cleanup', url: 'https://tgyardcare.com/services/fall-cleanup' }
      ]} />
      <ServiceSchema
        serviceName="Fall Cleanup Services in Madison & Dane County"
        description="Professional fall cleanup and winter preparation for Madison, Middleton, Waunakee, Sun Prairie, and surrounding Dane County properties. Protect your lawn from Wisconsin's harsh winters."
        serviceType="Fall Cleanup"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Monona', 'Fitchburg', 'Verona', 'McFarland', 'DeForest', 'Cottage Grove', 'Oregon', 'Stoughton']}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides professional fall cleanup services in Madison, Middleton, Waunakee, and Dane County, Wisconsin. We clear leaves, clean gutters, and winterize your lawn before first frost. Protect your property from Wisconsin winter damage. Call (608) 535-6057.</p>
      </section>

      {/* Hero */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-20 md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional fall cleanup service showing autumn yard maintenance with worker raking colorful leaves in golden sunlight"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/50 to-[#0a1f14]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
        </div>
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Fall Cleanup in <span className="text-accent">Madison & Dane County</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
              Wisconsin winters are brutal—but your lawn doesn't have to suffer. Complete fall cleanup across Madison, Middleton, Waunakee, and Sun Prairie to protect your property before the first freeze.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" variant="accent" className="text-base md:text-lg font-bold" asChild>
                <Link href="/contact?service=fall-cleanup">Get My Free Quote →</Link>
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Who Fall Cleanup Is For</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              This service is designed for Dane County homeowners who want to protect their investment and avoid expensive spring repairs.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Busy Professionals</h3>
                  <p className="text-sm text-muted-foreground">No time to spend weekends raking before Wisconsin's first snow</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                <Leaf className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Oak-Heavy Properties</h3>
                  <p className="text-sm text-muted-foreground">Properties in Nakoma, Maple Bluff, and Shorewood Hills with mature trees</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Homeowners Who Protect Investments</h3>
                  <p className="text-sm text-muted-foreground">Those who understand proper fall prep saves money on spring repairs</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Seniors & Physical Limitations</h3>
                  <p className="text-sm text-muted-foreground">Anyone who shouldn't be hauling heavy, wet leaves in cold weather</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ResidentialProblemSection
        serviceName="Fall Cleanup"
        problemPoints={[
          "Fall leaves and debris smothering your lawn and creating disease conditions",
          "Neglected cleanup leading to dead grass and damaged plants over winter",
          "Much harder spring cleanup job if fall is skipped",
          "Wisconsin's harsh winters causing preventable landscape damage",
          "Pests and disease overwintering in leaf piles and debris"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Fall Cleanup"
        solutionPoints={[
          "Complete removal of all leaves and debris from your entire property",
          "Perennial cutback and protection for sensitive plants",
          "Gutter cleaning included to prevent ice dams",
          "Final mowing at optimal winter height for lawn health",
          "Emerge from winter ready to grow, not repair expensive damage"
        ]}
      />

      {/* What's Included */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            What's Included in Fall Cleanup
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Complete Leaf Removal</h3>
                <p className="text-sm text-muted-foreground">
                  Multiple visits if needed to clear all fallen leaves from lawn, beds, and hardscapes
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Perennial Cutback</h3>
                <p className="text-sm text-muted-foreground">Trim dead growth from flower beds and borders to prevent disease</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Gutter Cleaning</h3>
                <p className="text-sm text-muted-foreground">Remove leaves and debris to prevent ice dams and water damage</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Final Mowing</h3>
                <p className="text-sm text-muted-foreground">Last cut at optimal winter height (2.5-3 inches) for lawn health</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Bed Mulching</h3>
                <p className="text-sm text-muted-foreground">Top-dress beds for winter insulation (optional add-on)</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Debris Haul-Away</h3>
                <p className="text-sm text-muted-foreground">All leaves and waste removed from property—nothing left behind</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How Fall Cleanup Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-semibold mb-2">Schedule Early</h3>
                <p className="text-sm text-muted-foreground">Book in September-October before the rush. We'll confirm your spot on our fall rotation.</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-semibold mb-2">First Visit</h3>
                <p className="text-sm text-muted-foreground">We clear early-falling leaves, clean gutters, and prep beds—typically late October.</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-semibold mb-2">Final Visit</h3>
                <p className="text-sm text-muted-foreground">After peak leaf drop (usually November), we do final cleanup, last mow, and haul everything away.</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                <h3 className="font-semibold mb-2">Winter Ready</h3>
                <p className="text-sm text-muted-foreground">Your property is protected and clean before the first snow blankets Dane County.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BeforeAfterGallery items={beforeAfterItems} />

      {/* Why It Matters - Wisconsin Context */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Why Fall Cleanup Matters in Wisconsin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-background rounded-lg border border-border">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CloudRain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Prevent Snow Mold</h3>
              <p className="text-muted-foreground">
                Dane County's heavy snowfall traps moisture under matted leaves. This creates perfect conditions for snow mold—a fungus that kills grass crowns and leaves brown patches all spring.
              </p>
            </div>
            <div className="text-center p-6 bg-background rounded-lg border border-border">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CloudRain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Stop Ice Dam Damage</h3>
              <p className="text-muted-foreground">
                Clogged gutters in Wisconsin winters create ice dams that tear gutters off homes and cause basement flooding. Fall cleanup includes gutter clearing before freezing temperatures arrive.
              </p>
            </div>
            <div className="text-center p-6 bg-background rounded-lg border border-border">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CloudRain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Faster Spring Green-Up</h3>
              <p className="text-muted-foreground">
                Properties that skip fall cleanup spend April recovering instead of growing. Clean lawns green up 2-3 weeks faster once Madison's spring warmth arrives.
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
                  <li>• <strong>Book:</strong> September-October for best availability</li>
                  <li>• <strong>First visit:</strong> Late October after initial leaf drop</li>
                  <li>• <strong>Final visit:</strong> Mid-November before first major snow</li>
                  <li>• <strong>Window:</strong> About 4-6 weeks from first to final cleanup</li>
                </ul>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg">
                <Clock className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Frequency</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Standard:</strong> 1-2 visits for most properties</li>
                  <li>• <strong>Oak-heavy:</strong> 2-3 visits as oaks drop late into November</li>
                  <li>• <strong>Gutter cleaning:</strong> Included with first or final visit</li>
                  <li>• <strong>Annual service:</strong> Every fall for optimal lawn health</li>
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
            <h2 className="text-3xl font-bold text-foreground mb-6">Madison-Area Fall Cleanup Pricing</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Most Madison, Middleton, Waunakee, and Sun Prairie homes range from <strong>$250-$600</strong> for complete fall cleanup. Oak-heavy properties in neighborhoods like Nakoma and Maple Bluff may need multiple visits as leaves drop through November.
            </p>
            <div className="bg-background border border-border rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4">What Affects Price:</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div>
                  <strong className="text-foreground">Property Size</strong>
                  <p>Larger lots = more ground to cover</p>
                </div>
                <div>
                  <strong className="text-foreground">Tree Coverage</strong>
                  <p>Heavy oak/maple canopy increases volume</p>
                </div>
                <div>
                  <strong className="text-foreground">Visit Frequency</strong>
                  <p>1 vs 2-3 visits during season</p>
                </div>
              </div>
            </div>
            <Button size="lg" asChild>
              <Link href="/contact?service=fall-cleanup">Get My Free Estimate</Link>
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
                <h3 className="font-semibold text-lg mb-3">We Actually Show Up</h3>
                <p className="text-muted-foreground">Many fall cleanup companies overbook and leave customers waiting until December. We schedule conservatively and communicate proactively if weather causes delays.</p>
              </div>
              <div className="border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Complete Property Coverage</h3>
                <p className="text-muted-foreground">We don't just blow leaves to the curb. Every leaf, every bed, every gutter—we leave your property truly winter-ready, not just "good enough."</p>
              </div>
              <div className="border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Haul-Away Included</h3>
                <p className="text-muted-foreground">All debris is removed from your property. No leaf mountains at the curb waiting for city pickup that may not come before snow.</p>
              </div>
              <div className="border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Multi-Visit Option</h3>
                <p className="text-muted-foreground">For oak-heavy properties, we return for a second cleanup after late leaf drop—so you're not stuck with a layer of leaves under the first snow.</p>
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
              Many Madison homeowners combine fall cleanup with these related services for complete winter preparation:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/services/gutter-cleaning">Gutter Cleaning</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/services/aeration">Fall Aeration</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/services/fertilization">Winterizer Fertilizer</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/services/snow-removal">Snow Removal</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ResidentialHomeownerTypesSection serviceName="fall cleanup" />
      <ResidentialExpectationsSection serviceName="fall cleanup" />

      <ServiceFAQ faqs={fallCleanupFAQs} />

      <CTASection />
      <Footer />
    </div>
  );
}
