import { ArrowRight, Download } from 'lucide-react';
import { links } from '../../data/content';
import { cn } from '../../lib/cn';

type ActionProps = {
  className?: string;
  style?: React.CSSProperties;
};

export function HeroActions({ className, style }: ActionProps) {
  return (
    <div className={cn('grid grid-cols-2 sm:flex sm:flex-row items-center gap-2.5 sm:gap-4', className)} style={style}>
      <a
        href="#projects"
        className="group inline-flex min-h-[3rem] sm:min-h-[4.25rem] w-full items-center justify-center gap-2 sm:gap-3 rounded-full border-2 border-ink bg-accent px-3 sm:px-7 font-display text-xs sm:text-base font-bold text-accent-foreground shadow-pop transition-all duration-300 ease-bounce hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-pop-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-pop-active sm:w-auto text-center"
      >
        <span>View My Work</span>
        <span className="grid size-5 sm:size-7 place-items-center rounded-full bg-white text-accent shrink-0">
          <ArrowRight
            size={12}
            strokeWidth={2.5}
            className="transition-transform duration-300 group-hover:translate-x-0.5 sm:size-[15px]"
            aria-hidden="true"
          />
        </span>
      </a>

      <a
        href={links.resumeHref}
        download
        aria-label="Download Resume"
        className="group inline-flex min-h-[3rem] sm:min-h-[4.25rem] w-full items-center justify-center gap-2 sm:gap-3 rounded-full border-2 border-ink bg-cream px-3 sm:px-7 font-display text-xs sm:text-base font-bold text-ink shadow-pop transition-all duration-300 ease-bounce hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-sun hover:shadow-pop-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-pop-active sm:w-auto text-center"
      >
        <span className="sm:hidden">Resume</span>
        <span className="hidden sm:inline">Download Resume</span>
        <Download
          size={14}
          strokeWidth={2.5}
          className="transition-transform duration-300 group-hover:translate-y-0.5 sm:size-[17px] shrink-0"
          aria-hidden="true"
        />
      </a>
    </div>
  );
}
