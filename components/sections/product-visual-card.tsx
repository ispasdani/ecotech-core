import {
  Cpu,
  Database,
  Globe,
  Languages,
  Lock,
  Radio,
  ShieldCheck,
  Terminal,
  Trophy,
} from "lucide-react";
import type { ProductDetail } from "@/lib/data/products";

export function ProductVisualCard({
  pattern,
  name,
  stage,
}: {
  pattern: ProductDetail["visualPattern"];
  name: string;
  stage: string;
}) {
  if (pattern === "titan") {
    return (
      <div className="relative flex aspect-[16/11] w-full flex-col justify-between overflow-hidden rounded-2xl bg-[#111111] p-6 text-white sm:p-8">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-25 blur-3xl"
          style={{ background: "#FF6A3A" }}
        />
        <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-300">
            <Cpu className="h-4 w-4 text-[#FF6A3A]" />
            <span>TITAN ENGINE · LOCAL-FIRST</span>
          </div>
          <span className="rounded-full bg-[#FF6A3A]/15 px-2.5 py-0.5 font-mono text-[11px] text-[#FF6A3A]">
            WIN / MAC
          </span>
        </div>

        <div className="relative my-4 grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
            <div className="text-[10px] uppercase tracking-wider text-neutral-500">
              Model Router
            </div>
            <div className="mt-1.5 text-sm font-medium text-white">
              llama.cpp + Cloud
            </div>
            <div className="mt-1 text-[11px] text-emerald-400">
              ● Offline Ready
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
            <div className="text-[10px] uppercase tracking-wider text-neutral-500">
              Folder Agent
            </div>
            <div className="mt-1.5 text-sm font-medium text-white">
              RO / EN Citations
            </div>
            <div className="mt-1 text-[11px] text-neutral-400">
              PDF · DOCX · XLSX
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[11px] text-neutral-400">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#FF6A3A]" />
            Sandboxed Approvals · OS Keychain
          </span>
          <span className="hidden sm:inline">{name}</span>
        </div>
      </div>
    );
  }

  if (pattern === "drone") {
    return (
      <div className="relative flex aspect-[16/11] w-full flex-col justify-between overflow-hidden rounded-2xl bg-[#0B1210] p-6 text-white sm:p-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(34,197,94,0.45) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative flex items-center justify-between border-b border-emerald-500/20 pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
            <Radio className="h-4 w-4" />
            <span>SWARM GCS · 6-DOF + MAVSDK</span>
          </div>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] text-emerald-300">
            DEFENSE R&amp;D
          </span>
        </div>

        <div className="relative my-4 flex items-center justify-between gap-3">
          {[
            { id: "ALPHA-1", role: "ACTIVE LEADER", active: true },
            { id: "BRAVO-2", role: "FORMATION WING", active: false },
            { id: "CHARLIE-3", role: "GAMEPLAN EXEC", active: false },
          ].map((uav) => (
            <div
              key={uav.id}
              className={`flex-1 rounded-xl border p-3 font-mono ${
                uav.active
                  ? "border-emerald-400/60 bg-emerald-500/15"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div className="text-xs font-semibold text-white">{uav.id}</div>
              <div className="mt-1 text-[10px] text-emerald-300/80">
                {uav.role}
              </div>
            </div>
          ))}
        </div>

        <div className="relative flex items-center justify-between border-t border-emerald-500/20 pt-3 font-mono text-[11px] text-neutral-400">
          <span>Deterministic Safety Guardrail Validator</span>
          <span className="text-emerald-400">OLLAMA / OFFLINE</span>
        </div>
      </div>
    );
  }

  if (pattern === "chat") {
    return (
      <div className="relative flex aspect-[16/11] w-full flex-col justify-between overflow-hidden rounded-2xl bg-[#10131A] p-6 text-white sm:p-8">
        <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-sky-400">
            <Lock className="h-4 w-4" />
            <span>ISOLATED CLOSED-DOOR INSTANCE</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/15 px-2.5 py-0.5 font-mono text-[11px] text-sky-300">
            <Languages className="h-3 w-3" />
            AUTO-NATIVE
          </span>
        </div>

        <div className="relative my-3 space-y-2.5 text-xs">
          <div className="max-w-[85%] rounded-xl rounded-tl-sm border border-white/10 bg-white/[0.06] px-3.5 py-2.5">
            <span className="font-mono text-[10px] text-sky-400">
              RO → EN (Instant)
            </span>
            <p className="mt-0.5 text-neutral-200">
              &ldquo;Transportul de cupru ajunge la 14:00 la poarta 2.&rdquo;
            </p>
          </div>
          <div className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm border border-sky-400/30 bg-sky-500/15 px-3.5 py-2.5">
            <span className="font-mono text-[10px] text-sky-300">
              DE → RO (Instant)
            </span>
            <p className="mt-0.5 text-white">
              &ldquo;Confirmed. Weighing docs ready on our private server.&rdquo;
            </p>
          </div>
        </div>

        <div className="relative flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[11px] text-neutral-400">
          <span>Dedicated Client Database · Zero Translators</span>
          <span className="text-sky-400">CORE</span>
        </div>
      </div>
    );
  }

  if (pattern === "dbluna") {
    return (
      <div className="relative flex aspect-[16/11] w-full flex-col justify-between overflow-hidden rounded-2xl bg-[#14111B] p-6 text-white sm:p-8">
        <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-purple-400">
            <Database className="h-4 w-4" />
            <span>DBLUNA · TWO-WAY DBML ENGINE</span>
          </div>
          <span className="rounded-full bg-purple-500/15 px-2.5 py-0.5 font-mono text-[11px] text-purple-300">
            ~6 MS SEARCH
          </span>
        </div>

        <div className="relative my-4 grid grid-cols-3 gap-2.5 font-mono text-[11px]">
          <div className="rounded-xl border border-purple-400/30 bg-purple-500/10 p-3">
            <div className="font-semibold text-white">orders</div>
            <div className="mt-1 text-neutral-400">id · uuid PK</div>
            <div className="text-neutral-400">org_id · FK</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <div className="font-semibold text-white">428 Tables</div>
            <div className="mt-1 text-purple-300">672 Relations</div>
            <div className="text-neutral-400">30k Columns</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <div className="font-semibold text-white">BACPAC</div>
            <div className="mt-1 text-neutral-400">model.xml only</div>
            <div className="text-emerald-400">Zero Row Data</div>
          </div>
        </div>

        <div className="relative flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[11px] text-neutral-400">
          <span>Local-First IndexedDB · Power BI Handoff</span>
          <span className="text-purple-300">URL-FRAGMENT SHARE</span>
        </div>
      </div>
    );
  }

  if (pattern === "ninjathons") {
    return (
      <div className="relative flex aspect-[16/11] w-full flex-col justify-between overflow-hidden rounded-2xl bg-[#11120E] p-6 text-white sm:p-8">
        <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[#C4F012]">
            <Terminal className="h-4 w-4" />
            <span>NINJATHONS · MICROVM JUDGE</span>
          </div>
          <span className="rounded-full bg-[#C4F012]/15 px-2.5 py-0.5 font-mono text-[11px] text-[#C4F012]">
            7 LANGUAGES
          </span>
        </div>

        <div className="relative my-4 grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="rounded-xl border border-[#C4F012]/30 bg-[#C4F012]/10 p-3.5">
            <div className="flex items-center gap-1.5 text-[#C4F012]">
              <Trophy className="h-3.5 w-3.5" />
              <span>1v1 DUELS</span>
            </div>
            <div className="mt-1.5 text-sm text-white">Glicko-2 Ranked</div>
            <div className="mt-1 text-[11px] text-neutral-400">2.1s Verdict</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
            <div className="text-neutral-400">TERRITORY MAP</div>
            <div className="mt-1.5 text-sm text-white">3–6 Player Hex</div>
            <div className="mt-1 text-[11px] text-neutral-400">
              587 In-App Docs
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[11px] text-neutral-400">
          <span>Zero-Network Sandboxed Execution</span>
          <span className="text-[#C4F012]">CODE · DUEL · CONQUER</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[16/11] w-full flex-col justify-between overflow-hidden rounded-2xl bg-[#0F1B15] p-6 text-white sm:p-8">
      <div className="relative flex items-center justify-between border-b border-emerald-500/20 pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <Globe className="h-4 w-4" />
          <span>ECOPLAST HART 2026 · PRODUCTION</span>
        </div>
        <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[11px] text-emerald-300">
          CASE STUDY
        </span>
      </div>

      <div className="relative my-4 grid grid-cols-3 gap-2.5 font-mono text-[11px]">
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3">
          <div className="font-semibold text-white">SEO + GEO</div>
          <div className="mt-1 text-emerald-300">@graph JSON-LD</div>
          <div className="text-neutral-400">IndexNow Push</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <div className="font-semibold text-white">TITAN117</div>
          <div className="mt-1 text-neutral-300">Local AI Docs</div>
          <div className="text-neutral-400">RO/EN Citations</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <div className="font-semibold text-white">CORE Chat</div>
          <div className="mt-1 text-neutral-300">Closed-Door</div>
          <div className="text-neutral-400">Auto-Translate</div>
        </div>
      </div>

      <div className="relative flex items-center justify-between border-t border-emerald-500/20 pt-3 font-mono text-[11px] text-neutral-400">
        <span>{stage}</span>
        <span className="text-emerald-400">ecoplasthart.com</span>
      </div>
    </div>
  );
}
