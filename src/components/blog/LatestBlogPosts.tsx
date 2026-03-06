'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  content: string;
}

interface LatestBlogPostsProps {
  limit?: number;
}

function PostSkeleton() {
  return (
    <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-6 animate-pulse">
      <div className="h-4 w-20 bg-white/10 rounded mb-4" />
      <div className="h-6 w-3/4 bg-white/10 rounded mb-3" />
      <div className="space-y-2 mb-6">
        <div className="h-4 w-full bg-white/[0.06] rounded" />
        <div className="h-4 w-2/3 bg-white/[0.06] rounded" />
      </div>
      <div className="h-4 w-28 bg-white/10 rounded" />
    </div>
  );
}

export default function LatestBlogPosts({ limit = 3 }: LatestBlogPostsProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, published_at, content')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(limit);

      if (!error && data) {
        setPosts(data as BlogPost[]);
      }
      setLoading(false);
    }

    fetchPosts();
  }, [limit]);

  // Hide entire section when there are no posts and not loading
  if (!loading && posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Our Blog
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Latest from Our Blog
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Expert tips and advice for Madison homeowners
          </p>
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {loading
            ? Array.from({ length: limit }).map((_, i) => (
                <PostSkeleton key={i} />
              ))
            : posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white/[0.06] border border-white/10 rounded-2xl p-6 hover:border-primary/30 hover:bg-white/[0.10] transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-white/50 text-sm mb-4">
                    <Calendar className="h-3.5 w-3.5" />
                    <time dateTime={post.published_at}>
                      {new Date(post.published_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-2 mb-6 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Read link */}
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all duration-300">
                    Read article
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
        </div>

        {/* View all link */}
        {!loading && posts.length > 0 && (
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white font-medium hover:bg-white/[0.10] hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]"
            >
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
