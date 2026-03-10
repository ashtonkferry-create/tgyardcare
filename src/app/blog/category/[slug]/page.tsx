import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CategoryContent from './CategoryContent';

const CATEGORIES: Record<string, { name: string; description: string }> = {
  'seasonal-tips': {
    name: 'Seasonal Tips',
    description: 'Expert seasonal lawn care advice for Madison, WI homeowners',
  },
  'service-guides': {
    name: 'Service Guides',
    description: 'In-depth guides to our professional lawn and yard care services',
  },
  'local-guides': {
    name: 'Local Guides',
    description: 'Madison-area lawn care insights from local experts',
  },
  'how-to': {
    name: 'How-To Guides',
    description: 'Step-by-step lawn care tutorials from the pros',
  },
  'faq-answers': {
    name: 'FAQ Answers',
    description: 'Answers to common lawn care questions in Madison, WI',
  },
};

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES[slug];

  if (!category) {
    return { title: 'Category Not Found | TotalGuard Yard Care' };
  }

  // Check if category has any published posts — noindex empty categories to avoid Soft 404
  let hasPublishedPosts = false;
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { count } = await supabase
      .from('blog_posts')
      .select('id', { count: 'exact', head: true })
      .eq('category', slug)
      .eq('status', 'published');
    hasPublishedPosts = (count ?? 0) > 0;
  } catch {
    // If Supabase unavailable, default to noindex (safe fallback)
  }

  const title = `${category.name} | TotalGuard Blog`;

  return {
    title,
    description: category.description,
    alternates: {
      canonical: `https://tgyardcare.com/blog/category/${slug}`,
    },
    openGraph: {
      title,
      description: category.description,
      url: `/blog/category/${slug}`,
      siteName: 'TotalGuard Yard Care',
    },
    ...(hasPublishedPosts ? {} : { robots: { index: false, follow: true } }),
  };
}

interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  content: string;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = CATEGORIES[slug];

  if (!category) {
    notFound();
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, published_at, content')
    .eq('category', slug)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching category posts:', error);
  }

  const posts: BlogPostRow[] = (data as BlogPostRow[]) || [];

  return (
    <CategoryContent
      category={slug}
      categoryName={category.name}
      posts={posts}
    />
  );
}
