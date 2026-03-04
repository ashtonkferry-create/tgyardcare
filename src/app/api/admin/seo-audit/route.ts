import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const maxDuration = 300; // 5 min timeout

// All 76 pages from sitemap
const ALL_PAGES = [
  "/", "/about", "/contact", "/services", "/commercial", "/residential",
  "/gallery", "/reviews", "/faq", "/blog", "/team", "/service-areas",
  "/get-quote", "/careers", "/privacy",
  // Services
  "/services/mowing", "/services/weeding", "/services/mulching",
  "/services/leaf-removal", "/services/spring-cleanup", "/services/fall-cleanup",
  "/services/gutter-cleaning", "/services/gutter-guards", "/services/garden-beds",
  "/services/fertilization", "/services/herbicide", "/services/snow-removal",
  "/services/pruning", "/services/aeration",
  // Commercial
  "/commercial/lawn-care", "/commercial/seasonal", "/commercial/gutters",
  "/commercial/snow-removal", "/commercial/property-enhancement",
  "/commercial/fertilization-weed-control", "/commercial/aeration",
  // Locations
  "/locations/madison", "/locations/middleton", "/locations/waunakee",
  "/locations/monona", "/locations/sun-prairie", "/locations/fitchburg",
  "/locations/verona", "/locations/mcfarland", "/locations/cottage-grove",
  "/locations/deforest", "/locations/oregon", "/locations/stoughton",
];

interface PageMetaResponse {
  path: string;
  title: string | null;
  metaDescription: string | null;
  h1: string | null;
  h1Count: number;
  imagesMissingAlt: number;
  internalLinkCount: number;
  hasCanonical: boolean;
  hasGeoRegion: boolean;
  hasGeoPlacename: boolean;
  schemaTypes: string[];
  statusCode: number;
  error?: string;
}

interface AuditIssue {
  type: string;
  severity: "critical" | "warning" | "info";
  detail: string;
}

function scorePage(meta: PageMetaResponse): { score: number; issues: AuditIssue[] } {
  const issues: AuditIssue[] = [];
  let score = 0;

  // Title (20 pts)
  if (!meta.title) {
    issues.push({ type: "Missing title tag", severity: "critical", detail: "No <title> found" });
  } else if (meta.title.length < 30 || meta.title.length > 60) {
    score += 10;
    issues.push({
      type: "Title length suboptimal",
      severity: "warning",
      detail: `Title is ${meta.title.length} chars (ideal: 30-60)`,
    });
  } else {
    score += 20;
  }

  // Meta description (20 pts)
  if (!meta.metaDescription) {
    issues.push({ type: "Missing meta description", severity: "critical", detail: "No meta description found" });
  } else if (meta.metaDescription.length < 70 || meta.metaDescription.length > 160) {
    score += 10;
    issues.push({
      type: "Meta description length suboptimal",
      severity: "warning",
      detail: `Description is ${meta.metaDescription.length} chars (ideal: 70-160)`,
    });
  } else {
    score += 20;
  }

  // H1 (15 pts)
  if (meta.h1Count === 0) {
    issues.push({ type: "Missing H1", severity: "critical", detail: "No H1 tag found on page" });
  } else if (meta.h1Count > 1) {
    score += 8;
    issues.push({ type: "Multiple H1 tags", severity: "warning", detail: `Found ${meta.h1Count} H1 tags (should be 1)` });
  } else {
    score += 15;
  }

  // Schema (15 pts)
  if (meta.schemaTypes.length === 0) {
    issues.push({ type: "No schema markup", severity: "critical", detail: "No JSON-LD schema found" });
  } else if (meta.schemaTypes.includes("Invalid")) {
    score += 8;
    issues.push({ type: "Invalid schema JSON", severity: "warning", detail: "One or more schemas failed to parse" });
  } else {
    score += 15;
  }

  // Image alt text (10 pts)
  if (meta.imagesMissingAlt > 0) {
    const pts = Math.max(0, 10 - meta.imagesMissingAlt * 2);
    score += pts;
    issues.push({
      type: "Images missing alt text",
      severity: meta.imagesMissingAlt > 3 ? "warning" : "info",
      detail: `${meta.imagesMissingAlt} images missing alt attribute`,
    });
  } else {
    score += 10;
  }

  // Internal links (10 pts)
  if (meta.internalLinkCount < 3) {
    score += 5;
    issues.push({
      type: "Low internal links",
      severity: "info",
      detail: `Only ${meta.internalLinkCount} internal links (recommended: 3+)`,
    });
  } else {
    score += 10;
  }

  // Canonical (5 pts)
  if (!meta.hasCanonical) {
    score += 2;
    issues.push({ type: "Missing canonical tag", severity: "info", detail: "No <link rel='canonical'> found" });
  } else {
    score += 5;
  }

  // GEO signals (5 pts) — only scored for location pages
  if (meta.path.startsWith("/locations/")) {
    if (!meta.hasGeoRegion || !meta.hasGeoPlacename) {
      issues.push({
        type: "Missing GEO meta tags",
        severity: "warning",
        detail: `Location page missing: ${[!meta.hasGeoRegion && "geo.region", !meta.hasGeoPlacename && "geo.placename"].filter((x): x is string => Boolean(x)).join(", ")}`,
      });
    } else {
      score += 5;
    }
  } else {
    score += 5; // Non-location pages get full GEO points
  }

  return { score: Math.min(100, score), issues };
}

