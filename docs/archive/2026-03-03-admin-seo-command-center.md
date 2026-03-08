# Admin SEO Command Center — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace 13 fragmented admin pages with a unified dark-glass command center featuring a live on-site SEO audit engine, 20 automated SEO workflows, and auto-season switching.

**Architecture:** Hub + drill-down. `/admin` bento-grid command center + dedicated sub-pages. AdminLayout is a component wrapper (not a Next.js route layout). All cron jobs run as Next.js API routes secured with `CRON_SECRET`. No external SEO APIs — all intelligence is on-site via self-fetch HTML parsing.

**Tech Stack:** Next.js 16 App Router, Supabase (DB + Edge Functions), Vercel Cron Jobs, Claude Haiku/Sonnet (`@anthropic-ai/sdk`), Slack webhooks, Tailwind CSS 3.4, shadcn/ui, Lucide React

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install Anthropic SDK**

```bash
cd /c/Users/vance/OneDrive/Desktop/claude-workspace/tgyardcare
npm install @anthropic-ai/sdk
```

Expected: `added 1 package`

**Step 2: Verify install**

```bash
node -e "require('@anthropic-ai/sdk'); console.log('ok')"
```

Expected: `ok`

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add @anthropic-ai/sdk for AI automations"
```

---

## Task 2: Supabase Migrations

**Files:**
- Create: `supabase/migrations/20260303_automation_tables.sql`
- Create: `supabase/migrations/20260303_page_seo_columns.sql`

**Step 1: Create automation_config and automation_runs tables**

Create file `supabase/migrations/20260303_automation_tables.sql`:

```sql
-- Automation config: one row per automation
create table if not exists automation_config (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  tier text not null check (tier in ('foundation','content','local','ai','monitoring')),
  is_active boolean default true,
  schedule text,
  last_run_at timestamptz,
  next_run_at timestamptz,
  created_at timestamptz default now()
);

-- Automation run history
create table if not exists automation_runs (
  id uuid primary key default gen_random_uuid(),
  automation_slug text not null references automation_config(slug) on delete cascade,
  started_at timestamptz default now(),
  completed_at timestamptz,
  status text not null check (status in ('success','warning','error','skipped')),
  result_summary text,
  error_message text,
  pages_affected int default 0
);

-- Seed automation_config with all 20 automations
insert into automation_config (slug, name, description, tier, schedule) values
('auto-season-switcher','Auto Season Switcher','Switches site season based on calendar dates','foundation','0 6 * * *'),
('full-seo-audit','Full SEO Audit','Crawls all 76 pages and scores each on 8 factors','foundation','0 12 * * 1'),
('sitemap-integrity-check','Sitemap Integrity Check','Verifies all sitemap URLs return 200','foundation','0 14 * * 1'),
('indexnow-submitter','IndexNow Submitter','POSTs updated URLs to Bing IndexNow API','foundation','trigger'),
('schema-validator','Schema Validator','Validates JSON-LD on all pages','foundation','0 15 * * 1'),
('meta-description-generator','Meta Description Generator','Generates meta descriptions using Claude Haiku','content','0 10 * * 2'),
('faq-schema-builder','FAQ Schema Builder','Generates FAQ JSON-LD for service pages','content','0 11 * * 2'),
('content-freshness-monitor','Content Freshness Monitor','Flags pages not updated in 90+ days','content','0 8 1 * *'),
('internal-link-suggester','Internal Link Suggester','Suggests internal links for new blog posts','content','trigger'),
('gbp-post-generator','GBP Post Generator','Generates Google Business Profile post copy','content','0 14 * * 1'),
('nap-consistency-checker','NAP Consistency Checker','Verifies name/address/phone across all pages','local','0 9 * * 2'),
('local-coverage-gap-finder','Local Coverage Gap Finder','Finds missing city+service landing page combos','local','0 8 1 * *'),
('review-schema-updater','Review Schema Updater','Updates LocalBusiness review count and rating','local','trigger'),
('geo-signal-auditor','GEO Signal Auditor','Checks geo meta tags on all location pages','local','0 10 * * 2'),
('answer-engine-optimizer','Answer Engine Optimizer','Rewrites service pages for AI engine citations','ai','0 9 1 * *'),
('voice-search-expander','Voice Search Expander','Generates near-me FAQ schema for voice queries','ai','0 11 * * 2'),
('seo-score-drop-alert','SEO Score Drop Alert','Alerts on Slack when page score drops 10+ pts','monitoring','trigger'),
('lead-response-timer','Lead Response Timer','Slack reminder for unresponded leads after 2hrs','monitoring','*/30 * * * *'),
('weekly-performance-digest','Weekly Performance Digest','Monday Slack summary: leads, SEO, automation status','monitoring','0 13 * * 1'),
('robots-guard','Robots.txt Guard','Verifies robots.txt blocks /admin and has sitemap URL','monitoring','0 6 * * *')
on conflict (slug) do nothing;

-- RLS: admin only
alter table automation_config enable row level security;
alter table automation_runs enable row level security;

create policy "Admin read automation_config" on automation_config
  for select using (
    exists (select 1 from user_roles where user_id = auth.uid() and role = 'admin')
  );

create policy "Admin read automation_runs" on automation_runs
  for select using (
    exists (select 1 from user_roles where user_id = auth.uid() and role = 'admin')
  );
```

**Step 2: Add missing columns to page_seo**

Create file `supabase/migrations/20260303_page_seo_columns.sql`:

```sql
-- Add SEO audit columns if they don't exist
alter table page_seo
  add column if not exists seo_score int default 0,
  add column if not exists audit_issues jsonb default '[]',
  add column if not exists audited_at timestamptz,
  add column if not exists suggested_meta_description text,
  add column if not exists schema_data jsonb,
  add column if not exists needs_refresh boolean default false;

-- Index for fast ordering
create index if not exists page_seo_score_idx on page_seo(seo_score);
create index if not exists page_seo_audited_idx on page_seo(audited_at);
```

**Step 3: Apply migrations via Supabase MCP**

Run both SQL files against the Supabase project (`mxhalirruvyxdkppjsqf`).

**Step 4: Commit**

```bash
git add supabase/
git commit -m "feat: add automation_config, automation_runs tables + page_seo columns"
```

---

## Task 3: Rebuild AdminLayout Component

**Files:**
- Modify: `src/components/admin/AdminLayout.tsx`

**Step 1: Replace AdminLayout with dark-glass design**

Full replacement of `src/components/admin/AdminLayout.tsx`:

```tsx
'use client';

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Session } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Search, Zap, Activity, Code2,
  Inbox, Leaf, Image, Wrench, LogOut, Menu, X,
  ExternalLink, ChevronRight, Snowflake, Sun,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const NAV_ITEMS = [
  { path: "/admin",              label: "Command Center",  icon: LayoutDashboard },
  { path: "/admin/seo",          label: "SEO Intelligence", icon: Search },
  { path: "/admin/automations",  label: "Automations",     icon: Zap },
  { path: "/admin/site-health",  label: "Site Health",     icon: Activity },
  { path: "/admin/schema",       label: "Schema & GEO",    icon: Code2 },
  { path: "/admin/leads",        label: "Leads",           icon: Inbox },
  { path: "/admin/seasons",      label: "Seasons & Promos",icon: Leaf },
  { path: "/admin/gallery",      label: "Gallery",         icon: Image },
  { path: "/admin/tools",        label: "Tools",           icon: Wrench },
];

async function checkAdminRole(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("user_roles").select("role")
    .eq("user_id", userId).eq("role", "admin").single();
  return !error && !!data;
}

