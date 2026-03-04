import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const staleDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
  const { data } = await supabase.from("page_seo")
    .update({ needs_refresh: true }).lt("audited_at", staleDate).select("path");
  const count = data?.length ?? 0;

  await supabase.from("automation_runs").insert({
    automation_slug: "content-freshness-monitor", status: "success",
    result_summary: `Flagged ${count} pages as stale (>90 days)`,
    completed_at: new Date().toISOString(), pages_affected: count,
  });
  await supabase.from("automation_config").update({ last_run_at: new Date().toISOString() }).eq("slug","content-freshness-monitor");
  return NextResponse.json({ flagged: count });
}
