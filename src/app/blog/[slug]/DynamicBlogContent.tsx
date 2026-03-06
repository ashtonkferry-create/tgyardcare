'use client';

import { useMemo } from 'react';
import DOMPurify from 'dompurify';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArticleSchema } from '@/components/schemas/ArticleSchema';
import { WebPageSchema } from '@/components/schemas/WebPageSchema';
import SocialShareButtons from '@/components/blog/SocialShareButtons';
import RelatedPosts from '@/components/blog/RelatedPosts';
import PostNavigation from '@/components/blog/PostNavigation';

interface DynamicBlogContentProps {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  published_at: string;
  reading_time: number;
  meta_description: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  'seasonal-tips': 'bg-emerald-500/10 text-emerald-400',
  'service-guides': 'bg-blue-500/10 text-blue-400',
  'local-guides': 'bg-amber-500/10 text-amber-400',
  'how-to': 'bg-violet-500/10 text-violet-400',
  'faq-answers': 'bg-cyan-500/10 text-cyan-400',
};

const CATEGORY_NAMES: Record<string, string> = {
  'seasonal-tips': 'Seasonal Tips',
  'service-guides': 'Service Guide',
  'local-guides': 'Local Guide',
  'how-to': 'How-To',
  'faq-answers': 'FAQ',
};

export default function DynamicBlogContent({
  title,
  slug,
  excerpt,
  content,
  category,
  published_at,
  reading_time,
  meta_description,
}: DynamicBlogContentProps) {
  const sanitizedContent = useMemo(
    () =>
      DOMPurify.sanitize(content, {
        ALLOWED_TAGS: [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'p', 'br', 'strong', 'em',
          'ul', 'ol', 'li',
          'a', 'blockquote', 'img',
        ],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
        FORBID_TAGS: ['script', 'style', 'iframe', 'form', 'input', 'button'],
        FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
      }),
    [content]
  );

  const formattedDate = new Date(published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const categoryColor =
    CATEGORY_COLORS[category] || 'bg-primary/10 text-primary';
  const categoryName =
    CATEGORY_NAMES[category] || category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="min-h-screen" style={{ background: '#050d07' }}>
      <ArticleSchema
        title={title}
        description={meta_description}
        slug={slug}
        datePublished={published_at}
        dateModified={published_at}
      />
      <WebPageSchema
        name={title}
        description={meta_description}
        url={`/blog/${slug}`}
      />
      <Navigation />

      <article className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to blog
          </Link>

          <div className="mb-8">
            <span
              className={`inline-block px-3 py-1.5 text-sm font-semibold rounded-full mb-4 ${categoryColor}`}
            >
              {categoryName}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              {title}
            </h1>
            <div className="flex items-center gap-4 text-white/50">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{reading_time} min read</span>
              </div>
            </div>
          </div>

          {excerpt && (
            <p className="text-xl text-white/60 mb-8 leading-relaxed">
              {excerpt}
            </p>
          )}

          {/* Content rendered from HTML */}
          <div
            className="blog-dynamic-content"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          {/* Social Share */}
          <SocialShareButtons title={title} slug={slug} excerpt={excerpt} />

          {/* CTA card */}
          <div className="bg-white/[0.06] border border-white/10 p-6 rounded-lg mt-12">
            <h3 className="text-xl font-bold text-white mb-3">
              Ready for professional lawn care?
            </h3>
            <p className="text-white/60 mb-4">
              TotalGuard Yard Care provides expert lawn and yard services
              throughout Madison and surrounding areas. Get a free,
              no-obligation quote today.
            </p>
            <Button variant="accent" asChild>
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
          </div>

          {/* Previous / Next post */}
          <PostNavigation currentSlug={slug} publishedAt={published_at} />

          {/* Related Articles */}
          <RelatedPosts currentSlug={slug} currentCategory={category} />
        </div>
      </article>

      <CTASection />

      <Footer showCloser={false} />

      <style>{`
        .blog-dynamic-content {
          font-size: 1.125rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
        }

        .blog-dynamic-content > * + * {
          margin-top: 1.5rem;
        }

        .blog-dynamic-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #ffffff;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
        }

        .blog-dynamic-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .blog-dynamic-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #ffffff;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }

        .blog-dynamic-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }

        .blog-dynamic-content strong {
          color: #ffffff;
          font-weight: 600;
        }

        .blog-dynamic-content em {
          color: rgba(255, 255, 255, 0.8);
          font-style: italic;
        }

        .blog-dynamic-content ul,
        .blog-dynamic-content ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }

        .blog-dynamic-content ul {
          list-style: disc;
        }

        .blog-dynamic-content ul li,
        .blog-dynamic-content ol li {
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .blog-dynamic-content ol {
          list-style: decimal;
        }

        .blog-dynamic-content a {
          color: hsl(var(--primary));
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: color 0.2s;
        }

        .blog-dynamic-content a:hover {
          color: hsl(var(--primary) / 0.8);
        }

        .blog-dynamic-content blockquote {
          border-left: 4px solid hsl(var(--primary));
          background: rgba(255, 255, 255, 0.03);
          padding: 1.5rem;
          margin: 2rem 0;
          border-radius: 0 0.5rem 0.5rem 0;
          font-style: normal;
        }

        .blog-dynamic-content blockquote p {
          margin-bottom: 0;
        }

        .blog-dynamic-content img {
          border-radius: 0.75rem;
          margin: 2rem 0;
          max-width: 100%;
          height: auto;
        }

        @media (max-width: 768px) {
          .blog-dynamic-content {
            font-size: 1rem;
          }

          .blog-dynamic-content h2 {
            font-size: 1.5rem;
          }

          .blog-dynamic-content h3 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
