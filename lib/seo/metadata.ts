import type { Metadata } from "next";
import { absoluteUrl, siteUrl } from "./routes";

export const SITE_NAME = "ECOTECH CORE";
export const SITE_TAGLINE =
  "IT Consulting, Sovereign AI Products & Autonomous Defense Systems";

/**
 * Builds a complete, SEO-correct Metadata object for any route.
 *
 * Next.js shallow-merges `metadata` and replaces `openGraph` / `twitter`
 * wholesale when a child page defines them. Every page uses this helper so
 * canonicals, OG images, and Twitter cards are never silently dropped.
 */
export function buildPageMetadata({
  path,
  title,
  description,
  type = "website",
  publishedTime,
  modifiedTime,
  keywords,
}: {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  const ogImages = [
    {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: `${SITE_NAME}: ${title}`,
    },
  ];

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: path,
    },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: "en_US",
      title,
      description,
      url,
      images: ogImages,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages,
    },
  };
}
