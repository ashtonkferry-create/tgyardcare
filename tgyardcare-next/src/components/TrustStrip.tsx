'use client';

import { Star, Users, Shield, Clock } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { cn } from '@/lib/utils';
import { ScrollReveal } from './ScrollReveal';

const seasonalAccent = {
  summer: 'text-emerald-400',
  fall: 'text-amber-400',
  winter: 'text-cyan-400',
} as const;

const seasonalBg = {
  summer: 'from-[#0f2818] via-[#1a3a2a] to-[#0f2818]',
  fall: 'from-stone-900 via-amber-950/50 to-stone-900',
  winter: 'from-slate-900 via-blue-950/50 to-slate-900',
} as const;

const seasonalBorder = {
  summer: 'border-emerald-500/10',
  fall: 'border-amber-500/10',
  winter: 'border-cyan-500/10',
} as const;

interface TrustStripProps {
  variant?: 'dark' | 'light';
  className?: string;
}

const stats = [
  { icon: Star, value: 4.9, suffix: '★', label: 'Google Rating', decimals: 1 },
  { icon: Users, value: 80, suffix: '+', label: 'Verified Reviews', decimals: 0 },
  { icon: Shield, value: 100, suffix: '%', label: 'Satisfaction Guarantee', decimals: 0 },
  { icon: Clock, value: 24, suffix: 'hr', label: 'Response Time', decimals: 0 },
];

export function TrustStrip({ variant = 'dark', className }: TrustStripProps) {
  const { activeSeason } = useSeasonalTheme();
  const accent = seasonalAccent[activeSeason];

  if (variant === 'dark') {
    return (
      <section className={cn(
        `py-5 bg-gradient-to-r ${seasonalBg[activeSeason]} border-y ${seasonalBorder[activeSeason]}`,
        className
      )}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-6 md:gap-14">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="flex items-center gap-2.5">
                    <Icon className={cn('h-5 w-5', accent)} />
                    <span className="text-white font-bold text-lg">
                      <AnimatedCounter
                        end={stat.value}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                      />
                    </span>
                    <span className="text-white/50 text-sm hidden sm:inline">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section className={cn(
      `py-5 bg-gradient-to-r ${seasonalBg[activeSeason]} border-y ${seasonalBorder[activeSeason]}`,
      className
    )}>
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-6 md:gap-14">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex items-center gap-2.5">
                  <Icon className={cn('h-5 w-5', accent)} />
                  <span className="text-white font-bold text-lg">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </span>
                  <span className="text-white/50 text-sm hidden sm:inline">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
