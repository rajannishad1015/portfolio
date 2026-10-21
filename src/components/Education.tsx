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
      className="relative bg-sand px-4 sm:px-6 py-8 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          index="04"
          eyebrow="Background"
          title="Education"
          lead="Academic foundation in statistics, applied machine learning, and computer science in Mumbai."
        />

        <div className="relative mt-8 sm:mt-14">
          <ol className="relative space-y-4 sm:space-y-8 pl-0 sm:pl-10">
            {/* Connected Vertical Timeline Line */}
            <span
              aria-hidden="true"
              className="absolute left-[1rem] sm:left-[3.25rem] top-5 bottom-5 w-[2px] sm:w-[3px] rounded-full bg-[repeating-linear-gradient(to_bottom,#1e293b_0_8px,transparent_8px_18px)]"
            />

            {education.map((entry) => (
              <li key={entry.id} className="relative pl-11 sm:pl-14">
                {/* Timeline Node Stamp */}
                <div
                  aria-hidden="true"
                  className={`absolute left-0 sm:-left-8 top-1 flex size-8 sm:size-14 flex-col items-center justify-center rounded-lg sm:rounded-2xl border-1.5 sm:border-2 border-ink ${
                    entry.current ? 'bg-mint' : 'bg-sun'
                  } font-display text-[8.5px] sm:text-sm font-black leading-none text-ink shadow-[2px_2px_0_#1e293b] sm:shadow-pop`}
                >
                  <GraduationCap size={12} strokeWidth={2.5} className="mb-0.5 sm:size-[18px]" />
                  <span>{entry.year}</span>
                </div>

                {/* Content Card */}
                <div
                  data-reveal
                  className={`rounded-2xl border-2 border-ink bg-card p-3.5 sm:p-7 shadow-[3px_3px_0_#1e293b] sm:shadow-pop-lg transition-all duration-300 ease-bounce hover:-translate-y-1 ${
                    entry.current ? 'border-ink bg-card' : ''
                  }`}
                >
                  {/* Top Bar: Qualification, Status & Period */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
                        <h3 className="font-display text-sm sm:text-2xl font-black text-ink">
                          {entry.qualification}
                        </h3>
                        {entry.current ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-ink/30 sm:border-2 sm:border-ink bg-mint/40 px-2 py-0.5 sm:px-3 sm:py-1 text-[9.5px] sm:text-xs font-bold text-ink shadow-xs">
                            <span className="size-1.5 sm:size-2 rounded-full bg-emerald-500 animate-pulse" />
                            In progress
                          </span>
                        ) : null}
                      </div>

                      {/* Institution & Location */}
                      <p className="mt-1 flex items-center gap-1 text-xs sm:text-sm font-bold text-accent">
                        <MapPin size={12} className="shrink-0 text-pop sm:size-[15px]" />
                        <span className="truncate">{entry.institution}</span>
                      </p>
                    </div>

                    <Pill className="text-[10px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1 shrink-0">
                      {entry.period}
                    </Pill>
                  </div>

                  {/* Degree/Stream Summary */}
                  {entry.detail ? (
                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-ink/80 leading-relaxed font-medium">
                      {entry.detail}
                    </p>
                  ) : null}

                  {/* Coursework & Focus Areas Chips */}
                  {entry.coursework && entry.coursework.length > 0 ? (
                    <div className="mt-3 sm:mt-5 pt-2.5 sm:pt-4 border-t border-ink/10">
                      <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                        <BookOpen size={11} className="text-accent sm:size-[13px]" />
                        Key Coursework & Subjects
                      </p>
                      <div className="mt-1.5 sm:mt-2.5 flex flex-wrap gap-1 sm:gap-2">
                        {entry.coursework.map((course) => (
                          <span
                            key={course}
                            className="inline-flex items-center rounded-md sm:rounded-xl border border-ink/20 bg-sand/60 px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5"
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
