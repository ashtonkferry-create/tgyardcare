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
    // Find jobs completed in the last 7 days that haven't had review requests
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { data: recentJobs } = await supabase
      .from("leads")
      .select("id, name, email, phone, service, created_at")
      .eq("status", "completed")
      .gte("updated_at", sevenDaysAgo)
      .is("review_requested_at", null);

    const candidates = recentJobs ?? [];

    // Mark them as review-request-pending
    if (candidates.length > 0) {
      const ids = candidates.map((c) => c.id);
      await supabase
        .from("leads")
        .update({ review_requested_at: new Date().toISOString() })
        .in("id", ids);
    }

    // Log the review request candidates for manual outreach
    const summary = candidates.map((c) => ({
      name: c.name,
      email: c.email,
      phone: c.phone,
      service: c.service,
      completedAt: c.created_at,
    }));

    await supabase.from("automation_runs").insert({
      automation_slug: "review-request",
      status: "success",
      result_summary: `Found ${candidates.length} customers eligible for review requests`,
      completed_at: new Date().toISOString(),
      pages_affected: candidates.length,
    });

    return NextResponse.json({
      success: true,
      candidateCount: candidates.length,
      candidates: summary,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await supabase.from("automation_runs").insert({
      automation_slug: "review-request",
      status: "error",
      result_summary: msg,
      completed_at: new Date().toISOString(),
      pages_affected: 0,
    });
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
