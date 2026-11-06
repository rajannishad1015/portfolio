import { useState } from 'react';
import { Check, Clock, Copy, Github, Linkedin, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { links } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { CandyLink } from './ui/CandyButton';
import { DotGrid } from './ui/DotGrid';
import { SectionTitle } from './ui/SectionTitle';


function CopyBadge({
  text,
  label,
  icon: Icon,
  accentClass,
}: {
  text: string;
  label: string;
  icon: typeof Mail;
  accentClass: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Click to copy ${label}`}
      aria-label={`Copy ${label}: ${text}`}
      className="group relative inline-flex items-center gap-2 rounded-xl border-1.5 border-ink/20 bg-sand/90 px-3.5 py-2 font-mono text-xs sm:text-sm font-bold text-ink/90 shadow-sm transition-all duration-200 hover:border-ink hover:bg-cream hover:shadow-xs active:scale-[0.98] cursor-pointer text-left"
    >
      {copied ? (
        <Check size={14} className="text-emerald-600 shrink-0" strokeWidth={3} />
      ) : (
        <Icon size={14} className={`${accentClass} shrink-0`} strokeWidth={2.5} />
      )}
      <span className="break-all">{text}</span>
      <span className="ml-1 inline-flex items-center gap-1 rounded-md bg-ink/10 px-1.5 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider text-ink/70 group-hover:bg-accent group-hover:text-white transition-colors">
        {copied ? 'Copied! ✓' : <><Copy size={10} /> Copy</>}
      </span>
    </button>
  );
}

export function Contact() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-sand px-4 sm:px-6 py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          index="06"
          eyebrow="Say Hello"
          title="Get In Touch"
          lead="Open to Data Analyst, Junior Data Scientist, and Machine Learning roles in Mumbai or fully remote."
        />

        <div className="mt-10 sm:mt-12 grid gap-6 sm:gap-8 lg:grid-cols-12 items-start">
          {/* Main Direct Contact Card */}
          <div
            data-reveal
            className="relative overflow-hidden rounded-3xl border-2 border-ink bg-card p-5 sm:p-8 lg:p-10 shadow-pop-pink lg:col-span-7 transition-all duration-300"
          >
            <DotGrid className="absolute inset-0 opacity-35" />

            <div className="relative">
              {/* Availability Status Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-mint/30 px-3.5 py-1 text-xs font-bold text-ink shadow-sm">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for Opportunities
                </span>
              </div>

              {/* Headline */}
              <h3 className="mt-4 sm:mt-5 font-display text-xl sm:text-3xl lg:text-4xl font-black text-ink leading-tight">
                Let&apos;s discuss data, models, or new opportunities.
              </h3>

              {/* Subtext */}
              <p className="mt-3.5 sm:mt-4 text-sm sm:text-lg text-ink/80 leading-relaxed font-medium">
                Whether you have an opening for a Data Analyst or Junior Data Scientist, an interesting project, or simply want to talk about machine learning pipelines — my inbox is always open.
              </p>

              {/* Interactive Buttons */}
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-2.5 sm:gap-3.5">
                <CandyLink
                  href={`mailto:${links.email}`}
                  icon={<Mail size={15} strokeWidth={2.5} />}
                >
                  Email
                </CandyLink>
                <CandyLink
                  href={links.phoneHref}
                  icon={<Phone size={15} strokeWidth={2.5} />}
                >
                  Call
                </CandyLink>
                <CandyLink
                  href={links.github}
                  target="_blank"
                  rel="noreferrer"
                  icon={<Github size={15} strokeWidth={2.5} />}
                >
                  GitHub
                </CandyLink>
                <CandyLink
                  href={links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  icon={<Linkedin size={15} strokeWidth={2.5} />}
                >
                  LinkedIn
                </CandyLink>
              </div>

              {/* Direct Details Display */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-ink/10 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
                <CopyBadge
                  text={links.email}
                  label="Email"
                  icon={Mail}
                  accentClass="text-accent"
                />
                <CopyBadge
                  text={links.phone}
                  label="Phone"
                  icon={Phone}
                  accentClass="text-pop"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Information & Availability Cards */}
          <div className="grid gap-5 lg:col-span-5">
            {/* Location & Timezone Card */}
            <div
              data-reveal
              className="rounded-2xl border-2 border-ink bg-card p-5 shadow-pop transition-all duration-300 ease-bounce hover:-translate-y-1"
            >
              <div className="flex items-start gap-3.5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border-2 border-ink bg-pop/15 text-pop">
                  <MapPin size={20} strokeWidth={2.5} />
                </span>
                <div>
                  <h4 className="font-display text-base font-extrabold text-ink">
                    Location & Mobility
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Based in Mumbai, Maharashtra (IST / UTC+5:30). Open to on-site roles in Mumbai, hybrid setups, or fully remote collaborations.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Response Card */}
            <div
              data-reveal
              className="rounded-2xl border-2 border-ink bg-card p-5 shadow-pop transition-all duration-300 ease-bounce hover:-translate-y-1"
            >
              <div className="flex items-start gap-3.5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border-2 border-ink bg-mint/25 text-emerald-600">
                  <Clock size={20} strokeWidth={2.5} />
                </span>
                <div>
                  <h4 className="font-display text-base font-extrabold text-ink">
                    Quick Response
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    I typically reply to emails and inquiries within 24 hours. Direct phone/WhatsApp is available during regular IST working hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Focus Topics Card */}
            <div
              data-reveal
              className="rounded-2xl border-2 border-ink bg-sun/15 p-5 shadow-pop transition-all duration-300 ease-bounce hover:-translate-y-1"
            >
              <div className="flex items-start gap-3.5">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg border-2 border-ink bg-sun text-ink shadow-sm">
                  <Sparkles size={18} strokeWidth={2.5} />
                </span>
                <div>
                  <h4 className="font-display text-base font-extrabold text-ink">
                    What We Can Discuss
                  </h4>
                  <p className="mt-1 text-xs text-ink/80 leading-relaxed font-medium">
                    Data analytics workflows, machine learning models, database modeling, and software engineering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
