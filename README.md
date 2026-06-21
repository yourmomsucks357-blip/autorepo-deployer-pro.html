# OfferOnly

**Vehicle Opportunities Matched to the Right Buyers.**

OfferOnly is a vehicle opportunity platform. Its purpose is to take a vehicle
opportunity and route it to the buyer type most likely to understand its real
value — from clean wholesale vehicles to total losses, salvage, export, parts,
repair, repossessions, fleet vehicles, and scrap.

This repository contains **Phase 1: the public marketing website**.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router)
- React 19 + TypeScript
- Tailwind CSS v4 (configured via `@theme` in `src/app/globals.css`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (port 3000) |
| `npm run build` | Production build + TypeScript typecheck |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Homepage — what OfferOnly does, who uses it, vehicle types, how it works |
| `/about` | Why OfferOnly exists |
| `/how-it-works` | Submission → classification → buyer routing |
| `/sell` | Seller lead form (any condition / title status) |
| `/buyers` | Buyer network signup with lane preferences |
| `/insurance` | Insurance / total-loss disposition + company inquiry |
| `/vehicle-types` | Every vehicle category and its likely buyers |
| `/contact` | General contact form |

SEO: each page sets unique title/description/canonical and Open Graph tags;
`/sitemap.xml` and `/robots.txt` are generated automatically.

## Lead capture (backend)

Every form — Sell, Buyer Network, Insurance, Contact, and the Snap flow —
submits to the server API route `POST /api/leads` (`src/app/api/leads/route.ts`,
backed by `src/lib/leads.ts`). Submissions are validated, spam-filtered via a
honeypot, and then **always logged** to the server console (visible in Vercel's
runtime logs), so a lead is never silently dropped — even with zero
configuration.

To send leads somewhere actionable, set any of these environment variables
(see `.env.example`; all optional, and you can combine them):

| Variable | Effect |
| --- | --- |
| `LEAD_WEBHOOK_URL` | POST the full JSON lead to any HTTPS endpoint (Zapier/Make/your API) |
| `LEAD_SLACK_WEBHOOK_URL` | Post a readable summary to a Slack channel |
| `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` | Email each lead via [Resend](https://resend.com) (`LEAD_FROM_EMAIL` optional) |
| `LEAD_STORE_FILE` | Append newline-delimited JSON to a file (local dev / self-host; skipped on Vercel) |

On Vercel, add these under **Settings → Environment Variables**. Locally, copy
`.env.example` to `.env.local`.

## Host on GoDaddy (static — no Vercel, no GitHub)

If `offeronly.com` is on **GoDaddy Web Hosting (cPanel)**, you can serve the site
as plain static files — no Node server, no Vercel, no GitHub.

### 1. Build the static bundle

```bash
npm run build:static
```

This writes a complete static site to `out/` (the `/api/leads` route is excluded
from this build; forms confirm client-side via `NEXT_PUBLIC_STATIC_EXPORT`).

### 2. Upload to GoDaddy

1. GoDaddy **My Products → Web Hosting → Manage → cPanel Admin**.
2. Open **File Manager → `public_html`**.
3. Upload the **contents of `out/`** (not the `out` folder itself). Easiest: zip
   `out/`, upload the zip into `public_html`, then **Extract** it there.
4. Make sure `index.html` ends up directly in `public_html`.

Because the export uses `trailingSlash: true`, every page is a folder with its
own `index.html` (e.g. `/sell/index.html`), so Apache serves clean URLs with no
extra config.

### 3. Point the domain at the hosting

If the domain and hosting are in the same GoDaddy account, GoDaddy usually links
them automatically. Otherwise, in **Domain → DNS**, set the `A` record for `@` to
the hosting IP shown in cPanel and remove the parked-page records.

> Note: a static build can't run the server-side `/api/leads` pipeline, so on
> GoDaddy static hosting forms confirm to the visitor but leads are not delivered
> server-side. To capture them, either (a) host the full app on a Node host
> (keeps `/api/leads`), or (b) point the forms at a static-friendly form service.

## Deployment (Vercel + offeronly.com)

OfferOnly is hosted as a full Next.js app on **Vercel**, served at
**https://offeronly.com**. Vercel is used (instead of static hosting) so later
phases — real lead storage, the buyer-routing algorithm, dashboards — can add
server/API code without re-platforming.

### 1. Create the Vercel project

1. Sign in at [vercel.com](https://vercel.com) and **Add New… → Project**.
2. Import this Git repository. Vercel auto-detects Next.js — no settings needed
   (`vercel.json` pins the framework and build command).
3. Deploy. Every push to `main` then deploys to production automatically, and
   every pull request gets its own preview URL.

> Optional: a GitHub Actions workflow (`.github/workflows/deploy-vercel.yml`) is
> included for teams that prefer CI-driven deploys. It needs the repository
> secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`. If you use
> the Vercel Git integration above, you can ignore this workflow.

### 2. Add the domain in Vercel

In the project: **Settings → Domains → Add** and add both:

- `offeronly.com`
- `www.offeronly.com`

Vercel will show the exact records to create. They are typically the values
below.

### 3. Point GoDaddy DNS at Vercel

The domain is registered at **GoDaddy**. Keep GoDaddy as the DNS host and edit
records under **My Products → Domain → DNS → Manage Zones** (or **DNS →
Records**):

| Type  | Name (Host) | Value                  | TTL     |
| ----- | ----------- | ---------------------- | ------- |
| A     | `@`         | `76.76.21.21`          | 600 sec |
| CNAME | `www`       | `cname.vercel-dns.com` | 600 sec |

Notes:

- Delete any existing parked-page `A`/`CNAME` records on `@` and `www` that
  GoDaddy added by default, or the domain will keep showing the GoDaddy holding
  page.
- The `www` → apex redirect is handled by `vercel.json`, so visitors who type
  `www.offeronly.com` land on `https://offeronly.com`.
- DNS can take from a few minutes up to ~48 hours to propagate; Vercel issues
  the HTTPS certificate automatically once the records resolve.

Verify with `dig offeronly.com +short` (expect `76.76.21.21`) once propagated.

## Roadmap

Lead capture is now wired (forms POST to `/api/leads` with pluggable delivery
sinks). Still ahead: durable lead storage in a database, full vehicle intake,
the buyer network, the production buyer-routing algorithm, dashboards, offers,
marketplace search, and external syndication.
