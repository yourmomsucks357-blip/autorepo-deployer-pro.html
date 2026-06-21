<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# OfferOnly

OfferOnly is a vehicle opportunity platform. This repo currently contains **Phase 1: the public marketing website** (Next.js App Router + TypeScript + Tailwind CSS v4). Pages: Home, About, How It Works, Sell, Buyer Network, Insurance, Vehicle Types, Contact. See the full product spec context in the PR/issue.

Project layout:
- `src/app/*` — App Router pages (one folder per route) plus `sitemap.ts` and `robots.ts` for SEO.
- `src/components/*` — shared UI (`ui.tsx` primitives, `Header`, `Footer`, `LeadForm`, `PageHero`, `CtaBand`, `icons`).
- `src/lib/*` — site config (`site.ts`) and marketing/content data (`content.ts`).

## Cursor Cloud specific instructions

- Stack: Next.js 16 (App Router), React 19, Tailwind CSS v4 (configured via `@theme` tokens in `src/app/globals.css` — there is no `tailwind.config.js`). Node 22 is available.
- Standard commands (see `package.json`): `npm run dev` (dev server on port 3000), `npm run build` (production build + TypeScript typecheck), `npm run lint` (ESLint). There is no separate `tsc` script — type errors surface during `npm run build`.
- Lint uses the flat config `eslint.config.mjs` with `eslint-config-next`. Note `react-hooks/set-state-in-effect` is enforced — do not call `setState` synchronously inside `useEffect`.
- `next/font/google` (Geist) is fetched at build/dev time, so the first compile needs network access.
- Phase 1 has **no backend**: lead forms (`LeadForm.tsx`) and the Snap flow validate client-side and show a success state; submissions are only logged to the browser console. Wiring real submission/storage is a later phase — do not assume an API exists.
- "Snap Before You Scrap" lives at `/snap` (`src/components/SnapFlow.tsx`): a mobile-first, multi-step intake (photos → details → result). It runs the rule-based buyer-lane scoring engine in `src/lib/scoring.ts` (`scoreVehicle`) — a deterministic MVP of the spec's routing algorithm (sections 8-10). Photos use a client-side camera `<input capture>` and are previewed via blob URLs (hence the intentional `next/image` lint suppression there); they are not uploaded anywhere yet.
- Do not build login, dashboards, marketplace search, bidding, payments, or external syndication yet; the spec sequences those into later phases.
