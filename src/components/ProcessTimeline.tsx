'use client';

import { Phone, FileText, Calendar, Users, CheckCircle2, ArrowDown } from "lucide-react";
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from "@/lib/utils";

/**
 * Visual timeline showing exactly what happens after contact
 * Eliminates "what now?" hesitation through procedural transparency
 */

interface ProcessTimelineProps {
  variant?: "vertical" | "horizontal" | "compact";
  className?: string;
}

const processSteps = [
  {
    icon: Phone,
    title: "You Reach Out",
    timing: "Takes 60 seconds",
    description: "Submit a form or call us directly. We receive your request immediately.",
    outcome: "Confirmation sent to your email"
  },
  {
    icon: FileText,
    title: "We Review & Quote",
    timing: "Within 24 hours",
    description: "We assess your needs and prepare a clear, itemized quote. No hidden fees—ever.",
    outcome: "You receive a detailed proposal"
  },
  {
    icon: Calendar,
    title: "You Approve & Schedule",
    timing: "At your convenience",
    description: "Accept the quote, pick your start date. We lock you into our schedule.",
    outcome: "Confirmed service day assigned"
  },
  {
    icon: Users,
    title: "Your Crew Shows Up",
    timing: "Same day, same crew—always",
    description: "A dedicated 2-person team handles your property. No strangers, no surprises.",
    outcome: "Work completed to spec"
  }
];

export function ProcessTimeline({ variant = "vertical", className }: ProcessTimelineProps) {
  const { ref: timelineRef, isInView } = useScrollReveal();

  if (variant === "compact") {
    return (
      <div className={cn("py-6 border-y border-border/50", className)}>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
          {processSteps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                {idx + 1}
              </div>
              <span className="text-foreground font-medium">{step.title}</span>
              {idx < processSteps.length - 1 && (
                <span className="text-muted-foreground ml-2 hidden sm:inline">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div ref={timelineRef} className={cn("py-8", className)}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="relative text-center"
              >
                {/* Frost connector line */}
                {idx < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-px bg-gradient-to-r from-blue-200/50 via-blue-300/30 to-blue-200/50" />
                )}

                <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-transparent hover:shadow-blue-300/30 hover:shadow-lg hover:border-blue-400 transition-all duration-300 mb-3">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-gray-900 mb-1">{step.title}</h4>
                <p className="text-xs text-primary font-medium mb-1">{step.timing}</p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Default: vertical timeline
  return (
    <div ref={timelineRef} className={cn("py-8", className)}>
      <div className="space-y-0">
        {processSteps.map((step, idx) => {
          const Icon = step.icon;
          const isLast = idx === processSteps.length - 1;

          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="relative flex gap-4"
            >
              {/* Timeline spine */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border-2 border-primary hover:shadow-blue-300/30 hover:shadow-lg hover:border-blue-400 transition-all duration-300 z-10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                {!isLast && (
                  <div className="w-0.5 h-full bg-gradient-to-b from-blue-200/50 via-blue-300/30 to-blue-200/50 min-h-[60px]" />
                )}
              </div>

              {/* Content */}
              <div className={cn("pb-6", isLast && "pb-0")}>
                <div className="flex items-baseline gap-3 mb-1">
                  <h4 className="text-base font-bold text-foreground">{step.title}</h4>
                  <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">
                    {step.timing}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                <div className="flex items-center gap-1.5 text-xs text-primary">
                  <CheckCircle2 className="h-3 w-3" />
                  <span className="font-medium">{step.outcome}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default ProcessTimeline;
