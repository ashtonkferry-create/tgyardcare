import type { Metadata } from 'next';
import SnowRemovalContent from './SnowRemovalContent';

export const metadata: Metadata = {
  title: 'Snow Removal Madison WI | 24/7 Storm Response | TG Yard Care',
  description: 'Fast snow plowing in Madison & Dane County with 24/7 storm response. Driveways, walkways & ice management included. Seasonal contracts available. Call today!',
  keywords: 'snow removal Madison WI, snow plowing Middleton, driveway clearing Waunakee, Sun Prairie snow service, Fitchburg plowing, Verona snow removal, Dane County winter maintenance',
  alternates: { canonical: 'https://tgyardcare.com/services/snow-removal' },
};

export default function SnowRemovalPage() {
  return <SnowRemovalContent />;
}
