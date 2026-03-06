import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Cities we already have location pages for
const EXISTING_LOCATIONS = [
  "madison", "middleton", "fitchburg", "verona", "sun-prairie",
  "waunakee", "deforest", "monona", "mcfarland", "oregon",
  "stoughton", "cottage-grove",
];

// Potential expansion cities in Dane County and surrounding area
const POTENTIAL_CITIES = [
  "cross-plains", "mount-horeb", "black-earth", "mazomere",
  "deerfield", "marshall", "windsor", "westport", "maple-bluff",
  "shorewood-hills", "burke", "blooming-grove", "pleasant-springs",
  "springdale", "dunkirk", "christiana", "albion",
];

// Services we have pages for
const EXISTING_SERVICES = [
  "mowing", "fertilization", "gutter-cleaning", "gutter-guards",
  "leaf-removal", "fall-cleanup", "spring-cleanup", "snow-removal",
  "mulching", "pruning", "weeding", "herbicide", "garden-beds", "aeration",
];

// High-value keyword patterns that could be dedicated landing pages
const KEYWORD_PATTERNS = [
  { pattern: "{service} {city} wi", type: "local-service" },
  { pattern: "best {service} near {city}", type: "near-me" },
  { pattern: "affordable {service} {city}", type: "price-intent" },
  { pattern: "{service} cost {city} wi", type: "pricing" },
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

  try {
    const gaps: {
      type: string;
      keyword: string;
      recommendation: string;
      priority: string;
    }[] = [];

    // Gap 1: Cities without location pages
    for (const city of POTENTIAL_CITIES) {
      const displayName = city.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      gaps.push({
        type: "missing-location-page",
        keyword: `lawn care ${displayName} WI`,
        recommendation: `Create /locations/${city} page targeting "${displayName}, WI" service area`,
        priority: "medium",
      });
    }

    // Gap 2: Combined service+city keywords without dedicated pages
    const highValueCombos = [
      { service: "snow removal", city: "madison" },
      { service: "gutter cleaning", city: "madison" },
      { service: "lawn care", city: "madison" },
      { service: "lawn care", city: "middleton" },
    ];

    // Check which landing pages already exist
    const existingLandingPages = [
      "/snow-removal-madison-wi",
      "/gutter-cleaning-madison-wi",
      "/lawn-care-madison-wi",
      "/lawn-care-middleton-wi",
    ];

    // Find service+city combos that DON'T have dedicated landing pages yet
    for (const service of EXISTING_SERVICES.slice(0, 6)) {
      for (const city of EXISTING_LOCATIONS.slice(0, 4)) {
        const slug = `/${service}-${city}-wi`;
        if (!existingLandingPages.includes(slug)) {
          const displayCity = city.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
          const displayService = service.replace(/-/g, " ");
          gaps.push({
            type: "missing-landing-page",
            keyword: `${displayService} ${displayCity} WI`,
            recommendation: `Consider creating ${slug} landing page`,
            priority: "low",
          });
        }
      }
    }

    // Gap 3: Keyword pattern opportunities
    for (const pattern of KEYWORD_PATTERNS) {
      gaps.push({
        type: "keyword-opportunity",
        keyword: pattern.pattern.replace("{service}", "lawn care").replace("{city}", "Madison"),
        recommendation: `Ensure content targets "${pattern.type}" search intent`,
        priority: "low",
      });
    }

    // Store gaps in Supabase
    await supabase.from("seo_gaps").upsert(
      gaps.slice(0, 50).map((g) => ({
        gap_type: g.type,
        keyword: g.keyword,
        recommendation: g.recommendation,
        priority: g.priority,
        checked_at: new Date().toISOString(),
      })),
      { onConflict: "keyword" }
    );

    await supabase.from("automation_runs").insert({
      automation_slug: "local-gap-finder",
      status: "success",
      result_summary: `Found ${gaps.length} local SEO gaps: ${gaps.filter((g) => g.type === "missing-location-page").length} missing cities, ${gaps.filter((g) => g.type === "missing-landing-page").length} missing landing pages`,
      completed_at: new Date().toISOString(),
      pages_affected: gaps.length,
    });

    return NextResponse.json({
      success: true,
      totalGaps: gaps.length,
      byType: {
        missingLocationPages: gaps.filter((g) => g.type === "missing-location-page").length,
        missingLandingPages: gaps.filter((g) => g.type === "missing-landing-page").length,
        keywordOpportunities: gaps.filter((g) => g.type === "keyword-opportunity").length,
      },
      topGaps: gaps.filter((g) => g.priority !== "low").slice(0, 10),
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await supabase.from("automation_runs").insert({
      automation_slug: "local-gap-finder",
      status: "error",
      result_summary: msg,
      completed_at: new Date().toISOString(),
      pages_affected: 0,
    });
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
