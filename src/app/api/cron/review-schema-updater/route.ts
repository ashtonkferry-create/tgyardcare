import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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
    const { data: reviews } = await supabase
      .from("reviews")
      .select("rating")
      .not("rating", "is", null);

    const count = reviews?.length ?? 0;
    const avg =
      count > 0
        ? Math.round(
            (reviews!.reduce((s, r) => s + (r.rating ?? 0), 0) / count) * 10
          ) / 10
        : 4.9;

    // Upsert aggregate rating into site_config
    await supabase.from("site_config").upsert(
      {
        key: "aggregate_rating",
        value: JSON.stringify({
          ratingValue: avg,
          ratingCount: count,
          reviewCount: count,
        }),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" }
    );

    await supabase.from("automation_runs").insert({
      automation_slug: "review-schema-updater",
      status: "success",
      result_summary: `Updated aggregate rating: ${avg}/5 from ${count} reviews`,
      completed_at: new Date().toISOString(),
      pages_affected: 1,
    });

    return NextResponse.json({ success: true, ratingValue: avg, reviewCount: count });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await supabase.from("automation_runs").insert({
      automation_slug: "review-schema-updater",
      status: "error",
      result_summary: msg,
      completed_at: new Date().toISOString(),
      pages_affected: 0,
    });
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
