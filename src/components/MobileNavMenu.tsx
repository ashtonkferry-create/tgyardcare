'use client';

import Link from "next/link";
import {
  Phone,
  Snowflake,
  Scissors,
  Home,
  ArrowRight,
  Shield,
  Users,
  Clock,
  MapPin,
  Leaf,
  Sparkles,
  X,
  Sprout,
  Flower2,
  Trees,
  SprayCan,
  CircleDot,
  Trash2,
  CloudRain,
  Droplets,
  Calendar,
  ChevronDown,
  Layers,
  type LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSeasonalTheme } from "@/contexts/SeasonalThemeContext";
import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

interface MobileNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ServiceItem {
  name: string;
  path: string;
  icon: LucideIcon;
  winterOnly?: boolean;
}

// Static data - defined outside component to prevent recreation
const serviceCategories: {
  category: string;
  icon: LucideIcon;
  services: ServiceItem[];
}[] = [
  {
    category: "Lawn Care",
    icon: Sprout,
    services: [
      { name: "Lawn Mowing", path: "/services/mowing", icon: Scissors },
      { name: "Fertilization", path: "/services/fertilization", icon: SprayCan },
      { name: "Aeration", path: "/services/aeration", icon: CircleDot },
      { name: "Weed Control", path: "/services/herbicide", icon: Leaf },
    ]
  },
  {
    category: "Landscaping",
    icon: Flower2,
    services: [
      { name: "Garden Beds", path: "/services/garden-beds", icon: Flower2 },
      { name: "Mulching", path: "/services/mulching", icon: Trees },
      { name: "Pruning", path: "/services/pruning", icon: Scissors },
      { name: "Weeding", path: "/services/weeding", icon: Leaf },
    ]
  },
  {
    category: "Seasonal",
    icon: Calendar,
    services: [
      { name: "Spring Cleanup", path: "/services/spring-cleanup", icon: Sparkles },
      { name: "Fall Cleanup", path: "/services/fall-cleanup", icon: CloudRain },
      { name: "Leaf Removal", path: "/services/leaf-removal", icon: Trash2 },
      { name: "Snow Removal", path: "/services/snow-removal", icon: Snowflake, winterOnly: true },
    ]
  },
  {
    category: "Gutters",
    icon: Droplets,
    services: [
      { name: "Gutter Cleaning", path: "/services/gutter-cleaning", icon: Home },
      { name: "Gutter Guards", path: "/services/gutter-guards", icon: Shield },
    ]
  },
  {
    category: "Hardscaping",
    icon: Layers,
    services: [
      { name: "Hardscaping Services", path: "/services/hardscaping", icon: Layers },
    ]
  }
];

const commercialServices = [
  { name: "Lawn Maintenance", path: "/commercial/lawn-care" },
  { name: "Seasonal Cleanup", path: "/commercial/seasonal" },
  { name: "Gutter Services", path: "/commercial/gutters" },
  { name: "Property Enhancement", path: "/commercial/property-enhancement" },
  { name: "Fertilization & Weed Control", path: "/commercial/fertilization-weed-control" },
  { name: "Aeration", path: "/commercial/aeration" },
  { name: "Snow Removal", path: "/commercial/snow-removal", winterOnly: true },
];

const aboutPages = [
  { name: "Portfolio", path: "/gallery" },
  { name: "About", path: "/about" },
  { name: "Meet Our Team", path: "/team" },
  { name: "Service Areas", path: "/service-areas" },
  { name: "FAQ", path: "/faq" },
  { name: "Blog", path: "/blog" },
  { name: "Careers", path: "/careers" },
];

const trustBadges = [
  { icon: Shield, label: "Insured" },
  { icon: MapPin, label: "Local" },
  { icon: Clock, label: "24/7" },
  { icon: Users, label: "500+" },
];

const popularServices = [
  { name: "Mowing", path: "/services/mowing", icon: Scissors },
  { name: "Snow", path: "/services/snow-removal", icon: Snowflake, winterOnly: true },
  { name: "Gutters", path: "/services/gutter-cleaning", icon: Home },
  { name: "Cleanup", path: "/services/fall-cleanup", icon: Leaf },
];

