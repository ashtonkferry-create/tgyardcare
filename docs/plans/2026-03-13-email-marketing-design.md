# TotalGuard Email Marketing System — Design Document

**Date**: 2026-03-13
**Platform**: Brevo (formerly Sendinblue)
**Status**: Implementation In Progress

---

## Overview

A complete, year-round email marketing engine for TotalGuard Yard Care. 67+ conversion-engineered emails across 10 campaign categories, built on 6 HTML master templates, powered by Brevo API + n8n automation workflows.

Every email follows a billionaire-brand standard: A/B subject lines, real Google reviews, personalized content, mobile-first HTML, urgency mechanics, and clear CTAs.

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│  BREVO (Email Delivery + Contact Management)             │
│  - Transactional API (SMTP alternative)                  │
│  - Contact lists + segments                              │
│  - Template storage (optional — we inline HTML)          │
│  - Analytics: opens, clicks, bounces, unsubscribes       │
└────────────────────┬─────────────────────────────────────┘
                     │ API calls
┌────────────────────┴─────────────────────────────────────┐
│  n8n WORKFLOWS (Automation Engine)                        │
│  TG-08: Welcome series (5 emails, day 0-30)              │
│  TG-09: Lead follow-up (12 emails, 3 tiers)             │
│  TG-10: Cross-sell engine (6 emails, service-based)      │
│  TG-11: Re-engagement ladder (4 emails, 90-365 days)    │
│  TG-12: VIP upgrade (2 emails)                           │
│  TG-13: Post-job review request (2 emails)               │
│  TG-14: Spring campaign (4 emails, Feb-Mar)              │
│  TG-15: Fall campaign (4 emails, Aug-Oct)                │
│  TG-16: Snow campaign (3 emails, Oct-Nov)                │
│  TG-17: Newsletter "The Yard Report" (12/year)           │
│  TG-18: Flash sales (4 campaigns × 3 emails)            │
│  TG-56: Weather-triggered (5 templates)                  │
└────────────────────┬─────────────────────────────────────┘
                     │ queries
