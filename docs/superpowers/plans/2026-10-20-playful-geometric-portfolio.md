# Playful Geometric Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, interactive, premium portfolio site for Rajan Nishad on the Playful Geometric design system, using his real resume data.

**Architecture:** A static Vite + React 19 + TypeScript SPA. All content lives in one typed data module (`src/data/content.ts`); every section component reads from it and knows nothing about the resume. Styling is Tailwind CSS v4 with the design system mapped 1:1 into `@theme` tokens, plus a small set of hand-written CSS keyframes for the bouncy motion. Scroll-reveal and active-nav behaviour are two IntersectionObserver hooks. No animation library, no backend, no runtime dependency beyond `react`, `react-dom` and `lucide-react`.

**Tech Stack:** Vite 8.3, React 19.3, TypeScript 5.9, Tailwind CSS 4.3, Vitest 5, @testing-library/react 16, lucide-react 0.562, tailwind-merge 3.7, ESLint 10 flat config, @fontsource fonts.

**Spec:** `docs/superpowers/specs/2026-10-20-playful-geometric-portfolio-design.md`

---

## File Structure

| Path | Responsibility |
|---|---|
| `package.json` | Dependencies and scripts (`dev`, `build`, `lint`, `test`, `preview`). |
| `vite.config.ts` | Vite + React + Tailwind plugins, Vitest config (jsdom, setup file). |
| `tsconfig.json` | Single TS config covering `src/` and `vite.config.ts`. |
| `eslint.config.js` | ESLint 10 flat config. |
| `index.html` | Document shell, SEO/OG/Twitter meta, JSON-LD `Person`. |
| `public/favicon.svg` | "RN" mark in a violet circle. |
| `public/resume.pdf` | Copy of `C:\Users\rajan\Downloads\RajanNishad.pdf`. |
| `src/main.tsx` | React root, font imports, global stylesheet import. |
| `src/App.tsx` | Composes the page; skip link, nav, all sections, footer. |
| `src/index.css` | Tailwind import, `@theme` token layer, base styles, keyframes, reveal CSS, reduced-motion rules. |
| `src/data/content.ts` | Every string, list and link on the site. Single source of truth. |
| `src/data/content.test.ts` | Content integrity tests. |
| `src/lib/theme.ts` | The shared `AccentColor` union, used by both the content model and the UI primitives. |
| `src/lib/cn.ts` | `cn()` — a `tailwind-merge` wrapper so a consumer's `className` override always wins over a primitive's own classes. |
| `src/components/icons.ts` | `IconName` union + `ICONS` map from lucide-react. |
| `src/components/ui/CandyButton.tsx` | `CandyButton` (button) and `CandyLink` (anchor) primitives. |
| `src/components/ui/StickerCard.tsx` | Sticker card primitive. |
| `src/components/ui/Pill.tsx` | Small tag primitive. |
| `src/components/ui/Squiggle.tsx` | Inline SVG squiggle. |
| `src/components/ui/SectionTitle.tsx` | Eyebrow + heading + squiggle + lead. |
| `src/components/ui/Marquee.tsx` | Infinite scrolling text strip. |
| `src/components/ui/DotGrid.tsx` | Dot-grid background panel. |
| `src/components/ui/primitives.test.tsx` | Tests for every `ui/` primitive. |
| `src/hooks/useReveal.ts` | IntersectionObserver scroll-reveal hook. |
| `src/hooks/useActiveSection.ts` | IntersectionObserver active-nav hook. |
| `src/hooks/useReveal.test.tsx` | Hook tests. |
| `src/components/Nav.tsx` | Sticky nav, active link, mobile overlay menu. |
| `src/components/Nav.test.tsx` | Nav tests. |
| `src/components/Hero.tsx` | Hero section: intro + pure-geometry composition. |
| `src/components/FloatingShapes.tsx` | Decorative background primitives. |
| `src/components/Hero.test.tsx` | Hero tests. |
| `src/components/About.tsx` | About copy panel + stat tiles. |
| `src/components/About.test.tsx` | About tests. |
| `src/components/Skills.tsx` | Five skill sticker cards. |
| `src/components/Skills.test.tsx` | Skills tests. |
| `src/components/Projects.tsx` | Four project cards, one featured. |
| `src/components/Projects.test.tsx` | Projects tests. |
| `src/components/Education.tsx` | Three-step timeline. |
| `src/components/Education.test.tsx` | Education tests. |
| `src/components/Certifications.tsx` | Eight certification badges. |
| `src/components/Certifications.test.tsx` | Certifications tests. |
| `src/components/Contact.tsx` | Contact card with direct links. |
| `src/components/Contact.test.tsx` | Contact tests. |
| `src/components/Footer.tsx` | Footer. |
| `src/components/Footer.test.tsx` | Footer tests. |
| `src/App.test.tsx` | Whole-page smoke test. |
| `src/test/setup.ts` | Vitest setup: jest-dom matchers, cleanup, IntersectionObserver mock. |
| `src/test/mockIntersectionObserver.ts` | Controllable `IntersectionObserver` stub. |
| `README.md` | Run / build / deploy instructions. |

---

### Task 1: Scaffold the project and prove the test harness runs

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `eslint.config.js`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`
- Create: `src/test/setup.ts`
- Create: `src/test/mockIntersectionObserver.ts`
- Create: `src/App.test.tsx`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "rajan-nishad-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "npm run typecheck && vite build",
    "typecheck": "tsc --noEmit",
    "preview": "vite preview",
    "lint": "eslint .",
    "test": "vitest run"
  },
  "dependencies": {
    "@fontsource/outfit": "^5.3.0",
    "@fontsource/plus-jakarta-sans": "^5.3.0",
    "lucide-react": "^0.562.0",
    "react": "^19.3.1",
    "react-dom": "^19.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@tailwindcss/vite": "^4.3.3",
    "@testing-library/jest-dom": "^7.0.1",
    "@testing-library/react": "^16.3.3",
    "@testing-library/user-event": "^14.6.8",
    "@types/node": "^26.6.5",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.1.2",
    "eslint": "^10.13.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.7",
    "globals": "^17.13.0",
    "jsdom": "^30.1.3",
    "tailwindcss": "^4.3.3",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.72.0",
    "vite": "^8.3.4",
    "vitest": "^5.0.5"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: installs cleanly. `@vitejs/plugin-react` may print notes about optional peer dependencies (`oxc-transform-react`, `@rolldown/plugin-babel`, `babel-plugin-react-compiler`) — these are optional and safe to ignore.

- [ ] **Step 3: Write `vite.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
```

- [ ] **Step 4: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vite/client", "vitest/globals", "node"]
  },
  "include": ["src", "vite.config.ts"]
}
```

- [ ] **Step 5: Write `eslint.config.js`**

```js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.node,
    },
  },
  {
    files: ['vite.config.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
    },
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
);
```

- [ ] **Step 6: Write the test harness files**

`src/test/mockIntersectionObserver.ts`:

```ts
type ObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) => void;

export class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly root: Element | Document | null = null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;

  private readonly callback: ObserverCallback;

  constructor(callback: ObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.rootMargin = options?.rootMargin ?? '';
    this.thresholds = Array.isArray(options?.threshold)
      ? options.threshold
      : [options?.threshold ?? 0];
    MockIntersectionObserver.instances.push(this);
  }

  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  emit(entries: Partial<IntersectionObserverEntry>[]): void {
    this.callback(entries as IntersectionObserverEntry[], this);
  }

  static reset(): void {
    MockIntersectionObserver.instances = [];
  }

  static get last(): MockIntersectionObserver {
    const instance = MockIntersectionObserver.instances.at(-1);
    if (!instance) {
      throw new Error('No IntersectionObserver instance has been created');
    }
    return instance;
  }
}
```

`src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';
import { MockIntersectionObserver } from './mockIntersectionObserver';

beforeEach(() => {
  MockIntersectionObserver.reset();
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
```

- [ ] **Step 7: Write the failing smoke test `src/App.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the site name as the only h1', () => {
    render(<App />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Rajan Nishad');
  });
});
```

- [ ] **Step 8: Run the test and confirm it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module './App'` / `Failed to resolve import "./App"`.

- [ ] **Step 9: Write the minimal app shell**

`src/App.tsx`:

```tsx
export default function App() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <h1>Rajan Nishad</h1>
    </main>
  );
}
```

`src/main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource/outfit/700.css';
import '@fontsource/outfit/800.css';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import './index.css';

import App from './App';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element #root was not found in index.html');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

`src/index.css`:

```css
@import "tailwindcss";
```

`index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rajan Nishad</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 10: Run the test and confirm it passes**

Run: `npm test`
Expected: PASS — 1 test passed.

- [ ] **Step 11: Verify the build and lint pass**

Run: `npm run build`
Expected: `tsc --noEmit` succeeds, then `vite build` prints `dist/index.html` with a `✓ built in` line.

Run: `npm run lint`
Expected: no output, exit code 0.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite + React + Tailwind + Vitest project"
```

---

### Task 1a: Harden the IntersectionObserver stub and close the Task 1 review gaps

**Files:**
- Modify: `src/test/mockIntersectionObserver.ts`
- Create: `src/test/mockIntersectionObserver.test.ts`
- Modify: `package.json` (add a `typecheck` script)
- Modify: `eslint.config.js` (Node globals for `vite.config.ts`)
- Create: `public/favicon.svg`

**Why this task exists:** a code-quality review of Task 1 found three real correctness gaps in the shared `IntersectionObserver` stub — the artefact every later task depends on — plus a missing test for it. Fixing it now is far cheaper than after 15 tasks depend on it.

- [ ] **Step 1: Write the failing stub tests `src/test/mockIntersectionObserver.test.ts`**

```ts
import { describe, expect, it, vi } from 'vitest';
import { MockIntersectionObserver } from './mockIntersectionObserver';

describe('MockIntersectionObserver', () => {
  it('reads root, rootMargin and thresholds from its options', () => {
    const root = document.createElement('div');
    const observer = new MockIntersectionObserver(() => {}, {
      root,
      rootMargin: '10px',
      threshold: 0.5,
    });
    expect(observer.root).toBe(root);
    expect(observer.rootMargin).toBe('10px');
    expect(observer.thresholds).toEqual([0.5]);
  });

  it('accepts an array of thresholds and defaults to [0]', () => {
    expect(
      new MockIntersectionObserver(() => {}, { threshold: [0, 0.5] }).thresholds,
    ).toEqual([0, 0.5]);
    expect(new MockIntersectionObserver(() => {}).thresholds).toEqual([0]);
  });

  it('delivers entries with every field populated', () => {
    const callback = vi.fn();
    const observer = new MockIntersectionObserver(callback);
    const target = document.createElement('div');
    observer.observe(target);
    observer.emit([{ isIntersecting: true, target }]);

    expect(callback).toHaveBeenCalledTimes(1);
    const entry = callback.mock.calls[0][0][0] as IntersectionObserverEntry;
    expect(entry.isIntersecting).toBe(true);
    expect(entry.intersectionRatio).toBe(1);
    expect(entry.target).toBe(target);
    expect(entry.time).toBeTypeOf('number');
    expect(entry.boundingClientRect).toBeInstanceOf(DOMRect);
  });

  it('only delivers entries for observed targets', () => {
    const callback = vi.fn();
    const observer = new MockIntersectionObserver(callback);
    observer.emit([{ isIntersecting: true, target: document.createElement('div') }]);
    expect(callback).not.toHaveBeenCalled();
  });

  it('stops delivering entries after unobserve and disconnect', () => {
    const callback = vi.fn();
    const observer = new MockIntersectionObserver(callback);
    const target = document.createElement('div');

    observer.observe(target);
    observer.unobserve(target);
    observer.emit([{ isIntersecting: true, target }]);
    expect(callback).not.toHaveBeenCalled();

    observer.observe(target);
    observer.disconnect();
    observer.emit([{ isIntersecting: true, target }]);
    expect(callback).not.toHaveBeenCalled();
  });

  it('tracks instances and throws from last when there are none', () => {
    new MockIntersectionObserver(() => {});
    expect(MockIntersectionObserver.instances).toHaveLength(1);
    expect(MockIntersectionObserver.last).toBeInstanceOf(MockIntersectionObserver);

    MockIntersectionObserver.reset();
    expect(MockIntersectionObserver.instances).toHaveLength(0);
    expect(() => MockIntersectionObserver.last).toThrow();
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test -- src/test/mockIntersectionObserver.test.ts`
Expected: FAIL — `root` is always `null`, `intersectionRatio` is `undefined`, and `emit` delivers entries for unobserved targets and after `disconnect()`.

