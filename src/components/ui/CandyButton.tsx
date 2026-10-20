import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import { cn } from '../../lib/cn';

export type CandyVariant = 'primary' | 'secondary';

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-ink px-5 py-2.5 font-display text-base font-bold leading-none transition-all duration-300 ease-bounce';

const variants: Record<CandyVariant, string> = {
  primary:
    'bg-accent text-accent-foreground shadow-pop hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-pop-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-pop-active',
  secondary: 'bg-transparent text-ink hover:bg-sun',
};

type SharedProps = {
  variant?: CandyVariant;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

function Inner({ icon, children }: Pick<SharedProps, 'icon' | 'children'>) {
  return (
    <>
      <span>{children}</span>
      {icon ? (
        <span className="grid size-6 place-items-center rounded-full bg-white text-ink">
          {icon}
        </span>
      ) : null}
    </>
  );
}

export function CandyLink({
  variant = 'primary',
  icon,
  className = '',
  children,
  ...rest
}: SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href: string;
  }) {
  return (
    <a className={cn(base, variants[variant], className)} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </a>
  );
}

export function CandyButton({
  variant = 'primary',
  icon,
  className = '',
  type = 'button',
  children,
  ...rest
}: SharedProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
}
