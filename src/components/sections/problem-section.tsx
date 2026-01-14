import Link from "next/link";
import Image from "next/image";
import { WarpedImage } from "../3d/WarpedImage";
import { TransitionLink } from "../atoms/transition-link";
import { SectionPlayButton } from "@/components/audio-player/SectionPlayButton";
import { Badge } from "@/components/atoms/badge";

import { Slideshow } from "@/components/atoms/slideshow";
import { RotatingSlideshow } from "@/components/atoms/rotating-slideshow";
import type { ChapterSummary } from "@/components/audio-player/context/types";

const DATA_WALL_CHAPTERS: ChapterSummary[] = [
    { title: "The Data Problem: Quantity vs. Quality", start: 0 },
    { title: "The Necessity of Continuous Observation (The Sensor Grid)", start: 91000 },
    { title: "Scaling Up: A Holistic Understanding of Humanity", start: 150000 },
    { title: "AI Driven Matchmaking and the End of Human Politicians", start: 189000 },
    { title: "The Concept of \"Super Awareness\"", start: 308000 },
    { title: "Privacy vs. The Obligation to Upgrade Civilization", start: 383000 },
];

const SYSTEMIC_CONVERGENCE_CHAPTERS: ChapterSummary[] = [
    { title: "Defining Systemic Convergence & Failure Modes", start: 0 },
    { title: "The Macro & Micro Problem Sets (Evidence of Decline)", start: 52000 },
    { title: "Is It Too Late? (The Doomer Perspective vs. Action)", start: 116000 },
    { title: "Planning for What Comes After the Collapse", start: 161000 },
    { title: "\"Source\" as the Base Infrastructure for Rebuilding", start: 202000 },
    { title: "Frustration with the Current World Design", start: 226000 },
    { title: "Important Lessons in the Near Future", start: 258000 },
];

const LOW_QUALITY_DATA_IMAGES = [
    "/images/low quality data/61c822907d87b57f50b38b41ab48038c.gif",
    "/images/low quality data/ericmish.gif",
    "/images/low quality data/girlrlrlrlr.gif",
    "/images/low quality data/eat-delicious.gif",
    "/images/low quality data/drakemosh.png",
    "/images/low quality data/b74.gif",
    "/images/low quality data/aORgQU.gif",
    "/images/low quality data/tumblr_mlzogpwjwI1rxkznbo1_500.gif",
    "/images/low quality data/corrupt-datamosh.gif",
    "/images/low quality data/1_FbpwampTI0FMq9rfihQjIA.gif",
    "/images/low quality data/RQmFCoy.gif",
    "/images/low quality data/jack-torrence-datamosh.gif",
    "/images/low quality data/feac6cb7fcb3a95881e15ac4d620e541.gif",
    "/images/low quality data/datamosh-3.png",
];

const LOW_QUANTITY_DATA_IMAGES = [
    { src: "/images/low quantity data/image.png", scale: 1.0 }, // Doom Disk
    { src: "/images/low quantity data/image (1).png", scale: 1.5 }, // Assuming similar
    { src: "/images/low quantity data/imegobg rm.png", scale: 0.95 }, // Ultima IV
];