- [ ] **Step 3: Rewrite `src/test/mockIntersectionObserver.ts`**

```ts
type ObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) => void;

export class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly root: Element | Document | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;

  private readonly callback: ObserverCallback;
  private readonly observed = new Set<Element>();
  private disconnected = false;

  constructor(callback: ObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.root = options?.root ?? null;
    this.rootMargin = options?.rootMargin ?? '0px 0px 0px 0px';
    this.thresholds = Array.isArray(options?.threshold)
      ? [...options.threshold]
      : [options?.threshold ?? 0];
    MockIntersectionObserver.instances.push(this);
  }

  observe(target: Element): void {
    if (!this.disconnected) {
      this.observed.add(target);
    }
  }

  unobserve(target: Element): void {
    this.observed.delete(target);
  }

  disconnect(): void {
    this.observed.clear();
    this.disconnected = true;
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  emit(entries: Partial<IntersectionObserverEntry>[]): void {
    if (this.disconnected) {
      return;
    }

    const time = performance.now();
    const relevant = entries.filter(
      (entry) => entry.target && this.observed.has(entry.target),
    );
    if (relevant.length === 0) {
      return;
    }

    const full = relevant.map((entry) => ({
      time,
      rootBounds: null,
      boundingClientRect: entry.boundingClientRect ?? new DOMRect(),
      intersectionRect: entry.intersectionRect ?? new DOMRect(),
      isIntersecting: entry.isIntersecting ?? false,
      intersectionRatio:
        entry.intersectionRatio ?? (entry.isIntersecting ? 1 : 0),
      target: entry.target,
    })) as IntersectionObserverEntry[];

    this.callback(full, this);
  }

  static reset(): void {
    MockIntersectionObserver.instances.length = 0;
  }

  static get last(): MockIntersectionObserver {
    const instance = MockIntersectionObserver.instances.at(-1);
    if (!instance) {
      throw new Error('No IntersectionObserver instance has been created');
    }
    return instance;
  }
}
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `npm test`
Expected: PASS — the new stub tests pass and the existing smoke test still passes.

- [ ] **Step 5: Add a `typecheck` script, Node globals for `vite.config.ts`, and Node type definitions**

In `package.json`, change the scripts block to:

```json
  "scripts": {
    "dev": "vite",
    "build": "npm run typecheck && vite build",
    "typecheck": "tsc --noEmit",
    "preview": "vite preview",
    "lint": "eslint .",
    "test": "vitest run"
  },
```

Install Node's type definitions — without them, `tsc` cannot resolve `node:fs` / `node:path` and does not know about `import.meta.dirname`, which Task 2's stylesheet test relies on:

```bash
npm install -D @types/node
```

Then in `tsconfig.json`, add `"node"` to the `types` array:

```json
    "types": ["vite/client", "vitest/globals", "node"]
```

In `eslint.config.js`, insert this block **before** the `**/*.{ts,tsx}` block:

```js
  {
    files: ['vite.config.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
    },
  },
```

- [ ] **Step 6: Create `public/favicon.svg`**

Task 15 also creates this file; creating it now removes a favicon 404 from every page load in the meantime. The content is identical to Task 15 Step 6.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="16" fill="#FFFDF5" />
  <circle cx="32" cy="30" r="20" fill="#8B5CF6" stroke="#1E293B" stroke-width="3" />
  <text
    x="32"
    y="37"
    font-family="Outfit, system-ui, sans-serif"
    font-size="18"
    font-weight="800"
    fill="#FFFFFF"
    text-anchor="middle"
  >
    RN
  </text>
</svg>
```

- [ ] **Step 7: Verify all three gates**

Run: `npm test` → PASS.
Run: `npm run lint` → no output, exit 0.
Run: `npm run build` → `✓ built in`, exit 0.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "fix: harden the IntersectionObserver stub and add typecheck script"
```

---

### Task 2: The design token layer

**Files:**
- Modify: `src/index.css`
- Create: `src/index.css.test.ts`

- [ ] **Step 1: Write the failing token test `src/index.css.test.ts`**

> **Why `import.meta.dirname` and not `new URL('./index.css', import.meta.url)`:**
> Under Vitest's `jsdom` environment, `new URL(<literal>, import.meta.url)` is rewritten to an `http://localhost:3000/...` URL by Vitest's `NormalizeURLPlugin`, and `readFileSync` then throws `TypeError: The URL must be of scheme file`. `import.meta.dirname` is a real filesystem path in every environment and works under both `jsdom` and `node`. This was verified against this project's Vitest 5 + jsdom setup.

```ts
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(join(import.meta.dirname, 'index.css'), 'utf8');

describe('design token layer', () => {
  it('defines every brand colour', () => {
    for (const token of [
      '--color-cream: #fffdf5',
      '--color-ink: #1e293b',
      '--color-accent: #8b5cf6',
      '--color-pop: #f472b6',
      '--color-sun: #fbbf24',
      '--color-mint: #34d399',
      '--color-line: #e2e8f0',
      '--color-card: #ffffff',
      '--color-muted: #f1f5f9',
      '--color-muted-foreground: #64748b',
      '--color-accent-foreground: #ffffff',
    ]) {
      expect(css).toContain(token);
    }
  });

  it('defines the hard shadows', () => {
    expect(css).toContain('--shadow-pop: 4px 4px 0 0 #1e293b');
    expect(css).toContain('--shadow-pop-hover: 6px 6px 0 0 #1e293b');
    expect(css).toContain('--shadow-pop-active: 2px 2px 0 0 #1e293b');
    expect(css).toContain('--shadow-pop-lg: 8px 8px 0 0 #e2e8f0');
    expect(css).toContain('--shadow-pop-pink: 8px 8px 0 0 #f472b6');
    expect(css).toContain('--shadow-pop-mint: 8px 8px 0 0 #34d399');
    expect(css).toContain('--shadow-pop-sun: 8px 8px 0 0 #fbbf24');
  });

  it('defines the fonts, radii and the bounce easing', () => {
    expect(css).toContain('--font-display: "Outfit"');
    expect(css).toContain('--font-body: "Plus Jakarta Sans"');
    expect(css).toContain('--radius-sm: 8px');
    expect(css).toContain('--radius-md: 16px');
    expect(css).toContain('--radius-lg: 24px');
    expect(css).toContain('--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)');
  });

  it('defines every animation keyframe', () => {
    for (const keyframe of [
      'wiggle',
      'float-y',
      'float-x',
      'pop-in',
      'marquee',
      'marquee-rev',
      'blob',
      'confetti',
      'role-swap',
    ]) {
      expect(css).toContain(`@keyframes ${keyframe}`);
    }
  });

  it('honours prefers-reduced-motion', () => {
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
  });
});
```

- [ ] **Step 1b: Verify the utilities actually resolve**

The token test above only proves the CSS *contains* the token text. It does not prove the Tailwind utility classes resolve against those tokens. A typo on either side renders a completely unstyled site that no other test catches.

Tailwind v4 generates utilities **on demand** from the scanned source tree, so a utility only appears in the compiled CSS once some file under `src/` uses it. At this point in the build only `src/App.tsx` uses Tailwind classes (`bg-cream`, `text-ink`, `min-h-screen`).

This is a build-and-grep check, not a unit test, because the utilities only exist in the compiled stylesheet. After the build in Step 4, run:

```powershell
$css = Get-Content (Get-ChildItem "dist\assets\*.css" | Select-Object -First 1).FullName -Raw
foreach ($u in @(".bg-cream", ".text-ink", ".min-h-screen")) {
  "{0,-16} {1}" -f $u, $(if ($css.Contains($u)) { "FOUND" } else { "MISSING" })
}
```

Expected: `FOUND` for all three. The remaining design-system utilities (`shadow-pop`, `font-display`, `ease-bounce`) are **expected to be absent** at this stage — they are generated once the components in Tasks 4–14 use them. The `@source inline(...)` safelist keeps the eight animation keyframes in the bundle regardless.

Confirm the keyframes were emitted and the hard-shadow value survived the build:

```powershell
$css.Contains("@keyframes role-swap")   # True
$css.Contains("@keyframes wiggle")      # True
$css.Contains("4px 4px 0 0 #1e293b")    # True
```

Expected: `True` for all three.

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test`
Expected: FAIL — token strings not found in `src/index.css`.

- [ ] **Step 3: Write the full `src/index.css`**

```css
@import "tailwindcss" source(none);

/* Scan only the source tree. Without this, Tailwind v4 auto-detects content
   across the whole project — including the plan and spec markdown — and ships
   ~29 KB of rules for class names that only ever appear in documentation.
   `source(none)` switches off that automatic detection, and `@source` paths
   are resolved relative to this stylesheet, so "./" is the src/ directory. */
@source "./**/*.{ts,tsx}";

/* Tailwind tree-shakes `@keyframes` declared inside `@theme` unless the
   matching `animate-*` utility is generated, so safelist the animations to
   keep their keyframes in the compiled stylesheet. */
@source inline("animate-wiggle animate-float-y animate-float-x animate-marquee animate-marquee-rev animate-blob animate-confetti animate-role-swap");

@theme {
  /* ---------- Colour ---------- */
  --color-cream: #fffdf5;
  --color-ink: #1e293b;
  --color-muted: #f1f5f9;
  --color-muted-foreground: #64748b;
  --color-accent: #8b5cf6;
  --color-accent-foreground: #ffffff;
  --color-pop: #f472b6;
  --color-sun: #fbbf24;
  --color-mint: #34d399;
  --color-line: #e2e8f0;
  --color-card: #ffffff;

  /* ---------- Type ---------- */
  --font-display: "Outfit", system-ui, sans-serif;
  --font-body: "Plus Jakarta Sans", system-ui, sans-serif;

  /* ---------- Radius ---------- */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;

  /* ---------- Hard shadows (no blur) ---------- */
  --shadow-pop: 4px 4px 0 0 #1e293b;
  --shadow-pop-hover: 6px 6px 0 0 #1e293b;
  --shadow-pop-active: 2px 2px 0 0 #1e293b;
  --shadow-pop-lg: 8px 8px 0 0 #e2e8f0;
  --shadow-pop-pink: 8px 8px 0 0 #f472b6;
  --shadow-pop-mint: 8px 8px 0 0 #34d399;
  --shadow-pop-sun: 8px 8px 0 0 #fbbf24;

  /* ---------- Motion ---------- */
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --animate-wiggle: wiggle 0.6s ease-in-out;
  --animate-float-y: float-y 6s ease-in-out infinite;
  --animate-float-x: float-x 8s ease-in-out infinite;
  --animate-marquee: marquee 28s linear infinite;
  --animate-marquee-rev: marquee-rev 34s linear infinite;
  --animate-blob: blob 12s ease-in-out infinite;
  --animate-confetti: confetti 12s ease-in-out infinite;
  --animate-role-swap: role-swap 9.6s ease-in-out infinite both;

  @keyframes wiggle {
    0%,
    100% {
      transform: rotate(0deg);
    }
    30% {
      transform: rotate(3deg);
    }
    70% {
      transform: rotate(-3deg);
    }
  }

  @keyframes float-y {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-14px);
    }
  }

  @keyframes float-x {
    0%,
    100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(18px);
    }
  }

  @keyframes pop-in {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @keyframes marquee-rev {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes blob {
    0%,
    100% {
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    }
    50% {
      border-radius: 30% 70% 70% 30% / 40% 60% 40% 60%;
    }
  }

  @keyframes confetti {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-24px) rotate(14deg);
    }
  }

  @keyframes role-swap {
    0% {
      opacity: 0;
      transform: translateY(0.75rem);
      filter: blur(6px);
    }
    2% {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
    22% {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
    27%,
    100% {
      opacity: 0;
      transform: translateY(-0.75rem);
      filter: blur(6px);
    }
  }
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--color-cream);
    color: var(--color-ink);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-display);
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  section {
    scroll-margin-top: 6rem;
  }

  :focus-visible {
    outline: 3px solid var(--color-accent);
    outline-offset: 2px;
    border-radius: 4px;
  }
}

