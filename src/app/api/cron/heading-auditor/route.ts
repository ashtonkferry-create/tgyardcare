import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tgyardcare.com";

const PAGES_TO_CHECK = [
  "/", "/services", "/about", "/contact", "/reviews", "/faq",
  "/residential", "/commercial", "/gallery", "/get-quote",
  "/services/mowing", "/services/gutter-cleaning", "/services/snow-removal",
  "/services/fertilization", "/services/leaf-removal", "/services/mulching",
  "/locations/madison", "/locations/middleton", "/locations/fitchburg",
  "/commercial/lawn-care", "/commercial/snow-removal",
];

type HeadingIssue = {
  path: string;
  h1Count: number;
  issues: string[];
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

  const results: HeadingIssue[] = [];

  for (const path of PAGES_TO_CHECK) {
    try {
      const res = await fetch(`${SITE_URL}${path}`, {
        headers: { "User-Agent": "TotalGuard-HeadingAuditor/1.0" },
      });
      const html = await res.text();
      const issues: string[] = [];

      // Extract all headings with their levels
      const headingRegex = /<h([1-6])\b[^>]*>/gi;
      const levels: number[] = [];
      let match;
      while ((match = headingRegex.exec(html)) !== null) {
        levels.push(parseInt(match[1], 10));
      }

      const h1Count = levels.filter((l) => l === 1).length;

      if (h1Count === 0) issues.push("Missing H1 tag");
      if (h1Count > 1) issues.push(`Multiple H1 tags found: ${h1Count}`);

      // Check hierarchy — each heading should not skip more than 1 level
      for (let i = 1; i < levels.length; i++) {
        if (levels[i] > levels[i - 1] + 1) {
          issues.push(
            `Heading hierarchy skip: H${levels[i - 1]} followed by H${levels[i]}`
          );
          break; // One issue per page is enough
        }
      }

      if (issues.length > 0) {
        results.push({ path, h1Count, issues });
      }
    } catch {
      results.push({ path, h1Count: 0, issues: ["Failed to fetch page"] });
    }
  }

  await supabase.from("automation_runs").insert({
    automation_slug: "heading-auditor",
    status: results.length > 0 ? "warning" : "success",
    result_summary: `${results.length} pages have heading issues out of ${PAGES_TO_CHECK.length} checked`,
    completed_at: new Date().toISOString(),
    pages_affected: results.length,
  });

  return NextResponse.json({
    success: true,
    pagesChecked: PAGES_TO_CHECK.length,
    issueCount: results.length,
    issues: results,
  });
}
