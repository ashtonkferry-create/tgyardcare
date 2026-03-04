import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// NAP = Name, Address, Phone
// Checks consistency of TotalGuard's business info across key site pages
// and structured data. Runs weekly Tuesday 9am.

const CANONICAL_NAP = {
  name: "TotalGuard Yard Care",
  phone: "608-535-6057",
  phoneAlt: "(608) 535-6057",
  city: "Madison",
  state: "WI",
  email: "totalguardllc@gmail.com",
};

const KEY_PAGES = ["/", "/contact", "/about", "/service-areas"];

async function sendSlack(msg: string) {
  if (!process.env.SLACK_WEBHOOK_URL) return;
  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: msg }),
  });
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

  const issues: string[] = [];
  const checked: string[] = [];

  for (const path of KEY_PAGES) {
    try {
      const res = await fetch(`${base}${path}`, { next: { revalidate: 0 } });
      if (!res.ok) {
        issues.push(`${path}: HTTP ${res.status}`);
        continue;
      }
      const html = await res.text();

      // Check phone presence
      const hasPhone =
        html.includes(CANONICAL_NAP.phone) ||
        html.includes(CANONICAL_NAP.phoneAlt) ||
        html.includes("535-6057");
      if (!hasPhone) issues.push(`${path}: phone number not found`);

      // Check business name
      if (!html.includes("TotalGuard")) {
        issues.push(`${path}: business name not found`);
      }

      // Check city
      if (!html.includes(CANONICAL_NAP.city)) {
        issues.push(`${path}: city "Madison" not found`);
      }

      // Check JSON-LD structured data on homepage
      if (path === "/") {
        if (!html.includes('"LocalBusiness"') && !html.includes('"LawnCareService"')) {
          issues.push(`${path}: missing LocalBusiness schema`);
        }
        if (!html.includes(CANONICAL_NAP.email)) {
          issues.push(`${path}: email not in structured data`);
        }
      }

      checked.push(path);
    } catch (err) {
      issues.push(`${path}: fetch error — ${String(err).slice(0, 60)}`);
    }
  }

  const status = issues.length === 0 ? "success" : "warning";
  const summary =
    issues.length === 0
      ? `NAP consistent across ${checked.length} pages`
      : `${issues.length} NAP issue(s) found: ${issues.slice(0, 3).join("; ")}`;

  if (issues.length > 0) {
    await sendSlack(
      [
        `*NAP Checker — ${issues.length} issue(s) found*`,
        ...issues.map((i) => `• ${i}`),
        `Fix at: ${base}/admin`,
      ].join("\n")
    );
  }

  await supabase.from("automation_runs").insert({
    automation_slug: "nap-checker",
    status,
    result_summary: summary,
    completed_at: new Date().toISOString(),
    pages_affected: issues.length,
  });

  await supabase
    .from("automation_config")
    .update({ last_run_at: new Date().toISOString() })
    .eq("slug", "nap-checker");

  return NextResponse.json({ status, issues, checked });
}
