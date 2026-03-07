'use client';

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertTriangle, XCircle, RefreshCw, ExternalLink } from "lucide-react";

type CheckStatus = "pass" | "warn" | "fail" | "pending";
interface Check { label: string; status: CheckStatus; detail: string; }

const DEFAULT_CHECKS: Check[] = [
  { label: "Sitemap integrity",       status: "pending", detail: "Click 'Run Checks' to verify" },
  { label: "Broken pages (404s)",     status: "pending", detail: "Click 'Run Checks' to verify" },
  { label: "robots.txt valid",        status: "pending", detail: "Click 'Run Checks' to verify" },
  { label: "Core Web Vitals",         status: "pending", detail: "Check Vercel Analytics dashboard" },
];

export default function SiteHealthPanel() {
  const [checks, setChecks] = useState<Check[]>(DEFAULT_CHECKS);
  const [running, setRunning] = useState(false);

  const runChecks = async () => {
    setRunning(true);
    const results: Check[] = [...checks];

    // Robots
    try {
      const r = await fetch("/api/cron/robots-guard", { headers: { authorization: "Bearer dev" } });
      const d: { valid: boolean; issues?: string[] } = await r.json();
      results[2] = { label: "robots.txt valid", status: d.valid ? "pass" : "warn", detail: d.valid ? "Valid: /admin blocked, sitemap present" : (d.issues?.join("; ") ?? "Issues found") };
    } catch (e) { results[2] = { label: "robots.txt valid", status: "fail", detail: String(e) }; }

    // Sitemap
    try {
      const r = await fetch("/api/cron/sitemap-check", { headers: { authorization: "Bearer dev" } });
      const d: { broken: number; checked: number } = await r.json();
      results[0] = { label: "Sitemap integrity", status: d.broken === 0 ? "pass" : "warn", detail: d.broken === 0 ? `All ${d.checked} sitemap URLs return 200` : `${d.broken} broken URLs found` };
      results[1] = { label: "Broken pages (404s)", status: d.broken === 0 ? "pass" : "warn", detail: d.broken === 0 ? "No broken pages detected" : `${d.broken} pages returning non-200` };
    } catch (e) { results[0] = { label: "Sitemap integrity", status: "fail", detail: String(e) }; }

    setChecks(results);
    setRunning(false);
  };

  const icon = (s: CheckStatus) =>
    s === "pass" ? <CheckCircle  className="h-5 w-5 text-green-400" /> :
    s === "warn" ? <AlertTriangle className="h-5 w-5 text-yellow-400" /> :
    s === "fail" ? <XCircle      className="h-5 w-5 text-red-400"   /> :
    <div className="h-5 w-5 rounded-full bg-white/10" />;

  const card = { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"12px" };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Site Health</h1>
          <p className="text-sm text-white/40 mt-1">Sitemap, robots.txt, broken pages, Core Web Vitals</p>
        </div>
        <button onClick={runChecks} disabled={running}
          className={cn("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-black disabled:opacity-50")}
          style={{ background: "#22c55e" }}>
          <RefreshCw className={cn("h-4 w-4", running && "animate-spin")} />
          {running ? "Checking..." : "Run Checks"}
        </button>
      </div>

      <div style={card}>
        {checks.map((c, i) => (
          <div key={c.label} className="flex items-center gap-4 p-4"
            style={i < checks.length - 1 ? { borderBottom:"1px solid rgba(255,255,255,0.06)" } : {}}>
            {icon(c.status)}
            <div className="flex-1">
              <p className="text-sm font-medium text-white/80">{c.label}</p>
              <p className="text-xs text-white/40">{c.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={card} className="p-4">
        <h2 className="text-sm font-semibold text-white mb-2">Core Web Vitals</h2>
        <p className="text-xs text-white/40 mb-3">LCP, CLS, and FID metrics from real users. Check Vercel Analytics.</p>
        <a href="https://vercel.com/ashtonkferry-create/tgyardcare/analytics" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-green-400 hover:text-green-300">
          Open Vercel Analytics <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
