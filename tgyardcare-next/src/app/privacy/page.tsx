import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy | TotalGuard Yard Care',
  description: 'TotalGuard Yard Care privacy policy. Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://tgyardcare.com/privacy',
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
