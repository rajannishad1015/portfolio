import { ImageOff } from 'lucide-react';
import { profile } from '../../data/content';
import { cn } from '../../lib/cn';

/**
 * The hero portrait frame.
 *
 * The portrait itself is deliberately not fabricated: until a real photo is
 * supplied the frame shows a neutral placeholder. To swap it in, put the PNG
 * at `profile.portraitPath` and set `profile.portraitSrc` to that path — the
 * image is then rendered with `object-fit: contain` so nothing is cropped,
 * stretched, or given an artificial background.
 */
export function PortraitPlaceholder({ className = '' }: { className?: string }) {
  const { portraitSrc, portraitPath, portraitAlt } = profile;

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[34rem]">
        <div
          className="relative h-full w-full overflow-hidden border-2 border-ink bg-cream shadow-pop-lg"
          style={{
            borderRadius: '38% 62% 46% 54% / 44% 38% 62% 56%',
          }}
        >
          {portraitSrc ? (
            <img
              src={portraitSrc}
              alt={portraitAlt}
              width={640}
              height={800}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="dot-grid grid h-full w-full place-items-end justify-items-start bg-cream p-8 pb-10">
              <div className="max-w-[80%] text-left">
                <ImageOff
                  className="mx-auto size-11 text-ink/25"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
                  Portrait PNG goes here
                </p>
                <p className="mt-2 break-all font-mono text-[11px] text-ink/30">
                  {portraitPath}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Hand-drawn style corner strokes sitting just outside the frame */}
        <svg
          className="pointer-events-none absolute -inset-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)] text-ink/50"
          viewBox="0 0 200 250"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M5 34C5 18 12 7 28 5" />
          <path d="M172 5c16 2 23 13 23 29" />
          <path d="M195 216c0 16-7 26-23 29" />
          <path d="M28 245c-16-3-23-13-23-29" />
        </svg>
      </div>
    </div>
  );
}
