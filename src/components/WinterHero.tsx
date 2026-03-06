'use client';

import { Button } from '@/components/ui/button';
import Link from "next/link";
import Image from "next/image";
import { Phone, Shield, Star, CheckCircle2, Snowflake, ArrowRight, Zap } from 'lucide-react';
import heroSnowPlow from '@/assets/hero-snow-plow.png';
import { SEASONAL_STATS, SITE_STATS, getSeasonLabel } from '@/lib/seasonalConfig';

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export function WinterHero() {
  const stats = SEASONAL_STATS.winter;

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 overflow-hidden min-h-[600px] lg:min-h-[700px]">
      {/* Animated Snow Particles - Premium Effect with 3-tier variety */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none motion-reduce:hidden">
        {[...Array(40)].map((_, i) => {
          const startY = Math.random() * 100;
          const left = Math.random() * 100;
          // 3-tier system: 60% small, 30% medium, 10% large
          const tier = i < 24 ? 'small' : i < 36 ? 'medium' : 'large';
          const size =
            tier === 'small' ? 1 + Math.random() * 1 :
            tier === 'medium' ? 3 + Math.random() * 1 :
            5 + Math.random() * 2;
          const duration =
            tier === 'large' ? 10 + Math.random() * 5 :
            8 + Math.random() * 6;
          const delay = -(Math.random() * duration);
          const opacity = tier === 'large' ? 0.45 : 0.3;
          const filterStyle =
            tier === 'large' ? 'blur(0.5px) drop-shadow(0 0 6px rgba(147, 197, 253, 0.6))' :
            tier === 'medium' ? 'blur(0.5px) drop-shadow(0 0 3px rgba(147, 197, 253, 0.4))' :
            'blur(0.5px)';
          return (
            <div
              key={i}
              className={`absolute rounded-full animate-snow-fall ${tier === 'large' ? 'bg-white/45' : 'bg-white/30'}`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${startY}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                opacity,
                filter: filterStyle,
              }}
            />
          );
        })}
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Frost Overlay with Shimmer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.15)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(147,197,253,0.1)_0%,transparent_50%)]" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">

          {/* Content Column */}
          <div className="order-1 flex flex-col justify-center animate-fade-in">
            {/* Urgency Badge with Glow */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/25 to-cyan-500/25 backdrop-blur-md text-white px-4 py-2.5 rounded-full text-sm font-semibold mb-6 border border-cyan-400/40 w-fit shadow-lg shadow-cyan-500/20">
              <Snowflake className="h-4 w-4 text-cyan-300 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="text-cyan-100">{getSeasonLabel('winter')}</span>
              <span className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse" />
              <span className="text-amber-300 font-bold">Limited Contracts</span>
            </div>

            {/* Main Headline - Problem-First */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-5 leading-[1.1]">
              <span className="inline-block animate-fade-in" style={{ animationDelay: '0.1s' }}>Don't Get</span>{' '}
              <span className="inline-block bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent animate-fade-in animate-frost-text-glow bg-[length:200%_auto]" style={{ animationDelay: '0.2s', animation: 'gradient-shift 3s ease infinite, fade-in 0.3s ease-out 0.2s both' }}>
                Snowed In.
              </span>
            </h1>

            {/* Value Prop Subhead */}
            <p className="text-lg md:text-xl text-blue-100/90 mb-6 animate-fade-in leading-relaxed" style={{ animationDelay: '0.3s' }}>
              Lock in your snow contract before the first storm. We show up when others don't.
              <span className="block mt-1 text-cyan-300 font-semibold">Residential & commercial. 24/7 response.</span>
            </p>

            {/* Value Props with Hover Effects */}
            <ul className="space-y-3 mb-6 text-blue-100/90">
              {[
                'Seasonal contracts—no per-storm scramble',
                'Same driveway. Same crew. Every storm.',
                'Ice management and salting included'
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 group animate-fade-in hover:translate-x-1 transition-transform duration-200"
                  style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                >
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-base md:text-lg">{item}</span>
                </li>
              ))}
            </ul>

            {/* Trust Chips with Hover */}
            <div className="flex flex-wrap gap-2 mb-6 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              {['80+ Reviews', '4.9★ Rating', 'Fully Insured'].map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-white px-3.5 py-2 rounded-full text-sm font-medium border border-white/20 hover:bg-white/15 hover:border-cyan-400/40 transition-all duration-300 cursor-default"
                >
                  <Shield className="h-3.5 w-3.5 text-cyan-300" />
                  {chip}
                </span>
              ))}
            </div>

            {/* Premium CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Button
                size="lg"
                className="group animate-shimmer-btn bg-gradient-to-r from-primary via-cyan-400 to-primary bg-[length:200%_auto] hover:from-blue-600 hover:to-cyan-600 text-white text-base font-bold px-7 h-14 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] tap-target relative overflow-hidden"
                asChild
              >
                <Link href="/contact?service=snow-premium">
                  <span className="relative z-10 flex items-center">
                    Get My Free Quote
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-white/30 hover:border-cyan-400/50 hover:shadow-cyan-400/20 hover:shadow-lg bg-cyan-500/10 text-white hover:bg-cyan-500/20 text-base font-bold px-7 h-14 transition-all duration-300 tap-target backdrop-blur-md"
                asChild
              >
                <a href="tel:608-535-6057">
                  <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  (608) 535-6057
                </a>
              </Button>
            </div>

            {/* Social Proof with Animation */}
            <div className="flex flex-wrap items-center gap-4 pt-2 animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {['J', 'M', 'S', '+'].map((letter, i) => (
                    <div
                      key={letter}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white ring-2 ring-slate-800 shadow-lg hover:scale-110 transition-transform cursor-default"
                      style={{
                        background: i === 3
                          ? 'linear-gradient(135deg, #64748b, #475569)'
                          : `linear-gradient(135deg, ${['#3b82f6', '#06b6d4', '#0ea5e9'][i]}, ${['#1d4ed8', '#0891b2', '#0284c7'][i]})`
                      }}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm leading-tight">{SITE_STATS.totalClients}+ Clients</span>
                  <span className="text-blue-200/60 text-xs">Madison Area</span>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-white/20" />

              <div className="hidden sm:flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400 hover:scale-125 transition-transform" />
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm leading-tight">{SITE_STATS.googleRating}/5</span>
                  <span className="text-blue-200/60 text-xs">Google</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image Column */}
          <div className="order-2 relative lg:flex lg:items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {/* Premium Glow Effect */}
            <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-3xl animate-pulse" />

            <div className="relative w-full group">
              <Image
                src={heroSnowPlow}
                alt="Professional snow plow truck clearing driveway in Madison Wisconsin - TotalGuard Yard Care snow removal service"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover aspect-[16/10] border border-white/10 group-hover:scale-[1.02] transition-transform duration-500"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Floating Stats Card with Animation */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-2xl border border-slate-100 hidden sm:block animate-fade-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-black text-lg leading-none">{stats.heroStat.value}</p>
                    <p className="text-slate-500 text-[11px] font-semibold uppercase tracking-wide">{stats.heroStat.label}</p>
                  </div>
                </div>
              </div>

              {/* Response Badge with Pulse */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-full shadow-xl text-sm font-bold hidden sm:flex items-center gap-2 animate-fade-in hover:scale-105 transition-transform" style={{ animationDelay: '0.5s' }}>
                <Zap className="h-4 w-4 text-yellow-300 animate-pulse" />
                {stats.badgeText}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frost Edge Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 100px rgba(0,0,0,0.2)' }} />

      {/* Custom Animations */}
      <style>{`
        @keyframes snow-fall {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.8; }
          25% { transform: translateY(25vh) translateX(10px) rotate(90deg); opacity: 1; }
          50% { transform: translateY(50vh) translateX(-5px) rotate(180deg); opacity: 1; }
          75% { transform: translateY(75vh) translateX(8px) rotate(270deg); opacity: 0.9; }
          100% { transform: translateY(100vh) translateX(0) rotate(360deg); opacity: 0; }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-snow-fall {
          animation: snow-fall linear infinite;
        }
      `}</style>
    </section>
  );
}
