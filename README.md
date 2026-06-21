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

## Roadmap

The public website comes first. Real form storage, vehicle intake, the buyer
network, the buyer-routing algorithm, dashboards, offers, marketplace search,
and external syndication come in later phases.
