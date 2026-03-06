import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tgyardcare.com";

const ALL_PAGES = [
  "/", "/services", "/about", "/contact", "/reviews", "/faq",
  "/gallery", "/get-quote", "/residential", "/commercial",
  "/service-areas", "/careers",
  "/services/mowing", "/services/fertilization", "/services/gutter-cleaning",
  "/services/gutter-guards", "/services/leaf-removal", "/services/fall-cleanup",
  "/services/spring-cleanup", "/services/snow-removal", "/services/mulching",
  "/services/pruning", "/services/weeding", "/services/herbicide",
  "/services/garden-beds", "/services/aeration",
  "/locations/madison", "/locations/middleton", "/locations/fitchburg",
  "/locations/verona", "/locations/sun-prairie",
  "/commercial/lawn-care", "/commercial/snow-removal",
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
    // Build an internal link map: for each page, count incoming links
    const incomingLinks: Record<string, string[]> = {};
    const outgoingLinks: Record<string, string[]> = {};

    for (const page of ALL_PAGES) {
      incomingLinks[page] = [];
      outgoingLinks[page] = [];
    }

    for (const page of ALL_PAGES) {
      try {
        const res = await fetch(`${SITE_URL}${page}`, {
          headers: { "User-Agent": "TotalGuard-LinkOptimizer/1.0" },
        });
        const html = await res.text();

        // Find all internal links
        const linkRegex = /href=["'](\/[^"'#?]*?)["']/g;
        let match;
        const seen = new Set<string>();

        while ((match = linkRegex.exec(html)) !== null) {
          const href = match[1].replace(/\/$/, "") || "/";
          if (!seen.has(href) && ALL_PAGES.includes(href)) {
            seen.add(href);
            outgoingLinks[page].push(href);
            if (incomingLinks[href]) {
              incomingLinks[href].push(page);
            }
          }
        }
      } catch {
        // Skip pages that fail to load
      }
    }

    // Find pages with few incoming links (orphans or near-orphans)
    const suggestions: {
      page: string;
      incomingCount: number;
      outgoingCount: number;
      suggestion: string;
    }[] = [];

    for (const page of ALL_PAGES) {
      const incoming = incomingLinks[page]?.length ?? 0;
      const outgoing = outgoingLinks[page]?.length ?? 0;

      if (incoming < 3 && page !== "/") {
        // Find related pages that could link to this one
        const relatedPages = ALL_PAGES.filter((p) => {
          if (p === page) return false;
          // Same category
          const pageCategory = page.split("/")[1];
          const pCategory = p.split("/")[1];
          return pageCategory === pCategory;
        }).slice(0, 3);

        suggestions.push({
          page,
          incomingCount: incoming,
          outgoingCount: outgoing,
          suggestion: `Only ${incoming} pages link here. Add links from: ${relatedPages.join(", ") || "hub pages"}`,
        });
      }

      if (outgoing < 2 && page !== "/contact" && page !== "/get-quote") {
        suggestions.push({
          page,
          incomingCount: incoming,
          outgoingCount: outgoing,
          suggestion: `Only ${outgoing} outgoing internal links. Add contextual links to related services/pages.`,
        });
      }
    }

    await supabase.from("automation_runs").insert({
      automation_slug: "internal-link-optimizer",
      status: suggestions.length > 0 ? "warning" : "success",
      result_summary: `Analyzed ${ALL_PAGES.length} pages. Found ${suggestions.length} linking improvement opportunities.`,
      completed_at: new Date().toISOString(),
      pages_affected: suggestions.length,
    });

    return NextResponse.json({
      success: true,
      pagesAnalyzed: ALL_PAGES.length,
      suggestionsCount: suggestions.length,
      suggestions: suggestions.slice(0, 20),
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await supabase.from("automation_runs").insert({
      automation_slug: "internal-link-optimizer",
      status: "error",
      result_summary: msg,
      completed_at: new Date().toISOString(),
      pages_affected: 0,
    });
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
