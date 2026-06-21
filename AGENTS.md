# AutoRepo Deployer Pro

A single standalone, dependency-free static web app (`autorepo-deployer-pro.html`) plus a minimal landing page (`index.html`). It creates GitHub repos and deployment targets entirely client-side via `fetch` calls using user-supplied tokens (GitHub PAT, Vercel, Netlify, Heroku). See `README.md` for the product overview and usage.

## Cursor Cloud specific instructions

- There is **no build system, package manager, dependency install, lint, or automated test suite**. The repo is plain HTML/CSS/JS. Do not look for `package.json`/`node_modules` — there are none.
- Deployment is GitHub Pages, which uploads the whole repo directory as-is (see `.github/workflows/deploy-pages.yml`). "Development mode" is simply serving the static files.
- To run/develop locally, serve the directory with any static server, e.g. `python3 -m http.server 8000` (run from the repo root), then open `http://localhost:8000/autorepo-deployer-pro.html`. There is no separate dev vs prod build.
- `Main` is a separate larger HTML variant (not linked from `index.html`); the canonical app referenced by `README.md` and `index.html` is `autorepo-deployer-pro.html`.
- Core repo-creation and deployment flows require real provider tokens (GitHub PAT etc.) and make live API calls — they cannot be fully exercised without credentials. Client-side features that work without any tokens: template selection (stages files), drag/drop file staging, and the "Analyze Code" framework-detection button (`analyzeBtn`).
