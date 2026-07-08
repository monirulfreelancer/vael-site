import { notFound } from "next/navigation";
import PostEditor from "@/components/admin/PostEditor";
import { requireSession } from "@/lib/auth";
import { getPostById } from "@/lib/adminData";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSession();
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div>
      <a href="/admin/posts" className="font-mono text-xs text-muted">
        ← Posts
      </a>
      <h1 className="mt-4 text-2xl font-semibold">Edit post</h1>
      <div className="mt-8">
        <PostEditor
          post={{
            id: post.id,
            title: post.title,
            slug: post.slug,
            description: post.description,
            body: post.body,
            tags: post.tags,
            author: post.author,
            published: post.published,
          }}
        />
      </div>
    </div>
  );
}
