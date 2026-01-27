import Image from "next/image";
import { Badge } from "@/components/atoms/badge";
import { SectionPlayButton } from "@/components/audio-player/SectionPlayButton";
import { TRANSCRIPT_DATA, CHAPTERS_DATA } from "@/lib/constants";
import { FlagGrid } from "./FlagGrid";
import { ScrollScaleImage } from "@/components/ui/scroll-scale-image";

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
                    <ScrollScaleImage
                        src="/images/elderly care/elderly.png"
                        alt="Elderly Care"
                        width={2816}
                        height={1536}
                        containerClassName="relative w-full rounded-lg"
                        className="w-full h-auto"
                    />
                    <div>
                        <h4 className="text-lg font-bold text-foreground mb-1">Elderly Care</h4>
                        <Badge className="mb-2">Revenue Driver</Badge>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            A passive safety layer that tracks cognitive decline, memory, and physical safety without wearable devices. Families pay for peace of mind.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <ScrollScaleImage
                        src="/images/smart home/surveillance.jpg"
                        alt="Smart Home and Surveillance"
                        fill
                        containerClassName="relative w-full aspect-[11/6] rounded-lg"
                        className="object-cover"
                    />
                    <div>
                        <h4 className="text-lg font-bold text-foreground mb-1">Smart Home and Surveillance</h4>
                        <Badge className="mb-2">Revenue Driver</Badge>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Selling the "Smart Home 2.0" experience to the tech-forward demographic who want total home automation, "Jarvis-like" AI, and advanced surveillance capabilities.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="relative w-full h-[261px] rounded-lg overflow-hidden bg-background flex flex-col gap-[1px]">
                        {/* Row 1: Speed 90s, Delay 0s */}
                        <div className="flex-1 overflow-hidden relative">
                            <div className="flex h-full animate-scroll-right w-max" style={{ animationDuration: '90s', animationDelay: '0s' }}>
                                {[
                                    "kai_cenat", "pokimane", "ishowspeed", "valkyrae", "ibai_llanos",
                                    "xqc", "amouranth", "jynxzi", "qtcinderella", "asmongold",
                                    "caseoh", "sketch"
                                ].concat([
                                    "kai_cenat", "pokimane", "ishowspeed", "valkyrae", "ibai_llanos",
                                    "xqc", "amouranth", "jynxzi", "qtcinderella", "asmongold",
                                    "caseoh", "sketch"
                                ]).concat([
                                    "kai_cenat", "pokimane", "ishowspeed", "valkyrae", "ibai_llanos",
                                    "xqc", "amouranth", "jynxzi", "qtcinderella", "asmongold",
                                    "caseoh", "sketch"
                                ]).concat([
                                    "kai_cenat", "pokimane", "ishowspeed", "valkyrae", "ibai_llanos",
                                    "xqc", "amouranth", "jynxzi", "qtcinderella", "asmongold",
                                    "caseoh", "sketch"
                                ]).map((streamer, i) => (
                                    <div key={`r1-${streamer}-${i}`} className="aspect-square h-full bg-white border-r border-white box-content">
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={`/images/influencers/${streamer}.png`}
                                                alt={streamer.replace("_", " ")}
                                                fill
                                                className="object-cover"
                                                sizes="100px"
                                                priority={i < 10}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Row 2: Speed 90s, Delay -20s */}
                        <div className="flex-1 overflow-hidden relative">
                            <div className="flex h-full animate-scroll-right w-max" style={{ animationDuration: '90s', animationDelay: '-20s' }}>
                                {[
                                    "ludwig", "hasanabi", "ninja", "mrbeast", "logan_paul",
                                    "ksi", "rubius", "auronplay", "thegrefg", "shroud",
                                    "tfue", "summit1g"
                                ].concat([
                                    "ludwig", "hasanabi", "ninja", "mrbeast", "logan_paul",
                                    "ksi", "rubius", "auronplay", "thegrefg", "shroud",
                                    "tfue", "summit1g"
                                ]).concat([
                                    "ludwig", "hasanabi", "ninja", "mrbeast", "logan_paul",
                                    "ksi", "rubius", "auronplay", "thegrefg", "shroud",
                                    "tfue", "summit1g"
                                ]).concat([
                                    "ludwig", "hasanabi", "ninja", "mrbeast", "logan_paul",
                                    "ksi", "rubius", "auronplay", "thegrefg", "shroud",
                                    "tfue", "summit1g"
                                ]).map((streamer, i) => (
                                    <div key={`r2-${streamer}-${i}`} className="aspect-square h-full bg-white border-r border-white box-content">
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={`/images/influencers/${streamer}.png`}
                                                alt={streamer.replace("_", " ")}
                                                fill
                                                className="object-cover"
                                                sizes="100px"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Row 3: Speed 90s, Delay -40s */}
                        <div className="flex-1 overflow-hidden relative">
                            <div className="flex h-full animate-scroll-right w-max" style={{ animationDuration: '90s', animationDelay: '-40s' }}>
                                {[
                                    "sypherpk", "nickmercs", "timthetatman", "moistcr1tikal", "mkbhd",
                                    "linus_sebastian", "pewdiepie", "markiplier", "jacksepticeye", "dream",
                                    "tommyinnit", "mizkif"
                                ].concat([
                                    "sypherpk", "nickmercs", "timthetatman", "moistcr1tikal", "mkbhd",
                                    "linus_sebastian", "pewdiepie", "markiplier", "jacksepticeye", "dream",
                                    "tommyinnit", "mizkif"
                                ]).concat([
                                    "sypherpk", "nickmercs", "timthetatman", "moistcr1tikal", "mkbhd",
                                    "linus_sebastian", "pewdiepie", "markiplier", "jacksepticeye", "dream",
                                    "tommyinnit", "mizkif"
                                ]).concat([
                                    "sypherpk", "nickmercs", "timthetatman", "moistcr1tikal", "mkbhd",
                                    "linus_sebastian", "pewdiepie", "markiplier", "jacksepticeye", "dream",
                                    "tommyinnit", "mizkif"
                                ]).map((streamer, i) => (
                                    <div key={`r3-${streamer}-${i}`} className="aspect-square h-full bg-white border-r border-white box-content">
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={`/images/influencers/${streamer}.png`}
                                                alt={streamer.replace("_", " ")}
                                                fill
                                                className="object-cover"
                                                sizes="100px"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-foreground mb-1">Influencers & Streamers</h4>
                        <Badge className="mb-2">Marketing Engine</Badge>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            We provide free/subsidized installations to top creators. They use Source as a full in-house studio system—no longer tied to their computers—while showcasing the <strong>4D Gaussian Splatting</strong> capabilities (holographic video) to their millions of followers, driving the cultural hype cycle.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="w-full h-[261px]">
                        <FlagGrid />
                    </div>
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
