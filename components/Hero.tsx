import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* ambient accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full opacity-[0.08] blur-3xl"
        style={{ background: "radial-gradient(closest-side, #FFC24B, transparent)" }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-5">AI software development agency</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
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

          {/* Visual: terminal-style speed motif */}
          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <div className="rounded-2xl border border-border bg-surface p-5 font-mono text-sm">
                <div className="flex gap-1.5 mb-4">
                  <span className="w-3 h-3 rounded-full bg-border" />
                  <span className="w-3 h-3 rounded-full bg-border" />
                  <span className="w-3 h-3 rounded-full bg-border" />
                </div>
                <p className="text-muted">
                  <span className="text-accent">$</span> vael ship --project mvp
                </p>
                <p className="mt-2 text-muted">→ scoping features…</p>
                <p className="text-muted">→ building with AI…</p>
                <p className="text-muted">→ testing &amp; deploying…</p>
                <p className="mt-3 text-text">
                  ✓ shipped in <span className="text-accent">6 weeks</span>,
                  not 6 months
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
