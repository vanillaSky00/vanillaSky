import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import rehypeMathjax from 'rehype-mathjax';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkMath from 'remark-math';

// Base path for the deployed site.
//   "/"            → custom domain or username.github.io root
//   "/portfolio"   → username.github.io/portfolio (subpath deploy)
// Override at build time with SITE_BASE=/portfolio without editing this file.
const base = process.env.SITE_BASE ?? "/";

// Code block syntax highlighting. Swap themes here to retheme every
// code block site-wide — see https://shiki.style/themes for options.
/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  theme: { light: 'github-light', dark: 'github-dark-dimmed' },
  keepBackground: false,
  defaultLang: 'plaintext',
};

export default defineConfig({
  base,
  integrations: [react(), mdx()],
  output: 'static',
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathjax, [rehypePrettyCode, prettyCodeOptions]],
  },
});
