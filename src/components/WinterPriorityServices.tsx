'use client';

import { Button } from '@/components/ui/button';
import Link from "next/link";
import { ArrowRight, Snowflake, Shield, Clock, CheckCircle2, Phone, Crown, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface PackageProps {
  name: string;
  badge: string;
  tagline: string;
  features: string[];
  isBestDeal?: boolean;
  isCommercial?: boolean;
  ctaText: string;
  serviceKey: string;
}

function CompactPackageCard({
  name,
  badge,
  tagline,
  features,
  isBestDeal,
  isCommercial,
  ctaText,
  serviceKey
}: PackageProps) {
  return (
    <div className={cn(
      "relative rounded-2xl transition-all duration-300 flex flex-col",
      isCommercial
        ? "bg-white/[0.05] border border-amber-500/20 hover:border-amber-400/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-950/30"
        : isBestDeal
          ? "bg-gradient-to-br from-[#071c2e] to-[#0a2040] border-2 border-cyan-400/50 scale-[1.04] z-10 shadow-[0_0_40px_rgba(34,211,238,0.12)] hover:shadow-[0_0_60px_rgba(34,211,238,0.2)]"
          : "bg-white/[0.05] border border-white/[0.08] hover:border-cyan-400/25 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-950/30"
    )}>
      {/* Badge */}
      <div className={cn(
        "absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide shadow-md flex items-center gap-1 whitespace-nowrap",
        isCommercial
          ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950"
          : isBestDeal
            ? "bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-900"
            : "bg-white/[0.08] border border-white/10 text-white/60"
      )}>
        {(isBestDeal || isCommercial) && <Crown className="h-3 w-3" />}
        {badge}
      </div>

      <div className="p-4 pt-5 flex flex-col h-full">
        {/* Header */}
        <div className="text-center mb-3">
          <h3 className="text-base font-bold text-white mb-0.5">
            {tagline}
          </h3>
          <p className={cn(
            "text-xs",
            isCommercial ? "text-amber-200/50" : isBestDeal ? "text-cyan-300/70" : "text-white/40"
          )}>
            {name === "Essential" ? "Pay per visit" : name === "Premium" ? "Unlimited visits" : "Custom pricing"}
          </p>
        </div>

        {/* Features */}
        <ul className="space-y-1.5 mb-4 flex-grow">
          {features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs">
              <CheckCircle2 className={cn(
                "h-3.5 w-3.5 mt-0.5 flex-shrink-0",
                isCommercial ? "text-amber-400" : isBestDeal ? "text-cyan-300" : "text-cyan-400"
              )} />
              <span className={cn(
                "font-medium leading-snug",
                isCommercial ? "text-white/65" : isBestDeal ? "text-white/90" : "text-white/65"
              )}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          size="sm"
          className={cn(
            "w-full font-bold text-xs h-9",
            isCommercial
              ? "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-amber-950"
              : isBestDeal
                ? "animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black"
                : "bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/10"
          )}
          asChild
        >
          <Link href={`/contact?service=${serviceKey}`}>
            {ctaText} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function WinterPriorityServices() {
  const { ref: sectionRef, isInView } = useScrollReveal();

  const packages: PackageProps[] = [
    {
      name: "Essential",
      badge: "FLEXIBLE",
      tagline: "Per-Visit Service",
      features: [
        "Response within 12 hours",
        "Driveway & walkway clearing",
        "Salt treatment included"
      ],
      ctaText: "Get Quote",
      serviceKey: "snow-essential"
    },
    {
      name: "Premium",
      badge: "BEST VALUE",
      tagline: "Seasonal Contract",
      features: [
        "Priority 24/7 response",
        "Unlimited visits all winter",
        "Fixed pricing, no surprises"
      ],
      isBestDeal: true,
      ctaText: "See Options",
      serviceKey: "snow-premium"
    },
    {
      name: "Commercial",
      badge: "ENTERPRISE",
      tagline: "Business Priority",
      features: [
        "Commercial-grade equipment",
        "Parking lot clearing",
        "24/7 emergency response"
      ],
      isCommercial: true,
      ctaText: "Get Quote",
      serviceKey: "snow-commercial"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #020810, #040e1c, #020810)' }}
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400/[0.05] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/[0.05] rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Snowflake className="h-4 w-4 animate-spin [animation-duration:10s]" />
            Winter 2025–26
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
              Winter Protection
            </span>
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent mx-auto mt-4" />
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto mt-5 leading-relaxed">
            Three tiers of coverage. All backed by our 24/7 response guarantee.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-5 max-w-4xl mx-auto mb-12">
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: idx * 0.12, duration: 0.5, ease: 'easeOut' }}
            >
              <CompactPackageCard {...pkg} />
            </motion.div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { icon: Shield, text: 'Fully Insured' },
            { icon: Clock, text: '24/7 Response' },
            { icon: Star, text: '4.9★ Rating' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-white/[0.06] border border-white/10 px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              <item.icon className="h-4 w-4 text-cyan-400" />
              <span className="text-white/80 font-semibold">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-white/[0.05] border border-white/10 rounded-2xl p-8 sm:p-10 shadow-xl max-w-2xl mx-auto backdrop-blur-sm">
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Not sure which tier fits your property?
          </h3>
          <p className="text-white/50 mb-6 text-base max-w-md mx-auto">
            Free quote, same-day response. No pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black font-bold px-8"
              asChild
            >
              <Link href="/contact">
                Get Your Free Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 font-bold px-8"
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
  );
}
