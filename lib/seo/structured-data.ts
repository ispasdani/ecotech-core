import { COMPANY } from "@/lib/data/company";
import { SERVICES, type ServiceDetail } from "@/lib/data/services";
import { PRODUCTS, type ProductDetail } from "@/lib/data/products";
import { BLOG_ARTICLES, type BlogArticle } from "@/lib/data/blog";
import { absoluteUrl, siteUrl } from "@/lib/seo/routes";

/**
 * Unified single-@graph JSON-LD structured data builders.
 *
 * Adapted directly from the Ecoplast Hart 2026 SEO architecture:
 * 1. One `@graph` per page (no fragmented unconnected roots).
 * 2. Stable `@id` references (`#organization`, `#website`, `#webpage`) so
 *    Google and AI engines merge all pages into one authoritative entity.
 */

export const ORGANIZATION_ID = `${siteUrl}#organization`;
export const WEBSITE_ID = `${siteUrl}#website`;

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: siteUrl,
    email: COMPANY.email,
    foundingDate: COMPANY.foundedYear,
    description: COMPANY.description,
    areaServed: [
      { "@type": "Country", name: "Romania" },
      { "@type": "Place", name: "European Union" },
      { "@type": "Place", name: "Worldwide" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales and technical consulting",
        email: COMPANY.email,
        availableLanguage: ["en", "ro"],
      },
    ],
  };
}

function webSiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: COMPANY.name,
    url: siteUrl,
    inLanguage: "en",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

function webPageNode({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}) {
  const url = absoluteUrl(path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    inLanguage: "en",
  };
}

type Crumb = { name: string; path: string };

function breadcrumbNode(crumbs: Crumb[]) {
  const lastUrl = absoluteUrl(crumbs[crumbs.length - 1].path);
  return {
    "@type": "BreadcrumbList",
    "@id": `${lastUrl}#breadcrumb`,
    itemListElement: crumbs.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

function graph(nodes: unknown[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function homeGraph() {
  return graph([
    organizationNode(),
    webSiteNode(),
    {
      ...webPageNode({
        path: "/",
        title: `${COMPANY.name}: ${COMPANY.tagline}`,
        description: COMPANY.description,
      }),
      "@type": ["WebPage", "FAQPage"],
      mainEntity: COMPANY.globalFaq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}#services`,
      name: "ECOTECH CORE Services",
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.title,
        url: absoluteUrl(`/services/${s.slug}`),
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}#products`,
      name: "ECOTECH CORE Products & Case Studies",
      itemListElement: PRODUCTS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: absoluteUrl(`/products/${p.slug}`),
      })),
    },
  ]);
}

export function servicesIndexGraph() {
  return graph([
    organizationNode(),
    webSiteNode(),
    webPageNode({
      path: "/services",
      title: "IT Consulting & Engineering Services: ECOTECH CORE",
      description:
        "Explore ECOTECH CORE's IT consulting, sovereign multilingual chat, defense drone swarm software, local-first AI, and technical SEO services.",
    }),
    breadcrumbNode([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
    {
      "@type": "ItemList",
      "@id": `${absoluteUrl("/services")}#list`,
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.title,
        url: absoluteUrl(`/services/${s.slug}`),
      })),
    },
  ]);
}

export function serviceDetailGraph(service: ServiceDetail) {
  const path = `/services/${service.slug}`;
  const url = absoluteUrl(path);
  return graph([
    organizationNode(),
    webSiteNode(),
    {
      ...webPageNode({
        path,
        title: service.metaTitle,
        description: service.metaDescription,
      }),
      "@type": ["WebPage", "FAQPage"],
      mainEntity: service.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    breadcrumbNode([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: service.shortTitle, path },
    ]),
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.title,
      description: service.metaDescription,
      url,
      serviceType: service.category,
      provider: { "@id": ORGANIZATION_ID },
    },
  ]);
}

