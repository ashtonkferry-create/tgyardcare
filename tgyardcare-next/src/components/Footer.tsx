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
                    totalguardllc@gmail.com
                  </a>
                </li>
              </ul>

              {/* Social — premium glass row */}
              <p className={`text-[10px] uppercase tracking-[0.15em] ${t.dimText} font-semibold mt-5 mb-2`}>
                Follow Us
              </p>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com/totalguardyardcare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-center justify-center h-10 w-10 rounded-lg border ${t.seasonBorder} ${t.seasonBg} hover:border-white/20 transition-all duration-300`}
                  aria-label="Facebook"
                >
                  <svg className={`h-4.5 w-4.5 ${t.iconColor} group-hover:scale-110 transition-transform`} fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a
                  href="https://www.instagram.com/tgyardcare/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-center justify-center h-10 w-10 rounded-lg border ${t.seasonBorder} ${t.seasonBg} hover:border-white/20 transition-all duration-300`}
                  aria-label="Instagram"
                >
                  <svg className={`h-4.5 w-4.5 ${t.iconColor} group-hover:scale-110 transition-transform`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a
                  href="https://g.co/kgs/totalguardyardcare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-center justify-center h-10 w-10 rounded-lg border ${t.seasonBorder} ${t.seasonBg} hover:border-white/20 transition-all duration-300`}
                  aria-label="Google Reviews"
                >
                  <svg className={`h-4.5 w-4.5 ${t.iconColor} group-hover:scale-110 transition-transform`} fill="currentColor" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
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
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 max-w-6xl mx-auto">

            {/* Left — Logo + tagline */}
            <div className="flex items-center gap-3">
              <Link href="/" className="hover:opacity-80 transition-opacity shrink-0">
                <img
                  alt="TotalGuard Yard Care"
                  src="/images/totalguard-logo-full.png"
                  className="h-28 md:h-32 lg:h-36 w-auto"
                  loading="lazy"
                />
              </Link>
              <span className={`text-xs ${t.dimText} tracking-wide hidden sm:inline`}>
                Madison&apos;s reliability-first lawn care &mdash; serving all of Dane County
              </span>
            </div>

            {/* Right — utility links + copyright */}
            <div className="flex items-center gap-4 shrink-0">
              <Link href="/privacy" className={`text-[11px] ${t.dimText} hover:text-white/60 transition-colors`}>
                Privacy
              </Link>
              <span className={`text-[11px] ${t.dimText}`}>&middot;</span>
              <Link href="/contact" className={`text-[11px] ${t.dimText} hover:text-white/60 transition-colors`}>
                Contact
              </Link>
              <span className={`text-[11px] ${t.dimText}`}>&middot;</span>
              <p className={`text-[11px] ${t.dimText}`}>
                &copy; {currentYear} TotalGuard Yard Care LLC
              </p>
            </div>

          </div>
        </div>
      </section>
    </footer>
  );
}
