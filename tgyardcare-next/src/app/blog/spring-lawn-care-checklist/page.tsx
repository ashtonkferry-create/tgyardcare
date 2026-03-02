import type { Metadata } from 'next';
import SpringLawnCareContent from './SpringLawnCareContent';

export const metadata: Metadata = {
  title: 'Spring Lawn Care Checklist Madison WI | Expert Tips 2024',
  description: 'Prepare your Madison lawn for spring! Complete checklist: debris cleanup, dethatching, fertilizing & more. Get a lush, healthy lawn this season!',
  keywords: 'spring lawn care Madison, Wisconsin lawn care tips, spring lawn checklist, Madison lawn preparation',
  alternates: {
    canonical: 'https://tgyardcare.com/blog/spring-lawn-care-checklist',
  },
  openGraph: {
    title: 'Spring Lawn Care Checklist Madison WI | Expert Tips 2024',
    description: 'Prepare your Madison lawn for spring! Complete checklist: debris cleanup, dethatching, fertilizing & more.',
    url: '/blog/spring-lawn-care-checklist',
    type: 'article',
    authors: ['TotalGuard Yard Care'],
    publishedTime: '2024-03-15',
  },
};

export default function SpringLawnCarePage() {
  return <SpringLawnCareContent />;
}
