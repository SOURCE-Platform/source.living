'use client';

import Link from "next/link";
import { SourceLogo } from "@/components/atoms/icons/source-logo";
import { CustomAudioPlayer } from "@/components/custom-audio-player";
import { AudioExperienceProvider } from "@/components/audio-player";
import type { TranscriptData, ChapterSummary } from "@/components/audio-player/context/types";


const TRANSCRIPT_DATA: TranscriptData = {
  utterances: []
};

const CHAPTERS_DATA: ChapterSummary[] = [];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
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
              <h2 className="text-4xl font-bold text-foreground">Vision</h2>
              <p>
                <strong className="text-foreground">SOURCE</strong> will be an open-source decentralized AI platform designed to achieve <strong className="text-foreground">Super Awareness</strong>, the prerequisite for <strong className="text-foreground">Super Intelligence</strong>.
              </p>
              <p>
                By deploying smart sensors and heavy local compute in both public and private spaces, we are building <strong className="text-foreground">the new holistic computing paradigm for civilization</strong> that functions as a proactive problem detector and solver.
              </p>
              <p>
                This infrastructure will capture what current AI fundamentally lacks: <strong className="text-foreground">Human Behavioral and Environmental Data</strong> of such high quality and near-infinite quantity that it will enable the creation of the <strong className="text-foreground">Most Accurate Global World Model</strong> ever built.
              </p>

              <div className="mt-8 rounded-xl border border-border bg-muted/10 p-4">
                <AudioExperienceProvider
                  audioSrc="/audio/SOURCE%20Setting%20the%20Stage.mp3"
                  transcript={TRANSCRIPT_DATA}
                  chapters={CHAPTERS_DATA}
                  config={{ autoPlay: false }}
                >
                  <CustomAudioPlayer title="Setting the Stage" />
                </AudioExperienceProvider>
              </div>
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
                <h3 className="text-3xl font-bold text-foreground">1. The Data Wall</h3>
                <p>
                  We have thrown the entire internet at Transformers. While effective, this approach is constrained by the <strong className="text-foreground">qualitative</strong> and <strong className="text-foreground">quantitative</strong> limitations of the data source itself.
                </p>
                <div className="space-y-6 py-6 px-10">
                  <div>
                    <div className="mb-2 w-fit rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-semibold text-foreground uppercase tracking-wider">Qualitative</div>
                    <h4 className="text-xl font-bold text-foreground mb-2">The Data is Limited</h4>
                    <p className="text-muted-foreground">
                      LLMs are trained on the <em>internet</em>, which is performative, artificial, and highly edited. It lacks the authentic, natural behavior that defines actual human experience.
                    </p>
                  </div>
                  <div>
                    <div className="mb-2 w-fit rounded-md bg-muted px-2 pt-1 pb-0.5 text-xs font-semibold text-foreground uppercase tracking-wider">Quantitative</div>
                    <h4 className="text-xl font-bold text-foreground mb-2">The Context Gap</h4>
                    <p className="text-muted-foreground">
                      Current AI misses 99.99% of human experience—the physical world and the real-time living that happens beyond static text and curated uploads. After all, we humans are constantly producing data that's getting lost to the void.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. The Expanded Problem Set */}
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-foreground">2. The Convergence of Crises</h3>
                <p>
                  Beyond the AI data bottleneck, critical failures are cascading across every domain of life.
                </p>

                <div className="flex flex-col rounded-lg border border-border bg-muted/10 mt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                    <div className="p-5 space-y-6">
                      <h4 className="text-xl font-bold text-foreground">Macro-Systemic Failures</h4>
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
                          <strong className="text-foreground block mb-1">Social</strong>
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
                      <h4 className="text-xl font-bold text-foreground">Human Experience Failures</h4>
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
                    className="flex w-[calc(100%+32px)] -mx-4 -mb-6 items-center rounded-xl border border-border bg-white dark:bg-[#171720] px-8 py-4 text-sm font-bold text-foreground shadow-2xl transition-all hover:bg-[#f2f3fa] dark:hover:bg-[#1c1c27] hover:border-blue-500/50 hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.4)] hover:scale-[1.01] active:scale-[0.99] -mt-px group relative z-10"
                  >
                    <span className="flex-1 text-center font-bold">View the full Systemic Convergence Analysis</span>
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
              <h2 className="text-4xl font-bold text-foreground">The Solution: The Source Platform</h2>
              <p>
                SOURCE is an "Ambient Computing" platform consisting of three layers:
              </p>

              <div className="flex flex-col md:flex-row gap-4 md:gap-6 rounded-lg border border-border bg-muted/10 p-6 md:-mx-[25%]">
                <div className="md:flex-1">
                  <h3 className="text-3xl font-bold text-foreground">The Hardware</h3>
                  <p className="text-sm text-muted-foreground">
                    A decentralized infrastructure installed directly into the built environment.
                  </p>
                  <ul className="list-disc space-y-1 pl-6 text-sm">
                    <li><strong className="text-foreground">Multi-Sensor Units (MSUs):</strong> We have engineered a proprietary "all-in-one" hardware unit that combines <strong>Lidar, Video, Microphones, and Speakers</strong>.</li>
                    <li><strong className="text-foreground">Installation:</strong> These MSUs are embedded directly into the walls of every room, creating a seamless, invisible grid.</li>
                    <li><strong className="text-foreground">Compute:</strong> A dedicated, AI-first server (2+ GPUs) installed locally (closet/wall mount) to process the raw feed from the MSUs.</li>
                  </ul>
                </div>

                <div className="md:flex-1">
                  <h3 className="text-3xl font-bold text-foreground">The Software</h3>
                  <p className="text-sm text-muted-foreground">
                  </p>
                  <ul className="list-disc space-y-1 pl-6 text-sm">
                    <li><strong className="text-foreground">Source ID:</strong> This is the core operating layer of the stack. It eliminates passwords and keys. By analyzing gait, voice, biometrics, and behavior, the system validates identity simply by the user's presence.</li>
                    <li><strong className="text-foreground">Personal AI:</strong> A continuous-learning model that observes the user to automate tasks, detect health issues, and provide "Total Context Awareness."</li>
                    <li><strong className="text-foreground">Blockchain Verification:</strong> Every frame of video is tokenized. This creates an immutable <strong>"True Record of Reality,"</strong> verifying human authenticity in an era of deepfakes.</li>
                  </ul>
                </div>

                <div className="md:flex-1">
                  <h3 className="text-3xl font-bold text-foreground">The Social Layer</h3>
                  <p className="text-sm text-muted-foreground">
                    A rigorous "Context Economy" network. Unlike scrolling feeds, CAST uses Source data to generate automated summaries of the user's life and curate the internet based on the user's specific real-world context.
                  </p>
                </div>

              </div>

              <div className="rounded-lg border border-border bg-muted/10 p-6 space-y-4">
                <h3 className="text-3xl font-bold text-foreground">Data Ownership</h3>
                <p className="text-sm text-foreground">
                  Source is obviously a surveillance platform, but the question is: <em>who controls the surveillance?</em>
                </p>
                <ul className="list-disc space-y-2 pl-6 text-sm">
                  <li><strong className="text-foreground">Traditional Surveillance:</strong> States and corporations observe you. They own the data, they benefit from it, and you have no control or transparency.</li>
                  <li><strong className="text-foreground">Source's Model:</strong> You own the observational data of your life, whether in your home, workplace, or public spaces you inhabit. All data is processed locally, cryptographically secured, and you control what gets shared.</li>
                  <li><strong className="text-foreground">The Flip:</strong> In a world where observation is inevitable (cameras are already everywhere), we're not eliminating surveillance, we're <strong>democratizing who controls it.</strong> The data serves you: health insights, safety, AI that understands your context. Not corporations. Not governments. You.</li>
                </ul>
              </div>

              <div className="flex flex-col rounded-lg border border-border bg-muted/10 overflow-hidden">
                <div className="p-5 space-y-3">
                  <h3 className="text-3xl font-bold text-foreground">Mapping the Solution</h3>
                  <p className="text-sm">
                    How Source specifically targets and neutralizes the systemic threats outlined in the Convergence Report.
                  </p>
                </div>
                <Link
                  href="/solutions"
                  className="flex w-full items-center border-t border-border bg-background/50 px-5 py-4 text-sm font-bold text-foreground transition-colors hover:bg-muted/20"
                >
                  View the Source Solution Map <span aria-hidden="true" className="ml-1">→</span>
                </Link>
              </div>
            </section>

            {/* Go-to-Market Strategy */}
            <section className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground">GTM</h2>
              <p>
                We are deploying a strategy that targets high-utility niche markets to fund mass adoption.
              </p>
              <ol className="list-decimal space-y-3 pl-6">
                <li>
                  <strong className="text-foreground">Elderly Care (Revenue Driver):</strong> A passive safety layer that tracks cognitive decline, memory, and physical safety without wearable devices. Families pay for peace of mind.
                </li>
                <li>
                  <strong className="text-foreground">Early Adopters & Tech (Revenue Driver):</strong> Selling the "Smart Home 2.0" experience to the tech-forward demographic who want total home automation and "Jarvis-like" AI.
                </li>
                <li>
                  <strong className="text-foreground">Influencers & Streamers (Marketing Engine):</strong> We provide free/subsidized installations to top creators. They use Source as a full in-house studio system—no longer tied to their computers—while showcasing the <strong>4D Gaussian Splatting</strong> capabilities (holographic video) to their millions of followers, driving the cultural hype cycle.
                </li>
              </ol>
            </section>

            {/* The Master Plan */}
            <section className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground">Roadmap</h2>

              <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:-mx-[25%]">
                <div className="md:flex-1 rounded-lg border border-border bg-muted/10 p-4">
                  <h3 className="text-lg font-bold text-foreground">PHASE 1: The "Source School" & HQ (18 Months)</h3>
                  <ul className="list-disc space-y-1 pl-6 text-sm">
                    <li><strong className="text-foreground">Objective:</strong> Build the first <strong>Human Behavioral Model</strong>.</li>
                    <li><strong className="text-foreground">Strategy:</strong> Construct a mixed-use R&D campus (School + HQ).</li>
                    <li><strong className="text-foreground">Execution:</strong> We will monitor a controlled environment (a school) to train the Video Language Model (VLM) on complex human interactions, conflict resolution, and childhood development.</li>
                    <li><strong className="text-foreground">Operations:</strong> By locating in a cost-efficient region (TBD), we can deploy a team of <strong>36 FTEs</strong> (Eng, Ops, AI) for a fraction of Silicon Valley costs.</li>
                  </ul>
                </div>

                <div className="md:flex-1 rounded-lg border border-border bg-muted/10 p-4">
                  <h3 className="text-lg font-bold text-foreground">PHASE 2: Residential Beta (Concurrent with Phase 1)</h3>
                  <ul className="list-disc space-y-1 pl-6 text-sm">
                    <li><strong className="text-foreground">Objective:</strong> Commercial validation and dataset expansion.</li>
                    <li><strong className="text-foreground">Execution:</strong> While the School builds the "Baseline Model," we will simultaneously deploy Source into ~100 residential units.</li>
                    <li><strong className="text-foreground">The Mix:</strong> Paid installations for the Elderly/Tech demographics, and marketing installations for Influencers.</li>
                    <li><strong className="text-foreground">Outcome:</strong> A diverse, proprietary dataset of private human behavior across different demographics.</li>
                  </ul>
                </div>

                <div className="md:flex-1 rounded-lg border border-border bg-muted/10 p-4">
                  <h3 className="text-lg font-bold text-foreground">PHASE 3: Civilizational Scale</h3>
                  <ul className="list-disc space-y-1 pl-6 text-sm">
                    <li><strong className="text-foreground">Objective:</strong> Expansion into the Public Domain.</li>
                    <li><strong className="text-foreground">Smart Cities & Government:</strong> Partnering with municipalities to install Source in public squares and neighborhoods.</li>
                    <li><strong className="text-foreground">The Incentive:</strong> Offering "Crime Prevention by Design." The system provides total awareness of public spaces, deterring crime and providing immutable evidence for disputes.</li>
                    <li><strong className="text-foreground">Commercial:</strong> Expansion into retail and institutions for automated logistics and security.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Competitive Advantage */}
            <section className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground">Competitive Advantage</h2>
              <ul className="list-disc space-y-2 pl-6">
                <li><strong className="text-foreground">The Data Moat:</strong> OpenAI and Google have the internet. We have the <em>living room</em>. This high-resolution behavioral dataset does not currently exist anywhere else.</li>
                <li><strong className="text-foreground">Privacy Architecture:</strong> By processing locally and tokenizing via blockchain, we solve the "Big Brother" fear. Users own their data; we just provide the architecture.</li>
                <li><strong className="text-foreground">Vertical Integration:</strong> We own the full stack—from the sensor in the wall to the AI model in the cloud.</li>
              </ul>
            </section>

            {/* The Long-Term Vision */}
            <section className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground">The Long-Term Vision</h2>
              <p className="font-semibold text-foreground">
                SuperIntelligence Requires SuperAwareness.
              </p>
              <p>
                The global technology industry is currently racing toward <strong className="text-foreground">SuperIntelligence</strong>: massive raw compute and logic. However, a "brain in a jar" with high IQ but zero context is fundamentally limited and potentially dangerous.
              </p>
              <p>
                For SuperIntelligence to be truly effective, aligned, and safe, it requires <strong className="text-foreground">SuperAwareness</strong>.
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li><strong className="text-foreground">The Missing Link:</strong> Intelligence is the ability to process information; Awareness is the ability to perceive the reality from which that information comes. You cannot solve human problems if you cannot perceive the human condition.</li>
                <li><strong className="text-foreground">The Source Role:</strong> Source creates the sensory organs for the global AI brain. By capturing the "True Record of Reality," we provide the necessary context, the <strong className="text-foreground">SuperAwareness</strong>, that allows SuperIntelligence to function not just as a calculator, but as a benevolent, fully aligned agent of civilization.</li>
              </ul>
              <p className="italic border-l-4 border-foreground/30 pl-4 text-foreground font-semibold">
                Source: We guide AI, and AI guides us.
              </p>
            </section>

            {/* The Deal */}
            <section className="space-y-4 rounded-lg border border-border bg-muted/10 p-6">
              <h2 className="text-4xl font-bold text-foreground">The Deal</h2>
              <p>
                <strong className="text-foreground">We are raising $10M Seed</strong> to execute Phase 1 and the Phase 2 Beta.
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li><strong className="text-foreground">Use of Funds:</strong> Land acquisition (Location TBD), Construction of HQ/Lab, Hardware BOM for School + 100 Homes, and 18 months of runway for 36 FTEs.</li>
                <li><strong className="text-foreground">Why Now:</strong> The AI hardware race is heating up, but everyone is focused on chips. The winner will be the company that owns the <em>environment</em> and the <em>behavioral data</em>.</li>
              </ul>
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
    </div >
  );
}
