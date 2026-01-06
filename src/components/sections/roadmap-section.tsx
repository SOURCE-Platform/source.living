import { SectionPlayButton } from "@/components/audio-player/SectionPlayButton";
import { TRANSCRIPT_DATA, CHAPTERS_DATA } from "@/lib/constants";

export function RoadmapSection() {
    return (
        <section className="space-y-4 mt-40">
            <div className="flex items-center gap-5 md:-mx-[25%]">
                <h2 className="text-4xl font-bold text-foreground">Roadmap</h2>
                <SectionPlayButton
                    title="Roadmap"
                    audioSrc="/audio/Roadmap.mp3"
                    transcript={TRANSCRIPT_DATA}
                    chapters={CHAPTERS_DATA}
                />
            </div>

            <div className="relative mt-12 md:-mx-[25%] px-4 md:px-0">
                {/* Horizontal Line (Desktop) */}
                <div className="absolute top-0 left-0 w-full h-px bg-border hidden md:block" />

                <div className="flex flex-col md:flex-row gap-8 md:gap-6">
                    {/* PHASE 1 */}
                    <div className="md:flex-1 relative pt-6 md:pt-8">
                        {/* Circle Node */}
                        <div className="absolute top-[-4px] left-0 w-2 h-2 rounded-full bg-foreground hidden md:block" />

                        <div className="mb-6">
                            <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase block mb-2">Phase 1</span>
                            <h3 className="text-2xl font-bold text-foreground block mb-1">R&D</h3>
                            <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">18 Months</span>
                        </div>

                        <div className="space-y-6">
                            <div className="w-full h-32 bg-muted/20 rounded-lg" />
                            <div>
                                <h4 className="text-sm font-bold text-foreground mb-1">Objective</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Build the first <strong>Human Behavioral Model</strong>.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-foreground mb-1">Strategy</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Construct a mixed-use R&D campus (School + HQ).
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-foreground mb-1">Execution</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    We will monitor a controlled environment (a school) to train the Video Language Model (VLM) on complex human interactions, conflict resolution, and childhood development.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-foreground mb-1">Operations</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    By locating in a cost-efficient region (TBD), we can deploy a team of <strong>36 FTEs</strong> (Eng, Ops, AI) for a fraction of Silicon Valley costs.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* PHASE 2 */}
                    <div className="md:flex-1 relative pt-6 md:pt-8">
                        {/* Circle Node */}
                        <div className="absolute top-[-4px] left-0 w-2 h-2 rounded-full bg-foreground hidden md:block" />

                        <div className="mb-6">
                            <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase block mb-2">Phase 2</span>
                            <h3 className="text-2xl font-bold text-foreground block mb-1">GTM</h3>
                            <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">18 Months</span>
                        </div>

                        <div className="space-y-6">
                            <div className="w-full h-32 bg-muted/20 rounded-lg" />
                            <div>
                                <h4 className="text-sm font-bold text-foreground mb-1">Objective</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Commercial validation and dataset expansion.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-foreground mb-1">Execution</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    While the School builds the "Baseline Model," we will simultaneously deploy Source into ~100 residential units.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-foreground mb-1">The Mix</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Paid installations for the Elderly/Tech demographics, and marketing installations for Influencers.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-foreground mb-1">Outcome</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    A diverse, proprietary dataset of private human behavior across different demographics.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* PHASE 3 */}
                    <div className="md:flex-1 relative pt-6 md:pt-8">
                        {/* Circle Node */}
                        <div className="absolute top-[-4px] left-0 w-2 h-2 rounded-full bg-foreground hidden md:block" />

                        <div className="mb-6">
                            <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase block mb-2">Phase 3</span>
                            <h3 className="text-2xl font-bold text-foreground block mb-1">Civilizational Scale</h3>
                            {/* Spacer for alignment */}
                            <div className="h-[22px]"></div>
                        </div>

                        <div className="space-y-6">
                            <div className="w-full h-32 bg-muted/20 rounded-lg" />
                            <div>
                                <h4 className="text-sm font-bold text-foreground mb-1">Objective</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Expansion into the Public Domain.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-foreground mb-1">Smart Cities & Government</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Partnering with municipalities to install Source in public squares and neighborhoods.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-foreground mb-1">The Incentive</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Offering "Crime Prevention by Design." The system provides total awareness of public spaces, deterring crime and providing immutable evidence for disputes.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-foreground mb-1">Commercial</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Expansion into retail and institutions for automated logistics and security.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
