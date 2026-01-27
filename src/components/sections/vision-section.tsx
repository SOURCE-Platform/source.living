import { SectionPlayButton } from "@/components/audio-player/SectionPlayButton";
import type { ChapterSummary } from "@/components/audio-player/context/types";

const VISION_CHAPTERS: ChapterSummary[] = [
    { title: "Introduction: What is Source?", start: 0 },
    { title: "How It Works: \"Internal Surveillance\" & Data Collection", start: 21000 },
    { title: "The Goal: Developing the Ultimate Personal AI", start: 98000 },
    { title: "Human Data Generation & Changing Social Norms", start: 148000 },
    { title: "Reimagining Civilization & Eradicating Crime", start: 230000 },
    { title: "Why It Must Be Open-Source & Transparent", start: 323000 },
    { title: "Future Implications: The End of Crime & Human Relationships", start: 413000 },
    { title: "Conclusion: Why We Need AI to Clean Up Our Act", start: 450000 },
];

export function VisionSection() {
    return (
        <section className="space-y-4 relative">
            {/* Spacer for the fixed EarthSceneV2 background */}
            <div className="h-[510px]" />

            <div className="relative z-10 -mt-40 space-y-4">
                <div className="flex items-center gap-5 w-full xs:max-w-[70%] mx-auto">
                    <h2 className="text-4xl font-bold text-foreground">Vision</h2>
                    <SectionPlayButton
                        title="The Vision"
                        audioSrc="/audio/source-vision.mp3"
                        chapters={VISION_CHAPTERS}
                    />
                </div>
                <div className="w-full xs:max-w-[70%] space-y-4 mx-auto">
                    <p>
                        <strong className="text-foreground">SOURCE</strong> will be an open-source decentralized AI platform designed to achieve <strong className="text-foreground">Super Awareness</strong>, the prerequisite for <strong className="text-foreground">Super Intelligence</strong>.
                    </p>
                    <p>
                        By deploying smart sensors and heavy local compute in both public and private spaces, we are building <strong className="text-foreground">the new holistic computing paradigm for civilization</strong> that functions as a proactive problem detector and solver.
                    </p>
                    <p>
                        This infrastructure will capture what current AI fundamentally lacks: <strong className="text-foreground">Human Behavioral and Environmental Data</strong> of such high quality and near-infinite quantity that it will enable the creation of the <strong className="text-foreground">Most Accurate Global World Model</strong> ever built.
                    </p>
                </div>
            </div>
        </section>
    );
}
