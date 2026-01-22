import { SectionPlayButton } from "@/components/audio-player/SectionPlayButton";

export function CompetitiveAdvantageSection() {
    return (
        <section className="space-y-4">
            <div className="flex items-center gap-4">
                <h2 className="text-4xl font-bold text-foreground">Competitive Advantage</h2>
                <SectionPlayButton
                    title="Competitive Advantage"
                    audioSrc="/audio/competitive-advantage.mp3"
                />
            </div>
            <div className="space-y-8 mt-12">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-full md:w-32 h-32 shrink-0 bg-muted/20 rounded-lg" />
                    <div>
                        <h4 className="text-xl font-bold text-foreground mb-2">The Data Moat</h4>
                        <p className="text-muted-foreground leading-relaxed">
                            OpenAI and Google have the internet. We have the <em>living room</em>. This high-resolution behavioral dataset does not currently exist anywhere else.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-full md:w-32 h-32 shrink-0 bg-muted/20 rounded-lg" />
                    <div>
                        <h4 className="text-xl font-bold text-foreground mb-2">Privacy Architecture</h4>
                        <p className="text-muted-foreground leading-relaxed">
                            By processing locally and tokenizing via blockchain, we solve the "Big Brother" fear. Users own their data; we just provide the architecture.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-full md:w-32 h-32 shrink-0 bg-muted/20 rounded-lg" />
                    <div>
                        <h4 className="text-xl font-bold text-foreground mb-2">Vertical Integration</h4>
                        <p className="text-muted-foreground leading-relaxed">
                            We own the full stack—from the sensor in the wall to the AI model in the cloud.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
