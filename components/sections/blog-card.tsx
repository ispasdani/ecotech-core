import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/lib/data/blog";

/** "2026-11-18" -> "18 Nov 2026" without depending on the runtime locale. */
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatBlogDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** Category · date · read time, the one meta line every blog surface uses. */
export function BlogMeta({
  article,
  className = "",
}: {
  article: Pick<BlogArticle, "category" | "publishedAt" | "readMinutes">;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] tracking-[0.04em] text-[var(--secondary)] ${className}`}
    >
      <span className="font-medium text-[var(--primary)]">
        {article.category}
      </span>
      <span className="has-left-line">
        <time dateTime={article.publishedAt}>
          {formatBlogDate(article.publishedAt)}
        </time>
      </span>
      <span className="has-left-line">{article.readMinutes} min read</span>
    </div>
  );
}

const ARROW_PATH =
  "M8.98834 0.661257C8.91884 0.781628 8.85302 0.903885 8.79094 1.02786C8.47298 1.49122 8.0835 1.90234 7.63629 2.2455C7.07879 2.67328 6.4425 2.98707 5.76373 3.16894C5.08497 3.35082 4.37702 3.39722 3.68033 3.3055C2.98363 3.21377 2.31182 2.98572 1.70325 2.63437L0.869521 4.07843C1.66772 4.53928 2.54888 4.83839 3.46268 4.95869C4.37648 5.079 5.30502 5.01814 6.1953 4.77959C6.36565 4.73394 6.53397 4.68196 6.6999 4.62381L2.03475 12.7041L3.47584 13.5361L8.16052 5.42201C8.19489 5.61171 8.23713 5.80022 8.28719 5.98704C8.52574 6.87732 8.9373 7.71189 9.49839 8.44311C10.0595 9.17433 10.7591 9.78788 11.5573 10.2487L12.391 8.80466C11.7825 8.4533 11.2491 7.98552 10.8213 7.42803C10.3935 6.87053 10.0797 6.23423 9.89783 5.55547C9.71595 4.8767 9.66955 4.16876 9.76128 3.47206C9.83484 2.91326 9.99611 2.37047 10.2384 1.86349C10.3146 1.74781 10.3875 1.62977 10.457 1.50948L10.4323 1.49521L10.4324 1.49499L8.98834 0.661257Z";

/** Round arrow badge that rotates and fills on hover of a `.group` parent. */
export function BlogArrow() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[var(--primary)] transition-colors duration-300 group-hover:bg-[var(--primary)]"
    >
      <svg
        viewBox="0 0 13 14"
        className="w-[11px] fill-[var(--primary)] transition-transform duration-300 group-hover:rotate-60 group-hover:fill-[var(--bg)]"
      >
        <path fillRule="evenodd" clipRule="evenodd" d={ARROW_PATH} />
      </svg>
    </span>
  );
}

/**
 * Standard article card: image, meta line, title, short excerpt.
 * The whole card is one link so the hit area is obvious.
 */
export function BlogCard({
  article,
  sizes = "(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw",
}: {
  article: BlogArticle;
  sizes?: string;
}) {
  return (
    <article className="fade-anim h-full">
      <Link
        href={`/blog/${article.slug}`}
        className="group flex h-full flex-col"
      >
        <div className="aspect-[16/11] overflow-hidden rounded-[15px] bg-[#f2f2f2]">
          <Image
            src={article.image}
            alt={article.title}
            width={805}
            height={560}
            sizes={sizes}
            className="block h-full w-full object-cover transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        </div>

        <BlogMeta article={article} className="mt-6" />

        <h3 className="mt-3 font-display text-[22px] font-normal leading-[1.08] tracking-[-0.04em] text-[var(--primary)] lg:text-[26px]">
          {article.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-[15px] leading-[1.6] text-[var(--secondary)]">
          {article.excerpt}
        </p>

        <span className="mt-auto flex items-center gap-3 pt-6 text-[14px] font-medium text-[var(--primary)]">
          Read article
          <BlogArrow />
        </span>
      </Link>
    </article>
  );
}
