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
      className="relative overflow-hidden px-4 sm:px-6 pt-4 pb-12 sm:pt-10 sm:pb-20 lg:pt-14 lg:pb-28"
    >
      <SectionDecorations />

      <div className="relative mx-auto grid max-w-[90rem] items-center gap-x-8 gap-y-6 sm:gap-y-10 lg:grid-cols-[1fr_1.1fr] xl:grid-cols-[1fr_1.15fr] lg:gap-y-0">
        {/* Copy */}
        <div className="lg:col-start-1 lg:row-start-1">
          <HeroContent />
        </div>

        {/* Portrait stage — hidden on mobile/tablet, shown only on desktop */}
        <div className="animate-enter-scale relative mx-auto w-full max-w-[21.5rem] sm:max-w-[36rem] lg:max-w-[42rem] xl:max-w-[44rem] lg:col-start-2 lg:row-span-2 lg:row-start-1 hidden lg:block">
          <div className="relative aspect-square w-full">
            <PortraitDecorations />
            <PortraitFrame />
            <FloatingSkillCards />
            <HeroNotes />
          </div>
          <PortraitCaption />
        </div>

        {/* Stats and socials */}
        <div className="flex flex-col gap-6 sm:gap-9 lg:col-start-1 lg:row-start-2 lg:pt-10">
          <HeroStats />
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
