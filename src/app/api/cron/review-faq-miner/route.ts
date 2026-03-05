import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import { buildFAQMinerPrompt } from '@/lib/gbp/prompts';

export const maxDuration = 120;

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

  const startedAt = new Date().toISOString();

  try {
    // Fetch reviews from past 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { data: reviews } = await supabase
      .from('reviews')
      .select('review_text, rating')
      .gte('created_at', thirtyDaysAgo)
      .not('review_text', 'is', null)
      .order('created_at', { ascending: false })
      .limit(50);

    if (!reviews || reviews.length < 3) {
      await supabase.from('automation_runs').insert({
        automation_slug: 'review-faq-miner',
        started_at: startedAt,
        completed_at: new Date().toISOString(),
        status: 'skipped',
        result_summary: `Only ${reviews?.length || 0} reviews in past 30 days (need 3+)`,
        pages_affected: 0,
      });
      return NextResponse.json({ message: 'Not enough reviews to mine', count: reviews?.length || 0 });
    }

    // Build prompt and generate FAQs
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const prompt = buildFAQMinerPrompt(
      reviews.map((r) => ({ text: r.review_text || '', rating: r.rating || 5 }))
    );

    const aiRes = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    const rawText = aiRes.content.find((b) => b.type === 'text')?.text?.trim() || '[]';

    // Parse JSON array
    let faqs: Array<{ question: string; answer: string }>;
    try {
      faqs = JSON.parse(rawText);
      if (!Array.isArray(faqs)) throw new Error('Not an array');
    } catch {
      throw new Error(`Failed to parse FAQ JSON: ${rawText.slice(0, 200)}`);
    }

    // Build FAQPage schema
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    // Upsert to page_seo for the FAQ page and homepage
    const pagesToUpdate = ['/faq', '/'];
    let updated = 0;

    for (const path of pagesToUpdate) {
      const { error } = await supabase
        .from('page_seo')
        .upsert(
          { path, schema_data: faqSchema, updated_at: new Date().toISOString() },
          { onConflict: 'path' }
        );
      if (!error) updated++;
    }

    // Log
    await supabase.from('automation_runs').insert({
      automation_slug: 'review-faq-miner',
      started_at: startedAt,
      completed_at: new Date().toISOString(),
      status: 'success',
      result_summary: `Mined ${faqs.length} FAQs from ${reviews.length} reviews, updated ${updated} pages`,
      pages_affected: updated,
    });

    await supabase
      .from('automation_config')
      .update({ last_run_at: new Date().toISOString() })
      .eq('slug', 'review-faq-miner');

    return NextResponse.json({ message: 'FAQs generated', count: faqs.length, faqs });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('review-faq-miner error:', msg);

    await supabase.from('automation_runs').insert({
      automation_slug: 'review-faq-miner',
      started_at: startedAt,
      completed_at: new Date().toISOString(),
      status: 'error',
      error_message: msg,
      pages_affected: 0,
    });

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
