import Image from "next/image";
import Link from "next/link";

/**
 * Exact recreation of Redox `/startup-agency` CtaAreaFour:
 * Giant 140px underlined BDOGrotesk headline with dual diagonal-swapping `icon-9.webp`.
 * Supports both `section-light` (white) and `section-dark` (black) themes.
 */
export function CtaBand({
  lineOne = "Let’s",
  lineTwo = "build your system now",
  theme = "dark",
}: {
  eyebrow?: string;
  lineOne?: string;
  lineTwo?: string;
  theme?: "light" | "dark";
}) {
  return (
    <section
      className={`cta-area-4 ${
        theme === "dark" ? "section-dark" : "section-light"
      }`}
    >
      <div className="rx-container">
        <div className="cta-area-4-inner section-spacing">
          <div className="section-header fade-anim" data-direction="left">
            <div className="section-title-wrapper">
              <div className="title-wrapper">
                <h2 className="section-title">
                  <Link href="/contact">
                    {lineOne}
                    <span className="icon">
                      <Image
                        className="first"
                        src="/assets/imgs/icon/icon-9.webp"
                        alt=""
                        width={101}
                        height={101}
                      />
                      <Image
                        className="second"
                        src="/assets/imgs/icon/icon-9.webp"
                        alt=""
                        width={101}
                        height={101}
                      />
                    </span>{" "}
                    <br />
                    {lineTwo}
                  </Link>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
