# Playful Geometric Portfolio — Design Spec

- **Date:** 2026-10-20
- **Owner:** Rajan Nishad
- **Location:** `C:\Users\rajan\Downloads\rajan-nishad-portfolio`
- **Status:** Approved

## 1. Goal

A single-page, interactive, premium portfolio site for Rajan Nishad (Data Science student, Kes Shroff College, Mumbai) built on the **Playful Geometric** design system. It is a new, standalone project — separate from the existing Next.js site at `rajann.me` (`C:\Users\rajan\Downloads\web2\portfolio`), which is not modified.

Success criteria:

1. Opens with `npm install && npm run dev`; production build passes `tsc` + `vite build` with zero errors.
2. Every claim, project, metric, certification and link on the site traces back to the real resume.
3. The Playful Geometric system is implemented literally — tokens, hard shadows, primitive shapes, pattern fills, bouncy motion.
4. Works on 375 px, 768 px and 1440 px without layout breakage or horizontal scroll.
5. Respectful of `prefers-reduced-motion` and keyboard-navigable with visible focus.

## 2. Scope

### In scope

- Nav, Hero, Skills, Projects, Education, Certifications, About, Contact, Footer.
- Scroll-reveal pop-in animations, hover/press micro-interactions, marquee, floating decoration, rotating role word.
- Static SEO meta (OG, Twitter, JSON-LD `Person`), favicon, downloadable resume.
- README with local-run and deploy instructions; `.gitignore`; git repo with an initial commit.

### Out of scope

- Backend, contact form submission, CMS, analytics beyond a static tag, blog, multi-page routing, i18n.
- Replacing or editing the existing `rajann.me` Next.js portfolio.
- 3D/WebGL hero, canvas particle systems, GSAP/Framer Motion, and any runtime dependency beyond `react`, `react-dom` and `lucide-react`.

## 3. Stack

| Concern | Choice | Why |
|---|---|---|
| Build tool | Vite 8.3.x | Fast dev server, zero-config TS, simple static output. Requires Node 20.19+ / 22.12+; this machine runs Node 24.19. |
| UI | React 19.3 + TypeScript 5.9 | Component boundaries match the design system's reusable sticker/button primitives; TS keeps the content model honest. TypeScript is pinned to 5.9.x because `typescript-eslint` 8.72 declares `typescript >=4.8.4 <6.1.0` and does not yet support TypeScript 7. |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` | The design system is expressed in Tailwind token form; v4 `@theme` maps tokens to CSS variables 1:1. |
| Motion | Pure CSS keyframes + `IntersectionObserver` | The system's motion is specified in CSS terms (`cubic-bezier(0.34,1.56,0.64,1)`, hard shadows, transforms). No animation library needed. |
| Fonts | `@fontsource/outfit`, `@fontsource/plus-jakarta-sans` | Self-hosted, offline-safe, no FOUT, no third-party request. |
| Icons | `lucide-react` 0.562.0, stroke-width 2.5 | Matches the specified iconography exactly. Pinned to 0.562.0 because lucide-react 1.x removed the `Github` and `Linkedin` brand glyphs, which the contact section needs. |
| Runtime deps | `react`, `react-dom`, `lucide-react` | The icon set is part of the specified iconography, so it ships. No animation or UI library. |

Rejected alternatives:

- **Motion / Framer Motion** (~35 KB gzip) — redundant; CSS overshoot already delivers the specified bounce.
- **GSAP + ScrollTrigger** (~70 KB gzip) — built for cinematic scrollytelling; conflicts with a sticker-book aesthetic.
- **Next.js** — heavier than needed for a one-page static site; the existing portfolio already covers that stack.

## 4. Design system implementation

### 4.1 Tokens — `src/index.css`, Tailwind v4 `@theme`

Colors (light mode only):

| Token | Value | Role |
|---|---|---|
| `--color-cream` | `#FFFDF5` | Page background (warm paper) |
| `--color-ink` | `#1E293B` | Foreground / dark borders / shadow color |
| `--color-muted` | `#F1F5F9` | Muted surfaces |
| `--color-muted-foreground` | `#64748B` | Secondary text |
| `--color-accent` | `#8B5CF6` | Primary brand / focus ring |
| `--color-accent-foreground` | `#FFFFFF` | Text on accent |
| `--color-pop` | `#F472B6` | Hot pink (secondary) |
| `--color-sun` | `#FBBF24` | Amber (tertiary) |
| `--color-mint` | `#34D399` | Emerald (quaternary) |
| `--color-line` | `#E2E8F0` | Borders |
| `--color-card` | `#FFFFFF` | Card surface |
| `--color-paper` | `#FFFFFF` | Input surface |

