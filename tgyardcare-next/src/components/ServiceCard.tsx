'use client';

import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  image?: string;
}

export default function ServiceCard({ icon: Icon, title, description, path, image }: ServiceCardProps) {
  return (
    <Link href={path} className="block h-full group">
      <div className="relative h-full rounded-2xl overflow-hidden border border-emerald-500/10 bg-white/[0.03] backdrop-blur-sm hover:border-emerald-400/30 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500">
        {/* Image Section */}
        {image && (
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={image}
              alt={`${title} service - Professional lawn care in Madison Wisconsin by TotalGuard`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
              width="400"
              height="192"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f14] via-[#0a1f14]/40 to-transparent" />
            <div className="absolute bottom-3 left-3 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 rounded-xl w-12 h-12 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Icon className="h-6 w-6 text-emerald-300" />
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">{title}</h3>
          <p className="text-emerald-100/50 mb-4 flex-grow leading-relaxed text-sm">{description}</p>
          <span className="inline-flex items-center text-emerald-400 font-semibold text-sm group-hover:text-emerald-300 transition-colors">
            Learn More
            <span className="ml-2 group-hover:ml-3 transition-all duration-300">&rarr;</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
