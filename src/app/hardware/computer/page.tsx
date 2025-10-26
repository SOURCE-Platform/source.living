import Link from "next/link";

export default function ComputerPage() {
  return (
    <div className="mx-auto flex w-full flex-col gap-12 px-6 py-16 sm:px-10 lg:px-16">
      <nav>
        <Link
          href="/hardware"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <span aria-hidden="true">←</span>
          Back to Hardware
        </Link>
      </nav>
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold sm:text-5xl">Computer</h1>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          SOURCE Compute Stations are compact, privacy-hardened hubs that run local inference, federated learning, and
          GraphRAG indexing for the household.
        </p>
      </header>
      <section className="space-y-4 text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">Trusted execution core</h2>
        <p>
          Each unit ships with TPM-backed secure enclaves, encrypted storage, and signed firmware pipelines to keep data
          local while coordinating with the SOURCE network.
        </p>
      </section>
      <section className="space-y-4 text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">Optimized for 0 and CAST</h2>
        <p>
          Compute Stations run the heavy lifting for 0 capture analytics and CAST matching, keeping raw media off the cloud
          and delivering instant responses to the family&apos;s ambient interfaces.
        </p>
      </section>
    </div>
  );
}
