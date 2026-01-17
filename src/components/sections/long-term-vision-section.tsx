import { SectionPlayButton } from "@/components/audio-player/SectionPlayButton";
import { TRANSCRIPT_DATA, CHAPTERS_DATA } from "@/lib/constants";

export function LongTermVisionSection() {
    return (
        <section className="space-y-4">
            <div className="w-[calc(200%-200px)] ml-[calc(-50%+100px)] mb-8">
                <img
                    src="/images/the long term vision/wide longterm.webp"
                    alt="The Long Term Vision"
                    className="w-full rounded-lg"
                    style={{
                        maskImage: 'radial-gradient(75% 140% at 50% 140%, black 75%, transparent 100%), radial-gradient(75% 140% at 50% -40%, black 75%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(75% 140% at 50% 140%, black 75%, transparent 100%), radial-gradient(75% 140% at 50% -40%, black 75%, transparent 100%)',
                        maskComposite: 'intersect',
                        WebkitMaskComposite: 'source-in'
                    }}
                />
            </div>
            <div className="flex items-center gap-5 w-full xs:max-w-[70%] mx-auto">
                <h2 className="text-4xl font-bold text-foreground">The Long-Term Vision</h2>
                <SectionPlayButton
                    title="The Long-Term Vision"
                    audioSrc="/audio/Long%20Term%20Vision.mp3"
                    transcript={TRANSCRIPT_DATA}
                    chapters={CHAPTERS_DATA}
                />
            </div>
            <div className="w-full xs:max-w-[70%] space-y-4 mx-auto">
                <p className="font-semibold text-foreground">
                    SuperIntelligence Requires SuperAwareness.
                </p>
                <p>
                    The global technology industry is currently racing toward <strong className="text-foreground">SuperIntelligence</strong>: massive raw compute and logic. However, a "brain in a jar" with high IQ but zero context is fundamentally limited and potentially dangerous.
                </p>
                <p>
                    For SuperIntelligence to be truly effective, aligned, and safe, it requires <strong className="text-foreground">SuperAwareness</strong>.
                </p>
            </div>
            <div className="mt-24 flex flex-col md:flex-row gap-8 md:gap-12 md:-mx-[25%] items-start">
                <div className="md:flex-1 space-y-6">
                    <div className="w-full h-32 bg-muted/20 rounded-lg" />
                    <div>
                        <h4 className="text-lg font-bold text-foreground mb-1">The Missing Link</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Intelligence is the ability to process information; Awareness is the ability to perceive the reality from which that information comes. You cannot solve human problems if you cannot perceive the human condition.
                        </p>
                    </div>
                </div>

                <div className="md:flex-1 space-y-6">
                    <div className="w-full h-32 bg-muted/20 rounded-lg" />
                    <div>
                        <h4 className="text-lg font-bold text-foreground mb-1">The Source Role</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Source creates the sensory organs for the global AI brain. By capturing the "True Record of Reality," we provide the necessary context, the <strong className="text-foreground">SuperAwareness</strong>, that allows SuperIntelligence to function not just as a calculator, but as a benevolent, fully aligned agent of civilization.
                        </p>
                    </div>
                </div>
            </div>
            <p className="italic border-l-4 border-foreground/30 pl-4 text-foreground font-semibold">
                Source: We guide AI, and AI guides us.
            </p>
        </section>
    );
}
