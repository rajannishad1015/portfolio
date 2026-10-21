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
    <dl className="grid grid-cols-3 gap-2 sm:gap-x-6">
      {heroStats.map((stat, index) => {
        const Icon = ICONS[stat.icon];
        return (
          <div
            key={stat.label}
            className={cn(
              'flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2 sm:gap-3.5 rounded-2xl sm:rounded-none border-2 sm:border-0 border-ink bg-card sm:bg-transparent p-2.5 sm:p-0 shadow-[3px_3px_0_#1e293b] sm:shadow-none transition-transform active:scale-[0.98]',
              index > 0 && 'sm:border-l sm:border-ink/15 sm:pl-6',
            )}
          >
            <span
              className={cn(
                'grid size-10 sm:size-14 shrink-0 place-items-center rounded-full border-2 border-ink shadow-[1.5px_1.5px_0_#1e293b]',
                toneClasses[stat.tone],
              )}
              aria-hidden="true"
            >
              <Icon size={17} strokeWidth={2.5} className="text-ink sm:size-[22px]" />
            </span>
            <span className="min-w-0 w-full">
              <span className="block font-display text-sm sm:text-2xl font-extrabold leading-none text-ink truncate">
                {stat.value}
              </span>
              <span className="mt-1 block text-[11px] sm:text-sm font-semibold text-muted-foreground leading-tight truncate">
                {stat.label}
              </span>
            </span>
          </div>
        );
      })}
    </dl>
  );
}
