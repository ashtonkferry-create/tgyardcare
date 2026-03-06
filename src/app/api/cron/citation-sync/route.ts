import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Business directories where TotalGuard might be listed
const DIRECTORIES = [
  {
    name: "Google Business Profile",
    url: "https://www.google.com/maps/place/TotalGuard+Yard+Care",
    checkable: false, // Can't scrape Google
  },
  {
    name: "Yelp",
    url: "https://www.yelp.com/biz/totalguard-yard-care-madison",
    checkable: true,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/totalguardyardcare",
    checkable: true,
  },
  {
    name: "Nextdoor",
    url: "https://nextdoor.com/pages/totalguard-yard-care-madison-wi",
    checkable: false,
  },
  {
    name: "Better Business Bureau",
    url: "https://www.bbb.org/us/wi/madison/profile/lawn-care",
    checkable: true,
  },
  {
    name: "Thumbtack",
    url: "https://www.thumbtack.com/wi/madison/lawn-care",
    checkable: false,
  },
  {
    name: "Angi",
    url: "https://www.angi.com/companylist/us/wi/madison/lawn-care",
    checkable: false,
  },
];

const CANONICAL_NAP = {
  name: "TotalGuard Yard Care",
  phone: "608-535-6057",
  address: "7610 Welton Dr, Madison, WI 53711",
};

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
    reachable: boolean;
    hasBusinessName: boolean;
    hasPhone: boolean;
    issues: string[];
  }[] = [];

  for (const dir of DIRECTORIES) {
    if (!dir.checkable) {
      results.push({
        name: dir.name,
        url: dir.url,
        reachable: false,
        hasBusinessName: false,
        hasPhone: false,
        issues: ["Not checkable automatically — requires manual verification"],
      });
      continue;
    }

    try {
      const res = await fetch(dir.url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        redirect: "follow",
      });

      const html = await res.text();
      const issues: string[] = [];

      const hasBusinessName = html.toLowerCase().includes(CANONICAL_NAP.name.toLowerCase());
      const hasPhone = html.includes(CANONICAL_NAP.phone) || html.includes("6085356057");

      if (!hasBusinessName) issues.push("Business name not found");
      if (!hasPhone) issues.push("Phone number not found");

      results.push({
        name: dir.name,
        url: dir.url,
        reachable: true,
        hasBusinessName,
        hasPhone,
        issues,
      });
    } catch (e) {
      results.push({
        name: dir.name,
        url: dir.url,
        reachable: false,
        hasBusinessName: false,
        hasPhone: false,
        issues: [`Failed to reach: ${e instanceof Error ? e.message : String(e)}`],
      });
    }
  }

  // Store citation status
  for (const result of results) {
    await supabase.from("citation_status").upsert(
      {
        directory_name: result.name,
        directory_url: result.url,
        is_reachable: result.reachable,
        has_correct_name: result.hasBusinessName,
        has_correct_phone: result.hasPhone,
        issues: result.issues,
        checked_at: new Date().toISOString(),
      },
      { onConflict: "directory_name" }
    );
  }

  const issueCount = results.filter((r) => r.issues.length > 0).length;

  await supabase.from("automation_runs").insert({
    automation_slug: "citation-sync",
    status: issueCount > 0 ? "warning" : "success",
    result_summary: `Checked ${DIRECTORIES.length} directories. ${issueCount} have issues or need manual review.`,
    completed_at: new Date().toISOString(),
    pages_affected: issueCount,
  });

  return NextResponse.json({
    success: true,
    directoriesChecked: DIRECTORIES.length,
    issueCount,
    canonical: CANONICAL_NAP,
    results,
  });
}
