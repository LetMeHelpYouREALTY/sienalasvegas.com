# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js 14 (App Router)** marketing / lead-generation site for a Las Vegas
real estate agent (`sienalasvegas.com`). It is deployed on Vercel; there is no
database or backend service to run — everything is served by the single Next.js app.

### Running the app
- Standard scripts live in `package.json` (`dev`, `build`, `start`, `lint`, `type-check`).
- Dev server: `npm run dev` → http://localhost:3000 (this is the primary way to run the app).
- Lint: `npm run lint` (passes clean). Type-check: `npm run type-check` (passes clean).

### Node version (non-obvious)
- `package.json` `engines` and `.nvmrc` pin **Node 24.x** (Vercel parity), but the cloud VM's
  default `node` is **v22** (served from `/exec-daemon/node`, which is prepended to `PATH`
  ahead of nvm on every shell). Next.js 14.2 fully supports Node 22, so dev / lint /
  type-check / build all work on the default Node 22 — no PATH hacks needed. nvm has
  Node 24 installed (`nvm use 24`) if exact parity is ever required.

### Environment variables / secrets (non-obvious)
- The app runs, and all pages render, **without any environment variables** — every
  `process.env.*` usage has a fallback, so missing keys never crash startup.
- Feature-specific integrations degrade gracefully or error only at call time:
  - **Lead capture** (`/api/leads/capture` → Follow Up Boss CRM) needs `FUB_API_KEY`
    (and optionally `FUB_SYSTEM_KEY`). Without it, request parsing + validation still
    work, but the final CRM call returns `FUB API Error (401)`. This is the site's core
    "create a lead" flow, so set `FUB_API_KEY` to exercise it end-to-end.
  - **AI chat / property descriptions** (`/api/claude/chat`, `/api/chat`,
    `/api/generate-property-description`) need `ANTHROPIC_API_KEY` / `AI_GATEWAY_API_KEY`
    or `OPENROUTER_API_KEY`.
  - **CAPTCHA** (`TURNSTILE_SECRET_KEY` / `NEXT_PUBLIC_TURNSTILE_SITE_KEY`) is skipped
    when unset (allowed in dev).
  - **Rate limiting** uses Upstash Redis if `UPSTASH_REDIS_REST_URL`/`_TOKEN` are set,
    otherwise falls back to in-memory limiting.
  - **Sentry** (`NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_ORG`, `SENTRY_PROJECT`) is optional;
    dev logs harmless Sentry config warnings that can be ignored.
- The RealScout property-search widgets on the homepage load from `em.realscout.com`
  (external CDN) and require network egress; they are not driven by repo secrets.

### Tests (non-obvious)
- There is **no test runner configured**: `package.json` has no `test` script and no
  `vitest`/`jest` dependency. The `*.test.ts` files (e.g. `lib/fub/client.test.ts`,
  `hooks/useReducedMotion.test.ts`, `middleware/claude-rate-limit.test.ts`) are stale
  scaffolding — they import symbols that no longer exist (e.g. `fubClient`, while the
  module exports the `FollowUpBossClient` class) and fail even under a transient
  `npx vitest run`. Do not treat them as a green suite; validate changes via
  `npm run lint`, `npm run type-check`, and manual/dev testing instead.

### Deploy note
- Per repo/user convention, production builds are done with the Vercel CLI
  (`vercel build`), not `npm run build`. Local `npm run build` still works for sanity checks.
