import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Geo Signal Auditor — runs weekly Tuesday 10am.
// Audits geographic SEO signals across location pages:
// structured data, geo-specific content, canonical URLs,
// service area schema, and city-specific keyword presence.

const LOCATION_PAGES = [
  { city: "Madison",       slug: "madison",       path: "/locations/madison" },
  { city: "Middleton",     slug: "middleton",     path: "/locations/middleton" },
  { city: "Verona",        slug: "verona",        path: "/locations/verona" },
  { city: "Fitchburg",     slug: "fitchburg",     path: "/locations/fitchburg" },
  { city: "Sun Prairie",   slug: "sun-prairie",   path: "/locations/sun-prairie" },
  { city: "Waunakee",      slug: "waunakee",      path: "/locations/waunakee" },
];

const GEO_SIGNALS_REQUIRED = [
  { key: "schema", check: (html: string) => html.includes('"@type"') && html.includes('"LocalBusiness"'), label: "LocalBusiness schema" },
  { key: "serviceArea", check: (html: string) => html.includes("serviceArea") || html.includes("areaServed"), label: "serviceArea/areaServed schema" },
  { key: "wi", check: (html: string) => html.includes(", WI") || html.includes(",WI") || html.includes("Wisconsin"), label: "State reference (WI/Wisconsin)" },
  { key: "danecounty", check: (html: string) => html.includes("Dane County") || html.includes("dane county"), label: "Dane County mention" },
  { key: "canonical", check: (html: string) => html.includes('rel="canonical"'), label: "Canonical URL tag" },
  { key: "title", check: (html: string) => html.includes("<title>") && html.includes("</title>"), label: "Page title tag" },
];

async function sendSlack(msg: string) {
  if (!process.env.SLACK_WEBHOOK_URL) return;
  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: msg }),
  });
}

interface PageResult {
  path: string;
  city: string;
  status: number | "error";
  missing: string[];
  hasGeoKeyword: boolean;
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tgyardcare.com";

  const results: PageResult[] = [];
  const allIssues: string[] = [];

  for (const loc of LOCATION_PAGES) {
    const url = `${base}${loc.path}`;
    try {
      const res = await fetch(url, { next: { revalidate: 0 } });

      if (!res.ok) {
        results.push({ path: loc.path, city: loc.city, status: res.status, missing: [`HTTP ${res.status}`], hasGeoKeyword: false });
        allIssues.push(`${loc.path}: HTTP ${res.status}`);
        continue;
      }

      const html = await res.text();
      const missing: string[] = [];

      // Check required geo signals
      for (const signal of GEO_SIGNALS_REQUIRED) {
        if (!signal.check(html)) {
          missing.push(signal.label);
        }
      }

      // Check city name appears in page content (not just URL)
      const hasGeoKeyword = html.toLowerCase().includes(loc.city.toLowerCase());
      if (!hasGeoKeyword) {
        missing.push(`City name "${loc.city}" not found in content`);
      }

      // Check for lawn care + city keyword combo
      const hasCityService =
        html.toLowerCase().includes(`lawn care ${loc.city.toLowerCase()}`) ||
        html.toLowerCase().includes(`lawn mowing ${loc.city.toLowerCase()}`) ||
        html.toLowerCase().includes(`${loc.city.toLowerCase()} lawn`);

      if (!hasCityService) {
        missing.push(`Missing city+service keyword combo (e.g. "lawn care ${loc.city}")`);
      }

      results.push({ path: loc.path, city: loc.city, status: res.status, missing, hasGeoKeyword });

      if (missing.length > 0) {
        allIssues.push(`${loc.city} (${loc.path}): ${missing.join(", ")}`);
      }
    } catch (err) {
      results.push({ path: loc.path, city: loc.city, status: "error", missing: [String(err).slice(0, 80)], hasGeoKeyword: false });
      allIssues.push(`${loc.path}: fetch error`);
    }
  }

  const pagesWithIssues = results.filter(r => r.missing.length > 0).length;
  const status = pagesWithIssues === 0 ? "success" : pagesWithIssues > 3 ? "warning" : "success";
  const summary = pagesWithIssues === 0
    ? `All ${LOCATION_PAGES.length} location pages pass geo signal audit`
    : `${pagesWithIssues} of ${LOCATION_PAGES.length} location pages have geo signal issues`;

  if (allIssues.length > 0) {
    await sendSlack(
      [
        `*Geo Signal Auditor — ${allIssues.length} issue(s)*`,
        ...allIssues.slice(0, 10).map(i => `• ${i}`),
        allIssues.length > 10 ? `• ...and ${allIssues.length - 10} more` : "",
        `Fix at: ${base}/admin/seo`,
      ].filter(Boolean).join("\n")
    );
  }

  await supabase.from("automation_runs").insert({
    automation_slug: "geo-signal-auditor",
    status,
    result_summary: summary,
    completed_at: new Date().toISOString(),
    pages_affected: pagesWithIssues,
  });

  await supabase
    .from("automation_config")
    .update({ last_run_at: new Date().toISOString() })
    .eq("slug", "geo-signal-auditor");

  return NextResponse.json({ status, summary, results });
}