Usage rule: `accent` for primary actions only. `pop` / `sun` / `mint` rotate for decorative shapes, card headers, icons and emphasised words — a "confetti" effect, never a second primary.

Type:

- `--font-display`: Outfit — headings, 700/800.
- `--font-body`: Plus Jakarta Sans — body, 400/500.
- Scale ratio 1.25 (major third).

Shape:

- `--radius-sm: 8px`, `--radius-md: 16px`, `--radius-lg: 24px`, `--radius-full: 9999px`.
- Default border width `2px` in `--color-ink`.
- Blob radius via arbitrary values: `rounded-t-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-none` (speech bubble) and `rounded-t-full rounded-b-none` (arch).

Shadows (hard, no blur):

| Token | Value | Use |
|---|---|---|
| `--shadow-pop` | `4px 4px 0 0 #1E293B` | Buttons, primary cards |
| `--shadow-pop-hover` | `6px 6px 0 0 #1E293B` | Button hover (shadow extends) |
| `--shadow-pop-active` | `2px 2px 0 0 #1E293B` | Button press (shadow shrinks) |
| `--shadow-pop-lg` | `8px 8px 0 0 #E2E8F0` | Sticker cards (soft variant) |
| `--shadow-pop-pink` | `8px 8px 0 0 #F472B6` | Featured project card |
| `--shadow-pop-mint` | `8px 8px 0 0 #34D399` | Alternate featured variant |
| `--shadow-pop-sun` | `8px 8px 0 0 #FBBF24` | Alternate featured variant |

Hover grows a hard shadow to `6px 6px`; active presses to `2px 2px`.

Motion:

- `--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)`; standard transitions `duration-300`.
- Keyframes: `wiggle` (0 → 3deg → −3deg → 0), `float-y`, `float-x`, `pop-in` (scale .8 → 1), `marquee` (translateX 0 → −50%), `blob-morph` (border-radius morph), `confetti-drift` (slow translate + rotate), `role-swap` (slide + blur out/in).
- All animations disabled under `@media (prefers-reduced-motion: reduce)`.

Textures: dot-grid background (radial-gradient SVG data URI, strictly formed), diagonal stripes, squiggle SVG dividers, confetti shapes.

### 4.2 Components

- **CandyButton** — primary: `bg-accent`, white bold text, `rounded-full`, `2px` ink border, `--shadow-pop`; hover `translate(-2px,-2px)` + `6px 6px` shadow; active `translate(2px,2px)` + `2px 2px`; optional icon in a white circle. Secondary variant: transparent bg, ink border, no shadow, fills `--color-sun` on hover.
- **StickerCard** — white bg, `2px` ink border, `rounded-xl`, `--shadow-pop-lg`; hover `rotate(-1deg) scale(1.02)`; title in Outfit bold; icon in a floating circle that sits half-in / half-out of the top border; optional coloured header band.
- **Pill** — small rounded-full tag with tinted background and ink border.
- **Squiggle** — inline SVG wavy path used as a section divider / heading underline.
- **SectionTitle** — eyebrow label (uppercase, tracked), display heading, squiggle underline, optional lead paragraph.
- **Marquee** — infinite scrolling text strip; two rows scroll in opposite directions; pauses on hover.
- **FloatingShapes** — absolutely positioned decorative primitives behind the content layer; `aria-hidden`; hidden below 768 px.

### 4.3 Icons

`lucide-react`, `strokeWidth={2.5}`, round caps and joins. Icons are never free-floating: each sits inside a coloured circle (white glyph on colour, or ink glyph on light tint).

## 5. Page structure

One route (`/`), one scrolling document, sections in this order.

**Nav, Hero, About, Skills, Projects, Education, Certifications, Contact, Footer.**

The nav link order (About → Skills → Projects → Education → Contact) matches the page order top to bottom, so the "active section" highlight always agrees with where the reader actually is. Certifications sits between Education and Contact and is reachable by scrolling; it is deliberately left out of the nav bar to keep it to five links.