export function productsIndexGraph() {
  return graph([
    organizationNode(),
    webSiteNode(),
    webPageNode({
      path: "/products",
      title: "Products, Defense Systems & Case Studies: ECOTECH CORE",
      description:
        "Explore TITAN117, Tri-Drone Swarm GCS, CORE Sovereign Chat, DBLuna, Ninjathons, and the Ecoplast Hart 2026 case study.",
    }),
    breadcrumbNode([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
    ]),
    {
      "@type": "ItemList",
      "@id": `${absoluteUrl("/products")}#list`,
      itemListElement: PRODUCTS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: absoluteUrl(`/products/${p.slug}`),
      })),
    },
  ]);
}

export function productDetailGraph(product: ProductDetail) {
  const path = `/products/${product.slug}`;
  const url = absoluteUrl(path);
  return graph([
    organizationNode(),
    webSiteNode(),
    webPageNode({
      path,
      title: product.metaTitle,
      description: product.metaDescription,
    }),
    breadcrumbNode([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: product.name, path },
    ]),
    {
      "@type": "SoftwareApplication",
      "@id": `${url}#software`,
      name: product.name,
      applicationCategory: product.category,
      description: product.summary,
      url,
      creator: { "@id": ORGANIZATION_ID },
      publisher: { "@id": ORGANIZATION_ID },
    },
  ]);
}

export function blogIndexGraph() {
  const url = absoluteUrl("/blog");
  return graph([
    organizationNode(),
    webSiteNode(),
    webPageNode({
      path: "/blog",
      title: "Engineering Journal & Insights: ECOTECH CORE",
      description:
        "Technical articles on sovereign multilingual chat, deterministic drone swarm guardrails, local-first AI, and Technical SEO / GEO.",
    }),
    breadcrumbNode([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
    {
      "@type": "Blog",
      "@id": `${url}#blog`,
      name: "ECOTECH CORE Engineering Journal",
      url,
      inLanguage: "en",
      publisher: { "@id": ORGANIZATION_ID },
      blogPost: BLOG_ARTICLES.map((a) => ({
        "@type": "BlogPosting",
        "@id": `${absoluteUrl(`/blog/${a.slug}`)}#article`,
        headline: a.title,
        url: absoluteUrl(`/blog/${a.slug}`),
        datePublished: a.publishedAt,
        dateModified: a.updatedAt,
      })),
    },
  ]);
}

function countWords(article: BlogArticle): number {
  const text = [
    article.excerpt,
    ...article.sections.flatMap((s) => [s.heading, ...s.body]),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

export function blogDetailGraph(article: BlogArticle) {
  const path = `/blog/${article.slug}`;
  const url = absoluteUrl(path);
  return graph([
    organizationNode(),
    webSiteNode(),
    {
      ...webPageNode({
        path,
        title: article.metaTitle,
        description: article.metaDescription,
      }),
      "@type": ["WebPage", "FAQPage"],
      mainEntity: article.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    breadcrumbNode([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: article.title, path },
    ]),
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: article.title,
      description: article.excerpt,
      articleSection: article.category,
      url,
      mainEntityOfPage: { "@id": `${url}#webpage` },
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      inLanguage: "en",
      wordCount: countWords(article),
      timeRequired: `PT${article.readMinutes}M`,
      image: {
        "@type": "ImageObject",
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
      },
      author: { "@id": ORGANIZATION_ID },
      publisher: { "@id": ORGANIZATION_ID },
      isPartOf: { "@id": `${absoluteUrl("/blog")}#blog` },
      about: {
        "@id": `${absoluteUrl(`/services/${article.relatedService}`)}#service`,
      },
    },
  ]);
}

export function simplePageGraph({
  path,
  title,
  description,
  crumbLabel,
}: {
  path: string;
  title: string;
  description: string;
  crumbLabel: string;
}) {
  return graph([
    organizationNode(),
    webSiteNode(),
    webPageNode({ path, title, description }),
    breadcrumbNode([
      { name: "Home", path: "/" },
      { name: crumbLabel, path },
    ]),
  ]);
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
