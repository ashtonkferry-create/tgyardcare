'use client';

import { Shield, FileCheck, Award } from "lucide-react";
import { ScrollReveal } from './ScrollReveal';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { cn } from '@/lib/utils';

const seasonalBg = {
  summer: 'from-emerald-950/80 via-emerald-900/40 to-emerald-950/80',
  fall: 'from-amber-950/80 via-amber-900/40 to-amber-950/80',
  winter: 'from-blue-950/80 via-blue-900/40 to-blue-950/80',
} as const;

const seasonalBorder = {
  summer: 'border-emerald-500/20',
  fall: 'border-amber-500/20',
  winter: 'border-cyan-500/20',
} as const;

const seasonalIcon = {
  summer: 'text-emerald-400',
  fall: 'text-amber-400',
  winter: 'text-cyan-400',
} as const;

const seasonalIconBg = {
  summer: 'bg-emerald-500/15',
  fall: 'bg-amber-500/15',
  winter: 'bg-cyan-500/15',
} as const;

/**
 * Insurance trust banner for commercial pages
 * Displays insurance and liability coverage information prominently
 */
export function CommercialInsuranceBanner() {
  const { activeSeason } = useSeasonalTheme();

  return (
    <section className={cn(
      'py-8 bg-gradient-to-r border-y',
      seasonalBg[activeSeason],
      seasonalBorder[activeSeason]
    )}>
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-3">
              <div className={cn('p-2.5 rounded-full', seasonalIconBg[activeSeason])}>
                <Shield className={cn('h-5 w-5', seasonalIcon[activeSeason])} />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-sm">Fully Insured</p>
                <p className="text-white/50 text-xs">$1M liability coverage</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-white/10" />

            <div className="flex items-center gap-3">
              <div className={cn('p-2.5 rounded-full', seasonalIconBg[activeSeason])}>
                <FileCheck className={cn('h-5 w-5', seasonalIcon[activeSeason])} />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-sm">Certificate of Insurance</p>
                <p className="text-white/50 text-xs">Available same-day</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-white/10" />

            <div className="flex items-center gap-3">
              <div className={cn('p-2.5 rounded-full', seasonalIconBg[activeSeason])}>
                <Award className={cn('h-5 w-5', seasonalIcon[activeSeason])} />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-sm">500+ Clients Served</p>
                <p className="text-white/50 text-xs">Madison area businesses trust us</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
