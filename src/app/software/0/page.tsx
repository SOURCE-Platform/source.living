import Link from "next/link";

export default function ZeroPage() {
  return (
    <div className="mx-auto flex w-full flex-col gap-16 px-6 py-16 sm:px-10 lg:px-16">
      <header className="mx-auto w-[90vw] max-w-6xl space-y-10">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full flex-col gap-6 lg:w-[65%]">
            <nav>
              <Link
                href="/software"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <span aria-hidden="true">←</span>
                Back to Software
              </Link>
            </nav>
            <div className="video-frame aspect-video w-full" aria-hidden="true">
              <span className="video-play-icon" />
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-6 lg:w-[30%] lg:items-center">
            <div className="flex items-center justify-center">
              <svg className="h-[150px] w-[150px] text-foreground" viewBox="0 0 200 200" role="img" aria-hidden="true">
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="6 18"
                />
              </svg>
            </div>
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">0</h1>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                SOURCE&apos;s <strong>0</strong> client observes every pixel and micro-interaction, turning behavior and mood into
                actionable insight while keeping ownership in your hands.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-20 text-muted-foreground">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 lg:flex-row lg:items-center">
          <div className="space-y-5 text-base leading-relaxed sm:text-lg lg:w-[60%]">
            <p>
              <strong>0</strong> is SOURCE&apos;s on-device observability layer. Installed on desktop or mobile environments, it
              watches the screen surface and listens to your inputs in real time—mouse paths, keyboard cadence, navigation
              habits—and pairs them with webcam insights to model your emotional state.
            </p>
            <p>
              By tracking micro-expressions and posture shifts as you work, <strong>0</strong> highlights friction points before you
              even submit feedback. The result is an evolving behavioral blueprint that directs product design and the agents you
              rely on.
            </p>
          </div>
          <div className="video-frame h-64 flex-1 lg:h-72" aria-hidden="true">
            <span className="video-play-icon" />
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-3xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="video-frame h-60 w-full lg:h-64 lg:w-[45%]" aria-hidden="true">
            <span className="video-play-icon" />
          </div>
          <div className="space-y-4 text-sm leading-relaxed sm:text-base lg:w-[55%]">
            <h2 className="text-2xl font-semibold text-foreground">Granular privacy controls</h2>
            <p>
              <strong>0</strong> captures only what you allow. Choose specific applications, domains, or time windows to include;
              everything else is permanently masked. All recordings and derived embeddings are stored locally by default and
              encrypted end to end.
            </p>
            <p>
              You decide when data syncs to decentralized storage or when to share a redacted slice via zero-knowledge proofs.
              Auditors can trace every subsystem thanks to the open Rust, TAURI, React, and Tailwind codebase.
            </p>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-6xl flex-col gap-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">Technology stack</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                Each layer is tuned for multi-platform performance today and open hardware deployments tomorrow.
              </p>
            </div>
            <div className="video-frame h-56 w-full md:h-60 md:w-[320px]" aria-hidden="true">
              <span className="video-play-icon" />
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2 rounded-2xl border border-border/60 bg-card/70 p-6">
              <h3 className="text-lg font-semibold text-foreground">Rust + TAURI runtime</h3>
              <p className="text-sm">
                Streams screen pixels and webcam frames at low latency with a slim native wrapper for macOS, Windows, and Linux.
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-border/60 bg-card/70 p-6">
              <h3 className="text-lg font-semibold text-foreground">React + Tailwind UI</h3>
              <p className="text-sm">
                A secure webview configuration surface that sculpts capture profiles and visualizes model outputs.
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-border/60 bg-card/70 p-6">
              <h3 className="text-lg font-semibold text-foreground">GraphRAG pipeline</h3>
              <p className="text-sm">
                Neo4j and PGVector synthesize workflows, applications, and state transitions into queryable context packs.
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-border/60 bg-card/70 p-6">
              <h3 className="text-lg font-semibold text-foreground">Distributed storage</h3>
              <p className="text-sm">
                Encrypted archives extend into decentralized storage providers without relinquishing encryption keys.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 lg:max-w-5xl">
          <div className="video-frame h-60 w-full sm:h-72" aria-hidden="true">
            <span className="video-play-icon" />
          </div>
          <div className="space-y-4 text-base leading-relaxed">
            <h2 className="text-2xl font-semibold text-foreground">CAST integration and relational context</h2>
            <p>
              The experience graph produced by <strong>0</strong> powers CAST, SOURCE&apos;s social coordination layer. Shared context
              helps CAST surface collaborators whose patterns match yours, forming micro-communities around aligned workflows.
            </p>
            <p>
              CAST ships as a module inside the <strong>0</strong> desktop app, so your captured routines remain in sync as you discover
              peers and receive agent support tuned to your actual practice.
            </p>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-5xl flex-col gap-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4 text-base leading-relaxed md:w-[60%]">
              <h2 className="text-2xl font-semibold text-foreground">Roadmap</h2>
              <ul className="space-y-3 text-sm leading-relaxed sm:text-base">
                <li>Extend capture capabilities to open hardware devices with privacy-preserving co-processors.</li>
                <li>Introduce adaptive agents that proactively resolve recurring pain points detected by <strong>0</strong>.</li>
                <li>Expand zero-knowledge sharing flows so teams can collaborate on anonymized UX signals.</li>
              </ul>
            </div>
            <div className="video-frame h-56 w-full md:h-64 md:w-[280px]" aria-hidden="true">
              <span className="video-play-icon" />
            </div>
          </div>
          <div className="space-y-3 rounded-2xl border border-border/50 bg-card/70 p-6 text-sm leading-relaxed sm:text-base">
            <p>
              Near-term releases focus on richer capture profiles, cross-device sync, and refined anomaly detection. Long term,
              the goal is to ship <strong>0</strong> on open hardware appliances with dedicated secure elements.
            </p>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 text-base leading-relaxed">
          <div className="video-frame h-56 w-full sm:h-64" aria-hidden="true">
            <span className="video-play-icon" />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Open-source development</h2>
            <p>
              <strong>0</strong> is developed in the open. Every component—from Rust capture loops to Tailwind UI surfaces—is
              versioned in SOURCE&apos;s repositories so the community can inspect, fork, and improve the stack.
            </p>
            <div>
              <Link
                href="https://github.com/SOURCE-Platform/0"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                target="_blank"
                rel="noreferrer"
              >
                View the 0 repository
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
