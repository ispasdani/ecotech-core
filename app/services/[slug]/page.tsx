import type { Metadata } from "next";
import { PageAnimations } from "@/components/animations/page-animations";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaBand } from "@/components/sections/cta-band";
import {
  NumberedRow,
  ParallaxImage,
  RxButton,
  RxSubtitle,
  RxUnderlineLink,
} from "@/components/sections/rx-blocks";
import { JsonLd } from "@/components/seo/json-ld";
import { SERVICES, getServiceBySlug } from "@/lib/data/services";
import { PROJECT_IMAGE_SIZE, serviceImage } from "@/lib/data/media";
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

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <main>
      <JsonLd graph={serviceDetailGraph(service)} />

      <PageHero
        eyebrow={`(${service.number}) ${service.category}`}
        title={service.title}
        description={service.tagline}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.shortTitle },
        ]}
        actions={
          <>
            <RxButton href="/contact">Request scope and quote</RxButton>
            <RxUnderlineLink href="/services">All services</RxUnderlineLink>
          </>
        }
      />

      {/* White: approach + parallax visual + value metrics */}
      <section className="section-light section-spacing-bottom">
        <div className="rx-container">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="fade-anim lg:col-span-6" data-direction="left">
              <ParallaxImage
                src={serviceImage(service.slug)}
                alt={service.title}
                width={PROJECT_IMAGE_SIZE.width}
                height={PROJECT_IMAGE_SIZE.height}
                speed={0.75}
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            </div>
            <div className="fade-anim lg:col-span-6" data-delay="0.2">
              <RxSubtitle>Our approach</RxSubtitle>
              <h2 className="rx-section-title mt-6 !text-[clamp(34px,3.6vw,60px)]">
                {service.approachTitle}
              </h2>
              <p className="mt-8 text-[18px] leading-[1.65] text-[#555555]">
                {service.approachText}
              </p>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 border-t border-black/10 sm:grid-cols-3">
            {service.valuePoints.map((vp, idx) => (
              <div
                key={vp.label}
                className="fade-anim border-b border-black/10 py-10 sm:border-b-0 sm:pr-8 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:pl-8"
                data-delay={String(0.1 + idx * 0.1)}
              >
                <div className="text-[13px] tracking-[0.04em] text-[#999999]">
                  {vp.label}
                </div>
                <div className="font-heading mt-3 text-[44px] leading-none tracking-[-0.05em] text-[#111111] xl:text-[64px]">
                  {vp.value}
                </div>
                <p className="mt-4 max-w-[360px] text-[16px] leading-[1.55] text-[#555555]">
                  {vp.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Black: deliverables as numbered hairline rows */}
      <section className="section-dark section-spacing">
        <div className="rx-container">
          <div className="fade-anim">
            <RxSubtitle>What you receive</RxSubtitle>
            <h2 className="rx-section-title mt-6 max-w-[1100px]">
              Key deliverables and technical capabilities
            </h2>
          </div>
          <div className="ec-rows mt-16">
            {service.deliverables.map((item, idx) => (
              <NumberedRow key={item.title} index={idx} title={item.title}>
                {item.description}
              </NumberedRow>
            ))}
          </div>
        </div>
      </section>

      {/* White: FAQ */}
      <section className="section-light section-spacing">
        <div className="rx-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="fade-anim lg:col-span-5">
              <RxSubtitle>Service FAQ</RxSubtitle>
              <h2 className="rx-section-title mt-6 !text-[clamp(36px,4.4vw,72px)]">
                Common technical questions
              </h2>
            </div>
            <div className="fade-anim lg:col-span-7" data-delay="0.2">
              <FaqAccordion items={service.faq} theme="light" />
            </div>
          </div>
        </div>
      </section>

      {/* Black: other services as pill-morphing rows (homepage ServiceAreaTwo) */}
      <section className="section-dark section-spacing">
        <div className="rx-container">
          <div className="fade-anim mb-12">
            <RxSubtitle>Other capabilities</RxSubtitle>
          </div>
          <div className="border-b border-white/15">
            {otherServices.map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                className="service-pill-wrapper block"
              >
                <div className="service-pill-box grid grid-cols-1 items-start gap-4 px-4 py-10 sm:px-8 lg:grid-cols-[180px_1fr_420px] lg:gap-12 lg:px-10 lg:py-12">
                  <div className="service-pill-number pt-2 text-[18px] text-[#FCF7F3]">
                    {other.number}
                  </div>
                  <h3 className="font-display text-[34px] font-normal leading-[0.95] tracking-[-0.06em] text-[#FCF7F3] sm:text-[48px] xl:text-[64px]">
                    {other.titleLines[0]} {other.titleLines[1]}
                  </h3>
                  <p className="max-w-[390px] pt-2 text-[17px] leading-[1.6] text-[#FCF7F3]/70">
                    {other.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand lineOne="Let’s" lineTwo="scope your build" theme="light" />
      <PageAnimations />
    </main>
  );
}
