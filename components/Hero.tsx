import Reveal from "./Reveal";

const stats = [
  { value: "8", label: "Active" },
  { value: "100%", label: "On-time" },
  { value: "24", label: "Shipped" },
];

const pipeline = [
  { name: "Booking platform", client: "Northwind", status: "Shipped", progress: 100 },
  { name: "AI support agent", client: "Apex Labs", status: "In build", progress: 72 },
  { name: "E-commerce app", client: "Brightly", status: "In build", progress: 48 },
  { name: "Ops dashboard", client: "Vertex", status: "In review", progress: 90 },
];

const sidebarItems = ["Overview", "Projects", "Clients", "Builds", "Settings"];

function DashboardMockup() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-3xl opacity-[0.12] blur-3xl"
        style={{
          background: "radial-gradient(closest-side, #FFC24B, transparent)",
        }}
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] transition-transform duration-500 lg:rotate-[1.5deg] lg:hover:rotate-0">
        <div className="flex items-center gap-2 border-b border-border bg-surface2 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-muted/30" />
          <span className="h-2 w-2 rounded-full bg-muted/30" />
          <span className="h-2 w-2 rounded-full bg-muted/30" />
          <span className="ml-2 font-mono text-[11px] text-muted">
            app.vael.studio/dashboard
          </span>
        </div>

        <div className="flex">
          <aside className="hidden w-28 border-r border-border p-3 sm:block">
            <div className="flex h-5 w-5 items-center justify-center rounded border border-accent font-mono text-[10px] text-accent">
              V
            </div>
            <div className="mt-4 space-y-1">
              {sidebarItems.map((item) => (
                <div
                  key={item}
                  className={`rounded px-2 py-1 font-mono text-[10px] ${
                    item === "Projects"
                      ? "bg-accent/10 text-accent"
                      : "text-muted"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>

          <div className="flex-1 space-y-3 p-4">
            <div className="grid grid-cols-3 gap-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border p-2"
                >
                  <div className="text-sm font-semibold text-accent">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[9px] text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-lg border border-border">
              <div className="flex items-center justify-between border-b border-border bg-surface2 px-3 py-1.5 font-mono text-[9px] tracking-[0.15em] text-muted">
                <span>PROJECT</span>
                <span>STATUS</span>
              </div>
              {pipeline.map((project, i) => (
                <div
                  key={project.name}
                  className={`px-3 py-2 ${
                    i < pipeline.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] text-text">
                        {project.name}
                      </div>
                      <div className="font-mono text-[9px] text-muted">
                        {project.client}
                      </div>
                    </div>
                    <div
                      className={`font-mono text-[9px] ${
                        project.status === "Shipped"
                          ? "text-accent"
                          : "text-muted"
                      }`}
                    >
                      {project.status}
                    </div>
                  </div>
                  <div className="mt-1.5 h-px overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[620px] w-[820px] -translate-x-1/2 -translate-y-1/4 opacity-[0.16] blur-3xl"
        style={{
          background: "radial-gradient(closest-side, #FFC24B, transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">AI SOFTWARE DEVELOPMENT AGENCY</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="h-display mt-6 text-4xl font-semibold sm:text-5xl lg:text-[3.75rem]">
                We build AI software that does real work for{" "}
                <span className="text-accent">your business.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Custom AI apps, agents, and automation. From first idea to
                production, built by senior engineers and shipped in weeks.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="/order"
                  className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent-dim"
                >
                  Start your project
                </a>
                <a
                  href="#work"
                  className="rounded-lg border border-border px-6 py-3 text-sm text-text transition-colors hover:border-accent-dim"
                >
                  See our work
                </a>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">
                AI agents · custom apps · automation · web and mobile
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
