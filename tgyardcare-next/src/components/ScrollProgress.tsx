'use client';

import { useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

/**
 * Smooth scroll progress indicator using CSS scaleX transform
 * for GPU-accelerated, jank-free animation.
 */

interface ScrollProgressProps {
  className?: string;
  variant?: "bar" | "minimal";
}

export function ScrollProgress({
  className,
  variant = "minimal"
}: ScrollProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);

  const updateProgress = useCallback(() => {
    if (!barRef.current) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    barRef.current.style.transform = `scaleX(${progress})`;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [updateProgress]);

  const height = variant === "bar" ? "h-1" : "h-0.5";

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] pointer-events-none",
        height,
        className
      )}
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-primary via-primary to-primary/70 will-change-transform"
        style={{ transform: 'scaleX(0)', transition: 'transform 0.1s cubic-bezier(0.0, 0.0, 0.2, 1)' }}
      />
    </div>
  );
}

export default ScrollProgress;
