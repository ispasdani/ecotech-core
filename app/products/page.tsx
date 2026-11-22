import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ProductVisualCard } from "@/components/sections/product-visual-card";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { PRODUCTS } from "@/lib/data/products";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { productsIndexGraph } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  path: "/products",
  title: "Products, Defense Systems & Case Studies",
  description:
    "Explore TITAN117 local-first AI, Tri-Drone Swarm GCS defense software, CORE Sovereign Multilingual Chat, DBLuna, Ninjathons, and the Ecoplast Hart 2026 case study.",
});

export default function ProductsPage() {
  return (
    <main>
      <JsonLd graph={productsIndexGraph()} />

      <PageHero
        eyebrow="Products & Production Case Studies"
        title="Proprietary platforms built on CORE—and proven in the field."
        description="Every product we build shares our engineering obsession with local-first privacy, server-verified security, and deterministic reliability."
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      <section className="bg-white py-20 text-[#111111] lg:py-28">
        <div className="ec-container">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
            {PRODUCTS.map((product) => (
              <article key={product.slug} className="group flex flex-col">
                <Link href={`/products/${product.slug}`} className="block">
                  <div className="overflow-hidden rounded-2xl transition-transform duration-500 group-hover:-translate-y-1">
                    <ProductVisualCard
                      pattern={product.visualPattern}
                      name={product.name}
                      stage={product.stage}
                    />
                  </div>

                  <div className="mt-6 flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-[#FF6A3A]">
                        {product.category}
                      </span>
                      <h2 className="font-heading mt-1 text-3xl font-medium tracking-[-0.03em] text-[#111111] transition-colors group-hover:text-[#FF6A3A]">
                        {product.name}
                      </h2>
                    </div>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/15 text-[#111111] transition-colors group-hover:bg-[#111111] group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <p className="mt-3 text-base leading-relaxed text-neutral-600">
                    {product.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {product.metrics.map((m) => (
                      <span
                        key={m.label}
                        className="rounded-full border border-black/10 bg-[#FCF7F3] px-3 py-1 font-mono text-xs text-[#111111]"
                      >
                        {m.label}: <strong>{m.value}</strong>
                      </span>
                    ))}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Interested in a demo or private deployment?"
        lineOne="Let’s"
        lineTwo="walk you through it"
      />
    </main>
  );
}
