import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { GlobalSchema } from '@/components/GlobalSchema';
import { NavigationSchema } from '@/components/schemas/NavigationSchema';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | TG Yard Care',
    default: 'TG Yard Care | Professional Lawn Care & Landscaping in Madison, WI',
  },
  description:
    "Madison's most dependable yard care -- clean, precise mowing, landscaping, gutters, and seasonal cleanups done right the first time.",
  keywords: [
    'Madison lawn care',
    'Wisconsin landscaping',
    'lawn mowing Madison',
    'mulching service',
    'gutter cleaning Madison',
    'leaf removal',
    'spring cleanup',
    'fall cleanup',
    'garden beds',
    'fertilization',
    'overseeding',
  ],
  authors: [{ name: 'TG Yard Care' }],
  verification: {
    google: 'W06QbLPFcD9e2S7-dOeriShueA7MNqp4n7Rvjyaw3PY',
  },
  openGraph: {
    type: 'website',
    url: 'https://tgyardcare.com/',
    title: 'TG Yard Care | Professional Lawn Care & Landscaping in Madison, WI',
    description:
      "Madison's most dependable yard care -- clean, precise mowing, landscaping, gutters, and seasonal cleanups done right the first time.",
    siteName: 'TG Yard Care',
    locale: 'en_US',
    images: [{ url: 'https://tgyardcare.com/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TG Yard Care | Professional Lawn Care & Landscaping in Madison, WI',
    description:
      "Madison's most dependable yard care -- clean, precise mowing, landscaping, gutters, and seasonal cleanups done right the first time.",
    images: ['https://tgyardcare.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://tgyardcare.com',
    languages: {
      'en-US': 'https://tgyardcare.com/',
      'x-default': 'https://tgyardcare.com/',
    },
  },
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Madison',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GlobalSchema />
        <NavigationSchema />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
