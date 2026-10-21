import { profile } from '../../data/content';
import { HeroActions } from './HeroActions';

export function HeroContent() {
  return (
    <div>
      <div
        className="animate-enter-up flex items-center justify-between lg:justify-start gap-2"
        style={{ animationDelay: '80ms' }}
      >
        <p className="flex items-center gap-2 text-xl sm:text-2xl font-medium text-ink lg:text-[1.75rem]">
          <span aria-hidden="true" className="inline-block origin-[70%_70%] animate-[wave_2.4s_ease-in-out_1]">
            👋
          </span>
          {profile.greeting}
        </p>
        <div className="inline-flex lg:hidden items-center gap-1.5 rounded-full border-2 border-ink bg-card px-3 py-1 font-display text-[11px] sm:text-xs font-bold text-ink shadow-[2px_2px_0_#1e293b]">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>Available for roles</span>
        </div>
      </div>

      <h1 className="relative mt-3 sm:mt-5 font-display text-[clamp(2.5rem,7.5vw,6.5rem)] font-extrabold leading-[0.9] tracking-[-0.03em]">
        <span
          className="animate-enter-up cut-paper-dark block text-accent"
          style={{ animationDelay: '160ms' }}
        >
          {profile.firstName}{' '}
        </span>
        <span
          className="animate-enter-up cut-paper-violet mt-1 block text-ink"
          style={{ animationDelay: '260ms' }}
        >
          {profile.lastName}
        </span>

        <svg
          aria-hidden="true"
          className="absolute right-full top-[0.4em] mr-3 hidden h-10 w-12 text-sun lg:block"
          viewBox="0 0 48 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        >
          <path d="M6 8 L20 3" />
          <path d="M14 22 L30 18" />
          <path d="M4 32 L18 29" />
        </svg>
      </h1>

      <div
        className="animate-enter-up mt-3.5 sm:mt-6 inline-block rounded-xl border-2 sm:border-0 border-ink bg-card sm:bg-transparent px-3 sm:px-0 py-1.5 sm:py-0 shadow-[2.5px_2.5px_0_#1e293b] sm:shadow-none"
        style={{ animationDelay: '340ms' }}
      >
        <p className="text-xs sm:text-base font-bold sm:font-semibold text-ink sm:text-lg tracking-tight sm:tracking-normal">
          {profile.roleLine}
        </p>
      </div>

      <p
        className="animate-enter-up mt-3 sm:mt-5 max-w-[36rem] text-sm sm:text-base leading-[1.6] sm:leading-[1.65] text-muted-foreground sm:text-[1.0625rem]"
        style={{ animationDelay: '420ms' }}
      >
        {profile.introBefore}
        <strong className="font-semibold text-accent">
          {profile.introHighlight}
        </strong>
        {profile.introAfter}
      </p>

      <HeroActions
        className="animate-enter-up mt-5 sm:mt-8"
        style={{ animationDelay: '500ms' }}
      />
    </div>
  );
}
