import type { Metadata } from 'next';
import GutterGuardsContent from './GutterGuardsContent';

export const metadata: Metadata = {
  title: 'Gutter Guards Madison WI | Installation | TG Yard Care',
  description: 'Never clean gutters again. Professional gutter guard installation in Madison & Dane County. Prevent ice dams. Free quote!',
  keywords: 'gutter guards Madison WI, gutter protection Middleton, leaf guards Waunakee, Sun Prairie gutter installation, Dane County gutter guards, Fitchburg gutter screens',
  alternates: { canonical: 'https://tgyardcare.com/services/gutter-guards' },
  openGraph: {
    title: 'Gutter Guards Madison WI | Installation | TG Yard Care',
    description: 'Never clean gutters again. Professional gutter guard installation in Madison & Dane County. Prevent ice dams. Free quote!',
    url: 'https://tgyardcare.com/services/gutter-guards',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function GutterGuardsPage() {
  return <GutterGuardsContent />;
}
