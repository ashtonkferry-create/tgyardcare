'use client';

import { AlertCircle, CheckCircle2, Home, Users, Clock, Shield, Heart, Briefcase, DollarSign, Sparkles, Calendar } from "lucide-react";
import { ScrollReveal } from './ScrollReveal';
import { GlassCard } from './GlassCard';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import { cn } from '@/lib/utils';

// ===============================
// INTERFACE DEFINITIONS
// ===============================

export interface ResidentialSectionsProps {
  serviceName: string;
  problemPoints?: string[];
  solutionPoints?: string[];
}

export interface HomeownerType {
  title: string;
  description: string;
}

export interface Expectation {
  title: string;
  description: string;
}

export interface ResidentialHomeownerTypesSectionProps {
  serviceName: string;
  homeownerTypes?: HomeownerType[];
}

export interface ResidentialExpectationsSectionProps {
  serviceName: string;
  expectations?: Expectation[];
}

// ===============================
// SEASONAL ACCENTS
// ===============================

const seasonalCheckColor = {
  summer: 'text-emerald-500',
  fall: 'text-amber-500',
  winter: 'text-cyan-400',
} as const;

const seasonalSectionBg = {
  summer: '#0a1a0e',
  fall: '#1a1000',
  winter: '#060f1a',
} as const;

// ===============================
// DEFAULT DATA
// ===============================

const defaultProblemPoints: string[] = [
  "Providers who ghost after the first month\u2014no communication, no explanation, no service",
  "Different crew every visit\u2014no one knows your property, your preferences, or your gate code",
  "Quotes that expand after work begins\u2014\u201cwe found extra work\u201d becomes a recurring theme",
  "Rushed execution with visible corners cut\u2014uneven edges, missed spots, debris left behind",
  "No response system\u2014calls go to voicemail, texts ignored, issues unresolved for weeks"
];

const defaultSolutionPoints: string[] = [
  "Crew assignment locked\u2014same 2-person team handles your property every scheduled visit",
  "Service confirmations via text before arrival and completion photos after every job",
  "Written scope with flat-rate pricing\u2014quote matches invoice, no exceptions",
  "Quality walk before departure\u2014crew lead inspects work against scope checklist",
  "48-hour issue resolution\u2014text a photo, we acknowledge same day, return to fix for free"
];

const defaultHomeownerTypes: HomeownerType[] = [
  {
    title: "Busy Professionals & Parents",
    description: "Scheduled service means your yard is handled without coordination. No calls, no reminders needed."
  },
  {
    title: "Rental & Investment Property Owners",
    description: "Documented service with photos. Consistent maintenance that protects property value."
  },
  {
    title: "Homeowners Switching Providers",
    description: "Structured operations with accountability. Systems replace guesswork."
  },
  {
    title: "Those Preparing to Sell",
    description: "Documented curb appeal improvements. Before/after records for buyer confidence."
  }
];

const defaultExpectations: Expectation[] = [
  {
    title: "Scheduled Day + Time Window",
    description: "Service day locked. Same window each visit. Weather delays communicated by 8am."
  },
  {
    title: "Assigned 2-Person Crew",
    description: "Your crew knows your property. No substitutes without advance notice."
  },
  {
    title: "Written Scope, Flat Pricing",
    description: "Quote itemizes work. Invoice matches quote. No add-ons without approval."
  },
  {
    title: "Completion Verification",
    description: "Crew walks property before leaving. Photos available upon request."
  },
  {
    title: "Same-Day Rescheduling",
    description: "Text to reschedule. Confirmation sent within 2 hours."
  },
  {
    title: "Seasonal Recommendations",
    description: "Proactive guidance on aeration, fertilization, and cleanups\u2014timed to your property."
  }
];

// ===============================
// COMPONENTS
// ===============================

