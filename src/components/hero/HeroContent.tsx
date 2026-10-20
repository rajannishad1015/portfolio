import { profile } from '../../data/content';
import { HeroActions } from './HeroActions';

export function HeroContent() {
  return (
    <div>
      <p
        className="animate-enter-up flex items-center gap-2 text-2xl font-medium text-ink lg:text-[1.75rem]"
        style={{ animationDelay: '80ms' }}
      >
        <span aria-hidden="true" className="inline-block origin-[70%_70%] animate-[wave_2.4s_ease-in-out_1]">
          👋
        </span>
        {profile.greeting}
      </p>

      <h1 className="relative mt-5 font-display text-[clamp(3rem,8.2vw,6.5rem)] font-extrabold leading-[0.9] tracking-[-0.03em]">
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

      <p
        className="animate-enter-up mt-6 text-base font-semibold text-ink sm:text-lg"
        style={{ animationDelay: '340ms' }}
      >
        {profile.roleLine}
      </p>

      <p
        className="animate-enter-up mt-5 max-w-[36rem] text-base leading-[1.65] text-muted-foreground sm:text-[1.0625rem]"
        style={{ animationDelay: '420ms' }}
      >
        {profile.introBefore}
        <strong className="font-semibold text-accent">
          {profile.introHighlight}
        </strong>
        {profile.introAfter}
      </p>

      <HeroActions
        className="animate-enter-up mt-8"
        style={{ animationDelay: '500ms' }}
      />
    </div>
  );
}
