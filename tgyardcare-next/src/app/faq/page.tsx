import type { Metadata } from 'next';
import FAQContent from './FAQContent';

export const metadata: Metadata = {
  title: 'Lawn Care FAQ | 70+ Questions Answered | TotalGuard Madison',
  description: "Get answers to 70+ lawn care questions. Learn about mowing, mulching, gutter cleaning, seasonal cleanup costs & timing from Madison's top-rated pros.",
  keywords: 'lawn care FAQ, landscaping questions Madison, lawn service cost, yard care answers, TotalGuard FAQ, lawn mowing frequency, gutter cleaning cost',
  alternates: {
    canonical: 'https://tgyardcare.com/faq',
  },
};

export default function FAQPage() {
  return <FAQContent />;
}
