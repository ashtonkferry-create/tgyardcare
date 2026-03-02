'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Clock, CheckCircle2, Shield, Users, ArrowRight } from "lucide-react";
import { PromoBanner } from "@/components/PromoBanner";

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Navigation />

      <section className="sr-only">
        <h2>About TG Yard Care</h2>
        <p>TG Yard Care (TotalGuard Yard Care) is a locally owned lawn care and landscaping company serving Madison, Wisconsin and surrounding Dane County communities since 2019. We provide professional mowing, mulching, gutter cleaning, seasonal cleanups, fertilization, and snow removal with a 4.9-star Google rating and 100% satisfaction guarantee. Our same-crew-every-visit approach ensures consistent, reliable service for 500+ residential and commercial properties.</p>
      </section>

      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider px-6 py-2 rounded-full mb-6">
            Madison's Reliability-First Lawn Care Company
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Built for Dane County Homeowners
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            TotalGuard exists because most lawn care companies operate without systems—and Madison homeowners pay the price. We built a different kind of operation for Dane County.
          </p>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Why TotalGuard Exists
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-5">
              <p className="text-lg leading-relaxed">
                Before starting TotalGuard, we worked with and observed dozens of lawn care operations across Wisconsin. The pattern was consistent: crews running behind schedule, owners unreachable by phone, quotes taking weeks, and customers left wondering if their service would actually show up.
              </p>
              <p className="text-lg leading-relaxed">
                These aren&apos;t bad companies—they&apos;re companies without systems. When demand increases, service quality decreases. When the owner gets busy, communication stops. When a crew member changes, consistency disappears.
              </p>
              <p className="text-lg leading-relaxed">
                TotalGuard was built to solve this. We designed an operation where reliability is structural, not dependent on any single person having a good day. Our systems ensure that whether you&apos;re our first customer or our hundredth, you receive the same level of responsiveness, consistency, and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The TotalGuard Standard */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                The TotalGuard Standard
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our operating philosophy isn&apos;t a marketing phrase—it&apos;s a documented set of commitments that govern every interaction with every client.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="flex flex-col p-6 md:p-8 bg-background rounded-xl border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Response Time Commitment</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Quote requests are answered within 24 hours. Phone calls and texts are returned the same business day. If you reach out, you hear back—no exceptions, no excuses.
                </p>
              </div>

              <div className="flex flex-col p-6 md:p-8 bg-background rounded-xl border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Crew Consistency</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  The same crew handles your property visit after visit. They know your preferences, your property&apos;s layout, and what &quot;done right&quot; looks like for your specific situation.
                </p>
              </div>

              <div className="flex flex-col p-6 md:p-8 bg-background rounded-xl border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Quality Control Protocol</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Every job is walked before the crew leaves. We verify edges are clean, beds are clear, and nothing was missed. The standard isn&apos;t &quot;good enough&quot;—it&apos;s &quot;would we be proud to show this to anyone.&quot;
                </p>
              </div>

              <div className="flex flex-col p-6 md:p-8 bg-background rounded-xl border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Make-It-Right Policy</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  If something is missed or doesn&apos;t meet expectations, send us a photo. We return within 48 hours to correct it—no charge, no friction, no defensiveness. Accountability is built into the system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Operate */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              How We Operate Across Dane County
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-5">
              <p className="text-lg leading-relaxed">
                TotalGuard is owner-operated. Alex and Vance are directly involved in quoting, scheduling, and quality oversight—not managing from a distance. When you call, you&apos;re talking to someone who knows your Madison, Middleton, or Waunakee property and has the authority to make decisions.
              </p>
              <p className="text-lg leading-relaxed">
                We maintain a focused service area: Madison and the surrounding Dane County communities including Middleton, Waunakee, Sun Prairie, Monona, Fitchburg, Verona, McFarland, DeForest, Cottage Grove, Oregon, and Stoughton. This isn&apos;t a limitation—it&apos;s intentional. A tighter geographic footprint means faster response times, more predictable scheduling, and crews that know the neighborhoods they serve.
              </p>
              <p className="text-lg leading-relaxed">
                Our pricing is transparent and provided upfront. You&apos;ll know exactly what a service costs before we begin, and the invoice will match the quote. No surprises, no add-ons, no &quot;we found something else while we were there&quot; conversations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Who We Serve
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-5">
              <p className="text-lg leading-relaxed">
                Our residential clients are homeowners who value their time and want their property maintained to a consistent standard without having to manage the process. They&apos;ve often been burned by providers who started strong and faded—and they&apos;re looking for a company that operates differently.
              </p>
              <p className="text-lg leading-relaxed">
                Our commercial clients include property managers, HOAs, and business owners who need reliable, documented service across multiple properties. They value clear communication, predictable scheduling, and the ability to reach someone when issues arise.
              </p>
              <p className="text-lg leading-relaxed">
                In both cases, the relationship works because expectations are set clearly and met consistently. We don&apos;t overpromise. We don&apos;t underdeliver. We show up, do the work correctly, and communicate proactively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Long-Term Partnership */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              A Long-Term Approach to Property Care
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-5">
              <p className="text-lg leading-relaxed">
                We&apos;re not interested in one-time transactions. TotalGuard is built for ongoing relationships where we understand your property&apos;s needs across seasons and years—not just what it looks like today, but how it should develop over time.
              </p>
              <p className="text-lg leading-relaxed">
                This means we&apos;ll tell you when your lawn needs aeration, when your gutters should be cleaned before the fall rush, or when a garden bed would benefit from fresh mulch. Not because we&apos;re upselling, but because proactive maintenance costs less and delivers better results than reactive fixes.
              </p>
              <p className="text-lg leading-relaxed">
                When you work with TotalGuard, you&apos;re not hiring a vendor—you&apos;re establishing a property care partner who operates with the same standards whether you&apos;re watching or not.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="See How We Operate"
        description="Request a quote and experience the difference that systems and accountability make. Same-day response, transparent pricing, no obligations."
      />
      <Footer />
    </div>
  );
}
