import { formatDate, type PostMeta } from "@/lib/blog";

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="card group block h-full p-6"
    >
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
      </div>

      <h3 className="mt-4 text-2xl font-semibold leading-snug text-text">
        {post.title}
      </h3>

      <p className="mt-3 line-clamp-3 text-base leading-relaxed text-text/70">
        {post.description}
      </p>

      <p className="mt-5 font-mono text-xs text-muted">
        {formatDate(post.date)} · {post.readingTime}
      </p>

      <p className="mt-4 font-mono text-xs text-accent">Read post →</p>
    </a>
  );
}
