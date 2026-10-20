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
