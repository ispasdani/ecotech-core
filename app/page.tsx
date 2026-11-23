import type { Metadata } from "next";
import { PageAnimations } from "@/components/animations/page-animations";
import { ActuallyServicesIntro } from "@/components/animations/actually-services-intro";
import { HeroStartup } from "@/components/sections/hero-startup";
import { ProductsShowcase } from "@/components/sections/products-showcase";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { ServicesDarkShowcase } from "@/components/sections/services-dark-showcase";
import { AboutCoreStudio } from "@/components/sections/about-core-studio";
import { CaseStudySpotlight } from "@/components/sections/case-study-spotlight";
import { BlogPreview } from "@/components/sections/blog-preview";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { COMPANY } from "@/lib/data/company";
import { buildPageMetadata, SITE_TAGLINE } from "@/lib/seo/metadata";
import { homeGraph } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  path: "/",
  title: `ECOTECH CORE: ${SITE_TAGLINE}`,
  description: COMPANY.description,
  keywords: [
    "ECOTECH CORE",
    "IT Consulting",
    "TITAN117",
    "Local-First AI",
    "Sovereign Multilingual Chat",
    "Drone Swarm GCS",
    "Defense UAV Software",
    "Technical SEO",
    "AI Search GEO",
    "Ecoplast Hart",
  ],
});

/**
 * Exact `/startup-agency` homepage structure & proportions paired with
 * `/creative-agency` ActuallyArea ("What services we provide you actually")
 * transitioning cleanly between crisp White and Deep Carbon Black sections.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd graph={homeGraph()} />
      <main>
        {/* 1. White: Exact /startup-agency HeroFive */}
        <HeroStartup />

        {/* 2. White: Exact /startup-agency WorkAreaFour */}
        <ProductsShowcase />

        {/* 3. White: Exact /startup-agency MarqueeText */}
        <MarqueeBand />

        {/* 4. White: Exact /startup-agency AboutFour */}
        <AboutCoreStudio />

        {/* 5. White -> #111111 Black: Exact /creative-agency ActuallyArea */}
        <ActuallyServicesIntro />

        {/* 6. Black (#111111): Exact /creative-agency ServiceAreaTwo pill-morphing rows */}
        <ServicesDarkShowcase />

        {/* 7. Black (#111111): Ecoplast Hart spotlight + Testimonials + Benchmarks */}
        <CaseStudySpotlight />

        {/* 8. White: Engineering Journal / Technical SEO & AI articles */}
        <BlogPreview />

        {/* 9. Black (#111111): Exact /startup-agency CtaAreaFour */}
        <CtaBand theme="dark" />
        <PageAnimations />
      </main>
    </>
  );
}
