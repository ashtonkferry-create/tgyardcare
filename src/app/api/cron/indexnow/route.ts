import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = "https://tgyardcare.com";

const KEY_PAGES = [
  "/", "/services", "/residential", "/commercial", "/about", "/contact",
  "/reviews", "/gallery", "/faq", "/get-quote", "/service-areas", "/careers",
  "/services/mowing", "/services/fertilization", "/services/gutter-cleaning",
  "/services/gutter-guards", "/services/leaf-removal", "/services/fall-cleanup",
  "/services/spring-cleanup", "/services/snow-removal", "/services/mulching",
  "/services/pruning", "/services/weeding", "/services/herbicide",
  "/services/garden-beds", "/services/aeration",
  "/locations/madison", "/locations/middleton", "/locations/fitchburg",
  "/locations/verona", "/locations/sun-prairie", "/locations/waunakee",
  "/locations/deforest", "/locations/monona", "/locations/mcfarland",
  "/locations/oregon", "/locations/stoughton", "/locations/cottage-grove",
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

  const key = process.env.INDEXNOW_KEY || "tgyardcare-indexnow-key";
  const urlList = KEY_PAGES.map((p) => `${SITE_URL}${p}`);

  let submitted = 0;
  let error: string | null = null;

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: "tgyardcare.com",
        key,
        keyLocation: `${SITE_URL}/${key}.txt`,
        urlList,
      }),
    });

    if (res.ok || res.status === 200 || res.status === 202) {
      submitted = urlList.length;
    } else {
      error = `IndexNow returned ${res.status}: ${await res.text()}`;
    }
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  await supabase.from("automation_runs").insert({
    automation_slug: "indexnow-submitter",
    status: error ? "error" : "success",
    result_summary: error ?? `Submitted ${submitted} URLs to IndexNow`,
    completed_at: new Date().toISOString(),
    pages_affected: submitted,
  });

  if (error) {
    return NextResponse.json({ success: false, error });
  }

  return NextResponse.json({ success: true, submitted });
}
