// ============================================================
// PROJECTS DATA — add/edit your projects here
// ============================================================

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  year: string;
  category: string;
  tags: string[];
  description: string;
  longDescription: string;
  // Replace placeholder paths with real image paths in /public/images/
  coverImage: string;
  images: string[];
  slug: string;
  featured: boolean;
  link?: string;
  github?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "yuzuru",
    title: "Yuzuru Hanyu Gallery",
    subtitle: "Website",
    year: "2026",
    category: "Web Design",
    tags: ["React", "Web Design", "Frontend", "Gallery"],
    description: "An immersive gallery website celebrating figure skater Yuzuru Hanyu.",
    longDescription:
      "A full-stack web experience built to honour the artistic career of Yuzuru Hanyu. Features dynamic image galleries, programme history, and biographical narratives. Built with React and custom CSS animations.",
    coverImage: "/images/yuzuru-cover.png",
    images: ["/images/yuzuru-01.png", "/images/yuzuru-02.png"],
    slug: "yuzuru-hanyu-gallery",
    featured: true,
    link: "https://vanillasky00.github.io/yuzuru-hanyu-gallery/",
    github: "https://github.com/vanillaSky00/yuzuru-hanyu-gallery",
  },
  {
    id: "paprika",
    title: "Paprika",
    subtitle: "Your Reliable Hamburger Worker Agent",
    year: "2025",
    category: "Agent / 3D",
    tags: ["AI Agent", "Unity", "3D", "Simulation", "Full-stack", "Game Design"],
    description: "An AI agent that navigates a 3D kitchen to assemble your perfect burger.",
    longDescription:
      "Paprika is an autonomous AI hamburger worker built in a fully simulated 3D kitchen environment. The agent uses vision-based planning to interpret orders, move between stations, and assemble meals in real time. Built as an exploration of grounded AI embodiment.",
    coverImage: "/images/paprika-cover.png",
    images: ["/images/paprika-01.jpg", "/images/paprika-02.jpg"],
    slug: "paprika-hamburger-agent",
    featured: true,
    github: "https://github.com/vanillaSky00/paprika",
  },
  {
    id: "mewi",
    title: "Mewi",
    subtitle: "Interactive Stray Cat Agent Interface",
    year: "2026",
    category: "Agent / 3D",
    tags: ["AI", "Unity", "3D", "Agent", "Full-stack", "HCI", "In Progress"],
    description: "An interactive agent interface simulating stray cat behaviour in a 3D urban space.",
    longDescription:
      "Mewi is an ongoing research project exploring autonomous agents with emergent social behaviour modelled on stray cats. The simulation renders a miniature city block where multiple cat agents navigate, rest, and interact. Still in progress.",
    coverImage: "/images/mewi-cover.jpg",
    images: ["/images/mewi-01.jpg"],
    slug: "mewi-cat-agent",
    featured: true,
    link: undefined,
    github: "https://github.com/MewiLab/mewi",
  },
  {
    id: "graph-design",
    title: "Graph Design",
    subtitle: "2023–2026",
    year: "2023–2026",
    category: "Graphic Design",
    tags: ["Poster", "Typography", "Branding", "CTF"],
    description: "A collection of graphic work spanning event posters, CTF branding, and editorial design.",
    longDescription:
      "An ongoing body of graphic design work including posters for HITCON and NCKUCTF cybersecurity events, village identity systems, and typographic experiments. The work sits at the intersection of digital subculture aesthetics and grid-based Swiss design.",
    coverImage: "/images/graphdesign-cover.png",
    images: ["/images/graphdesign-01.png", "/images/graphdesign-02.png", "/images/graphdesign-03.png", "/images/graphdesign-04.png"],
    slug: "graph-design",
    featured: false,
  },
    {
    id: "dadaocheng",
    title: "Dadaocheng Dock",
    subtitle: "Taipei",
    year: "2025",
    category: "Photography",
    tags: ["Photography", "Urban", "Documentary"],
    description: "Golden hour at the historic Dadaocheng waterfront.",
    longDescription:
      "A photographic study of light, movement, and the quiet drama of urban life at Taipei's oldest riverside district. Captured during a single golden hour session in 2025.",
    coverImage: "/images/dadaocheng-cover.jpg",
    images: ["/images/dadaocheng-01.jpg", "/images/dadaocheng-02.jpg"],
    slug: "dadaocheng-dock",
    featured: true,
  },
];

export const CATEGORIES = [...new Set(PROJECTS.map((p) => p.category))];
