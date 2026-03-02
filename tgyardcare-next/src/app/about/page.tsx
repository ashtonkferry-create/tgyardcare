import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About TotalGuard Yard Care | Madison WI Lawn Care Company',
  description: "Madison's reliability-first lawn care company. Learn how our systems for response time, crew consistency, and accountability set us apart across Dane County.",
  keywords: 'about TotalGuard, Madison lawn care company, reliable lawn service Middleton, Waunakee yard care, Sun Prairie landscaping, Dane County lawn company',
  alternates: {
    canonical: 'https://tgyardcare.com/about',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
