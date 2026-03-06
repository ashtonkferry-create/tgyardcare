import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tgyardcare.com";

const PAGES_TO_CHECK = [
  { path: "/", expectGeo: true, expectNAP: true },
  { path: "/about", expectGeo: true, expectNAP: true },
  { path: "/contact", expectGeo: true, expectNAP: true },
  { path: "/locations/madison", expectGeo: true, expectNAP: true },
  { path: "/locations/middleton", expectGeo: true, expectNAP: true },
  { path: "/locations/fitchburg", expectGeo: true, expectNAP: true },
  { path: "/locations/verona", expectGeo: true, expectNAP: true },
  { path: "/locations/sun-prairie", expectGeo: true, expectNAP: true },
  { path: "/locations/waunakee", expectGeo: true, expectNAP: true },
  { path: "/services", expectGeo: false, expectNAP: true },
  { path: "/commercial", expectGeo: false, expectNAP: true },
];

type AuditResult = {
  path: string;
  hasLocalBusinessSchema: boolean;
  hasGeoMeta: boolean;
  hasMapOrDirections: boolean;
  hasNAP: boolean;
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

  const results: AuditResult[] = [];

  for (const page of PAGES_TO_CHECK) {
    try {
      const res = await fetch(`${SITE_URL}${page.path}`, {
        headers: { "User-Agent": "TotalGuard-GeoAuditor/1.0" },
      });
      const html = await res.text();
      const issues: string[] = [];

      // Check for LocalBusiness schema
      const hasLocalBusinessSchema =
        html.includes('"LocalBusiness"') ||
        html.includes('"LawnAndGardenStore"') ||
        html.includes('"HomeAndConstructionBusiness"');

      // Check for geo meta tags
      const hasGeoMeta =
        html.includes('name="geo.region"') ||
        html.includes('name="geo.placename"') ||
        html.includes('name="geo.position"') ||
        html.includes('name="ICBM"');

      // Check for maps/directions
      const hasMapOrDirections =
        html.includes("maps.google.com") ||
        html.includes("google.com/maps") ||
        html.includes("maps.googleapis.com") ||
        html.includes("directions") ||
        html.includes("goo.gl/maps");

      // Check for NAP presence
      const hasNAP =
        html.includes("TotalGuard") &&
        (html.includes("608-535-6057") || html.includes("(608) 535-6057"));

      if (page.expectGeo && !hasGeoMeta) {
        issues.push("Missing geo meta tags");
      }
      if (!hasLocalBusinessSchema && page.expectGeo) {
        issues.push("Missing LocalBusiness schema");
      }
      if (page.expectGeo && !hasMapOrDirections) {
        issues.push("No Google Maps embed or directions link");
      }
      if (page.expectNAP && !hasNAP) {
        issues.push("NAP (Name/Address/Phone) not found");
      }

      results.push({
        path: page.path,
        hasLocalBusinessSchema,
        hasGeoMeta,
        hasMapOrDirections,
        hasNAP,
        issues,
      });
    } catch {
      results.push({
        path: page.path,
        hasLocalBusinessSchema: false,
        hasGeoMeta: false,
        hasMapOrDirections: false,
        hasNAP: false,
        issues: ["Failed to fetch page"],
      });
    }
  }

  const issueCount = results.filter((r) => r.issues.length > 0).length;

  await supabase.from("automation_runs").insert({
    automation_slug: "geo-signal-auditor",
    status: issueCount > 0 ? "warning" : "success",
    result_summary: `${issueCount}/${results.length} pages have geo signal issues`,
    completed_at: new Date().toISOString(),
    pages_affected: issueCount,
  });

  return NextResponse.json({
    success: true,
    pagesChecked: results.length,
    issueCount,
    details: results.filter((r) => r.issues.length > 0),
  });
}
