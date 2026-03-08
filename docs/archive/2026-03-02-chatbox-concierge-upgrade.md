# Chatbox "The Concierge" Upgrade

**Goal:** Transform the basic chatbox into a billion-dollar-feel concierge experience with dark glass-morphism, spring animations, rich message cards, and warm AI personality.

**Approach:** Concierge Luxury meets Apple polish — dark glass panel, emerald accents, larger window, Framer Motion springs, warm authoritative tone.

---

## Changes

### Button: 72px dark glass, emerald glow ring (breathing), seasonal icon, kill red ping
### Window: 420×620px, dark glass bg-gray-950/95 backdrop-blur-2xl, spring open animation
### Header: Dark sophisticated gradient, larger TG shield with glow, "Your Yard Care Concierge" subtitle, emerald accent line
### Messages: text-sm, glass cards with left emerald accent bar, assistant avatar, slide-in animations
### Typing: 3-dot bounce with "TotalGuard is typing..." text
### Quick Replies: Glass chips with lucide icons, stagger animation, larger touch targets
### Quote Progress: Step indicator pills replacing tiny bar
### Input: h-12 glass input, emerald focus ring, larger send button
### AI Tone: Warm concierge opening, seasonal context, confident-but-friendly
### Phone Fix: 920-629-6934 → 608-535-6057 (match JSON-LD)

## Files
- `src/components/ChatBot.tsx` — Complete UI rewrite (keep business logic)
- `src/components/DeferredChatBot.tsx` — No changes
- `src/contexts/ChatContext.tsx` — No changes
