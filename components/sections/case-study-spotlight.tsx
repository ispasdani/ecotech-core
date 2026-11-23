import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/data/company";

const PROOF_ITEMS = [
  {
    id: "1",
    number: "(001)",
    title: "Ecoplast Hart 2026 Platform",
    text: "Unified @graph SEO, IndexNow push indexing, TITAN117 local document intelligence, and Sovereign Multilingual Chat in live production.",
    image: "/assets/imgs/project/image-47.webp",
    link: "/products/ecoplasthart",
  },
  {
    id: "2",
    number: "(002)",
    title: "CORE Zero-Trust Architecture",
    text: "Every access rule, ownership check, and billing entitlement is verified server-side and guarded by automated denial tests.",
    image: "/assets/imgs/project/image-48.webp",
    link: "/services/it-consulting-and-custom-engineering",
  },
  {
    id: "3",
    number: "(003)",
    title: "Tri-Drone Swarm Safety Guardrails",
    text: "3-UAV leader hot-swapping, air-gapped offline/Ollama LLM mission planning, and deterministic flight boundary clamping.",
    image: "/assets/imgs/project/image-49.webp",
    link: "/products/tri-drone-swarm-gcs",
  },
  {
    id: "4",
    number: "(004)",
    title: "Closed-Door Sovereign Chat",
    text: "Dedicated single-tenant databases per organization with automatic, zero-input real-time native language messaging.",
    image: "/assets/imgs/project/image-50.webp",
    link: "/products/sovereign-chat",
  },
  {
    id: "5",
    number: "(005)",
    title: "Local-First Speed (TITAN117 & DBLuna)",
    text: "Private AI agents running on your laptop, ~6ms search across 30,000 database columns, and 2-4s microVM code judging.",
    image: "/assets/imgs/project/image-51.webp",
    link: "/products/titan117",
  },
] as const;

/**
 * Exact recreation of `/startup-agency` ServiceAreaFive (`service-area-5.tsx`)
 * paired with `/creative-agency` AwardArea (`award-area.tsx`) for our
 * "We believe in measurable proof" & Ecoplast Hart production proof section.
 */
export function CaseStudySpotlight() {
  return (
    <>
      {/* 1. Exact /startup-agency ServiceAreaFive Layout (White Section) */}
      <section className="service-area-5 section-light">
        <div className="rx-container">
          <div className="service-area-5-inner section-spacing">
            <div className="section-header fade-anim">
              <div className="section-title-wrapper">
                <div className="subtitle-wrapper">
                  <span className="rx-section-subtitle">
                    Proof &amp; Impact
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
                  <h2 className="rx-section-title">
                    Production systems we verify
                  </h2>
                </div>
              </div>
            </div>

            <div className="services-wrapper-box">
              <div className="text-wrapper fade-anim">
                <p className="info-text">
                  We are here to build solid, sovereign platforms and prove
                  their impact in real operations like Ecoplast Hart.
                </p>
              </div>

              <div className="services-wrapper-5">
                {PROOF_ITEMS.map((item) => (
                  <Link href={item.link} key={item.id}>
                    <div className="service-box fade-anim">
                      <div className="count">
                        <span className="number">{item.number}</span>
                      </div>
                      <div className="content">
                        <h3 className="title">{item.title}</h3>
                        <p className="text">{item.text}</p>
                      </div>
                      <div className="thumb">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={165}
                          height={92}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Exact /creative-agency AwardArea Layout (Black Section) */}
      <section className="award-area section-dark">
        <div className="rx-container">
          <div className="award-area-inner section-spacing">
            <div className="section-header fade-anim">
              <div className="section-title-wrapper">
                <div className="title-wrapper">
                  <h2 className="rx-section-title font-display">
                    We believe in measurable proof, not quantity, that’s why our
                    systems endure.
                  </h2>
                </div>
              </div>
            </div>

            <div className="awards-wrapper-box">
              <div className="awards-wrapper fade-anim" data-direction="right">
                {COMPANY.benchmarks.map((award, idx) => (
                  <div className="award-box" key={award.category + idx}>
                    <div className="category">{award.category}</div>
                    <ul className="award-list">
                      {award.items.map((item, i) => (
                        <li key={item.title + i}>
                          {item.title}
                          <span>{item.metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
