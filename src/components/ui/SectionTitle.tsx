import { Squiggle } from './Squiggle';

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  index?: string;
};

export function SectionTitle({ eyebrow, title, lead, index }: SectionTitleProps) {
  return (
    <div data-reveal className="max-w-2xl">
      <p className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink/70">
        {index ? <span className="text-accent">{index}</span> : null}
        {eyebrow}
      </p>
      <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
        {title}
      </h2>
      <Squiggle className="mt-3 h-3 w-32 text-pop" />
      {lead ? (
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
