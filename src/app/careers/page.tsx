import type { Metadata } from 'next';
import CareersContent from './CareersContent';

export const metadata: Metadata = {
  title: 'Careers at TotalGuard Yard Care | Join Our Team',
  description: 'Join the team at TotalGuard Yard Care. Explore current job openings, company culture, growth opportunities, and how to apply. Now hiring in Madison, WI.',
  keywords: 'careers at TotalGuard Yard Care, job openings, employment opportunities, work with us, join our team, careers in lawn care, Madison WI jobs, yard care careers',
  alternates: {
    canonical: 'https://tgyardcare.com/careers',
  },
  openGraph: {
    title: 'Careers at TotalGuard Yard Care | Join Our Team',
    description: 'Join the team at TotalGuard Yard Care. Explore current job openings, company culture, growth opportunities, and how to apply. Now hiring in Madison, WI.',
    url: 'https://tgyardcare.com/careers',
    siteName: 'TG Yard Care',
    locale: 'en_US',
    type: 'website',
  },
};

export default function CareersPage() {
  return <CareersContent />;
}
