import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pb-24 pt-32 md:pb-32 md:pt-40"
    >
      <div
        aria-hidden
        className="glow left-1/2 top-0 h-[680px] w-[1200px] -translate-x-1/2 -translate-y-1/4 opacity-[0.26]"
        style={{
          background: "radial-gradient(closest-side, #FFC24B, transparent)",
        }}
      />
      <div
        aria-hidden
        className="glow left-[12%] top-48 h-[420px] w-[420px] opacity-[0.10]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,140,50,0.9), transparent)",
        }}
      />

      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="eyebrow text-center">
            AI SOFTWARE DEVELOPMENT AGENCY
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1
            id="hero-heading"
            className="h-display mt-6 text-5xl font-semibold sm:text-6xl lg:text-7xl"
          >
            We build <span className="text-accent">AI software</span> that does{" "}
            <span className="text-accent">real work</span> for your business.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-muted sm:text-2xl">
            Custom AI apps, agents, and automation. From first idea to
            production, built by senior engineers and shipped in weeks.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/order"
              className="btn-primary rounded-full bg-accent px-8 py-4 text-base font-medium text-bg hover:bg-accent-dim"
            >
              Start your project
            </a>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-text transition-colors hover:border-accent-dim"
            >
              See our work
              <span
                aria-hidden
                className="text-accent transition-transform duration-300 group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </a>
          </div>
        </Reveal>
        <Reveal delay={320}>
          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">
            AI agents · custom apps · automation · web and mobile
          </p>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-14">
            <p className="font-mono text-xs text-muted">
              Scroll to see our work
            </p>
            <div aria-hidden className="bob mt-2 text-accent">
              ↓
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
