import { heroNotes } from '../../data/content';

/**
 * Handwritten notes and playful doodle annotations matching the reference design:
 *
 * 1. Top-right script note "Keep / Learning / Keep / Growing" with doodle ticks,
 *    curved hook stroke, sparkle star and curved doodle arrow.
 * 2. Curved dashed doodle arrow swooping from behind the cards to the mint card.
 * 3. Tilted mint badge "Better / Strategies / Brighter / Results" with solid shadow.
 * 4. Yellow hand-drawn zigzag doodle below the mint card.
 */
export function HeroNotes() {
  return (
    <>
      {/* Top-right note — ink handwriting with tick marks and doodle curve */}
      <div className="pointer-events-none absolute right-[3%] sm:right-[5%] lg:right-[6%] top-[2%] sm:top-[2.5%] lg:top-[2%] z-20 select-none">
        <div className="relative font-hand font-bold text-xs sm:text-2xl lg:text-[1.8rem] leading-[0.94] text-ink -rotate-3">
          {/* Two small tick marks above Keep */}
          <svg
            className="absolute -top-3 sm:-top-4 left-1 sm:left-1.5 w-3.5 sm:w-5 h-3 sm:h-4 text-ink"
            viewBox="0 0 20 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 14 L8 2 M12 14 L16 2" />
          </svg>

          {/* Curved doodle accent on left */}
          <svg
            className="absolute top-0.5 sm:top-1 -left-2.5 sm:-left-3.5 w-2.5 sm:w-3.5 h-8 sm:h-11 text-ink/80"
            viewBox="0 0 12 36"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M10 2 C2 10, 2 24, 10 34" />
          </svg>

          {/* Sparkle star */}
          <span
            className="absolute -top-1 sm:-top-1.5 -right-3 sm:-right-4 text-sun text-xs sm:text-sm select-none"
            aria-hidden="true"
          >
            ✦
          </span>

          {/* Accessible spans for screen readers and test matchers */}
          {heroNotes.top.lines.map((line) => (
            <span key={line} className="sr-only">
              {line}
            </span>
          ))}

          {/* 4 visible lines styled like the reference */}
          <div aria-hidden="true">
            <div>Keep</div>
            <div>Learning</div>
            <div>Keep</div>
            <div>Growing</div>
          </div>

          {/* Small curved arrow */}
          <svg
            className="absolute -bottom-3.5 sm:-bottom-5 right-1 sm:right-2 w-5 sm:w-7 h-5 sm:h-7 text-ink/80"
            viewBox="0 0 28 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 2 Q14 10 18 20" />
            <path d="M11 20 L18 20 L18 13" />
          </svg>
        </div>
      </div>

      {/* Dashed curved doodle arrow connecting cards to the mint note */}
      <svg
        className="pointer-events-none absolute right-[14%] sm:right-[16%] lg:right-[17%] top-[65%] sm:top-[64%] lg:top-[63%] z-10 w-9 h-11 sm:w-16 sm:h-20 text-ink/80 select-none"
        viewBox="0 0 60 70"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          d="M 45,4 C 52,28 28,45 10,58"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        <polygon points="6,56 16,50 14,62" fill="currentColor" />
      </svg>

      {/* Mint sticker card — tilted with bold neo-brutalist shadow */}
      <div
        className="absolute right-[2%] sm:right-[3%] lg:right-[4%] bottom-[5%] sm:bottom-[6%] lg:bottom-[7%] z-20 w-[108px] sm:w-[176px] lg:w-[196px] -rotate-[5deg] rounded-xl sm:rounded-2xl border-2 sm:border-[2.5px] border-ink bg-[#38ef7d] p-1.5 sm:p-4 shadow-[2.5px_2.5px_0px_#18181b] sm:shadow-[5px_5px_0px_#18181b] transition-all duration-300 ease-bounce hover:rotate-0 hover:-translate-y-1 hover:shadow-[7px_7px_0px_#18181b] cursor-pointer select-none"
      >
        <div className="font-hand font-bold text-[11px] sm:text-lg lg:text-[1.4rem] leading-[0.98] text-ink text-center">
          {heroNotes.bottom.lines.map((line) => (
            <span key={line} className="sr-only">
              {line}
            </span>
          ))}
          <div aria-hidden="true">
            <div>Better</div>
            <div>Strategies</div>
            <div>Brighter</div>
            <div>Results</div>
          </div>
        </div>
      </div>

      {/* Yellow hand-drawn zigzag doodle sitting under the mint card */}
      <div
        className="pointer-events-none absolute right-[2%] sm:right-[3%] lg:right-[4%] bottom-[1.5%] sm:bottom-[2%] lg:bottom-[2.5%] z-10 select-none"
        aria-hidden="true"
      >
        <svg
          className="w-14 h-4 sm:w-28 sm:h-9 text-[#f59e0b] -rotate-[4deg]"
          viewBox="0 0 100 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 5,20 L 32,8 L 62,22 L 95,10" />
        </svg>
      </div>
    </>
  );
}