@layer components {
  .dot-grid {
    background-image: radial-gradient(
      circle,
      rgba(30, 41, 59, 0.22) 1.5px,
      transparent 1.5px
    );
    background-size: 18px 18px;
  }

  /* The hidden state is scoped to the container the reveal hook owns, so a
     [data-reveal] element that lives outside every hook's container is never
     left invisible. The scope attribute is only added by JavaScript, so the
     no-JS fallback is "everything visible". */
  [data-reveal-scope][data-reveal],
  [data-reveal-scope] [data-reveal] {
    opacity: 0;
    transform: scale(0.8);
    transition:
      opacity 0.5s var(--ease-bounce),
      transform 0.5s var(--ease-bounce);
    transition-delay: var(--reveal-delay, 0ms);
  }

  [data-reveal-scope] [data-reveal][data-revealed="true"] {
    opacity: 1;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }

  [data-reveal] {
    opacity: 1 !important;
    transform: none !important;
    rotate: none !important;
    scale: none !important;
    translate: none !important;
  }

  [data-role-word] {
    animation: none !important;
    opacity: 0;
  }

  [data-role-word="0"] {
    opacity: 1;
  }
}
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `npm test`
Expected: PASS — all token tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Playful Geometric design token layer"
```

---

### Task 3: The content model

**Files:**
- Create: `src/components/icons.ts`
- Create: `src/lib/theme.ts`
- Create: `src/data/content.ts`
- Create: `src/data/content.test.ts`

- [ ] **Step 1: Write the failing content test `src/data/content.test.ts`**

```ts
import { describe, expect, it } from 'vitest';
import {
  certifications,
  education,
  links,
  navLinks,
  profile,
  projects,
  sectionIds,
  skillGroups,
  stats,
} from './content';

