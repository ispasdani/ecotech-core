import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogGridInteractive } from "@/components/sections/blog-grid-interactive";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { BLOG_ARTICLES } from "@/lib/data/blog";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { blogIndexGraph } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  path: "/blog",
  title: "Engineering Journal & Blog: AI, Defense, Sovereign Chat & SEO",
  description:
    "Deep-dive technical articles from ECOTECH CORE covering closed-door multilingual chat, deterministic drone swarm guardrails, local-first AI, and Technical SEO / GEO.",
});

export default function BlogPage() {
  return (
    <main>
      <JsonLd graph={blogIndexGraph()} />

      {/* No visible hero: the page opens on the latest article. The h1
          stays for screen readers and search engines. */}
      <h1 className="sr-only">ECOTECH CORE engineering journal</h1>

      {/* The topic filter reads `?category=`, which is URL data. */}
      <Suspense
        fallback={
          <div className="rx-container section-spacing-bottom text-[var(--secondary)]">
            Loading articles...
          </div>
        }
      >
        <BlogGridInteractive articles={BLOG_ARTICLES} />
      </Suspense>

      <CtaBand theme="dark" />
    </main>
  );
}
