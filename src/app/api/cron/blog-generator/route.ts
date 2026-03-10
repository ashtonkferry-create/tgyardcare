import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/* ─── Season helper ─── */
function getCurrentSeason(): "winter" | "fall" | "summer" {
  const now = new Date();
  const mmdd = (now.getMonth() + 1) * 100 + now.getDate();
  if (mmdd >= 1115 || mmdd <= 314) return "winter";
  if (mmdd >= 915) return "fall";
  return "summer";
}

function getMonthName(): string {
  return new Date().toLocaleString("en-US", { month: "long" });
}

/* ─── Topic bank ─── */
interface Topic {
  title: string;
  category: string;
  keywords: string[];
  seasons: ("winter" | "fall" | "summer")[];
}

const SERVICE_AREAS = [
  "Madison", "Middleton", "Waunakee", "Monona", "Sun Prairie",
  "Fitchburg", "Verona", "McFarland", "Cottage Grove", "DeForest",
  "Oregon", "Stoughton",
];

function buildTopicBank(): Topic[] {
  const topics: Topic[] = [];

  /* ── seasonal-tips ── */
  // Spring (covered by "summer" season since spring is summer in 3-season model)
  topics.push(
    { title: "Spring lawn revival guide for Madison homeowners", category: "seasonal-tips", keywords: ["spring lawn care", "Madison lawn care", "lawn revival", "Wisconsin spring"], seasons: ["summer"] },
    { title: "When to start mowing in Wisconsin", category: "seasonal-tips", keywords: ["first mow Wisconsin", "mowing season start", "spring mowing", "Madison lawn mowing"], seasons: ["summer"] },
    { title: "Pre-emergent herbicide timing for Dane County", category: "seasonal-tips", keywords: ["pre-emergent herbicide", "crabgrass prevention", "Dane County lawn care", "weed prevention timing"], seasons: ["summer"] },
    { title: "Spring garden bed preparation tips for Madison WI", category: "seasonal-tips", keywords: ["garden bed prep", "spring garden", "Madison gardening", "Wisconsin spring planting"], seasons: ["summer"] },
  );
  // Summer
  topics.push(
    { title: "Summer watering schedule for Wisconsin lawns", category: "seasonal-tips", keywords: ["watering schedule", "summer lawn care", "Wisconsin irrigation", "Madison watering tips"], seasons: ["summer"] },
    { title: "How to keep your lawn green in July heat", category: "seasonal-tips", keywords: ["summer lawn green", "heat stress lawn", "July lawn care", "Wisconsin summer lawn"], seasons: ["summer"] },
    { title: "Best mowing height for summer in Madison WI", category: "seasonal-tips", keywords: ["mowing height", "summer mowing", "Madison lawn mowing", "grass height Wisconsin"], seasons: ["summer"] },
    { title: "Preventing brown patches in Wisconsin summers", category: "seasonal-tips", keywords: ["brown patch disease", "lawn disease", "summer lawn problems", "Wisconsin lawn fungus"], seasons: ["summer"] },
  );
  // Fall
  topics.push(
    { title: "Complete fall yard checklist for Madison homeowners", category: "seasonal-tips", keywords: ["fall yard checklist", "fall cleanup", "Madison fall lawn care", "autumn yard maintenance"], seasons: ["fall"] },
    { title: "When to do your last mow in Wisconsin", category: "seasonal-tips", keywords: ["last mow season", "fall mowing", "Wisconsin mowing end", "final lawn cut"], seasons: ["fall"] },
    { title: "Gutter cleaning before winter in Madison WI", category: "seasonal-tips", keywords: ["gutter cleaning fall", "winter gutter prep", "Madison gutter cleaning", "fall gutter maintenance"], seasons: ["fall"] },
    { title: "Fall fertilization timing for Dane County lawns", category: "seasonal-tips", keywords: ["fall fertilization", "winter fertilizer", "Dane County lawn care", "autumn lawn feeding"], seasons: ["fall"] },
  );
  // Winter
  topics.push(
    { title: "Winter lawn protection tips for Madison WI", category: "seasonal-tips", keywords: ["winter lawn care", "lawn winterization", "Madison winter lawn", "Wisconsin winter protection"], seasons: ["winter"] },
    { title: "Snow removal best practices for Madison driveways", category: "seasonal-tips", keywords: ["snow removal tips", "driveway snow removal", "Madison snow plowing", "Wisconsin snow clearing"], seasons: ["winter"] },
    { title: "Preventing ice damage to your landscape in Wisconsin", category: "seasonal-tips", keywords: ["ice damage landscape", "winter landscape protection", "Wisconsin ice prevention", "salt damage lawn"], seasons: ["winter"] },
    { title: "Planning your spring lawn makeover during winter", category: "seasonal-tips", keywords: ["spring planning", "winter lawn prep", "lawn renovation plan", "Madison lawn makeover"], seasons: ["winter"] },
  );

  /* ── service-guides ── */
  topics.push(
    { title: "The complete guide to lawn aeration in Madison WI", category: "service-guides", keywords: ["lawn aeration", "core aeration", "Madison aeration", "when to aerate Wisconsin"], seasons: ["summer", "fall", "winter"] },
    { title: "Mulching 101: types, benefits, and costs in Wisconsin", category: "service-guides", keywords: ["mulching guide", "mulch types", "mulching cost", "Wisconsin mulching"], seasons: ["summer", "fall", "winter"] },
    { title: "Gutter guard installation: is it worth it for Madison homes?", category: "service-guides", keywords: ["gutter guards", "gutter guard cost", "Madison gutter guards", "gutter protection"], seasons: ["summer", "fall", "winter"] },
    { title: "Professional vs DIY weed control in Dane County", category: "service-guides", keywords: ["weed control", "DIY weed control", "professional herbicide", "Dane County weed removal"], seasons: ["summer", "fall", "winter"] },
    { title: "Spring cleanup services: what's included and why it matters", category: "service-guides", keywords: ["spring cleanup", "yard cleanup services", "spring yard work", "Madison spring cleanup"], seasons: ["summer", "fall", "winter"] },
    { title: "Fall leaf removal: timing, methods, and Madison-specific tips", category: "service-guides", keywords: ["leaf removal", "fall leaf cleanup", "Madison leaf removal", "leaf removal timing"], seasons: ["summer", "fall", "winter"] },
    { title: "Professional pruning: when and how to trim shrubs in Wisconsin", category: "service-guides", keywords: ["shrub pruning", "tree trimming", "Wisconsin pruning timing", "professional pruning"], seasons: ["summer", "fall", "winter"] },
    { title: "Garden bed maintenance: a seasonal guide for Madison WI", category: "service-guides", keywords: ["garden bed maintenance", "seasonal garden care", "Madison garden beds", "flower bed upkeep"], seasons: ["summer", "fall", "winter"] },
    { title: "Snow plowing vs shoveling: choosing the right service", category: "service-guides", keywords: ["snow plowing", "snow shoveling", "snow removal service", "Madison snow plowing cost"], seasons: ["winter", "fall"] },
    { title: "Fertilization programs: what Madison lawns actually need", category: "service-guides", keywords: ["lawn fertilization", "fertilizer program", "Madison lawn feeding", "Wisconsin fertilization schedule"], seasons: ["summer", "fall", "winter"] },
  );

  /* ── local-guides (12 cities) ── */
  for (const city of SERVICE_AREAS) {
    topics.push({
      title: `Lawn care tips specific to ${city} WI neighborhoods`,
      category: "local-guides",
      keywords: [`${city} lawn care`, `${city} WI yard maintenance`, `lawn care ${city} Wisconsin`, `${city} landscaping`],
      seasons: ["summer", "fall", "winter"],
    });
    topics.push({
      title: `Best yard maintenance schedule for ${city} Wisconsin`,
      category: "local-guides",
      keywords: [`${city} yard maintenance`, `${city} lawn schedule`, `yard care ${city} WI`, `${city} seasonal yard work`],
      seasons: ["summer", "fall", "winter"],
    });
  }

  /* ── how-to ── */
  topics.push(
    { title: "How to fix bare spots in your Madison lawn", category: "how-to", keywords: ["fix bare spots lawn", "lawn repair Madison", "grass seed bare spots", "lawn patch repair"], seasons: ["summer", "fall", "winter"] },
    { title: "DIY soil testing guide for Wisconsin homeowners", category: "how-to", keywords: ["soil testing", "lawn soil test", "Wisconsin soil pH", "DIY soil test kit"], seasons: ["summer", "fall", "winter"] },
    { title: "How to sharpen mower blades for a cleaner cut", category: "how-to", keywords: ["sharpen mower blades", "lawn mower maintenance", "clean lawn cut", "mower blade sharpening"], seasons: ["summer"] },
    { title: "How to identify common Wisconsin lawn diseases", category: "how-to", keywords: ["lawn diseases Wisconsin", "lawn fungus identification", "brown patch grass", "lawn disease treatment"], seasons: ["summer", "fall"] },
    { title: "How to prepare your irrigation system for winter", category: "how-to", keywords: ["winterize irrigation", "sprinkler system winterization", "blow out sprinklers", "Wisconsin irrigation prep"], seasons: ["fall", "winter"] },
    { title: "How to choose the right grass seed for Madison WI", category: "how-to", keywords: ["grass seed Madison", "best grass Wisconsin", "cool season grass", "lawn seed selection"], seasons: ["summer", "fall", "winter"] },
  );

  /* ── faq-answers ── */
  topics.push(
    { title: "How often should you mow your lawn in Madison?", category: "faq-answers", keywords: ["mowing frequency", "how often mow lawn", "Madison mowing schedule", "lawn mowing weekly"], seasons: ["summer", "fall", "winter"] },
    { title: "What is the best time to fertilize in Wisconsin?", category: "faq-answers", keywords: ["best time fertilize", "Wisconsin fertilization timing", "when to fertilize lawn", "spring vs fall fertilizer"], seasons: ["summer", "fall", "winter"] },
    { title: "How much does professional lawn care cost in Madison?", category: "faq-answers", keywords: ["lawn care cost Madison", "professional lawn care price", "lawn mowing cost Wisconsin", "yard maintenance pricing"], seasons: ["summer", "fall", "winter"] },
    { title: "When should you clean your gutters in Wisconsin?", category: "faq-answers", keywords: ["gutter cleaning timing", "when clean gutters", "Wisconsin gutter cleaning", "gutter cleaning schedule"], seasons: ["summer", "fall", "winter"] },
    { title: "Is fall cleanup really necessary for Madison homes?", category: "faq-answers", keywords: ["fall cleanup necessary", "fall yard cleanup importance", "Madison fall cleanup", "leaves on lawn damage"], seasons: ["fall", "winter"] },
    { title: "How to choose a reliable lawn care company in Dane County", category: "faq-answers", keywords: ["choose lawn care company", "best lawn care Madison", "Dane County lawn service", "lawn care company reviews"], seasons: ["summer", "fall", "winter"] },
  );

  return topics;
}

