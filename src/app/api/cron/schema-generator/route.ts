import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tgyardcare.com";

// All known routes that should have schemas
const ALL_ROUTES = [
  "/", "/services", "/about", "/contact", "/reviews", "/faq",
  "/gallery", "/get-quote", "/residential", "/commercial",
  "/service-areas", "/careers", "/team", "/blog", "/privacy",
  "/services/mowing", "/services/fertilization", "/services/gutter-cleaning",
  "/services/gutter-guards", "/services/leaf-removal", "/services/fall-cleanup",
  "/services/spring-cleanup", "/services/snow-removal", "/services/mulching",
  "/services/pruning", "/services/weeding", "/services/herbicide",
  "/services/garden-beds", "/services/aeration",
  "/locations/madison", "/locations/middleton", "/locations/fitchburg",
  "/locations/verona", "/locations/sun-prairie", "/locations/waunakee",
  "/locations/deforest", "/locations/monona", "/locations/mcfarland",
  "/locations/oregon", "/locations/stoughton", "/locations/cottage-grove",
  "/commercial/lawn-care", "/commercial/snow-removal", "/commercial/gutters",
  "/commercial/seasonal", "/commercial/aeration",
  "/commercial/fertilization-weed-control", "/commercial/property-enhancement",
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

  const results: { path: string; hasSchema: boolean; types: string[] }[] = [];

  for (const path of ALL_ROUTES) {
    try {
      const res = await fetch(`${SITE_URL}${path}`, {
        headers: { "User-Agent": "TotalGuard-SchemaGen/1.0" },
      });
      const html = await res.text();

      const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
      const types: string[] = [];
      let match;

      while ((match = jsonLdRegex.exec(html)) !== null) {
        try {
          const parsed = JSON.parse(match[1]);
          const items = Array.isArray(parsed) ? parsed : [parsed];
          for (const item of items) {
            if (item["@type"]) types.push(String(item["@type"]));
          }
        } catch {
          // skip malformed
        }
      }

      results.push({ path, hasSchema: types.length > 0, types });
    } catch {
      results.push({ path, hasSchema: false, types: [] });
    }
  }

  const withSchema = results.filter((r) => r.hasSchema).length;
  const withoutSchema = results.filter((r) => !r.hasSchema);

  // Log pages without schema to page_seo for tracking
  for (const page of withoutSchema) {
    await supabase.from("page_seo").upsert(
      {
        path: page.path,
        needs_schema: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "path" }
    );
  }

  await supabase.from("automation_runs").insert({
    automation_slug: "schema-generator",
    status: withoutSchema.length > 0 ? "warning" : "success",
    result_summary: `${withSchema}/${ALL_ROUTES.length} pages have schemas. ${withoutSchema.length} pages need schema markup.`,
    completed_at: new Date().toISOString(),
    pages_affected: withoutSchema.length,
  });

  return NextResponse.json({
    success: true,
    total: ALL_ROUTES.length,
    withSchema,
    withoutSchema: withoutSchema.length,
    missingPages: withoutSchema.map((p) => p.path),
  });
}
