import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import { listReviews, replyToReview } from '@/lib/gbp/client';
import { validateReviewReply } from '@/lib/gbp/validator';
import { buildReviewReplyPrompt } from '@/lib/gbp/prompts';
import { STAR_MAP } from '@/lib/gbp/types';

export const maxDuration = 120;

export async function GET(req: Request) {
  // Auth check
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
  let autoPublished = 0;
  let held = 0;
  let errors = 0;
  let totalNew = 0;

  try {
    // Get last check time from automation_config
    const { data: config } = await supabase
      .from('automation_config')
      .select('last_run_at')
      .eq('slug', 'review-responder')
      .single();

    const since = config?.last_run_at ? new Date(config.last_run_at) : undefined;

    // Fetch new reviews from GBP API
    const reviews = await listReviews(locationName, since);
    totalNew = reviews.length;

    if (reviews.length === 0) {
      // Log skip
      await supabase.from('automation_runs').insert({
        automation_slug: 'review-responder',
        started_at: startedAt,
        completed_at: new Date().toISOString(),
        status: 'skipped',
        result_summary: 'No new reviews found',
        pages_affected: 0,
      });
      await supabase
        .from('automation_config')
        .update({ last_run_at: new Date().toISOString() })
        .eq('slug', 'review-responder');

      return NextResponse.json({ message: 'No new reviews', count: 0 });
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    for (const review of reviews) {
      try {
        const rating = STAR_MAP[review.starRating] || 5;
        const reviewerName = review.reviewer?.displayName || 'Valued Customer';
        const reviewText = review.comment || '';

        // Skip if already responded (has a reply)
        if (review.reviewReply) continue;

        // Upsert review into DB
        await supabase.from('reviews').upsert(
          {
            google_review_id: review.reviewId,
            reviewer_name: reviewerName,
            rating,
            review_text: reviewText,
            source: 'google',
            created_at: review.createTime,
          },
          { onConflict: 'google_review_id' }
        );

        // Generate reply via Claude
        const prompt = buildReviewReplyPrompt({
          reviewerName,
          rating,
          text: reviewText,
        });

        const aiRes = await anthropic.messages.create({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 300,
          messages: [{ role: 'user', content: prompt }],
        });

        const replyText =
          aiRes.content.find((b) => b.type === 'text')?.text?.trim() || '';

        if (!replyText) {
          errors++;
          continue;
        }

        // Validate reply (Layer 3)
        const validation = await validateReviewReply(replyText, rating);

        if (rating >= 4 && validation.valid) {
          // Auto-publish for 4-5 star reviews
          await replyToReview(review.name, replyText);
          await supabase
            .from('reviews')
            .update({
              response_draft: replyText,
              auto_responded: true,
              response_status: 'auto_published',
              response_published_at: new Date().toISOString(),
              responded_at: new Date().toISOString(),
            })
            .eq('google_review_id', review.reviewId);
          autoPublished++;
        } else if (rating === 3 && validation.valid) {
          // Auto-publish 3-star but send Slack alert
          await replyToReview(review.name, replyText);
          await supabase
            .from('reviews')
            .update({
              response_draft: replyText,
              auto_responded: true,
              response_status: 'auto_published',
              response_published_at: new Date().toISOString(),
              responded_at: new Date().toISOString(),
            })
            .eq('google_review_id', review.reviewId);
          autoPublished++;

          // Slack notification for 3-star
          await sendSlackAlert(
            `3-star review from ${reviewerName} auto-responded. Review: "${reviewText.slice(0, 100)}..." Reply: "${replyText.slice(0, 100)}..."`
          );
        } else {
          // Hold for manual review (1-2 stars or validation failed)
          await supabase
            .from('reviews')
            .update({
              response_draft: replyText,
              auto_responded: false,
              response_status: 'needs_review',
            })
            .eq('google_review_id', review.reviewId);
          held++;

          const reason =
            rating <= 2
              ? `${rating}-star review needs manual review`
              : `Validation failed: ${validation.violations.join(', ')}`;

          await sendSlackAlert(
            `Review held for manual review (${reason}). From: ${reviewerName} (${rating}★). Review: "${reviewText.slice(0, 150)}..." Draft reply: "${replyText.slice(0, 150)}..."`
          );
        }
      } catch (err) {
        console.error('Error processing review:', err);
        errors++;
      }
    }

    // Log success
    const summary = `Processed ${totalNew} reviews: ${autoPublished} auto-published, ${held} held, ${errors} errors`;
    await supabase.from('automation_runs').insert({
      automation_slug: 'review-responder',
      started_at: startedAt,
      completed_at: new Date().toISOString(),
      status: errors > 0 ? 'warning' : 'success',
      result_summary: summary,
      pages_affected: autoPublished + held,
    });

    await supabase
      .from('automation_config')
      .update({ last_run_at: new Date().toISOString() })
      .eq('slug', 'review-responder');

    return NextResponse.json({ message: summary, autoPublished, held, errors });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('review-responder error:', msg);

    await supabase.from('automation_runs').insert({
      automation_slug: 'review-responder',
      started_at: startedAt,
      completed_at: new Date().toISOString(),
      status: 'error',
      error_message: msg,
      pages_affected: 0,
    });

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

async function sendSlackAlert(text: string) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: `[GBP Review Alert] ${text}` }),
    });
  } catch {
    console.error('Slack alert failed');
  }
}
