import { Squiggle } from './Squiggle';

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  lead?: string;
};

export function SectionTitle({ eyebrow, title, lead }: SectionTitleProps) {
  return (
    <div data-reveal className="max-w-2xl">
      <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
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
