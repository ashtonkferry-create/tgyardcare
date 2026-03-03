'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { ScrollReveal } from './ScrollReveal';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { cn } from '@/lib/utils';
import { Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const seasonalAccordionHover = {
  summer: 'hover:border-emerald-500/30',
  fall: 'hover:border-amber-500/30',
  winter: 'hover:border-cyan-500/30',
} as const;

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  faqs: FAQItem[];
}

export default function ServiceFAQ({ faqs }: ServiceFAQProps) {
  const { activeSeason } = useSeasonalTheme();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Got questions? We&apos;ve got answers. Can&apos;t find what you&apos;re looking for?{" "}
              <Link href="/contact" className="text-primary hover:text-primary/80 font-semibold underline">
                Contact us
              </Link>
            </p>
          </div>
        </ScrollReveal>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <AccordionItem
                value={`item-${index}`}
                className={cn(
                  'bg-card/80 backdrop-blur-sm border-2 border-border rounded-xl px-6 shadow-sm',
                  'hover:shadow-lg transition-all duration-300',
                  seasonalAccordionHover[activeSeason]
                )}
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </ScrollReveal>
          ))}
        </Accordion>

        <ScrollReveal delay={0.2}>
          <div className="mt-12 text-center p-8 md:p-10 bg-card/80 backdrop-blur-sm rounded-2xl border-2 border-primary/20 shadow-xl">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our team is here to help! Get in touch and we&apos;ll respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="font-bold" asChild>
                <Link href="/contact">
                  Get Free Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="font-bold" asChild>
                <a href="tel:608-535-6057">
                  <Phone className="mr-2 h-4 w-4" />
                  (608) 535-6057
                </a>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
