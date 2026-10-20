import { ArrowRight, Download } from 'lucide-react';
import { links, marqueeItems, profile } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { FloatingShapes } from './FloatingShapes';
import { CandyLink } from './ui/CandyButton';
import { DotGrid } from './ui/DotGrid';
import { Marquee } from './ui/Marquee';
import { Squiggle } from './ui/Squiggle';

const floatingPills = [
  { label: 'Python', className: 'left-[2%] top-[14%]', animation: 'animate-float-y' },
  { label: 'SQL', className: 'right-[4%] top-[10%]', animation: 'animate-float-x' },
  { label: 'Power BI', className: 'left-[8%] bottom-[18%]', animation: 'animate-float-x' },
  { label: 'Next.js', className: 'right-[10%] bottom-[12%]', animation: 'animate-float-y' },
  { label: 'Scikit-learn', className: 'left-[-2%] top-[46%]', animation: 'animate-float-y' },
  { label: 'FastAPI', className: 'right-[-2%] top-[42%]', animation: 'animate-float-x' },
];

export function Hero() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="home"
      ref={ref}
      className="relative overflow-hidden px-6 pb-16 pt-20 lg:pb-24 lg:pt-28"
    >
      <FloatingShapes />

      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div>
          <span
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-mint/30 px-4 py-1.5 text-sm font-semibold text-ink"
          >
            <span className="size-2.5 rounded-full bg-mint" aria-hidden="true" />
            {profile.availability}
          </span>

          <h1
            data-reveal
            className="mt-6 text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </h1>

          <div data-reveal className="mt-4 flex items-baseline gap-3">
            <span className="relative inline-flex h-[1.4em] w-full overflow-hidden font-display text-2xl font-bold text-accent sm:text-3xl">
              {profile.roles.map((role, index) => (
                <span
                  key={role}
                  data-role-word={index}
                  className="absolute inset-x-0 top-0 animate-role-swap whitespace-nowrap"
                  style={{ animationDelay: `${index * 2.4}s` }}
                >
                  {role}
                </span>
              ))}
            </span>
          </div>

          <Squiggle className="mt-4 h-3 w-40 text-pop" />

          <p
            data-reveal
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {profile.summary}
          </p>

          <div data-reveal className="mt-8 flex flex-wrap items-center gap-4">
            <CandyLink
              href="#projects"
              icon={<ArrowRight size={14} strokeWidth={2.5} />}
            >
              View Projects
            </CandyLink>
            <CandyLink
              href={links.resumeHref}
              download
              variant="secondary"
              icon={<Download size={14} strokeWidth={2.5} />}
            >
              Download CV
            </CandyLink>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 size-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun"
          />
          <DotGrid className="absolute inset-0 -z-10 rounded-3xl opacity-70" />
          <div
            aria-hidden="true"
            className="absolute right-[4%] top-[4%] h-40 w-40 animate-blob bg-accent/80"
          />

          {floatingPills.map((pill, index) => (
            <span
              key={pill.label}
              className={`absolute ${pill.className} ${pill.animation} inline-flex items-center rounded-full border-2 border-ink bg-card px-4 py-2 font-display text-sm font-bold shadow-pop`}
              style={{ animationDelay: `${index * 0.6}s` }}
            >
              {pill.label}
            </span>
          ))}

          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-ink bg-accent font-display text-5xl font-extrabold text-accent-foreground shadow-pop"
          >
            {profile.initials}
          </div>

          <div className="absolute bottom-[4%] left-0 w-56 -rotate-4 rounded-xl border-2 border-ink bg-card p-4 shadow-pop-lg">
            <p className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
              today
            </p>
            <pre className="mt-2 overflow-x-auto font-mono text-xs leading-relaxed text-ink">
              <code>{`model.fit(X_train, y_train)
score = model.score(X_test, y_test)
print(f"{score:.0%} accurate")`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl border-y-2 border-ink/10 py-4">
        <Marquee items={marqueeItems} />
      </div>
    </section>
  );
}
