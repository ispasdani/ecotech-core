import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  theme = "light",
}: {
  eyebrow: string;
  title: string;
  description: string;
  crumbs: { label: string; href?: string }[];
  theme?: "light" | "dark";
}) {
  const isDark = theme === "dark";

  return (
    <section
      className={`border-b py-16 lg:py-24 ${
        isDark
          ? "border-white/12 bg-[#111111] text-[#FCF7F3]"
          : "border-black/12 bg-white text-[#111111]"
      }`}
    >
      <div className="ec-container">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-1.5 font-mono text-xs"
        >
          {crumbs.map((crumb, idx) => (
            <span key={crumb.label} className="inline-flex items-center gap-1.5">
              {idx > 0 && (
                <ChevronRight
                  className={`h-3.5 w-3.5 ${
                    isDark ? "text-neutral-600" : "text-neutral-400"
                  }`}
                />
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className={
                    isDark
                      ? "text-neutral-400 hover:text-white"
                      : "text-neutral-500 hover:text-[#111111]"
                  }
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className={isDark ? "text-white" : "text-[#111111]"}>
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[#FF6A3A]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A3A]" />
          {eyebrow}
        </span>
        <h1 className="font-heading mt-4 max-w-4xl text-4xl font-medium leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-[72px]">
          {title}
        </h1>
        <p
          className={`mt-6 max-w-2xl text-lg leading-relaxed ${
            isDark ? "text-neutral-300" : "text-neutral-600"
          }`}
        >
          {description}
        </p>
      </div>
    </section>
  );
}
