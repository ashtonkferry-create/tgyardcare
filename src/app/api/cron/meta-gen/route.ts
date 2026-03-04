import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
export const maxDuration = 120;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data: pages } = await supabase
    .from("page_seo").select("path").is("suggested_meta_description", null).limit(10);
  if (!pages?.length) return NextResponse.json({ generated: 0 });

  let generated = 0;
  for (const page of pages) {
    try {
      const res = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001", max_tokens: 200,
        messages: [{ role: "user", content: `Write a compelling meta description (120-155 chars) for TotalGuard Yard Care page: ${page.path}. Madison WI. Focus on value + local keywords. Return ONLY the meta description text.` }],
      });
      const text = res.content.find(b => b.type === "text")?.text?.trim();
      if (text && text.length >= 70 && text.length <= 160) {
        await supabase.from("page_seo").upsert({ path: page.path, suggested_meta_description: text }, { onConflict: "path" });
        generated++;
      }
    } catch (err) { console.error(`meta-gen failed for ${page.path}:`, err); }
  }

  await supabase.from("automation_runs").insert({
    automation_slug: "meta-description-generator", status: "success",
    result_summary: `Generated meta descriptions for ${generated} pages`,
    completed_at: new Date().toISOString(), pages_affected: generated,
  });
  await supabase.from("automation_config").update({ last_run_at: new Date().toISOString() }).eq("slug", "meta-description-generator");
  return NextResponse.json({ generated });
}
