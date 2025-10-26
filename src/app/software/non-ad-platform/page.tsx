import Link from "next/link";

export default function NonAdPlatformPage() {
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
        <h1 className="text-4xl font-semibold sm:text-5xl">Non-Ad Platform</h1>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          SOURCE&apos;s Non-Ad Platform rewards attention with direct value exchange, eliminating surveillance auctions and
          manipulative ad slots.
        </p>
      </header>
      <div className="video-frame aspect-video w-full" aria-hidden="true">
        <span className="video-play-icon" />
      </div>
      <section className="space-y-4 text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">Context-driven rewards</h2>
        <p>
          Experiences captured through 0 inform the inventory of offers a user actually needs, ensuring every recommendation
          respects consent and delivers tangible benefit.
        </p>
      </section>
      <section className="space-y-4 text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">Built for verifiable trust</h2>
        <p>
          All placements carry cryptographic receipts so participants know when data was used, which partner it reached, and
          how value was shared back into the SOURCE ecosystem.
        </p>
      </section>
    </div>
  );
}
