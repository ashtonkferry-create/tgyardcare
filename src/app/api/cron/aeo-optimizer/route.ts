import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tgyardcare.com";

const FAQ_PAGES = [
  "/faq",
  "/services/mowing",
  "/services/gutter-cleaning",
  "/services/snow-removal",
  "/services/fertilization",
  "/services/leaf-removal",
  "/services/mulching",
  "/services/fall-cleanup",
  "/services/spring-cleanup",
];

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    await supabase.from("automation_runs").insert({
      automation_slug: "aeo-optimizer",
      status: "error",
      result_summary: "ANTHROPIC_API_KEY not configured",
      completed_at: new Date().toISOString(),
      pages_affected: 0,
    });
    return NextResponse.json({ success: false, error: "ANTHROPIC_API_KEY not set" }, { status: 500 });
  }

  try {
    const auditResults: { path: string; hasFAQSchema: boolean; faqCount: number; suggestion?: string }[] = [];

    for (const path of FAQ_PAGES) {
      try {
        const res = await fetch(`${SITE_URL}${path}`, {
          headers: { "User-Agent": "TotalGuard-AEO/1.0" },
        });
        const html = await res.text();

        // Check for FAQPage schema
        const hasFAQSchema = html.includes('"FAQPage"');

        // Count Q&A pairs in schema
        const qCount = (html.match(/"Question"/g) || []).length;

        auditResults.push({ path, hasFAQSchema, faqCount: qCount });
      } catch {
        auditResults.push({ path, hasFAQSchema: false, faqCount: 0 });
      }
    }

    // For pages with few or no FAQs, generate AI suggestions
    const pagesNeedingFAQs = auditResults.filter((r) => r.faqCount < 3);
    let suggestionsGenerated = 0;

    if (pagesNeedingFAQs.length > 0) {
      // Process up to 3 pages per run to limit API costs
      const batch = pagesNeedingFAQs.slice(0, 3);

      for (const page of batch) {
        try {
          const serviceName = page.path.split("/").pop() || "general";
          const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
              model: "claude-haiku-4-20250414",
              max_tokens: 600,
              messages: [
                {
                  role: "user",
                  content: `Generate 3 FAQ Q&A pairs optimized for AI search engines (Google SGE, Bing Chat, Perplexity) about ${serviceName.replace(/-/g, " ")} services in Madison, WI by TotalGuard Yard Care.

Each answer should be:
- 2-3 sentences, direct and factual
- Include "Madison, WI" or "Dane County" naturally
- Start with the direct answer (no filler phrases)
- Include a specific detail (price range, timeline, or technique)

Format as JSON array: [{"q": "...", "a": "..."}]
Return ONLY the JSON array, no other text.`,
                },
              ],
            }),
          });

          const data = await res.json();
          const content = data.content?.[0]?.type === "text" ? data.content[0].text : null;

          if (content) {
            await supabase.from("aeo_suggestions").insert({
              page_path: page.path,
              suggestions: content,
              status: "pending",
              created_at: new Date().toISOString(),
            });
            suggestionsGenerated++;
            page.suggestion = "Generated";
          }
        } catch {
          // Continue on individual failure
        }
      }
    }

    const pagesWithSchema = auditResults.filter((r) => r.hasFAQSchema).length;

    await supabase.from("automation_runs").insert({
      automation_slug: "aeo-optimizer",
      status: "success",
      result_summary: `Checked ${FAQ_PAGES.length} pages: ${pagesWithSchema} have FAQ schema. Generated ${suggestionsGenerated} new FAQ suggestions.`,
      completed_at: new Date().toISOString(),
      pages_affected: suggestionsGenerated,
    });

    return NextResponse.json({
      success: true,
      pagesChecked: FAQ_PAGES.length,
      pagesWithFAQSchema: pagesWithSchema,
      suggestionsGenerated,
      details: auditResults,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await supabase.from("automation_runs").insert({
      automation_slug: "aeo-optimizer",
      status: "error",
      result_summary: msg,
      completed_at: new Date().toISOString(),
      pages_affected: 0,
    });
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
