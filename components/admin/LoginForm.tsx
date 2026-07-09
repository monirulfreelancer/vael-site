"use client";

import { useState } from "react";
import Logo from "@/components/Logo";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        window.location.href = "/admin";
        return;
      }
      throw new Error("Login failed");
    } catch {
      setError("Invalid email or password.");
      setSubmitting(false);
    }
  }

  return (
    // A native <form> means Enter in either input submits.
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8"
    >
      <div className="flex justify-center">
        <Logo size={32} />
      </div>

      <h1 className="mt-6 text-center text-2xl font-semibold">Sign in</h1>
      <p className="mt-2 text-center text-sm text-muted">
        Manage posts and case studies.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="email"
          className="w-full rounded-lg border border-border bg-white px-4 py-3 outline-none transition-colors focus:border-accent"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          className="w-full rounded-lg border border-border bg-white px-4 py-3 outline-none transition-colors focus:border-accent"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-lg bg-accent px-4 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent-dim disabled:cursor-not-allowed disabled:opacity-40"
      >
        {submitting ? "Signing in…" : "Sign in"}
      </button>

      {error && (
        <p className="mt-4 text-center text-sm text-red-400">{error}</p>
      )}
    </form>
  );
}
