import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
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

      {/* Exact Redox blog-details-area editorial layout */}
      <article className="blog-details-area section-light section-spacing">
        <div className="rx-container">
          <div className="section-header">
            <h1 className="rx-section-title font-display max-w-[1130px]">
              {article.title}
            </h1>
            <div className="meta">
              <span className="name">
                By <span>{article.author}</span>
              </span>
              <span className="tag has-left-line">{article.category}</span>
              <span className="date has-left-line">{article.publishedAt}</span>
              <span className="has-left-line">
                {article.readMinutes} min read
              </span>
            </div>
          </div>

          <div className="image-wrapper">
            <Image
              src={article.image}
              alt={article.title}
              width={1620}
              height={760}
              priority
            />
          </div>

          <div className="mx-auto max-w-[920px]">
            <div className="section-details">
              <p className="text !text-[21px] !leading-[32px] !text-[#111111]">
                {article.excerpt}
              </p>

              {/* Key Takeaways (.feature-list) */}
              <div className="mt-10 rounded-2xl border border-black/10 bg-[#FCF7F3] p-8">
                <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-[#FF6A3A]">
                  Key Takeaways
                </h2>
                <ul className="mt-4 space-y-3 text-[17px] leading-[26px] text-[#111111]">
                  {article.keyTakeaways.map((point) => (
                    <li key={point} className="relative pl-6">
                      <span className="absolute left-0 top-2.5 h-1.5 w-1.5 rounded-full bg-[#111111]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Main Editorial Sections */}
              {article.sections.map((section) => (
                <div key={section.heading} className="mt-14">
                  <h2 className="title">{section.heading}</h2>
                  {section.body.map((paragraph, idx) => (
                    <p key={idx} className="text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}

              {/* Related Service Callout */}
              <div className="mt-14 flex flex-col justify-between gap-6 rounded-2xl bg-[#111111] p-8 text-white sm:flex-row sm:items-center">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#FF6A3A]">
                    Related Service
                  </span>
                  <h3 className="font-heading mt-2 text-2xl font-medium tracking-[-0.03em]">
                    {article.relatedServiceLabel}
                  </h3>
                </div>
                <Link
                  href={`/services/${article.relatedService}`}
                  className="rx-btn shrink-0"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#111111",
                    borderColor: "#ffffff",
                  }}
                >
                  <span className="btn-wrap">
                    <span className="text-one" style={{ color: "#111111" }}>
                      Explore Service
                    </span>
                    <span className="text-two" style={{ color: "#111111" }}>
                      Explore Service
                    </span>
                  </span>
                  <ArrowUpRight className="ml-2 h-4 w-4 text-[#111111]" />
                </Link>
              </div>

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

      {/* Recent Blog Row matching Redox blog-area-3 */}
      <section className="blog-area-2 section-light section-spacing-bottom">
        <div className="rx-container">
          <div className="section-header">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <span className="rx-section-subtitle">Recent blog</span>
              </div>
              <div className="title-wrapper">
                <h2 className="rx-section-title font-display">
                  More from our journal
                </h2>
              </div>
            </div>
          </div>

          <div className="blogs-wrapper-box">
            <div className="blogs-wrapper">
              {recent.map((item) => (
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
    </main>
  );
}
