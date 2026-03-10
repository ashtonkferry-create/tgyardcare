import type { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // All 15 service directories (verified against src/app/services/)
  const servicePages: MetadataRoute.Sitemap = [
    'mowing', 'weeding', 'mulching', 'leaf-removal', 'spring-cleanup',
    'fall-cleanup', 'gutter-cleaning', 'gutter-guards', 'garden-beds',
    'fertilization', 'herbicide', 'snow-removal', 'pruning', 'aeration',
    'hardscaping',
  ].map(slug => ({
    url: `${baseUrl}/services/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
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

  // Location pages — HIGH priority (local SEO money pages)
  const locationPages: MetadataRoute.Sitemap = [
    'madison', 'middleton', 'waunakee', 'monona', 'sun-prairie',
    'fitchburg', 'verona', 'mcfarland', 'cottage-grove', 'deforest',
    'oregon', 'stoughton',
  ].map(slug => ({
    url: `${baseUrl}/locations/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
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

  // Dynamic blog posts from Supabase
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, published_at, updated_at')
      .eq('status', 'published')
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false });

    if (posts && posts.length > 0) {
      blogPages = posts.map(post => ({
        url: `${baseUrl}/blog/${post.slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        lastModified: post.updated_at ? new Date(post.updated_at) : new Date(post.published_at),
      }));
    }
  } catch {
    // Fallback to hardcoded slugs if Supabase is unavailable
    blogPages = [
      'spring-lawn-care-checklist', 'fall-cleanup-importance',
    ].map(slug => ({
      url: `${baseUrl}/blog/${slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
      lastModified: now,
    }));
  }

  // Always include hardcoded posts even if not in DB
  const blogSlugs = new Set(blogPages.map(p => p.url));
  const hardcodedSlugs = ['spring-lawn-care-checklist', 'fall-cleanup-importance'];
  for (const slug of hardcodedSlugs) {
    const url = `${baseUrl}/blog/${slug}`;
    if (!blogSlugs.has(url)) {
      blogPages.push({
        url,
        changeFrequency: 'yearly' as const,
        priority: 0.6,
        lastModified: now,
      });
    }
  }

  const blogCategoryPages: MetadataRoute.Sitemap = [
    'seasonal-tips', 'service-guides', 'local-guides', 'how-to', 'faq-answers',
  ].map(slug => ({
    url: `${baseUrl}/blog/category/${slug}`,
    changeFrequency: 'weekly' as const,
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
    ...blogCategoryPages,
  ];
}
