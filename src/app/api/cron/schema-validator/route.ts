import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tgyardcare.com";

const PAGES_TO_CHECK = [
  "/", "/services", "/about", "/contact", "/reviews",
  "/services/mowing", "/services/gutter-cleaning", "/services/snow-removal",
  "/locations/madison", "/locations/middleton", "/locations/fitchburg",
  "/commercial", "/commercial/lawn-care",
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

  const results: { path: string; valid: boolean; schemas: string[]; issues: string[] }[] = [];

  for (const path of PAGES_TO_CHECK) {
    try {
      const res = await fetch(`${SITE_URL}${path}`, {
        headers: { "User-Agent": "TotalGuard-SchemaValidator/1.0" },
      });
      const html = await res.text();

      // Extract all JSON-LD scripts
      const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
      const schemas: string[] = [];
      const issues: string[] = [];
      let match;

      while ((match = jsonLdRegex.exec(html)) !== null) {
        try {
          const parsed = JSON.parse(match[1]);
          const types = Array.isArray(parsed)
            ? parsed.map((s: Record<string, unknown>) => String(s["@type"] || "unknown"))
            : [String(parsed["@type"] || "unknown")];
          schemas.push(...types);

          // Validate @context
          const items = Array.isArray(parsed) ? parsed : [parsed];
          for (const item of items) {
            if (!item["@context"] || !String(item["@context"]).includes("schema.org")) {
              issues.push(`Missing or invalid @context on ${item["@type"] || "unknown"}`);
            }
            if (!item["@type"]) {
              issues.push("Schema block missing @type");
            }
          }
        } catch {
          issues.push("Malformed JSON-LD: parse error");
        }
      }

      if (schemas.length === 0) {
        issues.push("No JSON-LD schemas found");
      }

      results.push({ path, valid: issues.length === 0, schemas, issues });
    } catch {
      results.push({ path, valid: false, schemas: [], issues: ["Failed to fetch page"] });
    }
  }

  const passing = results.filter((r) => r.valid).length;
  const failing = results.filter((r) => !r.valid).length;

  await supabase.from("automation_runs").insert({
    automation_slug: "schema-validator",
    status: failing > 0 ? "warning" : "success",
    result_summary: `${passing}/${results.length} pages have valid schemas. ${failing} have issues.`,
    completed_at: new Date().toISOString(),
    pages_affected: results.length,
  });

  return NextResponse.json({
    success: true,
    passing,
    failing,
    total: results.length,
    details: results.filter((r) => !r.valid),
  });
}
