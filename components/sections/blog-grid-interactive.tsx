"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { BlogArticle } from "@/lib/data/blog";

/**
 * Exact recreation of Redox `blog-area-2` asymmetric 6-column editorial grid
 * (rows of 3 cards followed by 2 wide cards, repeating cleanly as blog volume grows)
 * with interactive category filtering for high-volume SEO & research libraries.
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
    <section className="blog-area-2 section-light section-spacing">
      <div className="rx-container">
        <div className="blog-area-2-inner">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <span className="rx-section-subtitle">
                  Recent blog
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
                <h1 className="rx-section-title font-display">
                  Learn from our engineering journal
                </h1>

                {/* Clean Category Filter Pills */}
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {categories.map((cat) => {
                    const active = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                          active
                            ? "border-[#111111] bg-[#111111] text-white"
                            : "border-black/15 bg-white text-[#111111] hover:border-black/40"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="blogs-wrapper-box">
            <div className="blogs-wrapper">
              {filtered.map((item) => (
                <Link key={item.slug} href={`/blog/${item.slug}`}>
                  <article className="blog">
                    <div className="thumb">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={640}
                        height={440}
                      />
                    </div>
                    <div className="content-wrapper">
                      <div className="content">
                        <h2 className="title">
                          {item.title}
                          <span className="arrow" aria-hidden="true">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 13 14"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8.98834 0.661257C8.91884 0.781628 8.85302 0.903885 8.79094 1.02786C8.47298 1.49122 8.0835 1.90234 7.63629 2.2455C7.07879 2.67328 6.4425 2.98707 5.76373 3.16894C5.08497 3.35082 4.37702 3.39722 3.68033 3.3055C2.98363 3.21377 2.31182 2.98572 1.70325 2.63437L0.869521 4.07843C1.66772 4.53928 2.54888 4.83839 3.46268 4.95869C4.37648 5.079 5.30502 5.01814 6.1953 4.77959C6.36565 4.73394 6.53397 4.68196 6.6999 4.62381L2.03475 12.7041L3.47584 13.5361L8.16052 5.42201C8.19489 5.61171 8.23713 5.80022 8.28719 5.98704C8.52574 6.87732 8.9373 7.71189 9.49839 8.44311C10.0595 9.17433 10.7591 9.78788 11.5573 10.2487L12.391 8.80466C11.7825 8.4533 11.2491 7.98552 10.8213 7.42803C10.3935 6.87053 10.0797 6.23423 9.89783 5.55547C9.71595 4.8767 9.66955 4.16876 9.76128 3.47206C9.83484 2.91326 9.99611 2.37047 10.2384 1.86349C10.3146 1.74781 10.3875 1.62977 10.457 1.50948L10.4323 1.49521L10.4324 1.49499L8.98834 0.661257Z"
                              />
                            </svg>
                          </span>
                        </h2>
                        <div className="meta">
                          <span className="name">
                            By <span>{item.author}</span>
                          </span>
                          <span className="has-left-line">{item.category}</span>
                          <span className="date has-left-line">
                            {item.publishedAt}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
