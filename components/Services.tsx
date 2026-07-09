import type { ReactNode } from "react";
import Reveal from "./Reveal";

const iconProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

type Service = {
  icon: ReactNode;
  name: string;
  promise: string;
  description: string;
  bestFor: string;
};

const services: Service[] = [
  {
    // Chat bubble with a spark: assistants that answer.
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M15 5H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h1v4l4.5-4H15a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
        <path d="M19.5 3v4M17.5 5h4" />
      </svg>
    ),
    name: "AI Agents & Assistants",
    promise: "Software that handles the work, not just the interface.",
    description:
      "Custom AI assistants, chatbots, and RAG systems trained on your own data and processes.",
    bestFor: "support agents, internal copilots, knowledge systems",
  },
  {
    // Smartphone with a spark: products with AI inside.
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <rect x="5" y="3" width="11" height="18" rx="2" />
        <path d="M9.5 17.5h2" />
        <path d="M19.5 4v4M17.5 6h4" />
      </svg>
    ),
    name: "AI-Powered Apps",
    promise: "Your product, with intelligence built in.",
    description:
      "Web and mobile applications, from first version to full scale, with AI features at the core.",
    bestFor: "SaaS products, marketplaces, founder MVPs",
  },
  {
    // Refresh loop: work that runs itself.
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M21 4v5h-5" />
        <path d="M3 20v-5h5" />
        <path d="M4.5 9a8 8 0 0 1 13.6-3.4L21 9" />
        <path d="M19.5 15a8 8 0 0 1-13.6 3.4L3 15" />
      </svg>
    ),
    name: "Business Automation",
    promise: "Stop paying people to do what code should do.",
    description:
      "Automations and AI tools that remove the repetitive work draining your team's hours.",
    bestFor: "data entry, reporting, lead and document processing",
  },
  {
    // Code brackets: software built to spec.
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="m8.5 7-5 5 5 5" />
        <path d="m15.5 7 5 5-5 5" />
        <path d="M13.5 5 10.5 19" />
      </svg>
    ),
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
        className="glow -bottom-48 -left-48 h-[840px] w-[840px] opacity-[0.07]"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-accent), transparent)",
        }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <span className="eyebrow">What we build</span>
          <h2
            id="services-heading"
            className="mt-6 max-w-2xl text-4xl font-bold sm:text-5xl"
          >
            AI at the core, full stack when you need it.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.name} delay={i * 80}>
              <div className="card group h-full p-7">
                <div aria-hidden className="mb-5 text-accent">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-text">
                  {service.name}
                </h3>
                <p className="mt-1.5 font-medium text-text/90">
                  {service.promise}
                </p>
                <p className="mt-3 text-base leading-relaxed text-text/70">
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
