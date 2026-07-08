import AdminTable from "@/components/admin/AdminTable";
import { requireSession } from "@/lib/auth";
import { formatDate } from "@/lib/blog";
import { listPosts } from "@/lib/adminData";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  await requireSession();
  const posts = await listPosts();

  return (
    <AdminTable
      heading="Posts"
      subtitle="Everything you publish appears on the blog within a minute."
      newHref="/admin/posts/new"
      newLabel="New post"
    >
      {posts.length === 0 ? (
        <div className="p-12 text-center text-muted">
          No posts yet.{" "}
          <a href="/admin/posts/new" className="text-accent">
            Write your first post
          </a>
        </div>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-surface2 font-mono text-xs uppercase tracking-wider text-muted">
              <th className="px-5 py-3 font-normal">Title</th>
              <th className="px-5 py-3 font-normal">Status</th>
              <th className="px-5 py-3 font-normal">Updated</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-border last:border-0">
                <td className="px-5 py-4">
                  <a href={`/admin/posts/${post.id}`} className="text-sm">
                    {post.title}
                  </a>
                </td>
                <td className="px-5 py-4">
                  {post.published ? (
                    <span className="pill">Published</span>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
                      Draft
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 font-mono text-xs text-muted">
                  {formatDate(post.updatedAt.toISOString().slice(0, 10))}
                </td>
                <td className="px-5 py-4 text-right">
                  <a
                    href={`/admin/posts/${post.id}`}
                    className="font-mono text-xs text-accent"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminTable>
  );
}
