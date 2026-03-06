'use client';

import Image from "next/image";
import { ScrollReveal } from './ScrollReveal';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { AmbientParticles } from './AmbientParticles';
import { cn } from '@/lib/utils';

const seasonalBg = {
  summer: 'from-[#0a1f14] via-[#0f2818] to-[#0a1f14]',
  fall: 'from-stone-950 via-amber-950/30 to-stone-950',
  winter: 'from-slate-950 via-blue-950/30 to-slate-950',
} as const;

const seasonalBorder = {
  summer: 'border-emerald-500/20 hover:border-emerald-500/40',
  fall: 'border-amber-500/20 hover:border-amber-500/40',
  winter: 'border-cyan-500/20 hover:border-cyan-500/40',
} as const;

interface BeforeAfterItem {
  combinedImage: string | { src: string };
}

interface BeforeAfterGalleryProps {
  items: BeforeAfterItem[];
}

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

export default function BeforeAfterGallery({ items }: BeforeAfterGalleryProps) {
  const { activeSeason } = useSeasonalTheme();

  return (
    <section className={cn(
      'relative py-16 md:py-24 bg-gradient-to-b overflow-hidden',
      seasonalBg[activeSeason]
    )}>
      <AmbientParticles density="sparse" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Before & After
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Real transformations from real Madison-area properties. No stock photos.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.15}>
              <div className={cn(
                'group relative rounded-2xl overflow-hidden border-2 transition-all duration-500',
                'shadow-2xl hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]',
                seasonalBorder[activeSeason]
              )}>
                <Image
                  src={imgSrc(item.combinedImage)}
                  alt={`Professional lawn care before and after transformation showing dramatic improvement in lawn quality and appearance - TotalGuard Yard Care Madison WI project ${index + 1}`}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]"
                  width={600}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                  <span className="text-white/90 font-semibold text-sm tracking-wide uppercase">
                    View Transformation
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
