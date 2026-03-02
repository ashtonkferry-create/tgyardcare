'use client';

import Link from "next/link";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, CheckCircle2, MapPin, Sparkles, Mail, Snowflake, Leaf, Sun, CloudRain } from "lucide-react";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useSeasonalTheme, Season } from "@/contexts/SeasonalThemeContext";
import { AmbientParticles } from "@/components/AmbientParticles";

/* ───────────────────────────────────────────────────── *
 *  Merged seasonal theme (CTA closer + footer grid)    *
 * ───────────────────────────────────────────────────── */
const theme = {
  summer: {
    // Zone 1
    closerBg: 'from-[#0f2818] via-[#1a3a2a] to-[#0d3320]',
    glowColor: 'rgba(34,197,94,0.08)',
    phoneGlow: '0 0 60px rgba(34,197,94,0.15)',
    checkColor: 'text-emerald-400',
    accentText: 'text-emerald-400',
    // Zone 2
    gridBg: 'from-[#0a1f14] to-[#071510]',
    cardBorder: 'border-emerald-500/10',
    cardHoverBorder: 'hover:border-emerald-400/25',
    cardHoverShadow: 'hover:shadow-emerald-500/5',
    pillBg: 'bg-emerald-500/8',
    pillBorder: 'border-emerald-500/15',
    pillHover: 'hover:bg-emerald-500/15 hover:border-emerald-400/30',
    linkHover: 'hover:text-emerald-400',
    iconColor: 'text-emerald-400',
    textColor: 'text-emerald-100/50',
    dimText: 'text-emerald-100/30',
    seasonBg: 'bg-emerald-500/10',
    seasonText: 'text-emerald-400',
    seasonBorder: 'border-emerald-500/20',
    // Zone 3
    sigBorder: 'border-emerald-500/10',
  },
  fall: {
    closerBg: 'from-stone-900 via-amber-950 to-stone-900',
    glowColor: 'rgba(245,158,11,0.08)',
    phoneGlow: '0 0 60px rgba(245,158,11,0.15)',
    checkColor: 'text-amber-400',
    accentText: 'text-amber-400',
    gridBg: 'from-stone-900 to-stone-950',
    cardBorder: 'border-amber-500/10',
    cardHoverBorder: 'hover:border-amber-400/25',
    cardHoverShadow: 'hover:shadow-amber-500/5',
    pillBg: 'bg-amber-500/8',
    pillBorder: 'border-amber-500/15',
    pillHover: 'hover:bg-amber-500/15 hover:border-amber-400/30',
    linkHover: 'hover:text-amber-400',
    iconColor: 'text-amber-400',
    textColor: 'text-stone-400',
    dimText: 'text-stone-500',
    seasonBg: 'bg-amber-500/10',
    seasonText: 'text-amber-400',
    seasonBorder: 'border-amber-500/20',
    sigBorder: 'border-amber-500/10',
  },
  winter: {
    closerBg: 'from-slate-900 via-blue-950 to-indigo-950',
    glowColor: 'rgba(147,197,253,0.08)',
    phoneGlow: '0 0 60px rgba(147,197,253,0.15)',
    checkColor: 'text-cyan-400',
    accentText: 'text-cyan-400',
    gridBg: 'from-slate-900 to-slate-950',
    cardBorder: 'border-cyan-500/10',
    cardHoverBorder: 'hover:border-cyan-400/25',
    cardHoverShadow: 'hover:shadow-cyan-500/5',
    pillBg: 'bg-cyan-500/8',
    pillBorder: 'border-cyan-500/15',
    pillHover: 'hover:bg-cyan-500/15 hover:border-cyan-400/30',
    linkHover: 'hover:text-cyan-400',
    iconColor: 'text-cyan-400',
    textColor: 'text-slate-400',
    dimText: 'text-slate-500',
    seasonBg: 'bg-cyan-500/10',
    seasonText: 'text-cyan-400',
    seasonBorder: 'border-cyan-500/20',
    sigBorder: 'border-cyan-500/10',
  },
} as const;

/* ── Static data ───────────────────────────────────── */

const services = [
  { label: 'Lawn Mowing', href: '/services/mowing' },
  { label: 'Herbicide', href: '/services/herbicide' },
  { label: 'Fertilization', href: '/services/fertilization' },
  { label: 'Weeding', href: '/services/weeding' },
  { label: 'Mulching', href: '/services/mulching' },
  { label: 'Garden Beds', href: '/services/garden-beds' },
  { label: 'Spring Cleanup', href: '/services/spring-cleanup' },
  { label: 'Fall Cleanup', href: '/services/fall-cleanup' },
  { label: 'Leaf Removal', href: '/services/leaf-removal' },
  { label: 'Gutter Cleaning', href: '/services/gutter-cleaning' },
  { label: 'Gutter Guards', href: '/services/gutter-guards' },
  { label: 'Aeration', href: '/services/aeration' },
  { label: 'Bush Trimming', href: '/services/pruning' },
  { label: 'Snow Removal', href: '/services/snow-removal' },
];

