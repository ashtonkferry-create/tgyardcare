'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ContactPageSchema } from "@/components/schemas/ContactPageSchema";
import { WebPageSchema } from "@/components/schemas/WebPageSchema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GlassCard } from '@/components/GlassCard';
import { ScrollReveal } from '@/components/ScrollReveal';
import { AmbientParticles } from '@/components/AmbientParticles';
import { TrustStrip } from '@/components/TrustStrip';
import { useSeasonalTheme } from '@/contexts/SeasonalThemeContext';
import {
  Phone, Mail, MapPin, Clock, AlertCircle, CheckCircle2,
  Sparkles, Zap, Shield, X, Users, FileCheck, RefreshCw, ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { validateContactForm } from "@/lib/validation";
import { supabase } from "@/integrations/supabase/client";
import { ServiceUpsellDialog } from "@/components/ServiceUpsellDialog";
import { getServiceTemplate } from "@/lib/serviceTemplates";

const seasonalAccent = {
  summer: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', solid: '#10b981', focus: 'focus:border-emerald-500' },
  fall:   { text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/30',   solid: '#f59e0b', focus: 'focus:border-amber-500'   },
  winter: { text: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/30',    solid: '#06b6d4', focus: 'focus:border-cyan-500'    },
} as const;

const seasonalBg = {
  summer: {
    hero:    'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.15) 0%, transparent 70%), linear-gradient(to bottom, #050d07, #0a1a0e, #050d07)',
    page:    '#050d07',
    section: '#0a1a0e',
  },
  fall: {
    hero:    'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,158,11,0.15) 0%, transparent 70%), linear-gradient(to bottom, #0d0900, #1a1000, #0d0900)',
    page:    '#0d0900',
    section: '#1a1000',
  },
  winter: {
    hero:    'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,182,212,0.15) 0%, transparent 70%), linear-gradient(to bottom, #020810, #060f1a, #020810)',
    page:    '#020810',
    section: '#060f1a',
  },
} as const;

const processSteps = [
  { num: '1', label: 'You Reach Out', detail: 'Fill out the form or call us directly' },
  { num: '2', label: 'Quote in 24hrs', detail: 'Written estimate, no obligation' },
  { num: '3', label: 'Pick a Date', detail: 'You choose the schedule' },
  { num: '4', label: 'Your Crew Shows Up', detail: 'Same team, every visit' },
];

const commitments = [
  { icon: Clock, title: '24hr Response', body: 'Every inquiry answered' },
  { icon: Users, title: 'Same Crew', body: 'Every single visit' },
  { icon: FileCheck, title: 'Quote Accuracy', body: 'No surprise charges' },
  { icon: RefreshCw, title: 'Make-It-Right', body: 'Free return if needed' },
];

/* ── Animated Orb → Checkmark indicator ── */
function AnimatedCheckOrb({ completed, accentColor }: { completed: boolean; accentColor: string }) {
  return (
    <div className="relative w-5 h-5 flex-shrink-0">
      {/* Glowing orb (fades out when completed) */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-500 ease-out"
        style={{
          background: accentColor,
          opacity: completed ? 0 : 0.25,
          boxShadow: completed ? 'none' : `0 0 12px ${accentColor}60, 0 0 4px ${accentColor}40`,
          transform: completed ? 'scale(0)' : 'scale(1)',
        }}
      />
      <div
        className="absolute inset-[3px] rounded-full transition-all duration-500 ease-out"
        style={{
          background: accentColor,
          opacity: completed ? 0 : 0.5,
          transform: completed ? 'scale(0)' : 'scale(1)',
        }}
      />

      {/* Animated checkmark (scales in when completed) */}
      <svg
        viewBox="0 0 24 24"
        className="absolute inset-0 w-5 h-5 transition-all duration-500 ease-out"
        style={{
          opacity: completed ? 1 : 0,
          transform: completed ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-90deg)',
        }}
      >
        {/* Success circle burst */}
        <circle
          cx="12" cy="12" r="10"
          fill="none"
          stroke={accentColor}
          strokeWidth="2"
          strokeDasharray="63"
          strokeDashoffset={completed ? '0' : '63'}
          style={{
            transition: 'stroke-dashoffset 0.6s cubic-bezier(0.65, 0, 0.35, 1) 0.1s',
          }}
        />
        {/* Checkmark stroke */}
        <path
          d="M7 13l3 3 7-7"
          fill="none"
          stroke={accentColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="20"
          strokeDashoffset={completed ? '0' : '20'}
          style={{
            transition: 'stroke-dashoffset 0.4s cubic-bezier(0.65, 0, 0.35, 1) 0.45s',
          }}
        />
      </svg>

      {/* Particle burst on complete */}
      {completed && (
        <>
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <div
              key={angle}
              className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full animate-[checkBurst_0.6s_ease-out_forwards]"
              style={{
                background: accentColor,
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(0px)`,
                animationDelay: '0.3s',
                ['--burst-angle' as string]: `${angle}deg`,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default function ContactContent() {
  const { toast } = useToast();
  const { activeSeason } = useSeasonalTheme();
  const acc = seasonalAccent[activeSeason];
  const bg = seasonalBg[activeSeason];
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [completedFields, setCompletedFields] = useState<Set<string>>(new Set());
  const [showUpsell, setShowUpsell] = useState(false);
  const [selectedService, setSelectedService] = useState<{ title: string; message: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleFieldBlur = useCallback((fieldName: string) => {
    setFocusedField(null);
    if (formData[fieldName as keyof typeof formData]?.trim()) {
      setCompletedFields(prev => new Set(prev).add(fieldName));
    } else {
      setCompletedFields(prev => {
        const next = new Set(prev);
        next.delete(fieldName);
        return next;
      });
    }
  }, [formData]);

  useEffect(() => {
    const serviceKey = searchParams.get('service');
    if (serviceKey) {
      const template = getServiceTemplate(serviceKey);
      if (template) {
        setSelectedService(template);
        setFormData(prev => ({ ...prev, message: template.message }));
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    try {
      const validatedData = validateContactForm(formData);
      const { data, error } = await supabase.functions.invoke('contact-form', { body: validatedData });
      if (error) throw new Error(error.message || "Failed to submit form");
      if (!data?.success) throw new Error("Failed to submit form");
      setFormData({ name: "", email: "", phone: "", address: "", message: "" });
      setShowUpsell(true);
    } catch (error) {
      toast({ title: "Submission Error", description: error instanceof Error ? error.message : "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (errors[name]) {
      setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
    }
    setFormData({ ...formData, [name]: value });
  };

  const fieldClass = (field: string) =>
    `flex-1 border bg-black/30 backdrop-blur-sm text-white placeholder:text-white/30 transition-all duration-300 ${
      focusedField === field
        ? `border-[${acc.solid}] ring-1 ring-[${acc.solid}]/30`
        : 'border-white/10 hover:border-white/20'
    } rounded-lg`;

  return (
    <div className="min-h-screen text-white" style={{ background: bg.page }}>
      <ContactPageSchema />
      <WebPageSchema name="Contact TotalGuard Yard Care" description="Get in touch for a free lawn care quote in Madison, WI" url="/contact" type="ContactPage" />
      <Navigation />

      {/* SEO */}
      <section className="sr-only" aria-label="Contact Summary">
        <p>Contact TotalGuard Yard Care for a free lawn care quote in Madison, Middleton, Waunakee, or Dane County, Wisconsin. We respond within 24 hours. Phone: (608) 535-6057. Request your free estimate online or call today.</p>
      </section>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden py-24 md:py-36"
        style={{ background: bg.hero }}
      >
        <AmbientParticles density="sparse" className="absolute inset-0" />
        <div className={`absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-10 ${acc.bg}`} />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <ScrollReveal>
            <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-8 ${acc.bg} ${acc.border} border ${acc.text}`}>
              <Sparkles className="h-4 w-4" />
              24-Hour Response Guarantee
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-6">
              Get Your Free Quote in{' '}
              <br />
              <span className={acc.text}>Under 60 Seconds</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.14}>
            <p className="text-xl md:text-2xl text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed">
              Join 500+ homeowners across Madison, Middleton, Waunakee, Sun Prairie &amp; Dane County who trust TotalGuard Yard Care
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
              {['4.9★ Rating', 'Same-Day Service', '100% Guaranteed'].map((point, i) => (
                <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${acc.bg} border ${acc.border}`}>
                  <CheckCircle2 className={`h-4 w-4 ${acc.text}`} />
                  <span className="text-white/80">{point}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── PROCESS STRIP ── */}
      <section className="py-6 border-y border-white/5" style={{ background: bg.section }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {processSteps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-black text-black flex-shrink-0"
                    style={{ background: acc.solid, opacity: 1 - i * 0.15 }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <div className="text-white/80 font-semibold text-sm">{step.label}</div>
                    <div className="text-white/30 text-xs hidden sm:block">{step.detail}</div>
                  </div>
                  {i < processSteps.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-white/20 ml-2 hidden md:block" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <TrustStrip variant="dark" />

      {/* ── FORM + INFO ── */}
      <section className="py-16 md:py-24" style={{ background: bg.page }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Form Column */}
            <ScrollReveal direction="left">
              <GlassCard variant="dark" hover="none" className="p-8">
                {/* Service badge */}
                {selectedService && (
                  <div className={`flex items-center gap-3 p-4 ${acc.bg} border ${acc.border} rounded-xl mb-6`}>
                    <Sparkles className={`h-5 w-5 ${acc.text} flex-shrink-0`} />
                    <div className="flex-1">
                      <p className="text-white/40 text-xs font-medium mb-0.5">Requesting a quote for:</p>
                      <p className={`text-lg font-bold ${acc.text}`}>{selectedService.title}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setSelectedService(null); setFormData(prev => ({ ...prev, message: '' })); }}
                      className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                      aria-label="Clear service selection"
                    >
                      <X className="h-4 w-4 text-white/40" />
                    </button>
                  </div>
                )}

                <div className="mb-7" ref={formRef}>
                  <h2 className="text-3xl font-black text-white mb-2">Request Your Free Quote</h2>
                  <div className={`h-1 w-16 rounded-full mb-3`} style={{ background: acc.solid }} />
                  <p className="text-white/45">Get a response in under 24 hours &bull; No obligation &bull; Free estimate</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name" className="text-white/70 font-semibold text-sm">Full Name *</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <AnimatedCheckOrb completed={completedFields.has('name')} accentColor={acc.solid} />
                      <Input
                        id="name" name="name" value={formData.name} onChange={handleChange}
                        onFocus={() => setFocusedField('name')} onBlur={() => handleFieldBlur('name')}
                        required maxLength={100} placeholder="John Smith"
                        className={fieldClass('name')}
                        aria-invalid={errors.name ? "true" : "false"}
                      />
                    </div>
                    {errors.name && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 ml-8"><AlertCircle className="h-3.5 w-3.5" />{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-white/70 font-semibold text-sm">Email Address *</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <AnimatedCheckOrb completed={completedFields.has('email')} accentColor={acc.solid} />
                      <Input
                        id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                        onFocus={() => setFocusedField('email')} onBlur={() => handleFieldBlur('email')}
                        required maxLength={255} placeholder="john@example.com"
                        className={fieldClass('email')}
                        aria-invalid={errors.email ? "true" : "false"}
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 ml-8"><AlertCircle className="h-3.5 w-3.5" />{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-white/70 font-semibold text-sm">Phone Number *</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <AnimatedCheckOrb completed={completedFields.has('phone')} accentColor={acc.solid} />
                      <Input
                        id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange}
                        onFocus={() => setFocusedField('phone')} onBlur={() => handleFieldBlur('phone')}
                        required maxLength={20} placeholder="(920) 555-1234"
                        className={fieldClass('phone')}
                        aria-invalid={errors.phone ? "true" : "false"}
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 ml-8"><AlertCircle className="h-3.5 w-3.5" />{errors.phone}</p>}
                  </div>

                  {/* Address */}
                  <div>
                    <Label htmlFor="address" className="text-white/70 font-semibold text-sm">Property Address *</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <AnimatedCheckOrb completed={completedFields.has('address')} accentColor={acc.solid} />
                      <Input
                        id="address" name="address" value={formData.address} onChange={handleChange}
                        onFocus={() => setFocusedField('address')} onBlur={() => handleFieldBlur('address')}
                        required maxLength={300} placeholder="123 Main St, Madison, WI 53703"
                        className={fieldClass('address')}
                        aria-invalid={errors.address ? "true" : "false"}
                      />
                    </div>
                    {errors.address && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 ml-8"><AlertCircle className="h-3.5 w-3.5" />{errors.address}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="text-white/70 font-semibold text-sm">Tell Us About Your Project *</Label>
                    <div className="flex items-start gap-3 mt-2">
                      <div className="pt-3">
                        <AnimatedCheckOrb completed={completedFields.has('message')} accentColor={acc.solid} />
                      </div>
                      <div className="flex-1">
                        <Textarea
                          id="message" name="message" value={formData.message} onChange={handleChange}
                          onFocus={() => setFocusedField('message')} onBlur={() => handleFieldBlur('message')}
                          required maxLength={2000}
                          placeholder="Describe the services you're interested in and any specific details about your property..."
                          className={`${fieldClass('message')} min-h-[140px] resize-none`}
                          aria-invalid={errors.message ? "true" : "false"}
                        />
                        <p className={`text-xs mt-1.5 text-right ${formData.message.length > 1900 ? 'text-red-400' : 'text-white/25'}`}>
                          {formData.message.length}/2000
                        </p>
                      </div>
                    </div>
                    {errors.message && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 ml-8"><AlertCircle className="h-3.5 w-3.5" />{errors.message}</p>}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 px-8 rounded-xl font-black text-black text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                    style={{ background: acc.solid }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black" />
                        Sending Your Request...
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5" />
                        Get My Free Quote Now
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-white/25">
                    <Shield className="h-3 w-3" />
                    Your information is secure and will never be shared
                  </div>
                </form>
              </GlassCard>
            </ScrollReveal>

            {/* Info Column */}
            <ScrollReveal direction="right" delay={0.1}>
              <div className="space-y-6">
                {/* Phone */}
                <GlassCard variant="dark" hover="glow">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: acc.solid }}
                    >
                      <Phone className="h-7 w-7 text-black" />
                    </div>
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${acc.text}`}>Call for Immediate Help</p>
                      <a href="tel:608-535-6057" className="text-2xl font-black text-white hover:opacity-80 transition-opacity">
                        (608) 535-6057
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/40 text-sm">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    Monday - Saturday: 8:00 AM - 6:00 PM
                  </div>
                  {/* Text option */}
                  <div className="mt-3 pt-3 border-t border-white/5">
                    <a href="sms:608-535-6057" className={`text-sm font-semibold ${acc.text} hover:opacity-80 transition-opacity`}>
                      Prefer to text? → (608) 535-6057
                    </a>
                  </div>
                </GlassCard>

                {/* Contact details */}
                <GlassCard variant="dark" hover="none" className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${acc.bg} border ${acc.border} flex items-center justify-center flex-shrink-0`}>
                      <Mail className={`h-5 w-5 ${acc.text}`} />
                    </div>
                    <div>
                      <h3 className="text-white/60 text-xs font-bold uppercase tracking-wide mb-1">Email</h3>
                      <a href="mailto:totalguardllc@gmail.com" className="text-white hover:opacity-70 transition-opacity text-sm">
                        totalguardllc@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${acc.bg} border ${acc.border} flex items-center justify-center flex-shrink-0`}>
                      <MapPin className={`h-5 w-5 ${acc.text}`} />
                    </div>
                    <div>
                      <h3 className="text-white/60 text-xs font-bold uppercase tracking-wide mb-1">Service Area</h3>
                      <p className="text-white/70 text-sm">Madison, WI &amp; Surrounding Areas</p>
                      <p className="text-white/35 text-xs mt-0.5">Including Middleton &amp; Waunakee</p>
                    </div>
                  </div>
                </GlassCard>

                {/* Urgency */}
                <GlassCard variant="dark" hover="glow" accentBorder>
                  <div className="flex items-start gap-3">
                    <Zap className={`h-6 w-6 ${acc.text} flex-shrink-0 mt-0.5`} />
                    <div>
                      <h3 className="font-black text-white mb-1">Limited Availability</h3>
                      <p className="text-white/50 text-sm leading-relaxed">
                        We&apos;re booking up fast for this season. Request your quote today to secure your spot!
                      </p>
                    </div>
                  </div>
                </GlassCard>

                {/* Map */}
                <div className="rounded-2xl overflow-hidden h-64 border border-white/5 shadow-2xl">
                  <iframe
                    title="Madison, Wisconsin location map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184552.57290364332!2d-89.54410483516636!3d43.074761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8806536d3a2019ff%3A0x4e0cfcb5ba484198!2sMadison%2C%20WI!5e0!3m2!1sen!2sus!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── COMMITMENTS ── */}
      <section className="py-16 border-t border-white/5" style={{ background: bg.section }}>
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-10">
            <h3 className="text-2xl font-black text-white">Our Commitments to You</h3>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {commitments.map((c, i) => {
              const Icon = c.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.07}>
                  <GlassCard variant="dark" hover="lift" className="text-center">
                    <div className={`inline-flex p-3 rounded-xl ${acc.bg} border ${acc.border} mb-3`}>
                      <Icon className={`h-5 w-5 ${acc.text}`} />
                    </div>
                    <div className="text-white font-bold text-sm mb-1">{c.title}</div>
                    <div className="text-white/35 text-xs">{c.body}</div>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CALL ── */}
      <section className="py-12 border-t border-white/5" style={{ background: bg.hero }}>
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Ready to Get Started?</h2>
            <p className="text-white/60 mb-6">Call us now for immediate service or submit the form above for a quote within 24 hours.</p>
            <a
              href="tel:608-535-6057"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-black transition-all duration-300 hover:scale-105 shadow-lg"
              style={{ background: acc.solid }}
            >
              <Phone className="h-5 w-5" />
              (608) 535-6057
            </a>
          </ScrollReveal>
        </div>
      </section>

      <ServiceUpsellDialog open={showUpsell} onOpenChange={setShowUpsell} selectedService={selectedService} />
      <Footer showCloser={false} />
    </div>
  );
}
