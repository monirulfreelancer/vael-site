"use client";
import { useState } from "react";
import Reveal from "./Reveal";

export default function CTA() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function submit() {
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="rounded-3xl border border-border bg-surface p-8 sm:p-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <Reveal>
              <div>
                <p className="eyebrow mb-4">Let's build it</p>
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  Have a project in mind?
                </h2>
                <p className="mt-4 text-muted leading-relaxed max-w-md">
                  Tell us what you're trying to build. We'll get back within one
                  business day with next steps — and a free consultation to scope
                  it together.
                </p>
                <p className="mt-8 font-mono text-sm text-muted">
                  Or email us directly
                  <br />
                  <a href="mailto:hello@vael.studio" className="text-accent">
                    hello@vael.studio
                  </a>
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              {status === "sent" ? (
                <div className="h-full grid place-items-center rounded-2xl border border-accent/40 p-8 text-center">
                  <div>
                    <p className="text-accent text-3xl mb-3">✓</p>
                    <p className="font-medium">Thanks — message received.</p>
                    <p className="text-muted text-sm mt-1">
                      We'll be in touch within one business day.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full rounded-lg bg-bg border border-border px-4 py-3 outline-none focus:border-accent transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full rounded-lg bg-bg border border-border px-4 py-3 outline-none focus:border-accent transition-colors"
                  />
                  <select
                    value={form.budget}
                    onChange={(e) => update("budget", e.target.value)}
                    className="w-full rounded-lg bg-bg border border-border px-4 py-3 outline-none focus:border-accent transition-colors text-muted"
                  >
                    <option value="">Budget range (optional)</option>
                    <option value="$10K–$25K">$10K–$25K</option>
                    <option value="$25K–$75K">$25K–$75K</option>
                    <option value="$75K+">$75K+</option>
                    <option value="Retainer">Monthly retainer</option>
                  </select>
                  <textarea
                    placeholder="What are you building?"
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="w-full rounded-lg bg-bg border border-border px-4 py-3 outline-none focus:border-accent transition-colors resize-none"
                  />
                  {status === "error" && (
                    <p className="text-sm text-red-400">
                      Please fill in your name, email, and message.
                    </p>
                  )}
                  <button
                    onClick={submit}
                    disabled={status === "sending"}
                    className="w-full rounded-lg bg-accent px-6 py-3 font-medium text-bg hover:bg-accent-dim transition-colors disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Book a free consultation"}
                  </button>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
