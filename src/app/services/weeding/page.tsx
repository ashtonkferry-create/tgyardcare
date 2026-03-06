import type { Metadata } from 'next';
import WeedingContent from './WeedingContent';

export const metadata: Metadata = {
  title: 'Weeding Service Madison WI | Garden Beds | TG Yard Care',
  description: 'Professional hand weeding in Madison & Dane County. Thorough root removal for pristine beds. Free quotes!',
  keywords: 'weeding Madison WI, garden weeding Middleton, weed removal Waunakee, Sun Prairie weed control, Dane County garden maintenance, Fitchburg bed weeding',
  alternates: { canonical: 'https://tgyardcare.com/services/weeding' },
  openGraph: {
    title: 'Weeding Service Madison WI | Garden Beds | TG Yard Care',
    description: 'Professional hand weeding in Madison & Dane County. Thorough root removal for pristine beds. Free quotes!',
    url: 'https://tgyardcare.com/services/weeding',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function WeedingPage() {
  return <WeedingContent />;
}
