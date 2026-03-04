import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tgyardcare.com";
  const text = await (await fetch(`${base}/robots.txt`)).text();
  const issues: string[] = [];
  if (!text.includes("Disallow: /admin")) issues.push("Missing 'Disallow: /admin'");
  if (!text.includes("Sitemap:")) issues.push("Missing Sitemap directive");

  const status = issues.length === 0 ? "success" : "warning";
  await supabase.from("automation_runs").insert({
    automation_slug: "robots-guard",
    status, result_summary: issues.length === 0 ? "robots.txt valid" : issues.join("; "),
    completed_at: new Date().toISOString(),
    pages_affected: 0,
  });
  await supabase.from("automation_config")
    .update({ last_run_at: new Date().toISOString() })
    .eq("slug", "robots-guard");

  return NextResponse.json({ valid: issues.length === 0, issues });
}
