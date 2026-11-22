import Link from "next/link";
import { COMPANY } from "@/lib/data/company";

const NAV_ITEMS = [
  { label: "Studio", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Exact recreation of Redox `/startup-agency` FooterFour on Deep Carbon Black (#111111).
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
                  className="inline-flex items-center gap-2.5 text-white"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                    <span className="h-2 w-2 rounded-full bg-[#FF6A3A]" />
                  </span>
                  <span className="font-heading text-[19px] font-semibold tracking-[-0.04em]">
                    ECOTECH{" "}
                    <span className="font-normal text-neutral-400">CORE</span>
                  </span>
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
