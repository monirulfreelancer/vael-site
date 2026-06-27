import Reveal from "./Reveal";

const phases = [
  {
    no: "01",
    name: "Discovery & Strategy",
    week: "Week 1",
    desc: "We dig into your business, users, and goals before writing a single line of code.",
    points: [
      "Deep-dive into your problem, users & success metrics",
      "Scope, feature prioritization & technical approach",
      "Where AI adds real value (and where it doesn't)",
    ],
    deliverable: "Roadmap, feature spec, fixed scope & timeline",
  },
  {
    no: "02",
    name: "Design & Planning",
    week: "Week 1–2",
    desc: "We map the experience and architecture. You approve the look and flow before build begins.",
    points: [
      "UX flows & UI design for every key screen",
      "Technical architecture & data model",
      "Clickable prototype for your sign-off",
    ],
    deliverable: "Approved designs, prototype, technical plan",
  },
  {
    no: "03",
    name: "Development & Build",
    week: "Week 2–5",
    desc: "AI-accelerated development means you see working software fast — with regular check-ins.",
    points: [
      "Full-stack build with weekly progress demos",
      "AI features, integrations & automations wired in",
      "Continuous testing as we go",
    ],
    deliverable: "Working product, staging access, weekly demos",
  },
  {
    no: "04",
    name: "Launch & Support",
    week: "Week 5–6+",
    desc: "We ship it live, make sure it's stable, and stay on to support growth.",
    points: [
      "Production deployment & performance tuning",
      "Handover, docs & training",
      "Ongoing support & iteration (optional retainer)",
    ],
    deliverable: "Live product, documentation, support plan",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-4">How we work</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight max-w-2xl">
            A clear path from idea to launch — no surprises, no black box.
          </h2>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-4 gap-5">
          {phases.map((p, i) => (
            <Reveal key={p.no} delay={i * 80}>
              <div className="card h-full p-6 relative">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl text-accent">{p.no}</span>
                  <span className="font-mono text-[11px] text-muted border border-border rounded-full px-2.5 py-1">
                    {p.week}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{p.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="text-sm text-muted pl-4 relative">
                      <span className="absolute left-0 text-accent">·</span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 font-mono text-[11px] text-muted leading-relaxed">
                  <span className="text-accent">Deliverables:</span> {p.deliverable}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 text-sm text-muted">
            Typical 6-week MVP; larger builds run 8–12 weeks. Every timeline is
            fixed and agreed before we start.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
