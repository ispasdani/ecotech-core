import type { Metadata } from "next";
import { Mail, MapPin, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { COMPANY } from "@/lib/data/company";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { simplePageGraph } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  path: "/contact",
  title: "Contact ECOTECH Core — Start a Consulting or Product Inquiry",
  description:
    "Contact ECOTECH Core for IT consulting, dedicated closed-door multilingual chat deployments, TITAN117 local-first AI, defense drone swarm R&D, or Technical SEO.",
});

export default function ContactPage() {
  return (
    <main>
      <JsonLd
        graph={simplePageGraph({
          path: "/contact",
          title: "Contact ECOTECH Core",
          description:
            "Get in touch with ECOTECH Core for IT consulting, sovereign chat deployments, TITAN117, defense software, and Technical SEO.",
          crumbLabel: "Contact",
        })}
      />

      <PageHero
        eyebrow="Contact"
        title="Let’s discuss your architecture, product, or private deployment."
        description="Tell us what you are building or modernizing. You will speak directly with the engineers who design and ship our CORE platforms."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* White Section: Contact Form + Direct Channels */}
      <section className="bg-white py-20 text-[#111111] lg:py-28">
        <div className="ec-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
                Direct Channels
              </span>
              <h2 className="font-heading mt-3 text-3xl font-medium tracking-[-0.03em]">
                Fast, confidential technical conversations.
              </h2>
            </div>

            <div className="space-y-5 border-t border-black/12 pt-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111111] text-white">
                  <Mail className="h-4 w-4 text-[#FF6A3A]" />
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-neutral-500">
                    Email
                  </div>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="mt-1 block text-base font-medium text-[#111111] hover:text-[#FF6A3A]"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111111] text-white">
                  <MapPin className="h-4 w-4 text-[#FF6A3A]" />
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-neutral-500">
                    Operations
                  </div>
                  <p className="mt-1 text-base font-medium text-[#111111]">
                    {COMPANY.location}
                  </p>
                  <p className="text-sm text-neutral-500">
                    Working with clients across Europe &amp; globally.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111111] text-white">
                  <ShieldCheck className="h-4 w-4 text-[#FF6A3A]" />
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-neutral-500">
                    Confidentiality
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                    Mutual NDAs available upfront for defense R&amp;D, closed-door
                    chat instances, and enterprise architecture audits.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Black Section: Global FAQ */}
      <section className="bg-[#111111] py-20 text-[#FCF7F3] lg:py-28">
        <div className="ec-container grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#FF6A3A]">
              Common Questions
            </span>
            <h2 className="font-display mt-3 text-3xl font-normal leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl">
              Frequently asked questions
            </h2>
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={COMPANY.globalFaq} theme="dark" />
          </div>
        </div>
      </section>
    </main>
  );
}
