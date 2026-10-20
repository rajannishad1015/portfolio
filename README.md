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

## Editing the content

Everything on the page comes from `src/data/content.ts`:

- `profile` — name, roles, summary, about copy, soft skills
- `links` — email, phone, GitHub, LinkedIn, resume path
- `skillGroups` — the five toolkit cards
- `projects` — the four project cards, their bullets, metrics and tags
- `education` / `certifications` — timeline entries and badges
- `stats`, `navLinks`, `marqueeItems` — supporting lists

### Project links

Each project carries `links.live` and `links.source`. They are currently `"#"`, which renders an honest **Link coming soon** chip. Replace `"#"` with a real URL and the chip becomes a clickable button automatically.

## Design system

Tokens live in `src/index.css` under Tailwind v4's `@theme`:

| Token | Value |
| --- | --- |
| `--color-cream` | `#FFFDF5` |
| `--color-ink` | `#1E293B` |
| `--color-accent` | `#8B5CF6` |
| `--color-pop` | `#F472B6` |
| `--color-sun` | `#FBBF24` |
| `--color-mint` | `#34D399` |
| `--shadow-pop` | `4px 4px 0 0 #1E293B` |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

Motion keyframes: `wiggle`, `float-y`, `float-x`, `pop-in`, `marquee`, `marquee-rev`, `blob`, `confetti`, `role-swap`. Every animation is disabled under `prefers-reduced-motion: reduce`.

## Deploying

The build is a fully static site in `dist/`.

- **Vercel** — import the repo, framework preset *Vite*, build `npm run build`, output `dist`
- **Netlify** — build `npm run build`, publish directory `dist`
- **GitHub Pages** — run `npm run build` and publish `dist/` on a `gh-pages` branch
