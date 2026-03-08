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
  DollarSign,
  Calendar,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

/* ─── Data ─── */

interface SeasonData {
  icon: LucideIcon;
  label: string;
  tagline: string;
  jewel: string;
  jewelHex: string;
  bg: string;
  services: string[];
}

const seasons: SeasonData[] = [
  {
    icon: Leaf,
    label: "Spring",
    tagline: "Revival & Renewal",
    jewel: "text-emerald-400",
    jewelHex: "#34D399",
    bg: "bg-emerald-500/10",
    services: [
      "Spring Cleanup",
      "Lawn Recovery",
      "Edging & Trimming",
      "Mulching",
      "Garden Bed Prep",
      "Early Fertilization",
    ],
  },
  {
    icon: Sun,
    label: "Summer",
    tagline: "Peak Performance",
    jewel: "text-blue-400",
    jewelHex: "#60A5FA",
    bg: "bg-blue-500/10",
    services: [
      "Weekly Mowing",
      "Weed Control",
      "Herbicide Treatments",
      "Bush Trimming",
      "Garden Maintenance",
      "Property Upkeep",
    ],
  },
  {
    icon: Sparkles,
    label: "Fall",
    tagline: "Protect & Prepare",
    jewel: "text-amber-600",
    jewelHex: "#C87533",
    bg: "bg-amber-700/10",
    services: [
      "Leaf Removal",
      "Fall Cleanup",
      "Aeration",
      "Overseeding",
      "Gutter Cleaning",
      "Winterization",
    ],
  },
  {
    icon: Snowflake,
    label: "Winter",
    tagline: "Safe & Secure",
    jewel: "text-slate-300",
    jewelHex: "#94A3B8",
    bg: "bg-slate-400/10",
    services: [
      "Snow Removal",
      "Ice Management",
      "Salting",
      "Gutter Guards",
      "Property Monitoring",
      "Emergency Response",
    ],
  },
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const benefitStats = [
  {
    icon: DollarSign,
    value: 20,
    suffix: "%",
    label: "Bundle savings vs. booking separately",
  },
  {
    icon: Calendar,
    value: 365,
    suffix: "",
    label: "Days of continuous coverage",
  },
  {
    icon: Shield,
    value: 1,
    suffix: "",
    label: "Dedicated team, year-round",
  },
];

/* ─── Component ─── */

export function FullSeasonContract() {
  const [expandedSeason, setExpandedSeason] = useState<number | null>(null);
  const contactLink = "/contact?service=full-season";

  return (
    <section
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      {/* ── Background: dot grid + warm radial glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D4A855 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.04,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center 60%, rgba(212,168,85,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* ═══════════════ TIER 1: Hero Header ═══════════════ */}

          {/* Badge */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold tracking-wide"
              style={{
                background:
                  "linear-gradient(135deg, rgba(212,168,85,0.15), rgba(245,200,66,0.08))",
                border: "1px solid rgba(212,168,85,0.4)",
                color: "#D4A855",
              }}
            >
              <Crown className="h-4 w-4" />
              <span>FLAGSHIP PROPERTY CARE</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight tracking-tight">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #D4A855, #F5C842)",
                }}
              >
                Full Season
              </span>{" "}
              <span className="text-white">Property Care</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              One contract. Twelve months. Zero gaps.
            </p>
          </motion.div>

          {/* ═══════════════ TIER 2: Season Cards + Timeline ═══════════════ */}

          {/* Season cards grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10">
            {seasons.map((season, index) => {
              const isExpanded = expandedSeason === index;
              const Icon = season.icon;

              return (
                <motion.div
                  key={season.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={
                    !isExpanded
                      ? {
                          y: -6,
                          boxShadow: `0 12px 40px -8px ${season.jewelHex}33`,
                        }
                      : undefined
                  }
                  onClick={() =>
                    setExpandedSeason(isExpanded ? null : index)
                  }
                  className="cursor-pointer rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(12px)",
                    borderTop: `3px solid ${season.jewelHex}`,
                    border: `1px solid rgba(255,255,255,0.06)`,
                    borderTopColor: season.jewelHex,
                    borderTopWidth: "3px",
                  }}
                >
                  <div className="p-5 md:p-6">
                    {/* Icon + name */}
                    <div className="flex items-center gap-3 mb-2">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                      >
                        <Icon
                          className={`h-6 w-6 ${season.jewel}`}
                        />
                      </motion.div>
                      <h3 className="text-white font-bold text-lg">
                        {season.label}
                      </h3>
                    </div>

                    {/* Tagline */}
                    <p className="text-slate-400 text-sm mb-3">
                      {season.tagline}
                    </p>

                    {/* Service count + expand indicator */}
                    <div
                      className="flex items-center justify-between"
                    >
                      <p
                        className="text-xs font-semibold"
                        style={{ color: season.jewelHex }}
                      >
                        {isExpanded ? "Hide services" : `View ${season.services.length} services`}
                      </p>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <ChevronDown
                          className="h-4 w-4"
                          style={{ color: season.jewelHex }}
                        />
                      </motion.div>
                    </div>

                    {/* Expanded services accordion */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                            {season.services.map((service, si) => (
                              <motion.div
                                key={service}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: si * 0.05 }}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle2
                                  className="h-3.5 w-3.5 flex-shrink-0"
                                  style={{ color: season.jewelHex }}
                                />
                                <span className="text-white text-sm">
                                  {service}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Timeline bar */}
          <motion.div
            className="mb-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Segmented bar */}
            <div className="relative h-3 rounded-full overflow-hidden bg-white/5 mb-3">
              {/* 4 season segments */}
              {seasons.map((season, index) => (
                <motion.div
                  key={season.label}
                  className="absolute top-0 h-full"
                  style={{
                    left: `${index * 25}%`,
                    width: "25%",
                    backgroundColor: season.jewelHex,
                    transformOrigin: "left center",
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + index * 0.15,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Golden coverage beam sweep */}
              <motion.div
                className="absolute top-0 h-full w-[15%] rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #F5C842, transparent)",
                  opacity: 0.6,
                }}
                animate={{ left: ["-15%", "100%"] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1,
                }}
              />
            </div>

            {/* Month labels */}
            <div className="flex justify-between px-1">
              {months.map((month, index) => (
                <motion.span
                  key={month}
                  className="text-xs text-slate-500 font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.04 }}
                >
                  {month}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* ═══════════════ TIER 3: Benefits + CTA + Trust ═══════════════ */}

          {/* Benefit stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {benefitStats.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="text-center rounded-2xl p-6 md:p-8"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.8 + index * 0.1,
                  }}
                >
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(212,168,85,0.15), rgba(245,200,66,0.08))",
                    }}
                  >
                    <StatIcon
                      className="h-6 w-6"
                      style={{ color: "#D4A855" }}
                    />
                  </div>
                  <div
                    className="text-4xl md:text-5xl font-bold mb-2"
                    style={{ color: "#F5C842" }}
                  >
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      duration={1800}
                    />
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="font-bold text-sm md:text-lg px-6 sm:px-10 py-5 md:py-6 rounded-full group"
                  style={{
                    background:
                      "linear-gradient(135deg, #D4A855, #F5C842)",
                    color: "#0A0A0F",
                    boxShadow:
                      "0 10px 40px -10px rgba(212,168,85,0.4)",
                  }}
                  asChild
                >
                  <Link href={contactLink}>
                    <Shield className="mr-2 h-4 w-4 md:h-5 md:w-5 flex-shrink-0 group-hover:rotate-12 transition-transform" />
                    <span>Lock In Full Season Coverage</span>
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
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

            {/* Trust line */}
            <motion.p
              className="mt-8 text-slate-500 text-sm max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              Trusted by 127 Madison families year-round &bull; 4.9&#9733;
              Google Rating &bull; Fully Insured
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
