'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Shield,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Leaf,
  Sun,
  Snowflake,
  Crown,
  X,
  DollarSign,
  type LucideIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { AmbientParticles } from "@/components/AmbientParticles";

interface SeasonData {
  icon: LucideIcon;
  label: string;
  color: string;
  bg: string;
  gradient: string;
  tagline: string;
  services: string[];
}

export function FullSeasonContract() {
  const contactLink = "/contact?service=full-season";
  const [activeSeason, setActiveSeason] = useState<string | null>(null);

  const seasons: SeasonData[] = [
    {
      icon: Leaf,
      label: "Spring",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      gradient: "from-emerald-500 to-green-600",
      tagline: "Fresh starts & lawn revival",
      services: ["Spring Cleanup", "Lawn Recovery", "Edging & Trimming", "Mulching", "Garden Bed Prep", "Early Fertilization"]
    },
    {
      icon: Sun,
      label: "Summer",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      gradient: "from-amber-500 to-orange-500",
      tagline: "Peak season perfection",
      services: ["Weekly Mowing", "Weed Control", "Herbicide Treatments", "Bush Trimming", "Garden Maintenance", "Property Upkeep"]
    },
    {
      icon: Sparkles,
      label: "Fall",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      gradient: "from-orange-500 to-red-500",
      tagline: "Prepare for winter success",
      services: ["Leaf Removal", "Fall Cleanup", "Aeration", "Overseeding", "Gutter Cleaning", "Winterization"]
    },
    {
      icon: Snowflake,
      label: "Winter",
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
      gradient: "from-cyan-400 to-blue-500",
      tagline: "Safe & accessible all season",
      services: ["Snow Removal", "Ice Management", "Salting", "Gutter Guards", "Property Monitoring", "Emergency Response"]
    },
  ];

  const benefits = [
    "Priority scheduling year-round",
    "One team, one standard",
    "Predictable coverage",
    "Never miss a season",
  ];

  const activeSeasonData = seasons.find(s => s.label === activeSeason);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AmbientParticles density="sparse" />
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-primary/40 rounded-full"
            style={{
              left: `${10 + (i * 7)}%`,
              top: `${15 + ((i * 17) % 70)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Aurora shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-cyan-900/10 to-blue-900/10 animate-aurora-shimmer pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Premium badge */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-amber-400/10 text-amber-400 px-5 py-2.5 rounded-full text-sm font-bold border border-amber-500/30 shadow-lg shadow-amber-500/10">
              <Crown className="h-4 w-4" />
              <span className="tracking-wide">FLAGSHIP PROPERTY CARE</span>
            </div>
          </motion.div>

          {/* Main headline - fixed leading to prevent y cutoff */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight tracking-tight">
              Full Season
              <span className="block bg-gradient-to-r from-primary via-emerald-400 to-cyan-400 bg-clip-text text-transparent pb-2">
                Property Care
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              One contract. Four seasons. Complete protection.
              <span className="text-white font-semibold"> Stop scheduling—start enjoying your property.</span>
            </p>
          </motion.div>

          {/* Hint text with professional icon */}
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <motion.p
              className="text-slate-400 text-sm flex items-center justify-center gap-2"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="bg-primary/20 rounded-full p-1.5"
              >
                <ArrowRight className="h-3.5 w-3.5 text-primary rotate-[-90deg]" />
              </motion.div>
              Tap a season to explore services
            </motion.p>
          </motion.div>

          {/* Seasons carousel with click interaction */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {seasons.map((season, index) => (
              <motion.button
                key={season.label}
                onClick={() => setActiveSeason(activeSeason === season.label ? null : season.label)}
                className={`group relative flex items-center gap-2.5 ${season.bg} backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-3.5 cursor-pointer transition-all duration-300 ${activeSeason === season.label ? 'ring-2 ring-primary border-primary/50 shadow-lg shadow-primary/20 animate-frost-glow' : 'hover:border-white/20 hover:shadow-lg hover:shadow-cyan-500/10'}`}
                whileHover={{
                  scale: 1.05,
                  y: -3,
                }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + index * 0.08,
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                }}
              >
                {/* Subtle pulse ring on first button when nothing selected */}
                {index === 0 && !activeSeason && (
                  <motion.span
                    className="absolute inset-0 rounded-2xl border-2 border-primary/60"
                    animate={{
                      scale: [1, 1.08],
                      opacity: [0.6, 0],
                    }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <motion.div
                  animate={{ rotate: activeSeason === season.label ? [0, 360] : [0, 8, -8, 0] }}
                  transition={{
                    duration: activeSeason === season.label ? 0.5 : 4,
                    repeat: activeSeason === season.label ? 0 : Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <season.icon className={`h-5 w-5 md:h-6 md:w-6 ${season.color} transition-transform duration-300`} />
                </motion.div>
                <span className="text-white font-semibold text-sm md:text-base">{season.label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Season popup */}
          <AnimatePresence>
            {activeSeasonData && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="mb-10"
              >
                <div className={`relative bg-gradient-to-br ${activeSeasonData.gradient} p-[2px] rounded-3xl shadow-2xl`}>
                  <div className="bg-slate-900/95 backdrop-blur-xl rounded-3xl p-6 md:p-8">
                    {/* Close button */}
                    <button
                      onClick={() => setActiveSeason(null)}
                      className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors p-1"
                    >
                      <X className="h-5 w-5" />
                    </button>

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        className={`p-3 rounded-xl ${activeSeasonData.bg}`}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {(() => { const Icon = activeSeasonData.icon; return <Icon className={`h-8 w-8 ${activeSeasonData.color}`} />; })()}
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{activeSeasonData.label} Coverage</h3>
                        <p className={`text-sm font-medium ${activeSeasonData.color}`}>{activeSeasonData.tagline}</p>
                      </div>
                    </div>

                    {/* Services grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {activeSeasonData.services.map((service, i) => (
                        <motion.div
                          key={service}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-3"
                        >
                          <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${activeSeasonData.color}`} />
                          <span className="text-white text-sm font-medium">{service}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Mini CTA */}
                    <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-slate-400 text-sm">All {activeSeasonData.label.toLowerCase()} services included in your contract</p>
                      <Button
                        size="sm"
                        className={`bg-gradient-to-r ${activeSeasonData.gradient} text-white font-bold px-6`}
                        asChild
                      >
                        <Link href={contactLink}>
                          Get Covered <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bundle Savings Callout */}
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 via-primary/15 to-cyan-500/20 border border-primary/30 rounded-full px-6 py-3 shadow-lg shadow-primary/10">
              <motion.div
                className="p-2 rounded-lg bg-emerald-500/20"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <DollarSign className="h-5 w-5 text-emerald-400" />
              </motion.div>
              <div className="text-left">
                <p className="text-white font-bold text-sm md:text-base">
                  Save 15-20% vs. booking services separately
                </p>
                <p className="text-slate-400 text-xs md:text-sm">
                  Full Season clients lock in priority scheduling + bundle pricing
                </p>
              </div>
            </div>
          </motion.div>

          {/* Benefits strip */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-white text-sm md:text-base font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary via-emerald-500 to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] text-primary-foreground font-bold text-sm md:text-lg px-5 sm:px-8 md:px-10 py-5 md:py-6 rounded-full shadow-xl shadow-primary/25 transition-all duration-500 group max-w-full animate-shimmer-btn"
                  asChild
                >
                  <Link href={contactLink}>
                    <Shield className="mr-1.5 md:mr-2 h-4 w-4 md:h-5 md:w-5 flex-shrink-0 group-hover:rotate-12 transition-transform" />
                    <span className="truncate">Request Full Season Coverage</span>
                    <ArrowRight className="ml-1.5 md:ml-2 h-4 w-4 md:h-5 md:w-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>

              <motion.a
                href="tel:608-535-6057"
                className="text-slate-400 hover:text-white font-semibold transition-colors flex items-center gap-2"
                whileHover={{ x: 3 }}
              >
                Or call (608) 535-6057
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>

            {/* Trust micro-proof */}
            <motion.div
              className="mt-8 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-slate-400 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                500+ Madison Properties
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Fully Insured
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                4.9★ Google Rating
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
