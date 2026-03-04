import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import { SERVICE_CONFIGS, BASE_URL } from '@/lib/seo/schema-config';

// schema-generator: AI-powered HowTo schema generator for all service pages.
// Runs weekly. For each service page:
//   1. Skips if howto_schema already exists (no redundant API calls)
//   2. Calls Claude to generate a structured 5-step HowTo schema
//   3. Upserts to page_seo.howto_schema
//   4. Logs run to automation_runs

export const maxDuration = 300;

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

  const runStart = new Date().toISOString();
  const results: { slug: string; status: 'generated' | 'skipped' | 'error'; error?: string }[] = [];

  const serviceSlugs = Object.keys(SERVICE_CONFIGS);

  // Fetch existing howto_schemas to skip already-generated ones
  const { data: existingRows } = await supabase
    .from('page_seo')
    .select('path, howto_schema')
    .in('path', serviceSlugs.map((s) => `/services/${s}`));

  const existingByPath = new Map(
    (existingRows ?? []).map((r: { path: string; howto_schema: unknown }) => [r.path, r.howto_schema])
  );

  for (const slug of serviceSlugs) {
    const path = `/services/${slug}`;
    const config = SERVICE_CONFIGS[slug];

    // Skip if HowTo schema already exists
    if (existingByPath.has(path) && existingByPath.get(path)) {
      results.push({ slug, status: 'skipped' });
      continue;
    }

    try {
      const prompt = `You are a schema.org expert specializing in local service business SEO.

Generate a valid JSON-LD HowTo schema for the following lawn care service:

Service: ${config.name}
Description: ${config.longDescription}
Business: TG Yard Care, Madison Wisconsin
Page URL: ${BASE_URL}/services/${slug}

Requirements:
- @context: "https://schema.org"
- @type: "HowTo"
- name: "How ${config.name} Works at TG Yard Care"
- description: 1-2 sentences explaining the process
- estimatedCost: object with currency USD and approximate range
- supply: array of 2-4 equipment/materials used
- step: array of exactly 5 HowToStep objects, each with:
  - @type: "HowToStep"
  - position: number
  - name: short step title (3-6 words)
  - text: detailed explanation (2-3 sentences, specific to this service)
  - url: "${BASE_URL}/services/${slug}"

Return ONLY valid JSON. No markdown, no explanation, no code blocks.`;

      const message = await anthropic.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });

      const rawText = message.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map((b) => b.text)
        .join('');

      // Parse and validate JSON
      const howtoSchema = JSON.parse(rawText.trim());

      // Ensure required fields
      if (!howtoSchema['@type'] || !howtoSchema.step) {
        throw new Error('Invalid HowTo schema structure from AI');
      }

      // Upsert to page_seo
      await supabase
        .from('page_seo')
        .upsert(
          { path, howto_schema: howtoSchema, updated_at: new Date().toISOString() },
          { onConflict: 'path' }
        );

      results.push({ slug, status: 'generated' });
    } catch (err) {
      results.push({
        slug,
        status: 'error',
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  const generated = results.filter((r) => r.status === 'generated').length;
  const skipped = results.filter((r) => r.status === 'skipped').length;
  const errors = results.filter((r) => r.status === 'error').length;

  const summary = `Schema generator: ${generated} HowTo schemas generated, ${skipped} skipped (already exist), ${errors} errors`;

  // Log to automation_runs
  await supabase.from('automation_runs').insert({
    slug: 'schema-generator',
    status: errors > 0 && generated === 0 ? 'error' : 'success',
    output: { summary, results, run_start: runStart },
    ran_at: new Date().toISOString(),
  });

  // Update last_run_at
  await supabase
    .from('automation_config')
    .update({ last_run_at: new Date().toISOString() })
    .eq('slug', 'schema-generator');

  // Slack alert
  if (process.env.SLACK_WEBHOOK_URL) {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `🗂️ *Schema Generator:* ${generated} HowTo schemas generated for service pages | ${skipped} already existed | ${errors} errors`,
      }),
    }).catch(() => {});
  }

  return NextResponse.json({ success: true, summary, results });
}
