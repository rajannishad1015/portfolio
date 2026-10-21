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
    <dl className="grid grid-cols-3 gap-1 sm:gap-x-6 rounded-2xl border-2 sm:border-0 border-ink bg-card sm:bg-transparent p-3 sm:p-0 shadow-pop sm:shadow-none">
      {heroStats.map((stat, index) => {
        const Icon = ICONS[stat.icon];
        return (
          <div
            key={stat.label}
            className={cn(
              'flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1.5 sm:gap-3.5',
              index > 0 && 'border-l border-ink/15 pl-1.5 sm:pl-6',
            )}
          >
            <span
              className={cn(
                'grid size-9 sm:size-14 shrink-0 place-items-center rounded-full border-2 border-ink shadow-[1.5px_1.5px_0_#1e293b]',
                toneClasses[stat.tone],
              )}
              aria-hidden="true"
            >
              <Icon size={16} strokeWidth={2.5} className="text-ink sm:size-[22px]" />
            </span>
            <span className="min-w-0 w-full">
              <span className="block font-display text-sm sm:text-2xl font-extrabold leading-none text-ink truncate">
                {stat.value}
              </span>
              <span className="mt-0.5 sm:mt-1 block text-[10.5px] sm:text-sm font-semibold text-muted-foreground leading-tight truncate">
                {stat.label}
              </span>
            </span>
          </div>
        );
      })}
    </dl>
  );
}
