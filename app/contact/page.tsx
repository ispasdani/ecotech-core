import type { Metadata } from "next";
import { PageAnimations } from "@/components/animations/page-animations";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { RxSubtitle } from "@/components/sections/rx-blocks";
import { JsonLd } from "@/components/seo/json-ld";
import { COMPANY } from "@/lib/data/company";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { simplePageGraph } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  path: "/contact",
  title: "Contact ECOTECH CORE: Start a Consulting or Product Inquiry",
  description:
    "Contact ECOTECH CORE for IT consulting, dedicated closed-door multilingual chat deployments, TITAN117 local-first AI, defense drone swarm R&D, or Technical SEO.",
});

const CHANNELS = [
  {
    label: "Email",
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
  },
  {
    label: "Operations",
    value: COMPANY.location,
    note: "Working with clients across Europe and worldwide.",
  },
  {
    label: "Confidentiality",
    value: "Mutual NDA on request",
    note: "Available upfront for defense R&D, closed-door chat instances and architecture audits.",
  },
] as const;

export default function ContactPage() {
  return (
    <main>
      <JsonLd
        graph={simplePageGraph({
          path: "/contact",
          title: "Contact ECOTECH CORE",
          description:
            "Get in touch with ECOTECH CORE for IT consulting, sovereign chat deployments, TITAN117, defense software, and Technical SEO.",
          crumbLabel: "Contact",
        })}
      />

      <PageHero
        eyebrow="Contact"
        title="Let’s discuss your architecture, product or private deployment"
        description="Tell us what you are building or modernizing. You will speak directly with the engineers who design and ship our CORE platforms."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* White: direct channels + form */}
      <section className="section-light section-spacing-bottom">
        <div className="rx-container">
          <div className="grid grid-cols-1 gap-16 border-t border-black/10 pt-16 lg:grid-cols-12">
            <div className="fade-anim lg:col-span-4" data-direction="left">
              <RxSubtitle>Direct channels</RxSubtitle>
              <ul className="ec-rows mt-10">
                {CHANNELS.map((c) => (
                  <li key={c.label} className="py-7">
                    <div className="text-[13px] tracking-[0.04em] text-[#999999]">
                      {c.label}
                    </div>
                    {"href" in c ? (
                      <a
                        href={c.href}
                        className="rx-btn-underline mt-2 !text-[20px] text-[#111111]"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="mt-2 text-[20px] leading-[1.3] text-[#111111]">
                        {c.value}
                      </p>
                    )}
                    {"note" in c && (
                      <p className="mt-2 text-[15px] leading-[1.55] text-[#555555]">
                        {c.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="fade-anim lg:col-span-8" data-delay="0.2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Black: FAQ */}
      <section className="section-dark section-spacing">
        <div className="rx-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="fade-anim lg:col-span-5">
              <RxSubtitle>Common questions</RxSubtitle>
              <h2 className="rx-section-title font-display mt-6 !text-[clamp(36px,4.4vw,72px)]">
                Frequently asked questions
              </h2>
            </div>
            <div className="fade-anim lg:col-span-7" data-delay="0.2">
              <FaqAccordion items={COMPANY.globalFaq} theme="dark" />
            </div>
          </div>
        </div>
      </section>
      <PageAnimations />
    </main>
  );
}
