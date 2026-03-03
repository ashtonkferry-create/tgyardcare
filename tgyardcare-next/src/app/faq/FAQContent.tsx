'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from '@/components/CTASection';
import { FAQSchema } from "@/components/FAQSchema";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  mowingFAQs,
  weedingFAQs,
  mulchingFAQs,
  leafRemovalFAQs,
  springCleanupFAQs,
  fallCleanupFAQs,
  gutterCleaningFAQs,
  gutterGuardsFAQs,
  gardenBedsFAQs,
  fertilizationFAQs,
  herbicideFAQs,
  snowRemovalFAQs,
} from "@/data/serviceFAQs";

// Collect top FAQs for schema (first 2 from each category for rich results)
const allFAQsForSchema = [
  ...mowingFAQs.slice(0, 2),
  ...weedingFAQs.slice(0, 2),
  ...mulchingFAQs.slice(0, 2),
  ...leafRemovalFAQs.slice(0, 2),
  ...springCleanupFAQs.slice(0, 2),
  ...fallCleanupFAQs.slice(0, 2),
  ...gutterCleaningFAQs.slice(0, 2),
  ...gutterGuardsFAQs.slice(0, 2),
  ...gardenBedsFAQs.slice(0, 2),
  ...fertilizationFAQs.slice(0, 2),
  ...herbicideFAQs.slice(0, 2),
  ...snowRemovalFAQs.slice(0, 2),
];

interface FAQCategory {
  name: string;
  path: string;
  faqs: { question: string; answer: string }[];
}

export default function FAQContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories: FAQCategory[] = [
    { name: "Lawn Mowing", path: "/services/mowing", faqs: mowingFAQs },
    { name: "Weeding", path: "/services/weeding", faqs: weedingFAQs },
    { name: "Mulching", path: "/services/mulching", faqs: mulchingFAQs },
    { name: "Leaf Removal", path: "/services/leaf-removal", faqs: leafRemovalFAQs },
    { name: "Spring Cleanup", path: "/services/spring-cleanup", faqs: springCleanupFAQs },
    { name: "Fall Cleanup", path: "/services/fall-cleanup", faqs: fallCleanupFAQs },
    { name: "Gutter Cleaning", path: "/services/gutter-cleaning", faqs: gutterCleaningFAQs },
    { name: "Gutter Guards", path: "/services/gutter-guards", faqs: gutterGuardsFAQs },
    { name: "Garden Beds", path: "/services/garden-beds", faqs: gardenBedsFAQs },
    { name: "Fertilization", path: "/services/fertilization", faqs: fertilizationFAQs },
    { name: "Herbicide", path: "/services/herbicide", faqs: herbicideFAQs },
    { name: "Snow Removal", path: "/services/snow-removal", faqs: snowRemovalFAQs },
  ];

  const filteredCategories = useMemo(() => {
    let filtered = categories;

    // Filter by selected category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((cat) => cat.name === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered
        .map((category) => ({
          ...category,
          faqs: category.faqs.filter(
            (faq) =>
              faq.question.toLowerCase().includes(query) ||
              faq.answer.toLowerCase().includes(query)
          ),
        }))
        .filter((category) => category.faqs.length > 0);
    }

    return filtered;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory]);

  const totalFAQs = filteredCategories.reduce((sum, cat) => sum + cat.faqs.length, 0);

  return (
    <div className="min-h-screen" style={{ background: '#050d07' }}>
      <FAQSchema faqs={allFAQsForSchema} />
      <Navigation showPromoBanner />

      <section className="sr-only">
        <h2>Frequently Asked Questions About TG Yard Care</h2>
        <p>Get answers to common questions about TG Yard Care's lawn care and landscaping services in Madison, WI. Learn about our pricing, service areas, scheduling, satisfaction guarantee, and what makes TotalGuard different from other yard care companies in Dane County.</p>
      </section>

      {/* Hero Section */}
      <section className="py-16 md:py-24" style={{ background: '#050d07' }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            <p className="text-xl text-white/60 mb-8">
              Everything you need to know about our lawn care and landscaping services. Can&apos;t find your answer?{" "}
              <Link href="/contact" className="text-primary hover:underline font-semibold">
                Contact us
              </Link>
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 text-lg border-2 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white/[0.04] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="h-5 w-5 text-white/40" />
              <span className="font-semibold text-white">Filter by service:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                className="rounded-full"
              >
                All Services
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.name)}
                  className="rounded-full"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24" style={{ background: '#050d07' }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {totalFAQs === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-white/60 mb-4">
                  No questions found matching &ldquo;{searchQuery}&rdquo;
                </p>
                <Button onClick={() => setSearchQuery("")} variant="outline">
                  Clear search
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="text-white/60">
                    Showing <span className="font-bold text-white">{totalFAQs}</span> questions
                    {selectedCategory !== "all" && (
                      <>
                        {" "}in <span className="font-bold text-white">{selectedCategory}</span>
                      </>
                    )}
                  </p>
                </div>

                <div className="space-y-12">
                  {filteredCategories.map((category) => (
                    <div key={category.name}>
                      <div className="mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {category.name}
                        </h2>
                        <Link
                          href={category.path}
                          className="text-primary hover:underline font-medium"
                        >
                          View {category.name} service page &rarr;
                        </Link>
                      </div>

                      <Accordion type="single" collapsible className="space-y-4">
                        {category.faqs.map((faq, index) => (
                          <AccordionItem
                            key={`${category.name}-${index}`}
                            value={`${category.name}-${index}`}
                            className="bg-white/[0.06] border-2 border-white/10 rounded-lg px-6 shadow-sm hover:shadow-md hover:border-primary transition-all"
                          >
                            <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-primary py-5">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-white/60 pb-5 leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ background: '#050d07' }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center bg-white/[0.06] border-2 border-primary/30 rounded-2xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-lg text-white/60 mb-8">
              Our team is here to help! Get in touch and we&apos;ll respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg font-bold" asChild>
                <Link href="/contact">Get Free Quote</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg font-bold" asChild>
                <a href="tel:608-535-6057">Call (608) 535-6057</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
