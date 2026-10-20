/**
 * Decorations that belong to the portrait stage. They are positioned inside
 * the stage so they always sit correctly relative to the portrait, whatever
 * the viewport.
 */
export function PortraitDecorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-visible"
    >
      {/* Large yellow circle behind the portrait */}
      <div className="absolute left-1/2 top-[44%] h-[98%] w-[98%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun" />

      {/* Violet triangle, upper-left of the portrait */}
      <svg
        className="absolute -left-8 -top-8 h-24 w-28 text-accent/90"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M50 4 L96 92 L4 92 Z" />
      </svg>

      {/* Pink organic blob, lower-right of the portrait */}
      <svg
        className="absolute -bottom-10 -right-10 h-40 w-48 text-pop"
        viewBox="0 0 200 180"
        fill="currentColor"
      >
        <path d="M164 24c22 22 30 62 12 92-19 31-64 50-97 36-34-14-53-58-39-90 13-31 52-52 79-50 15 1 33 2 45 12Z" />
      </svg>

      {/* Mint squiggle, left edge of the yellow circle. Hidden below the
          widest layout, where the negative offset would land on the copy. */}
      <svg
        className="absolute -left-14 top-[30%] hidden h-20 w-28 -rotate-12 text-mint xl:block"
        viewBox="0 0 140 90"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 20c14-18 26 16 40 0s26 16 40 0 26 16 40 0" />
        <path d="M8 58c14-18 26 16 40 0s26 16 40 0 26 16 40 0" />
      </svg>

      {/* Dot grids */}
      <div
        className="absolute -left-2 top-[10%] h-24 w-36 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(30,41,59,0.55) 1.6px, transparent 1.7px)',
          backgroundSize: '16px 16px',
        }}
      />
      <div
        className="absolute -right-3 top-[28%] h-16 w-24 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(30,41,59,0.45) 1.4px, transparent 1.5px)',
          backgroundSize: '14px 14px',
        }}
      />
      <div
        className="absolute -right-2 bottom-[6%] h-16 w-24 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(100,116,139,0.5) 1.4px, transparent 1.5px)',
          backgroundSize: '14px 14px',
        }}
      />

      {/* Navy hand-drawn accent lines */}
      <svg
        className="absolute -left-10 bottom-[26%] hidden h-12 w-20 text-ink/40 lg:block"
        viewBox="0 0 100 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M6 10c22 6 46 4 70-2" />
        <path d="M10 30c20 6 44 4 64-2" />
      </svg>

      {/* Curved arrow pointing into the portrait */}
      <svg
        className="absolute -left-6 bottom-[6%] hidden h-16 w-20 text-ink/45 lg:block"
        viewBox="0 0 120 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M112 12C78 4 34 20 24 52" />
        <path d="M10 44l14 10 8-16" />
      </svg>
    </div>
  );
}

/**
 * Decorations that belong to the page rather than the portrait. They stay in
 * the outer margins so they can never land on the copy.
 */
export function SectionDecorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Yellow corner wedge, far right */}
      <svg
        className="absolute right-0 top-0 hidden h-28 w-28 text-sun lg:block"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M100 0v100L0 0Z" />
      </svg>

      {/* Small yellow diamond */}
      <svg
        className="absolute bottom-[6%] left-[2%] hidden h-7 w-7 rotate-45 text-sun lg:block"
        viewBox="0 0 32 32"
        fill="currentColor"
      >
        <path d="M16 2 30 16 16 30 2 16Z" />
      </svg>

      {/* Pink triangle near the bottom */}
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
