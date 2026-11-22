import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/data/products";

const PRODUCT_IMAGES: Record<string, string> = {
  titan117: "/assets/imgs/project/image-30.webp",
  "tri-drone-swarm-gcs": "/assets/imgs/project/image-31.webp",
  "sovereign-chat": "/assets/imgs/project/image-32.webp",
  dbluna: "/assets/imgs/project/image-33.webp",
  ninjathons: "/assets/imgs/project/image-34.webp",
  ecoplasthart: "/assets/imgs/project/image-35.webp",
};

/**
 * Exact recreation of Redox `/startup-agency` WorkAreaFour:
 * Uses `.image.scale` so `scaleAnim()` performs the exact counter-scale
 * parallax reveal (`0.9 -> 1` container, `1.3 -> 1` inner image).
 */
export function ProductsShowcase() {
  return (
    <section className="work-area-4 section-light">
      <div className="rx-container">
        <div className="work-area-4-inner section-spacing-top">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <span className="rx-section-subtitle">
                  Platforms
                  <svg
                    viewBox="0 0 99 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M1.41291 5.98894C1.41291 5.98894 3.65997 6.01383 4.51655 5.98894C7.19358 5.56824 10.4255 5.80978 13.363 5.56824C17.8256 5.20128 22.1327 4.79415 26.6187 4.79415C31.6715 4.79415 36.6774 4.21934 41.7162 4.18834C46.981 4.15594 52.2465 4.18834 57.5114 4.18834C68.6462 4.18834 79.781 4.18834 90.9158 4.18834C121.155 6.61149 47.6583 -1.30401 1 1.68408"
                      stroke="#111111"
                      strokeLinecap="round"
                      className="svg-elem-1"
                    />
                  </svg>
                </span>
              </div>

              <div className="title-wrapper">
                <h2 className="rx-section-title fade-anim">
                  The work we do, and our favorite ones
                </h2>
                <div className="btn-wrapper fade-anim">
                  <Link href="/services" className="rx-btn-underline">
                    Browse all services
                    <span className="icon">
                      <Image
                        src="/assets/imgs/icon/icon-5.webp"
                        alt=""
                        width={13}
                        height={13}
                      />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="works-wrapper-box section-spacing-top">
            <div className="works-wrapper-4 fade-anim">
              {PRODUCTS.map((product) => (
                <div className="work-box" key={product.slug}>
                  <div className="thumb">
                    <div className="image scale">
                      <Link href={`/products/${product.slug}`}>
                        <Image
                          src={
                            PRODUCT_IMAGES[product.slug] ??
                            "/assets/imgs/project/image-30.webp"
                          }
                          alt={`${product.name} — ${product.headline}`}
                          width={805}
                          height={630}
                          style={{ height: "auto" }}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="content">
                    <h3 className="title">
                      <Link href={`/products/${product.slug}`}>
                        {product.name} — {product.headline}
                      </Link>
                    </h3>
                    <div className="meta">
                      <span className="tag">{product.tag}</span>
                      <span className="date">{product.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
