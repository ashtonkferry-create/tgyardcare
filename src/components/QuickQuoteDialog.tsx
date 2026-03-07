'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, MapPin, ArrowRight, CheckCircle2, Loader2,
  User, AtSign, Home, MessageSquare, Sparkles, Shield, Clock, X,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useSeasonalTheme, Season } from '@/contexts/SeasonalThemeContext';
import { supabase } from '@/integrations/supabase/client';
import { ConciergeConfirmation } from '@/components/ConciergeConfirmation';
import { validateContactForm } from '@/lib/validation';

/* ─── Season Theme Tokens ─── */
const themes = {
  winter: {
    // Header
    headerBg: 'from-slate-950 via-blue-950 to-indigo-950',
    headerGlow: 'rgba(56, 189, 248, 0.08)',
    accentRgb: '56, 189, 248',
    accent: 'text-cyan-400',
    accentBg: 'bg-cyan-400/10',
    accentBorder: 'border-cyan-400/20',
    accentSolid: '#38bdf8',
    // Form
    inputBorder: 'border-slate-700/60',
    inputBorderFocus: 'border-cyan-400',
    inputBg: 'bg-slate-900/60',
    inputGlow: '0 0 0 3px rgba(56, 189, 248, 0.12), 0 0 20px rgba(56, 189, 248, 0.06)',
    labelColor: 'text-slate-400',
    // CTA
    ctaGradient: 'from-cyan-500 via-sky-400 to-cyan-500',
    ctaShadow: '0 4px 24px rgba(56, 189, 248, 0.35)',
    ctaShadowHover: '0 8px 32px rgba(56, 189, 248, 0.5)',
    // Body
    bodyBg: 'from-slate-950 to-[#0c1222]',
    cardBg: 'bg-slate-900/40',
    divider: 'bg-cyan-400/10',
    // Particles
    particleColors: ['bg-cyan-400/20', 'bg-sky-300/15', 'bg-blue-400/20'],
    // Success
    successGlow: 'shadow-[0_0_60px_rgba(56,189,248,0.2)]',
    checkGradient: 'from-cyan-400 to-sky-500',
  },
  summer: {
    headerBg: 'from-[#0a1f12] via-[#132e1b] to-[#0d2816]',
    headerGlow: 'rgba(74, 222, 128, 0.08)',
    accentRgb: '74, 222, 128',
    accent: 'text-green-400',
    accentBg: 'bg-green-400/10',
    accentBorder: 'border-green-400/20',
    accentSolid: '#4ade80',
    inputBorder: 'border-green-900/50',
    inputBorderFocus: 'border-green-400',
    inputBg: 'bg-[#0a1f12]/60',
    inputGlow: '0 0 0 3px rgba(74, 222, 128, 0.12), 0 0 20px rgba(74, 222, 128, 0.06)',
    labelColor: 'text-green-300/60',
    ctaGradient: 'from-green-700 via-green-600 to-green-700',
    ctaShadow: '0 4px 20px rgba(22, 101, 52, 0.4)',
    ctaShadowHover: '0 8px 28px rgba(22, 101, 52, 0.55)',
    bodyBg: 'from-[#0a1f12] to-[#061210]',
    cardBg: 'bg-green-950/30',
    divider: 'bg-green-400/10',
    particleColors: ['bg-green-400/20', 'bg-emerald-300/15', 'bg-lime-400/15'],
    successGlow: 'shadow-[0_0_60px_rgba(74,222,128,0.2)]',
    checkGradient: 'from-green-400 to-emerald-500',
  },
  fall: {
    headerBg: 'from-stone-950 via-amber-950 to-stone-950',
    headerGlow: 'rgba(251, 191, 36, 0.08)',
    accentRgb: '251, 191, 36',
    accent: 'text-amber-400',
    accentBg: 'bg-amber-400/10',
    accentBorder: 'border-amber-400/20',
    accentSolid: '#fbbf24',
    inputBorder: 'border-amber-900/40',
    inputBorderFocus: 'border-amber-400',
    inputBg: 'bg-stone-950/60',
    inputGlow: '0 0 0 3px rgba(251, 191, 36, 0.12), 0 0 20px rgba(251, 191, 36, 0.06)',
    labelColor: 'text-stone-400',
    ctaGradient: 'from-amber-500 via-yellow-400 to-amber-500',
    ctaShadow: '0 4px 24px rgba(251, 191, 36, 0.35)',
    ctaShadowHover: '0 8px 32px rgba(251, 191, 36, 0.5)',
    bodyBg: 'from-stone-950 to-[#120e08]',
    cardBg: 'bg-stone-900/30',
    divider: 'bg-amber-400/10',
    particleColors: ['bg-amber-400/20', 'bg-orange-300/15', 'bg-yellow-400/15'],
    successGlow: 'shadow-[0_0_60px_rgba(251,191,36,0.2)]',
    checkGradient: 'from-amber-400 to-orange-500',
  },
} as const;

