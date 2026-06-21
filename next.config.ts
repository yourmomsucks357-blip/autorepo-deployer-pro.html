import type { NextConfig } from "next";

// When deploying to GitHub Pages (a project site served from
// https://<user>.github.io/<repo>/), the build must be prefixed with the repo
// path. CI sets PAGES_BASE_PATH (from actions/configure-pages); locally it is
// empty so the site serves from the root.
const basePath = process.env.PAGES_BASE_PATH?.replace(/\/$/, "") ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
