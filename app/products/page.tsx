import type { Metadata } from "next";
import { PageAnimations } from "@/components/animations/page-animations";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { CtaBand } from "@/components/sections/cta-band";
import { RxButton, RxSubtitle } from "@/components/sections/rx-blocks";
import { JsonLd } from "@/components/seo/json-ld";
import { PRODUCTS } from "@/lib/data/products";
import { BANNER_IMAGES, PROJECT_IMAGE_SIZE, productImage } from "@/lib/data/media";
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
        eyebrow="Platforms"
        title="Proprietary platforms built on CORE and proven in the field"
        description="Every product we build shares the same obsession with local-first privacy, server-verified security and reliability you can measure."
        crumbs={[{ label: "Home", href: "/" }, { label: "Platforms" }]}
        actions={<RxButton href="/contact">Request a walkthrough</RxButton>}
        image={{
          ...BANNER_IMAGES.wide,
          alt: "ECOTECH CORE platforms",
        }}
      />

      {/* White: homepage WorkAreaFour grid, with metrics under each card */}
      <section className="work-area-4 section-light">
        <div className="rx-container">
          <div className="work-area-4-inner section-spacing">
            <div className="section-header fade-anim">
              <div className="section-title-wrapper">
                <div className="subtitle-wrapper">
                  <RxSubtitle>All platforms ({PRODUCTS.length})</RxSubtitle>
                </div>
                <div className="title-wrapper">
                  <h2 className="rx-section-title fade-anim">
                    Six systems, one engineering standard
                  </h2>
                </div>
              </div>
            </div>

            <div className="works-wrapper-box section-spacing-top">
              <div className="works-wrapper-4">
                {PRODUCTS.map((product) => (
                  <article className="work-box fade-anim" key={product.slug}>
                    <div className="thumb">
                      <div className="image scale">
                        <Link href={`/products/${product.slug}`}>
                          <Image
                            src={productImage(product.slug)}
                            alt={`${product.name}: ${product.headline}`}
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
                        <Link href={`/products/${product.slug}`}>
                          {product.name}: {product.headline}
                        </Link>
                      </h3>
                      <div className="meta">
                        <span className="tag">{product.category}</span>
                        <span className="date">{product.year}</span>
                      </div>
                      <p className="mt-5 max-w-[620px] text-[17px] leading-[1.6] text-[#555555]">
                        {product.summary}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {product.metrics.map((m) => (
                          <span key={m.label} className="ec-pill">
                            {m.label}: <strong>{m.value}</strong>
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarqueeBand />

      <CtaBand lineOne="Let’s" lineTwo="walk you through it" theme="dark" />
      <PageAnimations />
    </main>
  );
}
