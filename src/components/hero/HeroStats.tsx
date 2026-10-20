import { heroStats } from '../../data/content';
import { ICONS } from '../icons';
import { cn } from '../../lib/cn';

const toneClasses = {
  pop: 'bg-pop',
  sun: 'bg-sun',
  mint: 'bg-mint',
} as const;

export function HeroStats() {
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
      {heroStats.map((stat, index) => {
        const Icon = ICONS[stat.icon];
        return (
          <div
            key={stat.label}
            className={cn(
              'flex items-center gap-3',
              index > 0 && 'sm:border-l sm:border-ink/15 sm:pl-6',
            )}
          >
            <span
              className={cn(
                'grid size-14 shrink-0 place-items-center rounded-full border-2 border-ink',
                toneClasses[stat.tone],
              )}
              aria-hidden="true"
            >
              <Icon size={22} strokeWidth={2.5} className="text-ink" />
            </span>
            <span>
              <span className="block font-display text-2xl font-extrabold leading-none text-ink">
                {stat.value}
              </span>
              <span className="mt-1.5 block text-sm font-medium text-muted-foreground">
                {stat.label}
              </span>
            </span>
          </div>
        );
      })}
    </dl>
  );
}
