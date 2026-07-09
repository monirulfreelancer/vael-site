"use client";

import { useState } from "react";
import Field from "./Field";
import { inputClass, textareaClass } from "./fieldStyles";

type MetricInput = { value: string; label: string };

type CaseStudyData = {
  id?: string;
  title?: string;
  slug?: string;
  industry?: string;
  client?: string;
  year?: number;
  duration?: string;
  services?: string[];
  thumbnail?: string;
  body?: string;
  metrics?: unknown;
  testimonial?: unknown;
  featured?: boolean;
  published?: boolean;
};

function initMetrics(raw: unknown): MetricInput[] {
  const arr = Array.isArray(raw) ? (raw as MetricInput[]) : [];
  return [0, 1, 2].map((i) => ({
    value: arr[i]?.value ?? "",
    label: arr[i]?.label ?? "",
  }));
}

export default function CaseStudyEditor({ study }: { study?: CaseStudyData }) {
  const isEdit = Boolean(study?.id);
  const testimonial = (study?.testimonial ?? null) as {
    quote?: string;
    author?: string;
    role?: string;
    rating?: number;
  } | null;

  const [form, setForm] = useState({
    title: study?.title ?? "",
    slug: study?.slug ?? "",
    industry: study?.industry ?? "",
    client: study?.client ?? "",
    year: study?.year != null ? String(study.year) : "",
    duration: study?.duration ?? "",
    services: (study?.services ?? []).join(", "),
    thumbnail: study?.thumbnail ?? "",
    body: study?.body ?? "",
    quote: testimonial?.quote ?? "",
    author: testimonial?.author ?? "",
    role: testimonial?.role ?? "",
    rating: testimonial?.rating != null ? String(testimonial.rating) : "5",
    featured: study?.featured ?? false,
    published: study?.published ?? true,
  });
  const [metrics, setMetrics] = useState<MetricInput[]>(
    initMetrics(study?.metrics)
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateMetric(index: number, key: keyof MetricInput, value: string) {
    setMetrics((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [key]: value } : m))
    );
  }

  async function handleSave() {
    const missing: string[] = [];
    if (!form.title.trim()) missing.push("title");
    if (!form.industry.trim()) missing.push("industry");
    if (!form.client.trim()) missing.push("client");
    if (!form.year.trim() || Number.isNaN(Number(form.year)))
      missing.push("year");
    if (!form.duration.trim()) missing.push("duration");
    if (!form.thumbnail.trim()) missing.push("thumbnail");
    if (!form.body.trim()) missing.push("body");
    if (missing.length > 0) {
      setError(`Please fill in: ${missing.join(", ")}.`);
      return;
    }

    setError("");
    setSubmitting(true);

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      industry: form.industry.trim(),
      client: form.client.trim(),
      year: Number(form.year),
      duration: form.duration.trim(),
      services: form.services
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      thumbnail: form.thumbnail.trim(),
      body: form.body,
      metrics: metrics
        .filter((m) => m.value.trim() !== "" || m.label.trim() !== "")
        .map((m) => ({ value: m.value.trim(), label: m.label.trim() })),
      testimonial: form.quote.trim()
        ? {
            quote: form.quote.trim(),
            author: form.author.trim(),
            role: form.role.trim(),
            rating: Number(form.rating) || 5,
          }
        : null,
      featured: form.featured,
      published: form.published,
    };

    try {
      const res = await fetch(
        isEdit ? `/api/admin/case-studies/${study!.id}` : "/api/admin/case-studies",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (res.ok) {
        window.location.href = "/admin/case-studies";
        return;
      }
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Something went wrong.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Delete this case study? This cannot be undone.")) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/case-studies/${study!.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        window.location.href = "/admin/case-studies";
        return;
      }
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Something went wrong.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <Field label="Title">
        <input
          type="text"
          className={inputClass}
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
        />
      </Field>

      <Field label="Slug">
        <input
          type="text"
          className={inputClass}
          value={form.slug}
          onChange={(e) => update("slug", e.target.value)}
        />
        <p className="font-mono text-xs text-muted">
          Leave blank to generate from the title
        </p>
      </Field>

      <Field label="Industry">
        <input
          type="text"
          className={inputClass}
          value={form.industry}
          onChange={(e) => update("industry", e.target.value)}
        />
      </Field>

      <Field label="Client">
        <input
          type="text"
          className={inputClass}
          value={form.client}
          onChange={(e) => update("client", e.target.value)}
        />
      </Field>

      <Field label="Year">
        <input
          type="number"
          className={inputClass}
          value={form.year}
          onChange={(e) => update("year", e.target.value)}
        />
      </Field>

      <Field label="Duration">
        <input
          type="text"
          className={inputClass}
          value={form.duration}
          onChange={(e) => update("duration", e.target.value)}
        />
      </Field>

      <Field label="Services">
        <input
          type="text"
          className={inputClass}
          value={form.services}
          onChange={(e) => update("services", e.target.value)}
        />
        <p className="font-mono text-xs text-muted">Comma separated</p>
      </Field>

      <Field label="Thumbnail">
        <input
          type="text"
          className={inputClass}
          value={form.thumbnail}
          onChange={(e) => update("thumbnail", e.target.value)}
        />
        <p className="font-mono text-xs text-muted">
          Path under /public, for example /work/my-cover.svg
        </p>
      </Field>

      <Field label="Body">
        <textarea
          rows={16}
          className={textareaClass}
          placeholder="Write in Markdown. Use ## for headings."
          value={form.body}
          onChange={(e) => update("body", e.target.value)}
        />
      </Field>

      <div className="space-y-2">
        <div className="font-mono text-xs uppercase tracking-wider text-muted">
          Metrics
        </div>
        <p className="font-mono text-xs text-muted">
          Shown large on the case study page.
        </p>
        <div className="space-y-3">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-3 rounded-lg border border-border p-4 sm:grid-cols-2"
            >
              <input
                type="text"
                className={inputClass}
                placeholder="Value"
                value={metric.value}
                onChange={(e) => updateMetric(i, "value", e.target.value)}
              />
              <input
                type="text"
                className={inputClass}
                placeholder="Label"
                value={metric.label}
                onChange={(e) => updateMetric(i, "label", e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 rounded-lg border border-border p-4">
        <div className="font-mono text-xs uppercase tracking-wider text-muted">
          Testimonial
        </div>
        <p className="font-mono text-xs text-muted">
          Leave the quote blank to omit the testimonial.
        </p>
        <textarea
          rows={3}
          className={textareaClass}
          placeholder="Quote"
          value={form.quote}
          onChange={(e) => update("quote", e.target.value)}
        />
        <input
          type="text"
          className={inputClass}
          placeholder="Author"
          value={form.author}
          onChange={(e) => update("author", e.target.value)}
        />
        <input
          type="text"
          className={inputClass}
          placeholder="Role"
          value={form.role}
          onChange={(e) => update("role", e.target.value)}
        />
        <input
          type="number"
          min={1}
          max={5}
          className={inputClass}
          placeholder="Rating"
          value={form.rating}
          onChange={(e) => update("rating", e.target.value)}
        />
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => update("featured", e.target.checked)}
          className="h-4 w-4 rounded border-border accent-accent"
        />
        <span className="font-medium">Featured</span>
        <span className="text-sm text-muted">Shows on the homepage.</span>
      </label>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => update("published", e.target.checked)}
          className="h-4 w-4 rounded border-border accent-accent"
        />
        <span className="font-medium">Published</span>
        <span className="text-sm text-muted">
          Drafts are hidden from the public site.
        </span>
      </label>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={submitting}
          className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent-dim disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? "Saving…" : "Save"}
        </button>
        <a
          href="/admin/case-studies"
          className="rounded-lg border border-border px-6 py-2.5 text-sm text-text transition-colors hover:border-accent-dim"
        >
          Cancel
        </a>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={submitting}
            className="ml-auto text-sm text-red-400 transition-colors hover:text-red-300 disabled:opacity-40"
          >
            Delete
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
