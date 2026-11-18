# EcotechCore: product documentation

One place for what our three products do, how they're built, and where each one stands. It's compiled from each project's own docs and code, and is the reference for the company website.

**As of 18 Nov 2026.** Where this folder and a project's own docs disagree, the project wins. Each project's `docs/notes/decisions.md` (or `docs/decisions.md`) is its source of truth.

## Start here

| File | What it is |
|---|---|
| [core-framework.md](core-framework.md) | The CORE framework: the shared stack, the access rule, guardrail wrappers, payments, deletion and the way we work |
| [products/titan117.md](products/titan117.md) | TITAN117: local-first AI team for small companies (desktop + web) |
| [products/ninjathons.md](products/ninjathons.md) | Ninjathons: competitive coding platform |
| [products/dbluna.md](products/dbluna.md) | DBLuna: database design and documentation tool |
| [feature-matrix.md](feature-matrix.md) | All three side by side |

## The three products at a glance

| | TITAN117 | Ninjathons | DBLuna |
|---|---|---|---|
| **One line** | An AI team that runs on your laptop | Code. Duel. Conquer. | Design and document your database |
| **For** | Small companies | Developers and learners | Developers, data and BI teams |
| **Form** | Desktop app + web app | Web app | Web app |
| **Pricing** | €15 / €25 / €50 a month, no free plan | Free + Pro €8 a month | Free + Pro ~$10 a month |
| **Stage** | Building: phases 0–3 of 18 done, 4–6 in progress | Feature-complete for V1 except Territory's live check; launch phase next | Development finished 16 Nov 2026; never deployed to production |
| **Repo(s)** | `titan117-web`, `titan117-desktop`, `titan117-pop` | `ninjathons` | `dbluna-com` |

## Using this for the website

- Each product file ends with a **Website angle** section: a headline idea, proof points that are safe to use, and what not to promise yet.
- Only describe features as available when they're marked ✅ or ✓. Everything else is "coming soon" or left out.
- The CORE framework is private. Talk about the outcomes (secure by design, local-first, fast), not the internals.

## Sources

| Project | Path | Main docs read |
|---|---|---|
| DBLuna | `C:\Users\dniss\Officials\dbluna-com` | `README.md`, `docs/final-state.md`, `docs/decisions.md`, `docs/convex/*`, `docs/business/business-proposition.md` |
| Ninjathons | `C:\Users\dniss\Officials\ninjathons` | `README.md`, `docs/notes/decisions.md` (§1–19), `docs/progress.md`, `docs/notes/v2-ideas.md`, `docs/notes/desktop-and-offline.md` |
| TITAN117 | `C:\Users\dniss\Officials\titan117-web` (shared docs), `titan117-desktop`, `titan117-pop` | `CLAUDE.md`, `docs/03-architecture.md`, `docs/notes/brainstorming-feature-map.md`, `docs/notes/v1-scope.md`, `docs/notes/pricing.md`, `docs/guardrails.md`, each repo's `docs/progress.md` |

Left out on purpose: `titan117-references` (third-party open-source code kept for study) and `ecoplasthart-2026` (not one of the three products).

## Keeping it current

When a phase finishes or a decision changes in a product repo, update the matching file here and the date at the top. Status markers should follow each repo's `progress.md`.
