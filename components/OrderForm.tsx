"use client";

import { useState } from "react";

const services = [
  {
    name: "AI Agents & Assistants",
    description: "Assistants, chatbots, and agentic workflows",
  },
  {
    name: "AI-Powered Apps",
    description: "Web and mobile products with AI at the core",
  },
  {
    name: "Business Automation",
    description: "Remove the repetitive work from your team",
  },
  {
    name: "Custom Software & MVPs",
    description: "Bespoke systems, internal tools, and MVPs",
  },
  {
    name: "Not sure yet",
    description: "Help me figure out what I need",
  },
];

const budgets = [
  "Under $10K",
  "$10K to $25K",
  "$25K to $75K",
  "$75K+",
  "Monthly retainer",
  "Not sure yet",
];

const timelines = [
  "As soon as possible",
  "Within 1 month",
  "1 to 3 months",
  "Just exploring",
];

type FormState = {
  service: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  details: string;
};

const initialState: FormState = {
  service: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
  company: "",
  details: "",
};

export default function OrderForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const step3Valid =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.details.trim() !== "";

  async function handleSubmit() {
    if (!step3Valid) {
      setError("Please fill in your name, email, and project details.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        window.location.href = "/thank-you";
        return;
      }
      throw new Error("Request failed");
    } catch {
      setError(
        "Something went wrong. Please email us directly at hello@vael.studio."
      );
      setSubmitting(false);
    }
  }

  return (
    <main className="pb-24 pt-28">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <span className="eyebrow">Start your project</span>
        <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">
          Tell us what you are building.
        </h1>
        <p className="mt-4 text-muted">
          Answer a few questions and we will come back within one business day
          with next steps and a free consultation slot.
        </p>

        <div className="mt-10">
          <p className="font-mono text-xs text-muted">Step {step} of 3</p>
          <div className="mt-2 flex gap-2">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`h-0.5 flex-1 rounded-full ${
                  n <= step ? "bg-accent" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-10">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold">What do you need?</h2>
              <div className="mt-6 flex flex-col gap-3">
                {services.map((s) => {
                  const selected = form.service === s.name;
                  return (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => update("service", s.name)}
                      className={`rounded-xl border p-4 text-left transition-colors ${
                        selected
                          ? "border-accent bg-accent/10"
                          : "border-border bg-surface hover:border-accent/40"
                      }`}
                    >
                      <div className="font-medium">{s.name}</div>
                      <div className="mt-0.5 text-sm text-muted">
                        {s.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold">Scope and timeline</h2>

              <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted">
                Budget
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {budgets.map((b) => {
                  const selected = form.budget === b;
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => update("budget", b)}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                        selected
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border text-muted hover:border-accent/40"
                      }`}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>

              <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted">
                Timeline
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {timelines.map((t) => {
                  const selected = form.timeline === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => update("timeline", t)}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                        selected
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border text-muted hover:border-accent/40"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold">
                About you and the project
              </h2>
              <div className="mt-6 flex flex-col gap-4">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Name"
                  className="w-full rounded-lg border border-border bg-white px-4 py-3 outline-none transition-colors focus:border-accent"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="Email"
                  className="w-full rounded-lg border border-border bg-white px-4 py-3 outline-none transition-colors focus:border-accent"
                />
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  placeholder="Company (optional)"
                  className="w-full rounded-lg border border-border bg-white px-4 py-3 outline-none transition-colors focus:border-accent"
                />
                <textarea
                  value={form.details}
                  onChange={(e) => update("details", e.target.value)}
                  rows={5}
                  placeholder="Tell us the problem you are trying to solve, who it is for, and anything you have already tried."
                  className="w-full rounded-lg border border-border bg-white px-4 py-3 outline-none transition-colors focus:border-accent"
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => {
                setError("");
                setStep(step - 1);
              }}
              className="rounded-lg px-4 py-2.5 text-sm text-muted transition-colors hover:text-text"
            >
              Back
            </button>
          ) : (
            <span />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={
                (step === 1 && !form.service) ||
                (step === 2 && (!form.budget || !form.timeline))
              }
              className="btn-primary rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-bg hover:bg-accent-dim disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-bg hover:bg-accent-dim disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "Sending…" : "Send project details"}
            </button>
          )}
        </div>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      </div>
    </main>
  );
}
