import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import BlogCard from "@/components/BlogCard";
import Nav from "@/components/Nav";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Vael",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://vael.studio/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="pb-24 pt-28">
        <article className="mx-auto max-w-2xl px-5 sm:px-8">
          <a href="/blog" className="font-mono text-xs text-muted">
            ← All posts
          </a>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 font-mono text-xs text-muted">
            {formatDate(post.date)} · {post.readingTime} · {post.author}
          </div>

          <div className="prose-vael mt-10">
            <MDXRemote source={post.content} />
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-surface p-8 text-center">
            <p className="text-xl font-medium">
              Need help building something like this?
            </p>
            <p className="mt-2 text-muted">
              We scope every project in a free consultation.
            </p>
            <a
              href="/order"
              className="mt-5 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent-dim"
            >
              Start your project
            </a>
          </div>
        </article>

        {related.length > 0 && (
          <div className="mx-auto mt-16 max-w-2xl px-5 sm:px-8">
            <span className="eyebrow">Keep reading</span>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
