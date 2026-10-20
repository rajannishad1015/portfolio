import { GraduationCap } from 'lucide-react';
import { education } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { Pill } from './ui/Pill';
import { SectionTitle } from './ui/SectionTitle';

export function Education() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="education"
      ref={ref}
      className="relative px-6 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Background"
          title="Education"
          lead="A B.Sc. in Data Science in Mumbai, on the way to a first full-time role."
        />

        <ol className="relative mt-14 space-y-10">
          <span
            aria-hidden="true"
            className="absolute left-[1.75rem] top-3 bottom-3 w-[3px] rounded-full bg-[repeating-linear-gradient(to_bottom,#1e293b_0_8px,transparent_8px_18px)]"
          />

          {education.map((entry) => (
            <li key={entry.id} className="relative pl-16">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 flex h-14 w-14 flex-col items-center justify-end rounded-t-full rounded-b-lg border-2 border-ink bg-sun pb-1 font-display text-[11px] font-extrabold leading-none text-ink shadow-pop"
              >
                {entry.year}
              </span>

              <div
                data-reveal
                className="rounded-xl border-2 border-ink bg-card p-5 shadow-pop-lg transition-transform duration-300 ease-bounce hover:-rotate-1"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl font-bold text-ink">
                    {entry.qualification}
                  </h3>
                  {entry.current ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-mint/40 px-3 py-1 text-xs font-bold text-ink">
                      <GraduationCap size={13} strokeWidth={2.5} />
                      In progress
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-muted-foreground">{entry.institution}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Pill>{entry.period}</Pill>
                  {entry.detail ? (
                    <span className="text-sm font-semibold text-ink/70">
                      {entry.detail}
                    </span>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
