import type { Metadata } from 'next';
import MadisonContent from './MadisonContent';

export const metadata: Metadata = {
  title: 'Lawn Care Madison Wisconsin | Local Pros | TG Yard Care',
  description: 'Professional lawn care in Madison, Wisconsin. Mowing, mulching, gutter cleaning, seasonal cleanups & more. 4.9★ rated with 500+ happy customers. Free same-day quotes!',
  keywords: 'Madison lawn care, Madison landscaping, lawn mowing Madison WI, gutter cleaning Madison, mulching Madison, leaf removal Madison',
  alternates: { canonical: 'https://tgyardcare.com/locations/madison' },
  openGraph: {
    title: 'Lawn Care Madison Wisconsin | Local Pros | TG Yard Care',
    description: 'Professional lawn care in Madison, Wisconsin. Mowing, mulching, gutter cleaning, seasonal cleanups & more. 4.9★ rated with 500+ happy customers. Free same-day quotes!',
    url: 'https://tgyardcare.com/locations/madison',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function MadisonPage() {
  return <MadisonContent />;
}
