# Harris Su — Portfolio

A minimalist Astro + React portfolio with dark/light mode, built for GitHub Pages.

## Tech Stack

- **Astro 4** — static site generation
- **React 18** — interactive components
- **CSS custom properties** — theming & design tokens
- **Google Fonts** — DM Serif Display + DM Mono + Cormorant Garamond

## Local Development

```bash
npm install
npm run dev
```

## GitHub Pages Deployment

### Option A — Root domain (`username.github.io`)
1. Leave `BASE_URL: ""` in `src/config.ts`
2. Push to `main` — GitHub Actions will build and deploy automatically
3. Enable Pages in repo Settings → Pages → Source: GitHub Actions

### Option B — Subpath (`username.github.io/portfolio`)
1. Set `BASE_URL: "/portfolio"` in `src/config.ts`
2. Also update `base` in `astro.config.mjs` to `"/portfolio"`
3. Push to `main`

## Customisation

All content and configuration lives in two files:

| File | What to edit |
|------|-------------|
| `src/config.ts` | Name, email, social links, base URL, navigation |
| `src/data/projects.ts` | Projects — title, description, images, tags, slug |

### Adding Images
Drop images into `public/images/` and update the paths in `src/data/projects.ts`.

```
public/
  images/
    dadaocheng-cover.jpg
    yuzuru-cover.jpg
    ...
```

### Adding a New Project
1. Add an entry to the `PROJECTS` array in `src/data/projects.ts`
2. Add a cover image to `public/images/`
3. Astro will automatically generate `/work/your-slug` page

## Project Structure

```
src/
  config.ts          ← global site config & URL helper
  data/
    projects.ts      ← all project data
  styles/
    global.css       ← design tokens, typography, utilities
  layouts/
    BaseLayout.astro ← HTML shell, nav, footer
  components/
    Nav.astro        ← header with theme toggle
    Footer.astro     ← contact section
    ProjectCard.astro← project list item
  pages/
    index.astro      ← homepage
    about.astro      ← about page
    work/[slug].astro← individual project pages
    404.astro        ← not found
public/
  favicon.svg
  images/            ← put project images here
.github/
  workflows/
    deploy.yml       ← GitHub Actions CI/CD
```

## Color Palette

| Token | Light | Dark |
|-------|-------|------|
| `--bg` | `#F5F2ED` warm parchment | `#151210` deep ink |
| `--ink` | `#1A1714` | `#F0EDE8` |
| `--accent` | `#C4602A` terracotta | `#E07840` amber |
