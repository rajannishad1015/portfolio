import { profile, stats } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { DotGrid } from './ui/DotGrid';
import { Pill } from './ui/Pill';
import { SectionTitle } from './ui/SectionTitle';

export function About() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className="relative px-6 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          index="01"
        eyebrow="Who I Am"
          title="About"
          lead="A data science student who ships the whole thing — model, dashboard and the product around it."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div
            data-reveal
            className="relative overflow-hidden rounded-3xl border-2 border-ink bg-card p-8 shadow-pop-lg lg:col-span-3"
          >
            <DotGrid className="absolute inset-0 opacity-40" />
            <div className="relative">
              <p className="text-lg leading-relaxed text-ink">{profile.about}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {profile.softSkills.map((skill) => (
                  <Pill key={skill}>{skill}</Pill>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            {stats.map((stat) => (
              <div
                key={stat.label}
                data-reveal
                className="rounded-xl border-2 border-ink bg-card px-6 py-5 shadow-pop transition-transform duration-300 ease-bounce hover:-rotate-1"
              >
                <p className="font-display text-4xl font-extrabold text-accent">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
