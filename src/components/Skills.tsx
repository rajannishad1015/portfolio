import {
  BarChart3,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Sparkles,
} from 'lucide-react';
import { skillGroups } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { cn } from '../lib/cn';
import { ICONS } from './icons';
import { SectionTitle } from './ui/SectionTitle';
import { StickerCard } from './ui/StickerCard';

const DAILY_DRIVERS = [
  {
    name: 'Python',
    role: 'ML & Data Pipelines',
    mobileRole: 'ML & Pipelines',
    desc: 'Pandas, NumPy, Scikit-learn & PyTorch for model development and analytics.',
    icon: Code2,
    bg: 'bg-pop/10 border-pop text-pop',
    shadow: 'hover:shadow-pop-pink',
  },
  {
    name: 'SQL & Databases',
    role: 'Queries & Data Extraction',
    mobileRole: 'Queries & DBs',
    desc: 'Complex queries, aggregations, window functions & relational database design.',
    icon: Database,
    bg: 'bg-sun/20 border-sun text-amber-600',
    shadow: 'hover:shadow-pop-sun',
  },
  {
    name: 'FastAPI',
    role: 'Inference & Backend APIs',
    mobileRole: 'Inference & APIs',
    desc: 'Deploying high-throughput REST APIs and asynchronous prediction endpoints.',
    icon: Cpu,
    bg: 'bg-mint/25 border-mint text-emerald-600',
    shadow: 'hover:shadow-pop-mint',
  },
  {
    name: 'Next.js & React',
    role: 'Full-Stack UI Development',
    mobileRole: 'Full-Stack Web',
    desc: 'Building responsive data platforms, dashboards, and client-facing web tools.',
    icon: Globe,
    bg: 'bg-accent/15 border-accent text-accent',
    shadow: 'hover:shadow-pop',
  },
  {
    name: 'Power BI & Excel',
    role: 'Reporting & Visualization',
    mobileRole: 'BI & Dashboards',
    desc: 'Interactive business intelligence reports, automated KPIs & exploratory analysis.',
    icon: BarChart3,
    bg: 'bg-pop/10 border-pop text-pop',
    shadow: 'hover:shadow-pop-pink',
  },
  {
    name: 'Git & Docker',
    role: 'DevOps & Reproducibility',
    mobileRole: 'DevOps & CI/CD',
    desc: 'Version control, reproducible environments, containerization & CI workflows.',
    icon: Layers,
    bg: 'bg-cream border-ink text-ink',
    shadow: 'hover:shadow-pop',
  },
] as const;

const GROUP_DESCRIPTIONS: Record<string, string> = {
  'data-viz': 'Exploratory charts, reporting dashboards, and visual storytelling.',
  databases: 'Relational data modeling, querying, and persistent storage.',
  programming: 'Languages, machine learning libraries, and API frameworks.',
  cloud: 'Containerized deployment, version control, and cloud environments.',
  soft: 'Critical thinking, communication, and systematic problem solving.',
};

const PILL_STYLES = {
  accent: {
    pill: 'bg-accent/10 border-ink hover:bg-accent/20',
    dot: 'bg-accent',
  },
  pop: {
    pill: 'bg-pop/15 border-ink hover:bg-pop/25',
    dot: 'bg-pop',
  },
  sun: {
    pill: 'bg-sun/20 border-ink hover:bg-sun/30',
    dot: 'bg-amber-500',
  },
  mint: {
    pill: 'bg-mint/25 border-ink hover:bg-mint/35',
    dot: 'bg-emerald-500',
  },
  ink: {
    pill: 'bg-cream border-ink hover:bg-sand',
    dot: 'bg-ink',
  },
} as const;

