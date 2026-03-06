import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tgyardcare.com";

const PAGES_TO_CHECK = [
  "/", "/services", "/about", "/gallery", "/reviews",
  "/services/mowing", "/services/gutter-cleaning", "/services/mulching",
  "/services/snow-removal", "/services/leaf-removal",
  "/locations/madison", "/locations/middleton",
  "/commercial", "/residential",
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

  const results: { path: string; totalImages: number; missingAlt: number; images: string[] }[] = [];

  for (const path of PAGES_TO_CHECK) {
    try {
      const res = await fetch(`${SITE_URL}${path}`, {
        headers: { "User-Agent": "TotalGuard-AltChecker/1.0" },
      });
      const html = await res.text();

      // Find all img tags
      const imgRegex = /<img\b([^>]*)>/gi;
      let match;
      let totalImages = 0;
      const missingAltSrcs: string[] = [];

      while ((match = imgRegex.exec(html)) !== null) {
        totalImages++;
        const attrs = match[1];
        // Check for alt attribute (alt="" counts as present but empty)
        const hasAlt = /\balt\s*=/i.test(attrs);
        if (!hasAlt) {
          const srcMatch = attrs.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
          missingAltSrcs.push(srcMatch ? srcMatch[1] : "unknown-src");
        }
      }

      results.push({
        path,
        totalImages,
        missingAlt: missingAltSrcs.length,
        images: missingAltSrcs.slice(0, 5), // Cap at 5 per page
      });
    } catch {
      results.push({ path, totalImages: 0, missingAlt: 0, images: [] });
    }
  }

  const totalMissing = results.reduce((s, r) => s + r.missingAlt, 0);
  const totalImages = results.reduce((s, r) => s + r.totalImages, 0);

  await supabase.from("automation_runs").insert({
    automation_slug: "image-alt-checker",
    status: totalMissing > 0 ? "warning" : "success",
    result_summary: `${totalMissing} images missing alt text out of ${totalImages} total across ${PAGES_TO_CHECK.length} pages`,
    completed_at: new Date().toISOString(),
    pages_affected: results.filter((r) => r.missingAlt > 0).length,
  });

  return NextResponse.json({
    success: true,
    totalImages,
    totalMissing,
    pagesChecked: results.length,
    issues: results.filter((r) => r.missingAlt > 0),
  });
}
