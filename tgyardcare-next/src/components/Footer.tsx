'use client';

import Link from "next/link";
import { Phone, Mail, MapPin, Snowflake, Leaf, Sun, CloudRain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSeasonalTheme, Season } from "@/contexts/SeasonalThemeContext";

const footerTheme = {
  winter: {
    bg: 'bg-gradient-to-b from-slate-900 to-slate-950',
    borderTop: 'border-slate-800',
    borderInner: 'border-slate-800',
    linkHover: 'hover:text-cyan-400',
    iconColor: 'text-cyan-400',
    textColor: 'text-slate-400',
    dimText: 'text-slate-500',
    strongText: 'text-slate-400',
    seasonBg: 'bg-cyan-500/10',
    seasonText: 'text-cyan-400',
    seasonBorder: 'border-cyan-500/20',
    ctaVariant: 'bg-cyan-500 hover:bg-cyan-400 text-white',
  },
  summer: {
    bg: 'bg-gradient-to-b from-[#0f2818] to-[#071510]',
    borderTop: 'border-green-800/30',
    borderInner: 'border-green-800/20',
    linkHover: 'hover:text-green-400',
    iconColor: 'text-green-400',
    textColor: 'text-green-200/60',
    dimText: 'text-green-200/40',
    strongText: 'text-green-200/70',
    seasonBg: 'bg-green-500/10',
    seasonText: 'text-green-400',
    seasonBorder: 'border-green-500/20',
    ctaVariant: 'bg-green-600 hover:bg-green-500 text-white',
  },
  fall: {
    bg: 'bg-gradient-to-b from-stone-900 to-stone-950',
    borderTop: 'border-amber-900/30',
    borderInner: 'border-amber-900/20',
    linkHover: 'hover:text-amber-400',
    iconColor: 'text-amber-400',
    textColor: 'text-stone-400',
    dimText: 'text-stone-500',
    strongText: 'text-stone-400',
    seasonBg: 'bg-amber-500/10',
    seasonText: 'text-amber-400',
    seasonBorder: 'border-amber-500/20',
    ctaVariant: 'bg-amber-600 hover:bg-amber-500 text-white',
  },
} as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { activeSeason } = useSeasonalTheme();
  const ft = footerTheme[activeSeason] ?? footerTheme.summer;

  const seasonIcons: Record<Season, typeof Leaf> = {
    summer: Sun,
    fall: CloudRain,
    winter: Snowflake,
  };

  const seasonMessages: Record<Season, string> = {
    summer: "Keep your lawn pristine all summer.",
    fall: "Fall cleanup slots filling fast!",
    winter: "Snow contracts available — book now!",
  };

  const SeasonIcon = seasonIcons[activeSeason];

  return (
    <footer className={`${ft.bg} border-t ${ft.borderTop} pb-24 lg:pb-0`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center mb-4 group">
              <img
                alt="TotalGuard Yard Care - Madison's Premier Lawn Care Service"
                className="h-16 md:h-20 w-auto group-hover:scale-105 transition-transform"
                src="/images/totalguard-logo-full.png"
                loading="lazy"
              />
            </Link>
            <p className={`${ft.textColor} mb-3 text-sm`}>
              Madison&apos;s reliability-first lawn care company. Serving homeowners across Dane County since day one.
            </p>
            <p className={`${ft.dimText} text-xs mb-4`}>
              Proudly serving Madison, Middleton, Waunakee, Sun Prairie, Monona, Fitchburg, Verona, McFarland, DeForest, Cottage Grove, Oregon & Stoughton.
            </p>

            {/* Seasonal Message */}
            <div className={`flex items-center gap-2 ${ft.seasonBg} ${ft.seasonText} px-3 py-2 rounded-lg mb-4 text-sm font-medium border ${ft.seasonBorder}`}>
              <SeasonIcon className="h-4 w-4 flex-shrink-0" />
              <span>{seasonMessages[activeSeason]}</span>
            </div>

            <div className="flex space-x-4">
              <a href="https://facebook.com/totalguardyardcare" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Follow TotalGuard Yard Care on Facebook">
                <img
                  alt="Follow us on Facebook for lawn care tips and special offers"
                  className="h-8 w-8"
                  loading="lazy"
                  src="/lovable-uploads/a2985d40-e463-4243-b26d-149a047426fb.png"
                  width="32"
                  height="32"
                />
              </a>
              <a href="https://www.instagram.com/tgyardcare/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Follow TotalGuard Yard Care on Instagram">
                <img
                  alt="Follow us on Instagram for lawn care transformations and updates"
                  className="h-8 w-8"
                  loading="lazy"
                  src="/lovable-uploads/0d24ae3b-c2eb-4565-a7ce-f97959422e02.png"
                  width="32"
                  height="32"
                />
              </a>
            </div>
          </div>

          {/* Residential Services */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">Residential Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className={`${ft.textColor} ${ft.linkHover} transition-colors font-semibold`}>
                  All Services &rarr;
                </Link>
              </li>
              <li>
                <Link href="/services/mowing" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  Lawn Mowing
                </Link>
              </li>
              <li>
                <Link href="/services/herbicide" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  Herbicide Services
                </Link>
              </li>
              <li>
                <Link href="/services/fertilization" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  Fertilization & Overseeding
                </Link>
              </li>
              <li>
                <Link href="/services/weeding" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  Weeding
                </Link>
              </li>
              <li>
                <Link href="/services/mulching" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  Mulching
                </Link>
              </li>
              <li>
                <Link href="/services/garden-beds" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  Garden Bed Makeovers
                </Link>
              </li>
            </ul>
          </div>

          {/* Seasonal & Gutters */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">Seasonal & Gutters</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/spring-cleanup" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  Spring Cleanup
                </Link>
              </li>
              <li>
                <Link href="/services/fall-cleanup" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  Fall Cleanup
                </Link>
              </li>
              <li>
                <Link href="/services/leaf-removal" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  Leaf Removal
                </Link>
              </li>
              <li>
                <Link href="/services/gutter-cleaning" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  Gutter Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/gutter-guards" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  Gutter Guard Installation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/team" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  Meet Our Team
                </Link>
              </li>
              <li>
                <Link href="/residential" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  Residential Services
                </Link>
              </li>
              <li>
                <Link href="/commercial" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  Commercial Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/reviews" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/faq" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  Blog & Tips
                </Link>
              </li>
              <li>
                <Link href="/service-areas" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  Service Areas
                </Link>
              </li>
              <li>
                <Link href="/careers" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">Contact TotalGuard</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <Phone className={`h-4 w-4 ${ft.iconColor} mr-2 mt-0.5 flex-shrink-0`} />
                <a href="tel:608-535-6057" className={`${ft.textColor} ${ft.linkHover} transition-colors`}>
                  (608) 535-6057
                </a>
              </li>
              <li className="flex items-start">
                <Mail className={`h-4 w-4 ${ft.iconColor} mr-2 mt-0.5 flex-shrink-0`} />
                <a href="mailto:totalguardllc@gmail.com" className={`${ft.textColor} ${ft.linkHover} transition-colors break-all`}>
                  totalguardllc@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className={`h-4 w-4 ${ft.iconColor} mr-2 mt-0.5 flex-shrink-0`} />
                <span className={ft.textColor}>
                  Serving All of Dane County
                  <br />Madison, WI & Surrounding Cities
                </span>
              </li>
            </ul>
            <Link href="/contact" className="inline-block mt-4">
              <Button size="sm" className={`w-full font-semibold ${ft.ctaVariant}`}>
                Get a free quote
              </Button>
            </Link>
          </div>
        </div>

        {/* Service Areas Banner */}
        <div className={`border-t ${ft.borderInner} mt-8 pt-6`}>
          <p className={`text-center text-xs ${ft.dimText} mb-4`}>
            <strong className={ft.strongText}>Service Areas:</strong> Madison &bull; Middleton &bull; Waunakee &bull; Sun Prairie &bull; Monona &bull; Fitchburg &bull; Verona &bull; McFarland &bull; DeForest &bull; Cottage Grove &bull; Oregon &bull; Stoughton
          </p>
        </div>

        <div className={`border-t ${ft.borderInner} pt-6 text-center text-sm ${ft.dimText}`}>
          <p>&copy; {currentYear} TotalGuard Yard Care LLC. All rights reserved. | Madison, Wisconsin</p>
          <p className="mt-2">
            <Link href="/privacy" className={`${ft.linkHover} transition-colors`}>
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
