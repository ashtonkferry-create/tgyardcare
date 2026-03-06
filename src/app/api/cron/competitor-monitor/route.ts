import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const COMPETITORS = [
  {
    name: "Ace Lawn Care Madison",
    url: "https://www.acelawncaremadison.com",
  },
  {
    name: "Clean Gutters Madison",
    url: "https://www.cleanguttersmadison.com",
  },
  {
    name: "TruGreen Madison",
    url: "https://www.trugreen.com/local/wisconsin/madison/",
  },
  {
    name: "Weed Man Madison",
    url: "https://www.weedman.com/madison-wi",
  },
  {
    name: "Spring Green Madison",
    url: "https://www.spring-green.com",
  },
];

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const results: {
    name: string;
    url: string;
    title: string | null;
    metaDescription: string | null;
    hasSchema: boolean;
    status: number | null;
    error?: string;
  }[] = [];

  for (const competitor of COMPETITORS) {
    try {
      const res = await fetch(competitor.url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; TotalGuard-Monitor/1.0)" },
        redirect: "follow",
      });

      const html = await res.text();

      // Extract title
      const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : null;

      // Extract meta description
      const metaMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
      const metaDescription = metaMatch ? metaMatch[1].trim() : null;

      // Check for structured data
      const hasSchema = html.includes("application/ld+json");

      results.push({
        name: competitor.name,
        url: competitor.url,
        title,
        metaDescription,
        hasSchema,
        status: res.status,
      });

      // Store snapshot
      await supabase.from("competitor_snapshots").insert({
        competitor_name: competitor.name,
        competitor_url: competitor.url,
        title,
        meta_description: metaDescription,
        has_schema: hasSchema,
        http_status: res.status,
        checked_at: new Date().toISOString(),
      });
    } catch (e) {
      results.push({
        name: competitor.name,
        url: competitor.url,
        title: null,
        metaDescription: null,
        hasSchema: false,
        status: null,
        error: e instanceof Error ? e.message : String(e),
      });
    }
  }

  const successCount = results.filter((r) => !r.error).length;

  await supabase.from("automation_runs").insert({
    automation_slug: "competitor-monitor",
    status: "success",
    result_summary: `Monitored ${COMPETITORS.length} competitors. ${successCount} accessible, ${COMPETITORS.length - successCount} failed.`,
    completed_at: new Date().toISOString(),
    pages_affected: successCount,
  });

  return NextResponse.json({
    success: true,
    competitorsChecked: COMPETITORS.length,
    accessible: successCount,
    results,
  });
}
