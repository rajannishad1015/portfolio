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
  const speed = duration ?? (reverse ? 34 : 28);
  return (
    <div className={cn('relative overflow-hidden', className)} aria-hidden="true">
      <div
        className={cn(
          'flex w-max flex-nowrap items-center gap-3 pr-3',
          reverse ? 'animate-marquee-rev' : 'animate-marquee',
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-3 font-display text-sm font-bold whitespace-nowrap text-ink/70"
          >
            {item}
            <span className="text-pop">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
