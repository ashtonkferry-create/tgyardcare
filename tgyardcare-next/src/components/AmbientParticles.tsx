'use client';

import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { useMemo } from 'react';

/**
 * AmbientParticles — Season-adaptive floating particle overlay.
 *
 * Renders CSS-only animated dots/orbs that drift organically.
 * Summer: green luminous pollen. Fall: amber fireflies. Winter: soft white flurries.
 *
 * Each particle gets a unique randomized animation path via per-particle
 * CSS custom properties, so movement feels scattered and natural.
 *
 * Props:
 *  - density: 'sparse' | 'normal' | 'dense' — particle count (default: normal)
 *  - className: extra wrapper classes
 *
 * Performance: Pure CSS animations, no JS loop. motion-reduce respected.
 * Orbs hidden on mobile to save GPU paint.
 */

type Density = 'sparse' | 'normal' | 'dense';

interface Props {
  density?: Density;
  className?: string;
}

// Season-specific color palettes
const SEASON_COLORS = {
  summer: {
    orbs: ['bg-emerald-500/[0.04]', 'bg-green-500/[0.03]', 'bg-lime-500/[0.03]'],
    dots: ['bg-green-400', 'bg-emerald-400', 'bg-lime-400', 'bg-green-300', 'bg-emerald-300'],
    sparkles: 'bg-white',
    glow: 'drop-shadow(0 0 6px rgba(34,197,94,0.5))',
    sparkleGlow: 'drop-shadow(0 0 3px rgba(255,255,255,0.6))',
  },
  fall: {
    orbs: ['bg-amber-500/[0.04]', 'bg-orange-500/[0.03]', 'bg-yellow-500/[0.03]'],
    dots: ['bg-amber-400', 'bg-orange-400', 'bg-yellow-400', 'bg-amber-300', 'bg-orange-300'],
    sparkles: 'bg-amber-200',
    glow: 'drop-shadow(0 0 6px rgba(251,191,36,0.5))',
    sparkleGlow: 'drop-shadow(0 0 3px rgba(251,191,36,0.5))',
  },
  winter: {
    orbs: ['bg-sky-400/[0.03]', 'bg-blue-400/[0.03]', 'bg-white/[0.02]'],
    dots: ['bg-sky-300', 'bg-blue-300', 'bg-white', 'bg-sky-200', 'bg-blue-200'],
    sparkles: 'bg-white',
    glow: 'drop-shadow(0 0 6px rgba(186,230,253,0.4))',
    sparkleGlow: 'drop-shadow(0 0 3px rgba(255,255,255,0.5))',
  },
} as const;

// Deterministic pseudo-random with good scatter (splitmix-style hash)
function hash(a: number): number {
  a = (a + 0x9e3779b9) | 0;
  a = Math.imul(a ^ (a >>> 16), 0x85ebca6b);
  a = Math.imul(a ^ (a >>> 13), 0xc2b2ae35);
  return (a ^ (a >>> 16)) >>> 0;
}
function seeded(i: number, offset: number) {
  return (hash(i * 31 + offset * 7919) % 10000) / 10000;
}

const DENSITY_COUNTS: Record<Density, { orbs: number; dots: number; sparkles: number }> = {
  sparse: { orbs: 2, dots: 12, sparkles: 8 },
  normal: { orbs: 3, dots: 18, sparkles: 12 },
  dense: { orbs: 4, dots: 24, sparkles: 16 },
};

