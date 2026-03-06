import type { Metadata } from 'next';
import ReviewsContent from './ReviewsContent';

export const metadata: Metadata = {
  title: 'Customer Reviews | 80+ Verified Ratings | TotalGuard Madison',
  description: "Read 80+ real reviews from Madison homeowners. See why we maintain a 4.9\u2605 Google rating. Same crew, 24hr response, documented service.",
  keywords: 'TotalGuard reviews, Madison lawn care reviews, Wisconsin landscaping testimonials, yard care customer reviews, verified lawn service',
  alternates: {
    canonical: 'https://tgyardcare.com/reviews',
  },
  openGraph: {
    title: 'Customer Reviews | 80+ Verified Ratings | TotalGuard Madison',
    description: 'Read 80+ real reviews from Madison homeowners. See why we maintain a 4.9 Google rating. Same crew, 24hr response, documented service.',
    url: 'https://tgyardcare.com/reviews',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function ReviewsPage() {
  return <ReviewsContent />;
}
