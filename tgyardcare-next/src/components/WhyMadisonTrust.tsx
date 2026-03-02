'use client';

import Link from "next/link";
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from "@/components/ui/button";
import { Phone, Users, Shield, ArrowRight, CheckCircle2, Clock, MessageSquare } from "lucide-react";

export function WhyMadisonTrust() {
  const { ref: sectionRef, isInView } = useScrollReveal();

  const trustCards = [
    {
      icon: Phone,
      title: "We Answer. We Show Up.",
      subtitle: "Every single time",
      description: "Call us—a real person answers. Text us—you get a reply within hours, not days.",
      proof: "Average response: 2 hours",
      proofDetail: "Not 2 days. Hours."
    },
    {
      icon: Users,
      title: "Same Crew. Every Visit.",
      subtitle: "No random workers",
      description: "Your property gets the same trained team who knows your yard, your preferences, your standards.",
      proof: "Dedicated 2-person crew",
      proofDetail: "They know your property.",
      featured: true
    },
    {
      icon: Shield,
      title: "The Price We Quote Is The Price You Pay.",
      subtitle: "Zero surprises",
      description: "No 'we found extra work' fees. No equipment charges. No excuses.",
      proof: "100% quote accuracy",
      proofDetail: "Check our reviews."
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      {/* Layered Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-950/95 to-slate-900" />

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,hsl(200_80%_25%/0.4),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,hsl(210_70%_20%/0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(200_90%_30%/0.15),transparent_60%)]" />
      </div>

      {/* Frost Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==')]" />

      {/* Soft Curve Top */}
      <div className="absolute -top-1 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16 md:h-20" preserveAspectRatio="none">
          <path d="M0 80V0H1440V80C1440 80 1080 40 720 40C360 40 0 80 0 80Z" fill="#071a0e" />
        </svg>
      </div>

      {/* Soft Curve Bottom */}
      <div className="absolute -bottom-1 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16 md:h-20" preserveAspectRatio="none">
          <path d="M0 0V80H1440V0C1440 0 1080 40 720 40C360 40 0 0 0 0Z" fill="#0a1f14" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with Pattern Interrupt */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-4 py-2 mb-6">
            <MessageSquare className="h-4 w-4 text-amber-300" />
            <span className="text-amber-200 text-sm font-medium tracking-wide">Read our 60+ Google reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Why Homeowners{" "}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Fire Their Old Guy
            </span>
            <span className="block mt-1">and Call Us Instead</span>
          </h2>
          <p className="text-blue-100/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            The bar in this industry is embarrassingly low. We just do what we say we'll do.
          </p>
        </motion.div>

        {/* Layered Card Container */}
        <div className="relative max-w-6xl mx-auto mb-12">
          {/* Background Panel */}
          <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-br from-blue-900/40 to-slate-900/60 rounded-3xl border border-blue-500/10 backdrop-blur-sm" />

          {/* Cards Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-4 md:p-8">
            {trustCards.map((card, index) => {
              const Icon = card.icon;
              const isFeatured = card.featured;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
                >
                <div
                  className={`
                    group relative rounded-2xl transition-all duration-500
                    ${isFeatured
                      ? 'bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 shadow-2xl shadow-amber-500/30 md:-mt-4 md:-mb-4 md:py-10 ring-2 ring-amber-400/40 hover:shadow-amber-500/40 hover:shadow-2xl'
                      : 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-blue-500/20 hover:border-blue-400/40 shadow-xl hover:shadow-blue-400/20 hover:shadow-xl'
                    }
                    p-6 md:p-8
                    hover:scale-[1.02] hover:shadow-2xl
                  `}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isFeatured ? 'bg-gradient-to-br from-yellow-400/10 to-amber-600/10' : 'bg-gradient-to-br from-blue-500/10 to-transparent'}`} />

                  {/* Icon with Layered Background */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 w-16 h-16 rounded-2xl blur-xl ${isFeatured ? 'bg-yellow-400/40' : 'bg-blue-500/30'} group-hover:scale-125 transition-transform duration-500`} />
                    <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center ${isFeatured ? 'bg-gradient-to-br from-yellow-400 to-amber-500' : 'bg-gradient-to-br from-blue-500 to-blue-600'} shadow-lg`}>
                      <Icon className={`h-8 w-8 ${isFeatured ? 'text-black' : 'text-white'}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    {/* Subtitle Badge */}
                    <span className={`inline-block text-xs font-bold uppercase tracking-wider mb-2 ${isFeatured ? 'text-yellow-900' : 'text-blue-300'}`}>
                      {card.subtitle}
                    </span>

                    <h3 className={`text-xl md:text-2xl font-bold mb-3 ${isFeatured ? 'text-black' : 'text-white'}`}>
                      {card.title}
                    </h3>

                    <p className={`text-base leading-relaxed mb-4 ${isFeatured ? 'text-amber-900' : 'text-blue-200/80'}`}>
                      {card.description}
                    </p>

                    {/* Divider */}
                    <div className={`h-px w-full mb-4 ${isFeatured ? 'bg-gradient-to-r from-transparent via-yellow-700/50 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-500/30 to-transparent'}`} />

                    {/* Proof Line */}
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${isFeatured ? 'text-yellow-900' : 'text-blue-400'}`} />
                      <span className={`text-sm font-bold ${isFeatured ? 'text-black' : 'text-blue-300'}`}>
                        {card.proof}
                      </span>
                    </div>
                    <p className={`text-xs ${isFeatured ? 'text-amber-800' : 'text-blue-400/60'}`}>
                      {card.proofDetail}
                    </p>
                  </div>

                  {/* Featured Badge */}
                  {isFeatured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-amber-400 text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-lg">
                      The Difference
                    </div>
                  )}
                </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Comparison Strip */}
        <motion.div
          className="max-w-4xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-4">
            {/* Other Guys */}
            <div className="bg-red-950/30 border border-red-500/20 rounded-xl p-5">
              <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2">
                <span className="text-lg">✗</span> The Other Guys
              </h4>
              <ul className="space-y-2 text-red-200/70 text-sm">
                <li>• Ghost you after the first mow</li>
                <li>• Random workers every visit</li>
                <li>• "Forgot" to come this week</li>
                <li>• Surprise charges on the invoice</li>
              </ul>
            </div>

            {/* TotalGuard */}
            <div className="bg-green-950/30 border border-green-500/20 rounded-xl p-5">
              <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2">
                <span className="text-lg">✓</span> TotalGuard Yard Care
              </h4>
              <ul className="space-y-2 text-green-200/70 text-sm">
                <li>• Same crew, every single visit</li>
                <li>• Scheduled day—we show up</li>
                <li>• Flat pricing, no surprises</li>
                <li>• Real humans who answer the phone</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Trust Reinforcement Strip */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-blue-200/70 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span>Fully Insured</span>
            </div>
            <div className="flex items-center gap-2 text-blue-200/70 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span>4.9★ on Google</span>
            </div>
            <div className="flex items-center gap-2 text-blue-200/70 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span>60+ Verified Reviews</span>
            </div>
            <div className="flex items-center gap-2 text-blue-200/70 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span>500+ Madison Properties</span>
            </div>
          </div>
        </div>

        {/* Premium CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-yellow-400 text-black font-bold px-10 py-6 text-lg rounded-xl shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 group"
              >
                Get My Free Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <span className="text-blue-300/50 text-xs mt-3 uppercase tracking-wider">Response within 24 hours</span>
          </div>
        </div>
      </div>
    </section>
  );
}
