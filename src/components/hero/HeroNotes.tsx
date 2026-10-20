import { heroNotes } from '../../data/content';

/**
 * Two handwritten notes stuck onto the hero, as if with tape. They are
 * decorative encouragement rather than content, but they are real text, so
 * they stay readable to assistive technology.
 */
export function HeroNotes() {
  return (
    <>
      {/* Top note — ink handwriting with a violet squiggle underline */}
      <div
        className="animate-enter-down absolute -top-12 right-2 z-20 hidden w-48 -rotate-3 lg:block"
        style={{ animationDelay: '620ms' }}
      >
        <p className="font-hand text-3xl leading-[1.05] text-ink">
          {heroNotes.top.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <svg
          className="mt-1 h-3 w-40 text-accent"
          viewBox="0 0 160 12"
          fill="none"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <path
            d="M3 8c12-7 18 4 30-1s18 5 30 0 18 2 30 0 20 2 64-3"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>

        <svg
          className="absolute -bottom-10 -left-10 h-12 w-16 text-ink/45"
          viewBox="0 0 80 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M74 10C56 6 32 18 24 42" />
          <path d="M14 34l10 8 6-12" />
        </svg>
      </div>

      {/* Bottom note — a mint sticker card. On small screens it sits below the
          portrait instead of overlapping it. */}
      <div
        className="animate-enter-up absolute bottom-0 right-0 z-20 w-52 rotate-2 rounded-2xl border-2 border-ink bg-mint p-4 shadow-sticker lg:-right-4"
        style={{ animationDelay: '760ms' }}
      >
        <p className="font-hand text-3xl leading-[1.05] text-ink">
          {heroNotes.bottom.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <span
          aria-hidden="true"
          className="mt-3 block h-1 w-16 rounded-full bg-accent"
        />
        <span
          aria-hidden="true"
          className="mt-1.5 block h-1 w-10 rounded-full bg-sun"
        />
      </div>
    </>
  );
}
