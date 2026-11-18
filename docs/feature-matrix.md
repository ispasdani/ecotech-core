# Feature matrix

Shared capabilities across the three products. ✓ built · ◐ partly built, or built but not verified · ○ planned · — not applicable

| Capability | DBLuna | Ninjathons | TITAN117 |
|---|---|---|---|
| **Platform** | Web | Web | Desktop (Win/Mac) + web + portal |
| Next.js 16 + React 19 | ✓ | ✓ | ✓ (web, portal) |
| Convex backend | ✓ | ✓ | ✓ |
| Clerk sign-in | ✓ | ✓ | ✓ (desktop through the system browser) |
| Server-side access checks (guards / wrappers) | ✓ guards | ✓ wrappers + lint | ✓ wrappers + lint |
| Denial and coverage tests | ◐ | ✓ | ✓ |
| Admin role (CLI-only) | — | ✓ | ✓ |
| **Payments** | Clerk Billing | Stripe direct | Stripe direct |
| Free plan | ✓ (code-only) | ✓ (most features) | — (no free plan) |
| Paid plan | Pro ~$10/mo | Pro €8/mo · €69/yr | €15 / €25 / €50 + Custom |
| Usage credits | ✓ AI credits (monthly allowance) | — | ✓ credit ledger + top-ups |
| **AI** | ◐ Gemini assistant that edits diagrams | ○ AI coach (V1.1) | ✓ the core of the product |
| AI spend circuit breaker | ✓ | — | ✓ (spend caps, reconciliation) |
| **Local-first / offline** | ✓ IndexedDB | ○ desktop runner later | ✓ everything runs locally |
| Share by link | ✓ URL-fragment links | ✓ match result cards | ◐ shared artifacts + comments |
| Real-time collaboration | ◐ presence + live saves | ✓ live matches, Territory | ○ teams (phase 17) |
| Version history | ◐ | — | ◐ artifact versions, app versions planned |
| Import / export | ✓ many formats | — | ◐ artifacts download as PDF, Word, Excel… |
| Docs / knowledge search | ✓ schema docs search | ✓ MDN + Python docs library | ◐ folder agent (local docs) |
| Gamification (XP, badges, boards) | — | ✓ | — |
| Public SEO pages | ✓ marketing + blog | ✓ tutorials, profiles | ○ website from `homepage-grid` |
| Account deletion (GDPR) | — | ✓ designed (14-day grace) | ○ to write up |
| Production deployment | — (dev only) | — (dev only; launch phase) | ◐ dev deployment; portal live behind sign-in |