┌────────────────────┴─────────────────────────────────────┐
│  SUPABASE (Customer Data + Tracking)                      │
│  - email_campaigns: campaign metadata                    │
│  - email_sends: per-send tracking (sent, opened, clicked)│
│  - email_enrollments: series progress per contact        │
│  - customers: contact info, services, segments           │
│  - email_frequency_caps: prevent over-sending            │
└──────────────────────────────────────────────────────────┘
```

---

## Templates (6 HTML Master Templates)

| Template | File | Use Case |
|----------|------|----------|
| `tg-hero.html` | 449 lines | Seasonal campaigns, promotions, general |
| `tg-welcome.html` | Complete | New customer welcome series |
| `tg-review.html` | Complete | Google review requests |
| `tg-referral.html` | Complete | $25/$25 referral program |
| `tg-urgency.html` | Complete | Weather alerts, flash sales, deadlines |
| `tg-educational.html` | Complete | Newsletter, tips, nurture content |

All templates:
- TABLE-based layout for Outlook/Gmail/Apple Mail/Yahoo
- Inline CSS + MSO VML conditionals for Outlook buttons
- Mobile responsive at 480-620px breakpoint
- UTM tracking on all links
- Hidden preheader text with whitespace padding
- {{variable}} syntax for Brevo/n8n token replacement

---

## Campaign Inventory (67+ Emails)

### 1. Welcome Series (5 emails) — `welcome-series.json`
| # | Day | Subject | Goal |
|---|-----|---------|------|
| 1 | 0 | "Welcome to TotalGuard" | Build trust, set expectations |
| 2 | 7 | "Your Yard's Secret Weapon" | Position as expert, soft-sell fertilization |
| 3 | 14 | "Your Opinion Means Everything" | Get Google review |
| 4 | 21 | "Get $25. Give $25." | Drive referrals |
| 5 | 30 | "Your Yard's Next Chapter" | Cross-sell seasonal service |

### 2. Lead Follow-Up (12 emails) — `lead-followup.json`
**Hot tier** (Days 1, 3, 5): Quote ready → Check-in → Quote expires
**Warm tier** (Days 2, 5, 10): Differentiators → Social proof → Scarcity
**Cold tier** (Days 3, 7, 14, 30): Tips → Stories → 10% off → Graceful close

### 3. Seasonal Campaigns (11 emails) — `seasonal-campaigns.json`
**Spring** (Feb 1 → Mar 15): Winter damage → Neighbors booked → Last call → Bundle
**Fall** (Aug 15 → Oct 15): Frost prep → Gutter problem → Fall bundle → Snow transition
**Snow** (Oct 1 → Nov 15): Pain picture → Route capacity → Final call

### 4. Cross-Sell Engine (6 emails) — `cross-sell.json`
Mowing → Fertilization → Aeration → Fall bundle → Snow → VIP

### 5. Re-Engagement Ladder (4 emails) — `reengagement.json`
90 days (warm) → 120 days (10% off) → 180 days ($25 + personal note) → 365 days (breakup)

### 6. Newsletter "The Yard Report" (12 emails) — `newsletter-yard-report.json`
Monthly, 1st Tuesday. Seasonal tips + Yard of Month + Offer + Local events.

### 7. Flash Sales (12 emails) — `flash-sales.json`
4 campaigns × 3 emails: Spring Early Bird, Midsummer Referral Blitz, Fall Bundle Blowout, Snow Rate Lock

### 8. Weather-Triggered (5 templates) — `weather-triggered.json`
Freeze warning, First snow, Spring thaw, Heat wave, Major storm

### 9. Review Request (2 emails) — `review-request.json`
Post-job (24-48hrs) + Follow-up (7 days later)

### 10. VIP Upgrade (2 emails) — `vip-upgrade.json`
Status notification + Exclusive seasonal offer

---

## Email Standard (Every Email)

| Element | Requirement |
|---------|------------|
| Subject Lines | A/B tested, 2 variants per email |
| Preview Text | Complements subject, never repeats |
| Hero Image | Full-width with {{image_url}} placeholder |
| Headline | Benefit-first, 8 words max |
| Body Copy | 3-4 short paragraphs, conversational, local |
| Social Proof | Real Google review with stars + name |
| Urgency | Countdown, limited spots, or deadline |
| Primary CTA | Big button, repeated 2x (mid + bottom) |
| Secondary CTA | Phone call link |
| Trust Bar | Licensed, Insured, 4.9★, 500+ properties |
| Personalization | {{first_name}}, {{city}}, {{last_service}} |
| Footer | Logo, address, phone, social, unsubscribe |
| Mobile | Single column, 44px+ tap targets, 16px+ text |

---

## Reviews Strategy

72+ real Google reviews stored in `reviews-data.json`. Each email uses a specific, relevant review:
- Service-specific reviews matched to service-focused emails
- Geographic diversity across Madison-area communities
- Mix of detailed and concise reviews
- All verified Google reviews from GBP

---

## Referral Program

- **Referrer**: $25 off any service of their choice
- **Referee**: $25 off their first service with TotalGuard
- **No limit** on referrals
- Flash sale (July): Double rewards — $50 each

---

## Seasonal Calendar

| Month | Newsletter | Campaign | Flash Sale |
|-------|-----------|----------|------------|
| Jan | Winter Survival Guide | — | Spring Early Bird (15th) |
| Feb | Spring Is Closer | Spring Campaign starts (1st) | Early Bird reminder (10th), Last call (28th) |
| Mar | Spring Awakening | Spring Campaign (1st, 15th) | — |
| Apr | Growing Season | — | — |
| May | Peak Spring | — | — |
| Jun | Summer Mode | — | — |
| Jul | Midsummer Check-In | — | Referral Blitz (1st, 15th, 28th) |
| Aug | Fall Prep Starts | Fall Campaign starts (15th) | — |
| Sep | The Critical Month | Fall Campaign (1st, 20th) | Fall Bundle (1st, 20th, 28th) |
| Oct | Fall Crunch Time | Fall (15th) + Snow (1st, 20th) | Snow Rate Lock (15th, 25th, 30th) |
| Nov | Winterize Everything | Snow Campaign (5th) | — |
| Dec | Season in Review | — | — |

---

## Brevo Configuration

### Account Setup
- Domain authentication: SPF + DKIM for tgyardcare.com
- Sender: totalguardllc@gmail.com (or noreply@tgyardcare.com)
- Sender name: "Vance from TotalGuard" (personal) or "TotalGuard Yard Care" (campaigns)
- API key: stored in environment variables

### Contact Lists
- All Customers (synced from Supabase)
- Active Leads (from website forms + Jobber)
- VIP Customers (3+ services)
- Dormant Customers (no service 90+ days)
- Newsletter Subscribers

### Frequency Caps
- Max 3 emails per week per contact
- Max 1 promotional email per day
- Welcome series takes priority over campaigns
- Weather alerts bypass frequency caps

---

## File Structure

```
tgyardcare/automation/email-templates/
├── tg-hero.html                    # Seasonal/promo template
├── tg-welcome.html                 # Welcome series template
├── tg-review.html                  # Review request template
├── tg-referral.html                # Referral program template
├── tg-urgency.html                 # Urgency/weather template
├── tg-educational.html             # Newsletter/tips template
├── reviews-data.json               # 72+ real Google reviews
└── campaigns/
    ├── welcome-series.json         # 5 emails
    ├── lead-followup.json          # 12 emails (3 tiers)
    ├── seasonal-campaigns.json     # 11 emails (spring+fall+snow)
    ├── cross-sell.json             # 6 emails
    ├── reengagement.json           # 4 emails
    ├── newsletter-yard-report.json # 12 monthly newsletters
    ├── flash-sales.json            # 12 emails (4 campaigns)
    ├── weather-triggered.json      # 5 templates
    ├── review-request.json         # 2 emails
    └── vip-upgrade.json            # 2 emails
```

---

## Implementation Status

- [x] 6 HTML master templates built
- [x] 72+ real Google reviews extracted to JSON
- [x] 67+ email content configs with full copy
- [x] TG-08 welcome workflow upgraded to HTML
- [ ] TG-09 through TG-16 workflow upgrades
- [ ] New workflows: TG-17 (newsletter), TG-18 (flash sales)
- [ ] Brevo domain authentication setup
- [ ] Brevo contact list sync from Supabase
- [ ] Image assets (awaiting photos from Vance)
