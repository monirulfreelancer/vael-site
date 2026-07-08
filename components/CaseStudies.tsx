import { getFeaturedCaseStudies } from "@/lib/caseStudies";
import CaseStudyCard from "./CaseStudyCard";
import Reveal from "./Reveal";

export default async function CaseStudies() {
  const studies = await getFeaturedCaseStudies();

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="section relative overflow-hidden border-t border-border"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[420px] w-[420px] rounded-full opacity-[0.06] blur-3xl"
        style={{
          background: "radial-gradient(closest-side, #FFC24B, transparent)",
        }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <span className="eyebrow">Selected work</span>
          <h2
            id="work-heading"
            className="mt-6 max-w-2xl text-4xl font-semibold sm:text-5xl"
          >
            Real problems, measurable results.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 md:grid-cols-2">
          {studies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 80}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
