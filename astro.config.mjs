import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// Base path for the deployed site.
//   "/"            → custom domain or username.github.io root
//   "/portfolio"   → username.github.io/portfolio (subpath deploy)
// Override at build time with SITE_BASE=/portfolio without editing this file.
const base = process.env.SITE_BASE ?? "/";

export default defineConfig({
  base,
  integrations: [react(), mdx()],
  output: 'static',
});
