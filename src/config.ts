// ============================================================
// SITE CONFIG — single source of truth
// Update these values before deploying to GitHub Pages
// ============================================================

export const SITE_CONFIG = {
  // Your GitHub Pages base URL. Examples:
  //   "" for root domain (e.g. harrissu.com)
  //   "/portfolio" for https://username.github.io/portfolio
  BASE_URL: "https://vanillaSky00.github.io/vanillaSky",

  // Site metadata
  TITLE: "Harris Su",
  TAGLINE: "Full-stack Developer / Designer",
  DESCRIPTION: "Software architecture · Graphic design · Figure skating",
  EMAIL: "pipichun2@gmail.com",

  // Portrait image — put file in public/images/ and set the path here.
  // Set to "" to show the placeholder box instead.
  PORTRAIT: "/images/harris-portrait.jpg",

  // Social links
  SOCIAL: {
    instagram: "https://instagram.com/sukag1m_",   
    linkedin: "https://www.linkedin.com/in/kai-chun-su-5507b4307",
    github: "https://github.com/vanillaSky00",         
  },

  // Navigation links
  NAV: [
    { label: "About", href: "/about" },
    { label: "Writing", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ],
};

// Helper: prepend Astro's base path to any internal path.
// Reads from import.meta.env.BASE_URL, which Astro sets from astro.config.mjs `base`.
// Works in both local dev (base = "/") and GitHub Pages subpath builds.
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
