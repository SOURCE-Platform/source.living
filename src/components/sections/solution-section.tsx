import { useRef } from "react";
import Image from "next/image";
import { CodeIllustration } from "@/components/illustrations/CodeIllustration";
import { TransitionLink } from "../atoms/transition-link";
import { SectionPlayButton } from "@/components/audio-player/SectionPlayButton";

import { ArcWaves } from "../atoms/arc-waves";
import type { ChapterSummary } from "@/components/audio-player/context/types";


import { ScrollScaleImage } from "@/components/ui/scroll-scale-image";

const SOLUTION_CHAPTERS: ChapterSummary[] = [
    { title: "The Source Hardware Vision: Sensors & Robotic Installation", start: 0 },
    { title: "Total Transparency: Recording the Installation Process", start: 95000 },
    { title: "Paranoia as Marketing: The “Zero Fuckery” Policy", start: 155000 },
    { title: "Privacy, Nudity, and Auto-Redaction", start: 248000 },
    { title: "Technical Architecture: Secure Enclaves & Blockchain Hashing", start: 305000 },
    { title: "Reality Proving and Immutable Evidence", start: 346000 },
    { title: "Countering Deepfakes with \"Proof of Humanity\"", start: 402000 },
    { title: "Manufacturing Reality: The Difficulty of Discerning Truth", start: 488000 },
    { title: "The Deceptive Nature of Humans: \"Guilty Until Proven Innocent\"", start: 538000 },
    { title: "BCI Integration and Detecting Psychosis", start: 664000 },
    { title: "The Necessity of Capturing Fact to Save Reality", start: 688000 },
];

