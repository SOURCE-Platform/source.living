import { SvgCircle } from "@/components/svg-circle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col gap-40 px-6 py-24 sm:px-12 lg:px-20 xl:px-32 2xl:px-48">
      <section
        id="hero"
        className="flex min-h-[80vh] flex-col items-center justify-center gap-12 text-center"
      >
        <SvgCircle />
        <div className="max-w-3xl space-y-4">
          <h1 className="text-5xl font-semibold sm:text-6xl">SOURCE</h1>
          <p className="mx-auto w-full text-lg leading-relaxed text-muted-foreground sm:max-w-[80%] lg:max-w-[60%]">
            A holistic companion platform delivering context-aware assistance, privacy-first data
            stewardship, and intuitive ambient computing.
          </p>
        </div>
      </section>

      <section className="space-y-8" id="problem-set">
        <div className="mx-auto w-full space-y-2 sm:max-w-[85%] lg:max-w-[75%]">
          <SvgCircle className="mb-6 h-24 w-24 text-white" />
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Problem Set
          </h1>
        </div>
        <div className="mx-auto w-full sm:max-w-[85%] lg:max-w-[75%]">
          <div className="video-frame"></div>
        </div>
        <div className="grid gap-12 pt-8 sm:grid-cols-2 sm:gap-16 lg:gap-20 lg:pt-12">
          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">Mental &amp; Emotional</h2>
            <ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
              <li>Loneliness and social isolation</li>
              <li>Persistent depression and mood disorders</li>
              <li>Neurodivergent learning pathways</li>
              <li>Rigid &ldquo;one size fits all&rdquo; education</li>
            </ul>
          </article>
          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">Social</h2>
            <ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
              <li>Fragmented relationships and conflicts</li>
              <li>Degradation of meaningful social bonds</li>
              <li>Bullying, crime, and covert emotional abuse</li>
            </ul>
          </article>
          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">Physical</h2>
            <ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
              <li>Poor, reactive health management</li>
              <li>Late-stage diagnosis of disease</li>
              <li>Lack of accident detection and prevention</li>
            </ul>
          </article>
          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">Computing UX</h2>
            <ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
              <li>GUI friction and digital overwhelm</li>
              <li>Fragmented ecosystems of OSs, apps, and data</li>
              <li>Identity and access management pain points</li>
            </ul>
          </article>
          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">AI Slop &amp; Bots</h2>
            <ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
              <li>Near-future impossible to distinguish from reality video and audio content</li>
              <li>Enshitification of Internet content</li>
              <li>Humans unable to discern real from fake</li>
              <li>Loss of meaning. Nothing is true.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="space-y-12" id="solutions">
        <div className="space-y-2">
          <SvgCircle className="mb-6 h-24 w-24 text-white" />
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Solutions
          </h1>
        </div>
        <div className="space-y-16">
          <div className="grid items-start gap-8 lg:grid-cols-[0.75fr_1fr]">
            <div className="video-frame solution-video"></div>
            <section className="space-y-6" id="video-audio-metadata">
              <h2 className="text-3xl font-semibold">Video &amp; Audio Metadata</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                SUR interprets multi-modal data to understand family routines, respond to stimuli,
                and identify physical or emotional needs early.
              </p>
              <ul className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                <li>Daily habits and scheduling</li>
                <li>Emotional reaction mapping</li>
                <li>Health indicator detection</li>
                <li>Relationship context awareness</li>
              </ul>
            </section>
          </div>
          <div className="grid items-start gap-8 lg:grid-cols-[0.75fr_1fr]">
            <div className="video-frame solution-video"></div>
            <section className="space-y-6" id="data-privacy">
              <h2 className="text-3xl font-semibold">Data Privacy &amp; Ownership</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                A secure enclave architecture ensures every resident owns their data,
                controls sharing, and benefits from privacy-first processing.
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
                    Capture
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Video, audio, and LiDAR inputs are distilled into actionable metadata.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
                    Secure Enclave
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Two-stage verification with hashing, tokenization, and privacy filtering.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
                    Ownership
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Individuals choose what to share and with whom, retaining full control.
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className="grid items-start gap-8 lg:grid-cols-[0.75fr_1fr]">
            <div className="video-frame solution-video"></div>
            <section className="space-y-6" id="source-id">
              <h2 className="text-3xl font-semibold">Source ID</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                A multi-modal identity platform providing frictionless IAM that understands
                people through rich context and sensor fusion.
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-primary">Biometrics</h3>
                  <p className="text-xs text-muted-foreground">
                    Face, iris, retina, voice, and gait captured with adaptive trust scoring.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-primary">Behavior</h3>
                  <p className="text-xs text-muted-foreground">
                    Device usage, gestures, and routines keep authentication invisible.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-primary">Hardware</h3>
                  <p className="text-xs text-muted-foreground">
                    Secure agents across home devices provide zero-friction access.
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className="grid items-start gap-8 lg:grid-cols-[0.75fr_1fr]">
            <div className="video-frame solution-video"></div>
            <section className="space-y-6" id="cast">
              <h2 className="text-3xl font-semibold">CAST</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Social network and communication platform powered by SOURCE ID.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li>Live Audio &amp; Video Chat</li>
                <li>Email Replacement</li>
                <li>User Controlled Algo</li>
              </ul>
            </section>
          </div>
        </div>
      </section>

      <section className="space-y-12" id="use-cases">
        <div className="space-y-2">
          <SvgCircle className="mb-6 h-24 w-24 text-white" />
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Use Cases
          </h1>
          <p className="text-base text-muted-foreground">
            Specific examples and UX narratives demonstrating SUR&apos;s real-world impact.
          </p>
        </div>
        <div className="grid gap-12 lg:grid-cols-2">
          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">Francis</h2>
            <p className="mx-auto w-full text-sm leading-relaxed text-muted-foreground sm:max-w-[85%] lg:max-w-[75%]">
              Francis, an elderly lady, falls down and can&apos;t get up. SUR alerts emergency services immediately,
              allowing her to stay in her home longer and postpone assisted care facilities indefinitely.
            </p>
          </article>
          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">Jane</h2>
            <p className="mx-auto w-full text-sm leading-relaxed text-muted-foreground sm:max-w-[85%] lg:max-w-[75%]">
              Jane can&apos;t afford a human therapist and desperately needs to see one. With SUR continuously collecting
              real-world and digital user data, it builds a holistic understanding of her behavior and supports
              recovery via its AI therapist.
            </p>
          </article>
          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">Fred</h2>
            <p className="mx-auto w-full text-sm leading-relaxed text-muted-foreground sm:max-w-[85%] lg:max-w-[75%]">
              Fred is very lonely and turns to his companion Sen to share feelings without worry, confident that his
              data remains fully private and user-owned.
            </p>
          </article>
          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">Sam</h2>
            <p className="mx-auto w-full text-sm leading-relaxed text-muted-foreground sm:max-w-[85%] lg:max-w-[75%]">
              Sam wants to decrease screen time yet stay productive. She walks around her home doing chores while SUR&apos;s
              assistant recites messages from email, social feeds, and messenger apps hands-free.
            </p>
          </article>
          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">Sara</h2>
            <p className="mx-auto w-full text-sm leading-relaxed text-muted-foreground sm:max-w-[85%] lg:max-w-[75%]">
              Sara is on a calorie-restricted diet. SUR tracks her daily intake, monitors pantry levels, and coaches her
              toward healthier habits without micromanaging.
            </p>
          </article>
          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">Jack</h2>
            <p className="mx-auto w-full text-sm leading-relaxed text-muted-foreground sm:max-w-[85%] lg:max-w-[75%]">
              Jack misplaces his keys while rushing out. SUR notices and intervenes, alerting him that the keys are
              behind last night&apos;s couch cushions, saving him precious time.
            </p>
          </article>
          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">Tabitha</h2>
            <p className="mx-auto w-full text-sm leading-relaxed text-muted-foreground sm:max-w-[85%] lg:max-w-[75%]">
              Tabitha jumps between devices all day while working from home. SUR keeps her logged in automatically as
              she approaches any device, blending presence detection with Source ID.
            </p>
          </article>
        </div>
      </section>

      <section className="space-y-12" id="architecture">
        <div className="space-y-2">
          <SvgCircle className="mb-6 h-24 w-24 text-white" />
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Architecture
          </h1>
        </div>
        <div className="grid gap-12 sm:gap-16 lg:grid-cols-2 lg:gap-20">
          <article className="space-y-6" id="hardware">
            <h2 className="text-3xl font-semibold">Hardware</h2>
            <div className="video-frame" />
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Ambient sensors, wearable integrations, and adaptive edge devices form a resilient perimeter.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>Context-aware hubs with failover connectivity</li>
              <li>Secure enclave modules with TPM isolation</li>
              <li>Energy-efficient sensing for continuous coverage</li>
            </ul>
          </article>
          <article className="space-y-6" id="software">
            <h2 className="text-3xl font-semibold">Software</h2>
            <div className="video-frame" />
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A modular platform orchestrating AI services, privacy-preserving analytics, and identity management.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>Multi-tenant data plane with consent layers</li>
              <li>Orchestrated AI agents for personalized coaching</li>
              <li>Federated learning loops across secure nodes</li>
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}
