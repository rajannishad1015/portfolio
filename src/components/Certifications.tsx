import { certifications } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { SectionTitle } from './ui/SectionTitle';

const badgeClasses = {
  accent: 'bg-accent text-accent-foreground',
  pop: 'bg-pop text-ink',
  sun: 'bg-sun text-ink',
  mint: 'bg-mint text-ink',
  ink: 'bg-ink text-cream',
};

const rotations = [
  'rotate-[-2deg]',
  'rotate-[1.5deg]',
  'rotate-[-1deg]',
  'rotate-[2.5deg]',
];

export function Certifications() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="certifications"
      ref={ref}
      className="relative px-6 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          index="05"
        eyebrow="Credentials"
          title="Certifications"
          lead="Eight programmes across Google, IBM, Harvard, Columbia and Oracle Cloud."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              data-certification
              data-reveal
              className={`group flex items-start gap-4 rounded-xl border-2 border-ink bg-card p-5 shadow-pop-lg transition-transform duration-300 ease-bounce hover:animate-wiggle ${rotations[index % rotations.length]}`}
            >
              <span
                aria-hidden="true"
                className={`grid size-12 shrink-0 place-items-center rounded-full border-2 border-ink font-display text-xl font-extrabold ${badgeClasses[cert.color]}`}
              >
                {cert.initial}
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {cert.issuer}
                </p>
                <h3 className="mt-1 font-display text-base font-bold leading-snug text-ink">
                  {cert.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
