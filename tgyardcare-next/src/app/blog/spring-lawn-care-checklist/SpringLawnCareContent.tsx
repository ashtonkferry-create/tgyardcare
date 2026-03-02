'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SpringLawnCareContent() {
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
              Spring lawn care checklist for Madison homeowners
            </h1>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>March 15, 2024</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Spring is the perfect time to prepare your lawn for the growing season ahead. After Wisconsin&apos;s harsh winter, your lawn needs some TLC to bounce back and thrive. Follow this comprehensive checklist to get your Madison lawn in top shape.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">1. Clean up winter debris</h2>
            <p className="text-muted-foreground mb-6">
              Start by removing any leaves, branches, and debris that accumulated over winter. This prevents mold growth and allows sunlight to reach your grass. A thorough spring cleanup sets the foundation for a healthy lawn all season long.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">2. Rake and dethatch</h2>
            <p className="text-muted-foreground mb-6">
              Use a rake to remove dead grass and thatch buildup. If your thatch layer exceeds half an inch, consider dethatching to improve water and nutrient penetration. This is crucial for Madison lawns after winter dormancy.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">3. Test your soil</h2>
            <p className="text-muted-foreground mb-6">
              Conduct a soil test to determine pH levels and nutrient deficiencies. Wisconsin soils often need lime to balance pH. Knowing your soil composition helps you apply the right amendments for optimal grass health.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">4. Aerate compacted areas</h2>
            <p className="text-muted-foreground mb-6">
              Core aeration relieves soil compaction and improves air, water, and nutrient flow to grass roots. Focus on high-traffic areas and spots where water tends to pool. Spring aeration is especially beneficial for cool-season grasses common in Madison.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">5. Overseed thin or bare spots</h2>
            <p className="text-muted-foreground mb-6">
              Early spring is ideal for overseeding in Wisconsin. Choose grass seed varieties suited to our climate, such as Kentucky bluegrass or perennial ryegrass. Overseeding thickens your lawn and crowds out weeds.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">6. Apply pre-emergent herbicide</h2>
            <p className="text-muted-foreground mb-6">
              Prevent crabgrass and other annual weeds by applying pre-emergent herbicide when soil temperatures reach 50-55&deg;F (typically mid-April in Madison). Timing is critical—too early or too late reduces effectiveness.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">7. Fertilize appropriately</h2>
            <p className="text-muted-foreground mb-6">
              Apply a slow-release nitrogen fertilizer in late spring (May) once your grass is actively growing. Avoid fertilizing too early, as it can encourage weak growth and waste nutrients before roots are ready to absorb them.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">8. Start mowing at the right height</h2>
            <p className="text-muted-foreground mb-6">
              Set your mower blade to 2.5-3 inches for the first mow. Taller grass promotes deeper roots and shades out weeds. Never remove more than one-third of the grass blade height in a single mowing.
            </p>

            <div className="bg-primary/5 border-l-4 border-primary p-6 my-8 rounded-r-lg">
              <h3 className="text-xl font-bold text-foreground mb-4">Spring lawn care timeline for Madison</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground"><strong>Early March:</strong> Clean up debris, rake lawn</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground"><strong>Late March:</strong> Test soil, plan amendments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground"><strong>Early April:</strong> Aerate, overseed, apply lime if needed</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground"><strong>Mid-April:</strong> Apply pre-emergent herbicide</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground"><strong>Late April:</strong> First mowing of the season</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground"><strong>May:</strong> Apply slow-release fertilizer</span>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Need professional help?</h2>
            <p className="text-muted-foreground mb-6">
              Spring lawn care can be overwhelming, especially with Wisconsin&apos;s unpredictable weather. TotalGuard Yard Care offers comprehensive spring cleanup and lawn preparation services throughout Madison and surrounding areas. Our team knows exactly what Madison lawns need to thrive.
            </p>

            <div className="bg-card p-6 rounded-lg border border-border mt-8">
              <h3 className="text-xl font-bold text-foreground mb-3">Get your lawn spring-ready</h3>
              <p className="text-muted-foreground mb-4">
                Let our experts handle your spring lawn care so you can enjoy a beautiful, healthy lawn all season long.
              </p>
              <Button variant="accent" asChild>
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
