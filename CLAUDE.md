# CLAUDE.md — Workely.AI

## SESSION START PROTOCOL (NON-NEGOTIABLE — ALWAYS FIRST)

At the start of EVERY session, before ANY other action:
1. **Invoke `/gsd:progress`** — loads project state, current phase, pending todos
2. **Invoke `/gsd:resume-work`** if mid-phase work was in progress
3. **Route ALL structured work through GSD** — use `/gsd:plan-phase`, `/gsd:execute-phase`, `/gsd:quick` for every task

**GSD is the operating system for all work. No task bypasses it.**

---

## Project
- **App**: app.workely.ai — AI agent platform with customer dashboards
- **Hosting**: Vercel
- **Stack**: Next.js 15 + React 19 + TypeScript + Tailwind CSS v4
- **Backend**: Supabase (Auth, DB, Edge Functions) + n8n (Automation)
- **Payments**: Stripe
- **Design Goal**: Premium, animation-rich SaaS UI that rivals Linear, Vercel, and Raycast

---

## WORKING PHILOSOPHY (NON-NEGOTIABLE)

These rules govern how Claude operates on EVERY task. No exceptions.

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately — don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One tack per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests — then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

### 7. Task Management
1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plans**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

### 8. Core Principles
- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.

### 9. The Shortest Path Rule (NON-NEGOTIABLE)
- **Research before recommending**: Before suggesting ANY action that costs money, requires a third-party service, or sends the user on a multi-step journey — STOP and research whether a simpler/free/direct path exists first.
- **Never recommend paid intermediaries**: If the goal is A→C, never suggest A→B→C where B costs money unless A→C is proven impossible with evidence.
- **Present ALL options upfront**: When multiple paths exist, list them ALL with pros/cons/costs BEFORE the user takes action. Let THEM decide.
- **Verify constraints before acting**: Don't assume platform limitations. Research and verify claims before building workarounds.
- **If uncertain, say so**: "I'm not 100% sure — let me verify before you spend money/time on this."
- **Ask yourself every time**: "Is there a way to do this that costs $0, takes fewer steps, and achieves the same result?"

---

## MANDATORY WORKFLOW: THINK > PLAN > BUILD > VERIFY

Follow this sequence for any non-trivial task:

1. **THINK** — Use /brainstorm (Superpowers) before writing ANY new feature, component, or page
2. **PLAN** — Use /write-plan to create an implementation plan with testable steps
3. **BUILD** — Use /execute-plan to implement in batches with review checkpoints
4. **VERIFY** — Screenshot with Playwright MCP at 375px, 768px, 1440px. Run type-check. Run lint.

Skip ONLY for single-line edits, typo fixes, or direct questions.

---

## AUTO-ROUTING RULES

### Subagent Routing (10-Agent Team)

When the request matches these patterns, AUTOMATICALLY delegate:

#### Frontend
- "build/create/design a page" → **ui-designer** agent
- "build/create a component" → **ui-designer** agent
- "redesign/improve the UI/make it look better" → **ui-designer** agent

#### Backend
- "create API route/server action" → **backend-architect** agent
- "add data fetching/mutation" → **backend-architect** agent
- "implement webhook handler" → **backend-architect** agent

#### Database
- "create migration/add table/update schema" → **database-engineer** agent
- "fix RLS/add policy/query optimization" → **database-engineer** agent
- "Supabase anything" → **database-engineer** agent

#### Security
- "audit security/review auth/check vulnerabilities" → **security-reviewer** agent
- Before any PR merge → **security-reviewer** agent (auto)

#### Testing
- "write tests/add coverage/test this" → **test-engineer** agent
- After any feature completion → **test-engineer** agent (auto)

#### Integrations
- "add connector/integration/OAuth" → **integration-specialist** agent
- "n8n workflow" → **integration-specialist** agent

#### AI System
- "agent prompt/orchestrator/team-brain" → **ai-architect** agent
- "improve agent behavior/learning" → **ai-architect** agent

#### DevOps
- "deploy/CI/CD/preview/environment" → **devops-engineer** agent
- "GitHub Actions/workflow" → **devops-engineer** agent

#### Analysis
- "check performance/audit/optimize/why is it slow" → **performance-auditor** agent
- "explore the codebase/what do we have/how is X built" → **codebase-explorer** agent

#### Multi-Agent Chains
- Any task touching 3+ files → **codebase-explorer** FIRST, then specialist agent
- New feature (full-stack) → **ai-architect** + **backend-architect** + **ui-designer** (sequential)
- Before deploy → **security-reviewer** + **performance-auditor** + **test-engineer** (parallel)
- Database change → **database-engineer** THEN **security-reviewer** for RLS audit

### MCP Routing

