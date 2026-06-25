import Reveal from "./Reveal";

const stats = [
  { value: "20+", label: "Projects shipped" },
  { value: "6 wks", label: "Avg. delivery" },
  { value: "100%", label: "On-time delivery" },
  { value: "AI-first", label: "Every project" },
];

const pillars = [
  {
    icon: "⚡",
    title: "Startup speed",
    desc: "AI-accelerated development means weeks, not quarters.",
  },
  {
    icon: "◎",
    title: "Senior-only",
    desc: "No junior hand-offs. The people you talk to build the product.",
  },
  {
    icon: "▣",
    title: "Built to own",
    desc: "Your product, your code, your infrastructure. No lock-in.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-4">Why Vael</p>
              <p className="text-xl sm:text-2xl leading-relaxed">
                We're a software studio built for a simple idea: businesses
                shouldn't have to choose between quality and speed. By pairing
                senior engineering with AI-accelerated workflows, we deliver the
                kind of work that used to take agencies months — in weeks, often
                at a fraction of the cost.
              </p>
              <p className="mt-5 text-muted leading-relaxed">
                We don't hand you off to account managers or junior developers.
                You work directly with the people building your product. We scope
                tightly, ship fast, and stay focused on one thing: software that
                actually moves your business forward.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-border bg-surface p-5"
                  >
                    <p className="text-3xl font-semibold text-accent">{s.value}</p>
                    <p className="mt-1 font-mono text-xs text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="flex gap-4">
                <span className="text-2xl text-accent">{p.icon}</span>
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
