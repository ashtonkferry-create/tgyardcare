import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { listPosts } from '@/lib/gbp/client';

export const maxDuration = 60;

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const locationName = process.env.GBP_LOCATION_NAME;
  if (!locationName) {
    return NextResponse.json({ error: 'GBP_LOCATION_NAME not set' }, { status: 500 });
  }

  const startedAt = new Date().toISOString();

  try {
    // Fetch recent posts from GBP API
    const livePosts = await listPosts(locationName, 50);

    // Fetch our published posts from DB
    const { data: dbPosts } = await supabase
      .from('gbp_posts')
      .select('id, google_post_id, status, content')
      .eq('status', 'published')
      .not('google_post_id', 'is', null);

    let removedCount = 0;
    const livePostNames = new Set(livePosts.map((p) => p.name));

    // Check if any of our published posts were removed by Google
    for (const dbPost of dbPosts || []) {
      if (dbPost.google_post_id && !livePostNames.has(dbPost.google_post_id)) {
        // Post was removed by Google
        await supabase
          .from('gbp_posts')
          .update({
            status: 'removed',
            removed_at: new Date().toISOString(),
            removal_reason: 'Removed by Google — content policy violation suspected',
          })
          .eq('id', dbPost.id);
        removedCount++;
      }
    }

    // Calculate metrics
    const { count: totalPosts } = await supabase
      .from('gbp_posts')
      .select('*', { count: 'exact', head: true });

    const { count: totalRemoved } = await supabase
      .from('gbp_posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'removed');

    const { count: totalReviews } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true });

    const { count: respondedReviews } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .not('responded_at', 'is', null);

    const responseRate =
      totalReviews && totalReviews > 0
        ? Math.round(((respondedReviews || 0) / totalReviews) * 100)
        : 0;

    const removalRate =
      totalPosts && totalPosts > 0
        ? Math.round(((totalRemoved || 0) / totalPosts) * 100)
        : 0;

    const summary = `Audit: ${removedCount} new removals detected. Posts: ${totalPosts} total, ${totalRemoved} removed (${removalRate}%). Reviews: ${totalReviews} total, ${responseRate}% responded.`;

    // Slack digest
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `[GBP Weekly Audit]\n${summary}${removedCount > 0 ? '\nPosts were removed by Google — review content rules!' : ''}`,
        }),
      }).catch(() => {});
    }

    // Log
    await supabase.from('automation_runs').insert({
      automation_slug: 'gbp-audit',
      started_at: startedAt,
      completed_at: new Date().toISOString(),
      status: removedCount > 0 ? 'warning' : 'success',
      result_summary: summary,
      pages_affected: removedCount,
    });

    await supabase
      .from('automation_config')
      .update({ last_run_at: new Date().toISOString() })
      .eq('slug', 'gbp-audit');

    return NextResponse.json({
      message: summary,
      removedCount,
      responseRate,
      removalRate,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('gbp-audit error:', msg);

    await supabase.from('automation_runs').insert({
      automation_slug: 'gbp-audit',
      started_at: startedAt,
      completed_at: new Date().toISOString(),
      status: 'error',
      error_message: msg,
      pages_affected: 0,
    });

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
