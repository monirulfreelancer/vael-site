import { requireSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await requireSession();

  const [totalPosts, publishedPosts, totalStudies, publishedStudies] =
    await Promise.all([
      db.post.count(),
      db.post.count({ where: { published: true } }),
      db.caseStudy.count(),
      db.caseStudy.count({ where: { published: true } }),
    ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-muted">
        Everything you publish here goes live within a minute.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a
          href="/admin/posts"
          className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
        >
          <div className="text-lg font-semibold">Posts</div>
          <div className="mt-1 font-mono text-xs text-muted">
            {publishedPosts} published, {totalPosts} total
          </div>
          <div className="mt-4 font-mono text-xs text-accent">
            Manage posts →
          </div>
        </a>

        <a
          href="/admin/case-studies"
          className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
        >
          <div className="text-lg font-semibold">Case studies</div>
          <div className="mt-1 font-mono text-xs text-muted">
            {publishedStudies} published, {totalStudies} total
          </div>
          <div className="mt-4 font-mono text-xs text-accent">
            Manage case studies →
          </div>
        </a>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href="/admin/posts/new"
          className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent-dim"
        >
          New post
        </a>
        <a
          href="/admin/case-studies/new"
          className="rounded-lg border border-border px-6 py-3 text-sm text-text transition-colors hover:border-accent-dim"
        >
          New case study
        </a>
      </div>
    </div>
  );
}
