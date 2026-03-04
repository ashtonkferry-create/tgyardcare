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
  { path: "/admin",              label: "Command Center",   icon: LayoutDashboard },
  { path: "/admin/seo",          label: "SEO Intelligence", icon: Search },
  { path: "/admin/automations",  label: "Automations",      icon: Zap },
  { path: "/admin/site-health",  label: "Site Health",      icon: Activity },
  { path: "/admin/schema",       label: "Schema & GEO",     icon: Code2 },
  { path: "/admin/leads",        label: "Leads",            icon: Inbox },
  { path: "/admin/seasons",      label: "Seasons & Promos", icon: Leaf },
  { path: "/admin/gallery",      label: "Gallery",          icon: Image },
  { path: "/admin/tools",        label: "Tools",            icon: Wrench },
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
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Loading admin...</p>
        </div>
      </div>
    );
  }

  const seasonColor =
    seasonInfo?.season === "winter" ? "#60a5fa" :
    seasonInfo?.season === "summer" ? "#fbbf24" :
    seasonInfo?.season === "fall"   ? "#f97316" : "#22c55e";

  const SeasonIcon = seasonInfo?.season === "winter" ? Snowflake :
                     seasonInfo?.season === "summer" ? Sun : null;

  const seasonLabel = seasonInfo
    ? `${seasonInfo.season.charAt(0).toUpperCase()}${seasonInfo.season.slice(1)}${seasonInfo.isOverride ? " (Override)" : " (Auto)"}`
    : "";

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
            className="md:hidden p-1 rounded"
            style={{ color: "rgba(255,255,255,0.6)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <span className="text-xs hidden sm:block" style={{ color: "rgba(255,255,255,0.4)" }}>TG Admin</span>
          {title && (
            <>
              <ChevronRight className="h-3 w-3 hidden sm:block" style={{ color: "rgba(255,255,255,0.2)" }} />
              <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>{title}</span>
            </>
          )}
        </div>

        {/* Center: Season pill */}
        {seasonInfo && (
          <button
            onClick={() => router.push("/admin/seasons")}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-opacity hover:opacity-80"
            style={{
              background: `${seasonColor}20`,
              color: seasonColor,
              border: `1px solid ${seasonColor}40`,
            }}
          >
            {SeasonIcon && <SeasonIcon className="h-3 w-3" />}
            {seasonLabel}
          </button>
        )}

        {/* Right: View Site + logout */}
        <div className="flex items-center gap-3">
          <a
            href="https://tgyardcare.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 text-xs transition-colors"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            View Site <ExternalLink className="h-3 w-3" />
          </a>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/admin/login");
              toast.success("Logged out");
            }}
            className="flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-colors"
            style={{ color: "rgba(255,255,255,0.4)" }}
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
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all text-left"
                    style={isActive
                      ? { background: "rgba(34,197,94,0.1)", color: "#22c55e" }
                      : { color: "rgba(255,255,255,0.5)" }
                    }
                  >
                    <item.icon
                      className="h-4 w-4 shrink-0"
                      style={{ color: isActive ? "#22c55e" : "rgba(255,255,255,0.4)" }}
                    />
                    <span className={isActive ? "font-medium" : ""}>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="p-3 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <p className="text-[10px] uppercase tracking-wider mb-2 px-3" style={{ color: "rgba(255,255,255,0.25)" }}>Session</p>
            <p className="text-xs px-3 truncate" style={{ color: "rgba(255,255,255,0.3)" }}>{session?.user?.email}</p>
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
