'use client';

import { StickyLogo } from "@/components/molecules/sticky-logo";
import { GlobalAudioProvider } from "@/contexts/GlobalAudioContext";
import { GlobalPlayer } from "@/components/audio-player/GlobalPlayer";
import { VisionSection } from "@/components/sections/vision-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { GTMSection } from "@/components/sections/gtm-section";
import { RoadmapSection } from "@/components/sections/roadmap-section";
import { LongTermVisionSection } from "@/components/sections/long-term-vision-section";
import { MissingLinkSection } from "@/components/sections/missing-link-section";
import { InfrastructureHistoryGraph } from "@/components/infrastructure-graph";
import { CompetitiveAdvantageSection } from "@/components/sections/competitive-advantage-section";
import { DealSection } from "@/components/sections/deal-section";
import { FooterSection } from "@/components/sections/footer-section";

export default function Home() {
  return (
    <GlobalAudioProvider>
      <div className="min-h-screen pb-32">
        <StickyLogo />


        {/* Main Content */}
        <main className="py-12">
          {/* Header with Logo Removed (using sticky) */}
          <div className="mx-auto max-w-3xl px-6 sm:px-12 mb-16" />

          {/* Memo Content: Part 1 */}
          <div className="mx-auto max-w-3xl px-6 sm:px-12">
            <article className="prose prose-invert max-w-none space-y-6 text-base leading-relaxed text-muted-foreground">
              {/* Sections Container */}
              <div className="flex flex-col gap-24">
                <VisionSection />
                <ProblemSection />
                <SolutionSection />
                <GTMSection />
                <RoadmapSection />
                <LongTermVisionSection />
              </div>
            </article>
          </div>

          {/* Infrastructure Evolution Graph - Full Width with Right Buffer */}
          <div className="w-full mb-12 mt-32 pr-4 md:pr-[50px]">
            <InfrastructureHistoryGraph className="h-[700px] w-full" />
          </div>

          {/* Memo Content: Part 2 */}
          <div className="mx-auto max-w-3xl px-6 sm:px-12">
            <article className="prose prose-invert max-w-none space-y-6 text-base leading-relaxed text-muted-foreground">
              <div className="flex flex-col gap-24">
                <MissingLinkSection />
                <CompetitiveAdvantageSection />
                <DealSection />
              </div>

              <div className="mt-24">
                <FooterSection />
              </div>
            </article>
          </div>
        </main>

        {/* Global Player Footer */}
        <GlobalPlayer />
      </div>
    </GlobalAudioProvider>
  );
}
