import type { Metadata } from "next";
import { PageAnimations } from "@/components/animations/page-animations";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import {
  ParallaxImage,
  RxButton,
  RxSubtitle,
  RxUnderlineLink,
} from "@/components/sections/rx-blocks";
import { JsonLd } from "@/components/seo/json-ld";
import { PRODUCTS, getProductBySlug } from "@/lib/data/products";
import { PROJECT_IMAGE_SIZE, productImage } from "@/lib/data/media";
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

  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 2);

  return (
    <main>
      <JsonLd graph={productDetailGraph(product)} />

      <PageHero
        eyebrow={product.category}
        title={`${product.name}: ${product.headline}`}
        description={product.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Platforms", href: "/products" },
          { label: product.name },
        ]}
        actions={
          <>
            <RxButton href="/contact">Request walkthrough</RxButton>
            <RxUnderlineLink href="/products">All platforms</RxUnderlineLink>
          </>
        }
      />

      {/* White: parallax visual + metrics + audience */}
      <section className="section-light section-spacing-bottom">
        <div className="rx-container">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="fade-anim lg:col-span-7" data-direction="left">
              <ParallaxImage
                src={productImage(product.slug)}
                alt={`${product.name} interface`}
                width={PROJECT_IMAGE_SIZE.width}
                height={PROJECT_IMAGE_SIZE.height}
                speed={0.75}
                priority
                sizes="(max-width: 1023px) 100vw, 58vw"
              />
            </div>

            <div className="lg:col-span-5">
              <div className="fade-anim grid grid-cols-2 border-t border-black/10">
                {product.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="border-b border-black/10 py-6 pr-4 odd:border-r odd:pr-6 even:pl-6"
                  >
                    <div className="text-[13px] tracking-[0.04em] text-[#999999]">
                      {metric.label}
                    </div>
                    <div className="font-heading mt-2 text-[26px] leading-[1.05] tracking-[-0.03em] text-[#111111] xl:text-[32px]">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="fade-anim mt-12" data-delay="0.2">
                <RxSubtitle>Built for</RxSubtitle>
                <ul className="mt-6 space-y-4">
                  {product.whoItIsFor.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-4 text-[17px] leading-[1.55] text-[#555555]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.55em] h-[7px] w-[7px] shrink-0 rounded-full bg-[#111111]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="fade-anim mt-12 border-t border-black/10 pt-8" data-delay="0.3">
                <div className="text-[13px] tracking-[0.04em] text-[#999999]">
                  Stage
                </div>
                <p className="mt-2 text-[17px] leading-[1.55] text-[#111111]">
                  {product.stage}
                </p>
                <div className="mt-6 text-[13px] tracking-[0.04em] text-[#999999]">
                  Availability and licensing
                </div>
                <p className="mt-2 text-[17px] leading-[1.55] text-[#555555]">
                  {product.pricingNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Black: verified capabilities, roadmap, architecture */}
      <section className="section-dark section-spacing">
        <div className="rx-container">
          <div className="fade-anim">
            <RxSubtitle>Verified today</RxSubtitle>
            <h2 className="rx-section-title mt-6 max-w-[1100px]">
              Built, tested and running now
            </h2>
          </div>

          <ol className="ec-rows mt-16">
            {product.verifiedFeatures.map((feat, idx) => (
              <li
                key={feat}
                className="fade-anim grid grid-cols-1 gap-3 py-8 md:grid-cols-[110px_1fr] lg:grid-cols-[150px_1fr]"
              >
                <span className="text-[18px] leading-none text-[#999999]">
                  ({String(idx + 1).padStart(3, "0")})
                </span>
                <p className="font-heading max-w-[1100px] text-[22px] leading-[1.3] tracking-[-0.02em] text-white sm:text-[26px] xl:text-[30px]">
                  {feat}
                </p>
              </li>
            ))}
          </ol>

          {product.roadmapFeatures && product.roadmapFeatures.length > 0 && (
            <div className="mt-28">
              <div className="fade-anim">
                <RxSubtitle>On the roadmap</RxSubtitle>
                <p className="mt-6 max-w-[720px] text-[18px] leading-[1.6] text-[#999999]">
                  In development and not yet promised as available. We separate
                  what ships from what is planned.
                </p>
              </div>
              <ul className="ec-rows mt-10">
                {product.roadmapFeatures.map((item) => (
                  <li
                    key={item}
                    className="fade-anim grid grid-cols-1 gap-3 py-6 text-[17px] leading-[1.55] text-[#999999] md:grid-cols-[110px_1fr] lg:grid-cols-[150px_1fr]"
                  >
                    <span className="text-[13px] tracking-[0.06em] text-[#666666]">
                      Planned
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-28 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="fade-anim lg:col-span-5">
              <RxSubtitle>Architecture</RxSubtitle>
              <h2 className="rx-section-title mt-6 !text-[clamp(34px,4vw,64px)]">
                Security and architecture highlights
              </h2>
            </div>
            <ul className="fade-anim ec-rows lg:col-span-7" data-delay="0.2">
              {product.architectureHighlights.map((highlight) => (
                <li
                  key={highlight}
                  className="py-6 text-[18px] leading-[1.55] text-[#d4d4d4]"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* White: more platforms with counter-scale reveal */}
      <section className="work-area-4 section-light">
        <div className="rx-container">
          <div className="work-area-4-inner section-spacing">
            <div className="section-header fade-anim">
              <div className="section-title-wrapper">
                <div className="subtitle-wrapper">
                  <RxSubtitle>More platforms</RxSubtitle>
                </div>
                <div className="title-wrapper">
                  <h2 className="rx-section-title">
                    More from the ECOTECH CORE ecosystem
                  </h2>
                  <div className="btn-wrapper">
                    <RxUnderlineLink href="/products">View all</RxUnderlineLink>
                  </div>
                </div>
              </div>
            </div>

            <div className="works-wrapper-box section-spacing-top">
              <div className="works-wrapper-4">
                {related.map((other) => (
                  <article className="work-box fade-anim" key={other.slug}>
                    <div className="thumb">
                      <div className="image scale">
                        <Link href={`/products/${other.slug}`}>
                          <Image
                            src={productImage(other.slug)}
                            alt={`${other.name}: ${other.headline}`}
                            width={PROJECT_IMAGE_SIZE.width}
                            height={PROJECT_IMAGE_SIZE.height}
                            sizes="(max-width: 767px) 100vw, 50vw"
                            style={{ height: "auto" }}
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="content">
                      <h3 className="title">
                        <Link href={`/products/${other.slug}`}>
                          {other.name}: {other.headline}
                        </Link>
                      </h3>
                      <div className="meta">
                        <span className="tag">{other.tag}</span>
                        <span className="date">{other.year}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand theme="dark" />
      <PageAnimations />
    </main>
  );
}
