import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// ============================================================
// GLOBAL SITE CONFIG — update BASE_URL when deploying to GitHub Pages
// e.g. if your repo is "username.github.io/portfolio", set BASE_URL = "/portfolio"
// For a custom domain or root deploy, keep BASE_URL = ""
// ============================================================
// Set to your GitHub Pages subpath, e.g. "/vanillaSky"
// Leave as "" for a root/custom-domain deploy
export const SITE_BASE_URL = "/vanillaSky";

export default defineConfig({
  base: SITE_BASE_URL || "/",
  integrations: [react()],
  output: 'static',
});
