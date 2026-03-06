import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Free Lawn Care Quote Madison WI | 24hr Reply | TG Yard Care',
  description: "Get your free lawn care quote in under 60 seconds. Serving Madison, Middleton, Waunakee & Dane County. 24-hour response guaranteed. Call (608) 535-6057 today!",
  keywords: 'contact lawn care Madison WI, lawn service quote Middleton, Waunakee landscaping quote, Sun Prairie yard care quote, Dane County lawn service contact',
  alternates: {
    canonical: 'https://tgyardcare.com/contact',
  },
  openGraph: {
    title: 'Free Lawn Care Quote Madison WI | 24hr Reply | TG Yard Care',
    description: 'Get your free lawn care quote in under 60 seconds. Serving Madison, Middleton, Waunakee & Dane County. 24-hour response guaranteed. Call (608) 535-6057 today!',
    url: 'https://tgyardcare.com/contact',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <Suspense>
      <ContactContent />
    </Suspense>
  );
}
