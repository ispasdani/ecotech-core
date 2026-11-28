"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { PageAnimations } from "@/components/animations/page-animations";
import { BlogArrow, BlogCard, BlogMeta } from "@/components/sections/blog-card";
import { RxSubtitle } from "@/components/sections/rx-blocks";
import type { BlogArticle } from "@/lib/data/blog";

const ALL = "All";

/**
 * Blog index body, read top to bottom:
 *   1. Latest article, shown large (only on the unfiltered view).
 *   2. One filter bar: topic pills with counts.
 *   3. A plain 3 / 2 / 1 column grid of identical cards.
 * The active topic lives in `?category=` so filtered views can be shared.
 */
export function BlogGridInteractive({
  articles,
}: {
  articles: readonly BlogArticle[];
}) {
  const searchParams = useSearchParams();
  const filterRef = useRef<HTMLDivElement>(null);

  const sorted = [...articles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  const counts = new Map<string, number>();
  for (const a of sorted) counts.set(a.category, (counts.get(a.category) ?? 0) + 1);
  const categories = [ALL, ...counts.keys()];

  const urlCategory = searchParams.get("category");
  const activeCategory =
    urlCategory && counts.has(urlCategory) ? urlCategory : ALL;

  const selectCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === ALL) params.delete("category");
    else params.set("category", cat);
    const query = params.toString();
    // Native history update: Next syncs useSearchParams without a navigation.
    window.history.replaceState(null, "", query ? `?${query}` : "/blog");
  };

  // A filtered list can be much shorter, and the browser then clamps the
  // scroll past the filter bar. Once the new list is rendered, bring the bar
  // back to the top of the screen so the results are what the reader sees.
  const previousCategory = useRef(activeCategory);
  useEffect(() => {
    if (previousCategory.current === activeCategory) return;
    previousCategory.current = activeCategory;
    const bar = filterRef.current;
    if (bar && bar.getBoundingClientRect().top < 0) {
      // Instant: a smooth scroll would be cut short by the ScrollTrigger
      // refresh that PageAnimations runs right after this re-render.
      bar.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }, [activeCategory]);

  const isAll = activeCategory === ALL;
  const featured = isAll ? sorted[0] : undefined;
  const list = isAll
    ? sorted.slice(1)
    : sorted.filter((a) => a.category === activeCategory);

  return (
    <section className="section-light section-spacing">
      <div className="rx-container">
        {/* 1. Latest article */}
        {featured && (
          <div>
            <article className="fade-anim">
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-[15px] bg-[#f2f2f2]">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    width={1200}
                    height={750}
                    priority
                    sizes="(max-width: 1023px) 100vw, 55vw"
                    className="block h-full w-full object-cover transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>

                <div>
                  <RxSubtitle>Latest article</RxSubtitle>
                  <BlogMeta article={featured} className="mt-8" />
                  <h2 className="mt-4 font-display text-[30px] font-normal leading-[1.04] tracking-[-0.05em] text-[var(--primary)] sm:text-[40px] xl:text-[52px]">
                    {featured.title}
                  </h2>
                  <p className="mt-6 max-w-[560px] text-[16px] leading-[1.65] text-[var(--secondary)] lg:text-[17px]">
                    {featured.excerpt}
                  </p>
                  <span className="mt-8 flex items-center gap-3 text-[15px] font-medium text-[var(--primary)]">
                    Read article
                    <BlogArrow />
                  </span>
                </div>
              </Link>
            </article>
          </div>
        )}

        {/* 2. Filter bar */}
        <div
          ref={filterRef}
          className={`scroll-mt-6 flex flex-col gap-6 border-t border-[var(--border)] pt-8 lg:flex-row lg:items-end lg:justify-between ${
            featured ? "mt-20 lg:mt-28" : ""
          }`}
        >
          <div>
            <h2 className="font-heading text-[32px] font-normal leading-none tracking-[-0.05em] text-[var(--primary)] lg:text-[44px]">
              {isAll ? "All articles" : activeCategory}
            </h2>
            <p className="mt-3 text-[14px] text-[var(--secondary)]">
              {isAll
                ? `${sorted.length} articles · newest first`
                : `${list.length} ${list.length === 1 ? "article" : "articles"} in this topic`}
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter articles by topic"
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => {
              const active = activeCategory === cat;
              const count = cat === ALL ? sorted.length : counts.get(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectCategory(cat)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium tracking-[0.02em] transition-colors duration-300 ${
                    active
                      ? "border-[#111111] bg-[#111111] text-white"
                      : "border-[var(--border)] text-[var(--primary)] hover:border-[#111111]"
                  }`}
                >
                  {cat}
                  <span
                    className={active ? "text-white/60" : "text-[#999999]"}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Grid */}
        {list.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 2xl:gap-x-14">
            {list.map((item) => (
              <BlogCard key={item.slug} article={item} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-[16px] text-[var(--secondary)]">
            No articles in this topic yet.
          </p>
        )}
      </div>
      <PageAnimations rebuildKey={activeCategory} />
    </section>
  );
}
