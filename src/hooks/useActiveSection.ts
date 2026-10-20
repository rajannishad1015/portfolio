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
