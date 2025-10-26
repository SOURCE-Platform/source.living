import Link from "next/link";

export default function PublicInfrastructurePage() {
  return (
    <div className="mx-auto flex w-full flex-col gap-20 px-6 py-20 sm:px-10 lg:px-16">
      <nav>
        <Link
          href="/hardware"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <span aria-hidden="true">←</span>
          Back to Hardware
        </Link>
      </nav>

      <header className="relative -mx-6 w-screen px-0 sm:-mx-10 lg:-mx-16">
        <div className="relative w-screen overflow-visible px-6 py-12 sm:px-10 lg:px-16">
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden sm:flex items-center">
            <div
              className="h-[260px] w-full max-w-none rounded-r-3xl border border-dashed border-border/60 bg-muted/40 sm:h-[280px] lg:h-[300px]"
              style={{ width: "max(0px, calc((100vw - 48rem) / 2))" }}
            >
              <div className="flex h-full items-center justify-center px-4 text-center text-sm font-medium text-muted-foreground">
                Left side hero
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden sm:flex items-center">
            <div
              className="h-[260px] w-full max-w-none rounded-l-3xl border border-dashed border-border/60 bg-muted/40 sm:h-[280px] lg:h-[300px]"
              style={{ width: "max(0px, calc((100vw - 48rem) / 2))" }}
            >
              <div className="flex h-full items-center justify-center px-4 text-center text-sm font-medium text-muted-foreground">
                Right side hero
              </div>
            </div>
          </div>
          <div className="relative z-10 mx-auto flex w-full max-w-[30rem] flex-col items-center gap-6 px-4 text-center sm:max-w-[32rem] sm:px-0 lg:max-w-[34rem]">
            <p className="text-sm uppercase tracking-wide text-muted-foreground">Public Infrastructure</p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">The Civic Nervous System</h1>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              SOURCE&apos;s Civic Monitor and Compute units orchestrate sensing, computation, and ambient communication across streetscapes, plazas, and homes while keeping shared space intuitive and responsive.
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-4 px-6 pb-6 sm:hidden">
          <div className="aspect-[4/3] w-full max-w-sm rounded-3xl border border-dashed border-border/60 bg-muted/40">
            <div className="flex h-full items-center justify-center px-4 text-center text-sm font-medium text-muted-foreground">
              Left side hero
            </div>
          </div>
          <div className="aspect-[4/3] w-full max-w-sm rounded-3xl border border-dashed border-border/60 bg-muted/40">
            <div className="flex h-full items-center justify-center px-4 text-center text-sm font-medium text-muted-foreground">
              Right side hero
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-4xl space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
        <h2 className="text-3xl font-semibold text-foreground">Monitor units woven through the public realm</h2>
        <p>
          Each SOURCE Monitor combines LIDAR, microphone arrays, directional speakers, and high-fidelity cameras inside a single weatherproof body. Installed on light posts, traffic lights, elevated handrails, and even durable trash enclosures, they deliver nuanced awareness without overwhelming the streetscape.
        </p>
        <p>
          Modular mounting brackets allow teams to swing units into position quickly, while integrated vibration dampening preserves sensor sensitivity. Every monitor calibrates automatically when powered on, syncing with nearby units to maintain a consistent field of view across the district.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm uppercase tracking-wide text-muted-foreground">Hardware composition</div>
          <div className="grid w-full gap-3 sm:max-w-sm">
            <div className="text-sm font-medium text-foreground">Integrated sensor stack</div>
            <div className="text-sm font-medium text-foreground">Directional ambient audio plane</div>
            <div className="text-sm font-medium text-foreground">Service-ready access latches</div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl space-y-10 text-base leading-relaxed text-muted-foreground sm:text-lg">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <h2 className="text-3xl font-semibold text-foreground">SOURCE Civic Monitor units</h2>
            <p>
              Civic Monitors are designed for constant presence and gentle awareness. Multi-spectral cameras, acoustic arrays, and LIDAR scanlines layer together to render a nuanced understanding of public space without fixating on individuals. Adaptive privacy shrouds and contextual permissions ensure data capture stays proportional to the moment.
            </p>
            <p>
              The enclosures share a modular spine that accommodates new sensor packs as regulations or civic needs evolve. Maintenance crews can swing the housing open with a single tool, replace modules, and reseal the unit in minutes without interrupting network continuity.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="aspect-video w-full max-h-[500px] rounded-3xl border border-dashed border-border/60 bg-muted/40" aria-hidden="true">
              <div className="flex h-full items-center justify-center px-6 text-center text-sm font-medium text-muted-foreground">
                Video placeholder: Monitor unit overview
              </div>
            </div>
            <ul className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
              <li>Adaptive privacy filters responsive to civic policy changes</li>
              <li>Self-calibrating optics shielded from weather and vandalism</li>
              <li>Quick-release maintenance latch and modular sensor trays</li>
              <li>Continuous health diagnostics for proactive servicing</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl space-y-10 text-base leading-relaxed text-muted-foreground sm:text-lg">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,1fr]">
          <div className="space-y-5">
            <h2 className="text-3xl font-semibold text-foreground">SOURCE Civic Compute units</h2>
            <p>
              SOURCE Compute units are the distributed AI processing points that continually translate nearby Monitor data into situational insights. They host specialized accelerators, privacy-preserving enclaves, and redundant storage, allowing neighborhoods to reason locally before escalating only the signals that demand wider coordination.
            </p>
            <p>
              Each enclosure syncs with neighboring compute clusters to balance workload, distill actionable narratives, and emit ambient cues through the monitors they serve. When new behaviors or models are introduced, hot-swappable blades let teams deploy updates while keeping civic services online.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="h-[360px] w-full max-w-md rounded-3xl border border-dashed border-border/60 bg-muted/40 sm:h-[420px] md:h-[460px]" aria-hidden="true">
              <div className="flex h-full items-center justify-center px-6 text-center text-sm font-medium text-muted-foreground">
                Illustration placeholder: Compute cabinet interior
              </div>
            </div>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <div>Edge AI acceleration tuned for civic responsiveness</div>
              <div>Encrypted interlinks bridging transit corridors and residential clusters</div>
              <div>Diagnostics that alert service crews before degraded performance affects communities</div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mx-6 w-screen px-0 sm:-mx-10 lg:-mx-16">
        <div className="relative left-1/2 grid w-screen -translate-x-1/2 grid-cols-1 items-center gap-8 px-6 sm:px-10 lg:grid-cols-[50vw_minmax(360px,560px)] lg:px-0">
          <div className="h-[300px] w-full rounded-r-3xl border border-dashed border-border/60 bg-muted/40 lg:h-[340px]">
            <div className="flex h-full items-center justify-center px-6 text-center text-sm font-medium text-muted-foreground">
              Illustration placeholder: service cabinet + pole-mounted monitor
            </div>
          </div>
          <div className="flex w-full flex-col gap-6 px-0 text-base leading-relaxed text-muted-foreground sm:text-lg lg:pr-16">
            <h2 className="text-3xl font-semibold text-foreground">Infrastructure choreography</h2>
            <p>
              Monitors ladder up to neighborhood compute enclosures—powder-coated metal cabinets attached to poles or embedded in new street furniture. Hinged service panels give technicians immediate access to redundant edge computers that buffer, analyze, and securely forward live feeds.
            </p>
            <p>
              A mesh of underground fiber and high-throughput conduits links every enclosure, weaving a resilient nervous system beneath sidewalks. The network flexes to serve both retrofitted corridors and freshly planned districts, extending intelligence without tearing up the city fabric.
            </p>
            <div className="text-sm text-muted-foreground">
              Underground conduits knit together intersections, plazas, and residential blocks, keeping latency low even as deployments scale.
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr,1fr]">
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <h2 className="text-3xl font-semibold text-foreground">Public-to-private interoperability</h2>
            <p>
              SOURCE bridges municipal infrastructure with domestic networks through secure boundary gateways. Data collected along boulevards flows through encrypted channels into neighborhood hubs, where it can interoperate with private residences when residents opt in.
            </p>
            <p>
              Inside homes, wall-mounted monitors mirror the capabilities of their outdoor counterparts. They route through concealed conduits into in-wall compute bays with swappable modules, allowing homeowners and certified technicians to maintain performance without exposing sensitive hardware.
            </p>
            <p>
              Larger properties may host multiple distributed compute bays that synchronize over shielded cabling, ensuring rooms stay responsive while respecting household privacy preferences.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="h-[360px] w-full max-w-md rounded-3xl border border-dashed border-border/60 bg-muted/40 sm:h-[420px] md:h-[460px]" aria-hidden="true">
              <div className="flex h-full items-center justify-center px-6 text-center text-sm font-medium text-muted-foreground">
                Video placeholder: walkthrough of residential monitor installation
              </div>
            </div>
            <div className="text-sm text-foreground">
              Opt-in gateways regulate the handshake between civic data streams and private domains, ensuring transparency and control for every household.
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mx-6 w-screen px-0 py-12 sm:-mx-10 lg:-mx-16">
        <div className="grid w-screen place-items-center gap-8 px-6 sm:px-10 lg:px-16">
          <div className="w-full max-w-4xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg text-center">
            <h2 className="text-3xl font-semibold text-foreground">Civic infrastructure, synchronized</h2>
            <p>
              SOURCE Monitor networks, compute enclosures, underground conduits, and household gateways interlock to keep environments aware without overwhelming the people who live within them. Together they coordinate maintenance, accessibility, and privacy expectations across public plazas and private residences.
            </p>
            <p>
              The full stack stitches itself into city fabric—creating a responsive layer that is as respectful as it is powerful. SOURCE Compute units are the distributed AI processing points that continually translate nearby Monitor data into situational insights, making sure every signal improves life holistically.
            </p>
          </div>
          <div className="w-full max-w-5xl rounded-3xl border border-dashed border-border/60 bg-muted/40" aria-hidden="true">
            <div className="aspect-[21/9] w-full max-h-[420px]">
              <div className="flex h-full items-center justify-center px-8 text-center text-sm font-medium text-muted-foreground">
                Panorama placeholder: interconnected civic infrastructure diagram
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-5">
            <h2 className="text-3xl font-semibold text-foreground">A continuum of civic upgrades</h2>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Our cities have always evolved through layered infrastructure—from water to electricity to information. Public Infrastructure from SOURCE extends that tradition holistically, blending physical upgrades with empathetic computation.
            </p>
            <div className="text-sm text-muted-foreground">
              Placeholder for timeline video or interactive module
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">Plumbing revolutions</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Ancient aqueducts gave way to copper and steel piping, refining the delivery of clean water with each innovation and setting expectations for civic reliability.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">Telecommunications eras</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Telegraph wires introduced instant messaging, which matured into the global telephone network, expanded into ISP grids, and now propels broadband everywhere.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">Ambient computation</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                SOURCE Monitors compose sensing and audio-visual feedback into a unified medium, bringing human-aligned intelligence to sidewalks, homes, and shared spaces.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">Serviceability forward</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Modular cabinets, accessible panels, and standardized interfaces let service teams and residents upgrade hardware without replacing the entire system.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
