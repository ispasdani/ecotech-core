import type { ProductSlug } from "@/lib/seo/routes";

export interface ProductDetail {
  slug: ProductSlug;
  name: string;
  headline: string;
  tag: string;
  year: string;
  category: "AI Platform" | "Defense & R&D" | "Private Comms" | "Developer Tools" | "EdTech & Assessment" | "Client Case Study";
  stage: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  accentColor: string;
  visualPattern: "titan" | "drone" | "chat" | "dbluna" | "ninjathons" | "ecoplasthart";
  metrics: { label: string; value: string }[];
  verifiedFeatures: string[];
  roadmapFeatures?: string[];
  architectureHighlights: string[];
  whoItIsFor: string[];
  pricingNote: string;
}

export const PRODUCTS: readonly ProductDetail[] = [
  {
    slug: "titan117",
    name: "TITAN117",
    headline: "Your AI team, on your laptop.",
    tag: "Local-First AI Desktop + Web",
    year: "(2026)",
    category: "AI Platform",
    stage: "Active Build (Phases 0–3 Verified · 4–6 In Verification)",
    summary:
      "A local-first AI team for small companies that runs directly on Windows and macOS laptops—combining a general assistant, watched-folder document intelligence, sandboxed shell approvals, and free offline local models.",
    metaTitle: "TITAN117 — Local-First AI Team on Your Laptop",
    metaDescription:
      "TITAN117 runs a private AI team directly on your Windows or macOS laptop: sandboxed approvals, local llama.cpp models, persistent memory, and multilingual folder search.",
    accentColor: "#FF6A3A",
    visualPattern: "titan",
    metrics: [
      { label: "Data Privacy", value: "100% Local" },
      { label: "Model Sources", value: "Local + Cloud" },
      { label: "Starter Plan", value: "€15 / mo" },
      { label: "Offline License", value: "14-Day Lease" },
    ],
    verifiedFeatures: [
      "Local Electron desktop shell + background Titan engine (Windows & macOS) with thin cloud sync.",
      "Sandboxed shell & permission/approval layer: risky commands, file writes, and external actions ask first.",
      "Dual model router: free offline local models (llama.cpp) + frontier cloud models via metered credits or BYOK stored in the OS keychain.",
      "Persistent, inspectable, and editable memory with task-scoped network policies and prompt-injection defenses.",
      "Web search, deep research with citations, and interactive artifact panel (documents, charts, slides, spreadsheets — in active Phase 4–5 verification).",
      "Watched-folder document agent: reads PDF, Word, Excel, PowerPoint, and email with hybrid keyword + multilingual semantic search (Romanian & English) citing exact file and page.",
    ],
    roadmapFeatures: [
      "Code Builder & App Builder (web, mobile via Expo, and desktop via Tauri) with local preview and one-click publish.",
      "Dedicated QA (Playwright + Lighthouse) and SEO Agents for automated audits and fixes.",
      "Plain-language Automation Scheduler, web watchers (e.g. regulatory changes), and Marketing/Video Studio.",
      "End-to-end encrypted Remote Control from phone/web, chat channels (Telegram, WhatsApp, Slack), and Team SSO plans.",
    ],
    architectureHighlights: [
      "Zero rented 24/7 cloud agent servers—your company documents stay on your own laptop.",
      "Secrets live exclusively in the OS keychain, never in plaintext logs or prompts.",
      "Remote control is off by default and protected with end-to-end encryption (X25519 + XChaCha20-Poly1305).",
      "Atomic server-side credit ledger with transparent metering and zero per-seat cloud bloat.",
    ],
    whoItIsFor: [
      "Small & mid-sized companies wanting private AI without leaking sensitive files to cloud workspaces.",
      "Operations & compliance teams (such as Ecoplast Hart) searching multilingual regulatory and internal document folders.",
      "Founders and engineers looking for unlimited local previews and significantly higher value per euro than cloud-only builders.",
    ],
    pricingNote:
      "Planned tiers: Starter €15/mo (700 credits, 2 devices), Pro €25/mo (1,500 credits, 3 devices), Max €50/mo (3,500 credits, 5 devices), and Custom Enterprise. Local models, previews, documents, and BYOK are unlimited in every plan.",
  },
  {
    slug: "tri-drone-swarm-gcs",
    name: "Tri-Drone Swarm GCS",
    headline: "Command multi-drone swarms with deterministic safety.",
    tag: "Defense & Autonomous UAV Systems",
    year: "(2026)",
    category: "Defense & R&D",
    stage: "Working 6-DOF Simulator + MAVSDK Hardware Adapter",
    summary:
      "A zero-dependency Ground Control Station (GCS) and 3D outdoor simulator for piloting multi-drone swarms with seamless leader hot-swapping, pluggable offline/local LLM mission planning, and deterministic safety guardrails.",
    metaTitle: "Tri-Drone Swarm GCS — Defense & Autonomous Drone Control",
    metaDescription:
      "Tactical Ground Control Station and 3D simulator for commanding 3-drone swarms with leader hot-swapping, deterministic LLM safety guardrails, and PX4/ArduPilot MAVSDK support.",
    accentColor: "#22C55E",
    visualPattern: "drone",
    metrics: [
      { label: "Swarm Control", value: "3-Drone Hot-Swap" },
      { label: "Safety Layer", value: "Deterministic" },
      { label: "Offline AI", value: "Rules + Ollama" },
      { label: "Hardware Ready", value: "PX4 / MAVSDK" },
    ],
    verifiedFeatures: [
      "Seamless leader hot-swapping between ALPHA-1, BRAVO-2, and CHARLIE-3 via keyboard (1/2/3, Tab), Mode-2 Xbox/PS gamepad (LB/RB), or clicking Picture-in-Picture video feeds.",
      "Dynamic leader-follower formations: non-active drones automatically maintain safe formation offsets or continue executing independent assigned gameplans.",
      "Pluggable LLM 'Gameplan' Commander supporting air-gapped Offline Rules (default, zero API keys), local Ollama models (llama3.2, qwen2.5), OpenAI, and Gemini.",
      "Deterministic Safety Guardrail Validator that clamps inter-drone separation, altitude ceilings, and landmark obstacle clearance before any plan touches the flight controller.",
      "Built-in zero-dependency 6-DOF 3D outdoor simulator with obstacle avoidance, emergency hover brake, and Return-to-Launch (RTL).",
      "Abstract DroneFleetAdapter enabling drop-in migration to real Pixhawk / PX4 or ArduPilot drones via MAVSDK.",
    ],
    architectureHighlights: [
      "Strict separation between natural-language tactical planning and deterministic flight safety math.",
      "Zero external runtime dependencies for the core simulator—starts in seconds on standard field laptops.",
      "Full Mode-2 gamepad and keyboard telemetry HUD with multi-feed Picture-in-Picture awareness.",
    ],
    whoItIsFor: [
      "Defense & security R&D teams prototyping single-operator multi-UAV command workflows.",
      "Autonomous systems engineers testing LLM-to-waypoint safety envelopes before live PX4/ArduPilot flights.",
      "Industrial perimeter inspection and tactical reconnaissance operators requiring air-gapped swarm control.",
    ],
    pricingNote:
      "Available for custom defense R&D partnerships, private licensing, and tailored GCS hardware integrations.",
  },
  {
    slug: "sovereign-chat",
    name: "CORE Sovereign Chat",
    headline: "Closed-door messaging. Every language, native.",
    tag: "Sovereign Private Comms",
    year: "(2026)",
    category: "Private Comms",
    stage: "Production Deployed (Used by Ecoplast Hart & Private Clients)",
    summary:
      "Dedicated, closed-door chat applications built on our CORE framework. Every client receives a completely isolated app and database where participants communicate seamlessly in their own native language with zero manual translation.",
    metaTitle: "CORE Sovereign Chat — Closed-Door Multilingual Messaging",
    metaDescription:
      "Isolated, private chat apps built on ECOTECH Core: dedicated databases, complete data sovereignty, and automatic real-time native-language messaging.",
    accentColor: "#38BDF8",
    visualPattern: "chat",
    metrics: [
      { label: "Deployment", value: "100% Isolated" },
      { label: "Translation", value: "Zero-Input Auto" },
      { label: "Data Ownership", value: "Full Sovereignty" },
      { label: "Access Model", value: "Closed-Door" },
    ],
    verifiedFeatures: [
      "Complete tenant isolation: every client organization receives a dedicated, separated application instance and private database.",
      "Real-time native-language messaging: every member types in their own language and automatically sees incoming messages in their own language with zero manual translation steps.",
      "Closed-door invite-only security model built on CORE's server-verified zero-trust access controls.",
      "Real-time synchronization across desktop and mobile web with low bandwidth overhead for field and industrial teams.",
      "Zero third-party advertising, zero cross-company data co-mingling, and configurable retention/deletion policies.",
    ],
    architectureHighlights: [
      "Built on the private CORE framework for rapid white-label provisioning per client.",
      "Server-enforced room membership and message ownership checks verified by automated denial tests.",
      "Designed for sensitive executive boards, industrial supply chains, and cross-border operations.",
    ],
    whoItIsFor: [
      "Closed-door leadership groups and private business networks demanding total confidentiality.",
      "Cross-border industrial and logistics companies (including Ecoplast Hart) coordinating staff and partners across multiple European languages.",
      "Organizations leaving public consumer messengers for owned, auditable internal infrastructure.",
    ],
    pricingNote:
      "Provisioned per organization as a dedicated isolated deployment. Contact us for a private walkthrough and deployment scope.",
  },
  {
    slug: "dbluna",
    name: "DBLuna",
    headline: "Draw it, code it, document it.",
    tag: "Database Design & Docs SaaS",
    year: "(2026)",
    category: "Developer Tools",
    stage: "Feature-Complete (Pre-Production Launch)",
    summary:
      "A local-first database schema design and instant documentation platform. Draw visually or write DBML in two-way sync, import from PostgreSQL, SQL Server, or BACPAC files, and search 30,000+ columns in milliseconds.",
    metaTitle: "DBLuna — Local-First Database Design & Documentation",
    metaDescription:
      "Design and document 400+ table databases in DBLuna: two-way DBML sync, PostgreSQL/SQL Server/BACPAC import, 6ms search across 30,000 columns, and offline HTML handoffs.",
    accentColor: "#A855F7",
    visualPattern: "dbluna",
    metrics: [
      { label: "Search Speed", value: "~6 ms / 30k cols" },
      { label: "Large Schemas", value: "400+ Tables" },
      { label: "Share Links", value: "Zero-Server URL" },
      { label: "Import Formats", value: "PG / SQL / BACPAC" },
    ],
    verifiedFeatures: [
      "Interactive canvas (pan, zoom, marquee select, minimap, snap-to-grid, schema linter) in two-way sync with DBML code.",
      "Built for massive enterprise schemas (tested on 428-table, 672-relationship databases) with schema filtering, focus mode, and dashed stubs for hidden links.",
      "Local-first IndexedDB persistence—works without an account, with zero-server compressed URL-fragment share links.",
      "Direct import from live PostgreSQL, SQL Server, CSV, JSON, SQL, DBML, and BACPAC files (reading only model.xml schema, never table data).",
      "Instant generated documentation site with ~6 ms ranked search across 1,000 tables and 30,000 columns, plus portable offline HTML Reporting Handoffs for Power BI teams.",
      "Export to SQL (PostgreSQL, MySQL, SQL Server, Oracle), DBML, JSON, Markdown docs, and cropped SVG.",
    ],
    roadmapFeatures: [
      "Production rollout of Pro cloud sync, live presence collaboration, version snapshots, and streaming Gemini diagram assistant.",
    ],
    architectureHighlights: [
      "Single unified DBML parser/generator pipeline powering canvas, code tab, and documentation.",
      "Local diagrams never touch a server unless explicitly upgraded to cloud sync.",
      "SSRF-hardened server-side database import blocking private, loopback, and metadata addresses.",
    ],
    whoItIsFor: [
      "Backend and data engineers who want visual ER diagrams and DBML code that never drift out of sync.",
      "SQL Server and Power BI teams who need portable, offline searchable database maps for report handoffs.",
    ],
    pricingNote:
      "Free tier (local code-only editing) and Pro (~$10/month) planned for production release.",
  },
  {
    slug: "ninjathons",
    name: "Ninjathons",
    headline: "Code. Duel. Conquer.",
    tag: "Competitive Coding & MicroVM Judging",
    year: "(2026)",
    category: "EdTech & Assessment",
    stage: "V1 Feature-Complete (Launch Phase Next)",
    summary:
      "A competitive coding platform combining live 1v1 ranked duels, multiplayer hexagonal Territory strategy games, 7-language microVM judging in 2–4 seconds, searchable in-match docs, and team hackathon events.",
    metaTitle: "Ninjathons — Competitive Coding & MicroVM Judging Platform",
    metaDescription:
      "Practice and prove your engineering skills live on Ninjathons: 1v1 Glicko-2 duels, multiplayer Territory games, 7 languages judged in secure microVMs, and team hackathons.",
    accentColor: "#C4F012",
    visualPattern: "ninjathons",
    metrics: [
      { label: "Languages", value: "7 Judged" },
      { label: "Judge Speed", value: "2–4 sec" },
      { label: "In-App Docs", value: "587 Pages" },
      { label: "Rating Engines", value: "Glicko-2 / OpenSkill" },
    ],
    verifiedFeatures: [
      "Live 1v1 ranked duels with Glicko-2 ratings, sent-time fairness, ghost replays, and shareable Open Graph result cards.",
      "7 programming languages (JS, TS, Python, Java, C#, C++, Rust) executed in zero-network isolated microVMs with per-language time multipliers.",
      "498 curated MDN pages and 89 Python docs searchable right inside solve views and ranked matches.",
      "Daily & weekly themed challenges with streak freezes, XP progression, 21+ rarity badges, and Global/Country/Group leaderboards.",
      "Team Ninjathons: admin-run hackathon events (1 hour to 7 days) with invite-code teams, hidden briefs until start, and weighted judging rubrics.",
      "3 structured learning roadmaps and ~20 public SEO tutorials plus server-rendered /u/<username> developer profiles.",
    ],
    roadmapFeatures: [
      "Live multiplayer verification of Territory (3–6 player 37/61-hex map capture rated with OpenSkill).",
      "V1.1 Ranked HTML/CSS visual duels, AI Coach, and match replays.",
    ],
    architectureHighlights: [
      "All user code runs as unprivileged nobody inside zero-network microVMs; hidden test outputs never leave the server.",
      "Built on the CORE framework with strict server-side entitlements, Stripe billing sync, and GDPR 14-day grace deletion.",
    ],
    whoItIsFor: [
      "Developers and computer science learners who prefer live competition and strategy over passive grinding.",
      "Engineering communities and universities running structured, fair team coding events.",
    ],
    pricingNote:
      "Free core practice & competition modes, with Pro (~€8/month or €69/year) for full roadmaps and custom profiles.",
  },
  {
    slug: "ecoplasthart",
    name: "Ecoplast Hart 2026",
    headline: "Industrial scale meets search & AI dominance.",
    tag: "Enterprise SEO · TITAN117 · Sovereign Chat",
    year: "(2026)",
    category: "Client Case Study",
    stage: "Live Production Platform",
    summary:
      "How ECOTECH Core transformed a leading Romanian industrial recycling and waste management company with a high-ranking bilingual SEO/GEO web platform, TITAN117 local document intelligence, and a dedicated Sovereign Multilingual Chat app.",
    metaTitle: "Ecoplast Hart 2026 Case Study — Technical SEO, TITAN117 & Sovereign Chat",
    metaDescription:
      "Case study: how Ecoplast Hart uses ECOTECH Core's Technical SEO & AI-Search architecture, TITAN117 local AI, and Sovereign Closed-Door Multilingual Chat in production.",
    accentColor: "#10B981",
    visualPattern: "ecoplasthart",
    metrics: [
      { label: "SEO Routes", value: "40+ Localized" },
      { label: "AI Crawlers", value: "12+ Explicit" },
      { label: "Platforms Used", value: "TITAN117 + Chat" },
      { label: "Indexing", value: "IndexNow Push" },
    ],
    verifiedFeatures: [
      "Bilingual Romanian/English URL architecture with localized keyword slugs, reciprocal hreflang maps, and zero duplicate canonicals.",
      "Unified single-@graph JSON-LD schema linking Organization, RecyclingCenter LocalBusiness, Services, Commercial Material Buying pages, Pricing Offers, and 23+ BlogPosting/FAQPage guides.",
      "Explicit AI-Search (GEO) crawler configuration for Google-Extended, GPTBot, OAI-SearchBot, ClaudeBot, and PerplexityBot paired with automated IndexNow submission.",
      "Operational adoption of TITAN117 for fast, private local-first querying of Romanian environmental regulations, waste codes, and internal company documents.",
      "Dedicated CORE Sovereign Closed-Door Chat deployment enabling staff and international recycling partners to communicate seamlessly across languages with total data privacy.",
    ],
    architectureHighlights: [
      "Honest lastModified timestamps in sitemap.xml with original industrial photography declared via <image:image> and IPTC digitalCapture metadata.",
      "Zero-bloat Core Web Vitals optimization with selective font preloading and static route generation.",
      "Seamless alignment between public SEO acquisition and private internal AI + communication tooling.",
    ],
    whoItIsFor: [
      "Industrial, manufacturing, and B2B service leaders who want to dominate regional and national search results while modernizing internal operations privately.",
    ],
    pricingNote:
      "Full-stack digital transformation & ongoing IT consulting partnership by ECOTECH Core.",
  },
];

export function getProductBySlug(slug: string): ProductDetail | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
