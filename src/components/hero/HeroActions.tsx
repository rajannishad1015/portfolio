import { ArrowRight, Download } from 'lucide-react';
import { links } from '../../data/content';
import { cn } from '../../lib/cn';

type ActionProps = {
  className?: string;
  style?: React.CSSProperties;
};

export function HeroActions({ className, style }: ActionProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-4', className)} style={style}>
      <a
        href="#projects"
        className="group inline-flex min-h-[4.25rem] w-full items-center justify-center gap-3 rounded-full border-2 border-ink bg-accent px-7 font-display text-base font-bold text-accent-foreground shadow-pop transition-all duration-300 ease-bounce hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-pop-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-pop-active sm:w-auto"
      >
        View My Work
        <span className="grid size-7 place-items-center rounded-full bg-white text-accent">
          <ArrowRight
            size={15}
            strokeWidth={2.5}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </a>

      <a
        href={links.resumeHref}
        download
        className="group inline-flex min-h-[4.25rem] w-full items-center justify-center gap-3 rounded-full border-2 border-ink bg-cream px-7 font-display text-base font-bold text-ink shadow-pop transition-all duration-300 ease-bounce hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-sun hover:shadow-pop-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-pop-active sm:w-auto"
      >
        Download Resume
        <Download
          size={17}
          strokeWidth={2.5}
          className="transition-transform duration-300 group-hover:translate-y-0.5"
          aria-hidden="true"
        />
      </a>
    </div>
  );
}
