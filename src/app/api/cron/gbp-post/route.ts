import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const month = new Date().getMonth() + 1;
  const mmdd = month * 100 + new Date().getDate();
  const season = (mmdd >= 1115 || mmdd <= 314) ? "winter" : (mmdd >= 915 && mmdd <= 1114) ? "fall" : "summer";

  const res = await anthropic.messages.create({
    model: "claude-sonnet-4-6", max_tokens: 300,
    messages: [{ role: "user", content: `Write a Google Business Profile post (150-180 chars) for TotalGuard Yard Care, Madison WI. Season: ${season}. Include a call to action. No hashtags. Professional but friendly. Return ONLY the post text.` }],
  });
  const post = res.content.find(b => b.type === "text")?.text?.trim() ?? "";

  await supabase.from("automation_runs").insert({
    automation_slug: "gbp-post-generator", status: "success",
    result_summary: post, completed_at: new Date().toISOString(), pages_affected: 0,
  });
  await supabase.from("automation_config").update({ last_run_at: new Date().toISOString() }).eq("slug","gbp-post-generator");
  return NextResponse.json({ post });
}
