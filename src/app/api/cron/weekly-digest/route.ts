import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { count: leads } = await supabase.from("contact_submissions")
    .select("id", { count: "exact" }).gte("created_at", sevenDaysAgo);
  const { data: seoRows } = await supabase.from("page_seo").select("seo_score");
  const avgScore = seoRows?.length
    ? Math.round(seoRows.reduce((a, b) => a + ((b as {seo_score: number}).seo_score ?? 0), 0) / seoRows.length) : 0;
  const critical = seoRows?.filter(p => ((p as {seo_score: number}).seo_score ?? 0) < 50).length ?? 0;
  const { data: cfgs } = await supabase.from("automation_config").select("is_active");
  const active = cfgs?.filter(c => (c as {is_active: boolean}).is_active).length ?? 0;

  const msg = [
    `*TotalGuard Weekly Digest — ${new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}*`,
    `Leads this week: *${leads ?? 0}*`,
    `SEO avg score: *${avgScore}/100*`,
    `Critical pages: *${critical}*`,
    `Automations running: *${active}/${cfgs?.length ?? 0}*`,
    `https://tgyardcare.com/admin`,
  ].join("\n");

  if (process.env.SLACK_WEBHOOK_URL) {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: msg }),
    });
  }

  await supabase.from("automation_runs").insert({
    automation_slug: "weekly-performance-digest", status: "success",
    result_summary: `Digest sent: ${leads} leads, ${avgScore}/100 avg SEO, ${critical} critical`,
    completed_at: new Date().toISOString(), pages_affected: 0,
  });
  await supabase.from("automation_config").update({ last_run_at: new Date().toISOString() }).eq("slug","weekly-performance-digest");
  return NextResponse.json({ sent: true });
}
