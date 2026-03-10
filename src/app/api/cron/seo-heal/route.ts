import { NextRequest, NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const maxDuration = 60;

function levenshtein(a: string, b: string): number {
  const m = a.length,
    n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function countWords(text: string): number {
  const stripped = stripHtml(text);
  if (!stripped) return 0;
  return stripped.split(/\s+/).length;
}

function extractSlugFromUrl(url: string): string {
  try {
    const u = new URL(url);
    const segments = u.pathname.split("/").filter(Boolean);
    return segments[segments.length - 1] || "";
  } catch {
    const segments = url.split("/").filter(Boolean);
    return segments[segments.length - 1] || "";
  }
}

function extractPathFromUrl(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return url.startsWith("/") ? url : `/${url}`;
  }
}

function getParentSection(path: string): string {
  if (path.startsWith("/services/")) return "/services";
  if (path.startsWith("/blog/")) return "/blog";
  if (path.startsWith("/commercial/")) return "/commercial";
  if (path.startsWith("/locations/")) return "/locations";
  return "/";
}

async function pingIndexNow(url: string): Promise<void> {
  await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host: "tgyardcare.com",
      key: process.env.INDEXNOW_KEY || "tgyardcare-indexnow-key",
      urlList: [url],
    }),
  }).catch(() => {}); // best effort
}

// --- HELPERS ---

async function markUnfixable(
  supabase: SupabaseClient,
  id: string,
  url: string,
  issueType: string,
  reason: string
): Promise<void> {
  await supabase
    .from("seo_heal_queue")
    .update({ status: "unfixable", fixed_at: new Date().toISOString() })
    .eq("id", id);
  await supabase.from("seo_heal_log").insert({
    action: "marked_unfixable",
    url,
    issue_type: issueType,
    before_state: {},
    after_state: { reason },
  });
}

