'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import {
  TrendingUp, Users, Leaf, FileText,
  AlertTriangle, CheckCircle, Clock, ArrowRight,
} from "lucide-react";

interface StatTile {
  label: string;
  value: string | number;
  sub: string;
  icon: React.ElementType;
  color: string;
}

interface SeoIssue {
  path: string;
  issue: string;
  severity: "critical" | "warning";
}

interface Lead {
  name: string;
  created_at: string;
  message: string;
}

export default function CommandCenter() {
  const router = useRouter();
  const [seoScore, setSeoScore] = useState<number | null>(null);
  const [leadCount, setLeadCount] = useState<number | null>(null);
  const [activeSeason, setActiveSeason] = useState<string>("");
  const [topIssues, setTopIssues] = useState<SeoIssue[]>([]);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [pageScores, setPageScores] = useState<Array<{
    path: string; seo_score: number; audit_issues: Array<{type:string;severity:string}>;
  }>>([]);
  const [pageCount, setPageCount] = useState<number>(76);

  useEffect(() => {
    // Fetch SEO average score
    supabase.from("page_seo").select("seo_score").then(({ data, error }) => {
      if (error) { console.error("SEO score fetch failed:", error.message); setSeoScore(0); return; }
      if (!data?.length) { setSeoScore(0); return; }
      const avg = Math.round(data.reduce((a, b) => a + (b.seo_score ?? 0), 0) / data.length);
      setSeoScore(avg);
    });

    // Fetch lead count (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    supabase.from("contact_submissions").select("id", { count: "exact" })
      .gte("created_at", thirtyDaysAgo)
      .then(({ count, error }) => {
        if (error) { console.error("Lead count fetch failed:", error.message); setLeadCount(0); return; }
        setLeadCount(count ?? 0);
      });

    // Fetch active season
    supabase.from("season_override").select("active_override").single()
      .then(({ data, error }) => {
        if (error && error.code !== "PGRST116") { console.error("Season override fetch failed:", error.message); }
        const override = data?.active_override ?? "auto";
        if (override !== "auto") { setActiveSeason(`${override} (Override)`); return; }
        const month = new Date().getMonth() + 1;
        const day = new Date().getDate();
        const mmdd = month * 100 + day;
        let s = "Summer";
        if (mmdd >= 1115 || mmdd <= 314) s = "Winter";
        else if (mmdd >= 915 && mmdd <= 1114) s = "Fall";
        // Mar 15 - May 14 and May 15 - Sep 14 both = Summer
        setActiveSeason(`${s} (Auto)`);
      });

    // Fetch top SEO issues
    supabase.from("page_seo").select("path, audit_issues, seo_score")
      .order("seo_score", { ascending: true }).limit(10)
      .then(({ data, error }) => {
        if (error) { console.error("SEO issues fetch failed:", error.message); return; }
        if (!data) return;
        const issues: SeoIssue[] = [];
        for (const row of data) {
          const rowIssues = (row.audit_issues as Array<{type:string;severity:string}>) ?? [];
          for (const issue of rowIssues.slice(0, 2)) {
            if (issues.length >= 5) break;
            issues.push({
              path: row.path,
              issue: issue.type,
              severity: issue.severity === "critical" ? "critical" : "warning",
            });
          }
          if (issues.length >= 5) break;
        }
        setTopIssues(issues);
      });

    // Fetch recent leads
    supabase.from("contact_submissions").select("name, created_at, message")
      .order("created_at", { ascending: false }).limit(5)
      .then(({ data, error }) => {
        if (error) { console.error("Recent leads fetch failed:", error.message); return; }
        setRecentLeads((data as Lead[]) ?? []);
      });

    // Fetch page scores table
    supabase.from("page_seo").select("path, seo_score, audit_issues")
      .order("seo_score", { ascending: false }).limit(10)
      .then(({ data, error }) => {
        if (error) { console.error("Page scores fetch failed:", error.message); return; }
        setPageScores(data ?? []);
      });

    // Fetch dynamic page count
    supabase.from("page_seo").select("path", { count: "exact", head: true })
      .then(({ count, error }) => {
        if (!error && count !== null) setPageCount(count);
      });
  }, []);

  const stats: StatTile[] = [
    {
      label: "Site Health Score",
      value: seoScore !== null ? `${seoScore}/100` : "–",
      sub: "Average across all pages",
      icon: TrendingUp,
      color: seoScore !== null && seoScore >= 75 ? "#22c55e" : seoScore !== null && seoScore >= 50 ? "#f59e0b" : "#ef4444",
    },
    {
      label: "Leads (30d)",
      value: leadCount !== null ? leadCount : "–",
      sub: "Contact form submissions",
      icon: Users,
      color: "#22c55e",
    },
    {
      label: "Active Season",
      value: activeSeason || "–",
      sub: "Controls site content & CTAs",
      icon: Leaf,
      color: activeSeason.includes("Winter") ? "#60a5fa" : activeSeason.includes("Summer") ? "#fbbf24" : "#22c55e",
    },
    {
      label: "Pages Indexed",
      value: pageCount,
      sub: "Tracked in page_seo",
      icon: FileText,
      color: "#22c55e",
    },
  ];

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const h = Math.floor(diff / 3600000);
    if (h < 1) return `${Math.floor(diff / 60000)}m ago`;
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Command Center</h1>
        <p className="text-sm text-white/40 mt-1">TotalGuard Yard Care: Admin Overview</p>
      </div>

      {/* Row 1: Stat Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((tile) => (
          <div key={tile.label} style={cardStyle} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg" style={{ background: `${tile.color}20` }}>
                <tile.icon className="h-4 w-4" style={{ color: tile.color }} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{tile.value}</div>
            <div className="text-xs font-medium text-white/70 mb-0.5">{tile.label}</div>
            <div className="text-xs text-white/35">{tile.sub}</div>
          </div>
        ))}
      </div>

      {/* Row 2: SEO Issues + Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top SEO Issues */}
        <div style={cardStyle} className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Top SEO Issues</h2>
            <button
              onClick={() => router.push("/admin/seo")}
              className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1"
            >
              View All <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          {topIssues.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-white/30">
              <CheckCircle className="h-8 w-8 mb-2 text-green-500/40" />
              <p className="text-sm">Run SEO audit to see issues</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {topIssues.map((issue) => (
                <li key={issue.path + issue.issue} className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0">
                    {issue.severity === "critical"
                      ? <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                      : <AlertTriangle className="h-3.5 w-3.5 text-yellow-400" />
                    }
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-white/70 truncate">{issue.path}</p>
                    <p className="text-xs text-white/40">{issue.issue}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Leads */}
        <div style={cardStyle} className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Recent Leads</h2>
            <button
              onClick={() => router.push("/admin/leads")}
              className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1"
            >
              View All <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          {recentLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-white/30">
              <Users className="h-8 w-8 mb-2 text-white/10" />
              <p className="text-sm">No recent leads</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {recentLeads.map((lead) => (
                <li key={lead.created_at + lead.name} className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white/80 truncate">{lead.name}</p>
                    <p className="text-xs text-white/40 truncate">{lead.message?.slice(0, 60)}</p>
                  </div>
                  <span className="text-xs text-white/30 shrink-0 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {timeAgo(lead.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Row 3: Season Control + Schema Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div style={cardStyle} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white">Season Control</h2>
            <button
              onClick={() => router.push("/admin/seasons")}
              className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1"
            >
              Configure <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <p className="text-2xl font-bold text-white">{activeSeason || "–"}</p>
          <p className="text-xs text-white/40 mt-1">Auto-switches on Sep 15 (Fall) and Nov 15 (Winter)</p>
        </div>

        <div style={cardStyle} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white">Schema Health</h2>
            <button
              onClick={() => router.push("/admin/schema")}
              className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1"
            >
              Fix Issues <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <p className="text-xs text-white/40 mt-1">Run schema validator to see coverage</p>
        </div>
      </div>

      {/* Row 4: Page SEO Score Table */}
      <div style={cardStyle} className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">Page SEO Scores</h2>
          <button
            onClick={() => router.push("/admin/seo")}
            className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1"
          >
            View All {pageCount} Pages <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        {pageScores.length === 0 ? (
          <p className="text-sm text-white/30 py-4 text-center">Run SEO audit to populate scores</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <th className="text-left py-2 pr-4 text-white/40 font-medium">Page</th>
                  <th className="text-left py-2 pr-4 text-white/40 font-medium">Score</th>
                  <th className="text-left py-2 text-white/40 font-medium">Issues</th>
                </tr>
              </thead>
              <tbody>
                {pageScores.map((row, i) => {
                  const issues = (row.audit_issues as Array<{severity:string}>) ?? [];
                  const critCount = issues.filter(x => x.severity === "critical").length;
                  const warnCount = issues.filter(x => x.severity === "warning").length;
                  const scoreColor = row.seo_score >= 75 ? "#22c55e" : row.seo_score >= 50 ? "#f59e0b" : "#ef4444";
                  return (
                    <tr
                      key={i}
                      className="border-b"
                      style={{ borderColor: "rgba(255,255,255,0.04)" }}
                    >
                      <td className="py-2 pr-4 text-white/60 truncate max-w-[200px]">{row.path}</td>
                      <td className="py-2 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 rounded-full bg-white/10">
                            <div
                              className="h-1.5 rounded-full"
                              style={{ width: `${row.seo_score}%`, background: scoreColor }}
                            />
                          </div>
                          <span style={{ color: scoreColor }}>{row.seo_score}</span>
                        </div>
                      </td>
                      <td className="py-2">
                        {critCount > 0 && <span className="text-red-400 mr-2">{critCount} crit</span>}
                        {warnCount > 0 && <span className="text-yellow-400">{warnCount} warn</span>}
                        {critCount === 0 && warnCount === 0 && <span className="text-green-400">OK</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
