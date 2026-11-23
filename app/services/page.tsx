import type { Metadata } from "next";
import { PageAnimations } from "@/components/animations/page-animations";
import { PageHero } from "@/components/sections/page-hero";
import { ActuallyServicesIntro } from "@/components/animations/actually-services-intro";
import { ServicesDarkShowcase } from "@/components/sections/services-dark-showcase";
import { ProductsShowcase } from "@/components/sections/products-showcase";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaBand } from "@/components/sections/cta-band";
import { RxButton, RxSubtitle } from "@/components/sections/rx-blocks";
import { JsonLd } from "@/components/seo/json-ld";
import { COMPANY } from "@/lib/data/company";
import { BANNER_IMAGES } from "@/lib/data/media";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { servicesIndexGraph } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  path: "/services",
  title: "Services, Platforms & Defense Systems",
  description:
    "Explore ECOTECH CORE's IT consulting, sovereign closed-door multilingual chat, TITAN117 local-first AI, defense drone swarm software, and Technical SEO / GEO.",
});

export default function ServicesPage() {
  return (
    <main>
      <JsonLd graph={servicesIndexGraph()} />

      {/* White: hero + full-bleed parallax banner */}
      <PageHero
        eyebrow="Services"
        title="IT consulting, sovereign AI and defense engineering under one roof"
        description="Everything we build, from custom enterprise software and closed-door multilingual chat to TITAN117 and autonomous UAV swarm control, runs on our zero-trust CORE standard."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        actions={<RxButton href="/contact">Start a project</RxButton>}
        image={{
          ...BANNER_IMAGES.studio,
          alt: "ECOTECH CORE engineering studio",
        }}
      />

      {/* White -> black: same pinned zoom-through as the homepage */}
      <ActuallyServicesIntro />

      {/* Black: pill-morphing service rows + parallax gallery */}
      <ServicesDarkShowcase />

      {/* White: platforms with counter-scale reveal */}
      <ProductsShowcase />

      <MarqueeBand />

      {/* White: FAQ */}
      <section className="section-light section-spacing">
        <div className="rx-container">
          <div className="grid grid-cols-1 gap-12 border-t border-black/10 pt-16 lg:grid-cols-12">
            <div className="fade-anim lg:col-span-5">
              <RxSubtitle>FAQ</RxSubtitle>
              <h2 className="rx-section-title mt-6 !text-[clamp(36px,4.4vw,72px)]">
                Questions about working with us
              </h2>
            </div>
            <div className="fade-anim lg:col-span-7" data-delay="0.2">
              <FaqAccordion items={COMPANY.globalFaq} theme="light" />
            </div>
          </div>
        </div>
      </section>

      <CtaBand theme="dark" />
      <PageAnimations />
    </main>
  );
}
