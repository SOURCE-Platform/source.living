import { Badge } from "@/components/atoms/badge";
import { SectionPlayButton } from "@/components/audio-player/SectionPlayButton";
import { TRANSCRIPT_DATA, CHAPTERS_DATA } from "@/lib/constants";
import { WipeLoopVideo } from "@/components/ui/wipe-loop-video";
import { RndSlideshow } from "./rnd-slideshow";
import { GTMSlideshow } from "./gtm-slideshow";

export function RoadmapSection() {
    return (
        <section className="space-y-4 mt-40">
            <div className="relative w-[100vw] left-1/2 -translate-x-1/2 flex justify-center">
                <div className="w-full md:w-2/3 lg:w-full max-w-[1700px] flex items-center gap-5 px-5 lg:px-20">
                    <h2 className="text-4xl font-bold text-foreground">Roadmap</h2>
                    <SectionPlayButton
                        title="Roadmap"
                        audioSrc="/audio/Roadmap.mp3"
                        transcript={TRANSCRIPT_DATA}
                        chapters={CHAPTERS_DATA}
                    />
                </div>
            </div>

            <div className="relative mt-12 w-[100vw] left-1/2 -translate-x-1/2">
                {/* Vertical Line (Mobile) - Positioned in the new gutter */}


                <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-12 w-full md:w-2/3 lg:w-full max-w-[1700px] mx-auto md:mx-auto lg:mx-auto pl-16 pr-6 md:pl-20 md:pr-12 lg:px-20">
                    {/* Vertical Line (Mobile) - Positioned in the new gutter */}
                    <div className="absolute top-0 bottom-0 left-10 md:left-14 w-px bg-border lg:hidden" />

                    {/* PHASE 1 */}
                    <div className="lg:flex-1 relative lg:pl-0 mb-16 lg:mb-0">
                        <RndSlideshow />

                        {/* Timeline Anchor (Desktop) */}
                        <div className="relative h-px w-full hidden lg:block my-6">
                            {/* Star */}
                            <img
                                src="/icons/star.svg"
                                alt="Star"
                                className="absolute top-1/2 -translate-y-1/2 left-[-2.6rem] w-9 h-9 block dark:invert z-10"
                            />
                            {/* Line Segment: Starts at star center (-1.5rem), goes to right gap center (-24px) */}
                            <div className="absolute top-0 left-[-1.5rem] right-[-24px] h-px bg-border" />
                        </div>
                        {/* Mobile Star (Vertical Layout) */}
                        <img
                            src="/icons/star.svg"
                            alt="Star"
                            className="absolute top-[-2rem] left-[-2.625rem] md:left-[-2.625rem] w-9 h-9 block dark:invert lg:hidden"
                        />

                        <div className="mb-6 lg:mt-6">
                            <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase block mb-2">Phase 1</span>
                            <h3 className="text-2xl font-bold text-foreground block mb-1">R&D</h3>
                            <Badge>18 Months</Badge>
                        </div>

                        <div className="space-y-6">
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
                    <div className="lg:flex-1 relative lg:pl-0 mb-16 lg:mb-0">
                        <GTMSlideshow />

                        {/* Timeline Anchor (Desktop) */}
                        <div className="relative h-px w-full hidden lg:block my-6">
                            {/* Star */}
                            <img
                                src="/icons/star.svg"
                                alt="Star"
                                className="absolute top-1/2 -translate-y-1/2 left-[-2.6rem] w-9 h-9 block dark:invert z-10"
                            />
                            {/* Line Segment: Full width plus gaps (-24px to -24px) */}
                            <div className="absolute top-0 left-[-24px] right-[-24px] h-px bg-border" />
                        </div>
                        {/* Mobile Star */}
                        <img
                            src="/icons/star.svg"
                            alt="Star"
                            className="absolute top-[-2rem] left-[-2.625rem] md:left-[-2.625rem] w-9 h-9 block dark:invert lg:hidden"
                        />

                        <div className="mb-6 lg:mt-6">
                            <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase block mb-2">Phase 2</span>
                            <h3 className="text-2xl font-bold text-foreground block mb-1">GTM</h3>
                            <Badge>18 Months</Badge>
                        </div>

                        <div className="space-y-6">
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
                    <div className="lg:flex-1 relative lg:pl-0 mb-16 lg:mb-0">
                        <div className="w-full aspect-[2500/1335] rounded-lg overflow-hidden bg-black mb-6 lg:mb-0">
                            <WipeLoopVideo
                                src="/images/civilizational%20scale/Animated_Earth_View_From_Space.mp4"
                                className="w-full h-full object-cover scale-[1.35] transform origin-center"
                            />
                        </div>

                        {/* Timeline Anchor (Desktop) */}
                        <div className="relative h-px w-full hidden lg:block my-6">
                            {/* Star */}
                            <img
                                src="/icons/star.svg"
                                alt="Star"
                                className="absolute top-1/2 -translate-y-1/2 left-[-2.6rem] w-9 h-9 block dark:invert z-10"
                            />
                            {/* Line Segment: Starts from left gap (-24px) and extends off screen */}
                            <div className="absolute top-0 left-[-24px] w-[100vw] h-px bg-border" />
                        </div>
                        {/* Mobile Star */}
                        <img
                            src="/icons/star.svg"
                            alt="Star"
                            className="absolute top-[-2rem] left-[-2.625rem] md:left-[-2.625rem] w-9 h-9 block dark:invert lg:hidden"
                        />

                        <div className="mb-6 lg:mt-6">
                            <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase block mb-2">Phase 3</span>
                            <h3 className="text-2xl font-bold text-foreground block mb-1">Civilizational Scale</h3>
                            {/* Spacer for alignment */}
                            <div className="h-[22px]"></div>
                        </div>

                        <div className="space-y-6">
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
        </section >
    );
}
