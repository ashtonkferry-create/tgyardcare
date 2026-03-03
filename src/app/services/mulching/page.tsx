import type { Metadata } from 'next';
import MulchingContent from './MulchingContent';

export const metadata: Metadata = {
  title: 'Mulching Service Madison WI | Hardwood Mulch | TG Yard Care',
  description: 'Premium hardwood mulch installation in Madison & Dane County. Weed suppression & plant protection. Free delivery!',
  keywords: 'mulching Madison WI, mulch installation Middleton, garden bed mulch Waunakee, Sun Prairie mulching, Fitchburg landscape mulch, Dane County mulch delivery',
  alternates: { canonical: 'https://tgyardcare.com/services/mulching' },
};

export default function MulchingPage() {
  return <MulchingContent />;
}
