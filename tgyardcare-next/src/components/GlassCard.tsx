'use client';

import { cn } from '@/lib/utils';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { ReactNode } from 'react';

const seasonalHover = {
  summer: 'hover:border-emerald-500/30 hover:shadow-emerald-500/10',
  fall: 'hover:border-amber-500/30 hover:shadow-amber-500/10',
  winter: 'hover:border-cyan-500/30 hover:shadow-cyan-500/10',
} as const;

const seasonalAccentBorder = {
  summer: 'border-l-emerald-500/60',
  fall: 'border-l-amber-500/60',
  winter: 'border-l-cyan-500/60',
} as const;

interface GlassCardProps {
  children: ReactNode;
  variant?: 'default' | 'dark' | 'accent';
  hover?: 'lift' | 'glow' | 'scale' | 'none';
  accentBorder?: boolean;
  className?: string;
}

export function GlassCard({
  children,
  variant = 'default',
  hover = 'lift',
  accentBorder = false,
  className,
}: GlassCardProps) {
  const { activeSeason } = useSeasonalTheme();

  const base = {
    default: 'bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] shadow-lg',
    dark: 'bg-black/30 backdrop-blur-xl border border-white/[0.05] shadow-lg',
    accent: 'bg-primary/5 backdrop-blur-xl border border-primary/20 shadow-lg',
  };

  const hoverStyle = {
    lift: `hover:-translate-y-1.5 hover:shadow-2xl ${seasonalHover[activeSeason]} transition-all duration-300`,
    glow: `${seasonalHover[activeSeason]} hover:shadow-xl transition-all duration-300`,
    scale: `hover:scale-[1.02] hover:shadow-2xl ${seasonalHover[activeSeason]} transition-all duration-300`,
    none: '',
  };

  return (
    <div
      className={cn(
        'rounded-xl p-6',
        base[variant],
        hoverStyle[hover],
        accentBorder && `border-l-4 ${seasonalAccentBorder[activeSeason]}`,
        className
      )}
    >
      {children}
    </div>
  );
}
