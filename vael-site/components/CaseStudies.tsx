import Link from "next/link";
import Reveal from "./Reveal";
import { getFeaturedCaseStudies } from "@/lib/caseStudies";

export default function CaseStudies() {
  const studies = getFeaturedCaseStudies();

  return (
    <section id="work" className="py-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-4">Selected work</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight max-w-2xl">
            Real problems, measurable results.
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {studies.map((c, i) => (
            <Reveal key={c.slug} delay={i * 80}>
              <Link
                href={`/work/${c.slug}`}
                className="group block h-full rounded-2xl border border-border bg-surface overflow-hidden hover:border-accent/60 transition-colors"
              >
                <div className="aspect-[16/10] bg-surface2 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.thumbnail}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block rounded-full border border-accent/40 text-accent font-mono text-[11px] px-3 py-1">
                    {c.industry}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold leading-snug">
                    {c.title}
                  </h3>
                  {c.metrics?.[0] && (
                    <p className="mt-3 text-muted">
                      <span className="text-2xl font-semibold text-text">
                        {c.metrics[0].value}
                      </span>{" "}
                      {c.metrics[0].label.toLowerCase()}
                    </p>
                  )}
                  <p className="mt-5 font-mono text-xs text-accent">
                    View case →
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
