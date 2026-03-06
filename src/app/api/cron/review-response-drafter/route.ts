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

  try {
    // Fetch reviews without responses
    const { data: unresponded } = await supabase
      .from("reviews")
      .select("id, author, rating, text, source")
      .is("response_draft", null)
      .not("text", "is", null)
      .order("created_at", { ascending: false })
      .limit(5);

    if (!unresponded || unresponded.length === 0) {
      await supabase.from("automation_runs").insert({
        automation_slug: "review-response-drafter",
        status: "skipped",
        result_summary: "No unresponded reviews found",
        completed_at: new Date().toISOString(),
        pages_affected: 0,
      });
      return NextResponse.json({ success: true, drafted: 0 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      await supabase.from("automation_runs").insert({
        automation_slug: "review-response-drafter",
        status: "error",
        result_summary: "ANTHROPIC_API_KEY not configured",
        completed_at: new Date().toISOString(),
        pages_affected: 0,
      });
      return NextResponse.json({ success: false, error: "ANTHROPIC_API_KEY not set" }, { status: 500 });
    }

    let drafted = 0;

    for (const review of unresponded) {
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
            max_tokens: 300,
            messages: [
              {
                role: "user",
                content: `You are responding to a Google review for TotalGuard Yard Care, a lawn care and yard services company in Madison, WI. Write a professional, warm, and personal response. Keep it under 100 words. Don't be overly formal.

Review by ${review.author} (${review.rating}/5 stars):
"${review.text}"

Write just the response text, no quotes or labels.`,
              },
            ],
          }),
        });

        const data = await res.json();
        const draft =
          data.content?.[0]?.type === "text" ? data.content[0].text : null;

        if (draft) {
          await supabase
            .from("reviews")
            .update({ response_draft: draft, draft_created_at: new Date().toISOString() })
            .eq("id", review.id);
          drafted++;
        }
      } catch {
        // Continue to next review on individual failure
      }
    }

    await supabase.from("automation_runs").insert({
      automation_slug: "review-response-drafter",
      status: "success",
      result_summary: `Drafted responses for ${drafted}/${unresponded.length} reviews`,
      completed_at: new Date().toISOString(),
      pages_affected: drafted,
    });

    return NextResponse.json({ success: true, drafted, total: unresponded.length });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await supabase.from("automation_runs").insert({
      automation_slug: "review-response-drafter",
      status: "error",
      result_summary: msg,
      completed_at: new Date().toISOString(),
      pages_affected: 0,
    });
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
