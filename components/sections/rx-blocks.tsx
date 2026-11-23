import Image from "next/image";
import Link from "next/link";

/**
 * Small building blocks shared by every page so inner pages use exactly the
 * homepage vocabulary: squiggle subtitles, BDO Grotesk section titles,
 * pill buttons, underline links and parallax image frames.
 */

const SQUIGGLE_PATH =
  "M1.41291 5.98894C1.41291 5.98894 3.65997 6.01383 4.51655 5.98894C7.19358 5.56824 10.4255 5.80978 13.363 5.56824C17.8256 5.20128 22.1327 4.79415 26.6187 4.79415C31.6715 4.79415 36.6774 4.21934 41.7162 4.18834C46.981 4.15594 52.2465 4.18834 57.5114 4.18834C68.6462 4.18834 79.781 4.18834 90.9158 4.18834C121.155 6.61149 47.6583 -1.30401 1 1.68408";

export function RxSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <span className="rx-section-subtitle">
      {children}
      <svg
        viewBox="0 0 99 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d={SQUIGGLE_PATH}
          stroke="currentColor"
          strokeLinecap="round"
          className="svg-elem-1"
        />
      </svg>
    </span>
  );
}

export function RxButton({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: string;
  variant?: "solid" | "outline-light";
}) {
  return (
    <Link
      href={href}
      className={`rx-btn ${variant === "outline-light" ? "btn-border-white" : ""}`}
    >
      <span className="btn-wrap">
        <span className="text-one">{children}</span>
        <span className="text-two">{children}</span>
      </span>
    </Link>
  );
}

export function RxUnderlineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="rx-btn-underline">
      {children}
      <svg
        viewBox="0 0 13 13"
        width="12"
        height="12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M1 12 12 1M12 1H3.5M12 1v8.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    </Link>
  );
}

/**
 * Image frame with scroll parallax. GsapProvider moves the inner image on
 * the GPU (`transform` only) and over-scales it so no edge ever shows.
 */
export function ParallaxImage({
  src,
  alt,
  width,
  height,
  speed = 0.8,
  sizes = "(max-width: 991px) 100vw, 50vw",
  priority = false,
  className = "",
  fullBleed = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  speed?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  fullBleed?: boolean;
}) {
  return (
    <div
      className={`parallax-view overflow-hidden ${
        fullBleed ? "go_full" : "rounded-[15px]"
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={fullBleed ? "100vw" : sizes}
        priority={priority}
        data-speed={speed}
        className="block h-auto w-full"
      />
    </div>
  );
}

/**
 * Numbered hairline row, the homepage `service-area-5` rhythm, reused for
 * principles, deliverables, features and FAQs on inner pages.
 */
export function NumberedRow({
  index,
  title,
  children,
  aside,
}: {
  index: number;
  title: React.ReactNode;
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="fade-anim grid grid-cols-1 gap-4 py-8 md:grid-cols-[110px_1fr] lg:grid-cols-[150px_1fr_minmax(0,0.9fr)] lg:gap-10 lg:py-10">
      <span className="text-[18px] leading-none text-[var(--secondary)]">
        ({String(index + 1).padStart(3, "0")})
      </span>
      <h3 className="font-heading text-[26px] font-normal leading-[1.05] tracking-[-0.03em] text-[var(--primary)] sm:text-[32px] xl:text-[40px]">
        {title}
      </h3>
      {(children || aside) && (
        <div className="text-[17px] leading-[1.6] text-[var(--secondary)] md:col-start-2 lg:col-start-auto">
          {children}
          {aside}
        </div>
      )}
    </div>
  );
}
