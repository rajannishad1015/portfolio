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
 *
 * The frame fills its parent, so the floating cards and notes can be anchored
 * to it rather than to the whole stage.
 */
export function PortraitFrame({ className = '' }: { className?: string }) {
  const { portraitSrc, portraitAlt } = profile;

  return (
    <>
      <div
        className={cn(
          'absolute inset-0 overflow-hidden border-2 border-ink bg-cream shadow-pop-lg',
          className,
        )}
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
          <div className="dot-grid grid h-full w-full place-items-center bg-cream">
            <ImageOff
              className="size-11 text-ink/30"
              strokeWidth={1.75}
              aria-hidden="true"
            />
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
    </>
  );
}

/**
 * The one instruction that matters, kept below the frame so a floating card
 * can never cover it.
 */
export function PortraitCaption() {
  const { portraitSrc, portraitPath } = profile;

  if (portraitSrc) {
    return null;
  }

  return (
    <p className="mt-5 flex flex-wrap items-center justify-center gap-x-2 text-center font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink/70">
      <span>Portrait PNG goes here</span>
      <span className="text-ink/60">{portraitPath}</span>
    </p>
  );
}