/* ─── Floating Particles ─── */
function FloatingParticles({ colors }: { colors: readonly string[] }) {
  const particles = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: 2 + Math.random() * 3,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 4,
      color: colors[i % colors.length],
    })), [colors]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.color}`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() > 0.5 ? 15 : -15, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated Orb → Checkmark ─── */
function AnimatedCheckOrb({ completed, accentColor }: { completed: boolean; accentColor: string }) {
  return (
    <div className="relative w-4 h-4 flex-shrink-0">
      {/* Glowing orb */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-500 ease-out"
        style={{
          background: accentColor,
          opacity: completed ? 0 : 0.25,
          boxShadow: completed ? 'none' : `0 0 10px ${accentColor}60, 0 0 4px ${accentColor}40`,
          transform: completed ? 'scale(0)' : 'scale(1)',
        }}
      />
      <div
        className="absolute inset-[2px] rounded-full transition-all duration-500 ease-out"
        style={{
          background: accentColor,
          opacity: completed ? 0 : 0.5,
          transform: completed ? 'scale(0)' : 'scale(1)',
        }}
      />
      {/* Checkmark SVG */}
      <svg
        viewBox="0 0 24 24"
        className="absolute inset-0 w-4 h-4 transition-all duration-500 ease-out"
        style={{
          opacity: completed ? 1 : 0,
          transform: completed ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-90deg)',
        }}
      >
        <circle
          cx="12" cy="12" r="10" fill="none"
          stroke={accentColor} strokeWidth="2"
          strokeDasharray="63"
          strokeDashoffset={completed ? '0' : '63'}
          style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.65, 0, 0.35, 1) 0.1s' }}
        />
        <path
          d="M7 13l3 3 7-7" fill="none"
          stroke={accentColor} strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="20"
          strokeDashoffset={completed ? '0' : '20'}
          style={{ transition: 'stroke-dashoffset 0.4s cubic-bezier(0.65, 0, 0.35, 1) 0.45s' }}
        />
      </svg>
      {/* Particle burst */}
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

/* ─── Glowing Input ─── */
function GlowInput({
  icon: Icon,
  label,
  theme,
  delay,
  completed,
  onFieldBlur,
  ...inputProps
}: {
  icon: typeof User;
  label: string;
  theme: typeof themes.summer;
  delay: number;
  completed: boolean;
  onFieldBlur: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <label className={`text-[11px] font-medium ${theme.labelColor} uppercase tracking-wider mb-1.5 block`}>
        {label}
      </label>
      <div className="relative group flex items-center gap-2">
        <AnimatedCheckOrb completed={completed} accentColor={theme.accentSolid} />
        <div className="relative flex-1">
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focused ? theme.accent : 'text-white/25'}`}>
            <Icon className="h-4 w-4" />
          </div>
          <input
            {...inputProps}
            onFocus={(e) => { setFocused(true); inputProps.onFocus?.(e); }}
            onBlur={(e) => { setFocused(false); onFieldBlur(); inputProps.onBlur?.(e); }}
            className={`
              w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white
              placeholder:text-white/20
              border ${focused ? theme.inputBorderFocus : theme.inputBorder}
              ${theme.inputBg} backdrop-blur-sm
              outline-none transition-all duration-300
            `}
            style={{
              boxShadow: focused ? theme.inputGlow : 'none',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Props ─── */
interface QuickQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promoService: string;
  promoDiscount: string;
}

export default function QuickQuoteDialog({
  open,
  onOpenChange,
  promoService,
  promoDiscount,
}: QuickQuoteDialogProps) {
  const { activeSeason } = useSeasonalTheme();
  const t = themes[activeSeason] ?? themes.summer;
  const { toast } = useToast();

  const prefillMessage = `Hi TotalGuard! I saw your ${promoDiscount} OFF deal on ${promoService} and I'd love to claim this offer. Please send me a quote!`;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: prefillMessage,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [messageFocused, setMessageFocused] = useState(false);
  const [completedFields, setCompletedFields] = useState<Set<string>>(new Set());

  const handleFieldBlur = useCallback((fieldName: string) => {
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

  // Auto-detect filled fields (handles browser autofill)
  useEffect(() => {
    setCompletedFields(prev => {
      const next = new Set(prev);
      for (const [key, value] of Object.entries(formData)) {
        if (value?.trim()) next.add(key);
      }
      return next.size !== prev.size ? next : prev;
    });
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = validateContactForm(formData);
      const { data, error } = await supabase.functions.invoke('contact-form', {
        body: validatedData,
      });

      if (error) throw new Error(error.message || 'Failed to submit form');
      if (!data?.success) throw new Error('Failed to submit form');

      setIsSuccess(true);
    } catch (error) {
      toast({
        title: 'Submission Error',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setIsSuccess(false);
      setCompletedFields(new Set());
      setFormData({ name: '', email: '', phone: '', address: '', message: prefillMessage });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={`${isSuccess ? 'sm:max-w-3xl' : 'sm:max-w-[480px]'} p-0 overflow-hidden border-0 bg-gradient-to-b ${t.bodyBg} shadow-2xl [&>button:last-child]:hidden transition-[max-width] duration-300`}>
        {/* X close button — always visible */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white/10 transition-all duration-200 group z-20"
          aria-label="Close"
        >
          <X className="h-4 w-4 text-white/30 group-hover:text-white/70 transition-colors" />
        </button>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            /* ═══ SUCCESS STATE — Concierge Confirmation ═══ */
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ConciergeConfirmation
                open={true}
                onClose={handleClose}
                mode="inline"
                submittedMessage={formData.message}
              />
            </motion.div>
          ) : (
            /* ═══ FORM STATE ═══ */
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* ── Header ── */}
              <div className={`relative bg-gradient-to-br ${t.headerBg} px-6 pt-7 pb-5 overflow-hidden`}>
                <FloatingParticles colors={t.particleColors} />

                {/* Radial glow */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full blur-3xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse, ${t.headerGlow}, transparent)` }}
                />

                {/* Discount badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className={`inline-flex items-center gap-1.5 ${t.accentBg} border ${t.accentBorder} backdrop-blur-sm rounded-full px-3 py-1 mb-3`}
                >
                  <Sparkles className={`h-3.5 w-3.5 ${t.accent}`} />
                  <span className={`text-xs font-semibold ${t.accent} uppercase tracking-wide`}>
                    {promoDiscount} OFF: Limited Time
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-xl font-bold text-white leading-tight mb-1"
                >
                  Claim Your {promoService} Deal
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-white/50 text-sm"
                >
                  Fill in a few details and we'll send your quote fast.
                </motion.p>
              </div>

              {/* ── Accent line ── */}
              <div className={`h-px ${t.divider}`} />

              {/* ── Form Body ── */}
              <form onSubmit={handleSubmit} className="relative px-6 pt-5 pb-6">
                <FloatingParticles colors={t.particleColors} />

                <div className="relative z-10 space-y-3.5">
                  {/* Row 1: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <GlowInput
                      icon={User}
                      label="Full Name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      theme={t}
                      delay={0.35}
                      completed={completedFields.has('name')}
                      onFieldBlur={() => handleFieldBlur('name')}
                    />
                    <GlowInput
                      icon={AtSign}
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      theme={t}
                      delay={0.4}
                      completed={completedFields.has('email')}
                      onFieldBlur={() => handleFieldBlur('email')}
                    />
                  </div>

                  {/* Row 2: Phone + Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <GlowInput
                      icon={Phone}
                      label="Phone"
                      name="phone"
                      type="tel"
                      placeholder="(608) 555-1234"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      theme={t}
                      delay={0.45}
                      completed={completedFields.has('phone')}
                      onFieldBlur={() => handleFieldBlur('phone')}
                    />
                    <GlowInput
                      icon={Home}
                      label="Address"
                      name="address"
                      placeholder="123 Main St, Madison"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      theme={t}
                      delay={0.5}
                      completed={completedFields.has('address')}
                      onFieldBlur={() => handleFieldBlur('address')}
                    />
                  </div>

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <label className={`text-[11px] font-medium ${t.labelColor} uppercase tracking-wider mb-1.5 block`}>
                      Message
                    </label>
                    <div className="relative group flex items-start gap-2">
                      <div className="pt-3">
                        <AnimatedCheckOrb completed={completedFields.has('message')} accentColor={t.accentSolid} />
                      </div>
                      <div className="relative flex-1">
                        <div className={`absolute left-3 top-3 transition-colors duration-200 ${messageFocused ? t.accent : 'text-white/25'}`}>
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <textarea
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setMessageFocused(true)}
                          onBlur={() => { setMessageFocused(false); handleFieldBlur('message'); }}
                          required
                          className={`
                            w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white
                            placeholder:text-white/20 resize-none
                            border ${messageFocused ? t.inputBorderFocus : t.inputBorder}
                            ${t.inputBg} backdrop-blur-sm
                            outline-none transition-all duration-300
                          `}
                          style={{
                            boxShadow: messageFocused ? t.inputGlow : 'none',
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Trust strip */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-white/30 pt-1`}
                  >
                    <span className="flex items-center gap-1">
                      <Clock className={`h-3 w-3 ${t.accent} opacity-60`} />
                      24hr quote
                    </span>
                    <span className="flex items-center gap-1">
                      <Shield className={`h-3 w-3 ${t.accent} opacity-60`} />
                      No obligation
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className={`h-3 w-3 ${t.accent} opacity-60`} />
                      Dane County
                    </span>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.65 }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`
                        relative w-full py-3.5 rounded-xl font-bold text-sm
                        bg-gradient-to-r ${t.ctaGradient} bg-[length:200%_auto]
                        text-white overflow-hidden
                        hover:scale-[1.02] active:scale-[0.98]
                        disabled:opacity-60 disabled:pointer-events-none
                        transition-all duration-300
                      `}
                      style={{
                        boxShadow: t.ctaShadow,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = t.ctaShadowHover;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = t.ctaShadow;
                      }}
                    >
                      {/* Shimmer sweep */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-btn" />
                      <span className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Claim This Offer
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </span>
                    </button>
                  </motion.div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
