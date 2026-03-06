'use client';

import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from '@/components/CTASection';
import { GlassCard } from '@/components/GlassCard';
import { ScrollReveal } from '@/components/ScrollReveal';
import { AmbientParticles } from '@/components/AmbientParticles';
import { TrustStrip } from '@/components/TrustStrip';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import {
  Users, Award, Target, Heart,
  Sparkles, Phone, Car, Trophy, ArrowRight, Shield, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { AboutPageSchema } from "@/components/schemas/AboutPageSchema";
import { WebPageSchema } from "@/components/schemas/WebPageSchema";
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema";
import alexPortrait from "@/assets/alex-portrait.png";
import vancePortrait from "@/assets/vance-portrait.png";

const seasonalAccent = {
  summer: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', solid: '#10b981', glow: 'shadow-emerald-500/25' },
  fall:   { text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/30',   solid: '#f59e0b', glow: 'shadow-amber-500/25'   },
  winter: { text: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/30',    solid: '#06b6d4', glow: 'shadow-cyan-500/25'    },
} as const;

const seasonalBg = {
  summer: {
    hero:    'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(16,185,129,0.15) 0%, transparent 70%), linear-gradient(to bottom, #050d07, #0a1a0e, #050d07)',
    page:    '#050d07',
    section: '#0a1a0e',
  },
  fall: {
    hero:    'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,158,11,0.15) 0%, transparent 70%), linear-gradient(to bottom, #0d0900, #1a1000, #0d0900)',
    page:    '#0d0900',
    section: '#1a1000',
  },
  winter: {
    hero:    'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6,182,212,0.15) 0%, transparent 70%), linear-gradient(to bottom, #020810, #060f1a, #020810)',
    page:    '#020810',
    section: '#060f1a',
  },
} as const;

const teamMembers = [
  {
    name: "Alex",
    role: "Co-Founder",
    funFact: "Car Enthusiast 🚗",
    funFactDetail: "Probably knows more about your engine than your mechanic.",
    description: "When Alex isn't making your lawn look sharp, he's probably under the hood of a car figuring out what makes it tick. He's the kind of guy you can actually have a conversation with—no awkward small talk, just genuine and easy to work with. If you've got questions about your yard (or need a second opinion on that weird noise your car's making), he's your guy.",
    image: alexPortrait,
    strengths: ['Route optimization', 'Quality inspection', 'Client communication'],
  },
  {
    name: "Vance",
    role: "Co-Founder",
    funFact: "Volleyball at UWSP 🏐",
    funFactDetail: "Yes, he'll probably mention it. And he's earned the right to.",
    description: "Vance genuinely gets a kick out of seeing customers happy—it's kind of his thing. There's nothing better than finishing a job and knowing someone's going to pull into their driveway and smile. When he's not transforming yards, he's getting ready to play volleyball at UW-Stevens Point.",
    image: vancePortrait,
    strengths: ['Customer experience', 'Operations strategy', 'New client onboarding'],
  },
];

const values = [
  { icon: Award, title: "Quality First", description: "We never compromise on the quality of our work. Every property gets our best effort, every time." },
  { icon: Target, title: "Reliability", description: "When we say we'll be there, we'll be there. Consistent, dependable service you can count on." },
  { icon: Heart, title: "Customer Care", description: "Your satisfaction is our priority. We listen, communicate, and go the extra mile for every client." },
  { icon: Users, title: "Local Focus", description: "As Madison locals, we take pride in making our community more beautiful, one yard at a time." },
];

const whyYoungEntrepreneurs = [
  { icon: Sparkles, title: "Fresh Perspective", body: "Modern techniques and innovative solutions applied to traditional lawn care." },
  { icon: Trophy, title: "Hungry to Prove Ourselves", body: "Every job is an opportunity to exceed expectations and build our reputation." },
  { icon: Phone, title: "Tech-Savvy Communication", body: "Easy scheduling, quick responses, and transparent updates throughout the process." },
  { icon: Heart, title: "Invested in Your Satisfaction", body: "We rely on happy customers and word-of-mouth referrals — your satisfaction is our marketing." },
];

export default function TeamContent() {
  const { activeSeason } = useSeasonalTheme();
  const acc = seasonalAccent[activeSeason];
  const bg = seasonalBg[activeSeason];

  return (
    <div className="min-h-screen text-white" style={{ background: bg.page }}>
      <AboutPageSchema />
      <WebPageSchema name="Our Team" description="Meet the TotalGuard Yard Care team — locally owned lawn care in Madison, WI since 2019" url="/team" />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://tgyardcare.com" },
        { name: "Our Team", url: "https://tgyardcare.com/team" }
      ]} />
      <Navigation />

      {/* SEO hidden text */}
      <section className="sr-only">
        <h2>Meet the TotalGuard Yard Care Team</h2>
        <p>TotalGuard Yard Care was founded by Alex and Vance, two Madison entrepreneurs committed to reliable, systems-driven lawn care across Dane County, Wisconsin since 2019.</p>
      </section>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden py-28 md:py-40"
        style={{ background: bg.hero }}
      >
        <AmbientParticles density="sparse" className="absolute inset-0" />
        <div className={`absolute top-1/4 right-1/3 w-96 h-96 rounded-full blur-3xl opacity-10 ${acc.bg}`} />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <ScrollReveal>
            <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-8 ${acc.bg} ${acc.border} border ${acc.text}`}>
              <Users className="h-4 w-4" />
              The Founders
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight mb-6">
              The Faces Behind{' '}
              <br />
              <span className={acc.text}>Every Perfect Lawn</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="text-xl md:text-2xl text-white/55 max-w-3xl mx-auto leading-relaxed mb-10">
              Young entrepreneurs with a passion for excellence and a commitment to transforming lawns across Madison, Wisconsin.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-black text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              style={{ background: acc.solid }}
            >
              Work With Us <ArrowRight className="h-5 w-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <TrustStrip variant="dark" />

      {/* ── FOUNDER CARDS ── */}
      <section className="py-20 md:py-28" style={{ background: bg.section }}>
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-16">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-4 ${acc.text}`}>Leadership</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">The Founders</h2>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">
              TotalGuard was founded by two driven entrepreneurs who saw an opportunity to do lawn care the right way.
            </p>
          </ScrollReveal>

          <div className="space-y-12 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction={index % 2 === 0 ? 'left' : 'right'}>
                <GlassCard variant="dark" hover="glow" className="overflow-hidden">
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                    {/* Portrait */}
                    <div className="flex-shrink-0 relative">
                      <div className={`absolute -inset-4 rounded-3xl blur-2xl opacity-20 ${acc.bg}`} />
                      <div className={`relative w-48 h-48 rounded-2xl overflow-hidden border-2 ${acc.border} shadow-2xl`}>
                        <Image
                          src={member.image}
                          alt={`${member.name} - ${member.role} of TotalGuard Yard Care`}
                          className="w-full h-full object-cover"
                          width={192}
                          height={192}
                        />
                      </div>
                      {/* Fun fact badge */}
                      <div className={`absolute -bottom-3 -right-3 px-3 py-1.5 rounded-xl text-xs font-bold ${acc.bg} border ${acc.border} ${acc.text} whitespace-nowrap shadow-lg`}>
                        {member.funFact}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-1">
                        <span className={`text-xs font-bold uppercase tracking-widest ${acc.text}`}>{member.role}</span>
                      </div>
                      <h3 className="text-4xl font-black text-white mb-1">{member.name}</h3>
                      <p className="text-white/30 text-sm italic mb-5">{member.funFactDetail}</p>
                      <p className="text-white/60 leading-relaxed mb-6">{member.description}</p>

                      {/* Strengths */}
                      <div className="flex flex-wrap gap-2">
                        {member.strengths.map((s, j) => (
                          <span key={j} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${acc.bg} border ${acc.border} ${acc.text}`}>
                            <CheckCircle2 className="h-3 w-3" />
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="py-20 md:py-28" style={{ background: bg.hero }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-4 ${acc.text}`}>Our Story</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Built From the Ground Up</h2>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <GlassCard variant="dark" hover="none" className={`border-l-4 border-l-[${acc.solid}] text-left mb-8`}>
                <p className="text-white/65 text-lg leading-relaxed">
                  What started as a simple idea to help neighbors with their lawn care has grown into TotalGuard Yard Care. As young business owners, Alex and Vance bring fresh energy, modern techniques, and an unwavering commitment to customer satisfaction. They understand that your property is your pride, and they treat every lawn with the same care they&apos;d give their own.
                </p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: '2019', label: 'Founded' },
                  { value: '500+', label: 'Properties Served' },
                  { value: '4.9★', label: 'Google Rating' },
                ].map((stat, i) => (
                  <div key={i} className={`py-6 rounded-xl ${acc.bg} border ${acc.border}`}>
                    <div className={`text-3xl font-black ${acc.text} mb-1`}>{stat.value}</div>
                    <div className="text-white/40 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-20 md:py-28" style={{ background: bg.page }}>
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-14">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-4 ${acc.text}`}>Core Values</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">What Drives Us</h2>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">Our values guide everything we do, from client interactions to job-site execution.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.08}>
                  <GlassCard variant="dark" hover="lift" className="text-center h-full">
                    <div className={`inline-flex p-4 rounded-2xl ${acc.bg} border ${acc.border} mb-5`}>
                      <Icon className={`h-7 w-7 ${acc.text}`} />
                    </div>
                    <h3 className="text-lg font-black text-white mb-3">{value.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{value.description}</p>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY YOUNG ENTREPRENEURS ── */}
      <section className="py-20 md:py-28" style={{ background: bg.section }}>
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-14">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-4 ${acc.text}`}>The Advantage</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Why Choose Young Entrepreneurs?</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyYoungEntrepreneurs.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <GlassCard variant="dark" hover="lift" accentBorder className="flex gap-4 h-full">
                    <div className={`p-3 rounded-xl ${acc.bg} border ${acc.border} flex-shrink-0 h-fit`}>
                      <Icon className={`h-6 w-6 ${acc.text}`} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-white/50 leading-relaxed text-sm">{item.body}</p>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CREW CALLOUT ── */}
      <section className="py-16" style={{ background: bg.hero }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <GlassCard variant="dark" hover="none" className="text-center py-12">
              <Shield className={`h-12 w-12 mx-auto mb-5 ${acc.text}`} />
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Your Crew Is Assigned to You</h2>
              <p className="text-white/55 max-w-2xl mx-auto leading-relaxed mb-8">
                With TotalGuard, you don&apos;t get a rotating cast of strangers. Your crew knows your property, your preferences, and what "done right" means for your specific yard. Same team, every visit.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-black transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ background: acc.solid }}
              >
                Meet Your Crew <ArrowRight className="h-5 w-5" />
              </Link>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
      <Footer showCloser={false} />
    </div>
  );
}
