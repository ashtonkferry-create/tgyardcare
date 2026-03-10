import type { Metadata } from 'next';
import HardscapingContent from './HardscapingContent';

export const metadata: Metadata = {
  title: 'Hardscaping Madison WI — Patios & Walls | TotalGuard',
  description: 'Professional hardscaping in Madison & Dane County. Patios, retaining walls, firepits & walkways. Free quote: (608) 535-6057.',
  keywords: 'hardscaping Madison WI, paver patios Madison, retaining walls Dane County, firepits Madison WI, stone walkways Verona, flagstone patios Middleton, hardscape contractor Wisconsin',
  alternates: { canonical: 'https://tgyardcare.com/services/hardscaping' },
  openGraph: {
    title: 'Hardscaping Madison WI — Patios & Walls | TotalGuard',
    description: 'Professional hardscaping in Madison & Dane County. Patios, retaining walls, firepits & walkways. Free quote: (608) 535-6057.',
    url: 'https://tgyardcare.com/services/hardscaping',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function HardscapingPage() {
  return <HardscapingContent />;
}
