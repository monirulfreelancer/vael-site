import Reveal from "./Reveal";

const services = [
  {
    glyph: "◆",
    name: "AI Agents & Assistants",
    promise: "Software that handles the work, not just the interface.",
    description:
      "Custom AI assistants, chatbots, and RAG systems trained on your own data and processes.",
    bestFor: "support agents, internal copilots, knowledge systems",
  },
  {
    glyph: "▣",
    name: "AI-Powered Apps",
    promise: "Your product, with intelligence built in.",
    description:
      "Web and mobile applications, from first version to full scale, with AI features at the core.",
    bestFor: "SaaS products, marketplaces, founder MVPs",
  },
  {
    glyph: "⚡",
    name: "Business Automation",
    promise: "Stop paying people to do what code should do.",
    description:
      "Automations and AI tools that remove the repetitive work draining your team's hours.",
    bestFor: "data entry, reporting, lead and document processing",
  },
  {
    glyph: "▤",
    name: "Custom Software & MVPs",
    promise: "Built around how you actually work.",
    description:
      "Bespoke systems, internal tools, and validated MVPs, delivered fast without cutting corners.",
    bestFor: "ops platforms, client portals, internal tools",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section relative overflow-hidden border-t border-border"
    >
      <div
        aria-hidden
        className="glow -bottom-48 -left-48 h-[840px] w-[840px] opacity-[0.14]"
        style={{
          background: "radial-gradient(closest-side, #FFC24B, transparent)",
        }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <span className="eyebrow">What we build</span>
          <h2
            id="services-heading"
            className="mt-6 max-w-2xl text-4xl font-semibold sm:text-5xl"
          >
            AI at the core, full stack when you need it.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.name} delay={i * 80}>
              <div className="card group h-full p-7">
                <div aria-hidden className="mb-5 text-2xl text-accent">
                  {service.glyph}
                </div>
                <h3 className="text-2xl font-semibold">{service.name}</h3>
                <p className="mt-1.5 font-medium text-text/90">
                  {service.promise}
                </p>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {service.description}
                </p>
                <p className="mt-5 font-mono text-xs text-muted">
                  <span className="text-accent">Best for:</span>{" "}
                  {service.bestFor}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
