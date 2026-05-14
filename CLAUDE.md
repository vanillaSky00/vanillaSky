# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server (localhost:4321)
npm run build     # production build → ./dist
npm run preview   # preview the production build locally
```

There are no tests or linters configured.

## Architecture

Static site built with **Astro 4 + React 18**, deployed to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.

### Content entry points (the only files that need editing for content changes)

- [src/config.ts](src/config.ts) — site metadata, social links, nav items. Also exports a `url(path)` helper that prepends the Astro base path to internal links. **Always use `url()`** for internal links so subpath deploys keep working.
- [src/data/projects.ts](src/data/projects.ts) — the `PROJECTS` array drives everything: the homepage grid, individual project pages, and prev/next navigation. The `Project` interface defines all available fields. Images go in `public/images/`.

### Routing

- `src/pages/index.astro` — homepage with project grid
- `src/pages/about.astro` — about page
- `src/pages/work/[slug].astro` — dynamic project pages generated from `PROJECTS` via `getStaticPaths()`
- `src/pages/404.astro` — not found

### Layout & components

`BaseLayout.astro` is the single HTML shell used by every page. It handles the `<head>`, theme init (reads `localStorage` to prevent flash), smooth scroll, and slots in `Nav` + `Footer`. The theme toggle lives in `Nav.astro` and writes to `data-theme` on `<html>`.

### Styling

All design tokens (colours, typography, spacing) are CSS custom properties defined in [src/styles/global.css](src/styles/global.css). Light/dark values are set under `[data-theme="light"]` / `[data-theme="dark"]`. Page-scoped styles live inside `<style>` blocks in each `.astro` file.

## GitHub Pages deployment

Base path lives in one place — [astro.config.mjs](astro.config.mjs) — and defaults to `"/"` for custom-domain / root deploys. For a subpath deploy, set the `SITE_BASE` env var at build time (e.g. `SITE_BASE=/portfolio npm run build`) instead of editing the file.

The custom domain is pinned by [public/CNAME](public/CNAME), which Astro copies into `dist/` on every build so GitHub Pages preserves the domain setting. All internal hrefs must go through the `url()` helper in [src/config.ts](src/config.ts) so links resolve under any base path.
