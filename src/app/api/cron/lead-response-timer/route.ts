import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
  const { data } = await supabase.from("contact_submissions")
    .select("name, created_at").is("responded_at", null)
    .lt("created_at", twoHoursAgo).limit(10);

  if (!data?.length) return NextResponse.json({ alerts: 0 });

  if (process.env.SLACK_WEBHOOK_URL) {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `*${data.length} lead(s) unresponded 2+ hours:* ${data.map((l: {name: string}) => l.name).join(", ")}\nhttps://tgyardcare.com/admin/leads`,
      }),
    });
  }

  await supabase.from("automation_runs").insert({
    automation_slug: "lead-response-timer", status: "warning",
    result_summary: `${data.length} unresponded leads past 2hr threshold`,
    completed_at: new Date().toISOString(), pages_affected: 0,
  });
  return NextResponse.json({ alerts: data.length });
}
