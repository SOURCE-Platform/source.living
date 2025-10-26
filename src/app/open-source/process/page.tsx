import Link from "next/link";

export default function ProcessPage() {
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
        <h1 className="text-4xl font-semibold sm:text-5xl">Process</h1>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          Explore SOURCE&apos;s contribution model, governance rhythm, and release cadence across repositories.
        </p>
      </header>
      <section className="space-y-4 text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">Working in the open</h2>
        <p>
          Sprint plans, design docs, and RFCs live in public folders so anyone can audit our roadmap or propose changes via
          pull request.
        </p>
      </section>
    </div>
  );
}
