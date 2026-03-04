import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tgyardcare.com";
  const res = await fetch(`${base}/api/admin/seo-audit`, {
    headers: {
      authorization: req.headers.get("authorization") ?? "",
      "x-admin-token": process.env.CRON_SECRET ?? "",
    },
  });
  return NextResponse.json(await res.json());
}
