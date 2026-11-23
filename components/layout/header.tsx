"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { SERVICES } from "@/lib/data/services";
import { PRODUCTS } from "@/lib/data/products";
import { BLOG_ARTICLES } from "@/lib/data/blog";
import { CoreOGlyph, EcotechLogo, useCoreLogoVariant } from "./ecotech-logo";

const BLOG_CATEGORIES = Array.from(
  new Set(BLOG_ARTICLES.map((a) => a.category)),
);

/**
 * Exact Redox `/startup-agency` HeaderFive + `_menu.scss` `.dp-menu` dropdowns.
 * Icon-free `ECOTECH CORE` wordmark with the Core "O", plus a small 1/2
 * switch so both Core "O" options can be compared live on every page.
 */
export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<
    "services" | "blog" | null
  >(null);
  const [logoVariant, setLogoVariant] = useCoreLogoVariant();

  const isServicesActive =
    pathname.startsWith("/services") || pathname.startsWith("/products");
  const isBlogActive = pathname.startsWith("/blog");

  return (
    <>
      <header className="header-area-5">
        <div className="rx-container">
          <div className="header-area-5__inner">
            <div className="header__logo flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center text-[#111111]"
                aria-label="ECOTECH CORE Home"
              >
                <EcotechLogo variant={logoVariant} />
              </Link>

              {/* Live compare: option 1 (ring core) vs option 2 (cutaway core) */}
              <div
                className="hidden items-center gap-0.5 rounded-full border border-black/10 p-0.5 sm:inline-flex"
                role="group"
                aria-label="Compare logo options"
              >
                {(["ring", "cutaway"] as const).map((v, i) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setLogoVariant(v)}
                    aria-pressed={logoVariant === v}
                    title={`Logo option ${i + 1}`}
                    className={`inline-flex h-6 items-center gap-1 rounded-full px-2 text-[10px] font-medium tracking-[0.06em] transition-colors duration-300 ${
                      logoVariant === v
                        ? "bg-[#111111] text-white"
                        : "text-neutral-500 hover:text-[#111111]"
                    }`}
                  >
                    <CoreOGlyph
                      variant={v}
                      className="inline-block h-3 w-3"
                    />
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <nav className="main-menu hidden xl:block" aria-label="Primary">
              <ul>
                <li>
                  <Link
                    href="/"
                    className={pathname === "/" ? "active" : undefined}
                  >
                    Home
                  </Link>
                </li>

                {/* Services Dropdown (Exact Redox .dp-menu.col-2) */}
                <li className="menu-item-has-children">
                  <Link
                    href="/services"
                    className={isServicesActive ? "active" : undefined}
                  >
                    Services
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Link>
                  <div className="dp-menu col-2">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <div className="mb-2 border-b border-white/10 pb-2 text-xs font-semibold uppercase tracking-wider text-white">
                          Consulting &amp; Engineering
                        </div>
                        <Link href="/services">All Services Overview</Link>
                        {SERVICES.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                          >
                            {service.shortTitle}
                          </Link>
                        ))}
                      </div>
                      <div>
                        <div className="mb-2 border-b border-white/10 pb-2 text-xs font-semibold uppercase tracking-wider text-white">
                          Platforms &amp; Case Studies
                        </div>
                        {PRODUCTS.map((product) => (
                          <Link
                            key={product.slug}
                            href={`/products/${product.slug}`}
                          >
                            {product.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>

                {/* Blog Dropdown (Exact Redox .dp-menu) */}
                <li className="menu-item-has-children">
                  <Link
                    href="/blog"
                    className={isBlogActive ? "active" : undefined}
                  >
                    Blog
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Link>
                  <ul className="dp-menu">
                    <li>
                      <Link href="/blog">All Journals</Link>
                    </li>
                    {BLOG_CATEGORIES.map((category) => (
                      <li key={category}>
                        <Link
                          href={`/blog?category=${encodeURIComponent(category)}`}
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li>
                  <Link
                    href="/about"
                    className={
                      pathname.startsWith("/about") ? "active" : undefined
                    }
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className={
                      pathname.startsWith("/contact") ? "active" : undefined
                    }
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="xl:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f3f3] text-[#111111] transition-colors hover:bg-[#111111] hover:text-white"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-[#111111] px-6 pb-10 pt-24 text-white xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
          >
            <X className="h-5 w-5" />
          </button>

          <nav className="flex flex-col">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="border-b border-white/12 py-4 font-heading text-3xl tracking-[-0.04em] text-white"
            >
              Home
            </Link>

            <div className="border-b border-white/12 py-4">
              <button
                type="button"
                onClick={() =>
                  setMobileSubmenu((s) => (s === "services" ? null : "services"))
                }
                className="flex w-full items-center justify-between font-heading text-3xl tracking-[-0.04em] text-white"
              >
                <span>Services</span>
                <ChevronDown
                  className={`h-6 w-6 transition-transform ${
                    mobileSubmenu === "services" ? "rotate-180 text-neutral-400" : ""
                  }`}
                />
              </button>
              {mobileSubmenu === "services" && (
                <div className="mt-4 space-y-4 pl-2 text-sm text-neutral-300">
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/services"
                      onClick={() => setMobileOpen(false)}
                      className="text-white"
                    >
                      All Services Overview
                    </Link>
                    {SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {s.shortTitle}
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 border-t border-white/10 pt-3">
                    {PRODUCTS.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-b border-white/12 py-4">
              <button
                type="button"
                onClick={() =>
                  setMobileSubmenu((s) => (s === "blog" ? null : "blog"))
                }
                className="flex w-full items-center justify-between font-heading text-3xl tracking-[-0.04em] text-white"
              >
                <span>Blog</span>
                <ChevronDown
                  className={`h-6 w-6 transition-transform ${
                    mobileSubmenu === "blog" ? "rotate-180 text-neutral-400" : ""
                  }`}
                />
              </button>
              {mobileSubmenu === "blog" && (
                <div className="mt-4 flex flex-col gap-2.5 pl-2 text-sm text-neutral-300">
                  <Link
                    href="/blog"
                    onClick={() => setMobileOpen(false)}
                    className="text-white"
                  >
                    All Journals
                  </Link>
                  {BLOG_CATEGORIES.map((category) => (
                    <Link
                      key={category}
                      href={`/blog?category=${encodeURIComponent(category)}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="border-b border-white/12 py-4 font-heading text-3xl tracking-[-0.04em] text-white"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="border-b border-white/12 py-4 font-heading text-3xl tracking-[-0.04em] text-white"
            >
              Contact
            </Link>
          </nav>

          <div className="mt-8">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="rx-btn w-full"
              style={{
                backgroundColor: "#ffffff",
                color: "#111111",
                borderColor: "#ffffff",
              }}
            >
              <span className="btn-wrap">
                <span className="text-one" style={{ color: "#111111" }}>
                  Send message
                </span>
                <span className="text-two" style={{ color: "#111111" }}>
                  Send message
                </span>
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
