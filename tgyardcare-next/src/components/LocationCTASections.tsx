'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Sparkles } from "lucide-react";

export function CommercialServicesCTA() {
  return (
    <section className="py-16 bg-white/[0.03]">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <div className="bg-white/[0.06] border-2 border-primary/20 rounded-2xl p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-5">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
              Looking for <span className="text-primary">commercial services</span>?
            </h2>
            <p className="text-base text-white/60 mb-6 leading-relaxed">
              We also provide professional <span className="font-semibold text-white">commercial lawn care</span>, <span className="font-semibold text-white">gutter services</span>, and <span className="font-semibold text-white">seasonal maintenance</span> for businesses and properties throughout our service area.
            </p>
            <Button
              size="lg"
              className="w-full font-bold rounded-full shadow-md hover:shadow-lg transition-all"
              asChild
            >
              <Link href="/commercial">
                Explore Commercial Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GetStartedCTA() {
  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <div className="bg-white/[0.06] border-2 border-primary rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">
              Ready to Get Started?
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold shadow-md">
                  1
                </div>
                <p className="text-base text-white">
                  <span className="font-bold">Get a free quote</span> in under 24 hours
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold shadow-md">
                  2
                </div>
                <p className="text-base text-white">
                  <span className="font-bold">Schedule</span> your service at your convenience
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold shadow-md">
                  3
                </div>
                <p className="text-base text-white">
                  <span className="font-bold">Enjoy</span> your beautiful lawn!
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/contact" className="block">
                <Button
                  size="lg"
                  className="w-full font-bold rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  Get a Free Quote
                </Button>
              </Link>
              <a href="tel:920-629-6934" className="block">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full font-bold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full transition-all"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call 920-629-6934
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