describe('content model', () => {
  it('describes the owner', () => {
    expect(profile.name).toBe('Rajan Nishad');
    expect(profile.roles).toHaveLength(4);
    for (const role of profile.roles) {
      expect(role.trim()).not.toBe('');
    }
    expect(profile.summary.length).toBeGreaterThan(80);
    expect(profile.about.length).toBeGreaterThan(80);
    expect(profile.availability.length).toBeGreaterThan(0);
  });

  it('exposes working contact links', () => {
    expect(links.email).toBe('rajannishad1015@gmail.com');
    expect(links.phoneHref).toBe('tel:+919619872801');
    expect(links.github).toMatch(/^https:\/\/github\.com\//);
    expect(links.linkedin).toMatch(/^https:\/\/linkedin\.com\//);
    expect(links.resumeHref).toBe('/resume.pdf');
  });

  it('has five skill groups with items', () => {
    expect(skillGroups).toHaveLength(5);
    for (const group of skillGroups) {
      expect(group.items.length).toBeGreaterThan(0);
      for (const item of group.items) {
        expect(item.trim()).not.toBe('');
      }
    }
    const flat = skillGroups.flatMap((group) => group.items);
    expect(flat).toContain('Power BI');
    expect(flat).toContain('Python');
    expect(flat).toContain('SQL Server');
  });

  it('has four projects, the first of which is featured', () => {
    expect(projects).toHaveLength(4);
    expect(projects.filter((project) => project.featured)).toHaveLength(1);
    expect(projects[0].featured).toBe(true);
    for (const project of projects) {
      expect(project.bullets.length).toBeGreaterThan(0);
      expect(project.metrics.length).toBeGreaterThan(0);
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.title.length).toBeGreaterThan(0);
    }
    expect(projects[0].title).toBe('Swara Digital');
  });

  it('has three education entries and eight certifications', () => {
    expect(education).toHaveLength(3);
    expect(certifications).toHaveLength(8);
    for (const cert of certifications) {
      expect(cert.initial.length).toBeGreaterThan(0);
      expect(cert.initial.length).toBeLessThanOrEqual(2);
    }
    // Distinct initials, so no two badge tiles render identically.
    const initials = certifications.map((cert) => cert.initial);
    expect(new Set(initials).size).toBe(initials.length);
  });

  it('has four stats and a nav link per section', () => {
    expect(stats).toHaveLength(4);
    expect(navLinks.map((link) => link.href)).toEqual([
      '#about',
      '#skills',
      '#projects',
      '#education',
      '#contact',
    ]);
    for (const link of navLinks) {
      expect(sectionIds).toContain(link.href.replace('#', ''));
    }
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./content"`.

- [ ] **Step 3: Write `src/components/icons.ts`**

Only the five icons the skill groups actually use are mapped — the map is the single source of truth for `IconName`, and unused entries would be dead code.

```ts
import {
  BarChart3,
  Cloud,
  Code2,
  Database,
  Users,
  type LucideIcon,
} from 'lucide-react';

export const ICONS = {
  barChart3: BarChart3,
  cloud: Cloud,
  code2: Code2,
  database: Database,
  users: Users,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;
```

- [ ] **Step 3b: Write `src/lib/theme.ts`**

The accent union lives here — not in the content model and not in a UI primitive — so both sides import one declaration and a new accent colour cannot be added in one place and missed in the other.

```ts
export type AccentColor = 'accent' | 'pop' | 'sun' | 'mint' | 'ink';
```

- [ ] **Step 4: Write `src/data/content.ts`**

```ts
import type { AccentColor } from '../lib/theme';
import type { IconName } from '../components/icons';

const SOFT_SKILLS = [
  'Problem-Solving',
  'Critical Thinking',
  'Communication',
  'Attention to Detail',
] as const;

export const profile = {
  name: 'Rajan Nishad',
  initials: 'RN',
  roles: ['Data Analyst', 'Data Scientist', 'ML Engineer', 'Full-Stack Builder'],
  availability: 'Available for Data Analyst / Data Science roles',
  summary:
    'Final-year Data Science student at Kes Shroff College, Mumbai, building end-to-end analytics dashboards, predictive models and full-stack data platforms from raw data to actionable insight.',
  about:
    'I turn messy data into decisions people can act on. My work spans logistic regression and Scikit-learn models, Power BI dashboards, and full-stack platforms on Next.js and Supabase — and I care about the numbers on the other side: 90% forecast accuracy, 10% churn reduction, 25% faster reporting. Currently completing a B.Sc. in Data Science and open to Data Analyst and Data Science roles in Mumbai or remote.',
  softSkills: SOFT_SKILLS,
} as const;

export const links = {
  email: 'rajannishad1015@gmail.com',
  phone: '+91 96198 72801',
  phoneHref: 'tel:+919619872801',
  github: 'https://github.com/Rajannishad1015',
  linkedin: 'https://linkedin.com/in/rajanishad',
  site: 'https://rajann.me',
  resumeHref: '/resume.pdf',
} as const;

export const stats = [
  { value: '4', label: 'Shipped projects' },
  { value: '8', label: 'Certifications earned' },
  { value: '150+', label: 'Global stores served' },
  { value: '20+', label: 'Mumbai localities modelled' },
] as const satisfies ReadonlyArray<{ value: string; label: string }>;

export const skillGroups = [
  {
    id: 'data-viz',
    title: 'Data Analysis & Visualization',
    color: 'accent',
    icon: 'barChart3',
    items: ['Excel', 'Power BI', 'Tableau', 'Matplotlib', 'Seaborn', 'Plotly'],
  },
  {
    id: 'databases',
    title: 'Database Management',
    color: 'pop',
    icon: 'database',
    items: ['MySQL', 'PostgreSQL', 'Oracle', 'SQL Server'],
  },
  {
    id: 'programming',
    title: 'Programming & Scripting',
    color: 'sun',
    icon: 'code2',
    items: [
      'Python',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'FastAPI',
      'Java',
      'C++',
      'JavaScript',
      'Next.js',
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    color: 'mint',
    icon: 'cloud',
    items: [
      'AWS (SageMaker, EC2, S3, Lambda)',
      'Google Cloud',
      'Git / GitHub',
      'Vercel',
      'Docker',
    ],
  },
  {
    id: 'soft',
    title: 'Soft Skills',
    color: 'ink',
    icon: 'users',
    items: SOFT_SKILLS,
  },
] as const satisfies ReadonlyArray<{
  id: string;
  title: string;
  color: AccentColor;
  icon: IconName;
  items: readonly string[];
}>;

export const projects = [
  {
    id: 'swara-digital',
    title: 'Swara Digital',
    subtitle: 'Music Distribution Platform',
    featured: true,
    blurb:
      'End-to-end web platform letting independent artists distribute music to 150+ global stores with zero commission.',
    bullets: [
      'Engineered a secure backend on Supabase Auth with a custom Admin Dashboard for release moderation.',
      'Integrated Razorpay with idempotent webhooks for seamless subscriptions and real-time royalty payouts.',
      'Built an interactive analytics dashboard for artists to track streams, revenue and geographic performance.',
    ],
    metrics: [
      { value: '150+', label: 'global stores' },
      { value: '0%', label: 'commission' },
    ],
    tags: ['Next.js', 'Node.js', 'Supabase', 'Razorpay'],
    // TODO: replace with the real live and source URLs
    links: { live: '#', source: '#' },
  },
  {
    id: 'sales-forecasting',
    title: 'Sales Analysis & Forecasting Dashboard',
    subtitle: 'Power BI',
    featured: false,
    blurb:
      'A predictive Power BI dashboard built on three years of historical sales data, used to automate monthly trend analysis.',
    bullets: [
      'Modelled over three years of historical sales data into an interactive Power BI report.',
      'Improved decision-making for the marketing team with a forecast reaching 90% accuracy.',
      'Automated monthly sales trend analysis, lifting reporting efficiency by 25%.',
    ],
    metrics: [
      { value: '90%', label: 'forecast accuracy' },
      { value: '25%', label: 'more efficient reporting' },
    ],
    tags: ['Power BI', 'Excel', 'Data Modelling'],
    // TODO: replace with the real source URL
    links: { live: '#', source: '#' },
  },
  {
    id: 'house-price-predictor',
    title: 'Mumbai House Price Predictor',
    subtitle: 'Java Swing + Python',
    featured: false,
    blurb:
      'A hybrid desktop app with a Java Swing GUI talking to a Python ML backend to predict Mumbai house prices.',
    bullets: [
      'Trained a Scikit-learn regression model on a cleaned Mumbai housing dataset.',
      'Applied OOP principles across modular Java panels — Prediction, Data and Chart — extending a shared BasePanel.',
      'Rendered charts and locality-wise price distributions from the Python backend across 20+ localities.',
    ],
    metrics: [
      { value: '20+', label: 'localities covered' },
      { value: '3', label: 'Java panels' },
    ],
    tags: ['Java', 'Swing', 'Python', 'Scikit-learn', 'Pandas'],
    // TODO: replace with the real source URL
    links: { live: '#', source: '#' },
  },
  {
    id: 'churn-model',
    title: 'Churn Prediction Model',
    subtitle: 'Python + Power BI',
    featured: false,
    blurb:
      'A logistic regression model that predicts subscription churn and feeds a Power BI dashboard for retention decisions.',
    bullets: [
      'Designed and implemented a logistic regression model in Python to predict customer churn.',
      'Reached 85% prediction accuracy, enabling proactive retention strategies.',
      'Reduced churn by 10% over six months and presented findings through a Power BI dashboard.',
    ],
    metrics: [
      { value: '85%', label: 'prediction accuracy' },
      { value: '10%', label: 'churn reduction' },
    ],
    tags: ['Python', 'Scikit-learn', 'Power BI'],
    // TODO: replace with the real source URL
    links: { live: '#', source: '#' },
  },
] as const satisfies ReadonlyArray<{
  id: string;
  title: string;
  subtitle: string;
  featured: boolean;
  blurb: string;
  bullets: readonly string[];
  metrics: ReadonlyArray<{ value: string; label: string }>;
  tags: readonly string[];
  links: { live: string; source: string };
}>;

export const education = [
  {
    id: 'kes-shroff',
    institution: 'Kes Shroff College, Mumbai',
    qualification: 'B.Sc. Data Science',
    period: '2024 — 2027',
    year: '2027',
    detail: 'Expected 2027',
    current: true,
  },
  {
    id: 'hsc',
    institution: 'HSC, Maharashtra Board, Mumbai',
    qualification: 'Higher Secondary Certificate',
    period: '2024',
    year: '2024',
    detail: '',
    current: false,
  },
  {
    id: 'ssc',
    institution: 'SSC, Maharashtra Board, Mumbai',
    qualification: 'Secondary School Certificate',
    period: '2022',
    year: '2022',
    detail: '',
    current: false,
  },
] as const satisfies ReadonlyArray<{
  id: string;
  institution: string;
  qualification: string;
  period: string;
  year: string;
  detail: string;
  current: boolean;
}>;

export const certifications = [
  {
    id: 'google-data-analytics',
    issuer: 'Google',
    name: 'Data Analytics Professional Certificate',
    initial: 'G',
    color: 'sun',
  },
  {
    id: 'ibm-ml-python',
    issuer: 'IBM',
    name: 'Machine Learning With Python',
    initial: 'ML',
    color: 'accent',
  },
  {
    id: 'ibm-python-ds',
    issuer: 'IBM',
    name: 'Python for Data Science',
    initial: 'PY',
    color: 'accent',
  },
  {
    id: 'ibm-ai-dev',
    issuer: 'IBM',
    name: 'AI & Development',
    initial: 'AI',
    color: 'accent',
  },
  {
    id: 'harvard-cs50-ai',
    issuer: 'Harvard University',
    name: "CS50's Introduction to AI",
    initial: 'H',
    color: 'pop',
  },
  {
    id: 'columbia-prompt',
    issuer: 'Columbia University',
    name: 'Prompt Engineering',
    initial: 'C',
    color: 'mint',
  },
  {
    id: 'oracle-ai-foundations',
    issuer: 'Oracle Cloud Infrastructure',
    name: 'AI Foundations Associate',
    initial: 'OA',
    color: 'ink',
  },
  {
    id: 'oracle-data-science',
    issuer: 'Oracle Cloud Infrastructure',
    name: 'Data Science',
    initial: 'OD',
    color: 'ink',
  },
] as const satisfies ReadonlyArray<{
  id: string;
  issuer: string;
  name: string;
  initial: string;
  color: AccentColor;
}>;

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
] as const satisfies ReadonlyArray<{ href: string; label: string }>;

export const sectionIds = [
  'home',
  'about',
  'skills',
  'projects',
  'education',
  'certifications',
  'contact',
] as const;

export const marqueeItems = [
  'Python',
  'SQL',
  'Power BI',
  'Next.js',
  'Scikit-learn',
  'FastAPI',
  'AWS',
  'Docker',
  'Supabase',
  'PostgreSQL',
  'Pandas',
  'Java',
] as const;
```

- [ ] **Step 5: Run the test and confirm it passes**

Run: `npm test`
Expected: PASS — all content tests pass.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add typed content model with the real resume data"
```

---

### Task 4: UI primitives

**Files:**
- Create: `src/components/ui/CandyButton.tsx`
- Create: `src/components/ui/StickerCard.tsx`
- Create: `src/components/ui/Pill.tsx`
- Create: `src/components/ui/Squiggle.tsx`
- Create: `src/components/ui/SectionTitle.tsx`
- Create: `src/components/ui/Marquee.tsx`
- Create: `src/components/ui/DotGrid.tsx`
- Create: `src/components/ui/primitives.test.tsx`

- [ ] **Step 1: Write the failing primitive tests `src/components/ui/primitives.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CandyButton, CandyLink } from './CandyButton';
import { DotGrid } from './DotGrid';
import { Marquee } from './Marquee';
import { Pill } from './Pill';
import { SectionTitle } from './SectionTitle';
import { Squiggle } from './Squiggle';
import { StickerCard } from './StickerCard';

describe('CandyButton', () => {
  it('renders a primary button with the pop shadow', () => {
    render(<CandyButton>Get in touch</CandyButton>);
    const button = screen.getByRole('button', { name: 'Get in touch' });
    expect(button.className).toContain('bg-accent');
    expect(button.className).toContain('shadow-pop');
    expect(button.className).toContain('rounded-full');
  });

  it('renders a secondary button with a transparent background', () => {
    render(<CandyButton variant="secondary">Download CV</CandyButton>);
    const button = screen.getByRole('button', { name: 'Download CV' });
    expect(button.className).toContain('bg-transparent');
  });
});

describe('CandyLink', () => {
  it('renders an anchor with the given href', () => {
    render(
      <CandyLink href="mailto:rajannishad1015@gmail.com">Email</CandyLink>,
    );
    const link = screen.getByRole('link', { name: 'Email' });
    expect(link).toHaveAttribute('href', 'mailto:rajannishad1015@gmail.com');
  });

  it('wraps the icon in a white circle', () => {
    render(
      <CandyLink href="#projects" icon={<span data-testid="icon" />}>
        View Projects
      </CandyLink>,
    );
    const icon = screen.getByTestId('icon');
    expect(icon.parentElement?.className).toContain('bg-white');
  });
});

describe('StickerCard', () => {
  it('renders a titled card with a hard border', () => {
    render(<StickerCard title="Data Analysis">Body</StickerCard>);
    expect(screen.getByRole('heading', { name: 'Data Analysis' })).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('forwards arbitrary props such as data-reveal', () => {
    render(<StickerCard data-reveal>Body</StickerCard>);
    expect(screen.getByText('Body').closest('article')).toHaveAttribute(
      'data-reveal',
    );
  });

  it('applies the pink shadow to the featured variant', () => {
    render(
      <StickerCard shadow="pink" data-testid="card">
        Body
      </StickerCard>,
    );
    expect(screen.getByTestId('card').className).toContain('shadow-pop-pink');
  });
});

describe('Pill', () => {
  it('renders its children', () => {
    render(<Pill>Next.js</Pill>);
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });
});

describe('Squiggle', () => {
  it('is hidden from assistive technology', () => {
    const { container } = render(<Squiggle />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('SectionTitle', () => {
  it('renders the eyebrow, the heading and the lead', () => {
    render(
      <SectionTitle eyebrow="Toolkit" title="Skills & Stack" lead="The tools." />,
    );
    expect(screen.getByText('Toolkit')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Skills & Stack' }),
    ).toBeInTheDocument();
    expect(screen.getByText('The tools.')).toBeInTheDocument();
  });
});

describe('Marquee', () => {
  it('duplicates the items so the loop is seamless', () => {
    render(<Marquee items={['Python', 'SQL']} />);
    expect(screen.getAllByText('Python')).toHaveLength(2);
  });

  it('hides the strip from assistive technology', () => {
    const { container } = render(<Marquee items={['Python']} />);
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });
});

describe('DotGrid', () => {
  it('renders a decorative panel', () => {
    const { container } = render(<DotGrid />);
    expect(container.querySelector('.dot-grid')).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./CandyButton"`.

- [ ] **Step 2b: Install `tailwind-merge` and create `src/lib/cn.ts`**

Without conflict-free class merging, a consumer's `className` silently loses to the primitive's own classes: Tailwind emits `.hidden` before `.inline-flex`, so `<CandyLink className="hidden sm:inline-flex">` would stay visible on mobile.

```bash
npm install tailwind-merge
```

Create `src/lib/cn.ts`:

```ts
import { twMerge } from 'tailwind-merge';

export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return twMerge(classes.filter(Boolean).join(' '));
}
```

`tailwind-merge` is a **runtime** dependency (it is imported by the shipped code), so it belongs in `dependencies`, not `devDependencies`.

- [ ] **Step 3: Write `src/components/ui/CandyButton.tsx`**

```tsx
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import { cn } from '../../lib/cn';

export type CandyVariant = 'primary' | 'secondary';

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-ink px-5 py-2.5 font-display text-base font-bold leading-none transition-all duration-300 ease-bounce';

const variants: Record<CandyVariant, string> = {
  primary:
    'bg-accent text-accent-foreground shadow-pop hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-pop-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-pop-active',
  secondary: 'bg-transparent text-ink hover:bg-sun',
};

type SharedProps = {
  variant?: CandyVariant;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

function Inner({ icon, children }: Pick<SharedProps, 'icon' | 'children'>) {
  return (
    <>
      <span>{children}</span>
      {icon ? (
        <span className="grid size-6 place-items-center rounded-full bg-white text-ink">
          {icon}
        </span>
      ) : null}
    </>
  );
}

export function CandyLink({
  variant = 'primary',
  icon,
  className = '',
  children,
  ...rest
}: SharedProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href: string;
  }) {
  return (
    <a className={cn(base, variants[variant], className)} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </a>
  );
}

export function CandyButton({
  variant = 'primary',
  icon,
  className = '',
  type = 'button',
  children,
  ...rest
}: SharedProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
}
```

- [ ] **Step 4: Write `src/components/ui/StickerCard.tsx`**

```tsx
import type { HTMLAttributes, ReactNode } from 'react';
import type { AccentColor } from '../../lib/theme';
import { cn } from '../../lib/cn';

export type CardShadow = 'default' | 'pink' | 'mint' | 'sun';

const accentClasses: Record<AccentColor, string> = {
  accent: 'bg-accent text-accent-foreground',
  pop: 'bg-pop text-ink',
  sun: 'bg-sun text-ink',
  mint: 'bg-mint text-ink',
  ink: 'bg-ink text-cream',
};

const shadowClasses: Record<CardShadow, string> = {
  default: 'shadow-pop-lg',
  pink: 'shadow-pop-pink',
  mint: 'shadow-pop-mint',
  sun: 'shadow-pop-sun',
};

type StickerCardProps = {
  title?: ReactNode;
  accent?: AccentColor;
  icon?: ReactNode;
  shadow?: CardShadow;
  className?: string;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, 'title'>;

export function StickerCard({
  title,
  accent = 'accent',
  icon,
  shadow = 'default',
  className = '',
  children,
  ...rest
}: StickerCardProps) {
  return (
    <article
      className={cn(
        'relative rounded-xl border-2 border-ink bg-card p-6 pt-9 transition-all duration-300 ease-bounce hover:-rotate-1 hover:scale-[1.02]',
        shadowClasses[shadow],
        className,
      )}
      {...rest}
    >
      {icon ? (
        <span
          className={cn(
            'absolute -top-5 left-5 grid size-11 place-items-center rounded-full border-2 border-ink',
            accentClasses[accent],
          )}
          aria-hidden="true"
        >
          {icon}
        </span>
      ) : null}
      {title ? (
        <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
      ) : null}
      {children}
    </article>
  );
}
```

- [ ] **Step 5: Write `src/components/ui/Pill.tsx`**

```tsx
import type { ReactNode } from 'react';

export function Pill({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border-2 border-ink bg-sun/30 px-3 py-1 text-sm font-medium text-ink ${className}`}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 6: Write `src/components/ui/Squiggle.tsx`**

```tsx
export function Squiggle({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 12"
      className={className}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M2 8c6-8 12 8 18 0s12 8 18 0 12 8 18 0 12 8 18 0 12 8 18 0 12 8 18 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
```

- [ ] **Step 7: Write `src/components/ui/SectionTitle.tsx`**

```tsx
import { Squiggle } from './Squiggle';

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  lead?: string;
};

export function SectionTitle({ eyebrow, title, lead }: SectionTitleProps) {
  return (
    <div data-reveal className="max-w-2xl">
      <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
        {title}
      </h2>
      <Squiggle className="mt-3 h-3 w-32 text-pop" />
      {lead ? (
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 8: Write `src/components/ui/Marquee.tsx`**

```tsx
import { cn } from '../../lib/cn';

type MarqueeProps = {
  items: readonly string[];
  reverse?: boolean;
  duration?: number;
  className?: string;
};

export function Marquee({
  items,
  reverse = false,
  duration,
  className = '',
}: MarqueeProps) {
  const track = [...items, ...items];
  const speed = duration ?? (reverse ? 34 : 28);
  return (
    <div className={cn('relative overflow-hidden', className)} aria-hidden="true">
      <div
        className={cn(
          'flex w-max flex-nowrap items-center gap-3 pr-3',
          reverse ? 'animate-marquee-rev' : 'animate-marquee',
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-3 font-display text-sm font-bold whitespace-nowrap text-ink/70"
          >
            {item}
            <span className="text-pop">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 9: Write `src/components/ui/DotGrid.tsx`**

```tsx
export function DotGrid({ className = '' }: { className?: string }) {
  return <div className={`dot-grid ${className}`} aria-hidden="true" />;
}
```

- [ ] **Step 10: Run the test and confirm it passes**

Run: `npm test`
Expected: PASS — all primitive tests pass.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: add sticker, button and marquee UI primitives"
```

---

### Task 5: Reveal and active-section hooks

**Files:**
- Create: `src/hooks/useReveal.ts`
- Create: `src/hooks/useActiveSection.ts`
- Create: `src/hooks/useReveal.test.tsx`

- [ ] **Step 1: Write the failing hook tests `src/hooks/useReveal.test.tsx`**

```tsx
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MockIntersectionObserver } from '../test/mockIntersectionObserver';
import { useActiveSection } from './useActiveSection';
import { useReveal } from './useReveal';

const ACTIVE_IDS = ['alpha', 'beta'];

function Probe() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref}>
      <span data-reveal>one</span>
      <span data-reveal>two</span>
      <span data-reveal>three</span>
    </div>
  );
}

function ActiveProbe() {
  const active = useActiveSection(ACTIVE_IDS);
  return <span data-testid="active">{active}</span>;
}

describe('useReveal', () => {
  it('scopes the container so only its own targets are hidden', () => {
    const { container } = render(<Probe />);
    expect(container.firstElementChild).toHaveAttribute('data-reveal-scope');
  });

  it('reveals only the targets that intersect', () => {
    render(<Probe />);
    const observer = MockIntersectionObserver.last;
    const targets = document.querySelectorAll('[data-reveal]');
    observer.emit([{ isIntersecting: true, target: targets[1] }]);
    expect(targets[1]).toHaveAttribute('data-revealed', 'true');
    expect(targets[0]).not.toHaveAttribute('data-revealed');
  });

  it('does not reveal a target that is only barely visible', () => {
    render(<Probe />);
    const observer = MockIntersectionObserver.last;
    const targets = document.querySelectorAll('[data-reveal]');
    observer.emit([
      { isIntersecting: true, intersectionRatio: 0.05, target: targets[0] },
    ]);
    expect(targets[0]).not.toHaveAttribute('data-revealed');
  });

  it('staggers sibling targets with an increasing delay', () => {
    render(<Probe />);
    const targets = document.querySelectorAll('[data-reveal]');
    const delay = (index: number) =>
      (targets[index] as HTMLElement).style.getPropertyValue('--reveal-delay');
    expect(delay(0)).toBe('0ms');
    expect(delay(1)).toBe('90ms');
    expect(delay(2)).toBe('180ms');
  });

  it('uses the configured observer options', () => {
    render(<Probe />);
    expect(MockIntersectionObserver.last.rootMargin).toBe('0px 0px -10% 0px');
    expect(MockIntersectionObserver.last.thresholds).toEqual([0.2]);
  });

  it('stops observing a target once it has been revealed', () => {
    render(<Probe />);
    const observer = MockIntersectionObserver.last;
    const targets = document.querySelectorAll('[data-reveal]');
    observer.emit([{ isIntersecting: true, target: targets[0] }]);
    expect(targets[0]).toHaveAttribute('data-revealed', 'true');

    targets[0].removeAttribute('data-revealed');
    observer.emit([{ isIntersecting: true, target: targets[0] }]);
    expect(targets[0]).not.toHaveAttribute('data-revealed');
  });

  it('reveals everything when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    render(<Probe />);
    const targets = document.querySelectorAll('[data-reveal]');
    for (const target of targets) {
      expect(target).toHaveAttribute('data-revealed', 'true');
    }
  });
});

describe('useActiveSection', () => {
  it('reports the id of the section in view', () => {
    // The sections must exist in the document BEFORE render, because the hook
    // looks them up with document.getElementById inside its mount effect.
    const alpha = document.createElement('section');
    alpha.id = 'alpha';
    const beta = document.createElement('section');
    beta.id = 'beta';
    document.body.append(alpha, beta);

    render(<ActiveProbe />);
    const observer = MockIntersectionObserver.last;
    // `act()` is required: React 19 sets IS_REACT_ACT_ENVIRONMENT, so a
    // setState triggered outside act() is queued and never flushed before the
    // assertion runs.
    act(() => {
      observer.emit([{ isIntersecting: true, target: beta }]);
    });
    expect(screen.getByTestId('active')).toHaveTextContent('beta');
  });

  it('uses the configured observer options', () => {
    const alpha = document.createElement('section');
    alpha.id = 'alpha';
    document.body.append(alpha);
    render(<ActiveProbe />);
    expect(MockIntersectionObserver.last.rootMargin).toBe('-45% 0px -45% 0px');
    expect(MockIntersectionObserver.last.thresholds).toEqual([0, 0.25, 0.5]);
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./useReveal"`.

- [ ] **Step 3: Write `src/hooks/useReveal.ts`**

```ts
import { useLayoutEffect, useRef } from 'react';

type RevealOptions = {
  threshold?: number;
  rootMargin?: string;
};

const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 8;

export function useReveal<T extends HTMLElement = HTMLElement>(
  options: RevealOptions = {},
) {
  const { threshold = 0.2, rootMargin = '0px 0px -10% 0px' } = options;
  const ref = useRef<T | null>(null);

  // useLayoutEffect, not useEffect: the scope attribute must be on the
  // element before the browser paints, otherwise the content paints visible
  // and then fades out before fading back in.
  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) {
      return;
    }

    // Scope the hidden state to this container. A [data-reveal] element that
    // lives outside every hook's container must never be left invisible.
    container.setAttribute('data-reveal-scope', '');

    const descendants = Array.from(
      container.querySelectorAll<HTMLElement>('[data-reveal]'),
    );
    const targets = container.matches('[data-reveal]')
      ? [container, ...descendants]
      : descendants;

    const counters = new Map<Element, number>();
    for (const target of targets) {
      const parent = target.parentElement ?? container;
      const index = counters.get(parent) ?? 0;
      counters.set(parent, index + 1);
      target.style.setProperty(
        '--reveal-delay',
        `${Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS}ms`,
      );
    }

    if (typeof IntersectionObserver === 'undefined') {
      for (const target of targets) {
        target.setAttribute('data-revealed', 'true');
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // isIntersecting is true for any overlap, even a sliver, so the
          // ratio must be checked too or a barely-visible element is
          // revealed and unobserved before the reader ever reaches it.
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            (entry.target as HTMLElement).setAttribute(
              'data-revealed',
              'true',
            );
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin },
    );

    for (const target of targets) {
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return ref;
}
```

- [ ] **Step 4: Write `src/hooks/useActiveSection.ts`**

```ts
import { useEffect, useState } from 'react';

export function useActiveSection(ids: readonly string[]) {
  // Empty until the observer reports something — no nav item should be
  // marked as the current section before the reader has scrolled.
  const [active, setActive] = useState('');
  // Depending on the joined key rather than the array means the hook is safe
  // even when a caller passes a freshly-built array on every render.
  const key = ids.join('|');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const list = key ? key.split('|') : [];
    const elements = list
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) {
          return;
        }
        // The band is the middle strip of the viewport, so the section being
        // scrolled into is the last one in document order to reach it. Sorting
        // by intersection ratio instead would favour short sections.
        const current = visible.reduce((a, b) =>
          a.boundingClientRect.top > b.boundingClientRect.top ? a : b,
        );
        setActive(current.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [key]);

  return active;
}
```

- [ ] **Step 5: Run the test and confirm it passes**

Run: `npm test`
Expected: PASS — all hook tests pass.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add scroll-reveal and active-section hooks"
```

---

### Task 6: Nav

**Files:**
- Create: `src/components/Nav.tsx`
- Create: `src/components/Nav.test.tsx`

- [ ] **Step 1: Write the failing nav tests `src/components/Nav.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Nav } from './Nav';

describe('Nav', () => {
  it('renders a labelled navigation landmark', () => {
    render(<Nav />);
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
  });

  it('links to every section', () => {
    render(<Nav />);
    for (const label of ['About', 'Skills', 'Projects', 'Education', 'Contact']) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute(
        'href',
        `#${label.toLowerCase()}`,
      );
    }
  });

  it('offers the resume for download', () => {
    render(<Nav />);
    const resume = screen.getByRole('link', { name: /download cv/i });
    expect(resume).toHaveAttribute('href', '/resume.pdf');
  });

  it('opens and closes the mobile menu', async () => {
    const user = userEvent.setup();
    render(<Nav />);
    const toggle = screen.getByRole('button', { name: /open menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);
    expect(
      screen.getByRole('button', { name: /close navigation/i }),
    ).toHaveAttribute('aria-expanded', 'true');
    expect(
      screen.getByRole('navigation', { name: 'Mobile' }),
    ).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(
      screen.queryByRole('navigation', { name: 'Mobile' }),
    ).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./Nav"`.

- [ ] **Step 3: Write `src/components/Nav.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { links, navLinks, profile } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';
import { CandyLink } from './ui/CandyButton';

const NAV_SECTION_IDS = navLinks.map((link) => link.href.slice(1));

export function Nav() {
  const [open, setOpen] = useState(false);
  // Lazy initialiser, not a setState inside the effect: `eslint-plugin-react-hooks`
  // v7 ships `set-state-in-effect` as an error, and a synchronous setState in an
  // effect body is exactly what that rule targets.
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8);
  const active = useActiveSection(NAV_SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'bg-cream/90 shadow-pop backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a
          href="#home"
          aria-label={`${profile.name} — back to top`}
          className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-accent font-display text-lg font-extrabold text-accent-foreground shadow-pop transition-transform duration-300 ease-bounce hover:-rotate-6"
        >
          {profile.initials}
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={`rounded-full px-4 py-2 font-display text-sm font-bold transition-colors duration-300 ${
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-ink hover:bg-sun'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <CandyLink
            href={links.resumeHref}
            download
            icon={<Download size={14} strokeWidth={2.5} />}
            className="hidden sm:inline-flex"
          >
            Download CV
          </CandyLink>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
            className="grid size-11 place-items-center rounded-full border-2 border-ink bg-card shadow-pop transition-transform duration-300 ease-bounce hover:-translate-y-[2px] active:translate-y-[2px] lg:hidden"
          >
            {open ? (
              <X size={20} strokeWidth={2.5} />
            ) : (
              <Menu size={20} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 flex items-center justify-center bg-cream lg:hidden"
        >
          <nav
            aria-label="Mobile"
            className="flex flex-col items-center gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl font-extrabold text-ink transition-colors duration-300 hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute right-6 top-6 grid size-11 place-items-center rounded-full border-2 border-ink bg-card shadow-pop"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>
      ) : null}
    </header>
  );
}
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `npm test`
Expected: PASS — all nav tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add sticky nav with mobile overlay menu"
```

---

### Task 7: Hero and floating shapes

**Files:**
- Create: `src/components/FloatingShapes.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/Hero.test.tsx`

- [ ] **Step 1: Write the failing hero tests `src/components/Hero.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Hero } from './Hero';

describe('Hero', () => {
  it('leads with the name in the only h1', () => {
    render(<Hero />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Rajan Nishad');
  });

  it('shows every rotating role in the markup', () => {
    render(<Hero />);
    for (const role of [
      'Data Analyst',
      'Data Scientist',
      'ML Engineer',
      'Full-Stack Builder',
    ]) {
      expect(screen.getByText(role)).toBeInTheDocument();
    }
  });

  it('links to the projects and to the resume', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /view projects/i })).toHaveAttribute(
      'href',
      '#projects',
    );
    expect(screen.getByRole('link', { name: /download cv/i })).toHaveAttribute(
      'href',
      '/resume.pdf',
    );
  });

  it('announces that he is available for work', () => {
    render(<Hero />);
    expect(
      screen.getByText(/available for data analyst/i),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./Hero"`.

- [ ] **Step 3: Write `src/components/FloatingShapes.tsx`**

```tsx
import type { CSSProperties } from 'react';

type Shape = {
  className: string;
  style: CSSProperties;
};

const shapes: Shape[] = [
  {
    className: 'size-16 rounded-full bg-pop',
    style: { top: '12%', left: '6%' },
  },
  {
    className: 'h-12 w-12 rotate-12 bg-sun',
    style: { top: '26%', left: '18%' },
  },
  {
    className: 'size-10 rounded-full bg-mint',
    style: { top: '8%', right: '12%' },
  },
  {
    className: 'h-14 w-20 rounded-t-full bg-accent/30',
    style: { top: '34%', right: '5%' },
  },
  {
    className: 'size-8 rotate-45 bg-accent',
    style: { bottom: '22%', left: '10%' },
  },
  {
    className: 'h-10 w-16 rounded-full bg-sun/60',
    style: { bottom: '14%', right: '16%' },
  },
  {
    className: 'size-12 rounded-full bg-accent/20',
    style: { bottom: '30%', left: '42%' },
  },
  {
    className: 'size-7 rotate-45 bg-pop',
    style: { top: '46%', left: '3%' },
  },
  {
    className: 'h-9 w-9 rounded-t-full bg-mint',
    style: { top: '18%', right: '32%' },
  },
  {
    className: 'size-9 rounded-full bg-sun',
    style: { bottom: '8%', left: '30%' },
  },
];

export function FloatingShapes() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden md:block"
    >
      {shapes.map((shape, index) => (
        <span
          key={index}
          className={`absolute animate-confetti ${shape.className}`}
          style={{
            ...shape.style,
            animationDelay: `${index * 0.9}s`,
            animationDuration: `${9 + (index % 5)}s`,
          }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Write `src/components/Hero.tsx`**

```tsx
import { ArrowRight, Download } from 'lucide-react';
import { links, marqueeItems, profile } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { FloatingShapes } from './FloatingShapes';
import { CandyLink } from './ui/CandyButton';
import { DotGrid } from './ui/DotGrid';
import { Marquee } from './ui/Marquee';
import { Squiggle } from './ui/Squiggle';

const floatingPills = [
  { label: 'Python', className: 'left-[2%] top-[14%]', animation: 'animate-float-y' },
  { label: 'SQL', className: 'right-[4%] top-[10%]', animation: 'animate-float-x' },
  { label: 'Power BI', className: 'left-[8%] bottom-[18%]', animation: 'animate-float-x' },
  { label: 'Next.js', className: 'right-[10%] bottom-[12%]', animation: 'animate-float-y' },
  { label: 'Scikit-learn', className: 'left-[-2%] top-[46%]', animation: 'animate-float-y' },
  { label: 'FastAPI', className: 'right-[-2%] top-[42%]', animation: 'animate-float-x' },
];

export function Hero() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="home"
      ref={ref}
      className="relative overflow-hidden px-6 pb-16 pt-20 lg:pb-24 lg:pt-28"
    >
      <FloatingShapes />

      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div>
          <span
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-mint/30 px-4 py-1.5 text-sm font-semibold text-ink"
          >
            <span className="size-2.5 rounded-full bg-mint" aria-hidden="true" />
            {profile.availability}
          </span>

          <h1
            data-reveal
            className="mt-6 text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </h1>

          <div data-reveal className="mt-4 flex items-baseline gap-3">
            <span className="relative inline-flex h-[1.4em] w-full overflow-hidden font-display text-2xl font-bold text-accent sm:text-3xl">
              {profile.roles.map((role, index) => (
                <span
                  key={role}
                  data-role-word={index}
                  className="absolute inset-x-0 top-0 animate-role-swap whitespace-nowrap"
                  style={{ animationDelay: `${index * 2.4}s` }}
                >
                  {role}
                </span>
              ))}
            </span>
          </div>

          <Squiggle className="mt-4 h-3 w-40 text-pop" />

          <p
            data-reveal
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {profile.summary}
          </p>

          <div data-reveal className="mt-8 flex flex-wrap items-center gap-4">
            <CandyLink
              href="#projects"
              icon={<ArrowRight size={14} strokeWidth={2.5} />}
            >
              View Projects
            </CandyLink>
            <CandyLink
              href={links.resumeHref}
              download
              variant="secondary"
              icon={<Download size={14} strokeWidth={2.5} />}
            >
              Download CV
            </CandyLink>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 size-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun"
          />
          <DotGrid className="absolute inset-0 -z-10 rounded-3xl opacity-70" />
          <div
            aria-hidden="true"
            className="absolute right-[4%] top-[4%] h-40 w-40 animate-blob bg-accent/80"
          />

          {floatingPills.map((pill, index) => (
            <span
              key={pill.label}
              className={`absolute ${pill.className} ${pill.animation} inline-flex items-center rounded-full border-2 border-ink bg-card px-4 py-2 font-display text-sm font-bold shadow-pop`}
              style={{ animationDelay: `${index * 0.6}s` }}
            >
              {pill.label}
            </span>
          ))}

          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-ink bg-accent font-display text-5xl font-extrabold text-accent-foreground shadow-pop"
          >
            {profile.initials}
          </div>

          <div className="absolute bottom-[4%] left-0 w-56 -rotate-4 rounded-xl border-2 border-ink bg-card p-4 shadow-pop-lg">
            <p className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
              today
            </p>
            <pre className="mt-2 overflow-x-auto font-mono text-xs leading-relaxed text-ink">
              <code>{`model.fit(X_train, y_train)
score = model.score(X_test, y_test)
print(f"{score:.0%} accurate")`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl border-y-2 border-ink/10 py-4">
        <Marquee items={marqueeItems} />
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run the test and confirm it passes**

Run: `npm test`
Expected: PASS — all hero tests pass.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add hero section with rotating role and geometry composition"
```

---

### Task 8: About

**Files:**
- Create: `src/components/About.tsx`
- Create: `src/components/About.test.tsx`

- [ ] **Step 1: Write the failing about tests `src/components/About.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { About } from './About';

describe('About', () => {
  it('has the about section id', () => {
    render(<About />);
    expect(document.getElementById('about')).not.toBeNull();
  });

  it('shows the four stat tiles', () => {
    render(<About />);
    expect(screen.getByText('Shipped projects')).toBeInTheDocument();
    expect(screen.getByText('Certifications earned')).toBeInTheDocument();
    expect(screen.getByText('150+')).toBeInTheDocument();
    expect(screen.getByText('20+')).toBeInTheDocument();
  });

  it('lists the soft skills', () => {
    render(<About />);
    expect(screen.getByText('Problem-Solving')).toBeInTheDocument();
    expect(screen.getByText('Critical Thinking')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./About"`.

- [ ] **Step 3: Write `src/components/About.tsx`**

```tsx
import { profile, stats } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { DotGrid } from './ui/DotGrid';
import { Pill } from './ui/Pill';
import { SectionTitle } from './ui/SectionTitle';

export function About() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className="relative px-6 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Who I Am"
          title="About"
          lead="A data science student who ships the whole thing — model, dashboard and the product around it."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div
            data-reveal
            className="relative overflow-hidden rounded-3xl border-2 border-ink bg-card p-8 shadow-pop-lg lg:col-span-3"
          >
            <DotGrid className="absolute inset-0 opacity-40" />
            <div className="relative">
              <p className="text-lg leading-relaxed text-ink">{profile.about}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {profile.softSkills.map((skill) => (
                  <Pill key={skill}>{skill}</Pill>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            {stats.map((stat) => (
              <div
                key={stat.label}
                data-reveal
                className="rounded-xl border-2 border-ink bg-card px-6 py-5 shadow-pop transition-transform duration-300 ease-bounce hover:-rotate-1"
              >
                <p className="font-display text-4xl font-extrabold text-accent">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `npm test`
Expected: PASS — all about tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add about section with stat tiles"
```

---

### Task 9: Skills

**Files:**
- Create: `src/components/Skills.tsx`
- Create: `src/components/Skills.test.tsx`

- [ ] **Step 1: Write the failing skills tests `src/components/Skills.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Skills } from './Skills';

describe('Skills', () => {
  it('has the skills section id', () => {
    render(<Skills />);
    expect(document.getElementById('skills')).not.toBeNull();
  });

  it('renders one card per skill group', () => {
    render(<Skills />);
    expect(
      screen.getByRole('heading', { name: 'Data Analysis & Visualization' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Database Management' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Programming & Scripting' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Cloud & DevOps' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Soft Skills' }),
    ).toBeInTheDocument();
  });

  it('lists the tools inside the groups', () => {
    render(<Skills />);
    expect(screen.getByText('Power BI')).toBeInTheDocument();
    expect(screen.getByText('SQL Server')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./Skills"`.

- [ ] **Step 3: Write `src/components/Skills.tsx`**

```tsx
import { skillGroups } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { ICONS } from './icons';
import { SectionTitle } from './ui/SectionTitle';
import { StickerCard } from './ui/StickerCard';

export function Skills() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="skills"
      ref={ref}
      className="relative px-6 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Toolkit"
          title="Skills & Stack"
          lead="The tools I reach for, from the first exploratory chart to the API in front of it."
        />

        <div className="relative mt-14">
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full text-ink/20 lg:block"
            viewBox="0 0 1000 400"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M20 90 C 260 20, 520 200, 980 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="10 12"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => {
              const Icon = ICONS[group.icon];
              return (
                <StickerCard
                  key={group.id}
                  data-reveal
                  title={group.title}
                  accent={group.color}
                  icon={<Icon size={20} strokeWidth={2.5} />}
                >
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-ink/80">
                        <span
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </StickerCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `npm test`
Expected: PASS — all skills tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add skills section with sticker cards"
```

---

### Task 10: Projects

**Files:**
- Create: `src/components/Projects.tsx`
- Create: `src/components/Projects.test.tsx`

- [ ] **Step 1: Write the failing projects tests `src/components/Projects.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Projects } from './Projects';

describe('Projects', () => {
  it('has the projects section id', () => {
    render(<Projects />);
    expect(document.getElementById('projects')).not.toBeNull();
  });

  it('renders all four projects', () => {
    render(<Projects />);
    expect(
      screen.getByRole('heading', { name: 'Swara Digital' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Sales Analysis & Forecasting Dashboard' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Mumbai House Price Predictor' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Churn Prediction Model' }),
    ).toBeInTheDocument();
  });

  it('marks exactly one card as featured', () => {
    render(<Projects />);
    const featured = document.querySelectorAll('[data-featured="true"]');
    expect(featured).toHaveLength(1);
  });

  it('shows the headline metrics', () => {
    render(<Projects />);
    expect(screen.getByText('150+')).toBeInTheDocument();
    expect(screen.getByText('90%')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
  });

  it('shows a stack of technology tags', () => {
    render(<Projects />);
    expect(screen.getByText('Razorpay')).toBeInTheDocument();
    expect(screen.getByText('Scikit-learn')).toBeInTheDocument();
  });

  it('replaces unfilled links with an honest placeholder chip', () => {
    render(<Projects />);
    expect(screen.getAllByText('Link coming soon').length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./Projects"`.

- [ ] **Step 3: Write `src/components/Projects.tsx`**

```tsx
import type { ReactNode } from 'react';
import { Check, ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { SectionTitle } from './ui/SectionTitle';
import { StickerCard } from './ui/StickerCard';

const isPlaceholder = (url: string) => url === '#' || url.length === 0;

function ProjectLink({
  url,
  label,
  icon,
}: {
  url: string;
  label: string;
  icon: ReactNode;
}) {
  if (isPlaceholder(url)) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-ink/40 px-4 py-2 text-sm font-semibold text-muted-foreground">
        {icon}
        Link coming soon
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-card px-4 py-2 font-display text-sm font-bold shadow-pop transition-all duration-300 ease-bounce hover:-translate-y-[2px] hover:shadow-pop-hover"
    >
      {icon}
      {label}
    </a>
  );
}

export function Projects() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="projects"
      ref={ref}
      className="relative px-6 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Work"
          title="Selected Projects"
          lead="Four builds that show the range: a full-stack product, a forecasting dashboard, a desktop ML app and a churn model that changed a business number."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <StickerCard
              key={project.id}
              data-reveal
              data-featured={project.featured ? 'true' : 'false'}
              shadow={project.featured ? 'pink' : 'default'}
              className={project.featured ? 'md:col-span-2' : ''}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-extrabold text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-1 font-display text-sm font-bold uppercase tracking-widest text-accent">
                    {project.subtitle}
                  </p>
                </div>
                {project.featured ? (
                  <span className="rotate-[15deg] rounded-full border-2 border-ink bg-sun px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-widest text-ink shadow-pop">
                    ★ Featured
                  </span>
                ) : null}
              </div>

              <p className="mt-4 max-w-2xl text-ink/80">{project.blurb}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl border-2 border-ink bg-sun/40 px-4 py-2"
                  >
                    <p className="font-display text-2xl font-extrabold leading-none text-ink">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink/70">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              <ul className="mt-6 space-y-3">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-ink/85">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-mint">
                      <Check size={13} strokeWidth={3} className="text-ink" />
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border-2 border-ink bg-accent/15 px-3 py-1 text-xs font-semibold text-ink"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <ProjectLink
                  url={project.links.live}
                  label="Live"
                  icon={<ExternalLink size={14} strokeWidth={2.5} />}
                />
                <ProjectLink
                  url={project.links.source}
                  label="Source"
                  icon={<Github size={14} strokeWidth={2.5} />}
                />
              </div>
            </StickerCard>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `npm test`
Expected: PASS — all projects tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add projects section with featured card"
```

---

### Task 11: Education

**Files:**
- Create: `src/components/Education.tsx`
- Create: `src/components/Education.test.tsx`

- [ ] **Step 1: Write the failing education tests `src/components/Education.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Education } from './Education';

describe('Education', () => {
  it('has the education section id', () => {
    render(<Education />);
    expect(document.getElementById('education')).not.toBeNull();
  });

  it('lists all three qualifications', () => {
    render(<Education />);
    expect(
      screen.getByText('Kes Shroff College, Mumbai'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Higher Secondary Certificate'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Secondary School Certificate'),
    ).toBeInTheDocument();
  });

  it('shows the expected graduation year', () => {
    render(<Education />);
    expect(screen.getByText('Expected 2027')).toBeInTheDocument();
  });

  it('uses an ordered list for the timeline', () => {
    render(<Education />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./Education"`.

- [ ] **Step 3: Write `src/components/Education.tsx`**

```tsx
import { GraduationCap } from 'lucide-react';
import { education } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { Pill } from './ui/Pill';
import { SectionTitle } from './ui/SectionTitle';

export function Education() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="education"
      ref={ref}
      className="relative px-6 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Background"
          title="Education"
          lead="A B.Sc. in Data Science in Mumbai, on the way to a first full-time role."
        />

        <ol className="relative mt-14 space-y-10">
          <span
            aria-hidden="true"
            className="absolute left-[1.75rem] top-3 bottom-3 w-[3px] rounded-full bg-[repeating-linear-gradient(to_bottom,#1e293b_0_8px,transparent_8px_18px)]"
          />

          {education.map((entry) => (
            <li key={entry.id} className="relative pl-16">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 flex h-14 w-14 flex-col items-center justify-end rounded-t-full rounded-b-lg border-2 border-ink bg-sun pb-1 font-display text-[11px] font-extrabold leading-none text-ink shadow-pop"
              >
                {entry.year}
              </span>

              <div
                data-reveal
                className="rounded-xl border-2 border-ink bg-card p-5 shadow-pop-lg transition-transform duration-300 ease-bounce hover:-rotate-1"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl font-bold text-ink">
                    {entry.qualification}
                  </h3>
                  {entry.current ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-mint/40 px-3 py-1 text-xs font-bold text-ink">
                      <GraduationCap size={13} strokeWidth={2.5} />
                      In progress
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-muted-foreground">{entry.institution}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Pill>{entry.period}</Pill>
                  {entry.detail ? (
                    <span className="text-sm font-semibold text-ink/70">
                      {entry.detail}
                    </span>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `npm test`
Expected: PASS — all education tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add education timeline"
```

---

### Task 12: Certifications

**Files:**
- Create: `src/components/Certifications.tsx`
- Create: `src/components/Certifications.test.tsx`

- [ ] **Step 1: Write the failing certifications tests `src/components/Certifications.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Certifications } from './Certifications';

describe('Certifications', () => {
  it('has the certifications section id', () => {
    render(<Certifications />);
    expect(document.getElementById('certifications')).not.toBeNull();
  });

  it('renders eight badges', () => {
    render(<Certifications />);
    expect(document.querySelectorAll('[data-certification]')).toHaveLength(8);
  });

  it('names the headline certificates', () => {
    render(<Certifications />);
    expect(
      screen.getByText('Data Analytics Professional Certificate'),
    ).toBeInTheDocument();
    expect(
      screen.getByText("CS50's Introduction to AI"),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Prompt Engineering'),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./Certifications"`.

- [ ] **Step 3: Write `src/components/Certifications.tsx`**

```tsx
import { certifications } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { SectionTitle } from './ui/SectionTitle';

const badgeClasses = {
  accent: 'bg-accent text-accent-foreground',
  pop: 'bg-pop text-ink',
  sun: 'bg-sun text-ink',
  mint: 'bg-mint text-ink',
  ink: 'bg-ink text-cream',
};

const rotations = [
  'rotate-[-2deg]',
  'rotate-[1.5deg]',
  'rotate-[-1deg]',
  'rotate-[2.5deg]',
];

export function Certifications() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="certifications"
      ref={ref}
      className="relative px-6 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Credentials"
          title="Certifications"
          lead="Eight programmes across Google, IBM, Harvard, Columbia and Oracle Cloud."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              data-certification
              data-reveal
              className={`group flex items-start gap-4 rounded-xl border-2 border-ink bg-card p-5 shadow-pop-lg transition-transform duration-300 ease-bounce hover:animate-wiggle ${rotations[index % rotations.length]}`}
            >
              <span
                aria-hidden="true"
                className={`grid size-12 shrink-0 place-items-center rounded-full border-2 border-ink font-display text-xl font-extrabold ${badgeClasses[cert.color]}`}
              >
                {cert.initial}
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {cert.issuer}
                </p>
                <h3 className="mt-1 font-display text-base font-bold leading-snug text-ink">
                  {cert.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `npm test`
Expected: PASS — all certifications tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add certifications badge grid"
```

---

### Task 13: Contact

**Files:**
- Create: `src/components/Contact.tsx`
- Create: `src/components/Contact.test.tsx`

- [ ] **Step 1: Write the failing contact tests `src/components/Contact.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Contact } from './Contact';

describe('Contact', () => {
  it('has the contact section id', () => {
    render(<Contact />);
    expect(document.getElementById('contact')).not.toBeNull();
  });

  it('offers a mailto link', () => {
    render(<Contact />);
    expect(
      screen.getByRole('link', { name: /email/i }),
    ).toHaveAttribute('href', 'mailto:rajannishad1015@gmail.com');
  });

  it('offers a tel link', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /call/i })).toHaveAttribute(
      'href',
      'tel:+919619872801',
    );
  });

  it('links to GitHub and LinkedIn', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/Rajannishad1015',
    );
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      'https://linkedin.com/in/rajanishad',
    );
  });

  it('has no contact form', () => {
    render(<Contact />);
    expect(document.querySelector('form')).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./Contact"`.

- [ ] **Step 3: Write `src/components/Contact.tsx`**

```tsx
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { links } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { CandyLink } from './ui/CandyButton';
import { DotGrid } from './ui/DotGrid';
import { SectionTitle } from './ui/SectionTitle';

export function Contact() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="contact"
      ref={ref}
      className="relative px-6 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Say Hello"
          title="Contact"
          lead="Open to Data Analyst and Data Science roles in Mumbai, or fully remote."
        />

        <div
          data-reveal
          className="relative mt-12 overflow-hidden rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-none border-2 border-ink bg-card p-8 shadow-pop-pink sm:p-10"
        >
          <DotGrid className="absolute inset-0 opacity-40" />

          <div className="relative">
            <h3 className="max-w-2xl text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Let&apos;s build something worth measuring.
            </h3>
            <p className="mt-4 max-w-2xl text-lg text-ink/75">
              Send over the problem, the messy data, or the dashboard nobody
              trusts. I&apos;ll bring the model and the narrative.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <CandyLink
                href={`mailto:${links.email}`}
                icon={<Mail size={14} strokeWidth={2.5} />}
              >
                Email
              </CandyLink>
              <CandyLink
                href={links.phoneHref}
                icon={<Phone size={14} strokeWidth={2.5} />}
              >
                Call
              </CandyLink>
              <CandyLink
                href={links.github}
                target="_blank"
                rel="noreferrer"
                icon={<Github size={14} strokeWidth={2.5} />}
              >
                GitHub
              </CandyLink>
              <CandyLink
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
                icon={<Linkedin size={14} strokeWidth={2.5} />}
              >
                LinkedIn
              </CandyLink>
            </div>

            <p className="mt-8 font-mono text-sm text-ink/60">
              {links.email} · {links.phone}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `npm test`
Expected: PASS — all contact tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add contact section with direct links"
```

---

### Task 14: Footer

**Files:**
- Create: `src/components/Footer.tsx`
- Create: `src/components/Footer.test.tsx`

- [ ] **Step 1: Write the failing footer tests `src/components/Footer.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('shows the copyright line', () => {
    render(<Footer />);
    expect(screen.getByText(/©/)).toBeInTheDocument();
  });

  it('offers a back to top link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /back to top/i })).toHaveAttribute(
      'href',
      '#home',
    );
  });

  it('credits the build stack', () => {
    render(<Footer />);
    expect(screen.getByText(/react/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./Footer"`.

- [ ] **Step 3: Write `src/components/Footer.tsx`**

```tsx
import { ArrowUpRight } from 'lucide-react';
import { links, profile } from '../data/content';
import { Squiggle } from './ui/Squiggle';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative px-6 pb-12 pt-16">
      <Squiggle className="absolute inset-x-0 top-0 mx-auto h-3 w-full max-w-6xl text-accent" />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
        <p className="font-display text-lg font-bold text-ink">
          © {year} {profile.name}
        </p>
        <p className="text-sm text-muted-foreground">
          Built with React, Vite and Tailwind CSS.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-ink underline decoration-pop decoration-2 underline-offset-4 transition-colors duration-300 hover:text-accent"
          >
            Back to top
          </a>
          <a
            href={links.site}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-ink underline decoration-pop decoration-2 underline-offset-4 transition-colors duration-300 hover:text-accent"
          >
            rajann.me
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `npm test`
Expected: PASS — all footer tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add footer"
```

---

### Task 15: Assemble the page, metadata and static assets

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Modify: `index.html`
- Create: `public/favicon.svg`
- Create: `README.md`
- Copy: `public/resume.pdf`

- [ ] **Step 1: Write the failing page test `src/App.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the site name as the only h1', () => {
    render(<App />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Rajan Nishad');
  });

  it('renders every section in order', () => {
    const { container } = render(<App />);
    const ids = Array.from(container.querySelectorAll('section')).map(
      (section) => section.id,
    );
    expect(ids).toEqual([
      'home',
      'about',
      'skills',
      'projects',
      'education',
      'certifications',
      'contact',
    ]);
  });

  it('offers a skip link to the main content', () => {
    render(<App />);
    expect(
      screen.getByRole('link', { name: /skip to content/i }),
    ).toHaveAttribute('href', '#main');
  });

  it('renders the footer', () => {
    render(<App />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test`
Expected: FAIL — the section list is `['']` or similar; the app is still the placeholder shell.

- [ ] **Step 3: Write `src/App.tsx`**

```tsx
import { About } from './components/About';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Education } from './components/Education';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-cream text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border-2 focus:border-ink focus:bg-accent focus:px-5 focus:py-2.5 focus:font-display focus:font-bold focus:text-accent-foreground"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `npm test`
Expected: PASS — all App tests pass, and every other suite still passes.

- [ ] **Step 5: Write the full `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#FFFDF5" />

    <title>Rajan Nishad | Data Scientist & Full-Stack Builder</title>
    <meta
      name="description"
      content="Portfolio of Rajan Nishad — final-year Data Science student at Kes Shroff College, Mumbai. Predictive models, Power BI dashboards and full-stack data platforms."
    />
    <meta name="author" content="Rajan Nishad" />
    <link rel="canonical" href="https://rajann.me/" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://rajann.me/" />
    <meta property="og:site_name" content="Rajan Nishad" />
    <meta
      property="og:title"
      content="Rajan Nishad | Data Scientist & Full-Stack Builder"
    />
    <meta
      property="og:description"
      content="Final-year Data Science student building predictive models, analytics dashboards and full-stack data platforms from raw data to actionable insight."
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="Rajan Nishad | Data Scientist & Full-Stack Builder"
    />
    <meta
      name="twitter:description"
      content="Predictive models, analytics dashboards and full-stack data platforms."
    />

    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Rajan Nishad",
        "url": "https://rajann.me",
        "jobTitle": "Data Scientist & Full-Stack Builder",
        "email": "mailto:rajannishad1015@gmail.com",
        "telephone": "+91 96198 72801",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mumbai",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        },
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "Kes Shroff College, Mumbai"
        },
        "knowsAbout": [
          "Data Science",
          "Machine Learning",
          "Power BI",
          "Python",
          "SQL",
          "Next.js"
        ],
        "sameAs": [
          "https://github.com/Rajannishad1015",
          "https://linkedin.com/in/rajanishad"
        ]
      }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Write `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="16" fill="#FFFDF5" />
  <circle cx="32" cy="30" r="20" fill="#8B5CF6" stroke="#1E293B" stroke-width="3" />
  <text
    x="32"
    y="37"
    font-family="Outfit, system-ui, sans-serif"
    font-size="18"
    font-weight="800"
    fill="#FFFFFF"
    text-anchor="middle"
  >
    RN
  </text>
</svg>
```

- [ ] **Step 7: Copy the resume into `public/`**

Run (PowerShell):

```powershell
Copy-Item -LiteralPath "C:\Users\rajan\Downloads\RajanNishad.pdf" -Destination "C:\Users\rajan\Downloads\rajan-nishad-portfolio\public\resume.pdf"
```

Verify the file exists: `Test-Path "C:\Users\rajan\Downloads\rajan-nishad-portfolio\public\resume.pdf"` → `True`.

- [ ] **Step 8: Write `README.md`**

```markdown
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
```

- [ ] **Step 9: Run the full verification suite**

Run: `npm test`
Expected: PASS — every suite green.

Run: `npm run lint`
Expected: no output, exit code 0.

Run: `npm run build`
Expected: `tsc --noEmit` clean, then `vite build` prints `✓ built in` and lists `dist/index.html`, `dist/assets/*.js` and `dist/assets/*.css`.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: assemble the page, add metadata, favicon, resume and README"
```

---

### Task 16: Visual and accessibility verification

**Files:**
- Modify: any file where verification finds a problem

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Expected: `Local: http://localhost:5173/`. Leave it running.

- [ ] **Step 2: Check the three viewports in the browser**

Open `http://localhost:5173/` and check at 375 px, 768 px and 1440 px:

- No horizontal scrollbar at any width.
- Hero stacks on mobile; the name and CTAs are not clipped.
- The nav collapses to a single menu button below `lg`, and the full nav shows at `lg` and above.
- The sticky nav gains a shadow once you scroll, and stays pinned to the top of the viewport the whole way down.
- The floating shapes are hidden on mobile and visible on desktop.
- Buttons are at least 48 px tall on mobile.
- Scrolling triggers the pop-in reveal on each section, staggered rather than all at once.

- [ ] **Step 3: Check the keyboard path**

Tab from the top of the page:

- The first stop is the **Skip to content** link, visible when focused.
- Every link and button shows a violet focus ring.
- The mobile menu opens with the keyboard and closes with `Escape`.

- [ ] **Step 4: Check reduced motion**

In DevTools, set `Emulation → CSS media feature prefers-reduced-motion` to `reduce`, then reload:

- Nothing animates.
- All content is visible immediately (nothing stuck at `opacity: 0`).
- Only the first role word shows in the hero.

- [ ] **Step 5: Check the console**

Open DevTools → Console. Expected: no errors and no React warnings.

- [ ] **Step 6: Fix anything the checks turned up**

Make the smallest change that fixes each problem, then re-run `npm test`, `npm run lint` and `npm run build`. If no changes were needed, skip straight to Step 7.

- [ ] **Step 7: Commit any fixes**

```bash
git add -A
git commit -m "fix: address visual and accessibility verification findings"
```

If Step 6 made no changes, do not create an empty commit — skip to Step 8.

- [ ] **Step 8: Stop the dev server and confirm a clean tree**

Press `Ctrl+C` in the dev-server terminal.

Run: `git status --short`
Expected: no output.

Run: `git log --oneline`
Expected: one commit per task, in order.
```

---

## Self-Review

**Spec coverage**

| Spec section | Task |
| --- | --- |
| §4.1 Tokens, shadows, motion | Task 2 |
| §4.2 Components | Task 4 |
| §4.3 Icons (lucide, stroke 2.5) | Task 3 (`src/components/icons.ts`), used in Tasks 8–13 |
| §5.1 Nav | Task 6 |
| §5.2 Hero | Task 7 |
| §5.3 Skills | Task 9 |
| §5.4 Projects | Task 10 |
| §5.5 Education | Task 11 |
| §5.6 Certifications | Task 12 |
| §5.7 About | Task 8 |
| §5.8 Contact | Task 13 |
| §5.9 Footer | Task 14 |
| §6 Content model | Task 3 |
| §7 Behaviour | Task 5 (hooks), Task 2 (keyframes), Task 7 (role swap, marquee, float) |
| §8 Accessibility | Task 15 (skip link, semantic landmarks, focus ring in Task 2), Task 16 (verification) |
| §9 Responsive | Task 16 (viewport checks) |
| §10 Project layout | Tasks 1–15 create every file listed |
| §11 Verification | Task 15 steps 9, Task 16 |
| §12 Open items | Task 3 (project URL placeholders), Task 15 step 7 (resume copy), README deploy section |

**Placeholder scan** — the only `TODO` in the project is the four `// TODO: replace with the real live and source URLs` comments in `src/data/content.ts`, which the spec explicitly designates as the single owner-filled item (spec §6, §12). They render as a "Link coming soon" chip, never as a broken link.

**Type consistency** — `AccentColor` is defined once in `src/lib/theme.ts` and imported by both `src/data/content.ts` and `src/components/ui/StickerCard.tsx`, so there is exactly one declaration of the five-colour union; `content.ts` uses `satisfies` so a typo in the data is a compile error. `IconName` is derived from the `ICONS` map, and `skillGroups`/`certifications` use `satisfies` against it. `useReveal` returns `RefObject<T | null>`, and every section attaches it to its `<section>` element. `useActiveSection` takes `readonly string[]`; both `Nav` and the hook's test pass a **module-level** constant (`NAV_SECTION_IDS`, `ACTIVE_IDS`) so the array identity is stable and the observer is not torn down and rebuilt on every render. Every icon named in `src/components/icons.ts` and every icon imported directly in a section (`ArrowRight`, `Download`, `Menu`, `X`, `Check`, `ExternalLink`, `Github`, `Linkedin`, `Mail`, `Phone`, `GraduationCap`) was verified to exist in `lucide-react@0.562.0` — the 1.x line removed the `Github` and `Linkedin` brand glyphs, which is why the version is pinned.
```
