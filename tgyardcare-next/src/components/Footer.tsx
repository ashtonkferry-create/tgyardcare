'use client';

import Link from "next/link";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, CheckCircle2, Mail, Snowflake, Leaf, Sun, CloudRain } from "lucide-react";
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
    // Zone 2 + 3
    footerBg: 'bg-[#070f0a]',
    linkHover: 'hover:text-emerald-400',
    iconColor: 'text-emerald-400',
    textColor: 'text-emerald-100/50',
    dimText: 'text-emerald-100/30',
    seasonBg: 'bg-emerald-500/10',
    seasonText: 'text-emerald-400',
    seasonBorder: 'border-emerald-500/20',
    sigBorder: 'border-emerald-500/10',
  },
  fall: {
    closerBg: 'from-stone-900 via-amber-950 to-stone-900',
    glowColor: 'rgba(245,158,11,0.08)',
    phoneGlow: '0 0 60px rgba(245,158,11,0.15)',
    checkColor: 'text-amber-400',
    accentText: 'text-amber-400',
    footerBg: 'bg-[#0a0908]',
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
    footerBg: 'bg-[#060810]',
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

const lawnCareServices = [
  { label: 'Lawn Mowing', href: '/services/mowing' },
  { label: 'Fertilization', href: '/services/fertilization' },
  { label: 'Herbicide', href: '/services/herbicide' },
  { label: 'Weeding', href: '/services/weeding' },
  { label: 'Mulching', href: '/services/mulching' },
  { label: 'Garden Beds', href: '/services/garden-beds' },
  { label: 'Bush Trimming', href: '/services/pruning' },
];

const specialtyServices = [
  { label: 'Spring Cleanup', href: '/services/spring-cleanup' },
  { label: 'Fall Cleanup', href: '/services/fall-cleanup' },
  { label: 'Leaf Removal', href: '/services/leaf-removal' },
  { label: 'Aeration', href: '/services/aeration' },
  { label: 'Gutter Cleaning', href: '/services/gutter-cleaning' },
  { label: 'Gutter Guards', href: '/services/gutter-guards' },
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

      {/* ═══════════ ZONE 2 — LINK GRID ═══════════ */}
      <section className={`relative py-12 md:py-16 overflow-hidden ${t.footerBg}`}>
        <AmbientParticles density="sparse" />

        <div ref={gridRef} className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">

            {/* Column 1: LAWN CARE */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
            >
              <h4 className={`text-[11px] font-bold uppercase tracking-[0.2em] ${t.accentText} mb-4`}>
                Lawn Care
              </h4>
              <ul className="space-y-2">
                {lawnCareServices.map((svc) => (
                  <li key={svc.href}>
                    <Link
                      href={svc.href}
                      className={`text-[13px] ${t.textColor} ${t.linkHover} transition-colors duration-200 inline-block`}
                    >
                      {svc.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 2: SEASONAL & SPECIALTY */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.06 }}
            >
              <h4 className={`text-[11px] font-bold uppercase tracking-[0.2em] ${t.accentText} mb-4`}>
                Seasonal
              </h4>
              <ul className="space-y-2">
                {specialtyServices.map((svc) => (
                  <li key={svc.href}>
                    <Link
                      href={svc.href}
                      className={`text-[13px] ${t.textColor} ${t.linkHover} transition-colors duration-200 inline-block`}
                    >
                      {svc.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className={`inline-flex items-center gap-1 text-[13px] font-semibold ${t.accentText} mt-3 group`}
              >
                See all services
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Column 3: SERVICE AREAS */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.12 }}
            >
              <h4 className={`text-[11px] font-bold uppercase tracking-[0.2em] ${t.accentText} mb-4`}>
                Dane County
              </h4>
              <ul className="space-y-2">
                {cities.map((city) => (
                  <li key={city.href}>
                    <Link
                      href={city.href}
                      className={`text-[13px] ${t.textColor} ${t.linkHover} transition-colors duration-200 inline-block`}
                    >
                      {city.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/service-areas"
                className={`inline-flex items-center gap-1 text-[13px] font-semibold ${t.accentText} mt-3 group`}
              >
                All areas
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Column 4: COMPANY */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.18 }}
            >
              <h4 className={`text-[11px] font-bold uppercase tracking-[0.2em] ${t.accentText} mb-4`}>
                Company
              </h4>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-[13px] ${t.textColor} ${t.linkHover} transition-colors duration-200 inline-block`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/residential"
                    className={`text-[13px] ${t.textColor} ${t.linkHover} transition-colors duration-200 inline-block`}
                  >
                    Residential
                  </Link>
                </li>
                <li>
                  <Link
                    href="/commercial"
                    className={`text-[13px] ${t.textColor} ${t.linkHover} transition-colors duration-200 inline-block`}
                  >
                    Commercial
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Column 5: CONNECT */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.24 }}
            >
              <h4 className={`text-[11px] font-bold uppercase tracking-[0.2em] ${t.accentText} mb-4`}>
                Connect
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="tel:608-535-6057"
                    className={`text-[13px] text-white/80 ${t.linkHover} transition-colors inline-flex items-center gap-2`}
                  >
                    <Phone className={`h-3.5 w-3.5 ${t.iconColor}`} />
                    (608) 535-6057
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:totalguardllc@gmail.com"
                    className={`text-[13px] ${t.textColor} ${t.linkHover} transition-colors inline-flex items-center gap-2`}
                  >
                    <Mail className={`h-3.5 w-3.5 ${t.iconColor}`} />
                    Email Us
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className={`text-[13px] ${t.textColor} ${t.linkHover} transition-colors inline-block`}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className={`text-[13px] ${t.textColor} ${t.linkHover} transition-colors inline-block`}
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>

              {/* Social */}
              <div className="flex gap-2.5 mt-4">
                <a
                  href="https://facebook.com/totalguardyardcare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 hover:scale-110 transition-all"
                  aria-label="Facebook"
                >
                  <img alt="Facebook" className="h-7 w-7" loading="lazy" src="/lovable-uploads/a2985d40-e463-4243-b26d-149a047426fb.png" width="28" height="28" />
                </a>
                <a
                  href="https://www.instagram.com/tgyardcare/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 hover:scale-110 transition-all"
                  aria-label="Instagram"
                >
                  <img alt="Instagram" className="h-7 w-7" loading="lazy" src="/lovable-uploads/0d24ae3b-c2eb-4565-a7ce-f97959422e02.png" width="28" height="28" />
                </a>
              </div>

              {/* Seasonal Badge */}
              <div className={`inline-flex items-center gap-1.5 ${t.seasonBg} ${t.seasonText} px-2.5 py-1 rounded-full text-[10px] font-medium border ${t.seasonBorder} mt-4`}>
                <SeasonIcon className="h-3 w-3 flex-shrink-0" />
                <span>{seasonMessages[activeSeason]}</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════ ZONE 3 — SIGNATURE ═══════════ */}
      <section className={`${t.footerBg} border-t ${t.sigBorder}`}>
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col items-center gap-5 max-w-6xl mx-auto">

            {/* Logo — prominent */}
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <img
                alt="TotalGuard Yard Care"
                src="/images/totalguard-banner-logo.png"
                className="h-14 md:h-16 w-auto"
                loading="lazy"
              />
            </Link>

            {/* Tagline */}
            <p className={`text-xs ${t.dimText} text-center tracking-wide`}>
              Madison&apos;s reliability-first lawn care company &mdash; serving all of Dane County
            </p>

            {/* Copyright */}
            <p className={`text-[11px] ${t.dimText} text-center`}>
              &copy; {currentYear} TotalGuard Yard Care LLC. All rights reserved.
            </p>

          </div>
        </div>
      </section>
    </footer>
  );
}
