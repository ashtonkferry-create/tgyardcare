import type { Metadata } from 'next';
import HardscapingContent from './HardscapingContent';

export const metadata: Metadata = {
  title: 'Hardscaping Services Madison WI | Patios, Walls & Firepits | TG Yard Care',
  description: 'Professional hardscaping in Madison & Dane County. Paver patios, retaining walls, firepits, stone walkways & more. Built to last through Wisconsin winters. Free estimates!',
  keywords: 'hardscaping Madison WI, paver patios Madison, retaining walls Dane County, firepits Madison WI, stone walkways Verona, flagstone patios Middleton, hardscape contractor Wisconsin',
  alternates: { canonical: 'https://tgyardcare.com/services/hardscaping' },
  openGraph: {
    title: 'Hardscaping Services Madison WI | Patios, Walls & Firepits | TG Yard Care',
    description: 'Professional hardscaping in Madison & Dane County. Paver patios, retaining walls, firepits, stone walkways & more. Built to last through Wisconsin winters. Free estimates!',
    url: 'https://tgyardcare.com/services/hardscaping',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function HardscapingPage() {
  return <HardscapingContent />;
}
