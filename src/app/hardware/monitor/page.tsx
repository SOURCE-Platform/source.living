import Link from "next/link";

export default function MonitorPage() {
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
        <h1 className="text-4xl font-semibold sm:text-5xl">Monitor</h1>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          Modular wall displays that render SOURCE context, alerts, and live cohorts with ambient animations powered by the
          three-bg kit.
        </p>
      </header>
      <section className="space-y-4 text-base leading-relaxed text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">High dynamic range surfaces</h2>
        <p>
          Monitors integrate with hardware light sensors to adapt brightness, maintain privacy, and deliver at-a-glance status
          indicators without overwhelming the room.
        </p>
      </section>
    </div>
  );
}
