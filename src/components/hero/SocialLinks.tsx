import { socials } from '../../data/content';
import { ICONS } from '../icons';
import { cn } from '../../lib/cn';

export function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
      <span className="relative flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.16em] text-ink/70">
        Connect with me
        <svg
          className="absolute -bottom-3 left-0 h-2.5 w-full text-pop"
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
                'grid size-12 place-items-center rounded-full border-2 border-ink bg-cream text-ink transition-all duration-300 ease-bounce hover:-translate-y-1 hover:rotate-6 hover:bg-sun',
              )}
            >
              <Icon size={19} strokeWidth={2.5} aria-hidden="true" />
            </a>
          );
        })}
      </span>
    </div>
  );
}
