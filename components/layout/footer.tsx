"use client";

import Link from "next/link";
import { COMPANY } from "@/lib/data/company";
import { EcotechLogo } from "./ecotech-logo";

const NAV_ITEMS = [
  { label: "Studio", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Exact recreation of Redox `/startup-agency` FooterFour on Deep Carbon Black (#111111)
 * using the icon-free `ECOTECH CORE` wordmark with the Core "O" glyph.
 */
export function Footer() {
  return (
    <footer className="footer-area-4 section-dark">
      <div className="rx-container">
        <div className="footer-widget-wrapper-box">
          <div className="footer-widget-wrapper">
            <div className="footer-widget-box">
              <div className="footer-logo">
                <Link
                  href="/"
                  className="inline-flex items-center text-white"
                  aria-label="ECOTECH CORE Home"
                >
                  <EcotechLogo />
                </Link>
              </div>
            </div>

            <div className="footer-widget-box">
              <ul className="footer-nav-list">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright-area">
        <div className="rx-container">
          <div className="copyright-area-inner">
            <div className="copyright-text">
              <p className="text">
                © {COMPANY.foundedYear} - {COMPANY.currentYear} | All rights
                reserved by{" "}
                <Link
                  href="/about"
                  className="text-neutral-400 hover:text-white"
                >
                  {COMPANY.name}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