### 5.1 Nav

Sticky top bar, `max-w-[90rem]` container.

- **Left — brand lock-up** (`hero/BrandLogo.tsx`): "Rajan" in violet with a hand-drawn yellow underline beneath it, "Nishad" in deep navy, Outfit ExtraBold, 28 px on desktop, plus two or three short yellow accent strokes. The whole lock-up is a link to `#home`.
- **Centre — nav links**: Home, About, Skills, Projects, Education, Contact. Every one points at a real section id. Plus Jakarta Sans, medium weight, deep navy, no background. The active link is violet with a short violet underline; on hover the link turns violet, lifts 1 px and the underline scales in from the left.
- **Right — "Let's Connect →"**: violet pill, white text, 2px dark border, 4px hard dark shadow, with a white circular icon container holding a violet arrow. Hover lifts up-and-left 2px and extends the shadow to 6px; the arrow slides right. Links to `#contact`.
- On scroll the bar gains the cream translucent background, backdrop blur and a hard shadow. Below `lg` the links collapse into a menu button that opens a full-screen overlay listing the same anchors.

### 5.2 Hero

Two-column grid (1.02fr / 0.98fr) on `lg` and up, stacked below. Three layers: background decorations, copy and portrait, foreground stickers and notes.

**Left column**

1. Greeting — a waving hand emoji and "Hello, I'm".
2. `h1` — "Rajan" (violet, ink cut-paper shadow) over "Nishad" (deep navy, violet cut-paper shadow), `clamp(3rem, 8.2vw, 6.5rem)`, leading 0.9, with three small yellow accent strokes beside the first line.
3. Role line — "Data Science Student | ML & Analytics | Full-Stack Builder".
4. Introduction paragraph, with "Data Scientist" set in violet semibold.
5. CTA row — "View My Work →" (violet pill, white circular arrow container, links to `#projects`) and "Download Resume ↓" (cream pill, 2px navy border, hard shadow, fills yellow on hover, links to `/resume.pdf`).
6. Statistic row — three groups separated by thin vertical dividers: a circular icon in pink/amber/mint, a large value, and a supporting label.
7. Social links — "Connect with me" and four circular icon buttons (Email, GitHub, LinkedIn, Website), each with an accessible name.

**Right column — the portrait stage**

- **Portrait frame** (`hero/PortraitPlaceholder.tsx`): an organic asymmetric border radius, a 2px dark border, and sketchy corner strokes drawn just outside the frame. The portrait itself is a **replaceable PNG placeholder** — `profile.portraitSrc` is `null`, so a neutral cream placeholder is shown with the path that the image should be dropped at. When a source is supplied the image renders with `object-fit: contain`, so nothing is cropped or stretched. No portrait is ever fabricated.
- **Background decorations** (`hero/GeometricDecorations.tsx` → `PortraitDecorations`): a large amber circle behind the portrait, a violet triangle at its upper left, a pink organic blob at its lower right, a mint squiggle along the circle's left edge, three dot-grid clusters, navy accent lines and a curved arrow. They are positioned inside the stage so they always align with the portrait.
- **Floating skill cards** (`hero/FloatingSkillCards.tsx`): three sticker cards (pink / amber / violet) with an icon bubble and a title, each rotated a couple of degrees, straightening and lifting on hover.
- **Handwritten notes** (`hero/HeroNotes.tsx`): "Keep Learning / Keep Growing" in Caveat with a violet squiggle underline and a curved arrow toward the portrait, and a mint sticker card reading "Better Data / Better Decisions".

**Page-edge decorations** (`SectionDecorations`): a yellow corner wedge, a small yellow diamond and a pink triangle, all confined to the outer margins so they can never land on the copy.

**Entrance motion** — staggered CSS keyframes: the navbar slides down, the greeting and heading lines rise, the paragraph and buttons rise, the portrait scales in from 0.96, the skill cards and notes fade in last. All of it is disabled under `prefers-reduced-motion: reduce`, where the delays are zeroed as well so nothing is ever left invisible.

### 5.3 Skills

Five StickerCards in a responsive grid (3 / 2 / 1 columns), each with a coloured header band rotating violet, pink, amber, mint, ink, and an icon in a floating circle on the border. A dashed SVG line connects the cards in the background.

Groups (from the resume):