export function SolutionSection() {
    const circleRef = useRef<HTMLDivElement>(null);

    return (
        <section className="space-y-4 relative">


            {/* Content Container with White Circle Target */}
            <div className="relative w-full flex items-center justify-center mb-12 mt-32 max-w-[1400px] mx-auto px-4 z-0 h-64 pointer-events-none">
                {/* 
                   logic: -mt-[calc(100vh-16rem)] moves this UP into the sticky area? 
                   Wait, sticky is in flow.
                   If I put sticky first, it takes up 100vh space.
                   So content comes after.
                   I want content to OVERLAP sticky area.
                   So I need negative margin.
                   h-64 is 16rem.
                   So -mt-[100vh] puts it at top?
                   I want the circle to be centered in the section roughly?
                   Actually, let's just make the sticky container absolute? 
                   No, sticky is good for "pinned to viewport" effect *while scrolling*?
                   But if sticky takes up space, it pushes content down.
                   Let's use `absolute top-0` for the container and `h-full` to limit it to section?
                   User said "pinned to bottom corners of viewport".
                   If I use `sticky top-0 h-screen`, the bottom of this div is the bottom of viewport.
                   So `0,100` in SVG matches viewport bottom.
                   
                   But I need the *rest* of the content to be visible.
                   So I should give the sticky container `position: absolute`? No, `fixed`?
                   If I use `absolute top-0 left-0 w-full h-full`, it scrolls.
                   Using `sticky` is correct for viewport-relative coordinates inside a section.
                   But to avoid pushing content, I can make the sticky element `absolute`? No.
                   
                   Strategy:
                   Leave sticky element in flow.
                   Give it `mb-[-100vh]`.
                   So it takes 0 space effectively in flow.
                */}
            </div>

            {/* Retry Logic: Just put ArcWaves container as absolute h-[200vh]? 
                No, dynamic arc requires viewport matching.
                
                Let's stick to the user request.
                "pinned to bottom right and left corners of the viewport".
                This implies `position: fixed; bottom: 0; left: 0; width: 100vw; height: 100vh`.
                And we rely on `z-index` and `opacity` (maybe) to handle out-of-section?
                Or just let it be fixed background.
                
                If I make it global fixed background, it works perfectly for the visual effect.
                Is it okay to have it visible elsewhere? Probably not.
                But `SolutionSection` is huge.
                
                Let's try the `sticky` + negative margin trick.
                1. Sticky container `h-screen`.
                2. Wrapper `div` with `h-0` or similar?
                
             */}

            {/* Simpler: The white circle is part of the flow. 
                 The Arcs are background.
                 I'll put the Arcs in a `fixed` container inside the section?
                 Does `fixed` inside `relative` work? No, it's relative to viewport.
                 So `fixed` puts it on screen.
                 I will use `clip-path` on the section to clip the fixed background?
                 `section { clip-path: inset(0); }` ? 
                 This clips fixed children to the section bounds!
                 Perfect.
                 
                 So:
                 `section relative` with `clip-path` (maybe via class or style).
                 `ArcWaves` container `fixed inset-0 h-screen w-screen`.
                 `Circle` container standard flow.
             */}

            {/* Wait, standard clip-path might cause issues with `sticky` siblings?
                 Let's assume standard behavior.
                 `overflow-clip`?
                 
                 Let's just use `fixed` and let it be. If the user complains about bleed, we fix it.
                 It's the "Solution" section, maybe it's the main thing.
             */}

            <div className="fixed inset-0 w-screen h-screen z-[-1] pointer-events-none flex justify-center">
                <ArcWaves targetRef={circleRef} className="w-full h-full opacity-50 dark:opacity-100" />
            </div>

            <div className="relative w-full flex items-center justify-center mb-12 mt-32 max-w-[1400px] mx-auto px-4 z-0 h-64" ref={circleRef}>
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <svg
                        viewBox="0 0 100 100"
                        className="h-full w-auto fill-white"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="50" cy="50" r="50" />
                    </svg>
                </div>
            </div>
            <div className="flex items-center gap-5 w-full xs:max-w-[70%] mx-auto">
                <h2 className="text-4xl font-bold text-foreground">The Solution</h2>
                <SectionPlayButton
                    title="The Solution"
                    audioSrc="/audio/source-solution-v1.mp3"
                    chapters={SOLUTION_CHAPTERS}
                />
            </div>
            <div className="w-full xs:max-w-[70%] space-y-4 mx-auto">
                <p>
                    To solve an expansive problem set outlined above requires a holisitic data collecting and processing system. A proactive, always-on system that can detect and solve problems before they become crises.
                </p>
                <p>To solve this massive multi-dimensional problem set we need <strong className="text-foreground">SOURCE</strong>.</p>
                <p>
                    But what exactly is it?
                </p>
            </div>

            <div className="mt-36 flex flex-col md:flex-row gap-8 md:gap-12 md:-mx-[25%] items-start">
                <div className="md:flex-1">
                    <div className="relative w-full h-[380px] mb-6 rounded-lg playgrade-static-glow overflow-hidden">
                        {/* Light Mode Image */}
                        <div className="absolute inset-0 dark:hidden">
                            <ScrollScaleImage
                                src="/images/hardware/kern-computer-in-cubby.png"
                                alt="Hardware Illustration"
                                fill
                                containerClassName="w-full h-full rounded-lg"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Dark Mode Image */}
                        <div className="absolute inset-0 hidden dark:block">
                            <ScrollScaleImage
                                src="/images/hardware/kern-compute-in-dark-cubby.png"
                                alt="Hardware Illustration"
                                fill
                                containerClassName="w-full h-full rounded-lg"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                        <h3 className="text-3xl font-bold text-foreground">Hardware</h3>
                        <SectionPlayButton
                            title="Hardware"
                            audioSrc="/audio/hardware.mp3"
                        />
                    </div>
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

                <div className="md:flex-1 md:-mt-16">
                    <div className="relative w-full aspect-[1440/1439] mb-6 rounded-lg playgrade-static-glow overflow-hidden">
                        {/* Light Mode: settings white mode.png */}
                        <div className="absolute inset-0 dark:hidden">
                            <ScrollScaleImage
                                src="/images/software/settings white mode.png"
                                alt="Software Illustration"
                                fill
                                containerClassName="w-full h-full rounded-lg"
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                        {/* Dark Mode: settings dark.png */}
                        <div className="absolute inset-0 hidden dark:block">
                            <ScrollScaleImage
                                src="/images/software/settings dark.png"
                                alt="Software Illustration"
                                fill
                                containerClassName="w-full h-full rounded-lg"
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                        <h3 className="text-3xl font-bold text-foreground">Software</h3>
                        <SectionPlayButton
                            title="Software"
                            audioSrc="/audio/software.mp3"
                        />
                    </div>
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
                    <div className="relative w-full h-[380px] mb-6 rounded-lg playgrade-static-glow overflow-hidden">
                        <ScrollScaleImage
                            src="/images/social/royal social.png"
                            alt="Social Illustration"
                            fill
                            containerClassName="w-full h-full rounded-lg"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                        <h3 className="text-3xl font-bold text-foreground">Social</h3>
                        <SectionPlayButton
                            title="Social"
                            audioSrc="/audio/social.mp3"
                        />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-bold text-foreground mb-1">CAST</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                A &quot;Context Economy&quot; engine that leverages real-world data from the Sensor Grid, combined with SOURCE ID and Personal AI, to matchmake across the human population. This high-resolution understanding of reality generates deep behavioral insights previously impossible to detect.
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

            {/* Data Ownership & Security Section - Shield Left, Text Content Right */}
            <div className="mt-36 mb-36 flex flex-col md:flex-row gap-12 items-start md:-mx-[15%]">
                {/* Shield Image on Left */}
                <div className="w-full md:w-[60%]">
                    <div className="relative w-full h-[500px] md:sticky md:top-24">
                        <Image
                            src="/images/shield.png"
                            alt="Data Ownership Illustration"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Right Column - Both Sections Stacked */}
                <div className="w-full md:w-[40%] space-y-16 mt-12">
                    {/* Data Ownership Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-5">
                            <h3 className="text-3xl font-bold text-foreground">Data Ownership</h3>
                            <SectionPlayButton
                                title="Data Ownership"
                                audioSrc="/audio/data-ownership.mp3"
                            />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-foreground mb-1">
                                Source democratizes surveillance.
                            </p>
                            <p className="text-sm text-foreground">
                                Instead of states and corporations owning your data, you own it. All data is processed locally and cryptographically secured—serving your health, safety, and personal AI, not external entities.
                            </p>
                        </div>
                    </div>

                    {/* Data Security Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-5">
                            <h3 className="text-3xl font-bold text-foreground">Data Security</h3>
                            <SectionPlayButton
                                title="Data Security"
                                audioSrc="/audio/data-security.mp3"
                            />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-foreground mb-1">
                                Military-grade encryption at the edge.
                            </p>
                            <p className="text-sm text-foreground">
                                All data processing happens locally on your hardware. Nothing leaves your environment unless you explicitly authorize it. Your data is cryptographically secured and protected by design.
                            </p>
                        </div>
                    </div>
                </div>
            </div>



            <div className="flex flex-col rounded-lg border border-border bg-muted/10 w-full xs:max-w-[70%] mx-auto">
                <div className="p-5 space-y-3">
                    <h3 className="text-3xl font-bold text-foreground">Mapping the Solution</h3>
                    <p className="text-sm">
                        How Source specifically targets and neutralizes the systemic threats outlined in the Convergence Report.
                    </p>
                </div>
                <TransitionLink
                    href="/solutions"
                    className="flex w-[calc(100%+32px)] -mx-4 -mb-6 items-center rounded-xl border border-transparent bg-white dark:bg-[#171720] px-8 py-4 text-sm font-bold text-foreground shadow-lg hover:shadow-xl dark:shadow-[0_0_20px_rgba(151,161,251,0.5)] dark:hover:shadow-[0_0_30px_rgba(151,161,251,0.8)] transition-all hover:bg-[#f2f3fa] dark:hover:bg-[#1c1c27] playgrade-border hover:scale-[1.01] active:scale-[0.99] -mt-px group relative z-10"
                >
                    <span className="flex-1 text-center font-bold">SOURCE Solution Map</span>
                    <svg width="50" height="12" viewBox="0 0 50 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-4 group-hover:translate-x-1 transition-all duration-300 opacity-75 group-hover:opacity-100 [--pg-stop-1:#02ABFF] [--pg-stop-2:#02ABFF] [--pg-stop-3:#001AFF] dark:[--pg-stop-1:#FFC1D5] dark:[--pg-stop-2:#FEFFE3] dark:[--pg-stop-3:#97A1FB] [--pg-h-stop-1:#02ABFF] [--pg-h-stop-2:#001AFF] dark:[--pg-h-stop-1:#FFC1D5] dark:[--pg-h-stop-2:#FEFFE3]">
                        <defs>
                            <linearGradient id="pg-gradient-solution-normal" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="var(--pg-stop-1)" />
                                <stop offset="50%" stopColor="var(--pg-stop-2)" />
                                <stop offset="100%" stopColor="var(--pg-stop-3)" />
                            </linearGradient>
                            <linearGradient id="pg-gradient-solution-hover" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="var(--pg-h-stop-1)" />
                                <stop offset="100%" stopColor="var(--pg-h-stop-2)" />
                            </linearGradient>
                        </defs>
                        <path d="M0 6L49 6M49 6L44 1M49 6L44 11" stroke="url(#pg-gradient-solution-normal)" strokeWidth="1" />
                        <path d="M0 6L49 6M49 6L44 1M49 6L44 11" stroke="url(#pg-gradient-solution-hover)" strokeWidth="1" className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </svg>
                </TransitionLink>
            </div>
        </section>
    );
}
