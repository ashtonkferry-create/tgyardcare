'use client';

import Link from "next/link";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface CTASectionProps {
  title?: string;
  description?: string;
  variant?: "default" | "compact" | "final";
}

export default function CTASection({
  title = "Get Your Quote Today. We'll Respond by Tomorrow.",
  description = "Tell us what you need. We'll send a clear, no-obligation quote within 24 hours—usually faster.",
  variant = "default"
}: CTASectionProps) {
  const { ref: ctaRef, isInView } = useScrollReveal();

  // Compact variant for mid-page CTAs
  if (variant === "compact") {
    return (
      <section className="py-10 md:py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="font-bold bg-amber-500 hover:bg-amber-400 text-black" asChild>
                <Link href="/contact">
                  Get Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="font-bold" asChild>
                <a href="tel:608-535-6057">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Final CTA - stronger visual weight for page end
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Visual connector from previous section */}
        <div className="w-12 h-px bg-border mx-auto mb-10" />

        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 border-2 border-cyan-500/10 rounded-2xl p-8 md:p-12 text-center shadow-2xl max-w-4xl mx-auto">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white/15 rounded-full animate-snow-fall"
                  style={{
                    width: `${2 + Math.random() * 3}px`,
                    height: `${2 + Math.random() * 3}px`,
                    left: `${10 + Math.random() * 80}%`,
                    animationDelay: `${-(Math.random() * 10)}s`,
                    animationDuration: `${6 + Math.random() * 4}s`,
                    filter: 'blur(0.5px) drop-shadow(0 0 3px rgba(147, 197, 253, 0.4))',
                  }}
                />
              ))}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 animate-frost-text-glow">{title}</h2>
            <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto text-white/70 leading-relaxed">
              {description}
            </p>

            {/* Operational proof strip */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                Quote within 24 hours
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                Written scope, flat pricing
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                Same crew assigned
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="text-base md:text-lg font-bold px-6 md:px-8 py-3 md:py-4 h-auto animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black"
                asChild
              >
                <Link href="/contact">
                  Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg font-bold border-white/30 text-white hover:bg-white/10 hover:border-cyan-400/50"
                asChild
              >
                <a href="tel:608-535-6057">
                  <Phone className="mr-2 h-5 w-5" />
                  (608) 535-6057
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
