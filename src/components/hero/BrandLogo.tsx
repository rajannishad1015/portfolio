import { profile } from '../../data/content';
import { cn } from '../../lib/cn';

/**
 * The brand lock-up: the first name in violet with a hand-drawn yellow
 * underline, the surname in deep navy, and a few short accent strokes.
 */
export function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <span
      className={cn(
        'relative inline-flex items-baseline font-display text-2xl font-extrabold tracking-tight lg:text-[1.75rem]',
        className,
      )}
    >
      <span className="relative text-accent">
        {profile.firstName}
        <svg
          className="absolute -bottom-1.5 left-0 h-2.5 w-full text-sun"
          viewBox="0 0 64 10"
          fill="none"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <path
            d="M2 7c7-5 12 3 19-1s11 4 19 0 12 1 22-2"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="ml-1.5 text-ink">{profile.lastName}</span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-7 -top-2 hidden h-8 w-8 sm:block"
      >
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" className="text-sun">
          <path d="M4 8 L10 4" strokeWidth="3" strokeLinecap="round" />
          <path d="M18 4 L25 7" strokeWidth="3" strokeLinecap="round" />
          <path d="M8 22 L14 26" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </span>
    </span>
  );
}
