import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    const container = ref.current;
    if (!container) {
      return;
    }

    document.documentElement.classList.add('reveal-ready');

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
          if (entry.isIntersecting) {
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
