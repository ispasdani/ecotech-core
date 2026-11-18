# DBLuna

> Design and document databases. Draw a schema or write it in DBML, import it from a live database or a BACPAC file, and turn it into a searchable documentation site.

| | |
|---|---|
| **Type** | Web app (SaaS) |
| **Repo** | `dbluna-com` |
| **Status** | Development finished 16 Nov 2026. It has only run against dev Clerk and dev Convex, never production, and paid gating has never handled real money. |
| **Stack** | CORE framework ([core-framework.md](../core-framework.md)) plus Zustand + IndexedDB, CodeMirror, `@dbml/core`, dagre, Vercel AI SDK with Gemini |
| **Plans** | Free (code-only editing) and Pro (about $10/month). Enterprise exists as marketing copy only. |
| **Source docs** | `dbluna-com/README.md`, `docs/final-state.md`, `docs/decisions.md`, `docs/convex/*` |

## Who it's for

- Developers and teams who design schemas and want diagrams and code that stay in sync.
- SQL Server and Power BI teams who need to hand a database "map" to a report developer. This is the business angle in `docs/business/`: an offline, searchable handoff explaining the tables, joins and report rules.

## Features

**Status key.** ✅ verified (by hand or by a test that covers the behaviour end to end) · 🟡 built, not clicked through signed in · ⛔ not built

### Editor
| Feature | Status | Notes |
|---|---|---|
| Canvas: tables, relationships, notes, areas | ✅ | Pan, zoom, marquee select, minimap, snap to grid, themes |
| Dock panels | ✅ | Tables, Relationships, Notes, Areas, Enums, Issues (schema linter), Templates, Code |
| DBML two-way sync | ✅ | One parser and one generator for the canvas, the code tab and the docs. The round trip is covered by tests. |
| JSON and Mermaid views of the code | ✅ | Mermaid is export only |
| Large schemas | ✅ | Schemas tab; show or hide by schema, TableGroup or foreign-key cluster; dashed stubs for links to hidden tables; schema graph; auto-arrange; focus mode. Built for a 428-table, 672-relationship schema. |

### Storage and sharing
| Feature | Status | Notes |
|---|---|---|
| Local-first persistence | ✅ | IndexedDB; works with no account. "My Diagrams": rename, duplicate, delete. |
| Share links | ✅ | The whole diagram is compressed into the URL fragment and never reaches a server. It opens read-only without an account. Limit: 32 KB compressed. |
| Cloud sync (Pro) | 🟡 | "Save to cloud" per diagram, autosave, open on another device, "Make local-only". A stale save is refused with a conflict banner. |
| Collaboration (Pro) | 🟡 | Email invites (7-day token), up to 5 members, editor or viewer roles, live presence avatars, live saves |
| Version history (Pro) | 🟡 | Automatic snapshots every 30 minutes (newest 20 kept), named manual versions, restore without losing history |
| Member management | ⛔ | No roster, removal or role change. The `admin` role can't be granted from the UI. |

### Import and export
| Feature | Status | Notes |
|---|---|---|
| Import from live PostgreSQL and SQL Server | ✅ | Server-side, signed in + Pro. Private, loopback and metadata addresses are refused in production. |
| Import CSV, JSON, DBML, SQL | ✅ | Parsed in the browser |
| Import BACPAC | ✅ | Reads only `model.xml` (the schema), never table data. Tested on Wide World Importers: 48 tables, 98 foreign keys, 111 indexes. |
| Export JSON, DBML, SQL | ✅ | SQL for PostgreSQL, MySQL, SQL Server, Oracle |
| Export SVG | ✅ | Cropped to the diagram |
| Export PDF and PNG | ⛔ | |
| Mermaid import | ⛔ | |

### Documentation
| Feature | Status | Notes |
|---|---|---|
| DBML Docs site in the app | ✅ | Overview, per-table pages, enums, relationships, mini diagrams, schema dependencies, SQL Server views, indexes and other objects |
| Search | ✅ | Ranked and filtered; about 6 ms for a qualified name over 1,000 tables and 30,000 columns |
| Docs as Markdown | ✅ | |
| Reporting Handoff HTML export | ✅ | A portable, offline HTML handoff with a Graph tab, aimed at Power BI developers |

### AI assistant (Pro)
| Feature | Status | Notes |
|---|---|---|
| Chat that edits the diagram | 🟡 | Gemini (`gemini-3.1-flash-lite`, pinned) with 9 diagram tools. Streaming. |
| Credit metering | ✅ (maths) / 🟡 (live) | Credits reserved before and settled after each turn; monthly allowance; 10 turns a minute; global monthly ceiling. Model cost per Pro user is capped at $1.35 a month. |
| Chat history sync | 🟡 | For cloud diagrams |

### Plans and access
| Feature | Status | Notes |
|---|---|---|
| Clerk Billing (Free / Pro) | ✅ rules / 🟡 live | Cancelling keeps Pro to the end of the period; a 3-day grace for late renewals; stale events can't downgrade. |
| Free plan limits | 🟡 | Code tab only, 5 diagrams × 10 tables, canvas view-only. Enforced in the browser only, by design: Free diagrams never reach the server. |
| Enterprise | ⛔ | Copy only |
| Desktop app (Electron "Database Import Workstation") | ⛔ | Set aside. Only an experiment branch exists. |

## Data model

11 Convex tables: `users`, `plans`, `diagrams`, `diagramMembers`, `diagramInvites`, `diagramPresence`, `diagramVersions`, `aiChatMessages`, `aiChatReservations`, `aiChatSpend`, `userPreferences` (unused). Local diagrams never appear in Convex.

## Key decisions

1. Local-first, with the cloud as a per-diagram paid upgrade.
2. Share links carry the diagram in the URL fragment, so no server is involved.
3. Pay to build: Free users edit in code only; Pro gets the canvas, import, export, cloud, collaboration, versions and AI.
4. Clerk Billing, with one function deciding "is Pro".
5. Every server check happens in Convex.
6. Collaboration refuses the last write when it conflicts; edits are not merged.
7. Version history keeps full snapshots, not diffs.
8. The AI budget sets the allowance; the model id is pinned.
9. One DBML pipeline for canvas, code and docs.
10. BACPAC docs come from the schema only, with no LLM and no table data.

## Before going live

1. Create Clerk Billing plans `free` and `pro` on the production instance.
2. Run `npx convex run plans:seed` on production.
3. Grandfather existing users if needed (`migrations:grandfatherExistingUsersToPro`).
4. Set the env vars and point the Clerk webhook at `<CONVEX_SITE_URL>/clerk`.

Then click through every 🟡 item signed in. `docs/testing/bacpac-manual-test-plan.md` covers BACPAC.

## Website angle

- **Headline:** "Draw it, code it, document it." The canvas and DBML stay in sync, and the docs site is generated for you.
- **Proof points you can use (verified):** imports from PostgreSQL, SQL Server and BACPAC; search across 30,000 columns in milliseconds; share links that never touch a server; handles 400+ table schemas.
- **Don't promise:** PDF or PNG export, member management, Enterprise features, or anything from `docs/business/` without checking it. That folder's README warns it makes claims the repo can't support.