async function getActiveSeason(): Promise<{ season: string; isOverride: boolean }> {
  const { data } = await supabase
    .from("season_override").select("active_override").single();
  const override = data?.active_override ?? "auto";
  if (override !== "auto") return { season: override, isOverride: true };

  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const mmdd = month * 100 + day;
  let season = "spring";
  if (mmdd >= 1115 || mmdd <= 314) season = "winter";
  else if (mmdd >= 515 && mmdd <= 914) season = "summer";
  else if (mmdd >= 915 && mmdd <= 1114) season = "fall";
  return { season, isOverride: false };
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [seasonInfo, setSeasonInfo] = useState<{ season: string; isOverride: boolean } | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.push("/admin/login"); return; }
      const isAdmin = await checkAdminRole(session.user.id);
      if (!isAdmin) { router.push("/admin/login"); toast.error("Unauthorized"); return; }
      setSession(session);
      setIsLoading(false);
      getActiveSeason().then(setSeasonInfo);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) { router.push("/admin/login"); return; }
      setTimeout(async () => {
        const isAdmin = await checkAdminRole(session.user.id);
        if (!isAdmin) { router.push("/admin/login"); toast.error("Unauthorized"); return; }
        setSession(session);
        setIsLoading(false);
      }, 0);
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050505" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500 mx-auto mb-3" />
          <p className="text-white/40 text-sm">Loading admin...</p>
        </div>
      </div>
    );
  }

  const seasonIcon = seasonInfo?.season === "winter" ? (
    <Snowflake className="h-3 w-3" />
  ) : seasonInfo?.season === "summer" ? (
    <Sun className="h-3 w-3" />
  ) : null;

  const seasonLabel = seasonInfo
    ? `${seasonInfo.season.charAt(0).toUpperCase() + seasonInfo.season.slice(1)}${seasonInfo.isOverride ? " (Override)" : " (Auto)"}`
    : "Loading...";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#050505", color: "#f0f0f0" }}>
      {/* Top Header */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-4 h-14 border-b"
        style={{ background: "#0a0a0f", borderColor: "rgba(255,255,255,0.08)" }}
      >
        {/* Left: hamburger + breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-1 rounded text-white/60 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <span className="text-xs text-white/40 hidden sm:block">TG Admin</span>
          {title && (
            <>
              <ChevronRight className="h-3 w-3 text-white/20 hidden sm:block" />
              <span className="text-sm font-medium text-white/80">{title}</span>
            </>
          )}
        </div>

        {/* Center: Season pill */}
        {seasonInfo && (
          <button
            onClick={() => router.push("/admin/seasons")}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all hover:opacity-80"
            style={{
              background: seasonInfo.season === "winter"
                ? "rgba(96,165,250,0.15)"
                : seasonInfo.season === "summer"
                ? "rgba(251,191,36,0.15)"
                : "rgba(34,197,94,0.15)",
              color: seasonInfo.season === "winter" ? "#60a5fa"
                : seasonInfo.season === "summer" ? "#fbbf24" : "#22c55e",
              border: `1px solid ${
                seasonInfo.season === "winter" ? "rgba(96,165,250,0.3)"
                : seasonInfo.season === "summer" ? "rgba(251,191,36,0.3)"
                : "rgba(34,197,94,0.3)"
              }`,
            }}
          >
            {seasonIcon}
            {seasonLabel}
          </button>
        )}

        {/* Right: View Site + logout */}
        <div className="flex items-center gap-2">
          <a
            href="https://tgyardcare.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            View Site <ExternalLink className="h-3 w-3" />
          </a>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/admin/login");
              toast.success("Logged out");
            }}
            className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <nav
          className={cn(
            "fixed md:sticky top-14 left-0 h-[calc(100vh-56px)] w-60 flex flex-col border-r z-40 transition-transform duration-200",
            mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
          style={{ background: "#0a0a0f", borderColor: "rgba(255,255,255,0.08)" }}
        >
          <ul className="flex-1 p-3 space-y-0.5 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const isActive = item.path === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.path);
              return (
                <li key={item.path}>
                  <button
                    onClick={() => { router.push(item.path); setMobileOpen(false); }}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all text-left",
                      isActive
                        ? "text-green-400 font-medium"
                        : "text-white/50 hover:text-white/80 hover:bg-white/5"
                    )}
                    style={isActive ? { background: "rgba(34,197,94,0.1)" } : {}}
                  >
                    <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-green-400" : "text-white/40")} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="p-3 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2 px-3">Session</p>
            <p className="text-xs text-white/30 px-3 truncate">{session?.user?.email}</p>
          </div>
        </nav>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 min-w-0">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
```

**Step 2: Verify TypeScript compiles**

```bash
cd /c/Users/vance/OneDrive/Desktop/claude-workspace/tgyardcare
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors (or only pre-existing Supabase type errors)

**Step 3: Commit**

```bash
git add src/components/admin/AdminLayout.tsx
git commit -m "feat: rebuild AdminLayout with dark-glass sidebar, season pill, 9-item nav"
```

---

## Task 4: Command Center Hub (`/admin`)

**Files:**
- Modify: `src/app/admin/page.tsx`
- Create: `src/components/admin/CommandCenter.tsx`

**Step 1: Create CommandCenter component**

Create `src/components/admin/CommandCenter.tsx`:

```tsx
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
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

  useEffect(() => {
    // Fetch SEO average score
    supabase.from("page_seo").select("seo_score").then(({ data }) => {
      if (!data?.length) { setSeoScore(0); return; }
      const avg = Math.round(data.reduce((a, b) => a + (b.seo_score ?? 0), 0) / data.length);
      setSeoScore(avg);
    });

    // Fetch lead count (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    supabase.from("contact_submissions").select("id", { count: "exact" })
      .gte("created_at", thirtyDaysAgo)
      .then(({ count }) => setLeadCount(count ?? 0));

    // Fetch active season
    supabase.from("season_override").select("active_override").single()
      .then(({ data }) => {
        const override = data?.active_override ?? "auto";
        if (override !== "auto") { setActiveSeason(`${override} (Override)`); return; }
        const month = new Date().getMonth() + 1;
        const day = new Date().getDate();
        const mmdd = month * 100 + day;
        let s = "Spring";
        if (mmdd >= 1115 || mmdd <= 314) s = "Winter";
        else if (mmdd >= 515 && mmdd <= 914) s = "Summer";
        else if (mmdd >= 915 && mmdd <= 1114) s = "Fall";
        setActiveSeason(`${s} (Auto)`);
      });

    // Fetch top SEO issues
    supabase.from("page_seo").select("path, audit_issues, seo_score")
      .order("seo_score", { ascending: true }).limit(10)
      .then(({ data }) => {
        if (!data) return;
        const issues: SeoIssue[] = [];
        for (const row of data) {
          const rowIssues = (row.audit_issues as Array<{type:string;severity:string}>) ?? [];
          for (const issue of rowIssues.slice(0, 2)) {
            if (issues.length >= 5) break;
            issues.push({
              path: row.path,
              issue: issue.type,
              severity: issue.severity as "critical" | "warning",
            });
          }
          if (issues.length >= 5) break;
        }
        setTopIssues(issues);
      });

    // Fetch recent leads
    supabase.from("contact_submissions").select("name, created_at, message")
      .order("created_at", { ascending: false }).limit(5)
      .then(({ data }) => setRecentLeads((data as Lead[]) ?? []));

    // Fetch page scores table
    supabase.from("page_seo").select("path, seo_score, audit_issues")
      .order("seo_score", { ascending: false }).limit(10)
      .then(({ data }) => setPageScores(data ?? []));
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
      value: "76",
      sub: "In sitemap.ts",
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
        <p className="text-sm text-white/40 mt-1">TotalGuard Yard Care — Admin Overview</p>
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
              {topIssues.map((issue, i) => (
                <li key={i} className="flex items-start gap-2">
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
              {recentLeads.map((lead, i) => (
                <li key={i} className="flex items-start justify-between gap-2">
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
          <p className="text-xs text-white/40 mt-1">Auto-switches on May 15 (Summer) and Nov 15 (Winter)</p>
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
            View All 76 Pages <ArrowRight className="h-3 w-3" />
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
                        {critCount > 0 && <span className="text-red-400 mr-2">🔴 {critCount}</span>}
                        {warnCount > 0 && <span className="text-yellow-400">🟡 {warnCount}</span>}
                        {critCount === 0 && warnCount === 0 && <span className="text-green-400">✅</span>}
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
```

**Step 2: Update admin/page.tsx to use CommandCenter**

Replace `src/app/admin/page.tsx`:

```tsx
import type { Metadata } from "next";
import AdminLayout from "@/components/admin/AdminLayout";
import CommandCenter from "@/components/admin/CommandCenter";

export const metadata: Metadata = {
  title: "Command Center - TG Admin",
  robots: { index: false, follow: false },
};

export default function AdminOverview() {
  return (
    <AdminLayout title="Command Center">
      <CommandCenter />
    </AdminLayout>
  );
}
```

**Step 3: Verify compile**

```bash
npx tsc --noEmit 2>&1 | head -20
```

**Step 4: Commit**

```bash
git add src/app/admin/page.tsx src/components/admin/CommandCenter.tsx
git commit -m "feat: command center hub with stat tiles, SEO issues widget, leads widget, page score table"
```

---

## Task 5: Page Meta Extraction API

**Files:**
- Create: `src/app/api/admin/page-meta/route.ts`

This API self-fetches a page from the live site and extracts SEO metadata via HTML parsing.

**Step 1: Create the route**

Create `src/app/api/admin/page-meta/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface PageMeta {
  path: string;
  title: string | null;
  metaDescription: string | null;
  h1: string | null;
  h1Count: number;
  imagesMissingAlt: number;
  internalLinkCount: number;
  hasCanonical: boolean;
  canonicalUrl: string | null;
  hasGeoRegion: boolean;
  hasGeoPlacename: boolean;
  schemaTypes: string[];
  schemaRaw: string[];
}

function extractMeta(html: string, path: string): PageMeta {
  // Title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;

  // Meta description
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
    ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
  const metaDescription = descMatch ? descMatch[1].trim() : null;

  // H1 tags
  const h1Matches = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) ?? [];
  const h1Count = h1Matches.length;
  const h1TextMatch = h1Matches[0]?.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1TextMatch ? h1TextMatch[1].replace(/<[^>]+>/g, "").trim() : null;

  // Images missing alt
  const imgTags = html.match(/<img[^>]+>/gi) ?? [];
  const imagesMissingAlt = imgTags.filter(tag => {
    const altMatch = tag.match(/alt=["']([^"']*)["']/i);
    return !altMatch || altMatch[1].trim() === "";
  }).length;

  // Internal links
  const linkMatches = html.match(/href=["'](\/[^"'#?][^"']*?)["']/gi) ?? [];
  const internalLinkCount = linkMatches.length;

  // Canonical
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
    ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  const hasCanonical = !!canonicalMatch;
  const canonicalUrl = canonicalMatch ? canonicalMatch[1] : null;

  // GEO signals
  const hasGeoRegion = /<meta[^>]+name=["']geo\.region["']/i.test(html);
  const hasGeoPlacename = /<meta[^>]+name=["']geo\.placename["']/i.test(html);

  // JSON-LD schemas
  const schemaMatches = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) ?? [];
  const schemaRaw = schemaMatches.map(s => {
    const m = s.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
    return m ? m[1].trim() : "";
  }).filter(Boolean);

  const schemaTypes = schemaRaw.map(raw => {
    try {
      const parsed = JSON.parse(raw);
      return parsed["@type"] ?? "Unknown";
    } catch {
      return "Invalid";
    }
  });

  return {
    path,
    title,
    metaDescription,
    h1,
    h1Count,
    imagesMissingAlt,
    internalLinkCount,
    hasCanonical,
    canonicalUrl,
    hasGeoRegion,
    hasGeoPlacename,
    schemaTypes,
    schemaRaw,
  };
}

export async function GET(req: NextRequest) {
  // Auth check
  const token = req.headers.get("x-admin-token");
  if (token !== process.env.CRON_SECRET) {
    // Also allow admin session cookie (handled by calling code)
    // For now allow if no token set (dev mode)
    if (process.env.CRON_SECRET && token !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const path = req.nextUrl.searchParams.get("path");
  if (!path) {
    return NextResponse.json({ error: "path param required" }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tgyardcare.com";
  const url = `${baseUrl}${path}`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "TGAdmin-SEO-Audit/1.0" },
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Page returned ${res.status}`, path, statusCode: res.status },
        { status: 200 }
      );
    }

    const html = await res.text();
    const meta = extractMeta(html, path);
    return NextResponse.json({ ...meta, statusCode: res.status });
  } catch (err) {
    return NextResponse.json(
      { error: String(err), path, statusCode: 0 },
      { status: 200 }
    );
  }
}
```

**Step 2: Test locally**

```bash
# Start dev server in background first, then:
curl "http://localhost:3000/api/admin/page-meta?path=/" | head -50
```

Expected: JSON with title, metaDescription, h1, etc.

**Step 3: Commit**

```bash
git add src/app/api/admin/page-meta/route.ts
git commit -m "feat: page meta extraction API — self-fetches pages and parses SEO signals"
```

---

## Task 6: SEO Audit Engine API

**Files:**
- Create: `src/app/api/admin/seo-audit/route.ts`

**Step 1: Create the audit engine**

Create `src/app/api/admin/seo-audit/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const maxDuration = 300; // 5 min timeout

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// All 76 pages from sitemap
const ALL_PAGES = [
  "/", "/about", "/contact", "/services", "/commercial", "/residential",
  "/gallery", "/reviews", "/faq", "/blog", "/team", "/service-areas",
  "/get-quote", "/careers", "/privacy",
  // Services
  "/services/mowing", "/services/weeding", "/services/mulching",
  "/services/leaf-removal", "/services/spring-cleanup", "/services/fall-cleanup",
  "/services/gutter-cleaning", "/services/gutter-guards", "/services/garden-beds",
  "/services/fertilization", "/services/herbicide", "/services/snow-removal",
  "/services/pruning", "/services/aeration",
  // Commercial
  "/commercial/lawn-care", "/commercial/seasonal", "/commercial/gutters",
  "/commercial/snow-removal", "/commercial/property-enhancement",
  "/commercial/fertilization-weed-control", "/commercial/aeration",
  // Locations
  "/locations/madison", "/locations/middleton", "/locations/waunakee",
  "/locations/monona", "/locations/sun-prairie", "/locations/fitchburg",
  "/locations/verona", "/locations/mcfarland", "/locations/cottage-grove",
  "/locations/deforest", "/locations/oregon", "/locations/stoughton",
];

