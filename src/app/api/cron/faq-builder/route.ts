import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
export const maxDuration = 120;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SERVICES = ["/services/mowing","/services/snow-removal","/services/leaf-removal","/services/gutter-cleaning","/services/fertilization","/services/aeration"];

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  let processed = 0;
  for (const path of SERVICES) {
    try {
      const service = path.replace("/services/","").replace(/-/g," ");
      const res = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001", max_tokens: 600,
        messages: [{ role: "user", content: `Generate 5 FAQ JSON-LD entries for ${service} service, TotalGuard Yard Care, Madison WI. Return ONLY a JSON array: [{"question":"...","answer":"..."},...]` }],
      });
      const text = res.content.find(b => b.type === "text")?.text?.trim();
      const match = text?.match(/\[[\s\S]+\]/);
      if (!match) continue;
      const faqs: Array<{question: string; answer: string}> = JSON.parse(match[0]);
      const schema = {
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({
          "@type": "Question", name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      };
      await supabase.from("page_seo").upsert({ path, schema_data: schema }, { onConflict: "path" });
      processed++;
    } catch (err) { console.error(`faq-builder failed for ${path}:`, err); }
  }

  await supabase.from("automation_runs").insert({
    automation_slug: "faq-schema-builder", status: "success",
    result_summary: `Built FAQ schemas for ${processed} pages`,
    completed_at: new Date().toISOString(), pages_affected: processed,
  });
  await supabase.from("automation_config").update({ last_run_at: new Date().toISOString() }).eq("slug","faq-schema-builder");
  return NextResponse.json({ processed });
}
