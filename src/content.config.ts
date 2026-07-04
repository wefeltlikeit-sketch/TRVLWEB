import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content is entirely file-driven. To publish:
 *   - a journal entry  -> drop a .md/.mdx file into src/content/blog/
 *   - a map pin        -> drop a .json file into src/content/destinations/
 *   - a gear item      -> drop a .json file into src/content/gear/
 * See README.md for copy-paste templates.
 */

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    coverImage: z.string(),
    youtubeId: z.string().optional(),
    coordinates: z.tuple([z.number(), z.number()]).optional(), // [lon, lat]
    tags: z.array(z.string()).default([]),
    sponsors: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const destinations = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/destinations' }),
  schema: z.object({
    name: z.string(),
    country: z.string(),
    coordinates: z.tuple([z.number(), z.number()]), // [lon, lat]
    summary: z.string(),
    bestSeason: z.string(),
    pace: z.enum(['gentle', 'moderate', 'active']),
    highlights: z.array(z.string()).default([]),
    relatedPost: z.string().optional(), // blog entry id, e.g. "solitude-in-the-dordogne"
  }),
});

const gear = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/gear' }),
  schema: z.object({
    name: z.string(),
    category: z.string(),
    tagline: z.string(),
    description: z.string(),
    link: z.string().url().optional(),
    sponsor: z.boolean().default(false),
    icon: z.enum(['drone', 'camera', 'bag', 'shoes', 'audio', 'power', 'stay']).default('bag'),
  }),
});

export const collections = { blog, destinations, gear };