export function AmbientParticles({ density = 'normal', className = '' }: Props) {
  const { activeSeason } = useSeasonalTheme();
  const palette = SEASON_COLORS[activeSeason];
  const counts = DENSITY_COUNTS[density];

  // Memoize particle configs — each gets unique motion parameters
  const { orbs, dots, sparkles } = useMemo(() => {
    const orbConfigs = Array.from({ length: counts.orbs }, (_, i) => ({
      top: `${5 + seeded(i, 1) * 70}%`,
      left: `${10 + seeded(i, 2) * 70}%`,
      size: 140 + seeded(i, 3) * 200,
      color: palette.orbs[i % palette.orbs.length],
      duration: `${16 + seeded(i, 4) * 14}s`,
      delay: `${-seeded(i, 5) * 20}s`,
      // Per-particle random drift distances
      dx1: -40 + seeded(i, 6) * 80,
      dy1: -30 + seeded(i, 7) * 60,
      dx2: -35 + seeded(i, 8) * 70,
      dy2: -25 + seeded(i, 9) * 50,
      dx3: -45 + seeded(i, 10) * 90,
      dy3: -35 + seeded(i, 11) * 70,
    }));

    const dotConfigs = Array.from({ length: counts.dots }, (_, i) => ({
      top: `${3 + seeded(i, 10) * 90}%`,
      left: `${3 + seeded(i, 11) * 90}%`,
      size: 1.5 + seeded(i, 12) * 2.5,
      opacity: 0.1 + seeded(i, 13) * 0.2,
      color: palette.dots[i % palette.dots.length],
      duration: `${5 + seeded(i, 14) * 8}s`,
      delay: `${-seeded(i, 15) * 12}s`,
      // Per-particle unique float path
      dx1: -15 + seeded(i, 16) * 30,
      dy1: -30 + seeded(i, 17) * 15,
      dx2: -10 + seeded(i, 18) * 20,
      dy2: -20 + seeded(i, 19) * 10,
      dx3: -12 + seeded(i, 20) * 24,
      dy3: -35 + seeded(i, 21) * 18,
    }));

    const sparkleConfigs = Array.from({ length: counts.sparkles }, (_, i) => ({
      top: `${5 + seeded(i, 20) * 85}%`,
      left: `${5 + seeded(i, 21) * 85}%`,
      size: 1 + seeded(i, 22) * 1.5,
      opacity: 0.15 + seeded(i, 23) * 0.25,
      duration: `${3 + seeded(i, 24) * 4}s`,
      delay: `${-seeded(i, 25) * 10}s`,
      dx1: -8 + seeded(i, 26) * 16,
      dy1: -20 + seeded(i, 27) * 10,
      dx2: -6 + seeded(i, 28) * 12,
      dy2: -12 + seeded(i, 29) * 6,
    }));

    return { orbs: orbConfigs, dots: dotConfigs, sparkles: sparkleConfigs };
  }, [activeSeason, density, counts, palette]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none motion-reduce:hidden ${className}`} aria-hidden="true">
      {/* TIER 1: Ambient orbs — large, blurred, slow drift (desktop only) */}
      {orbs.map((orb, i) => (
        <div
          key={`orb-${i}`}
          className={`absolute rounded-full blur-3xl hidden lg:block ${orb.color} _ap-drift`}
          style={{
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            animationDuration: orb.duration,
            animationDelay: orb.delay,
            '--dx1': `${orb.dx1}px`, '--dy1': `${orb.dy1}px`,
            '--dx2': `${orb.dx2}px`, '--dy2': `${orb.dy2}px`,
            '--dx3': `${orb.dx3}px`, '--dy3': `${orb.dy3}px`,
          } as React.CSSProperties}
        />
      ))}

      {/* TIER 2: Mid-layer dots — medium, scattered movement (tablet+) */}
      <div className="hidden sm:block">
        {dots.map((dot, i) => (
          <div
            key={`dot-${i}`}
            className={`absolute ${dot.color} rounded-full _ap-float`}
            style={{
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
              opacity: dot.opacity,
              animationDuration: dot.duration,
              animationDelay: dot.delay,
              filter: `blur(0.5px) ${palette.glow}`,
              '--dx1': `${dot.dx1}px`, '--dy1': `${dot.dy1}px`,
              '--dx2': `${dot.dx2}px`, '--dy2': `${dot.dy2}px`,
              '--dx3': `${dot.dx3}px`, '--dy3': `${dot.dy3}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* TIER 3: Foreground sparkles — tiny, bright, quick scattered drift */}
      {sparkles.map((s, i) => (
        <div
          key={`sparkle-${i}`}
          className={`absolute ${palette.sparkles} rounded-full _ap-float`}
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animationDuration: s.duration,
            animationDelay: s.delay,
            filter: palette.sparkleGlow,
            '--dx1': `${s.dx1}px`, '--dy1': `${s.dy1}px`,
            '--dx2': `${s.dx2}px`, '--dy2': `${s.dy2}px`,
            '--dx3': `0px`, '--dy3': `0px`,
          } as React.CSSProperties}
        />
      ))}

      {/* Per-particle randomized keyframes via CSS custom properties */}
      <style>{`
        @keyframes _ap-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(var(--dx1), var(--dy1)) scale(1.05); }
          50% { transform: translate(var(--dx2), var(--dy2)) scale(0.95); }
          75% { transform: translate(var(--dx3), var(--dy3)) scale(1.02); }
        }
        ._ap-drift { animation: _ap-drift ease-in-out infinite; }

        @keyframes _ap-float {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(var(--dx1), var(--dy1)); }
          45% { transform: translate(var(--dx2), var(--dy2)); }
          70% { transform: translate(var(--dx3), var(--dy3)); }
          90% { transform: translate(calc(var(--dx1) * -0.5), calc(var(--dy2) * -0.7)); }
        }
        ._ap-float { animation: _ap-float ease-in-out infinite; }
      `}</style>
    </div>
  );
}
