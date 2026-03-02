'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { ServiceSchema } from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Sparkles, Phone, Users, Calendar, Shield, Clock, Sprout } from "lucide-react";
import heroImage from "@/assets/service-spring-cleanup.jpg";
import ServiceFAQ from "@/components/ServiceFAQ";
import { springCleanupFAQs } from "@/data/serviceFAQs";
import { ResidentialProblemSection, ResidentialSolutionSection, ResidentialHomeownerTypesSection, ResidentialExpectationsSection } from "@/components/ResidentialSections";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { AmbientParticles } from "@/components/AmbientParticles";

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function SpringCleanupContent() {
  const beforeAfterItems: { combinedImage: string }[] = [];

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://tgyardcare.com' },
        { name: 'Services', url: 'https://tgyardcare.com/services' },
        { name: 'Spring Cleanup', url: 'https://tgyardcare.com/services/spring-cleanup' }
      ]} />
      <ServiceSchema
        serviceName="Spring Cleanup Services in Madison & Dane County"
        description="Comprehensive spring cleanup to prepare your yard for Wisconsin's growing season. Serving Madison, Middleton, Waunakee, Sun Prairie, and all Dane County communities."
        serviceType="Spring Cleanup"
        areaServed={['Madison', 'Middleton', 'Waunakee', 'Sun Prairie', 'Monona', 'Fitchburg', 'Verona', 'McFarland', 'DeForest', 'Cottage Grove', 'Oregon', 'Stoughton']}
      />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Service Summary">
        <p>TotalGuard Yard Care provides professional spring cleanup services in Madison, Middleton, Waunakee, and Dane County, Wisconsin. We remove winter debris, prep garden beds, and perform first mow of the season in one 2-4 hour visit. Call (608) 535-6057 for a free quote.</p>
      </section>

      {/* Hero */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center py-20 md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label="Professional spring cleanup service showing yard maintenance with raking debris and preparing garden beds for growing season"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/90 via-[#0a1f14]/50 to-[#0a1f14]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,31,20,0.4)_100%)]" />
        </div>
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
              Spring Cleanup in <span className="text-accent">Madison & Dane County</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
              Wisconsin winters leave behind a mess—but you don't have to deal with it. Complete spring cleanup across Madison, Middleton, Waunakee, and Sun Prairie to jumpstart your growing season.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" variant="accent" className="text-base md:text-lg font-bold" asChild>
                <Link href="/contact?service=spring-cleanup">Get My Free Quote →</Link>
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Who Spring Cleanup Is For</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              This service is designed for Dane County homeowners who want to maximize their short Wisconsin growing season.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Busy Professionals</h3>
                  <p className="text-sm text-muted-foreground">No time for weekend yard work when the snow finally melts</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                <Sprout className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Lawn Enthusiasts</h3>
                  <p className="text-sm text-muted-foreground">Those who want the best possible start to the growing season</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Homeowners Who Skipped Fall Cleanup</h3>
                  <p className="text-sm text-muted-foreground">Need to catch up before the damage becomes permanent</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Those Preparing to Sell</h3>
                  <p className="text-sm text-muted-foreground">First impressions matter—curb appeal starts with a clean yard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ResidentialProblemSection
        serviceName="Spring Cleanup"
        problemPoints={[
          "Dead leaves, fallen branches, and thatch buildup littering your yard after winter",
          "Matted grass that delays lawn greening and looks abandoned",
          "Weeds establishing early while your lawn struggles to recover",
          "Neglected spring prep wasting the valuable early growing period",
          "Plants struggling all season long without proper preparation"
        ]}
      />
      <ResidentialSolutionSection
        serviceName="Spring Cleanup"
        solutionPoints={[
          "Complete removal of all winter debris from your entire property",
          "Lawn dethatching to promote air circulation and healthy growth",
          "Pruning of dead growth and refreshing of garden bed mulch",
          "Redefining bed edges and borders for a clean, organized look",
          "Results within weeks as your yard springs to life beautifully"
        ]}
      />

      {/* What's Included */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            What's Included in Spring Cleanup
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Debris Removal</h3>
                <p className="text-sm text-muted-foreground">Clear all winter leaves, sticks, and branches from lawn, beds, and hardscapes</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Lawn Dethatching</h3>
                <p className="text-sm text-muted-foreground">Remove dead grass layer for better air, water, and nutrient penetration</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Bed Renovation</h3>
                <p className="text-sm text-muted-foreground">Cut back perennials and refresh mulch for a polished look</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Edging & Borders</h3>
                <p className="text-sm text-muted-foreground">Redefine bed edges and borders for clean, crisp lines</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Initial Mowing</h3>
                <p className="text-sm text-muted-foreground">First cut of season at proper height to encourage dense growth</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Complete Haul-Away</h3>
                <p className="text-sm text-muted-foreground">All debris bagged and removed—nothing left behind</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How Spring Cleanup Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-semibold mb-2">Book Early</h3>
                <p className="text-sm text-muted-foreground">Schedule in February-March before the spring rush. We'll lock in your spot on our rotation.</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-semibold mb-2">Weather Watch</h3>
                <p className="text-sm text-muted-foreground">We monitor conditions and schedule your cleanup once ground thaws and dries—typically mid-April in Dane County.</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-semibold mb-2">Deep Clean</h3>
                <p className="text-sm text-muted-foreground">We clear debris, dethatch, cut back perennials, edge beds, and complete first mow—all in one visit.</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                <h3 className="font-semibold mb-2">Ready to Grow</h3>
                <p className="text-sm text-muted-foreground">Your property is primed for Wisconsin's short but productive growing season.</p>
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
            Why Spring Cleanup Matters in Wisconsin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-background rounded-lg border border-border">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Beat the Weeds</h3>
              <p className="text-muted-foreground">
                Wisconsin weeds like crabgrass and dandelions germinate early. A March-April cleanup lets you apply pre-emergent treatment before weed seeds sprout—giving your lawn a head start.
              </p>
            </div>
            <div className="text-center p-6 bg-background rounded-lg border border-border">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Thaw Damage Recovery</h3>
              <p className="text-muted-foreground">
                Dane County's freeze-thaw cycles push debris into lawns and compact soil. Dethatching and debris removal helps your grass recover from 5 months of Wisconsin winter.
              </p>
            </div>
            <div className="text-center p-6 bg-background rounded-lg border border-border">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Maximize Short Summers</h3>
              <p className="text-muted-foreground">
                Madison's growing season is only about 150 days. Early spring cleanup means your lawn is actively growing by May—not still recovering while neighbors' lawns thrive.
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
                  <li>• <strong>Book:</strong> February-March for priority scheduling</li>
                  <li>• <strong>Service window:</strong> Mid-April through early May</li>
                  <li>• <strong>Ideal conditions:</strong> After ground thaws and dries</li>
                  <li>• <strong>Before:</strong> First mowing cycle of the season</li>
                </ul>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg">
                <Clock className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Frequency</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Standard:</strong> One comprehensive visit</li>
                  <li>• <strong>Heavy cleanup:</strong> May require two visits for neglected properties</li>
                  <li>• <strong>Annual service:</strong> Every spring for best lawn health</li>
                  <li>• <strong>Pairs with:</strong> First fertilizer application, pre-emergent</li>
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
            <h2 className="text-3xl font-bold text-foreground mb-6">Madison-Area Spring Cleanup Pricing</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Most Madison, Middleton, Waunakee, and Sun Prairie properties range from <strong>$200-$500</strong> for complete spring cleanup. Wisconsin's spring window is short—schedule early to ensure your property is ready when growing season hits.
            </p>
            <div className="bg-background border border-border rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4">What Affects Price:</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div>
                  <strong className="text-foreground">Property Size</strong>
                  <p>Larger lots require more time</p>
                </div>
                <div>
                  <strong className="text-foreground">Winter Damage</strong>
                  <p>Heavy debris = more labor</p>
                </div>
                <div>
                  <strong className="text-foreground">Add-Ons</strong>
                  <p>Mulch refresh, aeration, fertilization</p>
                </div>
              </div>
            </div>
            <Button size="lg" asChild>
              <Link href="/contact?service=spring-cleanup">Reserve Your Spring Cleanup</Link>
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
                <h3 className="font-semibold text-lg mb-3">We Beat the Rush</h3>
                <p className="text-muted-foreground">While other companies are still booking, we're already working. Early scheduling means your lawn starts recovering weeks ahead of neighbors.</p>
              </div>
              <div className="border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Complete Property Coverage</h3>
                <p className="text-muted-foreground">We don't just rake and leave. Beds, borders, hardscapes, lawn—everything gets attention. Your whole property looks refreshed.</p>
              </div>
              <div className="border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Weather-Smart Scheduling</h3>
                <p className="text-muted-foreground">We monitor soil conditions and schedule when the ground is dry enough to work without compaction damage. No rushed jobs on soggy lawns.</p>
              </div>
              <div className="border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Season-Long Relationship</h3>
                <p className="text-muted-foreground">Spring cleanup is just the start. We'll recommend what your lawn needs next—aeration, fertilization, or regular mowing—to keep momentum going.</p>
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
              Many Madison homeowners combine spring cleanup with these related services for maximum growing season impact:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/services/mulching">Mulch Refresh</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/services/aeration">Spring Aeration</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/services/fertilization">First Fertilizer</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/services/herbicide">Pre-Emergent</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ResidentialHomeownerTypesSection serviceName="spring cleanup" />
      <ResidentialExpectationsSection serviceName="spring cleanup" />

      <ServiceFAQ faqs={springCleanupFAQs} />

      <CTASection />
      <Footer />
    </div>
  );
}
