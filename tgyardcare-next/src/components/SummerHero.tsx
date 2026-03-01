'use client';

import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Phone, Shield, Star, CheckCircle2, Sun, ArrowRight, AlertTriangle } from 'lucide-react';
import heroSummerMowing from '@/assets/hero-summer-mowing.jpg';
import { SITE_STATS, getSeasonLabel } from '@/lib/seasonalConfig';
import { MobileValueChips } from '@/components/MobileValueStrip';

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export function SummerHero() {
  return (
    <section className="relative bg-[#1a3a2a] overflow-hidden">
      {/* MOBILE-FIRST: Reduced min-height for faster value delivery */}
      <div className="min-h-[500px] sm:min-h-[550px] lg:min-h-[650px]">

        {/* ═══ TIER 1: Ambient Orbs — large, blurred, ultra-slow drift ═══ */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none motion-reduce:hidden">
          <div className="absolute -top-20 -right-20 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-green-800/20 rounded-full blur-3xl animate-drift-1" style={{ animationDuration: '20s' }} />
          <div className="absolute bottom-0 left-0 w-[200px] lg:w-[400px] h-[200px] lg:h-[400px] bg-green-900/15 rounded-full blur-3xl animate-drift-2" style={{ animationDuration: '24s' }} />
          <div className="absolute top-[30%] left-[40%] w-[250px] lg:w-[350px] h-[250px] lg:h-[350px] bg-emerald-800/10 rounded-full blur-3xl animate-drift-3 hidden sm:block" style={{ animationDuration: '18s' }} />
          <div className="absolute top-[10%] right-[30%] w-[180px] lg:w-[280px] h-[180px] lg:h-[280px] bg-green-700/8 rounded-full blur-3xl animate-drift-1 hidden lg:block" style={{ animationDuration: '22s', animationDelay: '-6s' }} />
        </div>

        {/* ═══ TIER 2: Mid-layer dots — medium, moderate speed, fill space ═══ */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none motion-reduce:hidden hidden sm:block">
          {[
            { top: '5%', left: '12%', s: 3, o: 0.2, d: '8s', dl: '-1s', c: 'bg-green-400' },
            { top: '15%', left: '45%', s: 2.5, o: 0.25, d: '7s', dl: '-3s', c: 'bg-emerald-400' },
            { top: '25%', right: '20%', s: 3.5, o: 0.15, d: '9s', dl: '-5s', c: 'bg-green-300' },
            { top: '40%', left: '8%', s: 2, o: 0.2, d: '10s', dl: '-2s', c: 'bg-lime-400' },
            { top: '50%', left: '55%', s: 3, o: 0.18, d: '8s', dl: '-7s', c: 'bg-green-400' },
            { top: '60%', right: '12%', s: 2.5, o: 0.22, d: '7s', dl: '-4s', c: 'bg-emerald-300' },
            { top: '70%', left: '25%', s: 2, o: 0.2, d: '9s', dl: '-6s', c: 'bg-green-400' },
            { top: '80%', right: '35%', s: 3, o: 0.15, d: '11s', dl: '-1s', c: 'bg-emerald-400' },
            { top: '35%', left: '70%', s: 2.5, o: 0.2, d: '8s', dl: '-8s', c: 'bg-green-300' },
            { top: '55%', left: '35%', s: 2, o: 0.18, d: '10s', dl: '-3s', c: 'bg-lime-300' },
            { top: '12%', right: '45%', s: 3, o: 0.16, d: '9s', dl: '-5s', c: 'bg-green-400' },
            { top: '90%', left: '60%', s: 2.5, o: 0.2, d: '7s', dl: '-2s', c: 'bg-emerald-400' },
          ].map((dot, i) => {
            const { s, o, d, dl, c, ...pos } = dot;
            return (
              <div
                key={`mid-${i}`}
                className={`absolute ${c} rounded-full animate-float-particle`}
                style={{
                  ...pos,
                  width: s,
                  height: s,
                  opacity: o,
                  animationDuration: d,
                  animationDelay: dl,
                  filter: 'blur(0.5px) drop-shadow(0 0 6px currentColor)',
                }}
              />
            );
          })}
        </div>

        {/* ═══ TIER 3: Foreground sparkles — tiny, bright, quick movement ═══ */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none motion-reduce:hidden">
          {[
            { top: '8%', left: '20%', s: 1.5, o: 0.35, d: '5s', dl: '0s' },
            { top: '22%', right: '18%', s: 1, o: 0.3, d: '4s', dl: '-2s' },
            { top: '45%', left: '15%', s: 1.5, o: 0.3, d: '5s', dl: '-1s' },
            { top: '65%', right: '22%', s: 1, o: 0.35, d: '4s', dl: '-3s' },
            { top: '30%', left: '65%', s: 1.5, o: 0.25, d: '6s', dl: '-4s' },
            { top: '75%', left: '45%', s: 1, o: 0.3, d: '5s', dl: '-2s' },
            { top: '18%', left: '80%', s: 1.5, o: 0.3, d: '4s', dl: '-5s' },
            { top: '85%', right: '40%', s: 1, o: 0.25, d: '6s', dl: '-1s' },
          ].map((dot, i) => {
            const { s, o, d, dl, ...pos } = dot;
            return (
              <div
                key={`fg-${i}`}
                className="absolute bg-white rounded-full animate-float-particle"
                style={{
                  ...pos,
                  width: s,
                  height: s,
                  opacity: o,
                  animationDuration: d,
                  animationDelay: dl,
                  filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.6))',
                }}
              />
            );
          })}
        </div>

        {/* Cinematic vignette overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.25)_100%)] pointer-events-none" />

        {/* Depth gradient — subtle bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25 pointer-events-none" />

        {/* Subtle Grid Pattern - hidden on mobile */}
        <div className="absolute inset-0 opacity-[0.02] hidden lg:block pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(34,197,94,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        {/* Main Content - MOBILE-FIRST OPTIMIZED */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10 py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center max-w-7xl mx-auto">

            {/* Content Column - MOBILE FIRST */}
            <div className="order-1 flex flex-col justify-center">
              {/* Season Badge - Compact on mobile */}
              <div className="inline-flex items-center gap-2 bg-green-800/50 backdrop-blur-md text-white px-3 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 lg:mb-6 border border-green-500/30 w-fit">
                <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-400 animate-spin" style={{ animationDuration: '10s' }} />
                <span className="text-green-100">{getSeasonLabel('summer')}</span>
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-300 font-bold">Booking Now</span>
              </div>

              {/* Problem-First Headline - Tighter on mobile */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-3 sm:mb-4 lg:mb-5 leading-[1.15] tracking-tight">
                <span className="inline-block">Tired of Lawn Guys</span>{' '}
                <span className="inline-block text-amber-400">
                  Who Don't Show Up?
                </span>
              </h1>

              {/* Value Prop Subhead - Scannable on mobile */}
              <p className="text-base sm:text-lg md:text-xl text-green-100/90 mb-4 lg:mb-6 leading-relaxed">
                We show up. Same crew. Same day. Every week.
                <span className="block mt-1 text-green-300 font-semibold">No excuses. No surprises.</span>
              </p>

              {/* MOBILE: Compact value chips instead of full list */}
              <div className="lg:hidden mb-4">
                <MobileValueChips />
              </div>

              {/* DESKTOP: Outcome-Focused Benefits */}
              <ul className="hidden lg:block space-y-3 mb-6 text-green-100/90">
                {[
                  'Weekly mowing—same crew, same schedule, on time',
                  'One call handles your entire property',
                  'Flat pricing. No hidden fees. No surprises.'
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-base md:text-lg">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Trust Chips - Hidden on mobile (shown in value chips above) */}
              <div className="hidden lg:flex flex-wrap gap-2 mb-6">
                {['60+ Google Reviews', '4.9★ Rating', 'Fully Insured'].map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 bg-green-800/40 backdrop-blur-md text-green-100 px-3.5 py-2 rounded-full text-sm font-medium border border-green-500/40 hover:bg-green-700/50 hover:border-green-400/50 transition-all duration-300 cursor-default"
                  >
                    <Shield className="h-3.5 w-3.5 text-green-400" />
                    {chip}
                  </span>
                ))}
              </div>

              {/* CTAs - MOBILE OPTIMIZED: Larger touch targets, stacked */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4 lg:mb-6">
                <Button
                  size="lg"
                  className="group bg-amber-500 hover:bg-amber-400 text-black text-base font-bold px-6 sm:px-7 h-12 sm:h-14 shadow-xl shadow-amber-900/40 hover:shadow-2xl hover:shadow-amber-800/50 transition-all duration-300 hover:scale-[1.02] tap-target w-full sm:w-auto"
                  asChild
                >
                  <Link href="/contact?service=mowing">
                    <span className="flex items-center justify-center">
                      Get My Free Quote
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="group border-2 border-green-500/50 bg-green-800/20 text-green-100 hover:bg-green-700/30 hover:border-green-400 text-base font-bold px-6 sm:px-7 h-12 sm:h-14 transition-all duration-300 tap-target backdrop-blur-md w-full sm:w-auto"
                  asChild
                >
                  <a href="tel:608-535-6057">
                    <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    (608) 535-6057
                  </a>
                </Button>
              </div>

              {/* Social Proof - Compact on mobile */}
              <div className="flex flex-wrap items-center gap-3 lg:gap-4 pt-2">
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="flex -space-x-2">
                    {['J', 'M', 'S', '+'].map((letter, i) => (
                      <div
                        key={letter}
                        className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-[10px] lg:text-xs font-bold text-white ring-2 ring-[#1a3a2a] shadow-lg"
                        style={{
                          background: i === 3
                            ? 'linear-gradient(135deg, #475569, #334155)'
                            : `linear-gradient(135deg, ${['#22c55e', '#16a34a', '#15803d'][i]}, ${['#16a34a', '#15803d', '#166534'][i]})`
                        }}
                      >
                        {letter}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-xs lg:text-sm leading-tight">{SITE_STATS.totalClients}+ Clients</span>
                    <span className="text-green-400/60 text-[10px] lg:text-xs">Madison Area</span>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-8 lg:h-10 bg-green-600/30" />

                <div className="hidden sm:flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 lg:h-4 lg:w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-xs lg:text-sm leading-tight">{SITE_STATS.googleRating}/5</span>
                    <span className="text-green-400/60 text-[10px] lg:text-xs">60+ Reviews</span>
                  </div>
                </div>
              </div>
            </div>

          {/* Hero Image Column */}
          <div className="order-2 relative lg:flex lg:items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {/* Subtle Glow Effect */}
            <div className="absolute -inset-6 bg-green-600/10 rounded-3xl blur-3xl" />

            <div className="relative w-full group">
              <img
                src={imgSrc(heroSummerMowing)}
                alt="Professional lawn mowing service with commercial mower creating perfect striped patterns in Madison Wisconsin"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover aspect-[16/10] border border-green-500/20 group-hover:scale-[1.02] transition-transform duration-500"
                loading="eager"
                fetchPriority="high"
              />

              {/* Floating Stats Card */}
              <div className="absolute -bottom-4 -left-4 bg-[#1a3a2a] rounded-xl p-4 shadow-2xl border border-green-600/30 hidden sm:block animate-fade-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-green-600 shadow-lg">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-black text-lg leading-none">Same Day</p>
                    <p className="text-green-400/70 text-[11px] font-semibold uppercase tracking-wide">Quote Response</p>
                  </div>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute -top-3 -right-3 bg-amber-500 text-black px-4 py-2 rounded-full shadow-xl text-sm font-bold hidden sm:flex items-center gap-2 animate-fade-in hover:scale-105 transition-transform" style={{ animationDelay: '0.5s' }}>
                <AlertTriangle className="h-4 w-4" />
                Routes Filling Fast
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.4; }
          50% { transform: translateY(-10px) translateX(-5px); opacity: 0.3; }
          75% { transform: translateY(-30px) translateX(5px); opacity: 0.35; }
        }
        .animate-float-particle {
          animation: float-particle ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
