import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getExpectedSeason(): string {
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const mmdd = month * 100 + day;
  if (mmdd >= 1115 || mmdd <= 314) return "winter";
  if (mmdd >= 915 && mmdd <= 1114) return "fall";
  return "summer";
}

async function sendSlack(msg: string) {
  if (!process.env.SLACK_WEBHOOK_URL) return;
  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: msg }),
  });
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data: override } = await supabase
    .from("season_override").select("active_override").single();

  if (override?.active_override && override.active_override !== "auto") {
    await supabase.from("automation_runs").insert({
      automation_slug: "auto-season-switcher",
      status: "skipped",
      result_summary: `Manual override active: ${override.active_override}`,
      completed_at: new Date().toISOString(),
      pages_affected: 0,
    });
    return NextResponse.json({ status: "skipped", reason: "manual override" });
  }

  const expected = getExpectedSeason();

  const { data: current } = await supabase
    .from("season_settings").select("season")
    .order("updated_at", { ascending: false }).limit(1).single();

  if (current?.season === expected) {
    await supabase.from("automation_runs").insert({
      automation_slug: "auto-season-switcher",
      status: "skipped",
      result_summary: `Already ${expected} — no change needed`,
      completed_at: new Date().toISOString(),
      pages_affected: 0,
    });
    return NextResponse.json({ status: "skipped", season: expected });
  }

  await supabase.from("season_settings").upsert(
    { season: expected, updated_at: new Date().toISOString() },
    { onConflict: "season" }
  );

  await sendSlack(`TotalGuard season switched: ${current?.season ?? "?"} to *${expected}*`);

  await supabase.from("automation_runs").insert({
    automation_slug: "auto-season-switcher",
    status: "success",
    result_summary: `Season switched to ${expected}`,
    completed_at: new Date().toISOString(),
    pages_affected: 1,
  });
  await supabase.from("automation_config")
    .update({ last_run_at: new Date().toISOString() })
    .eq("slug", "auto-season-switcher");

  return NextResponse.json({ status: "success", newSeason: expected });
}
