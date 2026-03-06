import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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
      automation_slug: "content-refresher",
      status: "error",
      result_summary: "ANTHROPIC_API_KEY not configured",
      completed_at: new Date().toISOString(),
      pages_affected: 0,
    });
    return NextResponse.json({ success: false, error: "ANTHROPIC_API_KEY not set" }, { status: 500 });
  }

  try {
    // Get pages flagged as needing refresh (by content-freshness cron)
    const { data: stalePages } = await supabase
      .from("page_seo")
      .select("path, title, meta_description, audited_at")
      .eq("needs_refresh", true)
      .order("audited_at", { ascending: true })
      .limit(5);

    if (!stalePages || stalePages.length === 0) {
      await supabase.from("automation_runs").insert({
        automation_slug: "content-refresher",
        status: "skipped",
        result_summary: "No stale pages to refresh",
        completed_at: new Date().toISOString(),
        pages_affected: 0,
      });
      return NextResponse.json({ success: true, refreshed: 0 });
    }

    let suggestionsCreated = 0;

    for (const page of stalePages) {
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-haiku-4-20250414",
            max_tokens: 500,
            messages: [
              {
                role: "user",
                content: `You are an SEO content specialist for TotalGuard Yard Care in Madison, WI. The following page hasn't been updated in over 90 days:

Page: ${page.path}
Title: ${page.title || "N/A"}
Meta Description: ${page.meta_description || "N/A"}
Last Audited: ${page.audited_at || "Unknown"}

Suggest 3 specific content updates to improve freshness and SEO:
1. An updated meta description (under 160 chars, include "Madison, WI")
2. A new paragraph or section to add (seasonal relevance, recent stats, local context)
3. Internal linking suggestion (which other TotalGuard pages to link to)

Be specific and actionable. Format as JSON: {"meta": "...", "content": "...", "links": ["...", "..."]}
Return ONLY the JSON.`,
              },
            ],
          }),
        });

        const data = await res.json();
        const content = data.content?.[0]?.type === "text" ? data.content[0].text : null;

        if (content) {
          await supabase.from("content_suggestions").insert({
            page_path: page.path,
            suggestion_type: "refresh",
            suggestions: content,
            status: "pending",
            created_at: new Date().toISOString(),
          });
          suggestionsCreated++;
        }
      } catch {
        // Continue on individual failure
      }
    }

    await supabase.from("automation_runs").insert({
      automation_slug: "content-refresher",
      status: "success",
      result_summary: `Generated refresh suggestions for ${suggestionsCreated}/${stalePages.length} stale pages`,
      completed_at: new Date().toISOString(),
      pages_affected: suggestionsCreated,
    });

    return NextResponse.json({
      success: true,
      stalePages: stalePages.length,
      suggestionsCreated,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await supabase.from("automation_runs").insert({
      automation_slug: "content-refresher",
      status: "error",
      result_summary: msg,
      completed_at: new Date().toISOString(),
      pages_affected: 0,
    });
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