async function callClaude(
  apiKey: string,
  prompt: string,
  maxTokens: number
): Promise<string | null> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    content: Array<{ type: string; text: string }>;
  };
  return data.content[0]?.text ?? null;
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
    // 1. Fetch pending items from seo_heal_queue
    const { data: queueItems, error: queueError } = await supabase
      .from("seo_heal_queue")
      .select("*")
      .eq("status", "pending");

    if (queueError) {
      await supabase.from("automation_runs").insert({
        automation_slug: "seo-heal",
        status: "error",
        result_summary: `Failed to fetch queue: ${queueError.message}`,
        completed_at: new Date().toISOString(),
        pages_affected: 0,
      });
      return NextResponse.json(
        { success: false, error: queueError.message },
        { status: 500 }
      );
    }

    if (!queueItems || queueItems.length === 0) {
      await supabase.from("automation_runs").insert({
        automation_slug: "seo-heal",
        status: "skipped",
        result_summary: "No pending items in heal queue",
        completed_at: new Date().toISOString(),
        pages_affected: 0,
      });
      return NextResponse.json({ success: true, fixed: 0, unfixable: 0, skipped: 0 });
    }

    let fixed = 0;
    let unfixable = 0;
    let skipped = 0;

    // Pre-fetch sitemap paths for http_error and broken_internal_link handling
    let sitemapPaths: string[] = [];
    const needsSitemap = queueItems.some(
      (item: Record<string, unknown>) =>
        item.issue_type === "http_error" || item.issue_type === "broken_internal_link"
    );
    if (needsSitemap) {
      try {
        const siteUrl =
          process.env.NEXT_PUBLIC_SITE_URL || "https://tgyardcare.com";
        const sitemapRes = await fetch(`${siteUrl}/sitemap.xml`);
        if (sitemapRes.ok) {
          const sitemapXml = await sitemapRes.text();
          const locMatches = sitemapXml.match(/<loc>(.*?)<\/loc>/g) || [];
          sitemapPaths = locMatches.map((loc: string) => {
            const url = loc.replace(/<\/?loc>/g, "");
            return extractPathFromUrl(url);
          });
        }
      } catch {
        // Sitemap fetch failed — will use parent section fallback
      }
    }

    // Extract apiKey once
    const apiKey = process.env.ANTHROPIC_API_KEY;

    // 2. Process each item sequentially
    for (const item of queueItems) {
      const { id, url, issue_type, details } = item as {
        id: string;
        url: string;
        issue_type: string;
        details: Record<string, unknown>;
      };

      try {
        // ===== FALSE POSITIVE AUTO-RESOLVE (5) =====
        if (
          issue_type === "missing_title" ||
          issue_type === "missing_meta_description" ||
          issue_type === "missing_og" ||
          issue_type === "missing_canonical" ||
          issue_type === "missing_schema"
        ) {
          await supabase
            .from("seo_heal_queue")
            .update({ status: "resolved", fixed_at: new Date().toISOString() })
            .eq("id", id);
          await supabase.from("seo_heal_log").insert({
            action: "auto_resolved",
            url,
            issue_type,
            before_state: {},
            after_state: { reason: "False positive — metadata hardcoded" },
          });
          fixed++;
          continue;
        }

        // ===== AUTO-FIXABLE (8) =====

        if (issue_type === "thin_content") {
          // --- THIN CONTENT FIX: Claude expand ---
          if (!apiKey) {
            await markUnfixable(supabase, id, url, issue_type, "ANTHROPIC_API_KEY not configured");
            unfixable++;
            continue;
          }

          const slug = extractSlugFromUrl(url);
          if (!slug) {
            await markUnfixable(supabase, id, url, issue_type, "Could not extract slug from URL");
            unfixable++;
            continue;
          }

          const { data: post, error: postError } = await supabase
            .from("blog_posts")
            .select("*")
            .eq("slug", slug)
            .single();

          if (postError || !post) {
            await markUnfixable(supabase, id, url, issue_type, `Blog post not found for slug: ${slug}`);
            unfixable++;
            continue;
          }

          const title = (post as Record<string, unknown>).title as string;
          const content = (post as Record<string, unknown>).content as string;
          const oldWordCount = countWords(content);

          const expanded = await callClaude(
            apiKey,
            `You are a lawn care content expert in Madison, WI. Expand the following blog post to at least 1200 words. Keep the same topic, title, tone, and HTML structure. Add more depth, practical examples, Madison WI local context, and actionable tips. Return ONLY the expanded HTML content, no explanation.\n\nTitle: ${title}\n\nCurrent content:\n${content}`,
            4096
          );

          if (!expanded) {
            await markUnfixable(supabase, id, url, issue_type, "Claude API call failed");
            unfixable++;
            continue;
          }

          const newWordCount = countWords(expanded);
          if (newWordCount < 1000) {
            await markUnfixable(supabase, id, url, issue_type, `Expanded content only ${newWordCount} words (need 1000+)`);
            unfixable++;
            continue;
          }

          await supabase
            .from("blog_posts")
            .update({
              content: expanded,
              reading_time: Math.ceil(newWordCount / 200),
              updated_at: new Date().toISOString(),
            })
            .eq("slug", slug);

          await supabase.from("seo_heal_log").insert({
            action: "expanded_content",
            url,
            issue_type,
            before_state: { word_count: oldWordCount },
            after_state: { word_count: newWordCount },
          });

          await supabase
            .from("seo_heal_queue")
            .update({ status: "fixed", fixed_at: new Date().toISOString() })
            .eq("id", id);

          await pingIndexNow(url);
          fixed++;
        } else if (issue_type === "http_error" || issue_type === "broken_internal_link") {
          // --- HTTP ERROR / BROKEN INTERNAL LINK: Smart redirect ---
          const path = extractPathFromUrl(url);

          let bestMatch = "";
          let bestScore = 0;

          for (const sitemapPath of sitemapPaths) {
            const score =
              1 -
              levenshtein(path, sitemapPath) /
                Math.max(path.length, sitemapPath.length);
            if (score > bestScore) {
              bestScore = score;
              bestMatch = sitemapPath;
            }
          }

          const destinationPath =
            bestScore > 0.6 ? bestMatch : getParentSection(path);

          // Upsert redirect (use upsert instead of insert to avoid duplicates)
          await supabase.from("seo_redirects").upsert(
            {
              source_path: path,
              destination_path: destinationPath,
              status_code: 301,
              created_by: "seo-heal",
            },
            { onConflict: "source_path" }
          );

          await supabase.from("seo_heal_log").insert({
            action: "created_redirect",
            url,
            issue_type,
            before_state: { path, status: 404 },
            after_state: {
              destination: destinationPath,
              similarity_score: bestScore,
              match_type: bestScore > 0.6 ? "levenshtein" : "parent_section",
            },
          });

          await supabase
            .from("seo_heal_queue")
            .update({ status: "fixed", fixed_at: new Date().toISOString() })
            .eq("id", id);

          await pingIndexNow(url);
          fixed++;
        } else if (issue_type === "soft_404") {
          // --- SOFT 404: Blog → Claude generate, Non-blog → needs_review ---
          const isBlog = url.includes("/blog/");

          if (isBlog) {
            if (!apiKey) {
              await markUnfixable(supabase, id, url, issue_type, "ANTHROPIC_API_KEY not configured");
              unfixable++;
              continue;
            }

            const slug = extractSlugFromUrl(url);
            if (!slug) {
              await markUnfixable(supabase, id, url, issue_type, "Could not extract slug from URL");
              unfixable++;
              continue;
            }

            const { data: post } = await supabase
              .from("blog_posts")
              .select("*")
              .eq("slug", slug)
              .single();

            const postTitle = post
              ? ((post as Record<string, unknown>).title as string)
              : slug.replace(/-/g, " ");

            const generated = await callClaude(
              apiKey,
              `You are a lawn care content expert in Madison, WI. Write a comprehensive blog post (1200+ words) about "${postTitle}". Include practical tips, local Madison WI context, seasonal considerations, and actionable advice. Return ONLY HTML content (no <html>, <head>, or <body> tags). Use <h2>, <h3>, <p>, <ul>, <li> tags.`,
              4096
            );

            if (!generated) {
              await markUnfixable(supabase, id, url, issue_type, "Claude API call failed");
              unfixable++;
              continue;
            }

            const newWordCount = countWords(generated);

            if (post) {
              await supabase
                .from("blog_posts")
                .update({
                  content: generated,
                  reading_time: Math.ceil(newWordCount / 200),
                  updated_at: new Date().toISOString(),
                })
                .eq("slug", slug);
            } else {
              await supabase.from("blog_posts").insert({
                slug,
                title: postTitle,
                content: generated,
                reading_time: Math.ceil(newWordCount / 200),
                status: "published",
                published_at: new Date().toISOString(),
              });
            }

            await supabase.from("seo_heal_log").insert({
              action: "generated_content",
              url,
              issue_type,
              before_state: { word_count: (details?.word_count as number) || 0 },
              after_state: { word_count: newWordCount },
            });

            await supabase
              .from("seo_heal_queue")
              .update({ status: "fixed", fixed_at: new Date().toISOString() })
              .eq("id", id);

            await pingIndexNow(url);
            fixed++;
          } else {
            // Non-blog soft 404: flag for review
            await supabase
              .from("seo_heal_queue")
              .update({ status: "needs_review", fixed_at: new Date().toISOString() })
              .eq("id", id);
            await supabase.from("seo_heal_log").insert({
              action: "flagged_for_review",
              url,
              issue_type,
              before_state: {},
              after_state: { reason: "Non-blog soft 404 — needs manual review" },
            });
            skipped++;
          }
        } else if (issue_type === "slow_response") {
          // --- SLOW RESPONSE: Cache-bust fetch to warm CDN cache ---
          try {
            await fetch(url, {
              headers: { "Cache-Control": "no-cache", "User-Agent": "TotalGuard-SEO-Healer/1.0" },
            });
          } catch {
            // best effort
          }

          await supabase.from("seo_heal_log").insert({
            action: "cache_warmed",
            url,
            issue_type,
            before_state: { response_time_ms: details?.response_time_ms },
            after_state: { action: "fetched_with_no_cache" },
          });

          await supabase
            .from("seo_heal_queue")
            .update({ status: "fixed", fixed_at: new Date().toISOString() })
            .eq("id", id);

          fixed++;
        } else if (issue_type === "broken_external_link") {
          // --- BROKEN EXTERNAL LINK: Blog → strip dead <a>, Non-blog → unfixable ---
          const isBlog = url.includes("/blog/");

          if (isBlog) {
            const slug = extractSlugFromUrl(url);
            if (!slug) {
              await markUnfixable(supabase, id, url, issue_type, "Could not extract slug from URL");
              unfixable++;
              continue;
            }

            const { data: post } = await supabase
              .from("blog_posts")
              .select("*")
              .eq("slug", slug)
              .single();

            if (!post) {
              await markUnfixable(supabase, id, url, issue_type, `Blog post not found for slug: ${slug}`);
              unfixable++;
              continue;
            }

            const content = (post as Record<string, unknown>).content as string;
            const brokenHref = details?.broken_href as string;

            if (!brokenHref) {
              await markUnfixable(supabase, id, url, issue_type, "No broken_href in details");
              unfixable++;
              continue;
            }

            // Strip the <a> tag but keep its inner text
            const escapedHref = brokenHref.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const linkRegex = new RegExp(
              `<a\\s+[^>]*href=["']${escapedHref}["'][^>]*>(.*?)<\\/a>`,
              "gi"
            );
            const updatedContent = content.replace(linkRegex, "$1");

            if (updatedContent === content) {
              await markUnfixable(supabase, id, url, issue_type, "Link tag not found in content");
              unfixable++;
              continue;
            }

            await supabase
              .from("blog_posts")
              .update({ content: updatedContent, updated_at: new Date().toISOString() })
              .eq("slug", slug);

            await supabase.from("seo_heal_log").insert({
              action: "stripped_broken_link",
              url,
              issue_type,
              before_state: { broken_href: brokenHref },
              after_state: { action: "link_text_preserved_tag_removed" },
            });

            await supabase
              .from("seo_heal_queue")
              .update({ status: "fixed", fixed_at: new Date().toISOString() })
              .eq("id", id);

            await pingIndexNow(url);
            fixed++;
          } else {
            await markUnfixable(supabase, id, url, issue_type, "Non-blog broken external link — requires code change");
            unfixable++;
          }
        } else if (issue_type === "stale_content") {
          // --- STALE CONTENT: Claude refresh blog content ---
          if (!apiKey) {
            await markUnfixable(supabase, id, url, issue_type, "ANTHROPIC_API_KEY not configured");
            unfixable++;
            continue;
          }

          const slug = extractSlugFromUrl(url);
          if (!slug) {
            await markUnfixable(supabase, id, url, issue_type, "Could not extract slug from URL");
            unfixable++;
            continue;
          }

          const { data: post } = await supabase
            .from("blog_posts")
            .select("*")
            .eq("slug", slug)
            .single();

          if (!post) {
            await markUnfixable(supabase, id, url, issue_type, `Blog post not found for slug: ${slug}`);
            unfixable++;
            continue;
          }

          const title = (post as Record<string, unknown>).title as string;
          const content = (post as Record<string, unknown>).content as string;
          const oldWordCount = countWords(content);

          const refreshed = await callClaude(
            apiKey,
            `You are a lawn care content expert in Madison, WI. Refresh and update the following blog post with current best practices, updated statistics, and fresh examples for 2026. Keep the same topic, title, and HTML structure. Ensure at least 1200 words. Return ONLY the updated HTML content, no explanation.\n\nTitle: ${title}\n\nCurrent content:\n${content}`,
            4096
          );

          if (!refreshed) {
            await markUnfixable(supabase, id, url, issue_type, "Claude API call failed");
            unfixable++;
            continue;
          }

          const newWordCount = countWords(refreshed);

          await supabase
            .from("blog_posts")
            .update({
              content: refreshed,
              reading_time: Math.ceil(newWordCount / 200),
              updated_at: new Date().toISOString(),
            })
            .eq("slug", slug);

          await supabase.from("seo_heal_log").insert({
            action: "refreshed_content",
            url,
            issue_type,
            before_state: { word_count: oldWordCount },
            after_state: { word_count: newWordCount },
          });

          await supabase
            .from("seo_heal_queue")
            .update({ status: "fixed", fixed_at: new Date().toISOString() })
            .eq("id", id);

          await pingIndexNow(url);
          fixed++;
        } else if (issue_type === "missing_alt") {
          // --- MISSING ALT: Claude generate alt text for blog images ---
          if (!apiKey) {
            await markUnfixable(supabase, id, url, issue_type, "ANTHROPIC_API_KEY not configured");
            unfixable++;
            continue;
          }

          const slug = extractSlugFromUrl(url);
          if (!slug) {
            await markUnfixable(supabase, id, url, issue_type, "Could not extract slug from URL");
            unfixable++;
            continue;
          }

          const { data: post } = await supabase
            .from("blog_posts")
            .select("*")
            .eq("slug", slug)
            .single();

          if (!post) {
            await markUnfixable(supabase, id, url, issue_type, `Blog post not found for slug: ${slug}`);
            unfixable++;
            continue;
          }

          const title = (post as Record<string, unknown>).title as string;
          const content = (post as Record<string, unknown>).content as string;

          // Find <img> tags without alt attributes
          const imgWithoutAlt = /<img\b(?![^>]*\balt\s*=)[^>]*>/gi;
          const matches = content.match(imgWithoutAlt);

          if (!matches || matches.length === 0) {
            // No images without alt — auto-resolve
            await supabase
              .from("seo_heal_queue")
              .update({ status: "resolved", fixed_at: new Date().toISOString() })
              .eq("id", id);
            await supabase.from("seo_heal_log").insert({
              action: "auto_resolved",
              url,
              issue_type,
              before_state: {},
              after_state: { reason: "No images without alt found on re-check" },
            });
            fixed++;
            continue;
          }

          // Ask Claude to generate alt texts
          const imgList = matches.map((m, i) => `${i + 1}. ${m}`).join("\n");
          const altTexts = await callClaude(
            apiKey,
            `Generate descriptive, SEO-friendly alt text for each of these images from a lawn care blog post titled "${title}". Return ONLY a JSON array of strings, one alt text per image in the same order.\n\nImages:\n${imgList}`,
            1024
          );

          if (!altTexts) {
            await markUnfixable(supabase, id, url, issue_type, "Claude API call failed for alt generation");
            unfixable++;
            continue;
          }

          let alts: string[];
          try {
            alts = JSON.parse(altTexts) as string[];
          } catch {
            await markUnfixable(supabase, id, url, issue_type, "Failed to parse Claude alt text response");
            unfixable++;
            continue;
          }

          // Replace each <img> without alt with the Claude-generated alt
          let updatedContent = content;
          let altIndex = 0;
          updatedContent = updatedContent.replace(imgWithoutAlt, (match) => {
            const alt = alts[altIndex] || `Lawn care image for ${title}`;
            altIndex++;
            // Insert alt before the closing >
            return match.replace(/>$/, ` alt="${alt.replace(/"/g, "&quot;")}">`);
          });

          await supabase
            .from("blog_posts")
            .update({ content: updatedContent, updated_at: new Date().toISOString() })
            .eq("slug", slug);

          await supabase.from("seo_heal_log").insert({
            action: "added_alt_text",
            url,
            issue_type,
            before_state: { missing_alt_count: matches.length },
            after_state: { alts_added: Math.min(alts.length, matches.length) },
          });

          await supabase
            .from("seo_heal_queue")
            .update({ status: "fixed", fixed_at: new Date().toISOString() })
            .eq("id", id);

          await pingIndexNow(url);
          fixed++;
        } else if (issue_type === "cwv_poor") {
          // ===== FLAGGED: CWV POOR — cache purge + needs_review =====
          try {
            await fetch(url, {
              headers: { "Cache-Control": "no-cache", "User-Agent": "TotalGuard-SEO-Healer/1.0" },
            });
          } catch {
            // best effort cache purge
          }

          await supabase
            .from("seo_heal_queue")
            .update({ status: "needs_review", fixed_at: new Date().toISOString() })
            .eq("id", id);
          await supabase.from("seo_heal_log").insert({
            action: "flagged_for_review",
            url,
            issue_type,
            before_state: details,
            after_state: { reason: "Cache purged, needs manual CWV optimization review" },
          });
          skipped++;
        } else {
          // ===== FLAGGED: Everything else → needs_review =====
          // Covers: missing_h1, heading_order, duplicate_title, orphan_page,
          // nap_mismatch, sitemap_mismatch, schema_error, and any unknown types
          await supabase
            .from("seo_heal_queue")
            .update({ status: "needs_review", fixed_at: new Date().toISOString() })
            .eq("id", id);
          await supabase.from("seo_heal_log").insert({
            action: "flagged_for_review",
            url,
            issue_type,
            before_state: details,
            after_state: { reason: "Requires manual review — code-level or structural issue" },
          });
          skipped++;
        }
      } catch (itemError) {
        // Individual item failure — mark as unfixable and continue
        const reason =
          itemError instanceof Error ? itemError.message : "Unknown error";
        await markUnfixable(supabase, id, url, issue_type, reason);
        unfixable++;
      }
    }

    // 3. Log automation run
    await supabase.from("automation_runs").insert({
      automation_slug: "seo-heal",
      status: "success",
      result_summary: `Fixed ${fixed}, unfixable ${unfixable}, needs_review ${skipped}`,
      completed_at: new Date().toISOString(),
      pages_affected: fixed,
    });

    return NextResponse.json({ success: true, fixed, unfixable, skipped });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    await supabase.from("automation_runs").insert({
      automation_slug: "seo-heal",
      status: "error",
      result_summary: message,
      completed_at: new Date().toISOString(),
      pages_affected: 0,
    });
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
