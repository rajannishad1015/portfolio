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
      <span className="inline-flex min-h-11 items-center gap-1.5 rounded-full border-2 border-dashed border-ink/25 px-3.5 py-1.5 text-xs font-semibold text-muted-foreground">
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
      className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-ink bg-card px-4 py-2 font-display text-sm font-bold shadow-pop transition-all duration-300 ease-bounce hover:-translate-y-[2px] hover:shadow-pop-hover active:translate-y-[1px]"
    >
      {icon}
      {label}
    </a>
  );
}

function ProjectHeading({ project }: { project: Project }) {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-extrabold text-ink">
            {project.title}
          </h3>
          <p className="mt-1 font-display text-sm font-bold uppercase tracking-widest text-accent">
            {project.subtitle}
          </p>
        </div>
        {project.featured ? (
          <span className="rotate-[8deg] rounded-full border-2 border-ink bg-sun px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-widest text-ink shadow-pop">
            ★ Featured
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-ink/80">{project.blurb}</p>
    </>
  );
}

function ProjectBullets({ bullets }: { bullets: readonly string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {bullets.map((bullet) => (
        <li key={bullet} className="flex items-start gap-3 text-ink/85">
          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-mint">
            <Check size={13} strokeWidth={3} className="text-ink" />
          </span>
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectMetrics({ metrics }: { metrics: Project['metrics'] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-xl border-2 border-ink bg-sun/40 px-4 py-2"
        >
          <p className="font-display text-2xl font-extrabold leading-none text-ink">
            {metric.value}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink/70">
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function ProjectTags({ tags }: { tags: readonly string[] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-full border-2 border-ink bg-accent/15 px-3 py-1 text-xs font-semibold text-ink"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-7 flex flex-wrap gap-3">
      {project.links.live ? (
        <ProjectLink
          url={project.links.live}
          label="Live"
          icon={<ExternalLink size={14} strokeWidth={2.5} />}
        />
      ) : null}
      {project.links.source ? (
        <ProjectLink
          url={project.links.source}
          label="Source"
          icon={<Github size={14} strokeWidth={2.5} />}
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
      className="relative px-4 sm:px-6 py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          index="03"
          eyebrow="Work"
          title="Selected Projects"
          lead="Five production builds that show the range: a full-stack platform, survival-based uplift ML, multi-model document intelligence, hybrid recommendation systems, and autonomous telemetry."
        />

        <div className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <StickerCard
              key={project.id}
              data-reveal
              data-featured={project.featured ? 'true' : 'false'}
              shadow={project.featured ? 'pink' : 'default'}
              className={project.featured ? 'md:col-span-2' : ''}
            >
              {project.featured ? (
                <div className="grid gap-6 sm:gap-8 md:grid-cols-[1.5fr_1fr]">
                  <div>
                    <ProjectHeading project={project} />
                    <ProjectBullets bullets={project.bullets} />
                  </div>
                  <div className="md:border-l-2 md:border-ink/10 md:pl-8">
                    <ProjectMetrics metrics={project.metrics} />
                    <ProjectTags tags={project.tags} />
                    <ProjectLinks project={project} />
                  </div>
                </div>
              ) : (
                <>
                  <ProjectHeading project={project} />
                  <ProjectMetrics metrics={project.metrics} />
                  <ProjectBullets bullets={project.bullets} />
                  <ProjectTags tags={project.tags} />
                  <ProjectLinks project={project} />
                </>
              )}
            </StickerCard>
          ))}
        </div>
      </div>
    </section>
  );
}
