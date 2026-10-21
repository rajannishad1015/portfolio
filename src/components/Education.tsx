import { BookOpen, GraduationCap, MapPin } from 'lucide-react';
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
      className="relative bg-sand px-4 sm:px-6 py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          index="04"
          eyebrow="Background"
          title="Education"
          lead="Academic foundation in statistics, applied machine learning, and computer science in Mumbai."
        />

        <div className="relative mt-10 sm:mt-14">
          <ol className="relative space-y-8 sm:space-y-10 pl-2 sm:pl-10">
            {/* Connected Vertical Timeline Line */}
            <span
              aria-hidden="true"
              className="absolute left-[1.35rem] sm:left-[3.25rem] top-6 bottom-6 w-[3px] rounded-full bg-[repeating-linear-gradient(to_bottom,#1e293b_0_8px,transparent_8px_18px)]"
            />

            {education.map((entry) => (
              <li key={entry.id} className="relative pl-7 sm:pl-14">
                {/* Timeline Node Stamp */}
                <div
                  aria-hidden="true"
                  className={`absolute -left-3 sm:-left-8 top-1.5 flex size-10 sm:size-14 flex-col items-center justify-center rounded-xl sm:rounded-2xl border-2 border-ink ${
                    entry.current ? 'bg-mint' : 'bg-sun'
                  } font-display text-[10px] sm:text-sm font-black leading-none text-ink shadow-pop`}
                >
                  <GraduationCap size={15} strokeWidth={2.5} className="mb-0.5 sm:size-[18px]" />
                  <span>{entry.year}</span>
                </div>

                {/* Content Card */}
                <div
                  data-reveal
                  className={`rounded-2xl border-2 border-ink bg-card p-4 sm:p-7 shadow-pop-lg transition-all duration-300 ease-bounce hover:-translate-y-1 ${
                    entry.current ? 'border-accent/80' : ''
                  }`}
                >
                  {/* Top Bar: Qualification & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-xl sm:text-2xl font-black text-ink">
                        {entry.qualification}
                      </h3>
                      {entry.current ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-mint/40 px-3 py-1 text-xs font-bold text-ink shadow-sm">
                          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                          In progress
                        </span>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-2">
                      <Pill className="text-xs">{entry.period}</Pill>
                    </div>
                  </div>

                  {/* Institution & Location */}
                  <p className="mt-2 flex items-center gap-1.5 text-sm font-bold text-accent">
                    <MapPin size={15} className="shrink-0 text-pop" />
                    <span>{entry.institution}</span>
                  </p>

                  {/* Degree/Stream Summary */}
                  {entry.detail ? (
                    <p className="mt-3 text-sm text-ink/80 leading-relaxed font-medium">
                      {entry.detail}
                    </p>
                  ) : null}

                  {/* Coursework & Focus Areas Chips */}
                  {entry.coursework && entry.coursework.length > 0 ? (
                    <div className="mt-5 pt-4 border-t border-ink/10">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <BookOpen size={13} className="text-accent" />
                        Key Coursework & Subjects
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {entry.coursework.map((course) => (
                          <span
                            key={course}
                            className="inline-flex items-center rounded-xl border border-ink/20 bg-sand/60 px-2.5 py-1 text-xs font-bold text-ink transition-transform duration-200 hover:-translate-y-0.5"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
