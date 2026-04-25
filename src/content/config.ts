import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    year: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    description: z.string(),       // short — shown on card
    coverImage: z.string(),
    images: z.array(z.string()).optional().default([]),
    videos: z.array(z.object({
      src: z.string(),                 // path under /public, e.g. "/videos/paprika-demo.mp4"
      poster: z.string().optional(),   // optional thumbnail image path
      caption: z.string().optional(),
    })).optional().default([]),
    featured: z.boolean().optional().default(false),
    order: z.number().optional().default(99), // controls sort order on homepage
    link: z.string().optional(),
    github: z.string().optional(),
  }),
});

export const collections = { blog, projects };
