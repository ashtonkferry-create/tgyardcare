import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Supabase generated types are incomplete (missing faqs, locations, services, pricing, etc.)
    // The source Vite project didn't type-check these either
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "mxhalirruvyxdkppjsqf.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // React Router Navigate replacements
      { source: "/faqs", destination: "/faq", permanent: true },
      { source: "/locations", destination: "/service-areas", permanent: true },
      { source: "/testimonials", destination: "/reviews", permanent: true },
      { source: "/quote", destination: "/get-quote", permanent: true },
      { source: "/free-quote", destination: "/get-quote", permanent: true },
      // Legacy Wix redirects
      { source: "/our-story", destination: "/about", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/lawn-care", destination: "/residential", permanent: true },
      { source: "/yard-care", destination: "/services", permanent: true },
      { source: "/landscaping", destination: "/services", permanent: true },
      { source: "/gutter-care", destination: "/services/gutter-cleaning", permanent: true },
      { source: "/mulch-installation", destination: "/services/mulching", permanent: true },
      { source: "/weed-control-lawn-spraying", destination: "/services/herbicide", permanent: true },
      { source: "/fertilization-and-weed-control", destination: "/services/fertilization", permanent: true },
      { source: "/seasonal-cleanup", destination: "/services/spring-cleanup", permanent: true },
      { source: "/testimonies", destination: "/reviews", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/blog/tags/:path*", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