export async function GET(req: NextRequest) {
  const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const cronSecret = req.headers.get("authorization")?.replace("Bearer ", "");
  const adminToken = req.headers.get("x-admin-token");

  if (process.env.CRON_SECRET) {
    if (cronSecret !== process.env.CRON_SECRET && adminToken !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tgyardcare.com";
  const results: Array<{ path: string; score: number; issues: number }> = [];
  const errors: Array<{ path: string; reason: string }> = [];

  for (const path of ALL_PAGES) {
    try {
      const metaRes = await fetch(
        `${baseUrl}/api/admin/page-meta?path=${encodeURIComponent(path)}`,
        { headers: { "x-admin-token": process.env.CRON_SECRET ?? "" } }
      );
      const meta: PageMetaResponse = await metaRes.json();

      if (meta.statusCode === 0 || meta.statusCode >= 400) {
        errors.push({ path, reason: meta.error ?? `HTTP ${meta.statusCode}` });
        continue;
      }

      const { score, issues } = scorePage(meta);

      // Upsert to page_seo
      await supabaseAdmin.from("page_seo").upsert({
        path,
        seo_score: score,
        audit_issues: issues,
        audited_at: new Date().toISOString(),
      }, { onConflict: "path" });

      results.push({ path, score, issues: issues.length });
    } catch (err) {
      errors.push({ path, reason: String(err) });
    }

    // Small delay to avoid overwhelming the server
    await new Promise(r => setTimeout(r, 100));
  }

  const avgScore = results.length
    ? Math.round(results.reduce((a, b) => a + b.score, 0) / results.length)
    : 0;

  // Log to automation_runs
  await supabaseAdmin.from("automation_runs").insert({
    automation_slug: "full-seo-audit",
    started_at: new Date().toISOString(),
    completed_at: new Date().toISOString(),
    status: errors.length === 0 ? "success" : errors.length < 5 ? "warning" : "error",
    result_summary: `Audited ${results.length} pages. Avg score: ${avgScore}/100. ${errors.length} errors.`,
    pages_affected: results.length,
  });

  // Update last_run_at
  await supabaseAdmin.from("automation_config")
    .update({ last_run_at: new Date().toISOString() })
    .eq("slug", "full-seo-audit");

  return NextResponse.json({
    audited: results.length,
    averageScore: avgScore,
    errors: errors.length,
    results,
  });
}
