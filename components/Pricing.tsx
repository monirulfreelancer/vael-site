"use client";

import { useState } from "react";
import Reveal from "./Reveal";

type Tier = {
  name: string;
  subtitle: string;
  price: string;
  timeline: string;
  popular: boolean;
  features: string[];
  bestFor: string;
};

const projectTiers: Tier[] = [
  {
    name: "Launch",
    subtitle: "MVP and validation",
    price: "From $10K",
    timeline: "3-5 weeks",
    popular: false,
    features: [
      "MVP web or mobile app",
      "Core features, production ready",
      "One AI feature or automation included",
      "Launch support included",
    ],
    bestFor: "Founders, early-stage products",
  },
  {
    name: "Build",
    subtitle: "Full product",
    price: "$25K-$75K",
    timeline: "6-10 weeks",
    popular: true,
    features: [
      "Full-scale web and mobile app",
      "Multiple AI features and integrations",
      "Custom dashboards and admin tools",
      "Architecture built to scale",
      "30 days post-launch support",
    ],
    bestFor: "Funded startups, growing SMBs",
  },
  {
    name: "Scale",
    subtitle: "Complex systems",
    price: "$75K+",
    timeline: "10-16 weeks",
    popular: false,
    features: [
      "Complex multi-part systems",
      "Advanced AI and agentic workflows",
      "Third-party and legacy integrations",
      "Dedicated senior team",
      "Priority support and SLA",
    ],
    bestFor: "Established businesses, AI-first products",
  },
];

const retainerTiers: Tier[] = [
  {
    name: "Support",
    subtitle: "Maintain and improve",
    price: "$2K/mo",
    timeline: "About 20 hrs per month",
    popular: false,
    features: ["Bug fixes and updates", "Performance monitoring", "Small improvements"],
    bestFor: "Existing products",
  },
  {
    name: "Growth",
    subtitle: "Ship every month",
    price: "$3.5K/mo",
    timeline: "About 40 hrs per month",
    popular: true,
    features: ["Feature development", "Priority response", "Monthly roadmap"],
    bestFor: "Active products",
  },
  {
    name: "Partner",
    subtitle: "Embedded team",
    price: "$5K+/mo",
    timeline: "Flexible scope",
    popular: false,
    features: ["Dedicated capacity", "AI and automation buildout", "Strategic input"],
    bestFor: "Scaling businesses",
  },
];

const modes = [
  { key: "project", label: "Project-based" },
  { key: "retainer", label: "Monthly retainer" },
] as const;

type Mode = (typeof modes)[number]["key"];

export default function Pricing() {
  const [mode, setMode] = useState<Mode>("project");
  const tiers = mode === "project" ? projectTiers : retainerTiers;

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="border-t border-border py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <span className="eyebrow">Engagement models</span>
          <h2
            id="pricing-heading"
            className="mt-6 max-w-2xl text-3xl font-semibold sm:text-4xl"
          >
            Transparent pricing, scoped to your project.
          </h2>
          <p className="mt-4 text-muted">No hourly billing surprises.</p>
        </Reveal>

        <div className="mt-10 inline-flex rounded-lg border border-border p-1 font-mono text-sm">
          {modes.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setMode(m.key)}
              className={`rounded-md px-4 py-2 transition-colors ${
                mode === m.key
                  ? "bg-accent text-bg"
                  : "text-muted hover:text-text"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex h-full flex-col rounded-2xl bg-surface p-7 ${
                tier.popular
                  ? "border-2 border-accent"
                  : "border border-border"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 font-mono text-[11px] text-bg">
                  Most popular
                </span>
              )}

              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <p className="mt-1 font-mono text-xs text-muted">
                {tier.subtitle}
              </p>

              <p className="mt-5 text-3xl font-semibold">{tier.price}</p>
              <p className="mt-1 font-mono text-xs text-accent">
                {tier.timeline}
              </p>

              <ul className="mt-6 flex-1 space-y-2.5">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="relative pl-5 text-sm text-muted"
                  >
                    <span aria-hidden className="absolute left-0 text-accent">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="mt-6 font-mono text-[11px] text-muted">
                <span className="text-accent">Best for:</span> {tier.bestFor}
              </p>

              <a
                href="/order"
                className={`mt-5 rounded-lg px-4 py-2.5 text-center font-medium transition-colors ${
                  tier.popular
                    ? "bg-accent text-bg hover:bg-accent-dim"
                    : "border border-border hover:border-accent-dim"
                }`}
              >
                Start your project
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
