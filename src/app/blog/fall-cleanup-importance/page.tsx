import type { Metadata } from 'next';
import FallCleanupImportanceContent from './FallCleanupImportanceContent';

export const metadata: Metadata = {
  title: 'Why Fall Cleanup Matters | Madison Lawn Care Tips 2026',
  description: 'Discover why fall cleanup is critical for lawn health! Prevent snow mold, protect grass & save money on spring repairs. Expert Madison lawn care advice.',
  keywords: 'fall cleanup importance, Madison fall lawn care, autumn yard maintenance, prevent snow mold Wisconsin',
  alternates: {
    canonical: 'https://tgyardcare.com/blog/fall-cleanup-importance',
  },
  openGraph: {
    title: 'Why Fall Cleanup Matters | Madison Lawn Care Tips 2026',
    description: 'Discover why fall cleanup is critical for lawn health! Prevent snow mold, protect grass & save money on spring repairs.',
    url: '/blog/fall-cleanup-importance',
    type: 'article',
    authors: ['TotalGuard Yard Care'],
    publishedTime: '2023-10-08',
  },
};

export default function FallCleanupImportancePage() {
  return <FallCleanupImportanceContent />;
}
