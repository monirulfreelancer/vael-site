import Counter from "./Counter";
import Reveal from "./Reveal";

// Placeholder metrics: replace with real numbers before launch, and delete any
// stat you cannot honestly claim.
const stats = [
  { value: "[X]+", label: "Projects shipped" },
  { value: "6 wks", label: "Avg delivery" },
  { value: "100%", label: "On-time delivery" },
  { value: "AI-first", label: "Every project" },
];

const pillars = [
  {
    glyph: "⚡",
    title: "Startup speed",
    description: "AI-accelerated development means weeks, not quarters.",
  },
  {
    glyph: "◎",
    title: "Senior only",
    description: "No junior hand-offs. The people you talk to build the product.",
  },
  {
    glyph: "▣",
    title: "Built to own",
    description: "Your product, your code, your infrastructure. No lock-in.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section relative overflow-hidden border-t border-border"
    >
      <div
        aria-hidden
        className="glow -left-56 top-1/2 h-[600px] w-[600px] -translate-y-1/2 opacity-[0.05]"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-accent), transparent)",
        }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <span id="about-heading" className="eyebrow">
                Why Vael
              </span>
              <p className="mt-6 text-xl leading-relaxed sm:text-2xl">
                We are a software studio built for one idea: businesses should
                not have to choose between quality and speed. We pair senior
                engineering with AI-accelerated workflows, so you get work that
                used to take agencies months, delivered in weeks.
              </p>
              <p className="mt-5 leading-relaxed text-text/70">
                You will not be handed off to account managers or junior
                developers. You work directly with the people building your
                product. We scope tightly, ship fast, and stay focused on
                software that earns its keep.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border bg-surface p-5"
                  >
                    <Counter value={stat.value} label={stat.label} />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:mt-20 sm:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 80}>
              <div className="flex gap-4">
                <div aria-hidden className="text-2xl text-accent">
                  {pillar.glyph}
                </div>
                <div>
                  <div className="font-semibold">{pillar.title}</div>
                  <div className="mt-1 text-base leading-relaxed text-text/70">
                    {pillar.description}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
