'use client';

import Link from "next/link";
import { SourceLogo } from "@/components/atoms/icons/source-logo";
import { GlobalAudioProvider } from "@/contexts/GlobalAudioContext";
import { GlobalPlayer } from "@/components/audio-player/GlobalPlayer";
import { SectionPlayButton } from "@/components/audio-player/SectionPlayButton";
import type { TranscriptData, ChapterSummary } from "@/components/audio-player/context/types";

const TRANSCRIPT_DATA: TranscriptData = {
  utterances: []
};

const CHAPTERS_DATA: ChapterSummary[] = [];

export default function Home() {
  return (
    <GlobalAudioProvider>
      <div className="min-h-screen bg-background pb-32">
        {/* Main Content */}
        <main className="mx-auto max-w-3xl px-6 sm:px-12 py-12">
          {/* Header with Logo */}
          <div className="mb-16">
            <SourceLogo className="h-12 w-auto" />
          </div>

          {/* Memo Content */}
          <article className="prose prose-invert max-w-none space-y-6 text-base leading-relaxed text-muted-foreground">
            {/* Sections Container */}
            <div className="flex flex-col gap-24">
              {/* SOURCE's Vision */}
              <section className="space-y-4">
                <div className="flex items-center gap-5">
                  <h2 className="text-4xl font-bold text-foreground">Vision</h2>
                  <SectionPlayButton
                    title="Setting the Stage"
                    audioSrc="/audio/SOURCE%20Setting%20the%20Stage.mp3"
                    transcript={TRANSCRIPT_DATA}
                    chapters={CHAPTERS_DATA}
                  />
                </div>
                <p>
                  <strong className="text-foreground">SOURCE</strong> will be an open-source decentralized AI platform designed to achieve <strong className="text-foreground">Super Awareness</strong>, the prerequisite for <strong className="text-foreground">Super Intelligence</strong>.
                </p>
                <p>
                  By deploying smart sensors and heavy local compute in both public and private spaces, we are building <strong className="text-foreground">the new holistic computing paradigm for civilization</strong> that functions as a proactive problem detector and solver.
                </p>
                <p>
                  This infrastructure will capture what current AI fundamentally lacks: <strong className="text-foreground">Human Behavioral and Environmental Data</strong> of such high quality and near-infinite quantity that it will enable the creation of the <strong className="text-foreground">Most Accurate Global World Model</strong> ever built.
                </p>
              </section>

              {/* The Problems */}
              <section className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold text-foreground">The Problems</h2>
                  <p>
                    We are facing a simultaneous convergence of systemic failures that are reshaping human civilization. The "Data Wall"—the limit of current AI—is just one component of this larger crisis.
                  </p>
                </div>

                {/* 1. The Data Wall */}
                <div className="space-y-4">
                  <div className="flex items-center gap-5">
                    <h3 className="text-3xl font-bold text-foreground">1. The Data Wall</h3>
                    <SectionPlayButton
                      title="The Data Wall"
                      audioSrc="/audio/The%20Data%20Wall.mp3"
                      transcript={TRANSCRIPT_DATA}
                      chapters={CHAPTERS_DATA}
                    />
                  </div>
                  <p>
                    We have thrown the entire internet at Transformers. While effective, this approach is constrained by the <strong className="text-foreground">qualitative</strong> and <strong className="text-foreground">quantitative</strong> limitations of the data source itself.
                  </p>

                  <div className="space-y-8 py-6 px-0 md:px-10">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-full md:w-32 h-32 shrink-0 bg-muted/20 border border-border rounded-lg" />
                      <div>
                        <div className="mb-2 w-fit rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-semibold text-foreground uppercase tracking-wider">Qualitative</div>
                        <h4 className="text-xl font-bold text-foreground mb-2">Low Quality Data</h4>
                        <p className="text-muted-foreground">
                          LLMs are trained on the <em>internet</em>, which is performative, artificial, and highly edited. It lacks the authentic, natural behavior that defines actual human experience.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-full md:w-32 h-32 shrink-0 bg-muted/20 border border-border rounded-lg" />
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
                <div className="space-y-4">
                  <div className="flex items-center gap-5">
                    <h3 className="text-3xl font-bold text-foreground">2. The Systemic Convergence</h3>
                    <SectionPlayButton
                      title="The Systemic Convergence"
                      audioSrc="/audio/Systemic%20Convergence.mp3"
                      transcript={TRANSCRIPT_DATA}
                      chapters={CHAPTERS_DATA}
                    />
                  </div>
                  <p>
                    Beyond the AI data bottleneck, failure modes are converging across the entire stack. From macro-institutional decay to micro-biological strain, the friction of existence is rising uniformly.
                  </p>

                  <div className="flex flex-col rounded-lg border border-border bg-muted/10 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                      <div className="p-5 space-y-6">
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

                      <div className="p-5 space-y-6">
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
                      className="flex w-[calc(100%+32px)] -mx-4 -mb-6 items-center rounded-xl border border-border bg-white dark:bg-[#171720] px-8 py-4 text-sm font-bold text-foreground shadow-2xl transition-all hover:bg-[#f2f3fa] dark:hover:bg-[#1c1c27] hover-playgrade-border hover:scale-[1.01] active:scale-[0.99] -mt-px group relative z-10"
                    >
                      <span className="flex-1 text-center font-bold">Systemic Convergence Analysis</span>
                      <span aria-hidden="true" className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>

                <div className="p-10 rounded-2xl bg-muted/20 mt-24">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <strong className="text-foreground text-lg leading-tight block">The Opportunity</strong>
                    </div>
                    <div className="md:col-span-2">
                      <p className="italic text-muted-foreground leading-relaxed">
                        The solution to these converging problems—and the next breakthrough in AI—won't come from more GPUs; it will come from a new <em>class</em> of data: continuous, multimodal, real-world behavioral data.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* The Solution */}
              <section className="space-y-4">
                <div className="flex items-center gap-5">
                  <h2 className="text-4xl font-bold text-foreground">The Solution</h2>
                  <SectionPlayButton
                    title="The Three Layers"
                    audioSrc="/audio/The%20Three%20Layers.mp3"
                    transcript={TRANSCRIPT_DATA}
                    chapters={CHAPTERS_DATA}
                  />
                </div>
                <p>
                  To solve an expansive problem set outlined above requires a holisitic data collecting and processing system. A proactive, always-on system that can detect and solve problems before they become crises.
                </p>
                <p>To solve this massive multi-dimensional problem set we need <strong className="text-foreground">SOURCE</strong>.</p>
                <p>
                  But what exactly is it?
                </p>

                <div className="flex flex-col md:flex-row gap-8 md:gap-12 rounded-lg border border-border bg-muted/10 p-10 md:-mx-[25%] items-start">
                  <div className="md:flex-1">
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

                <div className="rounded-lg border border-border bg-muted/10 p-6 space-y-4">
                  <div className="flex items-center gap-5">
                    <h3 className="text-3xl font-bold text-foreground">Data Ownership</h3>
                    <SectionPlayButton
                      title="Data Ownership & Sovereignty"
                      audioSrc="/audio/Data%20Ownership.mp3"
                      transcript={TRANSCRIPT_DATA}
                      chapters={CHAPTERS_DATA}
                    />
                  </div>
                  <p className="text-sm text-foreground">
                    Source democratizes surveillance. Instead of states and corporations owning your data, you own it. All data is processed locally and cryptographically secured—serving your health, safety, and personal AI, not external entities.
                  </p>
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
                    className="flex w-[calc(100%+32px)] -mx-4 -mb-6 items-center rounded-xl border border-border bg-white dark:bg-[#171720] px-8 py-4 text-sm font-bold text-foreground shadow-2xl transition-all hover:bg-[#f2f3fa] dark:hover:bg-[#1c1c27] hover-playgrade-border hover:scale-[1.01] active:scale-[0.99] -mt-px group relative z-10"
                  >
                    <span className="flex-1 text-center font-bold">SOURCE Solution Map</span>
                    <span aria-hidden="true" className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>

              </section>

              {/* Go-to-Market Strategy */}
              <section className="space-y-4">
                <div className="flex items-center gap-5">
                  <h2 className="text-4xl font-bold text-foreground">GTM</h2>
                  <SectionPlayButton
                    title="Go-to-Market Strategy"
                    audioSrc="/audio/GTM.mp3"
                    transcript={TRANSCRIPT_DATA}
                    chapters={CHAPTERS_DATA}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 rounded-lg border border-border bg-muted/10 p-10 md:-mx-[25%] items-start">
                  <div className="md:flex-1 space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-1">Elderly Care</h4>
                      <span className="inline-block rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider mb-2">Revenue Driver</span>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        A passive safety layer that tracks cognitive decline, memory, and physical safety without wearable devices. Families pay for peace of mind.
                      </p>
                    </div>
                  </div>

                  <div className="md:flex-1 space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-1">Early Adopters & Tech</h4>
                      <span className="inline-block rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider mb-2">Revenue Driver</span>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Selling the "Smart Home 2.0" experience to the tech-forward demographic who want total home automation and "Jarvis-like" AI.
                      </p>
                    </div>
                  </div>

                  <div className="md:flex-1 space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-1">Influencers & Streamers</h4>
                      <span className="inline-block rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider mb-2">Marketing Engine</span>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        We provide free/subsidized installations to top creators. They use Source as a full in-house studio system—no longer tied to their computers—while showcasing the <strong>4D Gaussian Splatting</strong> capabilities (holographic video) to their millions of followers, driving the cultural hype cycle.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* The Master Plan */}
              <section className="space-y-4">
                <div className="flex items-center gap-5">
                  <h2 className="text-4xl font-bold text-foreground">Roadmap</h2>
                  <SectionPlayButton
                    title="The Roadmap"
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
                        <h3 className="text-2xl font-bold text-foreground block mb-1">SOURCE School & HQ</h3>
                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">18 Months</span>
                      </div>

                      <div className="rounded-lg border border-border bg-muted/10 p-5 space-y-6">
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
                        <h3 className="text-2xl font-bold text-foreground block mb-1">Residential Beta</h3>
                        <span className="rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-medium text-foreground tracking-wider">Concurrent with Phase 1</span>
                      </div>

                      <div className="rounded-lg border border-border bg-muted/10 p-5 space-y-6">
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

                      <div className="rounded-lg border border-border bg-muted/10 p-5 space-y-6">
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

              {/* Competitive Advantage */}
              <section className="space-y-4">
                <h2 className="text-4xl font-bold text-foreground">Competitive Advantage</h2>
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 rounded-lg border border-border bg-muted/10 p-10 md:-mx-[25%] items-start">
                  <div className="md:flex-1 space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-1">The Data Moat</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        OpenAI and Google have the internet. We have the <em>living room</em>. This high-resolution behavioral dataset does not currently exist anywhere else.
                      </p>
                    </div>
                  </div>

                  <div className="md:flex-1 space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-1">Privacy Architecture</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        By processing locally and tokenizing via blockchain, we solve the "Big Brother" fear. Users own their data; we just provide the architecture.
                      </p>
                    </div>
                  </div>

                  <div className="md:flex-1 space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-1">Vertical Integration</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        We own the full stack—from the sensor in the wall to the AI model in the cloud.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* The Long-Term Vision */}
              <section className="space-y-4">
                <div className="flex items-center gap-5">
                  <h2 className="text-4xl font-bold text-foreground">The Long-Term Vision</h2>
                  <SectionPlayButton
                    title="The Long-Term Vision"
                    audioSrc="/audio/Long%20Term%20Vision.mp3"
                    transcript={TRANSCRIPT_DATA}
                    chapters={CHAPTERS_DATA}
                  />
                </div>
                <p className="font-semibold text-foreground">
                  SuperIntelligence Requires SuperAwareness.
                </p>
                <p>
                  The global technology industry is currently racing toward <strong className="text-foreground">SuperIntelligence</strong>: massive raw compute and logic. However, a "brain in a jar" with high IQ but zero context is fundamentally limited and potentially dangerous.
                </p>
                <p>
                  For SuperIntelligence to be truly effective, aligned, and safe, it requires <strong className="text-foreground">SuperAwareness</strong>.
                </p>
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 rounded-lg border border-border bg-muted/10 p-10 md:-mx-[25%] items-start">
                  <div className="md:flex-1 space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-1">The Missing Link</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Intelligence is the ability to process information; Awareness is the ability to perceive the reality from which that information comes. You cannot solve human problems if you cannot perceive the human condition.
                      </p>
                    </div>
                  </div>

                  <div className="md:flex-1 space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-1">The Source Role</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Source creates the sensory organs for the global AI brain. By capturing the "True Record of Reality," we provide the necessary context, the <strong className="text-foreground">SuperAwareness</strong>, that allows SuperIntelligence to function not just as a calculator, but as a benevolent, fully aligned agent of civilization.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="italic border-l-4 border-foreground/30 pl-4 text-foreground font-semibold">
                  Source: We guide AI, and AI guides us.
                </p>
              </section>

              {/* The Deal */}
              <section className="space-y-4 rounded-lg border border-border bg-muted/10 p-6">
                <div className="flex items-center gap-5">
                  <h2 className="text-4xl font-bold text-foreground">The Deal</h2>
                  <SectionPlayButton
                    title="The Deal"
                    audioSrc="/audio/The%20Deal.mp3"
                    transcript={TRANSCRIPT_DATA}
                    chapters={CHAPTERS_DATA}
                  />
                </div>
                <p>
                  <strong className="text-foreground">We are raising $10M Seed</strong> to execute Phase 1 and the Phase 2 Beta.
                </p>
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 rounded-lg items-start">
                  <div className="md:flex-1 space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-1">Use of Funds</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Land acquisition (Location TBD), Construction of HQ/Lab, Hardware BOM for School + 100 Homes, and 18 months of runway for 36 FTEs.
                      </p>
                    </div>
                  </div>

                  <div className="md:flex-1 space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-1">Why Now</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        The AI hardware race is heating up, but everyone is focused on chips. The winner will be the company that owns the <em>environment</em> and the <em>behavioral data</em>.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer CTA */}
            <section className="mt-12 space-y-6 border-t border-border pt-8">
              <p className="text-lg font-semibold text-foreground">
                Ready to invest in the future of AI and human civilization?
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:contact@source.living"
                  className="inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                >
                  Get in touch
                </a>
                <a
                  href="/software"
                  className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Explore the platform
                </a>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
              <p>© 2025 Source. Building the future of human-AI interaction.</p>
              <p className="mt-2 text-[10px] opacity-50">v2.0.1</p>
            </footer>
          </article >
        </main >

        {/* Global Player Footer */}
        <GlobalPlayer />
      </div >
    </GlobalAudioProvider>
  );
}
