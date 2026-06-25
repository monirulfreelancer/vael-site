import Reveal from "./Reveal";

const services = [
  {
    icon: "◆",
    name: "AI Solutions & Agents",
    promise: "Smart software that does real work.",
    desc: "Custom AI assistants, chatbots, RAG systems, and agentic workflows trained on your business.",
    bestFor: "Support agents, internal copilots, knowledge systems",
  },
  {
    icon: "▣",
    name: "AI-Powered Apps",
    promise: "Your product, with intelligence built in.",
    desc: "Web and mobile applications — MVP to full-scale — with AI features baked into the core.",
    bestFor: "SaaS products, marketplaces, founder MVPs",
  },
  {
    icon: "⚡",
    name: "Business Automation",
    promise: "Stop paying people to do what code should do.",
    desc: "Automations and AI tools that remove the repetitive work draining your team's hours.",
    bestFor: "Data entry, reporting, lead & document processing",
  },
  {
    icon: "▤",
    name: "Custom Software & MVPs",
    promise: "Built around how you actually work.",
    desc: "Bespoke systems, internal tools, and validated MVPs — delivered with the speed of AI-assisted development.",
    bestFor: "Ops platforms, client portals, internal tools",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-4">What we build</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight max-w-2xl">
            AI at the core, full-stack when you need it.
          </h2>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-border bg-surface p-7 hover:border-accent/60 transition-colors">
                <div className="text-2xl text-accent mb-5">{s.icon}</div>
                <h3 className="text-xl font-semibold">{s.name}</h3>
                <p className="mt-1.5 font-medium text-text/90">{s.promise}</p>
                <p className="mt-3 text-muted leading-relaxed">{s.desc}</p>
                <p className="mt-5 font-mono text-xs text-muted">
                  <span className="text-accent">Best for:</span> {s.bestFor}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
