import Link from "next/link";

export default function SourceIdPage() {
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
        <h1 className="text-4xl font-semibold sm:text-5xl">SOURCE ID</h1>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          SOURCE ID is the cryptographic identity spine for the SOURCE ecosystem, anchoring every agent, credential, and
          consent record.
        </p>
      </header>
      <div className="video-frame aspect-video w-full" aria-hidden="true">
        <span className="video-play-icon" />
      </div>
      <section className="space-y-4 text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">Verified presence</h2>
        <p>
          SOURCE ID fuses hardware attestation, biometric intent, and ongoing behavioral signals from 0 to prove a person&apos;s
          control over their identity profile.
        </p>
      </section>
      <section className="space-y-4 text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">Portable permissions</h2>
        <p>
          Keys and access rules travel with the user across SOURCE applications, letting them grant or revoke agent powers,
          dataset visibility, and device access from a single dashboard.
        </p>
      </section>
    </div>
  );
}
