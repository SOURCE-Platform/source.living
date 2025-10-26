import Link from "next/link";

export default function ProverPage() {
  return (
    <div className="mx-auto flex w-full flex-col gap-12 px-6 py-16 sm:px-10 lg:px-16">
      <nav>
        <Link
          href="/software"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <span aria-hidden="true">←</span>
          Back to Software
        </Link>
      </nav>
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold sm:text-5xl">Prover</h1>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          Prover is SOURCE&apos;s verification engine for personal and shared agents, responsible for validating outputs before
          they reach your workspace.
        </p>
      </header>
      <div className="video-frame aspect-video w-full" aria-hidden="true">
        <span className="video-play-icon" />
      </div>
      <section className="space-y-4 text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">The trust layer</h2>
        <p>
          Every proposed action or generated asset flows through Prover&apos;s sequential checks, combining retrieval, rule-based
          guardrails, and zero-knowledge attestations.
        </p>
      </section>
      <section className="space-y-4 text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">Connected to 0</h2>
        <p>
          Prover ingests context produced by 0 to understand a user&apos;s preferences, blocked domains, and sensitive workflow
          boundaries before approving or rejecting requests.
        </p>
      </section>
    </div>
  );
}
