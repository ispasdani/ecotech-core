import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageAnimations } from "@/components/animations/page-animations";
import { BlogCard, BlogMeta, formatBlogDate } from "@/components/sections/blog-card";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import {
  RxButton,
  RxSubtitle,
  RxUnderlineLink,
} from "@/components/sections/rx-blocks";
import { JsonLd } from "@/components/seo/json-ld";
import { BLOG_ARTICLES, getBlogBySlug } from "@/lib/data/blog";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { blogSlugs } from "@/lib/seo/routes";
import { blogDetailGraph } from "@/lib/seo/structured-data";

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogBySlug(slug);
  if (!article) return {};

  return buildPageMetadata({
    path: `/blog/${article.slug}`,
    title: article.metaTitle,
    description: article.metaDescription,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  });
}

function anchorId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // `params` is URL data: read it inside <Suspense> so client navigations
  // stay instant (the fallback renders while the slug resolves).
  return (
    <Suspense
      fallback={
        <main className="section-light">
          <div className="rx-container section-spacing text-[var(--secondary)]">
            Loading article...
          </div>
        </main>
      }
    >
      <BlogArticleView params={params} />
    </Suspense>
  );
}

/**
 * Article layout, read top to bottom:
 *   1. Header: breadcrumb, meta line, title, lead, cover image.
 *   2. Body: sticky sidebar (contents, details, tags) next to the text,
 *      which opens with the key takeaways, then the sections, then FAQ.
 *   3. Related service, then more articles.
 */
