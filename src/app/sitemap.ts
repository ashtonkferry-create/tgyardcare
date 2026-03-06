import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tgyardcare.com';
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'weekly', priority: 1.0, lastModified: now },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.9, lastModified: now },
    { url: `${baseUrl}/services`, changeFrequency: 'weekly', priority: 0.9, lastModified: now },
    { url: `${baseUrl}/commercial`, changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: `${baseUrl}/residential`, changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: `${baseUrl}/gallery`, changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: `${baseUrl}/reviews`, changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: `${baseUrl}/faq`, changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly', priority: 0.7, lastModified: now },
    { url: `${baseUrl}/team`, changeFrequency: 'monthly', priority: 0.6, lastModified: now },
    { url: `${baseUrl}/service-areas`, changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    // /get-quote excluded — it redirects to /contact
    { url: `${baseUrl}/careers`, changeFrequency: 'monthly', priority: 0.5, lastModified: now },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly', priority: 0.3, lastModified: now },
  ];

  const servicePages: MetadataRoute.Sitemap = [
    'mowing', 'weeding', 'mulching', 'leaf-removal', 'spring-cleanup',
    'fall-cleanup', 'gutter-cleaning', 'gutter-guards', 'garden-beds',
    'fertilization', 'herbicide', 'snow-removal', 'pruning', 'aeration',
  ].map(slug => ({
    url: `${baseUrl}/services/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    lastModified: now,
  }));

  const commercialPages: MetadataRoute.Sitemap = [
    'lawn-care', 'seasonal', 'gutters', 'snow-removal',
    'property-enhancement', 'fertilization-weed-control', 'aeration',
  ].map(slug => ({
    url: `${baseUrl}/commercial/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    lastModified: now,
  }));

  const locationPages: MetadataRoute.Sitemap = [
    'madison', 'middleton', 'waunakee', 'monona', 'sun-prairie',
    'fitchburg', 'verona', 'mcfarland', 'cottage-grove', 'deforest',
    'oregon', 'stoughton',
  ].map(slug => ({
    url: `${baseUrl}/locations/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    lastModified: now,
  }));

  const cityServicePages: MetadataRoute.Sitemap = [
    'lawn-care-madison-wi', 'lawn-care-middleton-wi',
    'gutter-cleaning-madison-wi', 'snow-removal-madison-wi',
  ].map(slug => ({
    url: `${baseUrl}/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    lastModified: now,
  }));

  const blogPages: MetadataRoute.Sitemap = [
    'spring-lawn-care-checklist', 'fall-cleanup-importance',
  ].map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
    lastModified: now,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...commercialPages,
    ...locationPages,
    ...cityServicePages,
    ...blogPages,
  ];
}
