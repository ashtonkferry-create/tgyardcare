'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import {
  MessageCircle, X, Send, Loader2, Phone, Mail, Building2, Home, Users, MapPin,
  Shield, Star, ThumbsUp, RefreshCw, Sparkles, ExternalLink,
  Scissors, Droplets, Leaf, Snowflake, MessageSquare, PhoneCall,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useChatContext } from '@/contexts/ChatContext';
import { usePromoSettings } from '@/hooks/usePromoSettings';

type Message = { role: 'user' | 'assistant'; content: string };

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

type QuoteStep =
  | 'idle'
  | 'service'
  | 'name'
  | 'email'
  | 'phone'
  | 'address'
  | 'description'
  | 'confirm'
  | 'submitting'
  | 'complete'
  | 'editing'
  | 'feedback'
  | 'feedback-submitted';

const serviceOptions = [
  { text: 'Lawn Mowing', icon: <Scissors className="h-4 w-4" /> },
  { text: 'Fertilization & Herbicide', icon: <Leaf className="h-4 w-4" /> },
  { text: 'Gutter Cleaning', icon: <Droplets className="h-4 w-4" /> },
  { text: 'Gutter Guards', icon: <Shield className="h-4 w-4" /> },
  { text: 'Spring Cleanup', icon: <Sparkles className="h-4 w-4" /> },
  { text: 'Fall Cleanup', icon: <Leaf className="h-4 w-4" /> },
  { text: 'Mulching & Garden Beds', icon: <Leaf className="h-4 w-4" /> },
  { text: 'Bush Trimming', icon: <Scissors className="h-4 w-4" /> },
  { text: 'Snow Removal', icon: <Snowflake className="h-4 w-4" /> },
  { text: 'Other', icon: <MessageSquare className="h-4 w-4" /> },
];

const isWinterSeason = () => {
  const month = new Date().getMonth();
  return month >= 10 || month <= 2;
};

const getSeasonalGreeting = () => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "Spring cleanup season is here. Let's get your yard looking fresh.";
  if (month >= 5 && month <= 8) return "Keep your lawn pristine all summer. How can we help?";
  if (month >= 9 && month <= 10) return "Fall is the perfect time to prep your yard for winter.";
  return "We've got you covered this winter, from snow removal to gutter care.";
};

// Typing indicator with bouncing dots
const TypingIndicator = () => (
  <div className="flex items-start gap-2.5">
    <div className="h-6 w-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
      <Shield className="h-3 w-3 text-emerald-400" />
    </div>
    <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-tl-md px-4 py-3">
      <div className="flex items-center gap-1.5">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-emerald-400/60"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
        <span className="text-[10px] text-white/30 ml-1">TotalGuard is typing...</span>
      </div>
    </div>
  </div>
);

// Glass chip button component
const GlassChip = ({
  children,
  onClick,
  icon,
  delay = 0,
}: {
  children: ReactNode;
  onClick: () => void;
  icon?: ReactNode;
  delay?: number;
}) => (
  <motion.button
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay, type: 'spring', stiffness: 300, damping: 25 }}
    onClick={onClick}
    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl
      bg-white/[0.05] border border-white/[0.08] text-white/80
      hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-white
      active:scale-[0.97] transition-all duration-200"
  >
    {icon}
    <span>{children}</span>
  </motion.button>
);

