'use client';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, CheckCircle2, ArrowRight, Star, Zap, Leaf, Droplets, Clock, Phone, Mail, Calendar, Snowflake, Crown, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface SelectedService {
  title: string;
  message: string;
}

interface ServiceUpsellDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedService?: SelectedService | null;
}

// Package details for snow removal bundles
const snowPackageDetails: Record<string, {
  name: string;
  icon: typeof Snowflake;
  tagline: string;
  features: string[];
  responseTime: string;
  badgeColor: string;
  isCommercial?: boolean;
}> = {
  'Essential Snow Removal (Per-Visit)': {
    name: 'Essential',
    icon: Snowflake,
    tagline: 'Per-Visit Service',
    features: ['Driveway & walkway clearing', 'Salt treatment included', 'Pay-as-you-go flexibility'],
    responseTime: '12 hours',
    badgeColor: 'bg-slate-800 text-white'
  },
  'Premium Seasonal Snow Contract': {
    name: 'Premium',
    icon: Crown,
    tagline: 'Seasonal Contract',
    features: ['Priority 24/7 response', 'Unlimited visits all season', 'Full property coverage', 'Premium ice management'],
    responseTime: '2-4 hours',
    badgeColor: 'bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-900'
  },
  'Commercial Snow Removal Quote': {
    name: 'Commercial',
    icon: Shield,
    tagline: 'Business Priority',
    features: ['Commercial-grade equipment', 'Parking lot clearing', '24/7 emergency response', 'Liability documentation'],
    responseTime: '1-2 hours',
    badgeColor: 'bg-gradient-to-r from-amber-600 to-yellow-500 text-amber-950',
    isCommercial: true
  }
};

