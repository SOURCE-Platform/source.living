import Image from "next/image";
import { SectionPlayButton } from "@/components/audio-player/SectionPlayButton";
import { TRANSCRIPT_DATA, CHAPTERS_DATA } from "@/lib/constants";

export function LongTermVisionSection() {
    return (
        <section className="space-y-4">
            <div
                className="w-[calc(200%-200px)] ml-[calc(-50%+100px)] mb-8"
                style={{
                    maskImage: 'radial-gradient(60% 140% at 50% 140%, black 75%, transparent 100%), radial-gradient(60% 140% at 50% -40%, black 75%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(60% 140% at 50% 140%, black 75%, transparent 100%), radial-gradient(60% 140% at 50% -40%, black 75%, transparent 100%)',
                    maskComposite: 'intersect',
                    WebkitMaskComposite: 'source-in'
                }}
            >
                <Image
                    src="/images/the long term vision/wide longterm.webp"
                    alt="The Long Term Vision"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                />
            </div>
            <div className="flex items-center gap-5 w-full xs:max-w-[70%] mx-auto mb-2">
                <h2 className="text-4xl font-serif text-foreground">The Long-Term Vision</h2>
                <SectionPlayButton
                    title="The Long-Term Vision"
                    audioSrc="/audio/Long%20Term%20Vision.mp3"
                    transcript={TRANSCRIPT_DATA}
                    chapters={CHAPTERS_DATA}
                />
            </div>
            <div className="w-full xs:max-w-[70%] space-y-2 mx-auto">
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
            <p className="italic border-l-4 border-foreground/30 pl-4 text-foreground font-semibold">
                Source: We guide AI, and AI guides us.
            </p>
        </section>
    );
}
