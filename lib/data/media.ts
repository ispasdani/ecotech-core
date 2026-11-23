/**
 * Image assignments for products, services and page banners, kept in one
 * place so the homepage and inner pages always show the same visuals.
 */

export const BANNER_IMAGES = {
  wide: { src: "/assets/imgs/gallery/image-35.webp", width: 1920, height: 950 },
  studio: { src: "/assets/imgs/gallery/image-51.webp", width: 1620, height: 850 },
} as const;

export const PRODUCT_IMAGES: Record<string, string> = {
  titan117: "/assets/imgs/project/image-30.webp",
  "tri-drone-swarm-gcs": "/assets/imgs/project/image-31.webp",
  "sovereign-chat": "/assets/imgs/project/image-32.webp",
  dbluna: "/assets/imgs/project/image-33.webp",
  ninjathons: "/assets/imgs/project/image-34.webp",
  ecoplasthart: "/assets/imgs/project/image-35.webp",
};

export function productImage(slug: string): string {
  return PRODUCT_IMAGES[slug] ?? "/assets/imgs/project/image-30.webp";
}

const SERVICE_IMAGES: Record<string, string> = {
  "it-consulting-and-custom-engineering": "/assets/imgs/project/image-30.webp",
  "sovereign-multilingual-chat": "/assets/imgs/project/image-32.webp",
  "defense-and-autonomous-drone-swarms": "/assets/imgs/project/image-31.webp",
  "technical-seo-and-ai-search-geo": "/assets/imgs/project/image-35.webp",
  "local-first-ai-and-document-intelligence":
    "/assets/imgs/project/image-33.webp",
};

export function serviceImage(slug: string): string {
  return SERVICE_IMAGES[slug] ?? "/assets/imgs/project/image-30.webp";
}

/** Native size of every project image above. */
export const PROJECT_IMAGE_SIZE = { width: 805, height: 630 } as const;