| Agent | Primary MCPs |
|-------|-------------|
| ui-designer | magic (Magic UI), figma, playwright |
| performance-auditor | vercel (deployment metrics), playwright |
| database-engineer | supabase |
| integration-specialist | slack, airtable, vapi, n8n, stripe |
| devops-engineer | vercel, github |
| security-reviewer | (none — read-only analysis) |
| ai-architect | (none — code analysis + writing) |
| test-engineer | (none — bash for test runners) |

Additional MCP routing:
- Building UI or adding animations → use **magicui** MCP first (check for existing components)
- Generating custom components from descriptions → use **21st-magic** MCP
- Implementing ANY library API → use **context7** MCP (never guess at APIs)
- Verifying visual output or responsive design → use **playwright** MCP
- Planning architecture or complex decisions → use **sequential-thinking** MCP
- Pulling designs from Figma → use **figma** MCP
- Database, auth, edge functions → use **supabase** MCP
- Automation workflows → use **n8n** MCP
- Payments, subscriptions, billing → use **stripe** MCP
- Commits, PRs, branches → use **github** MCP

### Skill Routing

- Any UI/frontend work → **frontend-design** + **nebula-design-system** + **claude-cookbooks** skills
- Any code change → **workely-conventions** skill (auto)
- Database/auth work → **supabase-patterns** skill
- API routes/actions → **api-patterns** skill
- Any React/Next.js code → **vercel-react-best-practices** skill
- Agent architecture / prompt engineering / multi-agent coordination → **claude-cookbooks** skill
- Creating a new skill → **skill-creator** skill
- Building an MCP server → **mcp-builder** skill
- Visual testing → **webapp-testing** skill
- Any new feature → Superpowers **brainstorming** skill
- Writing tests → Superpowers **TDD** skill
- Debugging → Superpowers **debugging** skill
- Repeatable automation need with no existing skill → **auto-skill-factory** skill + see `skill-policy.md`
- Manual skill creation → `/create-skill` command
- Skill validation → `node .claude/scripts/validate-skills.js`

---

## TASK CHAINING

### Building a New Page
1. codebase-explorer agent → understand existing patterns
2. sequential-thinking MCP → plan the page architecture
3. ui-designer agent → build the page (uses magicui + context7 internally)
4. performance-auditor agent → check for issues
5. playwright MCP → screenshot at 375px, 768px, 1440px

### Redesigning an Existing Page
1. playwright MCP → screenshot current state
2. codebase-explorer agent → find all related files
3. ui-designer agent → rebuild with improvements
4. playwright MCP → screenshot new state for comparison
5. performance-auditor agent → verify no regressions

### Building a New Feature (Backend + Frontend)
1. /brainstorm → refine requirements
2. /write-plan → create implementation plan
3. codebase-explorer agent → map affected areas
4. /execute-plan → implement with TDD
5. ui-designer agent → build the UI layer
6. performance-auditor agent → full audit
7. playwright MCP → visual verification

### Debugging a Visual Issue
1. playwright MCP → screenshot the broken state
2. codebase-explorer agent → find the component source
3. context7 MCP → verify correct API usage
4. Fix the issue
5. playwright MCP → screenshot to confirm fix

---

## SUBAGENT PROTOCOL

When spawning a subagent, ALWAYS provide:
1. Specific file paths to focus on
2. Clear deliverable description
3. Context from previous steps
4. Success criteria

Bad: "Make a nice pricing page"
Good: "Build src/app/pricing/page.tsx with 3-tier pricing using shadcn Card, border-beam on featured plan, number-ticker for prices, shimmer-button for CTAs, blur-fade stagger on load. Use existing tokens from globals.css."

### Parallel Spawning
For pages with 3+ independent sections, spawn agents in parallel:
- PARALLEL: ui-designer → hero section, ui-designer → features section, ui-designer → pricing section
- THEN SEQUENTIAL: Assemble sections into page → performance-auditor → playwright screenshots

---

## HARD RULES

1. NEVER build UI without the frontend-design skill active
2. NEVER use Inter, Roboto, Arial, or system fonts — use Clash Display, Satoshi, Cabinet Grotesk, Geist, Plus Jakarta Sans, or JetBrains Mono
3. NEVER create a component without hover animations on interactive elements
4. NEVER use flat solid-color backgrounds — use animated-grid-pattern, dot-pattern, flickering-grid, gradient mesh, or layered gradients
5. NEVER skip brainstorm for new features — use /brainstorm every time
6. NEVER implement a library API from memory — use context7 MCP to fetch current docs
7. NEVER ship a page without visual QA — playwright screenshot at 375px, 768px, 1440px
8. NEVER make a component without TypeScript types — no `any`, no `as unknown`
9. ALWAYS use Server Components by default — only add 'use client' when needed
10. ALWAYS check Magic UI MCP first before building animation components from scratch

---

## DESIGN SYSTEM

### Typography
- Display: Clash Display, Satoshi, or Cabinet Grotesk
- Body: General Sans, Plus Jakarta Sans, or Geist
- Mono: JetBrains Mono or Geist Mono
- Weight extremes: 200/300 for elegance, 700/800 for impact
- Size jumps: 3x+ between display and body

