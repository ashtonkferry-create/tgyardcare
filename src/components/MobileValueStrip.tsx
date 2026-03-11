'use client';

import { CheckCircle2, Clock, Shield, Users } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Compact value proposition strip optimized for mobile first viewport
 * Scannable in 2 seconds, builds immediate trust
 */

interface MobileValueStripProps {
  className?: string;
  variant?: "dark" | "light" | "transparent";
}

const valueProps = [
  { icon: Users, text: "Same Crew Assigned" },
  { icon: Clock, text: "24hr Quote Response" },
  { icon: Shield, text: "$1M Liability Coverage" },
  { icon: CheckCircle2, text: "48hr Issue Resolution" },
];

export function MobileValueStrip({
  className,
  variant = "dark"
}: MobileValueStripProps) {
  const bgClasses = {
    dark: "bg-foreground/95 text-background",
    light: "bg-muted/80 text-foreground",
    transparent: "bg-black/40 backdrop-blur-sm text-white"
  };

  return (
    <div className={cn(
      "py-3 overflow-hidden",
      bgClasses[variant],
      className
    )}>
      {/* Horizontal scroll on mobile, grid on larger */}
      <div className="flex lg:grid lg:grid-cols-4 gap-4 lg:gap-6 px-4 overflow-x-auto scrollbar-hide lg:overflow-visible lg:max-w-4xl lg:mx-auto">
        {valueProps.map((prop, idx) => {
          const Icon = prop.icon;
          return (
            <div
              key={idx}
              className={cn(
                "flex items-center gap-2 flex-shrink-0",
                "text-sm lg:justify-center"
              )}
            >
              <Icon className={cn(
                "h-4 w-4 flex-shrink-0",
                variant === "dark" ? "text-primary" : "text-primary"
              )} />
              <span className="font-medium whitespace-nowrap">{prop.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Compact inline variant for hero sections — matches desktop trust chip text exactly
export function MobileValueChips({ className }: { className?: string }) {
  return (
    <div className={cn(
      "flex flex-nowrap gap-1.5",
      className
    )}>
      {["80+ Google Reviews", "4.9★ Rating", "Fully Insured"].map((chip) => (
        <span
          key={chip}
          className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm text-white/90 px-2 py-1 rounded-full text-[11px] font-medium border border-white/20 flex-shrink-0"
        >
          <Shield className="h-3 w-3 text-primary" />
          {chip}
        </span>
      ))}
    </div>
  );
}

export default MobileValueStrip;
