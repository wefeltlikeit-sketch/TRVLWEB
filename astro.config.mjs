// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project-site settings. If you publish at a custom domain
  // (or on Netlify/Vercel), delete the `base` line and update `site`.
  site: 'https://wefeltlikeit-sketch.github.io',
  base: '/TRVLWEB',

  integrations: [mdx()],

  vite: {
    plugins: [tailwindcss()]
  }
});
