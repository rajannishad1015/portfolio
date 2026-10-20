import { FloatingSkillCards } from './hero/FloatingSkillCards';
import {
  PortraitDecorations,
  SectionDecorations,
} from './hero/GeometricDecorations';
import { HeroContent } from './hero/HeroContent';
import { HeroNotes } from './hero/HeroNotes';
import { HeroStats } from './hero/HeroStats';
import { PortraitCaption, PortraitFrame } from './hero/PortraitPlaceholder';
import { SocialLinks } from './hero/SocialLinks';

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-6 pb-20 pt-10 lg:pb-28 lg:pt-14"
    >
      <SectionDecorations />

      <div className="relative mx-auto grid max-w-[90rem] items-center gap-x-10 gap-y-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-y-0">
        {/* Copy */}
        <div className="lg:col-start-1 lg:row-start-1">
          <HeroContent />
        </div>

        {/* Portrait stage */}
        <div className="animate-enter-scale relative mx-auto w-full max-w-[32rem] lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="relative aspect-[4/5] w-full">
            <PortraitDecorations />
            <PortraitFrame />
            <FloatingSkillCards />
            <HeroNotes />
          </div>
          <PortraitCaption />
        </div>

        {/* Stats and socials */}
        <div className="flex flex-col gap-9 lg:col-start-1 lg:row-start-2 lg:pt-12">
          <HeroStats />
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
