'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Clock, Leaf, Droplets, TreePine, Snowflake, Scissors } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

interface RelatedPostsProps {
  currentSlug: string;
  currentCategory: string;
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  content: string;
  category: string;
}

function getIconForPost(slug: string) {
  if (slug.includes('spring')) return <Leaf className="h-8 w-8" />;
  if (slug.includes('fall')) return <TreePine className="h-8 w-8" />;
  if (slug.includes('gutter')) return <Droplets className="h-8 w-8" />;
  if (slug.includes('mulch')) return <Leaf className="h-8 w-8" />;
  if (slug.includes('snow')) return <Snowflake className="h-8 w-8" />;
  return <Scissors className="h-8 w-8" />;
}

function getGradientForPost(index: number) {
  const gradients = [
    'from-emerald-500 to-teal-600',
    'from-blue-500 to-cyan-600',
    'from-orange-500 to-amber-600',
    'from-green-500 to-emerald-600',
    'from-violet-500 to-purple-600',
  ];
  return gradients[index % gradients.length];
}

function calculateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 200);
}

export default function RelatedPosts({ currentSlug, currentCategory }: RelatedPostsProps) {
  const [posts, setPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      // First try same category, excluding current post
      const { data: sameCategoryPosts, error: catError } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, published_at, content, category')
        .eq('category', currentCategory)
        .neq('slug', currentSlug)
        .order('published_at', { ascending: false })
        .limit(3);

      if (catError) {
        console.error('Error fetching related posts:', catError);
        setLoading(false);
        return;
      }

      const results: RelatedPost[] = (sameCategoryPosts as unknown as RelatedPost[]) || [];

      // If fewer than 3 from same category, fill with recent posts from other categories
      if (results.length < 3) {
        const excludeSlugs = [currentSlug, ...results.map((p) => p.slug)];
        const remaining = 3 - results.length;

        const { data: recentPosts, error: recentError } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, published_at, content, category')
          .not('slug', 'in', `(${excludeSlugs.map((s) => `"${s}"`).join(',')})`)
          .order('published_at', { ascending: false })
          .limit(remaining);

        if (!recentError && recentPosts) {
          results.push(...(recentPosts as unknown as RelatedPost[]));
        }
      }

      setPosts(results);
      setLoading(false);
    };

    fetchRelated();
  }, [currentSlug, currentCategory]);

  // Hide section entirely if no related posts and not loading
  if (!loading && posts.length === 0) return null;

  return (
    <section className="py-16 border-t border-white/10" style={{ background: '#050d07' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          Related Articles
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white/[0.06] rounded-2xl border border-white/10 overflow-hidden"
              >
                <Skeleton className="h-32 w-full bg-white/[0.08]" />
                <div className="p-6">
                  <Skeleton className="h-4 w-24 mb-3 bg-white/[0.08]" />
                  <Skeleton className="h-6 w-full mb-3 bg-white/[0.08]" />
                  <Skeleton className="h-12 w-full mb-4 bg-white/[0.08]" />
                  <Skeleton className="h-4 w-24 bg-white/[0.08]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white/[0.06] rounded-2xl border border-white/10 overflow-hidden
                  hover:border-primary/30 hover:bg-white/[0.10] transition-all duration-300
                  hover:-translate-y-1 flex flex-col"
              >
                {/* Icon Header */}
                <div
                  className={`bg-gradient-to-br ${getGradientForPost(index)} p-8 text-white`}
                >
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      {getIconForPost(post.slug)}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <Clock className="h-3.5 w-3.5" />
                      {calculateReadingTime(post.content)} min
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-sm text-white/50 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/60 mb-4 line-clamp-2 flex-grow text-sm">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                    Read article{' '}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
