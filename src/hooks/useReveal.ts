import { useLayoutEffect, useRef } from 'react';

type RevealOptions = {
  threshold?: number;
  rootMargin?: string;
};

const STAGGER_MS = 60;
const MAX_STAGGER_STEPS = 6;

export function useReveal<T extends HTMLElement = HTMLElement>(
  options: RevealOptions = {},
) {
  const { threshold = 0, rootMargin = '0px 0px -5% 0px' } = options;
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

    const reveal = (target: Element) => {
      target.setAttribute('data-revealed', 'true');
    };

    if (typeof IntersectionObserver === 'undefined') {
      for (const target of targets) {
        reveal(target);
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin },
    );

    for (const target of targets) {
      observer.observe(target);
    }

    // Anything already in (or above) the viewport on mount is revealed
    // straight away, so the first screen never depends on the observer
    // firing and content is never left stranded invisible.
    for (const target of targets) {
      if (target.getBoundingClientRect().top < window.innerHeight) {
        reveal(target);
        observer.unobserve(target);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return ref;
}
