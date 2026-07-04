# The Unhurried Traveler

A premium, interactive travel platform for solo European journeys — built with
[Astro](https://astro.build), Tailwind CSS, and MDX. Deep teals, glassmorphic
panels, an interactive destination chart, and content driven entirely by flat
files: **no code required to publish**.

---

## ✍️ Publishing content (no code needed)

Everything on the site is generated from plain text files. Drop a file in,
push, and the site rebuilds itself.

### Add a journal entry

Create a new `.md` file in `src/content/blog/` — the filename becomes the web
address (e.g. `my-week-in-provence.md` → `/blog/my-week-in-provence/`).
Copy this template into the top of the file, then write your story below it
in plain paragraphs:

```yaml
---
title: "My Week in Provence"
pubDate: 2026-07-01
description: "One or two sentences that appear on the entry's card and at the top of the page."
coverImage: "/images/covers/hero.svg"        # any image placed in public/images/
youtubeId: ""                                 # optional: the part after watch?v= in a YouTube link
coordinates: [5.05, 43.83]                    # optional: [longitude, latitude]
tags: ["France", "Solo Travel"]
sponsors: ["booking-com"]                     # optional: matching file names from src/content/gear/
featured: false
---

Your story starts here. Blank line between paragraphs.

## A section heading

- A bullet point
- Another one

> A pull quote looks like this.
```

### Add a pin to the interactive map

Create a `.json` file in `src/content/destinations/`. The pin lands on the
map automatically from real longitude/latitude (find them by right-clicking
in Google Maps — note the order is **[longitude, latitude]**):

```json
{
  "name": "Provence",
  "country": "France",
  "coordinates": [5.05, 43.83],
  "summary": "Two or three sentences shown when the pin is selected.",
  "bestSeason": "May–June, September",
  "pace": "gentle",
  "highlights": ["First thing not to miss", "Second thing", "Third thing"],
  "relatedPost": "my-week-in-provence"
}
```

`pace` must be `gentle`, `moderate`, or `active`. `relatedPost` (optional) is
the filename of a journal entry, without `.md`.

### Add a gear / partner item

Create a `.json` file in `src/content/gear/`:

```json
{
  "name": "Item Name",
  "category": "Videography",
  "tagline": "One short punchy line",
  "description": "Two or three sentences about why it earns its place in the bag.",
  "link": "https://example.com",
  "sponsor": true,
  "icon": "camera"
}
```

`icon` is one of: `drone`, `camera`, `bag`, `shoes`, `audio`, `power`, `stay`.

### Add images

Put image files (`.jpg`, `.png`, `.svg`, `.webp`) in `public/images/` and
reference them as `/images/filename.jpg` in the frontmatter above.

---

## 🚀 Publishing the site on GitHub Pages

The repository is pre-configured for a GitHub Pages project site named
**TRVLWEB**:

1. Create a repository called `TRVLWEB` on GitHub and push this code to its
   `main` branch.
2. In the repository settings → **Pages**, set **Source** to **GitHub Actions**.
3. Done — every push to `main` rebuilds and publishes the site at
   `https://<your-username>.github.io/TRVLWEB/` via
   `.github/workflows/deploy.yml`.

Two values in `astro.config.mjs` control the address:

```js
site: 'https://wefeltlikeit-sketch.github.io',
base: '/TRVLWEB',
```

- Different repository name? Change `base` to match (e.g. `/MyRepo`).
- Custom domain, Netlify, or Vercel? Delete the `base` line and set `site`
  to the full domain.

---

## 🧞 Commands

| Command           | Action                                        |
| :---------------- | :-------------------------------------------- |
| `npm install`     | Install dependencies                          |
| `npm run dev`     | Start the local dev server                    |
| `npm run build`   | Build the production site to `./dist/`        |
| `npm run preview` | Preview the production build locally          |

## 🗺️ How the site is organised

```
src/
├── content/
│   ├── blog/           ← journal entries (.md) — this is where you write
│   ├── destinations/   ← map pins (.json)
│   └── gear/           ← kit & partner items (.json)
├── components/         ← post cards, the Europe chart, gear cards…
├── layouts/            ← page frame (header, footer, theme)
├── pages/              ← the routes: /, /blog/, /destinations/, /gear/, /about/
└── styles/global.css   ← the design system (teal/green palette, glass, motion)
public/images/covers/   ← cover artwork
```
