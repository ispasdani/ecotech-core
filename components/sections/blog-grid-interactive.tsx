"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { PageAnimations } from "@/components/animations/page-animations";
import type { BlogArticle } from "@/lib/data/blog";

/**
 * Blog Index built with the exact `/startup-agency` layout, BDO Grotesk
 * typography, `.thumb.parallax-view.go_full` full-bleed parallax hero banner,
 * and `.works-wrapper-4` counter-scale + vertical parallax scroll over every
 * article image.
 */
export function BlogGridInteractive({
  articles,
}: {
  articles: readonly BlogArticle[];
}) {
  const searchParams = useSearchParams();
  const categories = [
    "All",
    ...Array.from(new Set(articles.map((a) => a.category))),
  ];
  const urlCategory = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const activeCategory =
    selectedCategory ??
    (urlCategory && categories.includes(urlCategory) ? urlCategory : "All");

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <>
      {/* 1. Exact /startup-agency AboutFour Header + Full-Bleed .parallax-view.go_full Image */}
      <section className="about-area-4 section-light">
        <div className="rx-container">
          <div className="about-area-4-inner section-spacing-top">
            <div className="section-header fade-anim">
              <div className="section-title-wrapper">
                <div className="subtitle-wrapper">
                  <span className="rx-section-subtitle">
                    The journal
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
                  <h1 className="rx-section-title fade-anim">
                    Engineering research, sovereign AI architecture, and
                    Technical SEO field notes.
                  </h1>
                  <div className="btn-wrapper fade-anim">
                    {categories.map((cat) => {
                      const active = activeCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedCategory(cat)}
                          className={`rx-btn !px-7 !py-4 !text-[16px] ${
                            active
                              ? ""
                              : "!border-black/15 !bg-transparent !text-[#111111]"
                          }`}
                        >
                          <span className="btn-wrap">
                            <span
                              className="text-one"
                              style={
                                active ? undefined : { color: "#111111" }
                              }
                            >
                              {cat}
                            </span>
                            <span className="text-two">{cat}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Bleed 100vw Expanding Parallax Banner Image (exact /startup-agency go_full + data-speed="0.8") */}
            <div className="thumb parallax-view go_full">
              <Image
                src="/assets/imgs/gallery/image-35.webp"
                alt="ECOTECH CORE Engineering Journal"
                width={1920}
                height={920}
                priority
                sizes="100vw"
                data-speed="0.8"
                style={{ height: "auto" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Exact /startup-agency WorkAreaFour 2-Column Parallax Blog Grid */}
      <section className="work-area-4 section-light">
        <div className="rx-container">
          <div className="work-area-4-inner section-spacing">
            <div className="section-header fade-anim">
              <div className="section-title-wrapper">
                <div className="subtitle-wrapper">
                  <span className="rx-section-subtitle">
                    Articles ({filtered.length})
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
                    Latest publications &amp; technical playbooks
                  </h2>
                </div>
              </div>
            </div>

            <div className="works-wrapper-box section-spacing-top">
              <div className="works-wrapper-4">
                {filtered.map((item) => (
                  <article className="work-box fade-anim" key={item.slug}>
                    <div className="thumb">
                      <div className="image scale">
                        <Link href={`/blog/${item.slug}`}>
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={805}
                            height={560}
                            sizes="(max-width: 767px) 100vw, 50vw"
                            style={{ height: "auto" }}
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="content">
                      <h3 className="title">
                        <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                      </h3>
                      <div className="meta">
                        <span className="tag">
                          {item.category} / {item.readMinutes} min read
                        </span>
                        <span className="date">({item.publishedAt})</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <PageAnimations rebuildKey={activeCategory} />
    </>
  );
}
