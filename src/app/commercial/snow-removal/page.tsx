import type { Metadata } from 'next';
import CommercialSnowRemovalContent from './CommercialSnowRemovalContent';

export const metadata: Metadata = {
  title: 'Commercial Snow Removal Madison WI | 24/7 | TG Yard Care',
  description: 'Commercial snow removal for HOAs & facilities in Madison, WI. Documented storm response, 24/7 service & liability protection. Seasonal contracts available. Get quote!',
  keywords: 'commercial snow removal Madison, HOA snow plowing Wisconsin, commercial de-icing, property management snow service',
  alternates: {
    canonical: 'https://tgyardcare.com/commercial/snow-removal',
  },
  openGraph: {
    title: 'Commercial Snow Removal Madison WI | 24/7 | TG Yard Care',
    description: 'Commercial snow removal for HOAs & facilities in Madison, WI. Documented storm response, 24/7 service & liability protection. Seasonal contracts available. Get quote!',
    url: 'https://tgyardcare.com/commercial/snow-removal',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function CommercialSnowRemovalPage() {
  return <CommercialSnowRemovalContent />;
}
