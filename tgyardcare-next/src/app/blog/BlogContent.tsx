'use client';

import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from '@/components/CTASection';
import Link from "next/link";
import { Calendar, ArrowRight, Clock, Leaf, Droplets, TreePine, Snowflake, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  content: string;
}

function calculateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 200);
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

export default function BlogContent() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, published_at, content')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
        return;
      }

      setBlogPosts(data || []);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#050d07' }}>
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Blog Summary">
        <p>TotalGuard Yard Care blog provides expert lawn care tips and advice for Madison, Wisconsin homeowners. Learn seasonal maintenance guides, landscaping tips, and best practices to keep your yard healthy year-round. Free tips from local Madison lawn care professionals.</p>
      </section>

      {/* Hero */}
      <section className="pt-24 pb-16 border-b border-white/10" style={{ background: '#050d07' }}>
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Expert Insights
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Lawn Care Tips &amp; Guides
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Professional advice from Madison&apos;s trusted yard care experts. Everything you need to keep your property looking its best.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-20" style={{ background: '#050d07' }}>
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/[0.06] rounded-2xl border border-white/10 overflow-hidden">
                  <Skeleton className="h-32 w-full bg-white/[0.08]" />
                  <div className="p-6">
                    <Skeleton className="h-4 w-24 mb-3 bg-white/[0.08]" />
                    <Skeleton className="h-6 w-full mb-3 bg-white/[0.08]" />
                    <Skeleton className="h-20 w-full mb-4 bg-white/[0.08]" />
                    <Skeleton className="h-4 w-24 bg-white/[0.08]" />
                  </div>
                </div>
              ))}
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white/[0.06] rounded-2xl border border-white/10 overflow-hidden hover:border-primary/30 hover:bg-white/[0.10] transition-all duration-300 flex flex-col"
                >
                  {/* Icon Header */}
                  <div className={`bg-gradient-to-br ${getGradientForPost(index)} p-8 text-white`}>
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
                        day: 'numeric'
                      })}
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-white/60 mb-4 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center text-primary font-semibold group-hover:gap-3 transition-all">
                      Read article <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Lawn?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/60">
            Let our experts handle your lawn care while you enjoy the results. Get started with a free quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="font-bold animate-shimmer-btn bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] text-black">
              <Link href="/contact">
                Get a Free Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="font-semibold border-white/20 text-white hover:bg-white/10">
              <Link href="/services">
                View Our Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
