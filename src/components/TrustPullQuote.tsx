'use client';

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustPullQuoteProps {
  quote: string;
  source?: string;
  className?: string;
  variant?: "inline" | "floating";
}

/**
 * TrustPullQuote - A trust signal component that displays a customer review quote.
 *
 * Use the "inline" variant (default) for quotes that should flow naturally with content.
 * Use the "floating" variant sparingly - it positions at section top but stays WITHIN section bounds.
 *
 * IMPORTANT: When using "floating" variant, the parent section must have:
 * - position: relative
 * - padding-top sufficient to accommodate the quote (pt-16 or more)
 * - overflow: visible (default)
 */
export function TrustPullQuote({
  quote,
  source = "Verified Google Review",
  className,
  variant = "inline"
}: TrustPullQuoteProps) {
  if (variant === "floating") {
    return (
      <div className={cn(
        "absolute left-1/2 -translate-x-1/2 top-4 z-10 w-[90%] max-w-md",
        className
      )}>
        <QuoteContent quote={quote} source={source} />
      </div>
    );
  }

  // Inline variant - flows naturally with content
  return (
    <div className={cn(
      "flex justify-center my-8",
      className
    )}>
      <QuoteContent quote={quote} source={source} />
    </div>
  );
}

function QuoteContent({ quote, source }: { quote: string; source: string }) {
  return (
    <div className="bg-white/[0.06] border border-white/10 rounded-xl px-6 py-4 shadow-lg text-center max-w-md">
      {/* Stars */}
      <div className="flex justify-center gap-0.5 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
        ))}
      </div>

      {/* Quote text */}
      <p className="text-white text-sm md:text-base font-medium mb-2">
        "{quote}"
      </p>

      {/* Source */}
      <p className="text-xs text-white/60">
        — {source}
      </p>
    </div>
  );
}

export default TrustPullQuote;
