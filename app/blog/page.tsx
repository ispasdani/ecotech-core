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
  title: "Engineering Journal & Blog — AI, Defense, Sovereign Chat & SEO",
  description:
    "Deep-dive technical articles from ECOTECH Core covering closed-door multilingual chat, deterministic drone swarm guardrails, local-first AI, and Technical SEO / GEO.",
});

export default function BlogPage() {
  return (
    <main>
      <JsonLd graph={blogIndexGraph()} />

      <Suspense
        fallback={
          <div className="rx-container section-spacing text-neutral-500">
            Loading journal...
          </div>
        }
      >
        <BlogGridInteractive articles={BLOG_ARTICLES} />
      </Suspense>

      <CtaBand theme="dark" />
    </main>
  );
}
