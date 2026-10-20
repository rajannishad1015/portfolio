import { skillGroups } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { ICONS } from './icons';
import { SectionTitle } from './ui/SectionTitle';
import { StickerCard } from './ui/StickerCard';

export function Skills() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="skills"
      ref={ref}
      className="relative px-6 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Toolkit"
          title="Skills & Stack"
          lead="The tools I reach for, from the first exploratory chart to the API in front of it."
        />

        <div className="relative mt-14">
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full text-ink/20 lg:block"
            viewBox="0 0 1000 400"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M20 90 C 260 20, 520 200, 980 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="10 12"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => {
              const Icon = ICONS[group.icon];
              return (
                <StickerCard
                  key={group.id}
                  data-reveal
                  title={group.title}
                  accent={group.color}
                  icon={<Icon size={20} strokeWidth={2.5} />}
                >
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-ink/80">
                        <span
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </StickerCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
