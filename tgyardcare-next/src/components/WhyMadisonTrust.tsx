'use client';

import Link from "next/link";
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from "@/components/ui/button";
import { Phone, Users, Shield, ArrowRight, CheckCircle2, X as XIcon, Check } from "lucide-react";

export function WhyMadisonTrust() {
  const { ref: sectionRef, isInView } = useScrollReveal();

  const trustCards = [
    {
      icon: Phone,
      stat: "2hr",
      statLabel: "avg response",
      title: "We Answer. We Show Up.",
      description: "Call us — a real person picks up. Text us — you hear back in hours, not days. That's our standard, not our exception.",
      proof: "Average response: 2 hours",
    },
    {
      icon: Users,
      stat: "Same",
      statLabel: "crew every visit",
      title: "Same Crew. Every Visit.",
      description: "Your property gets the same trained team who knows your yard, your preferences, your standards. No strangers. No surprises.",
      proof: "Dedicated 2-person crew",
      featured: true,
    },
    {
      icon: Shield,
      stat: "100%",
      statLabel: "quote accuracy",
      title: "The Price We Quote Is What You Pay.",
      description: "No hidden fees. No 'we found extra work' charges. No equipment surcharges. The number we give you is the number on the invoice.",
      proof: "Zero surprise charges — ever",
    },
  ];

  const comparison = [
    { theirs: "Ghost you after the first mow", ours: "Same crew, every single visit" },
    { theirs: "Random workers every time", ours: "Scheduled day — we show up" },
    { theirs: '"Forgot" to come this week', ours: "Flat pricing, no surprises" },
    { theirs: "Surprise charges on the invoice", ours: "Real humans who answer the phone" },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* === BACKGROUND: Deep warm black with subtle amber warmth === */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(245,158,11,0.04)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(217,119,6,0.03)_0%,transparent_50%)]" />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      {/* Top edge fade */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#071a0e] to-transparent" />
      {/* Bottom edge fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a1f14] to-transparent" />

      <div className="container mx-auto px-4 relative z-10">

        {/* ====== HEADER ====== */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-8">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300/90 text-xs font-semibold uppercase tracking-widest">80+ verified Google reviews</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[0.95] tracking-tight">
            Why Homeowners{" "}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
              Fire Their Old Guy
            </span>
          </h2>
          <p className="text-stone-400 text-lg md:text-xl max-w-xl mx-auto font-medium leading-relaxed">
            The bar in this industry is embarrassingly low.
            <br className="hidden sm:block" />
            We just do what we say we&apos;ll do.
          </p>
        </motion.div>

        {/* ====== CARDS ====== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto mb-20">
          {trustCards.map((card, index) => {
            const Icon = card.icon;
            const isFeatured = !!card.featured;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
                className={`group relative ${isFeatured ? 'md:-mt-4 md:-mb-4' : ''}`}
              >
                {/* Featured glow */}
                {isFeatured && (
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-amber-400/40 via-amber-500/20 to-amber-600/10 blur-sm" />
                )}

                <div
                  className={`relative h-full rounded-2xl p-7 md:p-8 transition-all duration-500 ${
                    isFeatured
                      ? 'bg-gradient-to-b from-amber-500/[0.12] to-amber-900/[0.06] border border-amber-500/25 hover:border-amber-400/40'
                      : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05]'
                  }`}
                >
                  {/* Featured badge */}
                  {isFeatured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg shadow-amber-500/30">
                        The Difference
                      </div>
                    </div>
                  )}

                  {/* Stat + Icon row */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className={`text-4xl md:text-5xl font-black tracking-tight leading-none ${
                        isFeatured ? 'text-amber-400' : 'text-white'
                      }`}>
                        {card.stat}
                      </span>
                      <p className={`text-xs font-medium uppercase tracking-wider mt-1 ${
                        isFeatured ? 'text-amber-400/60' : 'text-stone-500'
                      }`}>
                        {card.statLabel}
                      </p>
                    </div>
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isFeatured
                        ? 'bg-amber-500/15 border border-amber-500/20'
                        : 'bg-white/[0.04] border border-white/[0.06]'
                    }`}>
                      <Icon className={`h-5 w-5 ${isFeatured ? 'text-amber-400' : 'text-stone-400'}`} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-snug">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-stone-400 leading-relaxed mb-5">
                    {card.description}
                  </p>

                  {/* Proof line */}
                  <div className={`h-px w-full mb-4 ${
                    isFeatured
                      ? 'bg-gradient-to-r from-transparent via-amber-500/20 to-transparent'
                      : 'bg-gradient-to-r from-transparent via-white/[0.06] to-transparent'
                  }`} />
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${isFeatured ? 'text-amber-400' : 'text-stone-500'}`} />
                    <span className={`text-sm font-semibold ${isFeatured ? 'text-amber-300' : 'text-stone-300'}`}>
                      {card.proof}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ====== COMPARISON ====== */}
        <motion.div
          className="max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Column headers */}
          <div className="grid grid-cols-2 gap-4 mb-3 px-1">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400/70">The Other Guys</span>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400/70">TotalGuard</span>
          </div>

          <div className="space-y-2">
            {comparison.map((row, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + idx * 0.08, duration: 0.4 }}
                className="grid grid-cols-2 gap-4"
              >
                {/* Theirs */}
                <div className="flex items-center gap-2.5 bg-red-500/[0.04] border border-red-500/[0.08] rounded-lg px-3.5 py-2.5">
                  <XIcon className="h-3.5 w-3.5 text-red-400/60 flex-shrink-0" />
                  <span className="text-sm text-red-200/50 line-through decoration-red-500/30">{row.theirs}</span>
                </div>
                {/* Ours */}
                <div className="flex items-center gap-2.5 bg-amber-500/[0.04] border border-amber-500/[0.08] rounded-lg px-3.5 py-2.5">
                  <Check className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                  <span className="text-sm text-stone-200 font-medium">{row.ours}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ====== TRUST METRICS ====== */}
        <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap mb-14">
          {[
            { value: '4.9★', label: 'Google Rating' },
            { value: '80+', label: 'Verified Reviews' },
            { value: '500+', label: 'Properties Served' },
            { value: '100%', label: 'Fully Insured' },
          ].map((metric, idx) => (
            <div key={idx} className="text-center">
              <span className="block text-2xl md:text-3xl font-black text-white tracking-tight">{metric.value}</span>
              <span className="text-[11px] text-stone-500 uppercase tracking-wider font-medium">{metric.label}</span>
            </div>
          ))}
        </div>

        {/* ====== CTA ====== */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link href="/contact">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 hover:from-amber-300 hover:via-yellow-200 hover:to-amber-300 text-black font-bold px-10 py-6 text-lg rounded-xl shadow-[0_4px_24px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_32px_rgba(245,158,11,0.45)] transition-all duration-300 hover:scale-[1.03]"
            >
              Get My Free Quote
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <p className="text-stone-600 text-xs mt-4 uppercase tracking-widest font-medium">Response within 24 hours</p>
        </motion.div>
      </div>
    </section>
  );
}
