import Link from "next/link";
import { COMPANY } from "@/lib/data/company";

/**
 * Exact recreation of Redox `/startup-agency` HeroFive:
 * - `.section-content-wrapper`: 715px 1fr grid
 * - Left: rounded 15px `.hero-video` showcase
 * - Right: 80px BDOGrotesk `.section-title` + bordered `.text-btn-wrapper` (330px 1fr)
 * - Bottom: Full-width architectural "ECOTECH" wordmark (replacing Redox's shape-19.webp)
 */
export function HeroStartup() {
  return (
    <section className="hero-area-5 section-light">
      <div className="rx-container">
        <div className="hero-area-5-inner section-spacing">
          <div className="section-content-wrapper">
            <div
              className="hero-video fade-anim"
              data-direction="left"
              data-delay="0.1"
              data-offset="60"
            >
              <video
                className="title-video"
                loop
                muted
                autoPlay
                playsInline
                poster="/assets/imgs/project/image-30.webp"
              >
                <source
                  src="https://rrdevs.net/project-video/xfire.webm"
                  type="video/webm"
                />
              </video>
            </div>

            <div className="section-content">
              <div className="section-title-wrapper">
                <div className="title-wrapper fade-anim">
                  <h1 className="section-title">{COMPANY.heroHeadline}</h1>
                </div>
              </div>

              <div className="text-btn-wrapper fade-anim" data-delay="0.2">
                <div className="text-wrapper">
                  <p className="text">{COMPANY.heroSubheadline}</p>
                </div>
                <div className="btn-wrapper">
                  <Link href="/contact" className="rx-btn">
                    <span className="btn-wrap">
                      <span className="text-one">Send message</span>
                      <span className="text-two">Send message</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width ECOTECH Architectural Display Wordmark (replaces REDOX shape-19.webp) */}
          <div className="hero-shape-1 section-spacing-top">
            <div
              className="fade-anim w-full select-none overflow-hidden"
              data-direction="right"
              data-offset="60"
              data-delay="0.2"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 1620 275"
                className="block h-auto w-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <text
                  x="810"
                  y="240"
                  textAnchor="middle"
                  fill="#111111"
                  textLength="1605"
                  lengthAdjust="spacingAndGlyphs"
                  style={{
                    fontFamily: "var(--font-bdogrotesk), system-ui, sans-serif",
                    fontSize: "295px",
                    fontWeight: 600,
                    letterSpacing: "-0.06em",
                  }}
                >
                  ECOTECH
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