export const ChatBot = () => {
  const { isChatOpen: isOpen, setIsChatOpen: setIsOpen } = useChatContext();
  const { promotions, getPromoIndex } = usePromoSettings();
  const currentPromo = promotions.length > 0 ? promotions[getPromoIndex()] : null;

  const renderMessageWithLinks = (content: string, isUserMessage: boolean): ReactNode => {
    if (isUserMessage) return content;

    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }

      const linkText = match[1];
      const linkPath = match[2];

      parts.push(
        <a
          key={match.index}
          href={linkPath}
          onClick={() => setIsOpen(false)}
          className="inline-flex items-center gap-1 text-emerald-400 font-semibold hover:text-emerald-300 hover:underline transition-colors"
        >
          {linkText}
          <ExternalLink className="h-2.5 w-2.5" />
        </a>
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return parts.length > 0 ? parts : content;
  };

  const openingMessage = `Welcome to TotalGuard. ${getSeasonalGreeting()} What can I help you with today?`;

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: openingMessage }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [sessionSecret, setSessionSecret] = useState<string>('');
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [quoteStep, setQuoteStep] = useState<QuoteStep>('idle');
  const [selectedService, setSelectedService] = useState<string>('');
  const [quoteFormData, setQuoteFormData] = useState<QuoteFormData>({ name: '', email: '', phone: '', address: '', message: '' });
  const [editingField, setEditingField] = useState<keyof QuoteFormData | null>(null);
  const [feedbackRating, setFeedbackRating] = useState<number>(0);
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [feedbackHover, setFeedbackHover] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const CHAT_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/chat`;

  useEffect(() => {
    const initSession = () => {
      const sid = crypto.randomUUID();
      const bytes = new Uint8Array(32);
      crypto.getRandomValues(bytes);
      const secret = btoa(String.fromCharCode(...bytes))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/g, '');

      localStorage.setItem('chat_session_id', sid);
      localStorage.setItem('chat_session_secret', secret);
      setSessionId(sid);
      setSessionSecret(secret);

      setMessages([
        { role: 'assistant', content: openingMessage }
      ]);
      setShowQuickReplies(true);
      setQuoteStep('idle');
      setSelectedService('');
    };
    initSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isLoading) scrollToBottom();
  }, [isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  // ============ QUOTE FLOW LOGIC ============

  const addAssistantMessage = (content: string) => {
    setMessages(prev => [...prev, { role: 'assistant', content }]);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, { role: 'user', content }]);
  };

  const showConfirmation = (data: QuoteFormData) => {
    const summary =
      `Here's your quote request:\n\n` +
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Phone: ${data.phone}\n` +
      `Address: ${data.address}\n` +
      `Service: ${selectedService}\n` +
      `Details: ${data.message}\n\n` +
      `Does everything look correct?`;
    addAssistantMessage(summary);
    setQuoteStep('confirm');
  };

  const submitQuote = async (data: QuoteFormData) => {
    setQuoteStep('submitting');
    addAssistantMessage("Submitting your quote request...");
    try {
      const fullMessage = `Service: ${selectedService}\n${data.message}`;
      const { data: result, error } = await supabase.functions.invoke('contact-form', {
        body: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          message: fullMessage,
        },
      });
      if (error) throw new Error(error.message);
      if (!result?.success) throw new Error('Failed to submit');

      setQuoteStep('complete');
      setTimeout(() => {
        addAssistantMessage(`All set, ${data.name.split(/\s+/)[0]}! Your quote request has been submitted. Our team will follow up within 24 hours — check your email for a confirmation.`);
        setTimeout(() => {
          setQuoteStep('feedback');
          addAssistantMessage("Before you go — how was your experience?");
        }, 2000);
      }, 300);
    } catch (err) {
      console.error('Quote submission error:', err);
      setQuoteStep('confirm');
      setTimeout(() => {
        addAssistantMessage("Something went wrong submitting your quote. Please try again, or call us directly at 608-535-6057.");
      }, 300);
    }
  };

  const startQuoteFlow = (service: string) => {
    addUserMessage(service);
    setShowQuickReplies(false);

    if (service === 'Get a quote') {
      // Generic quote request — ask what service they need first
      setQuoteStep('service');
      setTimeout(() => {
        addAssistantMessage("Great — let's get your free quote started! What service are you interested in?");
      }, 300);
    } else {
      // Specific service selected — skip to name
      setSelectedService(service);
      setQuoteStep('name');
      setTimeout(() => {
        addAssistantMessage("Great choice! Let's get your free quote started. What's your full name?");
      }, 300);
    }
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    addUserMessage(service);
    setQuoteStep('name');
    setTimeout(() => {
      addAssistantMessage(`Got it — ${service}! What's your full name?`);
    }, 300);
  };

  const handleNameSubmit = () => {
    if (!input.trim()) return;
    const name = input.trim();
    addUserMessage(name);
    setInput('');
    if (name.length < 2) {
      setTimeout(() => addAssistantMessage("I need at least 2 characters for your name. Could you try again?"), 300);
      return;
    }
    const updated = { ...quoteFormData, name };
    setQuoteFormData(updated);
    if (editingField === 'name') {
      setEditingField(null);
      setTimeout(() => showConfirmation(updated), 300);
      return;
    }
    setQuoteStep('email');
    setTimeout(() => addAssistantMessage(`Nice to meet you, ${name}! What's your email address?`), 300);
  };

  const handleEmailSubmit = () => {
    if (!input.trim()) return;
    const email = input.trim().toLowerCase();
    addUserMessage(email);
    setInput('');
    if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(email)) {
      setTimeout(() => addAssistantMessage("That doesn't look like a valid email. Could you double-check?"), 300);
      return;
    }
    const updated = { ...quoteFormData, email };
    setQuoteFormData(updated);
    if (editingField === 'email') {
      setEditingField(null);
      setTimeout(() => showConfirmation(updated), 300);
      return;
    }
    setQuoteStep('phone');
    setTimeout(() => addAssistantMessage("Got it. What's the best phone number to reach you?"), 300);
  };

  const handlePhoneSubmit = () => {
    if (!input.trim()) return;
    const phone = input.trim();
    addUserMessage(phone);
    setInput('');
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setTimeout(() => addAssistantMessage("I need a valid phone number (at least 10 digits). Could you try again?"), 300);
      return;
    }
    const updated = { ...quoteFormData, phone };
    setQuoteFormData(updated);
    if (editingField === 'phone') {
      setEditingField(null);
      setTimeout(() => showConfirmation(updated), 300);
      return;
    }
    setQuoteStep('address');
    setTimeout(() => addAssistantMessage("What's your property address?"), 300);
  };

  const handleAddressSubmit = () => {
    if (!input.trim()) return;
    const address = input.trim();
    addUserMessage(address);
    setInput('');
    if (address.length < 5) {
      setTimeout(() => addAssistantMessage("Could you provide a more complete address? Include street, city, or ZIP if you can."), 300);
      return;
    }
    const updated = { ...quoteFormData, address };
    setQuoteFormData(updated);
    if (editingField === 'address') {
      setEditingField(null);
      setTimeout(() => showConfirmation(updated), 300);
      return;
    }
    setQuoteStep('description');
    setTimeout(() => addAssistantMessage("Last step — tell us about your project. Yard size, specific concerns, preferred schedule, anything that helps us give you an accurate quote."), 300);
  };

  const handleDescriptionSubmit = () => {
    if (!input.trim()) return;
    const description = input.trim();
    addUserMessage(description);
    setInput('');
    if (description.length < 5) {
      setTimeout(() => addAssistantMessage("Could you give us a bit more detail? Even a sentence or two helps us quote accurately."), 300);
      return;
    }
    const updated = { ...quoteFormData, message: description };
    setQuoteFormData(updated);
    if (editingField === 'message') {
      setEditingField(null);
      setTimeout(() => showConfirmation(updated), 300);
      return;
    }
    setTimeout(() => showConfirmation(updated), 300);
  };

  const handleEditField = (field: keyof QuoteFormData) => {
    const labels: Record<keyof QuoteFormData, string> = {
      name: "What should the name be?",
      email: "What's the correct email?",
      phone: "What's the correct phone number?",
      address: "What's the correct address?",
      message: "What should the project details say?",
    };
    const stepMap: Record<keyof QuoteFormData, QuoteStep> = {
      name: 'name',
      email: 'email',
      phone: 'phone',
      address: 'address',
      message: 'description',
    };
    setEditingField(field);
    addUserMessage(`Edit ${field === 'message' ? 'details' : field}`);
    setQuoteStep(stepMap[field]);
    setTimeout(() => addAssistantMessage(labels[field]), 300);
  };

  const streamChat = async (userMessage: string) => {
    const userMsg: Message = { role: 'user', content: userMessage };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);
    setInput('');
    setShowQuickReplies(false);

    // Free-form chat — no quote data extraction needed

    let assistantContent = '';
    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      const currentMessages = updatedMessages[updatedMessages.length - 1]?.role === 'assistant'
        ? updatedMessages.slice(0, -1)
        : updatedMessages;
      const newMessages = [...currentMessages, { role: 'assistant' as const, content: assistantContent }];
      setMessages(newMessages);
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!resp.ok || !resp.body) {
        throw new Error('Failed to start stream');
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) updateAssistant(content);
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      setMessages([...updatedMessages, { role: 'assistant' as const, content: assistantContent }]);
      setIsLoading(false);
    } catch (e) {
      console.error('Chat error:', e);
      setMessages([...updatedMessages, {
        role: 'assistant' as const,
        content: "I'm having trouble connecting right now. Please call us at 608-535-6057 or email totalguardllc@gmail.com. We're happy to help."
      }]);
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    switch (quoteStep) {
      case 'service': handleServiceSelect(input.trim()); setInput(''); break;
      case 'name': handleNameSubmit(); break;
      case 'email': handleEmailSubmit(); break;
      case 'phone': handlePhoneSubmit(); break;
      case 'address': handleAddressSubmit(); break;
      case 'description': handleDescriptionSubmit(); break;
      default: streamChat(input);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const serviceQuickReplies = [
    { text: "Get a quote", icon: <Sparkles className="h-4 w-4" /> },
    { text: "Lawn care", icon: <Scissors className="h-4 w-4" /> },
    { text: "Gutter services", icon: <Droplets className="h-4 w-4" /> },
    ...(isWinterSeason()
      ? [{ text: "Snow removal", icon: <Snowflake className="h-4 w-4" /> }]
      : [{ text: "Seasonal cleanup", icon: <Leaf className="h-4 w-4" /> }]
    ),
  ];


  // Quote step tracking
  const STEP_ORDER = ['service', 'name', 'email', 'phone', 'address', 'description', 'confirm'] as const;
  const STEP_LABELS = ['Service', 'Name', 'Email', 'Phone', 'Address', 'Details', 'Review'];
  const currentStepIdx = STEP_ORDER.indexOf(quoteStep as typeof STEP_ORDER[number]);
  const showProgress = quoteStep !== 'idle' && quoteStep !== 'complete' && quoteStep !== 'submitting' && quoteStep !== 'feedback' && quoteStep !== 'feedback-submitted';

  return (
    <>
      {/* ========== FLOATING CHAT BUTTON ========== */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full z-50
            bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-700
            border border-emerald-400/30
            shadow-[0_4px_20px_rgba(16,185,129,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]
            hover:shadow-[0_6px_28px_rgba(16,185,129,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]
            hover:scale-105 active:scale-95
            text-white transition-all duration-300
            animate-in fade-in slide-in-from-bottom-4
            flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6 drop-shadow-sm" />
          <span className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-emerald-300 rounded-full animate-ping opacity-60" />
          <span className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-emerald-300 rounded-full shadow-[0_0_6px_rgba(110,231,183,0.5)]" />
        </button>
      )}

      {/* ========== CHAT WINDOW ========== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6
              w-[88vw] sm:w-[380px] h-[60vh] sm:h-[520px] max-h-[520px]
              bg-gray-950/95 backdrop-blur-2xl
              border border-white/[0.06]
              rounded-2xl
              shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_12px_rgba(34,197,94,0.06)]
              z-50 flex flex-col
              overscroll-contain"
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* ===== HEADER ===== */}
            <div className="relative overflow-hidden rounded-t-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/95 to-emerald-950/95" />
              {/* Subtle radial glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,0.08)_0%,transparent_60%)]" />

              <div className="relative px-4 py-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Shield logo with emerald glow */}
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md" />
                      <div className="relative h-10 w-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-emerald-400" />
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-emerald-400 rounded-full ring-2 ring-gray-900" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white tracking-tight">TotalGuard</h3>
                      <p className="text-xs text-emerald-400/80 font-medium">Your Yard Care Concierge</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-white/40">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Online
                    </span>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              {/* Bottom accent line */}
              <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
            </div>

            {/* ===== CONTACT BAR ===== */}
            <div className="bg-white/[0.02] px-4 py-2 border-b border-white/[0.04]">
              <div className="flex items-center justify-between text-[11px] gap-2">
                <a href="tel:608-535-6057" className="flex items-center gap-1.5 text-white/50 hover:text-emerald-400 font-medium transition-colors whitespace-nowrap">
                  <Phone className="h-3.5 w-3.5" />
                  <span>608-535-6057</span>
                </a>
                <a href="mailto:totalguardllc@gmail.com" className="flex items-center gap-1.5 text-white/50 hover:text-emerald-400 font-medium transition-colors min-w-0">
                  <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate">totalguardllc@gmail.com</span>
                </a>
                <a
                  href="/service-areas"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1 text-white/50 hover:text-emerald-400 font-medium transition-colors whitespace-nowrap"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Areas</span>
                </a>
              </div>
            </div>

            {/* ===== QUOTE PROGRESS ===== */}
            {showProgress && (
              <div className="px-4 py-2.5 border-b border-white/[0.04] bg-white/[0.02]">
                <div className="flex items-center gap-1">
                  {STEP_ORDER.map((step, idx) => {
                    const isCompleted = idx < currentStepIdx;
                    const isCurrent = step === quoteStep;
                    return (
                      <div key={step} className="flex items-center gap-1 flex-1">
                        <div className="flex flex-col items-center flex-1">
                          <div
                            className={`h-1 w-full rounded-full transition-all duration-500 ${
                              isCompleted ? 'bg-emerald-500' :
                              isCurrent ? 'bg-emerald-500/50' :
                              'bg-white/[0.06]'
                            }`}
                          />
                          <span className={`text-[8px] mt-1 transition-colors ${
                            isCurrent ? 'text-emerald-400 font-medium' :
                            isCompleted ? 'text-white/40' :
                            'text-white/20'
                          }`}>
                            {STEP_LABELS[idx]}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ===== MESSAGES ===== */}
            <ScrollArea className="flex-1 px-4 py-3 overscroll-contain" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: msg.role === 'user' ? 16 : -16, y: 4 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.3 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'items-start gap-2.5'}`}
                  >
                    {/* Assistant avatar */}
                    {msg.role === 'assistant' && (
                      <div className="h-6 w-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="h-3 w-3 text-emerald-400" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2.5 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl rounded-tr-md shadow-lg shadow-emerald-500/20'
                          : 'bg-white/[0.04] border border-white/[0.06] text-white/90 rounded-2xl rounded-tl-md border-l-2 border-l-emerald-500/30'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {renderMessageWithLinks(msg.content, msg.role === 'user')}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isLoading && <TypingIndicator />}

                {/* ===== QUICK REPLIES ===== */}
                {showQuickReplies && !isLoading && messages.length <= 1 && quoteStep === 'idle' && (
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2">
                      {serviceQuickReplies.map((reply, idx) => (
                        <GlassChip
                          key={idx}
                          onClick={() => startQuoteFlow(reply.text)}
                          icon={reply.icon}
                          delay={idx * 0.08}
                        >
                          {reply.text}
                        </GlassChip>
                      ))}
                    </div>
                  </div>
                )}

                {/* ===== SERVICE SELECTION ===== */}
                {quoteStep === 'service' && !isLoading && (
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2">
                      {serviceOptions.map((opt, idx) => (
                        <GlassChip
                          key={idx}
                          onClick={() => handleServiceSelect(opt.text)}
                          icon={opt.icon}
                          delay={idx * 0.05}
                        >
                          {opt.text}
                        </GlassChip>
                      ))}
                    </div>
                  </div>
                )}

                {/* ===== CONFIRM / EDIT ===== */}
                {quoteStep === 'confirm' && !isLoading && (
                  <div className="pt-2 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <GlassChip
                        onClick={() => submitQuote(quoteFormData)}
                        icon={<CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                        delay={0}
                      >
                        Submit Quote
                      </GlassChip>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {([
                        ['name', 'Name'],
                        ['email', 'Email'],
                        ['phone', 'Phone'],
                        ['address', 'Address'],
                        ['message', 'Details'],
                      ] as [keyof QuoteFormData, string][]).map(([field, label], idx) => (
                        <motion.button
                          key={field}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: 0.1 + idx * 0.05 }}
                          onClick={() => handleEditField(field)}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg
                            bg-white/[0.03] border border-white/[0.06] text-white/50
                            hover:border-white/20 hover:text-white/80
                            active:scale-[0.97] transition-all duration-200"
                        >
                          Edit {label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* ===== PROMO BANNER ===== */}
            {quoteStep === 'idle' && currentPromo && (
              <div className="px-4 py-2 bg-emerald-500/[0.06] border-t border-emerald-500/10">
                <p className="text-xs text-center text-white/60 font-medium">
                  <span className="font-bold text-emerald-400">Limited Time:</span> Save {currentPromo.discount} on {currentPromo.service}
                </p>
              </div>
            )}

            {/* ===== FEEDBACK ===== */}
            {quoteStep === 'feedback' && (
              <div className="px-4 py-4 border-t border-white/[0.06] bg-white/[0.02]">
                <div className="text-center space-y-3">
                  <div className="flex justify-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setFeedbackRating(star)}
                        onMouseEnter={() => setFeedbackHover(star)}
                        onMouseLeave={() => setFeedbackHover(0)}
                        className="p-1 transition-transform hover:scale-125 active:scale-95"
                      >
                        <Star
                          className={`h-7 w-7 transition-colors duration-200 ${
                            star <= (feedbackHover || feedbackRating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-white/15'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {feedbackRating > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3"
                    >
                      <textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Tell us more (optional)"
                        className="w-full p-3 text-base sm:text-sm border border-white/[0.08] rounded-xl bg-white/[0.04] text-white/90 placeholder:text-white/25 resize-none focus:outline-none focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500/20"
                        rows={2}
                      />
                      <Button
                        onClick={async () => {
                          try {
                            await supabase.from('chatbot_feedback').insert({
                              session_id: sessionId,
                              rating: feedbackRating,
                              feedback_text: feedbackText.trim() || null,
                            });
                            setQuoteStep('feedback-submitted');
                            addAssistantMessage("Thank you for your feedback. It truly helps us improve.");
                          } catch (err) {
                            console.error('Failed to submit feedback:', err);
                          }
                        }}
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-5"
                      >
                        <ThumbsUp className="h-3.5 w-3.5 mr-1.5" />
                        Submit
                      </Button>
                    </motion.div>
                  )}
                  <button
                    onClick={() => setQuoteStep('feedback-submitted')}
                    className="text-xs text-white/30 hover:text-white/50 transition-colors"
                  >
                    Skip
                  </button>
                </div>
              </div>
            )}

            {/* ===== RESET / NEW QUOTE ===== */}
            {quoteStep === 'feedback-submitted' && (
              <div className="px-4 py-4 border-t border-white/[0.06] bg-white/[0.02]">
                <div className="text-center space-y-3">
                  <p className="text-xs text-white/40">
                    Need another quote or have more questions?
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setMessages([
                        { role: 'assistant', content: openingMessage }
                      ]);
                      setQuoteStep('idle');
                      setShowQuickReplies(true);
                      setSelectedService('');
                      setQuoteFormData({ name: '', email: '', phone: '', address: '', message: '' });
                      setEditingField(null);
                      setFeedbackRating(0);
                      setFeedbackText('');
                      setInput('');
                    }}
                    className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl
                      bg-gradient-to-r from-emerald-600 to-emerald-500 text-white
                      shadow-lg shadow-emerald-500/20
                      hover:shadow-xl hover:shadow-emerald-500/30
                      transition-all duration-300"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Start a New Quote</span>
                    <RefreshCw className="h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-500" />
                  </motion.button>
                </div>
              </div>
            )}

            {/* ===== INPUT AREA ===== */}
            {quoteStep !== 'feedback' && quoteStep !== 'feedback-submitted' && quoteStep !== 'confirm' && quoteStep !== 'submitting' && (
              <div className="p-3 border-t border-white/[0.06]">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      quoteStep === 'name' ? "Your full name..." :
                      quoteStep === 'email' ? "Your email address..." :
                      quoteStep === 'phone' ? "Your phone number..." :
                      quoteStep === 'address' ? "Your property address..." :
                      quoteStep === 'description' ? "Describe your project..." :
                      "Ask a question..."
                    }
                    className="flex-1 h-12 px-4 text-base sm:text-sm text-white/90 placeholder:text-white/25
                      bg-white/[0.04] border border-white/[0.08] rounded-xl
                      focus:outline-none focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500/20
                      disabled:opacity-40 transition-all duration-200"
                    disabled={isLoading}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="h-12 w-12 rounded-xl flex items-center justify-center
                      bg-emerald-600 hover:bg-emerald-500
                      disabled:opacity-30 disabled:hover:bg-emerald-600
                      shadow-lg shadow-emerald-500/20
                      transition-all duration-200"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                    ) : (
                      <Send className="h-4 w-4 text-white" />
                    )}
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
