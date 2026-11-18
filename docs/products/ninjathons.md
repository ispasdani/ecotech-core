# Ninjathons

> A competitive coding platform: practice problems, live 1v1 duels, multiplayer Territory games, daily and weekly challenges, learning roadmaps, and team ninjathons (hackathon-style events).

| | |
|---|---|
| **Type** | Web app (SaaS), with a desktop app planned later |
| **Repo** | `ninjathons` |
| **Status** | Phases 0–5 and 7–9 done (27 Sept – 14 Oct 2026). Phase 6 (Territory) is built, but its live check with real players is still to do. Phase 10 (hosting, alpha, closed beta, launch) hasn't started. Everything runs locally against dev deployments. |
| **Stack** | CORE framework ([core-framework.md](../core-framework.md)) plus Monaco editor, Vercel Sandbox (code runner), Stripe directly, Glicko-2 and OpenSkill ratings |
| **Brand** | Name from "hackathons". Shuriken logo, wordmark in Orbitron, interface in Geist. Neon green accent `#c4f012` on a monochrome UI. |
| **Plans** | Free, and Pro at about €8/month or €69/year (Stripe, test mode until release) |
| **Source docs** | `ninjathons/README.md`, `docs/notes/decisions.md`, `docs/progress.md`, `docs/notes/*` |

## Features

**Status key.** ✅ done (phase check passed) · 🟡 built, live check pending · 🔜 planned (V1.1 / V1.2 / V2)

### Practice and judging
| Feature | Status | Notes |
|---|---|---|
| Problem library | ✅ | 88 problems so far (5 of them HTML/CSS), aiming for 150–200 at launch. Each problem is a folder with JSON settings, a statement, hints, tests, a reference solution and must-fail solutions, checked and seeded by scripts. |
| 7 code languages | ✅ | JavaScript, TypeScript, Python, Java, C#, C++, Rust. Per-language time multipliers keep matches fair. |
| Two judge modes | ✅ | `function` (write only the function; starter code and driver generated per language) and `stdio` (full program). The mode is set by the problem and shown as a label. |
| Checkers | ✅ | Exact, float with tolerance, unordered |
| Secure code runner | ✅ | Vercel Sandbox microVMs, called only from Convex, with no network. User code runs as `nobody` with all capabilities dropped. Verdicts are decided in Convex, and hidden test outputs never leave it. |
| Speed | ✅ | Submit about 2–2.7 s for JS, TS and Python; 3.4–4.6 s for the compiled languages. Load-tested; a refused sandbox waits and retries. |
| HTML and CSS challenges | ✅ | "Build the same output as this one". Checked in the browser against a target (elements, text, attributes, computed styles), with a side-by-side or overlay view. Practice only. |
| Docs library | ✅ | 498 curated MDN pages and 89 Python pages inside the app, searchable in the solve view, 1v1 and Territory. Doc use in a match is logged ("used 2 doc pages"). |

### Compete
| Feature | Status | Notes |
|---|---|---|
| 1v1 matches | ✅ | Ranked matchmaking (the rating range widens while you wait). Difficulty and time limit (15/25/40 min) follow your rating. The first accepted Submit wins, by when it was *sent*. 10-second countdown. |
| Challenges | ✅ | Challenge someone by username or with a shareable link, ranked or unranked |
| Ghost races | ✅ | Race a replay of a real player's past solve when nobody is waiting |
| Share cards | ✅ | A public result page `/m/<id>` with an Open Graph card |
| Ratings | ✅ | Glicko-2 per area; provisional until 10 ranked games; tiers Newbie → Grandmaster; rating history chart |
| Territory | 🟡 | 3–6 players on a hexagon map (37 or 61 regions). Claim or attack regions by solving problems; the Core in the centre is worth +5. Ranked queue or lobbies (group lobbies too). Rated with OpenSkill. 30-minute games. |
| Ninjathons (events) | ✅ | Admin-run hackathon events lasting 1 hour to 7 days. Teams by invite code (solo allowed); the brief is hidden until the start; link-only submissions; admins judge with a weighted rubric; results, XP, badges and a Hall of Fame board. |

