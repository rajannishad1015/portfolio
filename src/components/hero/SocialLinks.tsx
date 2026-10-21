import { socials } from '../../data/content';
import { ICONS } from '../icons';
import { cn } from '../../lib/cn';

export function SocialLinks() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-x-5 sm:gap-y-4">
      <span className="relative flex items-center gap-2 font-display text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-ink/75">
        Connect with me
        <svg
          className="absolute -bottom-2.5 left-0 h-2 w-full text-pop"
          viewBox="0 0 120 10"
          fill="none"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <path
            d="M2 7c10-6 16 4 26-1s14 5 24 0 14 2 24 0 18 2 40-2"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <span className="flex items-center gap-3">
        {socials.map((social) => {
          const Icon = ICONS[social.icon];
          return (
            <a
              key={social.label}
              href={social.href}
              {...(social.external
                ? { target: '_blank', rel: 'noreferrer' }
                : {})}
              aria-label={social.label}
              className={cn(
                'grid size-11 sm:size-12 place-items-center rounded-full border-2 border-ink bg-cream text-ink shadow-[2px_2px_0_#1e293b] sm:shadow-none transition-all duration-300 ease-bounce hover:-translate-y-1 hover:rotate-6 hover:bg-sun active:translate-x-[1px] active:translate-y-[1px]',
              )}
            >
              <Icon size={18} strokeWidth={2.5} className="sm:size-[19px]" aria-hidden="true" />
            </a>
          );
        })}
      </span>
    </div>
  );
}