/* ─── Slug helper ─── */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* ─── Strip HTML for word count ─── */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

/* ─── Parse JSON from Claude response (handles code fences) ─── */
function parseClaudeJson(text: string): Record<string, unknown> | null {
  // Try direct parse first
  try {
    return JSON.parse(text);
  } catch {
    // noop
  }
  // Try extracting from code fences
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    try {
      return JSON.parse(fenceMatch[1].trim());
    } catch {
      // noop
    }
  }
  // Try finding first { to last }
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    try {
      return JSON.parse(text.slice(firstBrace, lastBrace + 1));
    } catch {
      // noop
    }
  }
  return null;
}

/* ─── Main handler ─── */
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    await supabase.from("automation_runs").insert({
      cron_name: "blog-generator",
      status: "error",
      details: { error: "ANTHROPIC_API_KEY not configured" },
    });
    return NextResponse.json({ success: false, error: "ANTHROPIC_API_KEY not set" }, { status: 500 });
  }

  try {
    /* ── 1. Check existing posts ── */
    const { data: existingPosts } = await supabase
      .from("blog_posts")
      .select("slug, category");

    const existingSlugs = new Set((existingPosts ?? []).map((p: { slug: string }) => p.slug));
    const existingCategories = (existingPosts ?? []).map((p: { category: string }) => p.category);

    // Count posts per category
    const categoryCounts: Record<string, number> = {};
    for (const cat of existingCategories) {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    }

    /* ── 2. Pick a topic ── */
    const season = getCurrentSeason();
    const allTopics = buildTopicBank();

    // Filter out already-published slugs
    const availableTopics = allTopics.filter((t) => {
      const slug = slugify(t.title);
      return !existingSlugs.has(slug);
    });

    if (availableTopics.length === 0) {
      await supabase.from("automation_runs").insert({
        cron_name: "blog-generator",
        status: "skipped",
        details: { reason: "All topics already published", totalTopics: allTopics.length },
      });
      return NextResponse.json({ success: true, message: "All topics already published — nothing to generate" });
    }

    // Prioritize current season topics
    const seasonalTopics = availableTopics.filter((t) => t.seasons.includes(season));
    const pool = seasonalTopics.length > 0 ? seasonalTopics : availableTopics;

    // Pick from least-covered category
    const categoryBuckets: Record<string, Topic[]> = {};
    for (const t of pool) {
      if (!categoryBuckets[t.category]) categoryBuckets[t.category] = [];
      categoryBuckets[t.category].push(t);
    }

    let minCount = Infinity;
    let bestCategory = "";
    for (const cat of Object.keys(categoryBuckets)) {
      const count = categoryCounts[cat] || 0;
      if (count < minCount) {
        minCount = count;
        bestCategory = cat;
      }
    }

    const candidates = categoryBuckets[bestCategory] || pool;
    // Pick a random topic from candidates for variety
    const topic = candidates[Math.floor(Math.random() * candidates.length)];

    /* ── 3. Generate article via Claude ── */
    const systemPrompt = `You are a professional blog writer for TotalGuard Yard Care, a lawn care and landscaping company in Madison, Wisconsin. You write helpful, engaging, SEO-optimized blog posts that position TotalGuard as the trusted local expert.

WRITING RULES:
- Write 1200-1500 words
- Use HTML tags for formatting: <h2>, <h3>, <p>, <ul>, <li>, <blockquote>, <strong>, <em>
- Start with a compelling intro paragraph (no H1 — the title is rendered separately)
- Use numbered H2 sections (e.g., <h2>1. Section title</h2>) for main points
- Include a <blockquote> callout box with a useful tip or interesting fact
- Always mention Madison, Wisconsin, Dane County, or specific local details
- Reference specific TotalGuard services with links: <a href="/services/mowing">lawn mowing</a>, <a href="/services/gutter-cleaning">gutter cleaning</a>, etc.
- Include seasonal timing specific to Wisconsin climate
- End with a section titled "Need professional help?" that mentions TotalGuard
- Tone: Professional but approachable, knowledgeable but not condescending
- Reading level: 8th grade accessible
- DO NOT include an H1 tag — the title is rendered separately by the template
- DO NOT include any meta tags or frontmatter — just the article HTML body

TOTALGUARD SERVICES (for internal links):
- /services/mowing — Lawn Mowing
- /services/fertilization — Fertilization
- /services/aeration — Aeration
- /services/herbicide — Weed Control
- /services/mulching — Mulching
- /services/garden-beds — Garden Beds
- /services/weeding — Weeding
- /services/pruning — Pruning
- /services/spring-cleanup — Spring Cleanup
- /services/fall-cleanup — Fall Cleanup
- /services/leaf-removal — Leaf Removal
- /services/snow-removal — Snow Removal
- /services/gutter-cleaning — Gutter Cleaning
- /services/gutter-guards — Gutter Guards
- /contact — Get a Free Quote

SERVICE AREAS: Madison, Middleton, Waunakee, Monona, Sun Prairie, Fitchburg, Verona, McFarland, Cottage Grove, DeForest, Oregon, Stoughton`;

    const userPrompt = `Write a blog post about: ${topic.title}

Category: ${topic.category}
Target keywords: ${topic.keywords.join(", ")}
Current season: ${season}
Current month: ${getMonthName()}

Return a JSON object with these exact fields:
{
  "title": "SEO-optimized title with Madison WI (under 65 characters)",
  "slug": "url-friendly-slug",
  "excerpt": "1-2 sentence teaser for blog cards and social sharing (under 160 chars)",
  "content": "full HTML article body",
  "meta_title": "SEO title for browser tab (can differ from display title, under 60 chars)",
  "meta_description": "SEO meta description (under 155 chars)",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}`;

    const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!claudeRes.ok) {
      const errText = await claudeRes.text();
      throw new Error(`Claude API error ${claudeRes.status}: ${errText}`);
    }

    const claudeData = await claudeRes.json();
    const rawText = claudeData.content
      ?.filter((b: { type: string }) => b.type === "text")
      .map((b: { text: string }) => b.text)
      .join("") ?? "";

    /* ── 4. Parse response ── */
    const parsed = parseClaudeJson(rawText);
    if (!parsed || !parsed.title || !parsed.content) {
      throw new Error("Failed to parse valid JSON from Claude response");
    }

    const title = String(parsed.title);
    let slug = parsed.slug ? String(parsed.slug) : slugify(title);
    const excerpt = String(parsed.excerpt || "");
    const content = String(parsed.content);
    const metaTitle = String(parsed.meta_title || title);
    const metaDescription = String(parsed.meta_description || excerpt);
    const keywords = Array.isArray(parsed.keywords) ? parsed.keywords.map(String) : topic.keywords;

    // If slug already exists, append random suffix
    if (existingSlugs.has(slug)) {
      slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
    }

    // Calculate reading time and validate minimum content length
    const plainText = stripHtml(content);
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;
    const readingTime = Math.ceil(wordCount / 200);

    // Reject thin content that would trigger Soft 404 in Google Search Console
    if (wordCount < 800) {
      throw new Error(`Generated content too thin (${wordCount} words, minimum 800). Skipping publish.`);
    }

    /* ── 5. Save to Supabase ── */
    const { error: insertError } = await supabase.from("blog_posts").insert({
      title,
      slug,
      excerpt,
      content,
      meta_title: metaTitle,
      meta_description: metaDescription,
      keywords,
      category: topic.category,
      reading_time: readingTime,
      status: "published",
      published_at: new Date().toISOString(),
      author: "TotalGuard Yard Care",
    });

    if (insertError) {
      throw new Error(`Supabase insert error: ${insertError.message}`);
    }

    /* ── 6. Ping IndexNow ── */
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tgyardcare.com";
    try {
      await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: "tgyardcare.com",
          key: process.env.INDEXNOW_KEY || "tgyardcare-indexnow-key",
          urlList: [`${siteUrl}/blog/${slug}`],
        }),
      });
    } catch {
      // IndexNow ping is best-effort, don't fail the cron
    }

    /* ── 7. Log to automation_runs ── */
    await supabase.from("automation_runs").insert({
      cron_name: "blog-generator",
      status: "success",
      details: { title, slug, category: topic.category, wordCount, readingTime },
    });

    /* ── 8. Return response ── */
    return NextResponse.json({
      success: true,
      post: { title, slug, category: topic.category },
      message: `Published: ${title}`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);

    try {
      await supabase.from("automation_runs").insert({
        cron_name: "blog-generator",
        status: "error",
        details: { error: message },
      });
    } catch {
      // best-effort logging
    }

    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
