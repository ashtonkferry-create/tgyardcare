import type { Metadata } from 'next';
import { Suspense } from 'react';
import GetQuoteContent from './GetQuoteContent';

export const metadata: Metadata = {
  title: 'Get Your Free Quote | TG Yard Care Madison WI',
  description: 'Get an instant price estimate for lawn care, mowing, gutter cleaning, and more in Madison & Dane County. No obligation, same-day response.',
  keywords: 'lawn care quote Madison, free estimate yard care, lawn mowing price Middleton, gutter cleaning quote',
  alternates: {
    canonical: 'https://tgyardcare.com/get-quote',
  },
};

export default function GetQuotePage() {
  return (
    <Suspense>
      <GetQuoteContent />
    </Suspense>
  );
}
