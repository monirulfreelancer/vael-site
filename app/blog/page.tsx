import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical writing on AI software, automation, and shipping products fast.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main className="pb-24 pt-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <span className="eyebrow">Writing</span>
            <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">
              Notes on building AI software that works.
            </h1>
            <p className="mt-4 max-w-xl text-muted">
              Practical writing on what we learn shipping AI products for real
              businesses.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 80}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
