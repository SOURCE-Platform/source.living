import Link from "next/link";

export default function TrustlessTrustPage() {
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
        <h1 className="text-4xl font-semibold sm:text-5xl">Trustless Trust</h1>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          Learn how SOURCE applies cryptography, attestations, and open verification rituals to establish trust without
          centralized gatekeepers.
        </p>
      </header>
      <section className="space-y-4 text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">Zero-knowledge protocols</h2>
        <p>
          Contributors can prove compliance with community rules and security guarantees without revealing their personal
          data, keeping the network resilient to leaks and coercion.
        </p>
      </section>
      <section className="space-y-4 text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">On-chain verifiability</h2>
        <p>
          Critical releases and governance decisions are notarized on public ledgers, enabling anyone to audit SOURCE&apos;s
          integrity over time.
        </p>
      </section>
    </div>
  );
}
