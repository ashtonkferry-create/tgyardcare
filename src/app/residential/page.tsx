import type { Metadata } from 'next';
import ResidentialContent from './ResidentialContent';

export const metadata: Metadata = {
  title: 'Residential Lawn Care Madison WI | 14 Services | TG Yard Care',
  description: "Residential lawn care for Madison & Dane County homeowners. Weekly mowing, mulching, gutter cleaning & seasonal cleanups. Same crew every visit. Free quote today!",
  keywords: 'residential lawn care Madison WI, home lawn service Middleton, mowing Waunakee, mulching Sun Prairie, gutter cleaning Fitchburg, Verona yard care, Dane County lawn service',
  alternates: {
    canonical: 'https://tgyardcare.com/residential',
  },
  openGraph: {
    title: 'Residential Lawn Care Madison WI | 14 Services | TG Yard Care',
    description: 'Residential lawn care for Madison & Dane County homeowners. Weekly mowing, mulching, gutter cleaning & seasonal cleanups. Same crew every visit. Free quote today!',
    url: 'https://tgyardcare.com/residential',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function ResidentialPage() {
  return <ResidentialContent />;
}
