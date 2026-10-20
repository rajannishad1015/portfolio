import { floatingSkills } from '../../data/content';
import { ICONS } from '../icons';
import { cn } from '../../lib/cn';

const cardTones = {
  pop: 'bg-[#ff7aa2] text-ink',
  sun: 'bg-sun text-ink',
  accent: 'bg-[#a78bfa] text-ink',
} as const;

const verticalPositions = [
  'top-[26%] sm:top-[25%] lg:top-[25%]',
  'top-[40%] sm:top-[39%] lg:top-[39%]',
  'top-[54%] sm:top-[53%] lg:top-[53%]',
] as const;

/**
 * Three horizontal floating pill cards neatly hugging the right side of the portrait.
 * Styled with crisp 2px ink borders and hard drop shadows matching the reference design.
 */
export function FloatingSkillCards() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {floatingSkills.map((skill, index) => {
        const Icon = ICONS[skill.icon];
        const posClass = verticalPositions[index % verticalPositions.length];
        const toneClass = cardTones[skill.tone];

        return (
          <div
            key={skill.title}
            className={cn(
              'pointer-events-auto absolute right-[2%] sm:right-[3%] lg:right-[4%]',
              'w-[160px] sm:w-[182px] lg:w-[204px]',
              'flex items-center gap-3 px-3.5 sm:px-4 py-2.5 sm:py-2.5 lg:py-3',
              'rounded-2xl border-2 border-ink',
              'shadow-[3px_3px_0px_#18181b] sm:shadow-[4px_4px_0px_#18181b]',
              'transition-all duration-200 ease-bounce select-none cursor-pointer',
              'hover:translate-x-1.5 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#18181b]',
              toneClass,
              posClass,
            )}
          >
            <div className="grid size-7 sm:size-8 place-items-center shrink-0">
              <Icon
                size={22}
                strokeWidth={2.25}
                className="text-ink"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col font-display font-extrabold text-[11.5px] sm:text-xs lg:text-[13px] leading-[1.15] text-ink tracking-tight">
              <span className="sr-only">{skill.title}</span>
              <span aria-hidden="true">{skill.line1}</span>
              {skill.line2 && <span aria-hidden="true">{skill.line2}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
