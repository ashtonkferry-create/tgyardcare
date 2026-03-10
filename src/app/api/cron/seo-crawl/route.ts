import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const maxDuration = 60;

interface SeoIssue {
  url: string;
  issue_type: string;
  severity: string;
  details: Record<string, unknown>;
}

interface ProcessResult {
  issues: SeoIssue[];
  title: string | null;
  url: string;
}

async function fetchWithTimeout(
  url: string,
  timeoutMs: number
): Promise<{ response: Response; elapsed: number }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const start = Date.now();
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "TotalGuard-SEO-Crawler/1.0" },
    });
    const elapsed = Date.now() - start;
    return { response, elapsed };
  } finally {
    clearTimeout(timer);
  }
}

function extractTag(html: string, regex: RegExp): string | null {
  const match = html.match(regex);
  return match ? match[1].trim() : null;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

async function processUrl(url: string): Promise<ProcessResult> {
  const issues: SeoIssue[] = [];

  let html: string;
  let statusCode: number;
  let elapsed: number;

  try {
    const result = await fetchWithTimeout(url, 10000);
    statusCode = result.response.status;
    elapsed = result.elapsed;
    html = await result.response.text();
  } catch {
    issues.push({
      url,
      issue_type: "http_error",
      severity: "standard",
      details: { error: "fetch_failed_or_timeout" },
    });
    return { issues, title: null, url };
  }

  // HTTP error
  if (statusCode >= 400) {
    issues.push({
      url,
      issue_type: "http_error",
      severity: "standard",
      details: { status_code: statusCode },
    });
  }

  // Slow response
  if (elapsed > 3000) {
    issues.push({
      url,
      issue_type: "slow_response",
      severity: "standard",
      details: { response_time_ms: elapsed },
    });
  }

  // Title
  const title = extractTag(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!title) {
    issues.push({
      url,
      issue_type: "missing_title",
      severity: "standard",
      details: {},
    });
  }

  // Meta description
  const metaDesc = html.match(
    /<meta\s+[^>]*name=["']description["'][^>]*>/i
  );
  if (!metaDesc) {
    issues.push({
      url,
      issue_type: "missing_meta_description",
      severity: "standard",
      details: {},
    });
  }

  // OG tags
  const ogTitle = html.match(
    /<meta\s+[^>]*property=["']og:title["'][^>]*>/i
  );
  const ogDesc = html.match(
    /<meta\s+[^>]*property=["']og:description["'][^>]*>/i
  );
  if (!ogTitle || !ogDesc) {
    issues.push({
      url,
      issue_type: "missing_og",
      severity: "standard",
      details: {
        missing_og_title: !ogTitle,
        missing_og_description: !ogDesc,
      },
    });
  }

  // Canonical
  const canonical = html.match(
    /<link\s+[^>]*rel=["']canonical["'][^>]*>/i
  );
  if (!canonical) {
    issues.push({
      url,
      issue_type: "missing_canonical",
      severity: "standard",
      details: {},
    });
  }

  // Structured data
  const schema = html.match(
    /<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>/i
  );
  if (!schema) {
    issues.push({
      url,
      issue_type: "missing_schema",
      severity: "standard",
      details: {},
    });
  }

  // Blog content checks
  if (url.includes("/blog/")) {
    const stripped = stripHtml(html);
    const wordCount = stripped.split(/\s+/).filter(Boolean).length;

    if (wordCount < 100) {
      issues.push({
        url,
        issue_type: "soft_404",
        severity: "standard",
        details: { word_count: wordCount },
      });
    } else if (wordCount < 800) {
      issues.push({
        url,
        issue_type: "thin_content",
        severity: "standard",
        details: { word_count: wordCount },
      });
    }
  }

  // --- NEW CHECK: Broken external links (blog pages only to stay within timeout) ---
  if (url.includes("/blog/")) {
    const extLinkRegex = /href=["'](https?:\/\/(?!(?:www\.)?tgyardcare\.com)[^"']+)["']/gi;
    let extMatch;
    const checkedExternals = new Set<string>();
    while ((extMatch = extLinkRegex.exec(html)) !== null) {
      const extUrl = extMatch[1];
      if (checkedExternals.has(extUrl)) continue;
      checkedExternals.add(extUrl);
      try {
        const extRes = await fetchWithTimeout(extUrl, 5000);
        if (extRes.response.status >= 400) {
          issues.push({
            url,
            issue_type: "broken_external_link",
            severity: "standard",
            details: { broken_href: extUrl, status: extRes.response.status },
          });
        }
      } catch {
        issues.push({
          url,
          issue_type: "broken_external_link",
          severity: "standard",
          details: { broken_href: extUrl, error: "timeout_or_unreachable" },
        });
      }
    }
  }

  // --- NEW CHECK: H1 count ---
  const h1Matches = html.match(/<h1\b[^>]*>/gi) || [];
  if (h1Matches.length === 0) {
    issues.push({
      url,
      issue_type: "missing_h1",
      severity: "standard",
      details: { h1_count: 0 },
    });
  } else if (h1Matches.length > 1) {
    issues.push({
      url,
      issue_type: "heading_order",
      severity: "standard",
      details: { h1_count: h1Matches.length, issue: "multiple_h1" },
    });
  }

  // --- NEW CHECK: Image alt coverage (blog pages) ---
  if (url.includes("/blog/")) {
    const imgRegex = /<img\b([^>]*)>/gi;
    let imgMatch;
    let missingAltCount = 0;
    while ((imgMatch = imgRegex.exec(html)) !== null) {
      if (!/\balt\s*=/i.test(imgMatch[1])) {
        missingAltCount++;
      }
    }
    if (missingAltCount > 0) {
      issues.push({
        url,
        issue_type: "missing_alt",
        severity: "standard",
        details: { missing_alt_count: missingAltCount },
      });
    }
  }

  return { issues, title, url };
}

async function processInPool(
  urls: string[],
  concurrency: number
): Promise<ProcessResult[]> {
  const allResults: ProcessResult[] = [];
  let index = 0;

  async function next(): Promise<void> {
    while (index < urls.length) {
      const currentIndex = index++;
      const result = await processUrl(urls[currentIndex]);
      allResults.push(result);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, urls.length) }, () =>
    next()
  );
  await Promise.all(workers);
  return allResults;
}

// --- NEW: Core Web Vitals via CrUX API ---
const CWV_PAGES = [
  "https://tgyardcare.com/",
  "https://tgyardcare.com/services",
  "https://tgyardcare.com/services/mowing",
  "https://tgyardcare.com/reviews",
  "https://tgyardcare.com/contact",
];

async function checkCoreWebVitals(): Promise<SeoIssue[]> {
  const issues: SeoIssue[] = [];
  for (const pageUrl of CWV_PAGES) {
    try {
      const cruxRes = await fetch(
        "https://chromeuxreport.googleapis.com/v1/records:queryRecord",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: pageUrl }),
        }
      );
      if (!cruxRes.ok) continue;
      const cruxData = (await cruxRes.json()) as {
        record?: {
          metrics?: {
            largest_contentful_paint?: { percentiles?: { p75?: number } };
            cumulative_layout_shift?: { percentiles?: { p75?: number } };
            interaction_to_next_paint?: { percentiles?: { p75?: number } };
          };
        };
      };
      const metrics = cruxData.record?.metrics;
      if (!metrics) continue;

      const lcp = metrics.largest_contentful_paint?.percentiles?.p75;
      const cls = metrics.cumulative_layout_shift?.percentiles?.p75;
      const inp = metrics.interaction_to_next_paint?.percentiles?.p75;

      const cwvDetails: Record<string, unknown> = {};
      let poor = false;

      if (lcp && lcp > 2500) { cwvDetails.lcp_ms = lcp; poor = true; }
      if (cls && cls > 0.1) { cwvDetails.cls = cls; poor = true; }
      if (inp && inp > 200) { cwvDetails.inp_ms = inp; poor = true; }

      if (poor) {
        issues.push({
          url: pageUrl,
          issue_type: "cwv_poor",
          severity: "standard",
          details: cwvDetails,
        });
      }
    } catch {
      // CrUX unavailable — skip silently
    }
  }
  return issues;
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    auth !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    // 1. Fetch and parse sitemap
    const sitemapRes = await fetch("https://tgyardcare.com/sitemap.xml", {
      headers: { "User-Agent": "TotalGuard-SEO-Crawler/1.0" },
    });
    const sitemapXml = await sitemapRes.text();

    const urls: string[] = [];
    const locRegex = /<loc>(.*?)<\/loc>/g;
    let match: RegExpExecArray | null;
    while ((match = locRegex.exec(sitemapXml)) !== null) {
      urls.push(match[1]);
    }

    if (urls.length === 0) {
      await supabase.from("automation_runs").insert({
        automation_slug: "seo-crawl",
        status: "error",
        result_summary: "No URLs found in sitemap",
        completed_at: new Date().toISOString(),
        pages_affected: 0,
      });
      return NextResponse.json(
        { success: false, error: "No URLs found in sitemap" },
        { status: 500 }
      );
    }

    // 2. Crawl with concurrency pool of 5
    const allResults = await processInPool(urls, 5);
    const allIssues: SeoIssue[] = allResults.flatMap((r) => r.issues);

    // 3. Core Web Vitals check (top 5 pages)
    const cwvIssues = await checkCoreWebVitals();
    allIssues.push(...cwvIssues);

    // 4. Duplicate title detection (post-crawl pass)
    const titleToUrls = new Map<string, string[]>();
    for (const result of allResults) {
      if (result.title) {
        const normalized = result.title.toLowerCase().trim();
        if (!titleToUrls.has(normalized)) titleToUrls.set(normalized, []);
        titleToUrls.get(normalized)!.push(result.url);
      }
    }
    for (const [dupTitle, pageUrls] of titleToUrls) {
      if (pageUrls.length > 1) {
        for (const pageUrl of pageUrls) {
          allIssues.push({
            url: pageUrl,
            issue_type: "duplicate_title",
            severity: "standard",
            details: { title: dupTitle, duplicate_with: pageUrls.filter((u) => u !== pageUrl) },
          });
        }
      }
    }

    // 5. Upsert issues into seo_heal_queue
    const flaggedKeys = new Set<string>();

    for (const issue of allIssues) {
      const key = `${issue.url}::${issue.issue_type}`;
      flaggedKeys.add(key);

      await supabase
        .from("seo_heal_queue")
        .upsert(
          {
            url: issue.url,
            issue_type: issue.issue_type,
            severity: issue.severity,
            details: issue.details,
            status: "pending",
            updated_at: new Date().toISOString(),
          },
          { onConflict: "url,issue_type" }
        );
    }

    // 6. Auto-resolve: mark items resolved if not flagged this run
    const { data: existingItems } = await supabase
      .from("seo_heal_queue")
      .select("id, url, issue_type")
      .eq("status", "pending");

    let resolvedCount = 0;
    if (existingItems && existingItems.length > 0) {
      const toResolve = existingItems.filter(
        (item: { id: string; url: string; issue_type: string }) =>
          !flaggedKeys.has(`${item.url}::${item.issue_type}`)
      );

      if (toResolve.length > 0) {
        const resolveIds = toResolve.map(
          (item: { id: string }) => item.id
        );
        await supabase
          .from("seo_heal_queue")
          .update({
            status: "resolved",
            updated_at: new Date().toISOString(),
          })
          .in("id", resolveIds);
        resolvedCount = toResolve.length;
      }
    }

    // 7. Log to automation_runs
    await supabase.from("automation_runs").insert({
      automation_slug: "seo-crawl",
      status: "success",
      result_summary: `Crawled ${urls.length} URLs, found ${allIssues.length} issues`,
      completed_at: new Date().toISOString(),
      pages_affected: allIssues.length,
    });

    return NextResponse.json({
      success: true,
      urls_crawled: urls.length,
      issues_found: allIssues.length,
      resolved: resolvedCount,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";

    await supabase.from("automation_runs").insert({
      automation_slug: "seo-crawl",
      status: "error",
      result_summary: `SEO crawl failed: ${message}`,
      completed_at: new Date().toISOString(),
      pages_affected: 0,
    });

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
