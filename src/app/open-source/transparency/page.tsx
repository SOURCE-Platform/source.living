import Link from "next/link";

export default function TransparencyPage() {
  return (
    <div className="mx-auto flex w-full flex-col gap-12 px-6 py-16 sm:px-10 lg:px-16">
      <nav>
        <Link
          href="/open-source"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <span aria-hidden="true">←</span>
          Back to Open-Source
        </Link>
      </nav>
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold sm:text-5xl">Transparency</h1>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          Review SOURCE&apos;s public dashboards for governance, funding flows, and roadmap progress.
        </p>
      </header>
      <section className="space-y-4 text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">Observable operations</h2>
        <p>
          Voting history, treasury reports, and incident reviews are published automatically so contributors can trace how
          decisions are made and enforced.
        </p>
      </section>
    </div>
  );
}