export function ResidentialProblemSection({
  serviceName,
  problemPoints = defaultProblemPoints
}: ResidentialSectionsProps) {
  const { activeSeason } = useSeasonalTheme();
  return (
    <section className="py-14 md:py-20" style={{ background: seasonalSectionBg[activeSeason] }}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-start sm:items-center gap-3 mb-4 md:mb-6">
              <div className="bg-destructive/10 rounded-full p-2.5 md:p-3 flex-shrink-0">
                <AlertCircle className="h-5 w-5 md:h-6 md:w-6 text-destructive" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                The Homeowner&apos;s {serviceName} Struggle
              </h2>
            </div>
            <p className="text-white/60 mb-8 md:mb-10 text-base md:text-lg leading-relaxed">
              These aren&apos;t rare events&mdash;they&apos;re the industry standard. Finding a provider with actual systems is harder than it should be.
            </p>
          </ScrollReveal>

          <div className="space-y-3 md:space-y-4">
            {problemPoints.map((point, index) => (
              <ScrollReveal key={index} delay={index * 0.06}>
                <div className="flex items-start gap-3 bg-white/[0.06] backdrop-blur-sm p-4 md:p-5 rounded-xl border border-destructive/10 hover:border-destructive/25 hover:shadow-lg transition-all duration-300">
                  <div className="bg-destructive/10 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                    <AlertCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-destructive" />
                  </div>
                  <span className="text-sm md:text-base text-white leading-relaxed">{point}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ResidentialSolutionSection({
  serviceName,
  solutionPoints = defaultSolutionPoints
}: ResidentialSectionsProps) {
  const { activeSeason } = useSeasonalTheme();
  const checkColor = seasonalCheckColor[activeSeason];

  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-start sm:items-center gap-3 mb-4 md:mb-6">
              <div className="bg-primary/10 rounded-full p-2.5 md:p-3 flex-shrink-0">
                <Shield className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                How TotalGuard Is Different
              </h2>
            </div>
            <p className="text-white/60 mb-8 md:mb-10 text-base md:text-lg leading-relaxed">
              TotalGuard operates with documented processes. Here&apos;s how each one works.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {solutionPoints.map((point, index) => (
              <ScrollReveal key={index} delay={index * 0.08}>
                <GlassCard variant="default" hover="glow" accentBorder className="h-full">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className={cn('h-5 w-5 mt-0.5 flex-shrink-0', checkColor)} />
                    <span className="text-sm md:text-base text-white leading-relaxed">{point}</span>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ResidentialHomeownerTypesSection({
  serviceName,
  homeownerTypes = defaultHomeownerTypes
}: ResidentialHomeownerTypesSectionProps) {
  const icons = [Briefcase, Home, Heart, DollarSign];
  const { activeSeason } = useSeasonalTheme();
  const checkColor = seasonalCheckColor[activeSeason];

  return (
    <section className="py-14 md:py-20" style={{ background: seasonalSectionBg[activeSeason] }}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-4 md:mb-6 sm:justify-center">
              <div className="bg-primary/10 rounded-full p-2.5 md:p-3 flex-shrink-0">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                Who This Service Is For
              </h2>
            </div>
            <p className="text-white/60 mb-8 md:mb-10 text-base md:text-lg text-left sm:text-center max-w-3xl mx-auto leading-relaxed">
              We work with homeowners who value their time and want a provider they can actually count on.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {homeownerTypes.map((type, index) => {
              const IconComponent = icons[index % icons.length];
              return (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <GlassCard hover="lift" accentBorder className="h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <IconComponent className={cn('h-5 w-5 flex-shrink-0', checkColor)} />
                      <h3 className="font-bold text-white text-sm md:text-base">{type.title}</h3>
                    </div>
                    <p className="text-xs md:text-sm text-white/60 leading-relaxed">{type.description}</p>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ResidentialExpectationsSection({
  serviceName,
  expectations = defaultExpectations
}: ResidentialExpectationsSectionProps) {
  const icons = [Calendar, Users, Sparkles, Shield, Clock, Heart];
  const { activeSeason } = useSeasonalTheme();
  const checkColor = seasonalCheckColor[activeSeason];

  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-left sm:text-center mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 leading-tight">
                What You Can Expect
              </h2>
              <p className="text-white/60 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                Not promises&mdash;standards. Here&apos;s what working with TotalGuard actually looks like.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {expectations.map((expectation, index) => {
              const IconComponent = icons[index % icons.length];
              return (
                <ScrollReveal key={index} delay={index * 0.08}>
                  <GlassCard hover="lift" className="h-full">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full p-2 flex-shrink-0">
                        <IconComponent className={cn('h-4 w-4', checkColor)} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1 text-sm md:text-base">{expectation.title}</h3>
                        <p className="text-xs md:text-sm text-white/60 leading-relaxed">{expectation.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
