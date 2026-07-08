import Reveal from "./Reveal";

const phases = [
  {
    number: "01",
    timeline: "Week 1",
    name: "Discovery & Strategy",
    description:
      "We dig into your business, users, and goals before writing a single line of code.",
    bullets: [
      "Deep-dive into your problem, users and success metrics",
      "Scope, feature prioritization and technical approach",
      "Where AI adds real value, and where it does not",
    ],
    deliverables: "Roadmap, feature spec, fixed scope and timeline",
  },
  {
    number: "02",
    timeline: "Week 1-2",
    name: "Design & Planning",
    description:
      "We map the experience and architecture. You approve the look and flow before build begins.",
    bullets: [
      "UX flows and UI design for every key screen",
      "Technical architecture and data model",
      "Clickable prototype for your sign-off",
    ],
    deliverables: "Approved designs, prototype, technical plan",
  },
  {
    number: "03",
    timeline: "Week 2-5",
    name: "Development & Build",
    description:
      "You see working software fast, with weekly demos instead of months of silence.",
    bullets: [
      "Full-stack build with weekly progress demos",
      "AI features, integrations and automations wired in",
      "Continuous testing as we go",
    ],
    deliverables: "Working product, staging access, weekly demos",
  },
  {
    number: "04",
    timeline: "Week 5-6+",
    name: "Launch & Support",
    description:
      "We ship it live, make sure it is stable, and stay on to support growth.",
    bullets: [
      "Production deployment and performance tuning",
      "Handover, docs and training",
      "Ongoing support and iteration, optional retainer",
    ],
    deliverables: "Live product, documentation, support plan",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="section border-t border-border"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <span className="eyebrow">How we work</span>
          <h2
            id="process-heading"
            className="mt-6 max-w-2xl text-4xl font-semibold sm:text-5xl"
          >
            A clear path from idea to launch. No surprises, no black box.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 lg:grid-cols-4">
          {phases.map((phase, i) => (
            <Reveal key={phase.number} delay={i * 80}>
              <div className="card relative h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl text-accent">
                    {phase.number}
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted">
                    {phase.timeline}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold">{phase.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {phase.description}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {phase.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="relative pl-4 text-sm text-muted"
                    >
                      <span aria-hidden className="absolute left-0 text-accent">
                        ·
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 font-mono text-[11px] leading-relaxed text-muted">
                  <span className="text-accent">Deliverables:</span>{" "}
                  {phase.deliverables}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-sm text-muted">
            Typical MVP runs six weeks. Larger builds run eight to twelve. Every
            timeline is fixed and agreed before we start.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
