import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CheckCircle2, Clock, Shield } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ProductVisualCard } from "@/components/sections/product-visual-card";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { PRODUCTS, getProductBySlug } from "@/lib/data/products";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { productSlugs } from "@/lib/seo/routes";
import { productDetailGraph } from "@/lib/seo/structured-data";

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return buildPageMetadata({
    path: `/products/${product.slug}`,
    title: product.metaTitle,
    description: product.metaDescription,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = PRODUCTS.filter((p) => p.slug !== product.slug).slice(
    0,
    3,
  );

  return (
    <main>
      <JsonLd graph={productDetailGraph(product)} />

      <PageHero
        eyebrow={`${product.category} · ${product.stage}`}
        title={`${product.name} — ${product.headline}`}
        description={product.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
        theme="dark"
      />

      {/* White Section: Visual Telemetry Card + Key Metrics + Who It's For */}
      <section className="bg-white py-20 text-[#111111] lg:py-28">
        <div className="ec-container">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ProductVisualCard
                pattern={product.visualPattern}
                name={product.name}
                stage={product.stage}
              />
            </div>

            <div className="space-y-8 lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                {product.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-black/10 bg-[#FCF7F3] p-5"
                  >
                    <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                      {metric.label}
                    </div>
                    <div className="font-heading mt-1.5 text-2xl font-medium tracking-[-0.03em] text-[#111111]">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
                  Who It Is Built For
                </h2>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-700">
                  {product.whoItIsFor.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6A3A]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-[#111111] p-6 text-white">
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#FF6A3A]">
                  Availability &amp; Licensing
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-neutral-300">
                  {product.pricingNote}
                </p>
                <div className="mt-5">
                  <Link href="/contact" className="rr-btn rr-btn-light text-sm">
                    <span className="btn-wrap">
                      <span className="text-one">Request Walkthrough</span>
                      <span className="text-two">Request Walkthrough</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Black Section: Verified Capabilities vs. Upcoming Roadmap & Architecture */}
      <section className="bg-[#111111] py-20 text-[#FCF7F3] lg:py-28">
        <div className="ec-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-7">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-emerald-400">
                Verified Capabilities
              </span>
              <h2 className="font-display mt-3 text-3xl font-normal tracking-[-0.04em] text-white sm:text-4xl">
                Built and verified today
              </h2>
              <ul className="mt-6 space-y-4">
                {product.verifiedFeatures.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#171717] p-5 text-sm leading-relaxed text-neutral-200 sm:text-base"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {product.roadmapFeatures && product.roadmapFeatures.length > 0 && (
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-amber-400">
                  Transparent Roadmap
                </span>
                <h2 className="font-display mt-3 text-2xl font-normal tracking-[-0.03em] text-white sm:text-3xl">
                  Upcoming phases in development
                </h2>
                <ul className="mt-5 space-y-3">
                  {product.roadmapFeatures.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-relaxed text-neutral-400"
                    >
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl border border-white/12 bg-[#171717] p-8">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#111111]">
                <Shield className="h-5 w-5 text-[#FF6A3A]" />
              </div>
              <h3 className="font-heading mt-6 text-2xl font-medium tracking-[-0.03em] text-white">
                Security &amp; Architecture Highlights
              </h3>
              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-300">
                {product.architectureHighlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="border-b border-white/10 pb-4 last:border-0 last:pb-0"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* White Section: Other Products */}
      <section className="bg-white py-20 text-[#111111]">
        <div className="ec-container">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
              More from the ECOTECH Core ecosystem
            </h2>
            <Link
              href="/products"
              className="rr-btn-underline text-sm text-[#111111]"
            >
              View all
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedProducts.map((other) => (
              <Link
                key={other.slug}
                href={`/products/${other.slug}`}
                className="group rounded-2xl border border-black/10 bg-[#FCF7F3] p-6 transition-colors hover:border-black/30"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#FF6A3A]">
                  {other.category}
                </span>
                <h3 className="font-heading mt-2 text-2xl font-medium tracking-[-0.03em] group-hover:text-[#FF6A3A]">
                  {other.name}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">{other.headline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
