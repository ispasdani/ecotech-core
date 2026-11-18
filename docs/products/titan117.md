# TITAN117

> A local-first AI team for small companies. It runs on your own laptop: a general assistant (Titan) that can do almost any computer task, plus specialist agents that build apps, write code, read your documents, test and optimise your website, make videos and run your marketing.

| | |
|---|---|
| **Type** | Desktop app (Windows and macOS) + web app + product owner portal |
| **Repos** | `titan117-desktop` (Electron shell and the Titan engine), `titan117-web` (Next.js web app, the Convex backend, the shared package `@titan117/shared`, the website), `titan117-pop` (product owner portal). All three are in the EcotechCore GitHub organisation. |
| **Status** | Phases 0–3 done (9–15 Nov 2026). Phases 4–6 are in progress and waiting on the owner's checks. Phases 7–18 haven't started. Launch is the full feature map ("V1 is everything"). |
| **Stack** | CORE framework ([core-framework.md](../core-framework.md)) on the web side. On the desktop: Electron, a Node engine, SQLite (FTS5 + sqlite-vec), llama.cpp (`node-llama-cpp`), Playwright, the MCP SDK, OpenCode (coding engine), OpenRouter through our credit proxy |
| **Brand** | The angry eyes and the TITAN117 wordmark. The desktop app has its own design system (tomato for actions, no black buttons). |
| **Plans** | Starter €15, Pro €25, Max €50, Custom. No free plan and no trial. |
| **Source docs** | Shared docs in `titan117-web/docs/` (copied to the other two repos), `docs/notes/brainstorming-feature-map.md`, `03-architecture.md`, `01-launch-roadmap-v1.md`, `notes/pricing.md`, `guardrails.md`, `security.md`, and each repo's `progress.md` |

## The idea

- **Agents run on the user's laptop.** No rented servers run agents around the clock. Company data stays local unless the user shares it.
- **Two model sources:** local models (free, private, offline) and OpenRouter (the strongest models), paid with our credits or the user's own key (BYOK).
- **Plug and play:** download, install, sign in. Heavy parts (models, emulators, VMs) download only when a feature needs them.
- **A thin cloud** (Convex + Clerk + Stripe) holds only accounts, plans, credits, devices, remote commands, and anything the user chooses to share.

## Architecture in one picture

```
Our cloud (small):  Web app (Next.js/Vercel) · Convex (users, entitlements, credit ledger,
                    devices, command queue, shares) · Clerk · Stripe · credit proxy → OpenRouter
                         ▲ outgoing realtime only           ▲ model calls
User's laptop:      Desktop window ◄─ local API ─► Titan engine (background, keeps running from the tray)
                    agent runtime + permission/approval layer · model router · memory + documents index
                    · scheduler + checkpoints · tools (browser, sandboxed shell, files, MCP, search, speech)
                    · coding engine (OpenCode) · components manager · local models (llama.cpp)
```

The engine's permission and approval layer is the only way to touch files, the shell, the network or the browser. Remote control from the web or phone is end-to-end encrypted (X25519 + XChaCha20-Poly1305) and off by default.

## Features by area

The status follows the roadmap phases: ✅ phase done · 🟡 phase in progress · ⏳ not started. Feature numbers (1.11 etc.) refer to the feature map.