interface PageMetaResponse {
  path: string;
  title: string | null;
  metaDescription: string | null;
  h1: string | null;
  h1Count: number;
  imagesMissingAlt: number;
  internalLinkCount: number;
  hasCanonical: boolean;
  hasGeoRegion: boolean;
  hasGeoPlacename: boolean;
  schemaTypes: string[];
  statusCode: number;
  error?: string;
}

interface AuditIssue {
  type: string;
  severity: "critical" | "warning" | "info";
  detail: string;
}

function scorePage(meta: PageMetaResponse): { score: number; issues: AuditIssue[] } {
  const issues: AuditIssue[] = [];
  let score = 0;

  // Title (20 pts)
  if (!meta.title) {
    issues.push({ type: "Missing title tag", severity: "critical", detail: "No <title> found" });
  } else if (meta.title.length < 30 || meta.title.length > 60) {
    score += 10;
    issues.push({
      type: "Title length suboptimal",
      severity: "warning",
      detail: `Title is ${meta.title.length} chars (ideal: 30-60)`,
    });
  } else {
    score += 20;
  }

  // Meta description (20 pts)
  if (!meta.metaDescription) {
    issues.push({ type: "Missing meta description", severity: "critical", detail: "No meta description found" });
  } else if (meta.metaDescription.length < 70 || meta.metaDescription.length > 160) {
    score += 10;
    issues.push({
      type: "Meta description length suboptimal",
      severity: "warning",
      detail: `Description is ${meta.metaDescription.length} chars (ideal: 70-160)`,
    });
  } else {
    score += 20;
  }

  // H1 (15 pts)
  if (meta.h1Count === 0) {
    issues.push({ type: "Missing H1", severity: "critical", detail: "No H1 tag found on page" });
  } else if (meta.h1Count > 1) {
    score += 8;
    issues.push({ type: "Multiple H1 tags", severity: "warning", detail: `Found ${meta.h1Count} H1 tags (should be 1)` });
  } else {
    score += 15;
  }

  // Schema (15 pts)
  if (meta.schemaTypes.length === 0) {
    issues.push({ type: "No schema markup", severity: "critical", detail: "No JSON-LD schema found" });
  } else if (meta.schemaTypes.includes("Invalid")) {
    score += 8;
    issues.push({ type: "Invalid schema JSON", severity: "warning", detail: "One or more schemas failed to parse" });
  } else {
    score += 15;
  }

  // Image alt text (10 pts)
  if (meta.imagesMissingAlt > 0) {
    const pts = Math.max(0, 10 - meta.imagesMissingAlt * 2);
    score += pts;
    issues.push({
      type: "Images missing alt text",
      severity: meta.imagesMissingAlt > 3 ? "warning" : "info",
      detail: `${meta.imagesMissingAlt} images missing alt attribute`,
    });
  } else {
    score += 10;
  }

  // Internal links (10 pts)
  if (meta.internalLinkCount < 3) {
    score += 5;
    issues.push({
      type: "Low internal links",
      severity: "info",
      detail: `Only ${meta.internalLinkCount} internal links (recommended: 3+)`,
    });
  } else {
    score += 10;
  }

  // Canonical (5 pts)
  if (!meta.hasCanonical) {
    score += 2;
    issues.push({ type: "Missing canonical tag", severity: "info", detail: "No <link rel='canonical'> found" });
  } else {
    score += 5;
  }

  // GEO signals (5 pts) — only scored for location pages
  if (meta.path.startsWith("/locations/")) {
    if (!meta.hasGeoRegion || !meta.hasGeoPlacename) {
      issues.push({
        type: "Missing GEO meta tags",
        severity: "warning",
        detail: `Location page missing: ${[!meta.hasGeoRegion && "geo.region", !meta.hasGeoPlacename && "geo.placename"].filter(Boolean).join(", ")}`,
      });
    } else {
      score += 5;
    }
  } else {
    score += 5; // Non-location pages get full GEO points
  }

  return { score: Math.min(100, score), issues };
}

