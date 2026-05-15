// ============================================================
// SITE CONFIG — single source of truth for content
// Base path lives in astro.config.mjs (read via import.meta.env.BASE_URL).
// ============================================================

export const SITE_CONFIG = {
  // Site metadata
  TITLE: "vanillaSky00",
  TAB_TITLE: "vanillaSky00",
  TAGLINE: "Full-stack Developer / Designer",
  DESCRIPTION: "Software architecture · Graphic design · Figure skating",
  EMAIL: "pipichun2@gmail.com",

  // Portrait image — put file in public/images/ and set the path here.
  // Set to "" to show the placeholder box instead.
  PORTRAIT: "/images/vanillaSky00-portrait.jpg",

  // Social links
  SOCIAL: {
    instagram: "https://instagram.com/sukag1m_",   
    linkedin: "https://www.linkedin.com/in/kai-chun-su-5507b4307",
    github: "https://github.com/vanillaSky00",         
  },

  // Navigation links
  NAV: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Writing", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ],
};

// Prepend Astro's base path to an internal path.
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