1. **Data Analysis & Visualization** — Excel, Power BI, Tableau, Matplotlib, Seaborn, Plotly
2. **Database Management** — MySQL, PostgreSQL, Oracle, SQL Server
3. **Programming & Scripting** — Python (Pandas, NumPy, Scikit-learn, FastAPI), Java, C++, JavaScript, Next.js
4. **Cloud & DevOps** — AWS (SageMaker, EC2, S3, Lambda), Google Cloud, Git/GitHub, Vercel, Docker
5. **Soft Skills** — Problem-Solving, Critical Thinking, Communication, Attention to Detail

### 5.4 Projects

Four StickerCards. The first (Swara Digital) is **featured**: spans two columns, uses `--shadow-pop-pink`, and carries a rotated amber "Featured" star badge.

Each card: title, one-line blurb, three bullet highlights, a metric chip row, technology pills, and a link row.

| Project | Stack | Metrics shown | Links |
|---|---|---|---|
| Swara Digital — Music Distribution Platform | Next.js, Node.js, Supabase, Razorpay | 150+ global stores, zero commission | Live + GitHub (placeholder) |
| Sales Analysis & Forecasting Dashboard | Power BI | 90% forecast accuracy, 25% reporting efficiency | GitHub (placeholder) |
| Mumbai House Price Predictor | Java (Swing), Python, Scikit-learn, Pandas | 20+ localities | GitHub (placeholder) |
| Churn Prediction Model for Subscription Service | Python, Power BI | 85% accuracy, 10% churn reduction over 6 months | GitHub (placeholder) |

Project bullet content is taken verbatim-in-substance from the resume (no invented numbers).

### 5.5 Education

Three-entry timeline on a vertical squiggle path, with arch-shaped (`rounded-t-full rounded-b-none`) year badges.

- Kes Shroff College, Mumbai — B.Sc. Data Science — 2023 → 2027 (Expected)
- HSC, Maharashtra Board, Mumbai — Higher Secondary Certificate — 2024
- SSC, Maharashtra Board, Mumbai — Secondary School Certificate — 2022

### 5.6 Certifications

Eight rotated StickerCards (each rotated between −3deg and +3deg) in a responsive grid. Each shows the issuer's initial in a coloured circle, the certificate name and the issuer.

- Google — Google Data Analytics Professional Certificate
- IBM — Machine Learning With Python
- IBM — Python for Data Science
- IBM — AI & Development
- Harvard University — CS50's Introduction to AI
- Columbia University — Prompt Engineering
- Oracle Cloud Infrastructure — AI Foundations Associate
- Oracle Cloud Infrastructure — Data Science

Hovering a badge triggers the `wiggle` keyframe.

### 5.7 About

Two columns. Left: an About copy block on a dot-grid panel with soft-skill pills. Right: a stack of stat tiles — 4 Projects, 8 Certifications, 150+ Stores distributed, 20+ Mumbai localities modelled.

### 5.8 Contact

A single large card with blob radius (speech-bubble corners). Contains a short line of copy ("Let's build something worth measuring."), and four CandyButtons: Email (`rajannishad1015@gmail.com`), Phone (`+91 96198 72801`), GitHub, LinkedIn. Email and phone are `mailto:` / `tel:` links. **No contact form** — per decision, contact is by direct link only.

### 5.9 Footer

Squiggle divider, copyright line, "Back to top" link, and a build credit.

## 6. Content model

`src/data/content.ts` is the single source of truth, fully typed and exported as named constants:

```ts
export const profile  // name, headline, roles[], summary, availability
export const links    // email, phone, github, linkedin, site, resumeHref
export const stats    // label/value tiles for About
export const skillGroups  // id, title, color, icon, items[]
export const projects     // title, blurb, bullets[], metrics[], tags[], links{}, featured
export const education    // institution, qualification, period, detail
export const certifications // issuer, name, color, initial
```

Components import from this file only. Editing content never requires touching a component. Project URLs that are not known are set to `"#"` with a `// TODO: replace with real URL` comment in that file, and are the only placeholders in the project.

## 7. Behaviour

