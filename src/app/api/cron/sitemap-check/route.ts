import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export const maxDuration = 60;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tgyardcare.com";
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const broken: string[] = [];

  for (const url of urls) {
    const res = await fetch(url, { method: "HEAD" }).catch(() => null);
    if (!res?.ok) broken.push(`${url} (${res?.status ?? "timeout"})`);
  }

  const status = broken.length === 0 ? "success" : broken.length < 3 ? "warning" : "error";
  const summary = broken.length === 0
    ? `All ${urls.length} sitemap URLs return 200`
    : `${broken.length} broken: ${broken.slice(0, 3).join(", ")}`;

  if (broken.length && process.env.SLACK_WEBHOOK_URL) {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: `Sitemap check: ${summary}` }),
    });
  }

  await supabase.from("automation_runs").insert({
    automation_slug: "sitemap-integrity-check",
    status, result_summary: summary,
    completed_at: new Date().toISOString(), pages_affected: urls.length,
  });
  await supabase.from("automation_config")
    .update({ last_run_at: new Date().toISOString() })
    .eq("slug", "sitemap-integrity-check");

  return NextResponse.json({ checked: urls.length, broken: broken.length });
}