| Area | What it includes | Phase | Status |
|---|---|---|---|
| **Setup** | Repos, CI, Convex, Clerk, Stripe test mode, OpenRouter, guardrail wrappers, docs | 0 | ✅ |
| **Engine core** | Electron shell, Titan engine, local API, permission and approval layer, local database, model router (llama.cpp + OpenRouter), error capture with a redacted log | 1 | ✅ |
| **Accounts and money** | Web app basics, desktop sign-in (system browser + PKCE), plans, credit ledger, metering proxy, top-ups, BYOK in the OS keychain, signed 14-day offline licence and lock screen | 2 | ✅ |
| **Titan and memory** | General assistant with files, sandboxed shell (risky commands ask first), browser control, code execution, MCP connectors, persistent memory you can see, edit and delete, memory scopes, self-written skills, network policy per task, prompt-injection defences | 3 | ✅ |
| **Web search and artifacts** | Search tool for all agents (OpenRouter search through credits, or your own Brave/Tavily/Exa key), page and site reading, deep research with sources. Artifact panel next to the chat: documents, web pages and tools, charts, diagrams, slides, spreadsheets. Download as PDF, Word, Excel and more; versions; share by link; comments | 4 | 🟡 |
| **Install and setup** | Signed one-click installer, setup wizard, components manager, "you need this first" cards, setup checklist, health check, auto-update, keep awake, checkpoints and resume, offline mode and queue, notifications, error reports to the owner portal | 5 | 🟡 |
| **Folder agent** | Watched folders; reads PDF, Word, Excel, PowerPoint and email; OCR; local search (keywords + multilingual meaning, Romanian and English); answers cite file and page; real spreadsheet maths; "local models only" folders | 6 | 🟡 (reading, search and citations work in the app; OCR pending) |
| **Code builder** | OpenCode inside the app: any repo, plan then act, reviewable diffs, tests, git and pull requests as the user, sub-agents, code review, open in your editor, or hand off to a coding tool you already have | 7 | ⏳ |
| **App builder: web** | Prompt → plan → build → run → check → fix, done locally. React, TypeScript, Tailwind, shadcn; backend in the user's own Convex. Local preview, templates, visual edit, versions and rollback, export to GitHub, publish to the user's own Vercel, Netlify or Cloudflare, SEO built in | 8 | ⏳ |
| **App builder: mobile and desktop** | Expo (Android emulator, iOS Simulator, Expo Go on a real phone), Tauri desktop apps, clean-VM testing, containers, store and installer publishing, cloud devices as a fallback | 9 | ⏳ |
| **Sidebar apps** | Internal apps (CRM, inventory, invoices) added to the TITAN117 sidebar, the `titan` SDK, a shared data layer so Titan can answer across apps, local database with end-to-end encrypted sync | 10 | ⏳ |
| **Agent builder** | Agent definition files, a form-based builder, clone and edit, manager agents splitting work, shared memory and message bus, budgets and loop detection, side-by-side model comparison | 11 | ⏳ |
| **QA and SEO agents** | QA: explores with Playwright, writes tests that then run without AI, accessibility (axe) and performance (Lighthouse). SEO: site audit, Core Web Vitals, fixes through the coding engine, Search Console, rank tracking, keywords, content, competitors, hreflang, local SEO, AI-search visibility, scheduled re-audits | 12 | ⏳ |
| **Automation** | Scheduler (plain-language schedules), web watcher (for example, Romanian environmental law changes), browser recorder and replay with AI step repair, computer use in a VM or on your desktop | 13 | ⏳ |
| **Marketing and video** | Brand kit, website → promo video, social posts as ready-to-post packages, content calendar, newsletters through the user's own email provider, landing pages, analytics, lead finding, ad drafts, review monitoring, video studio | 14 | ⏳ |
| **Remote and channels** | Paired devices (QR + matching code), start, watch and approve tasks from the web or a phone app, chat channels (Telegram first, then WhatsApp, Discord, Slack), two-factor to switch on, laptop-only approvals for risky actions, "revoke all" | 15 | ⏳ |
| **Marketplace** | Free and GitHub-based: a `titan.json` manifest; agents, workflows, app templates, MCP tools, skills; pinned installs; permissions screen; sandbox and dependency scan; licence warnings; verified badge | 16 | ⏳ |
| **Teams and plans** | Teams, roles, audit log, SSO, agency and white-label plan | 17 | ⏳ |
| **Beta and launch** | Private alpha, closed beta, security review, penetration test, legal pages, launch | 18 | ⏳ |

### Product owner portal (`titan117-pop`)

Our own admin app, at its own address and behind staff sign-in with two-factor: error reports (grouped, mark fixed), accounts and plans, credit corrections, kill switches, releases. Phase 0 is done (an empty portal deployed); the screens come with phase 5.

## Pricing (decided 16–17 Oct 2026)

| | Starter | Pro | Max | Custom |
|---|---|---|---|---|
| Monthly | €15 / $15 | €25 / $25 | €50 / $50 | Talk to us |
| Yearly | €150 | €250 | €500 | Custom |
| Credits a month | 700 | 1,500 | 3,500 | Custom pool |
| Devices | 2 | 3 | 5 | Custom |
| Teams, roles, SSO, white-label | — | — | — | ✓ |

- **1 credit = €0.01 of cloud usage at our price.** A task costs provider cost × 1.25. Local models, previews, tests, documents and BYOK calls are free in every plan.
- **Top-ups:** 1,000 credits for €10, 2,750 for €25, 6,000 for €50. Monthly credits roll over for one month; top-ups last 12 months.
- **No free plan, no trial, no refunds** (except our own billing mistakes). The app locks when the subscription or the offline licence ends.
- **Pitch against Lovable:** about 750 cheap-model edits, or about 90 top-model edits, from Pro's 1,500 credits, against Lovable's 100–150 for the same $25. Previews and local models are unlimited.

## Trust and security highlights

- A sandboxed shell, with risky commands always asking first (Seatbelt on macOS; approvals and a scrubbed environment on Windows).
- File access only inside the folders you allow. Secrets only in the OS keychain.
- Web content is treated as data, never as instructions (prompt injection and memory poisoning).
- Approvals before anything that publishes, sends, posts, deletes or spends.
- Credits can't be faked: server-side ledger, a signed licence lease, a proxy that never logs prompts.
- Remote control is off by default, end-to-end encrypted, needs two-factor, and comes with revoke-all.

## Not doing

- Agents hosted around the clock.
- Signing in with ChatGPT or Claude chat subscriptions to run our agents.
- Bypassing CAPTCHAs or site terms.
- Scraping Google's results pages.

## Website angle

- **Headline:** "Your AI team, on your laptop." Private by default, works offline, no per-seat cloud bill.
- **Differentiators:** local-first privacy; free local models; previews and tests cost nothing; several times Lovable's edits for the same price; one app for assistant, coding, app building, documents, SEO, QA and marketing; safe by design (approvals, sandbox, keychain).
- **Status for copy:** pre-launch. Describe the vision, but label everything from phase 7 on as coming. Check the trademark before using the name and logo widely (still open).
