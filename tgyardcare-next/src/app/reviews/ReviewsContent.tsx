'use client';

import { Star, Quote, ThumbsUp, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ReviewSchema } from "@/components/ReviewSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import googleBadge from "@/assets/google-review-badge.png";

const reviews = [
  {
    name: "Jennifer M.",
    rating: 5,
    date: "2 weeks ago",
    text: "TotalGuard has been maintaining our lawn for over a year now and we couldn't be happier! Alex and Vance are always professional, responsive, and go above and beyond. Our yard has never looked better. Highly recommend!",
    service: "Lawn Mowing & Maintenance"
  },
  {
    name: "Michael R.",
    rating: 5,
    date: "1 month ago",
    text: "Exceptional service from start to finish. They completely transformed our overgrown garden beds with fresh mulch and weeding. The before and after is night and day. These guys really care about their work!",
    service: "Garden Bed Makeover"
  },
  {
    name: "Sarah L.",
    rating: 5,
    date: "1 month ago",
    text: "We hired TotalGuard for fall cleanup and gutter cleaning. They were prompt, thorough, and very reasonably priced. Our gutters are flowing perfectly and the yard looks immaculate. Will definitely use them again!",
    service: "Fall Cleanup & Gutter Cleaning"
  },
  {
    name: "David K.",
    rating: 5,
    date: "2 months ago",
    text: "Best lawn care service in Madison! They're reliable, affordable, and do amazing work. My neighbors have been asking who takes care of my lawn because it looks so good. Thank you TotalGuard!",
    service: "Weekly Lawn Care"
  },
  {
    name: "Emily P.",
    rating: 5,
    date: "2 months ago",
    text: "I was struggling with weeds taking over my lawn and garden beds. TotalGuard came in with a comprehensive plan and executed it perfectly. My yard is finally under control and looks beautiful. So grateful for their expertise!",
    service: "Weeding & Herbicide Treatment"
  },
  {
    name: "Robert T.",
    rating: 5,
    date: "3 months ago",
    text: "TotalGuard installed gutter guards on our home and the difference is incredible. No more clogged gutters or water issues. The installation was clean and professional. Great investment!",
    service: "Gutter Guard Installation"
  },
  {
    name: "Lisa H.",
    rating: 5,
    date: "3 months ago",
    text: "Alex and Vance are young entrepreneurs who really know their stuff. They're punctual, detail-oriented, and their prices are very fair. We've been using them all season and plan to continue. Highly recommend supporting this local business!",
    service: "Seasonal Services"
  },
  {
    name: "James W.",
    rating: 5,
    date: "4 months ago",
    text: "Had TotalGuard do our spring cleanup and fertilization. They removed all the winter debris, overseeded bare spots, and now our lawn is thick and green. Excellent communication throughout the whole process.",
    service: "Spring Cleanup & Fertilization"
  },
  {
    name: "Amanda S.",
    rating: 5,
    date: "4 months ago",
    text: "We've tried several lawn care companies in Madison and TotalGuard is by far the best. They're responsive to texts, show up when they say they will, and the quality of work is outstanding. You won't be disappointed!",
    service: "Lawn Maintenance"
  },
  {
    name: "Thomas B.",
    rating: 5,
    date: "5 months ago",
    text: "Our yard was a mess when we bought our home. TotalGuard came in and completely transformed it - mulching, weeding, lawn care, the works. They're honest, hardworking, and deliver great results. 10/10 would recommend!",
    service: "Complete Yard Transformation"
  },
  {
    name: "Karen D.",
    rating: 5,
    date: "5 months ago",
    text: "Professional, reliable, and affordable. TotalGuard has been handling our leaf removal for two seasons now. They're always on time and do a thorough job. Makes fall so much easier!",
    service: "Leaf Removal"
  },
  {
    name: "Paul M.",
    rating: 5,
    date: "6 months ago",
    text: "Hired TotalGuard for gutter cleaning after years of neglecting it. They cleaned everything out, showed me photos of the work, and gave great advice on maintenance. Very satisfied with their service!",
    service: "Gutter Cleaning"
  }
];

const stats = [
  { number: "4.9", label: "Average Rating", icon: Star },
  { number: "60+", label: "Verified Reviews", icon: ThumbsUp },
  { number: "24hr", label: "Response Commitment", icon: CheckCircle }
];

export default function ReviewsContent() {
  return (
    <div className="min-h-screen bg-background">
      <ReviewSchema reviews={reviews} />
      <Navigation />

      <section className="sr-only">
        <h2>TG Yard Care Customer Reviews</h2>
        <p>TG Yard Care has earned a 4.9-star rating from 60+ verified Google reviews. Customers consistently praise our reliability, attention to detail, and same-crew-every-visit commitment. Read real testimonials from Madison-area homeowners and property managers who trust TotalGuard for their lawn care and landscaping needs.</p>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <img
                src={typeof googleBadge === 'string' ? googleBadge : googleBadge.src}
                alt="TotalGuard Yard Care 4.9 star rating on Google Reviews"
                className="h-20 w-auto"
                loading="eager"
                width="160"
                height="80"
              />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              What <span className="text-primary">Madison Homeowners</span> Say
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              60+ verified Google reviews. 4.9&#9733; average rating. Read what clients say about our response time, crew consistency, and service execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg font-bold" asChild>
                <Link href="/contact">
                  Get a Free Quote
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg font-bold" asChild>
                <a href="tel:608-535-6057">
                  Call (608) 535-6057
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real reviews from real customers across Madison, Middleton, and Waunakee
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-primary/50 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{review.name}</h3>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                  <Quote className="h-8 w-8 text-primary/20 flex-shrink-0" />
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-foreground mb-4 flex-grow leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-primary font-semibold">{review.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary via-primary/90 to-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience 5-Star Service?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join hundreds of satisfied homeowners in Madison. Get your free quote today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg font-bold" asChild>
              <Link href="/contact">
                Request Free Quote
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg font-bold border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <a href="tel:608-535-6057">
                Call (608) 535-6057
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
