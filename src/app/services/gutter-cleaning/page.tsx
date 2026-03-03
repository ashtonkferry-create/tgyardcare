import type { Metadata } from 'next';
import GutterCleaningContent from './GutterCleaningContent';

export const metadata: Metadata = {
  title: 'Gutter Cleaning Madison WI | Photos | TG Yard Care',
  description: 'Prevent ice dams & water damage with professional gutter cleaning in Madison & Dane County. Downspout flushing, before/after photos included. Free estimate!',
  keywords: 'gutter cleaning Madison WI, gutter service Middleton, downspout cleaning Waunakee, Sun Prairie gutters, Fitchburg gutter maintenance, Dane County gutter cleaning',
  alternates: { canonical: 'https://tgyardcare.com/services/gutter-cleaning' },
};

export default function GutterCleaningPage() {
  return <GutterCleaningContent />;
}
