import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Known backlinks to track (add new ones as they're discovered)
const KNOWN_BACKLINKS = [
  {
    sourceUrl: "https://www.facebook.com/totalguardyardcare",
    sourceName: "Facebook Page",
    expectedAnchor: "tgyardcare.com",
  },
  {
    sourceUrl: "https://www.instagram.com/totalguardyardcare",
    sourceName: "Instagram Profile",
    expectedAnchor: "tgyardcare.com",
  },
  {
    sourceUrl: "https://nextdoor.com/pages/totalguard-yard-care-madison-wi",
    sourceName: "Nextdoor Page",
    expectedAnchor: "tgyardcare.com",
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

  // Also load any tracked backlinks from Supabase
  const { data: trackedLinks } = await supabase
    .from("backlinks")
    .select("source_url, source_name, expected_anchor");

  const allLinks = [
    ...KNOWN_BACKLINKS,
    ...(trackedLinks || []).map((l) => ({
      sourceUrl: l.source_url,
      sourceName: l.source_name,
      expectedAnchor: l.expected_anchor || "tgyardcare.com",
    })),
  ];

  // Deduplicate by URL
  const uniqueLinks = allLinks.filter(
    (link, i, arr) => arr.findIndex((l) => l.sourceUrl === link.sourceUrl) === i
  );

  const results: {
    sourceName: string;
    sourceUrl: string;
    isActive: boolean;
    containsLink: boolean;
    httpStatus: number | null;
    error?: string;
  }[] = [];

  for (const link of uniqueLinks) {
    try {
      const res = await fetch(link.sourceUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        redirect: "follow",
      });

      const html = await res.text();
      const containsLink =
        html.includes("tgyardcare.com") ||
        html.includes("totalguardyardcare.com");

      results.push({
        sourceName: link.sourceName,
        sourceUrl: link.sourceUrl,
        isActive: res.ok,
        containsLink,
        httpStatus: res.status,
      });

      // Update backlink status in DB
      await supabase.from("backlinks").upsert(
        {
          source_url: link.sourceUrl,
          source_name: link.sourceName,
          expected_anchor: link.expectedAnchor,
          is_active: res.ok && containsLink,
          http_status: res.status,
          last_checked_at: new Date().toISOString(),
        },
        { onConflict: "source_url" }
      );
    } catch (e) {
      results.push({
        sourceName: link.sourceName,
        sourceUrl: link.sourceUrl,
        isActive: false,
        containsLink: false,
        httpStatus: null,
        error: e instanceof Error ? e.message : String(e),
      });

      await supabase.from("backlinks").upsert(
        {
          source_url: link.sourceUrl,
          source_name: link.sourceName,
          expected_anchor: link.expectedAnchor,
          is_active: false,
          http_status: null,
          last_checked_at: new Date().toISOString(),
        },
        { onConflict: "source_url" }
      );
    }
  }

  const activeCount = results.filter((r) => r.isActive && r.containsLink).length;
  const brokenCount = results.filter((r) => !r.isActive || !r.containsLink).length;

  await supabase.from("automation_runs").insert({
    automation_slug: "backlink-monitor",
    status: brokenCount > 0 ? "warning" : "success",
    result_summary: `Checked ${uniqueLinks.length} backlinks: ${activeCount} active, ${brokenCount} broken/missing`,
    completed_at: new Date().toISOString(),
    pages_affected: brokenCount,
  });

  return NextResponse.json({
    success: true,
    totalChecked: uniqueLinks.length,
    active: activeCount,
    broken: brokenCount,
    results,
  });
}
