import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* ambient warm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[620px] w-[820px] rounded-full opacity-[0.16] blur-3xl"
        style={{ background: "radial-gradient(closest-side, #FFC24B, transparent)" }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-5">AI software development agency</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="h-display text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold">
                We build AI-powered software that moves your business{" "}
                <span className="text-accent">forward.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-lg text-muted max-w-xl leading-relaxed">
                Custom apps, automation, and AI solutions — from MVP to
                production. Built by a senior team, accelerated by AI, shipped in
                weeks not quarters.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="rounded-lg bg-accent px-6 py-3 font-medium text-bg hover:bg-accent-dim transition-colors"
                >
                  Book a free consultation
                </a>
                <a
                  href="#work"
                  className="rounded-lg border border-border px-6 py-3 font-medium text-text hover:border-muted transition-colors"
                >
                  See our work ↓
                </a>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <p className="eyebrow mt-8 !text-muted">
                AI &amp; automation · web &amp; mobile · custom software · 20+ projects shipped
              </p>
            </Reveal>
          </div>

          {/* Visual: product dashboard mockup */}
          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <div className="relative">
                {/* soft accent shape behind */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] opacity-[0.12] blur-2xl"
                  style={{ background: "radial-gradient(closest-side, #FFC24B, transparent)" }}
                />
                <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-2xl shadow-black/40 lg:rotate-[1.5deg] hover:rotate-0 transition-transform duration-500">
                  {/* window bar */}
                  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-surface2">
                    <span className="w-2.5 h-2.5 rounded-full bg-border" />
                    <span className="w-2.5 h-2.5 rounded-full bg-border" />
                    <span className="w-2.5 h-2.5 rounded-full bg-border" />
                    <span className="ml-3 font-mono text-[11px] text-muted">
                      app.vael.studio/dashboard
                    </span>
                  </div>

                  <div className="flex">
                    {/* sidebar */}
                    <div className="hidden sm:flex flex-col gap-3 w-28 shrink-0 border-r border-border p-3">
                      <div className="flex items-center gap-1.5">
                        <span className="grid place-items-center w-5 h-5 rounded border border-accent text-accent font-mono text-[10px]">V</span>
                      </div>
                      {["Overview", "Projects", "Clients", "Builds", "Settings"].map((it, i) => (
                        <div
                          key={it}
                          className={`font-mono text-[10px] rounded px-2 py-1 ${
                            i === 1 ? "bg-accent/15 text-accent" : "text-muted"
                          }`}
                        >
                          {it}
                        </div>
                      ))}
                    </div>

                    {/* main panel */}
                    <div className="flex-1 p-4 space-y-3">
                      {/* stat cards */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { v: "8", l: "Active" },
                          { v: "100%", l: "On-time" },
                          { v: "24", l: "Shipped" },
                        ].map((s) => (
                          <div key={s.l} className="rounded-lg border border-border p-2">
                            <p className="text-accent font-semibold text-sm">{s.v}</p>
                            <p className="font-mono text-[9px] text-muted">{s.l}</p>
                          </div>
                        ))}
                      </div>

                      {/* project pipeline */}
                      <div className="rounded-lg border border-border overflow-hidden">
                        <div className="grid grid-cols-[1fr_auto] gap-2 px-3 py-2 border-b border-border bg-surface2 font-mono text-[9px] text-muted">
                          <span>PROJECT</span><span>STATUS</span>
                        </div>
                        {[
                          { name: "Booking platform", client: "Northwind", status: "Shipped", pct: 100 },
                          { name: "AI support agent", client: "Apex Labs", status: "In build", pct: 72 },
                          { name: "E-commerce app", client: "Brightly", status: "In build", pct: 48 },
                          { name: "Ops dashboard", client: "Vertex", status: "In review", pct: 90 },
                        ].map((p, i) => (
                          <div
                            key={i}
                            className="px-3 py-2 border-b border-border/60 last:border-0"
                          >
                            <div className="flex items-center justify-between">
                              <div className="min-w-0">
                                <p className="text-[10px] text-text/80 truncate">{p.name}</p>
                                <p className="font-mono text-[9px] text-muted truncate">{p.client}</p>
                              </div>
                              <span
                                className={`font-mono text-[9px] shrink-0 ml-2 ${
                                  p.status === "Shipped" ? "text-accent" : "text-muted"
                                }`}
                              >
                                {p.status}
                              </span>
                            </div>
                            {/* progress bar */}
                            <div className="mt-1.5 h-1 rounded-full bg-border overflow-hidden">
                              <div
                                className="h-full rounded-full bg-accent"
                                style={{ width: `${p.pct}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
