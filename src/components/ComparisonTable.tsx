'use client';

import { Check, X, Shield, Clock, Users, FileText, Star, Undo2 } from 'lucide-react';
import Link from 'next/link';
import { AmbientParticles } from '@/components/AmbientParticles';

const rows = [
  { feature: 'Response Time', icon: Clock, us: '24 hours', them: '3–5 days' },
  { feature: 'Same Crew', icon: Users, us: 'Every visit', them: 'Random each time' },
  { feature: 'Insurance', icon: Shield, us: '$1M liability', them: 'Often none' },
  { feature: 'Written Quotes', icon: FileText, us: 'Always, before work starts', them: 'Verbal or none' },
  { feature: 'Quality Walk', icon: Star, us: 'After every job', them: 'Never' },
  { feature: 'Satisfaction Guarantee', icon: Undo2, us: '100% or free return visit', them: 'Limited or none' },
];

export function ComparisonTable() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Dark cinematic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070f0a] via-[#0a1a10] to-[#070f0a]" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] bg-emerald-500/[0.06] pointer-events-none" />

      {/* Season-adaptive particles */}
      <AmbientParticles density="sparse" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-emerald-400/80 text-sm font-medium tracking-widest uppercase mb-3">
              Why TotalGuard
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Not All Yard Care Is{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">
                Created Equal
              </span>
            </h2>
            <p className="text-white/50 text-base max-w-xl mx-auto">
              See why 500+ Madison homeowners trust TotalGuard over the competition.
            </p>
          </div>

          {/* Table */}
          <div className="rounded-xl border border-white/[0.06] overflow-hidden bg-white/[0.02] backdrop-blur-sm">
            {/* Table header */}
            <div className="grid grid-cols-3 border-b border-white/[0.06]">
              <div className="px-4 md:px-6 py-4 text-white/40 text-xs font-medium uppercase tracking-wider">
                Feature
              </div>
              <div className="px-4 md:px-6 py-4 text-center">
                <span className="text-emerald-400 text-xs md:text-sm font-bold uppercase tracking-wider">
                  TotalGuard
                </span>
              </div>
              <div className="px-4 md:px-6 py-4 text-center text-white/30 text-xs md:text-sm font-medium uppercase tracking-wider">
                Typical Company
              </div>
            </div>

            {/* Table rows */}
            {rows.map((row, i) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 border-b border-white/[0.04] last:border-b-0 ${
                    i % 2 === 0 ? 'bg-white/[0.01]' : ''
                  } hover:bg-white/[0.03] transition-colors duration-200`}
                >
                  {/* Feature name */}
                  <div className="flex items-center gap-2.5 px-4 md:px-6 py-4">
                    <Icon className="w-4 h-4 text-emerald-500/60 flex-shrink-0 hidden sm:block" />
                    <span className="text-white/80 text-sm font-medium">{row.feature}</span>
                  </div>

                  {/* TotalGuard value */}
                  <div className="flex items-center justify-center gap-2 px-3 md:px-6 py-4">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-emerald-300/90 text-xs md:text-sm font-medium">{row.us}</span>
                  </div>

                  {/* Competitor value */}
                  <div className="flex items-center justify-center gap-2 px-3 md:px-6 py-4">
                    <X className="w-3.5 h-3.5 text-red-400/60 flex-shrink-0" />
                    <span className="text-white/30 text-xs md:text-sm">{row.them}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-sm rounded-lg py-3.5 px-8 shadow-lg shadow-emerald-900/30 transition-all duration-200 hover:shadow-emerald-900/50"
            >
              Experience the Difference: Get a Free Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
