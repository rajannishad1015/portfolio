import { floatingSkills } from '../../data/content';
import { ICONS } from '../icons';
import { cn } from '../../lib/cn';

const toneClasses = {
  pop: 'bg-pop',
  sun: 'bg-sun',
  accent: 'bg-accent',
} as const;

const rotations = ['-rotate-3', 'rotate-2', '-rotate-2'] as const;

const positions = [
  'left-0 top-[5%] lg:-left-8 lg:top-[3%]',
  'right-0 top-[38%] lg:-right-6 lg:top-[40%]',
  'left-0 bottom-[30%] lg:left-[4%] lg:bottom-[2%]',
] as const;

/**
 * Three sticker cards floating around the portrait. They stay still by
 * default and only straighten and lift on hover, so nothing distracts from
 * the copy.
 */
export function FloatingSkillCards() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {floatingSkills.map((skill, index) => {
        const Icon = ICONS[skill.icon];
        return (
          <div
            key={skill.title}
            className={cn(
              'pointer-events-auto absolute w-[11rem] rounded-[1.25rem] border-2 border-ink p-3 shadow-sticker transition-all duration-300 ease-bounce hover:rotate-0 hover:-translate-y-1.5 hover:shadow-pop-hover lg:w-[13rem]',
              toneClasses[skill.tone],
              rotations[index % rotations.length],
              positions[index % positions.length],
            )}
          >
            <div className="grid size-9 place-items-center rounded-full border-2 border-ink bg-cream">
              <Icon size={17} strokeWidth={2.5} className="text-ink" aria-hidden="true" />
            </div>
            <p className="mt-2.5 font-display text-sm font-extrabold leading-tight text-ink">
              {skill.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
