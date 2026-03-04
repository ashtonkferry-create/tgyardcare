import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Local Gap Finder — runs monthly on the 1st at 8am.
// Identifies missing service+location page combinations,
// pages with low SEO scores, and underserved content areas.
// Reports actionable gaps to Slack.

const SERVICE_AREAS = [
  "Madison", "Middleton", "Verona", "Fitchburg",
  "Sun Prairie", "Waunakee", "Monona", "McFarland",
  "Cottage Grove", "DeForest", "Oregon", "Stoughton",
];

const CORE_SERVICES = [
  "lawn-care", "lawn-mowing", "mulching", "fertilization",
  "gutter-cleaning", "snow-removal", "spring-cleanup", "fall-cleanup",
  "herbicide", "aeration",
];

// High-value service+location combos that should have dedicated pages
const HIGH_VALUE_COMBOS = [
  { service: "lawn-care", location: "madison" },
  { service: "lawn-care", location: "middleton" },
  { service: "lawn-care", location: "verona" },
  { service: "snow-removal", location: "madison" },
  { service: "snow-removal", location: "middleton" },
  { service: "gutter-cleaning", location: "madison" },
];

async function sendSlack(msg: string) {
  if (!process.env.SLACK_WEBHOOK_URL) return;
  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: msg }),
  });
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tgyardcare.com";

  const gaps: string[] = [];
  const opportunities: string[] = [];

  // 1. Check high-value service+location combos exist
  for (const combo of HIGH_VALUE_COMBOS) {
    const url = `${base}/${combo.service}-${combo.location}-wi`;
    try {
      const res = await fetch(url, { method: "HEAD", redirect: "follow" });
      if (res.status === 404) {
        gaps.push(`Missing page: /${combo.service}-${combo.location}-wi (high-value combo)`);
      }
    } catch {
      // Page doesn't exist, count as gap
      gaps.push(`Missing page: /${combo.service}-${combo.location}-wi`);
    }
  }

  // 2. Pull low-scoring pages from DB and flag as content gaps
  const { data: lowScorePages } = await supabase
    .from("page_seo")
    .select("path, seo_score, title")
    .lt("seo_score", 60)
    .order("seo_score", { ascending: true })
    .limit(10);

  for (const page of (lowScorePages ?? [])) {
    const p = page as { path: string; seo_score: number; title: string };
    gaps.push(`Low score (${p.seo_score}/100): ${p.path}`);
  }

  // 3. Check location pages exist for all service areas
  for (const area of SERVICE_AREAS) {
    const slug = area.toLowerCase().replace(" ", "-");
    const url = `${base}/locations/${slug}`;
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (res.status === 404) {
        opportunities.push(`No location page: /locations/${slug} (${area})`);
      }
    } catch {
      opportunities.push(`No location page: /locations/${slug} (${area})`);
    }
  }

  // 4. Check core service pages exist
  for (const service of CORE_SERVICES) {
    const url = `${base}/services/${service}`;
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (res.status === 404) {
        opportunities.push(`Missing service page: /services/${service}`);
      }
    } catch {
      opportunities.push(`Missing service page: /services/${service}`);
    }
  }

  const totalIssues = gaps.length + opportunities.length;
  const status = totalIssues === 0 ? "success" : totalIssues > 10 ? "warning" : "success";

  const summary = totalIssues === 0
    ? "No local SEO gaps found"
    : `${gaps.length} gap(s), ${opportunities.length} opportunity(ies) identified`;

  // Slack report
  const slackLines = [
    `*Local Gap Finder — Monthly Report (${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })})*`,
  ];
  if (gaps.length > 0) {
    slackLines.push(`\n*Content Gaps (${gaps.length}):*`);
    gaps.slice(0, 8).forEach(g => slackLines.push(`• ${g}`));
  }
  if (opportunities.length > 0) {
    slackLines.push(`\n*Opportunities (${opportunities.length}):*`);
    opportunities.slice(0, 5).forEach(o => slackLines.push(`• ${o}`));
  }
  slackLines.push(`\nFull report: ${base}/admin/seo`);

  if (totalIssues > 0) {
    await sendSlack(slackLines.join("\n"));
  }

  await supabase.from("automation_runs").insert({
    automation_slug: "local-gap-finder",
    status,
    result_summary: summary,
    completed_at: new Date().toISOString(),
    pages_affected: totalIssues,
  });

  await supabase
    .from("automation_config")
    .update({ last_run_at: new Date().toISOString() })
    .eq("slug", "local-gap-finder");

  return NextResponse.json({ status, gaps, opportunities });
}
