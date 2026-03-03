import type { Metadata } from 'next';
import MowingContent from './MowingContent';

export const metadata: Metadata = {
  title: 'Lawn Mowing Service Madison WI | Weekly | TG Yard Care',
  description: 'Professional weekly lawn mowing in Madison & Dane County. Same crew every visit, clean edges, professional stripes. Serving 500+ properties. Get your free quote!',
  keywords: 'lawn mowing Madison WI, grass cutting Middleton, weekly mowing Waunakee, Sun Prairie lawn care, Fitchburg lawn service, Verona mowing, Dane County lawn mowing',
  alternates: { canonical: 'https://tgyardcare.com/services/mowing' },
};

export default function MowingPage() {
  return <MowingContent />;
}
