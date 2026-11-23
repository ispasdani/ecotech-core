import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo/routes";

/**
 * Explicit search & AI-Search (GEO) crawler governance modeled on
 * Ecoplast Hart 2026. Naming AI grounding crawlers explicitly ensures
 * ECOTECH CORE stays visible in Google AI Overviews, ChatGPT Search,
 * Claude, and Perplexity answers.
 */
const disallow = ["/api/"];

const aiUserAgents = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: aiUserAgents, allow: "/", disallow },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
