import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { SERVICES, getServiceBySlug } from "@/lib/data/services";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { serviceSlugs } from "@/lib/seo/routes";
import { serviceDetailGraph } from "@/lib/seo/structured-data";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return buildPageMetadata({
    path: `/services/${service.slug}`,
    title: service.metaTitle,
    description: service.metaDescription,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(
    0,
    3,
  );

  return (
    <main>
      <JsonLd graph={serviceDetailGraph(service)} />

      <PageHero
        eyebrow={`${service.number} · ${service.category}`}
        title={service.title}
        description={service.tagline}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.shortTitle },
        ]}
      />

      {/* White Section: Approach & Value Metrics */}
      <section className="bg-white py-20 text-[#111111] lg:py-28">
        <div className="ec-container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
                Our Engineering Approach
              </span>
              <h2 className="font-heading mt-3 text-3xl font-medium leading-[1.08] tracking-[-0.04em] sm:text-4xl">
                {service.approachTitle}
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-neutral-600">
                {service.approachText}
              </p>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {service.valuePoints.map((vp) => (
                  <div
                    key={vp.label}
                    className="rounded-2xl border border-black/10 bg-[#FCF7F3] p-5"
                  >
                    <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                      {vp.label}
                    </div>
                    <div className="font-heading mt-2 text-2xl font-medium tracking-[-0.03em] text-[#111111]">
                      {vp.value}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                      {vp.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Black Section: Core Deliverables */}
      <section className="bg-[#111111] py-20 text-[#FCF7F3] lg:py-28">
        <div className="ec-container">
          <div className="mb-12 flex flex-col justify-between gap-4 border-b border-white/12 pb-8 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#FF6A3A]">
                What You Receive
              </span>
              <h2 className="font-display mt-3 text-3xl font-normal tracking-[-0.04em] text-white sm:text-5xl">
                Key deliverables &amp; technical capabilities
              </h2>
            </div>
            <Link href="/contact" className="rr-btn rr-btn-light w-fit">
              <span className="btn-wrap">
                <span className="text-one">Request Scope &amp; Quote</span>
                <span className="text-two">Request Scope &amp; Quote</span>
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {service.deliverables.map((item, idx) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-[#171717] p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#FF6A3A]">
                    0{idx + 1}
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>
                <h3 className="font-heading mt-4 text-2xl font-medium tracking-[-0.03em] text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* White Section: Service FAQ & Related Services */}
      <section className="bg-white py-20 text-[#111111] lg:py-28">
        <div className="ec-container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
                Service FAQ
              </span>
              <h2 className="font-heading mt-3 text-3xl font-medium tracking-[-0.04em]">
                Common technical questions
              </h2>
            </div>
            <div className="lg:col-span-8">
              <FaqAccordion items={service.faq} theme="light" />
            </div>
          </div>

          <div className="mt-20 border-t border-black/12 pt-14">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-2xl font-medium tracking-[-0.03em]">
                Explore other capabilities
              </h3>
              <Link
                href="/services"
                className="rr-btn-underline text-sm text-[#111111]"
              >
                All services
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              {otherServices.map((other) => (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="group rounded-2xl border border-black/10 bg-[#FCF7F3] p-6 transition-colors hover:border-black/30"
                >
                  <span className="font-mono text-xs text-neutral-500">
                    ({other.number})
                  </span>
                  <h4 className="font-heading mt-3 text-xl font-medium tracking-[-0.02em] group-hover:text-[#FF6A3A]">
                    {other.shortTitle}
                  </h4>
                  <p className="mt-2 text-sm text-neutral-600">
                    {other.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Start this engagement"
        lineOne="Let’s"
        lineTwo="scope your build"
      />
    </main>
  );
}
