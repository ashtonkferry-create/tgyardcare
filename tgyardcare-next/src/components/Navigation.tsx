'use client';

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, ChevronDown, Phone, Sprout, Flower2, Calendar, Home, Snowflake,
  Scissors, SprayCan, Leaf, CircleDot, Trees, Sparkles, CloudRain,
  Shield, ArrowRight, Users, Award, Droplets, Building2,
  TreePine, CheckCircle2, Clock, FileText, type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSeasonalTheme } from "@/contexts/SeasonalThemeContext";
import { MobileNavMenu } from "@/components/MobileNavMenu";
import { PromoBanner } from "@/components/PromoBanner";
import { useScrollCondense } from "@/hooks/useScrollCondense";

// Shared dropdown animation variants
const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.15, ease: [0.55, 0.06, 0.68, 0.19] } },
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface MegaMenuItem {
  name: string;
  path: string;
  description: string;
  icon: LucideIcon;
}

interface MegaMenuColumn {
  heading: string;
  icon: LucideIcon;
  items: MegaMenuItem[];
}

interface SidebarBadge {
  icon: LucideIcon;
  label: string;
}

interface MegaMenuSidebar {
  icon: LucideIcon;
  heading: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  footnote: string;
  badges: SidebarBadge[];
}

interface ServiceSidebarOverride {
  heading: string;
  description: string;
  bullets: string[];
}

type MegaMenuVariant = 'residential' | 'commercial';

// ---------------------------------------------------------------------------
// Per-service sidebar content (shown when hovering a specific service)
// ---------------------------------------------------------------------------
const serviceSidebarData: Record<string, ServiceSidebarOverride> = {
  // Residential
  "/services/mowing": {
    heading: "Lawn Mowing",
    description: "Professional weekly mowing with precision edging, trimming, and blowing — your lawn looking its best every week.",
    bullets: ["Consistent weekly schedule", "Precision edging & trimming", "Clippings blown clean", "Height adjusted per season"],
  },
  "/services/fertilization": {
    heading: "Fertilization Programs",
    description: "Custom nutrient programs designed for Wisconsin soil and climate to build thick, green, resilient turf.",
    bullets: ["Soil-tested formulations", "Slow-release granular applications", "Seasonal timing for max results", "Safe for kids & pets"],
  },
  "/services/herbicide": {
    heading: "Weed Control",
    description: "Targeted pre- and post-emergent herbicide treatments to eliminate weeds without harming your lawn.",
    bullets: ["Pre-emergent spring barrier", "Post-emergent spot treatment", "Broadleaf & grassy weed control", "Crabgrass prevention"],
  },
  "/services/aeration": {
    heading: "Core Aeration",
    description: "Core aeration breaks up compacted soil, allowing water, air, and nutrients to reach the root zone.",
    bullets: ["Relieves soil compaction", "Improves water absorption", "Promotes deeper root growth", "Best paired with overseeding"],
  },
  "/services/garden-beds": {
    heading: "Garden Bed Installation",
    description: "Full-service garden bed design, installation, and planting to transform your yard's curb appeal.",
    bullets: ["Custom bed design & layout", "Premium soil & amendments", "Perennial & annual planting", "Edging & border installation"],
  },
  "/services/mulching": {
    heading: "Mulching Services",
    description: "Premium mulch installation to retain moisture, suppress weeds, and give beds a polished look.",
    bullets: ["Hardwood & colored mulch options", "Weed barrier underlayment", "Old mulch removal available", "Uniform 2-3\" depth coverage"],
  },
  "/services/pruning": {
    heading: "Shrub & Hedge Pruning",
    description: "Expert pruning to maintain shape, promote health, and keep your hedges and shrubs looking sharp.",
    bullets: ["Hand-pruning for precision", "Shape & size maintenance", "Dead wood removal", "Seasonal timing for plant health"],
  },
  "/services/weeding": {
    heading: "Weeding & Bed Care",
    description: "Thorough hand-weeding and bed maintenance to keep your garden beds clean and healthy.",
    bullets: ["Root-level weed removal", "Bed edge re-definition", "Debris & leaf cleanup", "Monthly maintenance plans"],
  },
  "/services/spring-cleanup": {
    heading: "Spring Cleanup",
    description: "Comprehensive spring yard cleanup to clear winter debris and prepare your property for the growing season.",
    bullets: ["Debris & branch removal", "Leaf & thatch cleanup", "Bed edging & prep", "First mow of the season"],
  },
  "/services/fall-cleanup": {
    heading: "Fall Cleanup",
    description: "Complete fall yard preparation including leaf removal, bed cutbacks, and winterization.",
    bullets: ["Full leaf removal", "Perennial cutbacks", "Final mow & trim", "Gutter debris clearing"],
  },
  "/services/leaf-removal": {
    heading: "Leaf Removal",
    description: "Full-property leaf removal using commercial-grade equipment for a clean, debris-free yard.",
    bullets: ["Blower & vacuum equipment", "Haul-away included", "Lawn & bed coverage", "Multiple visits available"],
  },
  "/services/snow-removal": {
    heading: "Snow Removal",
    description: "Reliable residential snow plowing and shoveling to keep your driveway and walkways safe and clear.",
    bullets: ["Per-event or seasonal contracts", "Driveways & walkways", "Salt & ice treatment", "Early morning priority service"],
  },
  "/services/gutter-cleaning": {
    heading: "Gutter Cleaning",
    description: "Professional gutter cleaning to remove debris, prevent clogs, and protect your home from water damage.",
    bullets: ["Full debris removal", "Downspout flushing", "Roof line inspection", "Before & after photos"],
  },
  "/services/gutter-guards": {
    heading: "Gutter Guards",
    description: "Micro-mesh gutter guard installation to permanently prevent clogs and eliminate seasonal gutter cleaning.",
    bullets: ["Micro-mesh technology", "Lifetime clog prevention", "Professional installation", "Reduces maintenance costs"],
  },
  // Commercial
  "/commercial/lawn-care": {
    heading: "Commercial Lawn Maintenance",
    description: "Weekly property-wide turf management for commercial properties, office parks, and retail centers.",
    bullets: ["Dedicated crew assignments", "Consistent weekly schedule", "Large-area mowing equipment", "Property manager reporting"],
  },
  "/commercial/fertilization-weed-control": {
    heading: "Commercial Turf Programs",
    description: "Custom fertilization and weed control programs scaled for commercial properties and HOA communities.",
    bullets: ["Custom nutrient programs", "Pre & post-emergent weed control", "High-traffic turf recovery", "EPA-compliant applications"],
  },
  "/commercial/aeration": {
    heading: "Commercial Aeration",
    description: "Core aeration for high-traffic commercial turf areas to relieve compaction and restore healthy growth.",
    bullets: ["Heavy-duty commercial aerators", "High-traffic zone focus", "Paired with overseeding", "Minimal disruption to tenants"],
  },
  "/commercial/property-enhancement": {
    heading: "Property Enhancements",
    description: "Complete landscape enhancement services to boost curb appeal and property value for commercial sites.",
    bullets: ["Mulch & bed refresh", "Shrub & tree pruning", "Seasonal color rotations", "HOA board-ready documentation"],
  },
  "/commercial/snow-removal": {
    heading: "Commercial Snow & Ice",
    description: "Priority fleet-based snow removal with 24/7 monitoring for commercial lots, entries, and walkways.",
    bullets: ["24/7 storm monitoring", "Priority fleet dispatch", "ADA-compliant walkways", "Detailed service logs"],
  },
  "/commercial/gutters": {
    heading: "Commercial Gutter Services",
    description: "Commercial-grade gutter maintenance and guard installation for multi-unit and commercial buildings.",
    bullets: ["Multi-story capability", "Scheduled maintenance programs", "Guard installation available", "Downspout & drainage check"],
  },
};

