# Rajan Nishad — Portfolio

A single-page, interactive portfolio built on the **Playful Geometric** design system: primitive shapes, hard offset shadows, pattern fills and bouncy CSS motion.

- **Stack:** Vite 8 · React 19 · TypeScript 5.9 · Tailwind CSS 4
- **Motion:** Pure CSS keyframes + IntersectionObserver — no animation library
- **Content:** All copy lives in `src/data/content.ts`

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Type-check with `tsc --noEmit`, then build the static site to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint over the project |
| `npm test` | Run the Vitest suite once |
| `npm run audit` | Headless-browser check for horizontal overflow, unrevealed content, a covered portrait caption and a collapsed mobile menu, at 360 / 390 / 768 / 1024 / 1440 px |
| `npm run shots` | Capture reference screenshots into `shots/` |
| `npm run og` | Regenerate `public/og-image.png` from the live hero |

`audit` and `shots` drive your locally installed Chrome through `puppeteer-core` — no browser is downloaded. If Chrome is not in a standard location, point `CHROME_PATH` at it. Both expect the site to be served (run `npm run build && npm run preview` first); override the URL with `SITE_URL`.

## Editing the content

Everything on the page comes from `src/data/content.ts`:

- `profile` — name, roles, greeting, role line, intro copy, summary, about, soft skills
- `heroStats` — the three headline statistics in the hero
- `floatingSkills` — the three sticker cards around the portrait
- `socials` — the circular social buttons and their destinations
- `heroNotes` — the two handwritten notes
- `links` — email, phone, GitHub, LinkedIn, resume path
- `skillGroups` — the five toolkit cards
- `projects` — the four project cards, their bullets, metrics and tags
- `education` / `certifications` — timeline entries and badges
- `stats`, `navLinks`, `marqueeItems` — supporting lists

### Project links

Each project carries `links.live` and `links.source`. They are currently `"#"`, which renders an honest **Link coming soon** chip. Replace `"#"` with a real URL and the chip becomes a clickable button automatically.

### The hero portrait

The hero shows a **placeholder frame**, not a stock photo or a generated face. To use a real photo:

1. Put the PNG at `public/images/rajan-portrait.png`.
2. In `src/data/content.ts`, set `profile.portraitSrc` to `'/images/rajan-portrait.png'`.

The frame renders the image with `object-fit: contain`, so nothing is cropped, stretched or distorted, and a transparent PNG keeps its transparency. `profile.portraitPath` is the path shown in the placeholder, so change it if you use a different filename.

## Design system

Tokens live in `src/index.css` under Tailwind v4's `@theme`:

| Token | Value |
| --- | --- |
| `--color-cream` | `#FFFDF5` |
| `--color-ink` | `#1E293B` |
| `--color-accent` | `#7C3AED` |
| `--color-pop` | `#F472B6` |
| `--color-sun` | `#FBBF24` |
| `--color-mint` | `#34D399` |
| `--shadow-pop` | `4px 4px 0 0 #1E293B` |
| `--shadow-sticker` | `6px 6px 0 0 #1E293B` |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `--ease-out-soft` | `cubic-bezier(0.22, 1, 0.36, 1)` |

> The accent is `#7C3AED` rather than the system's `#8B5CF6`. The brighter violet only reaches **4.2:1** against the cream page and against white button text, which fails WCAG AA. `#7C3AED` clears AA everywhere (5.6:1 and 5.7:1) and is visually the same violet. Change `--color-accent` in `src/index.css` if you prefer the original.

Motion keyframes: `enter-up`, `enter-scale`, `enter-down`, `wave`, `wiggle`. Every animation is disabled under `prefers-reduced-motion: reduce`, where the entrance delays are also zeroed so nothing is ever left invisible.

## Deploying

The build is a fully static site in `dist/`.

- **Vercel** — import the repo, framework preset *Vite*, build `npm run build`, output `dist`
- **Netlify** — build `npm run build`, publish directory `dist`
- **GitHub Pages** — run `npm run build` and publish `dist/` on a `gh-pages` branch
