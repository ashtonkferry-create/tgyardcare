import type { Metadata } from 'next';
import SpringCleanupContent from './SpringCleanupContent';

export const metadata: Metadata = {
  title: 'Spring Cleanup Madison WI — 4.9★ Rated | TotalGuard',
  description: 'Professional spring cleanup in Madison & Dane County. Debris removal, bed prep & edging. Free quote: (608) 535-6057.',
  keywords: 'spring cleanup Madison WI, spring yard cleanup Middleton, Waunakee spring maintenance, Sun Prairie lawn prep, Fitchburg spring service, Dane County spring landscaping',
  alternates: { canonical: 'https://tgyardcare.com/services/spring-cleanup' },
  openGraph: {
    title: 'Spring Cleanup Madison WI — 4.9★ Rated | TotalGuard',
    description: 'Professional spring cleanup in Madison & Dane County. Debris removal, bed prep & edging. Free quote: (608) 535-6057.',
    url: 'https://tgyardcare.com/services/spring-cleanup',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function SpringCleanupPage() {
  return <SpringCleanupContent />;
}