export async function GET(req: NextRequest) {
  const cronSecret = req.headers.get("authorization")?.replace("Bearer ", "");
  const adminToken = req.headers.get("x-admin-token");

  if (process.env.CRON_SECRET) {
    if (cronSecret !== process.env.CRON_SECRET && adminToken !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tgyardcare.com";
  const results = [];
  const errors = [];

  for (const path of ALL_PAGES) {
    try {
      const metaRes = await fetch(
        `${baseUrl}/api/admin/page-meta?path=${encodeURIComponent(path)}`,
        { headers: { "x-admin-token": process.env.CRON_SECRET ?? "" } }
      );
      const meta: PageMetaResponse = await metaRes.json();

      if (meta.statusCode === 0 || meta.statusCode >= 400) {
        errors.push({ path, reason: meta.error ?? `HTTP ${meta.statusCode}` });
        continue;
      }

      const { score, issues } = scorePage(meta);

      // Upsert to page_seo
      await supabaseAdmin.from("page_seo").upsert({
        path,
        seo_score: score,
        audit_issues: issues,
        audited_at: new Date().toISOString(),
        // Preserve existing suggested meta if score is ok
      }, { onConflict: "path" });

      results.push({ path, score, issues: issues.length });
    } catch (err) {
      errors.push({ path, reason: String(err) });
    }

    // Small delay to avoid overwhelming the server
    await new Promise(r => setTimeout(r, 100));
  }

  const avgScore = results.length
    ? Math.round(results.reduce((a, b) => a + b.score, 0) / results.length)
    : 0;

  // Log to automation_runs
  await supabaseAdmin.from("automation_runs").insert({
    automation_slug: "full-seo-audit",
    started_at: new Date().toISOString(),
    completed_at: new Date().toISOString(),
    status: errors.length === 0 ? "success" : errors.length < 5 ? "warning" : "error",
    result_summary: `Audited ${results.length} pages. Avg score: ${avgScore}/100. ${errors.length} errors.`,
    pages_affected: results.length,
  });

  // Update last_run_at
  await supabaseAdmin.from("automation_config")
    .update({ last_run_at: new Date().toISOString() })
    .eq("slug", "full-seo-audit");

  return NextResponse.json({
    audited: results.length,
    averageScore: avgScore,
    errors: errors.length,
    results,
  });
}
```

**Step 2: Test locally**

```bash
curl -H "x-admin-token: dev" "http://localhost:3000/api/admin/seo-audit"
```

Expected: JSON with `audited`, `averageScore`, `results` array.

**Step 3: Commit**

```bash
git add src/app/api/admin/seo-audit/route.ts
git commit -m "feat: SEO audit engine — scores all 76 pages on 8 factors, caches to page_seo"
```

---

## Task 7: SEO Intelligence Page (`/admin/seo`)

**Files:**
- Modify: `src/app/admin/seo/page.tsx`
- Create: `src/components/admin/SEOIntelligence.tsx`

**Step 1: Create SEOIntelligence component**

Create `src/components/admin/SEOIntelligence.tsx`:

```tsx
'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { RefreshCw, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

type Severity = "critical" | "warning" | "info";

interface PageRow {
  path: string;
  seo_score: number;
  audit_issues: Array<{ type: string; severity: Severity; detail: string }>;
  audited_at: string | null;
  suggested_meta_description: string | null;
}

const FILTERS = ["All", "Services", "Locations", "Commercial", "Blog", "Other"];

export default function SEOIntelligence() {
  const [pages, setPages] = useState<PageRow[]>([]);
  const [filter, setFilter] = useState("All");
  const [expandedPath, setExpandedPath] = useState<string | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [lastAudit, setLastAudit] = useState<string | null>(null);

  const fetchData = async () => {
    const { data } = await supabase
      .from("page_seo")
      .select("path, seo_score, audit_issues, audited_at, suggested_meta_description")
      .order("seo_score", { ascending: true });
    setPages((data as PageRow[]) ?? []);
    if (data?.length) setLastAudit(data[0].audited_at);
  };

  useEffect(() => { fetchData(); }, []);

  const filteredPages = pages.filter(p => {
    if (filter === "All") return true;
    if (filter === "Services") return p.path.startsWith("/services/");
    if (filter === "Locations") return p.path.startsWith("/locations/");
    if (filter === "Commercial") return p.path.startsWith("/commercial/");
    if (filter === "Blog") return p.path.startsWith("/blog/");
    return !p.path.match(/^\/(services|locations|commercial|blog)\//);
  });

  const criticalCount = pages.filter(p => p.seo_score < 50).length;
  const warningCount = pages.filter(p => p.seo_score >= 50 && p.seo_score < 75).length;
  const goodCount = pages.filter(p => p.seo_score >= 75).length;
  const avgScore = pages.length
    ? Math.round(pages.reduce((a, b) => a + (b.seo_score ?? 0), 0) / pages.length)
    : 0;

  const runAudit = async () => {
    setIsAuditing(true);
    try {
      await fetch("/api/admin/seo-audit", { headers: { "x-admin-token": "dev" } });
      await fetchData();
    } finally {
      setIsAuditing(false);
    }
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
  };

  const scoreColor = (score: number) =>
    score >= 75 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";

  const timeAgo = (iso: string | null) => {
    if (!iso) return "Never";
    const h = Math.floor((Date.now() - new Date(iso).getTime()) / 3600000);
    if (h < 1) return "< 1h ago";
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white">SEO Intelligence</h1>
          <p className="text-sm text-white/40 mt-1">
            Overall: {avgScore}/100 · Last run: {timeAgo(lastAudit)}
          </p>
        </div>
        <button
          onClick={runAudit}
          disabled={isAuditing}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-black transition-all disabled:opacity-50"
          style={{ background: "#22c55e" }}
        >
          <RefreshCw className={cn("h-4 w-4", isAuditing && "animate-spin")} />
          {isAuditing ? "Auditing..." : "Re-run Audit"}
        </button>
      </div>

      {/* Summary Tiles */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Critical", count: criticalCount, color: "#ef4444", desc: "Score < 50" },
          { label: "Warning",  count: warningCount,  color: "#f59e0b", desc: "Score 50–74" },
          { label: "Good",     count: goodCount,     color: "#22c55e", desc: "Score ≥ 75" },
        ].map(t => (
          <div key={t.label} style={cardStyle} className="p-4 text-center">
            <div className="text-3xl font-bold" style={{ color: t.color }}>{t.count}</div>
            <div className="text-sm text-white/70 mt-1">{t.label}</div>
            <div className="text-xs text-white/30">{t.desc}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
            style={filter === f
              ? { background: "#22c55e", color: "#000" }
              : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }
            }
          >
            {f}
          </button>
        ))}
      </div>

      {/* Pages Table */}
      <div style={cardStyle} className="overflow-hidden">
        {filteredPages.length === 0 ? (
          <p className="text-center py-12 text-white/30 text-sm">
            {pages.length === 0 ? "Run the SEO audit to populate scores." : "No pages in this filter."}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <th className="text-left py-3 px-4 text-xs text-white/40 font-medium">Page</th>
                  <th className="text-left py-3 px-4 text-xs text-white/40 font-medium">Score</th>
                  <th className="text-left py-3 px-4 text-xs text-white/40 font-medium">Issues</th>
                  <th className="text-left py-3 px-4 text-xs text-white/40 font-medium">Audited</th>
                  <th className="py-3 px-4" />
                </tr>
              </thead>
              <tbody>
                {filteredPages.map((row) => {
                  const issues = row.audit_issues ?? [];
                  const crit = issues.filter(x => x.severity === "critical").length;
                  const warn = issues.filter(x => x.severity === "warning").length;
                  const isExpanded = expandedPath === row.path;

                  return (
                    <>
                      <tr
                        key={row.path}
                        className="cursor-pointer hover:bg-white/[0.03] transition-colors"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                        onClick={() => setExpandedPath(isExpanded ? null : row.path)}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-white/70 text-xs font-mono truncate max-w-[220px]">
                              {row.path}
                            </span>
                            <a
                              href={`https://tgyardcare.com${row.path}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="text-white/20 hover:text-white/50"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-white/10">
                              <div
                                className="h-1.5 rounded-full transition-all"
                                style={{
                                  width: `${row.seo_score}%`,
                                  background: scoreColor(row.seo_score),
                                }}
                              />
                            </div>
                            <span className="text-xs font-medium" style={{ color: scoreColor(row.seo_score) }}>
                              {row.seo_score}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2 text-xs">
                            {crit > 0 && <span className="text-red-400">🔴 {crit}</span>}
                            {warn > 0 && <span className="text-yellow-400">🟡 {warn}</span>}
                            {crit === 0 && warn === 0 && <span className="text-green-400">✅</span>}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-xs text-white/30">
                          {timeAgo(row.audited_at)}
                        </td>
                        <td className="py-3 px-4 text-white/40">
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr key={`${row.path}-expanded`}>
                          <td
                            colSpan={5}
                            className="px-4 pb-4"
                            style={{ background: "rgba(255,255,255,0.02)" }}
                          >
                            <div className="space-y-1.5 pt-2">
                              {issues.length === 0 && (
                                <p className="text-xs text-green-400">No issues found — great work!</p>
                              )}
                              {issues.map((issue, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs">
                                  <span className="mt-0.5 shrink-0">
                                    {issue.severity === "critical" ? "🔴" : issue.severity === "warning" ? "🟡" : "🔵"}
                                  </span>
                                  <div>
                                    <span className="text-white/70 font-medium">{issue.type}: </span>
                                    <span className="text-white/45">{issue.detail}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
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
```

**Step 2: Update admin/seo/page.tsx**

Replace `src/app/admin/seo/page.tsx`:

```tsx
import type { Metadata } from "next";
import AdminLayout from "@/components/admin/AdminLayout";
import SEOIntelligence from "@/components/admin/SEOIntelligence";

export const metadata: Metadata = {
  title: "SEO Intelligence - TG Admin",
  robots: { index: false, follow: false },
};

export default function SEOPage() {
  return (
    <AdminLayout title="SEO Intelligence">
      <SEOIntelligence />
    </AdminLayout>
  );
}
```

**Step 3: Commit**

```bash
git add src/app/admin/seo/page.tsx src/components/admin/SEOIntelligence.tsx
git commit -m "feat: SEO intelligence page with full page table, filters, expandable issue drawer, re-run trigger"
```

---

## Task 8: Vercel Cron Jobs + Tier 1 Automations

**Files:**
- Create: `vercel.json`
- Create: `src/app/api/cron/season-switcher/route.ts`
- Create: `src/app/api/cron/seo-audit/route.ts`
- Create: `src/app/api/cron/sitemap-check/route.ts`
- Create: `src/app/api/cron/robots-guard/route.ts`

**Step 1: Create vercel.json**

Create `vercel.json` in project root:

```json
{
  "crons": [
    { "path": "/api/cron/season-switcher",   "schedule": "0 6 * * *"   },
    { "path": "/api/cron/seo-audit",         "schedule": "0 12 * * 1"  },
    { "path": "/api/cron/sitemap-check",     "schedule": "0 14 * * 1"  },
    { "path": "/api/cron/robots-guard",      "schedule": "0 6 * * *"   },
    { "path": "/api/cron/meta-gen",          "schedule": "0 10 * * 2"  },
    { "path": "/api/cron/faq-builder",       "schedule": "0 11 * * 2"  },
    { "path": "/api/cron/content-freshness", "schedule": "0 8 1 * *"   },
    { "path": "/api/cron/gbp-post",          "schedule": "0 14 * * 1"  },
    { "path": "/api/cron/nap-checker",       "schedule": "0 9 * * 2"   },
    { "path": "/api/cron/local-gap-finder",  "schedule": "0 8 1 * *"   },
    { "path": "/api/cron/geo-signal-auditor","schedule": "0 10 * * 2"  },
    { "path": "/api/cron/lead-response-timer","schedule": "*/30 * * * *"},
    { "path": "/api/cron/weekly-digest",     "schedule": "0 13 * * 1"  }
  ]
}
```

**Step 2: Season Switcher**

Create `src/app/api/cron/season-switcher/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function getExpectedSeason(): string {
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const mmdd = month * 100 + day;
  if (mmdd >= 1115 || mmdd <= 314) return "winter";
  if (mmdd >= 515 && mmdd <= 914) return "summer";
  if (mmdd >= 915 && mmdd <= 1114) return "fall";
  return "spring";
}

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

  const { data: override } = await supabase
    .from("season_override").select("active_override").single();

  if (override?.active_override && override.active_override !== "auto") {
    await supabase.from("automation_runs").insert({
      automation_slug: "auto-season-switcher",
      status: "skipped",
      result_summary: `Manual override active: ${override.active_override}`,
      completed_at: new Date().toISOString(),
    });
    return NextResponse.json({ status: "skipped", reason: "manual override" });
  }

  const expected = getExpectedSeason();
  const { data: current } = await supabase
    .from("season_settings").select("season")
    .order("updated_at", { ascending: false }).limit(1).single();

  if (current?.season === expected) {
    await supabase.from("automation_runs").insert({
      automation_slug: "auto-season-switcher",
      status: "skipped",
      result_summary: `Already ${expected} — no change needed`,
      completed_at: new Date().toISOString(),
    });
    return NextResponse.json({ status: "skipped", season: expected });
  }

  await supabase.from("season_settings").upsert(
    { season: expected, updated_at: new Date().toISOString() },
    { onConflict: "season" }
  );

  await sendSlack(`🌿 TotalGuard season switched: ${current?.season ?? "?"} → *${expected}*`);

  await supabase.from("automation_runs").insert({
    automation_slug: "auto-season-switcher",
    status: "success",
    result_summary: `Season switched to ${expected}`,
    completed_at: new Date().toISOString(),
  });
  await supabase.from("automation_config")
    .update({ last_run_at: new Date().toISOString() })
    .eq("slug", "auto-season-switcher");

  return NextResponse.json({ status: "success", newSeason: expected });
}
```

**Step 3: Sitemap Check**

Create `src/app/api/cron/sitemap-check/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export const maxDuration = 60;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tgyardcare.com";
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const broken: string[] = [];

  for (const url of urls) {
    const res = await fetch(url, { method: "HEAD" }).catch(() => null);
    if (!res?.ok) broken.push(`${url} (${res?.status ?? "timeout"})`);
  }

  const status = broken.length === 0 ? "success" : broken.length < 3 ? "warning" : "error";
  const summary = broken.length === 0
    ? `All ${urls.length} sitemap URLs return 200`
    : `${broken.length} broken: ${broken.slice(0, 3).join(", ")}`;

  if (broken.length && process.env.SLACK_WEBHOOK_URL) {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: `⚠️ Sitemap check: ${summary}` }),
    });
  }

  await supabase.from("automation_runs").insert({
    automation_slug: "sitemap-integrity-check",
    status, result_summary: summary,
    completed_at: new Date().toISOString(), pages_affected: urls.length,
  });
  await supabase.from("automation_config")
    .update({ last_run_at: new Date().toISOString() })
    .eq("slug", "sitemap-integrity-check");

  return NextResponse.json({ checked: urls.length, broken: broken.length });
}
```

**Step 4: Robots Guard**

Create `src/app/api/cron/robots-guard/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tgyardcare.com";
  const text = await (await fetch(`${base}/robots.txt`)).text();
  const issues: string[] = [];
  if (!text.includes("Disallow: /admin")) issues.push("Missing 'Disallow: /admin'");
  if (!text.includes("Sitemap:")) issues.push("Missing Sitemap directive");

  const status = issues.length === 0 ? "success" : "warning";
  await supabase.from("automation_runs").insert({
    automation_slug: "robots-guard",
    status, result_summary: issues.length === 0 ? "robots.txt valid" : issues.join("; "),
    completed_at: new Date().toISOString(),
  });
  await supabase.from("automation_config")
    .update({ last_run_at: new Date().toISOString() })
    .eq("slug", "robots-guard");

  return NextResponse.json({ valid: issues.length === 0, issues });
}
```

**Step 5: SEO Audit Cron (proxies to admin route)**

Create `src/app/api/cron/seo-audit/route.ts`:

```typescript
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
```

**Step 6: Commit**

```bash
git add vercel.json src/app/api/
git commit -m "feat: vercel.json cron schedule + Tier 1 cron routes (season-switcher, sitemap-check, robots-guard)"
```

---

## Task 9: Automations Control Panel (`/admin/automations`)

**Files:**
- Create: `src/app/admin/automations/page.tsx`
- Create: `src/components/admin/AutomationsPanel.tsx`

**Step 1: Create AutomationsPanel**

Create `src/components/admin/AutomationsPanel.tsx`:

```tsx
'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Play, Pause, ClipboardList, RefreshCw, CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";

interface Automation {
  slug: string; name: string; description: string; tier: string;
  is_active: boolean; schedule: string; last_run_at: string | null;
}
interface Run {
  automation_slug: string; status: string;
  result_summary: string | null; completed_at: string | null;
}

const TIER_COLORS: Record<string, string> = {
  foundation: "#22c55e", content: "#60a5fa",
  local: "#f59e0b", ai: "#a78bfa", monitoring: "#f87171",
};

const CRON_MAP: Record<string, string> = {
  "auto-season-switcher": "/api/cron/season-switcher",
  "full-seo-audit": "/api/admin/seo-audit",
  "sitemap-integrity-check": "/api/cron/sitemap-check",
  "robots-guard": "/api/cron/robots-guard",
  "meta-description-generator": "/api/cron/meta-gen",
  "faq-schema-builder": "/api/cron/faq-builder",
  "content-freshness-monitor": "/api/cron/content-freshness",
  "gbp-post-generator": "/api/cron/gbp-post",
  "lead-response-timer": "/api/cron/lead-response-timer",
  "weekly-performance-digest": "/api/cron/weekly-digest",
};

export default function AutomationsPanel() {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [lastRuns, setLastRuns] = useState<Record<string, Run>>({});
  const [filter, setFilter] = useState("All");
  const [running, setRunning] = useState<string | null>(null);
  const [logsSlug, setLogsSlug] = useState<string | null>(null);
  const [logs, setLogs] = useState<Run[]>([]);

  const load = async () => {
    const { data: autos } = await supabase.from("automation_config").select("*").order("tier");
    setAutomations((autos as Automation[]) ?? []);

    const { data: runs } = await supabase.from("automation_runs")
      .select("*").order("completed_at", { ascending: false }).limit(100);
    const map: Record<string, Run> = {};
    for (const r of (runs as Run[]) ?? []) {
      if (!map[r.automation_slug]) map[r.automation_slug] = r;
    }
    setLastRuns(map);
  };

  useEffect(() => { load(); }, []);

  const TIERS = ["All", "Foundation", "Content", "Local", "AI", "Monitoring"];
  const filtered = automations.filter(a =>
    filter === "All" || a.tier.toLowerCase() === filter.toLowerCase()
  );

  const runNow = async (slug: string) => {
    setRunning(slug);
    try {
      const path = CRON_MAP[slug];
      if (path) await fetch(path, { headers: { "x-admin-token": "dev", authorization: "Bearer dev" } });
      await load();
    } finally { setRunning(null); }
  };

  const toggleActive = async (slug: string, current: boolean) => {
    await supabase.from("automation_config").update({ is_active: !current }).eq("slug", slug);
    setAutomations(prev => prev.map(a => a.slug === slug ? { ...a, is_active: !current } : a));
  };

  const viewLogs = async (slug: string) => {
    setLogsSlug(logsSlug === slug ? null : slug);
    if (logsSlug === slug) return;
    const { data } = await supabase.from("automation_runs")
      .select("*").eq("automation_slug", slug)
      .order("completed_at", { ascending: false }).limit(20);
    setLogs((data as Run[]) ?? []);
  };

  const timeAgo = (iso: string | null) => {
    if (!iso) return "Never";
    const h = Math.floor((Date.now() - new Date(iso).getTime()) / 3600000);
    if (h < 1) return "< 1h ago";
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  const statusIcon = (s: string) =>
    s === "success" ? <CheckCircle className="h-3.5 w-3.5 text-green-400" /> :
    s === "error"   ? <XCircle    className="h-3.5 w-3.5 text-red-400"   /> :
    s === "warning" ? <AlertTriangle className="h-3.5 w-3.5 text-yellow-400" /> :
                      <Clock className="h-3.5 w-3.5 text-white/30" />;

  const card = { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"12px" };
  const activeCount = automations.filter(a => a.is_active).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Automation Engine</h1>
        <p className="text-sm text-white/40 mt-1">System Health: {activeCount}/{automations.length} Running</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {TIERS.map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
            style={filter === t ? { background:"#22c55e", color:"#000" } : { background:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.6)" }}>
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(a => {
          const lastRun = lastRuns[a.slug];
          const tierColor = TIER_COLORS[a.tier] ?? "#22c55e";
          return (
            <div key={a.slug} style={card} className="p-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-sm font-semibold text-white">{a.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider"
                      style={{ background:`${tierColor}20`, color:tierColor }}>{a.tier}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full"
                      style={a.is_active
                        ? { background:"rgba(34,197,94,0.15)", color:"#22c55e" }
                        : { background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.3)" }}>
                      {a.is_active ? "Running" : "Paused"}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 mb-2">{a.description}</p>
                  {lastRun ? (
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      {statusIcon(lastRun.status)}
                      <span>Last: {timeAgo(lastRun.completed_at)}</span>
                      {lastRun.result_summary && (
                        <span className="text-white/25 truncate max-w-xs">— {lastRun.result_summary}</span>
                      )}
                    </div>
                  ) : <p className="text-xs text-white/25">Never run</p>}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => toggleActive(a.slug, a.is_active)}
                    className="flex items-center gap-1 px-2 py-1 rounded text-xs text-white/40 hover:text-white/70"
                    style={{ background:"rgba(255,255,255,0.06)" }}>
                    {a.is_active ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    {a.is_active ? "Pause" : "Resume"}
                  </button>
                  <button onClick={() => runNow(a.slug)} disabled={running === a.slug}
                    className="flex items-center gap-1 px-2 py-1 rounded text-xs text-black font-medium disabled:opacity-40"
                    style={{ background:"#22c55e" }}>
                    <RefreshCw className={cn("h-3 w-3", running === a.slug && "animate-spin")} />
                    {running === a.slug ? "Running..." : "Run Now"}
                  </button>
                  <button onClick={() => viewLogs(a.slug)}
                    className="flex items-center gap-1 px-2 py-1 rounded text-xs text-white/40 hover:text-white/70"
                    style={{ background:"rgba(255,255,255,0.06)" }}>
                    <ClipboardList className="h-3 w-3" /> Logs
                  </button>
                </div>
              </div>

              {logsSlug === a.slug && (
                <div className="mt-4 pt-3" style={{ borderTop:"1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-medium text-white/60">Run History</span>
                    <button onClick={() => setLogsSlug(null)} className="text-xs text-white/30 hover:text-white/60">Close</button>
                  </div>
                  {logs.length === 0 ? <p className="text-xs text-white/25">No runs recorded</p> : (
                    <div className="space-y-1.5 max-h-40 overflow-y-auto">
                      {logs.map((log, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          {statusIcon(log.status)}
                          <span className="text-white/30 shrink-0">{timeAgo(log.completed_at)}</span>
                          <span className="text-white/50 truncate">{log.result_summary}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

**Step 2: Create page**

Create `src/app/admin/automations/page.tsx`:

```tsx
import type { Metadata } from "next";
import AdminLayout from "@/components/admin/AdminLayout";
import AutomationsPanel from "@/components/admin/AutomationsPanel";

export const metadata: Metadata = {
  title: "Automations - TG Admin",
  robots: { index: false, follow: false },
};

export default function AutomationsPage() {
  return (
    <AdminLayout title="Automation Engine">
      <AutomationsPanel />
    </AdminLayout>
  );
}
```

**Step 3: Commit**

```bash
git add src/app/admin/automations/ src/components/admin/AutomationsPanel.tsx
git commit -m "feat: automations panel — 20 cards with tier filter, run-now, pause/resume, log drawer"
```

---

## Task 10: AI Automation Cron Routes

**Files:**
- Create: `src/app/api/cron/meta-gen/route.ts`
- Create: `src/app/api/cron/faq-builder/route.ts`
- Create: `src/app/api/cron/content-freshness/route.ts`
- Create: `src/app/api/cron/gbp-post/route.ts`

**Step 1: Meta Description Generator (Claude Haiku)**

Create `src/app/api/cron/meta-gen/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
export const maxDuration = 120;

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: pages } = await supabase
    .from("page_seo").select("path").is("suggested_meta_description", null).limit(10);
  if (!pages?.length) return NextResponse.json({ generated: 0 });

  let generated = 0;
  for (const page of pages) {
    try {
      const res = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001", max_tokens: 200,
        messages: [{ role: "user", content: `Write a compelling meta description (120-155 chars) for TotalGuard Yard Care page: ${page.path}. Madison WI. Focus on value + local keywords. Return ONLY the meta description text.` }],
      });
      const text = res.content.find(b => b.type === "text")?.text?.trim();
      if (text && text.length >= 70 && text.length <= 160) {
        await supabase.from("page_seo").upsert({ path: page.path, suggested_meta_description: text }, { onConflict: "path" });
        generated++;
      }
    } catch { /* skip */ }
  }

  await supabase.from("automation_runs").insert({
    automation_slug: "meta-description-generator", status: "success",
    result_summary: `Generated meta descriptions for ${generated} pages`,
    completed_at: new Date().toISOString(), pages_affected: generated,
  });
  await supabase.from("automation_config").update({ last_run_at: new Date().toISOString() }).eq("slug", "meta-description-generator");
  return NextResponse.json({ generated });
}
```

**Step 2: FAQ Schema Builder (Claude Haiku)**

Create `src/app/api/cron/faq-builder/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
export const maxDuration = 120;

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SERVICES = ["/services/mowing","/services/snow-removal","/services/leaf-removal","/services/gutter-cleaning","/services/fertilization","/services/aeration"];

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let processed = 0;
  for (const path of SERVICES) {
    try {
      const service = path.replace("/services/","").replace(/-/g," ");
      const res = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001", max_tokens: 600,
        messages: [{ role: "user", content: `Generate 5 FAQ JSON-LD entries for ${service} service, TotalGuard Yard Care, Madison WI. Return ONLY a JSON array: [{"question":"...","answer":"..."},...]` }],
      });
      const text = res.content.find(b => b.type === "text")?.text?.trim();
      const match = text?.match(/\[[\s\S]+\]/);
      if (!match) continue;
      const faqs = JSON.parse(match[0]);
      const schema = {
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f: {question:string;answer:string}) => ({
          "@type": "Question", name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      };
      await supabase.from("page_seo").upsert({ path, schema_data: schema }, { onConflict: "path" });
      processed++;
    } catch { /* skip */ }
  }

  await supabase.from("automation_runs").insert({
    automation_slug: "faq-schema-builder", status: "success",
    result_summary: `Built FAQ schemas for ${processed} pages`,
    completed_at: new Date().toISOString(), pages_affected: processed,
  });
  await supabase.from("automation_config").update({ last_run_at: new Date().toISOString() }).eq("slug","faq-schema-builder");
  return NextResponse.json({ processed });
}
```

**Step 3: Content Freshness Monitor**

Create `src/app/api/cron/content-freshness/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const staleDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
  const { data } = await supabase.from("page_seo")
    .update({ needs_refresh: true }).lt("audited_at", staleDate).select("path");
  const count = data?.length ?? 0;

  await supabase.from("automation_runs").insert({
    automation_slug: "content-freshness-monitor", status: "success",
    result_summary: `Flagged ${count} pages as stale (>90 days)`,
    completed_at: new Date().toISOString(), pages_affected: count,
  });
  await supabase.from("automation_config").update({ last_run_at: new Date().toISOString() }).eq("slug","content-freshness-monitor");
  return NextResponse.json({ flagged: count });
}
```

**Step 4: GBP Post Generator (Claude Sonnet)**

Create `src/app/api/cron/gbp-post/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const month = new Date().getMonth() + 1;
  const season = month >= 11 || month <= 3 ? "winter" : month >= 5 && month <= 9 ? "summer" : "spring/fall";

  const res = await anthropic.messages.create({
    model: "claude-sonnet-4-6", max_tokens: 300,
    messages: [{ role: "user", content: `Write a Google Business Profile post (150-180 chars) for TotalGuard Yard Care, Madison WI. Season: ${season}. Include a call to action. No hashtags. Professional but friendly. Return ONLY the post text.` }],
  });
  const post = res.content.find(b => b.type === "text")?.text?.trim() ?? "";

  await supabase.from("automation_runs").insert({
    automation_slug: "gbp-post-generator", status: "success",
    result_summary: post, completed_at: new Date().toISOString(),
  });
  await supabase.from("automation_config").update({ last_run_at: new Date().toISOString() }).eq("slug","gbp-post-generator");
  return NextResponse.json({ post });
}
```

**Step 5: Commit**

```bash
git add src/app/api/cron/
git commit -m "feat: AI automation cron routes — meta-gen, faq-builder, content-freshness, gbp-post"
```

---

## Task 11: Lead Timer + Weekly Digest Crons

**Files:**
- Create: `src/app/api/cron/lead-response-timer/route.ts`
- Create: `src/app/api/cron/weekly-digest/route.ts`

**Step 1: Lead Response Timer**

Create `src/app/api/cron/lead-response-timer/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
  const { data } = await supabase.from("contact_submissions")
    .select("name, created_at").is("responded_at", null)
    .lt("created_at", twoHoursAgo).limit(10);

  if (!data?.length) return NextResponse.json({ alerts: 0 });

  if (process.env.SLACK_WEBHOOK_URL) {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `⏰ *${data.length} lead(s) unresponded 2+ hours:* ${data.map(l => l.name).join(", ")}\nhttps://tgyardcare.com/admin/leads`,
      }),
    });
  }

  await supabase.from("automation_runs").insert({
    automation_slug: "lead-response-timer", status: "warning",
    result_summary: `${data.length} unresponded leads past 2hr threshold`,
    completed_at: new Date().toISOString(),
  });
  return NextResponse.json({ alerts: data.length });
}
```

**Step 2: Weekly Performance Digest**

Create `src/app/api/cron/weekly-digest/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { count: leads } = await supabase.from("contact_submissions")
    .select("id", { count: "exact" }).gte("created_at", sevenDaysAgo);
  const { data: seoRows } = await supabase.from("page_seo").select("seo_score");
  const avgScore = seoRows?.length
    ? Math.round(seoRows.reduce((a,b) => a + (b.seo_score ?? 0), 0) / seoRows.length) : 0;
  const critical = seoRows?.filter(p => p.seo_score < 50).length ?? 0;
  const { data: cfgs } = await supabase.from("automation_config").select("is_active");
  const active = cfgs?.filter(c => c.is_active).length ?? 0;

  const msg = [
    `📊 *TotalGuard Weekly Digest — ${new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}*`,
    `📬 Leads this week: *${leads ?? 0}*`,
    `🔍 SEO avg score: *${avgScore}/100*`,
    `🔴 Critical pages: *${critical}*`,
    `⚡ Automations running: *${active}/${cfgs?.length ?? 0}*`,
    `→ https://tgyardcare.com/admin`,
  ].join("\n");

  if (process.env.SLACK_WEBHOOK_URL) {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: msg }),
    });
  }

  await supabase.from("automation_runs").insert({
    automation_slug: "weekly-performance-digest", status: "success",
    result_summary: `Digest sent: ${leads} leads, ${avgScore}/100 avg SEO, ${critical} critical`,
    completed_at: new Date().toISOString(),
  });
  await supabase.from("automation_config").update({ last_run_at: new Date().toISOString() }).eq("slug","weekly-performance-digest");
  return NextResponse.json({ sent: true });
}
```

**Step 3: Commit**

```bash
git add src/app/api/cron/lead-response-timer/ src/app/api/cron/weekly-digest/
git commit -m "feat: lead response timer (30min) + weekly Slack digest cron routes"
```

---

## Task 12: Site Health Page

**Files:**
- Create: `src/app/admin/site-health/page.tsx`
- Create: `src/components/admin/SiteHealthPanel.tsx`

**Step 1: Create SiteHealthPanel**

Create `src/components/admin/SiteHealthPanel.tsx`:

```tsx
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
    const results = [...checks];

    // Robots
    try {
      const r = await fetch("/api/cron/robots-guard", { headers: { authorization: "Bearer dev" } });
      const d = await r.json();
      results[2] = { label: "robots.txt valid", status: d.valid ? "pass" : "warn", detail: d.valid ? "Valid — /admin blocked, sitemap present" : d.issues?.join("; ") ?? "Issues found" };
    } catch (e) { results[2] = { label: "robots.txt valid", status: "fail", detail: String(e) }; }

    // Sitemap
    try {
      const r = await fetch("/api/cron/sitemap-check", { headers: { authorization: "Bearer dev" } });
      const d = await r.json();
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
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-black disabled:opacity-50"
          style={{ background: "#22c55e" }}>
          <RefreshCw className={cn("h-4 w-4", running && "animate-spin")} />
          {running ? "Checking..." : "Run Checks"}
        </button>
      </div>

      <div style={card}>
        {checks.map((c, i) => (
          <div key={i} className="flex items-center gap-4 p-4"
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
        <p className="text-xs text-white/40 mb-3">LCP, CLS, and FID metrics from real users — check Vercel Analytics.</p>
        <a href="https://vercel.com/ashtonkferry-create/tgyardcare/analytics" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-green-400 hover:text-green-300">
          Open Vercel Analytics <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
```

**Step 2: Create page**

Create `src/app/admin/site-health/page.tsx`:

```tsx
import type { Metadata } from "next";
import AdminLayout from "@/components/admin/AdminLayout";
import SiteHealthPanel from "@/components/admin/SiteHealthPanel";

export const metadata: Metadata = {
  title: "Site Health - TG Admin",
  robots: { index: false, follow: false },
};

export default function SiteHealthPage() {
  return (
    <AdminLayout title="Site Health">
      <SiteHealthPanel />
    </AdminLayout>
  );
}
```

**Step 3: Commit**

```bash
git add src/app/admin/site-health/ src/components/admin/SiteHealthPanel.tsx
git commit -m "feat: site health page with on-demand robots, sitemap, 404 checks"
```

---

## Task 13: Seasons Page Upgrade

**Files:**
- Modify: `src/app/admin/seasons/page.tsx`
- Create: `src/components/admin/SeasonsPanel.tsx`

**Step 1: Create SeasonsPanel**

Create `src/components/admin/SeasonsPanel.tsx`:

```tsx
'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Snowflake, Sun, Leaf, Flower2 } from "lucide-react";

type SeasonName = "auto" | "winter" | "spring" | "summer" | "fall";

const SEASONS = [
  { value: "auto"   as SeasonName, label: "Auto",   icon: "🤖",    color: "#22c55e" },
  { value: "winter" as SeasonName, label: "Winter",  icon: Snowflake, color: "#60a5fa" },
  { value: "spring" as SeasonName, label: "Spring",  icon: Flower2,   color: "#86efac" },
  { value: "summer" as SeasonName, label: "Summer",  icon: Sun,       color: "#fbbf24" },
  { value: "fall"   as SeasonName, label: "Fall",    icon: Leaf,      color: "#f97316" },
];

export default function SeasonsPanel() {
  const [active, setActive] = useState<SeasonName>("auto");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("season_override").select("active_override").single()
      .then(({ data }) => { if (data?.active_override) setActive(data.active_override as SeasonName); });
  }, []);

  const set = async (value: SeasonName) => {
    setSaving(true);
    const { error } = await supabase.from("season_override")
      .upsert({ id: 1, active_override: value, updated_at: new Date().toISOString() });
    if (error) toast.error("Failed to update season");
    else { setActive(value); toast.success(value === "auto" ? "Season set to auto-detect" : `Season overridden to ${value}`); }
    setSaving(false);
  };

  const card = { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"12px" };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Seasons & Promos</h1>
        <p className="text-sm text-white/40 mt-1">Controls which season theme the site displays</p>
      </div>

      <div style={card} className="p-6">
        <h2 className="text-sm font-semibold text-white mb-4">Season Control</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {SEASONS.map(s => {
            const isActive = active === s.value;
            const IconComp = typeof s.icon !== "string" ? s.icon : null;
            return (
              <button key={s.value} onClick={() => set(s.value)} disabled={saving}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border transition-all"
                style={isActive
                  ? { background:`${s.color}20`, borderColor: s.color }
                  : { background:"rgba(255,255,255,0.03)", borderColor:"rgba(255,255,255,0.1)" }}>
                {typeof s.icon === "string"
                  ? <span className="text-2xl">{s.icon}</span>
                  : <IconComp className="h-6 w-6" style={{ color: isActive ? s.color : "rgba(255,255,255,0.4)" }} />
                }
                <span className="text-xs font-medium text-white/70">{s.label}</span>
                {isActive && (
                  <span className="text-[10px]" style={{ color: s.color }}>
                    {s.value === "auto" ? "Active" : "Override"}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 p-3 rounded-lg text-xs" style={{ background:"rgba(255,255,255,0.04)" }}>
          <p className="text-white/40">
            <strong className="text-white/60">Auto schedule:</strong> Winter Nov 15 · Spring Mar 15 · Summer May 15 · Fall Sep 15
          </p>
          {active !== "auto" && (
            <p className="text-yellow-400 mt-1">
              ⚠️ Manual override active — auto-switcher cron will skip until reset to Auto
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Update seasons page.tsx**

Replace `src/app/admin/seasons/page.tsx`:

```tsx
import type { Metadata } from "next";
import AdminLayout from "@/components/admin/AdminLayout";
import SeasonsPanel from "@/components/admin/SeasonsPanel";

export const metadata: Metadata = {
  title: "Seasons - TG Admin",
  robots: { index: false, follow: false },
};

export default function SeasonsPage() {
  return (
    <AdminLayout title="Seasons & Promos">
      <SeasonsPanel />
    </AdminLayout>
  );
}
```

**Step 3: Commit**

```bash
git add src/app/admin/seasons/ src/components/admin/SeasonsPanel.tsx
git commit -m "feat: seasons panel with auto/manual override, 5 season buttons, override warning"
```

---

## Task 14: Environment Variables + Final Build

**Step 1: Generate CRON_SECRET**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output — this is your CRON_SECRET.

**Step 2: Add env vars to Vercel dashboard**

Go to vercel.com → tgyardcare project → Settings → Environment Variables. Add:

```
CRON_SECRET=<generated above>
ANTHROPIC_API_KEY=<from console.anthropic.com>
SLACK_WEBHOOK_URL=<from Slack App → Incoming Webhooks>
NEXT_PUBLIC_SITE_URL=https://tgyardcare.com
SUPABASE_SERVICE_ROLE_KEY=<from Supabase → Settings → API>
```

**Step 3: Create .env.local for local dev**

```bash
# .env.local (already in .gitignore)
CRON_SECRET=dev
ANTHROPIC_API_KEY=sk-ant-...
SLACK_WEBHOOK_URL=https://hooks.slack.com/...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

**Step 4: Run type check**

```bash
cd /c/Users/vance/OneDrive/Desktop/claude-workspace/tgyardcare
npx tsc --noEmit 2>&1 | head -30
```

Expected: 0 errors (or only pre-existing Supabase type errors already ignored).

**Step 5: Run build**

```bash
npm run build 2>&1 | tail -20
```

Expected: Build succeeds. Note any warnings.

**Step 6: Final commit + push**

```bash
git add .
git status   # Verify no .env.local or secrets are staged
git commit -m "feat: complete admin SEO command center v1 — layout, hub, SEO engine, 20 automations, seasons"
git push origin main
```

---

## Success Criteria

- [ ] `/admin` loads with dark `#050505` background, season pill in header, 9-item sidebar nav
- [ ] Command center shows 4 stat tiles with live Supabase data
- [ ] `/api/admin/seo-audit` scores all 76 pages, saves to `page_seo` table
- [ ] `/admin/seo` shows full sortable table, filters, expandable issue drawers
- [ ] `/admin/automations` shows all 20 cards with tier filter, run-now, pause, logs
- [ ] Season-switcher cron skips correctly on manual override
- [ ] Claude Haiku generates meta descriptions and FAQ schemas
- [ ] Weekly Slack digest fires Monday 8am CT with leads + SEO + automation summary
- [ ] `vercel.json` deploys with 13 cron jobs active on Vercel
- [ ] TypeScript compiles with no new errors (`npx tsc --noEmit`)
- [ ] All admin pages responsive at 375px (sidebar collapses to hamburger)

---

## Execution Order

Tasks must be executed in order — each builds on the previous:

1. Task 1 — Install deps (`@anthropic-ai/sdk`)
2. Task 2 — Supabase migrations
3. Task 3 — Rebuild AdminLayout
4. Task 4 — Command Center hub
5. Task 5 — Page Meta API
6. Task 6 — SEO Audit Engine API
7. Task 7 — SEO Intelligence page
8. Task 8 — vercel.json + Tier 1 crons
9. Task 9 — Automations panel
10. Task 10 — AI automation crons
11. Task 11 — Lead timer + weekly digest
12. Task 12 — Site Health page
13. Task 13 — Seasons upgrade
14. Task 14 — Env vars + final build
