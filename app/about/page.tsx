import type { Metadata } from "next";
import { PageAnimations } from "@/components/animations/page-animations";
import { PageHero } from "@/components/sections/page-hero";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { CtaBand } from "@/components/sections/cta-band";
import {
  NumberedRow,
  ParallaxImage,
  RxButton,
  RxSubtitle,
  RxUnderlineLink,
} from "@/components/sections/rx-blocks";
import { JsonLd } from "@/components/seo/json-ld";
import { COMPANY } from "@/lib/data/company";
import { BANNER_IMAGES } from "@/lib/data/media";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { simplePageGraph } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  path: "/about",
  title: "About ECOTECH CORE: Sovereign Engineering & CORE Studio",
  description:
    "Learn how ECOTECH CORE combines our private CORE engineering framework, AI-accelerated research, local-first privacy, and deterministic defense guardrails.",
});

const PRINCIPLES = [
  {
    title: "Every access check happens on the server",
    text: "Hidden buttons are never security. Every platform built on CORE enforces sign-in, plan entitlements and record ownership on the backend, with automated tests that prove the wrong caller is refused.",
  },
  {
    title: "Local-first where privacy matters most",
    text: "TITAN117 runs agents and document search directly on company laptops, and DBLuna keeps schemas in the browser with share links that never touch a server.",
  },
  {
    title: "Isolated sovereignty for closed-door teams",
    text: "For private communications, every client receives a separate multilingual chat app with its own database. No shared tenants and no manual translation.",
  },
  {
    title: "Deterministic guardrails in defense R&D",
    text: "In our Tri-Drone Swarm GCS, natural-language commands always pass through a deterministic safety validator before they reach a flight controller.",
  },
] as const;

export default function AboutPage() {
  return (
    <main>
      <JsonLd
        graph={simplePageGraph({
          path: "/about",
          title: "About ECOTECH CORE",
          description:
            "IT consulting, proprietary local-first AI platforms, sovereign multilingual chat, and autonomous defense engineering.",
          crumbLabel: "About",
        })}
      />

      <PageHero
        eyebrow="The studio"
        title="Engineering sovereign software that teams actually own"
        description="We are an IT consulting studio and product engineering lab. Our private CORE framework lets us ship fast without trading away security, data residency or real-world performance."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        actions={
          <>
            <RxButton href="/contact">Work with us</RxButton>
            <RxUnderlineLink href="/services">Browse all services</RxUnderlineLink>
          </>
        }
        image={{
          ...BANNER_IMAGES.studio,
          alt: "ECOTECH CORE engineering studio",
        }}
      />

      {/* White: the CORE foundation with a parallax image */}
      <section className="section-light section-spacing">
        <div className="rx-container">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="fade-anim lg:col-span-7">
              <RxSubtitle>The CORE foundation</RxSubtitle>
              <h2 className="rx-section-title mt-6">
                A private framework refined across real products
              </h2>
              <div className="mt-10 max-w-[760px] space-y-6 text-[18px] leading-[1.65] text-[#555555]">
                <p>
                  Most consulting shops start every engagement from a blank
                  folder and relearn sign-in, billing webhooks, access control
                  and SEO the hard way, on the client&apos;s budget.
                </p>
                <p>
                  At <strong className="font-medium text-[#111111]">ECOTECH CORE</strong>{" "}
                  we maintain{" "}
                  <strong className="font-medium text-[#111111]">CORE</strong>,
                  our internal engineering foundation: AI-accelerated research,
                  zero-trust server guardrails, metered AI spend, and numbered
                  delivery phases with concrete done-checks. TITAN117, DBLuna,
                  Ninjathons, our sovereign chat deployments and client
                  platforms like Ecoplast Hart all share the same standards.
                </p>
              </div>
            </div>
            <div className="fade-anim lg:col-span-5" data-direction="right" data-delay="0.2">
              <ParallaxImage
                src="/assets/imgs/gallery/image-11.webp"
                alt="ECOTECH CORE production deployment"
                width={740}
                height={930}
                speed={0.7}
                sizes="(max-width: 1023px) 100vw, 40vw"
              />
            </div>
          </div>

          <div className="mt-24">
            <div className="fade-anim">
              <RxSubtitle>How we build</RxSubtitle>
            </div>
            <div className="ec-rows mt-10">
              {PRINCIPLES.map((p, idx) => (
                <NumberedRow key={p.title} index={idx} title={p.title}>
                  {p.text}
                </NumberedRow>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MarqueeBand />

      {/* Black: benchmarks, same AwardArea layout as the homepage */}
      <section className="award-area section-dark">
        <div className="rx-container">
          <div className="award-area-inner section-spacing">
            <div className="section-header fade-anim">
              <div className="section-title-wrapper">
                <div className="title-wrapper">
                  <RxSubtitle>Verified standards</RxSubtitle>
                  <h2 className="rx-section-title font-display mt-6">
                    Done means tested, verified and fast on real hardware
                  </h2>
                </div>
              </div>
            </div>

            <div className="awards-wrapper-box">
              <div className="awards-wrapper fade-anim" data-direction="right">
                {COMPANY.benchmarks.map((group, idx) => (
                  <div className="award-box" key={group.category + idx}>
                    <div className="category">{group.category}</div>
                    <ul className="award-list">
                      {group.items.map((item, i) => (
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

      <CtaBand lineOne="Let’s" lineTwo="build your system" theme="light" />
      <PageAnimations />
    </main>
  );
}
