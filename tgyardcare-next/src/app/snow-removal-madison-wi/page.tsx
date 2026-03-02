import type { Metadata } from 'next';
import SnowRemovalMadisonContent from './SnowRemovalMadisonContent';

export const metadata: Metadata = {
  title: 'Snow Plowing Madison WI | Cleared by 7am | TG Yard Care',
  description: 'Professional snow removal in Madison, WI. Driveways & walkways cleared by 7am with salt included. Per-visit or seasonal contracts available. Get your free quote!',
  keywords: 'snow removal Madison WI, snow plowing Madison Wisconsin, driveway snow removal Madison, residential snow service Madison, winter snow clearing Madison',
  alternates: {
    canonical: 'https://tgyardcare.com/snow-removal-madison-wi',
  },
  openGraph: {
    title: 'Snow Plowing Madison WI | Cleared by 7am | TG Yard Care',
    description: 'Professional snow removal in Madison, WI. Driveways & walkways cleared by 7am with salt included. Per-visit or seasonal contracts available.',
    url: '/snow-removal-madison-wi',
  },
};

export default function SnowRemovalMadisonPage() {
  return <SnowRemovalMadisonContent />;
}
