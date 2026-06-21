import type { NextConfig } from "next";

/*
 * Two build modes:
 *
 * 1. Default (server / Node hosting, e.g. Vercel or any Node host): full
 *    Next.js app including the /api/leads route.
 *
 * 2. Static export (STATIC_EXPORT=1): emits a plain HTML/CSS/JS site into
 *    `out/` that can be uploaded to ANY static host — including GoDaddy basic
 *    web hosting (cPanel `public_html`). No Node server, no Vercel, no GitHub.
 *    The /api/leads route is excluded from this build (see scripts/build-static.mjs)
 *    and forms confirm client-side via NEXT_PUBLIC_STATIC_EXPORT.
 */
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = staticExport
  ? {
      output: "export",
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
