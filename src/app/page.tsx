'use client';

import { SourceLogo } from "@/components/atoms/icons/source-logo";
import { GlobalAudioProvider } from "@/contexts/GlobalAudioContext";
import { GlobalPlayer } from "@/components/audio-player/GlobalPlayer";
import { VisionSection } from "@/components/sections/vision-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { GTMSection } from "@/components/sections/gtm-section";
import { RoadmapSection } from "@/components/sections/roadmap-section";
import { LongTermVisionSection } from "@/components/sections/long-term-vision-section";
import { CompetitiveAdvantageSection } from "@/components/sections/competitive-advantage-section";
import { DealSection } from "@/components/sections/deal-section";
import { FooterSection } from "@/components/sections/footer-section";

export default function Home() {
  return (
    <GlobalAudioProvider>
      <div className="min-h-screen bg-background pb-32">
        {/* Main Content */}
        <main className="mx-auto max-w-3xl px-6 sm:px-12 py-12">
          {/* Header with Logo */}
          <div className="mb-16">
            <SourceLogo className="h-12 w-auto" />
          </div>

          {/* Memo Content */}
          <article className="prose prose-invert max-w-none space-y-6 text-base leading-relaxed text-muted-foreground">
            {/* Sections Container */}
            <div className="flex flex-col gap-24">
              <VisionSection />
              <ProblemSection />
              <SolutionSection />
              <GTMSection />
              <RoadmapSection />
              <LongTermVisionSection />
              <CompetitiveAdvantageSection />
              <DealSection />
            </div>

            <FooterSection />
          </article>
        </main>

        {/* Global Player Footer */}
        <GlobalPlayer />
      </div>
    </GlobalAudioProvider>
  );
}
