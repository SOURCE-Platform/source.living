import Link from "next/link";
import { SectionPlayButton } from "@/components/audio-player/SectionPlayButton";
import { TRANSCRIPT_DATA, CHAPTERS_DATA } from "@/lib/constants";

export function SolutionSection() {
    return (
        <section className="space-y-4">
            <div className="w-full h-64 flex items-center justify-center mb-24 mt-32">
                <svg
                    viewBox="0 0 100 100"
                    className="h-full w-auto fill-black dark:fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="50" cy="50" r="50" />
                </svg>
            </div>
            <div className="flex items-center gap-5 max-w-[70%] mx-auto">
                <h2 className="text-4xl font-bold text-foreground">The Solution</h2>
                <SectionPlayButton
                    title="The Solution"
                    audioSrc="/audio/The%20Three%20Layers.mp3"
                    transcript={TRANSCRIPT_DATA}
                    chapters={CHAPTERS_DATA}
                />
            </div>
            <div className="max-w-[70%] space-y-4 mx-auto">
                <p>
                    To solve an expansive problem set outlined above requires a holisitic data collecting and processing system. A proactive, always-on system that can detect and solve problems before they become crises.
                </p>
                <p>To solve this massive multi-dimensional problem set we need <strong className="text-foreground">SOURCE</strong>.</p>
                <p>
                    But what exactly is it?
                </p>
            </div>

            <div className="mt-24 flex flex-col md:flex-row gap-8 md:gap-12 md:-mx-[25%] items-start">
                <div className="md:flex-1">
                    <div className="w-full h-32 bg-muted/20 rounded-lg mb-6" />
                    <h3 className="text-3xl font-bold text-foreground mb-6">Hardware</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-bold text-foreground mb-1">Sensor Grid</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                A unified system combining LiDAR, Video, Microphones, and Speakers embedded into every wall and room, wired directly to local compute.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-foreground mb-1">Local Edge Compute</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                High-performance AI servers (housing GPUs or AI chips) located inside the walls or closets, processing all raw sensor data on-site.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="md:flex-1">
                    <div className="w-full h-32 bg-muted/20 rounded-lg mb-6" />
                    <h3 className="text-3xl font-bold text-foreground mb-6">Software</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-bold text-foreground mb-1">SOURCE ID</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Multi-modal identity verification (gait, voice, behavior) eliminating traditional authentication (passwords, 2FA, passkeys).
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-foreground mb-1">Personal AI</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Open-source, SOTA multi-modal models with long-term memory. An agentic system that continuously learns and thinks through a recursive feedback loop, processing all data from your devices, relationships, and environment.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-foreground mb-1">Truth Layer</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Blockchain-tokenized video creating an immutable record of reality. The solution to deepfakes: content without SOURCE verification is assumed fake.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="md:flex-1">
                    <div className="w-full h-32 bg-muted/20 rounded-lg mb-6" />
                    <h3 className="text-3xl font-bold text-foreground mb-6">Social</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-bold text-foreground mb-1">CAST</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                A "Context Economy" engine that leverages real-world data from the Sensor Grid, combined with SOURCE ID and Personal AI, to matchmake across the human population. This high-resolution understanding of reality generates deep behavioral insights previously impossible to detect.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-foreground mb-1">Content Modal</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                The Sensor Grid enables a new medium: <strong>Real-time 4D Gaussian Splatting</strong>. Live streams on CAST where viewers control their own virtual cameras, exploring the environment from any angle—a perfect, immutable representation of reality.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-24 rounded-lg border border-border bg-muted/10 p-6 space-y-4">
                <div className="flex items-center gap-5 max-w-[70%] mx-auto">
                    <h3 className="text-3xl font-bold text-foreground">Data Ownership</h3>
                    <SectionPlayButton
                        title="Data Ownership"
                        audioSrc="/audio/Data%20Ownership.mp3"
                        transcript={TRANSCRIPT_DATA}
                        chapters={CHAPTERS_DATA}
                    />
                </div>
                <div className="max-w-[70%] mx-auto">
                    <p className="text-lg font-bold text-foreground mb-1">
                        Source democratizes surveillance.
                    </p>
                    <p className="text-sm text-foreground">
                        Instead of states and corporations owning your data, you own it. All data is processed locally and cryptographically secured—serving your health, safety, and personal AI, not external entities.
                    </p>
                </div>
            </div>

            <div className="flex flex-col rounded-lg border border-border bg-muted/10">
                <div className="p-5 space-y-3">
                    <h3 className="text-3xl font-bold text-foreground">Mapping the Solution</h3>
                    <p className="text-sm">
                        How Source specifically targets and neutralizes the systemic threats outlined in the Convergence Report.
                    </p>
                </div>
                <Link
                    href="/solutions"
                    className="flex w-[calc(100%+32px)] -mx-4 -mb-6 items-center rounded-xl border border-transparent bg-white dark:bg-[#171720] px-8 py-4 text-sm font-bold text-foreground shadow-lg hover:shadow-xl dark:shadow-[0_0_20px_rgba(151,161,251,0.5)] dark:hover:shadow-[0_0_30px_rgba(151,161,251,0.8)] transition-all hover:bg-[#f2f3fa] dark:hover:bg-[#1c1c27] playgrade-border hover:scale-[1.01] active:scale-[0.99] -mt-px group relative z-10"
                >
                    <span className="flex-1 text-center font-bold">SOURCE Solution Map</span>
                    <svg width="50" height="12" viewBox="0 0 50 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-4 group-hover:translate-x-1 transition-all duration-300 opacity-75 group-hover:opacity-100">
                        <defs>
                            <linearGradient id="pg-gradient-solution-normal" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FFC1D5" />
                                <stop offset="50%" stopColor="#FEFFE3" />
                                <stop offset="100%" stopColor="#97A1FB" />
                            </linearGradient>
                            <linearGradient id="pg-gradient-solution-hover" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FFC1D5" />
                                <stop offset="100%" stopColor="#FEFFE3" />
                            </linearGradient>
                        </defs>
                        <path d="M0 6L49 6M49 6L44 1M49 6L44 11" stroke="url(#pg-gradient-solution-normal)" strokeWidth="1" />
                        <path d="M0 6L49 6M49 6L44 1M49 6L44 11" stroke="url(#pg-gradient-solution-hover)" strokeWidth="1" className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}
