import {
  Award,
  BookOpen,
  Briefcase,
  Code2,
  Compass,
  Database,
  GraduationCap,
  LineChart,
  MapPin,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { profile, stats } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { cn } from '../lib/cn';
import { DotGrid } from './ui/DotGrid';
import { Pill } from './ui/Pill';
import { SectionTitle } from './ui/SectionTitle';

const STAT_CONFIGS = [
  {
    icon: Code2,
    tone: 'text-pop',
    bg: 'bg-pop/15 text-pop border-pop',
    shadow: 'hover:shadow-pop-pink',
  },
  {
    icon: Award,
    tone: 'text-amber-600',
    bg: 'bg-sun/20 text-amber-600 border-sun',
    shadow: 'hover:shadow-pop-sun',
  },
  {
    icon: GraduationCap,
    tone: 'text-emerald-600',
    bg: 'bg-mint/25 text-emerald-600 border-mint',
    shadow: 'hover:shadow-pop-mint',
  },
  {
    icon: BookOpen,
    tone: 'text-accent',
    bg: 'bg-accent/15 text-accent border-accent',
    shadow: 'hover:shadow-pop',
  },
] as const;

export function About() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className="relative px-4 sm:px-6 py-8 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          index="01"
          eyebrow="Background"
          title="About Me"
          lead="Final-year Data Science student at Kes Shroff College, Mumbai, with practical experience in machine learning, data analysis, and software development."
        />

        <div className="mt-6 sm:mt-12 grid gap-5 sm:gap-8 lg:grid-cols-12 items-start">
          {/* Main Story Card */}
          <div
            data-reveal
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-ink bg-card p-4 sm:p-8 lg:p-9 shadow-pop sm:shadow-pop-lg lg:col-span-7 transition-all duration-300"
          >
            <DotGrid className="absolute inset-0 opacity-30" />

            <div className="relative">
              {/* Context Pill */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-cream px-2.5 py-0.5 text-[11px] sm:text-xs font-bold text-ink">
                  <MapPin size={11} className="text-pop shrink-0" />
                  Mumbai • Kes Shroff College
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-mint/25 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-ink">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available for Roles
                </span>
              </div>

              {/* Professional Title */}
              <h3 className="mt-3 sm:mt-5 font-display text-base sm:text-2xl md:text-3xl font-black text-ink leading-snug">
                Data Science student focused on applied machine learning and building functional data applications.
              </h3>

              {/* Authentic Narrative */}
              <div className="mt-2.5 sm:mt-4 space-y-2.5 sm:space-y-3 text-xs sm:text-base leading-relaxed text-ink/85 sm:text-lg">
                <p>{profile.about}</p>
              </div>

              {/* Practical Focus Areas */}
              <div className="mt-3.5 sm:mt-8 grid grid-cols-3 gap-1.5 sm:gap-3">
                <div className="rounded-xl border border-ink/20 sm:border-2 sm:border-ink bg-cream/70 p-2 sm:p-3.5 text-center sm:text-left transition-all duration-300 ease-bounce hover:-translate-y-1 hover:shadow-pop">
                  <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-accent">
                    <LineChart size={15} strokeWidth={2.5} className="sm:size-[18px]" />
                    <h4 className="font-display text-[10px] sm:text-xs font-extrabold uppercase tracking-tight sm:tracking-wide text-ink">
                      Data Analysis
                    </h4>
                  </div>
                  <p className="hidden sm:block mt-1 text-xs text-muted-foreground leading-relaxed">
                    EDA, data cleaning, statistical modeling, and dashboards using Python, SQL, and Power BI.
                  </p>
                </div>

                <div className="rounded-xl border border-ink/20 sm:border-2 sm:border-ink bg-cream/70 p-2 sm:p-3.5 text-center sm:text-left transition-all duration-300 ease-bounce hover:-translate-y-1 hover:shadow-pop">
                  <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-pop">
                    <Database size={15} strokeWidth={2.5} className="sm:size-[18px]" />
                    <h4 className="font-display text-[10px] sm:text-xs font-extrabold uppercase tracking-tight sm:tracking-wide text-ink">
                      ML Models
                    </h4>
                  </div>
                  <p className="hidden sm:block mt-1 text-xs text-muted-foreground leading-relaxed">
                    Regression, classification, NLP classification, and survival analysis with Scikit-learn.
                  </p>
                </div>

                <div className="rounded-xl border border-ink/20 sm:border-2 sm:border-ink bg-cream/70 p-2 sm:p-3.5 text-center sm:text-left transition-all duration-300 ease-bounce hover:-translate-y-1 hover:shadow-pop">
                  <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-emerald-600">
                    <Code2 size={15} strokeWidth={2.5} className="sm:size-[18px]" />
                    <h4 className="font-display text-[10px] sm:text-xs font-extrabold uppercase tracking-tight sm:tracking-wide text-ink">
                      App Dev
                    </h4>
                  </div>
                  <p className="hidden sm:block mt-1 text-xs text-muted-foreground leading-relaxed">
                    Serving models via FastAPI backend endpoints and building responsive user interfaces.
                  </p>
                </div>
              </div>

              {/* Working Strengths / Soft Skills */}
              <div className="mt-3.5 sm:mt-8 border-t-2 border-ink/10 pt-3 sm:pt-6">
                <p className="text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Core Strengths
                </p>
                <div className="mt-1.5 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2.5">
                  {profile.softSkills.map((skill) => (
                    <Pill
                      key={skill}
                      className="text-[11px] sm:text-xs px-2.5 py-0.5 sm:py-1 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-pop"
                    >
                      {skill}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stats & Current Focus Card */}
          <div className="grid gap-3 sm:gap-6 lg:col-span-5">
            {/* 2x2 Stats grid on mobile and tablet */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-4">
              {stats.map((stat, idx) => {
                const config = STAT_CONFIGS[idx % STAT_CONFIGS.length];
                const IconComponent = config.icon;

                return (
                  <div
                    key={stat.label}
                    data-reveal
                    className={cn(
                      'group relative rounded-xl sm:rounded-2xl border-2 border-ink bg-card p-3 sm:p-5 text-left shadow-[2px_2px_0_#1e293b] sm:shadow-pop transition-all duration-300 ease-bounce hover:-translate-y-1.5',
                      config.shadow,
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          'grid size-7 sm:size-10 place-items-center rounded-lg sm:rounded-xl border-1.5 sm:border-2 border-ink',
                          config.bg,
                        )}
                      >
                        <IconComponent size={14} strokeWidth={2.5} className="sm:size-5" />
                      </span>
                    </div>

                    <p
                      className={cn(
                        'mt-2 sm:mt-4 font-display text-xl sm:text-4xl font-black leading-none',
                        config.tone,
                      )}
                    >
                      {stat.value}
                    </p>
                    <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-ink/75">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Current Focus & Primary Toolkit Card */}
            <div
              data-reveal
              className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-ink bg-card p-3.5 sm:p-5 shadow-[2.5px_2.5px_0_#1e293b] sm:shadow-pop transition-all duration-300 ease-bounce hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid size-7 sm:size-8 place-items-center rounded-lg border-2 border-ink bg-sun text-ink shadow-sm">
                    <Sparkles size={14} strokeWidth={2.5} className="sm:size-4" />
                  </span>
                  <span className="font-display text-xs sm:text-sm font-extrabold uppercase tracking-wider text-ink">
                    Current Focus
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-emerald-700 bg-mint/30 px-2 py-0.5 rounded-full border border-ink/20">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              </div>

              <div className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3.5 text-xs text-ink/85">
                <div>
                  <p className="font-bold text-ink flex items-center gap-1.5 text-[11px] sm:text-xs">
                    <Compass size={13} className="text-accent sm:size-3.5" />
                    Areas of Interest
                  </p>
                  <p className="mt-0.5 sm:mt-1 text-muted-foreground text-[11px] sm:text-xs leading-normal sm:leading-relaxed">
                    Applied Machine Learning, Predictive Analytics, NLP Pipelines, and API-driven data products.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-ink flex items-center gap-1.5 text-[11px] sm:text-xs">
                    <Terminal size={13} className="text-pop sm:size-3.5" />
                    Primary Toolkit
                  </p>
                  <div className="mt-1 sm:mt-1.5 flex flex-wrap gap-1 sm:gap-1.5">
                    {['Python', 'Scikit-learn', 'SQL', 'FastAPI', 'Pandas', 'Next.js'].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-ink/20 bg-cream px-1.5 sm:px-2 py-0.5 font-mono text-[10px] sm:text-[11px] font-semibold text-ink"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-ink/10">
                  <p className="font-bold text-ink flex items-center gap-1.5 text-[11px] sm:text-xs">
                    <Briefcase size={13} className="text-emerald-600 sm:size-3.5" />
                    Open To
                  </p>
                  <p className="mt-0.5 sm:mt-1 text-muted-foreground text-[11px] sm:text-xs leading-normal sm:leading-relaxed">
                    Internships & entry-level Data Analyst, Junior Data Scientist, or ML Developer roles in Mumbai & remote.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