const cities = [
  { label: 'Madison', href: '/locations/madison' },
  { label: 'Middleton', href: '/locations/middleton' },
  { label: 'Waunakee', href: '/locations/waunakee' },
  { label: 'Sun Prairie', href: '/locations/sun-prairie' },
  { label: 'Monona', href: '/locations/monona' },
  { label: 'Fitchburg', href: '/locations/fitchburg' },
  { label: 'Verona', href: '/locations/verona' },
  { label: 'McFarland', href: '/locations/mcfarland' },
  { label: 'DeForest', href: '/locations/deforest' },
  { label: 'Cottage Grove', href: '/locations/cottage-grove' },
  { label: 'Oregon', href: '/locations/oregon' },
  { label: 'Stoughton', href: '/locations/stoughton' },
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Team', href: '/team' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Service Areas', href: '/service-areas' },
];

const seasonIcons: Record<Season, typeof Leaf> = { summer: Sun, fall: CloudRain, winter: Snowflake };
const seasonMessages: Record<Season, string> = {
  summer: 'Keep your lawn pristine all summer.',
  fall: 'Fall cleanup slots filling fast!',
  winter: 'Snow contracts available — book now!',
};

/* ── Component ─────────────────────────────────────── */

interface FooterProps {
  showCloser?: boolean;
  closerTitle?: string;
  closerDescription?: string;
}

