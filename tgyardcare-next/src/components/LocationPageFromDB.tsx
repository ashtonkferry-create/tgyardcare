'use client';

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { Phone, ArrowRight, MapPin, CheckCircle2, Star, Clock, Shield, Users } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ScrollProgress } from '@/components/ScrollProgress';
import { SectionDivider, SectionConnector } from '@/components/SectionTransition';
import { TrustBar } from '@/components/TrustBar';
import { FeaturedReviews } from '@/components/FeaturedReviews';
import { PricingTiers } from '@/components/PricingTiers';
import { ServiceFAQFromDB } from '@/components/ServiceFAQFromDB';
import { useLocationBySlug, useLocationServices } from '@/hooks/useLocations';
import { useFAQsByLocation } from '@/hooks/useFAQs';
import { useReviewsByLocation } from '@/hooks/useReviews';
import heroImage from '@/assets/hero-lawn.jpg';
import { AmbientParticles } from '@/components/AmbientParticles';

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

interface LocationPageFromDBProps {
  slug?: string;
}

export function LocationPageFromDB({ slug: propSlug }: LocationPageFromDBProps) {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = propSlug || params.slug || '';

  const { data: location, isLoading: locationLoading } = useLocationBySlug(slug);
  const { data: locationServices } = useLocationServices(location?.id || '');
  const { data: faqs } = useFAQsByLocation(location?.id || '');
  const { data: reviews } = useReviewsByLocation(location?.id || '');

  // Loading state
  if (locationLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/20" />
          <div className="h-4 w-32 bg-muted rounded" />
        </div>
      </div>
    );
  }

  // 404 if location not found - redirect to service-areas
  if (!location) {
    router.push('/service-areas');
    return null;
  }

  const cityName = location.name;

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress variant="minimal" />

      {/* SEO metadata handled by page.tsx server component */}
      <LocalBusinessSchema cityName={cityName} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://totalguardyardcare.com' },
          { name: 'Service Areas', url: 'https://totalguardyardcare.com/service-areas' },
          { name: `${cityName} Lawn Care`, url: `https://totalguardyardcare.com/locations/${slug}` },
        ]}
      />
      <Navigation showPromoBanner />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Location Summary">
        <p>
          TotalGuard Yard Care provides professional lawn care services in {cityName}, {location.state}.
          We serve homeowners and businesses throughout {cityName} and {location.county} County with weekly mowing,
          fertilization, gutter cleaning, mulching, and seasonal cleanups. Same crew assigned every visit.
          Locally owned, fully insured. Call (608) 535-6057 for a free quote.
        </p>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[auto] md:min-h-[55vh] flex items-center py-16 pt-20 md:py-24 md:pt-24 bg-foreground/95">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${imgSrc(heroImage)})` }}
          role="img"
          aria-label={`${cityName} lawn care services - professional landscaping background`}
>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.25)_100%)]" />
        </div>
        <AmbientParticles density="sparse" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
              <MapPin className="h-4 w-4 mr-2" />
              {cityName}, {location.state}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight">
              {cityName}&apos;s Trusted <span className="text-primary">Lawn Care Experts</span>
            </h1>
            <p className="text-xl md:text-2xl text-background/90 mb-8 font-medium">
              {location.description || `Professional lawn care and yard maintenance for ${cityName} homeowners. Same crew every visit, consistent results.`}
            </p>
            <div className="flex items-center gap-6 mb-10 flex-wrap">
              <div className="flex items-center gap-2 text-background">
                <Star className="h-5 w-5 text-accent fill-accent" />
                <span className="font-bold">4.9 Star Rating</span>
              </div>
              <div className="flex items-center gap-2 text-background">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-bold">Local Family Business</span>
              </div>
              <div className="flex items-center gap-2 text-background">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-bold">100% Guaranteed</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg font-bold bg-primary hover:bg-primary/90" asChild>
                <Link href={`/get-quote?location=${slug}`}>
                  Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-background text-background hover:bg-background hover:text-foreground text-lg font-bold"
                asChild
              >
                <a href="tel:608-535-6057">
                  <Phone className="mr-2 h-5 w-5" />
                  (608) 535-6057
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Services Available in This Location */}
      {locationServices && locationServices.length > 0 && (
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <SectionConnector className="mb-8" />

            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Services Available in {cityName}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive lawn care tailored to {cityName}&apos;s climate and landscape.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {locationServices.map((ls: any) => (
                <Link
                  key={ls.id}
                  href={`/services/${ls.services?.slug}`}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {ls.services?.name}
                      </h3>
                      {ls.services?.short_description && (
                        <p className="text-sm text-muted-foreground mt-1">{ls.services.short_description}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {cityName} Lawn Care Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transparent pricing with no hidden fees. Choose your service level.
            </p>
          </div>

          <PricingTiers serviceSlug="mowing" locationId={location.id} />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why {cityName} Residents Choose TotalGuard
              </h2>
              <p className="text-xl text-muted-foreground">Systems that ensure consistent results</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border-2 border-border rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Same Crew Every Visit</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Your assigned 2-person team knows your property, preferences, and standards. No random strangers.
                </p>
              </div>

              <div className="bg-card border-2 border-border rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">24-Hour Quote Response</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Submit a request today, receive a written quote by tomorrow. No guessing, no waiting.
                </p>
              </div>

              <div className="bg-card border-2 border-border rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">100% Satisfaction Guarantee</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Not happy? We&apos;ll come back and fix it--no questions asked, no extra charge.
                </p>
              </div>

              <div className="bg-card border-2 border-border rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Local to {location.county} County</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We know {cityName}&apos;s soil, climate, and grass types. Local expertise, local service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews from this location */}
      {reviews && reviews.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What {cityName} Customers Say
              </h2>
            </div>
            <FeaturedReviews limit={3} />
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs && faqs.length > 0 && (
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Frequently Asked Questions in {cityName}
                </h2>
              </div>
              <ServiceFAQFromDB serviceSlug="mowing" />
            </div>
          </div>
          <FAQSchema
            faqs={faqs.map((faq) => ({
              question: faq.question,
              answer: faq.answer,
            }))}
          />
        </section>
      )}

      {/* Service Areas Link */}
      <section className="py-10 md:py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <SectionDivider className="mb-6" />
          <p className="text-lg text-muted-foreground mb-4">
            Also proudly serving{' '}
            <Link href="/service-areas" className="text-primary hover:underline font-semibold">
              Madison metro area and surrounding communities
            </Link>
          </p>
          <Link href="/service-areas">
            <Button variant="outline" className="font-semibold">
              View All Service Areas
            </Button>
          </Link>
        </div>
      </section>

      <Footer
        closerTitle={`Experience the TotalGuard Difference in ${cityName}`}
        closerDescription="Same crew every visit. Written quotes. 48-hour issue resolution. Get your free quote today."
      />
    </div>
  );
}

export default LocationPageFromDB;
