import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="section relative overflow-hidden border-t border-border"
    >
      <div
        aria-hidden
        className="glow left-1/2 top-1/2 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-accent), transparent)",
        }}
      />
      <div
        aria-hidden
        className="glow right-[5%] top-1/4 h-[500px] w-[500px] opacity-[0.05]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(232,120,30,0.9), transparent)",
        }}
      />

      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="eyebrow text-center">Let us build it</span>
          <h2
            id="cta-heading"
            className="h-display mt-6 text-4xl font-extrabold sm:text-6xl"
          >
            Your project could ship in six weeks.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-xl leading-relaxed text-text/85">
            Tell us what you are building. We will come back within one
            business day with a fixed scope, a fixed price, and a start date.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/order"
              className="btn-primary rounded-full bg-accent px-8 py-4 text-base font-medium text-bg hover:bg-accent-dim"
            >
              Start your project
            </a>
            <a
              href="/work"
              className="rounded-full border border-border px-6 py-3 text-base text-text transition-colors hover:border-accent-dim"
            >
              See our work
            </a>
          </div>
          <p className="mt-8 font-mono text-xs text-muted">
            Free consultation · Fixed price · No hourly billing
          </p>
        </Reveal>
      </div>
    </section>
  );
}
