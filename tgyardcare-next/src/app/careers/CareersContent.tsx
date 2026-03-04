'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  ArrowRight, CheckCircle2, MapPin, Phone, Mail,
  Leaf, Snowflake, Users, TrendingUp, Clock,
  Shield, Zap, Award, Calendar, ChevronRight,
  Scissors, FileText, MessageSquare, Handshake,
} from "lucide-react";

const APPLY_URL = "/contact?service=careers";

const openPositions = [
  {
    title: "Lawn Care Technician",
    type: "Full-Time / Seasonal",
    icon: Leaf,
    summary: "Operate professional-grade equipment. Deliver exceptional results for 500+ residential and commercial properties across Dane County.",
    available: true,
    tag: "Most Openings",
  },
  {
    title: "Snow Removal Operator",
    type: "Seasonal — Winter",
    icon: Snowflake,
    summary: "Own the winter. Reliable plowing, salting, and walkway clearing. Early mornings, consistent routes, competitive pay.",
    available: true,
    tag: "Winter Season",
  },
  {
    title: "Crew Leader",
    type: "Full-Time",
    icon: Users,
    summary: "Lead technicians, manage daily operations, maintain quality standards, and serve as the client-facing face of TotalGuard.",
    available: false,
    tag: "Filled",
  },
  {
    title: "Landscape Maintenance Specialist",
    type: "Full-Time / Seasonal",
    icon: Scissors,
    summary: "Mulching, pruning, bed maintenance, seasonal cleanup. Attention to detail is your craft. Every property is a portfolio piece.",
    available: true,
    tag: "Spring Priority",
  },
];

const benefits = [
  { icon: TrendingUp, title: "Performance Pay", desc: "Raises tied to results, not just tenure. Outperform, earn more." },
  { icon: Calendar,   title: "Reliable Schedules", desc: "Consistent routes. Advance notice. You can actually plan your life." },
  { icon: Award,      title: "Equipment Training", desc: "Certified training on professional-grade equipment — all provided." },
  { icon: Shield,     title: "Stable Employment", desc: "500+ active clients. Year-round and seasonal positions available." },
  { icon: TrendingUp, title: "Clear Path Up", desc: "Technician → Crew Lead → Management. We promote from within." },
  { icon: Users,      title: "A Team Worth Joining", desc: "People who actually show up. No deadweight. High standards." },
];

const values = [
  { num: "01", name: "Ownership",     desc: "Every property reflects you personally. Own the outcome, not the excuse." },
  { num: "02", name: "Accountability", desc: "Say what you'll do. Do what you said. It's that simple." },
  { num: "03", name: "Excellence",    desc: "Good enough isn't. Our 4.9 Google rating is proof it never was." },
  { num: "04", name: "Efficiency",    desc: "We respect time — ours and clients'. Smart systems. Disciplined execution." },
  { num: "05", name: "Integrity",     desc: "Right thing, every time. Especially when no one's watching." },
];

const hiringSteps = [
  { step: "01", title: "Apply",               desc: "Submit through our contact form. Tell us your experience, availability, and what you're after.", icon: FileText },
  { step: "02", title: "48-Hour Response",    desc: "No ghosting. Every application gets reviewed. Qualified candidates hear back fast.", icon: Clock },
  { step: "03", title: "Interview",           desc: "Straight conversation with our leadership. We'll talk expectations, pay, and fit.", icon: MessageSquare },
  { step: "04", title: "Written Offer",       desc: "Compensation, schedule, and start date — all in writing. No surprises.", icon: Handshake },
  { step: "05", title: "Onboarding",          desc: "Equipment training, route orientation, meet your crew. You'll be fully ready.", icon: Zap },
];

const serviceAreas = [
  { name: "Madison",       path: "/locations/madison" },
  { name: "Middleton",     path: "/locations/middleton" },
  { name: "Verona",        path: "/locations/verona" },
  { name: "Fitchburg",     path: "/locations/fitchburg" },
  { name: "Sun Prairie",   path: "/locations/sun-prairie" },
  { name: "Waunakee",      path: "/locations/waunakee" },
  { name: "Monona",        path: "/locations/monona" },
  { name: "McFarland",     path: "/locations/mcfarland" },
  { name: "Cottage Grove", path: "/locations/cottage-grove" },
  { name: "DeForest",      path: "/locations/deforest" },
  { name: "Oregon",        path: "/locations/oregon" },
  { name: "Stoughton",     path: "/locations/stoughton" },
];