async function BlogArticleView({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getBlogBySlug(slug);
  if (!article) notFound();

  const sections = article.sections.map((s) => ({
    ...s,
    id: anchorId(s.heading),
  }));
  const toc = [
    { id: "key-takeaways", label: "Key takeaways" },
    ...sections.map((s) => ({ id: s.id, label: s.heading })),
    ...(article.faq.length > 0 ? [{ id: "faq", label: "FAQ" }] : []),
  ];

  const sameTopic = BLOG_ARTICLES.filter(
    (a) => a.slug !== article.slug && a.category === article.category,
  );
  const others = BLOG_ARTICLES.filter(
    (a) => a.slug !== article.slug && a.category !== article.category,
  );
  const recent = [...sameTopic, ...others].slice(0, 3);

  return (
    <main>
      <JsonLd graph={blogDetailGraph(article)} />

      <article className="section-light">
        {/* 1. Header */}
        <header className="rx-container section-spacing-top">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[13px] tracking-[0.04em] text-[#999999]"
          >
            <Link href="/" className="transition-colors hover:text-[#111111]">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/blog"
              className="transition-colors hover:text-[#111111]"
            >
              Blog
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/blog?category=${encodeURIComponent(article.category)}`}
              className="transition-colors hover:text-[#111111]"
            >
              {article.category}
            </Link>
          </nav>

          <div className="fade-anim mt-12 max-w-[1180px] lg:mt-16">
            <BlogMeta article={article} />
            <h1 className="mt-6 font-heading text-[36px] font-normal leading-[1.02] tracking-[-0.05em] text-[var(--primary)] sm:text-[48px] lg:text-[64px] 2xl:text-[76px]">
              {article.title}
            </h1>
            <p className="mt-8 max-w-[820px] text-[18px] leading-[1.6] text-[var(--secondary)] lg:text-[21px]">
              {article.excerpt}
            </p>
          </div>

          <div className="mt-12 aspect-[16/9] overflow-hidden rounded-[15px] bg-[#f2f2f2] lg:mt-16 lg:aspect-[21/9]">
            <Image
              src={article.image}
              alt={article.title}
              width={1920}
              height={823}
              priority
              sizes="(max-width: 1650px) 100vw, 1650px"
              className="block h-full w-full object-cover"
            />
          </div>
        </header>

        {/* 2. Body */}
        <div className="rx-container section-spacing">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20 xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-28">
            <aside className="lg:sticky lg:top-10 lg:self-start">
              <div className="border-t border-[var(--border)] pt-6">
                <p className="text-[13px] font-medium tracking-[0.04em] text-[var(--primary)]">
                  On this page
                </p>
                <ol className="mt-4 space-y-3">
                  {toc.map((item, idx) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="flex gap-3 text-[14px] leading-[1.4] text-[var(--secondary)] transition-colors hover:text-[var(--primary)]"
                      >
                        <span className="w-6 shrink-0 text-[#999999]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[var(--border)] pt-6 text-[14px] lg:grid-cols-1">
                <div>
                  <dt className="text-[#999999]">Written by</dt>
                  <dd className="mt-1 text-[var(--primary)]">
                    {article.author}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#999999]">Published</dt>
                  <dd className="mt-1 text-[var(--primary)]">
                    {formatBlogDate(article.publishedAt)}
                  </dd>
                </div>
                {article.updatedAt !== article.publishedAt && (
                  <div>
                    <dt className="text-[#999999]">Updated</dt>
                    <dd className="mt-1 text-[var(--primary)]">
                      {formatBlogDate(article.updatedAt)}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-[#999999]">Reading time</dt>
                  <dd className="mt-1 text-[var(--primary)]">
                    {article.readMinutes} min
                  </dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap gap-2 border-t border-[var(--border)] pt-6">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border)] px-4 py-1 text-[13px] font-medium leading-[24px] text-[var(--primary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </aside>

            <div className="max-w-[860px]">
              {/* Key takeaways first, so the point lands before the detail. */}
              <section
                id="key-takeaways"
                className="fade-anim scroll-mt-10 rounded-[15px] bg-[#f6f6f6] p-7 sm:p-10"
              >
                <RxSubtitle>Key takeaways</RxSubtitle>
                <ol className="mt-6 divide-y divide-[var(--border)]">
                  {article.keyTakeaways.map((point, idx) => (
                    <li
                      key={point}
                      className="grid grid-cols-[48px_1fr] gap-3 py-5 first:pt-0 last:pb-0"
                    >
                      <span className="text-[15px] text-[#999999]">
                        ({String(idx + 1).padStart(2, "0")})
                      </span>
                      <p className="text-[17px] leading-[1.5] text-[var(--primary)]">
                        {point}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>

              {sections.map((section, idx) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="fade-anim mt-16 scroll-mt-10 border-t border-[var(--border)] pt-10 lg:mt-20"
                >
                  <span className="text-[15px] text-[#999999]">
                    ({String(idx + 1).padStart(2, "0")})
                  </span>
                  <h2 className="mt-4 font-display text-[28px] font-normal leading-[1.06] tracking-[-0.05em] text-[var(--primary)] lg:text-[40px]">
                    {section.heading}
                  </h2>
                  <div className="mt-6 space-y-5">
                    {section.body.map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-[17px] leading-[1.7] text-[var(--secondary)] lg:text-[18px]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              {article.faq.length > 0 && (
                <section
                  id="faq"
                  className="fade-anim mt-16 scroll-mt-10 border-t border-[var(--border)] pt-10 lg:mt-20"
                >
                  <h2 className="mb-8 font-display text-[28px] font-normal leading-[1.06] tracking-[-0.05em] text-[var(--primary)] lg:text-[40px]">
                    Frequently asked questions
                  </h2>
                  <FaqAccordion items={article.faq} theme="light" />
                </section>
              )}

              <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-[var(--border)] pt-8">
                <RxUnderlineLink href="/blog">Back to all articles</RxUnderlineLink>
                <span className="text-[13px] text-[#999999]">
                  {article.readMinutes} min read · {article.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* 3a. Related service */}
      <section className="section-dark">
        <div className="rx-container section-spacing">
          <div className="fade-anim grid grid-cols-1 items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <RxSubtitle>Put this into practice</RxSubtitle>
              <h2 className="mt-8 max-w-[900px] font-heading text-[32px] font-normal leading-[1.02] tracking-[-0.05em] text-[var(--primary)] sm:text-[44px] lg:text-[60px]">
                {article.relatedServiceLabel}
              </h2>
            </div>
            <RxButton href={`/services/${article.relatedService}`} variant="outline-light">
              See the service
            </RxButton>
          </div>
        </div>
      </section>

      {/* 3b. More articles */}
      <section className="section-light">
        <div className="rx-container section-spacing">
          <div className="flex flex-col gap-6 border-t border-[var(--border)] pt-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <RxSubtitle>Keep reading</RxSubtitle>
              <h2 className="mt-6 font-heading text-[32px] font-normal leading-none tracking-[-0.05em] text-[var(--primary)] lg:text-[44px]">
                More from the journal
              </h2>
            </div>
            <RxUnderlineLink href="/blog">All articles</RxUnderlineLink>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-x-14">
            {recent.map((item) => (
              <BlogCard key={item.slug} article={item} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand theme="dark" />
      <PageAnimations />
    </main>
  );
}
