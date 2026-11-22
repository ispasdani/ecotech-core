import type { MetadataRoute } from "next";
import { BLOG_ARTICLES, getLatestBlogUpdate } from "@/lib/data/blog";
import {
  absoluteUrl,
  productSlugs,
  serviceSlugs,
  staticRoutes,
} from "@/lib/seo/routes";

/**
 * Honest sitemap modeled on the Ecoplast Hart 2026 SEO architecture:
 * - `changefreq` and `priority` are intentionally omitted (Google ignores both).
 * - `lastModified` is emitted ONLY where there is an actual content-modification
 *   date (blog articles and the blog index), never `new Date()` on every deploy.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const latestBlog = getLatestBlogUpdate();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    ...(route === "/blog" ? { lastModified: latestBlog } : {}),
  }));

  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: absoluteUrl(`/services/${slug}`),
  }));

  const productEntries: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: absoluteUrl(`/products/${slug}`),
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_ARTICLES.map((article) => ({
    url: absoluteUrl(`/blog/${article.slug}`),
    lastModified: article.updatedAt,
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...productEntries,
    ...blogEntries,
  ];
}
