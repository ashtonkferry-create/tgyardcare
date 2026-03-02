'use client';

import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { QuoteFlow } from '@/components/QuoteFlow';
import { TrustBar } from '@/components/TrustBar';

export default function GetQuoteContent() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || undefined;
  const initialTier = searchParams.get('tier') || undefined;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="sr-only">
        <h2>Get a Free Quote from TG Yard Care</h2>
        <p>Request a free, no-obligation quote for professional lawn care and landscaping services in Madison, Wisconsin. TG Yard Care provides written estimates within 24 hours for mowing, mulching, gutter cleaning, seasonal cleanups, fertilization, snow removal, and more. Call (608) 535-6057 or fill out our online form.</p>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Quote Flow */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Get Your Free Quote
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Answer a few quick questions and get an instant price estimate.
              No obligation, no pressure—just honest pricing.
            </p>
          </div>

          <QuoteFlow
            initialService={initialService}
            initialTier={initialTier}
            className="py-4"
          />
        </div>
      </section>

      <Footer showCloser={false} />
    </div>
  );
}
