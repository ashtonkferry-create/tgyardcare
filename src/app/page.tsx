import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const metadata: Metadata = {
  title: '#1 Lawn Care in Madison WI — 4.9★ Rated | TotalGuard Yard Care',
  description: "Madison's top-rated lawn care company. Same crew every week, 500+ properties served across Dane County. Mowing, aeration, gutters, mulching & cleanups. Call (608) 535-6057 for a free quote.",
  keywords: 'lawn care Madison WI, lawn mowing Middleton, mulching Waunakee, gutter cleaning Sun Prairie, Fitchburg landscaping, Verona yard care, Dane County lawn service, lawn care companies Madison WI, lawn aeration Madison',
  alternates: {
    canonical: 'https://tgyardcare.com',
  },
  openGraph: {
    title: '#1 Lawn Care in Madison WI — 4.9★ Rated | TotalGuard Yard Care',
    description: "Madison's top-rated lawn care company. Same crew every week, 500+ properties served across Dane County. Free quote today!",
    url: '/',
  },
};

export default function HomePage() {
  return <HomeContent />;
}
