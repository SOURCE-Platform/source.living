import Link from "next/link";
import { SectionPlayButton } from "@/components/audio-player/SectionPlayButton";
import { TRANSCRIPT_DATA, CHAPTERS_DATA } from "@/lib/constants";

export function ProblemSection() {
    return (
        <section className="space-y-8">
            <div className="space-y-4">
                <div className="w-full h-64 bg-muted/20 rounded-lg mb-8" />
                <h2 className="text-4xl font-bold text-foreground max-w-[70%] mx-auto">The Problems</h2>
                <p className="max-w-[70%] mx-auto">
                    We are facing a simultaneous convergence of systemic failures that are reshaping human civilization. The "Data Wall"—the limit of current AI—is just one component of this larger crisis.
                </p>
            </div>

            {/* 1. The Data Wall */}
            <div className="space-y-4">
                <div className="flex items-center gap-5 max-w-[70%] mx-auto">
                    <h3 className="text-3xl font-bold text-foreground">1. The Data Wall</h3>
                    <SectionPlayButton
                        title="The Data Wall"
                        audioSrc="/audio/The%20Data%20Wall.mp3"
                        transcript={TRANSCRIPT_DATA}
                        chapters={CHAPTERS_DATA}
                    />
                </div>
                <p className="max-w-[70%] mx-auto">
                    We have thrown the entire internet at Transformers. While effective, this approach is constrained by the <strong className="text-foreground">qualitative</strong> and <strong className="text-foreground">quantitative</strong> limitations of the data source itself.
                </p>

                <div className="space-y-8 py-6">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-full md:w-48 h-48 shrink-0 bg-muted/20 rounded-lg" />
                        <div>
                            <div className="mb-2 w-fit rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-semibold text-foreground uppercase tracking-wider">Qualitative</div>
                            <h4 className="text-xl font-bold text-foreground mb-2">Low Quality Data</h4>
                            <p className="text-muted-foreground">
                                LLMs are trained on the <em>internet</em>, which is performative, artificial, and highly edited. It lacks the authentic, natural behavior that defines actual human experience.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-full md:w-48 h-48 shrink-0 bg-muted/20 rounded-lg" />
                        <div>
                            <div className="mb-2 w-fit rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-semibold text-foreground uppercase tracking-wider">Quantitative</div>
                            <h4 className="text-xl font-bold text-foreground mb-2">Low Quantity Data</h4>
                            <p className="text-muted-foreground">
                                Current AI misses 99.99% of human experience—the physical world and the real-time living that happens beyond static text and curated uploads. After all, we humans are constantly producing data that's getting lost to the void.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. The Expanded Problem Set */}
            <div className="space-y-4 mt-24">
                <div className="w-full h-64 bg-muted/20 rounded-lg mb-8" />
                <div className="flex items-center gap-5 max-w-[70%] mx-auto">
                    <h3 className="text-3xl font-bold text-foreground">2. The Systemic Convergence</h3>
                    <SectionPlayButton
                        title="The Systemic Convergence"
                        audioSrc="/audio/Systemic%20Convergence.mp3"
                        transcript={TRANSCRIPT_DATA}
                        chapters={CHAPTERS_DATA}
                    />
                </div>
                <p className="max-w-[70%] mx-auto">
                    Beyond the AI data bottleneck, failure modes are converging across the entire stack. From macro-institutional decay to micro-biological strain, the friction of existence is rising uniformly.
                </p>

                <div className="flex flex-col rounded-lg border border-border bg-muted/10 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                        <div className="p-5 pb-16 space-y-6">
                            <h4 className="text-xl font-bold text-foreground">The Macro Problem Set</h4>
                            <ul className="space-y-6 text-sm text-muted-foreground">
                                <li>
                                    <strong className="text-foreground block mb-1">Political</strong>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Inadequate Problem Solving</span>
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Polarization</span>
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Erosion of Trust</span>
                                    </div>
                                </li>
                                <li>
                                    <strong className="text-foreground block mb-1">Economic</strong>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Layoffs</span>
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Supply Chain Disruptions</span>
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Inflation</span>
                                    </div>
                                </li>
                                <li>
                                    <strong className="text-foreground block mb-1">Macro-Social</strong>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Social Media Algorithms</span>
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Division</span>
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Classism</span>
                                    </div>
                                </li>
                                <li>
                                    <strong className="text-foreground block mb-1">Technological</strong>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Privacy</span>
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Deepfakes</span>
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">AI Alignment</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="p-5 pb-16 space-y-6">
                            <h4 className="text-xl font-bold text-foreground">The Micro Problem Set</h4>
                            <ul className="space-y-6 text-sm text-muted-foreground">
                                <li>
                                    <strong className="text-foreground block mb-1">Mental & Emotional</strong>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Loneliness</span>
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Depression</span>
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Neurodivergency</span>
                                    </div>
                                </li>
                                <li>
                                    <strong className="text-foreground block mb-1">Physical Health</strong>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Late Diagnosis</span>
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Poor Management</span>
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Accidents</span>
                                    </div>
                                </li>
                                <li>
                                    <strong className="text-foreground block mb-1">Micro-Social</strong>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Relationship Conflicts</span>
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Degradation of Bonds</span>
                                    </div>
                                </li>
                                <li>
                                    <strong className="text-foreground block mb-1">Computing</strong>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">UX Pain</span>
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Fragmented Ecosystems</span>
                                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">IAM</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <Link
                        href="/convergence"
                        className="flex w-[calc(100%+32px)] -mx-4 -mb-6 items-center rounded-xl border border-transparent bg-white dark:bg-[#171720] px-8 py-4 text-sm font-bold text-foreground shadow-lg hover:shadow-xl dark:shadow-[0_0_20px_rgba(151,161,251,0.5)] dark:hover:shadow-[0_0_30px_rgba(151,161,251,0.8)] transition-all hover:bg-[#f2f3fa] dark:hover:bg-[#1c1c27] playgrade-border hover:scale-[1.01] active:scale-[0.99] -mt-px group relative z-10"
                    >
                        <span className="flex-1 text-center font-bold">Systemic Convergence Analysis</span>
                        <svg width="50" height="12" viewBox="0 0 50 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-4 group-hover:translate-x-1 transition-all duration-300 opacity-75 group-hover:opacity-100">
                            <defs>
                                <linearGradient id="pg-gradient-converge-normal" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#FFC1D5" />
                                    <stop offset="50%" stopColor="#FEFFE3" />
                                    <stop offset="100%" stopColor="#97A1FB" />
                                </linearGradient>
                                <linearGradient id="pg-gradient-converge-hover" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#FFC1D5" />
                                    <stop offset="100%" stopColor="#FEFFE3" />
                                </linearGradient>
                            </defs>
                            <path d="M0 6L49 6M49 6L44 1M49 6L44 11" stroke="url(#pg-gradient-converge-normal)" strokeWidth="1" />
                            <path d="M0 6L49 6M49 6L44 1M49 6L44 11" stroke="url(#pg-gradient-converge-hover)" strokeWidth="1" className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