- **Scroll reveal.** `useReveal` registers an `IntersectionObserver` (threshold 0.2). When a target enters, `data-revealed="true"` is set; CSS animates `scale(.8) → scale(1)` with `--ease-bounce`. Stagger is applied with an inline `--reveal-delay` custom property derived from the element's index within its group.
- **Hover / press.** Buttons translate and grow/shrink their hard shadow; cards rotate −1deg and scale 1.02; icons wiggle; the marquee pauses.
- **Marquee.** Two rows, `translateX(0 → −50%)`, 28 s and 34 s linear infinite, opposite directions, paused on hover.
- **Floating shapes.** 10 decorative primitives at fixed-but-seeded positions, each with a distinct float keyframe, 8–14 s alternate ease-in-out, disabled below 768 px and under `prefers-reduced-motion`.
- **Rotating role word.** CSS animation cycling 4 words at 2.4 s each; the animation is paused and the first word shown as static under `prefers-reduced-motion`.
- **Active nav.** `IntersectionObserver` over the section elements sets the active link.
- **Smooth scroll.** `scroll-behavior: smooth` on `html`, plus `scroll-margin-top` on every section to clear the sticky nav.

## 8. Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), exactly one `h1`.
- Every decorative shape, dot grid and confetti element is `aria-hidden="true"`.
- Icon-only buttons carry `aria-label`; all links have discernible text.
- Visible focus: 3 px `--color-accent` outline with 2 px offset, never removed.
- Skip-to-content link as the first focusable element.
- Text contrast meets AAA on cream/white (ink `#1E293B` on cream `#FFFDF5`).
- Colour is never the sole carrier of meaning — shapes, borders and labels accompany it.
- `prefers-reduced-motion: reduce` removes all animation and transition, and reveals content immediately.

## 9. Responsive strategy

| Breakpoint | Behaviour |
|---|---|
| `< 768px` | Everything stacks. Pop shadows reduce 4 px → 2 px. Floating shapes hidden. Horizontal squiggles become vertical dividers. Marquee font shrinks. Buttons stay ≥ 48 px tall. Nav collapses to the overlay menu. |
| `768–1023px` | Two-column grids. Floating shapes still hidden. |
| `≥ 1024px` | Full 6/6 hero, 3-column skill and certification grids, 2-column project grid with the featured card spanning both columns. |

Container is `max-w-6xl`. Vertical section rhythm is `py-24` (96 px) on desktop, `py-16` on mobile.

## 10. Project layout

```
rajan-nishad-portfolio/
├── docs/superpowers/specs/2026-10-20-playful-geometric-portfolio-design.md
├── public/
│   ├── favicon.svg
│   └── resume.pdf
├── src/
│   ├── components/
│   │   ├── ui/ (CandyButton, StickerCard, Pill, Squiggle, SectionTitle, Marquee, DotGrid, Blob)
│   │   ├── Nav.tsx  Hero.tsx  FloatingShapes.tsx  Skills.tsx  Projects.tsx
│   │   ├── Education.tsx  Certifications.tsx  About.tsx  Contact.tsx  Footer.tsx
│   ├── data/content.ts
│   ├── hooks/useReveal.ts
│   ├── App.tsx  main.tsx  index.css
├── .gitignore  index.html  package.json  tsconfig.json
├── eslint.config.js  vite.config.ts  README.md
```

A single `tsconfig.json` covers `src/` and `vite.config.ts`; there is no separate `tsconfig.node.json`, and `npm run build` runs `tsc --noEmit` before `vite build`.

## 11. Verification

1. `npm run build` — `tsc -b` then `vite build` — completes with zero errors and zero TypeScript errors.
2. `npm run lint` — ESLint reports zero errors.
3. `npm run dev` — page loads with no console errors or React warnings.
4. Manual viewport check at 375 px, 768 px and 1440 px: no horizontal scroll, no overlapping content, nav collapses correctly.
5. Keyboard-only pass: skip link → nav → all section anchors → contact links, with a visible focus ring at every stop.
6. `prefers-reduced-motion: reduce` emulation: no motion, all content visible.

## 12. Open items

- **Project URLs.** Per-project live/GitHub URLs are unknown. They are placeholders (`"#"` + TODO comment) in `src/data/content.ts` and must be filled in by the owner.
- **Resume file.** `public/resume.pdf` is a copy of `C:\Users\rajan\Downloads\RajanNishad.pdf`.
- **Deployment target.** Not decided. The README documents Vercel, Netlify and GitHub Pages; the project is a fully static build, so any of the three works with no configuration beyond the build command and publish directory (`dist`).
