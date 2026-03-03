'use client';

import { useEffect, useState } from 'react';

interface MobilePerfConfig {
  isMobile: boolean;
  blurAmount: string;
  duration: number;
  maxStaggerDelay: number;
}

export function useMobilePerf(): MobilePerfConfig {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return {
    isMobile,
    blurAmount: isMobile ? '0px' : '6px',
    duration: isMobile ? 0.35 : 0.65,
    maxStaggerDelay: 0.3,
  };
}
