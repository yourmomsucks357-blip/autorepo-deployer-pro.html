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

The public website comes first. Real form storage, vehicle intake, the buyer
network, the buyer-routing algorithm, dashboards, offers, marketplace search,
and external syndication come in later phases.
