import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const TARGET_KEYWORDS = [
  { keyword: "lawn care madison wi", targetPage: "/", priority: "high" },
  { keyword: "lawn mowing madison", targetPage: "/services/mowing", priority: "high" },
  { keyword: "gutter cleaning madison wi", targetPage: "/services/gutter-cleaning", priority: "high" },
  { keyword: "snow removal madison wi", targetPage: "/services/snow-removal", priority: "high" },
  { keyword: "yard care madison", targetPage: "/", priority: "high" },
  { keyword: "leaf removal madison wi", targetPage: "/services/leaf-removal", priority: "medium" },
  { keyword: "fall cleanup madison wi", targetPage: "/services/fall-cleanup", priority: "medium" },
  { keyword: "lawn fertilization madison", targetPage: "/services/fertilization", priority: "medium" },
  { keyword: "gutter guards madison wi", targetPage: "/services/gutter-guards", priority: "medium" },
  { keyword: "mulching service madison", targetPage: "/services/mulching", priority: "medium" },
  { keyword: "lawn care middleton wi", targetPage: "/locations/middleton", priority: "medium" },
  { keyword: "lawn care fitchburg wi", targetPage: "/locations/fitchburg", priority: "medium" },
  { keyword: "lawn care verona wi", targetPage: "/locations/verona", priority: "medium" },
  { keyword: "lawn care sun prairie wi", targetPage: "/locations/sun-prairie", priority: "medium" },
  { keyword: "commercial lawn care madison", targetPage: "/commercial/lawn-care", priority: "low" },
  { keyword: "commercial snow removal madison", targetPage: "/commercial/snow-removal", priority: "low" },
  { keyword: "spring cleanup madison wi", targetPage: "/services/spring-cleanup", priority: "low" },
  { keyword: "garden bed service madison", targetPage: "/services/garden-beds", priority: "low" },
  { keyword: "tree pruning madison wi", targetPage: "/services/pruning", priority: "low" },
  { keyword: "weed control madison wi", targetPage: "/services/herbicide", priority: "low" },
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

  try {
    // Store keyword tracking entries for manual rank checking
    const entries = TARGET_KEYWORDS.map((kw) => ({
      keyword: kw.keyword,
      target_page: kw.targetPage,
      priority: kw.priority,
      tracked_at: new Date().toISOString(),
      domain: "tgyardcare.com",
    }));

    // Upsert tracking entries
    for (const entry of entries) {
      await supabase.from("rank_tracking").upsert(entry, {
        onConflict: "keyword,domain",
      });
    }

    await supabase.from("automation_runs").insert({
      automation_slug: "rank-tracker",
      status: "success",
      result_summary: `Updated ${entries.length} keyword tracking entries (${TARGET_KEYWORDS.filter((k) => k.priority === "high").length} high, ${TARGET_KEYWORDS.filter((k) => k.priority === "medium").length} medium, ${TARGET_KEYWORDS.filter((k) => k.priority === "low").length} low priority)`,
      completed_at: new Date().toISOString(),
      pages_affected: entries.length,
    });

    return NextResponse.json({
      success: true,
      keywordsTracked: entries.length,
      byPriority: {
        high: TARGET_KEYWORDS.filter((k) => k.priority === "high").length,
        medium: TARGET_KEYWORDS.filter((k) => k.priority === "medium").length,
        low: TARGET_KEYWORDS.filter((k) => k.priority === "low").length,
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await supabase.from("automation_runs").insert({
      automation_slug: "rank-tracker",
      status: "error",
      result_summary: msg,
      completed_at: new Date().toISOString(),
      pages_affected: 0,
    });
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
