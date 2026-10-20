import { ImageOff } from 'lucide-react';
import { profile } from '../../data/content';
import { cn } from '../../lib/cn';

/**
 * The hero portrait element.
 *
 * In the playful geometric collage, the portrait is an illustrated cutout
 * sitting directly in front of the yellow circle. The head rises above the
 * circle's top rim for a 3D pop-out sticker effect, with shoulders spanning
 * across the circle, hugging the right cards naturally.
 */
export function PortraitFrame({ className = '' }: { className?: string }) {
  const { portraitSrc, portraitAlt } = profile;

  return (
    <div
      className={cn(
        'absolute left-[3%] sm:left-[4%] lg:left-[5%] bottom-0 z-10 w-[74%] sm:w-[72%] lg:w-[70%] h-[95%] pointer-events-none select-none flex items-end justify-center',
        className,
      )}
    >
      {portraitSrc ? (
        <img
          src={portraitSrc}
          alt={portraitAlt}
          width={880}
          height={1201}
          className="h-full w-full object-contain object-bottom"
          style={{
            maskImage:
              'linear-gradient(to bottom, black 0%, black 70%, rgba(0, 0, 0, 0.85) 78%, rgba(0, 0, 0, 0.5) 86%, rgba(0, 0, 0, 0.2) 93%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 0%, black 70%, rgba(0, 0, 0, 0.85) 78%, rgba(0, 0, 0, 0.5) 86%, rgba(0, 0, 0, 0.2) 93%, transparent 100%)',
          }}
        />
      ) : (
        <div className="grid h-full w-full place-items-center rounded-full border-2 border-ink bg-cream">
          <ImageOff
            className="size-11 text-ink/30"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}

/**
 * Caption shown only if no portrait source is supplied.
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
