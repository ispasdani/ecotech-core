"use client";

import Link from "next/link";
import { COMPANY } from "@/lib/data/company";
import { CoreOGlyph, useCoreLogoVariant } from "@/components/layout/ecotech-logo";

/**
 * Exact recreation of Redox `/startup-agency` HeroFive:
 * - `.section-content-wrapper`: 715px 1fr grid
 * - Left: rounded 15px `.hero-video` showcase
 * - Right: 80px BDOGrotesk `.section-title` + bordered `.text-btn-wrapper` (410px 1fr)
 * - Bottom: Full-width architectural "ECOTECH CORE" display wordmark where the "O"
 *   in CORE is rendered with the active CoreOGlyph (Option 1 Ring or Option 2 Cutaway Sphere).
 */
export function HeroStartup() {
  const [logoVariant] = useCoreLogoVariant();

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

          {/* Full-Width ECOTECH CORE Architectural Display Wordmark with Core "O" */}
          <div className="hero-shape-1 section-spacing-top">
            <div
              className="fade-anim w-full select-none overflow-hidden"
              data-direction="right"
              data-offset="60"
              data-delay="0.2"
            >
              <div className="font-heading flex w-full items-baseline justify-between whitespace-nowrap text-[11.2vw] font-semibold leading-[0.88] tracking-[-0.06em] text-[#111111] 2xl:text-[184px]">
                <span>ECOTECH</span>
                <span className="inline-flex items-baseline">
                  <span>C</span>
                  <CoreOGlyph
                    variant={logoVariant}
                    className="mx-[0.015em] inline-block h-[0.78em] w-[0.78em] -translate-y-[0.04em] align-middle"
                  />
                  <span>RE</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