export function MobileNavMenu({ isOpen, onClose }: MobileNavMenuProps) {
  const { activeSeason } = useSeasonalTheme();
  const pathname = usePathname();
  const isWinter = activeSeason === 'winter';
  const [mounted, setMounted] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [commercialOpen, setCommercialOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  // Memoized handlers to prevent re-creation
  const toggleCategory = useCallback((cat: string) => {
    setOpenCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  }, []);

  const toggleCommercial = useCallback(() => setCommercialOpen(p => !p), []);
  const toggleAbout = useCallback(() => setAboutOpen(p => !p), []);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const filteredPopular = popularServices.filter(s => !s.winterOnly || isWinter);

  const menuContent = (
    <div className="lg:hidden fixed inset-0" style={{ zIndex: 9999 }}>
      {/* Backdrop - simple opacity, no complex animation */}
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
        style={{ willChange: 'opacity' }}
      />

      {/* Menu Panel - GPU accelerated */}
      <div
        className="absolute inset-0 bg-[#0a1628] flex flex-col"
        style={{ willChange: 'transform' }}
      >

        {/* TOP HEADER */}
        <div className="flex-shrink-0 bg-[#0a1628] border-b border-white/10 px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="tel:608-535-6057" className="flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/20">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-white tracking-tight">(608) 535-6057</span>
                <span className="text-[10px] text-primary font-medium">Tap to call now</span>
              </div>
            </a>

            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* SCROLLABLE CONTENT - optimized scroll */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="px-4 py-4 space-y-4">

            {/* QUICK PICKS */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <p className="text-xs font-bold text-white uppercase tracking-wide">Quick Picks</p>
                <span className="text-[10px] text-primary/70">→ Most requested</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {filteredPopular.map((service) => {
                  const ServiceIcon = service.icon;
                  const isSnow = service.winterOnly;
                  return (
                    <Link
                      key={service.path}
                      href={service.path}
                      onClick={onClose}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold ${
                        isSnow
                          ? 'bg-sky-600/20 text-sky-300 border border-sky-400/30'
                          : 'bg-primary/15 text-white border border-primary/20'
                      }`}
                    >
                      <ServiceIcon className={`h-5 w-5 ${isSnow ? 'text-sky-400' : 'text-primary'}`} />
                      {service.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* DIVIDER */}
            <div className="h-px bg-white/10" />

            {/* RESIDENTIAL */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Residential</p>

              {serviceCategories.map((category) => {
                const CategoryIcon = category.icon;
                const catOpen = openCategories.includes(category.category);
                const visibleServices = category.services.filter(s => !s.winterOnly || isWinter);

                return (
                  <div key={category.category}>
                    <button
                      onClick={() => toggleCategory(category.category)}
                      className="flex items-center justify-between w-full p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-white">{category.category}</span>
                        <span className="text-[10px] text-white/40">({visibleServices.length})</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 text-white/50 transition-transform ${catOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {catOpen && (
                      <div className="mt-1 ml-2 pl-4 border-l border-white/10 space-y-0.5">
                        {visibleServices.map((service) => {
                          const ServiceIcon = service.icon;
                          return (
                            <Link
                              key={service.path}
                              href={service.path}
                              onClick={onClose}
                              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                                pathname === service.path
                                  ? 'text-primary font-bold border-l-2 border-primary pl-2'
                                  : service.winterOnly ? 'text-sky-400' : 'text-white/70'
                              }`}
                            >
                              <ServiceIcon className="h-3.5 w-3.5 text-white/40" />
                              {service.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* COMMERCIAL */}
            <div>
              <button
                onClick={toggleCommercial}
                className="flex items-center justify-between w-full p-3 rounded-lg bg-white/5 border border-white/10"
              >
                <span className="text-sm font-medium text-white">Commercial Services</span>
                <ChevronDown className={`h-4 w-4 text-white/50 transition-transform ${commercialOpen ? 'rotate-180' : ''}`} />
              </button>

              {commercialOpen && (
                <div className="mt-1 ml-2 pl-4 border-l border-white/10 space-y-0.5">
                  {commercialServices.filter(s => !s.winterOnly || isWinter).map((service) => (
                    <Link
                      key={service.path}
                      href={service.path}
                      onClick={onClose}
                      className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        pathname === service.path
                          ? 'text-primary font-bold border-l-2 border-primary pl-2'
                          : service.winterOnly ? 'text-sky-400' : 'text-white/70'
                      }`}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ABOUT */}
            <div>
              <button
                onClick={toggleAbout}
                className="flex items-center justify-between w-full p-3 rounded-lg bg-white/5 border border-white/10"
              >
                <span className="text-sm font-medium text-white">Company</span>
                <ChevronDown className={`h-4 w-4 text-white/50 transition-transform ${aboutOpen ? 'rotate-180' : ''}`} />
              </button>

              {aboutOpen && (
                <div className="mt-1 ml-2 pl-4 border-l border-white/10 space-y-0.5">
                  {aboutPages.map((page) => (
                    <Link
                      key={page.path}
                      href={page.path}
                      onClick={onClose}
                      className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        pathname === page.path
                          ? 'text-primary font-bold border-l-2 border-primary pl-2'
                          : 'text-white/70'
                      }`}
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* TRUST BADGES */}
            <div className="flex items-center justify-between py-3 border-t border-b border-white/10">
              {trustBadges.map((badge) => {
                const BadgeIcon = badge.icon;
                return (
                  <div key={badge.label} className="flex flex-col items-center gap-1">
                    <BadgeIcon className="h-4 w-4 text-primary" />
                    <span className="text-[10px] font-medium text-white/60">{badge.label}</span>
                  </div>
                );
              })}
            </div>

            {/* BOTTOM SPACER */}
            <div className="h-28" />
          </div>
        </div>

        {/* FIXED CTA FOOTER */}
        <div className="flex-shrink-0 absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0a1628] via-[#0a1628] to-transparent pt-8">
          <Link href="/contact" onClick={onClose} className="block">
            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base py-5 shadow-lg"
            >
              Get My Custom Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-center text-[10px] text-white/40 mt-1.5">
            Fast response • No obligation
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(menuContent, document.body);
}
