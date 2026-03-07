'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Snowflake, Sun, Leaf, Flower2, Settings } from "lucide-react";

type SeasonName = "auto" | "winter" | "spring" | "summer" | "fall";

const SEASONS: Array<{
  value: SeasonName;
  label: string;
  icon: React.ElementType;
  color: string;
}> = [
  { value: "auto",   label: "Auto",   icon: Settings,  color: "#22c55e" },
  { value: "winter", label: "Winter", icon: Snowflake, color: "#60a5fa" },
  { value: "spring", label: "Spring", icon: Flower2,   color: "#86efac" },
  { value: "summer", label: "Summer", icon: Sun,       color: "#fbbf24" },
  { value: "fall",   label: "Fall",   icon: Leaf,      color: "#f97316" },
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
    else {
      setActive(value);
      toast.success(value === "auto" ? "Season set to auto-detect" : `Season overridden to ${value}`);
    }
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
            const Icon = s.icon;
            return (
              <button key={s.value} onClick={() => set(s.value)} disabled={saving}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border transition-all"
                style={isActive
                  ? { background:`${s.color}20`, borderColor: s.color }
                  : { background:"rgba(255,255,255,0.03)", borderColor:"rgba(255,255,255,0.1)" }}>
                <Icon className="h-6 w-6" style={{ color: isActive ? s.color : "rgba(255,255,255,0.4)" }} />
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
            <strong className="text-white/60">Auto schedule:</strong> Winter Nov 15 · Summer May 15 · Fall Sep 15
          </p>
          {active !== "auto" && (
            <p className="text-yellow-400 mt-1">
              Manual override active. Auto-switcher cron will skip until reset to Auto.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