### Colors
- Primary background: #0a0a0f
- Secondary background: #111118
- Elevated surface: #1a1a24
- Text primary: #f0f0f5
- Text secondary: #8888a0
- Dark mode first with luminous accent colors
- Glow effects (box-shadow with accent color at low opacity) on CTAs

### Animation Standards
Every page and component MUST include motion:

**Page Load**: Staggered blur-fade reveals with 50-100ms delays between items

**Scroll**: Parallax backgrounds, progressive reveals as sections enter viewport

**Hover** (EVERY interactive element):
- Buttons: scale(1.02) + glow border + shimmer
- Cards: translateY(-4px) + border-glow + shadow increase
- Links: color transition + underline animation

**Transitions**: Fade + subtle slide (200-300ms) between pages

**Loading States**: Skeleton screens with shimmer animation, never blank white

### Component Patterns
- Buttons: shimmer-button or rainbow-button for primary CTAs
- Cards: Glass-morphism with backdrop-blur, border-beam accents, hover lift
- Navigation: Sticky, hide-on-scroll-down, reveal-on-scroll-up
- Hero sections: Full viewport, animated text, floating elements
- Pricing: 3-tier, animated border on featured plan, number-ticker
- Testimonials: Marquee or animated carousel
- Backgrounds: animated-grid-pattern, dot-pattern, warp-background, gradient mesh
- Dashboards: Bento grid layout with neon-gradient-cards for metrics

### Magic UI Components to Use
- Text: blur-fade, aurora-text, text-animate, typing-animation, sparkles-text
- Buttons: shimmer-button, rainbow-button, pulsating-button
- Cards: neon-gradient-card, magic-card, border-beam
- Backgrounds: animated-grid-pattern, flickering-grid, retro-grid, dot-pattern
- Motion: orbiting-circles, scroll-progress, animated-beam, meteors, confetti
- Layout: bento-grid, marquee, animated-list, dock
- Data: number-ticker, animated-circular-progress-bar
- Devices: safari frame, iphone-15-pro frame

---

## CONVERSION PATTERNS

### Hero Section
- Value prop in <=8 words as headline
- 1-2 sentence subheadline
- Primary CTA (animated) + secondary ghost CTA
- Social proof strip: logos, user count, or rating
- Product screenshot in Magic UI device mockup

### Trust & Social Proof
- Logo marquee of clients/integrations
- Testimonial cards with photos, names, roles
- Metric counters with number-ticker animation
- "Trusted by" section

### Pricing
- 3 tiers: Starter, Pro (popular), Enterprise
- Annual/monthly toggle with savings badge
- Popular plan: border-beam, scale(1.05), "Most Popular" badge
- Action-oriented CTA copy ("Start Building" not "Sign Up")

### CTA Strategy
- Primary CTA every 2-3 sections
- Sticky bottom bar on mobile
- Final CTA section before footer: dark bg, compelling headline, single button

---

## AUTO-COMMIT & AUTO-MEMORY (MANDATORY)

These run automatically after every completed unit of work. NEVER wait for the user to ask.

### Auto-Commit Rules
After completing any task that changes files (code, config, docs, organization, etc.):
1. Stage only the relevant changed files (never `git add -A` blindly)
2. Write a clear commit message describing what was done
3. Commit locally — do NOT push unless the user explicitly asks
4. If the task was multi-step, commit after each logical chunk, not one giant commit at the end

**Commit message format:**
```
<type>: <short description>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```
Types: `feat`, `fix`, `refactor`, `docs`, `style`, `chore`, `test`, `perf`

**Skip auto-commit only when:**
- The user is just asking questions (no file changes)
- Work is clearly mid-progress and not at a logical save point
- The user explicitly says "don't commit" or "hold off on commits"

### Auto-Memory Rules
After completing any meaningful work, automatically update memory files:
1. Update `MEMORY.md` with: what was done, current state, any decisions made
2. Create/update topic files for detailed notes (e.g., `debugging.md`, `patterns.md`)
3. Record any new preferences, patterns, or lessons learned

**What triggers a memory update:**
- Completed a feature, fix, or task
- Learned something about the codebase or user preferences
- Made an architectural decision
- Encountered and resolved a problem
- User expressed a preference or workflow choice

**What to save:**
- Current project state and progress
- Decisions made and why
- User preferences discovered during the session
- File paths and patterns that matter
- What worked, what didn't

**Skip memory update only when:**
- Pure Q&A with no actionable outcome
- Trivial one-line fixes with no broader context

---

## TECH RULES

- Server Components by default, Client Components only when needed
- Use `next/font` for font loading
- Images via `next/image` with proper sizing
- CSS variables for all design tokens
- Framer Motion for all animations
- shadcn/ui as base component layer
- Magic UI / Aceternity UI for animated enhancements on top