// ---------------------------------------------------------------------------
// Residential Services Data
// ---------------------------------------------------------------------------
const residentialColumns: MegaMenuColumn[] = [
  {
    heading: "Lawn Care & Turf Programs",
    icon: Sprout,
    items: [
      { name: "Lawn Mowing", path: "/services/mowing", description: "Weekly precision cuts", icon: Scissors },
      { name: "Fertilization Programs", path: "/services/fertilization", description: "Thicker, greener lawns", icon: SprayCan },
      { name: "Weed Control", path: "/services/herbicide", description: "Targeted elimination", icon: Leaf },
      { name: "Aeration", path: "/services/aeration", description: "Stronger root systems", icon: CircleDot },
    ],
  },
  {
    heading: "Landscaping & Enhancements",
    icon: Flower2,
    items: [
      { name: "Garden Bed Installation", path: "/services/garden-beds", description: "Design & plant beautiful beds", icon: Flower2 },
      { name: "Mulching Services", path: "/services/mulching", description: "Premium bed coverage", icon: Trees },
      { name: "Shrub & Hedge Pruning", path: "/services/pruning", description: "Expert shaping & care", icon: Scissors },
      { name: "Weeding & Bed Care", path: "/services/weeding", description: "Thorough root-level removal", icon: Leaf },
    ],
  },
  {
    heading: "Seasonal & Exterior Services",
    icon: Calendar,
    items: [
      { name: "Spring Cleanup", path: "/services/spring-cleanup", description: "Fresh season start", icon: Sparkles },
      { name: "Fall Cleanup", path: "/services/fall-cleanup", description: "Complete yard prep", icon: CloudRain },
      { name: "Leaf Removal", path: "/services/leaf-removal", description: "Full yard clearing", icon: Leaf },
      { name: "Snow Removal", path: "/services/snow-removal", description: "Reliable residential plowing", icon: Snowflake },
      { name: "Gutter Cleaning", path: "/services/gutter-cleaning", description: "Debris-free flow & maintenance", icon: Home },
      { name: "Gutter Guards", path: "/services/gutter-guards", description: "Micro-mesh guard installation", icon: Shield },
    ],
  },
];

