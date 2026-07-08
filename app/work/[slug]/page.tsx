import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Nav from "@/components/Nav";
import { getAllCaseStudies, getCaseStudy } from "@/lib/caseStudies";

export function generateStaticParams() {
  return getAllCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const firstMetric = study.metrics[0];
  const description = firstMetric
    ? `${study.industry}. ${firstMetric.value} ${firstMetric.label.toLowerCase()}.`
    : study.industry;

  return {
    title: study.title,
    description,
    openGraph: {
      title: study.title,
      description,
      images: [study.thumbnail],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <Nav />
      <main className="pb-24 pt-28">
        <article className="mx-auto max-w-3xl px-5 sm:px-8">
          <a href="/#work" className="font-mono text-xs text-muted">
            ← Back to work
          </a>

          <div className="mt-6">
            <span className="pill">{study.industry}</span>
          </div>

          <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
            {study.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
            <span>{study.client}</span>
            <span>{study.duration}</span>
            <span>{study.services.join(" · ")}</span>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3">
            {study.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-border bg-surface p-5 text-center"
              >
                <div className="text-2xl font-semibold text-accent sm:text-3xl">
                  {metric.value}
                </div>
                <div className="mt-1 font-mono text-[11px] text-muted">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          <div className="prose-vael mt-12">
            <MDXRemote source={study.content} />
          </div>

          {study.testimonial && (
            <figure className="mt-12 rounded-2xl border border-accent/30 bg-surface p-8">
              {study.testimonial.rating && (
                <div className="text-sm text-accent">
                  {"★".repeat(study.testimonial.rating)}
                </div>
              )}
              <blockquote className="mt-3 text-lg leading-relaxed">
                &ldquo;{study.testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 font-mono text-xs text-muted">
                {study.testimonial.author}, {study.testimonial.role}
              </figcaption>
            </figure>
          )}

          <div className="mt-12 text-center">
            <p className="text-xl font-medium">Have a similar problem?</p>
            <a
              href="/order"
              className="mt-5 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent-dim"
            >
              Start your project
            </a>
          </div>
        </article>
      </main>
    </>
  );
}
