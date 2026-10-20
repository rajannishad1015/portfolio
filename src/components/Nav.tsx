import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { navLinks, sectionIds } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';
import { cn } from '../lib/cn';
import { BrandLogo } from './hero/BrandLogo';

const NAV_ITEMS = [{ href: '#home', label: 'Home' }, ...navLinks] as const;

// Every section id is watched, so the highlight never goes blank while
// scrolling between sections that have no nav entry of their own.
const NAV_SECTION_IDS = sectionIds;

// "certifications" is watched but shares the Education nav entry, so the
// highlight never goes blank while scrolling between the two sections.
const EDUCATION_SECTIONS = ['education', 'certifications'];

export function Nav() {
  const [open, setOpen] = useState(false);
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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const menu = open ? (
    <div
      id="mobile-menu"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-cream lg:hidden"
    >
      <nav aria-label="Mobile" className="flex flex-col items-center gap-5">
        {NAV_ITEMS.map((link) => (
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
  ) : null;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-shadow duration-300',
        scrolled ? 'bg-cream/90 shadow-pop backdrop-blur' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-6 py-4">
        <a
          href="#home"
          aria-label="Rajan Nishad — back to top"
          className="animate-enter-down shrink-0 transition-transform duration-300 ease-bounce hover:-translate-y-0.5"
        >
          <BrandLogo />
        </a>

        <nav aria-label="Primary" className="hidden items-center lg:flex">
          {NAV_ITEMS.map((link) => {
            const section = link.href.slice(1);
            const isActive =
              active === section ||
              (section === 'education' && EDUCATION_SECTIONS.includes(active));
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'group relative px-4 py-2 font-body text-base font-medium transition-colors duration-300 ease-bounce hover:-translate-y-0.5',
                  isActive ? 'text-accent' : 'text-ink hover:text-accent',
                )}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent transition-transform duration-300',
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="group hidden min-h-11 items-center gap-2.5 rounded-full border-2 border-ink bg-accent px-5 font-display text-sm font-bold text-accent-foreground shadow-pop transition-[transform,box-shadow] duration-300 ease-bounce hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-pop-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-pop-active sm:inline-flex"
          >
            Let&apos;s Connect
            <span className="grid size-6 place-items-center rounded-full bg-white text-accent">
              <ArrowRight
                size={13}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </a>

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

      {/* Rendered into <body> so the header's backdrop-filter cannot become
          the containing block for this fixed overlay. */}
      {typeof document !== 'undefined' && menu
        ? createPortal(menu, document.body)
        : null}
    </header>
  );
}
