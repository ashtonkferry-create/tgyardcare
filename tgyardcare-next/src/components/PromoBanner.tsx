'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Percent, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePromoSettings } from '@/hooks/usePromoSettings';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import QuickQuoteDialog from '@/components/QuickQuoteDialog';

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { activeSeason } = useSeasonalTheme();
  const { promotions, isLoading, getPromoIndex, getTimeUntilNextPromo } = usePromoSettings();

  // Season-adaptive banner colors with cinematic particles
  const bannerTheme = {
    winter: {
      bg: 'bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950',
      border: 'border-cyan-400/10',
      shimmerLine: 'via-cyan-400/30',
      ctaBg: 'bg-white text-blue-900 hover:bg-cyan-50',
      dotColors: ['bg-cyan-400', 'bg-sky-300', 'bg-blue-400'],
      ambientGlow: 'rgba(56, 189, 248, 0.06)',
    },
    summer: {
      bg: 'bg-gradient-to-r from-[#132e1b] via-[#1a3a25] to-[#0f3320]',
      border: 'border-green-400/10',
      shimmerLine: 'via-green-400/30',
      ctaBg: 'bg-white text-green-900 hover:bg-green-50',
      dotColors: ['bg-green-400', 'bg-emerald-400', 'bg-lime-300'],
      ambientGlow: 'rgba(74, 222, 128, 0.05)',
    },
    fall: {
      bg: 'bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900',
      border: 'border-amber-400/10',
      shimmerLine: 'via-amber-400/30',
      ctaBg: 'bg-white text-amber-900 hover:bg-amber-50',
      dotColors: ['bg-amber-400', 'bg-orange-400', 'bg-yellow-300'],
      ambientGlow: 'rgba(251, 191, 36, 0.05)',
    },
  } as const;
  const bt = bannerTheme[activeSeason] ?? bannerTheme.summer;
  const [promoIndex, setPromoIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  // Update promo index when promotions load
  useEffect(() => {
    if (promotions.length > 0) {
      setPromoIndex(getPromoIndex());
    }
  }, [promotions, getPromoIndex]);

  const currentPromo = promotions[promoIndex] || promotions[0];

  const calculateTimeLeft = useCallback(() => {
    if (promotions.length === 0) return;

    const remaining = getTimeUntilNextPromo();

    if (remaining <= 0) {
      setPromoIndex(getPromoIndex());
      return;
    }

    setTimeLeft({
      hours: Math.floor(remaining / (1000 * 60 * 60)),
      minutes: Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((remaining % (1000 * 60)) / 1000),
    });
  }, [promotions, getPromoIndex, getTimeUntilNextPromo]);

  useEffect(() => {
    if (promotions.length === 0) return;

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft, promotions]);

  if (!isVisible || isLoading || !currentPromo) return null;

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const BannerContent = () => (
    <>
      <div className="flex items-center justify-center bg-white/20 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0">
        <Percent className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </div>
      <p className="text-sm sm:text-base font-medium whitespace-nowrap">
        Save <span className={"font-bold"}>{currentPromo.discount} OFF</span> on {currentPromo.service}
      </p>

      {/* Compact Countdown Timer */}
      <div className="flex items-center gap-1.5 ml-2">
        <span className="bg-white/20 rounded px-2 py-0.5 font-mono font-bold text-sm">
          {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
        </span>
      </div>
    </>
  );

  return (
    <div className={cn("text-white py-2.5 px-4 border-b relative overflow-hidden", bt.bg, bt.border)}>
      {/* Cinematic: Ambient center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-16 rounded-full blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${bt.ambientGlow}, transparent)` }}
      />
      {/* Cinematic: Strategic floating dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        {[
          { top: '15%', left: '8%', s: 2, o: 0.2, d: '6s', dl: '0s' },
          { top: '60%', left: '18%', s: 1.5, o: 0.25, d: '8s', dl: '-2s' },
          { top: '25%', left: '35%', s: 2.5, o: 0.15, d: '7s', dl: '-4s' },
          { top: '70%', right: '30%', s: 2, o: 0.2, d: '9s', dl: '-1s' },
          { top: '20%', right: '15%', s: 1.5, o: 0.25, d: '6s', dl: '-3s' },
          { top: '50%', right: '45%', s: 2, o: 0.18, d: '10s', dl: '-5s' },
        ].map((dot, i) => {
          const { s, o, d, dl, ...pos } = dot;
          return (
            <div
              key={i}
              className={`absolute ${bt.dotColors[i % bt.dotColors.length]} rounded-full animate-drift-${(i % 3) + 1}`}
              style={{
                ...pos,
                width: s,
                height: s,
                opacity: o,
                animationDuration: d,
                animationDelay: dl,
                filter: 'blur(0.3px) drop-shadow(0 0 3px currentColor)',
              }}
            />
          );
        })}
      </div>
      {/* Bottom accent glow line */}
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${bt.shimmerLine} to-transparent`} />
      <div className="container mx-auto flex items-center justify-between gap-2 sm:gap-4 relative z-10">
        {/* Mobile: entire content is clickable */}
        <button
          onClick={() => setShowQuoteDialog(true)}
          className="flex sm:hidden items-center gap-2 flex-1 justify-center group"
        >
          <div className="flex items-center justify-center bg-white/20 rounded-full w-6 h-6 flex-shrink-0">
            <Percent className="h-3.5 w-3.5" />
          </div>
          <p className="text-sm font-medium whitespace-nowrap">
            <span className={"font-bold"}>{currentPromo.discount} OFF</span> {currentPromo.service}
          </p>
          <div className="flex items-center gap-0.5 ml-1">
            <span className="bg-white/20 rounded px-1 py-0.5 font-mono font-bold text-[10px]">
              {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
            </span>
          </div>
          <ChevronRight className="h-4 w-4 opacity-70 group-active:translate-x-0.5 transition-transform" />
        </button>

        {/* Desktop: content is not clickable, separate button */}
        <div className="hidden sm:flex items-center gap-3 flex-1 justify-center">
          <BannerContent />
        </div>

        <button
          onClick={() => setShowQuoteDialog(true)}
          className={`hidden sm:inline-flex ${bt.ctaBg} px-4 py-1.5 rounded-md font-semibold text-sm transition-all whitespace-nowrap`}
        >
          Claim Offer
        </button>

        <button
          onClick={() => setIsVisible(false)}
          className="text-white/70 hover:text-white transition-colors p-1 flex-shrink-0"
          aria-label="Close banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {currentPromo && (
        <QuickQuoteDialog
          open={showQuoteDialog}
          onOpenChange={setShowQuoteDialog}
          promoService={currentPromo.service}
          promoDiscount={currentPromo.discount}
        />
      )}
    </div>
  );
};
