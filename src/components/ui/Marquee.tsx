type MarqueeProps = {
  items: readonly string[];
  reverse?: boolean;
  duration?: number;
  className?: string;
};

export function Marquee({
  items,
  reverse = false,
  duration = 28,
  className = '',
}: MarqueeProps) {
  const track = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <div
        className={`flex w-max flex-nowrap items-center gap-3 pr-3 ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}
        style={{ animationDuration: `${duration}s` }}
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
