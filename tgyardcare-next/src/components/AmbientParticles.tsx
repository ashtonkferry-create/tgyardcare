'use client';

import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { useMemo } from 'react';

/**
 * AmbientParticles — Season-adaptive floating particle overlay.
 *
 * Renders CSS-only animated dots/orbs that drift organically.
 * Summer: green luminous pollen. Fall: amber fireflies. Winter: soft white flurries.
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
    orbs: ['bg-emerald-500/[0.04]', 'bg-green-500/[0.03]'],
    dots: ['bg-green-400', 'bg-emerald-400', 'bg-lime-400', 'bg-green-300'],
    sparkles: 'bg-white',
    glow: 'drop-shadow(0 0 6px rgba(34,197,94,0.5))',
    sparkleGlow: 'drop-shadow(0 0 3px rgba(255,255,255,0.6))',
  },
  fall: {
    orbs: ['bg-amber-500/[0.04]', 'bg-orange-500/[0.03]'],
    dots: ['bg-amber-400', 'bg-orange-400', 'bg-yellow-400', 'bg-amber-300'],
    sparkles: 'bg-amber-200',
    glow: 'drop-shadow(0 0 6px rgba(251,191,36,0.5))',
    sparkleGlow: 'drop-shadow(0 0 3px rgba(251,191,36,0.5))',
  },
  winter: {
    orbs: ['bg-sky-400/[0.03]', 'bg-blue-400/[0.03]'],
    dots: ['bg-sky-300', 'bg-blue-300', 'bg-white', 'bg-sky-200'],
    sparkles: 'bg-white',
    glow: 'drop-shadow(0 0 6px rgba(186,230,253,0.4))',
    sparkleGlow: 'drop-shadow(0 0 3px rgba(255,255,255,0.5))',
  },
} as const;

// Deterministic pseudo-random positions (seeded by index)
function seeded(i: number, offset: number) {
  const x = ((i * 127 + offset * 311) % 97) / 97;
  return x;
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

  // Memoize particle configs so they don't recalculate on every render
  const { orbs, dots, sparkles } = useMemo(() => {
    const orbConfigs = Array.from({ length: counts.orbs }, (_, i) => ({
      top: `${10 + seeded(i, 1) * 60}%`,
      left: `${15 + seeded(i, 2) * 60}%`,
      size: 160 + seeded(i, 3) * 180,
      color: palette.orbs[i % palette.orbs.length],
      duration: `${18 + seeded(i, 4) * 12}s`,
      delay: `${-seeded(i, 5) * 15}s`,
    }));

    const dotConfigs = Array.from({ length: counts.dots }, (_, i) => ({
      top: `${5 + seeded(i, 10) * 85}%`,
      left: `${5 + seeded(i, 11) * 85}%`,
      size: 2 + seeded(i, 12) * 2,
      opacity: 0.12 + seeded(i, 13) * 0.15,
      color: palette.dots[i % palette.dots.length],
      duration: `${6 + seeded(i, 14) * 6}s`,
      delay: `${-seeded(i, 15) * 10}s`,
    }));

    const sparkleConfigs = Array.from({ length: counts.sparkles }, (_, i) => ({
      top: `${8 + seeded(i, 20) * 80}%`,
      left: `${10 + seeded(i, 21) * 75}%`,
      size: 1 + seeded(i, 22) * 1,
      opacity: 0.2 + seeded(i, 23) * 0.2,
      duration: `${4 + seeded(i, 24) * 3}s`,
      delay: `${-seeded(i, 25) * 8}s`,
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
          }}
        />
      ))}

      {/* TIER 2: Mid-layer dots — medium, moderate speed (tablet+) */}
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
            }}
          />
        ))}
      </div>

      {/* TIER 3: Foreground sparkles — tiny, bright, quick drift */}
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
          }}
        />
      ))}

      {/* Inline keyframes — scoped to this component */}
      <style>{`
        @keyframes _ap-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.05); }
          50% { transform: translate(-15px, 15px) scale(0.95); }
          75% { transform: translate(20px, 25px) scale(1.02); }
        }
        ._ap-drift { animation: _ap-drift ease-in-out infinite; }

        @keyframes _ap-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: var(--tw-opacity, 0.2); }
          25% { transform: translateY(-18px) translateX(8px); opacity: calc(var(--tw-opacity, 0.2) * 1.6); }
          50% { transform: translateY(-8px) translateX(-4px); opacity: calc(var(--tw-opacity, 0.2) * 1.3); }
          75% { transform: translateY(-25px) translateX(4px); opacity: calc(var(--tw-opacity, 0.2) * 1.5); }
        }
        ._ap-float { animation: _ap-float ease-in-out infinite; }
      `}</style>
    </div>
  );
}
