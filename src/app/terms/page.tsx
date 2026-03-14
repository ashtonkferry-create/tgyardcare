import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const metadata: Metadata = {
  title: 'Terms of Service | TotalGuard Yard Care',
  description: 'TotalGuard Yard Care terms of service. Review the terms and conditions for using our lawn care and yard maintenance services.',
  alternates: {
    canonical: 'https://tgyardcare.com/terms',
  },
  openGraph: {
    title: 'Terms of Service | TotalGuard Yard Care',
    description: 'TotalGuard Yard Care terms of service. Review the terms and conditions for using our lawn care and yard maintenance services.',
    url: 'https://tgyardcare.com/terms',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function TermsPage() {
  return <TermsContent />;
}
