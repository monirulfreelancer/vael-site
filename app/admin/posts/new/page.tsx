import PostEditor from "@/components/admin/PostEditor";
import { requireSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  await requireSession();

  return (
    <div>
      <a href="/admin/posts" className="font-mono text-xs text-muted">
        ← Posts
      </a>
      <h1 className="mt-4 text-2xl font-semibold">New post</h1>
      <div className="mt-8">
        <PostEditor />
      </div>
    </div>
  );
}