const idealTraits = [
  "You show up on time, every time. No excuses.",
  "You like seeing the direct results of your work.",
  "Physical outdoor work in any weather doesn't faze you.",
  "You take direction well and improve from feedback.",
  "You want to be part of something that's growing.",
  "You represent yourself — and your team — professionally.",
  "You want steady work with a predictable schedule.",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function CareersContent() {
  const availableCount = openPositions.filter(p => p.available).length;

  return (
    <div className="min-h-screen" style={{ background: '#050d07' }}>
      <Navigation />

      {/* Hidden SEO content */}
      <section className="sr-only">
        <h2>Lawn Care Jobs in Madison, Wisconsin — TotalGuard Yard Care</h2>
        <p>
          Hiring lawn care technicians, snow removal operators, and landscape maintenance specialists
          in Madison, WI and Dane County. Competitive pay, consistent schedules, and advancement
          opportunities with a 4.9-rated local company serving 500+ properties across 12 cities.
          Apply today for outdoor jobs in Madison, Middleton, Verona, Fitchburg, and surrounding areas.
        </p>
      </section>

      {/* ─────────────── HERO ─────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-20">

        {/* Background texture + glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div
            className="absolute top-1/4 right-0 w-[700px] h-[700px] rounded-full opacity-[0.18]"
            style={{ background: 'radial-gradient(circle, #16a34a 0%, transparent 65%)' }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.10]"
            style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl">

            {/* Live badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
              </span>
              <span className="text-sm font-semibold text-amber-300 tracking-wide">
                {availableCount} Positions Open — 2026 Season
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black text-white leading-[0.93] tracking-tight mb-8"
            >
              Madison&apos;s
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #22c55e 0%, #16a34a 45%, #f59e0b 100%)' }}
              >
                Best Crew
              </span>
              <br />
              Is Hiring.
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/55 mb-10 max-w-2xl leading-relaxed"
            >
              We don&apos;t hire just anyone. We build teams of professionals who take pride in their
              craft, show up every day, and represent Madison&apos;s most trusted yard care company.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <button
                onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg text-black transition-all hover:scale-[1.03] hover:shadow-2xl active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
              >
                View Open Positions
                <ArrowRight className="h-5 w-5" />
              </button>
              <Link
                href={APPLY_URL}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg text-white border border-white/20 hover:bg-white/10 transition-all"
              >
                Apply Now
                <ChevronRight className="h-5 w-5" />
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap gap-8 md:gap-16"
            >
              {[
                { num: '500+', label: 'Properties We Maintain' },
                { num: '4.9★', label: 'Google Rating' },
                { num: '12+',  label: 'Cities Served' },
                { num: '48hr', label: 'Application Response' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl font-black text-white">{s.num}</div>
                  <div className="text-sm text-white/35 mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Decorative line */}
        <div className="absolute right-12 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent hidden xl:block" />
      </section>

      {/* ─────────────── OPEN POSITIONS ───────────────────── */}
      <section
        id="open-positions"
        className="py-24 scroll-mt-24"
        style={{ background: '#0a1a0e' }}
      >
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="mb-14 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-amber-400 font-bold text-xs tracking-[0.2em] uppercase mb-3">
                Right Now, We&apos;re Hiring
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white">Open Positions</h2>
            </div>
            <Link
              href={APPLY_URL}
              className="text-white/40 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors"
            >
              General application <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Position cards */}
          <div className="space-y-4">
            {openPositions.map((pos, i) => {
              const Icon = pos.icon;
              return (
                <motion.div
                  key={pos.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 ${
                    pos.available
                      ? 'border-white/10 hover:border-green-500/40 bg-white/[0.04] hover:bg-white/[0.07]'
                      : 'border-white/[0.05] bg-white/[0.02] opacity-45'
                  }`}
                >
                  {/* Left accent bar */}
                  {pos.available && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-green-700" />
                  )}

                  <div className="p-6 md:p-8 pl-8 md:pl-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">

                      {/* Icon */}
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border ${
                          pos.available
                            ? 'bg-green-500/15 border-green-500/25'
                            : 'bg-white/[0.04] border-white/8'
                        }`}
                      >
                        <Icon className={`h-7 w-7 ${pos.available ? 'text-green-400' : 'text-white/25'}`} />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2.5 mb-1">
                          <h3 className="text-xl md:text-2xl font-bold text-white">{pos.title}</h3>
                          <span
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                              pos.available
                                ? 'bg-green-500/15 text-green-300 border-green-500/25'
                                : 'bg-white/[0.04] text-white/30 border-white/10'
                            }`}
                          >
                            {pos.available ? pos.tag : 'Position Filled'}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-amber-400/70 mb-2">{pos.type}</p>
                        <p className="text-white/55 leading-relaxed">{pos.summary}</p>
                      </div>

                      {/* CTA */}
                      {pos.available && (
                        <Link
                          href={APPLY_URL}
                          className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-black transition-all hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
                          style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                        >
                          Apply Now
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="text-center text-white/35 text-sm mt-8">
            Don&apos;t see your role?{' '}
            <Link href={APPLY_URL} className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
              Submit a general application →
            </Link>
          </p>
        </div>
      </section>

      {/* ─────────────── WHY TOTALGUARD ───────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#050d07' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        >
          <div className="absolute inset-y-0 left-0 right-0 h-px top-0 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          <div className="absolute inset-y-0 left-0 right-0 h-px bottom-0 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

              {/* Left: editorial copy */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                <p className="text-amber-400 font-bold text-xs tracking-[0.2em] uppercase mb-6">Why TotalGuard</p>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                  More than a job.
                  <br />
                  <span className="text-white/35">A crew you&apos;ll</span>
                  <br />
                  actually respect.
                </h2>
                <p className="text-white/55 text-lg leading-relaxed mb-4">
                  We&apos;re a growing, locally owned company with 500+ active clients across Dane County.
                  Not a faceless national franchise. Your work matters here — you&apos;ll know your routes,
                  know your clients, and take pride in every property you touch.
                </p>
                <p className="text-white/40 text-base leading-relaxed mb-8">
                  We operate at a high standard because our clients expect it. That means we invest in our people —
                  proper training, clear expectations, and recognition for those who exceed them.
                </p>
                <Link
                  href={APPLY_URL}
                  className="inline-flex items-center gap-2 text-green-400 font-bold hover:text-green-300 transition-colors group"
                >
                  Start your application
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Right: benefit rows */}
              <div className="space-y-3">
                {benefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <motion.div
                      key={b.title}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.03] hover:border-green-500/20 hover:bg-white/[0.06] transition-all duration-200"
                    >
                      <div className="w-9 h-9 rounded-lg bg-green-500/15 flex items-center justify-center shrink-0 border border-green-500/20">
                        <Icon className="h-[18px] w-[18px] text-green-400" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm mb-0.5">{b.title}</div>
                        <div className="text-white/45 text-sm leading-relaxed">{b.desc}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── OUR STANDARDS / VALUES ───────────── */}
      <section className="py-24" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-14"
            >
              <p className="text-amber-400 font-bold text-xs tracking-[0.2em] uppercase mb-3">
                Non-Negotiables
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white">Our Standards</h2>
              <p className="text-white/40 mt-4 max-w-lg text-lg">
                These aren&apos;t posters on the wall. They&apos;re how every member of this team operates,
                every single day.
              </p>
            </motion.div>

            <div className="divide-y divide-white/[0.05]">
              {values.map((v, i) => (
                <motion.div
                  key={v.num}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.07 }}
                  className="py-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 group cursor-default"
                >
                  <span className="text-5xl md:text-7xl font-black text-white/[0.05] group-hover:text-white/[0.10] transition-colors w-24 shrink-0 leading-none select-none">
                    {v.num}
                  </span>
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-10">
                    <h3 className="text-2xl md:text-3xl font-black text-white w-52 shrink-0">
                      {v.name}
                    </h3>
                    <p className="text-white/50 text-lg leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── FIT + HIRING PROCESS ────────────── */}
      <section className="py-24 relative" style={{ background: '#050d07' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20">

            {/* Left: Ideal Fit */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-green-400 font-bold text-xs tracking-[0.2em] uppercase mb-4">The Right Fit</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-8 leading-tight">
                This role is for you
                <br />
                <span className="text-white/35">if you...</span>
              </h2>
              <div className="space-y-4">
                {idealTraits.map((trait, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-white/70 leading-relaxed">{trait}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Hiring Process */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-amber-400 font-bold text-xs tracking-[0.2em] uppercase mb-4">Hiring Process</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-8 leading-tight">
                Simple. Fast.
                <br />
                <span className="text-white/35">No games.</span>
              </h2>
              <div className="relative">
                {/* Connecting line */}
                <div className="absolute left-5 top-10 bottom-10 w-px bg-gradient-to-b from-green-500/30 via-white/10 to-transparent" />
                <div className="space-y-8">
                  {hiringSteps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <motion.div
                        key={step.step}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-5"
                      >
                        <div className="relative w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 z-10">
                          <Icon className="h-4 w-4 text-white/50" />
                        </div>
                        <div className="pt-1">
                          <div className="font-bold text-white mb-1">{step.title}</div>
                          <div className="text-white/45 text-sm leading-relaxed">{step.desc}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── SERVICE AREAS (SEO) ──────────────── */}
      <section className="py-16" style={{ background: '#0a1a0e' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-bold text-white mb-2">
              Work Across Madison &amp; Dane County
            </h2>
            <p className="text-white/35 text-sm mb-6">
              Our crews serve {serviceAreas.length} communities across the greater Madison metro area year-round —
              lawn care jobs in Madison, WI and outdoor work throughout Dane County.
            </p>
            <div className="flex flex-wrap gap-2">
              {serviceAreas.map(area => (
                <Link
                  key={area.path}
                  href={area.path}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-green-500/10 text-white/40 hover:text-green-300 rounded-full text-xs font-medium transition-all border border-white/[0.06] hover:border-green-500/20"
                >
                  <MapPin className="h-3 w-3" />
                  {area.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── FINAL CTA ────────────────────────── */}
      <section className="py-28 relative overflow-hidden" style={{ background: '#050d07' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.022]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full blur-3xl opacity-[0.18]"
            style={{ background: 'radial-gradient(ellipse, #16a34a, transparent 65%)' }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Ready to Join
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #22c55e 0%, #f59e0b 100%)' }}
              >
                The Best Crew?
              </span>
            </h2>
            <p className="text-xl text-white/45 mb-12 max-w-xl mx-auto leading-relaxed">
              Apply today. We respond in 48 hours. No games, no ghosting —
              just a straight conversation about whether we&apos;re a fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={APPLY_URL}
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-black text-lg text-black transition-all hover:scale-[1.03] hover:shadow-2xl active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
              >
                Apply Now
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="tel:608-535-6057"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold text-lg text-white border border-white/20 hover:bg-white/10 transition-all"
              >
                <Phone className="h-5 w-5" />
                (608) 535-6057
              </a>
            </div>
            <div className="mt-8">
              <a
                href="mailto:totalguardllc@gmail.com"
                className="inline-flex items-center gap-1.5 text-white/25 hover:text-white/50 text-sm transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                totalguardllc@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* EOE */}
      <div className="border-t border-white/[0.05] py-8" style={{ background: '#050d07' }}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-white/20 max-w-2xl mx-auto leading-relaxed">
            TotalGuard Yard Care is an equal opportunity employer. All qualified applicants will receive
            consideration for employment without regard to race, color, religion, sex, sexual orientation,
            gender identity, national origin, disability, or veteran status.
          </p>
        </div>
      </div>

      <Footer showCloser={false} />
    </div>
  );
}
