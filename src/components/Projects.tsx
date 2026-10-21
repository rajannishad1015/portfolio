import type { ReactNode } from 'react';
import { Check, ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { SectionTitle } from './ui/SectionTitle';
import { StickerCard } from './ui/StickerCard';

type Project = (typeof projects)[number];

const isPlaceholder = (url: string) => url === '#' || url.length === 0;

function ProjectLink({
  url,
  label,
  icon,
}: {
  url: string;
  label: string;
  icon: ReactNode;
}) {
  if (isPlaceholder(url)) {
    return (
      <span className="inline-flex min-h-9 sm:min-h-11 items-center gap-1.5 rounded-full border-1.5 sm:border-2 border-dashed border-ink/25 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-muted-foreground">
        {icon}
        Link coming soon
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-9 sm:min-h-11 items-center gap-1.5 sm:gap-2 rounded-full border-2 border-ink bg-card px-3.5 py-1.5 sm:px-4 sm:py-2 font-display text-xs sm:text-sm font-bold shadow-[2px_2px_0_#1e293b] sm:shadow-pop transition-all duration-300 ease-bounce hover:-translate-y-[2px] hover:shadow-pop-hover active:translate-y-[1px]"
    >
      {icon}
      {label}
    </a>
  );
}

function ProjectHeading({ project }: { project: Project }) {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-lg sm:text-2xl font-black text-ink">
              {project.title}
            </h3>
            {project.featured ? (
              <span className="sm:hidden rounded-full border-1.5 border-ink bg-sun px-2 py-0.5 font-display text-[10px] font-extrabold uppercase tracking-wide text-ink shadow-xs">
                ★ Featured
              </span>
            ) : null}
          </div>
          <p className="mt-0.5 sm:mt-1 font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-accent">
            {project.subtitle}
          </p>
        </div>
        {project.featured ? (
          <span className="hidden sm:inline-block rotate-[8deg] rounded-full border-2 border-ink bg-sun px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-widest text-ink shadow-pop">
            ★ Featured
          </span>
        ) : null}
      </div>
      <p className="mt-2.5 sm:mt-4 text-xs sm:text-base leading-relaxed text-ink/80">
        {project.blurb}
      </p>
    </>
  );
}

function ProjectBullets({ bullets }: { bullets: readonly string[] }) {
  return (
    <ul className="mt-3 sm:mt-6 space-y-2 sm:space-y-3">
      {bullets.map((bullet) => (
        <li key={bullet} className="flex items-start gap-2 sm:gap-3 text-ink/85">
          <span className="mt-0.5 grid size-4 sm:size-5 shrink-0 place-items-center rounded-full bg-mint">
            <Check size={10} strokeWidth={3} className="text-ink sm:hidden" />
            <Check size={13} strokeWidth={3} className="text-ink hidden sm:block" />
          </span>
          <span className="text-xs sm:text-base leading-snug sm:leading-relaxed">
            {bullet}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ProjectMetrics({ metrics }: { metrics: Project['metrics'] }) {
  return (
    <div className="mt-3 sm:mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-lg sm:rounded-xl border-1.5 sm:border-2 border-ink bg-sun/40 p-2 sm:px-4 sm:py-2 text-center sm:text-left shadow-[2px_2px_0_#1e293b] sm:shadow-none"
        >
          <p className="font-display text-lg sm:text-2xl font-extrabold leading-none text-ink">
            {metric.value}
          </p>
          <p className="mt-0.5 sm:mt-1 text-[9.5px] sm:text-xs font-semibold uppercase tracking-tight sm:tracking-wide text-ink/75 truncate">
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function ProjectTags({ tags }: { tags: readonly string[] }) {
  return (
    <div className="mt-3 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-md sm:rounded-full border sm:border-2 border-ink bg-accent/15 px-2 py-0.5 sm:px-3 sm:py-1 text-[10.5px] sm:text-xs font-semibold text-ink"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-4 sm:mt-7 flex flex-wrap items-center gap-2 sm:gap-3">
      {project.links.live ? (
        <ProjectLink
          url={project.links.live}
          label="Live"
          icon={<ExternalLink size={13} strokeWidth={2.5} className="sm:size-3.5" />}
        />
      ) : null}
      {project.links.source ? (
        <ProjectLink
          url={project.links.source}
          label="Source"
          icon={<Github size={13} strokeWidth={2.5} className="sm:size-3.5" />}
        />
      ) : null}
    </div>
  );
}

export function Projects() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="projects"
      ref={ref}
      className="relative px-4 sm:px-6 py-8 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          index="03"
          eyebrow="Work"
          title="Selected Projects"
          lead="Five production builds that show the range: a full-stack platform, survival-based uplift ML, multi-model document intelligence, hybrid recommendation systems, and autonomous telemetry."
        />

        <div className="mt-6 sm:mt-14 grid gap-4 sm:gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <StickerCard
              key={project.id}
              data-reveal
              data-featured={project.featured ? 'true' : 'false'}
              shadow={project.featured ? 'pink' : 'default'}
              className={project.featured ? 'md:col-span-2' : ''}
            >
              {project.featured ? (
                <div className="grid gap-4 sm:gap-8 md:grid-cols-[1.5fr_1fr]">
                  <div>
                    <ProjectHeading project={project} />
                    <ProjectBullets bullets={project.bullets} />
                  </div>
                  <div className="md:border-l-2 md:border-ink/10 md:pl-8 flex flex-col justify-between">
                    <div>
                      <ProjectMetrics metrics={project.metrics} />
                      <ProjectTags tags={project.tags} />
                    </div>
                    <ProjectLinks project={project} />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <ProjectHeading project={project} />
                    <ProjectMetrics metrics={project.metrics} />
                    <ProjectBullets bullets={project.bullets} />
                    <ProjectTags tags={project.tags} />
                  </div>
                  <ProjectLinks project={project} />
                </div>
              )}
            </StickerCard>
          ))}
        </div>
      </div>
    </section>
  );
}
