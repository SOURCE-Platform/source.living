import { SectionPlayButton } from "@/components/audio-player/SectionPlayButton";
import { TRANSCRIPT_DATA, CHAPTERS_DATA } from "@/lib/constants";

export function VisionSection() {
    return (
        <section className="space-y-4">
            <div className="w-full h-64 bg-muted/20 rounded-lg mb-8" />
            <div className="flex items-center gap-5 w-full xs:max-w-[70%] mx-auto">
                <h2 className="text-4xl font-bold text-foreground">Vision</h2>
                <SectionPlayButton
                    trackId="source-setting-the-stage"
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
        </section>
    );
}
