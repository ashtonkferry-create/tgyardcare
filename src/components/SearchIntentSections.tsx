'use client';

import { CheckCircle2, XCircle, AlertTriangle, HelpCircle, DollarSign, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ComparisonPoint {
  label: string;
  us: string;
  them: string;
}

interface ComparisonSectionProps {
  title?: string;
  subtitle?: string;
  points: ComparisonPoint[];
}

/**
 * SearchIntentSections - Components designed to fully satisfy Google search queries
 * by addressing comparison mindset, pricing transparency, and objection handling.
 */

export function ComparisonSection({
  title = "TotalGuard vs. Typical Contractors",
  subtitle = "What separates reliable service from frustrating experiences",
  points
}: ComparisonSectionProps) {
  return (
    <section className="py-16 bg-white/[0.04]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
          <p className="text-lg text-white/60">{subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header Row */}
          <div className="grid grid-cols-3 gap-4 mb-4 px-4">
            <div className="font-semibold text-white/40"></div>
            <div className="font-bold text-primary text-center">TotalGuard</div>
            <div className="font-semibold text-white/40 text-center">Others</div>
          </div>

          {/* Comparison Rows */}
          <div className="space-y-3">
            {points.map((point, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 bg-white/[0.06] border border-white/10 rounded-lg p-4 items-center"
              >
                <div className="font-medium text-white text-sm md:text-base">{point.label}</div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-white">{point.us}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <XCircle className="h-4 w-4 text-white/25 flex-shrink-0" />
                  <span className="text-white/50">{point.them}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface PricingGuideProps {
  serviceName: string;
  lowRange: string;
  highRange: string;
  factors: string[];
  note?: string;
}

export function PricingGuideSection({
  serviceName,
  lowRange,
  highRange,
  factors,
  note
}: PricingGuideProps) {
  return (
    <section className="py-16 bg-white/[0.03]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            <DollarSign className="h-4 w-4" />
            Pricing Transparency
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {serviceName} Pricing in Madison Area
          </h2>

          <div className="bg-white/[0.06] border-2 border-primary/20 rounded-xl p-8 mb-8">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              {lowRange}–{highRange}
            </div>
            <p className="text-white/60">Typical range for most properties</p>
          </div>

          <div className="text-left bg-white/[0.06] rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-white mb-4">What affects your price:</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {factors.map((factor, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm text-white/60">{factor}</span>
                </div>
              ))}
            </div>
          </div>

          {note && (
            <p className="text-sm text-white/60 mb-6">{note}</p>
          )}

          <Button size="lg" asChild>
            <Link href="/contact">
              Get Your Exact Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

interface ObjectionPoint {
  objection: string;
  response: string;
}

interface ObjectionHandlerProps {
  title?: string;
  objections: ObjectionPoint[];
}

export function ObjectionHandlerSection({
  title = "Common Questions Before Hiring",
  objections
}: ObjectionHandlerProps) {
  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <HelpCircle className="h-4 w-4" />
            Addressing Your Concerns
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {objections.map((item, index) => (
            <div
              key={index}
              className="bg-white/[0.06] border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="bg-white/[0.08] rounded-full p-2 flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-white/40" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">&ldquo;{item.objection}&rdquo;</h3>
                  <p className="text-white/60 leading-relaxed">{item.response}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface WhatHappensNextStep {
  step: string;
  description: string;
  timing: string;
}

interface WhatHappensNextProps {
  steps?: WhatHappensNextStep[];
}

export function WhatHappensNextSection({
  steps = [
    { step: "Submit Request", description: "Fill out our quick form or call directly", timing: "2 minutes" },
    { step: "Receive Quote", description: "Written estimate with scope and flat pricing", timing: "Within 24 hours" },
    { step: "Schedule Service", description: "Pick a date that works for your schedule", timing: "Same week available" },
    { step: "Crew Arrives", description: "Same 2-person team, on time, ready to work", timing: "As scheduled" }
  ]
}: WhatHappensNextProps) {
  return (
    <section className="py-16 bg-white/[0.04]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Clock className="h-4 w-4" />
            What Happens Next
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            From First Contact to Completed Work
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-white mb-2">{item.step}</h3>
                <p className="text-sm text-white/60 mb-2">{item.description}</p>
                <span className="text-xs text-primary font-medium">{item.timing}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface LocalFAQ {
  question: string;
  answer: string;
}

interface LocalFAQSectionProps {
  cityName: string;
  faqs?: LocalFAQ[];
}

export function LocalFAQSection({
  cityName,
  faqs
}: LocalFAQSectionProps) {
  const defaultFaqs: LocalFAQ[] = [
    {
      question: `How much does lawn care cost in ${cityName}?`,
      answer: `Most ${cityName} residential properties pay $40-$80 per mowing visit depending on lot size. Full-service seasonal packages range from $150-$400/month and include mowing, edging, trimming, and blowing.`
    },
    {
      question: `Do you provide service throughout ${cityName}?`,
      answer: `Yes, we service all neighborhoods in ${cityName} and surrounding areas. Our crews are familiar with local soil conditions, HOA requirements, and Wisconsin's seasonal lawn care needs.`
    },
    {
      question: `How quickly can you start service in ${cityName}?`,
      answer: `Most new customers in ${cityName} can be scheduled within 3-5 business days. During peak season (spring and fall), we recommend booking 1-2 weeks ahead to secure your preferred day.`
    },
    {
      question: `What's included in your ${cityName} lawn mowing service?`,
      answer: `Every visit includes mowing to the proper height (3-3.5"), edging along driveways and sidewalks, trimming around obstacles, and blowing all clippings off hard surfaces. Completion time for most properties: 30-45 minutes.`
    },
    {
      question: `Do you work in bad weather?`,
      answer: `We don't mow in heavy rain or storms—wet cutting damages lawns. If weather delays your service, we communicate by 8am and reschedule within 24-48 hours. Snow removal has 24/7 response during winter storms.`
    }
  ];

  const displayFaqs = faqs || defaultFaqs;

  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {cityName} Lawn Care: Common Questions
          </h2>
          <p className="text-lg text-white/60">
            Answers to what {cityName} homeowners ask most
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {displayFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/[0.06] border border-white/10 rounded-xl p-6"
            >
              <h3 className="font-semibold text-white mb-3">{faq.question}</h3>
              <p className="text-white/60 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
