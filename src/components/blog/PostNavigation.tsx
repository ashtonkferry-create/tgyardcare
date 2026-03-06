'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface NavPost {
  title: string;
  slug: string;
}

interface PostNavigationProps {
  currentSlug: string;
  publishedAt: string;
}

export default function PostNavigation({ currentSlug, publishedAt }: PostNavigationProps) {
  const [prev, setPrev] = useState<NavPost | null>(null);
  const [next, setNext] = useState<NavPost | null>(null);

  useEffect(() => {
    async function fetchNav() {
      const [prevRes, nextRes] = await Promise.all([
        supabase
          .from('blog_posts')
          .select('title, slug')
          .eq('status', 'published')
          .lt('published_at', publishedAt)
          .neq('slug', currentSlug)
          .order('published_at', { ascending: false })
          .limit(1),
        supabase
          .from('blog_posts')
          .select('title, slug')
          .eq('status', 'published')
          .gt('published_at', publishedAt)
          .neq('slug', currentSlug)
          .order('published_at', { ascending: true })
          .limit(1),
      ]);

      if (prevRes.data?.[0]) setPrev(prevRes.data[0] as NavPost);
      if (nextRes.data?.[0]) setNext(nextRes.data[0] as NavPost);
    }

    fetchNav();
  }, [currentSlug, publishedAt]);

  if (!prev && !next) return null;

  return (
    <nav className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12" aria-label="Post navigation">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex items-center gap-3 bg-white/[0.06] border border-white/10 rounded-xl p-4 hover:border-primary/30 hover:bg-white/[0.10] transition-all"
        >
          <ArrowLeft className="h-5 w-5 text-white/40 group-hover:text-primary transition-colors shrink-0" />
          <div className="min-w-0">
            <span className="text-xs text-white/40 uppercase tracking-wider">Previous</span>
            <p className="text-white font-medium truncate group-hover:text-primary transition-colors">
              {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex items-center gap-3 bg-white/[0.06] border border-white/10 rounded-xl p-4 hover:border-primary/30 hover:bg-white/[0.10] transition-all md:text-right md:flex-row-reverse"
        >
          <ArrowRight className="h-5 w-5 text-white/40 group-hover:text-primary transition-colors shrink-0" />
          <div className="min-w-0">
            <span className="text-xs text-white/40 uppercase tracking-wider">Next</span>
            <p className="text-white font-medium truncate group-hover:text-primary transition-colors">
              {next.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
