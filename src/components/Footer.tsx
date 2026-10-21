import { ArrowUpRight } from 'lucide-react';
import { links, profile } from '../data/content';
import { Squiggle } from './ui/Squiggle';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative px-4 sm:px-6 pb-10 pt-12 sm:pb-12 sm:pt-16">
      <Squiggle className="absolute inset-x-0 top-0 mx-auto h-3 w-full max-w-6xl text-accent" />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
        <p className="font-display text-lg font-bold text-ink">
          © {year} {profile.name}
        </p>
        <p className="text-sm text-muted-foreground">
          Built with React, Vite and Tailwind CSS.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-ink underline decoration-pop decoration-2 underline-offset-4 transition-colors duration-300 hover:text-accent"
          >
            Back to top
          </a>
          <a
            href={links.site}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-ink underline decoration-pop decoration-2 underline-offset-4 transition-colors duration-300 hover:text-accent"
          >
            rajann.me
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
