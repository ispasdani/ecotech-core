import type { ServiceSlug } from "@/lib/seo/routes";

export interface ServiceDetail {
  slug: ServiceSlug;
  number: string;
  shortTitle: string;
  titleLines: [string, string];
  title: string;
  tagline: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  approachTitle: string;
  approachText: string;
  deliverables: { title: string; description: string }[];
  valuePoints: { label: string; value: string; note: string }[];
  faq: { question: string; answer: string }[];
}

export const SERVICES: readonly ServiceDetail[] = [
  {
    slug: "it-consulting-and-custom-engineering",
    number: "001",
    shortTitle: "IT Consulting & CORE Engineering",
    titleLines: ["IT Consulting", "& Engineering"],
    title: "IT Consulting & Rapid Custom Software Engineering",
    tagline:
      "Production-grade web apps, SaaS platforms, and internal tools built at 3x speed on our private CORE engineering foundation.",
    summary:
      "We combine senior architectural consulting with our AI-accelerated CORE framework to deliver zero-trust, thoroughly tested software systems with predictable milestones.",
    metaTitle: "IT Consulting & Custom Software Engineering",
    metaDescription:
      "Senior IT consulting and rapid full-stack software engineering powered by ECOTECH Core's secure-by-design CORE framework.",
    category: "Software Engineering",
    approachTitle: "Deterministic engineering, accelerated by AI research",
    approachText:
      "Most agencies choose between moving fast and building securely. Our CORE framework eliminates that trade-off: every project ships with server-verified access controls, automated refusal tests on every endpoint, clean local-first or cloud state management, and numbered delivery phases with concrete done-checks.",
    deliverables: [
      {
        title: "Zero-Trust Backend Architecture",
        description:
          "Every permission, entitlement, and ownership check is enforced on the server and backed by automated denial tests so unauthorized callers can never leak data.",
      },
      {
        title: "Full-Stack Web & Desktop Applications",
        description:
          "High-performance Next.js, React, real-time databases, and Electron desktop shells engineered to stay responsive even on lower-end hardware.",
      },
      {
        title: "Metered AI & Payment Infrastructure",
        description:
          "Verified, idempotent Stripe billing webhooks paired with atomic AI credit reservations and global spend circuit breakers.",
      },
      {
        title: "Architecture Audits & Technical Strategy",
        description:
          "Hands-on IT consulting for legacy modernization, database design, security reviews, and GDPR-compliant data lifecycle planning.",
      },
    ],
    valuePoints: [
      {
        label: "Access Enforcement",
        value: "100% Server-Side",
        note: "Automated denial & ownership tests cover every gated function.",
      },
      {
        label: "Delivery Velocity",
        value: "Phased Done-Checks",
        note: "Every milestone is verified end-to-end before moving forward.",
      },
      {
        label: "Long-Term Ownership",
        value: "Clean & Auditable",
        note: "No black-box lock-in; strict TypeScript, lint, and test gates.",
      },
    ],
    faq: [
      {
        question: "What kind of software can ECOTECH Core build with the CORE framework?",
        answer:
          "We build B2B SaaS platforms, internal enterprise portals, local-first desktop software, private communication apps, data tooling, and high-conversion SEO web platforms.",
      },
      {
        question: "Do we own the code and data you build for us?",
        answer:
          "Yes. We build clean, isolated deployments where you maintain full ownership of your data, infrastructure, and operational workflows.",
      },
      {
        question: "How do you prevent AI-assisted development from introducing bugs?",
        answer:
          "We pair AI-accelerated research and implementation with strict engineering discipline: typecheck, lint, unit tests, automated refusal tests, and manual verification across desktop and mobile before any phase is marked complete.",
      },
    ],
  },
  {
    slug: "sovereign-multilingual-chat",
    number: "002",
    shortTitle: "Sovereign Multilingual Chat",
    titleLines: ["Sovereign", "Private Chat"],
    title: "Closed-Door Sovereign Chat Apps with Real-Time Native Language Translation",
    tagline:
      "Dedicated, isolated messaging platforms for private groups where everyone writes and reads in their own native language automatically.",
    summary:
      "Every client receives a brand-new, separated chat application with its own database and zero third-party data harvesting—plus seamless, zero-friction native language translation.",
    metaTitle: "Sovereign Closed-Door Multilingual Chat Apps",
    metaDescription:
      "Private, isolated chat platforms built on CORE with dedicated databases and automatic real-time native-language messaging for closed-door organizations.",
    category: "Private Communications",
    approachTitle: "Closed-door sovereignty meets effortless global collaboration",
    approachText:
      "Consumer chat apps mix your sensitive internal discussions onto multi-tenant clouds you do not control, while multilingual teams waste hours translating messages manually. Built on our CORE framework, we deploy a dedicated, standalone chat instance for each client—complete with isolated databases and automatic real-time translation so a Romanian director, a German supplier, and an English engineer can converse naturally in one room without ever pressing a translate button.",
    deliverables: [
      {
        title: "Dedicated Single-Tenant Deployment",
        description:
          "Every organization gets its own separated application and isolated database—zero shared tenants, zero ad profiling, and full data sovereignty.",
      },
      {
        title: "Zero-Input Native Language Messaging",
        description:
          "Write in your native language; every recipient automatically sees the message in their chosen language with full context preservation and zero manual copy-pasting.",
      },
      {
        title: "Invite-Only Access & Granular Roles",
        description:
          "Closed-door onboarding via controlled invite codes, strict server-side room permissions, and clean audit trails for leadership.",
      },
      {
        title: "Custom Brand & Workflow Integration",
        description:
          "Tailored to your domain, mobile and desktop responsive, and ready to connect with internal tools like TITAN117 or ERP workflows.",
      },
    ],
    valuePoints: [
      {
        label: "Data Isolation",
        value: "1 Client = 1 App",
        note: "Dedicated database and deployment per organization.",
      },
      {
        label: "Language Friction",
        value: "Zero Manual Input",
        note: "Automatic native-language rendering for every participant.",
      },
      {
        label: "Production Proven",
        value: "Live at Ecoplast Hart",
        note: "Trusted for internal and cross-border operational communication.",
      },
    ],
    faq: [
      {
        question: "Do users need to click a translate button on each message?",
        answer:
          "No. Each user selects their preferred native language once. Every message they send is written naturally in their own language, and every recipient sees it natively in theirs automatically.",
      },
      {
        question: "Is this a shared SaaS app where multiple companies share one database?",
        answer:
          "No. Every client receives a separated, closed-door deployment with its own dedicated database so your internal communications remain strictly isolated.",
      },
      {
        question: "Can we deploy it for an international partner network or board of directors?",
        answer:
          "Yes. Closed-door executive teams, cross-border industrial suppliers (like Ecoplast Hart), and private advisory groups are the exact use cases it was engineered for.",
      },
    ],
  },
  {
    slug: "defense-and-autonomous-drone-swarms",
    number: "003",
    shortTitle: "Defense & Drone Swarms",
    titleLines: ["Defense &", "Drone Swarms"],
    title: "Defense Software & Deterministic Autonomous Drone Swarm Control",
    tagline:
      "Tactical Ground Control Stations, 3D multi-drone simulation, leader hot-swapping, and deterministic safety guardrails for autonomous UAV fleets.",
    summary:
      "We engineer mission-critical command interfaces and deterministic safety validators that bridge natural-language tactical intent with PX4/ArduPilot multi-drone execution.",
    metaTitle: "Defense Software & Multi-Drone Swarm Control Systems",
    metaDescription:
      "Tactical Ground Control Stations (GCS), 3D swarm simulators, deterministic LLM safety guardrails, and MAVSDK integration for autonomous drone fleets.",
    category: "Defense & Autonomous Systems",
    approachTitle: "Never let an unvalidated LLM touch a flight controller",
    approachText:
      "Our Tri-Drone Swarm GCS demonstrates our defense engineering philosophy: a single operator can command multiple UAVs with instant leader hot-swapping (ALPHA-1, BRAVO-2, CHARLIE-3) via keyboard, gamepad, or natural-language gameplans—while every instruction passes through a deterministic Safety Guardrail Validator enforcing separation, altitude ceilings, and obstacle clearance before reaching the flight controller.",
    deliverables: [
      {
        title: "Dynamic Leader-Follower Swarm Engine",
        description:
          "Seamless leader hot-swapping where followers dynamically reform around the active drone or execute independent tactical gameplans.",
      },
      {
        title: "Deterministic Safety Guardrail Validator",
        description:
          "Hard mathematical clamping of inter-drone separation, altitude ceilings, geofences, and landmark clearance between AI planners and actuators.",
      },
      {
        title: "Air-Gapped & Local LLM Command Support",
        description:
          "Works completely offline via deterministic rule engines or local Ollama models—no internet connection or external API dependency required.",
      },
      {
        title: "Hardware-Ready MAVSDK Integration",
        description:
          "Abstract fleet adapter architecture supporting both zero-dependency 6-DOF 3D outdoor simulation and live PX4 / ArduPilot Pixhawk hardware.",
      },
    ],
    valuePoints: [
      {
        label: "Operator Control",
        value: "1-to-Many Swarms",
        note: "Instant leader hot-swapping with Picture-in-Picture telemetry.",
      },
      {
        label: "Offline Readiness",
        value: "100% Air-Gap Capable",
        note: "Runs offline rules or local Ollama models with zero cloud calls.",
      },
      {
        label: "Hardware Path",
        value: "PX4 / ArduPilot",
        note: "Drop-in MAVSDK adapter for real-world flight testing.",
      },
    ],
    faq: [
      {
        question: "Does the swarm commander require an internet connection to operate?",
        answer:
          "No. It defaults to a zero-dependency offline rules engine and supports local air-gapped LLMs via Ollama, in addition to optional cloud model endpoints.",
      },
      {
        question: "How do you guarantee safety when using natural-language mission commands?",
        answer:
          "Every natural-language plan is parsed into structured waypoints and passed through a deterministic Safety Guardrail Validator that enforces minimum separation, altitude bounds, and obstacle clearance before any command reaches the flight controller.",
      },
      {
        question: "Can ECOTECH Core customize the GCS for larger fleets or custom sensors?",
        answer:
          "Yes. Our modular fleet adapter and obstacle-avoidance architecture can be extended to larger swarm topologies, custom telemetry overlays, and proprietary defense hardware.",
      },
    ],
  },
  {
    slug: "technical-seo-and-ai-search-geo",
    number: "004",
    shortTitle: "Technical SEO & AI-Search",
    titleLines: ["Technical SEO", "& AI-Search"],
    title: "Technical SEO, AI-Search (GEO) & High-Performance Web Architecture",
    tagline:
      "Search-dominant web engineering modeled on our Ecoplast Hart 2026 architecture—built to rank in Google Search and be cited by AI answers.",
    summary:
      "We engineer websites from the code layer up for Google Search, Google Images, Bing, and AI grounding engines (ChatGPT Search, Perplexity, Gemini AI Overviews).",
    metaTitle: "Technical SEO & AI-Search (GEO) Engineering",
    metaDescription:
      "Code-level Technical SEO and Generative Engine Optimization (GEO): unified @graph JSON-LD, honest sitemaps, AI crawler configuration, and IndexNow automation.",
    category: "Growth & Search Engineering",
    approachTitle: "SEO is an engineering discipline, not a plugin",
    approachText:
      "Proven in production on Ecoplast Hart 2026, our SEO architecture eliminates the silent failures that bury most corporate sites: we build strict single-origin canonicals, unified @graph JSON-LD entity graphs with stable @id references, honest lastModified sitemaps, explicit AI crawler permissions (Google-Extended, OAI-SearchBot, ClaudeBot, PerplexityBot), and automated IndexNow push indexing.",
    deliverables: [
      {
        title: "Unified @graph JSON-LD Entity Architecture",
        description:
          "Every Organization, Service, Product, FAQPage, and BlogPosting links back to stable @id nodes so search engines and LLMs understand your company as one authoritative entity.",
      },
      {
        title: "AI-Search (GEO) & Crawler Governance",
        description:
          "Explicit robots.txt rules for Google-Extended, GPTBot, OAI-SearchBot, ClaudeBot, and PerplexityBot plus IndexNow push pipelines for near-instant Bing/ChatGPT indexing.",
      },
      {
        title: "Multi-Language & Localized Routing",
        description:
          "Reciprocal hreflang maps, x-default canonicals, and native keyword-aligned URL slugs across markets (e.g., Romanian + English).",
      },
      {
        title: "Core Web Vitals & Low-End Device Speed",
        description:
          "Zero-bloat Next.js App Router rendering, selective font preloading, hardware-aware animations, and sub-second LCP.",
      },
    ],
    valuePoints: [
      {
        label: "Entity Graph",
        value: "Single @graph",
        note: "Zero duplicate Organization nodes across hundreds of pages.",
      },
      {
        label: "Indexing Speed",
        value: "IndexNow Push",
        note: "Direct push to Bing & ChatGPT search index on every deploy.",
      },
      {
        label: "Proven Blueprint",
        value: "Ecoplast Hart 2026",
        note: "Battle-tested across 40+ localized commercial & editorial pages.",
      },
    ],
    faq: [
      {
        question: "Why does IndexNow matter if most traffic comes from Google?",
        answer:
          "IndexNow notifies Bing and Yandex within hours instead of weeks—and because ChatGPT's web search relies heavily on Bing's index, staying fresh in Bing directly improves your citation visibility in AI answers.",
      },
      {
        question: "What is wrong with setting lastmod to today's date on every sitemap URL?",
        answer:
          "Google detects unreliable lastmod timestamps that change on every deploy and discounts the field across the entire site. We only emit honest content-modification timestamps.",
      },
      {
        question: "Do you handle both the website engineering and the SEO content architecture?",
        answer:
          "Yes. We design the URL taxonomy, structured data schema, editorial article templates, and performance layer together so marketing and engineering never fight each other.",
      },
    ],
  },
  {
    slug: "local-first-ai-and-document-intelligence",
    number: "005",
    shortTitle: "Local-First AI & Agents",
    titleLines: ["Local-First AI", "& Intelligence"],
    title: "Local-First AI Agents, Private Document Search & Enterprise Automation",
    tagline:
      "Deploy private AI assistants that run on your own laptops—citing PDFs, spreadsheets, and regulations without uploading company secrets to rented clouds.",
    summary:
      "Powered by TITAN117 and custom local-first pipelines, we help organizations adopt AI safely with sandboxed tool approvals, offline models, and auditable citations.",
    metaTitle: "Local-First AI Agents & Private Document Intelligence",
    metaDescription:
      "Deploy private, local-first AI teams on company laptops with TITAN117: watched-folder PDF/Word/Excel search, multilingual citations, and sandboxed approvals.",
    category: "Applied AI",
    approachTitle: "Company intelligence belongs on your hardware",
    approachText:
      "Small and mid-sized companies should not have to choose between falling behind on AI or leaking financial spreadsheets and legal contracts to third-party cloud agents. We deploy TITAN117 and bespoke local-first AI workflows that run directly on employee hardware, combine free local models with metered cloud reasoning, and enforce human-in-the-loop approvals before any risky action.",
    deliverables: [
      {
        title: "Watched-Folder Document Intelligence",
        description:
          "Index local PDF, Word, Excel, PowerPoint, and email folders with hybrid keyword + multilingual semantic search (Romanian & English) and exact file/page citations.",
      },
      {
        title: "Sandboxed Tool & Approval Guardrails",
        description:
          "Strict folder boundaries, OS keychain secret storage, prompt-injection defenses, and mandatory user approvals before publishing, sending, deleting, or spending.",
      },
      {
        title: "Hybrid Local + Cloud Model Routing",
        description:
          "Run sensitive folders strictly on free offline local models (llama.cpp) while routing complex reasoning to frontier cloud models with hard monthly spend caps.",
      },
      {
        title: "Custom Internal Workflows & Onboarding",
        description:
          "Tailored TITAN117 deployments, MCP connectors, and persistent company memory configured for your operational team.",
      },
    ],
    valuePoints: [
      {
        label: "Data Residency",
        value: "100% Local-First",
        note: "Documents and memory stay on the user's machine by default.",
      },
      {
        label: "Multilingual Search",
        value: "RO & EN Citations",
        note: "Answers cite exact source documents and page numbers.",
      },
      {
        label: "Cost Control",
        value: "No Per-Seat Cloud Tax",
        note: "Free local models + transparent metered cloud credits or BYOK.",
      },
    ],
    faq: [
      {
        question: "Can we restrict certain sensitive folders to offline local models only?",
        answer:
          "Yes. TITAN117 supports strict 'local models only' folder policies so confidential legal, HR, or financial documents never leave the laptop.",
      },
      {
        question: "How is TITAN117 used by real businesses today?",
        answer:
          "Industrial operators like Ecoplast Hart use TITAN117's local-first assistant and folder intelligence to query environmental compliance documents, waste regulations, and operational files rapidly with exact citations.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
