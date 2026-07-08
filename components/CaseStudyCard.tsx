import type { CaseStudyMeta } from "@/lib/caseStudies";

export default function CaseStudyCard({ study }: { study: CaseStudyMeta }) {
  const firstMetric = study.metrics[0];

  return (
    <a
      href={`/work/${study.slug}`}
      className="card group block h-full overflow-hidden"
    >
      <div className="aspect-[16/10] overflow-hidden bg-surface2">
        <img
          src={study.thumbnail}
          alt={study.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-6">
        <span className="pill">{study.industry}</span>
        <h3 className="mt-4 text-xl font-semibold leading-snug">
          {study.title}
        </h3>
        {firstMetric && (
          <p className="mt-3">
            <span className="text-2xl font-semibold text-text">
              {firstMetric.value}
            </span>{" "}
            <span className="text-muted">
              {firstMetric.label.toLowerCase()}
            </span>
          </p>
        )}
        <p className="mt-5 font-mono text-xs text-accent">View case →</p>
      </div>
    </a>
  );
}
