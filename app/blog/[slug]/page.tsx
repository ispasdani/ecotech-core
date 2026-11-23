import type { Metadata } from "next";
import { PageAnimations } from "@/components/animations/page-animations";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaBand } from "@/components/sections/cta-band";
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

/**
 * Blog Details built with the exact `/startup-agency` + Redox `blog-details-area`
 * layout and parallax scroll over images (`.parallax-view.go_full` hero banner,
 * side-by-side `.thumb.parallax-view` editorial blocks, and `.gallery-wrapper`
 * dual parallax images).
 */
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getBlogBySlug(slug);
  if (!article) notFound();

  const recent = BLOG_ARTICLES.filter((a) => a.slug !== article.slug).slice(
    0,
    3,
  );

  return (
    <main>
      <JsonLd graph={blogDetailGraph(article)} />

      {/* 1. Exact /startup-agency Header + Full-Bleed 100vw .parallax-view.go_full Hero Image */}
      <article className="blog-details-area about-area-4 section-light">
        <div className="rx-container">
          <div className="section-spacing-top">
            <div className="section-header fade-anim">
              <div className="section-title-wrapper">
                <div className="subtitle-wrapper">
                  <span className="rx-section-subtitle">
                    {article.category}
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
                  <h1 className="rx-section-title">{article.title}</h1>
                  <div className="meta">
                    <span className="name">
                      By <span>{article.author}</span>
                    </span>
                    <span className="tag has-left-line">{article.category}</span>
                    <span className="date has-left-line">
                      {article.publishedAt}
                    </span>
                    <span className="has-left-line">
                      {article.readMinutes} min read
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Bleed 100vw Expanding Parallax Cover Image */}
            <div className="thumb parallax-view go_full">
              <Image
                src="/assets/imgs/gallery/image-35.webp"
                alt={article.title}
                width={1920}
                height={920}
                priority
                sizes="100vw"
                data-speed="0.8"
                style={{ height: "auto" }}
              />
            </div>
          </div>

          {/* 2. Exact Redox blog-details-area Editorial Body with Inline Parallax Images */}
          <div className="mx-auto max-w-[1020px] section-spacing">
            <div className="section-details fade-anim">
              <p className="text !text-[22px] !leading-[32px] !text-[#111111]">
                {article.excerpt}
              </p>

              {/* Section 1 + Exact Redox .thumb-text-wrapper with Parallax Image */}
              {article.sections[0] && (
                <div className="mt-14">
                  <h2 className="title">{article.sections[0].heading}</h2>
                  {article.sections[0].body[0] && (
                    <p className="text">{article.sections[0].body[0]}</p>
                  )}

                  <div className="mt-8 grid grid-cols-1 items-start gap-8 md:grid-cols-2">
                    <div className="thumb parallax-view rounded-[15px]">
                      <Image
                        src={article.image}
                        alt={article.sections[0].heading}
                        width={640}
                        height={480}
                        data-speed="0.8"
                        sizes="(max-width: 767px) 100vw, 510px"
                        style={{ height: "auto" }}
                      />
                    </div>
                    <div className="space-y-5">
                      {article.sections[0].body.slice(1).map((p, idx) => (
                        <p key={idx} className="text">
                          {p}
                        </p>
                      ))}
                      <div className="pt-2">
                        <Link
                          href={`/services/${article.relatedService}`}
                          className="rx-btn-underline"
                        >
                          {article.relatedServiceLabel}
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
              )}

              {/* Key Takeaways in clean /startup-agency top/bottom hairline rows */}
              <div className="mt-16 border-t border-black/10 pt-10">
                <h2 className="title">Key Engineering Takeaways</h2>
                <div className="divide-y divide-black/10 border-y border-black/10">
                  {article.keyTakeaways.map((point, idx) => (
                    <div
                      key={point}
                      className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-[90px_1fr]"
                    >
                      <span className="text-[18px] text-[#111111]">
                        (00{idx + 1})
                      </span>
                      <p className="text-[20px] leading-[28px] text-[#111111]">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2 + Exact Redox .gallery-wrapper 2-Col Parallax Images */}
              {article.sections[1] && (
                <div className="mt-16">
                  <h2 className="title">{article.sections[1].heading}</h2>
                  {article.sections[1].body.map((p, idx) => (
                    <p key={idx} className="text">
                      {p}
                    </p>
                  ))}

                  <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="image parallax-view rounded-[15px]">
                      <Image
                        src="/assets/imgs/gallery/image-37.webp"
                        alt="ECOTECH CORE architecture detail"
                        width={640}
                        height={460}
                        data-speed="0.8"
                        sizes="(max-width: 767px) 100vw, 510px"
                        style={{ height: "auto" }}
                      />
                    </div>
                    <div className="image parallax-view rounded-[15px]">
                      <Image
                        src="/assets/imgs/gallery/image-38.webp"
                        alt="ECOTECH CORE production verification"
                        width={640}
                        height={460}
                        data-speed="0.8"
                        sizes="(max-width: 767px) 100vw, 510px"
                        style={{ height: "auto" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Remaining Sections */}
              {article.sections.slice(2).map((section) => (
                <div key={section.heading} className="mt-14">
                  <h2 className="title">{section.heading}</h2>
                  {section.body.map((paragraph, idx) => (
                    <p key={idx} className="text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}

              {/* Tags */}
              <div className="tags-wrapper">
                <span className="text-lg font-medium text-[#111111]">
                  Tags:
                </span>
                <div className="tags">
                  {article.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              {article.faq.length > 0 && (
                <div className="mt-16 border-t border-black/10 pt-12">
                  <h2 className="title">Frequently Asked Questions</h2>
                  <FaqAccordion items={article.faq} theme="light" />
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* 3. Recent Blog Row with .parallax-view images */}
      <section className="blog-area-2 section-light section-spacing-bottom">
        <div className="rx-container">
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
                <h2 className="rx-section-title">More from our journal</h2>
              </div>
            </div>
          </div>

          <div className="blogs-wrapper-box">
            <div className="blogs-wrapper">
              {recent.map((item) => (
                <Link key={item.slug} href={`/blog/${item.slug}`}>
                  <article className="blog fade-anim">
                    <div className="thumb parallax-view">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={640}
                        height={440}
                        data-speed="0.85"
                        sizes="(max-width: 991px) 100vw, 33vw"
                      />
                    </div>
                    <div className="content-wrapper">
                      <div className="content">
                        <h3 className="title">
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
                        </h3>
                        <div className="meta">
                          <span className="name">
                            By <span>{item.author}</span>
                          </span>
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
      </section>

      <CtaBand theme="dark" />
      <PageAnimations />
    </main>
  );
}
