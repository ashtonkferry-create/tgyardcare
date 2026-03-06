'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import hero images
import heroLawn from '@/assets/hero-lawn.jpg';
import heroSpringCleanup from '@/assets/hero-spring-cleanup.webp';
import heroMowing from '@/assets/hero-mowing.webp';
import heroFallCleanup from '@/assets/hero-fall-cleanup.webp';
import heroSnowRemoval from '@/assets/hero-snow-removal.webp';
import heroMulching from '@/assets/hero-mulching.webp';
import heroLeafRemoval from '@/assets/hero-leaf-removal.webp';
import heroGutterCleaning from '@/assets/hero-gutter-cleaning.webp';
import heroFertilization from '@/assets/hero-fertilization.webp';
import heroAeration from '@/assets/hero-aeration.jpg';

function imgSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src;
}

// Map of background images by season
const seasonBackgrounds = {
  spring: heroSpringCleanup,
  summer: heroMowing,
  fall: heroFallCleanup,
  winter: heroSnowRemoval,
};

const slideBackgrounds = [
  heroLawn,
  heroMulching,
  heroLeafRemoval,
  heroGutterCleaning,
  heroFertilization,
  heroAeration,
];

export function SeasonalHeroCarousel() {
  const { slides, activeSeason, seasonBadge, isLoading } = useSeasonalTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slideCount = slides.length;

  const nextSlide = useCallback(() => {
    if (slideCount <= 1) return;
    setCurrentSlide(prev => (prev + 1) % slideCount);
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    if (slideCount <= 1) return;
    setCurrentSlide(prev => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Auto-rotate every 6 seconds when not paused
  useEffect(() => {
    if (isPaused || slideCount <= 1) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(nextSlide, 6000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, nextSlide, slideCount]);

  // Reset to first slide when season changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeSeason]);

  if (isLoading) {
    return (
      <section className="relative min-h-[auto] py-12 sm:py-16 md:py-0 md:min-h-[90vh] flex items-center bg-foreground/95">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="animate-pulse flex flex-col gap-4">
            <div className="h-8 w-48 bg-muted/20 rounded" />
            <div className="h-16 w-3/4 bg-muted/20 rounded" />
            <div className="h-6 w-1/2 bg-muted/20 rounded" />
          </div>
        </div>
      </section>
    );
  }

  const activeSlide = slides[currentSlide] || slides[0];
  if (!activeSlide) return null;

  const bgImage = activeSlide.background_image_url
    || imgSrc(seasonBackgrounds[activeSeason])
    || imgSrc(slideBackgrounds[currentSlide % slideBackgrounds.length])
    || imgSrc(heroLawn);

  return (
    <section
      className="relative min-h-[auto] py-12 sm:py-16 md:py-0 md:min-h-[90vh] flex items-center bg-foreground/95 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
    >
      {/* Background Image with Transition */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 opacity-20"
        style={{ backgroundImage: `url(${imgSrc(bgImage)})` }}
        role="img"
        aria-label={`${activeSeason} seasonal hero background`}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/80 to-foreground/60" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in" key={currentSlide}>
            {/* Season Badge */}
            <div className="inline-flex items-center bg-accent/20 text-accent px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-4 md:mb-6 mt-4 md:mt-8 uppercase tracking-wider">
              {seasonBadge}
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 md:mb-8 leading-[1.1]">
              {activeSlide.headline}
            </h1>

            {/* Bullets */}
            <ul className="space-y-2.5 sm:space-y-3 mb-6 md:mb-8 text-background/90 text-base sm:text-lg">
              {activeSlide.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start sm:items-center">
                  <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-accent mr-2.5 sm:mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="font-medium">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Trust Chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {activeSlide.trust_chips.map((chip, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center bg-background/10 text-background/90 px-3 py-1 rounded-full text-xs font-semibold border border-background/20"
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 md:mb-12">
              <Button
                size="lg"
                variant="accent"
                className="text-base sm:text-lg font-bold w-full sm:w-auto tap-target py-4"
                asChild
              >
                <Link href={activeSlide.primary_cta_link}>
                  {activeSlide.primary_cta_text} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              {activeSlide.secondary_cta_text && (
                <Button
                  size="lg"
                  variant="outline"
                  className="border-background text-background hover:bg-background hover:text-foreground text-base sm:text-lg font-bold w-full sm:w-auto tap-target"
                  asChild
                >
                  <Link href={activeSlide.secondary_cta_link || '/#services'}>
                    {activeSlide.secondary_cta_text}
                  </Link>
                </Button>
              )}

              <Button
                size="lg"
                variant="ghost"
                className="text-background hover:bg-background/10 text-base sm:text-lg font-bold w-full sm:w-auto tap-target hidden sm:flex"
                asChild
              >
                <a href="tel:608-535-6057">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </Button>
            </div>

            {/* Navigation Controls */}
            {slideCount > 1 && (
              <div className="flex items-center gap-4">
                {/* Arrows */}
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-background/10 hover:bg-background/20 text-background transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all duration-300",
                        idx === currentSlide
                          ? "bg-accent w-8"
                          : "bg-background/40 hover:bg-background/60"
                      )}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-background/10 hover:bg-background/20 text-background transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Slide Counter */}
                <span className="text-background/60 text-sm ml-2">
                  {currentSlide + 1} / {slideCount}
                </span>
              </div>
            )}
          </div>

          {/* Right Side Image */}
          <div className="hidden lg:block">
            <Image
              alt={`${activeSeason} lawn care services in Madison Wisconsin`}
              className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
              priority
              src="/lovable-uploads/1ecd67a2-e906-4736-9491-b7de20a50376.jpg"
              width={600}
              height={400}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
