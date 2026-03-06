import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getCurrentSeason(): string {
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const mmdd = month * 100 + day;
  if (mmdd >= 1115 || mmdd <= 314) return "winter";
  if (mmdd >= 915 && mmdd <= 1114) return "fall";
  return "summer";
}

const SEASON_TOPICS: Record<string, string[]> = {
  summer: [
    "lawn mowing tips for a lush green yard",
    "benefits of regular fertilization in summer",
    "garden bed maintenance and mulching",
    "why professional edging makes your lawn pop",
    "weed control strategies for Wisconsin summers",
  ],
  fall: [
    "importance of fall leaf cleanup for lawn health",
    "gutter cleaning before winter arrives",
    "fall aeration benefits for spring growth",
    "preparing your garden beds for winter",
    "why fall fertilization is essential in Madison",
  ],
  winter: [
    "professional snow removal keeps your property safe",
    "ice management tips for Wisconsin winters",
    "why gutter guards prevent ice dams",
    "winter property maintenance checklist",
    "planning your spring lawn care strategy now",
  ],
};

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
      automation_slug: "social-auto-post",
      status: "error",
      result_summary: "ANTHROPIC_API_KEY not configured",
      completed_at: new Date().toISOString(),
      pages_affected: 0,
    });
    return NextResponse.json({ success: false, error: "ANTHROPIC_API_KEY not set" }, { status: 500 });
  }

  try {
    const season = getCurrentSeason();
    const topics = SEASON_TOPICS[season];
    const topic = topics[Math.floor(Math.random() * topics.length)];

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
            content: `Write a social media post for TotalGuard Yard Care, a professional lawn care and yard services company in Madison, WI.

Topic: ${topic}
Season: ${season}
Tone: Professional but friendly, local expertise, helpful tips
Format: Write for Facebook/Instagram. Include a call to action mentioning free quotes. Keep under 200 words. Include 3-5 relevant hashtags at the end.

Write just the post content, nothing else.`,
          },
        ],
      }),
    });

    const data = await res.json();
    const content =
      data.content?.[0]?.type === "text" ? data.content[0].text : null;

    if (!content) {
      throw new Error("Failed to generate content from AI");
    }

    // Save to social_posts table
    await supabase.from("social_posts").insert({
      platform: "facebook",
      content,
      topic,
      season,
      status: "draft",
      created_at: new Date().toISOString(),
    });

    await supabase.from("automation_runs").insert({
      automation_slug: "social-auto-post",
      status: "success",
      result_summary: `Generated ${season} social post about: ${topic}`,
      completed_at: new Date().toISOString(),
      pages_affected: 1,
    });

    return NextResponse.json({ success: true, season, topic, contentLength: content.length });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await supabase.from("automation_runs").insert({
      automation_slug: "social-auto-post",
      status: "error",
      result_summary: msg,
      completed_at: new Date().toISOString(),
      pages_affected: 0,
    });
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
