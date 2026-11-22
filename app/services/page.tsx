import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ServicesDarkShowcase } from "@/components/sections/services-dark-showcase";
import { ProductsShowcase } from "@/components/sections/products-showcase";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { COMPANY } from "@/lib/data/company";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { servicesIndexGraph } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  path: "/services",
  title: "Services, Platforms & Defense Systems",
  description:
    "Explore ECOTECH Core's IT consulting, sovereign closed-door multilingual chat, TITAN117 local-first AI, defense drone swarm software, and Technical SEO / GEO.",
});

export default function ServicesPage() {
  return (
    <main>
      <JsonLd graph={servicesIndexGraph()} />

      <PageHero
        eyebrow="Services & Platforms"
        title="IT consulting, sovereign AI platforms, and defense engineering under one roof."
        description="Everything we build—from custom enterprise software and dedicated closed-door multilingual chat apps to TITAN117 and autonomous UAV swarm control—runs on our zero-trust CORE standard."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      {/* Black Section: Pill-Morphing Consulting Services */}
      <ServicesDarkShowcase />

      {/* White Section: All Proprietary Platforms & Case Studies unified inside Services */}
      <ProductsShowcase />

      {/* White Section: FAQ */}
      <section className="section-light section-spacing border-t border-black/10">
        <div className="rx-container grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="rx-section-subtitle">FAQ</span>
            <h2 className="font-heading mt-3 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              Questions about working with us
            </h2>
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={COMPANY.globalFaq} theme="light" />
          </div>
        </div>
      </section>

      <CtaBand theme="dark" />
    </main>
  );
}
