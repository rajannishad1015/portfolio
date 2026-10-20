import { cn } from '../../lib/cn';

type MarqueeProps = {
  items: readonly string[];
  reverse?: boolean;
  duration?: number;
  className?: string;
};

export function Marquee({
  items,
  reverse = false,
  duration,
  className = '',
}: MarqueeProps) {
  const track = [...items, ...items];
  const speed = duration ?? (reverse ? 56 : 44);
  return (
    <div className={cn('relative overflow-hidden', className)} aria-hidden="true">
      <div
        className={cn(
          'flex w-max flex-nowrap items-center gap-4 pr-4',
          reverse ? 'animate-marquee-rev' : 'animate-marquee',
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-4 font-display text-sm font-semibold whitespace-nowrap text-ink/45"
          >
            {item}
            <span className="size-1.5 rounded-full bg-ink/20" />
          </span>
        ))}
      </div>
    </div>
  );
}
