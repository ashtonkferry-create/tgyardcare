import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const metadata: Metadata = {
  title: 'Lawn Care Madison WI | Same Crew Weekly | TG Yard Care',
  description: "Professional lawn care in Madison & Dane County. Same crew every visit, 4.9★ rated, 500+ properties served. Mowing, mulching, gutters & more. Free quote today!",
  keywords: 'lawn care Madison WI, lawn mowing Middleton, mulching Waunakee, gutter cleaning Sun Prairie, Fitchburg landscaping, Verona yard care, Dane County lawn service, Madison property maintenance',
  alternates: {
    canonical: 'https://tgyardcare.com',
  },
  openGraph: {
    title: 'Lawn Care Madison WI | Same Crew Weekly | TG Yard Care',
    description: "Professional lawn care in Madison & Dane County. Same crew every visit, 4.9★ rated, 500+ properties served.",
    url: '/',
  },
};

export default function HomePage() {
  return <HomeContent />;
}
