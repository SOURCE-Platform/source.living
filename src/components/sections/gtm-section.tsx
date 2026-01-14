import Image from "next/image";
import { Badge } from "@/components/atoms/badge";
import { SectionPlayButton } from "@/components/audio-player/SectionPlayButton";
import { TRANSCRIPT_DATA, CHAPTERS_DATA } from "@/lib/constants";

export function GTMSection() {
    return (
        <section className="space-y-4 mt-40">
            <div className="flex items-center gap-5 md:-mx-[25%]">
                <h2 className="text-4xl font-bold text-foreground">GTM</h2>
                <SectionPlayButton
                    title="GTM"
                    audioSrc="/audio/GTM.mp3"
                    transcript={TRANSCRIPT_DATA}
                    chapters={CHAPTERS_DATA}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 md:-mx-[25%] items-start">
                <div className="space-y-6">
                    <div className="relative w-full rounded-lg overflow-hidden">
                        <Image
                            src="/images/elderly care/elderly.png"
                            alt="Elderly Care"
                            width={2816}
                            height={1536}
                            className="w-full h-auto"
                        />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-foreground mb-1">Elderly Care</h4>
                        <Badge className="mb-2">Revenue Driver</Badge>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            A passive safety layer that tracks cognitive decline, memory, and physical safety without wearable devices. Families pay for peace of mind.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="relative w-full rounded-lg overflow-hidden">
                        <Image
                            src="/images/influencers and streamers/streamers-grid.png"
                            alt="Early Adopters & Tech"
                            width={2816}
                            height={1536}
                            className="w-full h-auto"
                        />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-foreground mb-1">Early Adopters & Tech</h4>
                        <Badge className="mb-2">Revenue Driver</Badge>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Selling the "Smart Home 2.0" experience to the tech-forward demographic who want total home automation and "Jarvis-like" AI.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="w-full h-32 bg-muted/20 rounded-lg" />
                    <div>
                        <h4 className="text-lg font-bold text-foreground mb-1">Influencers & Streamers</h4>
                        <Badge className="mb-2">Marketing Engine</Badge>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            We provide free/subsidized installations to top creators. They use Source as a full in-house studio system—no longer tied to their computers—while showcasing the <strong>4D Gaussian Splatting</strong> capabilities (holographic video) to their millions of followers, driving the cultural hype cycle.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="w-full h-32 bg-muted/20 rounded-lg" />
                    <div>
                        <h4 className="text-lg font-bold text-foreground mb-1">Government Contracts</h4>
                        <Badge className="mb-2">Market Expansion</Badge>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Partnering with municipalities to install complete surveillance in public downtowns and high-crime neighborhoods. This "crime prevention by design" strategy solves public safety issues while simultaneously onboarding entire districts of users into the Source ecosystem.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
