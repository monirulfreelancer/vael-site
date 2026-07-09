import { Fragment } from "react";
import Reveal from "./Reveal";

// Headline split into words at build time so the reveal is pure CSS. The two
// amber phrases carry the accent flag; every word animates the same way.
const headlineWords: { text: string; accent?: boolean }[] = [
  { text: "We" },
  { text: "build" },
  { text: "AI", accent: true },
  { text: "software", accent: true },
  { text: "that" },
  { text: "does" },
  { text: "real", accent: true },
  { text: "work", accent: true },
  { text: "for" },
  { text: "your" },
  { text: "business." },
];

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40"
    >
      <div
        aria-hidden
        className="glow orb-a left-[calc(50%-600px)] top-[-170px] h-[680px] w-[1200px] opacity-[0.13]"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-accent), transparent)",
        }}
      />
      <div
        aria-hidden
        className="glow orb-b left-[12%] top-48 h-[420px] w-[420px] opacity-[0.05]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(232,120,30,0.9), transparent)",
        }}
      />
      <div
        aria-hidden
        className="glow orb-c left-[calc(50%-230px)] top-[360px] h-[460px] w-[460px] opacity-[0.06]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,175,120,0.9), transparent)",
        }}
      />

      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="eyebrow text-center">
            AI SOFTWARE DEVELOPMENT AGENCY
          </span>
        </Reveal>
        <h1
          id="hero-heading"
          className="h-display mt-6 text-4xl font-bold sm:text-6xl lg:text-7xl"
        >
          {headlineWords.map((word, i) => (
            <Fragment key={i}>
              <span
                className={`hero-word${word.accent ? " text-accent" : ""}`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {word.text}
              </span>{" "}
            </Fragment>
          ))}
        </h1>
        <Reveal delay={700}>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-text/85 sm:text-2xl">
            Custom AI apps, agents, and automation. From first idea to
            production, built by senior engineers and shipped in weeks.
          </p>
        </Reveal>
        <Reveal delay={800}>
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
        <Reveal delay={900}>
          <p className="mt-10 text-base tracking-[0.02em] text-text/60">
            AI agents · custom apps · automation · web and mobile
          </p>
        </Reveal>
      </div>
    </section>
  );
}