export function Skills() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="skills"
      ref={ref}
      className="relative bg-sand px-4 sm:px-6 py-8 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          index="02"
          eyebrow="Toolkit"
          title="Skills & Stack"
          lead="The technologies, libraries, and frameworks I use to analyze data, build predictive models, and deploy reliable software."
        />

        {/* Daily Drivers Spotlight */}
        <div className="mt-6 sm:mt-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid size-6 sm:size-7 place-items-center rounded-lg border-2 border-ink bg-sun text-ink shadow-sm">
                <Sparkles size={13} strokeWidth={2.5} className="sm:size-[15px]" />
              </span>
              <h3 className="font-display text-xs sm:text-sm font-extrabold uppercase tracking-wider text-ink">
                Daily Drivers & Core Stack
              </h3>
            </div>
            <span className="font-hand text-xs sm:text-sm font-bold text-muted-foreground">
              Go-to tools ⚡
            </span>
          </div>

          <div className="mt-3 sm:mt-5 grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
            {DAILY_DRIVERS.map((driver) => {
              const IconComp = driver.icon;
              return (
                <div
                  key={driver.name}
                  data-reveal
                  className={cn(
                    'group relative rounded-xl sm:rounded-2xl border-2 border-ink bg-card p-2.5 sm:p-5 shadow-[2px_2px_0_#1e293b] sm:shadow-pop transition-all duration-300 ease-bounce hover:-translate-y-1',
                    driver.shadow,
                  )}
                >
                  <div className="flex items-center sm:items-start justify-between gap-1.5">
                    <div className="min-w-0">
                      <h4 className="font-display text-xs sm:text-lg font-black text-ink truncate sm:whitespace-normal">
                        {driver.name}
                      </h4>
                      <p className="font-display text-[9px] sm:text-xs font-bold uppercase tracking-tight sm:tracking-wide text-accent truncate">
                        <span className="sm:hidden">{driver.mobileRole}</span>
                        <span className="hidden sm:inline">{driver.role}</span>
                      </p>
                    </div>
                    <span
                      className={cn(
                        'grid size-7 sm:size-9 shrink-0 place-items-center rounded-lg sm:rounded-xl border-1.5 sm:border-2 border-ink',
                        driver.bg,
                      )}
                    >
                      <IconComp size={13} strokeWidth={2.5} className="sm:size-[18px]" />
                    </span>
                  </div>
                  <p className="hidden sm:block mt-3 text-xs leading-relaxed text-muted-foreground">
                    {driver.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Categorized Technical Directory */}
        <div className="relative mt-8 sm:mt-14">
          <div className="mb-4 sm:mb-6 flex items-center justify-between">
            <h3 className="font-display text-xs sm:text-sm font-extrabold uppercase tracking-wider text-muted-foreground">
              Complete Technical Directory
            </h3>
            <span className="text-[11px] sm:text-xs font-semibold text-muted-foreground">
              5 Disciplines
            </span>
          </div>

          <div className="relative grid gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => {
              const Icon = ICONS[group.icon];
              const desc = GROUP_DESCRIPTIONS[group.id] || '';

              return (
                <StickerCard
                  key={group.id}
                  data-reveal
                  title={group.title}
                  accent={group.color}
                  icon={<Icon size={15} strokeWidth={2.5} className="sm:size-5" />}
                  className="flex flex-col justify-between"
                >
                  <div>
                    {desc ? (
                      <p className="hidden sm:block mt-2 text-xs text-muted-foreground leading-relaxed">
                        {desc}
                      </p>
                    ) : null}

                    <div className="mt-2.5 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
                      {group.items.map((item) => {
                        const styles = PILL_STYLES[group.color];
                        return (
                          <span
                            key={item}
                            className={cn(
                              'inline-flex items-center gap-1 rounded-lg sm:rounded-xl border-1.5 sm:border-2 px-2 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-bold text-ink transition-all duration-200 ease-bounce hover:-translate-y-0.5 hover:shadow-pop cursor-default',
                              styles.pill,
                            )}
                          >
                            <span
                              className={cn('size-1 sm:size-1.5 rounded-full', styles.dot)}
                            />
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </StickerCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
