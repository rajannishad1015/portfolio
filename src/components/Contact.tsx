import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { links } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { CandyLink } from './ui/CandyButton';
import { DotGrid } from './ui/DotGrid';
import { SectionTitle } from './ui/SectionTitle';

export function Contact() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="contact"
      ref={ref}
      className="relative px-6 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Say Hello"
          title="Contact"
          lead="Open to Data Analyst and Data Science roles in Mumbai, or fully remote."
        />

        <div
          data-reveal
          className="relative mt-12 overflow-hidden rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-none border-2 border-ink bg-card p-8 shadow-pop-pink sm:p-10"
        >
          <DotGrid className="absolute inset-0 opacity-40" />

          <div className="relative">
            <h3 className="max-w-2xl text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Let&apos;s build something worth measuring.
            </h3>
            <p className="mt-4 max-w-2xl text-lg text-ink/75">
              Send over the problem, the messy data, or the dashboard nobody
              trusts. I&apos;ll bring the model and the narrative.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <CandyLink
                href={`mailto:${links.email}`}
                icon={<Mail size={14} strokeWidth={2.5} />}
              >
                Email
              </CandyLink>
              <CandyLink
                href={links.phoneHref}
                icon={<Phone size={14} strokeWidth={2.5} />}
              >
                Call
              </CandyLink>
              <CandyLink
                href={links.github}
                target="_blank"
                rel="noreferrer"
                icon={<Github size={14} strokeWidth={2.5} />}
              >
                GitHub
              </CandyLink>
              <CandyLink
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
                icon={<Linkedin size={14} strokeWidth={2.5} />}
              >
                LinkedIn
              </CandyLink>
            </div>

            <p className="mt-8 font-mono text-sm text-ink/60">
              {links.email} · {links.phone}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
