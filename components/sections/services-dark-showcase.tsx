import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/data/services";

/**
 * Exact recreation of Redox `/creative-agency` ServiceAreaTwo on Deep Carbon Black (#111111):
 * - Pill-morphing dark service rows (`001`..`005`)
 * - Followed by the exact `.service-content-wrapper` with two `.thumb.parallax-view`
 *   images (`gallery/image-10.webp` at `data-speed="0.7"` and `gallery/image-11.webp` at `data-speed="0.6"`).
 */
export function ServicesDarkShowcase() {
  return (
    <section className="section-dark">
      <div className="section-spacing-bottom pt-6">
        <div className="rx-container">
          <div className="border-b border-white/15">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="service-pill-wrapper block"
              >
                <div className="service-pill-box grid grid-cols-1 items-start gap-6 px-4 py-12 sm:px-8 lg:grid-cols-[180px_1fr_420px] lg:gap-12 lg:px-10 lg:py-16 xl:grid-cols-[215px_1fr_520px]">
                  <div className="service-pill-number pt-2 font-mono text-[18px] text-[#FCF7F3]">
                    {service.number}
                  </div>

                  <h3 className="font-display text-[40px] font-normal leading-[0.9] tracking-[-0.07em] text-[#FCF7F3] sm:text-[56px] xl:text-[86px] 2xl:text-[104px]">
                    {service.titleLines[0]}
                    <br />
                    {service.titleLines[1]}
                  </h3>

                  <p className="max-w-[390px] pt-2 text-[18px] leading-[28px] text-[#FCF7F3]/80 lg:text-[20px]">
                    {service.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Exact /creative-agency ServiceAreaTwo bottom parallax gallery */}
      <div className="service-content-wrapper section-spacing">
        <div className="rx-container">
          <div className="service-content">
            <div
              className="section-info-wrapper fade-anim"
              data-direction="left"
            >
              <div className="thumb parallax-view">
                <Image
                  src="/assets/imgs/gallery/image-10.webp"
                  alt="ECOTECH Core engineering architecture"
                  width={500}
                  height={620}
                  data-speed="0.7"
                  style={{ height: "auto" }}
                />
              </div>
              <div className="text-wrapper">
                <p className="text">
                  A practical blueprint explaining how our private CORE
                  framework powers every client deployment—combining zero-trust
                  server checks, local-first privacy, and deterministic safety.
                </p>
                <p className="text">
                  From Ecoplast Hart’s search-dominant platform to TITAN117,
                  closed-door multilingual chat, and autonomous UAV swarm
                  control, explore our full capability set below.
                </p>
              </div>
              <div className="btn-wrapper">
                <Link href="/services" className="rx-btn btn-border-white">
                  <span className="btn-wrap">
                    <span className="text-one">View All Services</span>
                    <span className="text-two">View All Services</span>
                  </span>
                </Link>
              </div>
            </div>

            <div
              className="section-thumb-wrapper fade-anim"
              data-delay="0.25"
              data-direction="right"
            >
              <div className="thumb parallax-view">
                <Image
                  src="/assets/imgs/gallery/image-11.webp"
                  alt="ECOTECH Core production deployment"
                  width={920}
                  height={1120}
                  data-speed="0.6"
                  style={{ height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
