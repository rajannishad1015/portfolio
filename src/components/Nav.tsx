import { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { links, navLinks, profile } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';
import { CandyLink } from './ui/CandyButton';

const NAV_SECTION_IDS = navLinks.map((link) => link.href.slice(1));

export function Nav() {
  const [open, setOpen] = useState(false);
  // Lazy initialiser, not a setState inside the effect: `eslint-plugin-react-hooks`
  // v7 ships `set-state-in-effect` as an error, and a synchronous setState in an
  // effect body is exactly what that rule targets.
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8);
  const active = useActiveSection(NAV_SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'bg-cream/90 shadow-pop backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a
          href="#home"
          aria-label={`${profile.name} — back to top`}
          className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-accent font-display text-lg font-extrabold text-accent-foreground shadow-pop transition-transform duration-300 ease-bounce hover:-rotate-6"
        >
          {profile.initials}
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={`rounded-full px-4 py-2 font-display text-sm font-bold transition-colors duration-300 ${
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-ink hover:bg-sun'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <CandyLink
            href={links.resumeHref}
            download
            icon={<Download size={14} strokeWidth={2.5} />}
            className="hidden sm:inline-flex"
          >
            Download CV
          </CandyLink>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
            className="grid size-11 place-items-center rounded-full border-2 border-ink bg-card shadow-pop transition-transform duration-300 ease-bounce hover:-translate-y-[2px] active:translate-y-[2px] lg:hidden"
          >
            {open ? (
              <X size={20} strokeWidth={2.5} />
            ) : (
              <Menu size={20} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 flex items-center justify-center bg-cream lg:hidden"
        >
          <nav
            aria-label="Mobile"
            className="flex flex-col items-center gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl font-extrabold text-ink transition-colors duration-300 hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute right-6 top-6 grid size-11 place-items-center rounded-full border-2 border-ink bg-card shadow-pop"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>
      ) : null}
    </header>
  );
}
