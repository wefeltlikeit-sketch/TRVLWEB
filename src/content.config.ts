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
    relatedMarketFinds: z.array(z.string()).default([]), // marketFinds entry ids
    relatedVideos: z.array(z.string()).default([]), // videos entry ids
    relatedDestination: z.string().optional(), // destinations entry id
  }),
});

/**
 * "Found at the Market" — anything discovered, purchased, tasted, learned,
 * photographed, or regrettably surrendered to customs at a European market.
 */
const marketFinds = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/markets' }),
  schema: z.object({
    name: z.string(),
    market: z.string(), // e.g. "Saturday market, Apt"
    town: z.string(),
    country: z.string(),
    date: z.coerce.date(),
    category: z.enum(['Food', 'Cheese', 'Antiques', 'Crafts', 'Souvenirs', 'Advice', 'Customs stories']),
    price: z.string().optional(), // "€8, when remembered"
    description: z.string(),
    outcome: z
      .enum(['Brought home', 'Eaten immediately', 'Customs casualty', 'Still searching', 'Worth the suitcase space', 'Should have bought two'])
      .optional(),
    vendorNote: z.string().optional(),
    images: z.array(z.string()).min(1),
    featured: z.boolean().default(false),
    relatedPost: z.string().optional(), // blog entry id
    relatedDestination: z.string().optional(), // destinations entry id
    relatedVideo: z.string().optional(), // videos entry id
  }),
});

/** Films — drone footage, scenic drives, village walks, market mornings. */
const videos = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/videos' }),
  schema: z.object({
    title: z.string(),
    youtubeId: z.string().optional(), // absent while footage is still being edited
    thumbnail: z.string(),
    date: z.coerce.date(),
    location: z.string(),
    country: z.string(),
    duration: z.string(), // "4:38"
    type: z.enum(['Drone', 'Scenic drive', 'Village walk', 'Market morning', 'Short film']),
    description: z.string(),
    featured: z.boolean().default(false),
    relatedPost: z.string().optional(), // blog entry id
    relatedDestination: z.string().optional(), // destinations entry id
    relatedMarketFind: z.string().optional(), // marketFinds entry id
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

export const collections = { blog, destinations, gear, marketFinds, videos };
