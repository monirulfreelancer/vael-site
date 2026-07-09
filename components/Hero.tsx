import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40"
    >
      <div
        aria-hidden
        className="glow left-1/2 top-0 h-[680px] w-[1200px] -translate-x-1/2 -translate-y-1/4 opacity-[0.13]"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-accent), transparent)",
        }}
      />
      <div
        aria-hidden
        className="glow left-[12%] top-48 h-[420px] w-[420px] opacity-[0.05]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(232,120,30,0.9), transparent)",
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
            className="h-display mt-6 text-4xl font-bold sm:text-6xl lg:text-7xl"
          >
            We build <span className="text-accent">AI software</span> that does{" "}
            <span className="text-accent">real work</span> for your business.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-text/85 sm:text-2xl">
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
              className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-base text-text transition-colors hover:border-accent-dim"
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
          <p className="mt-10 text-base tracking-[0.02em] text-text/60">
            AI agents · custom apps · automation · web and mobile
          </p>
        </Reveal>
      </div>
    </section>
  );
}
