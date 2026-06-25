import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllCaseStudies, getCaseStudy } from "@/lib/caseStudies";

export function generateStaticParams() {
  return getAllCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return {
    title: c.title,
    description: `${c.industry} · ${c.metrics?.[0]?.value ?? ""} ${c.metrics?.[0]?.label ?? ""}`,
    openGraph: { title: c.title, images: [c.thumbnail] },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  return (
    <>
      <Nav />
      <main className="pt-28 pb-24">
        <article className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link href="/#work" className="font-mono text-xs text-muted hover:text-text">
            ← Back to work
          </Link>

          <span className="mt-6 inline-block rounded-full border border-accent/40 text-accent font-mono text-[11px] px-3 py-1">
            {c.industry}
          </span>
          <h1 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
            {c.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-muted">
            <span>{c.client}</span>
            <span>{c.duration}</span>
            <span>{c.services.join(" · ")}</span>
          </div>

          {/* metrics */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {c.metrics?.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-border bg-surface p-5 text-center"
              >
                <p className="text-2xl sm:text-3xl font-semibold text-accent">
                  {m.value}
                </p>
                <p className="mt-1 font-mono text-[11px] text-muted leading-tight">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          {/* body */}
          <div className="prose-vael mt-12">
            <MDXRemote source={c.content} />
          </div>

          {/* testimonial */}
          {c.testimonial && (
            <figure className="mt-12 rounded-2xl border border-accent/30 bg-surface p-8">
              <div className="text-accent text-sm mb-3">
                {"★".repeat(c.testimonial.rating ?? 5)}
              </div>
              <blockquote className="text-lg text-text/90 leading-relaxed">
                &ldquo;{c.testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 font-mono text-xs text-muted">
                {c.testimonial.author} — {c.testimonial.role}
              </figcaption>
            </figure>
          )}

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-xl font-medium">Have a similar problem?</p>
            <a
              href="/#contact"
              className="mt-5 inline-block rounded-lg bg-accent px-6 py-3 font-medium text-bg hover:bg-accent-dim transition-colors"
            >
              Let's talk
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
