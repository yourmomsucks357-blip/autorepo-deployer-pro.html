# AutoRepo Deployer Pro

`autorepo-deployer-pro.html` is a standalone web app that can:

- Create real GitHub repositories with your PAT
- Upload template and custom files (including drag/drop)
- Configure repository settings (issues/wiki)
- Add GitHub Actions workflows (CI + Pages)
- Trigger GitHub import from an existing repo URL
- Create deployment targets for Vercel, Netlify, and Heroku (with platform tokens)
- Detect likely project frameworks from staged files

## Usage

1. Open `autorepo-deployer-pro.html` in your browser.
2. Provide your tokens:
   - GitHub PAT (`repo` scope)
   - Optional: Vercel, Netlify, Heroku tokens
3. Enter owner/repository settings, choose a template/license, and stage files.
4. Click **Create Repo & Deploy**.

The app shows live progress logs, deployment URLs, and next-step guidance.

## GitHub Pages deployment

This repository includes a GitHub Actions workflow that deploys to **GitHub Pages** on every push to `main`.

After merging to `main`:

1. Go to **Settings → Pages**
2. Ensure **Source** is set to **GitHub Actions**
3. Wait for the **Deploy to GitHub Pages** workflow run to complete

Your site will be available at:

`https://<github-username>.github.io/autorepo-deployer-pro.html/`