### Daily habits
| Feature | Status | Notes |
|---|---|---|
| Daily challenge | ✅ | One problem a day for everyone. Difficulty follows the weekday, and a problem never repeats. XP grows with your streak. |
| Streaks and freezes | ✅ | A freeze earned every 7 days, up to 2 held |
| Weekly challenge | ✅ | A themed set of 3–5 new problems each week (6 sets written: prefix sums, binary search, graphs, intervals, heaps, DP), with points, a time tie-break and a top-10% badge |

### Progression
| Feature | Status | Notes |
|---|---|---|
| XP and levels | ✅ | Level n+1 needs 100 × n^1.5 XP in total. Titles run from Initiate to Legend (placeholder names). |
| Badges | ✅ | 21+ from solves, levels, languages, 1v1, streaks, Territory, Learn and Ninjathons. Rarity is shown. |
| Leaderboards | ✅ | Level, 1v1, Daily, Weekly, Territory, Learning and Ninjathons boards, with Global, Country and Group scopes. Snapshots rebuilt every 5 minutes. |
| Groups | ✅ | Free private groups by 8-character invite code; up to 100 members each |

### Learn
| Feature | Status | Notes |
|---|---|---|
| Tutorials | ✅ | About 20, free and public (readable signed out, built for SEO) |
| Roadmaps | ✅ | 3: Programming basics, Data structures and algorithms, Interview prep. Modules → lessons → exercises. The first module is free and the rest is Pro. |
| Progress | ✅ | A lesson is done when its exercises are solved. XP per lesson and module, and a badge per roadmap. |

### Profiles and Pro
| Feature | Status | Notes |
|---|---|---|
| Unique usernames | ✅ | Chosen at onboarding; 30-day change cooldown; old names held for 90 days with a redirect |
| Public profile `/u/<username>` | ✅ | Server-rendered for SEO: stats block, activity grid, rating chart, bio, links, favourite languages, up to 3 pinned solutions |
| Themes | ✅ | 10 themes: 3 free, 4 earned, 3 Pro. All pass contrast tests. |
| Custom profile (Pro) | ✅ | Accent colour, banner pattern, heading font, section order, short URL `/<username>`. Anyone can preview it before buying. |
| Stripe Checkout and billing portal | ✅ (test mode) | Monthly or yearly. Prices are synced from Stripe hourly. The webhook was checked end to end in test mode. |
| Account deletion | ✅ (designed) | 14-day grace, then batched hard delete; matches anonymised |
| Admin role and pages | ✅ | Set from the CLI only; `/admin` returns 404 to everyone else |

### Planned
| Feature | When |
|---|---|
| Ranked HTML/CSS ("CSS duels", visual judge in headless Chromium) | V1.1 |
| AI coach, replays (join Pro; price rises for new subscribers) | V1.1 |
| Private ninjathons by Pro players, paid entry, Stripe Connect payouts | V1.2+ |
| Following, friends online, notifications, more share cards | V1 (after phase 8) |
| Free roam (build anything in the browser), World Conquest, Battle royale, Organization plan | V2 |
| Desktop app with a local runner and offline practice | Later |

## Free vs Pro (as built)

- **Free:** all practice, all competition modes, daily and weekly challenges, tutorials, the first module of each roadmap, profiles with free and earned themes, groups, ninjathons.
- **Pro:** the full roadmaps and a custom profile (accent, banner, fonts, layout, short URL). With V1.1: AI coach and replays.

## Website angle

- **Headline:** "Code. Duel. Conquer." Practice, then prove it live against real players.
- **Differentiators:** fair, sent-time racing; 7 languages judged in secure microVMs; Territory, a multiplayer strategy game where solving problems captures map regions; team hackathon events; official docs allowed in ranked play.
- **Don't promise yet:** a public launch date, CSS duels, the AI coach, the desktop app, paid events.
