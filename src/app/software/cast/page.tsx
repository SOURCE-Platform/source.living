import Link from "next/link";

export default function CastPage() {
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
        <h1 className="text-4xl font-semibold sm:text-5xl">CAST</h1>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          CAST forms meaningful cohorts from the experience graph captured by 0, matching people whose workflows,
          ambitions, and availability align.
        </p>
      </header>
      <div className="video-frame aspect-video w-full" aria-hidden="true">
        <span className="video-play-icon" />
      </div>
      <section className="space-y-4 text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">Relational intelligence</h2>
        <p>
          CAST runs continuous searches across the knowledge graph, surfacing collaborators and micro-communities adjacent to
          your focus areas. It respects privacy controls inherited from 0 while letting you share opt-in slices of your
          context.
        </p>
      </section>
      <section className="space-y-4 text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">In-app availability</h2>
        <p>
          The CAST module lives inside the 0 client, giving you direct access to curated rooms, project boards, and signal
          boosts without leaving your workspace.
        </p>
      </section>
    </div>
  );
}