const residentialSidebar: MegaMenuSidebar = {
  icon: TreePine,
  heading: "Residential Yard Care Solutions",
  description: "Reliable, professional lawn care for homeowners across Dane County.",
  bullets: [
    "Same crew every visit",
    "Transparent pricing",
    "Licensed & insured",
    "100% satisfaction guarantee",
  ],
  ctaLabel: "Get a Fast Quote",
  ctaHref: "/contact",
  footnote: "Seasonal & annual service plans available",
  badges: [
    { icon: Shield, label: "Licensed & Insured" },
    { icon: Users, label: "Same Crew Every Visit" },
    { icon: Award, label: "Same-Day Quotes" },
  ],
};

// ---------------------------------------------------------------------------
// Commercial Services Data
// ---------------------------------------------------------------------------
const commercialColumns: MegaMenuColumn[] = [
  {
    heading: "Lawn & Grounds Management",
    icon: Sprout,
    items: [
      { name: "Commercial Lawn Maintenance", path: "/commercial/lawn-care", description: "Weekly property-wide turf management", icon: Scissors },
      { name: "Fertilization & Turf Programs", path: "/commercial/fertilization-weed-control", description: "Custom nutrient & weed control plans", icon: SprayCan },
      { name: "Aeration & Soil Health", path: "/commercial/aeration", description: "Core aeration for high-traffic turf", icon: CircleDot },
      { name: "Weed & Vegetation Control", path: "/commercial/fertilization-weed-control", description: "Selective & broad-leaf elimination", icon: Leaf },
    ],
  },
  {
    heading: "Landscape & Enhancements",
    icon: Flower2,
    items: [
      { name: "Commercial Mulching", path: "/commercial/property-enhancement", description: "Large-scale bed coverage & refresh", icon: Trees },
      { name: "Property Enhancements", path: "/commercial/property-enhancement", description: "Curb appeal for commercial tenants", icon: Sparkles },
      { name: "Tree & Shrub Pruning", path: "/commercial/property-enhancement", description: "Expert shaping for commercial sites", icon: Scissors },
      { name: "HOA Landscape Care", path: "/commercial/property-enhancement", description: "Common area maintenance programs", icon: Home },
    ],
  },
  {
    heading: "Winter & Exterior Services",
    icon: Snowflake,
    items: [
      { name: "Commercial Snow Plowing", path: "/commercial/snow-removal", description: "Priority fleet-based lot clearing", icon: Snowflake },
      { name: "Ice Management & Deicing", path: "/commercial/snow-removal", description: "Proactive anti-icing & salt application", icon: Droplets },
      { name: "Sidewalk & Entry Clearing", path: "/commercial/snow-removal", description: "ADA-compliant walkway maintenance", icon: Shield },
      { name: "Gutter Services", path: "/commercial/gutters", description: "Commercial-grade gutter maintenance", icon: Home },
    ],
  },
];

const commercialSidebar: MegaMenuSidebar = {
  icon: Building2,
  heading: "Commercial Property Solutions",
  description: "Serving office parks, retail centers, HOAs & industrial properties across Dane County.",
  bullets: [
    "Dedicated crew assignments",
    "Licensed & fully insured",
    "24/7 winter monitoring",
    "Transparent contract pricing",
  ],
  ctaLabel: "Request a Commercial Quote",
  ctaHref: "/contact",
  footnote: "Annual & multi-year contracts available",
  badges: [
    { icon: Shield, label: "Licensed & Fully Insured" },
    { icon: Clock, label: "24/7 Winter Monitoring" },
    { icon: Users, label: "Dedicated Crew Assignments" },
    { icon: FileText, label: "Board-Ready Documentation" },
  ],
};

// ---------------------------------------------------------------------------
// About pages
// ---------------------------------------------------------------------------
const aboutPages = [
  { name: "About Us", path: "/about" },
  { name: "Meet Our Team", path: "/team" },
  { name: "Service Areas", path: "/service-areas" },
  { name: "FAQ", path: "/faq" },
  { name: "Blog", path: "/blog" },
  { name: "Careers", path: "/careers" },
];

// ---------------------------------------------------------------------------
// Seasonal Particles (shared between both mega menus)
// ---------------------------------------------------------------------------
// 3-tier particle config: icon anchors + glowing dots + ambient orbs
const particleConfig = {
  winter: {
    Icon: Snowflake,
    iconColor: 'text-sky-300',
    dotColors: ['bg-cyan-400', 'bg-sky-300', 'bg-blue-300', 'bg-cyan-300'],
    orbColor: 'bg-cyan-500/8',
  },
  fall: {
    Icon: Leaf,
    iconColor: 'text-orange-400',
    dotColors: ['bg-amber-400', 'bg-orange-400', 'bg-yellow-400', 'bg-amber-300'],
    orbColor: 'bg-amber-500/8',
  },
  summer: {
    Icon: Sparkles,
    iconColor: 'text-green-400',
    dotColors: ['bg-green-400', 'bg-emerald-400', 'bg-lime-300', 'bg-green-300'],
    orbColor: 'bg-green-500/8',
  },
} as const;

