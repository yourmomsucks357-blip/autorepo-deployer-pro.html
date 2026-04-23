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
