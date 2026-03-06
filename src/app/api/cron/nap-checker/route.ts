import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tgyardcare.com";

// Canonical NAP values from schema-constants
const CANONICAL_NAP = {
  name: "TotalGuard Yard Care",
  phone: "608-535-6057",
  phoneVariants: ["608-535-6057", "(608) 535-6057", "+1-608-535-6057", "6085356057"],
  address: "7610 Welton Dr",
  city: "Madison",
  state: "WI",
  zip: "53711",
};

const PAGES_TO_CHECK = [
  "/", "/about", "/contact", "/services", "/residential", "/commercial",
  "/reviews", "/get-quote", "/faq",
  "/locations/madison", "/locations/middleton", "/locations/fitchburg",
  "/locations/verona", "/locations/sun-prairie",
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

  const issues: { path: string; problems: string[] }[] = [];

  for (const path of PAGES_TO_CHECK) {
    try {
      const res = await fetch(`${SITE_URL}${path}`, {
        headers: { "User-Agent": "TotalGuard-NAPChecker/1.0" },
      });
      const html = await res.text();
      const problems: string[] = [];

      // Check business name presence
      if (!html.includes(CANONICAL_NAP.name)) {
        problems.push("Business name not found on page");
      }

      // Check phone presence (any variant)
      const hasPhone = CANONICAL_NAP.phoneVariants.some((p) => html.includes(p));
      if (!hasPhone) {
        problems.push("Phone number not found on page");
      }

      // Check address
      if (!html.includes(CANONICAL_NAP.address)) {
        // Only flag on pages that should have full address (not all pages need it)
        if (["/", "/about", "/contact"].includes(path) || path.startsWith("/locations/")) {
          problems.push("Street address not found on page");
        }
      }

      // Check for inconsistent phone numbers (non-canonical formats in visible text)
      const phoneRegex = /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
      const foundPhones = html.match(phoneRegex) || [];
      const nonCanonical = foundPhones.filter(
        (p) => !CANONICAL_NAP.phoneVariants.includes(p) && p !== "6085356057"
      );
      if (nonCanonical.length > 0) {
        problems.push(`Non-canonical phone numbers found: ${[...new Set(nonCanonical)].join(", ")}`);
      }

      if (problems.length > 0) {
        issues.push({ path, problems });
      }
    } catch {
      issues.push({ path, problems: ["Failed to fetch page"] });
    }
  }

  await supabase.from("automation_runs").insert({
    automation_slug: "nap-checker",
    status: issues.length > 0 ? "warning" : "success",
    result_summary: `${issues.length} pages have NAP consistency issues out of ${PAGES_TO_CHECK.length} checked`,
    completed_at: new Date().toISOString(),
    pages_affected: issues.length,
  });

  return NextResponse.json({
    success: true,
    pagesChecked: PAGES_TO_CHECK.length,
    issuesFound: issues.length,
    issues,
  });
}