export function ProblemSection() {
    return (
        <section className="space-y-8">
            <div className="space-y-4">
                <div className="w-full h-64 bg-muted/20 rounded-lg mb-8" />
                <h2 className="text-4xl font-bold text-foreground w-full xs:max-w-[70%] mx-auto">The Problems</h2>
                <p className="w-full xs:max-w-[70%] mx-auto">
                    We are facing a simultaneous convergence of systemic failures that are reshaping human civilization. The "Data Wall"—the limit of current AI—is just one component of this larger crisis.
                </p>
            </div>

            {/* 1. The Data Wall */}
            <div className="flex flex-row gap-6 w-full xs:max-w-[70%] mx-auto">
                <span className="text-8xl font-thin leading-none text-transparent bg-clip-text bg-[image:var(--background-image-playgrade-light)] dark:bg-[image:var(--background-image-playgrade)] select-none">1</span>
                <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-5 w-full">
                        <h3 className="text-3xl font-bold text-foreground">The Data Wall</h3>
                        <SectionPlayButton
                            title="The Data Wall"
                            audioSrc="/audio/source-data-wall.mp3"
                            chapters={DATA_WALL_CHAPTERS}
                        />
                    </div>
                    <p className="w-full">
                        We have thrown the entire internet at Transformers. While effective, this approach is constrained by the <strong className="text-foreground">qualitative</strong> and <strong className="text-foreground">quantitative</strong> limitations of the data source itself.
                    </p>
                </div>
            </div>

            <div className="space-y-8 py-6">
                <div className="flex flex-col xs:flex-row gap-8 items-start">
                    <div className="w-full xs:w-24 xs:h-24 md:w-48 md:h-48 h-48 shrink-0 bg-muted/20 rounded-lg overflow-hidden relative">
                        <Slideshow images={LOW_QUALITY_DATA_IMAGES} />
                    </div>
                    <div>
                        <Badge className="mb-2">Qualitative</Badge>
                        <h4 className="text-xl font-bold text-foreground mb-2">Low Quality Data</h4>
                        <p className="text-muted-foreground">
                            LLMs are trained on the <em>internet</em>, which is performative, artificial, and highly edited. It lacks the authentic, natural behavior that defines actual human experience.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col xs:flex-row gap-8 items-start">
                    <div className="w-full xs:w-24 xs:h-24 md:w-48 md:h-48 h-48 shrink-0 rounded-lg overflow-hidden relative">
                        <RotatingSlideshow images={LOW_QUANTITY_DATA_IMAGES} />
                    </div>
                    <div>
                        <Badge className="mb-2">Quantitative</Badge>
                        <h4 className="text-xl font-bold text-foreground mb-2">Low Quantity Data</h4>
                        <p className="text-muted-foreground">
                            Current AI misses 99.99% of human experience—the physical world and the real-time living that happens beyond static text and curated uploads. After all, we humans are constantly producing data that's getting lost to the void.
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. The Expanded Problem Set */}
            <div className="space-y-4 mt-24">
                <WarpedImage
                    src="/images/systemicconvergence/beksinski-1.jpg"
                    className="w-full rounded-lg mb-8"
                />
                <div className="flex flex-row gap-6 w-full xs:max-w-[70%] mx-auto">
                    <span className="text-8xl font-thin leading-none text-transparent bg-clip-text bg-[image:var(--background-image-playgrade-light)] dark:bg-[image:var(--background-image-playgrade)] select-none">2</span>
                    <div className="space-y-4 pt-2">
                        <div className="flex items-center gap-5 w-full">
                            <h3 className="text-3xl font-bold text-foreground">The Systemic Convergence</h3>
                            <SectionPlayButton
                                title="The Systemic Convergence"
                                audioSrc="/audio/source-systemic-convergence.mp3"
                                chapters={SYSTEMIC_CONVERGENCE_CHAPTERS}
                            />
                        </div>
                        <p className="w-full">
                            Beyond the AI data bottleneck, failure modes are converging across the entire stack. From macro-institutional decay to micro-biological strain, the friction of existence is rising uniformly.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col rounded-lg border border-border bg-white/30 dark:bg-muted/20 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                        <div className="p-5 pb-16 space-y-6">
                            <h4 className="text-xl font-bold text-foreground">The Macro Problem Set</h4>
                            <ul className="space-y-6 text-sm text-muted-foreground list-none pl-0">
                                <li>
                                    <strong className="text-foreground block mb-1">Political</strong>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge>Inadequate Problem Solving</Badge>
                                        <Badge>Polarization</Badge>
                                        <Badge>Erosion of Trust</Badge>
                                    </div>
                                </li>
                                <li>
                                    <strong className="text-foreground block mb-1">Economic</strong>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge>Layoffs</Badge>
                                        <Badge>Supply Chain Disruptions</Badge>
                                        <Badge>Inflation</Badge>
                                    </div>
                                </li>
                                <li>
                                    <strong className="text-foreground block mb-1">Macro-Social</strong>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge>Social Media Algorithms</Badge>
                                        <Badge>Division</Badge>
                                        <Badge>Classism</Badge>
                                    </div>
                                </li>
                                <li>
                                    <strong className="text-foreground block mb-1">Technological</strong>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge>Privacy</Badge>
                                        <Badge>Deepfakes</Badge>
                                        <Badge>AI Alignment</Badge>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="p-5 pb-16 space-y-6">
                            <h4 className="text-xl font-bold text-foreground">The Micro Problem Set</h4>
                            <ul className="space-y-6 text-sm text-muted-foreground list-none pl-0">
                                <li>
                                    <strong className="text-foreground block mb-1">Mental & Emotional</strong>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge>Loneliness</Badge>
                                        <Badge>Depression</Badge>
                                        <Badge>Neurodivergency</Badge>
                                    </div>
                                </li>
                                <li>
                                    <strong className="text-foreground block mb-1">Physical Health</strong>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge>Late Diagnosis</Badge>
                                        <Badge>Poor Management</Badge>
                                        <Badge>Accidents</Badge>
                                    </div>
                                </li>
                                <li>
                                    <strong className="text-foreground block mb-1">Micro-Social</strong>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge>Relationship Conflicts</Badge>
                                        <Badge>Degradation of Bonds</Badge>
                                    </div>
                                </li>
                                <li>
                                    <strong className="text-foreground block mb-1">Computing</strong>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge>UX Pain</Badge>
                                        <Badge>Fragmented Ecosystems</Badge>
                                        <Badge>IAM</Badge>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <TransitionLink
                        href="/convergence"
                        className="flex w-full items-center rounded-xl border border-transparent bg-white dark:bg-[#171720] px-8 py-4 text-sm font-bold text-foreground shadow-lg hover:shadow-xl dark:shadow-[0_0_20px_rgba(151,161,251,0.5)] dark:hover:shadow-[0_0_30px_rgba(151,161,251,0.8)] transition-all hover:bg-[#f2f3fa] dark:hover:bg-[#1c1c27] playgrade-border hover:scale-[1.01] active:scale-[0.99] group relative z-10"
                    >
                        <span className="flex-1 text-center font-bold">Systemic Convergence Analysis</span>
                        <svg width="50" height="12" viewBox="0 0 50 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-4 group-hover:translate-x-1 transition-all duration-300 opacity-75 group-hover:opacity-100 [--pg-stop-1:#02ABFF] [--pg-stop-2:#02ABFF] [--pg-stop-3:#001AFF] dark:[--pg-stop-1:#FFC1D5] dark:[--pg-stop-2:#FEFFE3] dark:[--pg-stop-3:#97A1FB] [--pg-h-stop-1:#02ABFF] [--pg-h-stop-2:#001AFF] dark:[--pg-h-stop-1:#FFC1D5] dark:[--pg-h-stop-2:#FEFFE3]">
                            <defs>
                                <linearGradient id="pg-gradient-converge-normal" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="var(--pg-stop-1)" />
                                    <stop offset="50%" stopColor="var(--pg-stop-2)" />
                                    <stop offset="100%" stopColor="var(--pg-stop-3)" />
                                </linearGradient>
                                <linearGradient id="pg-gradient-converge-hover" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="var(--pg-h-stop-1)" />
                                    <stop offset="100%" stopColor="var(--pg-h-stop-2)" />
                                </linearGradient>
                            </defs>
                            <path d="M0 6L49 6M49 6L44 1M49 6L44 11" stroke="url(#pg-gradient-converge-normal)" strokeWidth="1" />
                            <path d="M0 6L49 6M49 6L44 1M49 6L44 11" stroke="url(#pg-gradient-converge-hover)" strokeWidth="1" className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </svg>
                    </TransitionLink>
                </div>
            </div >
        </section >
    );
}
