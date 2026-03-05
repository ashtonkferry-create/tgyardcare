import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import { createPost } from '@/lib/gbp/client';
import { validatePostContent } from '@/lib/gbp/validator';
import { buildPostPrompt } from '@/lib/gbp/prompts';
import {
  POST_TYPES,
  SERVICE_IMAGES,
  SERVICE_CITIES,
} from '@/lib/gbp/types';

export const maxDuration = 120;

/** Determine current season from date */
function getSeason(date: Date): string {
  const mmdd = (date.getMonth() + 1) * 100 + date.getDate();
  if (mmdd >= 1115 || mmdd <= 314) return 'winter';
  if (mmdd >= 915) return 'fall';
  if (mmdd >= 315 && mmdd <= 531) return 'spring';
  return 'summer';
}

/** Service names for spotlight posts */
const SERVICE_NAMES: Record<string, string> = {
  mowing: 'Lawn Mowing',
  mulching: 'Mulching',
  'garden-beds': 'Garden Bed Maintenance',
  weeding: 'Weeding',
  pruning: 'Pruning & Trimming',
  fertilization: 'Fertilization',
  herbicide: 'Weed Control',
  aeration: 'Core Aeration',
  'gutter-cleaning': 'Gutter Cleaning',
  'gutter-guards': 'Gutter Guard Installation',
  'leaf-removal': 'Leaf Removal',
  'spring-cleanup': 'Spring Cleanup',
  'fall-cleanup': 'Fall Cleanup',
  'snow-removal': 'Snow Removal',
};

/** Seasonal service relevance */
const SEASONAL_SERVICES: Record<string, string[]> = {
  winter: ['snow-removal', 'gutter-guards', 'gutter-cleaning'],
  spring: ['spring-cleanup', 'mulching', 'garden-beds', 'aeration', 'fertilization'],
  summer: ['mowing', 'weeding', 'pruning', 'herbicide', 'fertilization', 'gutter-cleaning'],
  fall: ['fall-cleanup', 'leaf-removal', 'gutter-cleaning', 'aeration'],
};

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
  const now = new Date();
  const season = getSeason(now);

  try {
    // Determine post type — rotate based on count of existing posts
    const { count } = await supabase
      .from('gbp_posts')
      .select('*', { count: 'exact', head: true });

    const postTypeIndex = (count || 0) % POST_TYPES.length;
    const postType = POST_TYPES[postTypeIndex];

    // Pick service and city based on post type
    const seasonalServices = SEASONAL_SERVICES[season] || SEASONAL_SERVICES.summer;
    const serviceSlug = seasonalServices[Math.floor(Math.random() * seasonalServices.length)];
    const serviceName = SERVICE_NAMES[serviceSlug] || 'Lawn Care';
    const cityName = SERVICE_CITIES[Math.floor(Math.random() * SERVICE_CITIES.length)];

    // Generate post via Claude
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const prompt = buildPostPrompt({
      postType,
      season,
      serviceSlug,
      serviceName,
      cityName,
    });

    const aiRes = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }],
    });

    const postText =
      aiRes.content.find((b) => b.type === 'text')?.text?.trim() || '';

    if (!postText) {
      throw new Error('Claude returned empty post text');
    }

    // Validate content (Layer 3)
    const validation = await validatePostContent(postText);

    // Select image
    const images = SERVICE_IMAGES[serviceSlug] || SERVICE_IMAGES.mowing;
    const imagePath = images[Math.floor(Math.random() * images.length)];
    const imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${imagePath}`;

    // CTA URL — link to relevant service page
    const ctaUrl =
      postType === 'community'
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/locations/${cityName.toLowerCase().replace(/\s+/g, '-')}`
        : `${process.env.NEXT_PUBLIC_SITE_URL}/services/${serviceSlug}`;

    if (validation.valid) {
      // Publish via GBP API
      const result = await createPost({
        locationName,
        summary: postText,
        callToAction: { actionType: 'LEARN_MORE', url: ctaUrl },
        mediaItems: [{ mediaFormat: 'PHOTO', sourceUrl: imageUrl }],
      });

      // Store in DB
      await supabase.from('gbp_posts').insert({
        content: postText,
        post_type: postType,
        service_slug: serviceSlug,
        image_path: imagePath,
        cta_url: ctaUrl,
        google_post_id: result.name,
        status: 'published',
        published_at: new Date().toISOString(),
      });

      // Log success
      await supabase.from('automation_runs').insert({
        automation_slug: 'gbp-post-publisher',
        started_at: startedAt,
        completed_at: new Date().toISOString(),
        status: 'success',
        result_summary: `Published ${postType} post: "${postText.slice(0, 80)}..."`,
        pages_affected: 1,
      });

      await supabase
        .from('automation_config')
        .update({ last_run_at: new Date().toISOString() })
        .eq('slug', 'gbp-post-publisher');

      return NextResponse.json({
        message: 'Post published',
        postType,
        service: serviceSlug,
        googlePostId: result.name,
      });
    } else {
      // Validation failed — hold as draft
      await supabase.from('gbp_posts').insert({
        content: postText,
        post_type: postType,
        service_slug: serviceSlug,
        image_path: imagePath,
        cta_url: ctaUrl,
        status: 'draft',
      });

      await supabase.from('automation_runs').insert({
        automation_slug: 'gbp-post-publisher',
        started_at: startedAt,
        completed_at: new Date().toISOString(),
        status: 'warning',
        result_summary: `Post held — validation failed: ${validation.violations.join(', ')}`,
        pages_affected: 0,
      });

      // Slack alert
      const webhookUrl = process.env.SLACK_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `[GBP Post Alert] Post held for review. Violations: ${validation.violations.join(', ')}. Content: "${postText.slice(0, 200)}..."`,
          }),
        }).catch(() => {});
      }

      return NextResponse.json({
        message: 'Post held for review',
        violations: validation.violations,
      });
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('gbp-post-publisher error:', msg);

    await supabase.from('automation_runs').insert({
      automation_slug: 'gbp-post-publisher',
      started_at: startedAt,
      completed_at: new Date().toISOString(),
      status: 'error',
      error_message: msg,
      pages_affected: 0,
    });

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
