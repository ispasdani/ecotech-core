/**
 * Single source of truth for site origin, canonical routes, and content slugs.
 *
 * Adapted from the Ecoplast Hart 2026 SEO architecture:
 * - Zero guessed production fallback domains (prevents accidental canonical
 *   poisoning in Google Search Console).
 * - Every public page, service, product, and blog post is enumerated here so
 *   sitemap.ts, structured-data.ts, and metadata.ts stay 100% in sync.
 */

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) {
    if (process.env.NODE_ENV !== "production") {
      return "http://localhost:3000";
    }
    return "https://ecotechcore.com";
  }

  const trimmed = raw.replace(/\/+$/, "");
  if (!/^https?:\/\/[^/\s]+$/.test(trimmed)) {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL must be a bare origin with protocol and no trailing slash. Received: ${JSON.stringify(raw)}`,
    );
  }
  return trimmed;
}

export const siteUrl = resolveSiteUrl();

export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const staticRoutes = [
  "/",
  "/about",
  "/services",
  "/products",
  "/blog",
  "/contact",
] as const;

export const serviceSlugs = [
  "it-consulting-and-custom-engineering",
  "sovereign-multilingual-chat",
  "defense-and-autonomous-drone-swarms",
  "technical-seo-and-ai-search-geo",
  "local-first-ai-and-document-intelligence",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export function isServiceSlug(value: string): value is ServiceSlug {
  return (serviceSlugs as readonly string[]).includes(value);
}

export const productSlugs = [
  "titan117",
  "tri-drone-swarm-gcs",
  "sovereign-chat",
  "dbluna",
  "ninjathons",
  "ecoplasthart",
] as const;

export type ProductSlug = (typeof productSlugs)[number];

export function isProductSlug(value: string): value is ProductSlug {
  return (productSlugs as readonly string[]).includes(value);
}

export const blogSlugs = [
  "sovereign-closed-door-multilingual-chat-architecture",
  "deterministic-safety-guardrails-for-llm-drone-swarms",
  "local-first-ai-teams-why-titan117-runs-on-your-laptop",
  "technical-seo-and-ai-search-geo-ecoplasthart-case-study",
  "zero-trust-server-side-guardrails-in-modern-web-apps",
  "documenting-400-table-enterprise-databases-in-milliseconds",
] as const;

export type BlogSlug = (typeof blogSlugs)[number];

export function isBlogSlug(value: string): value is BlogSlug {
  return (blogSlugs as readonly string[]).includes(value);
}
