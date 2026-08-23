import { defineCollection, z } from 'astro:content';

const heroVideo = z.object({
  src: z.string(),
  poster: z.string().optional(),
  caption: z.string().optional(),
});

const writing = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    updatedDate: z.date().optional(),
    description: z.string(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
    coverImage: z.string().optional(),
    heroVideo: heroVideo.optional(),
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
    coverImage: z.string().optional(),
    heroVideo: heroVideo.optional(),
    draft: z.boolean().optional().default(false),
    featured: z.boolean().optional().default(false),
    order: z.number().optional().default(99), // controls sort order on homepage
    link: z.string().optional(),
    github: z.string().optional(),
  }),
});

export const collections = { writing, projects };
