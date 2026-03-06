import { createClient } from '@supabase/supabase-js';

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string | null;
  published_at: string;
  updated_at: string | null;
  meta_description: string | null;
}

const SITE_URL = 'https://tgyardcare.com';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('title, slug, excerpt, content, category, published_at, updated_at, meta_description')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    return new Response('<rss version="2.0"><channel><title>Error</title></channel></rss>', {
      status: 500,
      headers: { 'Content-Type': 'application/xml' },
    });
  }

  const typedPosts = (posts ?? []) as BlogPost[];
  const now = new Date().toUTCString();

  const items = typedPosts
    .map((post) => {
      const description = escapeXml(post.excerpt || post.meta_description || '');
      const pubDate = new Date(post.published_at).toUTCString();
      const link = `${SITE_URL}/blog/${post.slug}`;

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>${post.category ? `\n      <category>${escapeXml(post.category)}</category>` : ''}
      <guid isPermaLink="true">${link}</guid>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TotalGuard Yard Care Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Expert lawn care tips, seasonal maintenance guides, and yard care insights from TotalGuard Yard Care in Madison, WI.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
