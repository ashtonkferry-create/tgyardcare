'use client';

import { useState, useEffect, useCallback } from 'react';

const SCROLL_THRESHOLD = 80;

export function useScrollCondense() {
  const [isCondensed, setIsCondensed] = useState(false);

  const handleScroll = useCallback(() => {
    setIsCondensed(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return isCondensed;
}
