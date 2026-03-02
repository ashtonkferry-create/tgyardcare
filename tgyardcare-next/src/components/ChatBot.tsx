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

type Message = { role: 'user' | 'assistant'; content: string };

interface CustomerInfo {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  serviceInterest?: string;
  propertyType?: string;
  urgency?: string;
  timeline?: string;
  preferredContact?: string;
}

interface LeadScore {
  total: number;
  serviceInterest: number;
  urgency: number;
  contactInfo: number;
  budget: number;
}

type QuoteStep =
  | 'idle'
  | 'property-type'
  | 'location'
  | 'service-details'
  | 'timeline'
  | 'contact-method'
  | 'contact-info'
  | 'complete'
  | 'feedback'
  | 'feedback-submitted';

const isWinterSeason = () => {
  const month = new Date().getMonth();
  return month >= 10 || month <= 2;
};

const getSeasonalGreeting = () => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "Spring cleanup season is here — let's get your yard looking fresh.";
  if (month >= 5 && month <= 8) return "Keep your lawn pristine all summer. How can we help?";
  if (month >= 9 && month <= 10) return "Fall is the perfect time to prep your yard for winter.";
  return "We've got you covered this winter — from snow removal to gutter care.";
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
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({});
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [leadScore, setLeadScore] = useState<LeadScore>({ total: 0, serviceInterest: 0, urgency: 0, contactInfo: 0, budget: 0 });
  const [quoteStep, setQuoteStep] = useState<QuoteStep>('idle');
  const [selectedService, setSelectedService] = useState<string>('');
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
      setCustomerInfo({});
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

  // ============ BUSINESS LOGIC (UNCHANGED) ============

  const calculateLeadScore = (info: CustomerInfo, msgs: Message[]) => {
    let score: LeadScore = { total: 0, serviceInterest: 0, urgency: 0, contactInfo: 0, budget: 0 };

    if (info.serviceInterest) score.serviceInterest = 30;
    else {
      const serviceKeywords = ['mowing', 'gutter', 'cleanup', 'mulch', 'weeding', 'fertiliz', 'herbicide', 'snow', 'commercial', 'hoa'];
      const hasServiceMention = msgs.some(m =>
        serviceKeywords.some(k => m.content.toLowerCase().includes(k))
      );
      if (hasServiceMention) score.serviceInterest = 15;
    }

    const urgencyKeywords = ['asap', 'urgent', 'soon', 'today', 'this week', 'immediately', 'emergency'];
    const hasUrgency = msgs.some(m =>
      urgencyKeywords.some(k => m.content.toLowerCase().includes(k))
    );
    if (hasUrgency || info.timeline === 'asap') score.urgency = 25;
    else if (info.timeline === 'this-week') score.urgency = 20;
    else if (info.timeline === 'this-month') score.urgency = 10;

    let contactPoints = 0;
    if (info.name) contactPoints += 10;
    if (info.email) contactPoints += 10;
    if (info.phone) contactPoints += 10;
    if (info.address) contactPoints += 5;
    score.contactInfo = Math.min(contactPoints, 30);

    if (info.propertyType === 'commercial' || info.propertyType === 'hoa') score.budget = 15;
    else if (info.propertyType === 'residential') score.budget = 10;

    score.total = score.serviceInterest + score.urgency + score.contactInfo + score.budget;
    return score;
  };

  const saveConversation = async (msgs: Message[], info: CustomerInfo = customerInfo) => {
    if (!sessionId) return;

    const secret = sessionSecret || localStorage.getItem('chat_session_secret') || '';
    if (!secret) return;

    const score = calculateLeadScore(info, msgs);
    setLeadScore(score);

    try {
      const { error } = await supabase.functions.invoke('chat-conversations', {
        body: {
          action: 'save',
          sessionId,
          sessionSecret: secret,
          messages: msgs,
          customer: {
            name: info.name,
            email: info.email,
            phone: info.phone,
            address: info.address,
            serviceInterest: info.serviceInterest,
            propertyType: info.propertyType,
            timeline: info.timeline,
            preferredContact: info.preferredContact
          }
        }
      });

      if (error) {
        console.error('Failed to save chat conversation:', error);
      }
    } catch (error) {
      console.error('Failed to save chat conversation:', error);
    }

    if ((score.total > 50 || quoteStep === 'complete') && (info.name || info.email || info.phone)) {
      try {
        await supabase.functions.invoke('lead-alert', {
          body: {
            customerName: info.name,
            customerEmail: info.email,
            customerPhone: info.phone,
            customerAddress: info.address,
            serviceInterest: info.serviceInterest,
            propertyType: info.propertyType,
            timeline: info.timeline,
            preferredContact: info.preferredContact,
            leadScore: score.total,
            messages: msgs
          }
        });
      } catch (error) {
        console.error('Failed to send lead alert:', error);
      }
    }
  };

  const addAssistantMessage = (content: string) => {
    setMessages(prev => [...prev, { role: 'assistant', content }]);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, { role: 'user', content }]);
  };

  const startQuoteFlow = (service: string) => {
    setSelectedService(service);
    setCustomerInfo(prev => ({ ...prev, serviceInterest: service }));
    addUserMessage(service);
    setShowQuickReplies(false);
    setQuoteStep('property-type');
    setTimeout(() => {
      addAssistantMessage("Great choice. Is this for a residential property, commercial property, or HOA/multi-property?");
    }, 300);
  };

  const handlePropertyType = (type: string) => {
    const typeLabel = type === 'residential' ? 'Residential' : type === 'commercial' ? 'Commercial' : 'HOA/Multi-property';
    addUserMessage(typeLabel);
    setCustomerInfo(prev => ({ ...prev, propertyType: type }));
    setQuoteStep('location');
    setTimeout(() => {
      addAssistantMessage("What's your address or nearest cross streets? Include your ZIP or neighborhood if you can.");
    }, 300);
  };

  const handleLocationSubmit = () => {
    if (!input.trim()) return;
    const location = input.trim();
    addUserMessage(location);
    setCustomerInfo(prev => ({ ...prev, address: location }));
    setInput('');
    setQuoteStep('service-details');

    setTimeout(() => {
      const serviceQuestions: Record<string, string> = {
        'Lawn care': "How often would you like mowing service? Weekly, bi-weekly, or one-time?",
        'Gutter services': "How many stories is your home? And do you have gutter guards installed?",
        'Fertilization/weed control': "Are you looking for a seasonal fertilization plan or a one-time treatment?",
        'Cleanups (spring/fall)': "Is this for spring cleanup, fall cleanup, or both seasons?",
        'Mulch/landscaping': "What areas need mulching? Garden beds, trees, or the full property?",
        'Commercial/HOA': "How many properties or units need service? What's the primary service needed?",
        'Snow removal': "What areas need clearing? Driveway, sidewalks, parking lot, or the full property?",
        'Get a quote': "What service are you most interested in? Mowing, gutters, cleanups, fertilization, or mulching?",
        'Seasonal cleanup': "Is this for spring cleanup, fall cleanup, or both seasons?"
      };
      addAssistantMessage(serviceQuestions[selectedService] || "Tell me more about what you need.");
    }, 300);
  };

  const handleServiceDetailsSubmit = () => {
    if (!input.trim()) return;
    addUserMessage(input.trim());
    setInput('');
    setQuoteStep('timeline');
    setTimeout(() => {
      addAssistantMessage("When do you need this done?");
    }, 300);
  };

  const handleTimeline = (timeline: string) => {
    const timelineLabels: Record<string, string> = {
      'asap': 'ASAP',
      'this-week': 'This week',
      'this-month': 'This month',
      'just-pricing': 'Just getting pricing'
    };
    addUserMessage(timelineLabels[timeline]);
    setCustomerInfo(prev => ({ ...prev, timeline }));
    setQuoteStep('contact-method');
    setTimeout(() => {
      addAssistantMessage("How would you prefer we reach out with your quote?");
    }, 300);
  };

  const handleContactMethod = (method: string) => {
    const methodLabels: Record<string, string> = {
      'text': 'Text message',
      'call': 'Phone call',
      'email': 'Email'
    };
    addUserMessage(methodLabels[method]);
    setCustomerInfo(prev => ({ ...prev, preferredContact: method }));
    setQuoteStep('contact-info');
    setTimeout(() => {
      const placeholder = method === 'email'
        ? "Please share your name and email address."
        : "Please share your name and phone number.";
      addAssistantMessage(placeholder);
    }, 300);
  };

  const handleContactInfoSubmit = async () => {
    if (!input.trim()) return;
    const contactInput = input.trim();
    addUserMessage(contactInput);

    const updatedInfo = { ...customerInfo };

    const emailMatch = contactInput.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) updatedInfo.email = emailMatch[0];

    const phoneMatch = contactInput.match(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/);
    if (phoneMatch) updatedInfo.phone = phoneMatch[0].replace(/[-.\s]/g, '-');

    const nameText = contactInput
      .replace(/[\w.-]+@[\w.-]+\.\w+/g, '')
      .replace(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/g, '')
      .trim();

    if (nameText && nameText.length > 1) {
      updatedInfo.name = nameText.split(/[,\n]/)[0].trim();
    }

    setCustomerInfo(updatedInfo);
    setInput('');

    if (!updatedInfo.name || updatedInfo.name.length < 2) {
      setTimeout(() => {
        if (updatedInfo.email || updatedInfo.phone) {
          addAssistantMessage("Got it! I just need your name to complete the quote request.");
        } else {
          addAssistantMessage("I didn't catch your name. Could you share your name along with your contact info?");
        }
      }, 300);
      return;
    }

    if (!updatedInfo.email && !updatedInfo.phone) {
      setTimeout(() => {
        addAssistantMessage(`Thanks, ${updatedInfo.name}! I just need your phone number or email to send your quote.`);
      }, 300);
      return;
    }

    setQuoteStep('complete');

    const finalMessages = [...messages, { role: 'user' as const, content: contactInput }];

    setTimeout(() => {
      addAssistantMessage(`Perfect, ${updatedInfo.name}! Our team will follow up within 24 hours with your personalized quote. We look forward to working with you.`);
      setTimeout(() => {
        setQuoteStep('feedback');
        addAssistantMessage("Before you go — how was your experience?");
      }, 2000);
    }, 300);

    await saveConversation(finalMessages, updatedInfo);
  };

  const streamChat = async (userMessage: string) => {
    const userMsg: Message = { role: 'user', content: userMessage };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);
    setInput('');
    setShowQuickReplies(false);

    const updatedInfo = { ...customerInfo };
    if (userMessage.toLowerCase().includes('@') && userMessage.includes('.')) {
      const emailMatch = userMessage.match(/[\w.-]+@[\w.-]+\.\w+/);
      if (emailMatch) updatedInfo.email = emailMatch[0];
    }
    if (userMessage.match(/\d{3}[-.]?\d{3}[-.]?\d{4}/)) {
      const phoneMatch = userMessage.match(/\d{3}[-.]?\d{3}[-.]?\d{4}/);
      if (phoneMatch) updatedInfo.phone = phoneMatch[0];
    }
    if (userMessage.toLowerCase().includes('commercial') || userMessage.toLowerCase().includes('business') || userMessage.toLowerCase().includes('hoa')) {
      updatedInfo.propertyType = 'commercial';
    }
    if (userMessage.toLowerCase().includes('asap') || userMessage.toLowerCase().includes('urgent')) {
      updatedInfo.timeline = 'asap';
    }
    setCustomerInfo(updatedInfo);

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

      const finalMessages = [...updatedMessages, { role: 'assistant' as const, content: assistantContent }];
      setMessages(finalMessages);
      await saveConversation(finalMessages, updatedInfo);
      setIsLoading(false);
    } catch (e) {
      console.error('Chat error:', e);
      const errorMsg = {
        role: 'assistant' as const,
        content: "I'm having trouble connecting right now. Please call us at 608-535-6057 or email totalguardllc@gmail.com — we're happy to help."
      };
      const finalMessages = [...updatedMessages, errorMsg];
      setMessages(finalMessages);
      await saveConversation(finalMessages, updatedInfo);
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    if (quoteStep === 'location') {
      handleLocationSubmit();
    } else if (quoteStep === 'service-details') {
      handleServiceDetailsSubmit();
    } else if (quoteStep === 'contact-info') {
      handleContactInfoSubmit();
    } else {
      streamChat(input);
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

  const commercialFAQs = [
    { text: "Documentation & invoicing", query: "How do you handle documentation and invoicing for commercial properties?" },
    { text: "Multi-property service", query: "Can you service multiple properties or locations?" },
    { text: "Response time", query: "What's your typical response time for service requests?" },
    { text: "Insurance & liability", query: "Are you insured and what liability coverage do you have?" }
  ];

  const isCommercialFlow = customerInfo.propertyType === 'commercial' || customerInfo.propertyType === 'hoa' || selectedService === 'Commercial/HOA';

  // Quote step tracking
  const STEP_ORDER = ['property-type', 'location', 'service-details', 'timeline', 'contact-method', 'contact-info'] as const;
  const STEP_LABELS = ['Property', 'Location', 'Details', 'Timeline', 'Contact', 'Info'];
  const currentStepIdx = STEP_ORDER.indexOf(quoteStep as typeof STEP_ORDER[number]);
  const showProgress = quoteStep !== 'idle' && quoteStep !== 'complete' && quoteStep !== 'feedback' && quoteStep !== 'feedback-submitted';

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

                {/* ===== PROPERTY TYPE ===== */}
                {quoteStep === 'property-type' && !isLoading && (
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2">
                      <GlassChip onClick={() => handlePropertyType('residential')} icon={<Home className="h-4 w-4" />} delay={0}>
                        Residential
                      </GlassChip>
                      <GlassChip onClick={() => handlePropertyType('commercial')} icon={<Building2 className="h-4 w-4" />} delay={0.08}>
                        Commercial
                      </GlassChip>
                      <GlassChip onClick={() => handlePropertyType('hoa')} icon={<Users className="h-4 w-4" />} delay={0.16}>
                        HOA / Multi
                      </GlassChip>
                    </div>
                  </div>
                )}

                {/* ===== TIMELINE ===== */}
                {quoteStep === 'timeline' && !isLoading && (
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: 'asap', label: 'ASAP' },
                        { value: 'this-week', label: 'This week' },
                        { value: 'this-month', label: 'This month' },
                        { value: 'just-pricing', label: 'Just pricing' }
                      ].map((option, idx) => (
                        <GlassChip key={option.value} onClick={() => handleTimeline(option.value)} delay={idx * 0.08}>
                          {option.label}
                        </GlassChip>
                      ))}
                    </div>
                  </div>
                )}

                {/* ===== CONTACT METHOD ===== */}
                {quoteStep === 'contact-method' && !isLoading && (
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2">
                      <GlassChip onClick={() => handleContactMethod('text')} icon={<MessageSquare className="h-4 w-4" />} delay={0}>
                        Text
                      </GlassChip>
                      <GlassChip onClick={() => handleContactMethod('call')} icon={<PhoneCall className="h-4 w-4" />} delay={0.08}>
                        Call
                      </GlassChip>
                      <GlassChip onClick={() => handleContactMethod('email')} icon={<Mail className="h-4 w-4" />} delay={0.16}>
                        Email
                      </GlassChip>
                    </div>
                  </div>
                )}

                {/* ===== COMMERCIAL FAQs ===== */}
                {isCommercialFlow && quoteStep === 'complete' && !isLoading && (
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2">
                      {commercialFAQs.map((faq, idx) => (
                        <GlassChip key={idx} onClick={() => streamChat(faq.query)} delay={idx * 0.08}>
                          {faq.text}
                        </GlassChip>
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* ===== PROMO BANNER ===== */}
            {quoteStep === 'idle' && (
              <div className="px-4 py-2 bg-emerald-500/[0.06] border-t border-emerald-500/10">
                <p className="text-xs text-center text-white/60 font-medium">
                  <span className="font-bold text-emerald-400">Limited Time:</span> Save 10% on gutter cleaning
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
                        className="w-full p-3 text-sm border border-white/[0.08] rounded-xl bg-white/[0.04] text-white/90 placeholder:text-white/25 resize-none focus:outline-none focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500/20"
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
                            addAssistantMessage("Thank you for your feedback — it truly helps us improve.");
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
                      setCustomerInfo({});
                      setSelectedService('');
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
            {quoteStep !== 'feedback' && quoteStep !== 'feedback-submitted' && (
              <div className="p-3 border-t border-white/[0.06]">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      quoteStep === 'location' ? "Enter address or cross streets..." :
                      quoteStep === 'service-details' ? "Describe your needs..." :
                      quoteStep === 'contact-info' ? "Name and phone/email..." :
                      "Ask a question..."
                    }
                    className="flex-1 h-12 px-4 text-sm text-white/90 placeholder:text-white/25
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
