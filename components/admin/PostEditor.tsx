"use client";

import { useState } from "react";
import Field from "./Field";
import { inputClass, textareaClass } from "./fieldStyles";

type PostData = {
  id?: string;
  title?: string;
  slug?: string;
  description?: string;
  body?: string;
  tags?: string[];
  author?: string;
  published?: boolean;
};

export default function PostEditor({ post }: { post?: PostData }) {
  const isEdit = Boolean(post?.id);
  const [form, setForm] = useState({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    description: post?.description ?? "",
    body: post?.body ?? "",
    tags: (post?.tags ?? []).join(", "),
    author: post?.author ?? "Vael",
    published: post?.published ?? false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    const missing: string[] = [];
    if (!form.title.trim()) missing.push("title");
    if (!form.description.trim()) missing.push("description");
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
      description: form.description.trim(),
      body: form.body,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      author: form.author.trim() || "Vael",
      published: form.published,
    };

    try {
      const res = await fetch(
        isEdit ? `/api/admin/posts/${post!.id}` : "/api/admin/posts",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (res.ok) {
        window.location.href = "/admin/posts";
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
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/posts/${post!.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        window.location.href = "/admin/posts";
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

      <Field label="Description">
        <textarea
          rows={2}
          className={textareaClass}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </Field>

      <Field label="Tags">
        <input
          type="text"
          className={inputClass}
          value={form.tags}
          onChange={(e) => update("tags", e.target.value)}
        />
        <p className="font-mono text-xs text-muted">Comma separated</p>
      </Field>

      <Field label="Author">
        <input
          type="text"
          className={inputClass}
          value={form.author}
          onChange={(e) => update("author", e.target.value)}
        />
      </Field>

      <Field label="Body">
        <textarea
          rows={20}
          className={textareaClass}
          placeholder="Write in Markdown. Use ## for headings."
          value={form.body}
          onChange={(e) => update("body", e.target.value)}
        />
      </Field>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => update("published", e.target.checked)}
          className="h-4 w-4 rounded border-border accent-[#ffc24b]"
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
          href="/admin/posts"
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
