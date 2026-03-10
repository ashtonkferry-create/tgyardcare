import type { Metadata } from 'next';
import SnowRemovalContent from './SnowRemovalContent';

export const metadata: Metadata = {
  title: 'Snow Removal Madison WI — 24/7 Service | TotalGuard',
  description: 'Fast snow plowing in Madison & Dane County. 24/7 storm response, driveways & walkways. Free quote: (608) 535-6057.',
  keywords: 'snow removal Madison WI, snow plowing Middleton, driveway clearing Waunakee, Sun Prairie snow service, Fitchburg plowing, Verona snow removal, Dane County winter maintenance',
  alternates: { canonical: 'https://tgyardcare.com/services/snow-removal' },
  openGraph: {
    title: 'Snow Removal Madison WI — 24/7 Service | TotalGuard',
    description: 'Fast snow plowing in Madison & Dane County. 24/7 storm response, driveways & walkways. Free quote: (608) 535-6057.',
    url: 'https://tgyardcare.com/services/snow-removal',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function SnowRemovalPage() {
  return <SnowRemovalContent />;
}
