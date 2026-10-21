import { Award, CheckCircle2, Sparkles } from 'lucide-react';
import { certifications } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { cn } from '../lib/cn';
import { SectionTitle } from './ui/SectionTitle';

const badgeClasses = {
  accent: 'bg-accent text-accent-foreground',
  pop: 'bg-pop text-ink',
  sun: 'bg-sun text-ink',
  mint: 'bg-mint text-ink',
  ink: 'bg-ink text-cream',
};

const ISSUERS = [
  'Google',
  'IBM',
  'Harvard University',
  'Columbia University',
  'Oracle Cloud',
];

export function Certifications() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="certifications"
      ref={ref}
      className="relative px-4 sm:px-6 py-8 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          index="05"
          eyebrow="Credentials"
          title="Certifications & Accreditations"
          lead="Specialized programmes and verified credentials completed across Google, IBM, Harvard, Columbia, and Oracle Cloud."
        />

        {/* Top Summary Bar */}
        <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border-2 border-ink bg-cream p-3 sm:p-5 shadow-pop">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="grid size-8 sm:size-10 shrink-0 place-items-center rounded-lg sm:rounded-xl border-2 border-ink bg-sun text-ink shadow-sm">
              <Award size={16} strokeWidth={2.5} className="sm:size-5" />
            </span>
            <div>
              <p className="font-display text-[11px] sm:text-sm font-extrabold text-ink uppercase tracking-wider">
                Accredited Issuers
              </p>
              <div className="mt-0.5 flex flex-wrap gap-1 sm:gap-2 text-[10px] sm:text-xs font-semibold text-muted-foreground">
                {ISSUERS.map((issuer, idx) => (
                  <span key={issuer} className="flex items-center gap-1 sm:gap-1.5">
                    {idx > 0 && <span className="text-ink/30">•</span>}
                    <span className="text-ink/80">{issuer}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-mint/40 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-bold text-ink shadow-sm">
              <Sparkles size={12} className="text-emerald-700 sm:size-[13px]" />
              8 Verified Certifications
            </span>
          </div>
        </div>

        {/* 8 Cards Grid */}
        <div className="mt-6 sm:mt-10 grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              data-certification
              data-reveal
              className="group flex flex-col justify-between rounded-xl sm:rounded-2xl border-2 border-ink bg-card p-3 sm:p-5 shadow-pop sm:shadow-pop-lg transition-all duration-300 ease-bounce hover:-translate-y-1.5 hover:shadow-pop"
            >
              <div>
                {/* Header Row: Initial Badge + Verified Stamp */}
                <div className="flex items-center justify-between gap-1.5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'grid size-8 sm:size-11 place-items-center rounded-lg sm:rounded-xl border-2 border-ink font-display text-xs sm:text-base font-black shadow-pop',
                      badgeClasses[cert.color],
                    )}
                  >
                    {cert.initial}
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full border border-ink/20 bg-mint/25 px-1.5 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-emerald-800">
                    <CheckCircle2 size={10} strokeWidth={2.5} className="sm:size-[11px]" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Issuer & Title */}
                <p className="mt-2.5 sm:mt-4 text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground truncate">
                  {cert.issuer}
                </p>
                <h3 className="mt-1 font-display text-xs sm:text-base font-bold sm:font-extrabold leading-snug text-ink line-clamp-2">
                  {cert.name}
                </h3>

                {/* Domain Category */}
                {cert.category ? (
                  <p className="mt-1 text-[10px] sm:text-xs font-bold text-accent truncate">
                    {cert.category}
                  </p>
                ) : null}
              </div>

              {/* Skills / Focus Tags */}
              {cert.skills && cert.skills.length > 0 ? (
                <div className="mt-2.5 sm:mt-5 flex flex-wrap gap-1 sm:gap-1.5 border-t border-ink/10 pt-2 sm:pt-3">
                  {cert.skills.slice(0, 2).map((skill) => (
                    <span
                      key={skill}
                      className="rounded sm:rounded-lg border border-ink/15 bg-sand/60 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-ink/80 transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 2 ? (
                    <>
                      {cert.skills.slice(2).map((skill) => (
                        <span
                          key={skill}
                          className="hidden sm:inline-block rounded-lg border border-ink/15 bg-sand/60 px-2 py-0.5 text-[10px] font-bold text-ink/80 transition-transform duration-200 hover:-translate-y-0.5"
                        >
                          {skill}
                        </span>
                      ))}
                      <span className="sm:hidden rounded border border-ink/10 bg-sand/40 px-1 py-0.5 text-[8.5px] font-bold text-muted-foreground">
                        +{cert.skills.length - 2}
                      </span>
                    </>
                  ) : null}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
