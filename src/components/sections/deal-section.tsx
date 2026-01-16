import { SectionPlayButton } from "@/components/audio-player/SectionPlayButton";
import { TRANSCRIPT_DATA, CHAPTERS_DATA } from "@/lib/constants";

export function DealSection() {
    return (
        <section className="space-y-8">
            <div className="flex items-center gap-5">
                <h2 className="text-4xl font-bold text-foreground">The Deal</h2>
                <SectionPlayButton
                    title="The Deal"
                    audioSrc="/audio/The%20Deal.mp3"
                    transcript={TRANSCRIPT_DATA}
                    chapters={CHAPTERS_DATA}
                />
            </div>
            <p>
                <strong className="text-foreground">We are raising $10M Seed</strong> to execute Phase 1 and the Phase 2 Beta.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-[175%] md:-ml-[37.5%]">
                {/* The Opportunity */}
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-full md:w-32 h-32 shrink-0 bg-muted/20 rounded-lg" />
                    <div>
                        <h4 className="text-xl font-bold text-foreground mb-2">The Opportunity</h4>
                        <p className="text-muted-foreground leading-relaxed">
                            The solution to these converging problems—and the next breakthrough in AI—won't come from more GPUs; it will come from a new <em>class</em> of data: continuous, multimodal, real-world behavioral data.
                        </p>
                    </div>
                </div>

                {/* Use of Funds */}
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-full md:w-32 h-32 shrink-0 bg-muted/20 rounded-lg" />
                    <div>
                        <h4 className="text-xl font-bold text-foreground mb-2">Use of Funds</h4>
                        <p className="text-muted-foreground leading-relaxed">
                            Land acquisition (Location TBD), Construction of HQ/Lab, Hardware BOM for School + 100 Homes, and 18 months of runway for 36 FTEs.
                        </p>
                    </div>
                </div>

                {/* Why Now */}
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-full md:w-32 h-32 shrink-0 bg-muted/20 rounded-lg" />
                    <div>
                        <h4 className="text-xl font-bold text-foreground mb-2">Why Now</h4>
                        <p className="text-muted-foreground leading-relaxed">
                            The AI hardware race is heating up, but everyone is focused on chips. The winner will be the company that owns the <em>environment</em> and the <em>behavioral data</em>.
                        </p>
                    </div>
                </div>

                {/* The Founder */}
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-full md:w-32 h-32 shrink-0 bg-muted/20 rounded-lg" />
                    <div>
                        <div className="flex items-center gap-5 mb-2">
                            <h4 className="text-xl font-bold text-foreground">The Founder</h4>
                            <SectionPlayButton
                                title="The Founder"
                                audioSrc="/audio/Founder.mp3"
                                transcript={TRANSCRIPT_DATA}
                                chapters={CHAPTERS_DATA}
                            />
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            Justin is building the infrastructure for a new era of human-AI symbiosis. With a background spanning AI research and systems architecture, he is committed to creating technology that serves humanity—not the other way around.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
