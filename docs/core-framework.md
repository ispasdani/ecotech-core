# The CORE framework

The engineering foundation shared by TITAN117, Ninjathons and DBLuna. It isn't a published package. It's a stack plus a set of patterns, rules and doc habits that each repo copies and extends. DBLuna came first, Ninjathons formalised the patterns, and TITAN117 says outright that it is "built on the Ninjathons patterns (guardrail wrappers, entitlements, phases and progress docs)".

Private: none of this is public, so don't put internals (file names, guard names, webhook design) on the website.

## 1. The stack

| Layer | Choice | DBLuna | Ninjathons | TITAN117 |
|---|---|---|---|---|
| Web framework | Next.js 16 (App Router), React 19 | ✓ | ✓ | ✓ web app and owner portal |
| Backend and database | Convex (queries, mutations, actions, crons, HTTP webhooks, file storage) | ✓ | ✓ | ✓ in `packages/backend` |
| Auth | Clerk (Convex trusts Clerk's JWT via `auth.config.ts`) | ✓ | ✓ | ✓, plus desktop sign-in through the system browser |
| Payments | Stripe | via Clerk Billing | Stripe directly | Stripe directly |
| UI | Tailwind v4 + shadcn/ui, `next-themes` light/dark, lucide icons | ✓ | ✓ | ✓ |
| Tests | Vitest; `convex-test` for in-memory Convex function tests | ✓ | ✓ | ✓ |
| Hosting | Vercel (web), Convex cloud | dev only | dev only | dev deployment live |
| Desktop | Electron | experiment only | planned later | ✓ `titan117-desktop` |

Common route layout: `app/(marketing)` or `(site)` for public pages, `app/(app)` for signed-in pages, `app/(auth)` for Clerk, `app/api` for server routes.

## 2. The access rule: every check happens in Convex

> Next.js decides what to show; Convex decides what to send.

- `proxy.ts` (Next.js 16's middleware) only sends signed-out visitors to sign-in. It never protects data.
- Hidden buttons, client-side plan checks and UI capability contexts shape the experience only. The server repeats every check.
- `/api/*` routes are public at the proxy, so each route checks auth itself. (DBLuna learned this the hard way: an import route without a check was an SSRF hole, fixed 17 Nov 2026.)
- Errors go out as codes (`UNAUTHENTICATED`, `PRO_REQUIRED` / `PAYMENT_REQUIRED`, `FORBIDDEN`, `NOT_FOUND`, `CONFLICT`, `RATE_LIMITED`), never stack traces or other users' data.

### Guardrail wrappers

Public Convex functions are built only from wrappers in `convex/lib/functions.ts`. ESLint blocks raw `query`, `mutation` and `action` outside `convex/lib`.

| Wrapper | Caller | Used in |
|---|---|---|
| `publicQuery` | Anyone (only truly public data) | Ninjathons, TITAN117 |
| `userQuery` / `userMutation` / `userAction` | Signed-in user | Ninjathons, TITAN117 |
| `proQuery` / `proMutation` (Ninjathons), `paidQuery` / `paidMutation` (TITAN117) | Active paid plan, read from `entitlements` | Ninjathons, TITAN117 |
| `adminQuery` / `adminMutation` | Admin. The role is set only from the Convex CLI, and no page grants it | Ninjathons, TITAN117 |
| `deviceQuery` / `deviceMutation` | A paired desktop engine of that user | TITAN117 |

DBLuna has the earlier form of the same idea: guard functions in `convex/guards.ts` (`requireSignedIn`, `requireSignedInPro`, `requireDiagramViewer` / `Editor` / `OwnerOrAdmin`) called at the top of every function.

### Denial tests

- Every gated function has a test that calls it as the wrong caller (signed out, free, lapsed plan, another user, another device, not admin) and expects the error.
- A coverage test lists every function built from a gated wrapper and fails if one has no denial test.
- Every query that takes an id checks ownership. The tests include "another user's id".

## 3. Money

- **One source of truth for "is this user paid".** DBLuna: `hasActivePaidAccess`. Ninjathons and TITAN117: the `entitlements` table.
- **Only the payment webhook writes entitlements** (and credit top-ups in TITAN117). A test fails if any other file writes them.
- **Webhooks are verified and idempotent.** Signatures are checked (Svix for Clerk; Web Crypto for Stripe, with no Stripe SDK). Each event id is recorded once, and the subscription is read back from Stripe so events that arrive out of order can't undo a newer state.
- **Grace and period rules are tested.** Cancelling keeps access until the period ends, and there is a short grace window for a late renewal webhook.
- **Prices aren't hard-coded.** Ninjathons and TITAN117 sync prices from Stripe into a table on a cron.
- **AI spend is budgeted.** Credits are reserved before an AI turn and settled after, against a single-use reservation, with rate limits and a global monthly ceiling as a circuit breaker. In DBLuna each Pro user's model cost is capped at $1.35 a month. In TITAN117 the credit ledger is append-only and deductions are atomic.

## 4. Local-first where it fits

- **DBLuna:** diagrams live in IndexedDB. The cloud is a paid, opt-in upgrade per diagram, and share links carry the whole diagram in the URL fragment, with no server involved.
- **TITAN117:** agents, memory and documents stay on the user's laptop. The cloud holds only what must be shared or paid for. Remote control is end-to-end encrypted.
- **Ninjathons:** online-first because play is competitive. Browser runs for practice and a local desktop runner are part of the plan.

## 5. Data deletion (GDPR pattern, from Ninjathons §4)

- Soft-delete when other rows point to a record or an undo makes sense. Hard-delete purely personal data, or data the law says must go.
- Account deletion: a 14-day grace period, then a batched hard delete. Shared records (finished matches, for example) are anonymised as "Deleted player". Stripe invoices are kept, because tax law requires it.
- Every new table gets a row in the deletion table when it is created. Soft-deleted rows are filtered through indexes and shared helpers, and tested.

## 6. How work gets done

| Habit | What it means |
|---|---|
| **Phases with a done-check** | The build is split into numbered phases. Each one ends with a concrete check ("Two Sum goes from folder to verdict in under 3 s"), and a phase isn't done until its check passes. |
| **Done means done** | Typecheck, lint, tests and build pass. New behaviour has tests, including refusals. It has been seen in the real app, light and dark, at phone and desktop widths. Anything not checked is written down as not checked. |
| **`docs/progress.md`** | A phase table plus a dated log, newest first, updated in the same commit as the work. |
| **`docs/notes/decisions.md`** | Every decision with its date and its reasons. It wins over every other planning doc. |
| **Owner checklist** (TITAN117) | Everything waiting on the owner (decisions to confirm, accounts, legal) in one file. |
| **Verified / built / not built** | Status is reported in three kinds, kept apart: verified by hand or by a test, built but not clicked through, and not built. |
| **Nothing hosted until release** | Development runs against dev Clerk and dev Convex. Production is set up in the release phase. |
| **Open-source policy** | Copy code only from MIT, Apache 2.0, BSD or ISC projects, and list it in a sources file. GPL, AGPL and fair-code projects are for ideas only. |
| **Secrets** | Never in code, logs, memory or fixtures. On desktop they go in the OS keychain only. |

## 7. Reusable building blocks

These are built in more than one product and would be quick to reuse in a new one:

- Clerk webhook → Convex `users` sync (create, update, delete)
- Stripe Checkout + billing portal + entitlements webhook, test mode first
- Guardrail wrappers + ESLint rule + denial and coverage tests
- Invite codes (8 characters, no look-alike characters) for groups and teams
- Unique usernames held in Convex (case-insensitive key, reserved words, cooldown, 90-day hold on old names)
- XP ledger, badges with rarity, leaderboards rebuilt as snapshots on a cron
- AI credit reservation and settlement, with a global ceiling
- Crons for cleanup (presence, expired rows, snapshots)
- Window-card design language and brand tokens in `globals.css`
