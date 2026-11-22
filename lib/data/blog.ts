import type { BlogSlug, ServiceSlug } from "@/lib/seo/routes";

export interface BlogArticle {
  slug: BlogSlug;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  author: string;
  image: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readMinutes: number;
  relatedService: ServiceSlug;
  relatedServiceLabel: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    body: string[];
  }[];
  faq: { question: string; answer: string }[];
}

export const BLOG_ARTICLES: readonly BlogArticle[] = [
  {
    slug: "sovereign-closed-door-multilingual-chat-architecture",
    title:
      "Why Closed-Door Organizations Need Sovereign, Zero-Translation Multilingual Chat Apps",
    metaTitle: "Sovereign Closed-Door Multilingual Chat Architecture",
    metaDescription:
      "How dedicated single-tenant chat deployments built on CORE eliminate data leakage while letting multilingual teams converse natively in real time.",
    excerpt:
      "Consumer chat apps mix confidential company discussions onto third-party clouds and force multilingual teams into clumsy translation workflows. Here is how dedicated, native-language sovereign chat solves both.",
    category: "Sovereign Comms",
    author: "ECOTECH Core",
    image: "/assets/imgs/blog/blog-1.webp",
    tags: ["Sovereign Chat", "CORE Framework", "Multilingual", "Privacy"],
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-22",
    readMinutes: 6,
    relatedService: "sovereign-multilingual-chat",
    relatedServiceLabel: "Explore Sovereign Multilingual Chat",
    keyTakeaways: [
      "Every client organization should own a separated application and database—never a shared multi-tenant consumer messenger.",
      "Zero-input real-time translation removes the cognitive friction of international coordination: everyone writes and reads in their own native language.",
      "Server-verified access rules and invite-only onboarding keep closed-door leadership and industrial partner groups strictly confidential.",
    ],
    sections: [
      {
        heading: "The Hidden Risk of Consumer Messengers in Enterprise Operations",
        body: [
          "Across Europe, industrial companies, executive boards, and cross-border supplier networks routinely exchange pricing sheets, contracts, and operational schedules over public consumer chat apps. Once those messages leave your infrastructure, you lose control over data residency, retention, and access revocation.",
          "At ECOTECH Core, we built our Sovereign Chat platform on the CORE framework to eliminate multi-tenant exposure entirely. Every client receives a brand-new, separated chat application backed by its own dedicated database.",
        ],
      },
      {
        heading: "Native Language Messaging Without a Single Extra Click",
        body: [
          "Cross-border business rarely happens in a single language. A warehouse supervisor in Deva, a logistics partner in Germany, and an engineer in the UK should not have to copy-paste messages into external translation tools—especially when those tools log sensitive commercial text.",
          "Our Sovereign Chat renders every message automatically in each participant's chosen native language. You write naturally in Romanian, English, German, or French, and your colleague reads it seamlessly in theirs—with zero manual translation buttons and zero third-party browser extensions.",
        ],
      },
      {
        heading: "Proven in Production with Ecoplast Hart",
        body: [
          "Industrial recycling leader Ecoplast Hart runs both TITAN117 and our dedicated Sovereign Multilingual Chat platform to keep internal teams and international partners aligned without sacrificing confidentiality.",
        ],
      },
    ],
    faq: [
      {
        question: "How fast can ECOTECH Core deploy a dedicated Sovereign Chat instance?",
        answer:
          "Because it is built on our private CORE engineering foundation, we can provision a dedicated, branded, single-tenant instance with its own database in days rather than months.",
      },
      {
        question: "Are messages shared across different ECOTECH Core clients?",
        answer:
          "Never. Each client receives an isolated deployment and a separate database with strict server-verified room and user permissions.",
      },
    ],
  },
  {
    slug: "deterministic-safety-guardrails-for-llm-drone-swarms",
    title:
      "Deterministic Safety Guardrails for LLM-Controlled Defense Drone Swarms",
    metaTitle: "Deterministic Safety Guardrails for LLM Drone Swarms",
    metaDescription:
      "Inside Tri-Drone Swarm GCS: how deterministic safety validators, leader hot-swapping, and air-gapped local models make multi-drone command safe.",
    excerpt:
      "Large Language Models excel at translating high-level tactical intent into mission gameplans, but an unvalidated LLM should never touch a flight controller directly. Here is our deterministic defense architecture.",
    category: "Defense & UAV",
    author: "ECOTECH Core",
    image: "/assets/imgs/blog/blog-2.webp",
    tags: ["Defense R&D", "Drone Swarm", "MAVSDK", "Safety Guardrails"],
    publishedAt: "2026-11-21",
    updatedAt: "2026-11-22",
    readMinutes: 7,
    relatedService: "defense-and-autonomous-drone-swarms",
    relatedServiceLabel: "Explore Defense & Drone Swarm Systems",
    keyTakeaways: [
      "Natural-language mission planners must always pass through a deterministic mathematical Safety Guardrail Validator before reaching flight controllers.",
      "Single-operator leader hot-swapping (ALPHA-1, BRAVO-2, CHARLIE-3) reduces cognitive load during multi-UAV operations.",
      "Air-gapped offline rules and local Ollama models guarantee mission continuity with zero cloud connectivity.",
    ],
    sections: [
      {
        heading: "Why Probabilistic AI Needs Deterministic Flight Boundaries",
        body: [
          "Commanding a swarm of autonomous drones via natural language unlocks rapid tactical adaptation—an operator can instruct wingmen to hold a perimeter, inspect a ridge, or reform around a new leader in seconds. Yet probabilistic models can hallucinate unsafe altitudes or intersecting trajectories.",
          "In our Tri-Drone Swarm GCS, every LLM-generated gameplan is strictly validated by a deterministic Safety Guardrail Validator that clamps inter-drone separation distances, enforces altitude ceilings, and verifies landmark obstacle clearance before any command reaches the swarm engine.",
        ],
      },
      {
        heading: "Seamless Leader Hot-Swapping & Zero-Dependency Simulation",
        body: [
          "Operators pilot ALPHA-1, BRAVO-2, or CHARLIE-3 one at a time using keyboard, Mode-2 Xbox/PS gamepad, or Picture-in-Picture feed clicks. The moment control switches to BRAVO-2, the remaining drones seamlessly adapt into dynamic leader-follower formation or continue their independent validated gameplans.",
          "Before a single real rotor spins, teams validate missions in our built-in zero-dependency 6-DOF 3D outdoor simulator—then switch to real Pixhawk PX4 or ArduPilot hardware via our abstract MAVSDK fleet adapter.",
        ],
      },
    ],
    faq: [
      {
        question: "Can Tri-Drone Swarm GCS operate completely offline?",
        answer:
          "Yes. It ships with a zero-API-key Offline Rules commander by default and supports local Ollama models (such as llama3.2 or qwen2.5) for fully air-gapped environments.",
      },
      {
        question: "How does it transition from simulation to physical drones?",
        answer:
          "The swarm engine communicates through an abstract DroneFleetAdapter. Switching from the 6-DOF simulator to live PX4/ArduPilot drones requires only selecting the MAVSDK backend.",
      },
    ],
  },
  {
    slug: "local-first-ai-teams-why-titan117-runs-on-your-laptop",
    title:
      "Local-First AI vs. Cloud Agents: Why TITAN117 Runs on Your Own Laptop",
    metaTitle: "Why TITAN117 Runs Local-First AI on Your Laptop",
    metaDescription:
      "Why renting 24/7 cloud agent servers creates privacy and cost traps for small companies—and how TITAN117 delivers local-first AI with sandboxed approvals.",
    excerpt:
      "Most AI platforms ask small companies to upload their entire file tree to rented cloud servers and pay steep per-seat bills. TITAN117 flips the architecture: your AI team runs locally on your laptop.",
    category: "Local-First AI",
    author: "ECOTECH Core",
    image: "/assets/imgs/blog/blog-3.webp",
    tags: ["TITAN117", "Local-First AI", "llama.cpp", "Privacy"],
    publishedAt: "2026-11-15",
    updatedAt: "2026-11-22",
    readMinutes: 6,
    relatedService: "local-first-ai-and-document-intelligence",
    relatedServiceLabel: "Explore Local-First AI & TITAN117",
    keyTakeaways: [
      "Local-first execution keeps financial spreadsheets, legal contracts, and internal memory on your own hardware by default.",
      "Hybrid routing lets you run free offline local models (llama.cpp) on sensitive folders while reserving metered cloud credits for heavy reasoning.",
      "Sandboxed shell execution and explicit human approvals prevent prompt-injection attacks from deleting files or leaking secrets.",
    ],
    sections: [
      {
        heading: "The Problem with Cloud-Hosted 24/7 AI Agents",
        body: [
          "Small and medium businesses handle deeply sensitive information: supplier pricing, employee records, regulatory filings, and proprietary code. Uploading all of that into a multi-tenant cloud agent server introduces compliance risk and unpredictable per-seat cloud costs.",
          "TITAN117 was engineered from day one as a desktop-first engine (Windows & macOS) paired with a minimal cloud layer that handles only accounts, plans, credits, and opt-in encrypted sharing.",
        ],
      },
      {
        heading: "Watched-Folder Intelligence with Exact Citations",
        body: [
          "With TITAN117's folder agent, you point the engine at local folders containing PDFs, Word documents, Excel spreadsheets, PowerPoint decks, and emails. Hybrid keyword and multilingual semantic search (Romanian and English) answers complex operational questions while citing the exact file and page number—and sensitive folders can be locked to 'local models only'.",
        ],
      },
    ],
    faq: [
      {
        question: "Does TITAN117 work when my laptop is offline?",
        answer:
          "Yes. Local models (llama.cpp), local document search, and previews work offline, backed by a signed 14-day offline license lease.",
      },
      {
        question: "How are API keys and secrets protected in TITAN117?",
        answer:
          "All BYOK API keys and credentials are stored exclusively in the operating system's native keychain—never in plaintext configuration files, logs, or model prompts.",
      },
    ],
  },
  {
    slug: "technical-seo-and-ai-search-geo-ecoplasthart-case-study",
    title:
      "Technical SEO & AI-Search (GEO) in 2026: Lessons from the Ecoplast Hart Architecture",
    metaTitle: "Technical SEO & AI-Search (GEO) — Ecoplast Hart Case Study",
    metaDescription:
      "How ECOTECH Core engineered Ecoplast Hart 2026 for Google Search and AI citations using unified @graph JSON-LD, honest sitemaps, and IndexNow.",
    excerpt:
      "Ranking in 2026 means satisfying both Google's entity graph and AI grounding crawlers like ChatGPT Search, Perplexity, and Gemini. Here are the exact engineering patterns we built for Ecoplast Hart.",
    category: "Technical SEO & GEO",
    author: "ECOTECH Core",
    image: "/assets/imgs/blog/blog-4.webp",
    tags: ["Technical SEO", "AI-Search GEO", "Ecoplast Hart", "IndexNow"],
    publishedAt: "2026-11-12",
    updatedAt: "2026-11-22",
    readMinutes: 8,
    relatedService: "technical-seo-and-ai-search-geo",
    relatedServiceLabel: "Explore Technical SEO & AI-Search",
    keyTakeaways: [
      "Emit one unified @graph JSON-LD block per page with stable @id references instead of duplicating Organization nodes.",
      "Never fake lastModified dates in sitemap.xml; Google detects deploy-date spam and discounts the signal site-wide.",
      "Explicitly permit AI search crawlers (Google-Extended, OAI-SearchBot, ClaudeBot, PerplexityBot) and push updates via IndexNow.",
    ],
    sections: [
      {
        heading: "Why Entity Clarity Beats Keyword Stuffing",
        body: [
          "When we engineered Ecoplast Hart 2026, we audited the silent technical traps that drop real businesses from search indexes: mismatched canonical domains, shallow-merged Next.js metadata stripping OpenGraph cards, and duplicated Organization schema across service pages.",
          "By centralizing every route, localized Romanian/English slug, hreflang pair, and JSON-LD node into a single typed source of truth, every page reinforces one unambiguous corporate entity.",
        ],
      },
      {
        heading: "Designing for AI Citations (GEO) and Instant Indexing",
        body: [
          "Modern B2B buyers increasingly ask ChatGPT, Perplexity, or Google AI Overviews to recommend trusted industrial suppliers. Blocking Google-Extended or neglecting Bing's index makes your business invisible to AI answers.",
          "Our architecture explicitly governs 12+ AI crawlers in robots.txt and includes an automated IndexNow push pipeline so every newly published guide or service update reaches Bing and ChatGPT's web index within hours.",
        ],
      },
    ],
    faq: [
      {
        question: "Does this SEO architecture work for B2B software and consulting companies too?",
        answer:
          "Yes—this exact ECOTECH Core website uses the same unified @graph JSON-LD, honest sitemap, AI crawler rules, and IndexNow pipeline proven on Ecoplast Hart.",
      },
    ],
  },
  {
    slug: "zero-trust-server-side-guardrails-in-modern-web-apps",
    title:
      "Zero-Trust Real-Time Backends: Why Every Access Check Belongs on the Server",
    metaTitle: "Zero-Trust Server-Side Guardrails in Modern Web Apps",
    metaDescription:
      "Inside ECOTECH Core's security philosophy: why UI gating is never security, and how automated refusal tests eliminate broken access control.",
    excerpt:
      "Hiding a button in React or redirecting in middleware does not protect your data. Here is how our CORE engineering standard enforces zero-trust server checks on every single query and mutation.",
    category: "CORE Engineering",
    author: "ECOTECH Core",
    image: "/assets/imgs/blog/blog-5.webp",
    tags: ["Zero-Trust", "CORE Framework", "Security", "Testing"],
    publishedAt: "2026-11-08",
    updatedAt: "2026-11-22",
    readMinutes: 5,
    relatedService: "it-consulting-and-custom-engineering",
    relatedServiceLabel: "Explore IT Consulting & Engineering",
    keyTakeaways: [
      "The frontend decides what to show; the server decides what to send.",
      "Every gated backend function must have an automated refusal test proving that signed-out, free-tier, or cross-tenant callers receive a clean error code.",
      "AI spend and subscription entitlements must be reconciled atomically on the server via verified, idempotent webhooks.",
    ],
    sections: [
      {
        heading: "The Access Rule That Prevents Data Breaches",
        body: [
          "Broken access control remains the number-one vulnerability in modern SaaS applications. Developers frequently rely on middleware redirects or client-side plan checks, leaving underlying API endpoints exposed to direct requests or cross-tenant ID enumeration.",
          "Across every platform built on our CORE framework—from TITAN117 and DBLuna to Ninjathons and Sovereign Chat—every query, mutation, and API route validates authentication, plan entitlement, and record ownership on the server.",
        ],
      },
      {
        heading: "Automated Refusal & Coverage Testing",
        body: [
          "Security rules that depend on developer memory eventually fail. Our build pipeline enforces automated denial tests for every gated endpoint, calling each function as a signed-out visitor, a lapsed subscriber, and another user's ID to verify that unauthorized access is always refused.",
        ],
      },
    ],
    faq: [
      {
        question: "Does strict server-side verification slow down the user interface?",
        answer:
          "No. Modern reactive backends execute indexed ownership and entitlement lookups in single-digit milliseconds while keeping the client responsive.",
      },
    ],
  },
  {
    slug: "documenting-400-table-enterprise-databases-in-milliseconds",
    title:
      "Documenting 400-Table Enterprise Schemas in Milliseconds with Local-First Indexing",
    metaTitle: "Documenting 400-Table Databases in Milliseconds — DBLuna",
    metaDescription:
      "How DBLuna parses PostgreSQL, SQL Server, and BACPAC schemas locally to deliver 6ms search across 30,000 columns and offline Power BI handoffs.",
    excerpt:
      "Enterprise SQL Server and PostgreSQL databases routinely grow past 400 tables and 30,000 columns. Here is how DBLuna keeps diagrams, DBML code, and offline reporting docs in instant sync.",
    category: "Data & Tools",
    author: "ECOTECH Core",
    image: "/assets/imgs/blog/blog-6.webp",
    tags: ["DBLuna", "SQL Server", "DBML", "Power BI"],
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-22",
    readMinutes: 5,
    relatedService: "it-consulting-and-custom-engineering",
    relatedServiceLabel: "Explore Custom Engineering",
    keyTakeaways: [
      "One unified DBML pipeline eliminates drift between visual ER diagrams, schema code, and generated documentation.",
      "Local-first IndexedDB storage and zero-server URL-fragment share links protect sensitive database structures.",
      "Portable offline HTML Reporting Handoffs let SQL Server teams hand clean join maps directly to Power BI developers.",
    ],
    sections: [
      {
        heading: "Solving Schema Drift for Large Data Teams",
        body: [
          "Most database diagrams become obsolete the week they are drawn. In DBLuna, the visual canvas, the DBML code editor, and the generated documentation site share one deterministic parser and generator—meaning every edit stays in strict two-way sync.",
          "Tested against 428-table, 672-relationship enterprise schemas, DBLuna supports schema-group filtering, focus mode, and ranked search returning qualified matches across 30,000 columns in roughly 6 milliseconds.",
        ],
      },
      {
        heading: "Schema-Only BACPAC Imports & Zero-Server Sharing",
        body: [
          "When importing a SQL Server BACPAC archive, DBLuna reads exclusively from model.xml—never touching table rows or customer records. Teams can even share full interactive diagrams via compressed URL fragments that never touch a backend server.",
        ],
      },
    ],
    faq: [
      {
        question: "Does DBLuna upload my database rows when importing a BACPAC file?",
        answer:
          "No. DBLuna reads only the schema definition (model.xml) and never ingests or transmits table data.",
      },
    ],
  },
];

export function getBlogBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}

export function getLatestBlogUpdate(): string {
  return (
    [...BLOG_ARTICLES]
      .map((a) => a.updatedAt)
      .sort()
      .at(-1) ?? "2026-11-22"
  );
}
