"use client";
import { useState } from "react";
import Reveal from "./Reveal";

const project = [
  {
    name: "Launch",
    sub: "MVP & Validation",
    price: "From $10K",
    timeline: "3–5 weeks",
    features: [
      "MVP web or mobile app",
      "Core features, production-ready",
      "1 AI feature or automation included",
      "Launch support included",
    ],
    bestFor: "Founders, early-stage products",
    popular: false,
  },
  {
    name: "Build",
    sub: "Full Product",
    price: "$25K–$75K",
    timeline: "6–10 weeks",
    features: [
      "Full-scale web + mobile app",
      "Multiple AI features & integrations",
      "Custom dashboards & admin tools",
      "Architecture built to scale",
      "30 days post-launch support",
    ],
    bestFor: "Funded startups, growing SMBs",
    popular: true,
  },
  {
    name: "Scale",
    sub: "Complex Systems",
    price: "$75K+",
    timeline: "10–16 weeks",
    features: [
      "Complex multi-part systems",
      "Advanced AI / agentic workflows",
      "Third-party & legacy integrations",
      "Dedicated senior team",
      "Priority support & SLA",
    ],
    bestFor: "Established businesses, AI-first products",
    popular: false,
  },
];

const retainer = [
  {
    name: "Support",
    sub: "Maintain & improve",
    price: "$2K/mo",
    timeline: "~20 hrs/mo",
    features: ["Bug fixes & updates", "Performance monitoring", "Small improvements"],
    bestFor: "Existing products",
    popular: false,
  },
  {
    name: "Growth",
    sub: "Ship every month",
    price: "$3.5K/mo",
    timeline: "~40 hrs/mo",
    features: ["Feature development", "Priority response", "Monthly roadmap"],
    bestFor: "Active products",
    popular: true,
  },
  {
    name: "Partner",
    sub: "Embedded team",
    price: "$5K+/mo",
    timeline: "Flexible scope",
    features: ["Dedicated capacity", "AI/automation buildout", "Strategic input"],
    bestFor: "Scaling businesses",
    popular: false,
  },
];

export default function Pricing() {
  const [mode, setMode] = useState<"project" | "retainer">("project");
  const tiers = mode === "project" ? project : retainer;

  return (
    <section id="pricing" className="py-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-4">Engagement models</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight max-w-2xl">
            Transparent pricing, scoped to your project.
          </h2>
          <p className="mt-4 text-muted">No hourly billing surprises.</p>
        </Reveal>

        <Reveal>
          <div className="mt-10 inline-flex rounded-lg border border-border p-1 font-mono text-sm">
            <button
              onClick={() => setMode("project")}
              className={`px-5 py-2 rounded-md transition-colors ${
                mode === "project" ? "bg-accent text-bg" : "text-muted hover:text-text"
              }`}
            >
              Project-based
            </button>
            <button
              onClick={() => setMode("retainer")}
              className={`px-5 py-2 rounded-md transition-colors ${
                mode === "retainer" ? "bg-accent text-bg" : "text-muted hover:text-text"
              }`}
            >
              Monthly retainer
            </button>
          </div>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative h-full rounded-2xl bg-surface p-7 flex flex-col ${
                t.popular ? "border-2 border-accent" : "border border-border"
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-7 rounded-full bg-accent text-bg font-mono text-[11px] px-3 py-1">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="font-mono text-xs text-muted mt-1">{t.sub}</p>
              <p className="mt-5 text-3xl font-semibold">{t.price}</p>
              <p className="font-mono text-xs text-accent mt-1">{t.timeline}</p>
              <ul className="mt-6 space-y-2.5 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="text-sm text-muted pl-5 relative">
                    <span className="absolute left-0 text-accent">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-[11px] text-muted">
                <span className="text-accent">Best for:</span> {t.bestFor}
              </p>
              <a
                href="#contact"
                className={`mt-5 rounded-lg px-4 py-2.5 text-center font-medium transition-colors ${
                  t.popular
                    ? "bg-accent text-bg hover:bg-accent-dim"
                    : "border border-border text-text hover:border-muted"
                }`}
              >
                Get started
              </a>
            </div>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-muted">
            Not sure which fits? Every project starts with a free consultation
            where we scope it together.{" "}
            <span className="text-text">
              Fixed-price quotes, not open-ended hourly bills.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
