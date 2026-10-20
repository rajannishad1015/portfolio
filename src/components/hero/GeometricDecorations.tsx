/**
 * Decorations that belong to the portrait stage.
 *
 * Includes the large sunny yellow circle with halftone dots, the upper-left
 * violet triangle and dot matrix, the vibrant emerald squiggle, the lower-left
 * hot pink triangle, and right-side dot grids matching the reference layout.
 */
export function PortraitDecorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-visible select-none"
    >
      {/* Top-left dot matrix */}
      <div
        className="absolute -left-1 sm:-left-3 -top-1 h-16 w-20 opacity-75"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(30,41,59,0.55) 1.8px, transparent 1.9px)',
          backgroundSize: '13px 13px',
        }}
      />

      {/* Top-left purple triangle */}
      <svg
        className="absolute -rotate-12 left-[5%] sm:left-[6%] lg:left-[7%] top-[6%] sm:top-[5%] lg:top-[4%] w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-accent z-0"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <polygon points="50,6 94,92 6,80" />
      </svg>

      {/* Large yellow circle with right-side halftone dot pattern */}
      <div className="absolute left-[10%] sm:left-[11%] lg:left-[12%] top-[14%] sm:top-[13%] lg:top-[12%] w-[60%] sm:w-[58%] lg:w-[56%] aspect-square rounded-full bg-sun z-0 shadow-sm">
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div
            className="absolute right-0 top-0 bottom-0 w-[54%]"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(30,41,59,0.48) 2.2px, transparent 2.3px)',
              backgroundSize: '15px 15px',
            }}
          />
        </div>
      </div>

      {/* Emerald squiggle on the left edge of the yellow circle */}
      <svg
        className="absolute -left-4 sm:-left-6 lg:-left-7 top-[44%] sm:top-[42%] lg:top-[41%] w-20 h-10 sm:w-24 sm:h-12 lg:w-28 lg:h-14 text-[#06d6a0] z-20"
        viewBox="0 0 100 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="8.5"
        strokeLinecap="round"
      >
        <path d="M 6,20 C 20,4 32,36 48,20 C 64,4 76,36 94,20" />
      </svg>

      {/* Hot pink triangle near bottom-left of the portrait */}
      <svg
        className="absolute left-[4%] sm:left-[5%] lg:left-[6%] bottom-[8%] sm:bottom-[9%] lg:bottom-[10%] w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-pop -rotate-12 z-0"
        viewBox="0 0 60 60"
        fill="currentColor"
      >
        <polygon points="30,5 55,55 5,45" />
      </svg>

      {/* Subtle dot matrix behind the floating cards on the right */}
      <div
        className="absolute right-[1%] sm:right-[2%] top-[28%] h-40 w-28 opacity-45 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(30,41,59,0.45) 1.5px, transparent 1.6px)',
          backgroundSize: '13px 13px',
        }}
      />
    </div>
  );
}

/**
 * Decorations that belong to the section perimeter.
 */
export function SectionDecorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Top-right corner sunny yellow triangle wedge */}
      <div className="absolute right-0 top-0 hidden h-32 w-32 sm:h-40 sm:w-40 lg:block lg:h-48 lg:w-48 text-sun">
        <svg viewBox="0 0 100 100" className="h-full w-full" fill="currentColor">
          <polygon points="100,0 100,100 0,0" />
        </svg>
      </div>

      {/* Small yellow diamond bottom-left */}
      <svg
        className="absolute bottom-[6%] left-[2%] hidden h-7 w-7 rotate-45 text-sun lg:block"
        viewBox="0 0 32 32"
        fill="currentColor"
      >
        <path d="M16 2 30 16 16 30 2 16Z" />
      </svg>

      {/* Pink triangle near bottom-left */}
      <svg
        className="absolute bottom-[3%] left-[6%] hidden h-8 w-8 text-pop lg:block"
        viewBox="0 0 32 32"
        fill="currentColor"
      >
        <path d="M16 3 29 27 L3 27 Z" />
      </svg>
    </div>
  );
}
