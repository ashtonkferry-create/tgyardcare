import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

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
    icon: 'https://storage.googleapis.com/gpt-engineer-file-uploads/dBy3Eb9lpdUVQ8p8JOd8tIKKabx1/uploads/1770045601762-TotalGuard Yard Care LOGO_edited.png',
  },
};

function GlobalJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://tgyardcare.com/#organization',
    name: 'TG Yard Care',
    alternateName: 'TotalGuard Yard Care',
    image:
      'https://tgyardcare.com/images/totalguard-logo-full.png',
    logo: 'https://tgyardcare.com/images/totalguard-logo-full.png',
    url: 'https://tgyardcare.com',
    telephone: '+1-608-535-6057',
    email: 'totalguardllc@gmail.com',
    description:
      'Professional lawn care and landscaping services in Madison, Wisconsin. Expert mowing, mulching, gutter cleaning, seasonal cleanup and more. 4.9 rated with 100% satisfaction guarantee.',
    slogan: "Madison's Most Reliable Yard Care",
    foundingDate: '2019',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 2,
      maxValue: 5,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Madison',
      addressRegion: 'WI',
      postalCode: '53703',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.0731,
      longitude: -89.4012,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '16:00',
      },
    ],
    sameAs: [
      'https://facebook.com/totalguardyardcare',
      'https://instagram.com/tgyardcare',
    ],
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Check', 'Credit Card', 'Venmo'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '60',
      bestRating: '5',
      worstRating: '1',
    },
    areaServed: [
      { '@type': 'City', name: 'Madison', containedInPlace: { '@type': 'State', name: 'Wisconsin' } },
      { '@type': 'City', name: 'Middleton', containedInPlace: { '@type': 'State', name: 'Wisconsin' } },
      { '@type': 'City', name: 'Waunakee', containedInPlace: { '@type': 'State', name: 'Wisconsin' } },
      { '@type': 'City', name: 'Monona', containedInPlace: { '@type': 'State', name: 'Wisconsin' } },
      { '@type': 'City', name: 'Sun Prairie', containedInPlace: { '@type': 'State', name: 'Wisconsin' } },
      { '@type': 'City', name: 'Fitchburg', containedInPlace: { '@type': 'State', name: 'Wisconsin' } },
      { '@type': 'City', name: 'Verona', containedInPlace: { '@type': 'State', name: 'Wisconsin' } },
      { '@type': 'City', name: 'McFarland', containedInPlace: { '@type': 'State', name: 'Wisconsin' } },
      { '@type': 'City', name: 'Cottage Grove', containedInPlace: { '@type': 'State', name: 'Wisconsin' } },
      { '@type': 'City', name: 'DeForest', containedInPlace: { '@type': 'State', name: 'Wisconsin' } },
      { '@type': 'City', name: 'Oregon', containedInPlace: { '@type': 'State', name: 'Wisconsin' } },
      { '@type': 'City', name: 'Stoughton', containedInPlace: { '@type': 'State', name: 'Wisconsin' } },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Lawn Care Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lawn Mowing', description: 'Professional lawn mowing with edging and trimming', url: 'https://tgyardcare.com/services/mowing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mulching', description: 'Premium garden bed mulch installation', url: 'https://tgyardcare.com/services/mulching' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Leaf Removal', description: 'Fall leaf cleanup and removal services', url: 'https://tgyardcare.com/services/leaf-removal' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gutter Cleaning', description: 'Professional gutter cleaning and maintenance', url: 'https://tgyardcare.com/services/gutter-cleaning' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Spring Cleanup', description: 'Comprehensive spring yard cleanup services', url: 'https://tgyardcare.com/services/spring-cleanup' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fall Cleanup', description: 'Complete fall yard maintenance and cleanup', url: 'https://tgyardcare.com/services/fall-cleanup' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fertilization', description: 'Lawn fertilization and overseeding programs', url: 'https://tgyardcare.com/services/fertilization' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Herbicide Services', description: 'Professional weed control treatments', url: 'https://tgyardcare.com/services/herbicide' } },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GlobalJsonLd />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
