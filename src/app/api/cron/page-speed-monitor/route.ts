import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = "https://tgyardcare.com";

const PAGES_TO_TEST = [
  "/",
  "/services",
  "/services/mowing",
  "/locations/madison",
  "/contact",
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
    path: string;
    performance: number | null;
    fcp: number | null;
    lcp: number | null;
    cls: number | null;
    error?: string;
  }[] = [];

  for (const path of PAGES_TO_TEST) {
    const url = `${SITE_URL}${path}`;
    const apiKey = process.env.PAGESPEED_API_KEY;
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeedtest?url=${encodeURIComponent(url)}&strategy=mobile${apiKey ? `&key=${apiKey}` : ""}`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data.error) {
        results.push({ path, performance: null, fcp: null, lcp: null, cls: null, error: data.error.message });
        continue;
      }

      const lighthouse = data.lighthouseResult;
      const perfScore = lighthouse?.categories?.performance?.score
        ? Math.round(lighthouse.categories.performance.score * 100)
        : null;
      const fcp = lighthouse?.audits?.["first-contentful-paint"]?.numericValue ?? null;
      const lcp = lighthouse?.audits?.["largest-contentful-paint"]?.numericValue ?? null;
      const cls = lighthouse?.audits?.["cumulative-layout-shift"]?.numericValue ?? null;

      results.push({ path, performance: perfScore, fcp, lcp, cls });

      // Store in page_speed_results
      await supabase.from("page_speed_results").insert({
        url: path,
        strategy: "mobile",
        performance_score: perfScore,
        fcp_ms: fcp ? Math.round(fcp) : null,
        lcp_ms: lcp ? Math.round(lcp) : null,
        cls_score: cls,
        raw_json: data,
        created_at: new Date().toISOString(),
      });
    } catch (e) {
      results.push({
        path,
        performance: null,
        fcp: null,
        lcp: null,
        cls: null,
        error: e instanceof Error ? e.message : String(e),
      });
    }
  }

  const avgPerf =
    results.filter((r) => r.performance !== null).length > 0
      ? Math.round(
          results
            .filter((r) => r.performance !== null)
            .reduce((s, r) => s + r.performance!, 0) /
            results.filter((r) => r.performance !== null).length
        )
      : 0;

  await supabase.from("automation_runs").insert({
    automation_slug: "page-speed-monitor",
    status: "success",
    result_summary: `Tested ${PAGES_TO_TEST.length} pages. Average mobile performance: ${avgPerf}/100`,
    completed_at: new Date().toISOString(),
    pages_affected: PAGES_TO_TEST.length,
  });

  return NextResponse.json({
    success: true,
    averagePerformance: avgPerf,
    results,
  });
}
