'use client';

import Link from "next/link";
import { SourceLogo } from "@/components/atoms/icons/source-logo";

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
          <div className="flex flex-col gap-12">
            {/* Executive Summary */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Executive Summary</h2>
              <p>
                <strong className="text-foreground">SOURCE</strong> is building the hardware and software infrastructure to capture what current AI fundamentally lacks: <strong className="text-foreground">High-Resolution Human Behavioral Data.</strong>
              </p>
              <p>
                Without this data, AI is limited. It can handle digital knowledge work, but only to a point. And it cannot even begin to address the vast array of problems that exist in the physical world:
              </p>
              <ul className="grid grid-cols-1 gap-x-4 gap-y-2 pl-6 list-disc sm:grid-cols-2">
                <li>Physical health</li>
                <li>Mental health</li>
                <li>Social dynamics</li>
                <li>Relationships</li>
                <li>Physical safety</li>
                <li>Zero-friction computing UX</li>
                <li>Transparent government</li>
                <li>Trustless voting</li>
              </ul>
              <p>
                Current AI models are trained on the "internet", a performative, curated, text-based dataset that captures none of the rich and authentic context of human life.
              </p>
              <p>
                SOURCE solves this by installing a decentralized, privacy-first, highly-secure sensor grid into physical living spaces, creating a "True Record of Reality." This enables AI that truly understands human context, behavior, and physical interactions, making it both more effective at digital problems and capable of solving real-world challenges that today's AI cannot touch.
              </p>
            </section>

            {/* The Core Problem */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">The Core Problem: The Data Wall</h2>
              <p>
                We have thrown the entire internet at Transformers. While effective, this approach has reached a fundamental limit.
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li><strong className="text-foreground">The Data is Flawed:</strong> LLMs are trained on the <em>internet</em>, which is performative, artificial, and highly edited. It is "sculpted" artifice, devoid of the authentic, natural human behavior that defines actual experience.</li>
                <li><strong className="text-foreground">The Context Gap:</strong> Current AI has zero insight into the physical world, digital user flows, or the 99% of human experience that happens beyond static text. It cannot predict a human user's needs or see their problems.</li>
              </ul>

              <div className="rounded-lg border border-border bg-muted/10 p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg text-foreground">The Convergence of Problems</h3>
                  <p className="text-sm">
                    The "Data Wall" is just one component of a much larger, interconnected crisis. We are facing a simultaneous convergence of political, economic, social, and technological failures that are reshaping human civilization.
                  </p>
                </div>

                <Link
                  href="/convergence"
                  className="inline-flex items-center text-sm font-bold text-foreground hover:opacity-80 transition-opacity"
                >
                  See the full Systemic Convergence Report <span aria-hidden="true" className="ml-1">→</span>
                </Link>
              </div>

              <p className="italic text-muted-foreground">
                <strong className="text-foreground">The Opportunity:</strong> The next breakthrough in AI won't come from more GPUs; it will come from a new <em>class</em> of data: continuous, multimodal, real-world behavioral data.
              </p>
            </section>

            {/* The Solution */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">The Solution: The Source Platform</h2>
              <p>
                SOURCE is an "Ambient Computing" platform consisting of three layers:
              </p>

              <div className="space-y-4 rounded-lg border border-border bg-muted/10 p-6">
                <div>
                  <h3 className="font-bold text-foreground">I. The Hardware (The Eyes & Ears)</h3>
                  <p className="text-sm text-muted-foreground">
                    A decentralized infrastructure installed directly into the built environment.
                  </p>
                  <ul className="list-disc space-y-1 pl-6 text-sm">
                    <li><strong className="text-foreground">Multi-Sensor Units (MSUs):</strong> We have engineered a proprietary "all-in-one" hardware unit that combines <strong>Lidar, Video, Microphones, and Speakers</strong>.</li>
                    <li><strong className="text-foreground">Installation:</strong> These MSUs are embedded directly into the walls of every room, creating a seamless, invisible grid.</li>
                    <li><strong className="text-foreground">Compute:</strong> A dedicated, AI-first server (2+ GPUs) installed locally (closet/wall mount) to process the raw feed from the MSUs.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-foreground">II. The Software (The Brain)</h3>
                  <p className="text-sm text-muted-foreground">
                  </p>
                  <ul className="list-disc space-y-1 pl-6 text-sm">
                    <li><strong className="text-foreground">Source ID:</strong> This is the core operating layer of the stack. It eliminates passwords and keys. By analyzing gait, voice, biometrics, and behavior, the system validates identity simply by the user's presence.</li>
                    <li><strong className="text-foreground">Personal AI:</strong> A continuous-learning model that observes the user to automate tasks, detect health issues, and provide "Total Context Awareness."</li>
                    <li><strong className="text-foreground">Blockchain Verification:</strong> Every frame of video is tokenized. This creates an immutable <strong>"True Record of Reality,"</strong> verifying human authenticity in an era of deepfakes.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-foreground">III. The Social Layer (CAST)</h3>
                  <p className="text-sm text-muted-foreground">
                    A rigorous "Context Economy" network. Unlike scrolling feeds, CAST uses Source data to generate automated summaries of the user's life and curate the internet based on the user's specific real-world context.
                  </p>
                </div>

              </div>

              <div className="rounded-lg border border-border bg-muted/10 p-6 space-y-4">
                <h3 className="font-bold text-lg text-foreground">Data Ownership (Redefining Surveillance)</h3>
                <p className="text-sm text-foreground">
                  Source is obviously a surveillance platform, but the question is: <em>who controls the surveillance?</em>
                </p>
                <ul className="list-disc space-y-2 pl-6 text-sm">
                  <li><strong className="text-foreground">Traditional Surveillance:</strong> States and corporations observe you. They own the data, they benefit from it, and you have no control or transparency.</li>
                  <li><strong className="text-foreground">Source's Model:</strong> You own the observational data of your life, whether in your home, workplace, or public spaces you inhabit. All data is processed locally, cryptographically secured, and you control what gets shared.</li>
                  <li><strong className="text-foreground">The Flip:</strong> In a world where observation is inevitable (cameras are already everywhere), we're not eliminating surveillance, we're <strong>democratizing who controls it.</strong> The data serves you: health insights, safety, AI that understands your context. Not corporations. Not governments. You.</li>
                </ul>
              </div>

              <div className="rounded-lg border border-border bg-muted/10 p-4 space-y-3">
                <h3 className="font-bold text-base text-foreground">Mapping the Solution</h3>
                <p className="text-sm">
                  How Source specifically targets and neutralizes the systemic threats outlined in the Convergence Report.
                </p>
                <Link
                  href="/solutions"
                  className="inline-flex items-center text-sm font-bold text-foreground hover:opacity-80 transition-opacity"
                >
                  View the Source Solution Map <span aria-hidden="true" className="ml-1">→</span>
                </Link>
              </div>
            </section>

            {/* Go-to-Market Strategy */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Go-to-Market Strategy</h2>
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
                  <strong className="text-foreground">Influencers & Streamers (Marketing Engine):</strong> We provide free/subsidized installations to top creators. In exchange, they showcase the <strong>4D Gaussian Splatting</strong> capabilities (holographic video) to their millions of followers, driving the cultural hype cycle.
                </li>
              </ol>
            </section>

            {/* The Master Plan */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">The Master Plan (Roadmap)</h2>

              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-muted/10 p-4">
                  <h3 className="font-bold text-foreground">PHASE 1: The "Source School" & HQ (18 Months)</h3>
                  <ul className="list-disc space-y-1 pl-6 text-sm">
                    <li><strong className="text-foreground">Objective:</strong> Build the first <strong>Human Behavioral Model</strong>.</li>
                    <li><strong className="text-foreground">Strategy:</strong> Construct a mixed-use R&D campus (School + HQ).</li>
                    <li><strong className="text-foreground">Execution:</strong> We will monitor a controlled environment (a school) to train the Video Language Model (VLM) on complex human interactions, conflict resolution, and childhood development.</li>
                    <li><strong className="text-foreground">Operations:</strong> By locating in a cost-efficient region (TBD), we can deploy a team of <strong>36 FTEs</strong> (Eng, Ops, AI) for a fraction of Silicon Valley costs.</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-border bg-muted/10 p-4">
                  <h3 className="font-bold text-foreground">PHASE 2: Residential Beta (Concurrent with Phase 1)</h3>
                  <ul className="list-disc space-y-1 pl-6 text-sm">
                    <li><strong className="text-foreground">Objective:</strong> Commercial validation and dataset expansion.</li>
                    <li><strong className="text-foreground">Execution:</strong> While the School builds the "Baseline Model," we will simultaneously deploy Source into ~100 residential units.</li>
                    <li><strong className="text-foreground">The Mix:</strong> Paid installations for the Elderly/Tech demographics, and marketing installations for Influencers.</li>
                    <li><strong className="text-foreground">Outcome:</strong> A diverse, proprietary dataset of private human behavior across different demographics.</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-border bg-muted/10 p-4">
                  <h3 className="font-bold text-foreground">PHASE 3: Civilizational Scale</h3>
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
              <h2 className="text-2xl font-bold text-foreground">Competitive Advantage</h2>
              <ul className="list-disc space-y-2 pl-6">
                <li><strong className="text-foreground">The Data Moat:</strong> OpenAI and Google have the internet. We have the <em>living room</em>. This high-resolution behavioral dataset does not currently exist anywhere else.</li>
                <li><strong className="text-foreground">Privacy Architecture:</strong> By processing locally and tokenizing via blockchain, we solve the "Big Brother" fear. Users own their data; we just provide the architecture.</li>
                <li><strong className="text-foreground">Vertical Integration:</strong> We own the full stack—from the sensor in the wall to the AI model in the cloud.</li>
              </ul>
            </section>

            {/* The Long-Term Vision */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">The Long-Term Vision</h2>
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
              <h2 className="text-2xl font-bold text-foreground">The Deal</h2>
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
          </footer>
        </article >
      </main >
    </div >
  );
}