export default function Footer({
  showCloser = true,
  closerTitle,
  closerDescription,
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { activeSeason } = useSeasonalTheme();
  const t = theme[activeSeason] ?? theme.summer;

  const { ref: closerRef, isInView: closerInView } = useScrollReveal();
  const { ref: gridRef, isInView: gridInView } = useScrollReveal();

  const SeasonIcon = seasonIcons[activeSeason];

  const trustItems = [
    '4.9★ Google',
    '500+ Properties',
    'Same Crew Every Visit',
    '24hr Response',
  ];

  return (
    <footer className="pb-24 lg:pb-0">

      {/* ═══════════ ZONE 1 — THE CLOSER ═══════════ */}
      {showCloser && (
        <section
          ref={closerRef}
          className={`relative py-20 md:py-28 overflow-hidden bg-gradient-to-br ${t.closerBg}`}
        >
          {/* Radial glow behind phone number */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(circle, ${t.glowColor}, transparent 70%)` }}
          />

          <div className="container mx-auto px-4 relative z-10 text-center">
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={closerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className={`text-sm font-medium ${t.accentText} mb-6 tracking-wide uppercase`}
            >
              {closerTitle || 'Call us. We pick up.'}
            </motion.p>

            {/* Phone Number — THE HERO */}
            <motion.a
              href="tel:608-535-6057"
              initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.97 }}
              animate={closerInView ? { opacity: 1, filter: 'blur(0px)', scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight hover:scale-[1.01] transition-transform duration-500 mb-8"
              style={{ textShadow: closerInView ? t.phoneGlow : 'none' }}
            >
              (608) 535-6057
            </motion.a>

            {/* Divider + subtext */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={closerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <div className="h-px w-12 bg-white/20" />
              <span className="text-white/40 text-sm">
                {closerDescription || 'Or get a written quote — free, no obligation'}
              </span>
              <div className="h-px w-12 bg-white/20" />
            </motion.div>

            {/* Shimmer CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={closerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-10"
            >
              <Button
                size="lg"
                className="text-base md:text-lg font-bold px-8 py-4 h-auto animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black rounded-xl shadow-xl shadow-amber-500/20 hover:shadow-2xl hover:shadow-amber-500/30 transition-shadow"
                asChild
              >
                <Link href="/contact">
                  Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

            {/* Trust micro-strip */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {trustItems.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 8 }}
                  animate={closerInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                  className="flex items-center gap-1.5 text-sm text-white/50"
                >
                  <CheckCircle2 className={`h-3.5 w-3.5 ${t.checkColor}`} />
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ ZONE 2 — THE INTELLIGENCE GRID ═══════════ */}
      <section className={`relative py-14 md:py-20 overflow-hidden bg-gradient-to-b ${t.gridBg}`}>
        <AmbientParticles density="sparse" />

        <div ref={gridRef} className="container mx-auto px-4 relative z-10">
          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">

            {/* ── Service Area Card (large) ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className={`relative md:col-span-2 lg:col-span-2 lg:row-span-2 bg-white/[0.03] backdrop-blur-sm border ${t.cardBorder} rounded-2xl p-6 ${t.cardHoverBorder} ${t.cardHoverShadow} hover:bg-white/[0.05] transition-all duration-500 overflow-hidden`}
            >
              {/* Abstract geo glow */}
              <div
                className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-30"
                style={{ background: `radial-gradient(circle, ${t.glowColor}, transparent 70%)` }}
              />
              <div className="relative">
                <div className="flex items-center gap-2 mb-5">
                  <MapPin className={`h-5 w-5 ${t.iconColor}`} />
                  <h3 className="text-white font-bold text-lg">Serving All of Dane County</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => (
                    <Link
                      key={city.href}
                      href={city.href}
                      className={`inline-flex items-center ${t.pillBg} border ${t.pillBorder} ${t.pillHover} text-white/70 hover:text-white rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300 hover:scale-105`}
                    >
                      {city.label}
                    </Link>
                  ))}
                </div>
                <div className={`mt-5 pt-4 border-t ${t.cardBorder}`}>
                  <div className="flex items-start gap-2">
                    <Phone className={`h-4 w-4 ${t.iconColor} mt-0.5 flex-shrink-0`} />
                    <div>
                      <a href="tel:608-535-6057" className={`text-white/70 ${t.linkHover} transition-colors text-sm font-medium`}>
                        (608) 535-6057
                      </a>
                      <p className={`${t.dimText} text-xs mt-0.5`}>Madison, Wisconsin</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Services Card (medium) ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`md:col-span-2 lg:col-span-2 bg-white/[0.03] backdrop-blur-sm border ${t.cardBorder} rounded-2xl p-6 ${t.cardHoverBorder} ${t.cardHoverShadow} hover:bg-white/[0.05] transition-all duration-500`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className={`h-5 w-5 ${t.iconColor}`} />
                <h3 className="text-white font-bold text-lg">Our Services</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {services.map((svc) => (
                  <Link
                    key={svc.href}
                    href={svc.href}
                    className={`inline-flex items-center ${t.pillBg} border ${t.pillBorder} ${t.pillHover} text-white/70 hover:text-white rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 hover:scale-105`}
                  >
                    {svc.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/services"
                className={`inline-flex items-center gap-1 text-sm font-semibold ${t.accentText} hover:underline underline-offset-4 group`}
              >
                View All Services
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* ── Company Card ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`bg-white/[0.03] backdrop-blur-sm border ${t.cardBorder} rounded-2xl p-6 ${t.cardHoverBorder} ${t.cardHoverShadow} hover:bg-white/[0.05] transition-all duration-500`}
            >
              <h3 className="text-white font-bold text-base mb-4">Company</h3>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-sm ${t.textColor} ${t.linkHover} transition-all duration-300 hover:translate-x-1 inline-block`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/residential"
                    className={`text-sm ${t.textColor} ${t.linkHover} transition-all duration-300 hover:translate-x-1 inline-block`}
                  >
                    Residential
                  </Link>
                </li>
                <li>
                  <Link
                    href="/commercial"
                    className={`text-sm ${t.textColor} ${t.linkHover} transition-all duration-300 hover:translate-x-1 inline-block`}
                  >
                    Commercial
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* ── Connect Card ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`bg-white/[0.03] backdrop-blur-sm border ${t.cardBorder} rounded-2xl p-6 ${t.cardHoverBorder} ${t.cardHoverShadow} hover:bg-white/[0.05] transition-all duration-500`}
            >
              <h3 className="text-white font-bold text-base mb-4">Connect</h3>

              {/* Social Icons */}
              <div className="flex gap-3 mb-5">
                <a
                  href="https://facebook.com/totalguardyardcare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 hover:scale-110 transition-all"
                  aria-label="Follow TotalGuard Yard Care on Facebook"
                >
                  <img alt="Facebook" className="h-9 w-9" loading="lazy" src="/lovable-uploads/a2985d40-e463-4243-b26d-149a047426fb.png" width="36" height="36" />
                </a>
                <a
                  href="https://www.instagram.com/tgyardcare/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 hover:scale-110 transition-all"
                  aria-label="Follow TotalGuard Yard Care on Instagram"
                >
                  <img alt="Instagram" className="h-9 w-9" loading="lazy" src="/lovable-uploads/0d24ae3b-c2eb-4565-a7ce-f97959422e02.png" width="36" height="36" />
                </a>
              </div>

              {/* Email */}
              <a
                href="mailto:totalguardllc@gmail.com"
                className={`flex items-center gap-2 text-sm ${t.textColor} ${t.linkHover} transition-colors mb-5`}
              >
                <Mail className={`h-4 w-4 ${t.iconColor} flex-shrink-0`} />
                <span className="break-all">totalguardllc@gmail.com</span>
              </a>

              {/* Seasonal Badge */}
              <div className={`flex items-center gap-2 ${t.seasonBg} ${t.seasonText} px-3 py-2 rounded-lg text-xs font-medium border ${t.seasonBorder}`}>
                <SeasonIcon className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{seasonMessages[activeSeason]}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ ZONE 3 — THE SIGNATURE ═══════════ */}
      <section className={`bg-gradient-to-b ${t.gridBg} border-t ${t.sigBorder}`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
              <img
                alt="TotalGuard Yard Care"
                src="/images/totalguard-logo-summer.png"
                className="h-12 w-auto"
                loading="lazy"
              />
            </Link>

            {/* Copyright */}
            <p className={`text-xs ${t.dimText} text-center`}>
              &copy; {currentYear} TotalGuard Yard Care LLC. All rights reserved. | Madison, Wisconsin
            </p>

            {/* Privacy */}
            <Link
              href="/privacy"
              className={`text-xs ${t.dimText} ${t.linkHover} transition-colors`}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
}
