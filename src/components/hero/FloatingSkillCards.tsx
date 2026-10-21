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
              'pointer-events-auto absolute right-1 sm:right-[3%] lg:right-[4%]',
              'w-[112px] sm:w-[170px] lg:w-[204px]',
              'flex items-center gap-1.5 sm:gap-3 px-2 sm:px-4 py-1.5 sm:py-2.5 lg:py-3',
              'rounded-xl sm:rounded-2xl border-2 border-ink',
              'shadow-[2px_2px_0px_#18181b] sm:shadow-[4px_4px_0px_#18181b]',
              'transition-all duration-200 ease-bounce select-none cursor-pointer',
              'hover:translate-x-1.5 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#18181b]',
              toneClass,
              posClass,
            )}
          >
            <div className="grid size-5 sm:size-8 place-items-center shrink-0">
              <Icon
                size={14}
                strokeWidth={2.25}
                className="text-ink sm:size-[22px]"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col font-display font-extrabold text-[9.5px] sm:text-xs lg:text-[13px] leading-[1.12] text-ink tracking-tight">
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
