/**
 * Build a static, host-anywhere version of OfferOnly into `out/`.
 *
 * Static export cannot include the server-side /api/leads route, so this script
 * temporarily moves it aside, runs `next build` with STATIC_EXPORT=1, then
 * restores it. The resulting `out/` folder is plain HTML/CSS/JS you can upload
 * to GoDaddy (cPanel `public_html`) or any static host — no Node, Vercel, or
 * GitHub required. Forms confirm client-side in this build.
 *
 * Usage: npm run build:static
 */
import { execSync } from "node:child_process";
import { existsSync, rmSync, renameSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const apiDir = resolve(root, "src/app/api");
const apiHidden = resolve(root, "src/app/_api_excluded_from_static");

function restore() {
  if (existsSync(apiHidden)) {
    renameSync(apiHidden, apiDir);
  }
}

// Clean previous output.
rmSync(resolve(root, "out"), { recursive: true, force: true });
rmSync(resolve(root, ".next"), { recursive: true, force: true });

const hadApi = existsSync(apiDir);
if (hadApi) renameSync(apiDir, apiHidden);

try {
  execSync("next build", {
    stdio: "inherit",
    env: {
      ...process.env,
      STATIC_EXPORT: "1",
      NEXT_PUBLIC_STATIC_EXPORT: "1",
    },
  });
} finally {
  if (hadApi) restore();
}

console.log("\nStatic site written to ./out");
console.log("Upload the CONTENTS of ./out into your GoDaddy public_html folder.");
