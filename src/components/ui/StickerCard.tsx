import type { HTMLAttributes, ReactNode } from 'react';
import type { AccentColor } from '../../lib/theme';
import { cn } from '../../lib/cn';

export type CardShadow = 'default' | 'pink' | 'mint' | 'sun';

const accentClasses: Record<AccentColor, string> = {
  accent: 'bg-accent text-accent-foreground',
  pop: 'bg-pop text-ink',
  sun: 'bg-sun text-ink',
  mint: 'bg-mint text-ink',
  ink: 'bg-ink text-cream',
};

const shadowClasses: Record<CardShadow, string> = {
  default: 'shadow-pop-lg',
  pink: 'shadow-pop-pink',
  mint: 'shadow-pop-mint',
  sun: 'shadow-pop-sun',
};

type StickerCardProps = {
  title?: ReactNode;
  accent?: AccentColor;
  icon?: ReactNode;
  shadow?: CardShadow;
  className?: string;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, 'title'>;

export function StickerCard({
  title,
  accent = 'accent',
  icon,
  shadow = 'default',
  className = '',
  children,
  ...rest
}: StickerCardProps) {
  return (
    <article
      className={cn(
        'relative rounded-2xl border-2 border-ink bg-card p-5 pt-8 sm:p-6 sm:pt-9 transition-all duration-300 ease-out-soft hover:-translate-y-[3px]',
        shadowClasses[shadow],
        className,
      )}
      {...rest}
    >
      {icon ? (
        <span
          className={cn(
            'absolute -top-5 left-5 grid size-11 place-items-center rounded-full border-2 border-ink',
            accentClasses[accent],
          )}
          aria-hidden="true"
        >
          {icon}
        </span>
      ) : null}
      {title ? (
        <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
      ) : null}
      {children}
    </article>
  );
}
