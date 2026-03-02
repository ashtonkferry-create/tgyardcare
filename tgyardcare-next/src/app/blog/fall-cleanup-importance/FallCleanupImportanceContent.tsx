'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FallCleanupImportanceContent() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <article className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to blog
          </Link>

          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              Seasonal Tips
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why fall cleanup matters more than you think
            </h1>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>October 8, 2023</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Many homeowners view fall cleanup as purely cosmetic—a way to keep their yard looking tidy before winter. But the reality is that proper fall maintenance is one of the most important things you can do for your lawn&apos;s long-term health.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">The hidden dangers of neglected leaves</h2>
            <p className="text-muted-foreground mb-6">
              When leaves are left on your lawn through winter, they create a thick, wet mat that blocks sunlight and traps moisture. This creates the perfect environment for:
            </p>
            <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
              <li>Snow mold and fungal diseases</li>
              <li>Suffocated grass that dies or becomes weak</li>
              <li>Insect and rodent habitats</li>
              <li>Bare patches that require reseeding in spring</li>
            </ul>

            <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Did you know?</h3>
                  <p className="text-muted-foreground">
                    A single oak tree can drop over 200,000 leaves in fall. Left unmanaged, this leaf layer can smother your entire lawn and create dead zones that take years to recover.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Setting up spring success</h2>
            <p className="text-muted-foreground mb-6">
              Fall cleanup isn&apos;t just about removing leaves—it&apos;s about preparing your lawn to survive winter and thrive next spring. Here&apos;s what proper fall maintenance accomplishes:
            </p>

            <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Prevents disease and pest problems</h3>
            <p className="text-muted-foreground mb-6">
              Removing debris eliminates overwintering sites for lawn diseases, insects, and pests. This means fewer problems to deal with when spring arrives.
            </p>

            <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Allows grass to breathe</h3>
            <p className="text-muted-foreground mb-6">
              Clean lawns can photosynthesize during mild winter days and warm spells. This keeps roots strong and helps grass green up faster in spring.
            </p>

            <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">3. Reduces spring workload</h3>
            <p className="text-muted-foreground mb-6">
              Thorough fall cleanup means less work when spring arrives. You can focus on growing season prep instead of dealing with compacted, matted leaves.
            </p>

            <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Protects your investment</h3>
            <p className="text-muted-foreground mb-6">
              If you&apos;ve invested in fertilization, overseeding, or other lawn treatments during the year, fall cleanup protects that investment by giving your grass the best chance to survive winter.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Beyond leaves: complete fall maintenance</h2>
            <p className="text-muted-foreground mb-6">
              Professional fall cleanup goes beyond just leaf removal. A comprehensive fall maintenance program includes:
            </p>
            <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
              <li>Complete leaf and debris removal</li>
              <li>Final mowing at proper height (2.5-3 inches)</li>
              <li>Gutter cleaning to prevent ice dams</li>
              <li>Garden bed cleanup and mulching</li>
              <li>Trimming dead branches and perennials</li>
              <li>Clearing storm drains and drainage areas</li>
            </ul>

            <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Timing is everything</h2>
            <p className="text-muted-foreground mb-6">
              In Madison, Wisconsin, the ideal time for fall cleanup is late October through November, after most leaves have fallen but before heavy snow arrives. Multiple cleanups may be necessary if you have many trees on your property.
            </p>

            <p className="text-muted-foreground mb-6">
              Waiting too long risks having snow trap leaves on your lawn all winter. Starting too early means you&apos;ll need to clean again as more leaves fall. Professional services time cleanups perfectly to maximize effectiveness.
            </p>

            <div className="bg-card p-6 rounded-lg border border-border mt-8">
              <h3 className="text-xl font-bold text-foreground mb-3">Professional fall cleanup in Madison</h3>
              <p className="text-muted-foreground mb-4">
                TotalGuard Yard Care provides complete fall cleanup services throughout the Madison area. We handle everything from leaf removal to gutter cleaning, so your property is winter-ready.
              </p>
              <Button variant="accent" asChild>
                <Link href="/contact">Schedule your fall cleanup</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