export function ServiceUpsellDialog({ open, onOpenChange, selectedService }: ServiceUpsellDialogProps) {
  const trackServiceClick = async (serviceName: string, servicePath: string) => {
    try {
      await supabase.from('upsell_clicks').insert({
        service_name: serviceName,
        service_path: servicePath,
        referrer_page: window.location.pathname,
        session_id: localStorage.getItem('chat_session_id') || 'unknown'
      });
    } catch (error) {
      console.error('Failed to track upsell click:', error);
    }
  };

  // Check if this is a snow removal package
  const packageDetails = selectedService ? snowPackageDetails[selectedService.title] : null;
  const isSnowPackage = !!packageDetails;

  const popularServices = [
    {
      icon: Leaf,
      title: "Lawn Mowing",
      description: "Keep your lawn perfectly manicured with weekly cuts",
      savings: "Save 15%",
      path: "/services/mowing",
      badge: "Most Popular",
      features: ["Weekly service", "Edge trimming included", "Clippings removed"]
    },
    {
      icon: Droplets,
      title: "Gutter Cleaning",
      description: "Protect your home from water damage this season",
      savings: "10% Off Now",
      path: "/services/gutter-cleaning",
      badge: "Seasonal Special",
      features: ["Complete cleaning", "Downspout flushing", "Free inspection"]
    },
    {
      icon: Sparkles,
      title: "Spring Cleanup",
      description: "Get your yard ready for the growing season",
      savings: "Bundle & Save",
      path: "/services/spring-cleanup",
      badge: "Best Value",
      features: ["Full yard cleanup", "Bed preparation", "Debris removal"]
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Header Section */}
        <div className={cn(
          "text-white p-4 sm:p-6 md:p-8 text-center relative overflow-hidden",
          isSnowPackage && packageDetails?.isCommercial
            ? "bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]"
            : isSnowPackage
              ? "bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700"
              : "bg-gradient-to-br from-primary via-primary/90 to-primary/80"
        )}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
          <div className="relative z-10">
            <div className={cn(
              "inline-flex items-center backdrop-blur-sm border px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4",
              isSnowPackage && packageDetails?.isCommercial
                ? "bg-amber-500/20 border-amber-400/30 text-amber-300"
                : "bg-white/20 border-white/30 text-white"
            )}>
              <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Request Submitted Successfully!
            </div>
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 sm:mb-3">
              Thank You! Your Quote is On The Way
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-95 max-w-2xl mx-auto px-2">
              {isSnowPackage
                ? `We've received your ${packageDetails?.name} package request and will contact you shortly.`
                : "While we prepare your personalized quote, check out these exclusive deals available only to new customers"
              }
            </p>
          </div>
        </div>

        {/* Package Confirmation Section (for snow packages) */}
        {isSnowPackage && packageDetails && (
          <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200">
            <div className="max-w-2xl mx-auto">
              {/* Package Summary Card */}
              <div className={cn(
                "rounded-2xl p-5 sm:p-6 mb-5",
                packageDetails.isCommercial
                  ? "bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white"
                  : "bg-white border-2 border-blue-200 shadow-lg"
              )}>
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "rounded-xl p-3 flex-shrink-0",
                    packageDetails.isCommercial
                      ? "bg-amber-500/20"
                      : "bg-blue-100"
                  )}>
                    <packageDetails.icon className={cn(
                      "h-6 w-6 sm:h-8 sm:w-8",
                      packageDetails.isCommercial ? "text-amber-400" : "text-blue-600"
                    )} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn("text-xs font-bold uppercase px-2 py-0.5 rounded-full", packageDetails.badgeColor)}>
                        {packageDetails.name}
                      </span>
                    </div>
                    <h3 className={cn(
                      "text-lg sm:text-xl font-bold mb-2",
                      packageDetails.isCommercial ? "text-white" : "text-slate-900"
                    )}>
                      {packageDetails.tagline}
                    </h3>
                    <ul className="space-y-1.5">
                      {packageDetails.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className={cn(
                            "h-4 w-4 flex-shrink-0",
                            packageDetails.isCommercial ? "text-amber-400" : "text-blue-600"
                          )} />
                          <span className={packageDetails.isCommercial ? "text-slate-300" : "text-slate-600"}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Next Steps Timeline */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  What Happens Next
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-200">
                    <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">Review</p>
                      <p className="text-xs text-slate-500">We review your property details</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-200">
                    <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">Contact</p>
                      <p className="text-xs text-slate-500">We call within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-200">
                    <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">Schedule</p>
                      <p className="text-xs text-slate-500">Lock in your service date</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time Guarantee */}
              <div className="mt-5 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
                <div className="bg-emerald-100 rounded-full p-2">
                  <Clock className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-bold text-emerald-800 text-sm">Estimated Response Time</p>
                  <p className="text-emerald-700 text-xs">
                    You&apos;ll hear from us within <span className="font-bold">24 hours</span>.
                    Once active, snow response is within <span className="font-bold">{packageDetails.responseTime}</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Services Grid */}
        <div className="p-3 sm:p-6 md:p-8 bg-background">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 text-primary font-bold mb-2 sm:mb-3 text-sm sm:text-base">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-primary" />
              <span>{isSnowPackage ? "Complement Your Winter Protection" : "Book Now & Save Big"}</span>
              <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-primary" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              {isSnowPackage ? "Add More Services & Save" : "Our Most Popular Services"}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground px-2">
              Limited time offers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
            {popularServices.map((service, index) => (
              <div
                key={index}
                className="group relative bg-card border-2 border-border hover:border-primary rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Badge */}
                <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-0.5 sm:px-4 sm:py-1 rounded-full text-xs font-bold shadow-lg">
                  {service.badge}
                </div>

                {/* Icon */}
                <div className="bg-primary/10 rounded-2xl w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <service.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>

                {/* Content */}
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-foreground text-center mb-2">
                  {service.title}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground text-center mb-3 sm:mb-4">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-foreground">
                      <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Savings Badge */}
                <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-lg p-2 sm:p-3 text-center mb-3 sm:mb-4">
                  <p className="text-primary font-bold text-base sm:text-lg">{service.savings}</p>
                  <p className="text-xs text-muted-foreground">When you book today</p>
                </div>

                {/* CTA */}
                <Link href={service.path}>
                  <Button
                    className="w-full text-sm sm:text-base font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    size="sm"
                    onClick={() => {
                      trackServiceClick(service.title, service.path);
                      onOpenChange(false);
                    }}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 rounded-2xl p-4 sm:p-6 text-center">
            <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2">
              {isSnowPackage ? "Need Immediate Assistance?" : "Want to discuss your specific needs?"}
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 px-2">
              {isSnowPackage
                ? "Call us now to fast-track your snow removal setup or ask any questions"
                : "Our team will call you within 24 hours to go over your quote and answer any questions"
              }
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
              <a href="tel:608-535-6057" className="w-full sm:w-auto">
                <Button size="lg" className="font-bold w-full sm:w-auto text-sm sm:text-base">
                  <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Call Now: (608) 535-6057
                </Button>
              </a>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="font-bold w-full sm:w-auto text-sm sm:text-base"
              >
                {isSnowPackage ? "Done" : "I'll Wait for My Quote"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
