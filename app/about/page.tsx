import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Cpu, Lock, Radio, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { COMPANY } from "@/lib/data/company";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { simplePageGraph } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  path: "/about",
  title: "About ECOTECH Core — Sovereign Engineering & CORE Studio",
  description:
    "Learn how ECOTECH Core combines our private CORE engineering framework, AI-accelerated research, local-first privacy, and deterministic defense guardrails.",
});

export default function AboutPage() {
  const principles = [
    {
      icon: ShieldCheck,
      title: "Every Access Check Happens on the Server",
      text: "Hidden UI buttons are never security. Every platform built on CORE enforces authentication, plan entitlements, and record ownership on the backend with automated denial tests.",
    },
    {
      icon: Cpu,
      title: "Local-First Where Privacy Matters Most",
      text: "TITAN117 runs agents and document search directly on company laptops, and DBLuna stores schemas locally in IndexedDB with zero-server URL share links.",
    },
    {
      icon: Lock,
      title: "Isolated Sovereignty for Closed-Door Teams",
      text: "For private communications, every client receives a dedicated, separated multilingual chat app with its own database—zero shared tenants and zero manual translation.",
    },
    {
      icon: Radio,
      title: "Deterministic Guardrails in Defense R&D",
      text: "In our Tri-Drone Swarm GCS, natural-language tactical commands always pass through a deterministic safety validator before touching flight controllers.",
    },
  ];

  return (
    <main>
      <JsonLd
        graph={simplePageGraph({
          path: "/about",
          title: "About ECOTECH Core",
          description:
            "IT consulting, proprietary local-first AI platforms, sovereign multilingual chat, and autonomous defense engineering.",
          crumbLabel: "About",
        })}
      />

      <PageHero
        eyebrow="About ECOTECH Core"
        title="Engineering sovereign software that teams actually own."
        description="We are an IT consulting studio and product engineering lab. Powered by our private CORE framework, we ship fast without compromising on security, data residency, or real-world performance."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* White Section: How We Work */}
      <section className="bg-white py-20 text-[#111111] lg:py-28">
        <div className="ec-container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
                The CORE Foundation
              </span>
              <h2 className="font-heading mt-3 text-3xl font-normal leading-[1.08] tracking-[-0.04em] sm:text-5xl">
                Built on a private engineering framework refined across real
                products.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-neutral-600 lg:col-span-7">
              <p>
                Most consulting shops start every engagement from a blank folder
                and relearn authentication, billing webhooks, access control,
                and SEO the hard way on the client&apos;s budget.
              </p>
              <p>
                At <strong className="text-[#111111]">ECOTECH Core</strong>, we
                maintain <strong className="text-[#111111]">CORE</strong>—our
                internal engineering foundation combining AI-accelerated
                research workflows, zero-trust server guardrails, atomic AI
                spend metering, and numbered delivery phases with concrete
                done-checks. Every product in our ecosystem—TITAN117, DBLuna,
                Ninjathons, our Sovereign Multilingual Chat deployments, and
                client platforms like Ecoplast Hart—benefits from the same
                battle-tested standards.
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl border border-black/10 bg-[#FCF7F3] p-8"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#111111] text-white">
                    <Icon className="h-5 w-5 text-[#FF6A3A]" />
                  </div>
                  <h3 className="font-heading mt-6 text-2xl font-medium tracking-[-0.03em]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-neutral-600">
                    {p.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Black Section: Benchmarks & Ecoplast Hart Production Proof */}
      <section className="bg-[#111111] py-20 text-[#FCF7F3] lg:py-28">
        <div className="ec-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#FF6A3A]">
                Verified Engineering Standards
              </span>
              <h2 className="font-display mt-3 text-3xl font-normal leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl">
                Done means tested, verified, and fast on real hardware.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-neutral-400">
                Whether we are building a bilingual SEO architecture for
                Ecoplast Hart, provisioning a closed-door multilingual chat
                instance, or validating UAV swarm separation bounds, we separate
                verified facts from roadmap promises.
              </p>
              <div className="mt-8">
                <Link href="/products" className="rr-btn rr-btn-light">
                  <span className="btn-wrap">
                    <span className="text-one">Inspect Our Platforms</span>
                    <span className="text-two">Inspect Our Platforms</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="space-y-10 lg:col-span-7">
              {COMPANY.benchmarks.map((group) => (
                <div
                  key={group.category}
                  className="rounded-2xl border border-white/10 bg-[#171717] p-7"
                >
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[#FF6A3A]">
                    {group.category}
                  </h3>
                  <ul className="mt-5 space-y-3.5">
                    {group.items.map((item) => (
                      <li
                        key={item.title}
                        className="flex items-start justify-between gap-4 border-b border-white/8 pb-3 text-sm sm:text-base"
                      >
                        <span className="flex items-start gap-2.5 text-neutral-200">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                          {item.title}
                        </span>
                        <span className="shrink-0 font-mono text-xs text-neutral-400">
                          {item.metric}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Partner with ECOTECH Core"
        lineOne="Let’s"
        lineTwo="build your system"
      />
    </main>
  );
}