function SeasonalParticles({ season }: { season: string }) {
  const cfg = particleConfig[season as keyof typeof particleConfig] ?? particleConfig.summer;
  const { Icon, iconColor, dotColors, orbColor } = cfg;

  return (
    <>
      {/* Layer 1: Ambient orbs — large, blurred, slow drift */}
      <div className={`absolute top-[5%] left-[15%] w-32 h-32 ${orbColor} rounded-full blur-3xl animate-drift-1`} style={{ animationDuration: '14s' }} />
      <div className={`absolute bottom-[10%] right-[10%] w-24 h-24 ${orbColor} rounded-full blur-3xl animate-drift-2`} style={{ animationDuration: '16s' }} />

      {/* Layer 2: Icon anchors — branded shapes at strategic positions */}
      <Icon className={`absolute top-[12%] left-[8%] w-4 h-4 ${iconColor}/35 animate-drift-1`} />
      <Icon className={`absolute top-[18%] right-[12%] w-3 h-3 ${iconColor}/25 animate-drift-2`} style={{ animationDelay: '-4s' }} />
      <Icon className={`absolute bottom-[20%] left-[25%] w-3.5 h-3.5 ${iconColor}/30 animate-drift-3`} style={{ animationDelay: '-7s' }} />
      <Icon className={`absolute top-[45%] left-[60%] w-2.5 h-2.5 ${iconColor}/20 animate-drift-1`} style={{ animationDelay: '-2s' }} />
      <Icon className={`absolute bottom-[30%] right-[20%] w-3 h-3 ${iconColor}/25 animate-drift-2`} style={{ animationDelay: '-6s' }} />

      {/* Layer 3: Glowing micro-dots — strategic fill, varied timing */}
      {[
        { top: '8%', left: '22%', s: 2, o: 0.25, d: '7s', dl: '-1s' },
        { top: '35%', left: '5%', s: 2.5, o: 0.2, d: '9s', dl: '-3s' },
        { top: '55%', right: '8%', s: 1.5, o: 0.3, d: '6s', dl: '-5s' },
        { top: '15%', left: '45%', s: 2, o: 0.2, d: '8s', dl: '-2s' },
        { bottom: '15%', left: '50%', s: 3, o: 0.18, d: '10s', dl: '-4s' },
        { top: '60%', left: '35%', s: 1.5, o: 0.25, d: '7s', dl: '-6s' },
        { bottom: '40%', right: '35%', s: 2, o: 0.22, d: '8s', dl: '-1s' },
        { top: '25%', right: '45%', s: 2.5, o: 0.15, d: '11s', dl: '-8s' },
        { bottom: '10%', right: '55%', s: 1.5, o: 0.2, d: '6s', dl: '-3s' },
        { top: '70%', left: '15%', s: 2, o: 0.2, d: '9s', dl: '-7s' },
      ].map((dot, i) => {
        const { s, o, d, dl, ...pos } = dot;
        return (
          <div
            key={i}
            className={`absolute ${dotColors[i % dotColors.length]} rounded-full animate-drift-${(i % 3) + 1}`}
            style={{
              ...pos,
              width: s,
              height: s,
              opacity: o,
              animationDuration: d,
              animationDelay: dl,
              filter: 'blur(0.3px) drop-shadow(0 0 4px currentColor)',
            }}
          />
        );
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// Related / upsell service groups — hover one, siblings subtly highlight
// Snow removal intentionally excluded (no upsell pairing)
// ---------------------------------------------------------------------------
const relatedServicesMap: Record<string, string[]> = {
  // Residential — Lawn care trio
  "/services/mowing": ["/services/fertilization", "/services/herbicide"],
  "/services/fertilization": ["/services/mowing", "/services/herbicide"],
  "/services/herbicide": ["/services/mowing", "/services/fertilization"],
  // Aeration pairs with core lawn care
  "/services/aeration": ["/services/fertilization", "/services/mowing"],
  // Bed care trio
  "/services/garden-beds": ["/services/mulching", "/services/weeding"],
  "/services/mulching": ["/services/garden-beds", "/services/weeding"],
  "/services/weeding": ["/services/garden-beds", "/services/mulching"],
  // Pruning pairs with bed care
  "/services/pruning": ["/services/garden-beds", "/services/mulching"],
  // Seasonal trio
  "/services/spring-cleanup": ["/services/fall-cleanup", "/services/leaf-removal"],
  "/services/fall-cleanup": ["/services/spring-cleanup", "/services/leaf-removal"],
  "/services/leaf-removal": ["/services/spring-cleanup", "/services/fall-cleanup"],
  // Gutter pair
  "/services/gutter-cleaning": ["/services/gutter-guards"],
  "/services/gutter-guards": ["/services/gutter-cleaning"],
  // Commercial — Turf management trio
  "/commercial/lawn-care": ["/commercial/fertilization-weed-control", "/commercial/aeration"],
  "/commercial/fertilization-weed-control": ["/commercial/lawn-care", "/commercial/aeration"],
  "/commercial/aeration": ["/commercial/lawn-care", "/commercial/fertilization-weed-control"],
  // Commercial — Landscape enhancement ↔ gutters
  "/commercial/property-enhancement": ["/commercial/gutters"],
  "/commercial/gutters": ["/commercial/property-enhancement"],
};

// ---------------------------------------------------------------------------
// MegaMenu Component (reusable for Residential + Commercial)
// ---------------------------------------------------------------------------
function MegaMenu({
  columns,
  sidebar,
  season,
  isActivePath,
  variant = 'residential',
}: {
  columns: MegaMenuColumn[];
  sidebar: MegaMenuSidebar;
  season: string;
  isActivePath: (p: string) => boolean;
  variant?: MegaMenuVariant;
}) {
  const [hoveredItem, setHoveredItem] = useState<MegaMenuItem | null>(null);
  const isCommercial = variant === 'commercial';

  // Related-service highlight: checks explicit map + same-path siblings
  const relatedPaths = hoveredItem ? (relatedServicesMap[hoveredItem.path] ?? []) : [];
  const isRelated = (item: MegaMenuItem): boolean => {
    if (!hoveredItem || item === hoveredItem) return false;
    // Same path, different item (e.g. commercial sub-services sharing a page)
    if (item.path === hoveredItem.path && item.name !== hoveredItem.name) return true;
    // Explicit upsell relation
    return relatedPaths.includes(item.path);
  };

  // Resolve sidebar content: hovered service overrides default
  const serviceOverride = hoveredItem ? serviceSidebarData[hoveredItem.path] : null;
  const activeSidebar = {
    icon: hoveredItem?.icon ?? sidebar.icon,
    heading: serviceOverride?.heading ?? sidebar.heading,
    description: serviceOverride?.description ?? sidebar.description,
    bullets: serviceOverride?.bullets ?? sidebar.bullets,
    ctaLabel: hoveredItem ? `Get a ${serviceOverride?.heading ?? hoveredItem.name} Quote` : sidebar.ctaLabel,
    ctaHref: hoveredItem ? hoveredItem.path : sidebar.ctaHref,
    footnote: sidebar.footnote,
    badges: sidebar.badges,
  };
  const ActiveSidebarIcon = activeSidebar.icon;

  // Accent color classes per variant
  const accent = {
    headerText: isCommercial ? 'text-amber-400' : 'text-primary',
    headerBg: isCommercial ? 'bg-amber-500/15' : 'bg-white/10',
    headerBorder: isCommercial ? 'border-amber-500/30' : 'border-white/20',
    iconColor: isCommercial ? 'text-amber-400' : 'text-primary',
    activeItemBg: isCommercial ? 'bg-amber-500/20' : 'bg-primary/20',
    activeItemText: isCommercial ? 'text-amber-400' : 'text-primary',
    hoverText: isCommercial ? 'group-hover:text-amber-400' : 'group-hover:text-primary',
    sidebarIconBg: isCommercial ? 'bg-amber-500/20' : 'bg-primary/20',
    sidebarIconColor: isCommercial ? 'text-amber-400' : 'text-primary',
    bulletColor: isCommercial ? 'text-amber-400' : 'text-primary',
    ctaBg: isCommercial ? 'bg-amber-500 hover:bg-amber-500/90 hover:shadow-amber-500/25' : 'bg-primary hover:bg-primary/90 hover:shadow-primary/25',
    ctaText: isCommercial ? 'text-black' : 'text-primary-foreground',
    barGradient: isCommercial
      ? 'bg-gradient-to-r from-transparent via-amber-500 to-transparent'
      : 'bg-gradient-to-r from-transparent via-primary to-transparent',
    menuBorder: isCommercial ? 'border-amber-500/20' : 'border-primary/20',
    badgeHoverBg: isCommercial ? 'group-hover/badge:bg-amber-500/20' : 'group-hover/badge:bg-primary/20',
    badgeHoverIcon: isCommercial ? 'group-hover/badge:text-amber-400' : 'group-hover/badge:text-primary',
    pulseDot: isCommercial ? 'bg-amber-400' : 'bg-primary',
  };

  return (
    <div className={`w-[920px] bg-gradient-to-br from-[#1a1a1a] via-[#222222] to-[#1a1a1a] rounded-xl shadow-2xl border ${accent.menuBorder} overflow-hidden relative`}>
      {/* Gradient top bar with left/right dim effect */}
      <div className={`h-1 ${accent.barGradient}`} />

      {/* Seasonal floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <SeasonalParticles season={season} />
      </div>

      {/* Subtle radial glow overlays (matches nav bar dim effects) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.06)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(147,197,253,0.04)_0%,transparent_50%)]" />
      </div>

      <div className="flex relative">
        {/* ---- 3 Service Columns ---- */}
        <div className="flex-1 p-5 grid grid-cols-3 gap-6">
          {columns.map((col) => {
            const ColIcon = col.icon;
            return (
              <div key={col.heading} className="space-y-3">
                {/* Column header — static, no hover effect */}
                <div className={`flex items-center gap-2 pb-2.5 border-b ${accent.headerBorder}`}>
                  <div className={`p-1.5 ${accent.headerBg} rounded-lg`}>
                    <ColIcon className={`h-4 w-4 ${accent.iconColor}`} />
                  </div>
                  <span className={`text-xs font-bold ${accent.headerText} tracking-widest uppercase`}>{col.heading}</span>
                </div>

                {/* Service items — hovered item + related upsell items highlight */}
                <div className="space-y-0.5">
                  {col.items.map((item) => {
                    const ItemIcon = item.icon;
                    const active = isActivePath(item.path);
                    const related = isRelated(item);

                    return (
                      <Link
                        key={item.path + item.name}
                        href={item.path}
                        onMouseEnter={() => setHoveredItem(item)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={cn(
                          `group flex items-start gap-2.5 py-2 px-2 -mx-2 rounded-lg transition-all duration-200`,
                          active
                            ? `${accent.activeItemBg} ${accent.activeItemText}`
                            : related
                              ? 'bg-white/[0.07]'
                              : 'hover:bg-white/10 hover:translate-x-1'
                        )}
                      >
                        <ItemIcon className={cn(
                          `h-3.5 w-3.5 mt-0.5 flex-shrink-0 transition-colors`,
                          active
                            ? accent.activeItemText
                            : related
                              ? 'text-white/60'
                              : `text-white/50 ${accent.hoverText}`
                        )} />
                        <div className="min-w-0">
                          <span className={cn(
                            `block text-sm leading-tight transition-colors`,
                            active
                              ? `${accent.activeItemText} font-semibold`
                              : related
                                ? 'text-white/80 font-medium'
                                : `text-white font-medium ${accent.hoverText}`
                          )}>
                            {item.name}
                          </span>
                          <span className={cn(
                            "block text-[11px] leading-tight mt-0.5 transition-colors",
                            related ? 'text-white/50' : 'text-white/40 group-hover:text-white/60'
                          )}>
                            {item.description}
                          </span>
                        </div>
                        {active && (
                          <div className={`ml-auto mt-1 w-1.5 h-1.5 ${accent.pulseDot} rounded-full animate-pulse flex-shrink-0`} />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ---- Sidebar Panel (dynamic — updates on service hover) ---- */}
        <div className="w-[240px] bg-white/5 border-l border-white/10 p-5 flex flex-col">
          {/* Icon + heading */}
          <div className="flex items-center gap-2 mb-3 transition-all duration-200">
            <div className={`p-2 ${accent.sidebarIconBg} rounded-lg transition-colors duration-200`}>
              <ActiveSidebarIcon className={`h-5 w-5 ${accent.sidebarIconColor} transition-colors duration-200`} />
            </div>
            <h3 className="text-sm font-bold text-white leading-tight">{activeSidebar.heading}</h3>
          </div>

          {/* Description */}
          <p className="text-[11px] text-white/50 leading-relaxed mb-3">
            {activeSidebar.description}
          </p>

          {/* Bullet list */}
          <ul className="space-y-1.5 mb-4">
            {activeSidebar.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-[11px] text-white/70">
                <CheckCircle2 className={`h-3 w-3 ${accent.bulletColor} flex-shrink-0 mt-0.5`} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* CTA button */}
          <Link
            href={activeSidebar.ctaHref}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 ${accent.ctaBg} ${accent.ctaText} text-sm font-bold rounded-xl hover:scale-105 transition-all shadow-lg mb-2`}
          >
            {activeSidebar.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>

          {/* Footnote */}
          <p className="text-[10px] text-white/30 text-center mb-4">
            {activeSidebar.footnote}
          </p>

          {/* Trust badges */}
          <div className="mt-auto space-y-2 pt-3 border-t border-white/10">
            {activeSidebar.badges.map((badge) => {
              const BadgeIcon = badge.icon;
              return (
                <div key={badge.label} className="flex items-center gap-2 group/badge">
                  <div className={`p-1 bg-white/10 rounded ${accent.badgeHoverBg} transition-colors`}>
                    <BadgeIcon className={`h-3 w-3 text-white/50 ${accent.badgeHoverIcon} transition-colors`} />
                  </div>
                  <span className="text-[10px] text-white/50 group-hover/badge:text-white/80 transition-colors">{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Navigation Component
// ---------------------------------------------------------------------------
interface NavigationProps {
  showPromoBanner?: boolean;
}

export default function Navigation({ showPromoBanner = false }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [residentialOpen, setResidentialOpen] = useState(false);
  const [commercialOpen, setCommercialOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const pathname = usePathname();
  const isCondensed = useScrollCondense();

  // Track banner height + scroll to offset the fixed nav below the banner
  const bannerRef = useRef<HTMLDivElement>(null);
  const [navTop, setNavTop] = useState(0);

  useEffect(() => {
    if (!showPromoBanner) { setNavTop(0); return; }

    const update = () => {
      const bh = bannerRef.current?.offsetHeight ?? 0;
      setNavTop(Math.max(0, bh - window.scrollY));
    };

    // ResizeObserver for banner height changes (e.g. dismiss)
    const ro = new ResizeObserver(update);
    if (bannerRef.current) ro.observe(bannerRef.current);

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => { ro.disconnect(); window.removeEventListener('scroll', update); };
  }, [showPromoBanner]);

  // Close sibling menus when opening one — prevents overlap jitter
  const openResidential = useCallback(() => { setCommercialOpen(false); setAboutOpen(false); setResidentialOpen(true); }, []);
  const openCommercial = useCallback(() => { setResidentialOpen(false); setAboutOpen(false); setCommercialOpen(true); }, []);
  const openAbout = useCallback(() => { setResidentialOpen(false); setCommercialOpen(false); setAboutOpen(true); }, []);

  const { activeSeason } = useSeasonalTheme();

  const isActivePath = (path: string) => pathname === path;

  // Season-adaptive nav colors — slightly darker than hero to differentiate
  const navTheme = {
    winter: {
      bg: 'bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950',
      border: 'border-cyan-500/20',
      hoverText: 'hover:text-cyan-300',
      accentText: 'text-cyan-400',
      accentBg: 'bg-cyan-500/20',
      accentBgHover: 'group-hover:bg-cyan-500/30',
      ctaFrom: 'from-cyan-500',
      ctaTo: 'to-teal-400',
      ctaShadow: 'shadow-cyan-500/25',
      ctaShadowHover: 'hover:shadow-cyan-500/40',
      phoneBorder: 'border-white/20',
      phoneBorderHover: 'hover:border-cyan-400/40',
      glowLine: 'via-cyan-400/30',
      ambientGlow: 'rgba(56, 189, 248, 0.06)',
    },
    summer: {
      bg: 'bg-gradient-to-r from-[#0f2a1a] via-[#142e1e] to-[#1a3a2a]',
      border: 'border-green-500/20',
      hoverText: 'hover:text-green-300',
      accentText: 'text-green-400',
      accentBg: 'bg-green-500/20',
      accentBgHover: 'group-hover:bg-green-500/30',
      ctaFrom: 'from-green-500',
      ctaTo: 'to-emerald-400',
      ctaShadow: 'shadow-green-500/25',
      ctaShadowHover: 'hover:shadow-green-500/40',
      phoneBorder: 'border-white/20',
      phoneBorderHover: 'hover:border-green-400/40',
      glowLine: 'via-green-400/30',
      ambientGlow: 'rgba(74, 222, 128, 0.05)',
    },
    fall: {
      bg: 'bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950',
      border: 'border-amber-500/20',
      hoverText: 'hover:text-amber-300',
      accentText: 'text-amber-400',
      accentBg: 'bg-amber-500/20',
      accentBgHover: 'group-hover:bg-amber-500/30',
      ctaFrom: 'from-amber-500',
      ctaTo: 'to-orange-400',
      ctaShadow: 'shadow-amber-500/25',
      ctaShadowHover: 'hover:shadow-amber-500/40',
      phoneBorder: 'border-white/20',
      phoneBorderHover: 'hover:border-amber-400/40',
      glowLine: 'via-amber-400/30',
      ambientGlow: 'rgba(251, 191, 36, 0.05)',
    },
  } as const;
  const t = navTheme[activeSeason] ?? navTheme.summer;

  return (
    <>
    {showPromoBanner && (
      <div ref={bannerRef}>
        <PromoBanner />
      </div>
    )}
    <div className="fixed left-0 right-0 z-50" style={{ top: navTop }}>
    <nav className={cn("border-b shadow-lg nav-seasonal relative", t.bg, t.border)}>
      {/* Cinematic effects container — overflow-hidden so glow doesn't bleed, but nav itself can show dropdowns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Ambient center glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-20 rounded-full blur-3xl"
          style={{ background: `radial-gradient(ellipse, ${t.ambientGlow}, transparent)` }}
        />
        {/* Bottom accent glow line */}
        <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${t.glowLine} to-transparent`} />
      </div>
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className={cn("flex items-center justify-between transition-all duration-300", isCondensed ? "h-14 md:h-15 lg:h-16" : "h-16 md:h-18 lg:h-20")}>
          {/* ---- Logo ---- */}
          <Link href="/" className="flex items-center group flex-shrink-0 -my-4">
            <img
              alt="TotalGuard Yard Care - Professional Lawn Care Services in Madison Wisconsin"
              src="/images/totalguard-logo-summer.png"
              className={cn(
                "w-auto hover:scale-105 transition-all duration-300",
                isCondensed ? "h-[6.5rem] md:h-[7.5rem] lg:h-[8.5rem]" : "h-32 md:h-36 lg:h-40"
              )}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </Link>

          {/* ---- Desktop Navigation ---- */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Residential Services Mega Menu */}
            <div
              className="relative"
              onMouseEnter={openResidential}
              onMouseLeave={() => setResidentialOpen(false)}
            >
              <button className={`flex items-center text-white/90 ${t.hoverText} transition-all font-semibold text-sm tracking-wide px-4 py-2 rounded-lg hover:bg-white/5`}>
                Residential Services
                <ChevronDown className={`ml-1.5 h-4 w-4 transition-transform duration-200 ${residentialOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {residentialOpen && (
                  <motion.div
                    key="residential-mega"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 pt-2 z-[100]"
                  >
                    <MegaMenu
                      columns={residentialColumns}
                      sidebar={residentialSidebar}
                      season={activeSeason}
                      isActivePath={isActivePath}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Commercial Services Mega Menu */}
            <div
              className="relative"
              onMouseEnter={openCommercial}
              onMouseLeave={() => setCommercialOpen(false)}
            >
              <button className={`flex items-center text-white/90 ${t.hoverText} transition-all font-semibold text-sm tracking-wide px-4 py-2 rounded-lg hover:bg-white/5`}>
                Commercial Services
                <ChevronDown className={`ml-1.5 h-4 w-4 transition-transform duration-200 ${commercialOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {commercialOpen && (
                  <motion.div
                    key="commercial-mega"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 pt-2 z-[100]"
                  >
                    <MegaMenu
                      columns={commercialColumns}
                      sidebar={commercialSidebar}
                      season={activeSeason}
                      isActivePath={isActivePath}
                      variant="commercial"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Portfolio link (no dropdown) */}
            <Link
              href="/gallery"
              className={`text-white/90 ${t.hoverText} hover:bg-white/5 transition-all font-semibold text-sm tracking-wide px-4 py-2 rounded-lg`}
            >
              Portfolio
            </Link>

            {/* About Us Dropdown */}
            <div
              className="relative"
              onMouseEnter={openAbout}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button className={`flex items-center text-white/90 ${t.hoverText} transition-all font-semibold text-sm tracking-wide px-4 py-2 rounded-lg hover:bg-white/5`}>
                About Us
                <ChevronDown className={`ml-1.5 h-4 w-4 transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {aboutOpen && (
                  <motion.div
                    key="about-dropdown"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 pt-2 z-[100]"
                  >
                    <div className="w-56 bg-gradient-to-br from-[#1a1a1a] via-[#222222] to-[#1a1a1a] rounded-xl shadow-2xl border border-primary/20 overflow-hidden relative">
                      {/* Edge-dimmed gradient bar */}
                      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                      {/* Radial glow overlays */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.06)_0%,transparent_50%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(147,197,253,0.04)_0%,transparent_50%)]" />
                      </div>

                      <div className="p-2 relative">
                        {aboutPages.map((page) => (
                          <Link
                            key={page.path}
                            href={page.path}
                            className={`block px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                              isActivePath(page.path)
                                ? 'bg-primary/20 text-primary font-semibold'
                                : 'text-white/90 hover:bg-white/10 hover:translate-x-1'
                            }`}
                          >
                            {page.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ---- Desktop Right Side (Phone + CTA) ---- */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            <a
              href="tel:608-535-6057"
              className={`flex items-center gap-2 border ${t.phoneBorder} rounded-full px-4 py-2 text-white ${t.hoverText} ${t.phoneBorderHover} transition-all font-bold text-sm xl:text-base group`}
            >
              <div className={`${t.accentBg} p-1.5 rounded-full ${t.accentBgHover} transition-colors`}>
                <Phone className={`h-4 w-4 ${t.accentText}`} />
              </div>
              <span>(608) 535-6057</span>
            </a>
            <Link
              href="/contact"
              className={`flex items-center gap-2 bg-gradient-to-r ${t.ctaFrom} ${t.ctaTo} text-white font-bold text-sm xl:text-base px-5 xl:px-7 py-2.5 rounded-full shadow-lg ${t.ctaShadow} hover:shadow-xl ${t.ctaShadowHover} hover:scale-105 transition-all`}
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* ---- Mobile Menu Button ---- */}
          <div className="flex items-center gap-1 sm:gap-2 lg:hidden">
            <a
              href="tel:608-535-6057"
              className={`p-2.5 rounded-full ${t.accentBg} hover:opacity-80 transition-all tap-target flex items-center justify-center`}
            >
              <Phone className={`h-5 w-5 ${t.accentText}`} />
            </a>
            <button
              className={`p-2.5 text-white ${t.hoverText} hover:bg-white/10 transition-all rounded-lg tap-target flex items-center justify-center`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* ---- Mobile Menu ---- */}
        <MobileNavMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      </div>
    </nav>
    </div>
    {/* Spacer to offset fixed header */}
    <div className="h-16 md:h-18 lg:h-20" />
    </>
  );
}
