import Link from "next/link";
import { ParallaxImage, RxSubtitle } from "./rx-blocks";

/**
 * Inner-page hero in the homepage AboutFour language: squiggle subtitle,
 * large BDO Grotesk title, muted lead text, optional actions, then an
 * optional full-bleed parallax banner that opens to the screen edges.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  actions,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  crumbs: { label: string; href?: string }[];
  actions?: React.ReactNode;
  image?: { src: string; alt: string; width: number; height: number };
}) {
  return (
    <section className="about-area-4 section-light">
      <div className="rx-container">
        <div
          className={`about-area-4-inner section-spacing-top ${
            image ? "" : "section-spacing-bottom"
          }`}
        >
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex flex-wrap items-center gap-2 text-[13px] tracking-[0.04em] text-[#999999]"
          >
            {crumbs.map((crumb, idx) => (
              <span key={crumb.label} className="inline-flex items-center gap-2">
                {idx > 0 && <span aria-hidden="true">/</span>}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors duration-300 hover:text-[#111111]"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#111111]" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>

          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <RxSubtitle>{eyebrow}</RxSubtitle>
              </div>
              <div className="title-wrapper">
                <h1 className="rx-section-title !max-w-[1180px] pt-6">
                  {title}
                </h1>
                {description && (
                  <p className="mt-8 max-w-[720px] text-[18px] leading-[1.6] text-[#555555] lg:text-[20px]">
                    {description}
                  </p>
                )}
                {actions && <div className="btn-wrapper">{actions}</div>}
              </div>
            </div>
          </div>

          {image && (
            <ParallaxImage
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              speed={0.8}
              priority
              fullBleed
              className="thumb max-h-[78vh]"
            />
          )}
        </div>
      </div>
    </section>
  );
}
